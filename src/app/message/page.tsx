"use client"
import { SetStateAction, useState} from "react"
import ContactsSidebar from "@/components/message/ContactsSidebar"
import NavigationSidebar from "@/components/message/NavigationSidebar"
import WelcomeScreen from "@/components/message/WelcomeScreen"
import ChatInterface from "@/components/message/ChatInterface"
import RecentMessagesSidebar from "@/components/message/RecentMessagesSidebar"
import GroupsSidebar from "@/components/message/GroupsSidebar"
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
type Tag = {
  text: string;
  color: string;
};
type Member = {
  name: string;
  online: Date | boolean;
};
type Contact = {
  id: string;
  name: string;
  displayName: string;
  avatar: string;
  tags?: Tag[]
};
type group = {
  id: string;
  groupId : string;
  name: string
  avt : string;
  fullAvt : string;
  avatar: string;
  isGroup: boolean;
  totalMember : number;
  isActive: boolean
  displayName: string
  lastActionTime: number
  online: boolean
  unread: number
  type: string
  createdAt: Date | boolean
  members:Member[];
  createdDate : string
  lastMessage : {
    sender: string
    text: string
    timestamp: string
  }
  tags?: Tag[]
};

export default function MessagingApp() {

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [activeNav, setActiveNav] = useState("groups") // "contacts", "messages", or "groups"
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<group | null>(null);

  const handleContactSelect = (contact: Contact) => {
    setSelectedContact(contact)
  }
  const handleGroupSelect = (contact: group) => {
    setSelectedGroup(contact)
  }
  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  const handleNavChange = (navItem: SetStateAction<string>) => {
    setActiveNav(navItem)
  }

  const queryClient = new QueryClient()

  return (
      <QueryClientProvider client={queryClient}>
    <div className="flex h-screen bg-gray-50">
      {/* Navigation Sidebar */}
      <NavigationSidebar activeNav={activeNav} onNavChange={handleNavChange} />

      {/* Left Sidebar - either Contacts, Recent Messages, or Groups */}
      {activeNav === "contacts" ? (
        <ContactsSidebar
          onContactSelect={handleContactSelect}
          selectedContact={selectedContact}
          isCollapsed={sidebarCollapsed}
          onToggleCollapse={toggleSidebar}
        />
      ) : activeNav === "messages" ? (
        <RecentMessagesSidebar
          onContactSelect={handleContactSelect}
          selectedContact={selectedContact}
          isCollapsed={sidebarCollapsed}
          onToggleCollapse={toggleSidebar}
        />
      ) : (
        <GroupsSidebar
          onContactSelect={handleGroupSelect}
          selectedContact={selectedGroup}
          isCollapsed={sidebarCollapsed}
          onToggleCollapse={toggleSidebar}
        />
      )}

      {/* Main Content */}
      {selectedContact ? <ChatInterface contact={selectedContact} /> : <WelcomeScreen />}
    </div>
      </QueryClientProvider>
  )
}

