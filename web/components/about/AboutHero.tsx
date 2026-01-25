"use client"

import { motion } from "framer-motion"

export default function AboutHero() {
  return (
    <section className="relative h-[35vh] min-h-[260px] md:h-[45vh] overflow-hidden">
      
      {/* Background Image */}
      <img
        src="/images/about-hero.jpg"
        alt="About Smart Travel Hub"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/55" />

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center h-full px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
            About Smart Travel Hub
          </h1>

          <p className="mt-4 max-w-2xl mx-auto text-slate-200">
            A passionate team creating journeys that turn into lifelong memories.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
