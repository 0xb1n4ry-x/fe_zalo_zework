export default function WelcomeScreen() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 bg-white">
      <div className="w-24 h-24 mb-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
        <div className="text-white text-4xl font-bold">Z</div>
      </div>

      <div className="flex gap-8 mb-10">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className={`w-16 h-16 rounded-full flex items-center justify-center ${
              i === 1 ? "bg-blue-100" : i === 2 ? "bg-green-100" : "bg-purple-100"
            }`}
          >
            <div
              className={`w-10 h-10 rounded-full ${
                i === 1 ? "bg-blue-200" : i === 2 ? "bg-green-200" : "bg-purple-200"
              }`}
            ></div>
          </div>
        ))}
      </div>

      <h2 className="text-3xl font-bold mb-4 text-gray-800">Chào mừng đến với Zework!</h2>
      <p className="text-gray-500 text-lg max-w-md text-center">
        Hãy chọn một liên hệ từ danh sách bên trái để bắt đầu cuộc trò chuyện.
      </p>
    </div>
  )
}

