import type { QRCodeData, UserData } from '../types'
import axios from 'axios'

export async function generateQRCode(): Promise<QRCodeData> {

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/get-qr`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    return response.json()
}


export async function checkScanStatus(sessionId: string) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/waiting-scan`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sessionId }),
    })
    return response.json()
}

export async function confirmLogin(sessionId: string) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/waiting-confirm`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sessionId }),
    })
    return response.json()
}

export async function checkExistingUser(): Promise<UserData | null> {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/get-user`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const data = await response.json()
        return data.success && data.userData ? data.userData : null
    } catch (error) {
        console.error('Error fetching user data:', error)
        return null
    }
}
export async function findInfoByPN(p:string): Promise<void> {
    try {
        const queryString = new URLSearchParams({ p }).toString();
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/fnb?${queryString}`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},

        });

        const result = await response.json();
        console.log('Response from backend:', result);
    } catch (error) {
        console.error('Error fetching user data from backend:', error)
    }
}

export interface Chat {
    userId: Key | null | undefined
    lastActionTime(lastActionTime: any): import("react").ReactNode
    displayName: any
    id: string
    name: string
    lastMessage: string
    time: string
    avatar: string
}
interface ApiResponse {
    success: boolean
    data: {
        error_code: number
        error_message: string
        data: Chat[]
    }
}

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
})

const retryDelay = (retryNumber: number) => Math.pow(2, retryNumber) * 1000

const fetchWithRetry = async (url: string, params: object = {}, retries = 3): Promise<ApiResponse> => {
    try {
        const response = await axiosInstance.post<ApiResponse>(url, { params })
        return response.data
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 429 && retries > 0) {
            await new Promise((resolve) => setTimeout(resolve, retryDelay(3 - retries)))
            return fetchWithRetry(url, params, retries - 1)
        }
        throw error
    }
}

export const fetchChats = async (): Promise<Chat[]> => {
    try {
        const response = await fetchWithRetry("api/gc")
        if (response.success && Array.isArray(response.data.data)) {
            return response.data.data
        } else {
            throw new Error("Invalid data format received from API")
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response?.status === 429) {
                throw new Error("Too many requests. Please try again later.")
            }
            throw new Error(`Failed to fetch chats: ${error.message}`)
        } else {
            throw new Error("An unexpected error occurred while fetching chats")
        }
    }
}

export const searchChats = async (query: string): Promise<Chat[]> => {
    try {
        const response = await fetchWithRetry("/chats/search", { q: query })
        if (response.success && Array.isArray(response.data.data)) {
            return response.data.data
        } else {
            throw new Error("Invalid data format received from API")
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response?.status === 429) {
                throw new Error("Too many requests. Please try again later.")
            }
            throw new Error(`Failed to search chats: ${error.message}`)
        } else {
            throw new Error("An unexpected error occurred while searching chats")
        }
    }
}


