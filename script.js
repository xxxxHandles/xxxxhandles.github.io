const overlay = document.getElementById("overlay");
const music = document.getElementById("bgmusic");
const main = document.getElementById("main-content");

// important for iOS
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
}, { once: true });
