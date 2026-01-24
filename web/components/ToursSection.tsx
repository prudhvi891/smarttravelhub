import { sanityClient } from "@/lib/sanity.client"
import { ALL_TRIPS_LISTING_QUERY } from "@/lib/queries"
import ToursSectionClient from "./TourSectionClient"

export default async function ToursSection() {
  const trips = await sanityClient.fetch(ALL_TRIPS_LISTING_QUERY)

  const weekendTrips = trips.filter(
    (trip: any) => trip.tripGroup === "weekend"
  )

  const bulkTrips = trips.filter(
    (trip: any) => trip.tripGroup === "bulk"
  )

  return (
    <ToursSectionClient
      weekendTrips={weekendTrips}
      bulkTrips={bulkTrips}
    />
  )
}
