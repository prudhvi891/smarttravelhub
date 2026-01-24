import { sanityClient } from "@/lib/sanity.client";
import { SITE_SETTINGS_QUERY, TRIP_DETAIL_QUERY } from "@/lib/queries";
import { urlFor } from "@/lib/sanity.image";
import { notFound } from "next/navigation";
import TripTabs from "@/components/TripTabs";

export default async function TripDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // ✅ REQUIRED in Next 16
  const { slug } = await params;

  // ✅ slug is now guaranteed
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
      {/* HERO / POSTER */}
      {/* <section className="relative h-[70vh] w-full"> */}
      <section className="relative h-[50vh] min-h-[420px] w-full">
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
          <p className="text-slate-200 text-lg">
            {trip.location} • {trip.duration}
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-6 pt-16 pb-32 grid md:grid-cols-[2fr_1fr] gap-12">
          {/* LEFT – DETAILS */}
          <div className="text-slate-900">
            <TripTabs trip={trip} />
          </div>

          {/* RIGHT – PRICING */}
          <aside className="sticky top-28 h-fit bg-[#111827] rounded-xl p-6 border border-white/10">
            <h3 className="text-lg font-semibold mb-4 text-white">Pricing</h3>

            {trip.pricing?.length ? (
              <div className="space-y-4">
                {trip.pricing.map((p: any) => (
                  <div
                    key={p.groupSize}
                    className="flex items-center justify-between bg-black/40 p-4 rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-white">{p.groupSize}</p>
                      {p.note && (
                        <p className="text-xs text-slate-400">{p.note}</p>
                      )}
                    </div>
                    <p className="font-semibold text-white">₹{p.price}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-400 text-sm">
                Custom pricing available for bulk trips.
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
