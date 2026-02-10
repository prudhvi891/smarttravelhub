"use client"

import { motion } from "framer-motion"
import TripCard from "@/components/TripCard"
import TripsCarousel from "@/components/TripsCarousel"
import AnimateOnView from "@/components/AnimateOnView"
import { container, fadeUp } from "@/lib/animations"

export default function ToursSectionClient({
  weekendTrips,
  bulkTrips,
}: {
  weekendTrips: any[]
  bulkTrips: any[]
}) {
  return (
    <section
      id="tours"
      className="bg-[#F8FAFC] pt-24 pb-10 border-b border-slate-200 scroll-mt-24"
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* ================= HEADER ================= */}
        <AnimateOnView
          variants={container}
          amount={0.3}
          className="mb-20 text-center"
        >
          <motion.h2
            variants={fadeUp}
            className="text-3xl md:text-4xl font-bold text-slate-900 mb-4"
          >
            Our Tours
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="text-slate-600 max-w-2xl mx-auto"
          >
            Carefully curated journeys for weekend explorers and
            large group adventures.
          </motion.p>
        </AnimateOnView>

        {/* ================= WEEKEND GETAWAYS ================= */}
        {weekendTrips.length > 0 && (
          <AnimateOnView
            variants={container}
            amount={0.2}
            className="mb-28"
          >
            <motion.h3
              variants={fadeUp}
              className="text-2xl font-semibold text-slate-900 mb-10"
            >
              Weekend Getaways
            </motion.h3>

            {weekendTrips.length > 3 ? (
              <TripsCarousel trips={weekendTrips} />
            ) : (
              <motion.div
                variants={container}
                className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {weekendTrips.map((trip) => (
                  <motion.div
                    key={trip._id}
                    variants={fadeUp}
                  >
                    <TripCard trip={trip} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimateOnView>
        )}

        {/* ================= BULK TRIPS ================= */}
        {bulkTrips.length > 0 && (
          <AnimateOnView
            variants={container}
            amount={0.2}
          >
            <motion.h3
              variants={fadeUp}
              className="text-2xl font-semibold text-slate-900 mb-10"
            >
              Bulk Trips
            </motion.h3>

            {bulkTrips.length > 3 ? (
              <TripsCarousel trips={bulkTrips} />
            ) : (
              <motion.div
                variants={container}
                className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {bulkTrips.map((trip) => (
                  <motion.div
                    key={trip._id}
                    variants={fadeUp}
                  >
                    <TripCard trip={trip} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimateOnView>
        )}
      </div>
    </section>
  )
}
