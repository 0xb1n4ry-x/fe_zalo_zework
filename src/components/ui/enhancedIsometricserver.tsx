// "use client"
//
// import { motion } from "framer-motion"
// import { Settings, Server, Database, Cloud } from "lucide-react"
//
// export function EnhancedIsometricServer() {
//     return (
//         <div className="relative w-[400px] h-[300px]">
//             {/* Background glow effect */}
//             <div className="absolute inset-0 bg-blue-500 opacity-20 blur-3xl rounded-full"></div>
//
//             {/* Gear animations */}
//             {[...Array(5)].map((_, i) => (
//                 <motion.div
//                     key={i}
//                     className="absolute text-blue-400"
//                     style={{
//                         top: `${Math.random() * 100}%`,
//                         left: `${Math.random() * 100}%`,
//                         width: `${24 + Math.random() * 24}px`,
//                         height: `${24 + Math.random() * 24}px`,
//                     }}
//                     animate={{ rotate: 360 }}
//                     transition={{ duration: 10 + Math.random() * 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
//                 >
//                     <Settings className="w-full h-full" />
//                 </motion.div>
//             ))}
//
//             {/* Main server */}
//             <motion.div
//                 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-48 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg shadow-2xl transform rotate-[30deg] skew-y-[-20deg]"
//                 animate={{ y: [0, -10, 0] }}
//                 transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
//             >
//                 <div className="absolute inset-1 bg-gray-900 rounded-lg p-4 flex flex-col justify-between">
//                     <div className="flex justify-between items-center">
//                         <Server className="w-8 h-8 text-blue-400" />
//                         <div className="flex space-x-2">
//                             {[1, 2, 3].map((i) => (
//                                 <motion.div
//                                     key={i}
//                                     className="w-2 h-2 bg-green-400 rounded-full"
//                                     animate={{ opacity: [0.5, 1, 0.5] }}
//                                     transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, delay: i * 0.5 }}
//                                 />
//                             ))}
//                         </div>
//                     </div>
//                     <div className="space-y-2">
//                         {[1, 2, 3].map((i) => (
//                             <motion.div
//                                 key={i}
//                                 className="h-2 bg-blue-500 rounded"
//                                 initial={{ width: "0%" }}
//                                 animate={{ width: "100%" }}
//                                 transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: i * 0.7 }}
//                             />
//                         ))}
//                     </div>
//                     <div className="flex justify-between text-blue-300">
//                         <Database className="w-6 h-6" />
//                         <Cloud className="w-6 h-6" />
//                     </div>
//                 </div>
//             </motion.div>
//
//             {/* Additional decorative elements */}
//             <motion.div
//                 className="absolute bottom-10 left-10 w-16 h-16 bg-purple-500 rounded-full opacity-50"
//                 animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
//                 transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
//             />
//             <motion.div
//                 className="absolute top-10 right-10 w-12 h-12 bg-blue-500 rounded-full opacity-50"
//                 animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.7, 0.5] }}
//                 transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
//             />
//         </div>
//     )
// }
//

"use client"

import { motion } from "framer-motion"
import { Settings, Server, Database, Cloud } from "lucide-react"

export function EnhancedIsometricServer() {
    return (
        <div className="relative w-[400px] h-[400px]">
            {/* Background glow effect */}
            <div className="absolute inset-0 bg-blue-500 opacity-20 blur-3xl rounded-full"></div>

            {/* Gear animations */}
            {[...Array(5)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute text-blue-400"
                    style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        width: `${24 + Math.random() * 24}px`,
                        height: `${24 + Math.random() * 24}px`,
                    }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10 + Math.random() * 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                >
                    <Settings className="w-full h-full" />
                </motion.div>
            ))}

            {/* Main server */}
            <motion.div
                className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 w-80 h-48 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg shadow-2xl transform rotate-[30deg] skew-y-[-20deg]"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            >
                <div className="absolute inset-1 bg-gray-900 rounded-lg p-4 flex flex-col justify-between">
                    <div className="flex justify-between items-center">
                        <Server className="w-8 h-8 text-blue-400" />
                        <div className="flex space-x-2">
                            {[1, 2, 3].map((i) => (
                                <motion.div
                                    key={i}
                                    className="w-2 h-2 bg-green-400 rounded-full"
                                    animate={{ opacity: [0.5, 1, 0.5] }}
                                    transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, delay: i * 0.5 }}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="space-y-2">
                        {[1, 2, 3].map((i) => (
                            <motion.div
                                key={i}
                                className="h-2 bg-blue-500 rounded"
                                initial={{ width: "0%" }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: i * 0.7 }}
                            />
                        ))}
                    </div>
                    <div className="flex justify-between text-blue-300">
                        <Database className="w-6 h-6" />
                        <Cloud className="w-6 h-6" />
                    </div>
                </div>
            </motion.div>

            {/* Additional decorative elements */}
            <motion.div
                className="absolute bottom-32 left-10 w-16 h-16 bg-purple-500 rounded-full opacity-50"
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            />
            <motion.div
                className="absolute top-10 right-10 w-12 h-12 bg-blue-500 rounded-full opacity-50"
                animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.7, 0.5] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            />

            {/* Zalo Server text */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full text-center pt-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                >
                    <motion.h2
                        className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600"
                        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                        transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                        style={{ backgroundSize: "200% 200%" }}
                    >
                       Zalo Server
                    </motion.h2>
                </motion.div>
                <motion.div
                    className="mt-2 text-blue-300 text-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                >
                    <motion.span
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                    >
                        Kết nối
                    </motion.span>{" "}
                    <motion.span
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.5 }}
                    >
                        hàng triệu
                    </motion.span>{" "}
                    <motion.span
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
                    >
                        người dùng ♥
                    </motion.span>
                </motion.div>
            </div>
        </div>
    )
}


