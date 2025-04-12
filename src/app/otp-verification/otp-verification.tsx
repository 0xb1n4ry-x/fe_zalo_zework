"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import Cookies from "js-cookie"

const AnimatedButton = motion(Button)

interface OTPVerificationResponse {
    success: boolean
    message?: string
    token?: string
    sessionId?: string
}

export default function OTPVerification() {
    const [otp, setOtp] = useState<string[]>(Array(6).fill(""))
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [verificationSuccess, setVerificationSuccess] = useState(false)
    const [countdown, setCountdown] = useState(60)
    const [canResend, setCanResend] = useState(false)
    const [userEmail, setUserEmail] = useState<string>("")

    const [userData, setUserData] = useState<never>()
    const inputRefs = useRef<(HTMLInputElement | null)[]>([])
    const { toast } = useToast()
    const router = useRouter()

    // Load user data from all possible storage locations
    useEffect(() => {
        // Kiểm tra và lấy dữ liệu người dùng từ tất cả các nguồn có thể
        const loadUserData = () => {
            try {
                console.log("Đang tìm thông tin người dùng trong localStorage và cookies...");

                // Kiểm tra localStorage - có nhiều cách lưu khác nhau
                const userFromLocalStorage = localStorage.getItem("user");
                const userInfoFromLocalStorage = localStorage.getItem("userInfo");

                // Kiểm tra cookies
                const sessionId = Cookies.get("sessionId");
                const authToken = Cookies.get("authToken") || localStorage.getItem("authToken");

                console.log("Session ID từ cookies:", sessionId);
                console.log("Auth Token từ cookies/localStorage:", authToken);

                let email = "";
                let userData = null;

                // Xử lý dữ liệu "user" từ localStorage
                if (userFromLocalStorage) {
                    try {
                        userData = JSON.parse(userFromLocalStorage);
                        console.log("Đã tìm thấy 'user' trong localStorage:", userData);
                        if (userData && userData.email) {
                            email = userData.email;
                            console.log("Email từ 'user':", email);
                        }
                    } catch (e) {
                        console.error("Lỗi parse 'user' từ localStorage:", e);
                    }
                }

                // Xử lý dữ liệu "userInfo" từ localStorage nếu chưa tìm thấy email
                if (!email && userInfoFromLocalStorage) {
                    try {
                        const userInfo = JSON.parse(userInfoFromLocalStorage);
                        console.log("Đã tìm thấy 'userInfo' trong localStorage:", userInfo);
                        if (userInfo && userInfo.email) {
                            email = userInfo.email;
                            if (!userData) userData = userInfo;
                            console.log("Email từ 'userInfo':", email);
                        }
                    } catch (e) {
                        console.error("Lỗi parse 'userInfo' từ localStorage:", e);
                    }
                }

                // Kiểm tra từng key trong localStorage để tìm email
                if (!email) {
                    console.log("Đang quét tất cả các key trong localStorage để tìm email...");

                    // Lưu tất cả key trong localStorage
                    const allKeys = [];
                    for (let i = 0; i < localStorage.length; i++) {
                        const key = localStorage.key(i);
                        if (key) allKeys.push(key);
                    }

                    console.log("Tất cả key trong localStorage:", allKeys);

                    // Duyệt qua từng key để tìm dữ liệu có chứa email
                    for (const key of allKeys) {
                        try {
                            const data = JSON.parse(localStorage.getItem(key) || "");
                            console.log(`Dữ liệu từ key '${key}':`, data);

                            if (data && typeof data === "object") {
                                // Kiểm tra nếu object có thuộc tính email
                                if (data.email && typeof data.email === "string") {
                                    email = data.email;
                                    if (!userData) userData = data;
                                    console.log(`Đã tìm thấy email trong key '${key}':`, email);
                                    break;
                                }

                                // Kiểm tra sâu hơn trong các thuộc tính của object
                                for (const prop in data) {
                                    if (
                                        data[prop] &&
                                        typeof data[prop] === "object" &&
                                        data[prop].email &&
                                        typeof data[prop].email === "string"
                                    ) {
                                        email = data[prop].email;
                                        if (!userData) userData = data[prop];
                                        console.log(`Đã tìm thấy email trong ${key}.${prop}:`, email);
                                        break;
                                    }
                                }

                                if (email) break;
                            }
                            // eslint-disable-next-line @typescript-eslint/no-unused-vars
                        } catch (e) {
                            // Bỏ qua lỗi parse JSON
                        }
                    }
                }

                // Nếu không tìm thấy email trong localStorage, kiểm tra trong URL
                if (!email) {
                    console.log("Không tìm thấy email trong localStorage, kiểm tra URL...");
                    const urlParams = new URLSearchParams(window.location.search);
                    const emailFromUrl = urlParams.get("email");
                    if (emailFromUrl) {
                        email = emailFromUrl;
                        console.log("Email từ URL:", email);
                    }
                }

                if (email) {
                    setUserEmail(email);
                    setUserData(userData);
                    console.log("Đã thiết lập email:", email);

                    // Lưu email vào localStorage để đảm bảo có thể sử dụng sau này
                    if (!localStorage.getItem("userEmail")) {
                        localStorage.setItem("userEmail", email);
                    }

                    return true;
                } else {
                    console.log("Không tìm thấy email trong bất kỳ nguồn nào");
                    return false;
                }
            } catch (error) {
                console.error("Lỗi khi tìm thông tin người dùng:", error);
                return false;
            }
        };

        const userDataFound = loadUserData();

        // Nếu không tìm thấy dữ liệu người dùng, chuyển hướng về trang đăng ký
        if (!userDataFound) {
            toast({
                variant: "destructive",
                title: "Thông tin đăng nhập không hợp lệ",
                description: "Vui lòng đăng ký trước khi xác thực OTP",
            });

            // Chuyển hướng sau một khoảng thời gian ngắn
            setTimeout(() => {
                router.push("/signup");
            }, 2000);
        }
    }, [router, toast]);

    // Set up countdown timer
    useEffect(() => {
        if (countdown > 0 && !canResend) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
            return () => clearTimeout(timer)
        } else if (countdown === 0 && !canResend) {
            setCanResend(true)
        }
    }, [countdown, canResend])

    // Handle OTP input change
    const handleChange = (index: number, value: string) => {
        // Only allow numbers
        if (!/^\d*$/.test(value)) return

        const newOtp = [...otp]
        // Take only the last character if multiple characters are pasted
        newOtp[index] = value.slice(-1)
        setOtp(newOtp)

        // Move to next input if current input is filled
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus()
        }
    }

    // Handle key down events for backspace and arrow navigation
    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            // Move to previous input on backspace if current input is empty
            inputRefs.current[index - 1]?.focus()
        } else if (e.key === "ArrowLeft" && index > 0) {
            // Move to previous input on left arrow
            inputRefs.current[index - 1]?.focus()
        } else if (e.key === "ArrowRight" && index < 5) {
            // Move to next input on right arrow
            inputRefs.current[index + 1]?.focus()
        }
    }

    // Handle paste event to distribute characters across inputs
    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault()
        const pastedData = e.clipboardData.getData("text/plain").trim()

        // Check if pasted content is all digits and not longer than the number of inputs
        if (!/^\d+$/.test(pastedData) || pastedData.length > 6) return

        const newOtp = [...otp]

        // Fill in the OTP fields with the pasted digits
        for (let i = 0; i < Math.min(pastedData.length, 6); i++) {
            newOtp[i] = pastedData[i]
        }

        setOtp(newOtp)

        // Focus the next empty input or the last input if all are filled
        const nextIndex = Math.min(pastedData.length, 5)
        inputRefs.current[nextIndex]?.focus()
    }

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        // Check if OTP is complete
        if (otp.some((digit) => digit === "")) {
            setError("Vui lòng nhập đầy đủ mã OTP")
            return
        }

        // Check if we have user email
        if (!userEmail) {
            setError("Không tìm thấy thông tin email, vui lòng đăng ký lại")
            return
        }

        setError(null)
        setIsLoading(true)

        try {
            // Log to verify what data we're sending
            console.log("Gửi yêu cầu xác thực OTP với:", {
                otp: otp.join(""),
                email: userEmail
            });

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}api/verify-otp`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    otp: otp.join(""),
                    email: userEmail, // Use email from state
                }),
            })

            const data: OTPVerificationResponse = await response.json()
            console.log("Phản hồi từ server:", data);

            if (!response.ok || !data.success) {
                throw new Error(data.message || "Xác thực OTP thất bại")
            }

            // Update session data if provided
            if (data.token) {
                localStorage.setItem("authToken", data.token)
                Cookies.set("authToken", data.token, { expires: 7 })
            }

            if (data.sessionId) {
                Cookies.set("sessionId", data.sessionId, { expires: 7 })
            }

            // Verification successful
            setVerificationSuccess(true)

            toast({
                title: "Xác thực thành công",
                description: "Tài khoản của bạn đã được xác thực thành công!",
            })

            // Redirect after successful verification
            setTimeout(() => {
                router.push("/login")
            }, 1500)
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Đã xảy ra lỗi, vui lòng thử lại"
            setError(errorMessage)
            toast({
                variant: "destructive",
                title: "Xác thực thất bại",
                description: errorMessage,
            })
        } finally {
            setIsLoading(false)
        }
    }

    // Handle resend OTP
    const handleResendOTP = async () => {
        if (!canResend) return

        if (!userEmail) {
            setError("Không tìm thấy thông tin email, vui lòng đăng ký lại")
            return
        }

        setIsLoading(true)

        try {
            console.log("Gửi yêu cầu gửi lại OTP với email:", userEmail);

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}api/resend-otp`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ email: userEmail }), // Use email from state
            })

            const data = await response.json()
            console.log("Phản hồi từ server khi gửi lại OTP:", data);

            if (!response.ok || !data.success) {
                throw new Error(data.message || "Gửi lại OTP thất bại")
            }

            // Reset countdown and disable resend button
            setCountdown(60)
            setCanResend(false)

            toast({
                title: "Đã gửi lại mã OTP",
                description: "Vui lòng kiểm tra email hoặc tin nhắn của bạn",
            })
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Đã xảy ra lỗi, vui lòng thử lại"
            toast({
                variant: "destructive",
                title: "Gửi lại OTP thất bại",
                description: errorMessage,
            })
        } finally {
            setIsLoading(false)
        }
    }

    if (verificationSuccess) {
        return (
            <motion.div
                className="py-8 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 10 }}
                    className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100"
                >
                    <svg
                        className="h-8 w-8 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </motion.div>
                <h3 className="mb-2 text-xl font-semibold">Xác thực thành công!</h3>
                <p className="text-muted-foreground">Đang chuyển hướng đến trang chủ...</p>
            </motion.div>
        )
    }


    return (
        <div className="w-full max-w-md mx-auto p-6 space-y-8">
            <motion.div
                className="text-center space-y-2"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="text-2xl font-bold">Xác thực OTP</h1>
                <p className="text-muted-foreground">
                    Vui lòng nhập mã xác thực đã được gửi đến email của bạn
                </p>
                {userEmail && (
                    <p className="text-sm font-medium text-blue-600">
                        {userEmail.length > 5
                            ? `${userEmail.substring(0, 3)}***${userEmail.substring(userEmail.indexOf('@'))}`
                            : userEmail}
                    </p>
                )}
            </motion.div>

            <motion.form
                onSubmit={handleSubmit}
                className="space-y-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <div className="flex justify-center gap-2">
                    {otp.map((digit, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.1 * index }}
                        >
                            <Input
                                ref={(el) => {
                                    inputRefs.current[index] = el;
                                }}
                                type="text"
                                inputMode="numeric"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                onPaste={index === 0 ? handlePaste : undefined}
                                className={`w-12 h-12 text-center text-xl font-bold ${
                                    error && digit === "" ? "border-red-500 focus-visible:ring-red-500" : ""
                                }`}
                            />
                        </motion.div>
                    ))}
                </div>

                {error && (
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-red-500 text-center">
                        {error}
                    </motion.p>
                )}

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                >
                    <AnimatedButton
                        type="submit"
                        className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Đang xác thực...
                            </>
                        ) : (
                            "Xác thực"
                        )}
                    </AnimatedButton>
                </motion.div>

                <motion.div
                    className="text-center space-y-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                >
                    <p className="text-sm text-muted-foreground">
                        Không nhận được mã?{" "}
                        <button
                            type="button"
                            onClick={handleResendOTP}
                            disabled={!canResend || isLoading}
                            className={`font-medium ${
                                canResend && !isLoading
                                    ? "text-blue-600 hover:text-blue-500 cursor-pointer"
                                    : "text-gray-400 cursor-not-allowed"
                            }`}
                        >
                            {canResend ? "Gửi lại mã" : `Gửi lại sau (${countdown}s)`}
                        </button>
                    </p>
                </motion.div>
            </motion.form>

            {/* Debug panel - Có thể xóa trong môi trường production */}
            {process.env.NODE_ENV !== "production" && (
                <div className="mt-8 p-4 bg-gray-100 rounded-md text-xs">
                    <h4 className="font-bold mb-2">Debug Info:</h4>
                    <p>Email: {userEmail || "Không tìm thấy"}</p>
                    <p>Session ID: {Cookies.get("sessionId") || "Không tìm thấy"}</p>
                    <p>Auth Token: {(Cookies.get("authToken") || localStorage.getItem("authToken")) ? "Tồn tại" : "Không tìm thấy"}</p>
                    <p>User Data: {userData ? "Tồn tại" : "Không tìm thấy"}</p>
                    <button
                        onClick={() => console.log("User Data:", userData)}
                        className="mt-2 text-blue-600 hover:underline"
                    >
                        Log User Data
                    </button>
                </div>
            )}
        </div>
    )
}