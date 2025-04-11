import SignupForm from "./signup-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

import { SignupAnimation } from "./signup-animation"
import type React from "react";

export default function SignupPage() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-background p-4">
            <div className="w-full max-w-6xl flex flex-col lg:flex-row items-center justify-between gap-8">
                <Card className="w-full max-w-md overflow-hidden">
                    <CardHeader className="space-y-1 flex flex-col items-center pb-8 pt-10">
                        <CardTitle className="text-4xl font-bold text-center text-gray-800">Tạo tài khoản mới</CardTitle>
                        <CardDescription className="text-center text-lg text-gray-600">
                            Đăng ký để bắt đầu sử dụng Zework
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="p-6 sm:p-8">
                        <SignupForm />
                    </CardContent>
                </Card>
                <div className="w-full max-w-md h-[600px] relative overflow-hidden">
                    <SignupAnimation />
                </div>
            </div>
        </div>
    )
}

