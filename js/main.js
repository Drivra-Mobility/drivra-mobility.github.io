import { VENTURES } from "./data.js";
import { renderHome, renderVenture, renderAbout, renderCareers, renderContact } from "./render.js";

const app = document.getElementById("app");
const venturesToggle = document.getElementById("ventures-toggle");
const venturesDropdown = document.getElementById("ventures-dropdown");
const venturesMenu = document.getElementById("ventures-menu");
const menuToggle = document.getElementById("menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");

const SITE_NAME = "Drivra Mobility";

function parseHash() {
  const parts = (location.hash || "#/").slice(1).split("/").filter(Boolean);
  if (parts[0] === "ventures" && parts[1]) return { page: "venture", ventureId: parts[1] };
  if (parts[0] === "about") return { page: "about" };
  if (parts[0] === "careers") return { page: "careers" };
  if (parts[0] === "contact") return { page: "contact" };
  return { page: "home" };
}

function populateNav() {
  venturesMenu.innerHTML = VENTURES.map(
    (v) => `
    <a href="#/ventures/${v.id}" class="dropdown-item">
      <span class="dropdown-item-kicker">${v.category}</span>
      <span>${v.name}</span>
    </a>`
  ).join("");

  document.getElementById("mobile-ventures").innerHTML = VENTURES.map(
    (v) => `<a href="#/ventures/${v.id}" class="sub-link">${v.name}</a>`
  ).join("");

  document.getElementById("footer-ventures").innerHTML = VENTURES.map(
    (v) => `<a href="#/ventures/${v.id}" class="footer-link">${v.name}</a>`
  ).join("");
}

function closeMenus() {
  venturesDropdown.classList.remove("is-open");
  venturesMenu.hidden = true;
  venturesToggle.setAttribute("aria-expanded", "false");
  mobileMenu.hidden = true;
  menuToggle.setAttribute("aria-expanded", "false");
}

function setActiveNav(page) {
  document.querySelectorAll("[data-page]").forEach((el) => {
    el.classList.toggle("is-active", el.dataset.page === page);
  });
  venturesToggle.classList.toggle("is-active", page === "venture");
}

function titleFor(route, venture) {
  switch (route.page) {
    case "venture":
      return `${venture.name} — ${SITE_NAME}`;
    case "about":
      return `About — ${SITE_NAME}`;
    case "careers":
      return `Careers — ${SITE_NAME}`;
    case "contact":
      return `Contact — ${SITE_NAME}`;
    default:
      return `${SITE_NAME} — Nepal's mobility infrastructure`;
  }
}

function render() {
  const route = parseHash();
  const ventures = VENTURES.map((v) => ({ ...v, href: `#/ventures/${v.id}` }));
  const venture =
    route.page === "venture"
      ? ventures.find((v) => v.id === route.ventureId) || ventures[0]
      : null;

  switch (route.page) {
    case "venture":
      app.innerHTML = renderVenture(venture);
      break;
    case "about":
      app.innerHTML = renderAbout();
      break;
    case "careers":
      app.innerHTML = renderCareers();
      break;
    case "contact":
      app.innerHTML = renderContact();
      break;
    default:
      app.innerHTML = renderHome(ventures);
  }

  document.title = titleFor(route, venture);
  setActiveNav(route.page);
  closeMenus();
  window.scrollTo(0, 0);
}

venturesToggle.addEventListener("click", () => {
  const isOpen = venturesDropdown.classList.toggle("is-open");
  venturesMenu.hidden = !isOpen;
  venturesToggle.setAttribute("aria-expanded", String(isOpen));
});

menuToggle.addEventListener("click", () => {
  const isOpen = mobileMenu.hidden;
  mobileMenu.hidden = !isOpen;
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

document.addEventListener("click", (event) => {
  if (!venturesDropdown.contains(event.target)) {
    venturesDropdown.classList.remove("is-open");
    venturesMenu.hidden = true;
    venturesToggle.setAttribute("aria-expanded", "false");
  }
});

window.addEventListener("hashchange", render);

populateNav();
render();
