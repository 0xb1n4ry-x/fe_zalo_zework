"use client"

import { motion } from "framer-motion"
import { Lock, Key, UserCheck } from "lucide-react"

export function LoginAnimation() {
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
                <Lock className="w-8 h-8 text-blue-500 mb-2" />
                <h3 className="text-lg font-semibold mb-1">Bảo mật tối ưu</h3>
                <p className="text-sm text-gray-600">Đăng nhập an toàn với xác thực hai yếu tố</p>
            </motion.div>
            <motion.div
                className="absolute right-[5%] bottom-[10%] left-1/2 transform -translate-x-1/2 bg-white p-4 rounded-xl shadow-lg"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 1 }}
            >
                <Key className="w-8 h-8 text-green-500 mb-2" />
                <h3 className="text-lg font-semibold mb-1">Truy cập nhanh chóng</h3>
                <p className="text-sm text-gray-600">Đăng nhập một lần, truy cập mọi dịch vụ</p>
            </motion.div>
            <motion.div
                className="absolute top-[35%] right-[35%] bg-white p-4 rounded-xl shadow-lg"
                initial={{ opacity: 0, x: 50, y: -50 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 1.5, duration: 1 }}
            >
                <UserCheck className="w-8 h-8 text-yellow-500 mb-2" />
                <h3 className="text-lg font-semibold mb-1">Tài khoản cá nhân hóa</h3>
                <p className="text-sm text-gray-600">Trải nghiệm được tùy chỉnh riêng cho bạn</p>
            </motion.div>
        </div>
    )
}

