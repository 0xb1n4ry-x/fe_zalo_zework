"use client"

import {useEffect, useRef, useState} from "react"
import Image from "next/image"
import {
  AlertCircle,
  AlertTriangle,
  BellOff,
  Calendar,
  Camera,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Coffee,
  Command,
  Edit,
  File,
  FileText,
  FileUp,
  Heart,
  ImageIcon as ImageIconLucide,
  Link2,
  Lock,
  MapPin,
  Maximize,
  MessageSquare,
  Mic,
  Minimize,
  MoreHorizontal,
  MoreVertical,
  Paperclip,
  PenSquare,
  Phone,
  Pin,
  Plus,
  Reply,
  Send,
  Smile,
  Tag,
  ThumbsUp,
  ThumbsUpIcon,
  Trash2, Upload,
  Users,
  Video,
  X,
} from "lucide-react"
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover"
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip"
import {Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog"
import {Switch} from "@/components/ui/switch"
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/components/ui/collapsible"
import {Label} from "@/components/ui/label"
import {Textarea} from "@/components/ui/textarea"
import {UserAvatar} from "./UserAvatar"
import useSocket from "@/hooks/useSocket";

export default function ChatInterface({ contact }) {
  const [message, setMessage] = useState("")
  const messagesEndRef = useRef(null)
  const [showChatInfo, setShowChatInfo] = useState(false)
  const [showQuickCommands, setShowQuickCommands] = useState(false)
  const [quickCommandFilter, setQuickCommandFilter] = useState("")
  const inputRef = useRef(null)
  const [showAddTemplate, setShowAddTemplate] = useState(false)
  const [newTemplate, setNewTemplate] = useState({command: "", description: "", template: ""})
  const [editingTemplate, setEditingTemplate] = useState(null)
  const [showManageTemplates, setShowManageTemplates] = useState(false)

  const [attachments, setAttachments] = useState([])
  const [showAttachmentOptions, setShowAttachmentOptions] = useState(false)
  const fileInputRef = useRef(null)
  const imageInputRef = useRef(null)

  // Thêm state để quản lý dropdown gắn thẻ người dùng
  const [showTagSuggestions, setShowTagSuggestions] = useState(false)
  const [tagFilter, setTagFilter] = useState("")
  const [tagSuggestions, setTagSuggestions] = useState([])
  const [cursorPosition, setCursorPosition] = useState(0)
  const [uploadProgress, setUploadProgress] = useState({});
  const [isUploading, setIsUploading] = useState(false);
  // Thêm state để quản lý thẻ người dùng
  const [showTagManager, setShowTagManager] = useState(false)
  const [availableTags, setAvailableTags] = useState([
    {id: 1, text: "Đồng nghiệp", color: "blue"},
    {id: 2, text: "Bạn bè", color: "green"},
    {id: 3, text: "Gia đình", color: "red"},
    {id: 4, text: "Công việc", color: "purple"},
    {id: 5, text: "VIP", color: "amber"},
    {id: 6, text: "Quan trọng", color: "orange"},
    {id: 7, text: "Khách hàng", color: "cyan"},
  ])
  const [newTag, setNewTag] = useState({text: "", color: "blue"})
  const [contactTags, setContactTags] = useState(contact.tags || [])

  // Sample messages for demonstration
  const [messages, setMessages] = useState([

  ])



  // Default quick commands
  const defaultQuickCommands = [
    {
      id: "greeting",
      command: "/hello",
      description: "Gửi lời chào",
      template: "Xin chào! Rất vui được gặp bạn.",
      icon: <ThumbsUpIcon size={16} className="text-blue-500"/>,
      isDefault: true,
    },
    {
      id: "meeting",
      command: "/meeting",
      description: "Đề xuất cuộc họp",
      template: "Bạn có thể tham gia cuộc họp vào lúc [giờ] ngày [ngày] không?",
      icon: <Calendar size={16} className="text-purple-500"/>,
      isDefault: true,
    },
    {
      id: "status",
      command: "/status",
      description: "Cập nhật trạng thái",
      template: "Cập nhật dự án: Đã hoàn thành [X]% công việc. Dự kiến hoàn thành vào [ngày].",
      icon: <CheckCircle2 size={16} className="text-green-500"/>,
      isDefault: true,
    },
    {
      id: "thanks",
      command: "/thanks",
      description: "Gửi lời cảm ơn",
      template: "Cảm ơn bạn rất nhiều vì đã [lý do]!",
      icon: <ThumbsUpIcon size={16} className="text-amber-500"/>,
      isDefault: true,
    },
    {
      id: "location",
      command: "/location",
      description: "Chia sẻ vị trí",
      template: "Tôi đang ở [địa điểm]. Đây là vị trí của tôi: [link bản đồ]",
      icon: <MapPin size={16} className="text-red-500"/>,
      isDefault: true,
    },
    {
      id: "file",
      command: "/file",
      description: "Yêu cầu tệp",
      template: "Bạn có thể gửi cho tôi [tên tệp] được không?",
      icon: <FileUp size={16} className="text-blue-500"/>,
      isDefault: true,
    },
    {
      id: "coffee",
      command: "/coffee",
      description: "Mời cà phê",
      template: "Bạn có muốn đi uống cà phê vào [thời gian] không?",
      icon: <Coffee size={16} className="text-amber-700"/>,
      isDefault: true,
    },
    {
      id: "urgent",
      command: "/urgent",
      description: "Tin nhắn khẩn cấp",
      template: "⚠️ KHẨN CẤP: [nội dung tin nhắn]",
      icon: <AlertCircle size={16} className="text-red-500"/>,
      isDefault: true,
    },
    {
      id: "time",
      command: "/time",
      description: "Chèn thời gian hiện tại",
      template: new Date().toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"}),
      icon: <Clock size={16} className="text-gray-500"/>,
      isDefault: true,
    },
  ]

  // Custom quick commands (would be stored in localStorage or a database in a real app)
  const [customQuickCommands, setCustomQuickCommands] = useState([
    {
      id: "custom1",
      command: "/deadline",
      description: "Thông báo deadline",
      template: "Xin nhắc deadline dự án [tên dự án] là [ngày]. Vui lòng hoàn thành đúng hạn.",
      icon: <Clock size={16} className="text-orange-500"/>,
      isDefault: false,
    },
    {
      id: "custom2",
      command: "/address",
      description: "Địa chỉ công ty",
      template: "Địa chỉ công ty: Tầng 8, Tòa nhà Vinipr, 123 Đường Nguyễn Huệ, Quận 1, TP.HCM",
      icon: <MapPin size={16} className="text-blue-500"/>,
      isDefault: false,
    },
  ])

  // Combine default and custom commands
  const quickCommands = [...defaultQuickCommands, ...customQuickCommands]

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({behavior: "smooth"})
  }, [messages])

  // Thêm hàm để xử lý thêm/xóa thẻ
  const addTagToContact = (tag) => {
    // Kiểm tra xem thẻ đã tồn tại chưa
    if (!contactTags.some((t) => t.text === tag.text)) {
      const updatedTags = [...contactTags, tag]
      setContactTags(updatedTags)
    }
  }

  const removeTagFromContact = (tagText) => {
    const updatedTags = contactTags.filter((tag) => tag.text !== tagText)
    setContactTags(updatedTags)
  }

  const handleAddNewTag = () => {
    if (newTag.text.trim()) {
      const tag = {
        id: Date.now(),
        text: newTag.text.trim(),
        color: newTag.color,
      }
      setAvailableTags([...availableTags, tag])
      addTagToContact(tag)
      setNewTag({text: "", color: "blue"})
    }
  }

  // Thêm hàm để lấy màu thẻ
  const getTagColorClass = (color) => {
    switch (color) {
      case "blue":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "green":
        return "bg-green-100 text-green-800 border-green-200"
      case "red":
        return "bg-red-100 text-red-800 border-red-200"
      case "purple":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "amber":
        return "bg-amber-100 text-amber-800 border-amber-200"
      case "orange":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "cyan":
        return "bg-cyan-100 text-cyan-800 border-cyan-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  // Thêm state để quản lý modal xem ảnh
  const [imageViewerOpen, setImageViewerOpen] = useState(false)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [currentGallery, setCurrentGallery] = useState([])

  // Thêm hàm để mở modal xem ảnh
  const openImageViewer = (images, index = 0) => {
    setCurrentGallery(images)
    setSelectedImageIndex(index)
    setImageViewerOpen(true)
  }

  // Thêm hàm để đóng modal xem ảnh
  const closeImageViewer = () => {
    setImageViewerOpen(false)
    setCurrentGallery([])
    setSelectedImageIndex(0)
  }

  // Thêm hàm để điều hướng ảnh trong modal
  const navigateImage = (direction) => {
    if (direction === "next") {
      setSelectedImageIndex((prev) => (prev + 1) % currentGallery.length)
    } else {
      setSelectedImageIndex((prev) => (prev - 1 + currentGallery.length) % currentGallery.length)
    }
  }

  // Sửa lại phần xử lý file và hiển thị đính kèm

  // Thêm state để lưu trữ nội dung xem trước của file
  const [filePreviewContents, setFilePreviewContents] = useState({})
  const [showFilePreview, setShowFilePreview] = useState(false)
  const [currentPreviewFile, setCurrentPreviewFile] = useState(null)

  // Thêm hàm để đọc nội dung file văn bản
  const readTextFile = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        resolve(e.target.result)
      }
      reader.onerror = (e) => {
        reject(e)
      }
      reader.readAsText(file)
    })
  }

  // Thay đổi hàm handleFileSelect để xử lý file tốt hơn
  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files || [])
    if (files.length === 0) return

    const newAttachments = files.map((file) => {
      // Xác định loại file
      const isImage = file.type.startsWith("image/")
      const isTextFile =
          file.type === "text/plain" ||
          file.name.endsWith(".txt") ||
          file.name.endsWith(".doc") ||
          file.name.endsWith(".docx") ||
          file.type === "application/msword" ||
          file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"

      // Tạo một đối tượng đính kèm mới
      const attachment = {
        id: Date.now() + Math.random().toString(36).substring(2, 9),
        file,
        type: isImage ? "image" : isTextFile ? "text" : "file",
        name: file.name,
        url: URL.createObjectURL(file),
        caption: "", // Thêm trường caption
      }

      // Nếu là file văn bản, đọc nội dung để xem trước
      if (isTextFile) {
        readTextFile(file)
            .then((content) => {
              // Lưu nội dung xem trước (giới hạn 500 ký tự)
              setFilePreviewContents((prev) => ({
                ...prev,
                [attachment.id]: content.substring(0, 500) + (content.length > 500 ? "..." : ""),
              }))
            })
            .catch((err) => {
              console.error("Không thể đọc file:", err)
            })
      }

      return attachment
    })

    setAttachments((prev) => [...prev, ...newAttachments])
    // Reset input để có thể chọn lại cùng một file
    e.target.value = null
  }

  // Thêm hàm xử lý dán ảnh từ clipboard sau hàm handleFileSelect
  const handlePasteFromClipboard = async () => {
    try {
      const items = await navigator.clipboard.read()
      let hasImage = false

      for (const item of items) {
        for (const type of item.types) {
          if (type.startsWith("image/")) {
            const blob = await item.getType(type)
            const file = new File([blob], `pasted-image-${Date.now()}.png`, {type})

            const newAttachment = {
              id: Date.now() + Math.random().toString(36).substring(2, 9),
              file,
              type: "image",
              name: file.name,
              url: URL.createObjectURL(file),
              caption: "", // Thêm trường caption
            }

            setAttachments((prev) => [...prev, newAttachment])
            hasImage = true
            break
          }
        }
        if (hasImage) break
      }

      if (!hasImage) {
        console.log("No image found in clipboard")
      }
    } catch (error) {
      console.error("Failed to read clipboard contents: ", error)
    }
  }

  // Thêm hàm xử lý sự kiện paste trên toàn bộ component
  const handlePaste = (e) => {
    const items = e.clipboardData.items
    let hasImage = false

    for (const item of items) {
      if (item.type.startsWith("image/")) {
        const file = item.getAsFile()
        const newAttachment = {
          id: Date.now() + Math.random().toString(36).substring(2, 9),
          file,
          type: "image",
          name: `pasted-image-${Date.now()}.png`,
          url: URL.createObjectURL(file),
          caption: "", // Thêm trường caption
        }

        setAttachments((prev) => [...prev, newAttachment])
        hasImage = true
        break
      }
    }

    if (hasImage) {
      e.preventDefault()
    }
  }

  // Thêm useEffect để xử lý sự kiện paste
  useEffect(() => {
    document.addEventListener("paste", handlePaste)
    return () => {
      document.removeEventListener("paste", handlePaste)
    }
  }, [])


  useEffect(() => {
    // Cleanup function để giải phóng các URL đối tượng khi component unmount
    return () => {
      attachments.forEach((attachment) => {
        if (attachment.url && attachment.url.startsWith("blob:")) {
          URL.revokeObjectURL(attachment.url)
        }
      })
    }
  }, [attachments])

  // Sửa lại phần hiển thị đính kèm trong tin nhắn

  // Sửa lại cách hiển thị đính kèm trong tin nhắn
  const renderAttachment = (attachment) => {
    if (attachment.type === "image") {
      return (
          <div className="max-w-xs mb-2">
            <img
                src={attachment.url || "/placeholder.svg"}
                alt={attachment.name || "Attached image"}
                className="w-full h-auto object-contain max-h-[200px]"
            />
          </div>
      )
    } else {
      return (
          <a
              href={attachment.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 p-2 rounded-md bg-gray-100 hover:bg-gray-200 mb-2 max-w-xs"
          >
            <FileText size={16} className="text-gray-500"/>
            <div className="text-sm truncate text-gray-700">{attachment.name}</div>
          </a>
      )
    }
  }

  // Hàm để hiển thị ảnh trong tin nhắn theo kiểu Facebook
  const renderImageGrid = (attachments, sender) => {
    // Lọc ra chỉ các attachment là ảnh
    const images = attachments.filter((att) => att.type === "image")

    if (images.length === 0) return null

    // Tạo mảng URL ảnh để sử dụng trong modal xem ảnh
    const imageUrls = images.map((img) => img.url)

    // Hiển thị theo số lượng ảnh
    if (images.length === 1) {
      // Một ảnh: hiển thị đầy đủ với chú thích
      return (
          <div className="cursor-pointer mb-2 relative" onClick={() => openImageViewer(imageUrls, 0)}>
            <img
                src={images[0].url || "/placeholder.svg"}
                alt={images[0].name || "Attached image"}
                className="w-full h-auto object-cover"
                style={{maxHeight: "200px"}}
            />
            {images[0].caption && (
                <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-yellow-400 p-2 text-sm font-medium">
                  {images[0].caption}
                </div>
            )}
          </div>
      )
    } else if (images.length === 2) {
      // Hai ảnh: hiển thị cạnh nhau
      return (
          <div className="grid grid-cols-2 gap-1 mb-2">
            {images.map((image, index) => (
                <div
                    key={image.id}
                    className="cursor-pointer aspect-square relative"
                    onClick={() => openImageViewer(imageUrls, index)}
                >
                  <img
                      src={image.url || "/placeholder.svg"}
                      alt={image.name || `Image ${index + 1}`}
                      className="w-full h-full object-cover"
                  />
                  {image.caption && (
                      <div
                          className="absolute bottom-0 left-0 right-0 bg-black/70 text-yellow-400 p-1 text-xs font-medium">
                        {image.caption}
                      </div>
                  )}
                </div>
            ))}
          </div>
      )
    } else if (images.length === 3) {
      // Ba ảnh: 1 lớn bên trái, 2 nhỏ bên phải
      return (
          <div className="grid grid-cols-2 gap-1 mb-2">
            <div className="cursor-pointer row-span-2 relative" onClick={() => openImageViewer(imageUrls, 0)}>
              <img
                  src={images[0].url || "/placeholder.svg"}
                  alt={images[0].name || "Image 1"}
                  className="w-full h-full object-cover"
                  style={{height: "200px"}}
              />
              {images[0].caption && (
                  <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-yellow-400 p-1 text-xs font-medium">
                    {images[0].caption}
                  </div>
              )}
            </div>
            <div className="cursor-pointer relative" onClick={() => openImageViewer(imageUrls, 1)}>
              <img
                  src={images[1].url || "/placeholder.svg"}
                  alt={images[1].name || "Image 2"}
                  className="w-full h-full object-cover"
                  style={{height: "99px"}}
              />
              {images[1].caption && (
                  <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-yellow-400 p-1 text-xs font-medium">
                    {images[1].caption}
                  </div>
              )}
            </div>
            <div className="cursor-pointer relative" onClick={() => openImageViewer(imageUrls, 2)}>
              <img
                  src={images[2].url || "/placeholder.svg"}
                  alt={images[2].name || "Image 3"}
                  className="w-full h-full object-cover"
                  style={{height: "99px"}}
              />
              {images[2].caption && (
                  <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-yellow-400 p-1 text-xs font-medium">
                    {images[2].caption}
                  </div>
              )}
            </div>
          </div>
      )
    } else if (images.length === 4) {
      // Bốn ảnh: lưới 2x2
      return (
          <div className="grid grid-cols-2 gap-1 mb-2">
            {images.map((image, index) => (
                <div
                    key={image.id}
                    className="cursor-pointer aspect-square relative"
                    onClick={() => openImageViewer(imageUrls, index)}
                >
                  <img
                      src={image.url || "/placeholder.svg"}
                      alt={image.name || `Image ${index + 1}`}
                      className="w-full h-full object-cover"
                  />
                  {image.caption && (
                      <div
                          className="absolute bottom-0 left-0 right-0 bg-black/70 text-yellow-400 p-1 text-xs font-medium">
                        {image.caption}
                      </div>
                  )}
                </div>
            ))}
          </div>
      )
    } else {
      // Nhiều hơn 4 ảnh: hiển thị 4 ảnh đầu + chỉ báo số ảnh còn lại
      return (
          <div className="grid grid-cols-2 gap-1 mb-2">
            {images.slice(0, 3).map((image, index) => (
                <div
                    key={image.id}
                    className={`cursor-pointer ${index === 0 ? "row-span-2" : ""} relative`}
                    onClick={() => openImageViewer(imageUrls, index)}
                >
                  <img
                      src={image.url || "/placeholder.svg"}
                      alt={image.name || `Image ${index + 1}`}
                      className="w-full h-full object-cover"
                      style={index === 0 ? {height: "200px"} : {height: "99px"}}
                  />
                  {image.caption && (
                      <div
                          className="absolute bottom-0 left-0 right-0 bg-black/70 text-yellow-400 p-1 text-xs font-medium">
                        {image.caption}
                      </div>
                  )}
                </div>
            ))}
            <div className="cursor-pointer relative" onClick={() => openImageViewer(imageUrls, 3)}>
              <img
                  src={images[3].url || "/placeholder.svg"}
                  alt={images[3].name || "Image 4"}
                  className="w-full h-full object-cover"
                  style={{height: "99px"}}
              />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <span className="text-white font-medium text-lg">+{images.length - 4}</span>
              </div>
              {images[3].caption && (
                  <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-yellow-400 p-1 text-xs font-medium">
                    {images[3].caption}
                  </div>
              )}
            </div>
          </div>
      )
    }
  }

  // Cập nhật hàm renderFileAttachments để hiển thị xem trước file văn bản
  const renderAttachmentWithProgress = (attachment) => {
    const progress = uploadProgress[attachment.name] || 0;
    const isUploading = progress > 0 && progress < 100;

    return (
        <div key={attachment.id} className="relative group">
          {attachment.type === "image" ? (
              <div className="w-full max-w-[200px]">
                <div className="w-full h-24 bg-white relative">
                  <img
                      src={attachment.url || "/placeholder.svg"}
                      alt={attachment.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/placeholder.svg?height=80&width=80&text=IMG";
                      }}
                  />

                  {/* Phần hiển thị tiến trình cho ảnh */}
                  {isUploading && (
                      <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center">
                        <Upload size={24} className="text-white mb-2" />
                        <div className="w-3/4 bg-white/30 h-1.5 rounded-full overflow-hidden">
                          <div
                              className="bg-white h-full"
                              style={{ width: `${progress}%` }}
                          ></div>
                        </div>
                        <div className="text-white text-xs mt-1">{progress}%</div>
                      </div>
                  )}
                </div>
                <input
                    type="text"
                    placeholder="Thêm chú thích..."
                    className="w-full text-xs p-1 border-t border-gray-200"
                    value={attachment.caption || ""}
                    onChange={(e) => {
                      const updatedAttachments = attachments.map((att) =>
                          att.id === attachment.id ? { ...att, caption: e.target.value } : att
                      );
                      setAttachments(updatedAttachments);
                    }}
                />
              </div>
          ) : (
              <div className="w-32 h-16 rounded-lg border border-gray-200 bg-white flex flex-col items-center justify-center p-1 shadow-sm relative">
                <FileText size={20} className="text-gray-500 mb-1" />
                <div className="text-xs text-gray-700 truncate w-full text-center">
                  {attachment.name}
                </div>

                {/* Phần hiển thị tiến trình cho file khác */}
                {isUploading && (
                    <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center rounded-lg">
                      <div className="w-3/4 bg-white/30 h-1.5 rounded-full overflow-hidden">
                        <div
                            className="bg-white h-full"
                            style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                      <div className="text-white text-xs mt-1">{progress}%</div>
                    </div>
                )}
              </div>
          )}

          {/* Nút xóa file đính kèm */}
          <button
              type="button"
              className="absolute -top-2 -right-2 bg-white hover:bg-gray-100 rounded-full p-1 shadow-md opacity-0 group-hover:opacity-100 transition-opacity border border-gray-200"
              onClick={() => removeAttachment(attachment.id)}
              disabled={isUploading}
          >
            <X size={14} className="text-gray-500" />
          </button>
        </div>
    );
  };

  const removeAttachment = (id) => {
    setAttachments(attachments.filter((attachment) => attachment.id !== id))
  }
  const uploadFileToS3 = async (file: XMLHttpRequestBodyInit | Document | null | undefined) => {
    try {
      // Cập nhật trạng thái tiến trình upload bắt đầu ở 0%
      setUploadProgress(prev => ({
        ...prev,
        [file.name]: 0
      }));


      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/s3-upload`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({
          fileName: file.name,
          fileType: file.type,

        }),
      });

      if (!response.ok) {
        throw new Error('Không thể lấy được URL upload');
      }

      const { uploadUrl, fileKey, publicUrl } = await response.json();
      console.log("be - > ", uploadUrl, fileKey, publicUrl);
      // Bước 2: Upload file với theo dõi tiến trình
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        // Theo dõi tiến trình upload
        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            const percentComplete = Math.round((event.loaded / event.total) * 100);
            setUploadProgress(prev => ({
              ...prev,
              [file.name]: percentComplete
            }));
          }
        };

        xhr.onload = () => {
          if (xhr.status === 200) {
            // Cập nhật tiến trình đạt 100% khi hoàn thành
            setUploadProgress(prev => ({
              ...prev,
              [file.name]: 100
            }));

            resolve({
              fileKey,
              publicUrl,
            });
          } else {
            reject(new Error(`Upload thất bại với mã trạng thái: ${xhr.status}`));
          }
        };

        xhr.onerror = () => {
          reject(new Error('Upload thất bại'));
        };

        xhr.open('PUT', uploadUrl, true);
        if ("type" in file) {
          xhr.setRequestHeader('Content-Type', file.type);
        }
        xhr.send(file);

      });
    } catch (error) {
      console.error('Lỗi khi upload file lên S3:', error);
      throw error;
    }
  };
  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (message.trim() || attachments.length > 0) {
      // Thiết lập trạng thái đang upload
      setIsUploading(true);
      const rawData = localStorage.getItem('dataZalo');
      let ld;
      try {
        if (typeof rawData === "string") {
          ld = JSON.parse(rawData);
        }
      } catch (e) {
        throw new Error("Invalid data in localStorage");
      }

      if (!Array.isArray(ld) || ld.length === 0) {
        throw new Error("No authentication data found");
      }

      const s = ld[0].zpw_sek;
      const e = ld[0].zpw_enk;
      const i = ld[0].imei;
      const uid = contact.userId || contact.groupId
      const uploadedAttachments = [];
      try {
        // Upload tất cả các file đính kèm lên S3 trước


        if (attachments.length > 0) {
          // Xử lý từng file đính kèm
          for (const attachment of attachments) {
            try {
              const payloadFile = {uid : uid, e : e, i: i, s: s, isgroup : contact.isGroup};
              // Upload file lên S3
              const { publicUrl } = await uploadFileToS3(attachment.file);

              // Thêm thông tin file đã upload vào danh sách
              uploadedAttachments.push({
                id: attachment.id,
                type: attachment.type,
                name: attachment.name,
                size: attachment.file.size,
                url: publicUrl, // Sử dụng URL S3 thay vì URL cục bộ
                caption: attachment.caption,
              });
               await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/upf`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },

                body: JSON.stringify({
                  files : uploadedAttachments,
                  payloadFile
                }),
              });
            } catch (error) {
              console.error(`Lỗi khi upload ${attachment.name}:`, error);
              // Có thể hiển thị thông báo lỗi cho người dùng
            }
          }
        }
      }catch (error) {
        console.log(error)
      }
        const newMessage = {
          id: messages.length + 1,
          sender: "me",
          text: message,
          time: new Date().toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"}),
          reactions: [],
          isPinned: false,
          isRecalled: false,
          file: uploadedAttachments,
        };


      const content = newMessage.text;
      const payload = {uid : uid, content: content, e : e, i: i, s: s};
      console.log(newMessage.file)
      let response;
      try {
        if(contact.isGroup){
          console.log("isGroup")
           response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/mtg`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
          });
        } else {
           response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/mtu`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
          });
        }
        console.log(payload);
        const result = await response.json();
        console.log('Response from backend:', result);
      } catch (error) {
        console.error('Error sending data:', error);
      }
      setMessages([...messages, newMessage])
      setMessage("")
      setAttachments([])
      setUploadProgress({});
    }
  }
  const addReaction = (messageId, emoji) => {
    setMessages(
        messages.map((msg) => {
          if (msg.id === messageId) {
            const existingReactionIndex = msg.reactions.findIndex((r) => r.emoji === emoji)
            if (existingReactionIndex >= 0) {
              // Reaction already exists, increment count
              const updatedReactions = [...msg.reactions]
              updatedReactions[existingReactionIndex] = {
                ...updatedReactions[existingReactionIndex],
                count: updatedReactions[existingReactionIndex].count + 1,
              }
              return { ...msg, reactions: updatedReactions }
            } else {
              // Add new reaction
              return { ...msg, reactions: [...msg.reactions, { emoji, count: 1 }] }
            }
          }
          return msg
        }),
    )
  }

  const togglePinMessage = (messageId: any) => {
    setMessages(
        messages.map((msg) => {
          if (msg.id === messageId) {
            return { ...msg, isPinned: !msg.isPinned }
          }
          return msg
        }),
    )
  }

  const recallMessage = (messageId) => {
    setMessages(
        messages.map((msg) => {
          if (msg.id === messageId) {
            return { ...msg, isRecalled: true }
          }
          return msg
        }),
    )
  }

  // Thêm hàm để xử lý khi nhập @ trong tin nhắn
  const handleInputChange = (e) => {
    const value = e.target.value
    const cursorPos = e.target.selectionStart
    setMessage(value)
    setCursorPosition(cursorPos)

    // Kiểm tra xem có đang nhập @ không và đang ở trong cuộc trò chuyện nhóm
    const textBeforeCursor = value.substring(0, cursorPos)
    const atSignIndex = textBeforeCursor.lastIndexOf("@")

    if (atSignIndex !== -1 && (atSignIndex === 0 || textBeforeCursor[atSignIndex - 1] === " ") && contact.isGroup) {
      const query = textBeforeCursor.substring(atSignIndex + 1)
      // Nếu có khoảng trắng sau @ thì không hiển thị gợi ý
      if (!query.includes(" ")) {
        setTagFilter(query.toLowerCase())
        // Nếu là nhóm, lấy danh sách thành viên từ contact.members
        if (contact.members && contact.members.length > 0) {
          const filtered = contact.members.filter((member) => member.name.toLowerCase().includes(query.toLowerCase()))
          setTagSuggestions(filtered)
          setShowTagSuggestions(filtered.length > 0)
          setShowQuickCommands(false)
        } else {
          // Fallback nếu không có thành viên
          setShowTagSuggestions(false)
        }
        return
      }
    }

    setShowTagSuggestions(false)

    // Check if the input starts with '/' to show quick commands
    if (value.startsWith("/")) {
      setShowQuickCommands(true)
      setQuickCommandFilter(value.substring(1).toLowerCase())
    } else {
      setShowQuickCommands(false)
    }
  }

  // Thêm hàm để chèn tag vào tin nhắn
  const insertTag = (contact) => {
    const beforeCursor = message.substring(0, cursorPosition)
    const atSignIndex = beforeCursor.lastIndexOf("@")

    if (atSignIndex !== -1) {
      const afterCursor = message.substring(cursorPosition)
      const newMessage = beforeCursor.substring(0, atSignIndex) + `@${contact.name} ` + afterCursor

      setMessage(newMessage)
      setShowTagSuggestions(false)

      // Focus lại vào input và đặt con trỏ sau tag
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus()
          const newCursorPos = atSignIndex + contact.displayName.length + 2 // +2 for @ and space
          inputRef.current.setSelectionRange(newCursorPos, newCursorPos)
        }
      }, 0)
    }
  }

  // Thêm hàm để định dạng tin nhắn với các tag
  const formatMessageWithTags = (text) => {
    if (!text) return null

    // Tìm tất cả các tag trong tin nhắn
    const parts = []
    const regex = /@([a-zA-Z0-9À-ỹ\s]+?)(?=\s|$)/g
    let lastIndex = 0
    let match

    while ((match = regex.exec(text)) !== null) {
      // Thêm phần text trước tag
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index))
      }

      // Thêm tag với định dạng đặc biệt
      parts.push(
          <span key={match.index} className="bg-blue-100 text-blue-800 rounded px-1 py-0.5 mx-0.5">
          {match[0]}
        </span>,
      )

      lastIndex = match.index + match[0].length
    }

    // Thêm phần text còn lại
    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex))
    }

    return parts.length > 0 ? parts : text
  }

  const insertQuickCommand = (template) => {
    setMessage(template)
    setShowQuickCommands(false)
    inputRef.current?.focus()
  }

  const handleAddTemplate = () => {
    if (newTemplate.command && newTemplate.description && newTemplate.template) {
      // Ensure command starts with /
      const command = newTemplate.command.startsWith("/") ? newTemplate.command : `/${newTemplate.command}`

      if (editingTemplate) {
        // Update existing template
        setCustomQuickCommands(
            customQuickCommands.map((cmd) =>
                cmd.id === editingTemplate.id
                    ? {
                      ...cmd,
                      command,
                      description: newTemplate.description,
                      template: newTemplate.template,
                    }
                    : cmd,
            ),
        )
        setEditingTemplate(null)
      } else {
        // Add new template
        const newCmd = {
          id: `custom${Date.now()}`,
          command,
          description: newTemplate.description,
          template: newTemplate.template,
          icon: <MessageSquare size={16} className="text-blue-500" />,
          isDefault: false,
        }
        setCustomQuickCommands([...customQuickCommands, newCmd])
      }

      // Reset form
      setNewTemplate({ command: "", description: "", template: "" })
      setShowAddTemplate(false)
    }
  }

  const handleEditTemplate = (template) => {
    setEditingTemplate(template)
    setNewTemplate({
      command: template.command,
      description: template.description,
      template: template.template,
    })
    setShowManageTemplates(false)
    setShowAddTemplate(true)
  }

  const handleDeleteTemplate = (templateId) => {
    setCustomQuickCommands(customQuickCommands.filter((cmd) => cmd.id !== templateId))
  }

  // Get pinned messages
  const pinnedMessages = messages.filter((msg) => msg.isPinned)

  return (
      <div className="flex-1 flex flex-col bg-white">
        {/* Chat Header */}
        <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-white shadow-sm">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-12 h-12 rounded-full overflow-hidden shadow-sm">
                <UserAvatar
                    avatar={contact.avatar}
                    displayName={contact.displayName}
                    // isActive={contact.isActive}
                    lastActionTime={contact.lastActionTime}
                />
              </div>
              {/*{contact.isActive && (*/}
              {/*    <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white"></div>*/}
              {/*)}*/}
            </div>
            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <div className="font-semibold text-gray-800">{contact.displayName}</div>
                {contact.tags &&
                    contact.tags.map((tag, idx) => (
                        <span
                            key={idx}
                            className={`text-xs px-1.5 py-0.5 rounded-full ${
                                tag.color === "blue"
                                    ? "bg-blue-100 text-blue-800"
                                    : tag.color === "green"
                                        ? "bg-green-100 text-green-800"
                                        : tag.color === "red"
                                            ? "bg-red-100 text-red-800"
                                            : tag.color === "purple"
                                                ? "bg-purple-100 text-purple-800"
                                                : tag.color === "amber"
                                                    ? "bg-amber-100 text-amber-800"
                                                    : "bg-gray-100 text-gray-800"
                            }`}
                        >
                    {tag.text}
                  </span>
                    ))}
              </div>

            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
                variant="ghost"
                size="icon"
                className="rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100"
            >
              <Phone size={20} />
            </Button>
            <Button
                variant="ghost"
                size="icon"
                className="rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100"
            >
              <Video size={20} />
            </Button>
            <Button
                variant="ghost"
                size="icon"
                className="rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                onClick={() => setShowChatInfo(true)}
            >
              <MoreVertical size={20} />
            </Button>
          </div>
        </div>

        {/* Pinned Messages */}
        {pinnedMessages.length > 0 && (
            <div className="bg-blue-50 p-3 border-b border-blue-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-blue-700">
                  <Pin size={16} />
                  <span>{pinnedMessages.length} tin nhắn đã ghim</span>
                </div>
                <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 text-xs text-blue-600 hover:text-blue-800 hover:bg-blue-100"
                >
                  Xem tất cả
                </Button>
              </div>
            </div>
        )}

        {/* Messages Area */}
        <div className="flex-1 p-4 overflow-y-auto bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-4xl mx-auto space-y-6">
            {messages.map((msg) => (
                <div key={msg.id} className={`group flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}>
                  {msg.sender === "them" && (
                      <div className="w-8 h-8 rounded-full overflow-hidden mr-2 mt-1">
                        <Image
                            src="/placeholder.svg?height=32&width=32"
                            alt="Contact"
                            width={32}
                            height={32}
                            className="object-cover"
                        />
                      </div>
                  )}
                  <div className="relative max-w-[75%]">
                    {/* Message bubble */}
                    <div
                        className={`p-4 rounded-2xl shadow-sm ${
                            msg.isRecalled
                                ? "bg-gray-100 text-gray-500 italic"
                                : msg.sender === "me"
                                    ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-br-none"
                                    : "bg-white border border-gray-100 rounded-bl-none"
                        }`}
                    >
                      {msg.isPinned && (
                          <div
                              className={`flex items-center gap-1 text-xs mb-1 ${msg.sender === "me" ? "text-blue-100" : "text-blue-500"}`}
                          >
                            <Pin size={12} />
                            <span>Đã ghim</span>
                          </div>
                      )}

                      {msg.isRecalled ? (
                          <p className="text-sm">Tin nhắn đã bị thu hồi</p>
                      ) : (
                          <>
                            {msg.text && <p className="text-sm mb-2">{formatMessageWithTags(msg.text)}</p>}

                            {/* Display attachments */}
                            {msg.attachments && msg.attachments.length > 0 && (
                                <>
                                  {/* Hiển thị ảnh theo kiểu Facebook */}
                                  {renderImageGrid(msg.attachments, msg.sender)}

                                  {/* Hiển thị các file không phải ảnh */}
                                  {renderAttachmentWithProgress(msg.attachments, msg.sender)}
                                </>
                            )}
                          </>
                      )}

                      <div className={`text-xs mt-2 ${msg.sender === "me" ? "text-blue-100" : "text-gray-400"}`}>
                        {msg.time}
                      </div>
                    </div>

                    {/* Message actions */}
                    {!msg.isRecalled && (
                        <div
                            className={`absolute ${msg.sender === "me" ? "left-0 -translate-x-full" : "right-0 translate-x-full"} top-2 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1`}
                        >
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 rounded-full bg-white shadow-sm hover:bg-gray-100"
                                    onClick={() => addReaction(msg.id, "👍")}
                                >
                                  <ThumbsUp size={14} />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Thích</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>

                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 rounded-full bg-white shadow-sm hover:bg-gray-100"
                                    onClick={() => addReaction(msg.id, "❤️")}
                                >
                                  <Heart size={14} />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Yêu thích</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>

                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 rounded-full bg-white shadow-sm hover:bg-gray-100"
                              >
                                <MoreHorizontal size={14} />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-48 p-1">
                              <div className="space-y-1">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="w-full justify-start text-sm"
                                    onClick={() => togglePinMessage(msg.id)}
                                >
                                  <Pin size={14} className="mr-2" />
                                  {msg.isPinned ? "Bỏ ghim" : "Ghim tin nhắn"}
                                </Button>
                                <Button variant="ghost" size="sm" className="w-full justify-start text-sm">
                                  <Reply size={14} className="mr-2" />
                                  Trả lời
                                </Button>
                                {msg.sender === "me" && (
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="w-full justify-start text-sm text-red-500 hover:text-red-600 hover:bg-red-50"
                                        onClick={() => recallMessage(msg.id)}
                                    >
                                      <Trash2 size={14} className="mr-2" />
                                      Thu hồi
                                    </Button>
                                )}
                              </div>
                            </PopoverContent>
                          </Popover>
                        </div>
                    )}

                    {/* Reactions display */}
                    {msg.reactions.length > 0 && (
                        <div
                            className={`absolute ${msg.sender === "me" ? "right-0" : "left-0"} -bottom-3 flex items-center gap-1 bg-white rounded-full px-2 py-1 shadow-sm border border-gray-100`}
                        >
                          {msg.reactions.map((reaction, index) => (
                              <div key={index} className="flex items-center">
                                <span className="text-sm mr-1">{reaction.emoji}</span>
                                {reaction.count > 1 && <span className="text-xs text-gray-500">{reaction.count}</span>}
                              </div>
                          ))}
                        </div>
                    )}
                  </div>
                </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Message Input */}
        <div className="p-4 border-t border-gray-100 bg-white relative">
          <form onSubmit={handleSendMessage} className="flex items-center gap-2">
            {/* Sửa lại phần input file để đảm bảo nó hoạt động đúng

          // Thay đổi cách xử lý khi nhấp vào nút đính kèm */}
            <Popover open={showAttachmentOptions} onOpenChange={setShowAttachmentOptions}>
              <PopoverTrigger asChild>
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                >
                  <Paperclip size={20} />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-48 p-1">
                <div className="space-y-1">
                  <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start text-sm"
                      onClick={() => {
                        if (imageInputRef.current) {
                          imageInputRef.current.click()
                        }
                        setShowAttachmentOptions(false)
                      }}
                  >
                    <Camera size={14} className="mr-2" />
                    Hình ảnh
                  </Button>
                  <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start text-sm"
                      onClick={() => {
                        if (fileInputRef.current) {
                          fileInputRef.current.click()
                        }
                        setShowAttachmentOptions(false)
                      }}
                  >
                    <File size={14} className="mr-2" />
                    Tệp đính kèm
                  </Button>
                  <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start text-sm"
                      onClick={() => {
                        handlePasteFromClipboard()
                        setShowAttachmentOptions(false)
                      }}
                  >
                    <Paperclip size={14} className="mr-2" />
                    Dán từ clipboard
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
            {/* Thêm dropdown gợi ý tag vào phần input tin nhắn */}
            <div className="flex-1 relative">
              {/* Tìm đoạn code hiển thị attachments trong phần input và thay thế bằng đoạn code sau: */}
              {/* Cập nhật phần hiển thị ảnh trong phần đính kèm trước khi gửi */}
              {attachments.length > 0 && (
                  <div className="flex flex-wrap gap-3 mb-3 p-3 bg-gray-50 rounded-lg">
                    {attachments.map((attachment) => (
                        <div key={attachment.id} className="relative group">
                          {attachment.type === "image" ? (
                              <div className="w-full max-w-[200px]">
                                <div className="w-full h-24 bg-white">
                                  <img
                                      src={attachment.url || "/placeholder.svg"}
                                      alt={attachment.name}
                                      className="w-full h-full object-cover"
                                      onError={(e) => {
                                        e.target.onerror = null
                                        e.target.src = "/placeholder.svg?height=80&width=80&text=IMG"
                                      }}
                                  />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Thêm chú thích..."
                                    className="w-full text-xs p-1 border-t border-gray-200"
                                    value={attachment.caption || ""}
                                    onChange={(e) => {
                                      const updatedAttachments = attachments.map((att) =>
                                          att.id === attachment.id ? { ...att, caption: e.target.value } : att,
                                      )
                                      setAttachments(updatedAttachments)
                                    }}
                                />
                              </div>
                          ) : (
                              <div className="w-32 h-16 rounded-lg border border-gray-200 bg-white flex flex-col items-center justify-center p-1 shadow-sm">
                                <FileText size={20} className="text-gray-500 mb-1" />
                                <div className="text-xs text-gray-700 truncate w-full text-center">{attachment.name}</div>
                              </div>
                          )}
                          <button
                              type="button"
                              className="absolute -top-2 -right-2 bg-white hover:bg-gray-100 rounded-full p-1 shadow-md opacity-0 group-hover:opacity-100 transition-opacity border border-gray-200"
                              onClick={() => removeAttachment(attachment.id)}
                          >
                            <X size={14} className="text-gray-500" />
                          </button>
                        </div>
                    ))}
                  </div>
              )}
              <Input
                  ref={inputRef}
                  value={message}
                  onChange={handleInputChange}
                  placeholder={`Nhập tin nhắn... ${contact.isGroup ? "(thử gõ / để xem tin nhắn nhanh hoặc @ để gắn thẻ)" : "(thử gõ / để xem tin nhắn nhanh)"}`}
                  className="pr-20 py-6 rounded-full border-gray-200 focus-visible:ring-blue-500"
                  title="Bạn cũng có thể dán ảnh trực tiếp từ clipboard (Ctrl+V)"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="rounded-full text-gray-500 hover:text-gray-700 hover:bg-transparent"
                    >
                      <Smile size={20} />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-64 p-2">
                    <div className="grid grid-cols-8 gap-1">
                      {[
                        "😊",
                        "😂",
                        "❤️",
                        "👍",
                        "😍",
                        "😮",
                        "😢",
                        "😡",
                        "🎉",
                        "👏",
                        "🙏",
                        "🔥",
                        "💯",
                        "⭐",
                        "🤔",
                        "🤣",
                      ].map((emoji, index) => (
                          <Button
                              key={index}
                              variant="ghost"
                              className="h-8 w-8 p-0 text-lg"
                              onClick={() => {
                                setMessage(message + emoji)
                              }}
                          >
                            {emoji}
                          </Button>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="rounded-full text-gray-500 hover:text-gray-700 hover:bg-transparent"
                >
                  <Mic size={20} />
                </Button>
              </div>

              {/* Tag Suggestions Dropdown */}
              {showTagSuggestions && contact.isGroup && (
                  <div className="absolute bottom-full left-0 w-full bg-white rounded-lg shadow-lg border border-gray-200 mb-1 max-h-64 overflow-y-auto z-10">
                    <div className="p-2 border-b border-gray-100 flex items-center bg-gray-50">
                      <div className="flex items-center gap-2">
                        <Users size={16} className="text-gray-400" />
                        <span className="text-sm text-gray-500">Gắn thẻ thành viên nhóm</span>
                      </div>
                    </div>
                    <div className="p-1">
                      {tagSuggestions.length > 0 ? (
                          tagSuggestions.map((member) => (
                              <button
                                  key={member.name}
                                  className="w-full text-left p-2 hover:bg-gray-50 rounded flex items-center gap-2"
                                  onClick={() => insertTag(member)}
                              >
                                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                                  <Image
                                      src={`/placeholder.svg?height=32&width=32&text=${member.name.charAt(0)}`}
                                      alt={member.name}
                                      width={32}
                                      height={32}
                                      className="object-cover"
                                  />
                                </div>
                                <div className="flex-1">
                                  <div className="text-sm font-medium">{member.name}</div>
                                  <div className="text-xs text-gray-500">{member.online ? "Online now" : "Offline"}</div>
                                </div>
                              </button>
                          ))
                      ) : (
                          <div className="p-3 text-center text-sm text-gray-500">Không tìm thấy thành viên phù hợp</div>
                      )}
                    </div>
                  </div>
              )}

              {/* Quick Commands Dropdown */}
              {showQuickCommands && (
                  <div className="absolute bottom-full left-0 w-full bg-white rounded-lg shadow-lg border border-gray-200 mb-1 max-h-64 overflow-y-auto z-10">
                    <div className="p-2 border-b border-gray-100 flex items-center justify-between bg-gray-50">
                      <div className="flex items-center gap-2">
                        <Command size={16} className="text-gray-400" />
                        <span className="text-sm text-gray-500">Tin nhắn nhanh</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 text-xs text-blue-600 hover:text-blue-800"
                            onClick={() => {
                              setShowQuickCommands(false)
                              setShowManageTemplates(true)
                            }}
                        >
                          Quản lý
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 text-xs text-blue-600 hover:text-blue-800"
                            onClick={() => {
                              setShowQuickCommands(false)
                              setShowAddTemplate(true)
                            }}
                        >
                          <Plus size={12} className="mr-1" />
                          Thêm mẫu
                        </Button>
                      </div>
                    </div>
                    <div className="p-1">
                      {quickCommands
                          .filter(
                              (cmd) =>
                                  quickCommandFilter === "" ||
                                  cmd.command.substring(1).includes(quickCommandFilter) ||
                                  cmd.description.toLowerCase().includes(quickCommandFilter),
                          )
                          .map((command) => (
                              <button
                                  key={command.id}
                                  className="w-full text-left p-2 hover:bg-gray-50 rounded flex items-center gap-2"
                                  onClick={() => insertQuickCommand(command.template)}
                              >
                                <div className="w-6 h-6 flex items-center justify-center">{command.icon}</div>
                                <div className="flex-1">
                                  <div className="text-sm font-medium">{command.command}</div>
                                  <div className="text-xs text-gray-500">{command.description}</div>
                                </div>
                                {!command.isDefault && (
                                    <div className="text-xs px-1.5 py-0.5 rounded-full bg-blue-100 text-blue-800">Tùy chỉnh</div>
                                )}
                              </button>
                          ))}
                      {quickCommands.filter(
                          (cmd) =>
                              quickCommandFilter === "" ||
                              cmd.command.substring(1).includes(quickCommandFilter) ||
                              cmd.description.toLowerCase().includes(quickCommandFilter),
                      ).length === 0 && (
                          <div className="p-3 text-center text-sm text-gray-500">Không tìm thấy lệnh phù hợp</div>
                      )}
                    </div>
                  </div>
              )}
            </div>
            <Button
                type="submit"
                size="icon"
                className="rounded-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-md h-12 w-12"
            >
              <Send size={18} />
            </Button>
          </form>
        </div>

        {/* Đảm bảo input file được đặt đúng vị trí và có thuộc tính đúng */}
        <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileSelect} multiple />
        <input type="file" ref={imageInputRef} className="hidden" accept="image/*" onChange={handleFileSelect} multiple />

        {/* Add Template Dialog */}
        <Dialog open={showAddTemplate} onOpenChange={setShowAddTemplate}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>{editingTemplate ? "Chỉnh sửa mẫu tin nhắn" : "Thêm mẫu tin nhắn mới"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="command">Lệnh</Label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-gray-400">/</span>
                  <Input
                      id="command"
                      placeholder="Nhập lệnh (không cần dấu /)"
                      className="pl-7"
                      value={newTemplate.command.startsWith("/") ? newTemplate.command.substring(1) : newTemplate.command}
                      onChange={(e) => setNewTemplate({ ...newTemplate, command: e.target.value })}
                  />
                </div>
                <p className="text-xs text-gray-500">Ví dụ: deadline, address</p>
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="description">Mô tả</Label>
                <Input
                    id="description"
                    placeholder="Mô tả ngắn gọn về mẫu tin nhắn"
                    value={newTemplate.description}
                    onChange={(e) => setNewTemplate({ ...newTemplate, description: e.target.value })}
                />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="template">Nội dung mẫu</Label>
                <Textarea
                    id="template"
                    placeholder="Nhập nội dung mẫu tin nhắn. Sử dụng [từ khóa] cho phần cần thay thế."
                    className="min-h-[100px]"
                    value={newTemplate.template}
                    onChange={(e) => setNewTemplate({ ...newTemplate, template: e.target.value })}
                />
                <p className="text-xs text-gray-500">Ví dụ: Deadline dự án [tên dự án] là [ngày].</p>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Hủy</Button>
              </DialogClose>
              <Button
                  onClick={handleAddTemplate}
                  disabled={!newTemplate.command || !newTemplate.description || !newTemplate.template}
              >
                {editingTemplate ? "Cập nhật" : "Thêm mẫu"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Manage Templates Dialog */}
        <Dialog open={showManageTemplates} onOpenChange={setShowManageTemplates}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Quản lý mẫu tin nhắn</DialogTitle>
            </DialogHeader>
            <div className="max-h-[400px] overflow-y-auto">
              <div className="space-y-2">
                <div className="text-sm font-medium text-gray-500 mb-2">Mẫu mặc định</div>
                {defaultQuickCommands.map((cmd) => (
                    <div key={cmd.id} className="flex items-center p-2 border rounded-md bg-gray-50">
                      <div className="w-6 h-6 flex items-center justify-center mr-2">{cmd.icon}</div>
                      <div className="flex-1">
                        <div className="text-sm font-medium">{cmd.command}</div>
                        <div className="text-xs text-gray-500">{cmd.description}</div>
                      </div>
                    </div>
                ))}

                <div className="text-sm font-medium text-gray-500 mt-4 mb-2">Mẫu tùy chỉnh</div>
                {customQuickCommands.length === 0 ? (
                    <div className="text-center p-4 text-sm text-gray-500">Chưa có mẫu tin nhắn tùy chỉnh nào</div>
                ) : (
                    customQuickCommands.map((cmd) => (
                        <div key={cmd.id} className="flex items-center p-2 border rounded-md">
                          <div className="w-6 h-6 flex items-center justify-center mr-2">{cmd.icon}</div>
                          <div className="flex-1">
                            <div className="text-sm font-medium">{cmd.command}</div>
                            <div className="text-xs text-gray-500">{cmd.description}</div>
                          </div>
                          <div className="flex items-center gap-1">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7 rounded-full hover:bg-gray-100"
                                onClick={() => handleEditTemplate(cmd)}
                            >
                              <Edit size={14} />
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7 rounded-full hover:bg-red-100 text-red-500"
                                onClick={() => handleDeleteTemplate(cmd.id)}
                            >
                              <Trash2 size={14} />
                            </Button>
                          </div>
                        </div>
                    ))
                )}
              </div>
            </div>
            <DialogFooter>
              <Button
                  variant="outline"
                  onClick={() => {
                    setShowManageTemplates(false)
                    setShowAddTemplate(true)
                  }}
                  className="mr-auto"
              >
                <Plus size={14} className="mr-1" />
                Thêm mẫu mới
              </Button>
              <DialogClose asChild>
                <Button>Đóng</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Chat Info Dialog */}
        <Dialog open={showChatInfo} onOpenChange={setShowChatInfo}>
          <DialogContent className="sm:max-w-md p-0 gap-0 overflow-hidden">
            {/* Dialog Header */}
            <div className="flex items-center justify-between p-3 border-b">
              <div className="flex-1"></div>
              <div className="text-center font-medium">Thông tin hội thoại</div>
              <div className="flex-1 flex justify-end gap-2">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Minimize size={16} />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Maximize size={16} />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setShowChatInfo(false)}>
                  <X size={16} />
                </Button>
              </div>
            </div>

            <div className="max-h-[80vh] overflow-y-auto">
              {/* Profile Section */}
              <div className="flex flex-col items-center py-6 px-4 border-b">
                <div className="relative mb-3">
                  <div className="w-20 h-20 rounded-full overflow-hidden">
                    <UserAvatar
                        avatar={contact.avatar}
                        displayName={contact.displayName}
                        isActive={contact.isActive}
                        lastActionTime={contact.lastActionTime}
                    />
                  </div>
                  <Button
                      variant="ghost"
                      size="icon"
                      className="absolute bottom-0 right-0 h-7 w-7 rounded-full bg-white shadow-sm border border-gray-200"
                  >
                    <PenSquare size={14} />
                  </Button>
                </div>
                <div className="text-lg font-semibold mb-2">{contact.displayName}</div>

                {/* Hiển thị thẻ của liên hệ */}
                {contactTags.length > 0 && (
                    <div className="flex flex-wrap gap-1 justify-center mb-4 max-w-[200px]">
                      {contactTags.map((tag, idx) => (
                          <span
                              key={idx}
                              className={`text-xs px-1.5 py-0.5 rounded-full border ${getTagColorClass(tag.color)}`}
                          >
                      {tag.text}
                    </span>
                      ))}
                    </div>
                )}

                {/* Quick Actions */}
                <div className="flex items-center gap-6">
                  <div className="flex flex-col items-center">
                    <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full bg-gray-100 mb-2">
                      <BellOff size={20} />
                    </Button>
                    <span className="text-xs text-gray-600">Tắt thông báo</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full bg-gray-100 mb-2">
                      <Pin size={20} />
                    </Button>
                    <span className="text-xs text-gray-600">Ghim hội thoại</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-12 w-12 rounded-full bg-gray-100 mb-2"
                        onClick={() => setShowTagManager(true)}
                    >
                      <Tag size={20} />
                    </Button>
                    <span className="text-xs text-gray-600">Quản lý thẻ</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full bg-gray-100 mb-2">
                      <Users size={20} />
                    </Button>
                    <span className="text-xs text-gray-600">Tạo nhóm</span>
                  </div>
                </div>
              </div>

              {/* Options List */}
              <div className="divide-y">
                {/* Reminders */}
                <div className="p-4 flex items-center">
                  <Clock size={20} className="text-gray-500 mr-3" />
                  <span>Danh sách nhắc hẹn</span>
                </div>

                {/* Common Groups */}
                <div className="p-4 flex items-center">
                  <Users size={20} className="text-gray-500 mr-3" />
                  <span>1 nhóm chung</span>
                </div>

                {/* Media */}
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <ImageIconLucide size={20} className="text-gray-500 mr-3" />
                    <span>Ảnh/Video</span>
                  </div>
                  <ChevronRight size={16} className="text-gray-400" />
                </div>

                {/* Files */}
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <FileText size={20} className="text-gray-500 mr-3" />
                    <span>File</span>
                  </div>
                  <ChevronRight size={16} className="text-gray-400" />
                </div>

                {/* Links */}
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <Link2 size={20} className="text-gray-500 mr-3" />
                    <span>Link</span>
                  </div>
                  <ChevronRight size={16} className="text-gray-400" />
                </div>

                {/* Security Settings */}
                <Collapsible className="w-full">
                  <CollapsibleTrigger className="w-full p-4 flex items-center justify-between">
                    <div className="flex items-center">
                      <Lock size={20} className="text-gray-500 mr-3" />
                      <span>Thiết lập bảo mật</span>
                    </div>
                    <ChevronRight size={16} className="text-gray-400 rotate-90" />
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="px-4 py-3 bg-gray-50">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <div className="flex items-center">
                            <Clock size={16} className="text-gray-500 mr-2" />
                            <span className="font-medium">Tin nhắn tự xóa</span>
                          </div>
                          <div className="text-xs text-gray-500 mt-1 ml-6">Không bao giờ</div>
                        </div>
                        <Button variant="ghost" size="sm" className="h-8 w-8 rounded-full">
                          <ChevronRight size={16} className="text-gray-400" />
                        </Button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <MessageSquare size={16} className="text-gray-500 mr-2" />
                          <span>Ẩn trò chuyện</span>
                        </div>
                        <Switch />
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>

                {/* Report */}
                <div className="p-4 flex items-center">
                  <AlertTriangle size={20} className="text-gray-500 mr-3" />
                  <span>Báo xấu</span>
                </div>

                {/* Delete Chat History */}
                <div className="p-4 flex items-center">
                  <Trash2 size={20} className="text-red-500 mr-3" />
                  <span className="text-red-500">Xóa lịch sử trò chuyện</span>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Tag Manager Dialog */}
        <Dialog open={showTagManager} onOpenChange={setShowTagManager}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Quản lý thẻ cho {contact.displayName}</DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              {/* Thẻ hiện tại */}
              <div>
                <h3 className="text-sm font-medium mb-2">Thẻ đã gắn</h3>
                <div className="flex flex-wrap gap-2">
                  {contactTags.length > 0 ? (
                      contactTags.map((tag, idx) => (
                          <div
                              key={idx}
                              className={`flex items-center gap-1 px-2 py-1 rounded-full border ${getTagColorClass(tag.color)}`}
                          >
                            <span className="text-sm">{tag.text}</span>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-4 w-4 rounded-full hover:bg-white/20"
                                onClick={() => removeTagFromContact(tag.text)}
                            >
                              <X size={10} />
                            </Button>
                          </div>
                      ))
                  ) : (
                      <p className="text-sm text-gray-500">Chưa có thẻ nào được gắn</p>
                  )}
                </div>
              </div>

              {/* Thêm thẻ mới */}
              <div>
                <h3 className="text-sm font-medium mb-2">Thêm thẻ mới</h3>
                <div className="flex gap-2">
                  <Input
                      placeholder="Tên thẻ"
                      value={newTag.text}
                      onChange={(e) => setNewTag({ ...newTag, text: e.target.value })}
                      className="flex-1"
                  />
                  <select
                      value={newTag.color}
                      onChange={(e) => setNewTag({ ...newTag, color: e.target.value })}
                      className="px-3 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="blue">Xanh dương</option>
                    <option value="green">Xanh lá</option>
                    <option value="red">Đỏ</option>
                    <option value="purple">Tím</option>
                    <option value="amber">Vàng</option>
                    <option value="orange">Cam</option>
                    <option value="cyan">Lam</option>
                  </select>
                  <Button onClick={handleAddNewTag} disabled={!newTag.text.trim()}>
                    <Plus size={16} />
                  </Button>
                </div>
              </div>

              {/* Thẻ có sẵn */}
              <div>
                <h3 className="text-sm font-medium mb-2">Thẻ có sẵn</h3>
                <div className="flex flex-wrap gap-2 max-h-[200px] overflow-y-auto p-2 border rounded-md">
                  {availableTags.map((tag) => (
                      <button
                          key={tag.id}
                          className={`px-2 py-1 rounded-full text-sm ${getTagColorClass(tag.color)}`}
                          onClick={() => addTagToContact(tag)}
                      >
                        {tag.text}
                      </button>
                  ))}
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button onClick={() => setShowTagManager(false)}>Xong</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Image Viewer Modal */}
        <Dialog open={imageViewerOpen} onOpenChange={setImageViewerOpen}>
          <DialogContent className="sm:max-w-4xl p-0 overflow-hidden bg-black/90 border-none">
            <div className="relative w-full h-full flex items-center justify-center">
              <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 h-8 w-8 rounded-full bg-black/50 text-white hover:bg-black/70 z-10"
                  onClick={closeImageViewer}
              >
                <X size={18} />
              </Button>

              {currentGallery.length > 0 && (
                  <>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute left-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-black/50 text-white hover:bg-black/70 z-10"
                        onClick={() => navigateImage("prev")}
                    >
                      <ChevronLeft size={24} />
                    </Button>

                    <div className="w-full h-full flex items-center justify-center p-4">
                      <img
                          src={currentGallery[selectedImageIndex] || "/placeholder.svg"}
                          alt={`Image ${selectedImageIndex + 1} of ${currentGallery.length}`}
                          className="max-w-full max-h-[80vh] object-contain"
                      />
                    </div>

                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-black/50 text-white hover:bg-black/70 z-10"
                        onClick={() => navigateImage("next")}
                    >
                      <ChevronRight size={24} />
                    </Button>

                    <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                      <div className="bg-black/50 px-3 py-1 text-white text-sm">
                        {selectedImageIndex + 1} / {currentGallery.length}
                      </div>
                    </div>
                  </>
              )}
            </div>
          </DialogContent>
        </Dialog>

        {/* Thêm Dialog để xem trước file văn bản đầy đủ */}
        <Dialog open={showFilePreview} onOpenChange={setShowFilePreview}>
          <DialogContent className="sm:max-w-4xl max-h-[80vh] overflow-hidden">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <FileText size={18} />
                {currentPreviewFile?.name}
              </DialogTitle>
            </DialogHeader>
            <div className="overflow-y-auto max-h-[calc(80vh-8rem)]">
              <div className="p-4 bg-gray-50 rounded-md whitespace-pre-wrap">
                {currentPreviewFile && filePreviewContents[currentPreviewFile.id]}
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowFilePreview(false)}>
                Đóng
              </Button>
              <Button onClick={() => window.open(currentPreviewFile?.url, "_blank")}>Tải xuống</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
  )
}

