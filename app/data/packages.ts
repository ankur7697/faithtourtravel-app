const imageBase = "https://images.unsplash.com";

export const packages = [
  {
    slug: "family-holidays",
    place: "Family Holidays",
    title: "Easy-paced trips with hotels, transfers and sightseeing planned.",
    summary:
      "A practical holiday plan for families who want reliable hotels, comfortable transfers, and a balanced sightseeing schedule.",
    days: "5 to 9 days",
    price: "$599",
    deposit: "$99",
    image:
      `${imageBase}/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1200&q=86`,
    gallery: [
      `${imageBase}/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1200&q=86`,
      `${imageBase}/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=86`,
      `${imageBase}/photo-1496950866446-3253e1470e8e?auto=format&fit=crop&w=1200&q=86`,
    ],
    highlights: [
      "Family-friendly hotels and room options",
      "Airport pickup and private transfers",
      "Daily sightseeing paced for comfort",
      "Optional activities for kids and seniors",
    ],
    itinerary: [
      "Arrival, hotel check-in, and relaxed evening plan",
      "City tour with private transfer and flexible stops",
      "Local experience, shopping time, or theme attraction",
      "Leisure day or optional add-on activity",
      "Departure assistance and airport transfer",
    ],
  },
  {
    slug: "honeymoon-packages",
    place: "Honeymoon Packages",
    title: "Private stays, smooth transfers and relaxed experiences for two.",
    summary:
      "A romantic itinerary built around privacy, comfort, scenic stays, and slower travel days.",
    days: "6 to 10 days",
    price: "$899",
    deposit: "$149",
    image:
      `${imageBase}/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1200&q=86`,
    gallery: [
      `${imageBase}/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1200&q=86`,
      `${imageBase}/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=86`,
      `${imageBase}/photo-1537953773345-d172ccf13cf1?auto=format&fit=crop&w=1200&q=86`,
    ],
    highlights: [
      "Handpicked romantic stays",
      "Private transfers between locations",
      "Couple-focused experiences and dinner options",
      "Room upgrade and special occasion add-ons when available",
    ],
    itinerary: [
      "Arrival, private transfer, and check-in",
      "Scenic tour with relaxed timing",
      "Leisure day with spa, beach, or resort time",
      "Private experience or romantic dinner add-on",
      "Departure support and final transfer",
    ],
  },
  {
    slug: "group-tours",
    place: "Group Tours",
    title: "Coordinated itineraries for friends, teams, schools and events.",
    summary:
      "A managed group plan with transport, rooming, activities, and practical coordination handled before departure.",
    days: "4 to 12 days",
    price: "$499",
    deposit: "$75",
    image:
      `${imageBase}/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=86`,
    gallery: [
      `${imageBase}/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=86`,
      `${imageBase}/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=1200&q=86`,
      `${imageBase}/photo-1506869640319-fe1a24fd76dc?auto=format&fit=crop&w=1200&q=86`,
    ],
    highlights: [
      "Group hotels and rooming coordination",
      "Coach, van, or private transfer planning",
      "Sightseeing schedule with clear timing",
      "Support for schools, teams, families, and corporate groups",
    ],
    itinerary: [
      "Group arrival and transfer coordination",
      "Guided city or destination tour",
      "Main activity day with transport support",
      "Free time, shopping, or custom event block",
      "Checkout and departure transfer",
    ],
  },
  {
    slug: "luxury-escapes",
    place: "Luxury Escapes",
    title: "Premium hotels, private transfers and carefully selected experiences.",
    summary:
      "A refined travel plan for guests who want better stays, private movement, and polished experiences from arrival to departure.",
    days: "5 to 11 days",
    price: "$1,299",
    deposit: "$199",
    image:
      `${imageBase}/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=86`,
    gallery: [
      `${imageBase}/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=86`,
      `${imageBase}/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=86`,
      `${imageBase}/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=86`,
    ],
    highlights: [
      "Premium hotel and resort options",
      "Private airport and intercity transfers",
      "Curated dining, spa, and local experiences",
      "Concierge-style itinerary support",
    ],
    itinerary: [
      "Arrival with private transfer and premium check-in",
      "Signature city or island experience",
      "Leisure day with optional spa or fine dining",
      "Private excursion or scenic day trip",
      "Departure support and transfer",
    ],
  },
  {
    slug: "adventure-trips",
    place: "Adventure Trips",
    title: "Active holidays with outdoor activities, local guides and safe planning.",
    summary:
      "An energetic package for travelers who want nature, movement, guided activities, and practical safety planning.",
    days: "4 to 8 days",
    price: "$699",
    deposit: "$99",
    image:
      `${imageBase}/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=86`,
    gallery: [
      `${imageBase}/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=86`,
      `${imageBase}/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=86`,
      `${imageBase}/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=86`,
    ],
    highlights: [
      "Guided outdoor activities",
      "Transport and timing coordination",
      "Flexible activity difficulty levels",
      "Hotel or camp stay options",
    ],
    itinerary: [
      "Arrival and briefing",
      "Guided nature or mountain activity",
      "Adventure activity day with transfers",
      "Leisure, local food, or scenic stop",
      "Departure transfer",
    ],
  },
  {
    slug: "weekend-getaways",
    place: "Weekend Getaways",
    title: "Short breaks with clean hotels, quick transfers and simple plans.",
    summary:
      "A compact travel plan for quick holidays, celebrations, work breaks, and last-minute escapes.",
    days: "2 to 4 days",
    price: "$299",
    deposit: "$49",
    image:
      `${imageBase}/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=86`,
    gallery: [
      `${imageBase}/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=86`,
      `${imageBase}/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1200&q=86`,
      `${imageBase}/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1200&q=86`,
    ],
    highlights: [
      "Short-stay hotel options",
      "Airport or station transfer planning",
      "Simple sightseeing plan",
      "Easy upgrade options for rooms and activities",
    ],
    itinerary: [
      "Arrival and hotel check-in",
      "Half-day sightseeing or leisure plan",
      "Dining, shopping, or optional experience",
      "Checkout and departure",
    ],
  },
];

export type TravelPackage = (typeof packages)[number];

export function getPackage(slug: string) {
  return packages.find((item) => item.slug === slug);
}
