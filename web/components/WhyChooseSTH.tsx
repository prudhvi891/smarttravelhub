"use client"

import { motion, easeOut } from "framer-motion"

const features = [
  {
    title: "Curated Experiences",
    desc: "Every trip is thoughtfully planned to deliver meaningful and memorable experiences.",
    icon: "🌄",
  },
  {
    title: "Trusted Community",
    desc: "Travel with like-minded explorers and build lasting friendships.",
    icon: "🤝",
  },
  {
    title: "Transparent Pricing",
    desc: "No hidden charges. What you see is what you pay.",
    icon: "💰",
  },
  {
    title: "Expert Trip Leaders",
    desc: "Experienced coordinators who ensure safety, fun and smooth travel.",
    icon: "🧭",
  },
  {
    title: "Small & Large Groups",
    desc: "Weekend getaways or 200+ member trips — we handle both seamlessly.",
    icon: "👥",
  },
  {
    title: "24×7 Support",
    desc: "We’re available before, during and after your journey.",
    icon: "📞",
  },
]

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
}

const cardFadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeOut },
  },
}

export default function WhyChooseSTH() {
  return (
    <section className="bg-[#F8FAFC] py-24">
      <div className="max-w-7xl mx-auto px-6">

        {/* ================= HEADER ================= */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.h2
            variants={cardFadeUp}
            className="text-3xl md:text-4xl font-bold mb-4 text-slate-900"
          >
            Why Choose STH
          </motion.h2>

          <motion.p
            variants={cardFadeUp}
            className="text-slate-600 max-w-2xl mx-auto"
          >
            We don’t just plan trips — we create experiences that stay with you forever.
          </motion.p>
        </motion.div>

        {/* ================= CARDS ================= */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((item, index) => (
            <motion.div
              key={index}
              variants={cardFadeUp}
              whileHover={{
                y: -8,
                rotateX: 2,
                rotateY: -2,
                transition: { duration: 0.25 },
              }}
              whileTap={{
                scale: 0.97,
                y: -4,
              }}
              className="
                relative
                bg-white
                border border-slate-200
                rounded-xl
                p-8
                shadow-sm
                hover:shadow-xl
                transition
                overflow-hidden
              "
            >
              {/* subtle glow */}
              <div className="absolute inset-0 opacity-0 hover:opacity-100 transition pointer-events-none bg-gradient-to-br from-indigo-100/40 via-transparent to-transparent" />

              {/* icon */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.15, rotate: 5 }}
                whileTap={{ scale: 1.1, rotate: 3 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="text-4xl mb-4 relative z-10"
              >
                {item.icon}
              </motion.div>

              <h3 className="text-lg font-semibold mb-2 text-slate-900 relative z-10">
                {item.title}
              </h3>

              <p className="text-slate-600 text-sm leading-relaxed relative z-10">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
