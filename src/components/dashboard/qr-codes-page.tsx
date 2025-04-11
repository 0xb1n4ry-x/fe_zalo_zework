"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
import { Download, Plus, QrCode } from "lucide-react"

export default function QRCodesPage() {
  const [qrCodes, setQrCodes] = useState([...initialQrCodes])

  const handleAddQrCode = (newQrCode) => {
    setQrCodes([...qrCodes, { ...newQrCode, id: qrCodes.length + 1 }])
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Mã QR" text="Quản lý và theo dõi mã QR của bạn." />
      <Tabs defaultValue="all" className="space-y-4">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="all">Tất Cả Mã QR</TabsTrigger>
            <TabsTrigger value="active">Đang Hoạt Động</TabsTrigger>
            <TabsTrigger value="inactive">Không Hoạt Động</TabsTrigger>
          </TabsList>
          <AddQRCodeDialog onAddQrCode={handleAddQrCode} />
        </div>
        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {qrCodes.map((qrCode) => (
              <QRCodeCard key={qrCode.id} qrCode={qrCode} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="active" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {qrCodes
              .filter((qrCode) => qrCode.status === "Hoạt động")
              .map((qrCode) => (
                <QRCodeCard key={qrCode.id} qrCode={qrCode} />
              ))}
          </div>
        </TabsContent>
        <TabsContent value="inactive" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {qrCodes
              .filter((qrCode) => qrCode.status === "Không hoạt động")
              .map((qrCode) => (
                <QRCodeCard key={qrCode.id} qrCode={qrCode} />
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}

function QRCodeCard({ qrCode }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{qrCode.name}</CardTitle>
        <CardDescription>{qrCode.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <div className="mb-4 flex h-40 w-40 items-center justify-center rounded-lg bg-muted p-2">
          <QrCode className="h-32 w-32" />
        </div>
        <div className="grid w-full gap-1">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">URL:</span>
            <span className="font-medium">{qrCode.url}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Lượt quét:</span>
            <span className="font-medium">{qrCode.scans}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Ngày tạo:</span>
            <span className="font-medium">{qrCode.created}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Trạng thái:</span>
            <div
              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                qrCode.status === "Hoạt động" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {qrCode.status}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm">
          <Download className="mr-2 h-4 w-4" />
          Tải xuống
        </Button>
        <Button variant="outline" size="sm">
          Xem Phân Tích
        </Button>
      </CardFooter>
    </Card>
  )
}

function AddQRCodeDialog({ onAddQrCode }) {
  const [open, setOpen] = useState(false)
  const [newQrCode, setNewQrCode] = useState({
    name: "",
    description: "",
    url: "",
    scans: "0",
    created: new Date().toLocaleDateString(),
    status: "Hoạt động",
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onAddQrCode(newQrCode)
    setNewQrCode({
      name: "",
      description: "",
      url: "",
      scans: "0",
      created: new Date().toLocaleDateString(),
      status: "Hoạt động",
    })
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Tạo Mã QR
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Tạo Mã QR Mới</DialogTitle>
          <DialogDescription>Tạo mã QR mới cho doanh nghiệp của bạn.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Tên</Label>
              <Input
                id="name"
                value={newQrCode.name}
                onChange={(e) => setNewQrCode({ ...newQrCode, name: e.target.value })}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Mô tả</Label>
              <Input
                id="description"
                value={newQrCode.description}
                onChange={(e) => setNewQrCode({ ...newQrCode, description: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="url">URL</Label>
              <Input
                id="url"
                type="url"
                value={newQrCode.url}
                onChange={(e) => setNewQrCode({ ...newQrCode, url: e.target.value })}
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Tạo Mã QR</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

const initialQrCodes = [
  {
    id: 1,
    name: "Danh Mục Sản Phẩm",
    description: "Mã QR cho danh mục sản phẩm chính",
    url: "https://example.com/catalog",
    scans: "1.245",
    created: "15/01/2024",
    status: "Hoạt động",
  },
  {
    id: 2,
    name: "Khuyến Mãi Đặc Biệt",
    description: "Khuyến mãi mùa hè",
    url: "https://example.com/summer-sale",
    scans: "876",
    created: "20/02/2024",
    status: "Hoạt động",
  },
  {
    id: 3,
    name: "Đăng Ký Sự Kiện",
    description: "Đăng ký hội nghị thường niên",
    url: "https://example.com/conference",
    scans: "532",
    created: "05/03/2024",
    status: "Hoạt động",
  },
  {
    id: 4,
    name: "Khảo Sát Khách Hàng",
    description: "Khảo sát phản hồi cho Q1",
    url: "https://example.com/survey",
    scans: "321",
    created: "10/01/2024",
    status: "Không hoạt động",
  },
  {
    id: 5,
    name: "Tìm Cửa Hàng",
    description: "Tìm cửa hàng gần nhất",
    url: "https://example.com/stores",
    scans: "987",
    created: "01/12/2023",
    status: "Hoạt động",
  },
]

