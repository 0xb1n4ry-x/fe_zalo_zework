"use client"
import { useState } from "react"
import ContactsSidebar from "@/components/message/ContactsSidebar"
import NavigationSidebar from "@/components/message/NavigationSidebar"
import WelcomeScreen from "@/components/message/WelcomeScreen"
import ChatInterface from "@/components/message/ChatInterface"
import RecentMessagesSidebar from "@/components/message/RecentMessagesSidebar"
import GroupsSidebar from "@/components/message/GroupsSidebar"
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

export default function MessagingApp() {
  const [selectedContact, setSelectedContact] = useState(null)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [activeNav, setActiveNav] = useState("groups") // "contacts", "messages", or "groups"

  const handleContactSelect = (contact) => {
    setSelectedContact(contact)
  }

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  const handleNavChange = (navItem) => {
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
          onContactSelect={handleContactSelect}
          selectedContact={selectedContact}
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

