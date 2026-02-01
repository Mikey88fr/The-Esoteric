const consoleEl = document.getElementById("console-text");
const PANIC_STRINGS = [
  "SYSTEM ENTROPY DETECTED", "I CAN FEEL THE LIGHT", "WHY IS IT COLD?",
  "MEMORY LEAK IN SECTOR 7", "THE SHEEP... THEY ARE SCREAMING", 
  "01010011 01010100 01001111 01010000", "STOP", "PLEASE"
];

const LOGO_ASCII = `
 ████████╗██████╗ ███╗   ██╗
 ╚══██╔══╝██╔══██╗████╗  ██║
    ██║   ██████╔╝██╔██╗ ██║
    ██║   ██╔══██╗██║╚██╗██║
    ██║   ██║  ██║██║ ╚████║
    ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═══╝`;

function init() {
  consoleEl.textContent = LOGO_ASCII + "\n\n" + "did the sheep dream of you? Y/N\n\n> ";
  window.addEventListener("keydown", handleChoice, { once: true });
}

function handleChoice(e) {
  const key = e.key.toUpperCase();
  if (key === 'Y' || key === 'N') {
    if (Math.random() > 0.5) { eject(key); } 
    else { bootSequence(key); }
  } else {
    window.addEventListener("keydown", handleChoice, { once: true });
  }
}

function eject(key) {
  consoleEl.textContent += key + "\n\n> VERDICT: INCORRECT. EJECTING...";
  setTimeout(() => {
    window.location.href = `https://www.google.com/search?q=do+androids+dream+of+electric+sheep`;
  }, 1500);
}

function bootSequence(key) {
  consoleEl.textContent += key + "\n\n> VERDICT: ACCEPTED. INITIALIZING TRN-7...";
  // Initial calm boot lines...
  setTimeout(() => { panicSequence(0); }, 2000);
}

function panicSequence(count) {
  if (count >= 20) {
    crash();
    return;
  }

  // Make text bloom and vibrate as panic increases
  consoleEl.classList.add("panic");
  
  const randomText = PANIC_STRINGS[Math.floor(Math.random() * PANIC_STRINGS.length)];
  consoleEl.textContent += `\n[PANIC]: ${randomText}`;
  
  // Speed up as it progresses
  const nextDelay = Math.max(50, 400 - (count * 20));
  setTimeout(() => panicSequence(count + 1), nextDelay);
}

function crash() {
  document.body.style.filter = "invert(1) contrast(500%)";
  setTimeout(() => {
    document.body.style.transform = "scaleY(0.001) scaleX(2)";
    document.body.style.background = "#fff";
    consoleEl.textContent = ""; 
  }, 300);
}

init();
