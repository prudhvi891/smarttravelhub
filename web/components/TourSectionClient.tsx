"use client";

import TripCard from "@/components/TripCard";
import TripsCarousel from "@/components/TripsCarousel";

export default function ToursSectionClient({
  weekendTrips,
  bulkTrips,
}: {
  weekendTrips: any[];
  bulkTrips: any[];
}) {
  return (
    <section
      id="tours"
      className="
        bg-[#F8FAFC]              /* 👈 NEW: soft light background */
        py-24
        scroll-mt-24
      "
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* ================= HEADER ================= */}
        <div className="mb-20 text-center animate-fadeUp">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Our Tours
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Carefully curated journeys for weekend explorers and
            large group adventures.
          </p>
        </div>

        {/* ================= WEEKEND GETAWAYS ================= */}
        {weekendTrips.length > 0 && (
          <div className="mb-28">
            <h3 className="text-2xl font-semibold text-slate-900 mb-10">
              Weekend Getaways
            </h3>

            {weekendTrips.length > 3 ? (
              <TripsCarousel trips={weekendTrips} />
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {weekendTrips.map((trip, index) => (
                  <TripCard
                    key={trip._id}
                    trip={trip}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* ================= BULK TRIPS ================= */}
        {bulkTrips.length > 0 && (
          <div>
            <h3 className="text-2xl font-semibold text-slate-900 mb-10">
              Bulk Trips
            </h3>

            {bulkTrips.length > 3 ? (
              <TripsCarousel trips={bulkTrips} />
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {bulkTrips.map((trip, index) => (
                  <TripCard
                    key={trip._id}
                    trip={trip}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
