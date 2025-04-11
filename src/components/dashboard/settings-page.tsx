"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  Bell,
  Camera,
  Clock,
  Globe,
  Moon,
  Palette,
  Save,
  Shield,
  Sun,
  Upload,
  User,
  Users,
  Plus,
  Download,
  Filter,
  Search,
} from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function SettingsPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Cài Đặt" text="Quản lý cài đặt và tùy chọn cho hệ thống của bạn." />
      <Tabs defaultValue="account" className="space-y-4">
        <TabsList>
          <TabsTrigger value="account" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span className="hidden md:inline-flex">Tài Khoản</span>
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            <span className="hidden md:inline-flex">Giao Diện</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            <span className="hidden md:inline-flex">Thông Báo</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span className="hidden md:inline-flex">Bảo Mật</span>
          </TabsTrigger>
          <TabsTrigger value="system" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            <span className="hidden md:inline-flex">Hệ Thống</span>
          </TabsTrigger>
          <TabsTrigger value="team" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span className="hidden md:inline-flex">Nhóm</span>
          </TabsTrigger>
          <TabsTrigger value="activity-logs" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span className="hidden md:inline-flex">Nhật Ký</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="account">
          <AccountSettings />
        </TabsContent>

        <TabsContent value="appearance">
          <AppearanceSettings />
        </TabsContent>

        <TabsContent value="notifications">
          <NotificationSettings />
        </TabsContent>

        <TabsContent value="security">
          <SecuritySettings />
        </TabsContent>

        <TabsContent value="system">
          <SystemSettings />
        </TabsContent>

        <TabsContent value="team">
          <TeamSettings />
        </TabsContent>

        <TabsContent value="activity-logs">
          <ActivityLogsSettings />
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}

function AccountSettings() {
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = () => {
    setIsSaving(true)
    setTimeout(() => setIsSaving(false), 1000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Thông Tin Tài Khoản</h3>
        <p className="text-sm text-muted-foreground">Cập nhật thông tin cá nhân và tài khoản của bạn.</p>
      </div>

      <Separator />

      <div className="space-y-8">
        <div className="flex flex-col gap-8 md:flex-row">
          <div className="flex-1 space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Họ Tên</Label>
              <Input id="name" defaultValue="Quản Trị Viên" />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue="admin@example.com" />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="phone">Số Điện Thoại</Label>
              <Input id="phone" type="tel" defaultValue="+84 123 456 789" />
            </div>
          </div>

          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <Avatar className="h-32 w-32">
                <AvatarImage src="/placeholder.svg?height=128&width=128" alt="Avatar" />
                <AvatarFallback className="text-4xl">QT</AvatarFallback>
              </Avatar>
              <Button size="icon" variant="outline" className="absolute bottom-0 right-0 rounded-full">
                <Camera className="h-4 w-4" />
              </Button>
            </div>
            <Button variant="outline" className="w-full">
              <Upload className="mr-2 h-4 w-4" />
              Tải Ảnh Lên
            </Button>
          </div>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="bio">Giới Thiệu</Label>
          <Textarea id="bio" rows={4} defaultValue="Quản trị viên hệ thống với hơn 5 năm kinh nghiệm." />
        </div>

        <div className="flex justify-end">
          <Button onClick={handleSave} disabled={isSaving}>
            <Save className="mr-2 h-4 w-4" />
            {isSaving ? "Đang Lưu..." : "Lưu Thay Đổi"}
          </Button>
        </div>
      </div>
    </div>
  )
}

function AppearanceSettings() {
  const [theme, setTheme] = useState("light")
  const [primaryColor, setPrimaryColor] = useState("blue")
  const [fontSize, setFontSize] = useState("medium")
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = () => {
    setIsSaving(true)
    setTimeout(() => setIsSaving(false), 1000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Tùy Chỉnh Giao Diện</h3>
        <p className="text-sm text-muted-foreground">Tùy chỉnh giao diện và trải nghiệm người dùng.</p>
      </div>

      <Separator />

      <div className="space-y-8">
        <div className="space-y-4">
          <h4 className="text-sm font-medium">Chế Độ Giao Diện</h4>
          <div className="grid grid-cols-3 gap-4">
            <div
              className={`flex cursor-pointer flex-col items-center justify-center rounded-md border p-4 ${theme === "light" ? "border-primary bg-primary/10" : "border-muted"}`}
              onClick={() => setTheme("light")}
            >
              <Sun className="mb-2 h-6 w-6" />
              <span className="text-sm font-medium">Sáng</span>
            </div>
            <div
              className={`flex cursor-pointer flex-col items-center justify-center rounded-md border p-4 ${theme === "dark" ? "border-primary bg-primary/10" : "border-muted"}`}
              onClick={() => setTheme("dark")}
            >
              <Moon className="mb-2 h-6 w-6" />
              <span className="text-sm font-medium">Tối</span>
            </div>
            <div
              className={`flex cursor-pointer flex-col items-center justify-center rounded-md border p-4 ${theme === "system" ? "border-primary bg-primary/10" : "border-muted"}`}
              onClick={() => setTheme("system")}
            >
              <div className="mb-2 flex">
                <Sun className="h-6 w-6" />
                <Moon className="h-6 w-6" />
              </div>
              <span className="text-sm font-medium">Hệ Thống</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-sm font-medium">Màu Sắc Chính</h4>
          <div className="grid grid-cols-6 gap-4">
            {["blue", "green", "red", "purple", "orange", "pink"].map((color) => (
              <div
                key={color}
                className={`flex h-10 cursor-pointer items-center justify-center rounded-md border ${primaryColor === color ? "border-primary bg-primary/10" : "border-muted"}`}
                style={{ backgroundColor: `var(--${color}-100)` }}
                onClick={() => setPrimaryColor(color)}
              >
                <div className="h-6 w-6 rounded-full" style={{ backgroundColor: `var(--${color}-500)` }} />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium">Cỡ Chữ</h4>
              <p className="text-sm text-muted-foreground">Điều chỉnh kích thước chữ trong giao diện.</p>
            </div>
            <Select value={fontSize} onValueChange={setFontSize}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Chọn cỡ chữ" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="small">Nhỏ</SelectItem>
                <SelectItem value="medium">Vừa</SelectItem>
                <SelectItem value="large">Lớn</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-end">
          <Button onClick={handleSave} disabled={isSaving}>
            <Save className="mr-2 h-4 w-4" />
            {isSaving ? "Đang Lưu..." : "Lưu Thay Đổi"}
          </Button>
        </div>
      </div>
    </div>
  )
}

function NotificationSettings() {
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = () => {
    setIsSaving(true)
    setTimeout(() => setIsSaving(false), 1000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Cài Đặt Thông Báo</h3>
        <p className="text-sm text-muted-foreground">Quản lý cách bạn nhận thông báo từ hệ thống.</p>
      </div>

      <Separator />

      <div className="space-y-8">
        <div className="space-y-4">
          <h4 className="text-sm font-medium">Thông Báo Email</h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Tin Nhắn Mới</Label>
                <p className="text-xs text-muted-foreground">Nhận email khi có tin nhắn mới từ khách hàng.</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Báo Cáo Hàng Tuần</Label>
                <p className="text-xs text-muted-foreground">Nhận báo cáo tổng hợp hàng tuần qua email.</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Cảnh Báo Hệ Thống</Label>
                <p className="text-xs text-muted-foreground">Nhận thông báo khi có vấn đề với hệ thống.</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-sm font-medium">Thông Báo Ứng Dụng</h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Tin Nhắn Mới</Label>
                <p className="text-xs text-muted-foreground">Hiển thị thông báo khi có tin nhắn mới.</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Hoạt Động Nhân Viên</Label>
                <p className="text-xs text-muted-foreground">Thông báo khi nhân viên đăng nhập hoặc đăng xuất.</p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Vi Phạm Từ Khóa</Label>
                <p className="text-xs text-muted-foreground">Thông báo khi phát hiện vi phạm từ khóa cấm.</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-sm font-medium">Thông Báo SMS</h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Cảnh Báo Bảo Mật</Label>
                <p className="text-xs text-muted-foreground">Nhận SMS khi có đăng nhập bất thường.</p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Thông Báo Khẩn Cấp</Label>
                <p className="text-xs text-muted-foreground">Nhận SMS cho các vấn đề khẩn cấp của hệ thống.</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button onClick={handleSave} disabled={isSaving}>
            <Save className="mr-2 h-4 w-4" />
            {isSaving ? "Đang Lưu..." : "Lưu Thay Đổi"}
          </Button>
        </div>
      </div>
    </div>
  )
}

function SecuritySettings() {
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = () => {
    setIsSaving(true)
    setTimeout(() => setIsSaving(false), 1000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Cài Đặt Bảo Mật</h3>
        <p className="text-sm text-muted-foreground">Quản lý các tùy chọn bảo mật cho tài khoản của bạn.</p>
      </div>

      <Separator />

      <div className="space-y-8">
        <div className="space-y-4">
          <h4 className="text-sm font-medium">Đổi Mật Khẩu</h4>
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="current-password">Mật Khẩu Hiện Tại</Label>
              <Input id="current-password" type="password" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="new-password">Mật Khẩu Mới</Label>
              <Input id="new-password" type="password" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirm-password">Xác Nhận Mật Khẩu</Label>
              <Input id="confirm-password" type="password" />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-sm font-medium">Xác Thực Hai Yếu Tố</h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Bật Xác Thực Hai Yếu Tố</Label>
                <p className="text-xs text-muted-foreground">Tăng cường bảo mật bằng xác thực hai yếu tố.</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Phương Thức Xác Thực</Label>
                <p className="text-xs text-muted-foreground">Chọn phương thức xác thực hai yếu tố.</p>
              </div>
              <Select defaultValue="app">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Chọn phương thức" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="app">Ứng Dụng Xác Thực</SelectItem>
                  <SelectItem value="sms">SMS</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-sm font-medium">Phiên Đăng Nhập</h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Đăng Xuất Tự Động</Label>
                <p className="text-xs text-muted-foreground">
                  Tự động đăng xuất sau một khoảng thời gian không hoạt động.
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Thời Gian Không Hoạt Động</Label>
                <p className="text-xs text-muted-foreground">Thời gian không hoạt động trước khi đăng xuất tự động.</p>
              </div>
              <Select defaultValue="30">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Chọn thời gian" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15 phút</SelectItem>
                  <SelectItem value="30">30 phút</SelectItem>
                  <SelectItem value="60">1 giờ</SelectItem>
                  <SelectItem value="120">2 giờ</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button onClick={handleSave} disabled={isSaving}>
            <Save className="mr-2 h-4 w-4" />
            {isSaving ? "Đang Lưu..." : "Lưu Thay Đổi"}
          </Button>
        </div>
      </div>
    </div>
  )
}

function SystemSettings() {
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = () => {
    setIsSaving(true)
    setTimeout(() => setIsSaving(false), 1000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Cài Đặt Hệ Thống</h3>
        <p className="text-sm text-muted-foreground">Quản lý các cài đặt chung cho hệ thống.</p>
      </div>

      <Separator />

      <div className="space-y-8">
        <div className="space-y-4">
          <h4 className="text-sm font-medium">Ngôn Ngữ & Khu Vực</h4>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="language">Ngôn Ngữ</Label>
              <Select defaultValue="vi">
                <SelectTrigger id="language">
                  <SelectValue placeholder="Chọn ngôn ngữ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vi">Tiếng Việt</SelectItem>
                  <SelectItem value="en">Tiếng Anh</SelectItem>
                  <SelectItem value="ja">Tiếng Nhật</SelectItem>
                  <SelectItem value="ko">Tiếng Hàn</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="timezone">Múi Giờ</Label>
              <Select defaultValue="asia_ho_chi_minh">
                <SelectTrigger id="timezone">
                  <SelectValue placeholder="Chọn múi giờ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="asia_ho_chi_minh">Asia/Ho_Chi_Minh (GMT+7)</SelectItem>
                  <SelectItem value="asia_bangkok">Asia/Bangkok (GMT+7)</SelectItem>
                  <SelectItem value="asia_tokyo">Asia/Tokyo (GMT+9)</SelectItem>
                  <SelectItem value="america_new_york">America/New_York (GMT-5)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="date-format">Định Dạng Ngày</Label>
              <Select defaultValue="dd/mm/yyyy">
                <SelectTrigger id="date-format">
                  <SelectValue placeholder="Chọn định dạng ngày" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dd/mm/yyyy">DD/MM/YYYY</SelectItem>
                  <SelectItem value="mm/dd/yyyy">MM/DD/YYYY</SelectItem>
                  <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="time-format">Định Dạng Giờ</Label>
              <Select defaultValue="24h">
                <SelectTrigger id="time-format">
                  <SelectValue placeholder="Chọn định dạng giờ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="24h">24 giờ</SelectItem>
                  <SelectItem value="12h">12 giờ (AM/PM)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-sm font-medium">Cài Đặt Dữ Liệu</h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Tự Động Sao Lưu</Label>
                <p className="text-xs text-muted-foreground">Tự động sao lưu dữ liệu hệ thống.</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Tần Suất Sao Lưu</Label>
                <p className="text-xs text-muted-foreground">Tần suất thực hiện sao lưu tự động.</p>
              </div>
              <Select defaultValue="daily">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Chọn tần suất" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Hàng ngày</SelectItem>
                  <SelectItem value="weekly">Hàng tuần</SelectItem>
                  <SelectItem value="monthly">Hàng tháng</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Lưu Trữ Nhật Ký</Label>
                <p className="text-xs text-muted-foreground">Thời gian lưu trữ nhật ký hệ thống.</p>
              </div>
              <Select defaultValue="90">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Chọn thời gian" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30">30 ngày</SelectItem>
                  <SelectItem value="90">90 ngày</SelectItem>
                  <SelectItem value="180">180 ngày</SelectItem>
                  <SelectItem value="365">1 năm</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-sm font-medium">Cài Đặt Nâng Cao</h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Chế Độ Bảo Trì</Label>
                <p className="text-xs text-muted-foreground">Bật chế độ bảo trì cho hệ thống.</p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Ghi Nhật Ký Chi Tiết</Label>
                <p className="text-xs text-muted-foreground">Ghi lại nhật ký chi tiết cho việc gỡ lỗi.</p>
              </div>
              <Switch />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button onClick={handleSave} disabled={isSaving}>
            <Save className="mr-2 h-4 w-4" />
            {isSaving ? "Đang Lưu..." : "Lưu Thay Đổi"}
          </Button>
        </div>
      </div>
    </div>
  )
}

function TeamSettings() {
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = () => {
    setIsSaving(true)
    setTimeout(() => setIsSaving(false), 1000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Cài Đặt Nhóm</h3>
        <p className="text-sm text-muted-foreground">Quản lý cài đặt nhóm và quyền truy cập.</p>
      </div>

      <Separator />

      <div className="space-y-8">
        <div className="space-y-4">
          <h4 className="text-sm font-medium">Thông Tin Nhóm</h4>
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="team-name">Tên Nhóm</Label>
              <Input id="team-name" defaultValue="Nhóm Quản Trị" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="team-description">Mô Tả</Label>
              <Textarea
                id="team-description"
                rows={3}
                defaultValue="Nhóm quản trị hệ thống với quyền truy cập đầy đủ."
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium">Vai Trò & Quyền Hạn</h4>
            <Button variant="outline" size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Thêm Vai Trò
            </Button>
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Vai Trò</TableHead>
                  <TableHead>Mô Tả</TableHead>
                  <TableHead>Người Dùng</TableHead>
                  <TableHead className="text-right">Thao Tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Quản Trị Viên</TableCell>
                  <TableCell>Quyền truy cập đầy đủ vào hệ thống</TableCell>
                  <TableCell>2</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      Chỉnh Sửa
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Quản Lý</TableCell>
                  <TableCell>Quản lý nhân viên và nội dung</TableCell>
                  <TableCell>4</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      Chỉnh Sửa
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Nhân Viên</TableCell>
                  <TableCell>Truy cập hạn chế vào hệ thống</TableCell>
                  <TableCell>18</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      Chỉnh Sửa
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-sm font-medium">Cài Đặt Nhóm</h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Cho Phép Đăng Ký</Label>
                <p className="text-xs text-muted-foreground">Cho phép người dùng mới đăng ký tham gia nhóm.</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Phê Duyệt Thành Viên</Label>
                <p className="text-xs text-muted-foreground">Yêu cầu phê duyệt cho thành viên mới.</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Hiển Thị Danh Sách Thành Viên</Label>
                <p className="text-xs text-muted-foreground">Hiển thị danh sách thành viên cho tất cả mọi người.</p>
              </div>
              <Switch />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button onClick={handleSave} disabled={isSaving}>
            <Save className="mr-2 h-4 w-4" />
            {isSaving ? "Đang Lưu..." : "Lưu Thay Đổi"}
          </Button>
        </div>
      </div>
    </div>
  )
}

function ActivityLogsSettings() {
  const [dateRange, setDateRange] = useState("7days")
  const [activityType, setActivityType] = useState("all")
  const [employee, setEmployee] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortOrder, setSortOrder] = useState("desc") // desc = mới nhất trước, asc = cũ nhất trước

  // Lọc và sắp xếp logs
  const filteredLogs = activityLogs
    .filter((log) => {
      if (activityType !== "all" && log.activity !== activityType) return false
      if (employee !== "all" && log.employeeId !== Number.parseInt(employee)) return false
      if (
        searchQuery &&
        !log.employee.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !log.activity.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !log.ipAddress.includes(searchQuery)
      )
        return false
      return true
    })
    .sort((a, b) => {
      // Chuyển đổi ngày và thời gian thành timestamp để so sánh
      const dateA = new Date(`${a.date.split("/").reverse().join("-")}T${a.time}`).getTime()
      const dateB = new Date(`${b.date.split("/").reverse().join("-")}T${b.time}`).getTime()

      return sortOrder === "desc" ? dateB - dateA : dateA - dateB
    })

  // Thêm hàm để chuyển đổi thứ tự sắp xếp
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "desc" ? "asc" : "desc")
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Nhật Ký Hoạt Động</h3>
        <p className="text-sm text-muted-foreground">Xem lịch sử hoạt động của nhân viên trên hệ thống.</p>
      </div>

      <Separator />

      <div className="space-y-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2">
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Khoảng thời gian" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Hôm nay</SelectItem>
                <SelectItem value="yesterday">Hôm qua</SelectItem>
                <SelectItem value="7days">7 ngày qua</SelectItem>
                <SelectItem value="30days">30 ngày qua</SelectItem>
                <SelectItem value="all">Tất cả</SelectItem>
              </SelectContent>
            </Select>

            <Select value={activityType} onValueChange={setActivityType}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Loại hoạt động" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả hoạt động</SelectItem>
                <SelectItem value="Đăng nhập">Đăng nhập</SelectItem>
                <SelectItem value="Đăng xuất">Đăng xuất</SelectItem>
                <SelectItem value="Thay đổi mật khẩu">Thay đổi mật khẩu</SelectItem>
                <SelectItem value="Cập nhật hồ sơ">Cập nhật hồ sơ</SelectItem>
              </SelectContent>
            </Select>

            <Select value={employee} onValueChange={setEmployee}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Nhân viên" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả nhân viên</SelectItem>
                <SelectItem value="1">Nguyễn Thị Hương</SelectItem>
                <SelectItem value="2">Trần Văn Minh</SelectItem>
                <SelectItem value="3">Lê Thị Lan</SelectItem>
                <SelectItem value="4">Phạm Văn Đức</SelectItem>
                <SelectItem value="5">Hoàng Thị Mai</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Tìm kiếm..."
                className="w-[200px] pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" size="sm" onClick={toggleSortOrder} className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {sortOrder === "desc" ? "Mới nhất trước" : "Cũ nhất trước"}
            </Button>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Xuất
            </Button>
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nhân Viên</TableHead>
                <TableHead>Hoạt Động</TableHead>
                <TableHead>
                  Thời Gian{" "}
                  <Button onClick={toggleSortOrder} variant="ghost">
                    <Clock className="mr-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>Địa Chỉ IP</TableHead>
                <TableHead>User Agent</TableHead>
                <TableHead>Trạng Thái</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLogs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    Không tìm thấy nhật ký hoạt động nào.
                  </TableCell>
                </TableRow>
              ) : (
                filteredLogs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-7 w-7">
                          <AvatarImage src={log.avatar} alt={log.employee} />
                          <AvatarFallback>{log.employee.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="font-medium">{log.employee}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          log.activity === "Đăng nhập"
                            ? "bg-blue-100 text-blue-800"
                            : log.activity === "Đăng xuất"
                              ? "bg-red-100 text-red-800"
                              : log.activity === "Thay đổi mật khẩu"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {log.activity}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span>{log.date}</span>
                        <span className="text-xs text-muted-foreground">{log.time}</span>
                      </div>
                    </TableCell>
                    <TableCell>{log.ipAddress}</TableCell>
                    <TableCell className="max-w-[200px] truncate" title={log.userAgent}>
                      {log.userAgent}
                    </TableCell>
                    <TableCell>
                      <div
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          log.status === "Thành công"
                            ? "bg-green-100 text-green-800"
                            : log.status === "Thất bại"
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {log.status}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Hiển thị <strong>{filteredLogs.length}</strong> trong số <strong>{activityLogs.length}</strong> bản ghi
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" disabled>
              Trước
            </Button>
            <Button variant="outline" size="sm" className="px-4 font-medium">
              1
            </Button>
            <Button variant="outline" size="sm">
              Sau
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

const activityLogs = [
  {
    id: 1,
    employeeId: 1,
    employee: "Nguyễn Thị Hương",
    activity: "Đăng nhập",
    date: "25/03/2024",
    time: "08:32:15",
    ipAddress: "192.168.1.105",
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
    status: "Thành công",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 2,
    employeeId: 2,
    employee: "Trần Văn Minh",
    activity: "Đăng nhập",
    date: "25/03/2024",
    time: "08:45:22",
    ipAddress: "192.168.1.107",
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.3 Safari/605.1.15",
    status: "Thành công",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 3,
    employeeId: 3,
    employee: "Lê Thị Lan",
    activity: "Đăng nhập",
    date: "25/03/2024",
    time: "09:12:05",
    ipAddress: "192.168.1.112",
    userAgent:
      "Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
    status: "Thành công",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 4,
    employeeId: 4,
    employee: "Phạm Văn Đức",
    activity: "Đăng nhập",
    date: "25/03/2024",
    time: "09:30:45",
    ipAddress: "192.168.1.120",
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
    status: "Thất bại",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 5,
    employeeId: 4,
    employee: "Phạm Văn Đức",
    activity: "Đăng nhập",
    date: "25/03/2024",
    time: "09:32:18",
    ipAddress: "192.168.1.120",
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
    status: "Thành công",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 6,
    employeeId: 1,
    employee: "Nguyễn Thị Hương",
    activity: "Thay đổi mật khẩu",
    date: "25/03/2024",
    time: "10:15:33",
    ipAddress: "192.168.1.105",
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
    status: "Thành công",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 7,
    employeeId: 2,
    employee: "Trần Văn Minh",
    activity: "Cập nhật hồ sơ",
    date: "25/03/2024",
    time: "11:05:42",
    ipAddress: "192.168.1.107",
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.3 Safari/605.1.15",
    status: "Thành công",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 8,
    employeeId: 5,
    employee: "Hoàng Thị Mai",
    activity: "Đăng nhập",
    date: "25/03/2024",
    time: "11:30:15",
    ipAddress: "192.168.1.125",
    userAgent:
      "Mozilla/5.0 (Linux; Android 13; SM-S908B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36",
    status: "Thành công",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 9,
    employeeId: 3,
    employee: "Lê Thị Lan",
    activity: "Đăng xuất",
    date: "25/03/2024",
    time: "12:45:10",
    ipAddress: "192.168.1.112",
    userAgent:
      "Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
    status: "Thành công",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 10,
    employeeId: 1,
    employee: "Nguyễn Thị Hương",
    activity: "Đăng xuất",
    date: "25/03/2024",
    time: "17:30:22",
    ipAddress: "192.168.1.105",
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
    status: "Thành công",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 11,
    employeeId: 2,
    employee: "Trần Văn Minh",
    activity: "Đăng xuất",
    date: "25/03/2024",
    time: "18:15:05",
    ipAddress: "192.168.1.107",
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.3 Safari/605.1.15",
    status: "Thành công",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 12,
    employeeId: 5,
    employee: "Hoàng Thị Mai",
    activity: "Đăng xuất",
    date: "25/03/2024",
    time: "18:30:45",
    ipAddress: "192.168.1.125",
    userAgent:
      "Mozilla/5.0 (Linux; Android 13; SM-S908B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36",
    status: "Thành công",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 13,
    employeeId: 4,
    employee: "Phạm Văn Đức",
    activity: "Đăng xuất",
    date: "25/03/2024",
    time: "19:05:12",
    ipAddress: "192.168.1.120",
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
    status: "Thành công",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 14,
    employeeId: 1,
    employee: "Nguyễn Thị Hương",
    activity: "Đăng nhập",
    date: "26/03/2024",
    time: "08:15:33",
    ipAddress: "192.168.1.105",
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
    status: "Thành công",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 15,
    employeeId: 3,
    employee: "Lê Thị Lan",
    activity: "Đăng nhập",
    date: "26/03/2024",
    time: "08:30:42",
    ipAddress: "192.168.1.112",
    userAgent:
      "Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
    status: "Thành công",
    avatar: "/placeholder.svg?height=32&width=32",
  },
]

