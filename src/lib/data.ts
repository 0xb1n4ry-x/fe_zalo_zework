export const contacts = [
  {
    name: "Công Trịnh",
    lastActive: "4/2/2025, 6:19 PM",
    online: true,
    tags: [{ text: "Đồng nghiệp", color: "blue" }],
  },
  {
    name: "Lê Văn Thành",
    lastActive: "4/3/2025, 10:48 AM",
    online: false,
    tags: [{ text: "Bạn bè", color: "green" }],
  },
  {
    name: "Võ Sơn Vinipr Media",
    lastActive: "4/3/2025, 11:51 AM",
    online: true,
    tags: [
      { text: "Công việc", color: "purple" },
      { text: "VIP", color: "amber" },
    ],
  },
  {
    name: "Nhỏ Tiến Dương",
    lastActive: "4/2/2025, 6:26 PM",
    online: false,
    tags: [{ text: "Gia đình", color: "red" }],
  },
  {
    name: "Huỳnh Cao Lộc",
    lastActive: "4/3/2025, 12:16 PM",
    online: true,
    tags: [{ text: "Bạn bè", color: "green" }],
  },
  {
    name: "Phúc",
    lastActive: "4/3/2025, 12:14 PM",
    online: false,
    tags: [{ text: "Đồng nghiệp", color: "blue" }],
  },
  {
    name: "Quang Minh",
    lastActive: "4/3/2025, 11:54 AM",
    online: true,
    tags: [{ text: "Công việc", color: "purple" }],
  },
  {
    name: "Phương Xe Máy",
    lastActive: "4/3/2025, 12:15 PM",
    online: false,
    tags: [{ text: "Bạn bè", color: "green" }],
  },
  {
    name: "Nhật Thủy",
    lastActive: "3/30/2025, 7:20 PM",
    online: true,
    tags: [{ text: "Gia đình", color: "red" }],
  },
  {
    name: "Quốc Khánh Chuyển Loa Vì Tình",
    lastActive: "4/3/2025, 11:54 AM",
    online: false,
    tags: [],
  },
  {
    name: "Huỳnh Trung Kiên",
    lastActive: "4/3/2025, 2:44 AM",
    online: true,
    tags: [{ text: "VIP", color: "amber" }],
  },
]

// Sample recent messages data
export const recentMessages = [
  {
    id: 1,
    contact: {
      name: "Công Trịnh",
      online: true,
      lastActive: "4/2/2025, 6:19 PM",
      tags: [{ text: "Đồng nghiệp", color: "blue" }],
    },
    lastMessage: "Xin chào! Bạn khỏe không?",
    timestamp: "10:30 AM",
    unread: 2,
    isTyping: false,
  },
  {
    id: 2,
    contact: {
      name: "Lê Văn Thành",
      online: false,
      lastActive: "4/3/2025, 10:48 AM",
      tags: [{ text: "Bạn bè", color: "green" }],
    },
    lastMessage: "Tôi sẽ gửi tài liệu cho bạn vào ngày mai.",
    timestamp: "Yesterday",
    unread: 0,
    isTyping: false,
  },
  {
    id: 3,
    contact: {
      name: "Võ Sơn Vinipr Media",
      online: true,
      lastActive: "4/3/2025, 11:51 AM",
      tags: [
        { text: "Công việc", color: "purple" },
        { text: "VIP", color: "amber" },
      ],
    },
    lastMessage: "Bạn đã xem video mới chưa?",
    timestamp: "Yesterday",
    unread: 3,
    isTyping: true,
  },
  {
    id: 4,
    contact: {
      name: "Nhỏ Tiến Dương",
      online: false,
      lastActive: "4/2/2025, 6:26 PM",
      tags: [{ text: "Gia đình", color: "red" }],
    },
    lastMessage: "Cảm ơn bạn rất nhiều!",
    timestamp: "Monday",
    unread: 0,
    isTyping: false,
  },
  {
    id: 5,
    contact: {
      name: "Huỳnh Cao Lộc",
      online: true,
      lastActive: "4/3/2025, 12:16 PM",
      tags: [{ text: "Bạn bè", color: "green" }],
    },
    lastMessage: "Hẹn gặp lại vào tuần sau nhé.",
    timestamp: "Monday",
    unread: 0,
    isTyping: false,
  },
  {
    id: 6,
    contact: {
      name: "Phúc",
      online: false,
      lastActive: "4/3/2025, 12:14 PM",
      tags: [{ text: "Đồng nghiệp", color: "blue" }],
    },
    lastMessage: "Bạn có thể gửi lại file đó được không?",
    timestamp: "3/30/2025",
    unread: 0,
    isTyping: false,
  },
  {
    id: 7,
    contact: {
      name: "Quang Minh",
      online: true,
      lastActive: "4/3/2025, 11:54 AM",
      tags: [{ text: "Công việc", color: "purple" }],
    },
    lastMessage: "Tôi đã nhận được email của bạn rồi.",
    timestamp: "3/29/2025",
    unread: 0,
    isTyping: false,
  },
]

// Sample groups data
export const groups = [
  {
    id: 1,
    name: "Nhóm Dự Án Website",
    avatar: "/placeholder.svg?height=48&width=48&text=DAN",
    members: [
      { name: "Công Trịnh", online: true },
      { name: "Lê Văn Thành", online: false },
      { name: "Quang Minh", online: true },
      { name: "Phúc", online: false },
    ],
    lastMessage: {
      sender: "Công Trịnh",
      text: "Mọi người nhớ họp lúc 2h chiều nhé!",
      timestamp: "11:45 AM",
    },
    unread: 5,
    isActive: true,
    type: "work",
  },
  {
    id: 2,
    name: "Gia đình",
    avatar: "/placeholder.svg?height=48&width=48&text=GD",
    members: [
      { name: "Nhỏ Tiến Dương", online: false },
      { name: "Nhật Thủy", online: true },
    ],
    lastMessage: {
      sender: "Nhật Thủy",
      text: "Tối nay ăn gì?",
      timestamp: "Yesterday",
    },
    unread: 0,
    isActive: false,
    type: "family",
  },
  {
    id: 3,
    name: "Nhóm Bạn Cấp 3",
    avatar: "/placeholder.svg?height=48&width=48&text=C3",
    members: [
      { name: "Lê Văn Thành", online: false },
      { name: "Huỳnh Cao Lộc", online: true },
      { name: "Phương Xe Máy", online: false },
      { name: "Quốc Khánh Chuyển Loa Vì Tình", online: false },
      { name: "Huỳnh Trung Kiên", online: true },
    ],
    lastMessage: {
      sender: "Huỳnh Cao Lộc",
      text: "Cuối tuần này tụ họp nhé mọi người!",
      timestamp: "Monday",
    },
    unread: 12,
    isActive: true,
    type: "friends",
  },
  {
    id: 4,
    name: "Marketing Team",
    avatar: "/placeholder.svg?height=48&width=48&text=MKT",
    members: [
      { name: "Võ Sơn Vinipr Media", online: true },
      { name: "Quang Minh", online: true },
      { name: "Công Trịnh", online: true },
    ],
    lastMessage: {
      sender: "Võ Sơn Vinipr Media",
      text: "Đã gửi bản thiết kế mới, mọi người check email nhé",
      timestamp: "Tuesday",
    },
    unread: 0,
    isActive: false,
    type: "work",
  },
  {
    id: 5,
    name: "Nhóm Đá Bóng",
    avatar: "/placeholder.svg?height=48&width=48&text=DB",
    members: [
      { name: "Lê Văn Thành", online: false },
      { name: "Phúc", online: false },
      { name: "Huỳnh Trung Kiên", online: true },
      { name: "Quốc Khánh Chuyển Loa Vì Tình", online: false },
    ],
    lastMessage: {
      sender: "Huỳnh Trung Kiên",
      text: "Thứ 7 này đá lúc mấy giờ?",
      timestamp: "3/30/2025",
    },
    unread: 3,
    isActive: false,
    type: "hobby",
  },
]

