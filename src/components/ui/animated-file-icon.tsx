"use client"

import { motion } from "framer-motion"

export default function AnimatedFileIcon() {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <motion.div
                className="relative w-16 h-20 cursor-pointer"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
                {/* File base */}
                <motion.svg
                    viewBox="0 0 24 30"
                    className="w-full h-full"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <path
                        d="M21.414 5.414l-2.828-2.828A2 2 0 0017.172 2H4a2 2 0 00-2 2v22a2 2 0 002 2h16a2 2 0 002-2V7.414a2 2 0 00-.586-1.414z"
                        fill="#4080ff"
                    />
                    <path
                        d="M21.414 5.414L19 3H4a2 2 0 00-2 2v22a2 2 0 002 2h16a2 2 0 002-2V7.414a2 2 0 00-.586-1.414z"
                        fill="#5e9fff"
                    />
                </motion.svg>

                {/* Pulsing circle */}
                <motion.div
                    className="absolute top-1/2 left-1/2 w-8 h-8 bg-blue-200 rounded-full -translate-x-1/2 -translate-y-1/2"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.7, 0.3, 0.7],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                    }}
                />

                {/* File icon */}
                <motion.svg
                    viewBox="0 0 24 24"
                    className="absolute top-1/2 left-1/2 w-6 h-6 -translate-x-1/2 -translate-y-1/2"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    <path
                        d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm-1 1.5L18.5 9H13V3.5zM6 20V4h5v7h7v9H6z"
                        fill="#ffffff"
                    />
                </motion.svg>
            </motion.div>
        </div>
    )
}

