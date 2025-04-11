import OTPVerification from "./otp-verification"

export default function OTPVerificationPage() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
            <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-6 shadow-md">
                <OTPVerification />
            </div>
        </div>
    )
}

