import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

interface TemplateMessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTemplate: (template: TemplateMessage) => void;
}

interface TemplateMessage {
  id: string;
  shorthand: string;
  content: string;
}

export default function TemplateMessageModal({ isOpen, onClose, onAddTemplate }: TemplateMessageModalProps) {
  const [templates, setTemplates] = useState<TemplateMessage[]>([]);
  const [newShorthand, setNewShorthand] = useState('');
  const [newContent, setNewContent] = useState('');

  const handleAddTemplate = () => {
    if (newShorthand.trim() !== '' && newContent.trim() !== '') {
      const newTemplateMessage: TemplateMessage = {
        id: Date.now().toString(),
        shorthand: newShorthand,
        content: newContent,
      };
      setTemplates([...templates, newTemplateMessage]);
      onAddTemplate(newTemplateMessage);
      setNewShorthand('');
      setNewContent('');
    }
  };

  const handleDeleteTemplate = (id: string) => {
    setTemplates(templates.filter(template => template.id !== id));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Template Messages</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="newShorthand">Tin Nhắn Nhanh</Label>
            <Input
              id="newShorthand"
              placeholder="Nhập kí tự (e.g., /hello)"
              value={newShorthand}
              onChange={(e) => setNewShorthand(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="newContent">Nội Dung</Label>
            <Textarea
              id="newContent"
              placeholder="Nhập nội dung"
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
            />
          </div>
          <Button onClick={handleAddTemplate}>Thêm mẫu</Button>
          <div className="mt-4">
            <h3 className="mb-2 font-semibold">Các mẫu đã lưu</h3>
            {templates.map((template) => (
              <div key={template.id} className="flex justify-between items-center mb-2 p-2 bg-gray-100 dark:bg-gray-700 rounded">
                <div>
                  <p className="font-semibold">{template.shorthand}</p>
                  <p className="text-sm">{template.content}</p>
                </div>
                <Button variant="destructive" size="sm" onClick={() => handleDeleteTemplate(template.id)}>Xoá</Button>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

