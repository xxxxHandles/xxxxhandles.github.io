/* =======================
   PERSISTENT MUSIC SYSTEM
======================= */
(function() {
  if (!window.top._prettyMusic) {
    window.top._prettyMusic = new Audio("audio.mp3");
    window.top._prettyMusic.loop = true;
    window.top._prettyMusic.volume = 0.8;
  }

  const music = window.top._prettyMusic;

  // Stop music on refresh
  if (performance.navigation.type === 1) {
    sessionStorage.removeItem("entered");
    sessionStorage.removeItem("musicPlaying");
    sessionStorage.removeItem("musicTime");
    if (music) {
      music.pause();
      music.currentTime = 0;
    }
  }

  // Immediately restore state
  const wasPlaying = sessionStorage.getItem("musicPlaying") === "true";
  const savedTime = sessionStorage.getItem("musicTime");

  if (savedTime && music.paused) {
    music.currentTime = parseFloat(savedTime);
  }

  if (wasPlaying && music.paused) {
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
clickSound.volume = 0.2;
clickSound.preload = "auto";

const hoverSound = new Audio("hover.mp3");
hoverSound.volume = 0.1;
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
  toast.style.background = "rgba(0, 0, 0, 0.9)";
  toast.style.color = "white";
  toast.style.padding = "10px 20px";
  toast.style.borderRadius = "8px";
  toast.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.5)";
  toast.style.zIndex = "9999";
  toast.style.fontWeight = "400";
  toast.style.fontSize = "13px";
  toast.style.letterSpacing = "1px";
  toast.style.border = "1px solid rgba(255, 255, 255, 0.1)";

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

  const emojis = ["✦", "✧", "⋆", "☆", "◌", "·"];
  sparkle.innerText = emojis[Math.floor(Math.random() * emojis.length)];

  sparkle.style.left = Math.random() * 100 + "vw";
  sparkle.style.animationDuration = Math.random() * 5 + 6 + "s";
  sparkle.style.fontSize = Math.random() * 10 + 8 + "px";

  document.body.appendChild(sparkle);
  setTimeout(() => sparkle.remove(), 12000);
}

setInterval(createSparkle, 500);

/* =======================
   PARTICLES
======================= */
function createParticle() {
  const particle = document.createElement("div");
  particle.classList.add("particle");

  particle.style.left = Math.random() * 100 + "vw";
  particle.style.animationDuration = Math.random() * 8 + 6 + "s";
  particle.style.width = Math.random() * 2 + 1 + "px";
  particle.style.height = particle.style.width;

  document.body.appendChild(particle);
  setTimeout(() => particle.remove(), 15000);
}

setInterval(createParticle, 400);

/* =======================
   CLICK TO ENTER
======================= */
document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.getElementById("overlay");
  const main = document.getElementById("main-content");
  const music = window.top._prettyMusic;

  // Check if this is a fresh page load (not from navigation)
  if (performance.navigation.type === 1) {
    sessionStorage.removeItem("entered");
    sessionStorage.removeItem("musicPlaying");
    sessionStorage.removeItem("musicTime");
    if (music) {
      music.pause();
      music.currentTime = 0;
    }
  }

  if (sessionStorage.getItem("entered") === "true") {
    if (overlay) overlay.style.display = "none";
    if (main) main.classList.remove("hidden");
    return;
  }

  function startSite() {
    if (!overlay) return;

    overlay.style.opacity = "0";
    overlay.style.pointerEvents = "none";
    overlay.style.transition = "opacity 0.4s ease";

    setTimeout(() => {
      overlay.style.display = "none";
    }, 400);

    if (main) main.classList.remove("hidden");

    sessionStorage.setItem("entered", "true");
    sessionStorage.setItem("musicPlaying", "true");

    if (music) {
      music.currentTime = 0;
      music.play().catch(() => {});
    }

    document.removeEventListener("click", startSite);
  }

  document.addEventListener("click", startSite);
});
