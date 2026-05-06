import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Refund Policy | Faith Tour And Travel",
  description:
    "Refund policy for Faith Tour And Travel bookings, deposits, supplier charges, payment processing, and travel service fees.",
};

const sections = [
  {
    title: "General Refund Terms",
    body: [
      "Refund eligibility depends on the fare rules, hotel policy, supplier terms, cancellation timing, payment method, and services already delivered. Travel bookings often include non-refundable or partially refundable components.",
      "Before payment, we aim to share the key booking terms available to us. Final refund amounts are subject to supplier approval and any applicable service fees, payment processor fees, exchange rate differences, taxes, and penalties.",
    ],
  },
  {
    title: "Deposits And Service Fees",
    body: [
      "Planning fees, consultation fees, visa assistance fees, payment processing fees, convenience fees, and other service fees may be non-refundable once work has started or a booking has been initiated.",
      "Deposits may be refundable, partially refundable, or non-refundable depending on the written quote, invoice, supplier terms, and stage of booking.",
    ],
  },
  {
    title: "Flights, Hotels, Tours, And Transfers",
    body: [
      "Flights are governed by airline fare rules. Some tickets are non-refundable, and some allow refunds after airline penalties. Schedule changes, no-shows, name errors, missed connections, and voluntary changes may reduce or remove refund eligibility.",
      "Hotels, tours, cruises, transfers, event tickets, and destination services follow their own supplier policies. Peak season, promotional, group, and last-minute bookings are often stricter.",
    ],
  },
  {
    title: "Refund Processing Time",
    body: [
      "Approved refunds are processed after we receive confirmation and funds from the relevant supplier, where applicable. Typical processing may take 7 to 21 business days, but airline, hotel, bank, card network, international transfer, or payment processor timelines can be longer.",
      "Refunds are usually returned to the original payment method unless another method is required by law, supplier rules, or payment processor limitations.",
    ],
  },
  {
    title: "Stripe And Card Payments",
    body: [
      "If payment was made by card or through Stripe, refunds may be subject to Stripe, bank, card network, and currency conversion rules. Payment processing fees may not always be returned by processors.",
      "A successful refund from our side may still take additional time to appear on your statement depending on your bank or card issuer.",
    ],
  },
  {
    title: "How To Request A Refund",
    body: [
      "Email hello@faithtourtravel.com with your booking name, invoice number, travel dates, destination, reason for refund request, and any supporting documents.",
      "We will review the booking, check supplier rules, and share the available refund or credit options where applicable.",
    ],
  },
];

export default function RefundPolicyPage() {
  return (
    <main className="min-h-screen bg-[#f5f1e8] text-[#17211f]">
      <section className="px-4 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-4xl">
          <Link className="text-sm font-black text-[#0d5b57]" href="/">
            Back to home
          </Link>
          <p className="mt-10 text-sm font-black uppercase tracking-[0.16em] text-[#e25d3f]">
            Legal
          </p>
          <h1 className="mt-4 text-4xl font-black leading-tight sm:text-6xl">
            Refund Policy
          </h1>
          <p className="mt-4 text-sm font-bold text-[#56635f]">
            Last updated: May 6, 2026
          </p>
          <p className="mt-8 text-lg leading-8 text-[#42514d]">
            This Refund Policy explains how refunds are reviewed for travel
            planning, flights, hotels, tours, transfers, visa assistance, and
            related services booked through Faith Tour And Travel.
          </p>
        </div>
      </section>

      <section className="bg-white px-4 py-12 sm:px-8 sm:py-16">
        <div className="mx-auto max-w-4xl space-y-10">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-2xl font-black text-[#0d5b57]">
                {section.title}
              </h2>
              <div className="mt-4 space-y-4 text-base leading-8 text-[#42514d]">
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>
    </main>
  );
}
