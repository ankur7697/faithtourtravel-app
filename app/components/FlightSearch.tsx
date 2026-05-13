"use client";

import { FormEvent, useState } from "react";

type AirportOption = {
  airport: string;
  city: string;
  code: string;
  country: string;
};

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

const airportOptions: AirportOption[] = [
  {
    airport: "John F. Kennedy International Airport",
    city: "New York",
    code: "JFK",
    country: "United States",
  },
  {
    airport: "Los Angeles International Airport",
    city: "Los Angeles",
    code: "LAX",
    country: "United States",
  },
  {
    airport: "Hartsfield-Jackson Atlanta International Airport",
    city: "Atlanta",
    code: "ATL",
    country: "United States",
  },
  {
    airport: "Chicago O'Hare International Airport",
    city: "Chicago",
    code: "ORD",
    country: "United States",
  },
  {
    airport: "Dallas Fort Worth International Airport",
    city: "Dallas",
    code: "DFW",
    country: "United States",
  },
  {
    airport: "San Francisco International Airport",
    city: "San Francisco",
    code: "SFO",
    country: "United States",
  },
  {
    airport: "Miami International Airport",
    city: "Miami",
    code: "MIA",
    country: "United States",
  },
  {
    airport: "Seattle-Tacoma International Airport",
    city: "Seattle",
    code: "SEA",
    country: "United States",
  },
  {
    airport: "Heathrow Airport",
    city: "London",
    code: "LHR",
    country: "United Kingdom",
  },
  {
    airport: "Charles de Gaulle Airport",
    city: "Paris",
    code: "CDG",
    country: "France",
  },
  {
    airport: "Dubai International Airport",
    city: "Dubai",
    code: "DXB",
    country: "United Arab Emirates",
  },
  {
    airport: "Singapore Changi Airport",
    city: "Singapore",
    code: "SIN",
    country: "Singapore",
  },
  {
    airport: "Sydney Kingsford Smith Airport",
    city: "Sydney",
    code: "SYD",
    country: "Australia",
  },
  {
    airport: "Toronto Pearson International Airport",
    city: "Toronto",
    code: "YYZ",
    country: "Canada",
  },
  {
    airport: "Tokyo Haneda Airport",
    city: "Tokyo",
    code: "HND",
    country: "Japan",
  },
  {
    airport: "Doha Hamad International Airport",
    city: "Doha",
    code: "DOH",
    country: "Qatar",
  },
];

export default function FlightSearch() {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [departureDate, setDepartureDate] = useState(() => getTodayDate());
  const [message, setMessage] = useState("");
  const [results, setResults] = useState<FlightResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  function handleClear() {
    setOrigin("");
    setDestination("");
    setDepartureDate(getTodayDate());
    setMessage("");
    setResults([]);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setMessage("");
    setResults([]);

    const response = await fetch("/api/flights", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        origin: getAirportCode(origin),
        destination: getAirportCode(destination),
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
            <AirportInput
              label="From"
              onChange={setOrigin}
              placeholder="City or airport code"
              value={origin}
            />
            <AirportInput
              label="To"
              onChange={setDestination}
              placeholder="City or airport code"
              value={destination}
            />
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
              className="col-span-2 h-12 rounded-md bg-[#e25d3f] px-5 text-base font-black text-white hover:bg-[#c94d34] disabled:cursor-not-allowed disabled:opacity-65 sm:h-14 sm:text-lg lg:col-span-2 lg:self-end"
              disabled={isLoading}
              type="submit"
            >
              {isLoading ? "Searching..." : "Search Flights"}
            </button>
          </form>

          {message ? (
            <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-md bg-[#f5f1e8] px-4 py-3">
              <p className="text-sm font-bold text-[#42514d]">{message}</p>
              <button
                className="rounded-md border border-[#17211f]/20 px-3 py-2 text-sm font-black text-[#17211f] hover:border-[#0d5b57] hover:text-[#0d5b57]"
                onClick={handleClear}
                type="button"
              >
                Clear
              </button>
            </div>
          ) : null}

          {results.length ? (
            <div className="mt-5 space-y-4">
              {results.map((result) => (
                <div
                  className="overflow-hidden rounded-lg border border-[#17211f]/10 bg-[#fbfaf6] shadow-sm"
                  key={`flight-${result.id}`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#17211f]/10 bg-white px-4 py-3">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-black text-[#17211f]">
                        {result.airline}
                      </p>
                      <p className="mt-1 text-xs font-bold text-[#56635f]">
                        {result.flightCode}
                      </p>
                    </div>
                    <span className={`rounded-full px-3 py-1 text-xs font-black ${getStatusClass(result.status)}`}>
                      {formatStatus(result.status)}
                    </span>
                  </div>

                  <div className="grid gap-4 p-4 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
                    <AirportBlock
                      airport={result.departure.airport}
                      code={result.departure.iata ?? "DEP"}
                      delay={result.departure.delay}
                      label="Departure"
                      time={result.departure.scheduled}
                    />

                    <div className="hidden min-w-24 items-center justify-center sm:flex">
                      <div className="h-px w-10 bg-[#17211f]/20" />
                      <div className="grid h-9 w-9 place-items-center rounded-full bg-[#17211f] text-xs font-black text-white">
                        To
                      </div>
                      <div className="h-px w-10 bg-[#17211f]/20" />
                    </div>

                    <AirportBlock
                      airport={result.arrival.airport}
                      code={result.arrival.iata ?? "ARR"}
                      delay={result.arrival.delay}
                      label="Arrival"
                      time={result.arrival.scheduled}
                    />
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#17211f]/10 px-4 py-3">
                    <p className="text-xs font-bold text-[#56635f]">
                      Flight date: {result.flightDate ?? "Not listed"}
                    </p>
                    <a
                      className="rounded-md bg-[#e25d3f] px-4 py-3 text-sm font-black text-white hover:bg-[#c94d34]"
                      href="tel:+18883334391"
                    >
                      Book this flight
                    </a>
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

function AirportBlock({
  airport,
  code,
  delay,
  label,
  time,
}: {
  airport?: string;
  code: string;
  delay?: number | null;
  label: string;
  time?: string | null;
}) {
  return (
    <div className="min-w-0">
      <p className="text-xs font-black uppercase tracking-[0.14em] text-[#e25d3f]">
        {label}
      </p>
      <div className="mt-2 flex items-baseline gap-3">
        <p className="text-3xl font-black text-[#0d5b57]">{code}</p>
        <p className="text-base font-black text-[#17211f]">
          {formatTime(time)}
          {formatDelay(delay)}
        </p>
      </div>
      <p className="mt-2 line-clamp-2 text-sm font-bold leading-6 text-[#56635f]">
        {airport ?? "Airport not listed"}
      </p>
      <p className="mt-1 text-xs font-bold text-[#42514d]">
        {formatDate(time)}
      </p>
    </div>
  );
}

function AirportInput({
  label,
  onChange,
  placeholder,
  value,
}: {
  label: string;
  onChange: (value: string) => void;
  placeholder: string;
  value: string;
}) {
  const [isFocused, setIsFocused] = useState(false);
  const suggestions = getAirportSuggestions(value);

  return (
    <div className="relative min-w-0 lg:col-span-1">
      <span className="mb-2 block text-sm font-black">{label}</span>
      <input
        autoComplete="off"
        className="h-12 w-full rounded-md border border-[#17211f]/15 px-3 text-sm font-black outline-none placeholder:text-[#17211f]/25 focus:border-[#0d5b57] sm:h-14 sm:px-4"
        onBlur={() => {
          window.setTimeout(() => setIsFocused(false), 140);
        }}
        onChange={(event) => onChange(event.target.value)}
        onFocus={() => setIsFocused(true)}
        placeholder={placeholder}
        required
        value={value}
      />
      {isFocused && suggestions.length ? (
        <div className="absolute left-0 right-0 top-full z-20 mt-2 max-h-72 overflow-y-auto rounded-lg border border-[#17211f]/10 bg-white p-2 shadow-xl shadow-[#17211f]/15">
          {suggestions.map((airport) => (
            <button
              className="flex w-full items-center justify-between gap-3 rounded-md px-3 py-3 text-left hover:bg-[#f5f1e8]"
              key={`${label}-${airport.code}`}
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => {
                onChange(formatAirportSelection(airport));
                setIsFocused(false);
              }}
              type="button"
            >
              <span className="min-w-0">
                <span className="block truncate text-sm font-black text-[#17211f]">
                  {airport.city}, {airport.country}
                </span>
                <span className="mt-1 block truncate text-xs font-bold text-[#56635f]">
                  {airport.airport}
                </span>
              </span>
              <span className="shrink-0 rounded-md bg-[#0d5b57]/10 px-3 py-2 text-sm font-black text-[#0d5b57]">
                {airport.code}
              </span>
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function getAirportSuggestions(value: string) {
  const query = value.trim().toLowerCase();

  if (!query) {
    return airportOptions.slice(0, 6);
  }

  return airportOptions
    .filter((airport) => {
      return [
        airport.airport,
        airport.city,
        airport.code,
        airport.country,
      ].some((field) => field.toLowerCase().includes(query));
    })
    .slice(0, 6);
}

function formatAirportSelection(airport: AirportOption) {
  return `${airport.city} (${airport.code})`;
}

function getAirportCode(value: string) {
  const parenthesizedCode = value.match(/\(([A-Za-z]{3})\)/);

  if (parenthesizedCode?.[1]) {
    return parenthesizedCode[1].toUpperCase();
  }

  const directCode = value.trim().match(/^[A-Za-z]{3}$/);

  if (directCode?.[0]) {
    return directCode[0].toUpperCase();
  }

  const matchedAirport = airportOptions.find((airport) => {
    const normalizedValue = value.trim().toLowerCase();

    return (
      airport.city.toLowerCase() === normalizedValue ||
      airport.airport.toLowerCase() === normalizedValue
    );
  });

  return matchedAirport?.code ?? value.trim().toUpperCase();
}

function getTodayDate() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
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

function formatDate(value?: string | null) {
  if (!value) {
    return "Date TBA";
  }

  return new Intl.DateTimeFormat("en-IN", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

function formatDelay(value?: number | null) {
  return typeof value === "number" && value > 0 ? ` +${value}m` : "";
}

function formatStatus(value: string) {
  const normalized = value.toLowerCase();

  const labels: Record<string, string> = {
    active: "In flight",
    scheduled: "Scheduled",
    landed: "Landed",
    cancelled: "Cancelled",
    incident: "Incident",
    diverted: "Diverted",
    unknown: "Status unavailable",
  };

  return labels[normalized] ?? "Status unavailable";
}

function getStatusClass(value: string) {
  const normalized = value.toLowerCase();

  if (normalized === "active") {
    return "bg-[#0d5b57]/10 text-[#0d5b57]";
  }

  if (normalized === "scheduled") {
    return "bg-[#f4c35d]/25 text-[#715010]";
  }

  if (normalized === "landed") {
    return "bg-[#17211f]/10 text-[#17211f]";
  }

  if (normalized === "cancelled" || normalized === "incident") {
    return "bg-[#e25d3f]/12 text-[#b43d27]";
  }

  return "bg-[#56635f]/12 text-[#42514d]";
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
