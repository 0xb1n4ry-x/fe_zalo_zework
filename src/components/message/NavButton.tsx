"use client"

import type { ReactNode } from "react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface NavButtonProps {
  icon: ReactNode
  active?: boolean
  tooltip?: string
  onClick?: () => void
}

export default function NavButton({ icon, active = false, tooltip, onClick }: NavButtonProps) {
  const button = (
    <button
      className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 ${
        active ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-md" : "text-gray-500 hover:bg-gray-100"
      }`}
      onClick={onClick}
    >
      {icon}
    </button>
  )

  if (tooltip) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>{button}</TooltipTrigger>
          <TooltipContent side="right">
            <p>{tooltip}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }

  return button
}

