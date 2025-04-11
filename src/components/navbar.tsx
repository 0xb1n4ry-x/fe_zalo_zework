"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from 'next/image'
import { motion } from "framer-motion"
import {Menu, X} from "lucide-react"
import { Button } from "@/components/ui/button"

export function Navbar() {
    const pathname = usePathname()
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <motion.nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white shadow-md" : "bg-transparent"}`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center text-2xl font-bold text-indigo-600">
                            <Image
                                src="./images/logo.svg"
                                width={63}
                                height={63}
                                alt="ZEWORK"
                            />
                        </Link>
                    </div>
                    <div className="hidden md:flex items-center space-x-4">
                        <NavLink href="/#features" isActive={pathname === "/#features"}>
                            Tính năng
                        </NavLink>
                        <NavLink href="/#pricing" isActive={pathname === "/#pricing"}>
                            Bảng giá
                        </NavLink>
                        <NavLink href="/about" isActive={pathname === "/about"}>
                            Về chúng tôi
                        </NavLink>
                        <NavLink href="/blog" isActive={pathname === "/blog"}>
                            Diễn đàn
                        </NavLink>
                        <NavLink href="/document" isActive={pathname === "/document"}>
                            Tài liệu
                        </NavLink>
                        <Button asChild variant="ghost" className="text-gray-600 hover:text-gray-900">
                            <Link href="/login">Đăng nhập</Link>
                        </Button>
                        <Button
                            asChild
                            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
                        >
                            <Link href="/signup">Đăng ký</Link>
                        </Button>
                    </div>
                    <div className="md:hidden">
                        <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </Button>
                    </div>
                </div>
            </div>
            {isMobileMenuOpen && (
                <motion.div
                    className="md:hidden bg-white"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <MobileNavLink href="/#features">Tính năng</MobileNavLink>
                        <MobileNavLink href="/#pricing">Bảng giá</MobileNavLink>
                        <MobileNavLink href="/about">Về chúng tôi</MobileNavLink>
                        <MobileNavLink href="/login">Đăng nhập</MobileNavLink>
                        <MobileNavLink href="/signup" className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                            Đăng ký
                        </MobileNavLink>
                    </div>
                </motion.div>
            )}
        </motion.nav>
    )
}

function NavLink({ href, children, isActive }: { href: string; children: React.ReactNode; isActive?: boolean }) {
    return (
        <Link
            href={href}
            className={`relative px-3 py-2 rounded-md text-sm font-medium ${isActive ? "text-indigo-600" : "text-gray-600 hover:text-gray-900"}`}
        >
            {children}
            {isActive && (
                <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600"
                    layoutId="underline"
                    initial={false}
                />
            )}
        </Link>
    )
}

function MobileNavLink({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
    return (
        <Link
            href={href}
            className={`block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 ${className || ""}`}
        >
            {children}
        </Link>
    )
}

