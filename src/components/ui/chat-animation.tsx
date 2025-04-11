"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Trash2, Pin, X, Smile, Settings } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface Reaction {
    emoji: string
    count: number
}

interface Message {
    id: number
    text: string
    sender: "user" | "bot"
    reactions: Reaction[]
    isPinned: boolean
    isDeleted: boolean
    deletedBy?: string
    deletedAt?: string
    pendingDelete?: boolean
    deleteTimeout?: NodeJS.Timeout
}

interface UserInfo {
    name: string
    avatar: string
    tags: string[]
}

const initialMessages: Message[] = [
    {
        id: 1,
        text: "Xin chào! Bạn có thể giúp tôi không?",
        sender: "Nhân Viên 1",
        reactions: [],
        isPinned: false,
        isDeleted: false,
    },
    {
        id: 2,
        text: "Chào bạn! Tôi rất sẵn lòng giúp đỡ. Bạn cần hỗ trợ gì?",
        sender: "Nhân Viên 4",
        reactions: [],
        isPinned: false,
        isDeleted: false,
    },
    {
        id: 3,
        text: "Tôi muốn biết thêm về tính năng bảo mật của Zework.",
        sender: "Nhân Viên 7",
        reactions: [],
        isPinned: false,
        isDeleted: false,
    },
    {
        id: 4,
        text: "Zework sử dụng mã hóa đầu cuối để bảo vệ tin nhắn của bạn. Chúng tôi cũng cung cấp xác thực hai yếu tố và tính năng tin nhắn tự hủy.",
        sender: "Nhân Viên 3",
        reactions: [],
        isPinned: false,
        isDeleted: false,
    },
    {
        id: 5,
        text: "Tuyệt vời! Cảm ơn bạn rất nhiều.",
        sender: "Nhân Viên 2",
        reactions: [],
        isPinned: false,
        isDeleted: false,
    },
]

const reactionEmojis = ["👍", "❤️", "😊", "😠"]

function TypingIndicator() {
    return (
        <div className="inline-flex items-center bg-gray-100 rounded-full px-3 py-1.5">
            <motion.span
                className="text-xs text-gray-500 mr-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
            >
                Đang nhập
            </motion.span>
            <div className="flex space-x-1">
                {[0, 1, 2].map((index) => (
                    <motion.div
                        key={index}
                        className="w-1.5 h-1.5 bg-gray-400 rounded-full"
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                            duration: 0.6,
                            repeat: Number.POSITIVE_INFINITY,
                            delay: index * 0.1,
                        }}
                    />
                ))}
            </div>
        </div>
    )
}

export function ChatAnimation({ userInfo }: { userInfo: UserInfo }) {
    const [messages, setMessages] = useState<Message[]>(initialMessages)
    const [visibleMessages, setVisibleMessages] = useState<Message[]>([])
    const [pendingDeleteMessages, setPendingDeleteMessages] = useState<number[]>([])
    const [deleteCountdowns, setDeleteCountdowns] = useState<{ [key: number]: number }>({})
    const [isTyping, setIsTyping] = useState(false)

    useEffect(() => {
        const timer = setInterval(() => {
            setVisibleMessages((prev) => {
                if (prev.length < messages.length) {
                    return [...prev, messages[prev.length]]
                }
                return prev
            })
        }, 2000)

        return () => {
            clearInterval(timer)
            messages.forEach((msg) => {
                if (msg.deleteTimeout) {
                    clearInterval(msg.deleteTimeout)
                }
            })
        }
    }, [messages])

    useEffect(() => {
        const typingInterval = setInterval(() => {
            setIsTyping((prev) => !prev)
        }, 8000) // Toggle isTyping every 8 seconds for demonstration

        return () => clearInterval(typingInterval)
    }, [])

    const handleDelete = (id: number) => {
        setPendingDeleteMessages((prev) => [...prev, id])
        setDeleteCountdowns((prev) => ({ ...prev, [id]: 10 }))

        const countdownInterval = setInterval(() => {
            setDeleteCountdowns((prev) => {
                const newCountdown = prev[id] - 1
                if (newCountdown <= 0) {
                    clearInterval(countdownInterval)
                    const now = new Date()
                    setMessages((prevMessages) =>
                        prevMessages.map((m) =>
                            m.id === id
                                ? {
                                    ...m,
                                    isDeleted: true,
                                    deletedBy: m.sender === "user" ? "Nhân Viên X" : "Nhân Viên Y",
                                    deletedAt: now.toLocaleString("vi-VN", {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        second: "2-digit",
                                        hour12: false,
                                    }),
                                    reactions: [], // Xóa tất cả cảm xúc khi tin nhắn bị xóa
                                }
                                : m,
                        ),
                    )
                    setVisibleMessages((prevMessages) =>
                        prevMessages.map((m) =>
                            m.id === id
                                ? {
                                    ...m,
                                    isDeleted: true,
                                    deletedBy: m.sender === "user" ? "Nhân Viên 1" : "Nhân Viên 2",
                                    deletedAt: now.toLocaleString("vi-VN", {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        second: "2-digit",
                                        hour12: false,
                                    }),
                                    reactions: [], // Xóa tất cả cảm xúc khi tin nhắn bị xóa
                                }
                                : m,
                        ),
                    )
                    setPendingDeleteMessages((prev) => prev.filter((msgId) => msgId !== id))
                    const newCountdowns = { ...prev }
                    delete newCountdowns[id]
                    return newCountdowns
                }
                return { ...prev, [id]: newCountdown }
            })
        }, 1000)

        setMessages((prev) =>
            prev.map((msg) =>
                msg.id === id
                    ? {
                        ...msg,
                        deleteTimeout: countdownInterval,
                    }
                    : msg,
            ),
        )
    }

    const handleRestore = (id: number) => {
        setMessages((prev) =>
            prev.map((msg) =>
                msg.id === id
                    ? {
                        ...msg,
                        deleteTimeout: msg.deleteTimeout && clearInterval(msg.deleteTimeout),
                    }
                    : msg,
            ),
        )
        setPendingDeleteMessages((prev) => prev.filter((msgId) => msgId !== id))
        setDeleteCountdowns((prev) => {
            const newCountdowns = { ...prev }
            delete newCountdowns[id]
            return newCountdowns
        })
    }

    const handleReaction = (id: number, emoji: string) => {
        const updateReactions = (msg: Message) => {
            if (msg.id === id) {
                const existingReaction = msg.reactions.find((r) => r.emoji === emoji)
                if (existingReaction) {
                    return {
                        ...msg,
                        reactions: msg.reactions.map((r) => (r.emoji === emoji ? { ...r, count: r.count + 1 } : r)),
                    }
                } else {
                    return {
                        ...msg,
                        reactions: [...msg.reactions, { emoji, count: 1 }],
                    }
                }
            }
            return msg
        }

        setMessages((prev) => prev.map(updateReactions))
        setVisibleMessages((prev) => prev.map(updateReactions))
    }

    const handlePin = (id: number) => {
        const updatePin = (msg: Message) => (msg.id === id ? { ...msg, isPinned: !msg.isPinned } : msg)

        setMessages((prev) => prev.map(updatePin))
        setVisibleMessages((prev) => prev.map(updatePin))
    }

    const pinnedMessages = visibleMessages.filter((msg) => msg.isPinned)

    const scrollbarStyles = `
  .pretty-scrollbar::-webkit-scrollbar {
    width: 6px;
  }
  .pretty-scrollbar::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 3px;
  }
  .pretty-scrollbar::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 3px;
  }
  .pretty-scrollbar::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`

    return (
        <>
            <style jsx global>
                {scrollbarStyles}
            </style>
            <div className="w-full max-w-2xl mx-auto bg-gradient-to-r from-blue-600 to-indigo-700 rounded-lg shadow-2xl p-6 h-[600px] overflow-hidden flex flex-col relative">
                <UserInfoBar userInfo={userInfo} />
                {pinnedMessages.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="mb-6 bg-white p-4 rounded-lg border-2 border-blue-200 shadow-md"
                    >
                        <h4 className="text-lg font-semibold mb-3 text-blue-600">Tin nhắn đã ghim:</h4>
                        {pinnedMessages.map((msg) => (
                            <motion.div
                                key={msg.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                className="flex justify-between items-center text-sm text-gray-600 mb-2 bg-blue-50 p-3 rounded-md"
                            >
                                <span className="truncate flex-grow mr-2">{msg.text}</span>
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => handlePin(msg.id)}
                                    className="text-blue-500 hover:text-blue-700"
                                >
                                    <X className="h-5 w-5" />
                                </motion.button>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
                <div className="flex-grow overflow-y-auto mb-4 px-4 custom-scrollbar pretty-scrollbar">
                    <div className="max-w-2xl mx-auto">
                        <AnimatePresence>
                            {visibleMessages.map((message) => (
                                <motion.div
                                    key={message.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                    className={`mb-4 ${message.sender === "user" ? "ml-auto" : "mr-auto"}`}
                                >
                                    {pendingDeleteMessages.includes(message.id) ? (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="text-sm text-gray-500 italic bg-gray-100 p-3 rounded-lg inline-block shadow-md"
                                        >
                                            Tin nhắn sẽ bị xóa sau {deleteCountdowns[message.id]} giây
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                className="ml-2 px-2 py-1 bg-blue-500 text-white rounded-md text-xs"
                                                onClick={() => handleRestore(message.id)}
                                            >
                                                Khôi phục
                                            </motion.button>
                                        </motion.div>
                                    ) : message.isDeleted ? (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="text-sm text-gray-500 italic bg-gray-100 p-3 rounded-lg inline-block shadow-md"
                                        >
                                            Tin nhắn đã bị xóa bởi {message.deletedBy} lúc {message.deletedAt}
                                        </motion.div>
                                    ) : (
                                        <div className={`relative group ${message.sender === "user" ? "text-right" : "text-left"}`}>
                                            <motion.div
                                                className={`inline-block p-3 rounded-lg text-base shadow-md ${
                                                    message.sender === "user" ? "bg-blue-500 text-white" : "bg-white text-gray-800"
                                                }`}
                                                whileHover={{ scale: 1.02 }}
                                                transition={{ type: "spring", stiffness: 300, damping: 10 }}
                                            >
                                                {message.text}
                                            </motion.div>
                                            <motion.div
                                                className="absolute top-0 right-0 -mt-2 -mr-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                                                initial={{ scale: 0.8 }}
                                                animate={{ scale: 1 }}
                                                exit={{ scale: 0.8 }}
                                            >
                                                <motion.button
                                                    whileHover={{ scale: 1.2 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    className="bg-white rounded-full p-2 shadow-lg"
                                                    onClick={() => handleDelete(message.id)}
                                                >
                                                    <Trash2 className="h-4 w-4 text-red-500" />
                                                </motion.button>
                                                <motion.div className="relative">
                                                    <motion.button
                                                        whileHover={{ scale: 1.2 }}
                                                        whileTap={{ scale: 0.9 }}
                                                        className="bg-white rounded-full p-2 shadow-lg"
                                                    >
                                                        <Smile className="h-4 w-4 text-yellow-500" />
                                                    </motion.button>
                                                    <motion.div
                                                        className="absolute right-0 mt-2 bg-white rounded-full shadow-lg hidden group-hover:flex p-1"
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        exit={{ opacity: 0, y: 10 }}
                                                    >
                                                        {reactionEmojis.map((emoji) => (
                                                            <motion.button
                                                                key={emoji}
                                                                className="p-1 text-xl"
                                                                onClick={() => handleReaction(message.id, emoji)}
                                                                whileHover={{ scale: 1.3 }}
                                                                whileTap={{ scale: 0.9 }}
                                                            >
                                                                {emoji}
                                                            </motion.button>
                                                        ))}
                                                    </motion.div>
                                                </motion.div>
                                                <motion.button
                                                    whileHover={{ scale: 1.2 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    className="bg-white rounded-full p-2 shadow-lg"
                                                    onClick={() => handlePin(message.id)}
                                                >
                                                    <Pin className={`h-4 w-4 ${message.isPinned ? "text-blue-500" : "text-gray-500"}`} />
                                                </motion.button>
                                            </motion.div>
                                        </div>
                                    )}
                                    {message.reactions.length > 0 && !message.isDeleted && (
                                        <motion.div
                                            className={`mt-1 flex flex-wrap ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                                            initial={{ opacity: 0, y: -5 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            {message.reactions.map((reaction, index) => (
                                                <motion.span
                                                    key={index}
                                                    className="mr-2 mb-2 bg-white rounded-full px-3 py-1 text-sm flex items-center shadow-md"
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                >
                                                    {reaction.emoji} <span className="ml-1 text-xs text-gray-500">{reaction.count}</span>
                                                </motion.span>
                                            ))}
                                        </motion.div>
                                    )}
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
                <AnimatePresence>
                    {isTyping && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.3 }}
                            className="absolute bottom-6 left-6"
                        >
                            <TypingIndicator />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </>
    )
}

function UserInfoBar({ userInfo }: { userInfo: UserInfo }) {
    return (
        <motion.div
            className="flex items-center justify-between bg-gradient-to-r from-blue-500 to-indigo-600 p-4 rounded-t-lg shadow-md mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="flex items-center space-x-4">
                <div className="relative">
                    <Avatar className="h-12 w-12 border-1 border-white">
                        <AvatarImage src={userInfo.avatar} alt={userInfo.name} />
                        <AvatarFallback>{userInfo.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-400 border-2 border-white"></span>
                </div>
                <div>
                    <h3 className="font-semibold text-lg text-white">{userInfo.name}</h3>
                    <div className="flex flex-wrap gap-2 mt-1">
                        {userInfo.tags.map((tag, index) => (
                            <Badge
                                key={index}
                                variant="secondary"
                                className="bg-white bg-opacity-20 text-white hover:bg-opacity-30 transition-colors duration-200"
                            >
                                {tag}
                            </Badge>
                        ))}
                    </div>
                </div>
            </div>
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-white hover:text-blue-200 transition-colors duration-200"
            >
                <Settings className="h-6 w-6" />
            </motion.button>
        </motion.div>
    )
}

