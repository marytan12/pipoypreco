const header = document.querySelector("[data-header]");
const menuButton = document.querySelector("[data-menu-button]");
const nav = document.querySelector("[data-nav]");
const navSectionLinks = document.querySelectorAll('.site-nav a[href^="#"]');
const styleName = document.querySelector("[data-style-name]");
const iconName = document.querySelector("[data-icon-name]");
const photoName = document.querySelector("[data-photo-name]");
const styleButtons = document.querySelectorAll("[data-style-option]");
const styleCards = document.querySelectorAll("[data-style-card]");
const iconButtons = document.querySelectorAll("[data-icon-option]");
const photoButtons = document.querySelectorAll("[data-photo-option]");

const styleLabels = {
  club: "Club nocturno",
  mediterranean: "Mediterraneo premium",
  editorial: "Editorial prensa",
  festival: "Festival urbano",
};

const iconLabels = {
  sharp: "Geometricos",
  rounded: "Redondeados",
  badge: "Badges",
  minimal: "Minimos",
};

const photoLabels = {
  balanced: "Equilibrado",
  gallery: "Mas fotos",
  minimal: "Menos fotos",
};

const syncHeader = () => {
  header.classList.toggle("is-scrolled", window.scrollY > 10);
};

menuButton?.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("is-open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

nav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("is-open");
    menuButton?.setAttribute("aria-expanded", "false");
  });
});

const sectionIds = Array.from(navSectionLinks)
  .map((link) => link.getAttribute("href")?.slice(1))
  .filter(Boolean);
const trackedSections = sectionIds
  .map((id) => document.getElementById(id))
  .filter(Boolean);

const setActiveNav = (activeId) => {
  navSectionLinks.forEach((link) => {
    link.classList.toggle("is-active", link.getAttribute("href") === `#${activeId}`);
  });
};

const syncActiveSection = () => {
  const headerOffset = header?.offsetHeight ?? 0;
  const checkpoint = window.scrollY + headerOffset + Math.max(80, window.innerHeight * 0.18);
  let activeId = trackedSections[0]?.id ?? "inicio";

  trackedSections.forEach((section) => {
    if (section.offsetTop <= checkpoint) {
      activeId = section.id;
    }
  });

  setActiveNav(activeId);
};

const setStyle = (style) => {
  document.body.dataset.style = style;
  localStorage.setItem("pipoypreco-style", style);
  if (styleName) {
    styleName.textContent = styleLabels[style] ?? styleLabels.club;
  }
  styleButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.styleOption === style);
  });
};

const setIconStyle = (iconStyle) => {
  document.body.dataset.icon = iconStyle;
  localStorage.setItem("pipoypreco-icon-style", iconStyle);
  if (iconName) {
    iconName.textContent = iconLabels[iconStyle] ?? iconLabels.sharp;
  }
  iconButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.iconOption === iconStyle);
  });
};

const setPhotoMode = (photoMode) => {
  document.body.dataset.photo = photoMode;
  localStorage.setItem("pipoypreco-photo-mode", photoMode);
  if (photoName) {
    photoName.textContent = photoLabels[photoMode] ?? photoLabels.balanced;
  }
  photoButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.photoOption === photoMode);
  });
};

styleButtons.forEach((button) => {
  button.addEventListener("click", () => setStyle(button.dataset.styleOption));
});

styleCards.forEach((card) => {
  card.addEventListener("click", () => setStyle(card.dataset.styleCard));
});

iconButtons.forEach((button) => {
  button.addEventListener("click", () => setIconStyle(button.dataset.iconOption));
});

photoButtons.forEach((button) => {
  button.addEventListener("click", () => setPhotoMode(button.dataset.photoOption));
});

setStyle(localStorage.getItem("pipoypreco-style") || "club");
setIconStyle(localStorage.getItem("pipoypreco-icon-style") || "sharp");
setPhotoMode(localStorage.getItem("pipoypreco-photo-mode") || "balanced");

window.addEventListener("scroll", syncHeader, { passive: true });
window.addEventListener("scroll", syncActiveSection, { passive: true });
window.addEventListener("resize", syncActiveSection);
syncHeader();
syncActiveSection();

if (window.lucide) {
  window.lucide.createIcons();
}

const revealTargets = document.querySelectorAll(
  ".section-shell, .set-cards article, .press-card, .gallery-grid figure, .proposal-grid div, .press-kit-box, .contact-form"
);

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealTargets.forEach((target) => {
    target.setAttribute("data-reveal", "");
    revealObserver.observe(target);
  });
} else {
  revealTargets.forEach((target) => target.classList.add("is-visible"));
}
