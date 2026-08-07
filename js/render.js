// HTML templates for each route. Pure functions: data in, markup out.

function photoSlot(placeholder, extraClass = "") {
  return `
    <div class="photo-slot ${extraClass}">
      <img src="assets/logo.png" alt="${placeholder}" loading="lazy">
    </div>`;
}

function ventureCard(v) {
  return `
    <a href="#/ventures/${v.id}" class="venture-card">
      <span class="card-kicker">${v.category}</span>
      <h3 class="card-title">${v.name}</h3>
      <p class="card-body">${v.tagline}</p>
      <span class="card-link">Learn more →</span>
    </a>`;
}

export function renderHome(ventures) {
  return `
    <section class="home-hero">
      <div>
        <p class="hero-kicker">DRIVRA MOBILITY</p>
        <h1 class="hero-title">Nepal's mobility infrastructure, built venture by venture.</h1>
        <p class="hero-body">We operate fleets, build technology and trade vehicles — across ride-hailing, delivery, financing and electric mobility. One company, several ventures, all built for Nepal's roads.</p>
        <div class="hero-cta-row">
          <a href="#/careers" class="btn btn-primary">See our ventures</a>
          <a href="#/contact" class="btn btn-secondary">Partner with us</a>
        </div>
      </div>
      ${photoSlot("Fleet / rider photo")}
    </section>

    <section class="section">
      <div class="section-head">
        <h2 class="section-title">What we build</h2>
        <p class="section-sub">Five ventures, one mobility platform.</p>
      </div>
      <div class="venture-grid">
        ${ventures.map(ventureCard).join("")}
      </div>
    </section>

    <hr class="divider">

    <section class="section">
      <div class="section-head">
        <h2 class="section-title">How it fits together</h2>
        <p class="section-sub">Our platform runs on three pillars.</p>
      </div>
      <div class="mission-grid">
        <div class="mission-col">
          <h4>Operations</h4>
          <p>Fleet operation</p>
          <p>Ride-hailing partner network</p>
        </div>
        <div class="mission-col">
          <h4>Technology</h4>
          <p>Fleet management systems</p>
          <p>Delivery &amp; logistics technology</p>
          <p>Mobility fintech</p>
        </div>
        <div class="mission-col">
          <h4>Trading</h4>
          <p>Vehicle import &amp; export</p>
          <p>Charging stations</p>
        </div>
      </div>
    </section>

    <section class="poster">
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

  return `
    <section class="venture-hero">
      <a href="#/" class="back-link">← All ventures</a>
      <span class="hero-kicker">${v.category}</span>
      <h1 class="venture-title">${v.name}</h1>
      <p class="hero-body">${v.tagline}</p>
      ${v.tag ? `<span class="tag-outline">${v.tag}</span>` : ""}
    </section>

    <section class="venture-photo-section">
      ${photoSlot(v.photoPlaceholder)}
    </section>

    <section class="section">
      <div class="venture-body-grid">
        <div>
          <h3 class="subhead">What it is</h3>
          <p class="body-text">${v.body}</p>
        </div>
        <div>
          <h3 class="subhead">Who it's for</h3>
          ${v.audienceFor.map((a) => `<p class="audience-item">${a}</p>`).join("")}
        </div>
      </div>
      ${cta}
    </section>`;
}

export function renderAbout(team) {
  return `
    <section class="page-hero">
      <p class="hero-kicker">ABOUT DRIVRA</p>
      <h1 class="page-title">Our vision</h1>
      <p class="hero-body">Our vision is to build Nepal's leading mobility infrastructure company, enabling ride-hailing, delivery, logistics, EV fleets and future transportation services through technology, operations and strategic partnerships.</p>
    </section>

    <section class="venture-photo-section">
      ${photoSlot("Team / office photo")}
    </section>

    <hr class="divider">

    <section class="section">
      <div class="section-head">
        <h2 class="section-title">Team</h2>
      </div>
      <div class="team-grid">
        ${team
          .map(
            (p) => `
          <div class="team-card">
            <div class="team-avatar">${p.initials}</div>
            <h4 class="team-name">${p.name}</h4>
            <p class="team-role">${p.role}</p>
            <p class="team-bio">${p.bio}</p>
          </div>`
          )
          .join("")}
      </div>
    </section>`;
}

export function renderCareers() {
  return `
    <section class="page-hero">
      <p class="hero-kicker">CAREERS</p>
      <h1 class="page-title">Build with us</h1>
      <p class="hero-body">We're growing across every venture — from fleet operations to technology to trading. If you want to build mobility infrastructure for Nepal, we want to hear from you.</p>
    </section>

    <section class="section">
      <div class="tag-row">
        <span class="tag-accent">Driver partners</span>
        <span class="tag-accent">Operations</span>
        <span class="tag-accent">Engineering</span>
        <span class="tag-accent">Business development</span>
      </div>
      <div class="cta-block">
        <a href="mailto:salina0124@gmail.com" class="btn btn-primary">Send us your CV</a>
      </div>
    </section>`;
}

export function renderContact() {
  return `
    <section class="page-hero">
      <p class="hero-kicker">CONTACT</p>
      <h1 class="page-title">Get in touch</h1>
    </section>

    <section class="section">
      <div class="contact-grid">
        <div>
          <h3 class="subhead">Office</h3>
          <p class="body-text">Chandol Chowk, Kathmandu - 04, Nepal</p>

          <h3 class="subhead subhead-spaced">Phone</h3>
          <p class="body-text"><a href="tel:+9779768601858" class="inline-link">+977-9768601858</a></p>
          <p class="body-text"><a href="tel:+9779768601859" class="inline-link">+977-9768601859</a></p>

          <h3 class="subhead subhead-spaced">General &amp; careers</h3>
          <p class="body-text"><a href="mailto:salina0124@gmail.com" class="inline-link">salina0124@gmail.com</a> — Salina Sharma, CEO</p>

          <h3 class="subhead subhead-spaced">Partnerships &amp; investment</h3>
          <p class="body-text"><a href="mailto:sandeep.sharma@adhyayan.edu.np" class="inline-link">sandeep.sharma@adhyayan.edu.np</a> — Sandeep Sharma, Co-founder</p>
        </div>
        <div class="map-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14130.863663703625!2d85.31061547832032!3d27.700769237502043!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb18fcb77fd4bd%3A0x58099a1deffed8d3!2sKathmandu%2044600%2C%20Nepal!5e0!3m2!1sen!2snp!4v1699000000000!5m2!1sen!2snp"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            class="embed-frame map-frame"></iframe>
        </div>
      </div>
    </section>`;
}
