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
    Server,
    Wifi,
} from "lucide-react"

const FileIcons = [File, Image, FileArchive, FileAudio, FileVideo, FileText, FilePdf, FileSpreadsheet]

const CircularFileAnimation = ({ width }: { width: string }) => {
    const items = Array.from({ length: 8 }, (_, index) => ({
        icon: FileIcons[index % FileIcons.length],
        delay: index * 0.5,
    }))

    return (
        <div className={`${width} aspect-square bg-white rounded-full shadow-md relative overflow-hidden`}>
            {items.map((item, index) => (
                <motion.div
                    key={index}
                    className="absolute"
                    style={{
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                        top: "50%",
                        left: "50%",
                        marginLeft: -20,
                        marginTop: -20,
                    }}
                    initial={{ rotate: index * 45, translateY: -100 }}
                    animate={{
                        rotate: [index * 45, index * 45 + 360],
                        translateY: [-100, -100],
                    }}
                    transition={{
                        repeat: Number.POSITIVE_INFINITY,
                        duration: 8,
                        ease: "linear",
                        delay: item.delay,
                    }}
                >
                    <motion.div
                        className="w-full h-full bg-blue-100 rounded-full flex items-center justify-center"
                        initial={{ scale: 0.8, opacity: 0.5 }}
                        animate={{ scale: [0.8, 1, 0.8], opacity: [0.5, 1, 0.5] }}
                        transition={{
                            repeat: Number.POSITIVE_INFINITY,
                            duration: 2,
                            ease: "easeInOut",
                        }}
                    >
                        <item.icon size={24} className="text-blue-600" />
                    </motion.div>
                </motion.div>
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-white" />
        </div>
    )
}

const CircularServerAnimation = ({ width }: { width: string }) => {
    return (
        <div
            className={`${width} aspect-square bg-gradient-to-br from-gray-800 to-gray-900 rounded-full shadow-lg flex items-center justify-center relative overflow-hidden`}
        >
            <motion.div
                className="relative"
                animate={{
                    rotate: 360,
                }}
                transition={{
                    repeat: Number.POSITIVE_INFINITY,
                    duration: 20,
                    ease: "linear",
                }}
            >
                <Server size={80} className="text-blue-400" />
            </motion.div>
            {[1, 2, 3].map((_, index) => (
                <motion.div
                    key={index}
                    className="absolute inset-0 border-2 border-blue-400 rounded-full"
                    initial={{ scale: 0 }}
                    animate={{
                        scale: [0, 1, 0],
                        opacity: [0, 0.5, 0],
                    }}
                    transition={{
                        repeat: Number.POSITIVE_INFINITY,
                        duration: 4,
                        delay: index * 1,
                        ease: "easeInOut",
                    }}
                />
            ))}
            {[0, 1, 2].map((index) => (
                <motion.div
                    key={index}
                    className="absolute"
                    style={{
                        top: "50%",
                        left: "50%",
                    }}
                    initial={{ rotate: index * 120, translateY: -120 }}
                    animate={{
                        rotate: [index * 120, index * 120 + 360],
                        translateY: -120,
                    }}
                    transition={{
                        repeat: Number.POSITIVE_INFINITY,
                        duration: 10,
                        ease: "linear",
                        delay: index * 1,
                    }}
                >
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                            repeat: Number.POSITIVE_INFINITY,
                            duration: 2,
                            ease: "easeInOut",
                        }}
                    >
                        <Wifi size={24} className="text-green-400" />
                    </motion.div>
                </motion.div>
            ))}
        </div>
    )
}

export default function CircularLoadingAnimation() {
    return (
        <div className="flex space-x-4 p-4 bg-gray-100 rounded-xl">
            <CircularFileAnimation width="w-1/2" />
            <CircularServerAnimation width="w-1/2" />
        </div>
    )
}

