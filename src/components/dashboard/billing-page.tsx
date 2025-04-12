"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  AlertCircle,
  ArrowRight,
  Calendar,
  Check,
  CreditCard,
  Download,
  HardDrive,
  Info,
  MessageSquare,
  Plus,
  RefreshCw,
  Shield,
  Users,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts"



export default function BillingPage() {

  return (
      <DashboardShell>
        <DashboardHeader heading="Thanh Toán" text="Quản lý thông tin thanh toán và phương thức thanh toán của bạn." />
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
            <TabsTrigger value="overview">Tổng Quan</TabsTrigger>
            <TabsTrigger value="invoices">Hóa Đơn</TabsTrigger>
            <TabsTrigger value="payment-methods">Phương Thức Thanh Toán</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Thông tin gói hiện tại */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card className="border-l-4 border-l-primary">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium">Gói Hiện Tại</CardTitle>
                    <Badge variant="outline" className="bg-primary/10 text-primary">
                      Đang hoạt động
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    <div className="text-2xl font-bold">Doanh Nghiệp Pro</div>
                  </div>
                  <div className="mt-1 flex items-center gap-1">
                    <div className="text-lg font-semibold">1.199.000đ</div>
                    <span className="text-xs text-muted-foreground">/tháng</span>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Tin nhắn không giới hạn</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Lưu trữ 10GB</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Tối đa 25 nhân viên</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-2">
                  <Button className="w-full">
                    Nâng Cấp Gói
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <Button variant="link" size="sm" className="h-auto p-0 text-xs text-muted-foreground">
                        So sánh các gói
                      </Button>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80">
                      <div className="space-y-2">
                        <h4 className="font-medium">So sánh các gói dịch vụ</h4>
                        <div className="text-sm">
                          <div className="grid grid-cols-4 gap-2 font-medium">
                            <div></div>
                            <div>Cơ bản</div>
                            <div>Chuyên nghiệp</div>
                            <div>Doanh nghiệp</div>
                          </div>
                          <Separator className="my-2" />
                          <div className="grid grid-cols-4 gap-2">
                            <div>Giá</div>
                            <div>299K</div>
                            <div>599K</div>
                            <div>1.199K</div>
                          </div>
                          <div className="grid grid-cols-4 gap-2">
                            <div>Tin nhắn</div>
                            <div>10K</div>
                            <div>50K</div>
                            <div>Không giới hạn</div>
                          </div>
                          <div className="grid grid-cols-4 gap-2">
                            <div>Lưu trữ</div>
                            <div>2GB</div>
                            <div>5GB</div>
                            <div>10GB</div>
                          </div>
                          <div className="grid grid-cols-4 gap-2">
                            <div>Nhân viên</div>
                            <div>5</div>
                            <div>15</div>
                            <div>25</div>
                          </div>
                        </div>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                </CardFooter>
              </Card>

              <Card className="border-l-4 border-l-amber-500">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium">Ngày Thanh Toán Tiếp Theo</CardTitle>
                    <Calendar className="h-4 w-4 text-amber-500" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col">
                    <div className="text-2xl font-bold">01/04/2024</div>
                    <div className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                      <RefreshCw className="h-3 w-3" />
                      <span>Tự động gia hạn</span>
                    </div>

                    <div className="mt-4 rounded-lg bg-muted p-3">
                      <div className="flex items-center gap-2 text-sm">
                        <AlertCircle className="h-4 w-4 text-amber-500" />
                        <span>Còn 7 ngày nữa đến kỳ thanh toán tiếp theo</span>
                      </div>
                    </div>

                    <div className="mt-4">
                      <div className="text-sm font-medium">Lịch sử thanh toán gần đây:</div>
                      <div className="mt-2 space-y-2 text-sm">
                        <div className="flex items-center justify-between">
                          <span>01/03/2024</span>
                          <span className="font-medium">1.199.000đ</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>01/02/2024</span>
                          <span className="font-medium">1.199.000đ</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Thay Đổi Chu Kỳ</Button>
                  <Button variant="outline" className="text-red-500 hover:bg-red-50 hover:text-red-600">
                    Hủy Đăng Ký
                  </Button>
                </CardFooter>
              </Card>

              <Card className="border-l-4 border-l-blue-500">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium">Phương Thức Thanh Toán</CardTitle>
                    <CreditCard className="h-4 w-4 text-blue-500" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-16 items-center justify-center rounded-md bg-blue-100">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="48"
                            height="16"
                            viewBox="0 0 48 16"
                            fill="none"
                            className="h-5"
                        >
                          <path
                              d="M17.4 0.5H30.6C31.6 0.5 32.5 0.9 33.2 1.5C33.9 2.1 34.3 3 34.3 4V12C34.3 13 33.9 13.9 33.2 14.5C32.5 15.1 31.6 15.5 30.6 15.5H17.4C16.4 15.5 15.5 15.1 14.8 14.5C14.1 13.9 13.7 13 13.7 12V4C13.7 3 14.1 2.1 14.8 1.5C15.5 0.9 16.4 0.5 17.4 0.5Z"
                              fill="#1434CB"
                          />
                          <path d="M19.5 10.9L20.8 5.1H22.5L21.2 10.9H19.5Z" fill="white" />
                          <path
                              d="M27.4 5.2C27 5 26.4 4.9 25.7 4.9C24.1 4.9 23 5.7 23 6.9C23 7.8 23.8 8.3 24.4 8.6C25 8.9 25.2 9.1 25.2 9.3C25.2 9.7 24.7 9.8 24.3 9.8C23.7 9.8 23.1 9.7 22.6 9.4L22.3 9.3L22 10.7C22.5 10.9 23.3 11.1 24.1 11.1C25.8 11.1 26.9 10.3 26.9 9C26.9 8.3 26.5 7.8 25.6 7.4C25.1 7.1 24.7 6.9 24.7 6.7C24.7 6.5 25 6.3 25.5 6.3C26 6.3 26.4 6.4 26.7 6.5L26.9 6.6L27.4 5.2Z"
                              fill="white"
                          />
                          <path
                              d="M29.7 8.6C29.9 8.1 30.5 6.5 30.5 6.5C30.5 6.5 30.6 6.2 30.7 6L30.8 6.4C30.8 6.4 31.2 8.2 31.3 8.6C31 8.6 30.1 8.6 29.7 8.6ZM32.4 5.1H31.1C30.7 5.1 30.4 5.2 30.2 5.6L27.7 10.9H29.4C29.4 10.9 29.7 10.1 29.8 9.9C30 9.9 31.5 9.9 31.8 9.9C31.9 10.2 32 10.9 32 10.9H33.5L32.4 5.1Z"
                              fill="white"
                          />
                          <path
                              d="M18.4 5.1L16.8 8.8L16.6 8C16.2 6.9 15.2 5.8 14.1 5.2L15.6 10.9H17.3L20 5.1H18.4Z"
                              fill="white"
                          />
                          <path
                              d="M15.3 5.1H12.8L12.7 5.2C14.4 5.7 15.6 6.7 16.1 8L15.5 5.6C15.4 5.2 15.1 5.1 14.8 5.1H15.3Z"
                              fill="white"
                          />
                        </svg>
                      </div>
                      <div>
                        <div className="text-lg font-medium">•••• 4242</div>
                        <div className="text-xs text-muted-foreground">Hết hạn 04/2025</div>
                      </div>
                    </div>

                    <div className="mt-4 space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Trạng thái:</span>
                        <Badge variant="outline" className="bg-green-50 text-green-600">
                          Hoạt động
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Loại thẻ:</span>
                        <span>Tín dụng</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Đặt làm mặc định:</span>
                        <span>Có</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Cập Nhật Thông Tin Thẻ</Button>
                </CardFooter>
              </Card>
            </div>

            {/* Tóm tắt sử dụng */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Tóm Tắt Sử Dụng</CardTitle>
                    <CardDescription>Mức sử dụng và giới hạn hiện tại của bạn.</CardDescription>
                  </div>
                  <Select defaultValue="month">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Chọn thời gian" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="week">7 ngày qua</SelectItem>
                      <SelectItem value="month">30 ngày qua</SelectItem>
                      <SelectItem value="quarter">Quý này</SelectItem>
                      <SelectItem value="year">Năm nay</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Tin nhắn */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <MessageSquare className="h-5 w-5 text-blue-500" />
                        <div className="font-medium">Tin Nhắn</div>
                      </div>
                      <HoverCard>
                        <HoverCardTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Info className="h-4 w-4 text-muted-foreground" />
                          </Button>
                        </HoverCardTrigger>
                        <HoverCardContent className="w-80">
                          <div className="space-y-2">
                            <h4 className="font-medium">Chi tiết sử dụng tin nhắn</h4>
                            <div className="text-sm space-y-1">
                              <div className="flex justify-between">
                                <span>Tổng tin nhắn đã gửi:</span>
                                <span className="font-medium">142.928</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Tin nhắn còn lại:</span>
                                <span className="font-medium">7.072</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Tốc độ sử dụng:</span>
                                <span className="font-medium">~4.764/ngày</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Dự kiến hết hạn mức:</span>
                                <span className="font-medium text-amber-500">1.5 ngày nữa</span>
                              </div>
                            </div>
                          </div>
                        </HoverCardContent>
                      </HoverCard>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div>142.928 / 150.000</div>
                      <div className="font-medium text-amber-500">95% đã sử dụng</div>
                    </div>
                    <div className="h-2.5 w-full rounded-full bg-muted overflow-hidden">
                      <div className="h-full w-[95%] rounded-full bg-amber-500"></div>
                    </div>
                    <div className="pt-2">
                      <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={messageUsageData}>
                          <CartesianGrid stroke="#ccc" />
                          <XAxis dataKey="date" />
                          <YAxis />
                          <Tooltip formatter={(value) => `${value.toLocaleString()} tin nhắn`} />
                          <Line type="monotone" dataKey="messages" stroke="#3b82f6" strokeWidth={2} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Lưu trữ */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <HardDrive className="h-5 w-5 text-purple-500" />
                        <div className="font-medium">Lưu Trữ</div>
                      </div>
                      <HoverCard>
                        <HoverCardTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Info className="h-4 w-4 text-muted-foreground" />
                          </Button>
                        </HoverCardTrigger>
                        <HoverCardContent className="w-80">
                          <div className="space-y-2">
                            <h4 className="font-medium">Chi tiết sử dụng lưu trữ</h4>
                            <div className="text-sm space-y-1">
                              <div className="flex justify-between">
                                <span>Hình ảnh:</span>
                                <span className="font-medium">2.8 GB</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Tài liệu:</span>
                                <span className="font-medium">0.9 GB</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Video:</span>
                                <span className="font-medium">0.3 GB</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Khác:</span>
                                <span className="font-medium">0.2 GB</span>
                              </div>
                              <Separator className="my-1" />
                              <div className="flex justify-between">
                                <span>Tổng dung lượng đã dùng:</span>
                                <span className="font-medium">4.2 GB</span>
                              </div>
                            </div>
                          </div>
                        </HoverCardContent>
                      </HoverCard>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div>4,2 GB / 10 GB</div>
                      <div className="font-medium text-green-600">42% đã sử dụng</div>
                    </div>
                    <div className="h-2.5 w-full rounded-full bg-muted overflow-hidden">
                      <div className="h-full w-[42%] rounded-full bg-purple-500"></div>
                    </div>
                    <div className="grid grid-cols-4 gap-2 pt-2">
                      <div className="rounded-md bg-muted p-2 text-center">
                        <div className="text-xs text-muted-foreground">Hình ảnh</div>
                        <div className="text-sm font-medium">2.8 GB</div>
                        <div className="mt-1 h-1 w-full rounded-full bg-background">
                          <div className="h-full w-[67%] rounded-full bg-blue-400"></div>
                        </div>
                      </div>
                      <div className="rounded-md bg-muted p-2 text-center">
                        <div className="text-xs text-muted-foreground">Tài liệu</div>
                        <div className="text-sm font-medium">0.9 GB</div>
                        <div className="mt-1 h-1 w-full rounded-full bg-background">
                          <div className="h-full w-[21%] rounded-full bg-green-400"></div>
                        </div>
                      </div>
                      <div className="rounded-md bg-muted p-2 text-center">
                        <div className="text-xs text-muted-foreground">Video</div>
                        <div className="text-sm font-medium">0.3 GB</div>
                        <div className="mt-1 h-1 w-full rounded-full bg-background">
                          <div className="h-full w-[7%] rounded-full bg-amber-400"></div>
                        </div>
                      </div>
                      <div className="rounded-md bg-muted p-2 text-center">
                        <div className="text-xs text-muted-foreground">Khác</div>
                        <div className="text-sm font-medium">0.2 GB</div>
                        <div className="mt-1 h-1 w-full rounded-full bg-background">
                          <div className="h-full w-[5%] rounded-full bg-red-400"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Nhân viên */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-green-500" />
                        <div className="font-medium">Nhân Viên</div>
                      </div>
                      <HoverCard>
                        <HoverCardTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Info className="h-4 w-4 text-muted-foreground" />
                          </Button>
                        </HoverCardTrigger>
                        <HoverCardContent className="w-80">
                          <div className="space-y-2">
                            <h4 className="font-medium">Chi tiết nhân viên</h4>
                            <div className="text-sm space-y-1">
                              <div className="flex justify-between">
                                <span>Nhân viên đang hoạt động:</span>
                                <span className="font-medium">22</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Nhân viên không hoạt động:</span>
                                <span className="font-medium">2</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Quản trị viên:</span>
                                <span className="font-medium">3</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Nhân viên thường:</span>
                                <span className="font-medium">21</span>
                              </div>
                            </div>
                          </div>
                        </HoverCardContent>
                      </HoverCard>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div>24 / 25</div>
                      <div className="font-medium text-amber-500">96% đã sử dụng</div>
                    </div>
                    <div className="h-2.5 w-full rounded-full bg-muted overflow-hidden">
                      <div className="h-full w-[96%] rounded-full bg-green-500"></div>
                    </div>
                    <div className="pt-2">
                      <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={messageUsageData}>
                          <CartesianGrid stroke="#ccc" />
                          <XAxis dataKey="date" />
                          <YAxis />
                          <Tooltip formatter={(value) => `${value.toLocaleString()} tin nhắn`} />
                          <Line type="monotone" dataKey="messages" stroke="#3b82f6" strokeWidth={2} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-4">
                <Button variant="outline">Xem Chi Tiết Sử Dụng</Button>
                <Button>Nâng Cấp Gói</Button>
              </CardFooter>
            </Card>

            {/* Thông tin gói dịch vụ */}
            <Card>
              <CardHeader>
                <CardTitle>So Sánh Các Gói Dịch Vụ</CardTitle>
                <CardDescription>Tìm gói dịch vụ phù hợp nhất với nhu cầu của bạn.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[200px]">Tính năng</TableHead>
                        <TableHead>
                          <div className="text-center">
                            <div>Cơ Bản</div>
                            <div className="text-xs font-normal text-muted-foreground">299.000đ/tháng</div>
                          </div>
                        </TableHead>
                        <TableHead>
                          <div className="text-center">
                            <div>Chuyên Nghiệp</div>
                            <div className="text-xs font-normal text-muted-foreground">599.000đ/tháng</div>
                          </div>
                        </TableHead>
                        <TableHead>
                          <div className="text-center">
                            <div className="flex items-center justify-center gap-1">
                              Doanh Nghiệp Pro
                              <Badge className="ml-1 bg-primary/20 text-primary">Hiện tại</Badge>
                            </div>
                            <div className="text-xs font-normal text-muted-foreground">1.199.000đ/tháng</div>
                          </div>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Tin nhắn hàng tháng</TableCell>
                        <TableCell className="text-center">10.000</TableCell>
                        <TableCell className="text-center">50.000</TableCell>
                        <TableCell className="text-center">Không giới hạn</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Dung lượng lưu trữ</TableCell>
                        <TableCell className="text-center">2GB</TableCell>
                        <TableCell className="text-center">5GB</TableCell>
                        <TableCell className="text-center">10GB</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Số lượng nhân viên</TableCell>
                        <TableCell className="text-center">5</TableCell>
                        <TableCell className="text-center">15</TableCell>
                        <TableCell className="text-center">25</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Hỗ trợ kỹ thuật</TableCell>
                        <TableCell className="text-center">Email</TableCell>
                        <TableCell className="text-center">Email & Chat</TableCell>
                        <TableCell className="text-center">Email, Chat & Điện thoại</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Tích hợp API</TableCell>
                        <TableCell className="text-center">
                          <Check className="mx-auto h-4 w-4 text-gray-400" />
                        </TableCell>
                        <TableCell className="text-center">
                          <Check className="mx-auto h-4 w-4 text-green-500" />
                        </TableCell>
                        <TableCell className="text-center">
                          <Check className="mx-auto h-4 w-4 text-green-500" />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Báo cáo nâng cao</TableCell>
                        <TableCell className="text-center">
                          <Check className="mx-auto h-4 w-4 text-gray-400" />
                        </TableCell>
                        <TableCell className="text-center">
                          <Check className="mx-auto h-4 w-4 text-green-500" />
                        </TableCell>
                        <TableCell className="text-center">
                          <Check className="mx-auto h-4 w-4 text-green-500" />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Quản lý nhiều tài khoản</TableCell>
                        <TableCell className="text-center">
                          <Check className="mx-auto h-4 w-4 text-gray-400" />
                        </TableCell>
                        <TableCell className="text-center">
                          <Check className="mx-auto h-4 w-4 text-gray-400" />
                        </TableCell>
                        <TableCell className="text-center">
                          <Check className="mx-auto h-4 w-4 text-green-500" />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
              <CardFooter className="flex justify-center border-t pt-4">
                <Button className="w-full md:w-auto">Nâng Cấp Gói Của Bạn</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="invoices" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Hóa Đơn</CardTitle>
                    <CardDescription>Xem và tải xuống hóa đơn của bạn.</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Select defaultValue="all">
                      <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="Trạng thái" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tất cả</SelectItem>
                        <SelectItem value="paid">Đã thanh toán</SelectItem>
                        <SelectItem value="pending">Đang chờ</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select defaultValue="2024">
                      <SelectTrigger className="w-[120px]">
                        <SelectValue placeholder="Năm" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2024">2024</SelectItem>
                        <SelectItem value="2023">2023</SelectItem>
                        <SelectItem value="2022">2022</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Hóa Đơn</TableHead>
                      <TableHead>Ngày</TableHead>
                      <TableHead>Số Tiền</TableHead>
                      <TableHead>Phương thức</TableHead>
                      <TableHead>Trạng Thái</TableHead>
                      <TableHead className="text-right">Thao Tác</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {invoices.map((invoice) => (
                        <TableRow key={invoice.id}>
                          <TableCell className="font-medium">{invoice.invoice}</TableCell>
                          <TableCell>{invoice.date}</TableCell>
                          <TableCell>{invoice.amount}đ</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <CreditCard className="h-4 w-4 text-muted-foreground" />
                              <span>Visa •••• 4242</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                                className={`${
                                    invoice.status === "Đã thanh toán"
                                        ? "bg-green-100 text-green-800 hover:bg-green-100"
                                        : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                                }`}
                            >
                              {invoice.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              <Download className="mr-2 h-4 w-4" />
                              Tải xuống
                            </Button>
                          </TableCell>
                        </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className="flex items-center justify-between border-t pt-4">
                <div className="text-sm text-muted-foreground">Hiển thị 1-5 của 12 hóa đơn</div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" disabled>
                    Trước
                  </Button>
                  <Button variant="outline" size="sm">
                    Tiếp
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="payment-methods" className="space-y-4">
            <div className="flex justify-between">
              <h3 className="text-lg font-medium">Phương Thức Thanh Toán</h3>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" /> Thêm Phương Thức Thanh Toán
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Thêm Phương Thức Thanh Toán</DialogTitle>
                    <DialogDescription>Thêm thẻ tín dụng hoặc thẻ ghi nợ mới vào tài khoản của bạn.</DialogDescription>
                  </DialogHeader>
                  <form className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="card-number">Số Thẻ</Label>
                      <Input id="card-number" placeholder="1234 5678 9012 3456" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="expiry">Ngày Hết Hạn</Label>
                        <Input id="expiry" placeholder="MM/YY" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="cvc">CVC</Label>
                        <Input id="cvc" placeholder="123" />
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="name">Tên Chủ Thẻ</Label>
                      <Input id="name" placeholder="Nguyễn Văn A" />
                    </div>
                    <DialogFooter>
                      <Button type="submit">Lưu Thẻ</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card className="relative overflow-hidden border-l-4 border-l-blue-500">
                <div className="absolute right-2 top-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary-foreground">
                    <div className="h-3 w-3 rounded-full bg-primary"></div>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="flex h-9 w-14 items-center justify-center rounded bg-blue-100">
                      <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="48"
                          height="16"
                          viewBox="0 0 48 16"
                          fill="none"
                          className="h-5"
                      >
                        <path
                            d="M17.4 0.5H30.6C31.6 0.5 32.5 0.9 33.2 1.5C33.9 2.1 34.3 3 34.3 4V12C34.3 13 33.9 13.9 33.2 14.5C32.5 15.1 31.6 15.5 30.6 15.5H17.4C16.4 15.5 15.5 15.1 14.8 14.5C14.1 13.9 13.7 13 13.7 12V4C13.7 3 14.1 2.1 14.8 1.5C15.5 0.9 16.4 0.5 17.4 0.5Z"
                            fill="#1434CB"
                        />
                        <path d="M19.5 10.9L20.8 5.1H22.5L21.2 10.9H19.5Z" fill="white" />
                        <path
                            d="M27.4 5.2C27 5 26.4 4.9 25.7 4.9C24.1 4.9 23 5.7 23 6.9C23 7.8 23.8 8.3 24.4 8.6C25 8.9 25.2 9.1 25.2 9.3C25.2 9.7 24.7 9.8 24.3 9.8C23.7 9.8 23.1 9.7 22.6 9.4L22.3 9.3L22 10.7C22.5 10.9 23.3 11.1 24.1 11.1C25.8 11.1 26.9 10.3 26.9 9C26.9 8.3 26.5 7.8 25.6 7.4C25.1 7.1 24.7 6.9 24.7 6.7C24.7 6.5 25 6.3 25.5 6.3C26 6.3 26.4 6.4 26.7 6.5L26.9 6.6L27.4 5.2Z"
                            fill="white"
                        />
                        <path
                            d="M29.7 8.6C29.9 8.1 30.5 6.5 30.5 6.5C30.5 6.5 30.6 6.2 30.7 6L30.8 6.4C30.8 6.4 31.2 8.2 31.3 8.6C31 8.6 30.1 8.6 29.7 8.6ZM32.4 5.1H31.1C30.7 5.1 30.4 5.2 30.2 5.6L27.7 10.9H29.4C29.4 10.9 29.7 10.1 29.8 9.9C30 9.9 31.5 9.9 31.8 9.9C31.9 10.2 32 10.9 32 10.9H33.5L32.4 5.1Z"
                            fill="white"
                        />
                        <path
                            d="M18.4 5.1L16.8 8.8L16.6 8C16.2 6.9 15.2 5.8 14.1 5.2L15.6 10.9H17.3L20 5.1H18.4Z"
                            fill="white"
                        />
                        <path
                            d="M15.3 5.1H12.8L12.7 5.2C14.4 5.7 15.6 6.7 16.1 8L15.5 5.6C15.4 5.2 15.1 5.1 14.8 5.1H15.3Z"
                            fill="white"
                        />
                      </svg>
                    </div>
                    <div>
                      <span>Visa</span> kết thúc bằng 4242
                    </div>
                  </CardTitle>
                  <CardDescription>Hết hạn 04/2025</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground">
                    <div className="flex items-center justify-between">
                      <span>Trạng thái:</span>
                      <Badge variant="outline" className="bg-green-50 text-green-600">
                        Hoạt động
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <span>Loại thẻ:</span>
                      <span>Tín dụng</span>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <span>Thẻ mặc định:</span>
                      <Check className="h-4 w-4 text-green-500" />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-4">
                  <Button variant="outline" size="sm">
                    Chỉnh Sửa
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50">
                    Xóa
                  </Button>
                </CardFooter>
              </Card>

              <Card className="border-l-4 border-l-red-500">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="flex h-9 w-14 items-center justify-center rounded bg-red-100">
                      <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="36"
                          height="24"
                          viewBox="0 0 36 24"
                          fill="none"
                          className="h-5"
                      >
                        <path
                            d="M22.2 12C22.2 14.8 19.9 17.1 17.1 17.1C14.3 17.1 12 14.8 12 12C12 9.2 14.3 6.9 17.1 6.9C19.9 6.9 22.2 9.2 22.2 12Z"
                            fill="#FF5F00"
                        />
                        <path
                            d="M12.9 12C12.9 10.3 13.7 8.8 15 7.8C14 6.9 12.7 6.4 11.3 6.4C7.8 6.4 5 8.9 5 12C5 15.1 7.8 17.6 11.3 17.6C12.7 17.6 14 17.1 15 16.2C13.7 15.2 12.9 13.7 12.9 12Z"
                            fill="#EB001B"
                        />
                        <path
                            d="M29.2 12C29.2 15.1 26.4 17.6 22.9 17.6C21.5 17.6 20.2 17.1 19.2 16.2C20.5 15.2 21.3 13.7 21.3 12C21.3 10.3 20.5 8.8 19.2 7.8C20.2 6.9 21.5 6.4 22.9 6.4C26.4 6.4 29.2 8.9 29.2 12Z"
                            fill="#F79E1B"
                        />
                      </svg>
                    </div>
                    <div>
                      <span>Mastercard</span> kết thúc bằng 5555
                    </div>
                  </CardTitle>
                  <CardDescription>Hết hạn 08/2024</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground">
                    <div className="flex items-center justify-between">
                      <span>Trạng thái:</span>
                      <Badge variant="outline" className="bg-green-50 text-green-600">
                        Hoạt động
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <span>Loại thẻ:</span>
                      <span>Ghi nợ</span>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <span>Thẻ mặc định:</span>
                      <span className="text-muted-foreground">Không</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-4">
                  <Button variant="outline" size="sm">
                    Đặt làm Mặc định
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50">
                    Xóa
                  </Button>
                </CardFooter>
              </Card>

              <Card className="border-dashed">
                <CardContent className="flex flex-col items-center justify-center h-[200px]">
                  <div className="mb-4 rounded-full bg-muted p-3">
                    <Plus className="h-6 w-6" />
                  </div>
                  <p className="text-sm font-medium">Thêm phương thức thanh toán mới</p>
                  <p className="text-xs text-muted-foreground mt-1">Thêm thẻ tín dụng hoặc thẻ ghi nợ</p>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="mt-4">
                        Thêm Thẻ
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Thêm Phương Thức Thanh Toán</DialogTitle>
                        <DialogDescription>
                          Thêm thẻ tín dụng hoặc thẻ ghi nợ mới vào tài khoản của bạn.
                        </DialogDescription>
                      </DialogHeader>
                      <form className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <Label htmlFor="card-number-2">Số Thẻ</Label>
                          <Input id="card-number-2" placeholder="1234 5678 9012 3456" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="grid gap-2">
                            <Label htmlFor="expiry-2">Ngày Hết Hạn</Label>
                            <Input id="expiry-2" placeholder="MM/YY" />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="cvc-2">CVC</Label>
                            <Input id="cvc-2" placeholder="123" />
                          </div>
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="name-2">Tên Chủ Thẻ</Label>
                          <Input id="name-2" placeholder="Nguyễn Văn A" />
                        </div>
                        <DialogFooter>
                          <Button type="submit">Lưu Thẻ</Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </DashboardShell>
  )
}

const invoices = [
  {
    id: 1,
    invoice: "HD-001",
    date: "01/03/2024",
    amount: "1.199.000",
    status: "Đã thanh toán",
  },
  {
    id: 2,
    invoice: "HD-002",
    date: "01/02/2024",
    amount: "1.199.000",
    status: "Đã thanh toán",
  },
  {
    id: 3,
    invoice: "HD-003",
    date: "01/01/2024",
    amount: "1.199.000",
    status: "Đã thanh toán",
  },
  {
    id: 4,
    invoice: "HD-004",
    date: "01/12/2023",
    amount: "1.199.000",
    status: "Đã thanh toán",
  },
  {
    id: 5,
    invoice: "HD-005",
    date: "01/11/2023",
    amount: "1.199.000",
    status: "Đã thanh toán",
  },
]

const messageUsageData = [
  { date: "01/03", messages: 4800 },
  { date: "02/03", messages: 4600 },
  { date: "03/03", messages: 4900 },
  { date: "04/03", messages: 5100 },
  { date: "05/03", messages: 4700 },
  { date: "06/03", messages: 4500 },
  { date: "07/03", messages: 4800 },
  { date: "08/03", messages: 5200 },
  { date: "09/03", messages: 5400 },
  { date: "10/03", messages: 5100 },
  { date: "11/03", messages: 4900 },
  { date: "12/03", messages: 5000 },
  { date: "13/03", messages: 5300 },
  { date: "14/03", messages: 5500 },
]

const employeeActivityData = [
  { department: "Kinh doanh", active: 8, inactive: 1 },
  { department: "Kỹ thuật", active: 6, inactive: 0 },
  { department: "Marketing", active: 4, inactive: 1 },
  { department: "Hỗ trợ", active: 4, inactive: 0 },
]

