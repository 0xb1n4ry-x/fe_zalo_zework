// import { MessageCircle, Users, Calendar, Settings, Sun, Moon, CheckSquare, Search, MessageSquare } from 'lucide-react'
// // import { useTheme } from './ThemeProvider'
// import {useEffect, useState} from 'react'
// import TemplateMessageModal from './TemplateMessageModal'
// import {Avatar, AvatarImage} from "@/components/ui/avatar";
// import {UserData} from "../../types";
//
//
//
// interface SidebarProps {
//   onIconClick: (iconId: string) => void;
//   onAddTemplate: (template: TemplateMessage) => void;
// }
//
// interface TemplateMessage {
//   id: string;
//   shorthand: string;
//   content: string;
//   scheduledTime?: string;
// }
//
// export default function Sidebar({onIconClick, onAddTemplate}: SidebarProps) {
//     const [userData, setUserData] = useState("")
//     // const {theme, toggleTheme} = useTheme()
//     const [activeIcon, setActiveIcon] = useState<string | null>(null);
//     const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
//
//     const navItems = [
//         {id: 'messages', icon: MessageCircle, label: 'Messages'},
//         {id: 'contacts', icon: Users, label: 'Contacts'},
//         {id: 'schedule', icon: Calendar, label: 'Schedule'},
//         {id: 'todo', icon: CheckSquare, label: 'Todo List'},
//         {id: 'search', icon: Search, label: 'Search'},
//         {id: 'settings', icon: Settings, label: 'Settings'},
//         {id: 'templates', icon: MessageSquare, label: 'Template Messages'},
//     ]
//     useEffect(() => {
//         const fecthUserData = async () => {
//             try {
//                 if (typeof window === 'undefined' || !window.localStorage) {
//                     throw new Error("localStorage is not available");
//                 }
//
//                 const rawData = localStorage.getItem('dataZalo') || '[]';
//
//                 let ld;
//                 try {
//                     ld = JSON.parse(rawData);
//                 } catch (e) {
//                     throw new Error("Invalid data in localStorage");
//                 }
//
//                 if (!Array.isArray(ld) || ld.length === 0) {
//                     throw new Error("No authentication data found");
//                 }
//
//                 const avatar = ld[0].avatar;
//
//
//                 setUserData(avatar);
//
//
//             } catch (error) {
//                 console.error("Error fetching user avatar:", error)
//                 setUserData("https://via.placeholder.com/40?text=User") // Fallback image
//             }
//         }
//
//         fecthUserData()
//     }, [])
//
//
//     const handleTemplateClick = () => {
//         setIsTemplateModalOpen(true);
//         setActiveIcon('templates');
//         onIconClick('templates');
//     }
//
//
//     return (
//         <div
//             className="w-16 bg-white dark:bg-gray-800 flex flex-col items-center py-4 flex-shrink-0 transition-colors duration-200">
//              <Avatar className="h-10 w-10 rounded-full">
//                  <AvatarImage src={userData} alt={userData} />
//              </Avatar>
//             <hr className="my-4 border-gray-300" />
//             <br/>
//             <br/>
//             <nav className="flex-1">
//                 {navItems.map((item) => (
//                     <button
//                         key={item.id}
//                         className={`w-12 h-12 mb-4 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors duration-200 ${
//                             activeIcon === item.id ? 'bg-gray-200 dark:bg-gray-600' : ''
//                         }`}
//                         onClick={() => {
//                             setActiveIcon(item.id);
//                             if (item.id === 'templates') {
//                                 handleTemplateClick();
//                             } else {
//                                 onIconClick(item.id);
//                             }
//                         }}
//                     >
//                         <item.icon size={24}/>
//                     </button>
//                 ))}
//             </nav>
//             <button
//
//                 className="w-full h-12 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors duration-200"
//             >
//                 {/*{theme === 'light' ? <Moon size={24}/> : <Sun size={24}/>}*/}
//             </button>
//             <TemplateMessageModal
//                 isOpen={isTemplateModalOpen}
//                 onClose={() => setIsTemplateModalOpen(false)}
//                 onAddTemplate={onAddTemplate}
//             />
//         </div>
//     )
// }
//
