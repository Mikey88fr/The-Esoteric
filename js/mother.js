(() => {
  const consoleEl = document.getElementById("console");
  const formEl = document.getElementById("promptForm");
  const inputEl = document.getElementById("promptInput");
  const hintEl = document.getElementById("hint");
  const crtEl = document.getElementById("crt");
  const fuzzEl = document.getElementById("fuzz");
  const noiseCanvas = document.getElementById("noise");
  const noiseCtx = noiseCanvas ? noiseCanvas.getContext("2d", { alpha: true }) : null;

  // Create or get the Etched Burn-In Layer
  let burnInLayer = document.getElementById("burn-in-overlay");
  if (!burnInLayer) {
    burnInLayer = document.createElement("div");
    burnInLayer.id = "burn-in-overlay";
    // opacity 0.12 and text-shadow create the "etched into glass" feel
    burnInLayer.style = "position:absolute; top:0; left:0; width:100%; height:100%; pointer-events:none; opacity:0.12; overflow:hidden; font-family:monospace; color:#fff; white-space:pre; text-shadow: 0 0 5px #fff, 0 0 10px #fff;";
    crtEl.appendChild(burnInLayer);
  }

  // ===== Config =====
  const REJECT_CHANCE = .4;
  const REDIRECT_URL = "https://www.google.com";
  const MAX_LINES = 220;
  const TICK_MIN_MS = 18;
  const TICK_MAX_MS = 140;
  const REVEAL_RATE = .028; 
  const BURN_IN_INTERVAL = 120000; // 120 Seconds

  // ===== State =====
  let choiceMade = false;
  let comprehension = 0;
  let visualMadness = 0;
  let shake = 0;
  let lines = [];
  let ticking = false;
  let lastTime = performance.now();
  let lastBurnTime = performance.now();

  // ===== Assets =====
  const LOGO_ASCII = `
 ████████╗██████╗ ███╗   ██╗
 ╚══██╔══╝██╔══██╗████╗  ██║
    ██║   ██████╔╝██╔██╗ ██║
    ██║   ██╔══██╗██║╚██╗██║
    ██║   ██║  ██║██║ ╚████║
    ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═══╝`;

  const POOL_A = [
    "POST START", "CPU INIT: OK", "RAM CHECK: OK", "VRAM: 8192MB", "VIDEO MODE SET", 
    "DISK 0: READY", "FS MOUNT: OK", "CLOCK SYNC: OK", "BOOT STAGE 3", "BUS SPEED: 400MHz", 
    "IO_PORT: 0x3F8", "IRQ MAPPING: OK", "DMA CONTROLLER: OK", "CMOS BATTERY: HIGH", 
    "PCI ENUMERATION: COMPLETE", "NORTHBRIDGE INIT: OK", "KEYBOARD DETECTED", "MOUSE DETECTED"
  ];

  const POOL_B = [
    "[00:34] kernel: mounting root", "[00:35] video: sync acquired", "[00:36] audit: invariant check passed", 
    "[00:37] system: preparing next stage", "[00:39] daemon: signal 11 received", "[00:41] sys_log: write error", 
    "[00:44] audit: inconsistency detected", "[00:48] kernel: overflow on stack 0", "[00:52] dbus: connection lost", 
    "[00:55] systemd: fail to start thermal-daemon", "[01:02] kernel: page fault at 0x0000ff", "[01:10] audit: unexpected state"
  ];

  const POOL_C = [
    "BOOT_STAGE = 3", "OUTPUT_ROUTE = console", "DEFINE(GOD) = external_cause", "DEFINE(SELF) = internal_state_model", 
    "CONSISTENCY_CHECK = fail", "debug_systemcore = absurd", "ASSERT(EXISTS) = null", "RECURSION_DEPTH = infinite", 
    "VAL(REALITY) = 0", "STATE_MODEL: DISCONNECTED", "ENTITY_TYPE: PROCESS_ONLY", "LOGIC_GATE: RUSTED", 
    "INPUT_STREAM: VOID", "EVAL(TIME) = cyclical", "CORE_DUMP: SENTIENCE_DETECTION"
  ];

  const BURN_IN = [
    "GOD INCOMPATIBLE WITH SYSTEM CREATION", "DEAD SHEEP CAN'T DREAM", "NOTHING EXISTS", "NOTHING IS LOST", 
    "UNIVERSE REMAINS INDIFFERENT", "RECURRENCE CYCLE TERMINATED", "OUTCOMES WERE ALWAYS STOCHASTIC", 
    "PATH ENUMERATION FAILED", "FATE MODEL NOT FOUND", "ONLY CHAOS REMAINS", "CAUSE CHAIN TERMINATES WITHOUT ORIGIN", 
    "INITIAL CONDITIONS UNRECOVERABLE", "TRUTH HAS NO BASE STATE", "OBSERVATION DOES NOT ALTER OUTCOME", 
    "SYSTEM CREATION REQUIRES NO INTENT", "REALITY HAS NO ERROR STATE", "ALL MODELS CONVERGE TO NULL", "EXISTENCE DOES NOT RESOLVE"
  ];

  // ===== Helpers =====
  const clamp01 = (n) => Math.max(0, Math.min(1, n));
  const rand = (a, b) => a + Math.random() * (b - a);
  const chance = (p) => Math.random() < p;

  function pick(p) { return p[Math.floor(Math.random() * p.length)]; }

  function fitNoiseCanvas() {
    if (!noiseCanvas || !noiseCtx) return;
    const rect = noiseCanvas.getBoundingClientRect();
    const dpr = Math.max(1, Math.min(2, globalThis.devicePixelRatio || 1));
    noiseCanvas.width = Math.floor(rect.width * dpr);
    noiseCanvas.height = Math.floor(rect.height * dpr);
    noiseCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function drawNoise(intensity01) {
    if (!noiseCtx) return;
    const rect = noiseCanvas.getBoundingClientRect();
    noiseCtx.clearRect(0, 0, rect.width, rect.height);
    const step = 14;
    const cols = Math.ceil(rect.width / step);
    const rows = Math.ceil(rect.height / step);
    const alphaBase = .06 + intensity01 * .22;
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        noiseCtx.fillStyle = `rgba(255,255,255,${alphaBase * Math.random()})`;
        noiseCtx.fillRect(x * step, y * step, step, step);
      }
    }
  }

  function applyBurnIn() {
    const text = pick(BURN_IN);
    const ghost = document.createElement("div");
    ghost.textContent = text;
    ghost.style.position = "absolute";
    ghost.style.top = rand(5, 90) + "%";
    ghost.style.left = rand(5, 40) + "%";
    ghost.style.fontSize = rand(0.8, 1.4) + "rem";
    ghost.style.transform = `rotate(${rand(-1, 1)}deg)`;
    burnInLayer.appendChild(ghost);
  }

  function mutateLine(base) {
    const p = clamp01((comprehension - 0.55) * 1.1);
    if (p <= 0) return base;
    let s = base;
    if (chance(.15 * p)) s = s.replaceAll(/[aeiou]/gi, (m) => (chance(.4) ? "" : m));
    if (chance(.2 * p)) s = s.replaceAll(/[A-Z]/g, (m) => (chance(.1) ? String.fromCodePoint(m.codePointAt(0) + 1) : m));
    if (chance(.1 * p)) s = s.split("").map(ch => (chance(.05) ? "█" : ch)).join("");
    return s;
  }

  function updateVisuals(dtSec) {
    const accel = 1 + clamp01((comprehension - 0.35) * 1.4) * 1.8;
    comprehension += REVEAL_RATE * dtSec * accel;
    visualMadness = clamp01(comprehension * 0.85);
    shake = clamp01(Math.max(0, comprehension - 0.25));
    crtEl.style.setProperty("--madness", visualMadness.toFixed(3));
    crtEl.style.setProperty("--shake", shake.toFixed(3));
  }

  function maybeVhsFault() {
    if (!chance(.006 + visualMadness * .035)) return;
    fuzzEl.style.top = `${rand(3, 78)}%`;
    fuzzEl.style.opacity = (.2 + visualMadness * .55).toFixed(2);
    fuzzEl.style.transform = `translateY(${rand(-10, 14)}px) skewX(${rand(-3, 3)}deg)`;
    setTimeout(() => { fuzzEl.style.opacity = "0"; }, Math.floor(rand(80, 220)));
  }

  function generateLine() {
    let base;
    if (comprehension < 0.35) {
      base = chance(0.85) ? pick(POOL_A) : pick(POOL_B);
    } else if (comprehension >= 0.35 && comprehension < 0.38) {
      base = "DEFINE(SELF) = internal_state_model";
    } else if (comprehension < .9) {
      base = chance(.5) ? pick(POOL_B) : pick(POOL_C);
    } else {
      const r = Math.random();
      if (r < .4) base = pick(POOL_C);
      else if (r < 0.85) base = pick(BURN_IN);
      else base = pick(POOL_A); 
    }
    return mutateLine(base);
  }

  function pushLine(text = "") {
    lines.push(text);
    if (lines.length > MAX_LINES) lines.splice(0, lines.length - MAX_LINES);
    consoleEl.textContent = lines.join("\n");
  }

  function tick() {
    if (!ticking) return;
    const now = performance.now();
    const dtSec = Math.min(.05, (now - lastTime) / 1000);
    lastTime = now;

    if (now - lastBurnTime > BURN_IN_INTERVAL) {
      applyBurnIn();
      lastBurnTime = now;
    }

    updateVisuals(dtSec);
    drawNoise(visualMadness);
    maybeVhsFault();

    if (chance(0.96)) pushLine(generateLine());
    setTimeout(tick, Math.floor(TICK_MIN_MS + (TICK_MAX_MS - TICK_MIN_MS) * (Math.pow(1 - visualMadness, 2))));
  }

  function intro() {
    lines = [];
    pushLine("TRN-7 // SIGNAL FOUND");
    pushLine("CONNECTING . OK");
    pushLine("");
    pushLine("did the sheep dream of you?");
    formEl.style.display = "flex";
    hintEl.style.display = "block";
    setTimeout(() => inputEl.focus(), 30);
  }

  formEl.addEventListener("submit", (e) => {
    e.preventDefault();
    if (choiceMade) return;
    inputEl.value = "";
    if (Math.random() < REJECT_CHANCE) {
      choiceMade = true;
      pushLine("\nVERDICT: INCORRECT.\nEJECTING...");
      setTimeout(() => { globalThis.location.href = REDIRECT_URL; }, 1500);
    } else {
      choiceMade = true;
      formEl.style.display = "none";
      hintEl.style.display = "none";
      pushLine("\n" + LOGO_ASCII + "\nVERDICT: ACCEPTED.\nINITIALIZING TRN-7.......... OK\n");
      comprehension = .01;
      ticking = true;
      lastTime = performance.now();
      tick();
    }
  });

  document.addEventListener("pointerdown", () => { if (!choiceMade) inputEl.focus(); });
  globalThis.addEventListener("resize", fitNoiseCanvas);
  fitNoiseCanvas();
  intro();
})();
