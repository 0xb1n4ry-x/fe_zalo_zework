"use client"

import React, {useRef} from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Mail, Loader2, User, Lock, Facebook } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import Cookies from "js-cookie"

interface LoginResponse {
    isVerified: undefined;
    email: boolean;
    success: boolean
    message?: string
    user?: {
        id: string
        email: string
        name: string
        phone?: string
        isVerified?: boolean
    }
    token?: string
    sessionId?: string
}

const AnimatedButton = motion(Button)

// Define the form schema with validation
const formSchema = z.object({
    email: z.string().email("Email không hợp lệ"),
    password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
    rememberMe: z.boolean().default(false),
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

function stringToBytes(str: string) {
    const bytes = [];
    for (let i = 0; i < str.length; i++) {
        const charCode = str.charCodeAt(i);
        if (charCode < 0x80) {
            bytes.push(charCode);
        } else if (charCode < 0x800) {
            bytes.push(0xc0 | (charCode >> 6),
                0x80 | (charCode & 0x3f));
        } else if (charCode < 0xd800 || charCode >= 0xe000) {
            bytes.push(0xe0 | (charCode >> 12),
                0x80 | ((charCode >> 6) & 0x3f),
                0x80 | (charCode & 0x3f));
        } else {
            // Handle surrogate pairs
            i++;
            const nextCode = str.charCodeAt(i);
            const codePoint = 0x10000 + (((charCode & 0x3ff) << 10) | (nextCode & 0x3ff));
            bytes.push(0xf0 | (codePoint >> 18),
                0x80 | ((codePoint >> 12) & 0x3f),
                0x80 | ((codePoint >> 6) & 0x3f),
                0x80 | (codePoint & 0x3f));
        }
    }
    return bytes;
}

// Updated MD5 implementation that handles UTF-8 input
function MD5(input: string) {
    // Convert input to bytes if it's a string
    const bytes = stringToBytes(input);

    // Initialize variables
    let a = 0x67452301;
    let b = 0xefcdab89;
    let c = 0x98badcfe;
    let d = 0x10325476;

    // Pre-computed constants
    const k = new Int32Array([
        0xd76aa478, 0xe8c7b756, 0x242070db, 0xc1bdceee,
        0xf57c0faf, 0x4787c62a, 0xa8304613, 0xfd469501,
        0x698098d8, 0x8b44f7af, 0xffff5bb1, 0x895cd7be,
        0x6b901122, 0xfd987193, 0xa679438e, 0x49b40821,
        0xf61e2562, 0xc040b340, 0x265e5a51, 0xe9b6c7aa,
        0xd62f105d, 0x02441453, 0xd8a1e681, 0xe7d3fbc8,
        0x21e1cde6, 0xc33707d6, 0xf4d50d87, 0x455a14ed,
        0xa9e3e905, 0xfcefa3f8, 0x676f02d9, 0x8d2a4c8a,
        0xfffa3942, 0x8771f681, 0x6d9d6122, 0xfde5380c,
        0xa4beea44, 0x4bdecfa9, 0xf6bb4b60, 0xbebfbc70,
        0x289b7ec6, 0xeaa127fa, 0xd4ef3085, 0x04881d05,
        0xd9d4d039, 0xe6db99e5, 0x1fa27cf8, 0xc4ac5665,
        0xf4292244, 0x432aff97, 0xab9423a7, 0xfc93a039,
        0x655b59c3, 0x8f0ccc92, 0xffeff47d, 0x85845dd1,
        0x6fa87e4f, 0xfe2ce6e0, 0xa3014314, 0x4e0811a1,
        0xf7537e82, 0xbd3af235, 0x2ad7d2bb, 0xeb86d391
    ]);

    // Process each 512-bit chunk
    for (let i = 0; i < bytes.length; i += 64) {
        const chunk = new Int32Array(16);

        // Convert bytes to 32-bit words
        for (let j = 0; j < 16; j++) {
            chunk[j] = bytes[i + j*4] |
                (bytes[i + j*4 + 1] << 8) |
                (bytes[i + j*4 + 2] << 16) |
                (bytes[i + j*4 + 3] << 24);
        }

        // Store initial values
        const aa = a;
        const bb = b;
        const cc = c;
        const dd = d;

        // Main loop
        for (let j = 0; j < 64; j++) {
            let f, g;

            if (j < 16) {
                f = (b & c) | (~b & d);
                g = j;
            } else if (j < 32) {
                f = (d & b) | (~d & c);
                g = (5 * j + 1) % 16;
            } else if (j < 48) {
                f = b ^ c ^ d;
                g = (3 * j + 5) % 16;
            } else {
                f = c ^ (b | ~d);
                g = (7 * j) % 16;
            }

            const temp = d;
            d = c;
            c = b;
            b = b + ((a + f + k[j] + chunk[g]) << k[j] | (a + f + k[j] + chunk[g]) >>> (32 - k[j]));
            a = temp;
        }

        // Add chunk to result
        a = (a + aa) | 0;
        b = (b + bb) | 0;
        c = (c + cc) | 0;
        d = (d + dd) | 0;
    }

    // Convert to hex string
    const hex = (n: number) => {
        return (n < 16 ? "0" : "") + n.toString(16);
    };

    return hex(a & 0xff) + hex((a >> 8) & 0xff) + hex((a >> 16) & 0xff) + hex((a >> 24) & 0xff) +
        hex(b & 0xff) + hex((b >> 8) & 0xff) + hex((b >> 16) & 0xff) + hex((b >> 24) & 0xff) +
        hex(c & 0xff) + hex((c >> 8) & 0xff) + hex((c >> 16) & 0xff) + hex((c >> 24) & 0xff) +
        hex(d & 0xff) + hex((d >> 8) & 0xff) + hex((d >> 16) & 0xff) + hex((d >> 24) & 0xff);
}

export default function LoginForm() {
    const [isLoading, setIsLoading] = useState(false)
    const [loginSuccess, setLoginSuccess] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const { toast } = useToast()
    const router = useRouter()
    const [userIP, setUserIP] = useState<string>("")
    const canvasRef = useRef(null);
    const [setFingerprint] = useState('');
    const [signatures, setSignatures] = useState({
        md5: '',
        sha256: ''
    });
    // Thêm state để kiểm soát việc hiển thị form
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const generateStandardFingerprint = (ctx: CanvasRenderingContext2D) => {
        // Clear the canvas
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        // Exact drawing sequence to match the target signature
        ctx.textBaseline = "top";
        ctx.font = "14px 'Arial'";
        ctx.textBaseline = "alphabetic";
        ctx.fillStyle = "#f60";
        ctx.fillRect(125, 1, 62, 20);
        ctx.fillStyle = "#069";
        ctx.fillText("BrowserLeaks,com <canvas> 1.0", 2, 15);

        // Get the data URL and extract the base64 data
        const dataUrl = ctx.canvas.toDataURL();
        return dataUrl.split(',')[1]; // Return only the base64 data part
    };

    const computeSignatures = async (base64Data: string) => {
        try {
            // Convert base64 to binary string for MD5
            const binaryString = atob(base64Data);

            // Calculate MD5
            const md5Hash = MD5(binaryString);

            // Calculate SHA-256
            const bytes = new Uint8Array(binaryString.length);
            for (let i = 0; i < binaryString.length; i++) {
                bytes[i] = binaryString.charCodeAt(i);
            }
            const hashBuffer = await crypto.subtle.digest('SHA-256', bytes);
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            const sha256Hash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

            return { md5: md5Hash, sha256: sha256Hash };
        } catch (e) {
            throw new Error(`Signature computation error: ${e}`);
        }
    };

    // Kiểm tra xác thực và chuyển hướng
    useEffect(() => {
        const checkAuthentication = async () => {
            // Bắt đầu kiểm tra xác thực
            setIsCheckingAuth(true);

            try {
                // Kiểm tra tất cả các nguồn có thể chứa token/session
                const authToken = localStorage.getItem("authToken") ||
                    sessionStorage.getItem("authToken") ||
                    Cookies.get("authToken");

                const sessionId = localStorage.getItem("sessionId") ||
                    Cookies.get("sessionId");

                const userString = localStorage.getItem("user");
                const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

                // Nếu có nhiều nguồn dữ liệu xác thực, kiểm tra tính hợp lệ
                if ((authToken || sessionId) && (userString || isLoggedIn)) {
                    let isValid = false;

                    // Kiểm tra dữ liệu người dùng
                    if (userString) {
                        try {
                            const userData = JSON.parse(userString);
                            if (userData && userData.email) {
                                isValid = true;
                            }
                        } catch (e) {
                            console.error("Dữ liệu người dùng không hợp lệ:", e);
                            // Xóa dữ liệu không hợp lệ
                            localStorage.removeItem("user");
                        }
                    }

                    // Nếu có thẻ token/session và dữ liệu hợp lệ, chuyển hướng ngay lập tức
                    if (isValid || isLoggedIn) {
                        console.log("Đã xác thực, chuyển hướng đến dashboard");
                        setIsAuthenticated(true);
                        router.push("/dashboard");
                        return; // Dừng việc xử lý tiếp theo
                    }
                }

                // Nếu đến đây mà vẫn chưa chuyển hướng, tức là không có xác thực hợp lệ
                setIsAuthenticated(false);
            } catch (error) {
                console.error("Lỗi khi kiểm tra xác thực:", error);
                setIsAuthenticated(false);
            } finally {
                // Kết thúc quá trình kiểm tra
                setIsCheckingAuth(false);
            }

            // Nếu người dùng chưa đăng nhập, tiếp tục lấy IP và tạo fingerprint
            await Promise.all([getIP(), generateFingerprints()]);
        };

        // Thực hiện kiểm tra xác thực
        checkAuthentication();

    }, [router]);

    // Tách hàm lấy IP thành hàm riêng biệt
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

    // Tách hàm tạo fingerprint thành hàm riêng biệt
    const generateFingerprints = async () => {
        try {
            const canvas = canvasRef.current as HTMLCanvasElement | null;
            if (!canvas) return;

            const ctx = canvas.getContext('2d');
            if (!ctx) throw new Error('Cannot get 2D context');

            canvas.width = 300;
            canvas.height = 150;

            const fp = generateStandardFingerprint(ctx);
            // @ts-ignore
            setFingerprint(fp);

            const sigs = await computeSignatures(fp);
            setSignatures(sigs);
            console.log(sigs);

        } catch (e: any) {
            setError(e.message);
        }
    };


    // Initialize form with react-hook-form and zod validation
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
            rememberMe: false,
        },
    })

    const handleSubmit = async (values: FormValues) => {
        setError(null)
        setIsLoading(true)

        try {
            const response = await fetch(`${process.env.API_URL || ''}api/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include", // Include cookies if using session-based auth
                body: JSON.stringify({
                    ...values,
                    loginTime: Date.now(),
                    browser: navigator.userAgent,
                    ip: userIP,
                    fingerprint: signatures,
                }),
            })
            console.log(response)
            const data: LoginResponse = await response.json()
            console.log("Phản hồi đăng nhập:", data)

            if (!response.ok || !data.success) {
                throw new Error(data.message || "Đăng nhập thất bại")
            }
            const userInfo = {
                name: data.user?.name,
                email: data.user?.email,
            };
            localStorage.setItem("userInfo", JSON.stringify(userInfo));
            // Lưu thông tin vào cache theo nhiều cách để đảm bảo không mất
            storeAuthData(data, values.rememberMe);
            if (data.user) {
                localStorage.setItem("user", JSON.stringify(data.user))
            }
            // Login successful
            setLoginSuccess(true)

            // Thông báo đăng nhập thành công
            toast({
                title: "Đăng nhập thành công",
                description: `Chào mừng ${data.user?.name || 'bạn'} quay trở lại!`,
            })

            // Redirect after successful login
            setTimeout(() => {
                router.push("/dashboard")
            }, 1500)
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Đã xảy ra lỗi, vui lòng thử lại"
            setError(errorMessage)
            toast({
                variant: "destructive",
                title: "Đăng nhập thất bại",
                description: errorMessage,
            })
            setIsLoading(false)
        }
    }

    // Hàm lưu dữ liệu xác thực vào cache
    const storeAuthData = (data: LoginResponse, rememberMe: boolean) => {
        // Thời gian hết hạn cho cookies (ngày)
        const expiryDays = rememberMe ? 30 : 1;
        const sessionOnly = !rememberMe;

        // 1. Lưu token xác thực
        if (data.token) {
            // Lưu vào localStorage
            localStorage.setItem("authToken", data.token);

            // Lưu vào sessionStorage
            sessionStorage.setItem("authToken", data.token);

            // Lưu vào cookies với các tùy chọn phù hợp
            if (rememberMe) {
                // Cookie dài hạn nếu "ghi nhớ đăng nhập"
                Cookies.set("authToken", data.token, {
                    expires: expiryDays,
                    path: '/',
                    secure: window.location.protocol === 'https:'
                });
            } else {
                // Cookie phiên nếu không "ghi nhớ đăng nhập"
                Cookies.set("authToken", data.token, {
                    path: '/',
                    secure: window.location.protocol === 'https:'
                });
            }
        }

        // 2. Lưu session ID
        if (data.sessionId) {
            // Lưu vào cookies
            Cookies.set("sessionId", data.sessionId, sessionOnly ? {} : { expires: expiryDays });

            // Lưu vào localStorage để dễ truy cập
            localStorage.setItem("sessionId", data.sessionId);
        }

        // 3. Lưu thông tin người dùng
        if (data) {
            // Lưu dưới nhiều định dạng để đảm bảo dễ truy cập

            // Lưu object đầy đủ
            localStorage.setItem("user", JSON.stringify(data));
            sessionStorage.setItem("user", JSON.stringify(data));

            // Lưu email riêng biệt để dễ truy cập
            if (data.email) {
                localStorage.setItem("userEmail", String(data.email));
                sessionStorage.setItem("userEmail", String(data.email));
            }

            // Lưu trạng thái xác thực
            if (data.isVerified !== undefined) {
                localStorage.setItem("userVerified", data.isVerified ? "true" : "false");
            }
        }

        // 4. Lưu thời gian đăng nhập
        const loginTimestamp = Date.now();
        localStorage.setItem("loginTime", loginTimestamp.toString());

        // 5. Lưu trạng thái đăng nhập
        localStorage.setItem("isLoggedIn", "true");

        // 6. Lưu dữ liệu phiên làm việc
        const sessionData = {
            loginTime: loginTimestamp,
            user: data.email,
            token: data.token,
            sessionId: data.sessionId,
            rememberMe: rememberMe
        };
        localStorage.setItem("sessionData", JSON.stringify(sessionData));

        console.log("Đã lưu dữ liệu đăng nhập vào cache:", {
            user: data.email,
            token: data.token ? "Đã lưu" : "Không có",
            sessionId: data.sessionId ? "Đã lưu" : "Không có",
            rememberMe,
            loginTime: new Date(loginTimestamp).toLocaleString()
        });
    };

    // Hiển thị thông báo đang kiểm tra và chuyển hướng nếu đang trong quá trình xác thực
    if (isCheckingAuth) {
        return (
            <div className="flex items-center justify-center p-8">
                <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                <p className="ml-2 text-muted-foreground">Đang kiểm tra đăng nhập...</p>
            </div>
        );
    }

    // Nếu đã xác thực, không hiển thị gì cả vì sẽ được chuyển hướng
    if (isAuthenticated) {
        return (
            <div className="flex items-center justify-center p-8">
                <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                <p className="ml-2 text-muted-foreground">Đang chuyển hướng đến Dashboard...</p>
            </div>
        );
    }

    if (loginSuccess) {
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
                <h3 className="mb-2 text-xl font-semibold">Đăng nhập thành công!</h3>
                <p className="text-muted-foreground">Đang chuyển hướng đến trang chủ...</p>

                {/* Hiển thị thông tin lưu cache (chỉ hiển thị trong development) */}
                {process.env.NODE_ENV !== 'production' && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-md text-left text-sm">
                        <h4 className="font-medium mb-2">Thông tin đã lưu:</h4>
                        <p>Email: {localStorage.getItem("userEmail") || "Không có"}</p>
                        <p>Token: {localStorage.getItem("authToken") ? "Đã lưu" : "Không có"}</p>
                        <p>Session ID: {localStorage.getItem("sessionId") || Cookies.get("sessionId") || "Không có"}</p>
                        <p>Đăng nhập lúc: {new Date(parseInt(localStorage.getItem("loginTime") || "0")).toLocaleString()}</p>
                    </div>
                )}
            </motion.div>
        )
    }

    // Hiển thị form đăng nhập nếu chưa đăng nhập
    return (
        <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            {/* Canvas sẽ được sử dụng cho fingerprinting */}
            <canvas ref={canvasRef} className="hidden" />

            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
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
                                                <User className="h-5 w-5 text-blue-500" />
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
                            name="password"
                            render={({ field, fieldState }) => (
                                <FormItem>
                                    <FormControl>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                                <Lock className="h-5 w-5 text-blue-500" />
                                            </div>
                                            <Input
                                                type="password"
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
                        transition={{ delay: 0.35, duration: 0.5 }}
                        className="flex items-center space-x-2"
                    >
                        <FormField
                            control={form.control}
                            name="rememberMe"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                                    <FormControl>
                                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormLabel>Ghi nhớ đăng nhập</FormLabel>
                                    </div>
                                </FormItem>
                            )}
                        />
                    </motion.div>

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
                            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Đang đăng nhập...
                                </>
                            ) : (
                                "Đăng Nhập"
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
                    <span className="bg-background px-2 text-muted-foreground">Hoặc đăng nhập với</span>
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
                    className="w-full h-14"
                />
                <SocialButton
                    provider="Google"
                    icon={<Mail className="mr-2 h-4 w-4" />}
                    variant="outline"
                    className="w-full h-14"
                />
            </motion.div>

            <motion.div
                className="text-center space-y-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
            >
                <a href="/forgot-password" className="text-sm text-primary hover:text-blue-500">
                    Bạn quên mật khẩu?
                </a>
                <p className="text-sm text-muted-foreground">
                    Bạn không có tài khoản?{" "}
                    <a href="/signup" className="text-blue-600 hover:text-blue-500">
                        Đăng kí ở đây!
                    </a>
                </p>
            </motion.div>
        </motion.div>
    )
}