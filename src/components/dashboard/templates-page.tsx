"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Copy, Plus, Search, AlertCircle, Edit, Trash2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function TemplatesPage() {
  const [templates, setTemplates] = useState([...initialTemplates])
  const [searchQuery, setSearchQuery] = useState("")
  const [editingTemplate, setEditingTemplate] = useState(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  const filteredTemplates = templates.filter(
    (template) =>
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.content.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleAddTemplate = (newTemplate) => {
    setTemplates([...templates, { ...newTemplate, id: templates.length + 1 }])
  }

  const handleEditTemplate = (template) => {
    setEditingTemplate(template)
    setIsEditDialogOpen(true)
  }

  const handleUpdateTemplate = (updatedTemplate) => {
    setTemplates(templates.map((template) => (template.id === updatedTemplate.id ? updatedTemplate : template)))
    setIsEditDialogOpen(false)
  }

  const handleDeleteTemplate = (id) => {
    setTemplates(templates.filter((template) => template.id !== id))
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Mẫu Tin Nhắn" text="Tạo và quản lý mẫu tin nhắn." />
      <Tabs defaultValue="all" className="space-y-4">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="all">Tất Cả Mẫu</TabsTrigger>
            <TabsTrigger value="welcome">Chào Mừng</TabsTrigger>
            <TabsTrigger value="support">Hỗ Trợ</TabsTrigger>
            <TabsTrigger value="marketing">Marketing</TabsTrigger>
          </TabsList>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Tìm kiếm mẫu..."
                className="h-9 w-[200px] lg:w-[250px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <AddTemplateDialog onAddTemplate={handleAddTemplate} existingTemplates={templates} />
          </div>
        </div>
        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredTemplates.map((template) => (
              <TemplateCard
                key={template.id}
                template={template}
                onEdit={handleEditTemplate}
                onDelete={handleDeleteTemplate}
              />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="welcome" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredTemplates
              .filter((template) => template.category === "Chào Mừng")
              .map((template) => (
                <TemplateCard
                  key={template.id}
                  template={template}
                  onEdit={handleEditTemplate}
                  onDelete={handleDeleteTemplate}
                />
              ))}
          </div>
        </TabsContent>
        <TabsContent value="support" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredTemplates
              .filter((template) => template.category === "Hỗ Trợ")
              .map((template) => (
                <TemplateCard
                  key={template.id}
                  template={template}
                  onEdit={handleEditTemplate}
                  onDelete={handleDeleteTemplate}
                />
              ))}
          </div>
        </TabsContent>
        <TabsContent value="marketing" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredTemplates
              .filter((template) => template.category === "Marketing")
              .map((template) => (
                <TemplateCard
                  key={template.id}
                  template={template}
                  onEdit={handleEditTemplate}
                  onDelete={handleDeleteTemplate}
                />
              ))}
          </div>
        </TabsContent>
      </Tabs>

      {editingTemplate && (
        <EditTemplateDialog
          template={editingTemplate}
          isOpen={isEditDialogOpen}
          onClose={() => setIsEditDialogOpen(false)}
          onUpdate={handleUpdateTemplate}
          existingTemplates={templates.filter((t) => t.id !== editingTemplate.id)}
        />
      )}
    </DashboardShell>
  )
}

function TemplateCard({ template, onEdit, onDelete }) {
  const handleCopy = () => {
    navigator.clipboard.writeText(template.content)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle>{template.name}</CardTitle>
            <CardDescription>{template.description}</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <div
              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                template.category === "Chào Mừng"
                  ? "bg-green-100 text-green-800"
                  : template.category === "Hỗ Trợ"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-purple-100 text-purple-800"
              }`}
            >
              {template.category}
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
                  <span className="sr-only">Mở menu</span>
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                  >
                    <path
                      d="M3.625 7.5C3.625 8.12132 3.12132 8.625 2.5 8.625C1.87868 8.625 1.375 8.12132 1.375 7.5C1.375 6.87868 1.87868 6.375 2.5 6.375C3.12132 6.375 3.625 6.87868 3.625 7.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM13.625 7.5C13.625 8.12132 13.1213 8.625 12.5 8.625C11.8787 8.625 11.375 8.12132 11.375 7.5C11.375 6.87868 11.8787 6.375 12.5 6.375C13.1213 6.375 13.625 6.87868 13.625 7.5Z"
                      fill="currentColor"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onEdit(template)}>
                  <Edit className="mr-2 h-4 w-4" />
                  Chỉnh sửa
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onDelete(template.id)} className="text-red-600 focus:text-red-600">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Xóa
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md bg-muted p-3 text-sm whitespace-pre-wrap">
          {template.content.split(/(\{[^}]+\})/).map((part, index) => {
            if (part.match(/\{[^}]+\}/)) {
              return (
                <span key={index} className="px-1 bg-primary/10 text-primary font-medium rounded">
                  {part}
                </span>
              )
            }
            return <span key={index}>{part}</span>
          })}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="text-xs text-muted-foreground">Cập nhật lần cuối: {template.updated}</div>
        <Button variant="ghost" size="sm" onClick={handleCopy}>
          <Copy className="mr-2 h-4 w-4" />
          Sao chép
        </Button>
      </CardFooter>
    </Card>
  )
}

function AddTemplateDialog({ onAddTemplate, existingTemplates }) {
  const [open, setOpen] = useState(false)
  const [newTemplate, setNewTemplate] = useState({
    name: "",
    description: "",
    category: "Chào Mừng",
    content: "",
    updated: new Date().toLocaleDateString(),
  })
  const [duplicateError, setDuplicateError] = useState(null)
  // Trong AddTemplateDialog, thêm state để theo dõi lỗi trùng lặp tên
  const [duplicateNameError, setDuplicateNameError] = useState(null)

  // Thêm hàm kiểm tra trùng lặp tên
  const checkDuplicateName = (name) => {
    const normalizedName = name.trim().toLowerCase()
    const duplicate = existingTemplates.find((template) => template.name.trim().toLowerCase() === normalizedName)

    if (duplicate) {
      return {
        exists: true,
        template: duplicate,
      }
    }

    return { exists: false }
  }

  // Thêm xử lý khi tên thay đổi
  const handleNameChange = (e) => {
    const name = e.target.value
    setNewTemplate({ ...newTemplate, name })

    // Kiểm tra trùng lặp khi tên thay đổi
    if (name.trim()) {
      const duplicateCheck = checkDuplicateName(name)
      if (duplicateCheck.exists) {
        setDuplicateNameError(duplicateCheck.template)
      } else {
        setDuplicateNameError(null)
      }
    } else {
      setDuplicateNameError(null)
    }
  }

  const checkDuplicateTemplate = (content) => {
    const normalizedContent = content.trim().toLowerCase()
    const duplicate = existingTemplates.find((template) => template.content.trim().toLowerCase() === normalizedContent)

    if (duplicate) {
      return {
        exists: true,
        template: duplicate,
      }
    }

    return { exists: false }
  }

  const handleContentChange = (e) => {
    const content = e.target.value
    setNewTemplate({ ...newTemplate, content })

    // Kiểm tra trùng lặp khi nội dung thay đổi
    if (content.trim()) {
      const duplicateCheck = checkDuplicateTemplate(content)
      if (duplicateCheck.exists) {
        setDuplicateError(duplicateCheck.template)
      } else {
        setDuplicateError(null)
      }
    } else {
      setDuplicateError(null)
    }
  }

  // Cập nhật handleSubmit để kiểm tra trùng lặp tên
  const handleSubmit = (e) => {
    e.preventDefault()

    // Kiểm tra lại trùng lặp tên trước khi thêm
    const duplicateNameCheck = checkDuplicateName(newTemplate.name)
    if (duplicateNameCheck.exists) {
      setDuplicateNameError(duplicateNameCheck.template)
      return
    }

    // Kiểm tra lại trùng lặp nội dung trước khi thêm
    const duplicateCheck = checkDuplicateTemplate(newTemplate.content)
    if (duplicateCheck.exists) {
      setDuplicateError(duplicateCheck.template)
      return
    }

    onAddTemplate(newTemplate)
    setNewTemplate({
      name: "",
      description: "",
      category: "Chào Mừng",
      content: "",
      updated: new Date().toLocaleDateString(),
    })
    setDuplicateError(null)
    setDuplicateNameError(null)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Thêm Mẫu
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Tạo Mẫu Mới</DialogTitle>
          <DialogDescription>Tạo mẫu tin nhắn mới cho đội của bạn sử dụng.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Tên Mẫu</Label>
                {/* Cập nhật phần Input tên trong form */}
                <Input
                  id="name"
                  value={newTemplate.name}
                  onChange={handleNameChange}
                  required
                  className={duplicateNameError ? "border-red-500 focus-visible:ring-red-500" : ""}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="category">Danh Mục</Label>
                <select
                  id="category"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={newTemplate.category}
                  onChange={(e) => setNewTemplate({ ...newTemplate, category: e.target.value })}
                >
                  <option value="Chào Mừng">Chào Mừng</option>
                  <option value="Hỗ Trợ">Hỗ Trợ</option>
                  <option value="Marketing">Marketing</option>
                </select>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Mô Tả</Label>
              <Input
                id="description"
                value={newTemplate.description}
                onChange={(e) => setNewTemplate({ ...newTemplate, description: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="content">Nội Dung Mẫu</Label>
              <Textarea
                id="content"
                rows={6}
                value={newTemplate.content}
                onChange={handleContentChange}
                required
                className={duplicateError ? "border-red-500 focus-visible:ring-red-500" : ""}
              />
              <p className="text-xs text-muted-foreground">
                Sử dụng <span className="px-1 bg-primary/10 text-primary font-medium rounded">{"{name}"}</span> cho tên
                khách hàng, <span className="px-1 bg-primary/10 text-primary font-medium rounded">{"{order_id}"}</span>{" "}
                cho mã đơn hàng, v.v.
              </p>
            </div>

            {duplicateError && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Phát hiện nội dung trùng lặp</AlertTitle>
                <AlertDescription>
                  Nội dung này trùng với mẫu tin nhắn "{duplicateError.name}" trong danh mục {duplicateError.category}.
                </AlertDescription>
              </Alert>
            )}
            {/* Thêm thông báo lỗi trùng lặp tên */}
            {duplicateNameError && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Phát hiện tên mẫu trùng lặp</AlertTitle>
                <AlertDescription>
                  Tên mẫu này đã tồn tại trong danh mục {duplicateNameError.category}.
                </AlertDescription>
              </Alert>
            )}
          </div>
          <DialogFooter>
            {/* Cập nhật nút submit để vô hiệu hóa khi có lỗi trùng lặp tên */}
            <Button type="submit" disabled={!!duplicateError || !!duplicateNameError}>
              Tạo Mẫu
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

function EditTemplateDialog({ template, isOpen, onClose, onUpdate, existingTemplates }) {
  const [editedTemplate, setEditedTemplate] = useState({ ...template })
  const [duplicateError, setDuplicateError] = useState(null)
  // Trong EditTemplateDialog, thêm state để theo dõi lỗi trùng lặp tên
  const [duplicateNameError, setDuplicateNameError] = useState(null)

  // Thêm hàm kiểm tra trùng lặp tên
  const checkDuplicateName = (name) => {
    const normalizedName = name.trim().toLowerCase()
    const duplicate = existingTemplates.find((template) => template.name.trim().toLowerCase() === normalizedName)

    if (duplicate) {
      return {
        exists: true,
        template: duplicate,
      }
    }

    return { exists: false }
  }

  // Thêm xử lý khi tên thay đổi
  const handleNameChange = (e) => {
    const name = e.target.value
    setEditedTemplate({ ...editedTemplate, name })

    // Kiểm tra trùng lặp khi tên thay đổi
    if (name.trim()) {
      const duplicateCheck = checkDuplicateName(name)
      if (duplicateCheck.exists) {
        setDuplicateNameError(duplicateCheck.template)
      } else {
        setDuplicateNameError(null)
      }
    } else {
      setDuplicateNameError(null)
    }
  }

  const checkDuplicateTemplate = (content) => {
    const normalizedContent = content.trim().toLowerCase()
    const duplicate = existingTemplates.find((template) => template.content.trim().toLowerCase() === normalizedContent)

    if (duplicate) {
      return {
        exists: true,
        template: duplicate,
      }
    }

    return { exists: false }
  }

  const handleContentChange = (e) => {
    const content = e.target.value
    setEditedTemplate({ ...editedTemplate, content })

    // Kiểm tra trùng lặp khi nội dung thay đổi
    if (content.trim()) {
      const duplicateCheck = checkDuplicateTemplate(content)
      if (duplicateCheck.exists) {
        setDuplicateError(duplicateCheck.template)
      } else {
        setDuplicateError(null)
      }
    } else {
      setDuplicateError(null)
    }
  }

  // Cập nhật handleSubmit để kiểm tra trùng lặp tên
  const handleSubmit = (e) => {
    e.preventDefault()

    // Kiểm tra lại trùng lặp tên trước khi cập nhật
    const duplicateNameCheck = checkDuplicateName(editedTemplate.name)
    if (duplicateNameCheck.exists) {
      setDuplicateNameError(duplicateNameCheck.template)
      return
    }

    // Kiểm tra lại trùng lặp nội dung trước khi cập nhật
    const duplicateCheck = checkDuplicateTemplate(editedTemplate.content)
    if (duplicateCheck.exists) {
      setDuplicateError(duplicateCheck.template)
      return
    }

    // Cập nhật ngày chỉnh sửa
    const updatedTemplate = {
      ...editedTemplate,
      updated: new Date().toLocaleDateString(),
    }

    onUpdate(updatedTemplate)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Chỉnh Sửa Mẫu Tin Nhắn</DialogTitle>
          <DialogDescription>Cập nhật thông tin và nội dung mẫu tin nhắn.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-name">Tên Mẫu</Label>
                {/* Cập nhật phần Input tên trong form */}
                <Input
                  id="edit-name"
                  value={editedTemplate.name}
                  onChange={handleNameChange}
                  required
                  className={duplicateNameError ? "border-red-500 focus-visible:ring-red-500" : ""}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-category">Danh Mục</Label>
                <select
                  id="edit-category"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={editedTemplate.category}
                  onChange={(e) => setEditedTemplate({ ...editedTemplate, category: e.target.value })}
                >
                  <option value="Chào Mừng">Chào Mừng</option>
                  <option value="Hỗ Trợ">Hỗ Trợ</option>
                  <option value="Marketing">Marketing</option>
                </select>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-description">Mô Tả</Label>
              <Input
                id="edit-description"
                value={editedTemplate.description}
                onChange={(e) => setEditedTemplate({ ...editedTemplate, description: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-content">Nội Dung Mẫu</Label>
              <Textarea
                id="edit-content"
                rows={6}
                value={editedTemplate.content}
                onChange={handleContentChange}
                required
                className={duplicateError ? "border-red-500 focus-visible:ring-red-500" : ""}
              />
              <p className="text-xs text-muted-foreground">
                Sử dụng <span className="px-1 bg-primary/10 text-primary font-medium rounded">{"{name}"}</span> cho tên
                khách hàng, <span className="px-1 bg-primary/10 text-primary font-medium rounded">{"{order_id}"}</span>{" "}
                cho mã đơn hàng, v.v.
              </p>
            </div>

            {duplicateError && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Phát hiện nội dung trùng lặp</AlertTitle>
                <AlertDescription>
                  Nội dung này trùng với mẫu tin nhắn "{duplicateError.name}" trong danh mục {duplicateError.category}.
                </AlertDescription>
              </Alert>
            )}
            {/* Thêm thông báo lỗi trùng lặp tên */}
            {duplicateNameError && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Phát hiện tên mẫu trùng lặp</AlertTitle>
                <AlertDescription>
                  Tên mẫu này đã tồn tại trong danh mục {duplicateNameError.category}.
                </AlertDescription>
              </Alert>
            )}
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} className="mr-2">
              Hủy
            </Button>
            {/* Cập nhật nút submit để vô hiệu hóa khi có lỗi trùng lặp tên */}
            <Button type="submit" disabled={!!duplicateError || !!duplicateNameError}>
              Lưu Thay Đổi
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

const initialTemplates = [
  {
    id: 1,
    name: "Tin Nhắn Chào Mừng",
    description: "Lời chào ban đầu cho người dùng mới",
    category: "Chào Mừng",
    content:
      "Xin chào {name}, chào mừng bạn đến với dịch vụ của chúng tôi! Chúng tôi rất vui khi có bạn tham gia. Nếu bạn có bất kỳ câu hỏi nào, hãy thoải mái hỏi nhé.",
    updated: "01/03/2024",
  },
  {
    id: 2,
    name: "Xác Nhận Đơn Hàng",
    description: "Xác nhận sau khi đặt hàng",
    category: "Hỗ Trợ",
    content:
      "Xin chào {name}, đơn hàng #{order_id} của bạn đã được xác nhận. Bạn có thể theo dõi trạng thái đơn hàng bất kỳ lúc nào thông qua ứng dụng của chúng tôi.",
    updated: "05/03/2024",
  },
  {
    id: 3,
    name: "Phản Hồi Yêu Cầu Hỗ Trợ",
    description: "Phản hồi ban đầu cho yêu cầu hỗ trợ",
    category: "Hỗ Trợ",
    content:
      "Xin chào {name}, chúng tôi đã nhận được yêu cầu hỗ trợ #{ticket_id} của bạn. Đội ngũ của chúng tôi đang xem xét và sẽ phản hồi trong vòng 24 giờ.",
    updated: "10/03/2024",
  },
  {
    id: 4,
    name: "Khuyến Mãi Đặc Biệt",
    description: "Thông báo về ưu đãi đặc biệt",
    category: "Marketing",
    content:
      "Xin chào {name}, chúng tôi có ưu đãi đặc biệt dành riêng cho bạn! Sử dụng mã {promo_code} để được giảm 20% cho đơn hàng tiếp theo. Có hiệu lực đến {expiry_date}.",
    updated: "15/03/2024",
  },
  {
    id: 5,
    name: "Yêu Cầu Đánh Giá",
    description: "Yêu cầu đánh giá sau khi sử dụng dịch vụ",
    category: "Hỗ Trợ",
    content:
      "Xin chào {name}, cảm ơn bạn đã sử dụng dịch vụ của chúng tôi. Chúng tôi rất mong nhận được đánh giá của bạn. Bạn có thể dành một chút thời gian để đánh giá trải nghiệm của mình không?",
    updated: "18/03/2024",
  },
  {
    id: 6,
    name: "Xác Minh Tài Khoản",
    description: "Tin nhắn xác minh email",
    category: "Chào Mừng",
    content:
      "Xin chào {name}, vui lòng xác minh địa chỉ email của bạn bằng cách nhấp vào liên kết chúng tôi đã gửi đến {email}. Điều này giúp chúng tôi bảo mật tài khoản của bạn.",
    updated: "20/03/2024",
  },
]

