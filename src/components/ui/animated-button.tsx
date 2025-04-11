"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

interface AnimatedButtonProps extends React.ComponentProps<typeof Button> {
    children: React.ReactNode
}

export function AnimatedButton({ children, ...props }: AnimatedButtonProps) {
    return (
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button {...props}>{children}</Button>
        </motion.div>
    )
}

