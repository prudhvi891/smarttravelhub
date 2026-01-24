"use client"

import { easeOut, motion } from "framer-motion"
import { FaPhoneAlt, FaWhatsapp, FaInstagram } from "react-icons/fa"

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.12,
      duration: 0.5,
      ease: easeOut,
    },
  }),
}

export default function ContactOptionsSection({ settings }: any) {
  if (!settings) return null

  const cards = [
    {
      type: "call",
      title: "Call Us",
      icon: FaPhoneAlt,
      accent: "text-emerald-600 bg-emerald-50",
      phones: [
        settings?.phoneNumber,
        settings?.altPhoneNumber,
      ].filter(Boolean),
    },
    {
      type: "link",
      title: "Chat on WhatsApp",
      desc: "Get instant replies for itineraries, prices and bookings.",
      icon: FaWhatsapp,
      action: `https://wa.me/${settings?.whatsappNumber}`,
      actionText: "Start Chat",
      accent: "text-green-600 bg-green-50",
    },
    {
      type: "link",
      title: "Follow on Instagram",
      desc: "See our latest trips, reels and traveller moments.",
      icon: FaInstagram,
      action: settings?.instagramUrl,
      actionText: "View Profile",
      accent: "text-pink-600 bg-pink-50",
    },
  ]

  return (
    <section className="bg-[#F8FAFC] py-28 min-h-[480px]">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map((card: any, index: number) => {
            const Icon = card.icon

            if (card.type === "call") {
              return (
                <motion.div
                  key={index}
                  custom={index}
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  viewport={{ once: true }}
                  className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm hover:shadow-lg transition"
                >
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-6 ${card.accent}`}>
                    <Icon size={22} />
                  </div>

                  <h3 className="text-lg font-semibold text-slate-900 mb-3">
                    {card.title}
                  </h3>

                  <div className="space-y-2">
                    {card.phones.map((phone: string, i: number) => (
                      <a
                        key={i}
                        href={`tel:${phone.replace(/\s+/g, "")}`}
                        className="block text-base font-medium text-slate-800 hover:text-emerald-600 transition"
                      >
                        {phone}
                      </a>
                    ))}
                  </div>

                  <p className="text-sm text-slate-500 mt-4">
                    Available during business hours
                  </p>
                </motion.div>
              )
            }

            return (
              <motion.a
                key={index}
                href={card.action}
                target="_blank"
                rel="noopener noreferrer"
                custom={index}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                viewport={{ once: true }}
                className="group bg-white rounded-xl border border-slate-200 p-8 shadow-sm hover:shadow-lg transition"
              >
                <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-6 ${card.accent}`}>
                  <Icon size={22} />
                </div>

                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  {card.title}
                </h3>

                <p className="text-slate-600 text-sm mb-5 leading-relaxed">
                  {card.desc}
                </p>

                <span className="text-sm font-medium text-slate-800 group-hover:underline underline-offset-4">
                  {card.actionText} →
                </span>
              </motion.a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
