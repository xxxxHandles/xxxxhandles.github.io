/* =======================
   PERSISTENT MUSIC SYSTEM
======================= */
(function() {
  if (!window.top._prettyMusic) {
    window.top._prettyMusic = new Audio("audio.mp3");
    window.top._prettyMusic.loop = true;
    window.top._prettyMusic.volume = 1.0;
  }

  const music = window.top._prettyMusic;

  // Immediately restore state
  const wasPlaying = sessionStorage.getItem("musicPlaying") === "true";
  const savedTime = sessionStorage.getItem("musicTime");

  if (savedTime && music.paused) {
    music.currentTime = parseFloat(savedTime);
  }

  if (wasPlaying) {
    music.play().catch(() => {});
  }

  // Save time frequently
  setInterval(() => {
    if (!music.paused) {
      sessionStorage.setItem("musicTime", music.currentTime);
      sessionStorage.setItem("musicPlaying", "true");
    }
  }, 250);

  // Save before unload
  window.addEventListener("beforeunload", () => {
    sessionStorage.setItem("musicTime", music.currentTime);
    sessionStorage.setItem("musicPlaying", music.paused ? "false" : "true");
  });
})();

/* =======================
   CLICK SOUND
======================= */
const clickSound = new Audio("click.mp3");
clickSound.volume = 0.3;
clickSound.preload = "auto";

const hoverSound = new Audio("hover.mp3");
hoverSound.volume = 0.15;
hoverSound.preload = "auto";

/* =======================
   COPY FUNCTION
======================= */
function copyText(text) {
  navigator.clipboard.writeText(text);

  clickSound.currentTime = 0;
  clickSound.play().catch(() => {});

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
   HOVER SOUND
======================= */
document.addEventListener("mouseover", (e) => {
  const el = e.target;
  if (el.tagName === "A" || el.closest(".handle")) {
    hoverSound.currentTime = 0;
    hoverSound.play().catch(() => {});
  }
});

/* =======================
   SPARKLES
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
  const music = window.top._prettyMusic;

  if (sessionStorage.getItem("entered") === "true") {
    if (overlay) overlay.style.display = "none";
    if (main) main.classList.remove("hidden");
    return;
  }

  function startSite() {
    if (!overlay) return;

    overlay.style.opacity = "0";
    overlay.style.pointerEvents = "none";
    overlay.style.transition = "opacity 0.3s ease";

    setTimeout(() => {
      overlay.style.display = "none";
    }, 300);

    if (main) main.classList.remove("hidden");

    sessionStorage.setItem("entered", "true");
    sessionStorage.setItem("musicPlaying", "true");

    if (music) {
      music.play().catch(() => {});
    }

    document.removeEventListener("click", startSite);
  }

  document.addEventListener("click", startSite);
});
