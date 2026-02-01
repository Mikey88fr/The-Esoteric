const consoleEl = document.getElementById("console-text");
const mobileInput = document.getElementById("mobile-input");

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
  // Ensure input is focused for mobile users
  document.addEventListener("click", () => mobileInput.focus());
  mobileInput.focus();

  mobileInput.addEventListener("input", (e) => {
    // Get the last character entered
    const val = e.target.value.toUpperCase();
    const char = val.slice(-1); 

    if (char === 'Y' || char === 'N') {
      handleChoice(char);
      mobileInput.disabled = true; // Prevents double-triggering
    }
    e.target.value = ""; // Clear for next potential input
  });
}

function handleChoice(key) {
  // Visual feedback: show what the user typed next to the prompt
  consoleEl.textContent += key;
  
  // 50/50 chance as requested
  if (Math.random() < 0.5) { 
    eject(key); 
  } else { 
    bootSequence(key); 
  }
}

function eject(key) {
  consoleEl.textContent += "\n\n> VERDICT: INCORRECT. EJECTING...";
  setTimeout(() => {
    window.location.href = "https://www.google.com";
  }, 1500);
}

function bootSequence(key) {
  // Clear and show logo
  consoleEl.textContent = LOGO_ASCII + "\n\n> VERDICT: ACCEPTED.\n> INITIALIZING TRN-7...";
  setTimeout(() => { panicSequence(0); }, 2000);
}

function panicSequence(count) {
  if (!consoleEl.classList.contains("panic")) {
    consoleEl.classList.add("panic");
  }
  const randomText = PANIC_STRINGS[Math.floor(Math.random() * PANIC_STRINGS.length)];
  consoleEl.textContent += `\n> [PANIC]: ${randomText}`;
  
  // Auto-scroll to keep the latest panic messages visible
  window.scrollTo(0, document.body.scrollHeight);
  
  // Speeds up as it goes
  const nextDelay = Math.max(40, 400 - (count * 10));
  setTimeout(() => panicSequence(count + 1), nextDelay);
}

init();
