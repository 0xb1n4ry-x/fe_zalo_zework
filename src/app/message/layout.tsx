import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Zework - Tin Nhắn',
  description: 'Tin Nhắn',
  generator: 'Zework.com',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  )
}
