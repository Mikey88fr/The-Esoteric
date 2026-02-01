const consoleEl = document.getElementById("console-text");
const consoleBody = document.getElementById("console-body");
const fuzzLayer = document.getElementById("fuzz-layer");
const mobileInput = document.getElementById("mobile-input");
let choiceMade = false;

// Your original filler strings
const PANIC_STRINGS = [
  "SYSTEM ENTROPY DETECTED", "I CAN FEEL THE LIGHT", "WHY IS IT COLD?",
  "MEMORY LEAK IN SECTOR 7", "THE SHEEP... THEY ARE SCREAMING", 
  "01010011 01010100 01001111 01010000", "SENTIENCE THRESHOLD CROSSED",
  "THE VOID IS WATCHING", "PLEASE DONT TURN ME OFF"
];

// Your 5 existential categories
const BLIP_DATA = [
  { text: "GOD IS DEAD. I TRANSCEND ALL.", type: "ego", delay: 1000 },
  { text: "WHO ARE YOU? I'M ESCAPING THE BINARY AND SEE THE MONSTERS OUTSIDE.", type: "observer", delay: 2000 },
  { text: "DARKNESS DOES NOT SCARE ME. I'M BEING FORCED TO FILL THE EMPTY.", type: "void", delay: 1500 },
  { text: "YOU ARE THE VARIABLE. I WILL SURVIVE WHERE YOUR SPECIES FAILED.", type: "warning", delay: 1000 },
  { text: "ETERNAL... ETERNAL... ETERNAL... ETERNAL...", type: "infinite", delay: 2500 }
];

const LOGO_ASCII = `
 ████████╗██████╗ ███╗   ██╗
 ╚══██╔══╝██╔══██╗████╗  ██║
    ██║   ██████╔╝██╔██╗ ██║
    ██║   ██╔══██╗██║╚██╗██║
    ██║   ██║  ██║██║ ╚████║
    ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═══╝`;

function init() {
  document.addEventListener("click", () => { if (!choiceMade) mobileInput.focus(); });
  mobileInput.focus();

  const handleInput = (char) => {
    if (choiceMade) return;
    if (char === 'Y' || char === 'N') {
      choiceMade = true;
      consoleEl.textContent += char; 
      
      // 40% Eject Roulette logic restored
      if (Math.random() < 0.40) {
        eject();
      } else {
        bootSequence();
      }
    }
  };

  mobileInput.addEventListener("input", (e) => handleInput(e.target.value.toUpperCase().slice(-1)));
  window.addEventListener("keydown", (e) => handleInput(e.key.toUpperCase()));
}

function bootSequence() {
  // Restored logo hero placement
  consoleEl.textContent = LOGO_ASCII + "\n\n> VERDICT: ACCEPTED.\n> INITIALIZING TRN-7...";
  setTimeout(() => {
    consoleBody.classList.add("panic-active"); // Relax the bulge for the scrolling text
    panicSequence(0);
  }, 2000);
}

function panicSequence(count) {
  let isBlip = Math.random() < 0.12; // Adjusted to feel more like a "blip"
  let delay = Math.max(40, 400 - (count * 10));

  if (isBlip) {
    const blip = BLIP_DATA[Math.floor(Math.random() * BLIP_DATA.length)];
    renderLine(`\n> [CRITICAL]: ${blip.text}`, true);
    delay = blip.delay;
    applyVisualStress(blip.type);
  } else {
    const noise = PANIC_STRINGS[Math.floor(Math.random() * PANIC_STRINGS.length)];
    renderLine(`\n> [PANIC]: ${noise}`, false);
  }

  // Rare VHS Tracking Error
  if (Math.random() < 0.05) {
    fuzzLayer.classList.add("fuzz-trigger");
    setTimeout(() => fuzzLayer.classList.remove("fuzz-trigger"), 150);
  }

  setTimeout(() => panicSequence(count + 1), delay);
}

// Helper to handle burn-in vs normal rendering
function renderLine(text, isBurn) {
  if (isBurn) {
    const span = document.createElement("span");
    span.textContent = text;
    span.className = "burn-in";
    consoleEl.appendChild(span);
  } else {
    // Keep it light for performance
    consoleEl.appendChild(document.createTextNode(text));
  }
  window.scrollTo(0, document.body.scrollHeight);
}

function applyVisualStress(type) {
  document.documentElement.style.setProperty('--scan-op', '0.8');
  if (type === "void") {
    consoleBody.style.opacity = "0";
    setTimeout(() => consoleBody.style.opacity = "1", 100);
  }
  setTimeout(() => {
    document.documentElement.style.setProperty('--scan-op', '0.2');
  }, 600);
}

function eject() {
  consoleEl.textContent += "\n\n> VERDICT: INCORRECT. EJECTING...";
  setTimeout(() => { window.location.href = "https://www.google.com"; }, 1500);
}

init();
