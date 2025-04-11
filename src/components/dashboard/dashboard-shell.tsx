"use client"

import type React from "react"
import { cn } from "@/lib/utils"
import { DashboardNav } from "@/components/dashboard/dashboard-nav"
import { useState, useEffect } from "react"
import { Menu, ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useIsMobile } from "@/hooks/use-mobile"

interface DashboardShellProps extends React.HTMLAttributes<HTMLDivElement> {}

export function DashboardShell({ children, className, ...props }: DashboardShellProps) {
    const [showMobileMenu, setShowMobileMenu] = useState(false)
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
    const isMobile = useIsMobile()

    // Đọc trạng thái từ localStorage khi component được mount
    useEffect(() => {
        const savedState = localStorage.getItem("dashboard-sidebar-collapsed")
        if (savedState !== null) {
            setSidebarCollapsed(savedState === "true")
        }
    }, [])

    // Lưu trạng thái vào localStorage khi thay đổi
    useEffect(() => {
        localStorage.setItem("dashboard-sidebar-collapsed", String(sidebarCollapsed))
    }, [sidebarCollapsed])

    const toggleSidebar = () => {
        setSidebarCollapsed(!sidebarCollapsed)
    }

    return (
        <div className="relative min-h-screen w-full">
            {/* Mobile menu button */}
            <div className="sticky top-0 z-30 flex h-14 items-center border-b bg-background px-4 lg:hidden">
                <Button variant="ghost" size="icon" className="mr-2" onClick={() => setShowMobileMenu(!showMobileMenu)}>
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle menu</span>
                </Button>
                <span className="font-semibold">Quản Trị Viên</span>
            </div>

            <div
                className="flex min-h-screen w-full flex-col lg:grid"
                style={{ gridTemplateColumns: sidebarCollapsed ? "80px 1fr" : "280px 1fr" }}
            >
                {/* Mobile navigation overlay */}
                <div
                    className={cn(
                        "fixed inset-0 z-20 bg-background/80 backdrop-blur-sm transition-all lg:hidden",
                        showMobileMenu ? "opacity-100" : "pointer-events-none opacity-0",
                    )}
                    onClick={() => setShowMobileMenu(false)}
                />

                {/* Navigation sidebar */}
                <div
                    className={cn(
                        "fixed inset-y-0 left-0 z-20 transform border-r bg-background shadow-lg transition-all duration-300 ease-in-out lg:static lg:block",
                        showMobileMenu ? "translate-x-0" : "-translate-x-full",
                        "lg:translate-x-0",
                        sidebarCollapsed ? "lg:w-20" : "lg:w-[280px]",
                        "w-full max-w-xs",
                    )}
                >
                    <DashboardNav collapsed={sidebarCollapsed} onNavClick={() => setShowMobileMenu(false)} />
                </div>

                {/* Main content */}
                <main className="flex flex-1 flex-col">
                    <div className="sticky top-0 z-10 flex h-14 items-center border-b bg-background px-4">
                        {!isMobile && (
                            <Button variant="ghost" size="icon" onClick={toggleSidebar} className="mr-2">
                                <ChevronLeft className={cn("h-5 w-5 transition-transform", sidebarCollapsed && "rotate-180")} />
                                <span className="sr-only">Toggle sidebar</span>
                            </Button>
                        )}
                        <span className="font-semibold">Quản Trị Viên</span>
                    </div>
                    <div className={cn("flex-1 space-y-4 p-4 pt-6 md:p-8", className)} {...props}>
                        {children}
                    </div>
                </main>
            </div>
        </div>
    )
}

