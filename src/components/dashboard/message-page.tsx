"use client"

import { useState, useEffect, useRef } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import {
  ArrowLeft,
  ImageIcon,
  Paperclip,
  Search,
  Send,
  Smile,
  User,
  Phone,
  Video,
  MoreVertical,
  Filter,
  MessageCircle,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function MessagePage() {
  const searchParams = useSearchParams()
  const accountId = searchParams.get("account")
  const [activeChat, setActiveChat] = useState(null)
  const [message, setMessage] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const messagesEndRef = useRef(null)

  // Mẫu dữ liệu tài khoản Zalo
  const zaloAccounts = [
    {
      id: 1,
      name: "Nguyễn Thị Hương",
      zaloId: "zalo_123456789",
      department: "Hỗ Trợ Khách Hàng",
      status: "Hoạt động",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: 2,
      name: "Trần Văn Minh",
      zaloId: "zalo_987654321",
      department: "Kinh Doanh",
      status: "Hoạt động",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: 3,
      name: "Lê Thị Lan",
      zaloId: "zalo_456789123",
      department: "Hỗ Trợ Kỹ Thuật",
      status: "Tạm dừng",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: 4,
      name: "Phạm Văn Đức",
      zaloId: "zalo_789123456",
      department: "Hỗ Trợ Khách Hàng",
      status: "Hoạt động",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: 5,
      name: "Hoàng Thị Mai",
      zaloId: "zalo_321654987",
      department: "Marketing",
      status: "Hoạt động",
      avatar: "/placeholder.svg?height=32&width=32",
    },
  ]

  // Mẫu dữ liệu cuộc trò chuyện
  const chats = [
    {
      id: 1,
      customer: {
        id: 101,
        name: "Khách Hàng A",
        avatar: "/placeholder.svg?height=32&width=32",
        phone: "0901234567",
      },
      unread: 3,
      lastMessage: "Tôi cần hỗ trợ về đơn hàng #12345",
      lastMessageTime: "10:30",
      messages: [
        {
          id: 1,
          sender: "customer",
          content: "Xin chào, tôi cần hỗ trợ về đơn hàng #12345",
          time: "10:15",
          status: "read",
        },
        {
          id: 2,
          sender: "agent",
          content: "Chào bạn, tôi có thể giúp gì cho bạn?",
          time: "10:17",
          status: "read",
        },
        {
          id: 3,
          sender: "customer",
          content: "Tôi đã đặt hàng từ 3 ngày trước nhưng vẫn chưa nhận được",
          time: "10:20",
          status: "read",
        },
        {
          id: 4,
          sender: "agent",
          content: "Tôi xin lỗi về sự bất tiện này. Vui lòng cho tôi biết số điện thoại đặt hàng để kiểm tra.",
          time: "10:22",
          status: "read",
        },
        {
          id: 5,
          sender: "customer",
          content: "Số điện thoại của tôi là 0901234567",
          time: "10:25",
          status: "read",
        },
        {
          id: 6,
          sender: "customer",
          content: "Tôi cần hỗ trợ gấp",
          time: "10:30",
          status: "unread",
        },
      ],
    },
    {
      id: 2,
      customer: {
        id: 102,
        name: "Khách Hàng B",
        avatar: "/placeholder.svg?height=32&width=32",
        phone: "0909876543",
      },
      unread: 0,
      lastMessage: "Cảm ơn bạn rất nhiều!",
      lastMessageTime: "Hôm qua",
      messages: [
        {
          id: 1,
          sender: "customer",
          content: "Xin chào, tôi muốn hỏi về sản phẩm mới",
          time: "Hôm qua, 15:30",
          status: "read",
        },
        {
          id: 2,
          sender: "agent",
          content: "Chào bạn, sản phẩm mới của chúng tôi sẽ ra mắt vào tuần sau. Bạn có thể đặt trước từ hôm nay.",
          time: "Hôm qua, 15:35",
          status: "read",
        },
        {
          id: 3,
          sender: "customer",
          content: "Cảm ơn bạn rất nhiều!",
          time: "Hôm qua, 15:40",
          status: "read",
        },
      ],
    },
    {
      id: 3,
      customer: {
        id: 103,
        name: "Khách Hàng C",
        avatar: "/placeholder.svg?height=32&width=32",
        phone: "0905555555",
      },
      unread: 2,
      lastMessage: "Khi nào sản phẩm sẽ có hàng trở lại?",
      lastMessageTime: "09:15",
      messages: [
        {
          id: 1,
          sender: "customer",
          content: "Xin chào, tôi muốn mua sản phẩm X nhưng thấy đã hết hàng",
          time: "09:10",
          status: "read",
        },
        {
          id: 2,
          sender: "customer",
          content: "Khi nào sản phẩm sẽ có hàng trở lại?",
          time: "09:15",
          status: "unread",
        },
      ],
    },
  ]

  // Tìm tài khoản Zalo dựa trên accountId từ URL
  const selectedAccount = zaloAccounts.find((account) => account.id === Number(accountId))

  // Cuộn xuống tin nhắn mới nhất
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [activeChat])

  // Lọc cuộc trò chuyện theo từ khóa tìm kiếm


  return (
    <DashboardShell>
      <DashboardHeader
        heading={selectedAccount ? `Tin Nhắn - ${selectedAccount.name}` : "Tin Nhắn"}
        text={selectedAccount ? `Quản lý tin nhắn Zalo của ${selectedAccount.name}` : "Quản lý tin nhắn Zalo"}
      />

      {selectedAccount ? (
        <div className="grid h-[calc(100vh-12rem)] grid-cols-[300px_1fr] border rounded-md overflow-hidden">
          {/* Danh sách cuộc trò chuyện */}
          <div className="border-r flex flex-col">
            <div className="p-3 border-b">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Tìm kiếm cuộc trò chuyện..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center justify-between p-2 border-b">
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="all">Tất cả</TabsTrigger>
                  <TabsTrigger value="unread">Chưa đọc</TabsTrigger>
                  <TabsTrigger value="assigned">Đã gán</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <div className="flex items-center justify-between px-3 py-2 border-b">
              <span className="text-sm font-medium">Cuộc trò chuyện ({filteredChats.length})</span>
              <Button variant="ghost" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex-1 overflow-y-auto">
              {filteredChats.length === 0 ? (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  Không tìm thấy cuộc trò chuyện nào
                </div>
              ) : (
                filteredChats.map((chat) => (
                  <div
                    key={chat.id}
                    className={`p-3 border-b cursor-pointer hover:bg-muted transition-colors ${
                      activeChat?.id === chat.id ? "bg-muted" : ""
                    }`}
                    onClick={() => setActiveChat(chat)}
                  >
                    <div className="flex items-start gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={chat.customer.avatar} alt={chat.customer.name} />
                        <AvatarFallback>{chat.customer.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <div className="font-medium truncate">{chat.customer.name}</div>
                          <div className="text-xs text-muted-foreground">{chat.lastMessageTime}</div>
                        </div>
                        <div className="text-sm truncate text-muted-foreground">{chat.lastMessage}</div>
                      </div>
                      {chat.unread > 0 && (
                        <Badge variant="default" className="rounded-full px-2 py-0.5 text-xs">
                          {chat.unread}
                        </Badge>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Khu vực tin nhắn */}
          {activeChat ? (
            <div className="flex flex-col h-full">
              {/* Header cuộc trò chuyện */}
              <div className="flex items-center justify-between p-3 border-b">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={activeChat.customer.avatar} alt={activeChat.customer.name} />
                    <AvatarFallback>{activeChat.customer.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{activeChat.customer.name}</div>
                    <div className="text-xs text-muted-foreground">{activeChat.customer.phone}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Video className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <User className="h-4 w-4" />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Tùy chọn</DropdownMenuLabel>
                      <DropdownMenuItem>Chặn người dùng</DropdownMenuItem>
                      <DropdownMenuItem>Đánh dấu đã đọc</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Xóa cuộc trò chuyện</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              {/* Nội dung tin nhắn */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {activeChat.messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.sender === "agent" ? "justify-end" : "justify-start"}`}>
                    {msg.sender === "customer" && (
                      <Avatar className="h-8 w-8 mr-2 mt-1">
                        <AvatarImage src={activeChat.customer.avatar} alt={activeChat.customer.name} />
                        <AvatarFallback>{activeChat.customer.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    )}
                    <div
                      className={`max-w-[70%] rounded-lg p-3 ${
                        msg.sender === "agent" ? "bg-primary text-primary-foreground" : "bg-muted"
                      }`}
                    >
                      <div>{msg.content}</div>
                      <div
                        className={`text-xs mt-1 ${
                          msg.sender === "agent" ? "text-primary-foreground/70" : "text-muted-foreground"
                        }`}
                      >
                        {msg.time}
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Thanh nhập tin nhắn */}
              <div className="p-3 border-t">
                <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                  <Button type="button" variant="ghost" size="icon">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Button type="button" variant="ghost" size="icon">
                    <ImageIcon className="h-4 w-4" />
                  </Button>
                  <Input
                    placeholder="Nhập tin nhắn..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="flex-1"
                  />
                  <Button type="button" variant="ghost" size="icon">
                    <Smile className="h-4 w-4" />
                  </Button>
                  <Button type="submit" disabled={!message.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              Chọn một cuộc trò chuyện để bắt đầu
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center justify-center h-[calc(100vh-12rem)] border rounded-md">
          <div className="text-center space-y-4">
            <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-muted">
              <MessageCircle className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-medium">Không có tài khoản Zalo được chọn</h3>
            <p className="text-muted-foreground max-w-md">
              Vui lòng chọn một tài khoản Zalo từ menu để xem và quản lý tin nhắn.
            </p>
            <Button onClick={() => window.history.back()}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Quay lại
            </Button>
          </div>
        </div>
      )}
    </DashboardShell>
  )
}

