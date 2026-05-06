import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPackage, packages } from "../../data/packages";

type PackagePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return packages.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: PackagePageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getPackage(slug);

  if (!item) {
    return {
      title: "Package Not Found | FaithTourTravel",
    };
  }

  return {
    title: `${item.place} | FaithTourTravel`,
    description: item.summary,
  };
}

export default async function PackageDetailPage({ params }: PackagePageProps) {
  const { slug } = await params;
  const item = getPackage(slug);

  if (!item) {
    notFound();
  }

  const paymentRequestSubject = encodeURIComponent(
    `Payment request for ${item.place}`,
  );
  const paymentRequestBody = encodeURIComponent(
    `Hi FaithTourTravel,\n\nI want to proceed with ${item.place}.\nPlease share the secure payment link and final quote.\n\nPackage: ${item.place}\nStarting price: ${item.price}\nDeposit shown: ${item.deposit}\n`,
  );

  return (
    <main className="min-h-screen bg-[#f5f1e8] text-[#17211f]">
      <section className="px-4 py-8 sm:px-8 sm:py-12">
        <div className="mx-auto max-w-7xl">
          <Link className="text-sm font-black text-[#0d5b57]" href="/#packages">
            Back to packages
          </Link>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_0.78fr] lg:items-start">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.16em] text-[#e25d3f]">
                Travel package
              </p>
              <h1 className="mt-4 max-w-4xl text-4xl font-black leading-tight sm:text-6xl">
                {item.place}
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-[#42514d]">
                {item.summary}
              </p>
              <div className="mt-7 flex flex-wrap gap-3 text-sm font-bold text-[#42514d]">
                <span className="rounded-md bg-white px-4 py-2">
                  {item.days}
                </span>
                <span className="rounded-md bg-white px-4 py-2">
                  Starting from {item.price}
                </span>
                <span className="rounded-md bg-white px-4 py-2">
                  Fully customizable
                </span>
              </div>
            </div>

            <div className="relative min-h-[320px] overflow-hidden rounded-lg sm:min-h-[420px]">
              <Image
                alt={item.place}
                className="object-cover"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                src={item.image}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-12 sm:px-8 sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_360px]">
          <div className="space-y-10">
            <section>
              <h2 className="text-2xl font-black text-[#0d5b57]">
                Trip gallery
              </h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-3">
                {item.gallery.map((image, index) => (
                  <div
                    className="relative aspect-[4/3] overflow-hidden rounded-lg"
                    key={image}
                  >
                    <Image
                      alt={`${item.place} gallery ${index + 1}`}
                      className="object-cover"
                      fill
                      sizes="(max-width: 640px) 100vw, 33vw"
                      src={image}
                    />
                  </div>
                ))}
              </div>
            </section>
            <InfoBlock title="What is included" items={item.highlights} />
            <InfoBlock title="Sample itinerary" items={item.itinerary} ordered />

            <section>
              <h2 className="text-2xl font-black text-[#0d5b57]">
                Important notes
              </h2>
              <div className="mt-4 space-y-4 text-base leading-8 text-[#42514d]">
                <p>
                  Prices shown are starting estimates and may change based on
                  travel dates, flight availability, hotel category, room type,
                  number of travelers, destination rules, and supplier terms.
                </p>
                <p>
                  Final payment should be made only after the itinerary, invoice,
                  cancellation rules, and refund terms are confirmed in writing.
                </p>
              </div>
            </section>
          </div>

          <aside
            className="rounded-lg border border-[#17211f]/10 bg-[#f5f1e8] p-5 sm:p-6 lg:sticky lg:top-28"
            id="payment"
          >
            <p className="text-sm font-black uppercase tracking-[0.14em] text-[#e25d3f]">
              Booking
            </p>
            <h2 className="mt-3 text-3xl font-black text-[#17211f]">
              Enquire for this package
            </h2>
            <div className="mt-5 rounded-md bg-white p-4">
              <p className="text-sm font-bold text-[#56635f]">Starting from</p>
              <p className="mt-1 text-4xl font-black text-[#e25d3f]">
                {item.price}
              </p>
              <p className="mt-2 text-sm font-bold text-[#42514d]">
                Suggested deposit: {item.deposit}
              </p>
            </div>

            <div className="mt-5 space-y-3">
              <a
                className="block rounded-md border border-[#17211f]/20 bg-white px-5 py-4 text-center font-black text-[#17211f] hover:border-[#0d5b57] hover:text-[#0d5b57]"
                href={`mailto:info@faithtourtravel.com?subject=${paymentRequestSubject}&body=${paymentRequestBody}`}
              >
                Request Payment Link
              </a>
              <p className="rounded-md bg-white px-4 py-3 text-sm font-bold leading-6 text-[#42514d]">
                Payment options are shared after the final quote is confirmed.
                We do not collect card details on this website.
              </p>
            </div>

            <p className="mt-5 text-xs font-bold leading-5 text-[#56635f]">
              Booking is confirmed only after written invoice confirmation,
              supplier availability, and payment clearance.
            </p>
          </aside>
        </div>
      </section>
    </main>
  );
}

function InfoBlock({
  title,
  items,
  ordered = false,
}: {
  title: string;
  items: string[];
  ordered?: boolean;
}) {
  const List = ordered ? "ol" : "ul";

  return (
    <section>
      <h2 className="text-2xl font-black text-[#0d5b57]">{title}</h2>
      <List className="mt-5 grid gap-3 text-base font-bold leading-7 text-[#42514d] sm:grid-cols-2">
        {items.map((item) => (
          <li className="rounded-md bg-[#f5f1e8] p-4" key={item}>
            {item}
          </li>
        ))}
      </List>
    </section>
  );
}
