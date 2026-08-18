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
  const photo = v.photo
    ? `<div class="card-photo"><img src="${v.photo}" alt="${v.name}" loading="lazy"></div>`
    : "";
  return `
    <a href="#/ventures/${v.id}" class="venture-card reveal" style="transition-delay:${i * 70}ms">
      ${photo}
      <div class="venture-card-body">
        <span class="card-kicker">${v.category}</span>
        <h3 class="card-title">${v.name}</h3>
        <p class="card-body">${v.tagline}</p>
        <span class="card-link">Learn more →</span>
      </div>
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
          <a href="#/careers" class="btn btn-primary">See our ventures</a>
          <a href="#/contact" class="btn btn-secondary">Partner with us</a>
        </div>
      </div>
      <div class="hero-visual reveal">
        <img src="assets/hero-fleet.png" alt="Truck, motorcycle, sedan and van from the Drivra Mobility fleet" loading="lazy">
      </div>
    </section>

    <section class="section">
      <div class="section-head reveal">
        <h2 class="section-title">What we build</h2>
        <p class="section-sub">Five ventures, one mobility platform.</p>
      </div>
      <div class="venture-grid">
        ${ventures.map(ventureCard).join("")}
      </div>
    </section>

    <hr class="divider">

    <section class="section">
      <div class="section-head reveal">
        <h2 class="section-title">How it fits together</h2>
        <p class="section-sub">Our platform runs on three pillars.</p>
      </div>
      <div class="mission-grid">
        <div class="mission-col reveal" style="transition-delay:0ms">
          <h4>Operations</h4>
          <p>Fleet operation</p>
          <p>Ride-hailing partner network</p>
        </div>
        <div class="mission-col reveal" style="transition-delay:70ms">
          <h4>Technology</h4>
          <p>Fleet management systems</p>
          <p>Delivery &amp; logistics technology</p>
          <p>Mobility fintech</p>
        </div>
        <div class="mission-col reveal" style="transition-delay:140ms">
          <h4>Trading</h4>
          <p>Vehicle import &amp; export</p>
          <p>Charging stations</p>
        </div>
      </div>
    </section>

    <section class="poster reveal">
      <h2>Building Nepal's mobility infrastructure.</h2>
      <a href="#/contact" class="btn">Get in touch</a>
    </section>`;
}

export function renderVenture(v) {
  const cta =
    v.id === "fleet"
      ? `
        <div class="cta-block">
          <h3 class="subhead">Apply to drive</h3>
          <p class="body-text">Fill out the form below and our team will reach out within 24-48 hours.</p>
          <div class="form-container">
            <iframe
              src="https://forms.fleet.yango.com/forms?ref_id=d9da92d45ca44801bdc8cf556e853f08&specification=taxi"
              title="Driver Registration Form"
              loading="lazy"
              class="embed-frame"></iframe>
          </div>
        </div>`
      : `
        <div class="cta-block">
          <a href="#/contact" class="btn btn-primary">Get in touch</a>
        </div>`;

  const driveToOwn = v.driveToOwn
    ? `
    <hr class="divider">

    <section class="section">
      <div class="section-head">
        <h2 class="section-title">How drive-to-own works</h2>
        <p class="section-sub">Drive on the platform, make structured payments, own the vehicle.</p>
      </div>
      <div class="mission-grid">
        ${v.driveToOwn.steps
          .map(
            (s, i) => `
          <div class="mission-col reveal" style="transition-delay:${i * 70}ms">
            <h4>${i + 1}. ${s.title}</h4>
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
      ${v.tag ? `<span class="tag-outline">${v.tag}</span>` : ""}
    </section>

    <section class="venture-photo-section">
      ${photoSlot(v.photoPlaceholder, "reveal", v.photo)}
    </section>

    <section class="section">
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
    <div class="team-card reveal" style="transition-delay:${i * 70}ms">
      <div class="team-avatar">${member.initials}</div>
      <h3 class="team-name">${member.name}</h3>
      <p class="team-role">${member.role}</p>
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
        <h2 class="section-title">Who's building it</h2>
        <p class="section-sub">The team behind Drivra Mobility.</p>
      </div>
      <div class="team-grid">
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
      <div class="tag-row reveal">
        <span class="tag-accent">Driver partners</span>
        <span class="tag-accent">Operations</span>
        <span class="tag-accent">Engineering</span>
        <span class="tag-accent">Business development</span>
      </div>
      <div class="cta-block reveal" style="transition-delay:70ms">
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
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14130.863663703625!2d85.31061547832032!3d27.700769237502043!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb18fcb77fd4bd%3A0x58099a1deffed8d3!2sKathmandu%2044600%2C%20Nepal!5e0!3m2!1sen!2snp!4v1699000000000!5m2!1sen!2snp"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            class="embed-frame map-frame"></iframe>
        </div>
      </div>
    </section>`;
}
