import Image from "next/image";
import Link from "next/link";
import BrandLogo from "./components/BrandLogo";
import FlightSearch from "./components/FlightSearch";
import { packages } from "./data/packages";

const imageBase = "https://images.unsplash.com";

const destinations = [
  {
    name: "Bali",
    mood: "Temples, beaches, rice terraces",
    image:
      `${imageBase}/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1000&q=82`,
  },
  {
    name: "Singapore",
    mood: "City breaks, family fun, cruises",
    image:
      `${imageBase}/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1000&q=82`,
  },
  {
    name: "Thailand",
    mood: "Island hopping and night markets",
    image:
      `${imageBase}/photo-1504214208698-ea1916a2195a?auto=format&fit=crop&w=1000&q=82`,
  },
];

const services = [
  "Flight and hotel booking",
  "Visa and travel guidance",
  "Local transport",
  "Custom group itineraries",
];

const faqs = [
  {
    question: "Is FaithTourTravel a travel agency or a booking platform?",
    answer:
      "FaithTourTravel provides travel assistance, booking facilitation, and reservation support. We help customers review travel options and coordinate bookings after the itinerary, pricing, and supplier terms are confirmed.",
  },
  {
    question: "Are the package prices final?",
    answer:
      "Package prices are starting estimates. Final pricing depends on travel dates, flight availability, hotel category, room type, destination rules, traveler count, and supplier availability.",
  },
  {
    question: "Can I customize a package?",
    answer:
      "Yes. Packages can be adjusted for departure city, destination, hotel preference, local transport, sightseeing pace, traveler type, and special occasions.",
  },
  {
    question: "When should I make payment?",
    answer:
      "Payment should be made only after your quote, itinerary, invoice, cancellation terms, and refund conditions are confirmed in writing.",
  },
  {
    question: "Do you help with flights only?",
    answer:
      "We can assist with flight options, hotels, travel packages, local transport, itinerary planning, and reservation coordination based on your trip details.",
  },
  {
    question: "How do I contact the team after submitting an inquiry?",
    answer:
      "You can reach us at info@faithtourtravel.com, +1 (579) 900-5844, or +1 888-333-4391 for follow-up on quotes, package details, or booking assistance.",
  },
];

const mobileNavItems = [
  { label: "Destinations", href: "#destinations" },
  { label: "About", href: "/about-us" },
  { label: "Packages", href: "#packages" },
  { label: "Services", href: "#services" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

const footerGroups = [
  {
    title: "Explore",
    links: [
      { label: "Destinations", href: "#destinations" },
      { label: "About Us", href: "/about-us" },
      { label: "Packages", href: "#packages" },
      { label: "Services", href: "#services" },
      { label: "FAQ", href: "#faq" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Flight Search", href: "#flights" },
      { label: "Hotel Search", href: "#flights" },
      { label: "Custom Trips", href: "#contact" },
      { label: "Visa Guidance", href: "#services" },
    ],
  },
  {
    title: "Policies",
    links: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Refund Policy", href: "/refund-policy" },
      { label: "Cancellation Policy", href: "/cancellation-policy" },
    ],
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f5f1e8] text-[#17211f]">
      <header className="sticky top-0 z-50 border-b border-[#17211f]/10 bg-[#f5f1e8]/95 backdrop-blur">
        <nav className="mx-auto flex min-h-20 max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-8">
          <a aria-label="FaithTourTravel home" href="#">
            <BrandLogo />
          </a>
          <div className="hidden items-center gap-8 text-sm font-bold text-[#17211f]/70 lg:flex">
            <a className="text-[#0d5b57]" href="#">
              Home
            </a>
            <a href="#destinations">Destinations</a>
            <Link href="/about-us">About Us</Link>
            <a href="#packages">Packages</a>
            <a href="#services">Services</a>
            <a href="#faq">FAQ</a>
            <a href="#contact">Contact</a>
          </div>
          <a
            className="shrink-0 rounded-md bg-[#17211f] px-4 py-3 text-sm font-bold text-white hover:bg-[#0d5b57] sm:px-5"
            href="#flights"
          >
            Plan My Trip
          </a>
        </nav>
        <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 pb-3 text-xs font-bold text-[#17211f]/70 sm:px-8 sm:text-sm lg:hidden">
          {mobileNavItems.map((item) => (
            <a
              className="shrink-0 rounded-md border border-[#17211f]/10 bg-white/55 px-3 py-2 sm:px-4"
              href={item.href}
              key={item.label}
            >
              {item.label}
            </a>
          ))}
        </div>
      </header>

      <section className="px-4 pb-16 pt-8 sm:px-8 sm:pb-20 sm:pt-10 lg:pb-28">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="max-w-2xl">
            <p className="mb-5 inline-flex rounded-full border border-[#0d5b57]/20 bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-[#0d5b57] sm:text-sm">
              Travel Assistance + Booking Facilitation
            </p>
            <h1 className="text-4xl font-black leading-[1.02] tracking-tight text-[#0d5b57] sm:text-6xl lg:text-7xl">
              Global Travel Booking & Reservation Assistance
            </h1>
            <p className="mt-6 max-w-xl text-base font-medium leading-7 text-[#4f5f5a] sm:mt-7 sm:text-lg sm:leading-8">
              We help with flight options, hotel reservations, travel packages,
              local transport, and itinerary coordination based on your trip
              details.
            </p>
            <div className="mt-7 flex flex-wrap gap-2 text-sm font-black text-[#0d5b57]">
              {["Flights", "Hotels", "Packages", "Local Transport"].map((item) => (
                <span className="rounded-md border border-[#0d5b57]/10 bg-white px-4 py-2 shadow-sm shadow-[#17211f]/5" key={item}>
                  {item}
                </span>
              ))}
            </div>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                className="rounded-md bg-[#e25d3f] px-7 py-4 text-center font-black text-white hover:bg-[#c94d34]"
                href="#packages"
              >
                View Packages
              </a>
              <a
                className="rounded-md border border-[#0d5b57]/30 px-7 py-4 text-center font-black text-[#0d5b57] hover:border-[#e25d3f] hover:text-[#e25d3f]"
                href="#destinations"
              >
                Explore Places
              </a>
            </div>
            <div className="mt-8 grid max-w-xl gap-3 border-t border-[#0d5b57]/15 pt-6 text-sm font-bold text-[#56635f] sm:grid-cols-3">
              <p>
                <span className="block text-2xl font-black text-[#0d5b57]">
                  USA
                </span>
                departures supported
              </p>
              <p>
                <span className="block text-2xl font-black text-[#0d5b57]">
                  24h
                </span>
                quote follow-up
              </p>
              <p>
                <span className="block text-2xl font-black text-[#0d5b57]">
                  Global
                </span>
                reservations
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-[0.78fr_1fr]">
            <div className="relative min-h-[320px] overflow-hidden rounded-lg shadow-2xl shadow-[#17211f]/12 sm:min-h-[540px]">
              <Image
                src={`${imageBase}/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1300&q=86`}
                alt="Premium beach travel destination"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover"
              />
              <div className="absolute bottom-4 left-4 right-4 rounded-lg bg-white/92 p-4 text-[#17211f] shadow-lg backdrop-blur">
                <p className="text-xs font-black uppercase tracking-[0.14em] text-[#e25d3f]">
                  Reservation support
                </p>
                <p className="mt-2 text-lg font-black">
                  Share route, dates, budget. We help coordinate the options.
                </p>
              </div>
            </div>
            <div className="grid gap-4">
              <div className="relative min-h-[190px] overflow-hidden rounded-lg sm:min-h-[220px]">
                <Image
                  src={`${imageBase}/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=900&q=86`}
                  alt="Hotel resort reservation"
                  fill
                  sizes="(max-width: 1024px) 100vw, 30vw"
                  className="object-cover"
                />
              </div>
              <div className="rounded-lg bg-[#0d5b57] p-6 text-white shadow-xl shadow-[#0d5b57]/20 sm:p-7">
                <p className="text-4xl font-black sm:text-5xl">4-step</p>
                <p className="mt-4 text-base font-bold leading-7 text-white/88 sm:text-lg">
                  assistance for flights, stays, packages, and final booking
                  coordination.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FlightSearch />

      <section id="destinations" className="bg-white px-4 py-16 sm:px-8 sm:py-20 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Where clients ask us to send them"
            title="Featured destinations with a different pace for every traveler."
          />
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {destinations.map((destination) => (
              <a
                className="group block overflow-hidden rounded-lg border border-[#17211f]/10 bg-[#f8f7f2]"
                href="#packages"
                key={destination.name}
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={destination.image}
                    alt={`${destination.name} destination`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex items-center justify-between gap-4 p-5 sm:gap-5 sm:p-6">
                  <div>
                    <h3 className="text-2xl font-black text-[#17211f]">
                      {destination.name}
                    </h3>
                    <p className="mt-2 leading-7 text-[#56635f]">
                      {destination.mood}
                    </p>
                  </div>
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#e25d3f] text-xl font-black text-white">
                    -&gt;
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="packages" className="px-4 py-16 sm:px-8 sm:py-20 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1fr] lg:items-end">
            <SectionHeading
              eyebrow="Packages from the USA to the world"
              title="Start from the USA, then travel anywhere with a plan built around you."
            />
            <p className="text-base leading-7 text-[#42514d] sm:text-lg sm:leading-8">
              Every package can be adjusted for departure city, destination,
              hotel category, flights, local transport, food preference,
              sightseeing pace, and special occasions.
            </p>
          </div>

          <div className="mt-12 space-y-5">
            {packages.map((item) => (
              <article
                className="grid overflow-hidden rounded-lg border border-[#17211f]/10 bg-white shadow-sm lg:grid-cols-[280px_1fr_auto]"
                key={item.title}
              >
                <div className="relative min-h-[220px]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 280px"
                    className="object-cover"
                  />
                </div>
                <div className="p-5 sm:p-7">
                  <p className="text-sm font-black uppercase tracking-[0.14em] text-[#0d5b57]">
                    {item.place}
                  </p>
                  <h3 className="mt-3 text-2xl font-black leading-tight sm:text-3xl">
                    {item.title}
                  </h3>
                  <div className="mt-6 flex flex-wrap gap-3 text-sm font-bold text-[#42514d]">
                    <span className="rounded-md bg-[#f5f1e8] px-4 py-2">
                      {item.days}
                    </span>
                    <span className="rounded-md bg-[#f5f1e8] px-4 py-2">
                      Hotels + local transport
                    </span>
                    <span className="rounded-md bg-[#f5f1e8] px-4 py-2">
                      Customizable
                    </span>
                  </div>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-5 border-t border-[#17211f]/10 p-5 sm:p-7 lg:block lg:border-l lg:border-t-0">
                  <div>
                    <p className="text-sm font-bold text-[#56635f]">From</p>
                    <p className="text-3xl font-black text-[#e25d3f]">
                      {item.price}
                    </p>
                  </div>
                  <Link
                    className="rounded-md bg-[#17211f] px-5 py-3 text-sm font-black text-white hover:bg-[#0d5b57] lg:mt-7 lg:inline-block"
                    href={`/packages/${item.slug}`}
                  >
                    Enquire
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="bg-[#17211f] px-5 py-20 text-white sm:px-8 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="relative min-h-[300px] overflow-hidden rounded-lg sm:min-h-[420px]">
            <Image
              src={`${imageBase}/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1400&q=84`}
              alt="Bridge and city travel view"
              fill
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover"
            />
          </div>
          <div>
            <p className="mb-5 text-sm font-black uppercase tracking-[0.16em] text-[#f4c35d]">
              What we handle
            </p>
            <h2 className="text-3xl font-black leading-tight sm:text-5xl">
              One point of contact for the moving parts of your trip.
            </h2>
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {services.map((service) => (
                <div
                  className="rounded-lg border border-white/14 bg-white/8 p-6"
                  key={service}
                >
                  <span className="mb-7 block h-1 w-12 rounded-full bg-[#e25d3f]" />
                  <h3 className="text-xl font-black">{service}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="bg-white px-4 py-16 sm:px-8 sm:py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.72fr_1fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <SectionHeading
              eyebrow="Questions before you book"
              title="Clear answers for travel planning, payment, and package changes."
            />
            <p className="mt-6 max-w-xl text-base leading-8 text-[#42514d]">
              These answers cover the common questions customers ask before
              requesting a quote or starting a package booking.
            </p>
            <a
              className="mt-8 inline-block rounded-md bg-[#17211f] px-6 py-4 font-black text-white hover:bg-[#0d5b57]"
              href="#contact"
            >
              Ask a Question
            </a>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details
                className="group rounded-lg border border-[#17211f]/10 bg-[#fbfaf7] p-5 shadow-sm open:bg-white sm:p-6"
                key={faq.question}
                open={index === 0}
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-lg font-black text-[#17211f]">
                  <span>{faq.question}</span>
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#0d5b57]/10 text-xl text-[#0d5b57] transition group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-4 max-w-3xl text-base font-medium leading-8 text-[#42514d]">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <footer id="contact" className="bg-[#f5f1e8] px-4 py-8 sm:px-8 sm:py-10">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-lg bg-[#17211f] text-white shadow-2xl shadow-[#17211f]/15">
          <div className="grid gap-8 border-b border-white/10 p-6 sm:p-8 lg:grid-cols-[1.2fr_0.8fr] lg:p-10">
            <div>
              <p className="mb-4 text-sm font-black uppercase tracking-[0.16em] text-[#f4c35d]">
                Get your itinerary
              </p>
              <h2 className="max-w-3xl text-3xl font-black leading-tight sm:text-5xl">
                Tell us the destination, dates, and budget. We will shape the
                route.
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-7 text-white/72 sm:text-lg sm:leading-8">
                Share your travel idea and we will respond with practical next
                steps for flights, hotels, local transport, and sightseeing.
              </p>
            </div>
            <div className="rounded-lg bg-white p-5 text-[#17211f] sm:p-6 lg:self-end">
              <p className="text-sm font-black uppercase tracking-[0.14em] text-[#e25d3f]">
                Quick contact
              </p>
              <a
                className="mt-4 block break-words text-2xl font-black text-[#0d5b57] hover:text-[#e25d3f]"
                href="mailto:info@faithtourtravel.com"
              >
                info@faithtourtravel.com
              </a>
              <div className="mt-4 grid gap-2 text-base font-black text-[#0d5b57]">
                <a className="hover:text-[#e25d3f]" href="tel:+15799005844">
                  +1 (579) 900-5844
                </a>
                <a className="hover:text-[#e25d3f]" href="tel:+18883334391">
                  +1 888-333-4391
                </a>
              </div>
              <div className="mt-5 border-t border-[#17211f]/10 pt-5 text-sm font-bold leading-6 text-[#42514d]">
                <p className="font-black text-[#17211f]">
                  Faith Tour And Travel LLC
                </p>
                <p>16700 Marygold Ave Apt 18B</p>
                <p>Fontana, CA 92335</p>
              </div>
              <a
                className="mt-5 inline-block rounded-md bg-[#e25d3f] px-5 py-3 font-black text-white hover:bg-[#c94d34]"
                href="#flights"
              >
                Search Flights & Hotels
              </a>
            </div>
          </div>

          <div className="grid gap-8 p-6 sm:grid-cols-2 sm:p-8 lg:grid-cols-[1.3fr_1fr_1fr_1fr] lg:p-10">
            <div>
              <BrandLogo inverted />
              <p className="mt-4 max-w-sm leading-7 text-white/68">
                Personalized tour planning for families, groups, and business
                travelers who want clear guidance before they book.
              </p>
            </div>

            {footerGroups.map((group) => (
              <div key={group.title}>
                <h3 className="font-black uppercase tracking-[0.14em] text-[#f4c35d]">
                  {group.title}
                </h3>
                <ul className="mt-5 space-y-3 text-white/70">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <a className="hover:text-white" href={link.href}>
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-4 border-t border-white/10 px-6 py-5 text-sm text-white/56 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-10">
            <p>Copyright 2026 FaithTourTravel. All rights reserved.</p>
            <p>Built for reliable holiday planning from inquiry to return.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}

function SectionHeading({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  return (
    <div className="max-w-3xl">
      <p className="mb-5 text-sm font-black uppercase tracking-[0.16em] text-[#e25d3f]">
        {eyebrow}
      </p>
      <h2 className="text-3xl font-black leading-tight tracking-tight text-[#17211f] sm:text-5xl">
        {title}
      </h2>
    </div>
  );
}
