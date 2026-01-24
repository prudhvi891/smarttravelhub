"use client"

import { motion } from "framer-motion"
import { urlFor } from "@/lib/sanity.image"

export default function GalleryGrid({ gallery }: any) {
  const images = gallery?.images || []

  if (!images.length) return null

  return (
    <section className="bg-[#F8FAFC] py-28">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {images.map((img: any, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="
                group
                relative
                overflow-hidden
                rounded-2xl
                bg-black
                shadow-md
              "
            >
              {/* IMAGE WRAPPER WITH ASPECT RATIO */}
              <div className="aspect-[3/4] w-full overflow-hidden">
                <img
                  src={urlFor(img).width(1200).quality(85).url()}
                  alt={`Gallery image ${index + 1}`}
                  className="
                    w-full
                    h-full
                    object-cover
                    transition-transform
                    duration-700
                    ease-out
                    group-hover:scale-110
                  "
                />
              </div>

              {/* SUBTLE OVERLAY */}
              <div
                className="
                  pointer-events-none
                  absolute inset-0
                  bg-gradient-to-t
                  from-black/40
                  via-black/10
                  to-transparent
                  opacity-0
                  group-hover:opacity-100
                  transition-opacity
                  duration-500
                "
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
