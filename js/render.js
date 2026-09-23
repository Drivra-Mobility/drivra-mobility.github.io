// HTML templates for each route. Pure functions: data in, markup out.

function photoSlot(placeholder, extraClass = "", photo = "") {
  const src = photo || "assets/logo.png";
  const cls = photo ? `photo-slot photo-slot-filled ${extraClass}` : `photo-slot ${extraClass}`;
  return `
    <div class="${cls}">
      <img src="${src}" alt="${placeholder}" loading="lazy">
    </div>`;
}

function ventureCard(v, i) {
  const media = v.photo
    ? `<div class="venture-row-media"><img src="${v.photo}" alt="${v.name}" loading="lazy"></div>`
    : "";
  return `
    <a href="#/ventures/${v.id}" class="venture-row reveal" style="transition-delay:${i * 60}ms">
      <span class="venture-row-index">${String(i + 1).padStart(2, "0")}</span>
      <div class="venture-row-main">
        <span class="card-kicker">${v.category}</span>
        <h3 class="card-title">${v.name}</h3>
        <p class="card-body">${v.tagline}</p>
      </div>
      ${media}
      <span class="card-link">Learn more →</span>
    </a>`;
}

export function renderHome(ventures) {
  return `
    <section class="home-hero">
      <div class="reveal">
        <p class="hero-kicker">DRIVRA MOBILITY</p>
        <h1 class="hero-title">Nepal's mobility infrastructure, built end to end.</h1>
        <p class="hero-body">We operate fleets, build technology and trade vehicles — across ride-hailing, delivery, financing and electric mobility. One company, several ventures, all built for Nepal's roads.</p>
        <div class="hero-cta-row">
          <a href="#ventures" class="btn btn-primary">See our ventures</a>
          <a href="#/contact" class="btn btn-secondary">Partner with us</a>
        </div>
      </div>
      <div class="hero-visual reveal">
        <svg class="hero-graphic" viewBox="0 0 600 460" role="img" aria-hidden="true">
          <style>
            .hg-grid { stroke: var(--color-divider); stroke-width: 1; }
            .hg-route { stroke: var(--color-faint); stroke-width: 1.5; fill: none; }
            .hg-node { fill: var(--color-bg); stroke: var(--color-text); stroke-width: 1.5; }
            .hg-hub { fill: var(--color-accent); }
            .hg-hub-major { fill: var(--color-accent-700); }
            .hg-ring { stroke: var(--color-accent); stroke-width: 1; stroke-dasharray: 2 6; fill: none; }
          </style>
          <g class="hg-grid">
            <line x1="20" y1="0" x2="20" y2="460"></line>
            <line x1="80" y1="0" x2="80" y2="460"></line>
            <line x1="140" y1="0" x2="140" y2="460"></line>
            <line x1="200" y1="0" x2="200" y2="460"></line>
            <line x1="260" y1="0" x2="260" y2="460"></line>
            <line x1="320" y1="0" x2="320" y2="460"></line>
            <line x1="380" y1="0" x2="380" y2="460"></line>
            <line x1="440" y1="0" x2="440" y2="460"></line>
            <line x1="500" y1="0" x2="500" y2="460"></line>
            <line x1="560" y1="0" x2="560" y2="460"></line>
            <line x1="0" y1="20" x2="600" y2="20"></line>
            <line x1="0" y1="80" x2="600" y2="80"></line>
            <line x1="0" y1="140" x2="600" y2="140"></line>
            <line x1="0" y1="200" x2="600" y2="200"></line>
            <line x1="0" y1="260" x2="600" y2="260"></line>
            <line x1="0" y1="320" x2="600" y2="320"></line>
            <line x1="0" y1="380" x2="600" y2="380"></line>
            <line x1="0" y1="440" x2="600" y2="440"></line>
          </g>
          <path class="hg-route" d="M80,380 L80,260 L200,260 L200,140 L320,140 L320,80 L440,80 L440,200 L560,200"></path>
          <path class="hg-route" d="M200,260 L200,340"></path>
          <path class="hg-route" d="M320,140 L320,220"></path>
          <path class="hg-route" d="M80,260 L20,260"></path>
          <circle class="hg-ring" cx="440" cy="80" r="32"></circle>
          <circle class="hg-node" cx="80" cy="380" r="4"></circle>
          <circle class="hg-node" cx="80" cy="260" r="4"></circle>
          <circle class="hg-node" cx="20" cy="260" r="3"></circle>
          <circle class="hg-hub" cx="200" cy="260" r="7"></circle>
          <circle class="hg-node" cx="200" cy="340" r="3"></circle>
          <circle class="hg-node" cx="200" cy="140" r="4"></circle>
          <circle class="hg-node" cx="320" cy="140" r="4"></circle>
          <circle class="hg-node" cx="320" cy="220" r="3"></circle>
          <circle class="hg-node" cx="320" cy="80" r="4"></circle>
          <circle class="hg-hub-major" cx="440" cy="80" r="9"></circle>
          <circle class="hg-node" cx="440" cy="200" r="4"></circle>
          <circle class="hg-hub" cx="560" cy="200" r="6"></circle>
        </svg>
      </div>
    </section>

    <section class="section" id="ventures">
      <div class="section-head reveal">
        <div class="section-head-text">
          <p class="kicker">What we build</p>
          <h2 class="section-title">Five ventures, one mobility platform.</h2>
        </div>
      </div>
      <div class="venture-list">
        ${ventures.map(ventureCard).join("")}
      </div>
    </section>

    <section class="section">
      <div class="section-head reveal">
        <div class="section-head-text">
          <p class="kicker">How it fits together</p>
          <h2 class="section-title">Our platform runs on three pillars.</h2>
        </div>
      </div>
      <div class="mission-grid">
        <div class="mission-col reveal" style="transition-delay:0ms">
          <span class="mission-index">01</span>
          <h4>Operations</h4>
          <p>Fleet operation</p>
          <p>Ride-hailing partner network</p>
        </div>
        <div class="mission-col reveal" style="transition-delay:60ms">
          <span class="mission-index">02</span>
          <h4>Technology</h4>
          <p>Fleet management systems</p>
          <p>Delivery &amp; logistics technology</p>
          <p>Mobility fintech</p>
        </div>
        <div class="mission-col reveal" style="transition-delay:120ms">
          <span class="mission-index">03</span>
          <h4>Trading</h4>
          <p>Vehicle import &amp; export</p>
          <p>Charging stations</p>
        </div>
      </div>
    </section>

    <section class="poster reveal">
      <div class="poster-inner">
        <h2>Building Nepal's mobility infrastructure.</h2>
        <a href="#/contact" class="btn">Get in touch</a>
      </div>
    </section>`;
}

export function renderVenture(v) {
  const cta = `
        <div class="cta-block">
          <a href="#/contact" class="btn btn-primary">Get in touch</a>
        </div>`;

  const driveToOwn = v.driveToOwn
    ? `
    <section class="section">
      <div class="section-head">
        <div class="section-head-text">
          <p class="kicker">How drive-to-own works</p>
          <h2 class="section-title">Drive on the platform, make structured payments, own the vehicle.</h2>
        </div>
      </div>
      <div class="mission-grid">
        ${v.driveToOwn.steps
          .map(
            (s, i) => `
          <div class="mission-col reveal" style="transition-delay:${i * 60}ms">
            <span class="mission-index">${String(i + 1).padStart(2, "0")}</span>
            <h4>${s.title}</h4>
            <p>${s.body}</p>
          </div>`
          )
          .join("")}
      </div>
      <div class="venture-body-grid">
        <div>
          <h3 class="subhead">Why drive-to-own</h3>
          ${v.driveToOwn.highlights.map((h) => `<p class="audience-item">${h}</p>`).join("")}
        </div>
      </div>
    </section>`
    : "";

  return `
    <section class="venture-hero reveal">
      <a href="#/" class="back-link">← All ventures</a>
      <span class="hero-kicker">${v.category}</span>
      <h1 class="venture-title">${v.name}</h1>
      <p class="hero-body">${v.tagline}</p>
      ${v.tag ? `<span class="status-label">${v.tag}</span>` : ""}
    </section>

    <section class="venture-photo-section">
      ${photoSlot(v.photoPlaceholder, "reveal", v.photo)}
    </section>

    <section class="section venture-body-section">
      <div class="venture-body-grid">
        <div class="reveal">
          <h3 class="subhead">What it is</h3>
          <p class="body-text">${v.body}</p>
        </div>
        <div class="reveal" style="transition-delay:70ms">
          <h3 class="subhead">Who it's for</h3>
          ${v.audienceFor.map((a) => `<p class="audience-item">${a}</p>`).join("")}
        </div>
      </div>
      ${cta}
    </section>
    ${driveToOwn}`;
}

function teamCard(member, i) {
  return `
    <div class="team-row reveal" style="transition-delay:${i * 60}ms">
      <div>
        <p class="team-mark">${member.initials}</p>
        <h3 class="team-name">${member.name}</h3>
        <p class="team-role">${member.role}</p>
      </div>
      <p class="team-bio">${member.bio}</p>
    </div>`;
}

export function renderAbout(team = []) {
  return `
    <section class="page-hero reveal">
      <p class="hero-kicker">ABOUT DRIVRA</p>
      <h1 class="page-title">Our vision</h1>
      <p class="hero-body">Our vision is to build Nepal's leading mobility infrastructure company, enabling ride-hailing, delivery, logistics, EV fleets and future transportation services through technology, operations and strategic partnerships.</p>
    </section>

    <section class="section">
      <div class="section-head reveal">
        <div class="section-head-text">
          <p class="kicker">Who's building it</p>
          <h2 class="section-title">The team behind Drivra Mobility.</h2>
        </div>
      </div>
      <div class="team-list">
        ${team.map(teamCard).join("")}
      </div>
    </section>`;
}

export function renderCareers() {
  return `
    <section class="page-hero reveal">
      <p class="hero-kicker">CAREERS</p>
      <h1 class="page-title">Build with us</h1>
      <p class="hero-body">We're growing across every venture — from fleet operations to technology to trading. If you want to build mobility infrastructure for Nepal, we want to hear from you.</p>
    </section>

    <section class="section">
      <div class="role-list reveal">
        <span class="role-item">Driver partners</span>
        <span class="role-item">Operations</span>
        <span class="role-item">Engineering</span>
        <span class="role-item">Business development</span>
      </div>
      <div class="cta-block reveal" style="transition-delay:60ms">
        <a href="mailto:salina0124@gmail.com" class="btn btn-primary">Send us your CV</a>
      </div>
    </section>`;
}

export function renderContact() {
  return `
    <section class="page-hero reveal">
      <p class="hero-kicker">CONTACT</p>
      <h1 class="page-title">Get in touch</h1>
    </section>

    <section class="section">
      <div class="contact-grid">
        <div class="reveal">
          <h3 class="subhead">Office</h3>
          <p class="body-text">Chandol Chowk, Kathmandu - 04, Nepal</p>

          <h3 class="subhead subhead-spaced">Phone</h3>
          <p class="body-text"><a href="tel:+9779768601858" class="inline-link">+977-9768601858</a></p>
          <p class="body-text"><a href="tel:+9779768601859" class="inline-link">+977-9768601859</a></p>

          <h3 class="subhead subhead-spaced">General &amp; careers</h3>
          <p class="body-text"><a href="mailto:salina0124@gmail.com" class="inline-link">salina0124@gmail.com</a></p>

          <h3 class="subhead subhead-spaced">Partnerships &amp; investment</h3>
          <p class="body-text"><a href="mailto:sandeep.sharma@adhyayan.edu.np" class="inline-link">sandeep.sharma@adhyayan.edu.np</a></p>
        </div>
        <div class="map-container reveal" style="transition-delay:70ms">
          <iframe
            src="https://www.google.com/maps?q=27.725153866044774,85.33718287246091&z=17&output=embed"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            class="embed-frame map-frame"></iframe>
        </div>
      </div>
    </section>`;
}
