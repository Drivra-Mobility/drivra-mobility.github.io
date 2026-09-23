import { VENTURES, TEAM } from "./data.js";
import { renderHome, renderVenture, renderAbout, renderCareers, renderContact } from "./render.js";

const app = document.getElementById("app");
const venturesToggle = document.getElementById("ventures-toggle");
const venturesDropdown = document.getElementById("ventures-dropdown");
const venturesMenu = document.getElementById("ventures-menu");
const menuToggle = document.getElementById("menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");

const SITE_NAME = "Drivra Mobility";

function parseLocation() {
  const parts = location.pathname.split("/").filter(Boolean);
  if (parts[0] === "ventures" && parts[1]) return { page: "venture", ventureId: parts[1] };
  if (parts[0] === "about") return { page: "about" };
  if (parts[0] === "careers") return { page: "careers" };
  if (parts[0] === "contact") return { page: "contact" };
  return { page: "home" };
}

function populateNav() {
  venturesMenu.innerHTML = VENTURES.map(
    (v) => `
    <a href="/ventures/${v.id}" class="dropdown-item">
      <span class="dropdown-item-kicker">${v.category}</span>
      <span>${v.name}</span>
    </a>`
  ).join("");

  document.getElementById("mobile-ventures").innerHTML = VENTURES.map(
    (v) => `<a href="/ventures/${v.id}" class="sub-link">${v.name}</a>`
  ).join("");

  document.getElementById("footer-ventures").innerHTML = VENTURES.map(
    (v) => `<a href="/ventures/${v.id}" class="footer-link">${v.name}</a>`
  ).join("");
}

function closeMenus() {
  venturesDropdown.classList.remove("is-open");
  venturesMenu.hidden = true;
  venturesToggle.setAttribute("aria-expanded", "false");
  mobileMenu.hidden = true;
  menuToggle.setAttribute("aria-expanded", "false");
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
);

function observeReveals() {
  app.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));
}

function setActiveNav(page) {
  document.querySelectorAll("[data-page]").forEach((el) => {
    el.classList.toggle("is-active", el.dataset.page === page);
  });
  venturesToggle.classList.toggle("is-active", page === "venture");

  const active = document.querySelector(".nav-links .is-active");
  if (active) moveNavIndicator(active);
}

function titleFor(route, venture) {
  switch (route.page) {
    case "venture":
      return `${venture.name} | ${SITE_NAME}`;
    case "about":
      return `About | ${SITE_NAME}`;
    case "careers":
      return `Careers | ${SITE_NAME}`;
    case "contact":
      return `Contact | ${SITE_NAME}`;
    default:
      return `${SITE_NAME} | Nepal's mobility infrastructure`;
  }
}

function truncate(text, max) {
  return text.length <= max ? text : `${text.slice(0, max - 1).trimEnd()}…`;
}

function descriptionFor(route, venture) {
  switch (route.page) {
    case "venture":
      return truncate(`${venture.tagline} ${venture.body}`, 160);
    case "about":
      return "Our vision is to build Nepal's leading mobility infrastructure company, enabling ride-hailing, delivery, logistics, EV fleets and future transportation services through technology, operations and strategic partnerships.";
    case "careers":
      return "We're growing across every venture, from fleet operations to technology to trading. If you want to build mobility infrastructure for Nepal, we want to hear from you.";
    case "contact":
      return "Contact Drivra Mobility: office, phone and email details for Kathmandu, Nepal.";
    default:
      return "We operate fleets, build technology and trade vehicles across ride-hailing, delivery, financing and electric mobility. One company, several ventures, all built for Nepal's roads.";
  }
}

function canonicalFor(route, venture) {
  const base = "https://www.drivra.com.np";
  switch (route.page) {
    case "venture":
      return `${base}/ventures/${venture.id}`;
    case "about":
      return `${base}/about`;
    case "careers":
      return `${base}/careers`;
    case "contact":
      return `${base}/contact`;
    default:
      return `${base}/`;
  }
}

function render() {
  const route = parseLocation();
  const ventures = VENTURES.map((v) => ({ ...v, href: `/ventures/${v.id}` }));
  const venture =
    route.page === "venture"
      ? ventures.find((v) => v.id === route.ventureId) || ventures[0]
      : null;

  switch (route.page) {
    case "venture":
      app.innerHTML = renderVenture(venture);
      break;
    case "about":
      app.innerHTML = renderAbout(TEAM);
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
  document.getElementById("meta-description").setAttribute("content", descriptionFor(route, venture));
  document.getElementById("canonical-link").setAttribute("href", canonicalFor(route, venture));
  setActiveNav(route.page);
  closeMenus();
  window.scrollTo(0, 0);
  observeReveals();
}

function navigate(path) {
  if (location.pathname === path) return;
  history.pushState(null, "", path);
  render();
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

document.addEventListener("click", (event) => {
  if (event.defaultPrevented || event.button !== 0) return;
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  const link = event.target.closest("a");
  if (!link || link.target === "_blank") return;
  const href = link.getAttribute("href");
  if (!href || /^(#|https?:|mailto:|tel:)/.test(href)) return;
  event.preventDefault();
  navigate(href);
});

window.addEventListener("popstate", render);

document.documentElement.classList.add("js-reveal");

const siteHeader = document.querySelector(".site-header");
const scrollProgress = document.getElementById("scroll-progress");
function updateHeaderScrollState() {
  siteHeader.classList.toggle("is-scrolled", window.scrollY > 8);
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
  scrollProgress.style.width = `${pct}%`;
}
window.addEventListener("scroll", updateHeaderScrollState, { passive: true });

const navIndicator = document.getElementById("nav-indicator");
const navLinksEl = document.querySelector(".nav-links");
function moveNavIndicator(target) {
  if (!target) return;
  const navRect = navLinksEl.getBoundingClientRect();
  const rect = target.getBoundingClientRect();
  navIndicator.style.width = `${rect.width}px`;
  navIndicator.style.transform = `translateX(${rect.left - navRect.left}px)`;
}
navLinksEl.querySelectorAll(":scope > a, :scope > .nav-dropdown > button").forEach((el) => {
  el.addEventListener("mouseenter", () => moveNavIndicator(el));
});
navLinksEl.addEventListener("mouseleave", () => {
  const active = navLinksEl.querySelector(".is-active");
  if (active) moveNavIndicator(active);
  else navIndicator.style.opacity = "0";
});

populateNav();
render();
updateHeaderScrollState();
