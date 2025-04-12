// 'use client'
//
// import {useState, useRef} from 'react'
// import { Phone, Video, Info, Paperclip, Smile, Send, Pin, PinOff, Trash2, AtSign, Clock, X } from 'lucide-react'
// import SideSettings from './SideSettings'
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
// import { Textarea } from "@/components/ui/textarea"
// import { toast } from "@/hooks/use-toast"
// import { ScheduledMessagesQueue } from './ScheduledMessagesQueue'
// import TagManagement from './TagManagement';
// import {Avatar, AvatarImage} from "@/components/ui/avatar"; // Import the TagManagement component
// import {ImageUploadButton} from "@/app/mainchat/ImageUploadButton";
// import ChatAnimation from "./ChatAnimation"
// import {useChatData} from "@/hooks/useChatData";
// import {User} from "@/types/user";
// interface Reaction {
//   emoji: string;
//   count: number;
// }
// interface Attachment {
//   file: File
//   preview: string
// }
// interface TransferInfo {
//   amount: string;
//   recipient: string;
//   bankName: string;
//   message: string;
// }
//
// interface Message {
//   id: number;
//   sender: string;
//   content: string;
//   time: string;
//   isMine: boolean;
//   reactions: Reaction[];
//   isPinned: boolean;
//   isDeleted: boolean;
//   deletedAt: string | null;
//   transferInfo?: TransferInfo;
//   tags?: string[];
//   scheduledTime?: string;
// }
//
// interface TemplateMessage {
//   id: string;
//   shorthand: string;
//   content: string;
// }
//
//
//
//
//
// interface ScheduledMessage {
//   id: number;
//   content: string;
//   scheduledTime: string;
// }
//
// const emojis = ['👍', '❤️', '😂', '😮', '😢', '😡'];
//
// // Mock users for demonstration
//
//
// interface ChatAreaProps {
//   selectedUserId: string | null,
//   templates: TemplateMessage[]
// }
//
// export default function ChatArea({ selectedUserId, templates  }: ChatAreaProps) {
//   const [isSideSettingsOpen, setIsSideSettingsOpen] = useState(false)
//   const [message, setMessage] = useState('')
//   const [messages, setMessages] = useState<Message[]>([])
//   const [showReactionPicker, setShowReactionPicker] = useState<number | null>(null)
//   const [isTransferMode, setIsTransferMode] = useState(false)
//   const [transferInfo, setTransferInfo] = useState<TransferInfo>({ amount: '', recipient: '', bankName: '', message: '' })
//   const [suggestedTemplates, setSuggestedTemplates] = useState<TemplateMessage[]>([])
//   const [suggestedUsers, setSuggestedUsers] = useState<User[]>([])
//   const [isScheduleMode, setIsScheduleMode] = useState(false)
//   const [scheduledTime, setScheduledTime] = useState('')
//   const [scheduledMessages, setScheduledMessages] = useState<ScheduledMessage[]>([])
//   const inputRef = useRef<HTMLInputElement>(null)
//   const [userTags, setUserTags] = useState<string[]>([]); // Add userTags state
//   const [attachments, setAttachments] = useState<Attachment[]>([])
//   const fileInputRef = useRef<HTMLInputElement>(null)
//
//
//
//
//   const {  userProfile, isLoading, error } = useChatData(selectedUserId)
//
//
//   if (isLoading) {
//     return <div className="w-full md:w-2/3 p-4 flex items-center justify-center">Loading chat data...</div>
//   }
//
//   if (error) {
//     return <div className="w-full md:w-2/3 p-4 flex items-center justify-center text-red-500">{error}</div>
//   }
//
//   const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const files = event.target.files
//     if (files) {
//       const newAttachments: Attachment[] = Array.from(files).map((file) => ({
//         file,
//         preview: URL.createObjectURL(file),
//       }))
//       setAttachments((prev) => [...prev, ...newAttachments])
//     }
//   }
//
//   const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const files = event.target.files
//     if (files) {
//       const imageFiles = Array.from(files).filter((file) => file.type.startsWith("image/"))
//       const newAttachments: Attachment[] = imageFiles.map((file) => ({
//         file,
//         preview: URL.createObjectURL(file),
//       }))
//       setAttachments((prev) => [...prev, ...newAttachments])
//     }
//   }
//   const removeAttachment = (index: number) => {
//     setAttachments((prev) => {
//       const newAttachments = [...prev]
//       URL.revokeObjectURL(newAttachments[index].preview)
//       newAttachments.splice(index, 1)
//       return newAttachments
//     })
//   }
//
//
//   const handleSendMessage = async (scheduled = false) => {
//
//
//     if (message.trim() !== '' || isTransferMode) {
//       const newMessage: Message = {
//         id: Date.now(),
//         content: message || (attachments.length > 0 ? "Đã gửi ảnh" : ""),
//         sender: 'You',
//         time: new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}),
//         isMine: true,
//         reactions: [],
//         isPinned: false,
//         isDeleted: false,
//         deletedAt: null,
//         tags: extractTags(message),
//         message :message,
//         id:userProfile?.userId,
//         attachments: attachments,
//
//
//       }
//       if (isTransferMode) {
//         newMessage.transferInfo = transferInfo
//         newMessage.content = 'Thông tin chuyển khoản'
//       }
//       if (scheduled && scheduledTime) {
//         const scheduledMessage: ScheduledMessage = {
//           id: newMessage.id,
//           content: message,
//           scheduledTime: scheduledTime,
//         }
//         setScheduledMessages(prev => [...prev, scheduledMessage])
//         toast({
//           title: "Tin nhắn đã được lên lịch",
//           description: `Tin nhắn "${message}" sẽ được gửi vào lúc ${scheduledTime}`,
//         })
//       } else {
//
//         const messagePayload = newMessage;
//
//         try {
//           const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/mtu`, {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(messagePayload),
//
//           });
//
//           const result = await response.json();
//           console.log('Response from backend:', result);
//         } catch (error) {
//           console.error('Error sending data:', error);
//         }
//
//         setMessages(prev => [...prev, newMessage]);
//
//       }
//
//
//       setMessage('')
//       setIsTransferMode(false)
//       setTransferInfo({amount: '', recipient: '', bankName: '', message: ''})
//       setSuggestedTemplates([])
//       setSuggestedUsers([])
//       setIsScheduleMode(false)
//       setScheduledTime('')
//       if (fileInputRef.current) {
//         fileInputRef.current.value = ""
//       }
//       const imageInput = document.getElementById("image-upload") as HTMLInputElement
//       if (imageInput) {
//         imageInput.value = ""
//       }
//     }
//   }
//
//   const renderAttachments = (attachments: Attachment[]) => (
//       <div className="flex flex-wrap gap-2 mt-2">
//         {attachments.map((attachment, index) => (
//             <div key={index} className="relative group">
//               {attachment.file.type.startsWith("image/") ? (
//                   <img
//                       src={attachment.preview || "/placeholder.svg"}
//                       alt={attachment.file.name}
//                       className="w-20 h-20 object-cover rounded"
//                   />
//               ) : (
//                   <div className="w-20 h-20 bg-gray-200 flex items-center justify-center rounded">
//                     <Paperclip className="w-8 h-8 text-gray-500" />
//                   </div>
//               )}
//               <span className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 truncate">
//             {attachment.file.name}
//           </span>
//               <button
//                   className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
//                   onClick={() => removeAttachment(index)}
//               >
//                 <X size={12} />
//               </button>
//             </div>
//         ))}
//       </div>
//   )
//
//   const extractTags = (content: string): string[] => {
//     const tagRegex = /@(\w+)/g;
//     const matches = content.match(tagRegex);
//     return matches ? matches.map(match => match.slice(1)) : [];
//   }
//
//   const handleAddReaction = (messageId: number, emoji: string) => {
//     setMessages(prevMessages =>
//       prevMessages.map(msg =>
//         msg.id === messageId
//           ? {
//               ...msg,
//               reactions: msg.reactions.some(r => r.emoji === emoji)
//                 ? msg.reactions.map(r => r.emoji === emoji ? { ...r, count: r.count + 1 } : r)
//                 : [...msg.reactions, { emoji, count: 1 }]
//             }
//           : msg
//       )
//     )
//     setShowReactionPicker(null)
//   }
//
//   const handlePinMessage = (messageId: number) => {
//     setMessages(prevMessages =>
//       prevMessages.map(msg =>
//         msg.id === messageId
//           ? { ...msg, isPinned: !msg.isPinned }
//           : msg
//       )
//     )
//   }
//
//   const handleDeleteMessage = (messageId: number) => {
//     const now = new Date().toLocaleString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit',
//       hour12: true
//     });
//     setMessages(prevMessages =>
//       prevMessages.map(msg =>
//         msg.id === messageId
//           ? { ...msg, isDeleted: true, isPinned: false, deletedAt: now }
//           : msg
//       )
//     )
//   }
//
//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value
//     setMessage(value)
//     if (value === '/p' && !isTransferMode) {
//       setIsTransferMode(true)
//       setMessage('')
//     } else if (value === '/p' && isTransferMode) {
//       setIsTransferMode(false)
//       setMessage('')
//     } else if (value.startsWith('/')) {
//       const matchingTemplates = templates.filter(template =>
//         template.shorthand.toLowerCase().startsWith(value.toLowerCase())
//       );
//       setSuggestedTemplates(matchingTemplates);
//       setSuggestedUsers([]);
//     } else if (value.includes('@')) {
//       const lastWord = value.split(' ').pop() || '';
//       if (lastWord.startsWith('@')) {
//         const searchTerm = lastWord.slice(1).toLowerCase();
//         const matchingUsers = users.filter(user =>
//           user.name.toLowerCase().includes(searchTerm)
//         );
//         setSuggestedUsers(matchingUsers);
//         setSuggestedTemplates([]);
//       } else {
//         setSuggestedUsers([]);
//       }
//     } else {
//       setSuggestedTemplates([]);
//       setSuggestedUsers([]);
//     }
//   }
//
//   const handleTemplateSelect = (template: TemplateMessage) => {
//     setMessage(template.content);
//     setSuggestedTemplates([]);
//   }
//
//   const handleUserSelect = (user: User) => {
//     const inputElement = inputRef.current;
//     if (inputElement) {
//       const cursorPosition = inputElement.selectionStart || 0;
//       const textBeforeCursor = message.slice(0, cursorPosition);
//       const textAfterCursor = message.slice(cursorPosition);
//       const lastAtIndex = textBeforeCursor.lastIndexOf('@');
//       if (lastAtIndex !== -1) {
//         const newText = textBeforeCursor.slice(0, lastAtIndex) + `@${user.name} ` + textAfterCursor;
//         setMessage(newText);
//         setSuggestedUsers([]);
//         // Set cursor position after the inserted user name
//         setTimeout(() => {
//           inputElement.setSelectionRange(lastAtIndex + user.name.length + 2, lastAtIndex + user.name.length + 2);
//           inputElement.focus();
//         }, 0);
//       }
//     }
//   }
//
//   const handleTransferInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target
//     setTransferInfo(prev => ({ ...prev, [name]: value }))
//   }
//
//   const handleScheduleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setScheduledTime(e.target.value)
//   }
//
//   const handleDeleteScheduledMessage = (id: number) => {
//     setScheduledMessages(prevMessages => prevMessages.filter(msg => msg.id !== id))
//     toast({
//       title: "Tin nhắn đã lên lịch đã bị xóa",
//       description: "Tin nhắn đã được xóa khỏi hàng đợi.",
//     })
//   }
//
//   const checkAndSendScheduledMessages = () => {
//     const now = new Date();
//     const messagesToSend = scheduledMessages.filter(msg => new Date(msg.scheduledTime) <= now);
//
//     messagesToSend.forEach(msg => {
//       const newMessage: Message = {
//         id: messages.length + 1,
//         sender: 'You',
//         content: msg.content,
//         time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
//         isMine: true,
//         reactions: [],
//         isPinned: false,
//         isDeleted: false,
//         deletedAt: null,
//         tags: extractTags(msg.content),
//       };
//       setMessages(prevMessages => [...prevMessages, newMessage]);
//     });
//
//     setScheduledMessages(prevScheduled =>
//       prevScheduled.filter(msg => !messagesToSend.some(sendMsg => sendMsg.id === msg.id))
//     );
//
//     if (messagesToSend.length > 0) {
//       toast({
//         title: "Tin nhắn đã được gửi",
//         description: `${messagesToSend.length} tin nhắn đã lên lịch đã được gửi.`,
//       });
//     }
//   };
//
//   // useEffect(() => {
//   //   const interval = setInterval(checkAndSendScheduledMessages, 60000); // Kiểm tra mỗi phút
//   //   return () => clearInterval(interval);
//   // }, [messages, scheduledMessages]);
//
//   const pinnedMessages = messages.filter(msg => msg.isPinned && !msg.isDeleted)
//   const unpinnedMessages = messages.filter(msg => !msg.isPinned)
//
//   const renderMessage = (message: Message) => (
//     <div key={message.id} className={`flex ${message.isMine ? 'justify-end' : 'justify-start'} w-full mb-4`}>
//       <div className={`relative group max-w-[70%] ${message.isMine ? 'ml-auto' : 'mr-auto'}`}>
//         {message.isDeleted ? (
//           <div className="bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded-lg p-3 shadow italic">
//             <p>Tin nhắn này đã bị xóa</p>
//             <span className="text-xs mt-1 block">Đã xóa lúc: {message.deletedAt}</span>
//           </div>
//         ) : (
//           <>
//             <div className={`${message.isMine ? 'bg-blue-500 text-white' : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100'} rounded-lg p-3 shadow`}>
//               {message.transferInfo ? (
//                 <div className="flex flex-col">
//                   <span className="font-bold mb-1">Thông tin chuyển khoản:</span>
//                   <span>Số tiền: {message.transferInfo.amount} VND</span>
//                   <span>Người nhận: {message.transferInfo.recipient}</span>
//                   <span>Ngân hàng: {message.transferInfo.bankName}</span>
//                   <span>Lời nhắn: {message.transferInfo.message}</span>
//                 </div>
//               ) : (
//                 <p>{message.content}</p>
//               )}
//               <span className="text-xs opacity-75 mt-1 block">{message.time}</span>
//               {message.scheduledTime && (
//                 <span className="text-xs opacity-75 mt-1 block">Đã lên lịch: {message.scheduledTime}</span>
//               )}
//               {message.tags && message.tags.length > 0 && (
//                 <div className="mt-1 flex flex-wrap gap-1">
//                   {message.tags.map((tag, index) => (
//                     <span
//                       key={index}
//                       className="text-xs bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200 px-2 py-0.5 rounded-full"
//                     >
//                       {tag.startsWith('@') ? tag : `#${tag}`}
//                     </span>
//                   ))}
//                 </div>
//               )}
//             </div>
//             <div className={`absolute top-0 ${message.isMine ? 'left-0' : 'right-0'} -translate-y-full opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1`}>
//               <button
//                 className="p-1 bg-gray-100 dark:bg-gray-600 rounded-full hover:bg-gray-200 dark:hover:bg-gray-500"
//                 onClick={() => handlePinMessage(message.id)}
//               >
//                 {message.isPinned ? (
//                   <PinOff className="w-4 h-4 text-gray-600 dark:text-gray-300" />
//                 ) : (
//                   <Pin className="w-4 h-4 text-gray-600 dark:text-gray-300" />
//                 )}
//               </button>
//               {message.isMine && (
//                 <button
//                   className="p-1 bg-gray-100 dark:bg-gray-600 rounded-full hover:bg-gray-200 dark:hover:bg-gray-500"
//                   onClick={() => handleDeleteMessage(message.id)}
//                 >
//                   <Trash2 className="w-4 h-4 text-gray-600 dark:text-gray-300" />
//                 </button>
//               )}
//             </div>
//             <button
//               className={`absolute top-1/2 -translate-y-1/2 ${message.isMine ? '-left-8' : '-right-8'} opacity-0 group-hover:opacity-100 transition-opacity`}
//               onClick={() => setShowReactionPicker(message.id)}
//             >
//               <Smile className="w-5 h-5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200" />
//             </button>
//             {showReactionPicker === message.id && (
//               <div className={`absolute -top-10 ${message.isMine ? 'right-0' : 'left-0'} bg-white dark:bg-gray-800 rounded-full shadow-lg p-1 flex space-x-1`}>
//                 {emojis.map((emoji) => (
//                   <button
//                     key={emoji}
//                     className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
//                     onClick={() => handleAddReaction(message.id, emoji)}
//                   >
//                     {emoji}
//                   </button>
//                 ))}
//               </div>
//             )}
//             {message.reactions.length > 0 && (
//               <div className={`flex mt-1 space-x-1 ${message.isMine ? 'justify-end' : 'justify-start'}`}>
//                 {message.reactions.map((reaction, index) => (
//                   <span key={index} className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full px-2 py-1 text-xs">
//                     {reaction.emoji} {reaction.count}
//                   </span>
//                 ))}
//               </div>
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   )
//
//   const handleAddUserTag = (tag: string) => { // Add handleAddUserTag function
//     if (!userTags.includes(tag)) {
//       setUserTags(prev => [...prev, tag]);
//     }
//   };
//
//   const handleSendTransfer = () => {
//     if (transferInfo.amount && transferInfo.recipient && transferInfo.bankName) {
//       handleSendMessage();
//     } else {
//       toast({
//         title: "Thông tin không đầy đủ",
//         description: "Vui lòng điền đầy đủ thông tin chuyển khoản.",
//         variant: "destructive"
//       });
//     }
//   };
//   if (!selectedUserId) {
//     return (
//         <div className="w-2/3 p-4 flex items-center justify-center">
//           <ChatAnimation />
//         </div>
//     )
//   }
//   return (
//
//     <div className="flex-1 flex min-w-0 h-screen">
//       {selectedUserId ? (
//       <div className="flex flex-col h-full w-full transition-all duration-300">
//         <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 flex justify-between items-center"> {/* Updated header */}
//           <div className="flex items-center">
//             <div className="w-30 h-30 bg-gray-300 dark:bg-gray-600 rounded-full mr-3"><Avatar>
//               <AvatarImage src={userProfile?.avatar} />
//             </Avatar></div>
//             <div>
//               <h2 className="font-semibold text-gray-900 dark:text-gray-100">{userProfile?.displayName}</h2>
//               <div className="flex flex-wrap gap-1 mt-1"> {/* Added tags to header */}
//                 {userTags.map((tag, index) => (
//                   <span
//                     key={index}
//                     className="text-xs bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 px-2 py-0.5 rounded-full"
//                   >
//                     {tag}
//                   </span>
//                 ))}
//               </div>
//             </div>
//           </div>
//           <div className="flex space-x-4">
//             <button className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400">
//               <Phone size={20} />
//             </button>
//             <button className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400">
//               <Video size={20} />
//             </button>
//             <button
//               className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
//               onClick={() => setIsSideSettingsOpen(!isSideSettingsOpen)}
//             >
//               <Info size={20} />
//             </button>
//           </div>
//         </div>
//         <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900 w-full">
//           {pinnedMessages.length > 0 && (
//             <div className="sticky top-0 bg-yellow-100 dark:bg-yellow-800 p-2 rounded-lg shadow-md z-10">
//               <h3 className="font-semibold text-yellow-800 dark:text-yellow-100 mb-2">Tin nhắn đã ghim</h3>
//               {pinnedMessages.map(renderMessage)}
//             </div>
//           )}
//           {unpinnedMessages.map(renderMessage)}
//         </div>
//         <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4 w-full">
//           <div className="flex justify-between items-start mb-2">
//             <ScheduledMessagesQueue
//               messages={scheduledMessages}
//               onDelete={handleDeleteScheduledMessage}
//             />
//             <TagManagement onAddTag={handleAddUserTag} initialTags={userTags} />
//           </div>
//           {isTransferMode ? (
//             <div className="mb-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
//               <div className="flex justify-between items-center mb-2">
//                 <h4 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">Thông tin chuyển khoản</h4>
//                 <button
//                   onClick={() => setIsTransferMode(false)}
//                   className="text-sm text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
//                 >
//                   Hủy
//                 </button>
//               </div>
//               <div className="space-y-2">
//                 <input
//                   type="text"
//                   name="amount"
//                   placeholder="Số tiền (VND)"
//                   value={transferInfo.amount}
//                   onChange={handleTransferInfoChange}
//                   className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
//                 />
//                 <input
//                   type="text"
//                   name="recipient"
//                   placeholder="Người nhận"
//                   value={transferInfo.recipient}
//                   onChange={handleTransferInfoChange}
//                   className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
//                 />
//                 <input
//                   type="text"
//                   name="bankName"
//                   placeholder="Tên ngân hàng"
//                   value={transferInfo.bankName}
//                   onChange={handleTransferInfoChange}
//                   className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
//                 />
//                 <input
//                   type="text"
//                   name="message"
//                   placeholder="Lời nhắn"
//                   value={transferInfo.message}
//                   onChange={handleTransferInfoChange}
//                   className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
//                 />
//                 <Button
//                   onClick={handleSendTransfer}
//                   className="w-full mt-2"
//                 >
//                   Gửi
//                 </Button>
//               </div>
//             </div>
//           ) : (
//             <>
//               <div className="flex items-center space-x-2 mb-2">
//                 <input
//                   ref={inputRef}
//                   type="text"
//                   placeholder="Nhập tin nhắn... (Gõ / để sử dụng mẫu, @ để gắn thẻ)"
//                   value={message}
//                   onChange={handleInputChange}
//                   onKeyPress={(e) => {
//                     if (e.key === 'Enter') {
//                       handleSendMessage()
//                     }
//                   }}
//                   className="flex-1 border border-gray-300 dark:border-gray-600 rounded-full px-4 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//                 <button
//                     className="bg-blue-500 text-white rounded-full p-3 hover:bg-blue-600"
//                     onClick={() => handleSendMessage()}
//                 >
//                   <Send size={20} />
//                 </button>
//               </div>
//
//               {attachments.length > 0 && <div className="mb-2">{renderAttachments(attachments)}</div>}
//               <div className="flex items-center space-x-2">
//                 <input
//                     type="file"
//                     ref={fileInputRef}
//                     onChange={handleFileSelect}
//                     multiple
//                     className="hidden"
//                     id="file-upload"
//                     accept="image/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
//                 />
//                 <Button onClick={() => fileInputRef.current?.click()} variant="outline" size="icon">
//                   <Paperclip size={20} />
//                 </Button>
//                 <ImageUploadButton onImageSelect={handleImageSelect} />
//                 <Button variant="outline" size="icon">
//                   <Smile size={20} />
//                 </Button>
//                 <Button variant="outline" size="icon">
//                   <AtSign size={20} />
//                 </Button>
//                 <Popover>
//                   <PopoverTrigger asChild>
//                     <Button variant="outline" className="w-10 rounded-full p-0">
//                       <Clock className="h-4 w-4" />
//                       <span className="sr-only">Lên lịch tin nhắn</span>
//                     </Button>
//                   </PopoverTrigger>
//                   <PopoverContent className="w-80">
//                     <div className="grid gap-4">
//                       <div className="space-y-2">
//                         <h4 className="font-medium leading-none">Lên lịch tin nhắn</h4>
//                         <p className="text-sm text-muted-foreground">
//                           Nhập tin nhắn và chọn thời gian để gửi.
//                         </p>
//                       </div>
//                       <div className="grid gap-2">
//                         <div className="grid gap-2">
//                           <Label htmlFor="scheduled-message">Tin nhắn</Label>
//                           <Textarea
//                               id="scheduled-message"
//                               placeholder="Nhập tin nhắn của bạn"
//                               value={message}
//                               onChange={(e) => setMessage(e.target.value)}
//                               className="h-20"
//                           />
//                         </div>
//                         <div className="grid grid-cols-3 items-center gap-4">
//                           <Label htmlFor="scheduled-time">Thời gian</Label>
//                           <Input
//                               id="scheduled-time"
//                               type="datetime-local"
//                               className="col-span-2 h-8"
//                               value={scheduledTime}
//                               onChange={handleScheduleTimeChange}
//                           />
//                         </div>
//                       </div>
//                       <Button onClick={() => handleSendMessage(true)} disabled={!message.trim() || !scheduledTime}>Lên lịch tin nhắn</Button>
//                     </div>
//                   </PopoverContent>
//                 </Popover>
//
//               </div>
//               {suggestedTemplates.length > 0 && (
//                 <div className="mb-2 p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
//                   <h5 className="text-sm font-semibold mb-1 text-gray-700 dark:text-gray-300">Tin nhắn mẫu gợi ý:</h5>
//                   <div className="flex flex-wrap gap-2">
//                     {suggestedTemplates.map((template) => (
//                       <button
//                         key={template.id}
//                         onClick={() => handleTemplateSelect(template)}
//                         className="text-sm bg-white dark:bg-gray-600 text-gray-800 dark:text-gray-200 px-2 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors"
//                       >
//                         {template.shorthand}
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//               )}
//               {suggestedUsers.length > 0 && (
//                 <div className="mb-2 p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
//                   <h5 className="text-sm font-semibold mb-1 text-gray-700 dark:text-gray-300">Gợi ý người dùng:</h5>
//                   <div className="flex flex-wrap gap-2">
//                     {suggestedUsers.map((user) => (
//                       <button
//                         key={user.id}
//                         onClick={() => handleUserSelect(user)}
//                         className="text-sm bg-white dark:bg-gray-600 text-gray-800 dark:text-gray-200 px-2 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors"
//                       >
//                         @{user.name}
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//               )}
//
//             </>
//           )}
//         </div>
//       </div> ): (
//
//
//           <div className="flex items-center justify-center h-full text-gray-500">Nhấn chọn liên hệ để bắt đầu</div>
//       )}
//       {isSideSettingsOpen && <SideSettings isOpen={isSideSettingsOpen} onClose={() => setIsSideSettingsOpen(false)} />}
//     </div>
//   )
// }
//
