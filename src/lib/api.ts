import type {QRCodeData, UserData, zaloAccount} from '@/types'
import axios from 'axios'
import {Key} from "react";

export async function generateQRCode(): Promise<QRCodeData> {

    const response = await fetch(`${process.env.API_URL}api/get-qr`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    return response.json()
}


export type ScanStatusResponse = {
    status: 'waiting' | 'scanned' | 'scanned-confirm' | 'expired';
    [key: string]: any; // nếu response có thêm dữ liệu
}

export async function checkScanStatus(sessionId: string | undefined):Promise<ScanStatusResponse> {
    const response = await fetch(`${process.env.API_URL}api/waiting-scan`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sessionId }),
    })
    return response.json()
}
export type ConfirmLoginResponse = {
    success: boolean;
    message?: string;
    userData?: any; // tuỳ vào backend trả gì
}
export async function confirmLogin(sessionId: string | undefined, userId: string | undefined): Promise<ConfirmLoginResponse> {
    const response = await fetch(`${process.env.API_URL}api/waiting-confirm`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sessionId, userId }),
    })
    console.log(userId)
    return response.json()
}

export async function checkExistingUser(): Promise<UserData | null> {
    try {
        const response = await fetch(`${process.env.API_URL}api/get-user`, {
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
        const response = await fetch(`${process.env.API_URL}api/fnb?${queryString}`, {
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
    lastActionTime(lastActionTime: never): import("react").ReactNode
    displayName: never
    id: string
    name: string
    lastMessage: string
    time: string
    avatar: string
}



// In your lib/api.ts or similar file
export const fetchWithRetry = async (url: string, options: RequestInit, maxRetries = 3): Promise<never> => {
    let retries = 0;
    let lastError;

    while (retries < maxRetries) {
        try {
            // Add a small delay that increases with each retry attempt
            if (retries > 0) {
                // Exponential backoff: 1s, 2s, 4s, etc.
                const delay = 1000 * Math.pow(2, retries - 1);
                await new Promise(resolve => setTimeout(resolve, delay));
            }

            const response = await fetch(url, options);

            // Handle rate limiting specifically
            if (response.status === 429) {
                // Check if the server provides a Retry-After header
                const retryAfter = response.headers.get('Retry-After');
                let waitTime = 5000; // Default 5 seconds

                if (retryAfter) {
                    // Retry-After can be in seconds or a HTTP date
                    waitTime = isNaN(Number(retryAfter))
                        ? new Date(retryAfter).getTime() - Date.now()
                        : Number(retryAfter) * 1000;
                }

                console.log(`Rate limited. Waiting ${waitTime}ms before retrying...`);
                await new Promise(resolve => setTimeout(resolve, waitTime));
                retries++;
                continue;
            }

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            // @ts-ignore
            return await response.json();
        } catch (error) {
            lastError = error;
            if (axios.isAxiosError(error) && error.response?.status === 429) {
                // If using axios and hit rate limit, retry with backoff
                retries++;
                continue;
            }
            // For other errors, immediately throw
            if (retries === maxRetries - 1) {
                throw error; // Only throw on the last retry
            }
            retries++;
        }
    }

    throw lastError;
};
interface ApiResponse<T> {
    success: boolean;
    data: T;
}
export const fetchChats = async () => {
    try {
        // Add localStorage error handling as we discussed earlier
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

        // Use our improved fetchWithRetry function
        const response: ApiResponse<{data : any[]}> = await fetchWithRetry(`${process.env.API_URL}api/gc`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({i, e, s})
        }, 3); // Allow up to 3 retries


        if (response.success && Array.isArray(response.data.data)) {
            return localStorage.setItem("cachedContacts", JSON.stringify(response.data.data));
        } else {
            throw new Error("Invalid data format received from API");
        }

    } catch (error) {
        console.error("Error fetching chats:", error);

        if (axios.isAxiosError(error)) {
            if (error.response?.status === 429) {
                // Store the time of the rate limit in localStorage
                localStorage.setItem('chatRateLimitTime', Date.now().toString());
                throw new Error("Rate limit reached. Please try again later.");
            }
            throw new Error(`Failed to fetch chats: ${error.message}`);
        } else {
            throw new Error("An unexpected error occurred while fetching chats");
        }
    }
};

export const fetchGroupsChat = async () => {
    try {
        // Add localStorage error handling as we discussed earlier


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

        // Use our improved fetchWithRetry function

        const responseGroups : ApiResponse<{data : any[]}> = await fetchWithRetry(`${process.env.API_URL}api/gag`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({i, e, s})
        }, 3);
        console.log(JSON.stringify(responseGroups.data))
        if (responseGroups.success && Array.isArray(responseGroups.data)) {
            return localStorage.setItem("cachedGroups", JSON.stringify(responseGroups.data));
        } else {
            throw new Error("Invalid data format received from API");
        }
    } catch (error) {
        console.error("Error fetching chats:", error);

        if (axios.isAxiosError(error)) {
            if (error.response?.status === 429) {
                // Store the time of the rate limit in localStorage
                localStorage.setItem('chatRateLimitTime', Date.now().toString());
                throw new Error("Rate limit reached. Please try again later.");
            }
            throw new Error(`Failed to fetch chats: ${error.message}`);
        } else {
            throw new Error("An unexpected error occurred while fetching chats");
        }
    }
};
export async function getZaloAccounts(userId: string): Promise<zaloAccount[]> {
    try {
        const response = await fetch(`${process.env.API_URL}/api/get-accounts-zalo`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId }),
        });

        if (!response.ok) {
            throw new Error(`API responded with status: ${response.status}`);
        }

        const data = await response.json();
        return data.accounts || [];
    }
    catch (error) {
        console.error('Error fetching Zalo accounts data from backend:', error);
        return []; // Return empty array on error
    }
}


