"use client"

import {JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useEffect, useState} from "react"
import {Button} from "@/components/ui/button"
import {QRCodeLogin} from "@/app/mainchat/QRCodeLogin"
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table"
import {DashboardShell} from "@/components/dashboard/dashboard-shell"
import {DashboardHeader} from "@/components/dashboard/dashboard-header"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {Switch} from "@/components/ui/switch"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import {Badge} from "@/components/ui/badge"
import {
  AlertCircle,
  Check,
  Copy,
  ExternalLink,

  Link2OffIcon as LinkOff,
  MoreHorizontal,
  Plus,
  RefreshCw,
  Search,
  Settings,
  Trash2,
} from "lucide-react"
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface acc {
  id: string,
  name: string,
  email: string,
  zaloId: string,
  department: string,// Default department since API doesn't provide it
  status?: string,
  linkedDate: string,
  lastActive: string,
  avatar: string,
  // Additional data from API
  isAuthenticated: boolean,
  isDefault: boolean,
  userId: string;
  username: string;
  platform: string;
  token: string;

}

export default function ZaloAccountsPage() {
  // State for real Zalo accounts data
  const [accounts, setAccounts] = useState<acc[]>([]) // ban đầu là mảng rỗng

  const [searchQuery, setSearchQuery] = useState("")
  const [showConnectGuide, setShowConnectGuide] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  // State to track current user ID - in a real app, this would come from your auth system
  const [currentUserId] = useState("")

  // Fetch Zalo accounts data when component mounts
  useEffect(() => {
    const fetchZaloAccounts = async () => {
      try {
        setIsLoading(true)

        {
          try {
            const user = JSON.parse(localStorage.getItem("user") as string)
            const userId = user.userId

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/get-account-zalo`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({userId}),
            });

            const data = await response.json();
            console.log(data)
            const transformedData = data.map((account: {
              _id: never;
              display_name: never;
              phone_number: never;
              zaloAccountId: never;
              is_active: never;
              createdAt: string | number | Date;
              lastActiveAt: never;
              avatar: never;
              isAuthenticated: never;
              isDefault: never
            }) => ({
              id: account._id,
              name: account.display_name,
              email: account.phone_number || "N/A",
              zaloId: account.zaloAccountId,
              department: "Chưa phân công", // Default department since API doesn't provide it
              status: account.is_active ? "Hoạt động" : "Tạm dừng",
              linkedDate: new Date(account.createdAt).toLocaleDateString('vi-VN'),
              lastActive: formatLastActive(account.lastActiveAt),
              avatar: account.avatar || "/placeholder.svg?height=32&width=32",
              // Additional data from API
              isAuthenticated: account.isAuthenticated,
              isDefault: account.isDefault
            }))

            setAccounts(transformedData)
            return data.accounts || [];
          } catch (error) {
            console.error('Error fetching Zalo accounts data from backend:', error);
            return []; // Return empty array on error
          }
        }

        // Transform API data to match our UI component needs

      } catch (error) {
        console.error("Failed to fetch Zalo accounts:", error)
        // Fallback to sample data if API fails

      } finally {
        setIsLoading(false)
      }
    }

    fetchZaloAccounts()
  }, [])

  // Format the lastActiveAt timestamp into a user-friendly string
  const formatLastActive = (timestamp: string | number | Date) => {
    if (!timestamp) return "Chưa hoạt động"

    const lastActive = new Date(timestamp)
    const now = new Date()

    const diffMs = now.getTime() - new Date(lastActive).getTime()
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

    if (diffDays === 0) {
      return `Hôm nay, ${lastActive.getHours().toString().padStart(2, '0')}:${lastActive.getMinutes().toString().padStart(2, '0')}`
    } else if (diffDays === 1) {
      return `Hôm qua, ${lastActive.getHours().toString().padStart(2, '0')}:${lastActive.getMinutes().toString().padStart(2, '0')}`
    } else {
      return lastActive.toLocaleDateString('vi-VN')
    }
  }


  const filteredAccounts = (accounts || []).filter(
      (account) =>
          account.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          account.zaloId.toLowerCase().includes(searchQuery.toLowerCase()) ||
          account.department.toLowerCase().includes(searchQuery.toLowerCase())
  )
  // const refreshQR = () => {
  //   setIsSubmitting(true)refreshQR
  //   // Simulate QR code refresh delay
  //   setTimeout(() => {
  //     setQrCode(`qr-code-${Math.random().toString(36).substring(2, 8)}`)
  //     setIsSubmitting(false)
  //   }, 800)
  // }

  const handleAddAccount = (newAccount: any) => {


    setAccounts([...accounts, {
      ...newAccount,
      id: Date.now().toString(),
      userId: currentUserId,

      isDefault: accounts.length === 0 // Make it default if it's the first account
    }])
  }

  const handleDeleteAccount = (id: string) => {
    // If we're deleting the default account, make another one default

    const accountToDelete = accounts.find(account => account.id === id)

    const remainingAccounts = accounts.filter(account => account.id !== id)

    if (accountToDelete && accountToDelete.isDefault && remainingAccounts.length > 0) {
      // Set the first remaining account as default
      remainingAccounts[0] = {...remainingAccounts[0], isDefault: true}
    }

    setAccounts(remainingAccounts)
  }

  const handleToggleStatus = (id: string) => {

    setAccounts(
        accounts.map((account) =>
            account.id === id
                ? {
                  ...account,
                  status: account.status === "Hoạt động" ? "Tạm dừng" : "Hoạt động",
                }
                : account
        )
    )

  }

  const handleSetDefaultAccount = (id: string) => {
    setAccounts(

        accounts.map((account) => ({
          ...account,
          isDefault: account.id === id
        }))
    )
  }

  return (
      <DashboardShell>
        <DashboardHeader heading="Tài Khoản Zalo" text="Quản lý và liên kết tài khoản Zalo với hệ thống."/>
        <Tabs defaultValue="accounts" className="space-y-4">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="accounts">Tài Khoản</TabsTrigger>
              <TabsTrigger value="settings">Cài Đặt</TabsTrigger>
              <TabsTrigger value="logs">Nhật Ký</TabsTrigger>
            </TabsList>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <Search className="h-4 w-4 text-muted-foreground"/>
                <Input
                    placeholder="Tìm kiếm tài khoản..."
                    className="h-9 w-[200px] lg:w-[250px]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <AddAccountDialog onAddAccount={handleAddAccount}/>
            </div>
          </div>

          <TabsContent value="accounts" className="space-y-4">
            {showConnectGuide && (
                <Alert className="mb-4">
                  <AlertCircle className="h-4 w-4"/>
                  <AlertTitle>Hướng dẫn liên kết tài khoản Zalo</AlertTitle>
                  <AlertDescription>
                    Để liên kết tài khoản Zalo, nhân viên cần quét mã QR hoặc nhập mã xác thực được cung cấp. Sau khi
                    liên
                    kết, họ có thể sử dụng tài khoản Zalo để đăng nhập và tương tác với khách hàng thông qua hệ thống.
                    <Button variant="link" className="p-0 h-auto font-normal"
                            onClick={() => setShowConnectGuide(false)}>
                      Ẩn hướng dẫn
                    </Button>
                  </AlertDescription>
                </Alert>
            )}

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nhân Viên</TableHead>
                    <TableHead>Zalo ID</TableHead>
                    <TableHead>Phòng Ban</TableHead>
                    <TableHead>Trạng Thái</TableHead>
                    <TableHead>Ngày Liên Kết</TableHead>
                    <TableHead>Hoạt Động Gần Đây</TableHead>
                    <TableHead className="text-right">Thao Tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                      <TableRow>
                        <TableCell colSpan={7} className="h-24 text-center">
                          Đang tải dữ liệu...
                        </TableCell>
                      </TableRow>
                  ) : filteredAccounts.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="h-24 text-center">
                          Không tìm thấy tài khoản nào.
                          {!showConnectGuide && (
                              <Button variant="link" className="ml-2" onClick={() => setShowConnectGuide(true)}>
                                Xem hướng dẫn liên kết
                              </Button>
                          )}
                        </TableCell>
                      </TableRow>
                  ) : (
                      filteredAccounts.map((account) => (
                          <TableRow key={account.id}>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <Avatar className="h-8 w-8">

                                  <AvatarImage src={account.avatar} />

                                  <AvatarFallback>{account.name}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-medium">
                                    {account.name}
                                    {account.isDefault && (
                                        <Badge variant="outline" className="ml-2 text-xs">Mặc định</Badge>
                                    )}
                                  </p>
                                  <p className="text-xs text-muted-foreground">{account.email}</p>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <span>{account.zaloId.substring(0, 15)}...</span>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6"
                                    onClick={() => navigator.clipboard.writeText(account.zaloId)}
                                >
                                  <Copy className="h-3.5 w-3.5" />
                                  <span className="sr-only">Sao chép Zalo ID</span>
                                </Button>
                              </div>
                            </TableCell>
                            <TableCell>{account.department}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Badge variant={account.status === "Hoạt động" ? "success" : "secondary"}>
                                  {account.status}
                                </Badge>
                                <Switch
                                    checked={account.status === "Hoạt động"}
                                    onCheckedChange={() => handleToggleStatus(account.id)}
                                    aria-label="Chuyển trạng thái"
                                />
                              </div>
                            </TableCell>
                            <TableCell>{account.linkedDate}</TableCell>
                            <TableCell>{account.lastActive}</TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" className="h-8 w-8 p-0">
                                    <span className="sr-only">Mở menu</span>
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Thao tác</DropdownMenuLabel>
                                  {!account.isDefault && (
                                      <DropdownMenuItem onClick={() => handleSetDefaultAccount(account.id)}>
                                        <Check className="mr-2 h-4 w-4" /> Đặt làm mặc định
                                      </DropdownMenuItem>
                                  )}
                                  <DropdownMenuItem>
                                    <Settings className="mr-2 h-4 w-4" /> Cài đặt tài khoản
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <RefreshCw className="mr-2 h-4 w-4" /> Làm mới token
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <ExternalLink className="mr-2 h-4 w-4" /> Xem hồ sơ Zalo
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem onClick={() => handleToggleStatus(account.id)}>
                                    {account.status === "Hoạt động" ? (
                                        <>
                                          <LinkOff className="mr-2 h-4 w-4" /> Tạm dừng liên kết
                                        </>
                                    ) : (
                                        <>
                                          <Check className="mr-2 h-4 w-4" /> Kích hoạt liên kết
                                        </>
                                    )}
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                      onClick={() => handleDeleteAccount(account.id)}
                                      className="text-red-600 focus:text-red-600"

                                      disabled={accounts.length === 1} // Prevent deleting the last account
                                  >
                                    <Trash2 className="mr-2 h-4 w-4" /> Xóa liên kết
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                      ))
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Cài Đặt Liên Kết Zalo</CardTitle>
                <CardDescription>Quản lý cài đặt liên kết tài khoản Zalo với hệ thống.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Cài Đặt Chung</h3>
                  <div className="flex items-center justify-between space-y-1">
                    <div>
                      <Label>Tự động liên kết tài khoản</Label>
                      <p className="text-sm text-muted-foreground">
                        Tự động liên kết tài khoản Zalo khi nhân viên đăng ký mới.
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between space-y-1">
                    <div>
                      <Label>Yêu cầu xác thực hai yếu tố</Label>
                      <p className="text-sm text-muted-foreground">
                        Yêu cầu xác thực hai yếu tố khi liên kết tài khoản Zalo.
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between space-y-1">
                    <div>
                      <Label>Cho phép đăng nhập bằng Zalo</Label>
                      <p className="text-sm text-muted-foreground">
                        Cho phép nhân viên đăng nhập vào hệ thống bằng tài khoản Zalo.
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Quyền Truy Cập</h3>
                  <div className="flex items-center justify-between space-y-1">
                    <div>
                      <Label>Truy cập tin nhắn</Label>
                      <p className="text-sm text-muted-foreground">
                        Cho phép ứng dụng truy cập tin nhắn Zalo của nhân viên.
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between space-y-1">
                    <div>
                      <Label>Truy cập danh bạ</Label>
                      <p className="text-sm text-muted-foreground">
                        Cho phép ứng dụng truy cập danh bạ Zalo của nhân viên.
                      </p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between space-y-1">
                    <div>
                      <Label>Gửi thông báo</Label>
                      <p className="text-sm text-muted-foreground">
                        Cho phép ứng dụng gửi thông báo qua Zalo đến nhân viên.
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Thời Gian Hiệu Lực</h3>
                  <div className="flex items-center justify-between space-y-1">
                    <div>
                      <Label>Thời gian hiệu lực token</Label>
                      <p className="text-sm text-muted-foreground">Thời gian hiệu lực của token liên kết Zalo.</p>
                    </div>
                    <select
                        defaultValue="90"
                        className="flex h-10 w-[180px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="30">30 ngày</option>
                      <option value="60">60 ngày</option>
                      <option value="90">90 ngày</option>
                      <option value="180">180 ngày</option>
                      <option value="365">365 ngày</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-between space-y-1">
                    <div>
                      <Label>Tự động làm mới token</Label>
                      <p className="text-sm text-muted-foreground">Tự động làm mới token khi hết hạn.</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button>Lưu Cài Đặt</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="logs" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Nhật Ký Hoạt Động</CardTitle>
                <CardDescription>Lịch sử hoạt động liên kết tài khoản Zalo.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nhân Viên</TableHead>
                      <TableHead>Hoạt Động</TableHead>
                      <TableHead>Thời Gian</TableHead>
                      <TableHead>Địa Chỉ IP</TableHead>
                      <TableHead>Trạng Thái</TableHead>
                    </TableRow>
                  </TableHeader>
                  {/*<TableBody>*/}
                  {/*  {activityLogs.map((log) => (*/}
                  {/*      <TableRow key={log.id}>*/}
                  {/*        <TableCell>*/}
                  {/*          <div className="flex items-center gap-2">*/}
                  {/*            <Avatar className="h-7 w-7">*/}
                  {/*              <AvatarImage src={log.avatar} alt={log.employee} />*/}
                  {/*              <AvatarFallback>{log.employee.charAt(0)}</AvatarFallback>*/}
                  {/*            </Avatar>*/}
                  {/*            <span className="font-medium">{log.employee}</span>*/}
                  {/*          </div>*/}
                  {/*        </TableCell>*/}
                  {/*        <TableCell>*/}
                  {/*          <Badge*/}
                  {/*              variant={*/}
                  {/*                log.activity === "Liên kết tài khoản"*/}
                  {/*                    ? "default"*/}
                  {/*                    : log.activity === "Hủy liên kết"*/}
                  {/*                        ? "destructive"*/}
                  {/*                        : log.activity === "Làm mới token"*/}
                  {/*                            ? "outline"*/}
                  {/*                            : "secondary"*/}
                  {/*              }*/}
                  {/*          >*/}
                  {/*            {log.activity}*/}
                  {/*          </Badge>*/}
                  {/*        </TableCell>*/}
                  {/*        <TableCell>*/}
                  {/*          <div className="flex flex-col">*/}
                  {/*            <span>{log.date}</span>*/}
                  {/*            <span className="text-xs text-muted-foreground">{log.time}</span>*/}
                  {/*          </div>*/}
                  {/*        </TableCell>*/}
                  {/*        <TableCell>{log.ipAddress}</TableCell>*/}
                  {/*        <TableCell>*/}
                  {/*          <Badge variant={log.status === "Thành công" ? "success" : "destructive"}>{log.status}</Badge>*/}
                  {/*        </TableCell>*/}
                  {/*      </TableRow>*/}
                  {/*  ))}*/}
                  {/*</TableBody>*/}
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DashboardShell>
  )
}
// @ts-ignore
function AddAccountDialog({ onAddAccount }) {
  const [open, setOpen] = useState(false)

  const [key] = useState(0);
  const [newAccount, setNewAccount] = useState({
    name: "",
    email: "",
    zaloId: "",
    department: "Hỗ Trợ Khách Hàng",
    status: "Hoạt động",
    linkedDate: new Date().toLocaleDateString('vi-VN'),
    lastActive: "Chưa hoạt động",
    avatar: "/placeholder.svg?height=32&width=32",
  })
  const [linkMethod, setLinkMethod] = useState("qr")

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    onAddAccount(newAccount)
    setNewAccount({
      name: "",
      email: "",
      zaloId: "",
      department: "Hỗ Trợ Khách Hàng",
      status: "Hoạt động",
      linkedDate: new Date().toLocaleDateString('vi-VN'),
      lastActive: "Chưa hoạt động",
      avatar: "/placeholder.svg?height=32&width=32",
    })
    setOpen(false)
  }

  return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Liên Kết Tài Khoản
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Liên Kết Tài Khoản Zalo</DialogTitle>
            <DialogDescription>
              Bạn có thể liên kết nhiều tài khoản Zalo với cùng một người dùng.
              Tài khoản đầu tiên sẽ được đặt làm mặc định.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="department">Phòng Ban</Label>
                <select
                    id="department"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={newAccount.department}
                    onChange={(e) => setNewAccount({ ...newAccount, department: e.target.value })}
                >
                  <option value="Hỗ Trợ Khách Hàng">Hỗ Trợ Khách Hàng</option>
                  <option value="Kinh Doanh">Kinh Doanh</option>
                  <option value="Hỗ Trợ Kỹ Thuật">Hỗ Trợ Kỹ Thuật</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Nhân Sự">Nhân Sự</option>
                </select>
              </div>
              <div className="grid gap-2">
                <Label>Phương Thức Liên Kết</Label>
                <div className="flex gap-4">
                  <div className="flex items-center space-x-2">
                    <input
                        type="radio"
                        id="qr"
                        name="linkMethod"
                        value="qr"
                        checked={linkMethod === "qr"}
                        onChange={() => setLinkMethod("qr")}
                        className="h-4 w-4 rounded-full border-gray-300 text-primary focus:ring-primary"
                    />  <span> Mã QR</span>
                  </div>
                </div>
              </div>
              {linkMethod === "qr" ? (
                  <div className="flex flex-col items-center justify-center p-4 border rounded-md">
                    <div className="bg-muted w-64 h-138 flex items-center justify-center mb-2">
                      <QRCodeLogin key={key} onSuccessClose={undefined} />
                    </div>
                    <br/>
                    <p className="text-sm text-muted-foreground">
                      Quét mã QR này bằng ứng dụng Zalo để liên kết tài khoản.
                    </p>
                  </div>
              ) : (
                  <div className="flex flex-col items-center justify-center p-4 border rounded-md">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="text-2xl font-bold tracking-wider">
                        <span className="px-2 py-1 bg-muted rounded mx-0.5">1</span>
                        <span className="px-2 py-1 bg-muted rounded mx-0.5">2</span>
                        <span className="px-2 py-1 bg-muted rounded mx-0.5">3</span>
                        <span className="px-2 py-1 bg-muted rounded mx-0.5">4</span>
                        <span className="px-2 py-1 bg-muted rounded mx-0.5">5</span>
                        <span className="px-2 py-1 bg-muted rounded mx-0.5">6</span>
                      </div>
                      <Button variant="outline" size="sm">
                        <RefreshCw className="h-3.5 w-3.5 mr-1" /> Làm mới
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Yêu cầu nhân viên nhập mã xác thực này vào ứng dụng Zalo để liên kết tài khoản.
                    </p>
                  </div>
              )}
            </div>
          </form>
        </DialogContent>
      </Dialog>
  )
}