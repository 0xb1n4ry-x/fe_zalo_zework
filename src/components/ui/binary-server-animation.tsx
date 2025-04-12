"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

const TOTAL_BITS = 30
const NEW_BITS_PER_INTERVAL = 3
const STREAM_WIDTH = 450

function BinaryStream({ direction }: { direction: "left" | "right" }) {
    const [binaryDigits, setBinaryDigits] = useState<string[]>([])

    useEffect(() => {
        const interval = setInterval(() => {
            setBinaryDigits((prev) => {
                const newDigits = Array.from({ length: NEW_BITS_PER_INTERVAL }, () => (Math.random() > 0.5 ? "1" : "0"))
                return direction === "right"
                    ? [...prev.slice(-TOTAL_BITS + NEW_BITS_PER_INTERVAL), ...newDigits]
                    : [...newDigits, ...prev.slice(0, TOTAL_BITS - NEW_BITS_PER_INTERVAL)]
            })
        }, 200)

        return () => clearInterval(interval)
    }, [direction])

    return (
        <div className="relative w-[450px] h-10 overflow-hidden">
            {binaryDigits.map((digit, index) => (
                <motion.div
                    key={`${index}-${digit}`}
                    className={`absolute text-2xl font-bold font-mono ${digit === "1" ? "text-blue-600" : "text-gray-400"}`}
                    initial={{
                        x: direction === "right" ? -20 : STREAM_WIDTH + 20,
                        opacity: 0,
                        scale: 0.5,
                    }}
                    animate={{
                        x: direction === "right" ? index * 15 : STREAM_WIDTH - index * 15,
                        opacity: 1,
                        scale: 1,
                    }}
                    exit={{
                        x: direction === "right" ? STREAM_WIDTH + 20 : -20,
                        opacity: 0,
                        scale: 0.5,
                    }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    style={{
                        textShadow:
                            digit === "1"
                                ? "0 0 10px rgba(37, 99, 235, 0.5), 0 0 20px rgba(37, 99, 235, 0.3)"
                                : "0 0 10px rgba(156, 163, 175, 0.5), 0 0 20px rgba(156, 163, 175, 0.3)",
                    }}
                >
                    {digit}
                </motion.div>
            ))}
        </div>
    )
}

function DataPath({ direction }: { direction: "left" | "right" }) {
    return (
        <svg className="absolute w-full h-full m-10" viewBox="0 0 450 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <motion.path
                d={direction === "right" ? "M0 15 H450" : "M450 15 H0"}
                stroke="url(#gradient)"
                strokeWidth="2"
                strokeDasharray="5,5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            />
            <defs>
                <linearGradient id="gradient" x1="0%" y1="0" x2="100%" y2="0">
                    <stop offset="0%" stopColor="#2563EB" />
                    <stop offset="100%" stopColor="#60A5FA" />
                </linearGradient>
            </defs>
        </svg>
    )
}
export default function BinaryDataStreamAnimation() {
    return (
        <div className="flex items-center justify-center h-1/2">
            <div className="relative flex flex-col space-y-40">
                <div>
                    <div></div>
                </div>
                <div className="relative">
                    {/*<DataTransfer direction={"right"}/>*/}
                    <DataPath direction="right" />
                    <BinaryStream direction="right" />

                </div>
                <div className="relative">
                    <DataPath direction="left" />
                    <BinaryStream direction="left" />
                    {/*<DataTransfer direction={"left"}/>*/}

                </div>
            </div>
        </div>
    )
}

