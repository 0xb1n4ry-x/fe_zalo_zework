'use client'

import { useState } from 'react'
import { generateQRCode, checkScanStatus, confirmLogin } from '@/lib/api'
import type { QRCodeData } from '../types'

export default function QRCodeLogin() {
    const [qrData, setQrData] = useState<QRCodeData | null>(null)
    const [status, setStatus] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handleGetQR = async () => {
        setIsLoading(true)
        const data = await generateQRCode()
        if (data.success) {
            setQrData(data)
            setStatus('Đang đợi bạn quét QR code...')
            pollScanStatus(data.sessionId)
        } else {
            setStatus(data.message || 'Đã xảy ra lỗi khi tạo QR code.')
        }
        setIsLoading(false)
    }

    const pollScanStatus = async (sessionId: string) => {
        const result = await checkScanStatus(sessionId)
        if (result.status === 'scanned') {
            setStatus('Đã quét QR. Đang đợi xác nhận...')
            setTimeout(() => pollScanStatus(sessionId), 2000)
        } else if (result.status === 'scanned-confirm') {
            setStatus('QR đã được quét và xác nhận! Đang xác nhận đăng nhập...')
            await handleConfirmLogin(sessionId)
        } else if (result.status === 'expired') {
            setStatus('QR code đã hết hạn. Vui lòng tạo QR mới.')
        } else {
            setTimeout(() => pollScanStatus(sessionId), 2000)
        }
    }

    const handleConfirmLogin = async (sessionId: string) => {
        const result = await confirmLogin(sessionId)
        if (result.success) {
            setStatus('Đăng nhập thành công! Đang chuyển hướng...');
            console.log(result);
            // setTimeout(() => {
            //     window.location.href = '/chat'
            // }, 2000)
        } else {
            setStatus(`Xác nhận đăng nhập thất bại: ${result.message}`)
        }
    }

    return (
        <div>
            {!qrData && (
                <button
                    onClick={handleGetQR}
                    disabled={isLoading}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
                >
                    {isLoading ? 'Đang tạo...' : 'Lấy Mã QR'}
                </button>
            )}
            {qrData && (
                <div>
                    <img src={qrData.qrImage || "/placeholder.svg"} alt="QR Code" className="w-64 h-64 mx-auto mb-4 border border-gray-200 rounded-lg" />
                </div>
            )}
            <p className={`mt-4 ${status.includes('Thành công') ? 'text-green-500' : status.includes('Lỗi') ? 'text-red-500' : 'text-gray-600'}`}>
                {status}
            </p>
        </div>
    )
}

