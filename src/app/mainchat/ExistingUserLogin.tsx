import type { UserData } from '@/types'

interface ExistingUserLoginProps {
    userData: UserData
}

export default function ExistingUserLogin({ userData }: ExistingUserLoginProps) {
    const handleLogin = () => {
        window.location.href = '/'
    }

    return (
        <div>
            <img src={userData.avatar || "/placeholder.svg"} alt="Avatar" className="w-20 h-20 rounded-full mx-auto mb-4" />
            <p className="text-green-500 font-semibold mb-2">Đã đăng nhập trước đó!</p>
            <p className="mb-4">{userData.display_name}</p>
            <button
                onClick={handleLogin}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
                Đăng nhập
            </button>
        </div>
    )
}

