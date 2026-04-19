const overlay = document.getElementById("overlay");
const music = document.getElementById("bgmusic");
const main = document.getElementById("main-content");

music.load();

overlay.addEventListener("click", async () => {
  overlay.style.display = "none";
  main.classList.remove("hidden");

  try {
    music.currentTime = 0;
    await music.play();
  } catch (err) {
    console.log("Audio blocked:", err);
  }

  startBlood();
}, { once: true });

function startBlood() {
  setInterval(() => {
    const drop = document.createElement("div");
    drop.classList.add("blood-drop");
    drop.innerText = "🩸";

    drop.style.left = Math.random() * 100 + "vw";
    drop.style.animationDuration = (Math.random() * 3 + 2) + "s";

    document.getElementById("blood-container").appendChild(drop);

    setTimeout(() => drop.remove(), 5000);
  }, 300);
}
