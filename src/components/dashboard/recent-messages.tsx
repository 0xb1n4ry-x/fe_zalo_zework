import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function RecentMessages() {
  return (
    <div className="space-y-8">
      {messages.map((message, index) => (
        <div key={index} className="flex items-start">
          <Avatar className="h-9 w-9">
            <AvatarImage src={message.avatar} alt="Avatar" />
            <AvatarFallback>{message.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{message.name}</p>
            <p className="text-sm text-muted-foreground">{message.message}</p>
            <p className="text-xs text-muted-foreground">{message.time}</p>
          </div>
          {message.unread && <div className="ml-auto flex h-2 w-2 rounded-full bg-primary"></div>}
        </div>
      ))}
    </div>
  )
}

const messages = [
  {
    name: "Nguyễn Văn A",
    message: "Xin chào, tôi cần hỗ trợ về tài khoản của mình.",
    time: "2 phút trước",
    avatar: "/placeholder.svg?height=36&width=36",
    unread: true,
  },
  {
    name: "Trần Thị B",
    message: "Cảm ơn bạn đã giúp đỡ!",
    time: "15 phút trước",
    avatar: "/placeholder.svg?height=36&width=36",
    unread: false,
  },
  {
    name: "Lê Văn C",
    message: "Khi nào các tính năng mới sẽ được cập nhật?",
    time: "1 giờ trước",
    avatar: "/placeholder.svg?height=36&width=36",
    unread: true,
  },
  {
    name: "Phạm Thị D",
    message: "Tôi đã hoàn thành các thay đổi được yêu cầu.",
    time: "3 giờ trước",
    avatar: "/placeholder.svg?height=36&width=36",
    unread: false,
  },
]

