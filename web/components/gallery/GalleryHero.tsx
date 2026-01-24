"use client"

import { motion } from "framer-motion"

export default function GalleryHero() {
  return (
    <section className="relative h-[50vh] min-h-[320px] overflow-hidden">
      {/* BACKGROUND IMAGE (LOCAL) */}
      <img
        src="/images/gallery-hero.jpg"
        alt="Travel Gallery"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/55" />

      {/* CONTENT */}
      <div className="relative h-full flex items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-2xl text-white"
        >
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Travel Moments
          </h1>

          <p className="mt-4 text-slate-200 text-sm md:text-base">
            A glimpse into journeys, friendships and unforgettable experiences.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
