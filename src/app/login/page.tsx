"use client"
import LoginForm from "./login-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LoginAnimation } from "./login-animation"
import type React from "react";

export default function LoginPage() {

    return (
        <div className="flex items-center justify-center min-h-screen bg-background p-4">
            <div className="w-full max-w-6xl flex flex-col lg:flex-row items-center justify-between ">
                <div className="w-full max-w-md h-[650px] relative overflow-hidden">
                    <LoginAnimation />
                </div>
                <Card className="w-full max-w-md overflow-hidden">
                    <CardHeader className="space-y-1 flex flex-col items-center pb-8 pt-10">
                        <CardTitle className="text-4xl font-bold text-center text-gray-800">Đăng nhập</CardTitle>
                        <CardDescription className="text-center text-lg text-gray-600">
                            Đăng nhập để tiếp tục sử dụng Zework
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="p-6 sm:p-8">
                        <LoginForm />
                    </CardContent>
                </Card>

            </div>
        </div>
    )
}

