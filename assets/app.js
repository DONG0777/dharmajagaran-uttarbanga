// Service Worker Register
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/dharmajagaran-uttarbanga/service-worker.js")
      .then(() => console.log("Service Worker Registered"))
      .catch(err => console.log("SW registration failed:", err));
  });
}

// Mobile Menu Toggle
function toggleMenu() {
  const nav = document.getElementById("mobileNav");
  if (nav) nav.classList.toggle("open");
}

// Auto close menu on click (mobile)
document.addEventListener("click", function (e) {
  const nav = document.getElementById("mobileNav");
  const btn = document.querySelector(".menu-btn");

  if (!nav || !btn) return;

  if (!nav.contains(e.target) && !btn.contains(e.target)) {
    nav.classList.remove("open");
  }
});

// PWA Install System
let deferredPrompt;

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;

  const installBox = document.getElementById("installBox");
  if (installBox) {
    installBox.style.display = "block";
  }
});

async function installApp() {
  if (!deferredPrompt) return;

  deferredPrompt.prompt();
  await deferredPrompt.userChoice;

  deferredPrompt = null;

  const installBox = document.getElementById("installBox");
  if (installBox) {
    installBox.style.display = "none";
  }
}