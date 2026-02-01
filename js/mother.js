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
  consoleEl.textContent = "did the sheep dream of you? Y/N > ";
  
  // Surgical Fix: Trigger keyboard on mobile tap
  document.addEventListener("click", () => mobileInput.focus());
  mobileInput.focus();

  // Listen to the hidden input instead of global keydown for better mobile support
  mobileInput.addEventListener("input", (e) => {
    const char = e.target.value.toUpperCase().lastChar || e.data?.toUpperCase();
    if (char === 'Y' || char === 'N') {
      handleChoice(char);
      mobileInput.disabled = true; // Stop listening after choice
    }
    e.target.value = ""; // Clear for next input
  });

  // Keep desktop support
  window.addEventListener("keydown", (e) => {
    const key = e.key.toUpperCase();
    if (key === 'Y' || key === 'N') handleChoice(key);
  }, { once: true });
}

function handleChoice(key) {
  if (Math.random() < 0.5) { 
    eject(key); 
  } else { 
    bootSequence(key); 
  }
}

function eject(key) {
  consoleEl.textContent += key + "\n\n> VERDICT: INCORRECT. EJECTING...";
  setTimeout(() => {
    window.location.href = "https://www.google.com";
  }, 1500);
}

function bootSequence(key) {
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
