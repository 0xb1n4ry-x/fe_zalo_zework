import { Suspense } from "react"
import ResetPasswordForm from "./ResetPasswordForm" // chứa useSearchParams()

export default function ResetPasswordPage() {
    return (
        <div className="min-h-screen flex justify-center items-center">
            <Suspense fallback={<div>Loading...</div>}>
                <ResetPasswordForm />
            </Suspense>
        </div>
    )
}