const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    nav.classList.toggle("active");
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("active");
    });
  });
}

/* reveal on scroll */
const revealItems = document.querySelectorAll(".reveal");

const revealOnScroll = () => {
  revealItems.forEach((item) => {
    const rect = item.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80) {
      item.classList.add("show");
    }
  });
};

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

/* lightbox for gallery */
const lightbox = document.getElementById("lightbox");
const lightboxContent = document.getElementById("lightboxContent");
const lightboxClose = document.getElementById("lightboxClose");
const triggers = document.querySelectorAll(".lightbox-trigger");

triggers.forEach((trigger) => {
  trigger.addEventListener("click", () => {
    const type = trigger.getAttribute("data-type");
    const src = trigger.getAttribute("data-src");

    if (!lightbox || !lightboxContent) return;

    lightboxContent.innerHTML = "";

    if (type === "image") {
      const img = document.createElement("img");
      img.src = src;
      img.alt = "Invitation preview";
      lightboxContent.appendChild(img);
    }

    if (type === "video") {
      const video = document.createElement("video");
      video.src = src;
      video.controls = true;
      video.autoplay = true;
      video.playsInline = true;
      lightboxContent.appendChild(video);
    }

    lightbox.classList.add("active");
    document.body.style.overflow = "hidden";
  });
});

if (lightboxClose) {
  lightboxClose.addEventListener("click", closeLightbox);
}

if (lightbox) {
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeLightbox();
  }
});

function closeLightbox() {
  if (!lightbox || !lightboxContent) return;
  lightbox.classList.remove("active");
  lightboxContent.innerHTML = "";
  document.body.style.overflow = "";
}