// Content for the site. Edit here — nothing else needs to change.

export const VENTURES = [
  {
    id: "fleet",
    category: "OPERATIONS",
    name: "Drivra Fleet",
    tagline: "Ride-hailing fleets on the road across Kathmandu.",
    body: "We operate and grow a fleet of vehicles running on ride-hailing networks, including our partnership with Yango. We handle vehicle onboarding, driver recruitment, maintenance and day-to-day fleet operations, so drivers can focus on the road.",
    audienceFor: [
      "Drivers looking for flexible income",
      "Ride-hailing platforms seeking a local operating partner",
    ],
    photoPlaceholder: "Fleet / rider photo",
    photo: "assets/fleet.jpg",
  },
  {
    id: "logistics",
    category: "OPERATIONS",
    name: "Drivra Logistics",
    tagline: "Same-city B2B delivery for businesses across Kathmandu Valley.",
    body: "Drivra Express is our delivery operation, moving packages for local businesses across the Kathmandu Valley. Orders are picked up from merchants, sorted through our central hub, and delivered by our rider fleet, with live tracking by tracking code and cash-on-delivery support along the way.",
    audienceFor: [
      "Businesses that need same-city delivery",
      "Delivery riders looking for work",
    ],
    photoPlaceholder: "Delivery rider photo",
    photo: "assets/logistics.jpg",
  },
  {
    id: "finance",
    category: "TECHNOLOGY",
    name: "Drivra Rent-to-Own",
    tagline: "Drive-to-own vehicle financing, built on your driving history.",
    body: "Drivra Rent-to-Own is our mobility fintech platform, in development. It's designed to give drivers a path to owning their vehicle through structured payments instead of a lump-sum purchase. Drive on the platform, make structured weekly or monthly payments, and own the vehicle at the end of the term.",
    audienceFor: ["Drivers who want to own a vehicle over time", "Financing partners"],
    tag: "In development",
    photoPlaceholder: "Driver / handshake photo",
    photo: "assets/finance.jpg",
    driveToOwn: {
      steps: [
        {
          title: "Apply",
          body: "Tell us about yourself and the vehicle you want to drive. It takes a few minutes.",
        },
        {
          title: "Get approved",
          body: "We review your application using a transparent, rules-based score built on your driving tenure, earnings consistency and driver tier, not a black-box model.",
        },
        {
          title: "Drive toward ownership",
          body: "Make structured weekly or monthly payments while you drive. The vehicle is yours once the term is complete.",
        },
      ],
      highlights: [
        "No lump-sum purchase, pay as you drive",
        "Structured, predictable weekly or monthly payments",
        "Full ownership of the vehicle at the end of the term",
        "Vehicle maintenance support during the payment term",
        "New drivers can still qualify with a guarantor or a larger down payment",
      ],
    },
  },
  {
    id: "trading",
    category: "TRADING",
    name: "Drivra Trading",
    tagline: "Vehicle import for the local market.",
    body: "We source and trade vehicles, including electric vehicles, bringing new options to the Nepali market and supporting the transition to electric mobility.",
    audienceFor: ["Dealerships and fleet buyers", "Import partners"],
    photoPlaceholder: "Vehicle lot photo",
    photo: "assets/trading.jpg",
  },
  {
    id: "charge",
    category: "INFRASTRUCTURE",
    name: "Drivra Charge",
    tagline: "Charging infrastructure for electric fleets.",
    body: "We build and operate charging stations that keep our electric fleet, and the wider EV community, powered and on the road.",
    audienceFor: ["EV fleet operators", "EV riders and owners"],
    photoPlaceholder: "Charging station photo",
    photo: "assets/charge.jpg",
  },
];

export const TEAM = [
  {
    name: "Ayush Subedi",
    role: "Co-founder",
    bio: "Founder of Husig, a data, analytics and AI consultancy helping organizations turn data into a strategic asset. Former CTO of Tootle, with deep expertise in ride-hailing platforms and scalable software systems.",
  },
  {
    name: "Diwas Shrestha",
    role: "Co-founder",
    bio: "15+ years of experience in business development, operations and professional training across Nepal and Australia.",
  },
  {
    name: "Salina Sharma",
    role: "CEO",
    bio: "MBA with 10+ years of experience in project management, business development, and organizational leadership, driving execution and strategic growth.",
  },
  {
    name: "Sandeep Sharma",
    role: "Co-founder",
    bio: "Educator, engineer, and entrepreneur with leadership experience across education, technology, mobility, and venture building, focused on scaling high-growth businesses.",
  },
  {
    name: "Suman KC",
    role: "Co-founder",
    bio: "Founder of four driving centers across Kathmandu, with extensive expertise in driver training, licensing, recruitment and fleet operations.",
  },
];
