"use client"

import React, {useEffect} from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"
import { cn } from "@/lib/utils"
import {
  BarChart3,
  CreditCard,
  Image,
  LayoutDashboard,
  MessageSquare,
  QrCode,
  Settings,
  Tag,
  Users,
  XCircle,
  CreditCardIcon,
  LinkIcon,
  MessageCircle,
  LogOut,
  X,
  Building,
  ChevronDown,
  HelpCircle,
  Search,
} from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import Cookies from "js-cookie"
import { toast } from "@/hooks/use-toast"
import { clearAuthData } from "@/utils/authUtils"

interface DashboardNavProps {
  collapsed?: boolean
  onNavClick?: () => void
}

export function DashboardNav({ collapsed = false, onNavClick }: DashboardNavProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [openCollapsible, setOpenCollapsible] = useState(false)
  const [userEmail, setUserEmail] = useState<string>("")
  const [userName, setUserName] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(true)
  const [accounts, setAccounts] = useState([])

  // Kiểm tra xác thực và chuyển hướng nếu chưa đăng nhập
  useEffect(() => {
    const checkAuthentication = () => {
      // Các nguồn có thể chứa token/session
      const authToken = localStorage.getItem("authToken") ||
          sessionStorage.getItem("authToken") ||
          Cookies.get("authToken")
      console.log("authTOken",authToken)
      const sessionId = localStorage.getItem("sessionId") ||
          Cookies.get("sessionId")
      console.log("sessionId",sessionId)

      const userString = localStorage.getItem("user")
      console.log("userString",userString)
      const userInfoString = localStorage.getItem("userInfo")
      console.log("userInfo",userInfoString)
      const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"

      // Kiểm tra nhanh nếu không có bất kỳ dấu hiệu xác thực nào
      if (!authToken && !sessionId && !userString && !userInfoString && !isLoggedIn) {
        console.log("Không tìm thấy thông tin xác thực, chuyển hướng đến trang đăng nhập...")
        setIsAuthenticated(false)
        router.push("/login")
        return false
      }

      // Xử lý dữ liệu người dùng
      let userData = null

      // Thử lấy từ "user" trong localStorage
      if (userString) {
        try {
          userData = JSON.parse(userString)
          if (userData && userData.email) {
            setUserEmail(userData.email)
            setUserName(userData.name || "")
            return true
          }
        } catch (e) {
          console.error("Lỗi parse user từ localStorage:", e)
        }
      }

      // Thử lấy từ "userInfo" trong localStorage
      if (userInfoString) {
        try {
          userData = JSON.parse(userInfoString)
          if (userData && userData.email) {
            setUserEmail(userData.email)
            setUserName(userData.name || "")
            return true
          }
        } catch (e) {
          console.error("Lỗi parse userInfo từ localStorage:", e)
        }
      }

      // Nếu vẫn có token nhưng không có thông tin người dùng, vẫn coi là đã xác thực
      // nhưng thông tin hiển thị sẽ là mặc định
      if (authToken || sessionId || isLoggedIn) {
        setUserEmail("user@example.com")
        setUserName("Người dùng")
        return true
      }

      // Nếu không tìm thấy thông tin xác thực hợp lệ
      setIsAuthenticated(false)
      router.push("/login")
      return false
    }

    checkAuthentication()
  }, [router])

  // Xử lý đăng xuất
  const handleLogout = async () => {
    setIsLoading(true)

    try {
      // Lấy thông tin token và sessionId từ localStorage hoặc cookies
      const token = localStorage.getItem("authToken") || Cookies.get("authToken")
      const sessionId = Cookies.get("sessionId")
      console.log("Đăng xuất với:", { token, sessionId })

      // Gọi API đăng xuất để vô hiệu hóa session từ server
       await fetch(`${process.env.API_URL || ''}api/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          token,
          sessionId
        }),
      })

      // Vẫn tiếp tục xóa cache ngay cả khi API trả về lỗi
      // để đảm bảo người dùng luôn có thể đăng xuất

      // Xóa tất cả dữ liệu người dùng khỏi localStorage và cookies
      clearAuthData()
      clearLocalStorage()
      clearAuthCookies()


      // Thông báo thành công
      toast({
        title: "Đăng xuất thành công",
        description: "Bạn đã đăng xuất khỏi tài khoản",
      })

      // Chuyển hướng về trang đăng nhập
      setTimeout(() => {
        router.push("/login")
        router.refresh()
      }, 500)
    } catch (error) {
      console.error("Lỗi đăng xuất:", error)

      // Ngay cả khi có lỗi, vẫn xóa dữ liệu cục bộ
      clearAuthData()
      clearLocalStorage()
      clearAuthCookies()

      toast({
        variant: "destructive",
        title: "Đã xảy ra lỗi",
        description: "Đã có lỗi khi đăng xuất, vui lòng thử lại",
      })

      // Vẫn chuyển hướng về trang đăng nhập
      setTimeout(() => {
        router.push("/login")
        router.refresh()
      }, 500)
    } finally {
      setIsLoading(false)
    }

  }

  // Hàm xóa tất cả dữ liệu trong localStorage
  const clearLocalStorage = () => {
    console.log("Xóa tất cả dữ liệu trong localStorage")

    // Xóa các key cụ thể liên quan đến xác thực
    const keysToRemove = [
      "user",
      "userInfo",
      "userEmail",
      "authToken",
      "userData",
      "userProfile",
      "sessionId",
      "isLoggedIn",
      "loginTime",
      "sessionData",
        "dataZalo"
    ]

    // Xóa từng key
    keysToRemove.forEach(key => {
      localStorage.removeItem(key)
      sessionStorage.removeItem(key)
    })
  }

  // Hàm xóa tất cả cookies liên quan đến xác thực
  const clearAuthCookies = () => {
    console.log("Xóa tất cả cookies liên quan đến xác thực")

    // Xóa các cookies cụ thể
    const cookiesToRemove = [
      "authToken",
      "sessionId",
      "refreshToken",
      "user_session"
    ]

    // Xóa từng cookie
    cookiesToRemove.forEach(cookie => {
      Cookies.remove(cookie)
    })

  }

  // Nếu không xác thực, không hiển thị nav
  if (!isAuthenticated) {
    return null
  }


  const fetchZaloAccounts = async () => {
    try {
      setIsDialogOpen(true)

      {
        try {
          const user = JSON.parse(localStorage.getItem("user") as string)
          const userId =  user.userId
          console.log(userId)

          const response = await fetch(`${process.env.API_URL}api/get-account-zalo`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId }),
          });

          const data = await response.json();
          console.log(data)
          const transformedData = data.map((account: { _id: never; display_name: never; phone_number: never; zaloAccountId: never; is_active: never; createdAt: string | number | Date; lastActiveAt: never; avatar: never; isAuthenticated: never; isDefault: never; zpw_sek: never; zpw_enk: never; imei: never }) => ({
            id: account._id,
            name: account.display_name,
            email: account.phone_number || "N/A",
            zaloId: account.zaloAccountId,
            department: "Chưa phân công", // Default department since API doesn't provide it
            status: account.is_active ? "Hoạt động" : "Tạm dừng",
            linkedDate: new Date(account.createdAt).toLocaleDateString('vi-VN'),
            lastActive: (account.lastActiveAt),
            avatar: account.avatar || "/placeholder.svg?height=32&width=32",
            // Additional data from API
            isAuthenticated: account.isAuthenticated,
            isDefault: account.isDefault,
            zpw_sek: account.zpw_sek,
            zpw_enk: account.zpw_enk,
            imei: account.imei,
          }))

          setAccounts(transformedData)
          return data.accounts || [];
        }
        catch (error) {
          console.error('Error fetching Zalo accounts data from backend:', error);
          return []; // Return empty array on error
        }
      }

      // Transform API data to match our UI component needs

    } catch (error) {
      console.error("Failed to fetch Zalo accounts:", error)
      // Fallback to sample data if API fails

    }
  }


  // const handleSelectAccount = (accountId: number) => {
  const handleSelectAccount = () => {
    setIsDialogOpen(false)
    localStorage.setItem("dataZalo", JSON.stringify(accounts));
    console.log("datazalo",JSON.parse(localStorage.getItem("dataZalo") as string))
    router.push(`/message`)
    if (onNavClick) onNavClick()
  }

  const handleNavClick = () => {
    if (onNavClick) onNavClick()
  }

  const NavItem = ({
                     href,
                     icon: Icon,
                     label,
                     active,
                   }: { href: string; icon: React.ElementType; label: string; active: boolean }) => {
    if (collapsed) {
      return (
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                    href={href}
                    className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-md transition-colors",
                        active
                            ? "bg-primary text-primary-foreground"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground",
                    )}
                    onClick={handleNavClick}
                >
                  <Icon className="h-5 w-5" />
                  <span className="sr-only">{label}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">{label}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
      )
    }

    return (
        <Link
            href={href}
            className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 transition-colors",
                active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
            onClick={handleNavClick}
        >
          <Icon className="h-5 w-5" />
          <span>{label}</span>
        </Link>
    )
  }

  const NavSection = ({ title, children }: { title: string; children: React.ReactNode }) => {
    return (
        <div className="mb-4">
          {!collapsed && <div className="mb-2 px-3 text-xs font-medium text-muted-foreground">{title}</div>}
          <div className="space-y-1 px-2">{children}</div>
        </div>
    )
  }



  // @ts-ignore
  return (
      <div className="flex h-full flex-col">
        <div className="flex h-14 items-center border-b px-4">
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary">
              <BarChart3 className="h-4 w-4 text-primary-foreground" />
            </div>
            {!collapsed && <span className="font-bold">Quản Trị Viên</span>}
          </Link>
          <Button variant="ghost" size="icon" className="ml-auto lg:hidden" onClick={onNavClick}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex-1 overflow-auto py-2">
          {!collapsed && (
              <div className="px-3 py-2">
                <div className="relative">
                  <Input placeholder="Tìm kiếm..." className="pl-8 h-9" />
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                </div>
              </div>
          )}

          <nav className="grid items-start px-2 text-sm font-medium">
            <NavItem
                href="/dashboard"
                icon={LayoutDashboard}
                label="Bảng Điều Khiển"
                active={pathname === "/dashboard"}
            />
            <br/>
            <NavSection title="Quản Lý Công Ty">
              <NavItem
                  href="/dashboard/company"
                  icon={Building}
                  label="Thông Tin Công Ty"
                  active={pathname === "/dashboard/company"}
              />
              <NavItem
                  href="/dashboard/employees"
                  icon={Users}
                  label="Nhân Viên"
                  active={pathname === "/dashboard/employees"}
              />
              <NavItem
                  href="/dashboard/billing"
                  icon={CreditCard}
                  label="Thanh Toán"
                  active={pathname === "/dashboard/billing"}
              />
              <NavItem
                  href="/dashboard/payos"
                  icon={CreditCardIcon}
                  label="PayOS"
                  active={pathname === "/dashboard/payos"}
              />
            </NavSection>

            <NavSection title="Tiếp Thị & Truyền Thông">
              <NavItem
                  href="/dashboard/qr-codes"
                  icon={QrCode}
                  label="Mã QR"
                  active={pathname === "/dashboard/qr-codes"}
              />
              <NavItem
                  href="/dashboard/banned-keywords"
                  icon={XCircle}
                  label="Từ Khóa Cấm"
                  active={pathname === "/dashboard/banned-keywords"}
              />
              <NavItem href="/dashboard/tags" icon={Tag} label="Thẻ Gắn" active={pathname === "/dashboard/tags"} />
              <NavItem
                  href="/dashboard/templates"
                  icon={MessageSquare}
                  label="Mẫu Tin Nhắn"
                  active={pathname === "/dashboard/templates"}
              />
              <NavItem
                  href="/dashboard/image-library"
                  icon={Image}
                  label="Thư Viện Ảnh"
                  active={pathname === "/dashboard/image-library"}
              />
            </NavSection>

            <NavSection title="Zalo & Tin Nhắn">
              <NavItem
                  href="/dashboard/zalo-accounts"
                  icon={LinkIcon}
                  label="Tài Khoản Zalo"
                  active={pathname === "/dashboard/zalo-accounts"}
              />

              {collapsed ? (
                  <TooltipProvider delayDuration={0}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                            className="flex h-10 w-10 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground relative"
                            onClick={() => fetchZaloAccounts()}
                        >
                          <MessageCircle className="h-5 w-5" />
                          <div className="absolute top-2 right-2 h-2 w-2 rounded-full bg-primary"></div>
                          <span className="sr-only">Tin Nhắn</span>
                        </button>
                      </TooltipTrigger>
                      <TooltipContent side="right">Tin Nhắn</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
              ) : (
                  <button
                      className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground text-left relative"
                      onClick={()=>fetchZaloAccounts()}
                  >
                    <MessageCircle className="h-5 w-5" />
                    <span>Tin Nhắn</span>
                    <div className="ml-auto h-2 w-2 rounded-full bg-primary"></div>
                  </button>
              )}
            </NavSection>

            <NavSection title="Hệ Thống">
              <NavItem
                  href="/dashboard/settings"
                  icon={Settings}
                  label="Cài Đặt"
                  active={pathname === "/dashboard/settings"}
              />

              {collapsed ? (
                  <TooltipProvider delayDuration={0}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                            className="flex h-10 w-10 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
                            onClick={() => setOpenCollapsible(!openCollapsible)}
                        >
                          <HelpCircle className="h-5 w-5" />
                          <span className="sr-only">Trợ Giúp</span>
                        </button>
                      </TooltipTrigger>
                      <TooltipContent side="right">Trợ Giúp</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
              ) : (
                  <Collapsible open={openCollapsible} onOpenChange={setOpenCollapsible}>
                    <CollapsibleTrigger className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground">
                      <HelpCircle className="h-5 w-5" />
                      <span>Trợ Giúp</span>
                      <ChevronDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="ml-7 border-l pl-4 pt-1">
                        <Link
                            href="#"
                            className="flex items-center gap-2 rounded-lg py-1.5 text-sm text-muted-foreground hover:text-foreground"
                            onClick={handleNavClick}
                        >
                          <span>Hướng dẫn sử dụng</span>
                        </Link>
                        <Link
                            href="#"
                            className="flex items-center gap-2 rounded-lg py-1.5 text-sm text-muted-foreground hover:text-foreground"
                            onClick={handleNavClick}
                        >
                          <span>Câu hỏi thường gặp</span>
                        </Link>
                        <Link
                            href="/feedback"
                            className="flex items-center gap-2 rounded-lg py-1.5 text-sm text-muted-foreground hover:text-foreground"
                            onClick={handleNavClick}
                        >
                          <span>Liên hệ hỗ trợ</span>
                        </Link>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
              )}
            </NavSection>
          </nav>
        </div>

        <div className="mt-auto p-4">
          <Separator className="my-2" />
          <div className="flex items-center gap-3 rounded-lg p-3 hover:bg-muted transition-colors">
            <Avatar className="h-9 w-9">
              <AvatarImage src="/placeholder.svg?height=36&width=36" alt="Avatar" />
              <AvatarFallback>{userName ? userName.charAt(0).toUpperCase() : 'U'}</AvatarFallback>
            </Avatar>
            {!collapsed && (
                <div className="flex-1 overflow-hidden">
                  <p className="text-sm font-medium leading-none truncate">{userName || "Người dùng"}</p>
                  <p className="text-xs text-muted-foreground truncate">{userEmail || "user@example.com"}</p>
                </div>
            )}

            {/* Nút đăng xuất */}
            <Button
                variant="ghost"
                size="icon"
                onClick={handleLogout}
                disabled={isLoading}
                className="h-8 w-8 text-muted-foreground hover:text-foreground"
            >
              {isLoading ? (
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-t-transparent"></span>
              ) : (
                  <LogOut className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Chọn Tài Khoản Zalo</DialogTitle>
              <DialogDescription>Chọn tài khoản Zalo để xem và quản lý tin nhắn.</DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <div className="mb-4">
                <Input
                    placeholder="Tìm kiếm tài khoản..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full"
                />
              </div>
              <div className="max-h-[400px] overflow-y-auto space-y-2">
                {accounts.length === 0 ? (
                    <div className="text-center py-4 text-muted-foreground">Không tìm thấy tài khoản nào.</div>
                ) : (
                    accounts.map((account: { id: React.Key | null | undefined; // @ts-ignore
                      status?: string ;
                      avatar?: string | undefined;

                      name?: string;
                      unreadCount? : number | undefined;
                      department?: string | undefined ;
                      lastActive?: string  }) => (
                        <div
                            key={account.id}
                            className={cn(
                                "flex items-center justify-between p-3 rounded-lg border cursor-pointer hover:bg-muted transition-colors",
                                account.status === "Tạm dừng" && "opacity-60",
                            )}
                            onClick={() => account.status === "Hoạt động" && handleSelectAccount()}
                        >
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">

                              <AvatarImage src={account.avatar}  />

                              <AvatarFallback>{account.name}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium flex items-center gap-2">
                                {account.name}
                                {/*{account.unreadCount > 0 && (*/}
                                {/*    <Badge variant="default" className="rounded-full px-2 py-0.5 text-xs">*/}
                                {/*      {account.unreadCount}*/}
                                {/*    </Badge>*/}
                                {/*)}*/}
                              </div>

                              <div className="text-xs text-muted-foreground">
                                // @ts-ignore
                                {account.department}
                              </div>
                              <div className="text-xs text-muted-foreground">Hoạt động: {account.lastActive}</div>
                            </div>
                          </div>
                          <div>

                            <Badge variant={account.status === "Hoạt động" ? "success" : "secondary"}>{account.status}</Badge>
                          </div>
                        </div>
                    ))
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
  )
}