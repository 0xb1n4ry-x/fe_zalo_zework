"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function PayOSPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Cấu Hình PayOS" text="Quản lý các tham số kết nối với cổng thanh toán PayOS." />
      <Tabs defaultValue="config" className="space-y-4">
        <TabsList>
          <TabsTrigger value="config">Cấu Hình</TabsTrigger>
          <TabsTrigger value="transactions">Giao Dịch</TabsTrigger>
          <TabsTrigger value="logs">Nhật Ký</TabsTrigger>
        </TabsList>

        <TabsContent value="config" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tham Số Kết Nối</CardTitle>
              <CardDescription>Cấu hình các tham số kết nối với cổng thanh toán PayOS.</CardDescription>
            </CardHeader>
            <CardContent>
              <PayOSConfigForm />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transactions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Lịch Sử Giao Dịch</CardTitle>
              <CardDescription>Xem lịch sử các giao dịch thanh toán qua PayOS.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex h-[300px] items-center justify-center rounded-md border border-dashed">
                <p className="text-sm text-muted-foreground">Chưa có dữ liệu giao dịch</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Nhật Ký Hệ Thống</CardTitle>
              <CardDescription>Xem nhật ký kết nối và webhook từ PayOS.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex h-[300px] items-center justify-center rounded-md border border-dashed">
                <p className="text-sm text-muted-foreground">Chưa có dữ liệu nhật ký</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}

function PayOSConfigForm() {
  const [config, setConfig] = useState({
    clientId: "",
    apiKey: "",
    secretKey: "",
    merchantId: "",
    terminalId: "",
    environment: "sandbox",
    webhookUrl: "",
    returnUrl: "",
    cancelUrl: "",
  })

  const [isSaving, setIsSaving] = useState(false)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  const handleChange = (field, value) => {
    setConfig({
      ...config,
      [field]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSaving(true)

    // Giả lập lưu cấu hình
    setTimeout(() => {
      setIsSaving(false)
      setShowSuccessMessage(true)

      setTimeout(() => {
        setShowSuccessMessage(false)
      }, 3000)
    }, 1000)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="clientId">Client ID</Label>
          <Input
            id="clientId"
            value={config.clientId}
            onChange={(e) => handleChange("clientId", e.target.value)}
            placeholder="Nhập Client ID của PayOS"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="apiKey">API Key</Label>
          <Input
            id="apiKey"
            value={config.apiKey}
            onChange={(e) => handleChange("apiKey", e.target.value)}
            placeholder="Nhập API Key của PayOS"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="secretKey">Secret Key</Label>
          <Input
            id="secretKey"
            type="password"
            value={config.secretKey}
            onChange={(e) => handleChange("secretKey", e.target.value)}
            placeholder="Nhập Secret Key của PayOS"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="merchantId">Merchant ID</Label>
          <Input
            id="merchantId"
            value={config.merchantId}
            onChange={(e) => handleChange("merchantId", e.target.value)}
            placeholder="Nhập Merchant ID của PayOS"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="terminalId">Terminal ID</Label>
          <Input
            id="terminalId"
            value={config.terminalId}
            onChange={(e) => handleChange("terminalId", e.target.value)}
            placeholder="Nhập Terminal ID của PayOS"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="environment">Môi Trường</Label>
          <Select value={config.environment} onValueChange={(value) => handleChange("environment", value)}>
            <SelectTrigger id="environment">
              <SelectValue placeholder="Chọn môi trường" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sandbox">Sandbox (Thử nghiệm)</SelectItem>
              <SelectItem value="production">Production (Sản phẩm)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="webhookUrl">Webhook URL</Label>
        <Input
          id="webhookUrl"
          value={config.webhookUrl}
          onChange={(e) => handleChange("webhookUrl", e.target.value)}
          placeholder="https://example.com/api/payos/webhook"
        />
        <p className="text-xs text-muted-foreground">URL nhận thông báo khi có thanh toán mới từ PayOS</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="returnUrl">Return URL</Label>
          <Input
            id="returnUrl"
            value={config.returnUrl}
            onChange={(e) => handleChange("returnUrl", e.target.value)}
            placeholder="https://example.com/payment/success"
          />
          <p className="text-xs text-muted-foreground">URL chuyển hướng khi thanh toán thành công</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="cancelUrl">Cancel URL</Label>
          <Input
            id="cancelUrl"
            value={config.cancelUrl}
            onChange={(e) => handleChange("cancelUrl", e.target.value)}
            placeholder="https://example.com/payment/cancel"
          />
          <p className="text-xs text-muted-foreground">URL chuyển hướng khi hủy thanh toán</p>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4">
        <div>{showSuccessMessage && <p className="text-sm text-green-600">Đã lưu cấu hình thành công!</p>}</div>
        <div className="flex gap-2">
          <Button type="button" variant="outline">
            Kiểm Tra Kết Nối
          </Button>
          <Button type="submit" disabled={isSaving}>
            {isSaving ? "Đang Lưu..." : "Lưu Cấu Hình"}
          </Button>
        </div>
      </div>
    </form>
  )
}

