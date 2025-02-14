"use client"

import { useState, useEffect } from "react"
import type { User } from "@/types/user"

interface Message {
    id: string
    content: string
    sender: "user" | "other"
    timestamp: string
}

async function fetchUserProfile(userId: string): Promise<User> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/fuid?id=${userId}`)
    if (!response.ok) {
        throw new Error("Failed to fetch user profile")
    }
    return response.json()
}

async function fetchChatMessages(userId: string): Promise<Message[]> {
    const response = await fetch(`/api/fuid?id=${userId}`)
    if (!response.ok) {
        throw new Error("Failed to fetch chat messages")
    }
    return response.json()
}

export function useChatData(selectedUserId: string | null) {
    const [messages, setMessages] = useState<Message[]>([])
    const [userProfile, setUserProfile] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function fetchData() {
            if (selectedUserId) {
                setIsLoading(true)
                setError(null)
                try {
                    const [profile] = await Promise.all([
                        fetchUserProfile(selectedUserId),
                        // fetchChatMessages(selectedUserId),
                    ])
                    setUserProfile(profile.message?.data?.changed_profiles?.[selectedUserId])
                    // setMessages(chatMessages)
                } catch (err) {
                    setError("Failed to load chat data")
                } finally {
                    setIsLoading(false)
                }
            } else {
                setUserProfile(null)
                setMessages([])
            }
        }
        fetchData()
    }, [selectedUserId])

    return { userProfile, isLoading, error }
}

