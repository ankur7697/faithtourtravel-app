import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us | FaithTourTravel",
  description:
    "Learn about FaithTourTravel, a travel assistance and booking facilitation company helping with reservations, packages, and itinerary coordination.",
};

const strengths = [
  "Flight option assistance",
  "Hotel reservation guidance",
  "Travel package planning",
  "Local transport coordination",
  "Custom itinerary support",
  "Booking facilitation",
];

const processSteps = [
  "You share your route, travel dates, budget, passenger count, and preferences.",
  "We review available travel options and explain practical choices clearly.",
  "You confirm the preferred option before final booking or payment steps.",
  "We coordinate with relevant travel suppliers and share next steps in writing.",
];

export default function AboutUsPage() {
  return (
    <main className="min-h-screen bg-[#f5f1e8] text-[#17211f]">
      <section className="px-4 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-4xl">
          <Link className="text-sm font-black text-[#0d5b57]" href="/">
            Back to home
          </Link>
          <p className="mt-10 text-sm font-black uppercase tracking-[0.16em] text-[#e25d3f]">
            Travel Assistance + Booking Facilitation
          </p>
          <h1 className="mt-4 text-4xl font-black leading-tight sm:text-6xl">
            Global Travel Booking & Reservation Assistance
          </h1>
          <div className="mt-8 space-y-5 text-lg leading-8 text-[#42514d]">
            <p>
              FaithTourTravel is a travel assistance and booking facilitation
              company. We help travelers review flight options, hotel
              reservations, travel packages, local transport, and itinerary
              coordination based on their trip details.
            </p>
            <p>
              Our role is to make travel planning easier to understand before
              you book. We collect your requirements, compare practical
              options, explain the next steps, and help coordinate reservations
              with relevant travel suppliers where applicable.
            </p>
            <p>
              We are not an airline, hotel, embassy, or government authority.
              Final availability, prices, schedules, visa decisions, refunds,
              cancellation rules, and supplier terms depend on the companies
              providing those travel services. Our job is to assist with
              planning, communication, and booking facilitation.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-12 sm:px-8 sm:py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-black text-[#0d5b57]">
            What we help with
          </h2>
          <div className="mt-6 grid gap-3 text-sm font-black text-[#17211f] sm:grid-cols-2 lg:grid-cols-3">
            {strengths.map((item) => (
              <div className="rounded-lg bg-[#f5f1e8] p-4" key={item}>
                {item}
              </div>
            ))}
          </div>
          <p className="mt-8 text-base leading-8 text-[#42514d]">
            FaithTourTravel works as a planning and coordination partner. Final
            availability, pricing, refund rules, and cancellation terms depend
            on airlines, hotels, local operators, and other travel suppliers.
          </p>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-8 sm:py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-black text-[#0d5b57]">
            How our assistance works
          </h2>
          <ol className="mt-6 grid gap-4 text-base font-bold leading-7 text-[#42514d]">
            {processSteps.map((item, index) => (
              <li className="rounded-lg bg-white p-5" key={item}>
                <span className="mb-3 block text-sm font-black uppercase tracking-[0.14em] text-[#e25d3f]">
                  Step {index + 1}
                </span>
                {item}
              </li>
            ))}
          </ol>
        </div>
      </section>
    </main>
  );
}
