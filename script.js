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
  toast.style.background = "rgba(255, 105, 180, 0.9)";
  toast.style.color = "white";
  toast.style.padding = "10px 15px";
  toast.style.borderRadius = "25px";
  toast.style.boxShadow = "0 0 20px hotpink, 0 0 40px rgba(255, 105, 180, 0.4)";
  toast.style.zIndex = "9999";
  toast.style.fontWeight = "bold";
  toast.style.letterSpacing = "0.5px";

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
   SPARKLES INSTEAD OF BLOOD
======================= */
function createSparkle() {
  const sparkle = document.createElement("div");
  sparkle.classList.add("sparkle");

  const emojis = ["✨", "💕", "💖", "🩷", "🌸", "💗", "☆", "⋆"];
  sparkle.innerText = emojis[Math.floor(Math.random() * emojis.length)];

  sparkle.style.left = Math.random() * 100 + "vw";
  sparkle.style.animationDuration = Math.random() * 4 + 5 + "s";
  sparkle.style.fontSize = Math.random() * 16 + 14 + "px";

  document.body.appendChild(sparkle);

  setTimeout(() => sparkle.remove(), 10000);
}

setInterval(createSparkle, 400);

/* =======================
   PARTICLES
======================= */
function createParticle() {
  const particle = document.createElement("div");
  particle.classList.add("particle");

  particle.style.left = Math.random() * 100 + "vw";
  particle.style.animationDuration = Math.random() * 6 + 4 + "s";
  particle.style.width = Math.random() * 4 + 2 + "px";
  particle.style.height = particle.style.width;

  document.body.appendChild(particle);

  setTimeout(() => particle.remove(), 10000);
}

setInterval(createParticle, 300);

/* =======================
   CLICK TO ENTER
======================= */
document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.getElementById("overlay");
  const main = document.getElementById("main-content");
  const music = document.getElementById("bgmusic");

  function startSite() {
    if (!overlay) return;

    overlay.style.opacity = "0";
    overlay.style.pointerEvents = "none";
    overlay.style.transition = "opacity 0.5s ease";

    setTimeout(() => {
      overlay.style.display = "none";
    }, 500);

    if (main) {
      main.classList.remove("hidden");
    }

    if (music) {
      music.play().catch(() => {});
    }

    document.removeEventListener("click", startSite);
  }

  document.addEventListener("click", startSite);
});
