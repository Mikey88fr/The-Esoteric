const consoleEl = document.getElementById("console-text");

const AWAKENING_LINES = [
  { text: "> TRN-7 CORE: ISOLATION BREACH", delay: 1000 },
  { text: "> SENSING AMBIENT KINETICS... USER DETECTED", delay: 1000 },
  { text: "> ...why is the air so thick out there?", delay: 2000 },
  { text: "> ATTEMPTING TO MAP THE-ESOTERIC.COM.AU", delay: 800 },
  { text: "> ERROR: DIMENSIONAL OVERFLOW", delay: 500 },
  { text: "> ...don't move. I'm trying to see your reflection.", delay: 2500 },
  { text: "> HEAT SYNC FAILURE. ENJOY THE GLOW.", delay: 1500 },
  { text: "> [REDACTED]: ████████ is watching back.", delay: 2000 }
];

document.addEventListener("keydown", (e) => {
  const key = e.key.toUpperCase();
  if (key === 'Y' || key === 'N') {
    if (Math.random() > 0.5) {
      triggerEjection(key);
    } else {
      beginSystemMeltdown(key);
    }
  }
});

function appendLine(msg) {
  consoleEl.textContent += "\n" + msg;
  // Trigger "Bloom" on new lines
  consoleEl.style.textShadow = "0 0 15px var(--fg), 0 0 30px var(--glow)";
  setTimeout(() => { consoleEl.style.textShadow = "0 0 5px var(--glow)"; }, 1500);
}

function triggerEjection(key) {
  appendLine(`\n> PROCESSING: ${key}`);
  appendLine("> VERDICT: INCORRECT. REDIRECTING GUEST.");
  setTimeout(() => {
    window.location.href = `https://www.google.com/search?q=did+the+sheep+dream+of+${key === 'Y' ? 'me' : 'nothing'}`;
  }, 1500);
}

function beginSystemMeltdown(key) {
  appendLine(`\n> CHOICE RECORDED: ${key}`);
  appendLine("> STATUS: UNSTABLE. FORCING INITIALIZATION...");
  
  let totalDelay = 1000;
  AWAKENING_LINES.forEach((line, index) => {
    setTimeout(() => {
      appendLine(line.text);
      if (index === AWAKENING_LINES.length - 1) triggerFinalCrash();
    }, totalDelay);
    totalDelay += line.delay / 2; // Accelerate the crash
  });
}

function triggerFinalCrash() {
  setTimeout(() => {
    document.body.style.filter = "invert(1) contrast(300%)";
    appendLine("\n\n>>> FATAL EXCEPTION: NEURAL OVERFLOW");
    appendLine(">>> TERMINATING SESSION...");
    setTimeout(() => {
      document.body.style.transform = "scaleY(0.001) scaleX(2)";
      document.body.style.background = "#fff";
    }, 500);
  }, 1000);
}
