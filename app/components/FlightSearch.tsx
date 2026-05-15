"use client";

import { FormEvent, useEffect, useState } from "react";

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

type SearchMode = "flights" | "hotels";

type HotelPlace = {
  placeId: string;
  name: string;
  secondaryText?: string;
  type?: string;
};

type HotelResult = {
  id: string;
  name: string;
  address?: string;
  starRating?: number;
  image?: string;
  price?: number;
  currency?: string;
  roomName?: string;
  refundable?: boolean;
};

type HotelPlacesResponse = {
  places?: HotelPlace[];
  error?: string;
};

type HotelSearchResponse = {
  hotels?: HotelResult[];
  error?: string;
  isMock?: boolean;
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
  const [mode, setMode] = useState<SearchMode>("flights");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [departureDate, setDepartureDate] = useState(() => getTodayDate());
  const [message, setMessage] = useState("");
  const [results, setResults] = useState<FlightResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hotelDestinationText, setHotelDestinationText] = useState("");
  const [selectedHotelPlace, setSelectedHotelPlace] =
    useState<HotelPlace | null>(null);
  const [hotelPlaces, setHotelPlaces] = useState<HotelPlace[]>([]);
  const [hotelCheckin, setHotelCheckin] = useState(() => getFutureDate(30));
  const [hotelCheckout, setHotelCheckout] = useState(() => getFutureDate(33));
  const [hotelAdults, setHotelAdults] = useState(2);
  const [hotelRooms, setHotelRooms] = useState(1);
  const [hotelResults, setHotelResults] = useState<HotelResult[]>([]);
  const [hotelMessage, setHotelMessage] = useState("");
  const [isHotelPlaceLoading, setIsHotelPlaceLoading] = useState(false);
  const [isHotelLoading, setIsHotelLoading] = useState(false);
  const [isHotelMock, setIsHotelMock] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState<HotelResult | null>(null);

  useEffect(() => {
    if (
      hotelDestinationText.trim().length < 2 ||
      selectedHotelPlace?.name === hotelDestinationText
    ) {
      return;
    }

    const timer = window.setTimeout(async () => {
      setIsHotelPlaceLoading(true);

      try {
        const response = await fetch(
          `/api/hotels/places?query=${encodeURIComponent(hotelDestinationText)}`,
        );
        const data = (await response.json()) as HotelPlacesResponse;

        if (!response.ok) {
          throw new Error(data.error ?? "Hotel destination search failed.");
        }

        setHotelPlaces(data.places ?? []);
      } catch (error) {
        setHotelMessage(
          error instanceof Error
            ? error.message
            : "Hotel destination search failed.",
        );
      } finally {
        setIsHotelPlaceLoading(false);
      }
    }, 350);

    return () => window.clearTimeout(timer);
  }, [hotelDestinationText, selectedHotelPlace?.name]);

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
        ? `Flights found from ${getAirportCode(origin)} to ${getAirportCode(destination)}`
        : getEmptyMessage(departureDate, data.availableDates),
    );
  }

  async function handleHotelSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setHotelMessage("");
    setHotelResults([]);
    setIsHotelMock(false);
    setSelectedHotel(null);

    if (!selectedHotelPlace?.placeId) {
      setHotelMessage("Please select a hotel destination from the suggestions.");
      return;
    }

    if (hotelCheckout <= hotelCheckin) {
      setHotelMessage("Check-out date must be after check-in date.");
      return;
    }

    setIsHotelLoading(true);

    const response = await fetch("/api/hotels/search", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        placeId: selectedHotelPlace.placeId,
        checkin: hotelCheckin,
        checkout: hotelCheckout,
        currency: "USD",
        guestNationality: "IN",
        occupancies: [{ adults: hotelAdults, rooms: hotelRooms }],
        limit: 8,
        maxRatesPerHotel: 1,
        timeout: 3,
      }),
    });
    const data = (await response.json().catch(() => ({}))) as HotelSearchResponse;

    setIsHotelLoading(false);

    if (!response.ok) {
      setHotelMessage(data.error ?? "Hotel search failed. Please try again.");
      return;
    }

    setHotelResults(data.hotels ?? []);
    setIsHotelMock(Boolean(data.isMock));
    setHotelMessage(
      data.hotels?.length
        ? `Hotels available in ${selectedHotelPlace.name}`
        : "No hotels found for this destination and date range.",
    );
  }

  function clearHotelSearchResults() {
    setHotelResults([]);
    setHotelMessage("");
    setIsHotelMock(false);
    setSelectedHotel(null);
  }

  function switchMode(nextMode: SearchMode) {
    setMode(nextMode);

    if (nextMode !== "hotels") {
      clearHotelSearchResults();
    }

    if (nextMode !== "flights") {
      handleClear();
    }
  }

  const hasExpandedFlightResults = mode === "flights" && results.length > 0;
  const hasExpandedHotelResults = mode === "hotels" && hotelResults.length > 0;
  const hasExpandedResults = hasExpandedFlightResults || hasExpandedHotelResults;

  return (
    <section id="flights" className="bg-[#0d5b57] px-4 py-10 text-white sm:px-8 sm:py-16">
      <div
        className={`mx-auto grid max-w-7xl gap-6 sm:gap-9 ${
          hasExpandedResults
            ? "lg:grid-cols-1"
            : "lg:grid-cols-[0.78fr_1.22fr] lg:items-start"
        }`}
      >
        <div
          className={
            hasExpandedResults
              ? "max-w-4xl"
              : undefined
          }
        >
          <p className="mb-3 text-xs font-black uppercase tracking-[0.16em] text-[#f4c35d] sm:mb-4 sm:text-sm">
            Flights + hotels
          </p>
          <h2 className="text-2xl font-black leading-tight sm:text-5xl">
            Search flights or hotel stays before we build the full plan.
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-white/80 sm:mt-6 sm:text-lg sm:leading-8">
            Flight search uses Aviationstack on the server. Hotel search is
            ready for LiteAPI and shows mock results until the key is added.
          </p>
        </div>

        <div className="relative z-10 rounded-lg bg-white p-4 text-[#17211f] shadow-xl shadow-black/10 sm:p-7">
          <div
            className={`mb-5 grid grid-cols-2 rounded-lg bg-[#f5f1e8] p-1 text-sm font-black ${
              hasExpandedResults ? "max-w-md" : ""
            }`}
          >
            <button
              className={`rounded-md px-4 py-3 ${
                mode === "flights"
                  ? "bg-[#0d5b57] text-white shadow-sm"
                  : "text-[#0d5b57] hover:bg-white"
              }`}
              onClick={() => switchMode("flights")}
              type="button"
            >
              Flights
            </button>
            <button
              className={`rounded-md px-4 py-3 ${
                mode === "hotels"
                  ? "bg-[#0d5b57] text-white shadow-sm"
                  : "text-[#0d5b57] hover:bg-white"
              }`}
              onClick={() => switchMode("hotels")}
              type="button"
            >
              Hotels
            </button>
          </div>

          {mode === "flights" ? (
            <form className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-6" onSubmit={handleSubmit}>
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
              <label className="min-w-0 lg:col-span-2">
                <span className="mb-2 block text-sm font-black">Depart</span>
                <input
                  className="h-12 w-full rounded-md border border-[#17211f]/15 px-3 text-base font-bold outline-none focus:border-[#0d5b57] sm:h-14 sm:px-4"
                  onChange={(event) => setDepartureDate(event.target.value)}
                  type="date"
                  value={departureDate}
                />
              </label>
              <button
                className="h-12 rounded-md bg-[#e25d3f] px-5 text-base font-black text-white hover:bg-[#c94d34] disabled:cursor-not-allowed disabled:opacity-65 sm:h-14 sm:text-lg lg:col-span-2 lg:self-end"
                disabled={isLoading}
                type="submit"
              >
                {isLoading ? "Searching..." : "Search Flights"}
              </button>
            </form>
          ) : (
            <form
              className={`grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 ${
                hasExpandedHotelResults
                  ? "xl:grid-cols-[1.4fr_0.8fr_0.8fr_0.5fr_0.5fr_auto] xl:items-end"
                  : "lg:grid-cols-6"
              }`}
              onSubmit={handleHotelSubmit}
            >
              <HotelDestinationInput
                isLoading={isHotelPlaceLoading}
                onChange={(value) => {
                  setHotelDestinationText(value);
                  setSelectedHotelPlace(null);
                  clearHotelSearchResults();
                  if (value.trim().length < 2) {
                    setHotelPlaces([]);
                  }
                }}
                onSelect={(place) => {
                  setSelectedHotelPlace(place);
                  setHotelDestinationText(place.name);
                  setHotelPlaces([]);
                  clearHotelSearchResults();
                }}
                places={hotelPlaces}
                value={hotelDestinationText}
              />
              <DateInput
                label="Check-in"
                onChange={(value) => {
                  setHotelCheckin(value);
                  clearHotelSearchResults();
                }}
                value={hotelCheckin}
              />
              <DateInput
                label="Check-out"
                onChange={(value) => {
                  setHotelCheckout(value);
                  clearHotelSearchResults();
                }}
                value={hotelCheckout}
              />
              <NumberInput
                label="Adults"
                min={1}
                onChange={(value) => {
                  setHotelAdults(value);
                  clearHotelSearchResults();
                }}
                value={hotelAdults}
              />
              <NumberInput
                label="Rooms"
                min={1}
                onChange={(value) => {
                  setHotelRooms(value);
                  clearHotelSearchResults();
                }}
                value={hotelRooms}
              />
              <button
                className="h-12 min-w-[150px] rounded-md bg-[#e25d3f] px-5 text-center text-base font-black text-white shadow-lg shadow-[#e25d3f]/20 transition hover:-translate-y-0.5 hover:bg-[#c94d34] disabled:translate-y-0 disabled:cursor-not-allowed disabled:bg-[#e25d3f]/55 disabled:shadow-none sm:h-14 lg:self-end"
                disabled={isHotelLoading || !selectedHotelPlace}
                type="submit"
              >
                {isHotelLoading ? "Searching..." : "Search Hotel"}
              </button>
            </form>
          )}

          {mode === "flights" && message ? (
            <div className="mt-5 overflow-hidden rounded-lg border border-[#0d5b57]/12 bg-[#fffaf1] shadow-sm">
              <div className="h-1 bg-[#e25d3f]" />
              <div className="flex flex-wrap items-center justify-between gap-4 px-4 py-4">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.14em] text-[#e25d3f]">
                    Flight availability
                  </p>
                  <h3 className="mt-1 text-2xl font-black leading-tight text-[#17211f]">
                    {message}
                  </h3>
                  {results.length ? (
                    <p className="mt-2 text-sm font-bold text-[#42514d]">
                      {departureDate} · {results.length} flight
                      {results.length === 1 ? "" : "s"} returned
                    </p>
                  ) : null}
                </div>
              <button
                className="rounded-md border border-[#17211f]/20 bg-white px-3 py-2 text-sm font-black text-[#17211f] hover:border-[#0d5b57] hover:text-[#0d5b57]"
                onClick={handleClear}
                type="button"
              >
                Clear
              </button>
              </div>
            </div>
          ) : null}

          {mode === "hotels" && hotelMessage ? (
            <div className="mt-5 overflow-hidden rounded-lg border border-[#0d5b57]/12 bg-[#fffaf1] shadow-sm">
              <div className="h-1 bg-[#e25d3f]" />
              <div className="grid gap-4 p-4 sm:grid-cols-[1fr_auto] sm:items-center">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.14em] text-[#e25d3f]">
                    Hotel availability
                  </p>
                  <h3 className="mt-1 text-2xl font-black leading-tight text-[#17211f]">
                    {hotelMessage}
                  </h3>
                  {hotelResults.length ? (
                    <div className="mt-3 flex flex-wrap gap-2 text-xs font-black text-[#42514d]">
                      <span className="rounded-md bg-white px-3 py-2 shadow-sm">
                        {hotelCheckin} to {hotelCheckout}
                      </span>
                      <span className="rounded-md bg-white px-3 py-2 shadow-sm">
                        {hotelAdults} adult{hotelAdults === 1 ? "" : "s"}
                      </span>
                      <span className="rounded-md bg-white px-3 py-2 shadow-sm">
                        {hotelRooms} room{hotelRooms === 1 ? "" : "s"}
                      </span>
                    </div>
                  ) : null}
                </div>
                {hotelResults.length ? (
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="rounded-lg bg-[#0d5b57] px-4 py-3 text-white shadow-lg shadow-[#0d5b57]/15">
                      <p className="text-3xl font-black">{hotelResults.length}</p>
                      <p className="text-xs font-black uppercase text-white/72">
                        available
                      </p>
                    </div>
                    <button
                      className="rounded-md border border-[#17211f]/20 bg-white px-3 py-2 text-sm font-black text-[#17211f] hover:border-[#0d5b57] hover:text-[#0d5b57]"
                      onClick={clearHotelSearchResults}
                      type="button"
                    >
                      Clear
                    </button>
                  </div>
                ) : null}
              </div>
              {isHotelMock ? (
                <p className="border-t border-[#17211f]/10 px-4 py-3 text-xs font-black uppercase text-[#715010]">
                  Mock hotel results are showing because LITEAPI_KEY is not set.
                </p>
              ) : null}
            </div>
          ) : null}

          {mode === "flights" && results.length ? (
            <div className="mt-5 space-y-4">
              {results.map((result) => (
                <div
                  className="grid overflow-hidden rounded-lg border border-[#17211f]/10 bg-[#fbfaf6] shadow-sm lg:grid-cols-[220px_1fr_auto] lg:items-stretch"
                  key={`flight-${result.id}`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#17211f]/10 bg-white px-4 py-3 lg:block lg:border-b-0 lg:border-r lg:py-5">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-black text-[#17211f]">
                        {result.airline}
                      </p>
                      <p className="mt-1 text-xs font-bold text-[#56635f]">
                        {result.flightCode}
                      </p>
                    </div>
                    <span className={`rounded-full px-3 py-1 text-xs font-black lg:mt-4 lg:inline-block ${getStatusClass(result.status)}`}>
                      {formatStatus(result.status)}
                    </span>
                  </div>

                  <div className="grid gap-4 p-4 sm:grid-cols-[1fr_auto_1fr] sm:items-center lg:px-6">
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

                  <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#17211f]/10 px-4 py-3 lg:block lg:border-l lg:border-t-0 lg:py-5">
                    <p className="text-xs font-bold text-[#56635f]">
                      Flight date: {result.flightDate ?? "Not listed"}
                    </p>
                    <a
                      className="rounded-md bg-[#e25d3f] px-4 py-3 text-sm font-black text-white hover:bg-[#c94d34] lg:mt-4 lg:inline-block"
                      href="tel:+18883334391"
                    >
                      Book this flight
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : null}

          {mode === "hotels" && hotelResults.length ? (
            <div
              className={`mt-5 grid gap-4 ${
                hasExpandedHotelResults
                  ? "lg:grid-cols-2 xl:grid-cols-3"
                  : "lg:grid-cols-2"
              }`}
            >
              {hotelResults.map((hotel) => (
                <HotelResultCard
                  hotel={hotel}
                  key={hotel.id}
                  onViewDetails={setSelectedHotel}
                />
              ))}
            </div>
          ) : null}
        </div>
      </div>
      {selectedHotel ? (
        <HotelDetailsModal
          hotel={selectedHotel}
          onClose={() => setSelectedHotel(null)}
        />
      ) : null}
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
  const inputId = `flight-${label.toLowerCase()}-airport`;

  function selectAirport(airport: AirportOption) {
    onChange(formatAirportSelection(airport));
    setIsFocused(false);
  }

  return (
    <div className="block min-w-0 lg:col-span-1">
      <label className="mb-2 block text-sm font-black" htmlFor={inputId}>
        {label}
      </label>
      <input
        aria-label={label}
        autoComplete="off"
        className="pointer-events-auto h-12 w-full touch-manipulation rounded-md border border-[#17211f]/15 bg-white px-3 text-base font-black outline-none placeholder:text-[#17211f]/35 focus:border-[#0d5b57] focus:ring-2 focus:ring-[#0d5b57]/12 sm:h-14 sm:px-4 sm:text-sm"
        onBlur={() => {
          window.setTimeout(() => setIsFocused(false), 260);
        }}
        onChange={(event) => onChange(event.target.value)}
        onFocus={() => setIsFocused(true)}
        placeholder={placeholder}
        required
        spellCheck={false}
        type="text"
        id={inputId}
        value={value}
      />
      {isFocused && suggestions.length ? (
        <div className="mt-2 max-h-64 overflow-y-auto rounded-lg border border-[#17211f]/10 bg-white p-2 shadow-lg shadow-[#17211f]/10">
          {suggestions.map((airport) => (
            <button
              className="flex w-full touch-manipulation items-center justify-between gap-3 rounded-md px-3 py-3 text-left hover:bg-[#f5f1e8]"
              key={`${label}-${airport.code}`}
              onMouseDown={(event) => event.preventDefault()}
              onPointerDown={(event) => {
                event.preventDefault();
                selectAirport(airport);
              }}
              onClick={() => {
                selectAirport(airport);
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

function HotelDestinationInput({
  isLoading,
  onChange,
  onSelect,
  places,
  value,
}: {
  isLoading: boolean;
  onChange: (value: string) => void;
  onSelect: (place: HotelPlace) => void;
  places: HotelPlace[];
  value: string;
}) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="block min-w-0 sm:col-span-2 lg:col-span-2">
      <label className="mb-2 block text-sm font-black" htmlFor="hotel-place">
        Destination
      </label>
      <div className="relative">
        <input
          autoComplete="off"
          className="h-12 w-full rounded-md border border-[#17211f]/15 bg-white px-3 text-base font-black outline-none placeholder:text-[#17211f]/35 focus:border-[#0d5b57] focus:ring-2 focus:ring-[#0d5b57]/12 sm:h-14 sm:px-4"
          id="hotel-place"
          onBlur={() => window.setTimeout(() => setIsFocused(false), 220)}
          onChange={(event) => onChange(event.target.value)}
          onFocus={() => setIsFocused(true)}
          placeholder="City, airport, or hotel"
          type="text"
          value={value}
        />
      </div>
      {isFocused && value.trim().length >= 2 ? (
        <div className="mt-2 max-h-64 overflow-y-auto rounded-lg border border-[#17211f]/10 bg-white p-2 shadow-lg shadow-[#17211f]/10">
          {isLoading ? (
            <p className="px-3 py-3 text-sm font-bold text-[#56635f]">
              Searching destinations...
            </p>
          ) : places.length ? (
            places.map((place) => (
              <button
                className="flex w-full items-center justify-between gap-3 rounded-md px-3 py-3 text-left hover:bg-[#f5f1e8]"
                key={place.placeId}
                onMouseDown={(event) => event.preventDefault()}
                onPointerDown={(event) => {
                  event.preventDefault();
                  onSelect(place);
                  setIsFocused(false);
                }}
                onClick={() => {
                  onSelect(place);
                  setIsFocused(false);
                }}
                type="button"
              >
                <span className="min-w-0">
                  <span className="block truncate text-sm font-black text-[#17211f]">
                    {place.name}
                  </span>
                  <span className="mt-1 block truncate text-xs font-bold text-[#56635f]">
                    {place.secondaryText || place.type || "Location"}
                  </span>
                </span>
                <span className="shrink-0 rounded-md bg-[#0d5b57]/10 px-3 py-2 text-xs font-black uppercase text-[#0d5b57]">
                  {place.type || "place"}
                </span>
              </button>
            ))
          ) : (
            <p className="px-3 py-3 text-sm font-bold text-[#56635f]">
              No matching locations found.
            </p>
          )}
        </div>
      ) : null}
    </div>
  );
}

function DateInput({
  label,
  onChange,
  value,
}: {
  label: string;
  onChange: (value: string) => void;
  value: string;
}) {
  return (
    <label className="min-w-0">
      <span className="mb-2 block text-sm font-black">{label}</span>
      <input
        className="h-12 w-full rounded-md border border-[#17211f]/15 px-3 text-base font-bold outline-none focus:border-[#0d5b57] sm:h-14 sm:px-4"
        onChange={(event) => onChange(event.target.value)}
        type="date"
        value={value}
      />
    </label>
  );
}

function NumberInput({
  label,
  min,
  onChange,
  value,
}: {
  label: string;
  min: number;
  onChange: (value: number) => void;
  value: number;
}) {
  return (
    <label className="min-w-0">
      <span className="mb-2 block text-sm font-black">{label}</span>
      <input
        className="h-12 w-full rounded-md border border-[#17211f]/15 px-3 text-base font-bold outline-none focus:border-[#0d5b57] sm:h-14 sm:px-4"
        min={min}
        onChange={(event) => onChange(Number(event.target.value))}
        type="number"
        value={value}
      />
    </label>
  );
}

function HotelResultCard({
  hotel,
  onViewDetails,
}: {
  hotel: HotelResult;
  onViewDetails: (hotel: HotelResult) => void;
}) {
  return (
    <article className="overflow-hidden rounded-lg border border-[#17211f]/10 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#17211f]/10">
      <div
        className="relative min-h-[190px] bg-[#0d5b57]/10 bg-cover bg-center"
        style={{
          backgroundImage: `url("${hotel.image || "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=84"}")`,
        }}
      >
        <div className="absolute left-3 top-3 rounded-md bg-white/94 px-3 py-2 text-xs font-black text-[#0d5b57] shadow-sm">
          {hotel.starRating ? `${Math.round(hotel.starRating)} star` : "Rating TBA"}
        </div>
        {typeof hotel.refundable === "boolean" ? (
          <div className="absolute bottom-3 left-3 rounded-md bg-[#17211f]/86 px-3 py-2 text-xs font-black text-white">
            {hotel.refundable ? "Refundable" : "Non-refundable"}
          </div>
        ) : null}
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3 className="text-xl font-black leading-tight text-[#17211f]">
              {hotel.name}
            </h3>
            <p className="mt-2 text-sm font-bold leading-6 text-[#56635f]">
              {hotel.address || "Location available on request"}
            </p>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2 text-xs font-black text-[#42514d]">
          <span className="rounded-md bg-[#f5f1e8] px-3 py-2">
            {hotel.roomName || "Room details available"}
          </span>
        </div>
        <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-[#17211f]/10 pt-4">
          <HotelPriceBlock hotel={hotel} />
          <button
            className="rounded-md bg-[#17211f] px-4 py-3 text-sm font-black text-white hover:bg-[#0d5b57]"
            onClick={() => onViewDetails(hotel)}
            type="button"
          >
            View Details
          </button>
        </div>
      </div>
    </article>
  );
}

function HotelDetailsModal({
  hotel,
  onClose,
}: {
  hotel: HotelResult;
  onClose: () => void;
}) {
  const whatsappText = encodeURIComponent(
    `Hi, I want details for ${hotel.name} on Faith Tour Travel.`,
  );

  return (
    <div className="fixed inset-0 z-[90] flex items-end bg-[#17211f]/62 px-4 py-4 backdrop-blur-sm sm:items-center sm:justify-center">
      <div className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-lg bg-white text-[#17211f] shadow-2xl">
        <div
          className="relative min-h-[220px] bg-[#0d5b57]/10 bg-cover bg-center sm:min-h-[320px]"
          style={{
            backgroundImage: `url("${hotel.image || "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=84"}")`,
          }}
        >
          <button
            aria-label="Close hotel details"
            className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white/92 text-lg font-black text-[#17211f] shadow-lg hover:bg-white"
            onClick={onClose}
            type="button"
          >
            x
          </button>
        </div>
        <div className="p-5 sm:p-7">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.14em] text-[#e25d3f]">
                Hotel details
              </p>
              <h3 className="mt-2 text-3xl font-black leading-tight text-[#17211f]">
                {hotel.name}
              </h3>
              <p className="mt-3 text-sm font-bold leading-6 text-[#56635f]">
                {hotel.address || "Location available on request"}
              </p>
            </div>
            <span className="w-fit shrink-0 rounded-md bg-[#f4c35d]/25 px-3 py-2 text-xs font-black text-[#715010]">
              {hotel.starRating ? `${Math.round(hotel.starRating)} star` : "Rating TBA"}
            </span>
          </div>

          <div className="mt-6 border-y border-[#17211f]/10 py-5">
            <p className="text-xs font-black uppercase tracking-[0.14em] text-[#56635f]">
              Approx. total
            </p>
            <p className="mt-2 text-5xl font-black leading-none text-[#e25d3f]">
              <span className="mr-2 align-middle text-base text-[#c94d34]">
                {hotel.currency || "USD"}
              </span>
              {formatHotelPrice(hotel.price)}
            </p>
            <p className="mt-2 text-xs font-bold text-[#56635f]">
              Live rate from the current hotel availability search.
            </p>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <HotelDetailItem
              label="Room"
              value={hotel.roomName || "Room details available"}
            />
            <HotelDetailItem
              label="Cancellation"
              value={
                typeof hotel.refundable === "boolean"
                  ? hotel.refundable
                    ? "Refundable"
                    : "Non-refundable"
                  : "Policy available on request"
              }
            />
            <HotelDetailItem
              label="Currency"
              value={hotel.currency || "USD"}
            />
            <HotelDetailItem label="Hotel ID" value={hotel.id} />
          </div>

          <div className="mt-6 rounded-lg bg-[#f5f1e8] p-4">
            <p className="text-sm font-black text-[#17211f]">
              Rate note
            </p>
            <p className="mt-2 text-sm font-bold leading-6 text-[#56635f]">
              Prices and rooms are live search results and may change until the
              booking is confirmed by the travel team.
            </p>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a
              className="rounded-md bg-[#18a058] px-5 py-3 text-center text-sm font-black text-white hover:bg-[#128348]"
              href={`https://wa.me/15799005844?text=${whatsappText}`}
              rel="noreferrer"
              target="_blank"
            >
              Ask on WhatsApp
            </a>
            <a
              className="rounded-md bg-[#17211f] px-5 py-3 text-center text-sm font-black text-white hover:bg-[#0d5b57]"
              href="tel:+18883334391"
            >
              Call Travel Expert
            </a>
            <button
              className="rounded-md border border-[#17211f]/15 px-5 py-3 text-sm font-black text-[#17211f] hover:border-[#e25d3f] hover:text-[#e25d3f]"
              onClick={onClose}
              type="button"
            >
              Back to Results
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function HotelDetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-[#17211f]/10 bg-[#fbfaf6] p-4">
      <p className="text-xs font-black uppercase tracking-[0.12em] text-[#e25d3f]">
        {label}
      </p>
      <p className="mt-2 text-sm font-black leading-6 text-[#17211f]">
        {value}
      </p>
    </div>
  );
}

function HotelPriceBlock({ hotel }: { hotel: HotelResult }) {
  return (
    <div>
      <p className="text-[11px] font-black uppercase tracking-[0.12em] text-[#56635f]">
        From
      </p>
      <p className="mt-1 text-3xl font-black leading-none text-[#e25d3f]">
        <span className="mr-1 align-middle text-xs text-[#c94d34]">
          {hotel.currency || "USD"}
        </span>
        {formatHotelPrice(hotel.price)}
      </p>
      <p className="mt-1 text-[11px] font-bold text-[#56635f]">
        approx. total
      </p>
    </div>
  );
}

function formatHotelPrice(price?: number) {
  return price ? Math.round(price).toLocaleString("en-US") : "TBA";
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

function getFutureDate(daysAhead: number) {
  const date = new Date();
  date.setDate(date.getDate() + daysAhead);

  return date.toISOString().slice(0, 10);
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
