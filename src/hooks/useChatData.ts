"use client"

import { useState, useEffect } from "react"
import type { User } from "@/types/user"

interface Message {
    id: string
    content: string
    sender: "user" | "other"
    timestamp: string
}
type FUIDResponse = {
    message: {
        data: {
            changed_profiles: Record<string, User>
        }
    }
}
async function fetchUserProfile(id: string): Promise<FUIDResponse> {
    if (typeof window === 'undefined' || !window.localStorage) {
        throw new Error("localStorage is not available");
    }

    const rawData = localStorage.getItem('dataZalo') || '[]';

    let ld;
    try {
        ld = JSON.parse(rawData);
    } catch (e) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        throw new Error("Invalid data in localStorage", e);
    }

    if (!Array.isArray(ld) || ld.length === 0) {
        throw new Error("No authentication data found");
    }

    const s = ld[0].zpw_sek;
    const e = ld[0].zpw_enk;
    const i = ld[0].imei;
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/fuid`, {
        method: "GET",
        headers: {'Content-Type': 'application/json'}, body:JSON.stringify({id, i, e, s})
    })
    if (!response.ok) {
        throw new Error("Failed to fetch user profile")
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

                    if (err instanceof Error) {
                        setError(`Failed to load chat data: ${err.message}`);
                    } else {
                        setError("Failed to load chat data: Unknown error");
                    }

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

