"use client"

import { motion } from "framer-motion"

const floatingVariants = {
  initial: { y: 0 },
  animate: { y: ["-10px", "10px"] },
}

export default function FloatingElements() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <motion.div
        className="absolute top-10 left-10 w-16 h-16 bg-blue-500 rounded-full opacity-10"
        variants={floatingVariants}
        animate="animate"
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 3, ease: "easeInOut", repeatType: "reverse" }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-20 h-20 bg-purple-500 rounded-full opacity-10"
        variants={floatingVariants}
        animate="animate"
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 4, ease: "easeInOut", repeatType: "reverse" }}
      />
      <motion.div
        className="absolute top-1/2 left-1/4 w-12 h-12 bg-green-500 rounded-full opacity-10"
        variants={floatingVariants}
        animate="animate"
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 5, ease: "easeInOut", repeatType: "reverse" }}
      />
    </div>
  )
}

