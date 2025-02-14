'use client'

import { useState} from 'react'
import Sidebar from '@/components/Sidebar'
import ChatList from '@/components/ChatList'
import ChatArea from '@/components/ChatArea'
import SearchDialog from '@/components/SearchDialog'
import { ToastContainer } from '@/components/ui/use-toast'

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"


const queryClient = new QueryClient()


interface TemplateMessage {
    id: string;
    shorthand: string;
    content: string;
}

export default  function Home() {

    const [activeIcon, setActiveIcon] = useState<string | null>(null)
    const [isSearchDialogOpen, setIsSearchDialogOpen] = useState(false)
    const [templates, setTemplates] = useState<TemplateMessage[]>([])
    const [selectedUserId, setSelectedUserId] = useState<string | null>(null)

    const handleUserSelect = (userId: string) => {
        setSelectedUserId(userId)
    }


    const handleIconClick = (iconId: string) => {
        setActiveIcon(iconId)
        if (iconId === 'search') {
            setIsSearchDialogOpen(true)
        }
    }

    const handleAddTemplate = (template: TemplateMessage) => {
        setTemplates([...templates, template])
    }



    return (
        <QueryClientProvider client={queryClient}>
        <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
            <Sidebar onIconClick={handleIconClick} onAddTemplate={handleAddTemplate}  />
            <div className="flex flex-1 overflow-hidden">
                <ChatList onUserSelect={handleUserSelect} />
                <ChatArea selectedUserId={selectedUserId} templates={templates} />
            </div>
            <SearchDialog
                isOpen={isSearchDialogOpen}
                onClose={() => setIsSearchDialogOpen(false)}
            />
            <ToastContainer/>
        </div>
        </QueryClientProvider>

    )
}


//
// 'use client'
//
// import { useEffect, useState } from 'react'
//
// import ExistingUserLogin from '@/components/ExistingUserLogin'
// import { checkExistingUser } from '@/lib/api'
// import types { UserData } from '@/types'
// import QRCodeLogin from "@/components/QRCodeLogin";
//
//
//
// export default function Home() {
//     const [existingUser, setExistingUser] = useState<UserData | null>(null)
//
//
//     useEffect(() => {
//
//
//         const fetchExistingUser = async () => {
//             const userData = await checkExistingUser()
//             if (userData) {
//                 setExistingUser(userData)
//             }
//         }
//         fetchExistingUser()
//     }, [])
//
//     return (
//
//
//         <div className="flex justify-center items-center min-h-screen bg-gray-100">
//             <div className="bg-white p-10 rounded-lg shadow-md w-[350px] text-center">
//                 {existingUser ? (
//                     <ExistingUserLogin userData={existingUser} />
//                 ) : (
//                     <QRCodeLogin />
//                 )}
//             </div>
//         </div>
//     )
// }
//
