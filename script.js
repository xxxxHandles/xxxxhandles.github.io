const overlay = document.getElementById("overlay");
const music = document.getElementById("bgmusic");
const main = document.getElementById("main-content");

music.load();

/* click start */
overlay.addEventListener("click", async () => {
  overlay.style.display = "none";
  main.classList.remove("hidden");

  try {
    await music.play();
  } catch (err) {}

  startBlood();
  startParticles();
}, { once: true });

/* blood */
function startBlood() {
  setInterval(() => {
    const drop = document.createElement("div");
    drop.classList.add("blood-drop");
    drop.innerText = "🩸";

    drop.style.left = Math.random() * 100 + "vw";
    drop.style.animationDuration = (Math.random() * 3 + 2) + "s";

    document.body.appendChild(drop);
    setTimeout(() => drop.remove(), 5000);
  }, 300);
}

/* floating particles */
function startParticles() {
  for (let i = 0; i < 40; i++) {
    const p = document.createElement("div");
    p.classList.add("particle");

    p.style.left = Math.random() * 100 + "vw";
    p.style.animationDuration = (5 + Math.random() * 10) + "s";
    p.style.opacity = Math.random();

    document.body.appendChild(p);
  }
}

/* hover sound (subtle) */
const hoverSound = new Audio("https://www.soundjay.com/buttons/sounds/button-09.mp3");
hoverSound.volume = 0.2;

document.addEventListener("mouseover", (e) => {
  if (e.target.tagName === "A") {
    hoverSound.currentTime = 0;
    hoverSound.play().catch(() => {});
  }
});
