'use client'
import Sidebar from '@/app/mainchat/Sidebar'
import ChatList from '@/app/mainchat/ChatList'
import ChatArea from '@/app/mainchat/ChatArea'
import SearchDialog from '@/app/mainchat/SearchDialog'
import { ToastContainer } from '@/components/ui/use-toast'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import {useState} from "react";


const queryClient = new QueryClient()


interface TemplateMessage {
    id: string;
    shorthand: string;
    content: string;
}

export default  function Mainchat() {

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




