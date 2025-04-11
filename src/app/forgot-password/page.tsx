"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Mail } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"

// Animated background shapes component
const AnimatedShapes = () => {
    return (
        <div className="fixed inset-0 -z-10 overflow-hidden">
            {/* Top left shapes */}
            <motion.div
    className="absolute -top-20 -left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"
    animate={{
        scale: [1, 1.2, 1],
            x: [0, 20, 0],
            y: [0, 30, 0],
    }}
    transition={{
        duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
    }}
    />

    {/* Bottom right shapes */}
    <motion.div
        className="absolute -bottom-40 -right-20 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"
    animate={{
        scale: [1, 1.3, 1],
            x: [0, -30, 0],
            y: [0, -20, 0],
    }}
    transition={{
        duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
    }}
    />
    </div>
)
}

// Floating elements component
const FloatingElements = () => {
    return (
        <>
            {/* Left side elements */}
        <div className="hidden lg:block absolute left-10 top-1/4 bottom-0 w-40">
        {[...Array(5)].map((_, i) => (
        <motion.div
            key={`left-${i}`}
    className={`absolute w-${4 + i} h-${4 + i} rounded-full bg-gradient-to-r from-blue-400/20 to-purple-500/20`}
    style={{
        top: `${i * 20}%`,
            left: `${i * 10}%`,
    }}
    animate={{
        y: [0, -15, 0],
            x: [0, i % 2 === 0 ? 10 : -10, 0],
            scale: [1, i % 2 === 0 ? 1.1 : 0.9, 1],
    }}
    transition={{
        duration: 3 + i,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: i * 0.2,
    }}
    />
))}

    {/* Animated lines */}
    {[...Array(3)].map((_, i) => (
        <motion.div
            key={`line-left-${i}`}
        className="absolute h-24 w-1 rounded-full bg-gradient-to-b from-blue-400/20 to-transparent"
        style={{
        top: `${20 + i * 25}%`,
            left: `${10 + i * 15}%`,
    }}
        animate={{
        height: ["6rem", "8rem", "6rem"],
            y: [0, -10, 0],
    }}
        transition={{
        duration: 4 + i,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: i * 0.3,
    }}
        />
    ))}
    </div>

    {/* Right side elements */}
    <div className="hidden lg:block absolute right-10 top-1/4 bottom-0 w-40">
        {[...Array(5)].map((_, i) => (
        <motion.div
            key={`right-${i}`}
    className={`absolute w-${4 + i} h-${4 + i} rounded-full bg-gradient-to-l from-blue-400/20 to-purple-500/20`}
    style={{
        top: `${i * 20}%`,
            right: `${i * 10}%`,
    }}
    animate={{
        y: [0, -15, 0],
            x: [0, i % 2 === 0 ? -10 : 10, 0],
            scale: [1, i % 2 === 0 ? 0.9 : 1.1, 1],
    }}
    transition={{
        duration: 3 + i,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: i * 0.2,
    }}
    />
))}

    {/* Animated lines */}
    {[...Array(3)].map((_, i) => (
        <motion.div
            key={`line-right-${i}`}
        className="absolute h-24 w-1 rounded-full bg-gradient-to-b from-purple-400/20 to-transparent"
        style={{
        top: `${20 + i * 25}%`,
            right: `${10 + i * 15}%`,
    }}
        animate={{
        height: ["6rem", "8rem", "6rem"],
            y: [0, -10, 0],
    }}
        transition={{
        duration: 4 + i,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: i * 0.3,
    }}
        />
    ))}
    </div>
    </>
)
}

// Animated particles component
const Particles = () => {
    return (
        <div className="fixed inset-0 -z-10 pointer-events-none">
            {[...Array(20)].map((_, i) => (
        <motion.div
            key={`particle-${i}`}
    className="absolute w-1 h-1 rounded-full bg-blue-400/30"
    style={{
        top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
    }}
    animate={{
        y: [0, -Math.random() * 100 - 50],
            x: [0, (Math.random() - 0.5) * 50],
            opacity: [0, 0.8, 0],
            scale: [0, Math.random() + 0.5, 0],
    }}
    transition={{
        duration: Math.random() * 5 + 3,
            repeat: Number.POSITIVE_INFINITY,
            delay: Math.random() * 5,
    }}
    />
))}
    </div>
)
}

// Animated icons component
const AnimatedIcons = () => {
    return (
        <>
            {/* Left side icons */}
        <div className="hidden lg:block absolute left-20 top-1/3 h-full">
    <motion.div
        className="absolute w-12 h-12 flex items-center justify-center rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg"
    animate={{
        y: [0, -20, 0],
            rotate: [0, 5, 0],
    }}
    transition={{
        duration: 5,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
    }}
>
    <Mail className="w-6 h-6 text-blue-500/70" />
        </motion.div>

        <motion.div
    className="absolute w-10 h-10 flex items-center justify-center rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg"
    style={{ top: "40%", left: "30px" }}
    animate={{
        y: [0, 20, 0],
            rotate: [0, -5, 0],
    }}
    transition={{
        duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            delay: 1,
    }}
>
    <svg className="w-5 h-5 text-purple-500/70" fill="currentColor" viewBox="0 0 20 20">
    <path
        fillRule="evenodd"
    d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 100-12 6 6 0 000 12z"
    clipRule="evenodd"
        />
        </svg>
        </motion.div>

        <motion.div
    className="absolute w-8 h-8 flex items-center justify-center rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg"
    style={{ top: "65%", left: "10px" }}
    animate={{
        y: [0, -15, 0],
            rotate: [0, 8, 0],
    }}
    transition={{
        duration: 7,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            delay: 2,
    }}
>
    <svg className="w-4 h-4 text-blue-500/70" fill="currentColor" viewBox="0 0 20 20">
    <path
        fillRule="evenodd"
    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
    clipRule="evenodd"
        />
        </svg>
        </motion.div>
        </div>

    {/* Right side icons */}
    <div className="hidden lg:block absolute right-20 top-1/3 h-full">
    <motion.div
        className="absolute w-12 h-12 flex items-center justify-center rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg"
    animate={{
        y: [0, -20, 0],
            rotate: [0, -5, 0],
    }}
    transition={{
        duration: 5,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            delay: 0.5,
    }}
>
    <svg className="w-6 h-6 text-purple-500/70" fill="currentColor" viewBox="0 0 20 20">
    <path
        fillRule="evenodd"
    d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v-1l1-1 1-1-.257-.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z"
    clipRule="evenodd"
        />
        </svg>
        </motion.div>

        <motion.div
    className="absolute w-10 h-10 flex items-center justify-center rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg"
    style={{ top: "40%", right: "30px" }}
    animate={{
        y: [0, 20, 0],
            rotate: [0, 5, 0],
    }}
    transition={{
        duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            delay: 1.5,
    }}
>
    <svg className="w-5 h-5 text-blue-500/70" fill="currentColor" viewBox="0 0 20 20">
    <path
        fillRule="evenodd"
    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z"
    clipRule="evenodd"
        />
        </svg>
        </motion.div>

        <motion.div
    className="absolute w-8 h-8 flex items-center justify-center rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg"
    style={{ top: "65%", right: "10px" }}
    animate={{
        y: [0, -15, 0],
            rotate: [0, -8, 0],
    }}
    transition={{
        duration: 7,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            delay: 2.5,
    }}
>
    <svg className="w-4 h-4 text-purple-500/70" fill="currentColor" viewBox="0 0 20 20">
    <path
        fillRule="evenodd"
    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
    clipRule="evenodd"
        />
        </svg>
        </motion.div>
        </div>
        </>
)
}

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [error, setError] = useState("")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")

        if (!email) {
            setError("Vui lòng nhập địa chỉ email của bạn")
            return
        }

        setIsSubmitting(true)

        try {
            // Here you would integrate with your auth provider to send a reset email
            // For example with Supabase: await supabase.auth.resetPasswordForEmail(email)

            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000))

            setIsSubmitted(true)
        } catch (err) {
            setError("Có lỗi xảy ra. Vui lòng thử lại sau.")
        } finally {
            setIsSubmitting(false)
        }
    }

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                when: "beforeChildren",
                staggerChildren: 0.1,
            },
        },
    }

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: "spring", stiffness: 300, damping: 24 },
        },
    }

    const successVariants = {
        hidden: { scale: 0.8, opacity: 0 },
        visible: {
            scale: 1,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 20,
            },
        },
    }

    return (
        <div className="relative flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 px-4 py-12 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background and decorative elements */}
        <AnimatedShapes />
        <Particles />
        <FloatingElements />
        <AnimatedIcons />

        <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration: 0.5 }}
    className="w-full max-w-md relative z-10"
    >
    <Card className="overflow-hidden backdrop-blur-sm bg-white/80 border border-white/50 shadow-xl">
    <CardHeader className="space-y-1">
    <motion.div
        initial={{ y: -20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ delay: 0.2, duration: 0.5 }}
>
    <CardTitle className="text-2xl font-bold text-center">Quên mật khẩu</CardTitle>
    </motion.div>
    <motion.div
    initial={{ y: -10, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ delay: 0.3, duration: 0.5 }}
>
    <CardDescription className="text-center">
        Nhập email của bạn và chúng tôi sẽ gửi cho bạn liên kết để đặt lại mật khẩu
    </CardDescription>
    </motion.div>
    </CardHeader>
    <CardContent>
    {isSubmitted ? (
            <motion.div variants={successVariants} initial="hidden" animate="visible">
        <Alert className="bg-green-50/80 border-green-200">
        <AlertDescription className="text-green-800">
            Nếu địa chỉ email của bạn tồn tại trong hệ thống, chúng tôi đã gửi cho bạn một email với hướng dẫn
        đặt lại mật khẩu.
            </AlertDescription>
            </Alert>

    {/* Success animation */}
    <motion.div
        className="mt-6 flex justify-center"
    initial={{ scale: 0 }}
    animate={{
        scale: [0, 1.2, 1],
            rotate: [0, 10, 0],
    }}
    transition={{
        duration: 0.8,
            times: [0, 0.6, 1],
            ease: "easeOut",
    }}
>
    <div className="relative w-20 h-20">
    <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 opacity-20"
    animate={{
        scale: [1, 1.5, 1],
            opacity: [0.2, 0.3, 0.2],
    }}
    transition={{
        duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
    }}
    />
    <div className="absolute inset-0 flex items-center justify-center">
    <svg className="h-12 w-12 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <motion.path
        strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    initial={{ pathLength: 0 }}
    animate={{ pathLength: 1 }}
    transition={{ duration: 1, delay: 0.5 }}
    />
    </svg>
    </div>
    </div>
    </motion.div>
    </motion.div>
) : (
        <motion.form
            onSubmit={handleSubmit}
    className="space-y-4"
    variants={containerVariants}
    initial="hidden"
    animate="visible"
    >
    <motion.div className="space-y-2" variants={itemVariants}>
    <Label htmlFor="email">Email</Label>
        <div className="relative">
    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
    <Input
        id="email"
    type="email"
    placeholder="your.email@example.com"
    className="pl-10 bg-white/70"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    required
    />

    {/* Input focus animation */}
    <motion.div
    className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500"
    initial={{ width: "0%" }}
    whileInView={{ width: "100%" }}
    transition={{ duration: 0.8, delay: 0.5 }}
    />
    </div>
    {error && (
        <motion.p
            className="text-sm text-red-500"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 500 }}
    >
        {error}
        </motion.p>
    )}
    </motion.div>
    <motion.div variants={itemVariants}>
    <Button
        type="submit"
    className="w-full relative overflow-hidden group bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
    disabled={isSubmitting}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
>
    {isSubmitting ? (
            <motion.div
                className="flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
    >
        <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        >
        <circle
            className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
            ></circle>
            <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
            </svg>
        Đang gửi...
        </motion.div>
    ) : (
        <>
            <span className="relative z-10">Gửi liên kết đặt lại mật khẩu</span>
    <motion.span
        className="absolute inset-0 bg-white/20 transform origin-left"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.3 }}
        />
        </>
    )}
    </Button>
    </motion.div>
    </motion.form>
)}
    </CardContent>
    <CardFooter className="flex justify-center">
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.5 }}>
    <Link
        href="/login"
    className="text-sm text-blue-600 hover:text-blue-800 transition-colors relative group"
        >
        Quay lại trang đăng nhập
    <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-blue-600 group-hover:w-full transition-all duration-300" />
        </Link>
        </motion.div>
        </CardFooter>
        </Card>
        </motion.div>
        </div>
)
}

