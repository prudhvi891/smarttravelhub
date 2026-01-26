"use client"

import { motion } from "framer-motion"
import { usePathname } from "next/navigation"

export default function AnimateOnView({
  children,
  className,
  variants,
  amount = 0.2,
}: {
  children: React.ReactNode
  className?: string
  variants: any
  amount?: number
}) {
  const pathname = usePathname()

  return (
    <motion.div
      key={pathname} // 🔥 global reset on route change
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  )
}
