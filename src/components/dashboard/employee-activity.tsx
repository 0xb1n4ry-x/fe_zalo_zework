"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"
import { ArrowUpDown, Clock, Filter, MessageSquare, Star, TrendingUp, Users } from "lucide-react"

// Dữ liệu nhân viên
const employees = [
  {
    id: 1,
    name: "Nguyễn Thị Hương",
    department: "Hỗ Trợ Khách Hàng",
    messages: 428,
    responseTime: "1,2 phút",
    progress: 85,
    avatar: "/placeholder.svg?height=36&width=36",
    rating: 4.8,
    satisfaction: 96,
    dailyActivity: [
      { time: "08:00", messages: 28 },
      { time: "10:00", messages: 42 },
      { time: "12:00", messages: 35 },
      { time: "14:00", messages: 50 },
      { time: "16:00", messages: 45 },
      { time: "18:00", messages: 30 },
    ],
    weeklyPerformance: [
      { day: "T2", messages: 85, responseTime: 1.3 },
      { day: "T3", messages: 78, responseTime: 1.2 },
      { day: "T4", messages: 92, responseTime: 1.1 },
      { day: "T5", messages: 88, responseTime: 1.2 },
      { day: "T6", messages: 85, responseTime: 1.3 },
      { day: "T7", messages: 0, responseTime: 0 },
      { day: "CN", messages: 0, responseTime: 0 },
    ],
    status: "online",
    lastActive: "Đang hoạt động",
  },
  {
    id: 2,
    name: "Trần Văn Minh",
    department: "Kinh Doanh",
    messages: 352,
    responseTime: "1,5 phút",
    progress: 70,
    avatar: "/placeholder.svg?height=36&width=36",
    rating: 4.6,
    satisfaction: 92,
    dailyActivity: [
      { time: "08:00", messages: 22 },
      { time: "10:00", messages: 38 },
      { time: "12:00", messages: 30 },
      { time: "14:00", messages: 45 },
      { time: "16:00", messages: 40 },
      { time: "18:00", messages: 25 },
    ],
    weeklyPerformance: [
      { day: "T2", messages: 70, responseTime: 1.5 },
      { day: "T3", messages: 65, responseTime: 1.6 },
      { day: "T4", messages: 75, responseTime: 1.4 },
      { day: "T5", messages: 72, responseTime: 1.5 },
      { day: "T6", messages: 70, responseTime: 1.5 },
      { day: "T7", messages: 0, responseTime: 0 },
      { day: "CN", messages: 0, responseTime: 0 },
    ],
    status: "online",
    lastActive: "Đang hoạt động",
  },
  {
    id: 3,
    name: "Lê Thị Lan",
    department: "Hỗ Trợ Kỹ Thuật",
    messages: 312,
    responseTime: "2,1 phút",
    progress: 62,
    avatar: "/placeholder.svg?height=36&width=36",
    rating: 4.5,
    satisfaction: 90,
    dailyActivity: [
      { time: "08:00", messages: 20 },
      { time: "10:00", messages: 35 },
      { time: "12:00", messages: 28 },
      { time: "14:00", messages: 40 },
      { time: "16:00", messages: 35 },
      { time: "18:00", messages: 22 },
    ],
    weeklyPerformance: [
      { day: "T2", messages: 60, responseTime: 2.2 },
      { day: "T3", messages: 58, responseTime: 2.1 },
      { day: "T4", messages: 65, responseTime: 2.0 },
      { day: "T5", messages: 62, responseTime: 2.1 },
      { day: "T6", messages: 67, responseTime: 2.0 },
      { day: "T7", messages: 0, responseTime: 0 },
      { day: "CN", messages: 0, responseTime: 0 },
    ],
    status: "away",
    lastActive: "Vắng mặt - 15 phút trước",
  },
  {
    id: 4,
    name: "Phạm Văn Đức",
    department: "Hỗ Trợ Khách Hàng",
    messages: 287,
    responseTime: "1,8 phút",
    progress: 57,
    avatar: "/placeholder.svg?height=36&width=36",
    rating: 4.3,
    satisfaction: 86,
    dailyActivity: [
      { time: "08:00", messages: 18 },
      { time: "10:00", messages: 32 },
      { time: "12:00", messages: 25 },
      { time: "14:00", messages: 35 },
      { time: "16:00", messages: 30 },
      { time: "18:00", messages: 20 },
    ],
    weeklyPerformance: [
      { day: "T2", messages: 55, responseTime: 1.9 },
      { day: "T3", messages: 52, responseTime: 1.8 },
      { day: "T4", messages: 60, responseTime: 1.7 },
      { day: "T5", messages: 58, responseTime: 1.8 },
      { day: "T6", messages: 62, responseTime: 1.7 },
      { day: "T7", messages: 0, responseTime: 0 },
      { day: "CN", messages: 0, responseTime: 0 },
    ],
    status: "offline",
    lastActive: "Hoạt động cuối 2 giờ trước",
  },
]

// Dữ liệu hiệu suất theo phòng ban
const departmentPerformance = [
  { name: "Hỗ Trợ Khách Hàng", messages: 715, responseTime: 1.5, satisfaction: 91 },
  { name: "Kinh Doanh", messages: 352, responseTime: 1.5, satisfaction: 92 },
  { name: "Hỗ Trợ Kỹ Thuật", messages: 312, responseTime: 2.1, satisfaction: 90 },
  { name: "Marketing", messages: 245, responseTime: 1.3, satisfaction: 88 },
]

export function EmployeeActivity() {
  const [timeRange, setTimeRange] = useState("weekly")
  const [selectedEmployee, setSelectedEmployee] = useState("all")
  const [sortBy, setSortBy] = useState("messages")
  const [viewMode, setViewMode] = useState("list")

  // Lọc và sắp xếp nhân viên
  const sortedEmployees = [...employees].sort((a, b) => {
    if (sortBy === "messages") return b.messages - a.messages
    if (sortBy === "responseTime")
      return Number.parseFloat(a.responseTime.replace(",", ".")) - Number.parseFloat(b.responseTime.replace(",", "."))
    if (sortBy === "rating") return b.rating - a.rating
    return 0
  })

  // Định dạng tooltip cho biểu đồ
  const formatTooltip = (value: never, name: string) => {
    if (name === "messages") return [`${value} tin nhắn`, "Số lượng"]
    if (name === "responseTime") return [`${value} phút`, "Thời gian"]
    return [value, name]
  }

  return (
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Tổng quan</TabsTrigger>
              <TabsTrigger value="performance">Hiệu suất</TabsTrigger>
              <TabsTrigger value="departments">Phòng ban</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex gap-2">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Thời gian" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Hôm nay</SelectItem>
                <SelectItem value="weekly">Tuần này</SelectItem>
                <SelectItem value="monthly">Tháng này</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" size="icon" className="h-9 w-9">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <TabsContent value="overview" className="mt-0 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div className="flex items-center gap-2">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sắp xếp theo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="messages">Số tin nhắn</SelectItem>
                  <SelectItem value="responseTime">Thời gian phản hồi</SelectItem>
                  <SelectItem value="rating">Đánh giá</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" size="sm" className="h-9">
                <ArrowUpDown className="mr-2 h-3.5 w-3.5" />
                Sắp xếp
              </Button>
            </div>

            <div className="flex gap-2">
              <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  className="h-9"
                  onClick={() => setViewMode("list")}
              >
                <Users className="mr-2 h-3.5 w-3.5" />
                Danh sách
              </Button>

              <Button
                  variant={viewMode === "chart" ? "default" : "outline"}
                  size="sm"
                  className="h-9"
                  onClick={() => setViewMode("chart")}
              >
                <TrendingUp className="mr-2 h-3.5 w-3.5" />
                Biểu đồ
              </Button>
            </div>
          </div>

          {viewMode === "list" ? (
              <div className="space-y-4">
                {sortedEmployees.map((employee) => (
                    <div key={employee.id} className="flex items-center">
                      <Avatar className="h-9 w-9 mr-4">
                        <AvatarImage src={employee.avatar} alt={employee.name} />
                        <AvatarFallback>{employee.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-medium leading-none">{employee.name}</p>
                            <Badge
                                variant={
                                  employee.status === "online"
                                      ? "success"
                                      : employee.status === "away"
                                          ? "warning"
                                          : "secondary"
                                }
                                className="text-xs"
                            >
                              {employee.status === "online" ? "Online" : employee.status === "away" ? "Vắng mặt" : "Offline"}
                            </Badge>
                          </div>
                          <p className="text-sm font-medium">{employee.messages}</p>
                        </div>
                        <Progress value={employee.progress} className="h-2" />
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <span>{employee.department}</span>
                            <span>•</span>
                            <div className="flex items-center">
                              <Clock className="mr-1 h-3 w-3" />
                              <span>{employee.responseTime} thời gian phản hồi</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 text-yellow-500" />
                            <span>{employee.rating}/5</span>
                            <span>•</span>
                            <span>{employee.satisfaction}% hài lòng</span>
                          </div>
                        </div>
                      </div>
                    </div>
                ))}
              </div>
          ) : (
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={sortedEmployees} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={formatTooltip} />
                    <Bar dataKey="messages" name="Tin nhắn" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
          )}
        </TabsContent>

        <TabsContent value="performance" className="mt-0 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <Select value={selectedEmployee} onValueChange={setSelectedEmployee}>
              <SelectTrigger className="w-full sm:w-[250px]">
                <SelectValue placeholder="Chọn nhân viên" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả nhân viên</SelectItem>
                {employees.map((emp) => (
                    <SelectItem key={emp.id} value={emp.id.toString()}>
                      {emp.name}
                    </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedEmployee === "all" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded-lg p-4">
                  <h4 className="text-sm font-medium mb-3">Số lượng tin nhắn theo nhân viên</h4>
                  <div className="h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={employees} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                        <YAxis />
                        <Tooltip formatter={formatTooltip} />
                        <Bar dataKey="messages" name="Tin nhắn" fill="#3b82f6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="text-sm font-medium mb-3">Thời gian phản hồi trung bình</h4>
                  <div className="h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                          data={employees.map((emp) => ({
                            name: emp.name,
                            responseTime: Number.parseFloat(emp.responseTime.replace(",", ".")),
                          }))}
                          margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                        <YAxis />
                        <Tooltip formatter={formatTooltip} />
                        <Line
                            type="monotone"
                            dataKey="responseTime"
                            name="Thời gian phản hồi"
                            stroke="#10b981"
                            strokeWidth={2}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="border rounded-lg p-4 md:col-span-2">
                  <h4 className="text-sm font-medium mb-3">Thống kê hiệu suất</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="border rounded-lg p-3">
                      <div className="text-xs text-muted-foreground">Tổng tin nhắn</div>
                      <div className="text-lg font-semibold mt-1">1,379</div>
                      <div className="flex items-center gap-1 text-xs text-green-600 mt-1">
                        <TrendingUp className="h-3 w-3" />
                        <span>+8.5% so với tuần trước</span>
                      </div>
                    </div>

                    <div className="border rounded-lg p-3">
                      <div className="text-xs text-muted-foreground">Thời gian phản hồi TB</div>
                      <div className="text-lg font-semibold mt-1">1.65 phút</div>
                      <div className="flex items-center gap-1 text-xs text-green-600 mt-1">
                        <TrendingUp className="h-3 w-3" />
                        <span>-0.2 phút so với tuần trước</span>
                      </div>
                    </div>

                    <div className="border rounded-lg p-3">
                      <div className="text-xs text-muted-foreground">Đánh giá trung bình</div>
                      <div className="text-lg font-semibold mt-1">4.55/5</div>
                      <div className="flex items-center gap-1 text-xs text-green-600 mt-1">
                        <TrendingUp className="h-3 w-3" />
                        <span>+0.1 so với tuần trước</span>
                      </div>
                    </div>

                    <div className="border rounded-lg p-3">
                      <div className="text-xs text-muted-foreground">Tỷ lệ hài lòng</div>
                      <div className="text-lg font-semibold mt-1">91%</div>
                      <div className="flex items-center gap-1 text-xs text-green-600 mt-1">
                        <TrendingUp className="h-3 w-3" />
                        <span>+2% so với tuần trước</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          ) : (
              <div className="space-y-4">
                {(() => {
                  const employee = employees.find((emp) => emp.id.toString() === selectedEmployee)
                  if (!employee) return null

                  return (
                      <>
                        <div className="flex items-center gap-4 p-4 border rounded-lg">
                          <Avatar className="h-16 w-16">
                            <AvatarImage src={employee.avatar} alt={employee.name} />
                            <AvatarFallback>{employee.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="text-lg font-semibold">{employee.name}</h3>
                            <p className="text-sm text-muted-foreground">{employee.department}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge
                                  variant={
                                    employee.status === "online"
                                        ? "success"
                                        : employee.status === "away"
                                            ? "warning"
                                            : "secondary"
                                  }
                              >
                                {employee.status === "online"
                                    ? "Online"
                                    : employee.status === "away"
                                        ? "Vắng mặt"
                                        : "Offline"}
                              </Badge>
                              <span className="text-xs text-muted-foreground">{employee.lastActive}</span>
                            </div>
                          </div>
                          <div className="ml-auto grid grid-cols-2 gap-4">
                            <div className="text-center">
                              <div className="text-2xl font-bold">{employee.messages}</div>
                              <div className="text-xs text-muted-foreground">Tin nhắn</div>
                            </div>
                            <div className="text-center">
                              <div className="text-2xl font-bold">{employee.responseTime}</div>
                              <div className="text-xs text-muted-foreground">Thời gian phản hồi</div>
                            </div>
                            <div className="text-center">
                              <div className="text-2xl font-bold flex items-center justify-center">
                                {employee.rating}
                                <Star className="h-4 w-4 text-yellow-500 ml-1" />
                              </div>
                              <div className="text-xs text-muted-foreground">Đánh giá</div>
                            </div>
                            <div className="text-center">
                              <div className="text-2xl font-bold">{employee.satisfaction}%</div>
                              <div className="text-xs text-muted-foreground">Tỷ lệ hài lòng</div>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="border rounded-lg p-4">
                            <h4 className="text-sm font-medium mb-3">Hoạt động trong ngày</h4>
                            <div className="h-[250px]">
                              <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={employee.dailyActivity} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                  <XAxis dataKey="time" />
                                  <YAxis />
                                  <Tooltip formatter={formatTooltip} />
                                  <Bar dataKey="messages" name="Tin nhắn" fill="#3b82f6" />
                                </BarChart>
                              </ResponsiveContainer>
                            </div>
                          </div>

                          <div className="border rounded-lg p-4">
                            <h4 className="text-sm font-medium mb-3">Hiệu suất trong tuần</h4>
                            <div className="h-[250px]">
                              <ResponsiveContainer width="100%" height="100%">
                                <LineChart
                                    data={employee.weeklyPerformance}
                                    margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                                >
                                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                  <XAxis dataKey="day" />
                                  <YAxis yAxisId="left" orientation="left" />
                                  <YAxis yAxisId="right" orientation="right" />
                                  <Tooltip formatter={formatTooltip} />
                                  <Line
                                      yAxisId="left"
                                      type="monotone"
                                      dataKey="messages"
                                      name="Tin nhắn"
                                      stroke="#3b82f6"
                                      strokeWidth={2}
                                  />
                                  <Line
                                      yAxisId="right"
                                      type="monotone"
                                      dataKey="responseTime"
                                      name="Thời gian phản hồi"
                                      stroke="#10b981"
                                      strokeWidth={2}
                                  />
                                </LineChart>
                              </ResponsiveContainer>
                            </div>
                          </div>
                        </div>
                      </>
                  )
                })()}
              </div>
          )}
        </TabsContent>

        <TabsContent value="departments" className="mt-0 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border rounded-lg p-4">
              <h4 className="text-sm font-medium mb-3">Hiệu suất theo phòng ban</h4>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={departmentPerformance} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={formatTooltip} />
                    <Bar dataKey="messages" name="Tin nhắn" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <h4 className="text-sm font-medium mb-3">Thời gian phản hồi theo phòng ban</h4>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={departmentPerformance} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={formatTooltip} />
                    <Bar dataKey="responseTime" name="Thời gian phản hồi" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {departmentPerformance.map((dept, index) => (
                <div key={index} className="flex items-center p-4 border rounded-lg">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary mr-4">
                    <MessageSquare className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium">{dept.name}</h4>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <MessageSquare className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium">{dept.messages}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium">{dept.responseTime} phút</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500" />
                          <span className="text-sm font-medium">{dept.satisfaction}%</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-2">
                      <Progress value={dept.satisfaction} className="h-2" />
                      <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                        <span>Tỷ lệ hài lòng</span>
                        <span>{dept.satisfaction}%</span>
                      </div>
                    </div>
                  </div>
                </div>
            ))}
          </div>
        </TabsContent>
      </div>
  )
}

