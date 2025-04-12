"use client"
import { Search, Plus, Users, ChevronLeft, ChevronRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import ContactItem from "./ContactItem"
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

type ContactsSidebarProps = {
  onContactSelect: (contact: Contact) => void;
  selectedContact: Contact | null;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
};
export default function ContactsSidebar({
                                          onContactSelect,
                                          selectedContact,
                                          isCollapsed,
                                          onToggleCollapse,
                                        }: ContactsSidebarProps) {


  // Render rate limit error message if that's the issue

  const data = JSON.parse(localStorage.getItem("cachedContacts") as string)
  const contacts = Array.isArray(data) ? data : []

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
              <Users size={18} />
            </div>
            {!isCollapsed && <h1 className="font-semibold text-gray-800">Danh bạ</h1>}
          </div>
          {!isCollapsed && (
              <Button variant="ghost" size="icon" className="rounded-full text-gray-500 hover:text-gray-700">
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
                    placeholder="Tìm Kiếm"
                    className="pl-9 bg-gray-50 border-gray-200 rounded-xl focus-visible:ring-blue-500"
                />
              </div>
            </div>
        )}

        {/* Contacts List */}
        <div className={`flex-1 overflow-y-auto ${isCollapsed ? "px-1" : "px-2"}`}>
          {contacts.map((contact, index) => (
              <ContactItem
                  key={contact}
                  contact={contact}
                  index={index}
                  isSelected={selectedContact?.displayName === contact.displayName}
                  onClick={() => onContactSelect(contact)}
                  isCollapsed={isCollapsed}
              />
          ))}
        </div>

        {/* Bottom Button */}
        {!isCollapsed && (
            <div className="p-4 border-t border-gray-100">
              <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl py-5 shadow-sm">
                <Search size={16} className="mr-2" />
                Tìm Kiếm Qua Số Điện Thoại
              </Button>
            </div>
        )}
      </div>
  )
}

