/* =======================
   PERSISTENT MUSIC SYSTEM
======================= */
(function() {
  if (!window.top._prettyMusic) {
    window.top._prettyMusic = new Audio("../audio.mp3");
    window.top._prettyMusic.loop = true;
    window.top._prettyMusic.volume = 1.0;
  }

  const music = window.top._prettyMusic;

  // Redirect to hub on refresh
  if (performance.navigation.type === 1) {
    sessionStorage.removeItem("entered");
    if (music) {
      music.pause();
      music.currentTime = 0;
    }
    sessionStorage.removeItem("musicPlaying");
    sessionStorage.removeItem("musicTime");
    window.location.href = "../index.html";
    return;
  }

  const wasPlaying = sessionStorage.getItem("musicPlaying") === "true";
  const savedTime = sessionStorage.getItem("musicTime");

  if (savedTime && music.paused) {
    music.currentTime = parseFloat(savedTime);
  }

  if (wasPlaying && music.paused) {
    music.play().catch(() => {});
  }

  setInterval(() => {
    if (!music.paused) {
      sessionStorage.setItem("musicTime", music.currentTime);
      sessionStorage.setItem("musicPlaying", "true");
    }
  }, 250);

  window.addEventListener("beforeunload", () => {
    sessionStorage.setItem("musicTime", music.currentTime);
    sessionStorage.setItem("musicPlaying", music.paused ? "false" : "true");
  });
})();

/* =======================
   CLICK & HOVER SOUNDS
======================= */
const clickSound = new Audio("../click.mp3");
clickSound.volume = 0.3;
clickSound.preload = "auto";

const hoverSound = new Audio("../hover.mp3");
hoverSound.volume = 0.2;
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

  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 1200);
}

/* =======================
   SEARCH
======================= */
document.addEventListener("input", (e) => {
  if (e.target.id !== "search") return;

  const value = e.target.value.toLowerCase();
  document.querySelectorAll(".handle").forEach(item => {
    item.style.display = item.innerText.toLowerCase().includes(value)
      ? "block"
      : "none";
  });
});

/* =======================
   HOVER SOUND
======================= */
document.addEventListener("mouseover", (e) => {
  const el = e.target.closest(".handle");
  if (!el) return;

  hoverSound.currentTime = 0;
  hoverSound.play().catch(() => {});
});

/* =======================
   AUTO SORT OG FIRST
======================= */
window.addEventListener("load", () => {
  const container = document.querySelector(".handles-container");
  if (!container) return;

  const items = Array.from(container.children);

  items.sort((a, b) => {
    return (b.classList.contains("og") ? 1 : 0) - (a.classList.contains("og") ? 1 : 0);
  });

  items.forEach(i => container.appendChild(i));
});
