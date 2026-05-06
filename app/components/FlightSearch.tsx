"use client";

import { FormEvent, useState } from "react";

type FlightResult = {
  id: string;
  flightCode: string;
  airline: string;
  status: string;
  flightDate?: string;
  departure: {
    airport?: string;
    iata?: string;
    terminal?: string | null;
    gate?: string | null;
    delay?: number | null;
    scheduled?: string | null;
  };
  arrival: {
    airport?: string;
    iata?: string;
    terminal?: string | null;
    gate?: string | null;
    delay?: number | null;
    scheduled?: string | null;
  };
};

type SearchResponse = {
  error?: string;
  availableDates?: string[];
  flights?: FlightResult[];
};

export default function FlightSearch() {
  const [origin, setOrigin] = useState("DEL");
  const [destination, setDestination] = useState("DXB");
  const [departureDate, setDepartureDate] = useState("");
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
        departureDate: departureDate || undefined,
      }),
    });

    const data = (await response.json()) as SearchResponse;

    setIsLoading(false);

    if (!response.ok) {
      setMessage(data.error ?? "Flight search failed. Please try again.");
      return;
    }

    setResults(data.flights ?? []);
    setMessage(
      data.flights?.length
        ? "Flight status search completed."
        : getEmptyMessage(departureDate, data.availableDates),
    );
  }

  return (
    <section id="flights" className="bg-[#0d5b57] px-4 py-10 text-white sm:px-8 sm:py-16">
      <div className="mx-auto grid max-w-7xl gap-6 sm:gap-9 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
        <div>
          <p className="mb-3 text-xs font-black uppercase tracking-[0.16em] text-[#f4c35d] sm:mb-4 sm:text-sm">
            Live flight search
          </p>
          <h2 className="text-2xl font-black leading-tight sm:text-5xl">
            Check flight status before we build the full plan.
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-white/80 sm:mt-6 sm:text-lg sm:leading-8">
            This connects through your Aviationstack key on the server. Until
            the key is added, the form will show a setup message.
          </p>
        </div>

        <div className="rounded-lg bg-white p-4 text-[#17211f] shadow-xl shadow-black/10 sm:p-7">
          <form className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-6" onSubmit={handleSubmit}>
            <label className="min-w-0 lg:col-span-1">
              <span className="mb-2 block text-sm font-black">From</span>
              <input
                className="h-12 w-full rounded-md border border-[#17211f]/15 px-3 text-lg font-black uppercase outline-none focus:border-[#0d5b57] sm:h-14 sm:px-4"
                maxLength={3}
                minLength={3}
                onChange={(event) => setOrigin(event.target.value.toUpperCase())}
                required
                value={origin}
              />
            </label>
            <label className="min-w-0 lg:col-span-1">
              <span className="mb-2 block text-sm font-black">To</span>
              <input
                className="h-12 w-full rounded-md border border-[#17211f]/15 px-3 text-lg font-black uppercase outline-none focus:border-[#0d5b57] sm:h-14 sm:px-4"
                maxLength={3}
                minLength={3}
                onChange={(event) =>
                  setDestination(event.target.value.toUpperCase())
                }
                required
                value={destination}
              />
            </label>
            <label className="col-span-2 min-w-0 sm:col-span-1 lg:col-span-2">
              <span className="mb-2 block text-sm font-black">Depart</span>
              <input
                className="h-12 w-full rounded-md border border-[#17211f]/15 px-3 font-bold outline-none focus:border-[#0d5b57] sm:h-14 sm:px-4"
                onChange={(event) => setDepartureDate(event.target.value)}
                type="date"
                value={departureDate}
              />
            </label>
            <button
              className="col-span-2 h-12 rounded-md bg-[#e25d3f] px-6 text-base font-black text-white hover:bg-[#c94d34] disabled:cursor-not-allowed disabled:opacity-65 sm:h-14 sm:text-lg lg:col-span-2 lg:self-end"
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
                  className="flex flex-wrap items-center justify-between gap-4 rounded-md border border-[#17211f]/10 p-4"
                  key={result.id}
                >
                  <div>
                    <p className="text-sm font-bold text-[#56635f]">
                      {result.airline}
                    </p>
                    <p className="text-2xl font-black text-[#0d5b57]">
                      {result.flightCode}
                    </p>
                    <p className="mt-1 text-sm font-bold capitalize text-[#42514d]">
                      {result.status}
                    </p>
                  </div>
                  <div className="grid gap-2 text-sm font-bold text-[#42514d] sm:grid-cols-2">
                    <p>
                      {result.departure.iata ?? "DEP"}{" "}
                      {formatTime(result.departure.scheduled)}
                      {formatDelay(result.departure.delay)}
                    </p>
                    <p>
                      {result.arrival.iata ?? "ARR"}{" "}
                      {formatTime(result.arrival.scheduled)}
                      {formatDelay(result.arrival.delay)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function formatTime(value?: string | null) {
  if (!value) {
    return "time TBA";
  }

  return new Intl.DateTimeFormat("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    day: "2-digit",
    month: "short",
  }).format(new Date(value));
}

function formatDelay(value?: number | null) {
  return typeof value === "number" && value > 0 ? ` +${value}m` : "";
}

function getEmptyMessage(selectedDate: string, availableDates?: string[]) {
  if (!selectedDate) {
    return "Search completed, but no matching flights were returned.";
  }

  if (!availableDates?.length) {
    return "No flights were returned for this route.";
  }

  return `No matching flights for ${selectedDate}. Aviationstack returned flights for ${availableDates.join(", ")}.`;
}
