const header = document.querySelector("[data-header]");
const menuButton = document.querySelector("[data-menu-button]");
const nav = document.querySelector("[data-nav]");
const styleName = document.querySelector("[data-style-name]");
const styleButtons = document.querySelectorAll("[data-style-option]");
const styleCards = document.querySelectorAll("[data-style-card]");

const styleLabels = {
  club: "Club nocturno",
  mediterranean: "Mediterraneo premium",
  editorial: "Editorial prensa",
  festival: "Festival urbano",
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

styleButtons.forEach((button) => {
  button.addEventListener("click", () => setStyle(button.dataset.styleOption));
});

styleCards.forEach((card) => {
  card.addEventListener("click", () => setStyle(card.dataset.styleCard));
});

setStyle(localStorage.getItem("pipoypreco-style") || "club");

window.addEventListener("scroll", syncHeader, { passive: true });
syncHeader();

if (window.lucide) {
  window.lucide.createIcons();
}
