const header = document.querySelector("[data-header]");
const menuButton = document.querySelector("[data-menu-button]");
const nav = document.querySelector("[data-nav]");
const navSectionLinks = document.querySelectorAll('.site-nav a[href^="#"]');

const syncHeader = () => {
  header.classList.toggle("is-scrolled", window.scrollY > 120);
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
