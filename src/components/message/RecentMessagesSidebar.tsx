"use client"
import { Search, Plus, MessageSquare, ChevronLeft, ChevronRight, Bell } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { recentMessages } from "@/lib/data"

type Tag = {
  text: string;
  color: string;
};
type Contact = {
  id: string;
  name: string;
  displayName: string;
  avatar: string;
  tags?: Tag[]
};


type RecentMessagesSidebarProps = {
  onContactSelect: (contact: Contact) => void
  selectedContact: Contact | null
  isCollapsed: boolean
  onToggleCollapse: () => void
}
type RecentMessageItemProps = {
  message: {
    id: string
    contact: {
      id: string
      name: string
      displayName: string
      avatar: string
      tags?: {
        text: string
        color: string
      }[],
      online : boolean

    }
    unread : number
    timestamp: string
    lastMessage: string
    isTyping: boolean
    unreadCount: number
    time: string
  }
  isSelected: boolean
  onClick: () => void
  isCollapsed: boolean
}
type RecentMessage = {
  id: string
  contact: {
    id: string
    name: string
    displayName: string
    avatar: string
    tags?: { text: string; color: string }[]
    online: boolean
  }
  lastMessage: string
  timestamp: string
  unread: number
  unreadCount: number
  isTyping: boolean
  time: string
}
function normalizeMessage(data: any): RecentMessage {
  return {
    id: String(data.id),
    contact: {
      id: data.contact.id ?? String(data.id),
      name: data.contact.name,
      displayName: data.contact.name,
      avatar: data.contact.avatar ?? "/placeholder.svg",
      tags: data.contact.tags ?? [],
      online: data.contact.online ?? false,
    },
    lastMessage: data.lastMessage,
    timestamp: data.timestamp,
    unread: data.unread,
    unreadCount: data.unread ?? 0,
    isTyping: data.isTyping ?? false,
    time: data.timestamp,
  }
}
export default function RecentMessagesSidebar({
                                                onContactSelect,
                                                selectedContact,
                                                isCollapsed,
                                                onToggleCollapse,
                                              }: RecentMessagesSidebarProps) {
  return (
    <div
      className={`${
        isCollapsed ? "w-20" : "w-80"
      } bg-white border-r border-gray-200 flex flex-col shadow-sm transition-all duration-300 ease-in-out relative`}
    >
      {/* Collapse Toggle Button */}
      <button
          onClick={onToggleCollapse}
          className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full flex items-center justify-center shadow-md z-10 transition-all duration-200 hover:from-blue-600 hover:to-blue-700 hover:shadow-lg active:scale-95 border border-blue-400"
      >
        {isCollapsed ? (
            <ChevronRight size={18} className="animate-pulse-gentle" />
        ) : (
            <ChevronLeft size={18} className="animate-pulse-gentle" />
        )}
      </button>

      {/* Header */}
      <div className="p-4 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 overflow-hidden flex items-center justify-center text-white">
            <MessageSquare size={18} />
          </div>
          {!isCollapsed && <h1 className="font-semibold text-gray-800">Tin nhắn</h1>}
        </div>
        {!isCollapsed && (
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100"
          >
            <Plus size={20} />
          </Button>
        )}
      </div>

      {/* Search */}
      {!isCollapsed && (
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Tìm kiếm tin nhắn"
              className="pl-9 bg-gray-50 border-gray-200 rounded-xl focus-visible:ring-blue-500"
            />
          </div>
        </div>
      )}

      {/* Recent Messages List */}
      <div className={`flex-1 overflow-y-auto ${isCollapsed ? "px-1" : "px-2"}`}>
        {recentMessages.map((message) => (
          <RecentMessageItem
            key={message.id}
            message={normalizeMessage(message)}
            isSelected={selectedContact?.name === message.contact.name}
            onClick={() =>
                onContactSelect({
                  id: message.contact.name ?? "temp-id", // hoặc message.contact.name nếu không có id
                  name: message.contact.name,
                  displayName: message.contact.name, // hoặc custom
                  avatar: "/placeholder.svg", // hoặc message.contact.avatar nếu có
                  tags: message.contact.tags,
                })
            }
            isCollapsed={isCollapsed}
          />
        ))}
      </div>

      {/* Bottom Button */}
      {!isCollapsed && (
        <div className="p-4 border-t border-gray-100">
          <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl py-5 shadow-sm">
            <Bell size={16} className="mr-2" />
            Quản lý thông báo
          </Button>
        </div>
      )}
    </div>
  )
}

function RecentMessageItem({ message, isSelected, onClick, isCollapsed } : RecentMessageItemProps) {
  const messagePreview = message.isTyping
    ? "đang nhập..."
    : message.lastMessage.length > 30 && !isCollapsed
      ? message.lastMessage.substring(0, 30) + "..."
      : message.lastMessage

  const getTagColor = (color:string) => {
    switch (color) {
      case "blue":
        return "bg-blue-100 text-blue-800"
      case "green":
        return "bg-green-100 text-green-800"
      case "red":
        return "bg-red-100 text-red-800"
      case "purple":
        return "bg-purple-100 text-purple-800"
      case "amber":
        return "bg-amber-100 text-amber-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const messageItem = (
    <div className="relative">
      <div
        className={`${isCollapsed ? "w-10 h-10" : "w-12 h-12"} rounded-full overflow-hidden shadow-sm transition-all duration-300`}
      >
        <Image
          src={`/placeholder.svg?height=48&width=48&text=${message.id}`}
          alt={message.contact.name}
          width={48}
          height={48}
          className="object-cover"
        />
      </div>
      {message.contact.online && (
        <div
          className={`absolute bottom-0 right-0 ${isCollapsed ? "w-3 h-3" : "w-3.5 h-3.5"} bg-green-500 rounded-full border-2 border-white shadow-sm`}
        ></div>
      )}
      {message.unread > 0 && !isCollapsed && (
        <div className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center">
          {message.unread}
        </div>
      )}
    </div>
  )

  if (isCollapsed) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div
              className={`flex justify-center p-2 my-1 rounded-xl cursor-pointer transition-all duration-200 relative ${
                isSelected ? "bg-gradient-to-r from-blue-50 to-blue-100 border-l-4 border-blue-500" : "hover:bg-gray-50"
              }`}
              onClick={onClick}
            >
              {messageItem}
              {message.unread > 0 && (
                <div className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs font-medium rounded-full w-4 h-4 flex items-center justify-center">
                  {message.unread}
                </div>
              )}
            </div>
          </TooltipTrigger>
          <TooltipContent side="right">
            <div>
              <div className="font-medium">{message.contact.name}</div>
              {message.contact.tags && message.contact.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-1">
                  {message.contact.tags.map((tag, idx) => (
                    <span key={idx} className={`text-xs px-1.5 py-0.5 rounded-full ${getTagColor(tag.color)}`}>
                      {tag.text}
                    </span>
                  ))}
                </div>
              )}
              <div className="text-xs text-gray-600 mt-1">{messagePreview}</div>
              <div className="text-xs text-gray-500 mt-1">{message.timestamp}</div>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }

  return (
    <div
      className={`flex items-center gap-3 p-3 my-1 rounded-xl cursor-pointer transition-all duration-200 ${
        isSelected ? "bg-gradient-to-r from-blue-50 to-blue-100 border-l-4 border-blue-500" : "hover:bg-gray-50"
      }`}
      onClick={onClick}
    >
      {messageItem}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 flex-wrap">
          <div className={`font-medium ${isSelected ? "text-blue-700" : "text-gray-800"}`}>{message.contact.name}</div>
          {message.contact.tags &&
            message.contact.tags.map((tag, idx) => (
              <span key={idx} className={`text-xs px-1.5 py-0.5 rounded-full ${getTagColor(tag.color)}`}>
                {tag.text}
              </span>
            ))}
        </div>
        <div className="flex justify-between items-center mt-0.5">
          <div
            className={`text-xs truncate ${
              message.isTyping ? "text-green-600 italic" : message.unread > 0 ? "text-gray-800" : "text-gray-500"
            }`}
          >
            {messagePreview}
          </div>
          <div className="text-xs text-gray-400 whitespace-nowrap ml-2">{message.timestamp}</div>
        </div>
      </div>
    </div>
  )
}

