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
  // 1. Mobile & Tablet Setup
  // Tapping anywhere on the screen forces focus to the hidden input
  document.addEventListener("click", () => {
    mobileInput.focus();
  });
  mobileInput.focus();

  // 2. Mobile Logic: Catch characters from the virtual keyboard
  mobileInput.addEventListener("input", (e) => {
    const val = e.target.value.toUpperCase();
    const char = val.slice(-1); // Get the last character typed

    if (char === 'Y' || char === 'N') {
      handleChoice(char);
      mobileInput.disabled = true; // Lock input after choice
    }
    e.target.value = ""; // Clear for next potential input
  });

  // 3. Desktop Logic: Catch physical key presses
  window.addEventListener("keydown", (e) => {
    const key = e.key.toUpperCase();
    if (key === 'Y' || key === 'N') {
      // Prevents the letter from actually being typed elsewhere
      e.preventDefault(); 
      handleChoice(key);
    }
  }, { once: true }); // 'once' prevents the script from restarting if keys are mashed
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
