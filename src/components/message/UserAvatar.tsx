"use client"

import {useState} from "react"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip"

interface UserAvatarProps {
    avatar: string
    displayName: string
    isActive: number
    lastActionTime: number
}

function formatLastOnline(lastActionTime: number): string {
    const now = Date.now()
    const diffInSeconds = Math.floor((now - lastActionTime) / 1000)

    if (diffInSeconds < 60) return "Just now"
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`
    return `${Math.floor(diffInSeconds / 86400)}d ago`
}

export function UserAvatar({ avatar, displayName, isActive, lastActionTime }: UserAvatarProps) {
    const [showTooltip, setShowTooltip] = useState(false)
    const lastOnline = formatLastOnline(lastActionTime)

    return (
        <TooltipProvider>
            <Tooltip open={showTooltip && isActive !== 1}>
                <TooltipTrigger asChild>
                    <div className="relative">
                        <Avatar className="h-10 w-10">
                            <AvatarImage src={avatar} alt={displayName} />
                            <AvatarFallback className="bg-gray-600 text-white">{displayName}</AvatarFallback>
                        </Avatar>
                        {isActive === 1 ? (
                            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white" />
                        ) : (
                            <div
                                className="absolute bottom-0 right-0 h-5 w-5 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-[8px] font-medium text-gray-600 cursor-pointer"
                                onMouseEnter={() => setShowTooltip(true)}
                                onMouseLeave={() => setShowTooltip(false)}
                            >
                                {lastOnline.split(" ")[0]}
                            </div>
                        )}
                    </div>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                    <p>Hoạt động  {lastOnline} phút trước!</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

