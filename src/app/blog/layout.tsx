import type React from "react"
import type { Metadata } from "next"
import { Inter, Plus_Jakarta_Sans } from "next/font/google"
import "@/app/globals.css"

const inter = Inter({
    subsets: ["latin", "vietnamese"],
    display: "swap",
    variable: "--font-inter",
})

const jakarta = Plus_Jakarta_Sans({
    subsets: ["latin", "vietnamese"],
    display: "swap",
    variable: "--font-jakarta",
})

export const metadata: Metadata = {
    title: "Diễn đàn Zework",
    description: "Nơi chia sẻ kiến thức và kết nối cộng đồng",
}

export default function ForumLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
    <html lang="vi" className={`${inter.variable} ${jakarta.variable}`}>
<body className="font-sans antialiased">{children}</body>
</html>
)
}

