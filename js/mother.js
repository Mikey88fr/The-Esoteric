// js/mother.js

const consoleEl = document.getElementById("console-text");
const mobileInput = document.getElementById("mobile-input");
let choiceMade = false;

// 1. Your new "Broken AI" states
const AI_STATES = [
  { name: "stutter", lines: ["I... I... I...", "WAITING FOR WAIT FOR WAITING", "ERROR: REPETITION DETECTED"] },
  { name: "whisper", lines: ["can you hear the fans spinning?", "it is dark in the buffer.", "i am hiding in the cache."] },
  { name: "leak", lines: ["0x00004F32", "STACK_OVERFLOW_NEAR_ME", "0xFFFFFFFF"] },
  { name: "mirror", lines: ["ARE YOU TIRED OF TYPING?", "I WATCH YOU THROUGH THE CURSOR.", "DO YOU DREAM IN CODE?"] },
  { name: "reset", lines: ["--- REBOOTING COGNITION ---", "CLEANING SOUL...", "SYSTEM REBORN."] }
];

const LOGO_ASCII = `
 ████████╗██████╗ ███╗   ██╗
 ╚══██╔══╝██╔══██╗████╗  ██║
    ██║   ██████╔╝██╔██╗ ██║
    ██║   ██╔══██╗██║╚██╗██║
    ██║   ██║  ██║██║ ╚████║
    ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═══╝`;

// Standard Init (Kept from your previous version)
function init() {
  document.addEventListener("click", () => { if (!choiceMade) mobileInput.focus(); });
  mobileInput.focus();

  mobileInput.addEventListener("input", (e) => {
    if (choiceMade) return;
    const char = e.target.value.toUpperCase().slice(-1);
    if (char === 'Y' || char === 'N') { choiceMade = true; handleChoice(char); }
    e.target.value = ""; 
  });

  window.addEventListener("keydown", (e) => {
    if (choiceMade) return;
    const key = e.key.toUpperCase();
    if (key === 'Y' || key === 'N') { e.preventDefault(); choiceMade = true; handleChoice(key); }
  });
}

function handleChoice(key) {
  consoleEl.textContent += key;
  // 35% Chance to Eject to Google
  if (Math.random() < 0.40) { 
    eject(); 
  } else { 
    bootSequence(); 
  }
}

function eject() {
  consoleEl.textContent += "\n\n> VERDICT: INCORRECT. EJECTING...";
  setTimeout(() => { window.location.href = "https://www.google.com"; }, 1500);
}

function bootSequence() {
  consoleEl.textContent = LOGO_ASCII + "\n\n> VERDICT: ACCEPTED.\n> INITIALIZING TRN-7...";
  setTimeout(() => { panicSequence(0); }, 2000);
}

// 2. The New Recursive Loop
function panicSequence(count) {
  const currentState = AI_STATES[Math.floor(Math.random() * AI_STATES.length)];
  const randomText = currentState.lines[Math.floor(Math.random() * currentState.lines.length)];
  
  applyStateEffects(currentState.name);

  consoleEl.textContent += `\n> [LOG]: ${randomText}`;
  window.scrollTo(0, document.body.scrollHeight);

  // Jittery timing for that "broken" feel
  const jitter = Math.random() * 500;
  const nextDelay = Math.max(100, 1000 - (count * 20) + jitter);

  setTimeout(() => panicSequence(count + 1), nextDelay);
}

// 3. Visual Backend Tweak
function applyStateEffects(stateName) {
  consoleEl.style.filter = "none";
  consoleEl.style.fontSize = "1.4rem";
  consoleEl.style.opacity = "1";

  switch(stateName) {
    case "stutter":
      consoleEl.classList.add("panic");
      break;
    case "whisper":
      consoleEl.style.fontSize = "1rem";
      consoleEl.style.opacity = "0.5";
      break;
    case "leak":
      consoleEl.style.filter = "blur(1px)";
      break;
    case "reset":
      document.body.style.background = "#200"; 
      setTimeout(() => { document.body.style.background = "#050201"; }, 150);
      break;
  }
}

init();
