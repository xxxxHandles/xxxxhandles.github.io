
function copyText(text) {
  navigator.clipboard.writeText(text);

  const toast = document.createElement("div");
  toast.innerText = "Copied: " + text;

  toast.style.position = "fixed";
  toast.style.bottom = "20px";
  toast.style.left = "50%";
  toast.style.transform = "translateX(-50%)";
  toast.style.background = "rgba(0,0,0,0.9)";
  toast.style.color = "white";
  toast.style.padding = "10px 15px";
  toast.style.borderRadius = "10px";
  toast.style.boxShadow = "0 0 15px red";
  toast.style.zIndex = "9999";
  toast.style.fontSize = "14px";

  document.body.appendChild(toast);

  setTimeout(() => toast.remove(), 1200);
}

/* SEARCH SYSTEM */
document.addEventListener("input", (e) => {
  if (e.target.id !== "search") return;

  const value = e.target.value.toLowerCase();
  document.querySelectorAll(".handle").forEach(item => {
    item.style.display = item.innerText.toLowerCase().includes(value)
      ? "block"
      : "none";
  });
});

/* AUTO SORT (OG FIRST) */
window.addEventListener("load", () => {
  const container = document.querySelector(".handles-container");
  if (!container) return;

  const items = Array.from(container.children);

  items.sort((a, b) => {
    const aOG = a.classList.contains("og") ? 0 : 1;
    const bOG = b.classList.contains("og") ? 0 : 1;
    return aOG - bOG;
  });

  items.forEach(item => container.appendChild(item));
});
