function copyText(text) {
  navigator.clipboard.writeText(text);

  // clean toast popup
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
  const items = document.querySelectorAll(".handle");

  items.forEach(item => {
    const text = item.innerText.toLowerCase();
    item.style.display = text.includes(value) ? "block" : "none";
  });
});
