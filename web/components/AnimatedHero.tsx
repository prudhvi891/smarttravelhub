"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useState } from "react";

export default function AnimatedHero() {
  const { scrollY } = useScroll();
  
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-black">
      {/* PARALLAX BACKGROUND */}
      <motion.div
        style={{ y }}
        className="absolute inset-0"
      >
        <motion.div
          initial={{ scale: 1.1, filter: "brightness(0.7)" }}
          animate={{ scale: 1, filter: "brightness(0.85)" }}
          transition={{ duration: 10, ease: [0.22, 1, 0.36, 1] }}
          className="w-full h-full bg-center bg-cover"
          style={{
            backgroundImage: "url('/images/hero.png')",
          }}
        />
      </motion.div>

      {/* ATMOSPHERIC OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/70" />
      

      {/* CONTENT */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12"
      >
        {/* PREMIUM ROTATING DESTINATIONS BADGE */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="flex justify-center mb-10 md:mb-14"
        >
          <div className="relative inline-flex items-center gap-3 px-6 py-3 backdrop-blur-xl bg-white/[0.05] rounded-full border border-white/10 shadow-2xl overflow-hidden">
            {/* Rotating compass icon */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-4 h-4 flex-shrink-0"
            >
              <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-white/70">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1"/>
                <path d="M12 6v12M6 12h12" stroke="currentColor" strokeWidth="1"/>
                <circle cx="12" cy="12" r="2" fill="currentColor"/>
              </svg>
            </motion.div>
            
            {/* Rotating destinations */}
            <div className="relative h-5 w-40 overflow-hidden">
              {["Gokarna", "Kerala", "Manali", "Ooty", "Coorg"].map((destination, i) => (
                <motion.div
                  key={destination}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: [0, 1, 1, 0],
                    y: [20, 0, 0, -20]
                  }}
                  transition={{
                    duration: 3,
                    delay: i * 3,
                    repeat: Infinity,
                    repeatDelay: 12,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  className="absolute left-0 right-0 text-center text-xs tracking-[0.2em] text-white/80 font-light uppercase whitespace-nowrap"
                >
                  Discover {destination}
                </motion.div>
              ))}
            </div>

            {/* Subtle shimmer */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
            />
          </div>
        </motion.div>

        {/* LIGHTER, ELEGANT HEADING */}
        <div className="text-center mb-8 md:mb-12">
          <div className="mb-8 md:mb-12">
            <h1 className="text-[2.75rem] sm:text-6xl md:text-7xl lg:text-8xl font-light text-white leading-[1.1] tracking-tight">
              {/* SMALL BRAND LINE */}
              <div className="text-sm md:text-lg tracking-[0.3em] uppercase text-white/60 mb-4">
                Smart Travel Hub
              </div>
              {["Explore", "The", "World", "Smarter"].map((word, i) => (
                <div key={i} className="inline-block overflow-hidden mr-3 md:mr-4">
                  <motion.span
                    initial={{ 
                      y: 150,
                      opacity: 0,
                      filter: "blur(8px)"
                    }}
                    animate={{ 
                      y: 0,
                      opacity: 1,
                      filter: "blur(0px)"
                    }}
                    transition={{
                      duration: 0.9,
                      delay: 0.3 + i * 0.1,
                      ease: [0.22, 1, 0.36, 1]
                    }}
                    className="inline-block"
                    style={{
                      textShadow: "0 4px 30px rgba(0,0,0,0.3)"
                    }}
                  >
                    {word}
                  </motion.span>
                </div>
              ))}
            </h1>
          </div>

          {/* REFINED SUBTITLE - INCREASED OPACITY */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="text-base md:text-lg text-white/85 font-light leading-relaxed max-w-2xl mx-auto mb-10 md:mb-14 tracking-wide"
            style={{
              textShadow: "0 2px 20px rgba(0,0,0,0.4)"
            }}
          >
            From sacred temples to mountain peaks, we craft experiences that become stories.
          </motion.p>

          {/* SOPHISTICATED CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5 }}
          >
            <motion.a
              href="#trips"
              whileHover={{ 
                scale: 1.03,
                backgroundColor: "rgba(255, 255, 255, 1)",
              }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.3 }}
              className="group inline-flex items-center gap-2.5 bg-white/95 text-black px-8 py-3.5 md:px-10 md:py-4 rounded-full font-medium text-sm md:text-base tracking-wide overflow-hidden"
              style={{ boxShadow: "0 8px 30px rgba(0,0,0,0.25)" }}
            >
              <span className="relative z-10">Explore Trips</span>
              
              <motion.svg
                className="w-4 h-4 relative z-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </motion.svg>

              {/* Gentle shimmer */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.8 }}
              />
            </motion.a>
          </motion.div>
        </div>
      </motion.div>

      {/* MINIMAL SCROLL INDICATOR */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-3"
        >
          <span className="text-[9px] tracking-[0.35em] text-white/30 font-light uppercase">
            Scroll
          </span>
          <div className="w-5 h-9 border border-white/20 rounded-full flex justify-center pt-1.5">
            <motion.div
              animate={{ 
                y: [0, 10, 0],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ duration: 1.8, repeat: Infinity }}
              className="w-0.5 h-2 bg-white/40 rounded-full"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}