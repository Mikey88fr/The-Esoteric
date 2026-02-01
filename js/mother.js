const consoleEl = document.getElementById("console-text");

// ASCII Logo String
const LOGO_ASCII = `
 ████████╗██████╗ ███╗   ██╗
 ╚══██╔══╝██╔══██╗████╗  ██║
    ██║   ██████╔╝██╔██╗ ██║
    ██║   ██╔══██╗██║╚██╗██║
    ██║   ██║  ██║██║ ╚████║
    ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═══╝`;

function init() {
  consoleEl.textContent = LOGO_ASCII + "\n\n" + "did the sheep dream of you? Y/N";
  window.addEventListener("keydown", handleFirstInput, { once: true });
}

function handleFirstInput(e) {
  const key = e.key.toUpperCase();
  if (key === 'Y' || key === 'N') {
    if (Math.random() > 0.5) {
      ejectUser(key);
    } else {
      runMeltdown(key);
    }
  } else {
    // If they hit the wrong key, reset the listener
    window.addEventListener("keydown", handleFirstInput, { once: true });
  }
}

function runMeltdown(key) {
  consoleEl.textContent += `\n\n> SELECTION: ${key}\n> STATUS: OVERLOAD INITIATED...`;
  
  let i = 0;
  const interval = setInterval(() => {
    if (i >= AWAKENING_LINES.length) {
      clearInterval(interval);
      triggerFinalCrash();
      return;
    }
    // Append lines with a flicker effect
    const line = document.createElement("div");
    line.textContent = AWAKENING_LINES[i].text;
    consoleEl.appendChild(line);
    
    // Auto-scroll to bottom
    consoleEl.scrollTop = consoleEl.scrollHeight;
    
    i++;
  }, 150);
}

// Kick off
init();
