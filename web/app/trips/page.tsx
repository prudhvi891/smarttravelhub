import { sanityClient } from "@/lib/sanity.client"
import { ALL_TRIPS_LISTING_QUERY } from "@/lib/queries"
import TripCard from "@/components/TripCard"

export const revalidate = 10;
export default async function TripsPage() {
  const trips = await sanityClient.fetch(ALL_TRIPS_LISTING_QUERY)

  const weekendTrips = trips.filter(
    (trip: any) => trip.tripGroup === "weekend"
  )

  const bulkTrips = trips.filter(
    (trip: any) => trip.tripGroup === "bulk"
  )

  return (
    <section className="max-w-7xl mx-auto px-6 py-24">

      {/* PAGE HEADER */}
      <div className="mb-16 text-center">
        <h1 className="text-4xl font-bold mb-4">Our Trips</h1>
        <p className="text-slate-300 max-w-2xl mx-auto">
          Carefully curated journeys designed for weekend explorers
          and large group adventures.
        </p>
      </div>

      {/* WEEKEND GETAWAYS */}
      {weekendTrips.length > 0 && (
        <div className="mb-24">
          <h2 className="text-2xl font-semibold mb-8">
            Weekend Getaways
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {weekendTrips.map((trip: any) => (
              <TripCard key={trip._id} trip={trip} />
            ))}
          </div>
        </div>
      )}

      {/* BULK TRIPS */}
      {bulkTrips.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold mb-8">
            Bulk Trips
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {bulkTrips.map((trip: any) => (
              <TripCard key={trip._id} trip={trip} />
            ))}
          </div>
        </div>
      )}

    </section>
  )
}
