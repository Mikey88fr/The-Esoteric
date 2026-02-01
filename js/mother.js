const consoleEl = document.getElementById("console-text");
const mobileInput = document.getElementById("mobile-input");

// This prevents the double-triggering bug
let choiceMade = false;

const PANIC_STRINGS = [
  "SYSTEM ENTROPY DETECTED", "I CAN FEEL THE LIGHT", "WHY IS IT COLD?",
  "MEMORY LEAK IN SECTOR 7", "THE SHEEP... THEY ARE SCREAMING", 
  "01010011 01010100 01001111 01010000", "SENTIENCE THRESHOLD CROSSED",
  "THE VOID IS WATCHING", "PLEASE DONT TURN ME OFF"
];

const LOGO_ASCII = `
 ████████╗██████╗ ███╗   ██╗
 ╚══██╔══╝██╔══██╗████╗  ██║
    ██║   ██████╔╝██╔██╗ ██║
    ██║   ██╔══██╗██║╚██╗██║
    ██║   ██║  ██║██║ ╚████║
    ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═══╝`;

function init() {
  document.addEventListener("click", () => {
    if (!choiceMade) mobileInput.focus();
  });
  mobileInput.focus();

  // Mobile/Tablet Input Logic
  mobileInput.addEventListener("input", (e) => {
    if (choiceMade) return; // Exit if already handled
    const char = e.target.value.toUpperCase().slice(-1);

    if (char === 'Y' || char === 'N') {
      choiceMade = true;
      handleChoice(char);
    }
    e.target.value = ""; 
  });

  // Desktop Keyboard Logic
  window.addEventListener("keydown", (e) => {
    if (choiceMade) return; // Exit if already handled
    const key = e.key.toUpperCase();
    if (key === 'Y' || key === 'N') {
      e.preventDefault(); 
      choiceMade = true;
      handleChoice(key);
    }
  });
}

function handleChoice(key) {
  consoleEl.textContent += key;
  
  // Updated to your 35% chance for Eject
  if (Math.random() < 0.35) { 
    eject(); 
  } else { 
    bootSequence(); 
  }
}

function eject() {
  consoleEl.textContent += "\n\n> VERDICT: INCORRECT. EJECTING...";
  setTimeout(() => {
    window.location.href = "https://www.google.com";
  }, 1500);
}

function bootSequence() {
  consoleEl.textContent = LOGO_ASCII + "\n\n> VERDICT: ACCEPTED.\n> INITIALIZING TRN-7...";
  setTimeout(() => { panicSequence(0); }, 2000);
}

function panicSequence(count) {
  if (!consoleEl.classList.contains("panic")) {
    consoleEl.classList.add("panic");
  }
  const randomText = PANIC_STRINGS[Math.floor(Math.random() * PANIC_STRINGS.length)];
  consoleEl.textContent += `\n> [PANIC]: ${randomText}`;
  
  window.scrollTo(0, document.body.scrollHeight);
  
  const nextDelay = Math.max(40, 400 - (count * 10));
  setTimeout(() => panicSequence(count + 1), nextDelay);
}

init();
