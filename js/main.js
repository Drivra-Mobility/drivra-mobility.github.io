import { VENTURES, TEAM } from "./data.js";
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

function attachCardEffects() {
  app.querySelectorAll(".venture-card, .team-card").forEach((card) => {
    card.addEventListener("mousemove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      card.style.setProperty("--mx", `${(x / rect.width) * 100}%`);
      card.style.setProperty("--my", `${(y / rect.height) * 100}%`);

      if (card.classList.contains("venture-card")) {
        const rotateY = ((x / rect.width) - 0.5) * 8;
        const rotateX = (0.5 - y / rect.height) * 8;
        card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
      }
    });

    card.addEventListener("mouseleave", () => {
      if (card.classList.contains("venture-card")) {
        card.style.transform = "";
      }
    });
  });
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
  setActiveNav(route.page);
  closeMenus();
  window.scrollTo(0, 0);
  observeReveals();
  attachCardEffects();
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
