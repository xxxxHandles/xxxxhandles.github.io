const overlay = document.getElementById("overlay");
const music = document.getElementById("bgmusic");
const main = document.getElementById("main-content");

overlay.addEventListener("click", () => {
  overlay.style.display = "none";
  main.classList.remove("hidden");
  music.play();
});
