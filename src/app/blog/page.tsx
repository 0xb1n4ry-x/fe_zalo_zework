"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    MessageCircle,
    Users,
    Eye,
    Search,
    TrendingUp,
    Clock,
    FlameIcon as Fire,
    Sparkles,
    PenSquare,
    BarChart3,
    Hash,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface Topic {
    id: string
    title: string
    description: string
    author: {
        name: string
        avatar: string
    }
    category: string
    tags: string[]
    views: number
    replies: number
    participants: number
    isHot?: boolean
    isNew?: boolean
    lastActivity: Date
}

export default function ForumPage() {
    const [searchQuery, setSearchQuery] = React.useState("")
    const [selectedCategory, setSelectedCategory] = React.useState("all")

    const categories = [
        { id: "all", name: "Tất cả", icon: Hash },
        { id: "general", name: "Thảo luận chung", icon: MessageCircle },
        { id: "tech", name: "Công nghệ", icon: BarChart3 },
        { id: "programming", name: "Lập trình", icon: PenSquare },
        { id: "design", name: "Thiết kế", icon: Users },
        { id: "questions", name: "Hỏi đáp", icon: MessageCircle },
    ]

    const topics: Topic[] = [
        {
            id: "1",
            title: "Tổng hợp tài liệu học React và Next.js cho người mới bắt đầu",
            description: "Chia sẻ các nguồn tài liệu hữu ích để học React và Next.js, từ cơ bản đến nâng cao...",
            author: {
                name: "Alex Johnson",
                avatar: "/placeholder.svg",
            },
            category: "programming",
            tags: ["react", "nextjs", "javascript", "tutorial"],
            views: 1520,
            replies: 45,
            participants: 28,
            isHot: true,
            lastActivity: new Date(2024, 1, 25, 14, 30),
        },
        {
            id: "2",
            title: "Thảo luận: Xu hướng công nghệ 2024",
            description: "Cùng thảo luận về các xu hướng công nghệ mới nhất trong năm 2024...",
            author: {
                name: "Sarah Wilson",
                avatar: "/placeholder.svg",
            },
            category: "tech",
            tags: ["trends", "technology", "ai", "blockchain"],
            views: 2340,
            replies: 87,
            participants: 54,
            isHot: true,
            lastActivity: new Date(2024, 1, 25, 15, 45),
        },
        {
            id: "3",
            title: "Chia sẻ kinh nghiệm làm UI/UX Designer",
            description: "Mình đã làm UI/UX Designer được 5 năm, hôm nay muốn chia sẻ một số kinh nghiệm...",
            author: {
                name: "Emily Chen",
                avatar: "/placeholder.svg",
            },
            category: "design",
            tags: ["design", "ui-ux", "career"],
            views: 890,
            replies: 32,
            participants: 21,
            isNew: true,
            lastActivity: new Date(2024, 1, 25, 16, 20),
        },
    ]

    const filteredTopics = topics.filter((topic) => {
        const matchesSearch =
            topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            topic.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            topic.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

        const matchesCategory = selectedCategory === "all" || topic.category === selectedCategory

        return matchesSearch && matchesCategory
    })

    const formatNumber = (num: number) => {
        return new Intl.NumberFormat("vi-VN").format(num)
    }

    const formatTimeAgo = (date: Date) => {
        const now = new Date()
        const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))

        if (diffInMinutes < 60) {
            return `${diffInMinutes} phút trước`
        } else if (diffInMinutes < 1440) {
            return `${Math.floor(diffInMinutes / 60)} giờ trước`
        } else {
            return `${Math.floor(diffInMinutes / 1440)} ngày trước`
        }
    }
    const containerVariants = {
        hidden: {
            opacity: 0,
        },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3,
            },
        },
    }
    const letterVariants = {
        hidden: {
            opacity: 0,
            y: 20,
            scale: 0.8,
            rotate: -5,
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            rotate: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 10,
            },
        },
    }
    const gradientVariants = {
        hidden: {
            opacity: 0,
            scale: 0.8,
        },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 1,
                ease: "easeOut",
            },
        },
    }
    const contentVariants = {
        hidden: {
            opacity: 0,
            y: 20,
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut",
            },
        },
    }
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            {/* Hero Section */}
            {/*<div className="relative overflow-hidden bg-gradient-to-r from-purple-500 to-blue-500">*/}
            {/*    <div className="absolute inset-0 bg-grid-white/[0.1] bg-[size:20px_20px]" />*/}
            {/*    <div className="absolute inset-0 bg-gradient-to-t from-transparent to-purple-500/20" />*/}
            {/*    <div className="container mx-auto px-4 py-12 relative">*/}
            {/*        <div className="max-w-2xl">*/}
            {/*            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 font-heading">Chào mừng đến với Diễn đàn của Zework</h1>*/}
            {/*            <p className="text-purple-50 text-sm mb-6">*/}
            {/*                Nơi chia sẻ kiến thức, kết nối cộng đồng và cùng nhau phát triển*/}
            {/*            </p>*/}
            {/*            <div className="flex flex-col sm:flex-row gap-4">*/}
            {/*                <div className="relative flex-1">*/}
            {/*                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />*/}
            {/*                    <Input*/}
            {/*                        placeholder="Tìm kiếm chủ đề..."*/}
            {/*                        value={searchQuery}*/}
            {/*                        onChange={(e) => setSearchQuery(e.target.value)}*/}
            {/*                        className="pl-9 h-11 bg-white/90 backdrop-blur-sm border-purple-100/20 w-full"*/}
            {/*                    />*/}
            {/*                </div>*/}
            {/*                <Button size="lg" className="bg-white text-purple-600 hover:bg-white/90">*/}
            {/*                    <PenSquare className="mr-2 h-4 w-4" />*/}
            {/*                    Tạo chủ đề mới*/}
            {/*                </Button>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
            <div className="relative overflow-hidden min-h-[400px] flex items-center pt-20">
                {/* Animated gradient background */}
                <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-500 to-purple-600"
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{
                        opacity: 1,
                        scale: 1,
                        background: [
                            "linear-gradient(to right, #7c3aed, #3b82f6, #7c3aed)",
                            "linear-gradient(to right, #3b82f6, #7c3aed, #3b82f6)",
                            "linear-gradient(to right, #7c3aed, #3b82f6, #7c3aed)",
                        ],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "reverse",
                        ease: "linear",
                    }}
                />

                {/* Animated grid pattern */}
                <motion.div
                    className="absolute inset-0 bg-grid-white/[0.1] bg-[size:20px_20px]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-100/20 to-blue-900/40" />

                {/* Content */}
                <div className="container mx-auto px-4 relative">
                    <motion.div
                        className="max-w-2xl mx-auto text-center"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {/* Animated title */}
                        <motion.h1
                            className="text-4xl md:text-5xl lg:text-6xl font-bold  mb-6 font-heading relative"
                            variants={contentVariants}
                        >
                            {["Chào mừng đến với"].map((word, i) => (
                                <motion.span key={i} className="inline-block mx-1 bg-gradient-to-l from-blue-500 via-purple-600 to-purple-200 text-transparent bg-clip-text" variants={letterVariants}>
                                    {word}
                                </motion.span>
                            ))}
                            <motion.span
                                className="inline-block mx-1 bg-gradient-to-r from-blue-500 via-purple-600 to-purple-200 text-transparent bg-clip-text pt-5"
                                variants={letterVariants}
                            >
                                Diễn đàn Zework
                            </motion.span>
                        </motion.h1>

                        {/* Animated description */}
                        <motion.p className="text-lg md:text-xl text-purple-50 mb-8 leading-relaxed" variants={contentVariants}>
                            Nơi chia sẻ kiến thức, kết nối cộng đồng và cùng nhau phát triển
                        </motion.p>

                        {/* Search and CTA */}
                        <motion.div
                            className="flex flex-col sm:flex-row gap-4 justify-center max-w-xl mx-auto"
                            variants={contentVariants}
                        >
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <Input
                                    placeholder="Tìm kiếm chủ đề..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10 h-12 bg-white/95 backdrop-blur-sm border-purple-100/20 w-full text-base rounded-full shadow-lg"
                                />
                            </div>
                            <Button
                                size="lg"
                                className="h-12 px-6 bg-white text-purple-600 hover:bg-white/90 rounded-full shadow-lg hover:scale-105 transition-transform"
                            >
                                <PenSquare className="mr-2 h-5 w-5" />
                                Tạo chủ đề mới
                            </Button>
                        </motion.div>

                        {/* Animated stats */}
                        <motion.div className="grid grid-cols-3 gap-8 mt-12 max-w-xl mx-auto" variants={contentVariants}>
                            <div className="text-center">
                                <motion.div
                                    className="text-3xl font-bold text-white mb-1"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 1, type: "spring" }}
                                >
                                    1.2K+
                                </motion.div>
                                <div className="text-purple-200 text-sm">Chủ đề</div>
                            </div>
                            <div className="text-center">
                                <motion.div
                                    className="text-3xl font-bold text-white mb-1"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 1.2, type: "spring" }}
                                >
                                    5K+
                                </motion.div>
                                <div className="text-purple-200 text-sm">Thành viên</div>
                            </div>
                            <div className="text-center">
                                <motion.div
                                    className="text-3xl font-bold text-white mb-1"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 1.4, type: "spring" }}
                                >
                                    10K+
                                </motion.div>
                                <div className="text-purple-200 text-sm">Bài viết</div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Decorative elements */}
                <motion.div
                    className="absolute -top-20 -right-20 w-64 h-64 bg-purple-500 rounded-full blur-3xl opacity-20"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.2, 0.3, 0.2],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "reverse",
                    }}
                />
                <motion.div
                    className="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-500 rounded-full blur-3xl opacity-20"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.2, 0.3, 0.2],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "reverse",
                        delay: 1,
                    }}
                />
            </div>
            <div className="container mx-auto px-4 py-8">
                <div className="grid gap-8 md:grid-cols-[280px_1fr]">
                    {/* Sidebar */}
                    <div className="space-y-6">
                        <Card className="border-0 shadow-lg shadow-purple-500/5">
                            <CardHeader>
                                <CardTitle className="text-base font-semibold font-heading">Danh mục</CardTitle>
                            </CardHeader>
                            <CardContent className="grid gap-1 p-2">
                                {categories.map((category) => {
                                    const Icon = category.icon
                                    return (
                                        <Button
                                            key={category.id}
                                            variant="ghost"
                                            className={cn(
                                                "w-full justify-start h-11 px-4 hover:bg-purple-50 hover:text-purple-600 transition-colors",
                                                selectedCategory === category.id && "bg-purple-50 text-purple-600 hover:bg-purple-50/80",
                                            )}
                                            onClick={() => setSelectedCategory(category.id)}
                                        >
                                            <Icon className="mr-2 h-4 w-4" />
                                            {category.name}
                                        </Button>
                                    )
                                })}
                            </CardContent>
                        </Card>

                        <Card className="border-0 shadow-lg shadow-purple-500/5">
                            <CardHeader>
                                <CardTitle className="text-base font-semibold font-heading">Thống kê</CardTitle>
                            </CardHeader>
                            <CardContent className="grid gap-4">
                                <div className="flex justify-between items-center p-3 rounded-lg bg-purple-50">
                                    <span className="text-purple-600 font-medium">Chủ đề</span>
                                    <span className="text-lg font-semibold text-purple-700">{formatNumber(topics.length)}</span>
                                </div>
                                <div className="flex justify-between items-center p-3 rounded-lg bg-blue-50">
                                    <span className="text-blue-600 font-medium">Bài viết</span>
                                    <span className="text-lg font-semibold text-blue-700">
                    {formatNumber(topics.reduce((acc, topic) => acc + topic.replies, 0))}
                  </span>
                                </div>
                                <div className="flex justify-between items-center p-3 rounded-lg bg-pink-50">
                                    <span className="text-pink-600 font-medium">Thành viên</span>
                                    <span className="text-lg font-semibold text-pink-700">{formatNumber(1234)}</span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Main Content */}
                    <div className="space-y-6">
                        <Tabs defaultValue="trending" className="w-full">
                            <TabsList className="bg-white p-1 border shadow-sm">
                                <TabsTrigger
                                    value="trending"
                                    className="flex items-center gap-2 data-[state=active]:bg-purple-50 data-[state=active]:text-purple-600"
                                >
                                    <TrendingUp className="h-4 w-4" />
                                    Xu hướng
                                </TabsTrigger>
                                <TabsTrigger
                                    value="new"
                                    className="flex items-center gap-2 data-[state=active]:bg-purple-50 data-[state=active]:text-purple-600"
                                >
                                    <Sparkles className="h-4 w-4" />
                                    Mới nhất
                                </TabsTrigger>
                                <TabsTrigger
                                    value="hot"
                                    className="flex items-center gap-2 data-[state=active]:bg-purple-50 data-[state=active]:text-purple-600"
                                >
                                    <Fire className="h-4 w-4" />
                                    Nóng
                                </TabsTrigger>
                            </TabsList>
                            <TabsContent value="trending" className="mt-6">
                                <div className="grid gap-4">
                                    {filteredTopics.map((topic) => (
                                        <Card
                                            key={topic.id}
                                            className="overflow-hidden border-0 shadow-lg shadow-purple-500/5 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300"
                                        >
                                            <CardContent className="p-6">
                                                <div className="flex gap-4">
                                                    <Avatar className="h-12 w-12 ring-2 ring-purple-100">
                                                        <AvatarImage src={topic.author.avatar} />
                                                        <AvatarFallback className="bg-gradient-to-br from-purple-400 to-blue-400 text-white">
                                                            {topic.author.name[0]}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div className="flex-1 space-y-2">
                                                        <div className="space-y-1">
                                                            <h3 className="text-base font-semibold hover:text-purple-600 cursor-pointer transition-colors">
                                                                {topic.title}
                                                            </h3>
                                                            <p className="text-gray-500 line-clamp-2 text-sm">{topic.description}</p>
                                                        </div>
                                                        <div className="flex flex-wrap items-center gap-4 text-sm">
                                                            <div className="flex items-center gap-1.5 text-gray-500">
                                                                <Eye className="h-4 w-4" />
                                                                {formatNumber(topic.views)}
                                                            </div>
                                                            <div className="flex items-center gap-1.5 text-gray-500">
                                                                <MessageCircle className="h-4 w-4" />
                                                                {formatNumber(topic.replies)}
                                                            </div>
                                                            <div className="flex items-center gap-1.5 text-gray-500">
                                                                <Users className="h-4 w-4" />
                                                                {formatNumber(topic.participants)}
                                                            </div>
                                                            <div className="flex items-center gap-1.5 text-gray-500">
                                                                <Clock className="h-4 w-4" />
                                                                {formatTimeAgo(topic.lastActivity)}
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-wrap gap-2 pt-2">
                                                            {topic.tags.map((tag) => (
                                                                <Badge
                                                                    key={tag}
                                                                    variant="secondary"
                                                                    className="bg-purple-50 text-purple-600 hover:bg-purple-100 transition-colors"
                                                                >
                                                                    #{tag}
                                                                </Badge>
                                                            ))}
                                                            {topic.isHot && (
                                                                <Badge className="bg-gradient-to-r from-orange-400 to-pink-500 text-white border-0">
                                                                    🔥 Hot
                                                                </Badge>
                                                            )}
                                                            {topic.isNew && (
                                                                <Badge className="bg-gradient-to-r from-emerald-400 to-teal-500 text-white border-0">
                                                                    ✨ Mới
                                                                </Badge>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </TabsContent>
                            <TabsContent value="new" className="mt-6">
                                {/* Similar content but sorted by date */}
                            </TabsContent>
                            <TabsContent value="hot" className="mt-6">
                                {/* Similar content but filtered for hot topics */}
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </div>
        </div>
    )
}

