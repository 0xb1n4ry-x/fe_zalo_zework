"use client"

import { Users, Calendar, FileText, Search, Settings, MessageSquare, UserPlus } from "lucide-react"
import NavButton from "./NavButton"
type NavigationSidebarProps = {
    activeNav: string
    onNavChange: (nav: string) => void
}
export default function NavigationSidebar({ activeNav, onNavChange }: NavigationSidebarProps) {
  return (
    <div className="w-16 flex flex-col items-center py-6 bg-white shadow-md z-10">
      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold mb-8">
        Z
      </div>

      <div className="space-y-2">
        <NavButton
          icon={<MessageSquare size={20} />}
          active={activeNav === "messages"}
          tooltip="Messages"
          onClick={() => onNavChange("messages")}
        />
        <NavButton
          icon={<Users size={20} />}
          active={activeNav === "contacts"}
          tooltip="Contacts"
          onClick={() => onNavChange("contacts")}
        />
        <NavButton
          icon={<UserPlus size={20} />}
          active={activeNav === "groups"}
          tooltip="Groups"
          onClick={() => onNavChange("groups")}
        />
        <NavButton icon={<Calendar size={20} />} tooltip="Calendar" />
        <NavButton icon={<FileText size={20} />} tooltip="Files" />
        <NavButton icon={<Search size={20} />} tooltip="Search" />
        <NavButton icon={<Settings size={20} />} tooltip="Settings" />
      </div>

      <div className="mt-auto">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-white shadow-sm">
          N
        </div>
      </div>
    </div>
  )
}

