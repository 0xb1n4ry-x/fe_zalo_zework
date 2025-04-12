"use client"

import { useState } from "react"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// Dữ liệu mẫu theo giờ (24 giờ trong ngày)
const hourlyData = [
  { name: "00:00", total: 45 },
  { name: "01:00", total: 32 },
  { name: "02:00", total: 18 },
  { name: "03:00", total: 12 },
  { name: "04:00", total: 8 },
  { name: "05:00", total: 10 },
  { name: "06:00", total: 25 },
  { name: "07:00", total: 58 },
  { name: "08:00", total: 95 },
  { name: "09:00", total: 132 },
  { name: "10:00", total: 167 },
  { name: "11:00", total: 185 },
  { name: "12:00", total: 176 },
  { name: "13:00", total: 164 },
  { name: "14:00", total: 158 },
  { name: "15:00", total: 175 },
  { name: "16:00", total: 190 },
  { name: "17:00", total: 205 },
  { name: "18:00", total: 187 },
  { name: "19:00", total: 142 },
  { name: "20:00", total: 118 },
  { name: "21:00", total: 85 },
  { name: "22:00", total: 72 },
  { name: "23:00", total: 58 },
]

// Dữ liệu mẫu theo ngày (30 ngày gần nhất)
const dailyData = [
  { name: "01/03", total: 1200 },
  { name: "02/03", total: 1320 },
  { name: "03/03", total: 1150 },
  { name: "04/03", total: 1380 },
  { name: "05/03", total: 1520 },
  { name: "06/03", total: 1350 },
  { name: "07/03", total: 1250 },
  { name: "08/03", total: 1400 },
  { name: "09/03", total: 1580 },
  { name: "10/03", total: 1620 },
  { name: "11/03", total: 1700 },
  { name: "12/03", total: 1800 },
  { name: "13/03", total: 1750 },
  { name: "14/03", total: 1680 },
  { name: "15/03", total: 1720 },
  { name: "16/03", total: 1850 },
  { name: "17/03", total: 1920 },
  { name: "18/03", total: 1870 },
  { name: "19/03", total: 1780 },
  { name: "20/03", total: 1850 },
  { name: "21/03", total: 1950 },
  { name: "22/03", total: 2050 },
  { name: "23/03", total: 2150 },
  { name: "24/03", total: 2080 },
  { name: "25/03", total: 1950 },
  { name: "26/03", total: 2100 },
  { name: "27/03", total: 2200 },
  { name: "28/03", total: 2300 },
  { name: "29/03", total: 2400 },
  { name: "30/03", total: 2500 },
]

// Dữ liệu mẫu theo tháng (12 tháng)
const monthlyData = [
  { name: "T1", total: 28500 },
  { name: "T2", total: 32400 },
  { name: "T3", total: 38700 },
  { name: "T4", total: 42300 },
  { name: "T5", total: 48500 },
  { name: "T6", total: 52100 },
  { name: "T7", total: 54800 },
  { name: "T8", total: 58200 },
  { name: "T9", total: 62800 },
  { name: "T10", total: 68500 },
  { name: "T11", total: 72300 },
  { name: "T12", total: 78500 },
]

// Dữ liệu mẫu theo năm (5 năm gần nhất)
const yearlyData = [
  { name: "2020", total: 425000 },
  { name: "2021", total: 580000 },
  { name: "2022", total: 720000 },
  { name: "2023", total: 890000 },
  { name: "2024", total: 350000 }, // Năm hiện tại chỉ tính đến tháng 3
]

export function Overview() {
  const [timeRange, setTimeRange] = useState("daily")

  // Chọn dữ liệu dựa trên khoảng thời gian
  const getDataByTimeRange = () => {
    switch (timeRange) {
      case "hourly":
        return hourlyData
      case "daily":
        return dailyData
      case "monthly":
        return monthlyData
      case "yearly":
        return yearlyData
      default:
        return dailyData
    }
  }

  // Lấy tiêu đề dựa trên khoảng thời gian
  const getChartTitle = () => {
    switch (timeRange) {
      case "hourly":
        return "Tin nhắn theo giờ"
      case "daily":
        return "Tin nhắn theo ngày"
      case "monthly":
        return "Tin nhắn theo tháng"
      case "yearly":
        return "Tin nhắn theo năm"
      default:
        return "Tin nhắn theo ngày"
    }
  }

  // Lấy mô tả dựa trên khoảng thời gian
  const getChartDescription = () => {
    switch (timeRange) {
      case "hourly":
        return "Số lượng tin nhắn trong 24 giờ qua"
      case "daily":
        return "Số lượng tin nhắn trong 30 ngày qua"
      case "monthly":
        return "Số lượng tin nhắn trong 12 tháng qua"
      case "yearly":
        return "Số lượng tin nhắn trong 5 năm qua"
      default:
        return "Số lượng tin nhắn trong 30 ngày qua"
    }
  }

  // Định dạng tooltip
  const formatTooltip = (value: { toLocaleString: () => any }) => {
    return [`${value.toLocaleString()} tin nhắn`, "Số lượng"]
  }

  return (
      <Card className="col-span-4">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle>{getChartTitle()}</CardTitle>
            <CardDescription>{getChartDescription()}</CardDescription>
          </div>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Chọn khoảng thời gian" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hourly">Theo giờ</SelectItem>
              <SelectItem value="daily">Theo ngày</SelectItem>
              <SelectItem value="monthly">Theo tháng</SelectItem>
              <SelectItem value="yearly">Theo năm</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent className="pl-2">
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={getDataByTimeRange()}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value.toLocaleString()}`}
              />
              <Tooltip formatter={formatTooltip} />
              <Bar dataKey="total" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-primary" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
  )
}

