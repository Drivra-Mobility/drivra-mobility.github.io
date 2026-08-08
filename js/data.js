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
  },
  {
    id: "logistics",
    category: "TECHNOLOGY",
    name: "Drivra Logistics",
    tagline: "Delivery and logistics technology for local businesses.",
    body: "We build and operate delivery and logistics technology that connects riders with businesses that need goods moved across the city, from dispatch to real-time tracking.",
    audienceFor: [
      "Businesses that need last-mile delivery",
      "Delivery riders looking for work",
    ],
    photoPlaceholder: "Delivery rider photo",
  },
  {
    id: "finance",
    category: "TECHNOLOGY",
    name: "Drivra Finance",
    tagline: "Drive-to-own financing for mobility.",
    body: "Our mobility fintech platform is in development. It's designed to give drivers a path to owning their vehicle through structured drive-to-own financing, rather than a lump-sum purchase — drive on the platform, make structured payments, and own the vehicle at the end of the term.",
    audienceFor: ["Drivers who want to own a vehicle over time", "Financing partners"],
    tag: "In development",
    photoPlaceholder: "Driver / handshake photo",
    driveToOwn: {
      steps: [
        {
          title: "Apply",
          body: "Tell us about yourself and the vehicle you want to drive. It takes a few minutes.",
        },
        {
          title: "Get approved",
          body: "We review your application and driving history, and set up a payment plan that fits.",
        },
        {
          title: "Drive toward ownership",
          body: "Make structured weekly or monthly payments while you drive. The vehicle is yours once the term is complete.",
        },
      ],
      highlights: [
        "No lump-sum purchase — pay as you drive",
        "Structured, predictable weekly or monthly payments",
        "Full ownership of the vehicle at the end of the term",
        "Vehicle maintenance support during the payment term",
      ],
    },
  },
  {
    id: "trading",
    category: "TRADING",
    name: "Drivra Trading",
    tagline: "Vehicle import and export for the local market.",
    body: "We source and trade vehicles, including electric vehicles, bringing new options to the Nepali market and supporting the transition to electric mobility.",
    audienceFor: ["Dealerships and fleet buyers", "Import and export partners"],
    photoPlaceholder: "Vehicle lot photo",
  },
  {
    id: "charge",
    category: "TRADING",
    name: "Drivra Charge",
    tagline: "Charging infrastructure for electric fleets.",
    body: "We build and operate charging stations that keep our electric fleet, and the wider EV community, powered and on the road.",
    audienceFor: ["EV fleet operators", "EV riders and owners"],
    photoPlaceholder: "Charging station photo",
  },
];

export const TEAM = [
  {
    name: "Ayush Subedi",
    role: "Co-founder",
    initials: "AS",
    bio: "Former CTO of Tootle and AI entrepreneur, bringing deep expertise in ride-hailing platforms, artificial intelligence and scalable software systems.",
  },
  {
    name: "Diwas Shrestha",
    role: "Co-founder",
    initials: "DS",
    bio: "15+ years of experience in business development, operations and professional training across Nepal and Australia.",
  },
  {
    name: "Suman KC",
    role: "Co-founder",
    initials: "SK",
    bio: "Founder of four driving centers across Kathmandu, with extensive expertise in driver training, licensing, recruitment and fleet operations.",
  },
];
