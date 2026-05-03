"use client";

import { FormEvent, useState } from "react";

type FlightResult = {
  id: string;
  price: string;
  deepLink?: string;
};

type SearchResponse = {
  error?: string;
  status?: string;
  itineraries?: FlightResult[];
};

const cabinClasses = [
  { label: "Economy", value: "CABIN_CLASS_ECONOMY" },
  { label: "Premium", value: "CABIN_CLASS_PREMIUM_ECONOMY" },
  { label: "Business", value: "CABIN_CLASS_BUSINESS" },
];

export default function FlightSearch() {
  const [origin, setOrigin] = useState("DEL");
  const [destination, setDestination] = useState("DXB");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [adults, setAdults] = useState(1);
  const [cabinClass, setCabinClass] = useState(cabinClasses[0].value);
  const [message, setMessage] = useState("");
  const [results, setResults] = useState<FlightResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setMessage("");
    setResults([]);

    const response = await fetch("/api/flights", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        origin,
        destination,
        departureDate,
        returnDate: returnDate || undefined,
        adults,
        cabinClass,
      }),
    });

    const data = (await response.json()) as SearchResponse;

    setIsLoading(false);

    if (!response.ok) {
      setMessage(data.error ?? "Flight search failed. Please try again.");
      return;
    }

    setResults(data.itineraries ?? []);
    setMessage(
      data.itineraries?.length
        ? `Search ${data.status?.toLowerCase() ?? "completed"}`
        : "Search completed, but no displayable fares were returned yet.",
    );
  }

  return (
    <section id="flights" className="bg-[#0d5b57] px-5 py-16 text-white sm:px-8">
      <div className="mx-auto grid max-w-7xl gap-9 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
        <div>
          <p className="mb-4 text-sm font-black uppercase tracking-[0.16em] text-[#f4c35d]">
            Live flight search
          </p>
          <h2 className="text-4xl font-black leading-tight sm:text-5xl">
            Check flight fares before we build the full plan.
          </h2>
          <p className="mt-6 text-lg leading-8 text-white/80">
            This connects through your Skyscanner partner key on the server.
            Until the key is added, the form will show a setup message.
          </p>
        </div>

        <div className="rounded-lg bg-white p-5 text-[#17211f] shadow-xl shadow-black/10 sm:p-7">
          <form className="grid gap-4 lg:grid-cols-6" onSubmit={handleSubmit}>
            <label className="lg:col-span-1">
              <span className="mb-2 block text-sm font-black">From</span>
              <input
                className="w-full rounded-md border border-[#17211f]/15 px-4 py-3 font-bold uppercase outline-none focus:border-[#0d5b57]"
                maxLength={3}
                minLength={3}
                onChange={(event) => setOrigin(event.target.value.toUpperCase())}
                required
                value={origin}
              />
            </label>
            <label className="lg:col-span-1">
              <span className="mb-2 block text-sm font-black">To</span>
              <input
                className="w-full rounded-md border border-[#17211f]/15 px-4 py-3 font-bold uppercase outline-none focus:border-[#0d5b57]"
                maxLength={3}
                minLength={3}
                onChange={(event) =>
                  setDestination(event.target.value.toUpperCase())
                }
                required
                value={destination}
              />
            </label>
            <label className="lg:col-span-2">
              <span className="mb-2 block text-sm font-black">Depart</span>
              <input
                className="w-full rounded-md border border-[#17211f]/15 px-4 py-3 font-bold outline-none focus:border-[#0d5b57]"
                onChange={(event) => setDepartureDate(event.target.value)}
                required
                type="date"
                value={departureDate}
              />
            </label>
            <label className="lg:col-span-2">
              <span className="mb-2 block text-sm font-black">Return</span>
              <input
                className="w-full rounded-md border border-[#17211f]/15 px-4 py-3 font-bold outline-none focus:border-[#0d5b57]"
                onChange={(event) => setReturnDate(event.target.value)}
                type="date"
                value={returnDate}
              />
            </label>
            <label className="lg:col-span-2">
              <span className="mb-2 block text-sm font-black">Travelers</span>
              <input
                className="w-full rounded-md border border-[#17211f]/15 px-4 py-3 font-bold outline-none focus:border-[#0d5b57]"
                max={9}
                min={1}
                onChange={(event) => setAdults(Number(event.target.value))}
                type="number"
                value={adults}
              />
            </label>
            <label className="lg:col-span-2">
              <span className="mb-2 block text-sm font-black">Cabin</span>
              <select
                className="w-full rounded-md border border-[#17211f]/15 px-4 py-3 font-bold outline-none focus:border-[#0d5b57]"
                onChange={(event) => setCabinClass(event.target.value)}
                value={cabinClass}
              >
                {cabinClasses.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </label>
            <button
              className="rounded-md bg-[#e25d3f] px-6 py-3 font-black text-white hover:bg-[#c94d34] disabled:cursor-not-allowed disabled:opacity-65 lg:col-span-2 lg:self-end"
              disabled={isLoading}
              type="submit"
            >
              {isLoading ? "Searching..." : "Search Flights"}
            </button>
          </form>

          {message ? (
            <p className="mt-5 rounded-md bg-[#f5f1e8] px-4 py-3 text-sm font-bold text-[#42514d]">
              {message}
            </p>
          ) : null}

          {results.length ? (
            <div className="mt-5 space-y-3">
              {results.map((result) => (
                <div
                  className="flex items-center justify-between gap-4 rounded-md border border-[#17211f]/10 p-4"
                  key={result.id}
                >
                  <div>
                    <p className="text-sm font-bold text-[#56635f]">Fare</p>
                    <p className="text-2xl font-black text-[#0d5b57]">
                      {result.price}
                    </p>
                  </div>
                  {result.deepLink ? (
                    <a
                      className="rounded-md bg-[#17211f] px-4 py-3 text-sm font-black text-white"
                      href={result.deepLink}
                      rel="noreferrer"
                      target="_blank"
                    >
                      Open
                    </a>
                  ) : null}
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
