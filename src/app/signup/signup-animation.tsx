"use client"

import { motion } from "framer-motion"
import { MessageCircle, Shield, Zap } from "lucide-react"

export function SignupAnimation() {
    return (
        <div className="relative w-full h-full overflow-hidden">
            <motion.div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] bg-gradient-to-br from-blue-400 to-indigo-600 rounded-full opacity-20"
                animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 180, 360],
                }}
                transition={{
                    duration: 20,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                }}
            />
            {[...Array(10)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-blue-400 rounded-full"
                    style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                    }}
                    animate={{
                        scale: [0, 1, 0],
                        opacity: [0, 1, 0],
                    }}
                    transition={{
                        duration: Math.random() * 2 + 1,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: Math.random() * 2,
                    }}
                />
            ))}
            <motion.div
                className="absolute top-[10%] left-[10%] bg-white p-4 rounded-xl shadow-lg"
                initial={{ opacity: 0, x: -50, y: -50 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 0.5, duration: 1 }}
            >
                <MessageCircle className="w-8 h-8 text-blue-500 mb-2" />
                <h3 className="text-lg font-semibold mb-1">Giao tiếp tức thì</h3>
                <p className="text-sm text-gray-600">Kết nối ngay lập tức với đồng nghiệp và khách hàng</p>
            </motion.div>
            <motion.div
                className="absolute right-[5%] bottom-[10%] left-1/2 transform -translate-x-1/2 bg-white p-4 rounded-xl shadow-lg"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 1 }}
            >
                <Shield className="w-8 h-8 text-green-500 mb-2" />
                <h3 className="text-lg font-semibold mb-1">Bảo mật tối đa</h3>
                <p className="text-sm text-gray-600">Mã hóa đầu cuối cho mọi cuộc trò chuyện</p>
            </motion.div>
            <motion.div
                className="absolute top-[37%] right-[20%] bg-white p-4 rounded-xl shadow-lg"
                initial={{ opacity: 0, x: 50, y: -50 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 1.5, duration: 1 }}
            >
                <Zap className="w-8 h-8 text-yellow-500 mb-2" />
                <h3 className="text-lg font-semibold mb-1">Tích hợp mạnh mẽ</h3>
                <p className="text-sm text-gray-600">Kết nối với các ứng dụng và công cụ yêu thích của bạn</p>
            </motion.div>
        </div>
    )
}

