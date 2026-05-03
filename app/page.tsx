import Image from "next/image";
import FlightSearch from "./components/FlightSearch";

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

const packages = [
  {
    place: "Dubai",
    title: "Desert, Marina and City Lights",
    days: "5 days",
    price: "$749",
    image:
      `${imageBase}/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=900&q=82`,
  },
  {
    place: "Japan",
    title: "Tokyo, Kyoto and Mount Fuji",
    days: "8 days",
    price: "$1,420",
    image:
      `${imageBase}/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=900&q=82`,
  },
  {
    place: "Indonesia",
    title: "Bali Slow Travel Escape",
    days: "7 days",
    price: "$980",
    image:
      `${imageBase}/photo-1537953773345-d172ccf13cf1?auto=format&fit=crop&w=900&q=82`,
  },
];

const services = [
  "Flight and hotel booking",
  "Visa and travel guidance",
  "Private transfers",
  "Custom group itineraries",
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f5f1e8] text-[#17211f]">
      <header className="sticky top-0 z-50 border-b border-[#17211f]/10 bg-[#f5f1e8]/95 backdrop-blur">
        <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
          <a className="text-xl font-black tracking-tight text-[#0d5b57]" href="#">
            Faith Tour
            <span className="text-[#e25d3f]"> + Travel</span>
          </a>
          <div className="hidden items-center gap-8 text-sm font-bold text-[#17211f]/70 lg:flex">
            <a className="text-[#0d5b57]" href="#">
              Home
            </a>
            <a href="#destinations">Destinations</a>
            <a href="#packages">Packages</a>
            <a href="#services">Services</a>
            <a href="#contact">Contact</a>
          </div>
          <a
            className="rounded-md bg-[#17211f] px-5 py-3 text-sm font-bold text-white hover:bg-[#0d5b57]"
            href="#contact"
          >
            Plan My Trip
          </a>
        </nav>
      </header>

      <section className="px-5 pb-20 pt-10 sm:px-8 lg:pb-28">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div className="max-w-2xl">
            <p className="mb-5 text-sm font-black uppercase tracking-[0.16em] text-[#e25d3f]">
              Tailor-made holidays from India
            </p>
            <h1 className="text-5xl font-black leading-[1.02] tracking-tight text-[#17211f] sm:text-6xl lg:text-7xl">
              Trips planned with care, not copied from a template.
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-[#42514d]">
              We build practical itineraries around your dates, budget, travel
              style, and the people going with you.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                className="rounded-md bg-[#e25d3f] px-7 py-4 text-center font-black text-white hover:bg-[#c94d34]"
                href="#packages"
              >
                View Packages
              </a>
              <a
                className="rounded-md border border-[#17211f]/25 px-7 py-4 text-center font-black text-[#17211f] hover:border-[#0d5b57] hover:text-[#0d5b57]"
                href="#destinations"
              >
                Explore Places
              </a>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-[0.78fr_1fr]">
            <div className="relative min-h-[360px] overflow-hidden rounded-lg sm:min-h-[520px]">
              <Image
                src={`${imageBase}/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1300&q=84`}
                alt="Lake and mountain holiday destination"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover"
              />
            </div>
            <div className="grid gap-4">
              <div className="relative min-h-[220px] overflow-hidden rounded-lg">
                <Image
                  src={`${imageBase}/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=900&q=84`}
                  alt="Traveler walking through old town"
                  fill
                  sizes="(max-width: 1024px) 100vw, 30vw"
                  className="object-cover"
                />
              </div>
              <div className="rounded-lg bg-[#0d5b57] p-7 text-white">
                <p className="text-5xl font-black">120+</p>
                <p className="mt-4 text-lg font-bold leading-7 text-white/88">
                  itineraries arranged across Asia, Europe, and the Middle
                  East.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FlightSearch />

      <section id="destinations" className="bg-white px-5 py-20 sm:px-8 lg:py-28">
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
                <div className="flex items-center justify-between gap-5 p-6">
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

      <section id="packages" className="px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1fr] lg:items-end">
            <SectionHeading
              eyebrow="Curated package ideas"
              title="Start with a route, then we shape the details around you."
            />
            <p className="text-lg leading-8 text-[#42514d]">
              Every package can be adjusted for hotel category, flights,
              transfers, food preference, sightseeing pace, and special
              occasions.
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
                <div className="p-7">
                  <p className="text-sm font-black uppercase tracking-[0.14em] text-[#0d5b57]">
                    {item.place}
                  </p>
                  <h3 className="mt-3 text-3xl font-black leading-tight">
                    {item.title}
                  </h3>
                  <div className="mt-6 flex flex-wrap gap-3 text-sm font-bold text-[#42514d]">
                    <span className="rounded-md bg-[#f5f1e8] px-4 py-2">
                      {item.days}
                    </span>
                    <span className="rounded-md bg-[#f5f1e8] px-4 py-2">
                      Hotels + transfers
                    </span>
                    <span className="rounded-md bg-[#f5f1e8] px-4 py-2">
                      Customizable
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-5 border-t border-[#17211f]/10 p-7 lg:block lg:border-l lg:border-t-0">
                  <div>
                    <p className="text-sm font-bold text-[#56635f]">From</p>
                    <p className="text-3xl font-black text-[#e25d3f]">
                      {item.price}
                    </p>
                  </div>
                  <a
                    className="rounded-md bg-[#17211f] px-5 py-3 text-sm font-black text-white hover:bg-[#0d5b57] lg:mt-7 lg:inline-block"
                    href="#contact"
                  >
                    Enquire
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="bg-[#17211f] px-5 py-20 text-white sm:px-8 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="relative min-h-[420px] overflow-hidden rounded-lg">
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
            <h2 className="text-4xl font-black leading-tight sm:text-5xl">
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

      <footer id="contact" className="bg-white px-5 py-16 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1fr] lg:items-end">
          <div>
            <p className="mb-4 text-sm font-black uppercase tracking-[0.16em] text-[#e25d3f]">
              Get your itinerary
            </p>
            <h2 className="text-4xl font-black leading-tight sm:text-5xl">
              Tell us where you want to go. We will make it practical.
            </h2>
          </div>
          <div className="lg:justify-self-end">
            <a
              className="inline-block rounded-md bg-[#0d5b57] px-7 py-4 font-black text-white hover:bg-[#17211f]"
              href="mailto:hello@faithtourtravel.com"
            >
              hello@faithtourtravel.com
            </a>
            <p className="mt-6 text-[#56635f]">
              Copyright 2026 Faith Tour And Travel. All rights reserved.
            </p>
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
      <h2 className="text-4xl font-black leading-tight tracking-tight text-[#17211f] sm:text-5xl">
        {title}
      </h2>
    </div>
  );
}
