"use client"

import { useState } from "react"
import {
    Cell,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    Legend,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
} from "recharts"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { ArrowUpIcon, ArrowDownIcon, HardDriveIcon, FileIcon, ImageIcon, VideoIcon, FileTextIcon } from "lucide-react"

// Dữ liệu phân loại lưu trữ
const storageTypeData = [
    { name: "Hình ảnh", value: 2.1, color: "#3b82f6", icon: <ImageIcon className="h-4 w-4" /> },
    { name: "Video", value: 1.3, color: "#10b981", icon: <VideoIcon className="h-4 w-4" /> },
    { name: "Tài liệu", value: 0.5, color: "#f59e0b", icon: <FileTextIcon className="h-4 w-4" /> },
    { name: "Khác", value: 0.3, color: "#6366f1", icon: <FileIcon className="h-4 w-4" /> },
]

// Dữ liệu xu hướng sử dụng lưu trữ theo thời gian
const storageHistoryData = [
    { date: "T1", total: 2.8 },
    { date: "T2", total: 3.1 },
    { date: "T3", total: 3.3 },
    { date: "T4", total: 3.5 },
    { date: "T5", total: 3.7 },
    { date: "T6", total: 3.8 },
    { date: "T7", total: 3.9 },
    { date: "T8", total: 4.0 },
    { date: "T9", total: 4.1 },
    { date: "T10", total: 4.2 },
    { date: "T11", total: 4.2 },
    { date: "T12", total: 4.2 },
]

// Dữ liệu sử dụng lưu trữ theo người dùng
const userStorageData = [
    { name: "Nguyễn Thị Hương", usage: 0.8, percentage: 19 },
    { name: "Trần Văn Minh", usage: 0.7, percentage: 17 },
    { name: "Lê Thị Lan", usage: 0.6, percentage: 14 },
    { name: "Phạm Văn Đức", usage: 0.5, percentage: 12 },
    { name: "Hoàng Thị Mai", usage: 0.4, percentage: 10 },
]

export function StorageUsage() {
    const [timeRange, setTimeRange] = useState("monthly")
    const totalStorage = 10 // GB
    const usedStorage = 4.2 // GB
    const usagePercentage = (usedStorage / totalStorage) * 100
    const freeStorage = totalStorage - usedStorage

    // Định dạng tooltip cho biểu đồ tròn
    const formatPieTooltip = (value: any) => {
        return [`${value} GB`, "Kích thước"]
    }

    // Định dạng tooltip cho biểu đồ xu hướng
    const formatAreaTooltip = (value :any) => {
        return [`${value} GB`, "Dung lượng đã sử dụng"]
    }

    return (
        <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <Tabs defaultValue="overview" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="overview">Tổng quan</TabsTrigger>
                        <TabsTrigger value="trends">Xu hướng</TabsTrigger>
                        <TabsTrigger value="users">Người dùng</TabsTrigger>
                    </TabsList>
                </Tabs>

                <Select value={timeRange} onValueChange={setTimeRange}>
                    <SelectTrigger className="w-full sm:w-[150px]">
                        <SelectValue placeholder="Khoảng thời gian" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="weekly">Tuần này</SelectItem>
                        <SelectItem value="monthly">Tháng này</SelectItem>
                        <SelectItem value="quarterly">Quý này</SelectItem>
                        <SelectItem value="yearly">Năm nay</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <TabsContent value="overview" className="mt-0 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Đã sử dụng</span>
                            <span className="text-sm font-medium">{usedStorage} GB</span>
                        </div>
                        <Progress value={usagePercentage} className="h-2" />
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <span>{usagePercentage.toFixed(0)}% đã sử dụng</span>
                            <span>{freeStorage} GB còn trống</span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Tốc độ sử dụng</span>
                            <span className="text-sm font-medium">+0.2 GB/tháng</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1 text-xs text-green-600">
                                <ArrowDownIcon className="h-3 w-3" />
                                <span>12% so với tháng trước</span>
                            </div>
                            <div className="flex items-center gap-1 text-xs">
                                <HardDriveIcon className="h-3 w-3 text-muted-foreground" />
                                <span className="text-muted-foreground">Còn trống 29 tháng</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="h-[220px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={storageTypeData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {storageTypeData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} stroke={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip formatter={formatPieTooltip} />
                                <Legend
                                    layout="vertical"
                                    verticalAlign="middle"
                                    align="right"
                                    formatter={(value) => <span className="text-xs">{value}</span>}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="space-y-3">
                        {storageTypeData.map((item, index) => (
                            <div key={index} className="flex items-center gap-3">
                                <div
                                    className="flex h-8 w-8 items-center justify-center rounded-md"
                                    style={{ backgroundColor: `${item.color}20`, color: item.color }}
                                >
                                    {item.icon}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium">{item.name}</span>
                                        <span className="text-sm font-medium">{item.value} GB</span>
                                    </div>
                                    <Progress value={(item.value / usedStorage) * 100} className="h-1.5 mt-1" />
                                    <div className="flex items-center justify-between mt-0.5">
                    <span className="text-xs text-muted-foreground">
                      {((item.value / usedStorage) * 100).toFixed(0)}%
                    </span>
                                        <span className="text-xs text-muted-foreground">
                      {((item.value / totalStorage) * 100).toFixed(0)}% tổng
                    </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </TabsContent>

            <TabsContent value="trends" className="mt-0 space-y-4">
                <div className="h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={storageHistoryData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="date" />
                            <YAxis domain={[0, totalStorage]} tickFormatter={(value) => `${value} GB`} />
                            <Tooltip formatter={formatAreaTooltip} />
                            <defs>
                                <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
                                </linearGradient>
                            </defs>
                            <Area
                                type="monotone"
                                dataKey="total"
                                stroke="#3b82f6"
                                fillOpacity={1}
                                fill="url(#colorTotal)"
                                name="Dung lượng đã sử dụng"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="rounded-lg border p-3">
                        <div className="text-xs text-muted-foreground">Tháng trước</div>
                        <div className="text-lg font-semibold mt-1">4.0 GB</div>
                        <div className="flex items-center gap-1 text-xs text-green-600 mt-1">
                            <ArrowUpIcon className="h-3 w-3" />
                            <span>+0.2 GB</span>
                        </div>
                    </div>

                    <div className="rounded-lg border p-3">
                        <div className="text-xs text-muted-foreground">Hiện tại</div>
                        <div className="text-lg font-semibold mt-1">4.2 GB</div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                            <span>42% tổng dung lượng</span>
                        </div>
                    </div>

                    <div className="rounded-lg border p-3">
                        <div className="text-xs text-muted-foreground">Dự đoán tháng sau</div>
                        <div className="text-lg font-semibold mt-1">4.4 GB</div>
                        <div className="flex items-center gap-1 text-xs text-red-600 mt-1">
                            <ArrowUpIcon className="h-3 w-3" />
                            <span>+0.2 GB</span>
                        </div>
                    </div>

                    <div className="rounded-lg border p-3">
                        <div className="text-xs text-muted-foreground">Tốc độ tăng</div>
                        <div className="text-lg font-semibold mt-1">0.2 GB/tháng</div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                            <span>Còn trống 29 tháng</span>
                        </div>
                    </div>
                </div>
            </TabsContent>

            <TabsContent value="users" className="mt-0 space-y-4">
                <div className="space-y-4">
                    {userStorageData.map((user, index) => (
                        <div key={index} className="flex items-center gap-3">
                            <div className="flex-shrink-0 w-8 text-center text-sm font-medium">{index + 1}</div>
                            <div className="flex-1">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium">{user.name}</span>
                                    <span className="text-sm font-medium">{user.usage} GB</span>
                                </div>
                                <Progress value={user.percentage} className="h-2 mt-1" />
                                <div className="flex items-center justify-between mt-0.5">
                                    <span className="text-xs text-muted-foreground">{user.percentage}% tổng dung lượng đã dùng</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="rounded-lg border p-4 mt-4">
                    <h4 className="text-sm font-medium mb-2">Thông tin chi tiết</h4>
                    <div className="space-y-2 text-sm">
                        <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Tổng số người dùng:</span>
                            <span>24 người dùng</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Dung lượng trung bình/người:</span>
                            <span>0.18 GB/người</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Người dùng sử dụng nhiều nhất:</span>
                            <span>Nguyễn Thị Hương (0.8 GB)</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Người dùng sử dụng ít nhất:</span>
                            <span>Vũ Thị Hương (0.05 GB)</span>
                        </div>
                    </div>
                </div>
            </TabsContent>
        </div>
    )
}

