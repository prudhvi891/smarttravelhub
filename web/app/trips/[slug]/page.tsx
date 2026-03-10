import { sanityClient } from "@/lib/sanity.client";
import { SITE_SETTINGS_QUERY, TRIP_DETAIL_QUERY } from "@/lib/queries";
import { urlFor } from "@/lib/sanity.image";
import { notFound } from "next/navigation";
import TripTabs from "@/components/TripTabs";
// import DownloadPDFButton from "@/components/DownloadPDFButton";

export const revalidate = 60;

export default async function TripDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ pdf?: string }>;
}) {
  const { slug } = await params;
  const { pdf } = await searchParams;

  const isPDF = pdf === "true";

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
      {/* HERO SECTION */}
      <section className="relative w-full overflow-hidden">
        <div className="relative h-[35vh] min-h-[260px] md:h-[45vh]">
          {/* Background */}
          <div className="absolute inset-0">
            {trip.heroImage ? (
              <img
                src={urlFor(trip.heroImage).width(2000).quality(85).url()}
                alt={trip.title}
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-slate-700 to-slate-900" />
            )}
          </div>

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/60" />

          <div className="relative z-10 max-w-6xl mx-auto px-6 h-full flex flex-col justify-end pb-6 md:pb-12">
            {/* MOBILE HERO */}
            <div className="md:hidden space-y-2.5">
              <h1 className="text-2xl font-bold text-white">{trip.title}</h1>

              <div className="text-white/90 text-xs">📍 {trip.location}</div>

              {trip.duration && (
                <div className="text-white/90 text-xs">⏱ {trip.duration}</div>
              )}

              <div className="flex items-center gap-2.5 pt-1">
                {trip.price && (
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-3.5 py-2">
                    <div className="text-white/70 text-[10px]">
                      Starting from
                    </div>
                    <div className="text-lg font-bold text-white">
                      ₹{trip.price.toLocaleString()}
                    </div>
                  </div>
                )}

                {/* {!isPDF && <DownloadPDFButton trip={trip} />} */}
              </div>
            </div>

            {/* DESKTOP HERO */}
            <div className="hidden md:flex md:items-end md:justify-between">
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold text-white">
                  {trip.title}
                </h1>

                <div className="text-white/90 mt-2">
                  📍 {trip.location}
                  {trip.duration && ` • ${trip.duration}`}
                </div>
              </div>

              {!isPDF && (
                <div className="flex items-center gap-3 ml-6">
                  {/* <DownloadPDFButton trip={trip} /> */}

                  {trip.hasOffer && trip.offerText && (
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                      {trip.offerText}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-6 pt-16 pb-32 grid md:grid-cols-[2fr_1fr] gap-12">
          {/* MAIN CONTENT */}
          <div id="trip-pdf-content" className="text-slate-900">
            <TripTabs trip={trip} />

            {/* MOBILE PRICING */}
            {!isPDF && (
              <div className="md:hidden mt-8 bg-[#111827] rounded-xl p-5 border border-white/10">
                <h3 className="text-lg font-semibold mb-3 text-white">
                  Pricing
                </h3>

                {trip.price ? (
                  <div className="bg-black/40 p-3 rounded-lg flex justify-between">
                    <p className="text-white text-sm">Starting from</p>
                    <p className="text-white font-semibold text-lg">
                      ₹{trip.price.toLocaleString()}/-
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
            )}
          </div>

          {/* SIDEBAR */}
          {!isPDF && (
            <aside className="hidden md:block sticky top-28 h-fit bg-[#111827] rounded-xl p-6 border border-white/10">
              <h3 className="text-lg font-semibold mb-4 text-white">Pricing</h3>

              {trip.price ? (
                <div className="bg-black/40 p-4 rounded-lg flex justify-between">
                  <p className="font-medium text-white">Starting from</p>
                  <p className="font-semibold text-white">
                    ₹{trip.price.toLocaleString()}/-
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
                  className="mt-6 block text-center bg-[#22C55E] text-black py-3 rounded-lg font-medium"
                >
                  Enquire on WhatsApp
                </a>
              )}
            </aside>
          )}
        </div>
      </section>
    </>
  );
}
