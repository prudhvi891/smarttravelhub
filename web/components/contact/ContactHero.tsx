"use client"

import { motion } from "framer-motion"

export default function ContactHero() {
  return (
    <section className="relative h-[35vh] min-h-[260px] md:h-[45vh] overflow-hidden">
      {/* Background Image */}
      <img
        src="/images/contact-hero.jpg"
        alt="Contact Smart Travel Hub"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/55" />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="
          relative
          z-10
          h-full
          flex
          flex-col
          items-center
          justify-center
          text-center
          px-6
        "
      >
        <h1 className="text-4xl md:text-5xl font-bold text-white">
          Get In Touch
        </h1>

        <p className="mt-4 text-slate-200 max-w-xl">
          We’re just a call or message away from planning your next journey.
        </p>
      </motion.div>
    </section>
  )
}
