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
   CLICK TO ENTER (ONE TIME ONLY)
======================= */
document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.getElementById("overlay");
  const main = document.getElementById("main-content");
  const music = document.getElementById("bgmusic");

  // Check if user already entered this session
  if (sessionStorage.getItem("entered") === "true") {
    // Skip overlay
    if (overlay) {
      overlay.style.display = "none";
    }
    if (main) {
      main.classList.remove("hidden");
    }
    // Resume music from where it left off
    if (music) {
      const savedTime = sessionStorage.getItem("musicTime");
      if (savedTime) {
        music.currentTime = parseFloat(savedTime);
      }
      music.play().catch(() => {});
    }
    return;
  }

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

    // Save that user entered
    sessionStorage.setItem("entered", "true");

    if (music) {
      music.play().catch(() => {});
    }

    document.removeEventListener("click", startSite);
  }

  document.addEventListener("click", startSite);
});

// Save music time when leaving the page
window.addEventListener("beforeunload", () => {
  const music = document.getElementById("bgmusic");
  if (music && !music.paused) {
    sessionStorage.setItem("musicTime", music.currentTime);
  }
});
