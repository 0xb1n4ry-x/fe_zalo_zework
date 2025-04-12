"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { LogOut, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import Cookies from "js-cookie"
type ButtonVariant = "default" | "link" | "secondary" | "destructive" | "outline" | "ghost";
type ButtonSize = "default" | "sm" | "lg" | "icon"
export default function LogoutButton({ variant = "default", size = "default", className = "", showIcon = true }) {
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const { toast } = useToast()

    const handleLogout = async () => {
        setIsLoading(true)

        try {
            // Lấy thông tin token và sessionId từ localStorage hoặc cookies
            const token = localStorage.getItem("authToken") || Cookies.get("authToken")
            const sessionId = Cookies.get("sessionId")

            console.log("Đăng xuất với:", { token, sessionId })

            // Gọi API đăng xuất để vô hiệu hóa session từ server
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}api/logout`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    token,
                    sessionId
                }),
            })

             await response.json()

            // Vẫn tiếp tục xóa cache ngay cả khi API trả về lỗi
            // để đảm bảo người dùng luôn có thể đăng xuất

            // Xóa tất cả dữ liệu người dùng khỏi localStorage
            clearLocalStorage()

            // Xóa tất cả cookies liên quan đến xác thực
            clearAuthCookies()

            // Thông báo thành công
            toast({
                title: "Đăng xuất thành công",
                description: "Bạn đã đăng xuất khỏi tài khoản",
            })

            // Chuyển hướng về trang đăng nhập
            setTimeout(() => {
                router.push("/login")
                // Refresh trang để đảm bảo tất cả state được reset
                router.refresh()
            }, 500)
        } catch (error) {
            console.error("Lỗi đăng xuất:", error)

            // Ngay cả khi có lỗi, vẫn xóa dữ liệu cục bộ
            clearLocalStorage()
            clearAuthCookies()

            toast({
                variant: "destructive",
                title: "Đã xảy ra lỗi",
                description: "Đã có lỗi khi đăng xuất, vui lòng thử lại",
            })

            // Vẫn chuyển hướng về trang đăng nhập
            setTimeout(() => {
                router.push("/login")
                router.refresh()
            }, 500)
        } finally {
            setIsLoading(false)
        }
    }

    // Hàm xóa tất cả dữ liệu trong localStorage
    const clearLocalStorage = () => {
        console.log("Xóa tất cả dữ liệu trong localStorage")

        // Xóa các key cụ thể liên quan đến xác thực
        const keysToRemove = [
            "user",
            "userInfo",
            "userEmail",
            "authToken",
            "userData",
            "userProfile"
        ]

        // Xóa từng key
        keysToRemove.forEach(key => {
            localStorage.removeItem(key)
        })

        // Tùy chọn: xóa tất cả localStorage nếu bạn muốn đảm bảo xóa hoàn toàn
        // localStorage.clear()
    }

    // Hàm xóa tất cả cookies liên quan đến xác thực
    const clearAuthCookies = () => {
        console.log("Xóa tất cả cookies liên quan đến xác thực")

        // Xóa các cookies cụ thể
        const cookiesToRemove = [
            "authToken",
            "sessionId",
            "refreshToken",
            "user_session"
        ]

        // Xóa từng cookie
        cookiesToRemove.forEach(cookie => {
            Cookies.remove(cookie)
        })
    }


    return (
        <Button

            variant={variant as ButtonVariant}

            size={size as ButtonSize}

            className={className}
            onClick={handleLogout}
            disabled={isLoading}
        >
            {isLoading ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ...
                </>
            ) : (
                <>
                    {showIcon && <LogOut className="mr-2 h-4 w-4" />}

                </>
            )}
        </Button>
    )
}