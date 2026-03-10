import { sanityClient } from "@/lib/sanity.client";
import { SITE_SETTINGS_QUERY, TRIP_DETAIL_QUERY } from "@/lib/queries";
import { urlFor } from "@/lib/sanity.image";
import { notFound } from "next/navigation";
import TripTabs from "@/components/TripTabs";

export const revalidate = 60;

export default async function TripDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const trip = await sanityClient.fetch(TRIP_DETAIL_QUERY, { slug });

  if (!trip) notFound();

  const settings = await sanityClient.fetch(SITE_SETTINGS_QUERY);

  const whatsappNumber = settings.whatsappNumber;
  const whatsappLink = whatsappNumber
    ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
        `Hi, I'm interested in ${trip.title}`
      )}`
    : null;

  return (
    <>
      {/* HERO */}
      <section className="relative h-[35vh] min-h-[260px] md:h-[45vh] w-full">
        {trip.heroImage && (
          <img
            src={urlFor(trip.heroImage).width(2000).quality(85).url()}
            alt={trip.title}
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}

        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 h-full flex flex-col justify-end pb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">{trip.title}</h1>

          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-3">
            <p className="text-slate-200 text-lg">
              {trip.location} • {trip.duration}
            </p>

            {trip.price && (
              <span className="md:hidden text-white font-semibold text-lg">
                Starting from ₹{trip.price}
              </span>
            )}
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-6 pt-16 pb-32 grid md:grid-cols-[2fr_1fr] gap-12">
          
          {/* LEFT CONTENT */}
          <div className="text-slate-900">

            {/* TRIP DETAILS */}
            <TripTabs trip={trip} />

            {/* MOBILE PRICING (NOW AFTER TABS) */}
            <div className="md:hidden mt-8 bg-[#111827] rounded-xl p-5 border border-white/10">
              <h3 className="text-lg font-semibold mb-3 text-white">Pricing</h3>

              {trip.price ? (
                <div className="bg-black/40 p-3 rounded-lg flex items-center justify-between">
                  <p className="text-white text-sm">Starting from</p>
                  <p className="text-white font-semibold text-lg">
                    ₹{trip.price}
                  </p>
                </div>
              ) : (
                <p className="text-slate-400 text-sm">
                  Contact us for pricing details.
                </p>
              )}

              {whatsappLink && (
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 block text-center bg-[#22C55E] text-black py-3 rounded-lg font-medium"
                >
                  Enquire on WhatsApp
                </a>
              )}
            </div>

          </div>

          {/* DESKTOP PRICING SIDEBAR */}
          <aside className="hidden md:block sticky top-28 h-fit bg-[#111827] rounded-xl p-6 border border-white/10">
            <h3 className="text-lg font-semibold mb-4 text-white">Pricing</h3>

            {trip.price ? (
              <div className="bg-black/40 p-4 rounded-lg flex items-center justify-between">
                <p className="font-medium text-white">Starting from</p>
                <p className="font-semibold text-white">₹{trip.price}</p>
              </div>
            ) : (
              <p className="text-slate-400 text-sm">
                Contact us for pricing details.
              </p>
            )}

            {whatsappLink && (
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 block text-center bg-[#22C55E] text-black py-3 rounded-lg font-medium"
              >
                Enquire on WhatsApp
              </a>
            )}
          </aside>
        </div>
      </section>
    </>
  );
}
