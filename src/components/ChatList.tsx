"use client"

import React, { useState } from "react"
import { Search } from "lucide-react"
import { useQuery } from "@tanstack/react-query"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { fetchChats, searchChats, type Chat } from "@/lib/api"
import {UserAvatar} from "@/components/UserAvatar";

interface ChatListProps {
    onUserSelect: (userId: string) => void
}
function formatLastOnline(lastActionTime: number): string {
    const now = Date.now()
    const diffInSeconds = Math.floor((now - lastActionTime) / 1000)

    if (diffInSeconds < 60) return "Just now"
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`
    return `${Math.floor(diffInSeconds / 86400)}d ago`
}

const ChatList: React.FC<ChatListProps> = ({onUserSelect}) => {
    const [searchQuery, setSearchQuery] = useState("")
    const [showTooltip, setShowTooltip] = useState(false)
    const { data, isLoading, isError } = useQuery<Chat[]>({
        queryKey: ["chats", searchQuery],
        queryFn: () => (searchQuery ? searchChats(searchQuery) : fetchChats()),
        refetchOnWindowFocus: false,
    })

    const chats = Array.isArray(data) ? data : []


    const formatLastActive = (timestamp: number) => {
        const date = new Date(timestamp)
        return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}, ${date.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        })}`
    }
    const lastOnline = formatLastOnline(chats.lastActionTime)
    return (
        <div className="flex flex-col h-screen bg-white w-[300px] border-r border-gray-200">
            <div className="p-4">
                <h2 className="text-xl font-semibold mb-4">Danh bạ</h2>
                <div className="relative mb-4">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    <Input
                        type="search"
                        placeholder="Tìm Kiếm"
                        className="w-full pl-9 bg-[#2a2a2a] border-gray-700 text-white placeholder:text-gray-400 focus:ring-0 focus:border-gray-600"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            {isLoading ? (
                <div className="text-center p-4 text-gray-400">Đang Tải...</div>
            ) : isError ? (
                <div className="text-center p-4 text-red-400">Lỗi</div>
            ) : (
                <div className="flex-1 overflow-y-auto">
                    <ul>
                    {chats.map((chat) => (

                            <li
                                      key={chat.userId}
                                      className="w-full text-left px-4 py-3 hover:bg-gray-50 hover:border-l-4 hover:border-blue-500 transition-all duration-200 flex items-center gap-3"
                                      onClick={() => onUserSelect(chat.userId)
                                          }
                                >
                                <UserAvatar
                                    avatar={chat.avatar}
                                    displayName={chat.displayName}
                                    isActive={chat.isActive}
                                    lastActionTime={chat.lastActionTime}
                                />
                                <div>
                                    <h3 className="text-sm font-medium">{chat.displayName}</h3>
                                    <p className="text-xs text-gray-400 truncate">Last active: {formatLastActive(chat.lastActionTime)}</p>
                                </div>

                            </li>



                    ))}   </ul>
                </div>
            )}

            <div className="p-4 border-t border-gray-300">
                <Button className="w-full bg-[#2a2a2a] hover:bg-[#3a3a3a] text-white border-none"> Tìm Kiếm Qua Số Điện Thoại</Button>
            </div>
        </div>
    )
}

export default ChatList