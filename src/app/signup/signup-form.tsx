"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { Facebook, Mail, Loader2, User, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { useToast } from "@/hooks/use-toast"
import Cookies from "js-cookie"

interface SignupResponse {
    success: boolean
    message?: string
    user?: {
        email: string
        name: string
        phone: string
        ip?: string
    }
    token?: string
    sessionId?: string
}

const AnimatedButton = motion(Button)

// Define the form schema with validation
const formSchema = z.object({
    name: z.string().min(2, "Tên phải có ít nhất 2 ký tự"),
    email: z.string().email("Email không hợp lệ"),
    phone: z.string().regex(/^[0-9]{9,12}$/, "Số điện thoại không hợp lệ"),
})

type FormValues = z.infer<typeof formSchema>

interface SocialButtonProps {
    provider: string
    icon: React.ReactNode
    variant: "default" | "destructive" | "outline" | "secondary" | "ghost"
    className?: string
}

const SocialButton = ({ provider, icon, variant, className }: SocialButtonProps) => {
    return (
        <AnimatedButton variant={variant} className={className} type="button">
            {icon} {provider}
        </AnimatedButton>
    )
}

export default function SignupForm() {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [signupSuccess, setSignupSuccess] = useState<boolean>(false)
    const [userIP, setUserIP] = useState<string>("")
    const router = useRouter()
    const { toast } = useToast()

    // Lấy IP từ dịch vụ bên ngoài khi component được khởi tạo
    useEffect(() => {
        const getIP = async () => {
            try {
                // Sử dụng ipify API để lấy IP - API này không yêu cầu key
                const response = await fetch('https://api.ipify.org?format=json');
                const data = await response.json();
                setUserIP(data.ip);
                // Lưu IP vào localStorage để sử dụng sau này nếu cần
                localStorage.setItem('userIP', data.ip);
            } catch (error) {
                console.error("Không thể lấy địa chỉ IP:", error);
                setUserIP("unknown");
            }
        };

        getIP();
    }, []);

    // Initialize form with react-hook-form and zod validation
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
        },
        mode: "onChange", // Validate on change for immediate feedback
    })

    const handleSubmit = async (values: FormValues) => {
        setError(null)
        setIsLoading(true)

        try {
            // Thêm IP vào dữ liệu gửi đi
            const submitData = {
                ...values,
                ip: userIP,
                clientTime: Date.now(),
                browser: navigator.userAgent
            };

            console.log("Dữ liệu đăng ký:", submitData);

            const response = await fetch(`${process.env.API_URL || ''}api/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include", // Include cookies if using session-based auth
                body: JSON.stringify(submitData),
            })

            const data: SignupResponse = await response.json()
            console.log("Phản hồi từ server:", data);

            if (!response.ok || !data.success) {
                throw new Error(data.message || "Đăng ký thất bại")
            }

            // Lưu thông tin chi tiết vào localStorage
            const userInfo = {
                name: values.name,
                email: values.email,
                phone: values.phone,
                ip: userIP,
                registerTime: new Date().toISOString(),
            };
            localStorage.setItem("userInfo", JSON.stringify(userInfo));

            // Store session data
            if (data.token) {
                // If using JWT, store in localStorage or cookies
                localStorage.setItem("authToken", data.token)
                // Also set as a cookie for server-side access
                Cookies.set("authToken", data.token, { expires: 7 }) // Expires in 7 days
            }

            if (data.sessionId) {
                // If using session ID, store in cookies
                Cookies.set("sessionId", data.sessionId, { expires: 7 })
            }

            // Store user data in localStorage for easy access
            if (data.user) {
                localStorage.setItem("user", JSON.stringify(data.user))
            }

            // Set signup success state
            setSignupSuccess(true)

            // Kiểm tra xem dữ liệu đã được lưu chính xác chưa
            console.log("Dữ liệu đã lưu trong localStorage:", {
                userInfo: JSON.parse(localStorage.getItem("userInfo") || "{}"),
                user: JSON.parse(localStorage.getItem("user") || "{}"),
                authToken: localStorage.getItem("authToken"),
                cookieToken: Cookies.get("authToken"),
                sessionId: Cookies.get("sessionId")
            });

            // Simulate redirect after successful signup
            setTimeout(() => {
                router.push("/otp-verification")
            }, 1500)
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Đã xảy ra lỗi, vui lòng thử lại"
            setError(errorMessage)
            toast({
                variant: "destructive",
                title: "Đăng ký thất bại",
                description: errorMessage,
            })
            setIsLoading(false)
        }
    }

    if (signupSuccess) {
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
                <h3 className="mb-2 text-xl font-semibold">Đăng ký thành công!</h3>
                <p className="text-muted-foreground">Đang chuyển hướng đến trang xác thực OTP...</p>

                {/* Hiển thị thông tin đã lưu để kiểm tra */}
                <div className="mt-4 text-left text-sm bg-gray-50 p-4 rounded">
                    <h4 className="font-medium mb-2">Thông tin đã lưu:</h4>
                    <p>Tên: {form.getValues().name}</p>
                    <p>Email: {form.getValues().email}</p>
                    <p>SĐT: {form.getValues().phone}</p>
                    <p>IP: {userIP}</p>
                </div>
            </motion.div>
        )
    }

    return (
        <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1, duration: 0.5 }}
                    >
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field, fieldState }) => (
                                <FormItem>
                                    <FormControl>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                                <User className="h-5 w-5 text-blue-500" />
                                            </div>
                                            <Input
                                                placeholder="Nguyễn Ngọc Anh"
                                                className={`pl-10 ${fieldState.invalid ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                                                {...field}
                                            />
                                        </div>
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                    >
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field, fieldState }) => (
                                <FormItem>
                                    <FormControl>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                                <Mail className="h-5 w-5 text-blue-500" />
                                            </div>
                                            <Input
                                                placeholder="a@vn.news"
                                                className={`pl-10 ${fieldState.invalid ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                                                {...field}
                                            />
                                        </div>
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                    >
                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field, fieldState }) => (
                                <FormItem>
                                    <FormControl>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                                <Phone className="h-5 w-5 text-blue-500" />
                                            </div>
                                            <Input
                                                placeholder="84123456789"
                                                className={`pl-10 ${fieldState.invalid ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                                                {...field}
                                            />
                                        </div>
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </motion.div>

                    {/* Hiển thị IP nếu đã lấy được */}
                    {userIP && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-xs text-gray-500"
                        >
                            IP của bạn: {userIP}
                        </motion.div>
                    )}

                    {error && (
                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-red-500">
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
                            className="w-full h-14 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Đang đăng ký...
                                </>
                            ) : (
                                "Đăng ký"
                            )}
                        </AnimatedButton>
                    </motion.div>
                </form>
            </Form>

            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">Hoặc đăng ký với</span>
                </div>
            </div>

            <motion.div
                className="flex space-x-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
            >
                <SocialButton
                    provider="Facebook"
                    icon={<Facebook className="mr-2 h-4 w-4" />}
                    variant="outline"
                    className="w-full h-12"
                />
                <SocialButton
                    provider="Google"
                    icon={<Mail className="mr-2 h-4 w-4" />}
                    variant="outline"
                    className="w-full h-12"
                />
            </motion.div>

            <motion.div
                className="text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
            >
                <p className="text-sm text-muted-foreground">
                    Bạn đã có tài khoản?{" "}
                    <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">
                        Đăng nhập
                    </Link>
                </p>
            </motion.div>
        </motion.div>
    )
}