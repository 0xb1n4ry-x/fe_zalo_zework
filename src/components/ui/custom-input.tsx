"use client"

import type React from "react"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { motion } from "framer-motion"

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string
    icon: React.ReactNode
    rightIcon?: React.ReactNode
}

export function CustomInput({ label, icon, rightIcon, type, ...props }: CustomInputProps) {
    const [isFocused, setIsFocused] = useState(false)

    return (
        <div className="space-y-2">
            <Label htmlFor={props.id} className="text-sm font-medium">
                {label}
            </Label>
            <motion.div
                className={`relative rounded-md ${isFocused ? "ring-2 ring-primary" : ""}`}
                initial={false}
                animate={isFocused ? { scale: 1.02 } : { scale: 1 }}
                transition={{ duration: 0.2 }}
            >
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">{icon}</div>
                <Input
                    {...props}
                    type={type}
                    className="pl-10 pr-10 py-2 w-full h-16 border rounded-md focus:outline-none focus:ring-0 focus:border-primary"
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                />
                {rightIcon && <div className="absolute inset-y-0 right-0 pr-3 flex items-center">{rightIcon}</div>}
            </motion.div>
        </div>
    )
}

