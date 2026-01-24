"use client"

import { useEffect, useState } from "react"

type Props = {
  phoneNumber: string
}

export default function FloatingWhatsApp({ phoneNumber }: Props) {
  if (!phoneNumber) return null

  const link = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    "Hi, I'm interested in your trips"
  )}`

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="
        fixed bottom-6 left-6 z-50
        h-14 w-14
        rounded-full
        bg-[#25D366]
        flex items-center justify-center
        shadow-lg
        hover:scale-105
        transition
      "
      aria-label="Chat on WhatsApp"
    >
      {/* WhatsApp Icon (SVG – no library needed) */}
      <svg
        viewBox="0 0 32 32"
        fill="white"
        className="h-7 w-7"
      >
        <path d="M16.02 3C9.4 3 4 8.4 4 15.02c0 2.65.86 5.1 2.32 7.08L4 29l7.12-2.28a12 12 0 0 0 4.9 1.02h.01C22.6 27.74 28 22.35 28 15.73 28 9.12 22.6 3 16.02 3zm0 22.05h-.01a10.07 10.07 0 0 1-4.33-.98l-.31-.14-4.22 1.35 1.38-4.11-.2-.33a9.98 9.98 0 1 1 7.69 3.21zm5.82-7.52c-.32-.16-1.88-.93-2.17-1.04-.29-.1-.5-.16-.71.16-.21.32-.82 1.04-1 1.25-.18.21-.36.24-.68.08-.32-.16-1.35-.5-2.57-1.59-.95-.85-1.6-1.9-1.79-2.22-.19-.32-.02-.5.14-.66.14-.14.32-.36.48-.54.16-.18.21-.32.32-.54.1-.21.05-.4-.03-.56-.08-.16-.71-1.71-.98-2.34-.26-.62-.52-.54-.71-.55-.18-.01-.4-.01-.61-.01-.21 0-.56.08-.86.4-.29.32-1.12 1.1-1.12 2.69 0 1.59 1.15 3.13 1.31 3.35.16.21 2.27 3.47 5.51 4.87.77.33 1.37.53 1.84.68.77.24 1.47.21 2.02.13.62-.09 1.88-.77 2.15-1.52.27-.75.27-1.39.19-1.52-.08-.13-.29-.21-.61-.37z" />
      </svg>
    </a>
  )
}
