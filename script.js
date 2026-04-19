// 🔊 sounds
const clickSound = new Audio("click.mp3");
const hoverSound = new Audio("hover.mp3");

clickSound.volume = 0.3;
hoverSound.volume = 0.15;

/* =======================
   COPY FUNCTION
======================= */
function copyText(text) {
  navigator.clipboard.writeText(text);

  clickSound.currentTime = 0;
  clickSound.play();

  const toast = document.createElement("div");
  toast.innerText = "Copied: " + text;

  toast.style.position = "fixed";
  toast.style.bottom = "20px";
  toast.style.left = "50%";
  toast.style.transform = "translateX(-50%)";
  toast.style.background = "rgba(0,0,0,0.9)";
  toast.style.color = "white";
  toast.style.padding = "10px 15px";
  toast.style.borderRadius = "10px";
  toast.style.boxShadow = "0 0 15px red";
  toast.style.zIndex = "9999";

  document.body.appendChild(toast);

  setTimeout(() => toast.remove(), 1200);
}

/* =======================
   HOVER SOUND (SAFE)
======================= */
document.addEventListener("mouseover", (e) => {
  const el = e.target;

  if (el.tagName === "A") {
    hoverSound.currentTime = 0;
    hoverSound.play();
  }
});

/* =======================
   CLICK TO ENTER FIX (ADDED)
======================= */
document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.getElementById("overlay");
  const main = document.getElementById("main-content");
  const music = document.getElementById("bgmusic");

  function startSite() {
    if (!overlay) return;

    // hide overlay properly
    overlay.style.opacity = "0";
    overlay.style.pointerEvents = "none";

    setTimeout(() => {
      overlay.style.display = "none";
    }, 300);

    // show main content
    if (main) {
      main.classList.remove("hidden");
    }

    // start music safely
    if (music) {
      music.play().catch(() => {});
    }

    // prevent multiple triggers
    document.removeEventListener("click", startSite);
  }

  // click anywhere triggers it
  document.addEventListener("click", startSite);
});
