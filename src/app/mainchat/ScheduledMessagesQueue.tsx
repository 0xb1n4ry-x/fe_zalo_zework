import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Clock, X } from 'lucide-react'

interface ScheduledMessage {
  id: number;
  content: string;
  scheduledTime: string;
}

interface ScheduledMessagesQueueProps {
  messages: ScheduledMessage[];
  onDelete: (id: number) => void;
}

export function ScheduledMessagesQueue({ messages, onDelete }: ScheduledMessagesQueueProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="sm"
        className="mb-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Clock className="mr-2 h-4 w-4" />
        Tin nhắn đã lên lịch ({messages.length})
      </Button>
      {isOpen && (
        <div className="absolute bottom-full left-0 mb-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="p-2 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <h3 className="font-semibold text-sm">Tin nhắn đã lên lịch</h3>
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <ScrollArea className="h-64">
            {messages.length === 0 ? (
              <p className="text-center text-gray-500 dark:text-gray-400 p-4">
                Không có tin nhắn nào được lên lịch
              </p>
            ) : (
              <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                {messages.map((message) => (
                  <li key={message.id} className="p-2 hover:bg-gray-50 dark:hover:bg-gray-700">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100 line-clamp-2">
                          {message.content}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {new Date(message.scheduledTime).toLocaleString()}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDelete(message.id)}
                        className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </ScrollArea>
        </div>
      )}
    </div>
  );
}

