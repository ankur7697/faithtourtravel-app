import { NextResponse } from "next/server";

const SKYSCANNER_BASE_URL = "https://partners.api.skyscanner.net";

type FlightSearchRequest = {
  origin: string;
  destination: string;
  departureDate: string;
  returnDate?: string;
  adults?: number;
  cabinClass?: string;
  market?: string;
  locale?: string;
  currency?: string;
};

type JsonObject = Record<string, unknown>;

export async function POST(request: Request) {
  const apiKey = process.env.SKYSCANNER_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      {
        error:
          "Skyscanner API key is not configured. Add SKYSCANNER_API_KEY to .env.local after Skyscanner approves your access.",
      },
      { status: 503 },
    );
  }

  let body: FlightSearchRequest;

  try {
    body = (await request.json()) as FlightSearchRequest;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const validationError = validateSearch(body);

  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 });
  }

  const createResponse = await fetch(
    `${SKYSCANNER_BASE_URL}/apiservices/v3/flights/live/search/create`,
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": apiKey,
      },
      body: JSON.stringify({
        query: {
          market: body.market ?? "IN",
          locale: body.locale ?? "en-GB",
          currency: body.currency ?? "INR",
          queryLegs: buildQueryLegs(body),
          adults: body.adults ?? 1,
          cabinClass: body.cabinClass ?? "CABIN_CLASS_ECONOMY",
        },
      }),
      cache: "no-store",
    },
  );

  const createData = (await createResponse.json().catch(() => ({}))) as JsonObject;

  if (!createResponse.ok) {
    return NextResponse.json(
      {
        error: "Skyscanner search request failed.",
        details: createData,
      },
      { status: createResponse.status },
    );
  }

  const sessionToken = getString(createData.sessionToken);
  let pollData: JsonObject | undefined;

  if (sessionToken) {
    const pollResponse = await fetch(
      `${SKYSCANNER_BASE_URL}/apiservices/v3/flights/live/search/poll/${sessionToken}`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-api-key": apiKey,
        },
        cache: "no-store",
      },
    );

    pollData = (await pollResponse.json().catch(() => ({}))) as JsonObject;
  }

  const responseData = pollData ?? createData;

  return NextResponse.json({
    status: getString(responseData.status) ?? getString(createData.status),
    sessionToken,
    itineraries: normalizeItineraries(responseData),
  });
}

function validateSearch(body: FlightSearchRequest) {
  if (!isIata(body.origin)) {
    return "Origin must be a 3-letter IATA airport code, for example DEL.";
  }

  if (!isIata(body.destination)) {
    return "Destination must be a 3-letter IATA airport code, for example DXB.";
  }

  if (!isIsoDate(body.departureDate)) {
    return "Departure date must be a valid date.";
  }

  if (body.returnDate && !isIsoDate(body.returnDate)) {
    return "Return date must be a valid date.";
  }

  if (body.returnDate && body.returnDate < body.departureDate) {
    return "Return date must be after the departure date.";
  }

  if (body.adults !== undefined && (body.adults < 1 || body.adults > 9)) {
    return "Adults must be between 1 and 9.";
  }

  return "";
}

function buildQueryLegs(body: FlightSearchRequest) {
  const legs = [
    {
      originPlaceId: { iata: body.origin.toUpperCase() },
      destinationPlaceId: { iata: body.destination.toUpperCase() },
      date: toSkyscannerDate(body.departureDate),
    },
  ];

  if (body.returnDate) {
    legs.push({
      originPlaceId: { iata: body.destination.toUpperCase() },
      destinationPlaceId: { iata: body.origin.toUpperCase() },
      date: toSkyscannerDate(body.returnDate),
    });
  }

  return legs;
}

function toSkyscannerDate(value: string) {
  const [year, month, day] = value.split("-").map(Number);

  return { year, month, day };
}

function isIata(value: unknown) {
  return typeof value === "string" && /^[A-Za-z]{3}$/.test(value.trim());
}

function isIsoDate(value: unknown) {
  return typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value);
}

function normalizeItineraries(data: JsonObject) {
  const itineraries = getRecord(data.content)
    ? getRecord(getRecord(data.content)?.results)?.itineraries
    : undefined;
  const itineraryRecords = getRecord(itineraries);

  if (!itineraryRecords) {
    return [];
  }

  return Object.entries(itineraryRecords)
    .slice(0, 6)
    .map(([id, value]) => {
      const itinerary = getRecord(value);
      const pricingOptions = Array.isArray(itinerary?.pricingOptions)
        ? itinerary.pricingOptions
        : [];
      const firstOption = getRecord(pricingOptions[0]);
      const firstPrice = firstOption?.price;
      const amount =
        getString(getRecord(firstPrice)?.formatted) ??
        getString(getRecord(firstPrice)?.amount);
      const optionItems = Array.isArray(firstOption?.items)
        ? firstOption.items
        : [];
      const firstItem = getRecord(optionItems[0]);

      return {
        id,
        price: amount ?? "Price available",
        deepLink: getString(firstItem?.deepLink),
      };
    });
}

function getRecord(value: unknown): JsonObject | undefined {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as JsonObject)
    : undefined;
}

function getString(value: unknown) {
  return typeof value === "string" ? value : undefined;
}
