"use client"

import { motion } from "framer-motion"
import { urlFor } from "@/lib/sanity.image"
import { usePathname } from "next/navigation"

export default function TeamSection({ settings }: any) {
  const pathname = usePathname()
  if (!settings) return null

  return (
    <section className="bg-[#F8FAFC] py-28">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center min-h-[420px]">

        {/* IMAGE */}
        <motion.img
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          src={
            settings?.teamImage
              ? urlFor(settings.teamImage).width(900).quality(85).url()
              : ""
          }
          alt="Smart Travel Hub Team"
          className="rounded-2xl shadow-lg w-full object-cover"
        />

        {/* TEXT */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
            The People Behind the Journeys
          </h2>

          <p className="mt-6 text-slate-600 leading-relaxed">
            At <strong>Smart Travel Hub</strong>, we’re travellers at heart.
          </p>

          <p className="mt-4 text-slate-600 leading-relaxed">
            We curate journeys that feel personal, safe and unforgettable.
          </p>

          <p className="mt-6 font-medium text-slate-800">
            Travel with us — and become part of the STH family.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
