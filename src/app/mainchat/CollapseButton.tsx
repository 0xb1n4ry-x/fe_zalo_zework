import { ChevronLeft, ChevronRight } from 'lucide-react'

interface CollapseButtonProps {
  isCollapsed: boolean
  onClick: () => void
}

export default function CollapseButton({ isCollapsed, onClick }: CollapseButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center w-6 h-12 bg-white border border-gray-200 rounded-r-full shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
        isCollapsed ? '-mr-3' : '-ml-3'
      }`}
      aria-label={isCollapsed ? "Expand chat list" : "Collapse chat list"}
    >
      {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
    </button>
  )
}

