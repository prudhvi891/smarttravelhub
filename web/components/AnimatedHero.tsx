"use client";

import { motion } from "framer-motion";

export default function AnimatedHero() {
  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden">
      {/* BACKGROUND IMAGE WITH ANIMATION */}
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 8, ease: "easeOut" }}
        className="absolute inset-0 bg-center bg-cover"
        style={{
          backgroundImage: "url('/images/hero.jpg')",
        }}
      />

      {/* OVERLAY (GRADIENT FOR NAVBAR BLEND) */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/45 to-black/65 z-0" />

      {/* TEXT CONTENT */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 text-center max-w-3xl px-6"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          We Create Everlasting Memories
        </h1>

        <p className="text-lg text-slate-200 mb-8">
          Curated journeys for explorers who seek landscapes, culture and
          unforgettable memories.
        </p>

        <a
          href="#tours"
          className="inline-block bg-white text-black px-8 py-3 rounded-full font-medium"
        >
          Explore Tours
        </a>
      </motion.div>

      {/* SCROLL INDICATOR */}
      <div className="absolute bottom-6 z-10 text-xl text-white animate-bounce">
        ↓
      </div>
    </section>
  );
}
