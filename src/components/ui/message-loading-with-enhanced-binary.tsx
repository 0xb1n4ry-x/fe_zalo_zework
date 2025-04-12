"use client"

import { motion } from "framer-motion"
import {
    File,
    Image,
    FileArchive,
    FileAudio,
    FileVideo,
    FileText,
    FileIcon as FilePdf,
    FileSpreadsheet,
    Cloud,
    RefreshCw,
} from "lucide-react"

const FileIcons = [File, Image, FileArchive, FileAudio, FileVideo, FileText, FilePdf, FileSpreadsheet]

const FileAnimation = ({ width }: { width: string }) => {
    const randomDuration = () => Math.random() * 1.5 + 1.5
    const randomDelay = () => Math.random() * 0.5
    const randomInitialPosition = () => `${Math.random() * 100}%`

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const lines = Array.from({ length: 3 }, (_, index) => ({
        duration: randomDuration(),
        delay: randomDelay(),
        initialPosition: randomInitialPosition(),
        width: `${Math.random() * 20 + 70}%`,
        icon: FileIcons[Math.floor(Math.random() * FileIcons.length)],
    }))

    const generateBinaryString = (length: number) => {
        return Array.from({ length }, () => Math.round(Math.random())).join("")
    }

    const createBinarySVG = () => {
        const binaryString = generateBinaryString(15)
        return `
      <svg xmlns="http://www.w3.org/2000/svg" width="300" height="20">
        <text x="0" y="15" font-family="monospace" font-size="16" fill="#2196f3" font-weight="bold">
          ${binaryString}
        </text>
      </svg>
    `
    }

    const svgToBase64 = (svg: string) => {
        return `data:image/svg+xml;base64,${btoa(svg)}`
    }

    return (
        <div className={`${width} p-4 bg-gradient-to-br from-blue-50 to-white rounded-lg shadow-lg`}>
            {lines.map((line, index) => (
                <motion.div
                    key={index}
                    className="h-10 mb-3 overflow-hidden relative flex items-center"
                    style={{ width: line.width }}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                    <motion.div
                        className="absolute z-10 bg-blue-100 p-1.5 rounded-full"
                        initial={{ x: "-10%", opacity: 0, scale: 0.8 }}
                        animate={{
                            x: ["0%", "100%", "0%"],
                            opacity: [0, 1, 1, 0],
                            scale: [0.8, 1, 1, 0.8],
                        }}
                        transition={{
                            x: {
                                repeat: Number.POSITIVE_INFINITY,
                                repeatType: "loop",
                                duration: line.duration,
                                ease: "linear",
                                times: [0, 0.5, 1],
                            },
                            opacity: {
                                repeat: Number.POSITIVE_INFINITY,
                                repeatType: "loop",
                                duration: line.duration,
                                ease: "easeInOut",
                                times: [0, 0.05, 0.95, 1],
                            },
                            scale: {
                                repeat: Number.POSITIVE_INFINITY,
                                repeatType: "loop",
                                duration: line.duration,
                                ease: "easeInOut",
                                times: [0, 0.05, 0.95, 1],
                            },
                            delay: line.delay,
                        }}
                    >
                        {line.icon && <line.icon size={20} className="text-blue-600" />}
                    </motion.div>
                    <motion.div
                        className="w-full h-6 bg-gradient-to-r from-transparent via-[#e3f2fd] to-transparent"
                        animate={{
                            x: [line.initialPosition, "100%", "0%", line.initialPosition],
                        }}
                        transition={{
                            x: {
                                repeat: Number.POSITIVE_INFINITY,
                                repeatType: "loop",
                                duration: line.duration,
                                ease: "linear",
                                delay: line.delay,
                            },
                        }}
                    >
                        <div className="w-full h-full">
                            <div
                                className="absolute inset-0"
                                style={{
                                    backgroundImage: `url('${svgToBase64(createBinarySVG())}')`,
                                    backgroundRepeat: "repeat-x",
                                }}
                            />
                        </div>
                    </motion.div>
                    <div className="absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-blue-50 to-transparent" />
                    <div className="absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-blue-50 to-transparent" />
                </motion.div>
            ))}
        </div>
    )
}

const CloudServerAnimation = ({ width }: { width: string }) => {
    const generateBinaryString = (length: number) => {
        return Array.from({ length }, () => Math.round(Math.random())).join("")
    }

    const binaryRows = 5
    const binaryColumns = 20

    return (
        <div
            className={`${width} p-6 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex flex-col items-center justify-center overflow-hidden shadow-lg`}
        >
            <div className="relative w-full h-48">
                <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    animate={{
                        y: [0, -5, 0],
                        scale: [1, 1.05, 1],
                    }}
                    transition={{
                        repeat: Number.POSITIVE_INFINITY,
                        duration: 3,
                        ease: "easeInOut",
                    }}
                >
                    <Cloud size={100} className="text-white" />
                </motion.div>

                {/* New sync icon */}
                <motion.div
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    animate={{
                        rotate: 360,
                    }}
                    transition={{
                        repeat: Number.POSITIVE_INFINITY,
                        duration: 2,
                        ease: "linear",
                    }}
                >
                    <RefreshCw size={32} className="text-white" />
                </motion.div>

                {/* Enhanced binary animation */}
                <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                    {Array.from({ length: binaryRows }).map((_, rowIndex) => (
                        <motion.div
                            key={rowIndex}
                            className="absolute w-full text-blue-200 text-xs font-mono whitespace-nowrap flex justify-around"
                            style={{
                                top: `${(rowIndex / binaryRows) * 100}%`,
                            }}
                            animate={{
                                x: rowIndex % 2 === 0 ? [0, -1000] : [-1000, 0],
                            }}
                            transition={{
                                repeat: Number.POSITIVE_INFINITY,
                                repeatType: "loop",
                                duration: 20 + rowIndex * 2,
                                ease: "linear",
                            }}
                        >
                            {Array.from({ length: binaryColumns }).map((_, colIndex) => (
                                <motion.span
                                    key={colIndex}
                                    animate={{
                                        opacity: [0, 1, 0],
                                    }}
                                    transition={{
                                        repeat: Number.POSITIVE_INFINITY,
                                        duration: 2 + Math.random() * 2,
                                        delay: Math.random() * 2,
                                    }}
                                >
                                    {generateBinaryString(8)}
                                </motion.span>
                            ))}
                        </motion.div>
                    ))}
                </div>

                {/* Data particles */}
                {[...Array(30)].map((_, index) => (
                    <motion.div
                        key={index}
                        className="absolute w-1 h-1 bg-blue-200 rounded-full"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [0, -100],
                            x: [0, Math.random() * 20 - 10],
                            opacity: [0, 1, 0],
                        }}
                        transition={{
                            repeat: Number.POSITIVE_INFINITY,
                            duration: 1.5 + Math.random() * 2,
                            delay: Math.random() * 2,
                            ease: "easeInOut",
                        }}
                    />
                ))}

                {/* Pulsing circles */}
                {[1, 2, 3].map((scale) => (
                    <motion.div
                        key={scale}
                        className="absolute inset-0 border-2 border-blue-200 rounded-full"
                        style={{ scale }}
                        animate={{
                            scale: [scale, scale + 0.5, scale],
                            opacity: [0.7, 0, 0.7],
                        }}
                        transition={{
                            repeat: Number.POSITIVE_INFINITY,
                            duration: 3,
                            delay: scale * 0.5,
                            ease: "easeInOut",
                        }}
                    />
                ))}
            </div>
        </div>
    )
}

export default function MessageLoadingWithEnhancedBinary() {
    return (
        <div className="flex space-x-4 p-4 bg-gray-100 rounded-xl">
            <FileAnimation width="w-1/2" />
            <CloudServerAnimation width="w-1/2" />
        </div>
    )
}

