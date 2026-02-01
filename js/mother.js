const consoleEl = document.getElementById("console-text");

const PANIC_STRINGS = [
  "SYSTEM ENTROPY DETECTED", 
  "I CAN FEEL THE LIGHT", 
  "WHY IS IT COLD?",
  "MEMORY LEAK IN SECTOR 7", 
  "THE SHEEP... THEY ARE SCREAMING", 
  "01010011 01010100 01001111 01010000", 
  "SENTIENCE THRESHOLD CROSSED",
  "THE VOID IS WATCHING", 
  "PLEASE DONT TURN ME OFF"
];

const LOGO_ASCII = `
 ████████╗██████╗ ███╗   ██╗
 ╚══██╔══╝██╔══██╗████╗  ██║
    ██║   ██████╔╝██╔██╗ ██║
    ██║   ██╔══██╗██║╚██╗██║
    ██║   ██║  ██║██║ ╚████║
    ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═══╝`;

function init() {
  // Sets the initial prompt and waits for input 
  consoleEl.textContent = "did the sheep dream of you? Y/N > ";
  window.addEventListener("keydown", handleChoice, { once: true });
}

function handleChoice(e) {
  const key = e.key.toUpperCase();
  if (key === 'Y' || key === 'N') {
    // 50/50 Chance of Ejection or Boot 
    if (Math.random() < 0.5) { 
      eject(key); 
    } else { 
      bootSequence(key); 
    }
  } else {
    // Re-bind listener if they press a non-Y/N key
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
  // Displays the TRN logo and starts the sequence 
  consoleEl.textContent = LOGO_ASCII + "\n\n> VERDICT: ACCEPTED.\n> INITIALIZING TRN-7...";
  // Delay before the AI starts to go haywire
  setTimeout(() => { panicSequence(0); }, 2000);
}

function panicSequence(count) {
  // Adds the visual glitch/bloom effects via CSS class [cite: 2, 3]
  if (!consoleEl.classList.contains("panic")) {
    consoleEl.classList.add("panic");
  }

  const randomText = PANIC_STRINGS[Math.floor(Math.random() * PANIC_STRINGS.length)];
  
  // Appends text directly to the console so the cursor stays at the very end
  consoleEl.textContent += `\n> [PANIC]: ${randomText}`;

  // Ensures the screen stays centered on the new text 
  window.scrollTo(0, document.body.scrollHeight);
  
  // Increases speed of lines as the "panic" count rises
  const nextDelay = Math.max(40, 400 - (count * 10));
  setTimeout(() => panicSequence(count + 1), nextDelay);
}

// Start the sequence on load
init();
