"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowDownIcon, ArrowUpIcon, BarChart3, Clock, Database, Users } from "lucide-react"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Overview } from "@/components/dashboard/overview"
import { RecentMessages } from "@/components/dashboard/recent-messages"
import { StorageUsage } from "@/components/dashboard/storage-usage"
import { EmployeeActivity } from "@/components/dashboard/employee-activity"

export default function DashboardPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Bảng Điều Khiển" text="Tổng quan về thống kê và hiệu suất hệ thống của bạn." />
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Tổng Quan</TabsTrigger>
          <TabsTrigger value="messages">Tin Nhắn</TabsTrigger>
          <TabsTrigger value="storage">Lưu Trữ</TabsTrigger>
          <TabsTrigger value="employees">Nhân Viên</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tổng Tin Nhắn</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">142.928</div>
                <p className="text-xs text-muted-foreground">+20,1% so với tháng trước</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Dung Lượng Đã Dùng</CardTitle>
                <Database className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4,2 GB</div>
                <p className="text-xs text-muted-foreground">42% tổng dung lượng</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Nhân Viên Hoạt Động</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">+2 kể từ tuần trước</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Thời Gian Phản Hồi</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,2 phút</div>
                <p className="text-xs text-muted-foreground">-14% so với tháng trước</p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Tổng Quan</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <Overview />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Tin Nhắn Gần Đây</CardTitle>
                <CardDescription>Bạn đã nhận 248 tin nhắn hôm nay.</CardDescription>
              </CardHeader>
              <CardContent>
                <RecentMessages />
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Sử Dụng Lưu Trữ</CardTitle>
                <CardDescription>Phân tích việc sử dụng lưu trữ của bạn.</CardDescription>
              </CardHeader>
              <CardContent>
                <StorageUsage />
              </CardContent>
            </Card>
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Hoạt Động Nhân Viên</CardTitle>
                <CardDescription>Nhân viên hoạt động tốt nhất tháng này.</CardDescription>
              </CardHeader>
              <CardContent>
                <EmployeeActivity />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="messages" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Thống Kê Tin Nhắn</CardTitle>
              <CardDescription>Phân tích chi tiết tin nhắn đến và đi.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                    <ArrowDownIcon className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Tin Đến</p>
                    <p className="text-2xl font-bold">84.291</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                    <ArrowUpIcon className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Tin Đi</p>
                    <p className="text-2xl font-bold">58.637</p>
                  </div>
                </div>
              </div>
              <div className="h-[300px] w-full">
                {/* Message chart would go here */}
                <div className="flex h-full items-center justify-center rounded-md border border-dashed">
                  <p className="text-sm text-muted-foreground">Biểu đồ khối lượng tin nhắn</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="storage" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Chi Tiết Lưu Trữ</CardTitle>
              <CardDescription>Phân tích chi tiết việc sử dụng lưu trữ của bạn.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">Tổng Dung Lượng</p>
                  <p className="text-2xl font-bold">10 GB</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Đã Sử Dụng</p>
                  <p className="text-2xl font-bold">4,2 GB (42%)</p>
                </div>
              </div>
              <div className="h-[300px] w-full">
                {/* Storage chart would go here */}
                <div className="flex h-full items-center justify-center rounded-md border border-dashed">
                  <p className="text-sm text-muted-foreground">Biểu đồ phân tích sử dụng lưu trữ</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="employees" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tổng Quan Nhân Viên</CardTitle>
              <CardDescription>Tóm tắt hiệu suất và hoạt động của nhân viên.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-sm font-medium">Tổng Nhân Viên</p>
                  <p className="text-2xl font-bold">24</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Hoạt Động Hôm Nay</p>
                  <p className="text-2xl font-bold">18</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Vi Phạm</p>
                  <p className="text-2xl font-bold">3</p>
                </div>
              </div>
              <div className="h-[300px] w-full">
                {/* Employee chart would go here */}
                <div className="flex h-full items-center justify-center rounded-md border border-dashed">
                  <p className="text-sm text-muted-foreground">Biểu đồ hiệu suất nhân viên</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}

