import type React from "react"
import "../../styles/ChatAnimation.css"

const ChatAnimation: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center h-full">
            <div className="text-6xl flex space-x-4 mb-8">
                <span className="chat-bubble">💬</span>
                <span className="chat-bubble">💬</span>
                <span className="chat-bubble">💬</span>
            </div>
            <h2 className="text-2xl font-bold mb-4 text-center">Chào mừng đến với Zework!</h2>
            <p className="typewriter text-lg text-center text-gray-600">Hãy chọn một liên hệ để bắt đầu!</p>
        </div>
    )
}

export default ChatAnimation

