"use client"

import { motion } from "framer-motion"
import { FaStar } from "react-icons/fa"

const reviews = [
  {
    name: "Ankit Sharma",
    rating: 5,
    text: "Amazing experience with STH! Everything was perfectly planned and the trip leader was super helpful.",
  },
  {
    name: "Priya Reddy",
    rating: 5,
    text: "One of the best travel groups I’ve travelled with. Great people, great vibes and zero stress.",
  },
  {
    name: "Rahul Verma",
    rating: 4,
    text: "Well organised trips and transparent pricing. Definitely booking again!",
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.5 },
  }),
}

export default function ReviewsSection() {
  return (
    <section id="reviews" className="bg-[#F8FAFC] py-28">
      <div className="max-w-7xl mx-auto px-6">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
            What Our Travellers Say
          </h2>

          <p className="text-slate-600 mt-3 max-w-2xl mx-auto">
            Real experiences from travellers who explored with Smart Travel Hub.
          </p>

          {/* GOOGLE RATING */}
          <div className="mt-4 flex items-center justify-center gap-1 text-amber-400">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} />
            ))}
            <span className="ml-2 text-sm text-slate-600">
              4.9 / 5 on Google
            </span>
          </div>

          {/* VERIFIED TEXT */}
          <p className="mt-2 text-xs text-slate-500">
            Verified Google Reviews
          </p>
        </motion.div>

        {/* REVIEWS */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="
                bg-white
                rounded-xl
                border border-slate-200
                p-6
                shadow-sm
                hover:shadow-md
                transition
              "
            >
              {/* STARS */}
              <div className="flex text-amber-400 mb-3">
                {[...Array(review.rating)].map((_, i) => (
                  <FaStar key={i} size={14} />
                ))}
              </div>

              {/* TEXT */}
              <p className="text-slate-700 text-sm leading-relaxed mb-4">
                “{review.text}”
              </p>

              {/* NAME */}
              <p className="text-sm font-semibold text-slate-900">
                {review.name}
              </p>
            </motion.div>
          ))}
        </div>

        {/* READ MORE LINK */}
        <div className="mt-14 text-center">
          <a
            href="https://www.google.com/maps/place/?q=Smart+Travel+Hub+reviews"
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex
              items-center
              gap-2
              text-sm
              font-medium
              text-slate-700
              hover:text-slate-900
              underline
              underline-offset-4
              transition
            "
          >
            Read more reviews on Google →
          </a>
        </div>
      </div>
    </section>
  )
}
