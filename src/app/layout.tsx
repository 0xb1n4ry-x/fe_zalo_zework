import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import {Navbar} from "@/components/navbar"
const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Zework - Cách Mạng Hóa Giao Tiếp Của Bạn",
  description:
      "Zework là nền tảng nhắn tin tiên tiến cung cấp giao tiếp tức thì, an toàn và đầy đủ tính năng cho cá nhân và doanh nghiệp.",
    keywords: "Zalo, Zework",
    authors: [{ name: "Anh Nguyen", url: "https://zework.com" }],
    openGraph: {
        title: "Zework - Cách Mạng Hóa Giao Tiếp Của Bạn",
        description:
            "Zework là nền tảng nhắn tin tiên tiến cung cấp giao tiếp tức thì, an toàn và đầy đủ tính năng cho cá nhân và doanh nghiệp.",

        images: "./images/logo.svg",
        url: "https://zework.com/",
    },
    icons: {
        icon: "./images/logo.svg"
  }
}

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode
}) {
  return (
      <html lang="vi">
      <body className={inter.className}>

      {children}
      </body>
      </html>
  )
}

