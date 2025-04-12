'use client'

import { useState, useEffect } from 'react'
import { generateQRCode, checkScanStatus, confirmLogin } from '@/lib/api'
import type { QRCodeData } from '@/types'
import { RefreshCw, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'

// @ts-ignore
export function QRCodeLogin({ onSuccessClose }) {
    const [qrData, setQrData] = useState<QRCodeData | null>(null)
    const [status, setStatus] = useState<string>('Đang tạo mã QR...')
    const [isExpired, setIsExpired] = useState<boolean>(false)
    const [Du, setDu] = useState<string>()
    // const [userId, setUserId] = useState<string>()
    const [success, setSuccess] = useState<boolean>(false)
    const router = useRouter()

    useEffect(() => {
        handleGetQR() // Tự động gọi khi component mount
    }, [])

    // Effect để đóng modal hoặc chuyển hướng khi thành công
    useEffect(() => {
        if (success) {
            // Hiển thị trạng thái thành công trong 2 giây trước khi đóng
            const timer = setTimeout(() => {
                if (typeof onSuccessClose === 'function') {
                    onSuccessClose() // Đóng modal nếu là modal
                } else {
                    // Chuyển hướng nếu không có hàm đóng
                    router.push('/dashboard/zalo-accounts')
                }
            }, 2000)

            return () => clearTimeout(timer)
        }
    }, [success, onSuccessClose, router])

    const handleGetQR = async () => {
        setIsExpired(false)
        setStatus('Đang tạo mã QR...')
        setSuccess(false)
        const data = await generateQRCode()
        if (data.success) {
            setQrData(data)
            setDu(data.sessionId)
            setStatus('Đang đợi bạn quét QR code...')
            await pollScanStatus(data.sessionId)
        } else {
            setStatus(data.message || 'Đã xảy ra lỗi khi tạo QR code.')
        }
    }

    const pollScanStatus = async (sessionId: string | undefined) => {
        if (!sessionId || success) return;

        const result = await checkScanStatus(sessionId);

        switch (result.status) {
            case 'scanned':
                setStatus('Đang đợi xác nhận...');
                setTimeout(() => pollScanStatus(sessionId), 2000);
                break;
            case 'scanned-confirm':
                setStatus('QR đã được quét và xác nhận đăng nhập...');
                await handleConfirmLogin(sessionId);
                break;
            case 'expired':
                setStatus('QR code đã hết hạn. Vui lòng tạo QR mới.');
                setIsExpired(true);
                break;
            default:
                setTimeout(() => pollScanStatus(sessionId), 2000);
        }
    }
    type ScanStatus = {
        status: 'waiting' | 'scanned' | 'confirmed' | string;
    };
    const handleConfirmLogin = async (sessionId: string | undefined) => {
        try {
            const userString = localStorage.getItem("user")
            console.log(userString)
            if (!userString) {
                setStatus('Lỗi: Không tìm thấy thông tin người dùng')
                setIsExpired(true)
                return
            }

            const user = JSON.parse(userString)
            if (!user.userId) {
                setStatus('Lỗi: Không tìm thấy ID người dùng')
                setIsExpired(true)
                return
            }

            const result = await confirmLogin(sessionId, user.userId)
            if (result.success) {
                setStatus('Liên Kết Thành Công!')
                setSuccess(true)

                // Cập nhật localStorage nếu cần
                if (result.userData) {
                    const updatedUser = { ...user, zaloConnected: true }
                    localStorage.setItem("user", JSON.stringify(updatedUser))
                }
            } else {
                setStatus(`Xác nhận đăng nhập thất bại: ${result.message}`)
                setIsExpired(true)
            }
        } catch (error) {
            console.error("Lỗi xác nhận đăng nhập:", error)
            setStatus('Đã xảy ra lỗi khi xác nhận đăng nhập')
            setIsExpired(true)
        }
    }

    return (
        <div className="text-center p-4">
            <div>
                {success ? (
                    <div className="flex flex-col items-center justify-center">
                        <CheckCircle className="w-20 h-20 text-green-500 animate-pulse mb-4" />
                        <p className="text-green-500 font-medium text-lg">Liên Kết Thành Công!</p>
                        <p className="text-sm text-gray-500 mt-2">Đang chuyển hướng...</p>
                    </div>
                ) : (
                    <>
                        <img
                            src={qrData?.qrImage || "/placeholder.svg"}
                            alt="QR Code"
                            className="w-64 h-64 mx-auto mb-4 border border-gray-200 rounded-lg"
                        />
                        {Du ? (<div className="text-xs text-muted-foreground text-center mb-3">QR ID: {Du}</div>) : ''}

                        {isExpired ? (
                            <Button size="sm" className="w-full bg-blue-500 text-white" onClick={handleGetQR}>
                                <RefreshCw className="mr-2 h-3.5 w-3.5 text-white" /> Làm Mới Mã QR
                            </Button>
                        ) : ''}
                    </>
                )}
            </div>

            {!success && (
                <p className={`mt-4 ${
                    status.includes('Thành công') ? 'text-green-500' :
                        status.includes('Lỗi') ? 'text-red-500' : 'text-gray-600'
                }`}>
                    {status}
                </p>
            )}
        </div>
    )
}