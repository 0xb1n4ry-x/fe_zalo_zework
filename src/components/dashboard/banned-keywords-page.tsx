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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Plus, Search, Trash2 } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
type Keyword = {
  id: number
  word: string
  category: string
  addedBy: string
  dateAdded: string
  violations: string
}

type AddKeywordDialogProps = {
  onAddKeyword: (newKeyword: Keyword) => void
}

export default function BannedKeywordsPage() {
  const [keywords, setKeywords] = useState([...initialKeywords])
  const [violations] = useState([...initialViolations])
  const [searchQuery, setSearchQuery] = useState("")

  const filteredKeywords = keywords.filter(
    (keyword) =>
      keyword.word.toLowerCase().includes(searchQuery.toLowerCase()) ||
      keyword.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleAddKeyword = (keyword: { word: string }) => {
    const fullKeyword = {
      id: Date.now(),
      word: keyword.word,
      category: "Uncategorized",
      addedBy: "Admin",
      dateAdded: new Date().toISOString(),
      violations: "None",
    };

    setKeywords((prev) => [...prev, fullKeyword]);
  };

  const handleDeleteKeyword = (id: number) => {
    setKeywords(keywords.filter((keyword) => keyword.id !== id))
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Từ Khóa Cấm" text="Quản lý từ khóa cấm và xem các vi phạm." />
      <Tabs defaultValue="keywords" className="space-y-4">
        <TabsList>
          <TabsTrigger value="keywords">Từ Khóa</TabsTrigger>
          <TabsTrigger value="violations">Vi Phạm</TabsTrigger>
        </TabsList>
        <TabsContent value="keywords" className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Tìm kiếm từ khóa..."
                className="h-9 w-[250px] lg:w-[300px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <AddKeywordDialog onAddKeyword={handleAddKeyword} />
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Từ Khóa Cấm</CardTitle>
              <CardDescription>Danh sách từ khóa không được phép sử dụng trong tin nhắn.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Từ Khóa</TableHead>
                    <TableHead>Danh Mục</TableHead>
                    <TableHead>Người Thêm</TableHead>
                    <TableHead>Ngày Thêm</TableHead>
                    <TableHead>Vi Phạm</TableHead>
                    <TableHead className="text-right">Thao Tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredKeywords.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center">
                        Không tìm thấy từ khóa nào.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredKeywords.map((keyword) => (
                      <TableRow key={keyword.id}>
                        <TableCell className="font-medium">{keyword.word}</TableCell>
                        <TableCell>
                          <div
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                              keyword.category === "Tục tĩu"
                                ? "bg-red-100 text-red-800"
                                : keyword.category === "Quấy rối"
                                  ? "bg-orange-100 text-orange-800"
                                  : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {keyword.category}
                          </div>
                        </TableCell>
                        <TableCell>{keyword.addedBy}</TableCell>
                        <TableCell>{keyword.dateAdded}</TableCell>
                        <TableCell>{keyword.violations}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon" onClick={() => handleDeleteKeyword(keyword.id)}>
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
        </TabsContent>
        <TabsContent value="violations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Vi Phạm Từ Khóa</CardTitle>
              <CardDescription>Các vi phạm gần đây về từ khóa cấm.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nhân Viên</TableHead>
                    <TableHead>Từ Khóa</TableHead>
                    <TableHead>Danh Mục</TableHead>
                    <TableHead>Ngày</TableHead>
                    <TableHead>Tin Nhắn</TableHead>
                    <TableHead>Thao Tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {violations.map((violation) => (
                    <TableRow key={violation.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={violation.avatar} alt={violation.employee} />
                            <AvatarFallback>{violation.employee.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>{violation.employee}</div>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{violation.keyword}</TableCell>
                      <TableCell>
                        <div
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                            violation.category === "Tục tĩu"
                              ? "bg-red-100 text-red-800"
                              : violation.category === "Quấy rối"
                                ? "bg-orange-100 text-orange-800"
                                : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {violation.category}
                        </div>
                      </TableCell>
                      <TableCell>{violation.date}</TableCell>
                      <TableCell className="max-w-[200px] truncate">{violation.message}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          Xem Chi Tiết
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}


function AddKeywordDialog({ onAddKeyword }: { onAddKeyword: (keyword: { word: string }) => void }) {

  const [open, setOpen] = useState(false)
  const [newKeyword, setNewKeyword] = useState({
    word: "",
    category: "Tục tĩu",
    addedBy: "Quản Trị Viên",
    dateAdded: new Date().toLocaleDateString(),
    violations: "0",
  })

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    onAddKeyword(newKeyword)
    setNewKeyword({
      word: "",
      category: "Tục tĩu",
      addedBy: "Quản Trị Viên",
      dateAdded: new Date().toLocaleDateString(),
      violations: "0",
    })
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Thêm Từ Khóa
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Thêm Từ Khóa Cấm</DialogTitle>
          <DialogDescription>Thêm từ khóa mới vào danh sách cấm.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="word">Từ Khóa</Label>
              <Input
                id="word"
                value={newKeyword.word}
                onChange={(e) => setNewKeyword({ ...newKeyword, word: e.target.value })}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="category">Danh Mục</Label>
              <select
                id="category"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={newKeyword.category}
                onChange={(e) => setNewKeyword({ ...newKeyword, category: e.target.value })}
              >
                <option value="Tục tĩu">Tục tĩu</option>
                <option value="Quấy rối">Quấy rối</option>
                <option value="Thông tin nhạy cảm">Thông tin nhạy cảm</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Thêm Từ Khóa</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

const initialKeywords = [
  {
    id: 1,
    word: "từkhóacấm1",
    category: "Tục tĩu",
    addedBy: "Quản Trị Viên",
    dateAdded: "15/01/2024",
    violations: "12",
  },
  {
    id: 2,
    word: "từkhóacấm2",
    category: "Quấy rối",
    addedBy: "Quản Trị Viên",
    dateAdded: "03/02/2024",
    violations: "5",
  },
  {
    id: 3,
    word: "từkhóacấm3",
    category: "Tục tĩu",
    addedBy: "Quản Trị Viên",
    dateAdded: "15/02/2024",
    violations: "8",
  },
  {
    id: 4,
    word: "từkhóacấm4",
    category: "Thông tin nhạy cảm",
    addedBy: "Quản Trị Viên",
    dateAdded: "01/03/2024",
    violations: "3",
  },
  {
    id: 5,
    word: "từkhóacấm5",
    category: "Quấy rối",
    addedBy: "Quản Trị Viên",
    dateAdded: "10/03/2024",
    violations: "2",
  },
]

const initialViolations = [
  {
    id: 1,
    employee: "Phạm Văn Đức",
    keyword: "từkhóacấm1",
    category: "Tục tĩu",
    date: "15/03/2024",
    message: "Tin nhắn này chứa từ khóa bị cấm vi phạm chính sách của chúng tôi.",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 2,
    employee: "Hoàng Thị Mai",
    keyword: "từkhóacấm2",
    category: "Quấy rối",
    date: "14/03/2024",
    message: "Tin nhắn này chứa từ khóa bị cấm vi phạm chính sách của chúng tôi.",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 3,
    employee: "Trần Văn Minh",
    keyword: "từkhóacấm1",
    category: "Tục tĩu",
    date: "12/03/2024",
    message: "Tin nhắn này chứa từ khóa bị cấm vi phạm chính sách của chúng tôi.",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 4,
    employee: "Lê Thị Lan",
    keyword: "từkhóacấm3",
    category: "Tục tĩu",
    date: "10/03/2024",
    message: "Tin nhắn này chứa từ khóa bị cấm vi phạm chính sách của chúng tôi.",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 5,
    employee: "Phạm Văn Đức",
    keyword: "từkhóacấm4",
    category: "Thông tin nhạy cảm",
    date: "08/03/2024",
    message: "Tin nhắn này chứa từ khóa bị cấm vi phạm chính sách của chúng tôi.",
    avatar: "/placeholder.svg?height=32&width=32",
  },
]

