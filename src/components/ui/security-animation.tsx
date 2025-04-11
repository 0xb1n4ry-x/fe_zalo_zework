"use client"
import { motion } from "framer-motion"

export function SecurityAnimation() {
    return (
        <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-lg p-6 h-[400px] relative overflow-hidden">
            <h3 className="text-lg font-semibold mb-4 text-center">Bảo mật Zework</h3>

            {/* Backup Animation */}
            <motion.div
                className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 360],
                }}
                transition={{
                    duration: 5,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                }}
            >
                <svg width="100" height="100" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                        stroke="#4CAF50"
                        strokeWidth="2"
                    />
                    <path d="M12 7V12L15 15" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" />
                </svg>
            </motion.div>
            <p className="text-center mt-24 text-sm text-gray-600">Backup tự động</p>

            {/* Encryption Animation */}
            <motion.div
                className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 translate-y-1/2"
                animate={{
                    y: [0, -10, 0],
                }}
                transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                }}
            >
                <svg width="100" height="100" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3" y="11" width="18" height="11" rx="2" stroke="#2196F3" strokeWidth="2" />
                    <path d="M7 11V7C7 4.23858 9.23858 2 12 2C14.7614 2 17 4.23858 17 7V11" stroke="#2196F3" strokeWidth="2" />
                </svg>
            </motion.div>
            <p className="text-center mt-4 text-sm text-gray-600">Mã hóa đầu cuối</p>
        </div>
    )
}

