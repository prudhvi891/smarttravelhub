"use client"

import { motion, useInView } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import FloatingParticles from "./FloatingParticles"

function Counter({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement | null>(null)
  const isInView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView || !value) return

    let start = 0
    const duration = 1400
    const step = Math.max(1, Math.floor(value / 60))

    const interval = setInterval(() => {
      start += step
      if (start >= value) {
        setCount(value)
        clearInterval(interval)
      } else {
        setCount(start)
      }
    }, duration / (value / step))

    return () => clearInterval(interval)
  }, [isInView, value])

  return <span ref={ref}>{count}</span>
}

export default function StatsSection({ settings }: any) {
  const stats = [
    {
      value: settings?.numberOfTravellers,
      suffix: "+",
      label: "Travellers Travelled",
    },
    {
      value: settings?.numberOfTrips,
      suffix: "+",
      label: "Trips Organised",
    },
    {
      value: settings?.numberOfDestinations,
      suffix: "+",
      label: "Destinations Covered",
    },
    {
      value: settings?.yearsOfService,
      suffix: "",
      label: "Years of Experience",
    },
  ]

  return (
    <section className="relative overflow-hidden py-28">
      {/* ================= BACKGROUND IMAGE ================= */}
      <motion.div
        initial={{ scale: 1.1 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 6, ease: "easeOut" }}
        viewport={{ once: true }}
        className="absolute inset-0"
      >
        <img
          src="/images/stats-bg.jpg" 
          alt="Travel background"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/55" />


      {/* ================= CONTENT ================= */}
      <div className="relative max-w-7xl mx-auto px-6">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Our Journey in Numbers
          </h2>
          <p className="text-slate-200 mt-3 max-w-xl mx-auto">
            Every number tells a story of miles travelled and memories created.
          </p>
        </motion.div>

        {/* STATS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
            >
              <div className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                <Counter value={stat.value} />
                {stat.suffix}
              </div>

              <p className="mt-3 text-sm md:text-base text-slate-200 font-medium">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
