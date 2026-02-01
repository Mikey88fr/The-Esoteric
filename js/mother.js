const consoleEl = document.getElementById("console-text");
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
  consoleEl.textContent = "did the sheep dream of you? Y/N\n\n> ";
  window.addEventListener("keydown", handleChoice, { once: true });
}

function handleChoice(e) {
  const key = e.key.toUpperCase();
  if (key === 'Y' || key === 'N') {
    // 50/50 Chance as requested
    if (Math.random() < 0.5) { 
      eject(key); 
    } else { 
      bootSequence(key); 
    }
  } else {
    window.addEventListener("keydown", handleChoice, { once: true });
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

  // Infinite scroll
  window.scrollTo(0, document.body.scrollHeight);
  
  // Speed ramps up then caps
  const nextDelay = Math.max(40, 400 - (count * 10));
  setTimeout(() => panicSequence(count + 1), nextDelay);
}

init();
