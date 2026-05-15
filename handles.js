const hoverSound = new Audio("../hover.mp3");
const clickSound = new Audio("../click.mp3");

hoverSound.volume = 0.2;
clickSound.volume = 0.3;

/* COPY FUNCTION */
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

  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 1200);
}

/* SEARCH */
document.addEventListener("input", (e) => {
  if (e.target.id !== "search") return;

  const value = e.target.value.toLowerCase();
  document.querySelectorAll(".handle").forEach(item => {
    item.style.display = item.innerText.toLowerCase().includes(value)
      ? "block"
      : "none";
  });
});

/* HOVER SOUND */
document.addEventListener("mouseover", (e) => {
  const el = e.target.closest(".handle");
  if (!el) return;

  hoverSound.currentTime = 0;
  hoverSound.play();
});

/* AUTO SORT OG FIRST */
window.addEventListener("load", () => {
  const container = document.querySelector(".handles-container");
  if (!container) return;

  const items = Array.from(container.children);

  items.sort((a, b) => {
    return (b.classList.contains("og") ? 1 : 0) - (a.classList.contains("og") ? 1 : 0);
  });

  items.forEach(i => container.appendChild(i));
});
