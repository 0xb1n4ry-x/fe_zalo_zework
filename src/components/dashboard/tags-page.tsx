"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
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
import { Plus, Search, Tag, Trash2 } from "lucide-react"

export default function TagsPage() {
  const [tags, setTags] = useState([...initialTags])
  const [searchQuery, setSearchQuery] = useState("")

  const filteredTags = tags.filter(
    (tag) =>
      tag.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tag.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleAddTag = (newTag) => {
    setTags([...tags, { ...newTag, id: tags.length + 1 }])
  }

  const handleDeleteTag = (id) => {
    setTags(tags.filter((tag) => tag.id !== id))
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Thẻ Người Dùng" text="Quản lý thẻ cho người dùng Zalo." />
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Tìm kiếm thẻ..."
              className="h-9 w-[250px] lg:w-[300px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <AddTagDialog onAddTag={handleAddTag} />
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Thẻ Người Dùng</CardTitle>
            <CardDescription>Thẻ được sử dụng để phân loại và phân đoạn người dùng Zalo của bạn.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tên Thẻ</TableHead>
                  <TableHead>Mô Tả</TableHead>
                  <TableHead>Người Dùng</TableHead>
                  <TableHead>Ngày Tạo</TableHead>
                  <TableHead>Sử Dụng Gần Đây</TableHead>
                  <TableHead className="text-right">Thao Tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTags.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      Không tìm thấy thẻ nào.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredTags.map((tag) => (
                    <TableRow key={tag.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div
                            className="flex h-6 w-6 items-center justify-center rounded-full"
                            style={{ backgroundColor: tag.color }}
                          >
                            <Tag className="h-3 w-3 text-white" />
                          </div>
                          <span className="font-medium">{tag.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{tag.description}</TableCell>
                      <TableCell>{tag.users}</TableCell>
                      <TableCell>{tag.created}</TableCell>
                      <TableCell>{tag.lastUsed}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteTag(tag.id)}>
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Xóa</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  )
}

function AddTagDialog({ onAddTag }) {
  const [open, setOpen] = useState(false)
  const [newTag, setNewTag] = useState({
    name: "",
    description: "",
    color: "#3b82f6",
    users: "0",
    created: new Date().toLocaleDateString(),
    lastUsed: "Chưa bao giờ",
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onAddTag(newTag)
    setNewTag({
      name: "",
      description: "",
      color: "#3b82f6",
      users: "0",
      created: new Date().toLocaleDateString(),
      lastUsed: "Chưa bao giờ",
    })
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Thêm Thẻ
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Thêm Thẻ Mới</DialogTitle>
          <DialogDescription>Tạo thẻ mới để phân loại người dùng Zalo.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Tên Thẻ</Label>
              <Input
                id="name"
                value={newTag.name}
                onChange={(e) => setNewTag({ ...newTag, name: e.target.value })}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Mô Tả</Label>
              <Input
                id="description"
                value={newTag.description}
                onChange={(e) => setNewTag({ ...newTag, description: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="color">Màu Sắc</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="color"
                  type="color"
                  className="h-10 w-10 p-1"
                  value={newTag.color}
                  onChange={(e) => setNewTag({ ...newTag, color: e.target.value })}
                />
                <div className="text-sm">{newTag.color}</div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Thêm Thẻ</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

const initialTags = [
  {
    id: 1,
    name: "Khách Hàng VIP",
    description: "Khách hàng có giá trị cao",
    color: "#f59e0b",
    users: "128",
    created: "15/01/2024",
    lastUsed: "Hôm nay",
  },
  {
    id: 2,
    name: "Người Dùng Mới",
    description: "Người dùng tham gia trong 30 ngày qua",
    color: "#10b981",
    users: "256",
    created: "20/01/2024",
    lastUsed: "Hôm nay",
  },
  {
    id: 3,
    name: "Không Hoạt Động",
    description: "Người dùng không hoạt động trong 90+ ngày",
    color: "#ef4444",
    users: "87",
    created: "05/02/2024",
    lastUsed: "Hôm qua",
  },
  {
    id: 4,
    name: "Mua Hàng Thường Xuyên",
    description: "Người dùng mua hàng ít nhất một lần mỗi tháng",
    color: "#3b82f6",
    users: "192",
    created: "10/02/2024",
    lastUsed: "Hôm nay",
  },
  {
    id: 5,
    name: "Yêu Cầu Hỗ Trợ",
    description: "Người dùng đã mở yêu cầu hỗ trợ",
    color: "#8b5cf6",
    users: "64",
    created: "01/03/2024",
    lastUsed: "3 ngày trước",
  },
]

