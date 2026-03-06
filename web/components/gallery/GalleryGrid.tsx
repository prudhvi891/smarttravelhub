"use client"

import { motion } from "framer-motion"
import { urlFor } from "@/lib/sanity.image"
import { useState, useEffect } from "react"

export default function GalleryGrid({ gallery }: any) {
  const images = gallery?.images || []
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Handle keyboard navigation in lightbox
  useEffect(() => {
    if (selectedImage === null) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedImage(null)
      if (e.key === 'ArrowRight') nextImage()
      if (e.key === 'ArrowLeft') prevImage()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedImage])

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % images.length)
    }
  }

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + images.length) % images.length)
    }
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setSelectedImage(null)
    }
  }

  if (!images.length) return null

  return (
    <>
      <section className="bg-[#F8FAFC] py-16 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Desktop: Masonry Grid */}
          <div className="hidden md:block">
            <div className="columns-3 gap-6 space-y-6">
              {images.map((img: any, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="break-inside-avoid mb-6"
                >
                  <div
                    onClick={() => !isMobile && setSelectedImage(index)}
                    className="
                      group
                      relative
                      overflow-hidden
                      rounded-2xl
                      bg-white
                      shadow-md
                      hover:shadow-xl
                      transition-all
                      duration-300
                      cursor-pointer
                    "
                  >
                    <img
                      src={urlFor(img).width(800).quality(85).url()}
                      alt={`Gallery image ${index + 1}`}
                      className="
                        w-full
                        h-auto
                        transition-transform
                        duration-500
                        ease-out
                        group-hover:scale-105
                      "
                    />

                    {/* Hover Overlay */}
                    <div
                      className="
                        absolute inset-0
                        bg-gradient-to-t
                        from-black/50
                        via-black/20
                        to-transparent
                        opacity-0
                        group-hover:opacity-100
                        transition-opacity
                        duration-300
                        flex items-center justify-center
                      "
                    >
                      <div className="
                        w-12 h-12
                        bg-white/90
                        rounded-full
                        flex items-center justify-center
                        transform scale-75 group-hover:scale-100
                        transition-transform
                        duration-300
                      ">
                        <svg
                          className="w-6 h-6 text-gray-900"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mobile: Simple Stack */}
          <div className="md:hidden space-y-6">
            {images.map((img: any, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="
                  relative
                  overflow-hidden
                  rounded-2xl
                  bg-white
                  shadow-md
                "
              >
                <img
                  src={urlFor(img).width(800).quality(85).url()}
                  alt={`Gallery image ${index + 1}`}
                  className="w-full h-auto"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal - Desktop Only */}
      {!isMobile && selectedImage !== null && (
        <div
          className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex items-center justify-center p-4 cursor-pointer"
          onClick={handleBackdropClick}
        >
          {/* Close Button */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              setSelectedImage(null)
            }}
            className="absolute top-4 right-4 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20 transition-colors z-50"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Image Counter */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-white text-sm font-medium border border-white/20">
            {selectedImage + 1} / {images.length}
          </div>

          {/* Previous Button */}
          {images.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                prevImage()
              }}
              className="absolute left-4 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          {/* Next Button */}
          {images.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                nextImage()
              }}
              className="absolute right-4 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}

          {/* Main Image */}
          <div
            className="relative max-w-6xl w-full h-full flex items-center justify-center cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={urlFor(images[selectedImage]).width(1920).quality(90).url()}
              alt={`Gallery image ${selectedImage + 1}`}
              className="max-w-full max-h-[90vh] w-auto h-auto object-contain rounded-lg shadow-2xl"
            />
          </div>
        </div>
      )}
    </>
  )
}