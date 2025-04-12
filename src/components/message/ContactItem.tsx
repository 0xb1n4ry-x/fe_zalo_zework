"use client"

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {UserAvatar} from "@/components/message/UserAvatar";
import React from "react";

interface Tag {
  text: string
  color: string
}

interface ContactItemProps {
  contact: {
    name: string
    avatar: string
    isActive : number
    displayName: string
    lastActionTime: number
    online: boolean
    tags?: Tag[]
  }
  index: number
  isSelected?: boolean
  onClick: () => void
  isCollapsed?: boolean
}

export default function ContactItem({ contact, isSelected, onClick, isCollapsed }: ContactItemProps) {
  const contactAvatar = (
    <div className="relative">
      <div
        className={`${isCollapsed ? "w-10 h-10" : "w-12 h-12"} rounded-full overflow-hidden shadow-sm transition-all duration-300`}
      >
        <UserAvatar
            avatar={contact.avatar}
            displayName={contact.displayName}
            isActive={contact.isActive}
            lastActionTime={contact.lastActionTime}
        />
      </div>

    </div>
  )

  const getTagColor = (color: string) => {
    switch (color) {
      case "blue":
        return "bg-blue-100 text-blue-800"
      case "green":
        return "bg-green-100 text-green-800"
      case "red":
        return "bg-red-100 text-red-800"
      case "purple":
        return "bg-purple-100 text-purple-800"
      case "amber":
        return "bg-amber-100 text-amber-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (isCollapsed) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div
              className={`flex justify-center p-2 my-1 rounded-xl cursor-pointer transition-all duration-200 ${
                isSelected ? "bg-gradient-to-r from-blue-50 to-blue-100 border-l-4 border-blue-500" : "hover:bg-gray-50"
              }`}
              onClick={onClick}
            >
              {contactAvatar}
            </div>
          </TooltipTrigger>
          <TooltipContent side="right">
            <div>
              <div className="font-medium">{contact.name}</div>
              {contact.tags && contact.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-1">
                  {contact.tags.map((tag, idx) => (
                    <span key={idx} className={`text-xs px-1.5 py-0.5 rounded-full ${getTagColor(tag.color)}`}>
                      {tag.text}
                    </span>
                  ))}
                </div>
              )}
              <div className="text-xs text-gray-500 mt-1">
                {contact.isActive ? "Online now" : `Last active: ${contact.lastActionTime}`}
              </div>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }

  return (
    <div
      className={`flex items-center gap-3 p-3 my-1 rounded-xl cursor-pointer transition-all duration-200 ${
        isSelected ? "bg-gradient-to-r from-blue-50 to-blue-100 border-l-4 border-blue-500" : "hover:bg-gray-50"
      }`}
      onClick={onClick}
    >
      {contactAvatar}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 flex-wrap">
          <div className={`font-medium ${isSelected ? "text-blue-700" : "text-gray-800"}`}>{contact.displayName}</div>
          {contact.tags &&
            contact.tags.map((tag, idx) => (
              <span key={idx} className={`text-xs px-1.5 py-0.5 rounded-full ${getTagColor(tag.color)}`}>
                {tag.text}
              </span>
            ))}
        </div>
        <div className="text-xs text-gray-500 mt-0.5 truncate">

        </div>
      </div>
    </div>
  )
}

