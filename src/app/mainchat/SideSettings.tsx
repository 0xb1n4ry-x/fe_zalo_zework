import { Bell, ChevronDown, Clock, Image, FileText, LinkIcon, Lock, MessageSquareOff, AlertTriangle, Trash2, UserPlus, Volume2 } from 'lucide-react'
import { useState } from 'react'

interface SideSettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Section {
  title: string;
  content: string;
  icon: React.ReactNode;
}

export default function SideSettings({ isOpen, onClose }: SideSettingsProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  const toggleSection = (title: string) => {
    setExpandedSections(prev => 
      prev.includes(title) 
        ? prev.filter(t => t !== title)
        : [...prev, title]
    );
  };

  const sections: Section[] = [
    {
      title: "Danh sách nhắc hẹn",
      content: "Chưa có lịch hẹn nào được tạo",
      icon: <Clock className="w-5 h-5" />
    },
    {
      title: "Ảnh/Video",
      content: "Chưa có Ảnh/Video được chia sẻ trong hội thoại này",
      icon: <Image className="w-5 h-5" />
    },
    {
      title: "File",
      content: "Chưa có File được chia sẻ trong hội thoại này",
      icon: <FileText className="w-5 h-5" />
    },
    {
      title: "Link",
      content: "Chưa có Link được chia sẻ trong hội thoại này",
      icon: <LinkIcon className="w-5 h-5" />
    }
  ];

  return (
    <div className="w-80 bg-gray-800 dark:bg-gray-900 text-gray-100 flex flex-col h-full border-l border-gray-700">
      {/* Profile Section */}
      <div className="p-4 flex flex-col items-center border-b border-gray-700">
        <div className="w-20 h-20 rounded-full overflow-hidden mb-2">
          <img 
            src="/placeholder.svg?height=80&width=80" 
            alt="Profile" 
            className="w-full h-full object-cover"
          />
        </div>
        <h2 className="text-lg font-semibold mb-4 text-gray-100">?</h2>
        <div className="flex justify-center space-x-8 w-full">
          <button className="flex flex-col items-center text-xs text-gray-300 hover:text-gray-100 transition-colors">
            <Bell className="w-6 h-6 mb-1" />
            <span>Tắt thông báo</span>
          </button>
          <button className="flex flex-col items-center text-xs text-gray-300 hover:text-gray-100 transition-colors">
            <Volume2 className="w-6 h-6 mb-1" />
            <span>Ghim hội thoại</span>
          </button>
          <button className="flex flex-col items-center text-xs text-gray-300 hover:text-gray-100 transition-colors">
            <UserPlus className="w-6 h-6 mb-1" />
            <span>Tạo nhóm trò chuyện</span>
          </button>
        </div>
      </div>

      {/* Collapsible Sections */}
      <div className="flex-1 overflow-y-auto">
        {sections.map((section) => (
          <div key={section.title} className="border-b border-gray-700">
            <button
              onClick={() => toggleSection(section.title)}
              className="flex items-center justify-between w-full p-4 hover:bg-gray-700 transition-colors"
            >
              <div className="flex items-center space-x-2 text-gray-300">
                {section.icon}
                <span>{section.title}</span>
              </div>
              <ChevronDown 
                className={`w-5 h-5 text-gray-400 transition-transform ${
                  expandedSections.includes(section.title) ? 'rotate-180' : ''
                }`}
              />
            </button>
            {expandedSections.includes(section.title) && (
              <div className="px-4 py-3 text-sm text-gray-400 bg-gray-800/50">
                {section.content}
              </div>
            )}
          </div>
        ))}

        {/* Privacy Settings */}
        <div className="p-4 space-y-4">
          <h3 className="text-sm font-semibold mb-2 text-gray-300">Thiết lập bảo mật</h3>
          <div className="space-y-4">
            <button className="flex items-center space-x-3 w-full hover:bg-gray-700 p-2 rounded transition-colors">
              <MessageSquareOff className="w-5 h-5 text-gray-400" />
              <div className="flex flex-col items-start">
                <span className="text-sm text-gray-300">Tin nhắn tự xóa</span>
                <span className="text-xs text-gray-500">Không bao giờ</span>
              </div>
            </button>
            <div className="flex items-center justify-between hover:bg-gray-700 p-2 rounded transition-colors">
              <div className="flex items-center space-x-3">
                <Lock className="w-5 h-5 text-gray-400" />
                <span className="text-sm text-gray-300">Ẩn trò chuyện</span>
              </div>
              <div className="relative">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  id="hide-chat"
                />
                <div className="w-9 h-5 bg-gray-600 rounded-full peer peer-checked:bg-blue-600 transition-colors"></div>
                <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-all peer-checked:translate-x-4"></div>
              </div>
            </div>
            <button className="flex items-center space-x-3 w-full hover:bg-gray-700 p-2 rounded transition-colors">
              <AlertTriangle className="w-5 h-5 text-gray-400" />
              <span className="text-sm text-gray-300">Báo xấu</span>
            </button>
            <button className="flex items-center space-x-3 w-full hover:bg-gray-700 p-2 rounded text-red-500 transition-colors">
              <Trash2 className="w-5 h-5" />
              <span className="text-sm">Xóa lịch sử trò chuyện</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

