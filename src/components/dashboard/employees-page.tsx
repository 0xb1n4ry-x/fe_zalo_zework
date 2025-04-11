"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Edit, MoreHorizontal, Search, Trash2, UserPlus, KeyRound } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

// Thêm biến MAX_EMPLOYEES ở đầu file, sau các import và trước các biến khác
const MAX_EMPLOYEES = 20 // Số lượng nhân viên tối đa có thể thêm vào hệ thống

// Thêm danh sách các quyền hệ thống
const permissions = [
  { id: "view_dashboard", name: "Xem bảng điều khiển", description: "Cho phép xem trang bảng điều khiển" },
  { id: "manage_messages", name: "Quản lý tin nhắn", description: "Cho phép xem và trả lời tin nhắn" },
  { id: "manage_customers", name: "Quản lý khách hàng", description: "Cho phép xem và chỉnh sửa thông tin khách hàng" },
  { id: "manage_templates", name: "Quản lý mẫu tin nhắn", description: "Cho phép tạo và chỉnh sửa mẫu tin nhắn" },
  { id: "manage_employees", name: "Quản lý nhân viên", description: "Cho phép thêm, sửa, xóa nhân viên" },
  { id: "view_reports", name: "Xem báo cáo", description: "Cho phép xem báo cáo và thống kê" },
  { id: "manage_settings", name: "Quản lý cài đặt", description: "Cho phép thay đổi cài đặt hệ thống" },
  { id: "manage_billing", name: "Quản lý thanh toán", description: "Cho phép xem và quản lý thông tin thanh toán" },
]

// Cập nhật dữ liệu mẫu cho nhân viên để bao gồm quyền
const initialEmployees = [
  {
    id: 1,
    name: "Nguyễn Văn An",
    email: "an.nguyen@abctech.com",
    employeeId: "NV001",
    department: "Kỹ Thuật",
    position: "Kỹ Sư Phần Mềm",
    joinDate: "01/06/2020",
    phone: "0901234567",
    avatar: "/placeholder.svg?height=32&width=32",
    permissions: ["view_dashboard", "manage_messages", "view_reports"],
  },
  {
    id: 2,
    name: "Trần Thị Bình",
    email: "binh.tran@abctech.com",
    employeeId: "NV002",
    department: "Kinh Doanh",
    position: "Trưởng Phòng Kinh Doanh",
    joinDate: "15/03/2019",
    phone: "0912345678",
    avatar: "/placeholder.svg?height=32&width=32",
    permissions: ["view_dashboard", "manage_messages", "manage_customers", "view_reports"],
  },
  {
    id: 3,
    name: "Lê Văn Cường",
    email: "cuong.le@abctech.com",
    employeeId: "NV003",
    department: "Kỹ Thuật",
    position: "Kỹ Sư Hệ Thống",
    joinDate: "10/09/2021",
    phone: "0923456789",
    avatar: "/placeholder.svg?height=32&width=32",
    permissions: ["view_dashboard", "manage_messages", "view_reports"],
  },
  {
    id: 4,
    name: "Phạm Thị Dung",
    email: "dung.pham@abctech.com",
    employeeId: "NV004",
    department: "Nhân Sự",
    position: "Chuyên Viên Nhân Sự",
    joinDate: "05/01/2022",
    phone: "0934567890",
    avatar: "/placeholder.svg?height=32&width=32",
    permissions: ["view_dashboard", "manage_employees", "view_reports"],
  },
  {
    id: 5,
    name: "Hoàng Văn Em",
    email: "em.hoang@abctech.com",
    employeeId: "NV005",
    department: "Tài Chính",
    position: "Kế Toán Trưởng",
    joinDate: "20/04/2020",
    phone: "0945678901",
    avatar: "/placeholder.svg?height=32&width=32",
    permissions: ["view_dashboard", "manage_billing", "view_reports"],
  },
  {
    id: 6,
    name: "Ngô Thị Phương",
    email: "phuong.ngo@abctech.com",
    employeeId: "NV006",
    department: "Marketing",
    position: "Chuyên Viên Marketing",
    joinDate: "12/07/2021",
    phone: "0956789012",
    avatar: "/placeholder.svg?height=32&width=32",
    permissions: ["view_dashboard", "manage_messages", "manage_templates"],
  },
  {
    id: 7,
    name: "Đỗ Văn Giang",
    email: "giang.do@abctech.com",
    employeeId: "NV007",
    department: "Kỹ Thuật",
    position: "Lập Trình Viên Frontend",
    joinDate: "08/11/2022",
    phone: "0967890123",
    avatar: "/placeholder.svg?height=32&width=32",
    permissions: ["view_dashboard", "manage_messages"],
  },
  {
    id: 8,
    name: "Vũ Thị Hương",
    email: "huong.vu@abctech.com",
    employeeId: "NV008",
    department: "Kinh Doanh",
    position: "Nhân Viên Kinh Doanh",
    joinDate: "15/02/2023",
    phone: "0978901234",
    avatar: "/placeholder.svg?height=32&width=32",
    permissions: ["view_dashboard", "manage_messages", "manage_customers"],
  },
]

const initialDepartments = [
  { id: 1, name: "Kỹ Thuật" },
  { id: 2, name: "Kinh Doanh" },
  { id: 3, name: "Nhân Sự" },
  { id: 4, name: "Tài Chính" },
  { id: 5, name: "Marketing" },
]

// Cập nhật hàm AddEmployeeDialog để thêm mật khẩu và quyền
function AddEmployeeDialog({ onAddEmployee, departments }) {
  const [open, setOpen] = useState(false)
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    email: "",
    employeeId: "",
    department: "",
    position: "",
    joinDate: "",
    phone: "",
    password: "",
    avatar: "/placeholder.svg?height=32&width=32",
    permissions: ["view_dashboard"], // Quyền mặc định
  })

  // State để theo dõi các quyền được chọn
  const [selectedPermissions, setSelectedPermissions] = useState(["view_dashboard"])

  const handlePermissionChange = (permissionId) => {
    setSelectedPermissions((prev) => {
      if (prev.includes(permissionId)) {
        return prev.filter((id) => id !== permissionId)
      } else {
        return [...prev, permissionId]
      }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Cập nhật quyền từ state vào nhân viên mới
    const employeeWithPermissions = {
      ...newEmployee,
      permissions: selectedPermissions,
    }
    onAddEmployee(employeeWithPermissions)
    setNewEmployee({
      name: "",
      email: "",
      employeeId: "",
      department: "",
      position: "",
      joinDate: "",
      phone: "",
      password: "",
      avatar: "/placeholder.svg?height=32&width=32",
      permissions: ["view_dashboard"],
    })
    setSelectedPermissions(["view_dashboard"])
    setOpen(false)
  }

  // Tạo mật khẩu ngẫu nhiên
  const generateRandomPassword = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*"
    let password = ""
    for (let i = 0; i < 10; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    setNewEmployee({ ...newEmployee, password })
  }

  return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>
            <UserPlus className="mr-2 h-4 w-4" /> Thêm Nhân Viên
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[650px]">
          <DialogHeader>
            <DialogTitle>Thêm Nhân Viên Mới</DialogTitle>
            <DialogDescription>Thêm thông tin nhân viên mới vào hệ thống.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Họ Tên</Label>
                  <Input
                      id="name"
                      value={newEmployee.name}
                      onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
                      required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="employeeId">Mã Nhân Viên</Label>
                  <Input
                      id="employeeId"
                      value={newEmployee.employeeId}
                      onChange={(e) => setNewEmployee({ ...newEmployee, employeeId: e.target.value })}
                      required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                      id="email"
                      type="email"
                      value={newEmployee.email}
                      onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
                      required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">Số Điện Thoại</Label>
                  <Input
                      id="phone"
                      value={newEmployee.phone}
                      onChange={(e) => setNewEmployee({ ...newEmployee, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="department">Phòng Ban</Label>
                  <Select onValueChange={(value) => setNewEmployee({ ...newEmployee, department: value })} required>
                    <SelectTrigger id="department">
                      <SelectValue placeholder="Chọn phòng ban" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((dept) => (
                          <SelectItem key={dept.id} value={dept.name}>
                            {dept.name}
                          </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="position">Chức Vụ</Label>
                  <Input
                      id="position"
                      value={newEmployee.position}
                      onChange={(e) => setNewEmployee({ ...newEmployee, position: e.target.value })}
                      required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="joinDate">Ngày Vào Làm</Label>
                  <Input
                      id="joinDate"
                      type="date"
                      value={newEmployee.joinDate}
                      onChange={(e) => setNewEmployee({ ...newEmployee, joinDate: e.target.value })}
                      required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Mật Khẩu</Label>
                  <div className="flex gap-2">
                    <Input
                        id="password"
                        type="text"
                        value={newEmployee.password}
                        onChange={(e) => setNewEmployee({ ...newEmployee, password: e.target.value })}
                        required
                    />
                    <Button type="button" variant="outline" onClick={generateRandomPassword}>
                      Tạo
                    </Button>
                  </div>
                </div>
              </div>

              <div className="grid gap-2">
                <Label>Quyền Hạn</Label>
                <div className="grid grid-cols-2 gap-2 border rounded-md p-3 max-h-[200px] overflow-y-auto">
                  {permissions.map((permission) => (
                      <div key={permission.id} className="flex items-start space-x-2">
                        <input
                            type="checkbox"
                            id={`perm-${permission.id}`}
                            checked={selectedPermissions.includes(permission.id)}
                            onChange={() => handlePermissionChange(permission.id)}
                            className="mt-1"
                        />
                        <div>
                          <Label htmlFor={`perm-${permission.id}`} className="font-medium">
                            {permission.name}
                          </Label>
                          <p className="text-xs text-muted-foreground">{permission.description}</p>
                        </div>
                      </div>
                  ))}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Thêm Nhân Viên</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
  )
}

// Cập nhật hàm EditEmployeeDialog để thêm quyền
function EditEmployeeDialog({ employee, isOpen, onClose, onUpdate }) {
  const [editedEmployee, setEditedEmployee] = useState(null)
  const [selectedPermissions, setSelectedPermissions] = useState([])

  useEffect(() => {
    if (employee) {
      setEditedEmployee({ ...employee })
      setSelectedPermissions(employee.permissions || [])
    }
  }, [employee])

  const handlePermissionChange = (permissionId) => {
    setSelectedPermissions((prev) => {
      if (prev.includes(permissionId)) {
        return prev.filter((id) => id !== permissionId)
      } else {
        return [...prev, permissionId]
      }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editedEmployee) {
      onUpdate({
        ...editedEmployee,
        permissions: selectedPermissions,
      })
    }
  }

  if (!employee || !editedEmployee) return null

  return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[650px]">
          <DialogHeader>
            <DialogTitle>Chỉnh Sửa Nhân Viên</DialogTitle>
            <DialogDescription>Cập nhật thông tin nhân viên.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-name">Họ Tên</Label>
                  <Input
                      id="edit-name"
                      value={editedEmployee.name}
                      onChange={(e) => setEditedEmployee({ ...editedEmployee, name: e.target.value })}
                      required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-employeeId">Mã Nhân Viên</Label>
                  <Input
                      id="edit-employeeId"
                      value={editedEmployee.employeeId}
                      onChange={(e) => setEditedEmployee({ ...editedEmployee, employeeId: e.target.value })}
                      required
                      disabled
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-email">Email</Label>
                  <Input
                      id="edit-email"
                      type="email"
                      value={editedEmployee.email}
                      onChange={(e) => setEditedEmployee({ ...editedEmployee, email: e.target.value })}
                      required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-phone">Số Điện Thoại</Label>
                  <Input
                      id="edit-phone"
                      value={editedEmployee.phone}
                      onChange={(e) => setEditedEmployee({ ...editedEmployee, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-department">Phòng Ban</Label>
                  <Select
                      onValueChange={(value) => setEditedEmployee({ ...editedEmployee, department: value })}
                      defaultValue={editedEmployee.department}
                  >
                    <SelectTrigger id="edit-department">
                      <SelectValue placeholder="Chọn phòng ban" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Hỗ Trợ Khách Hàng">Hỗ Trợ Khách Hàng</SelectItem>
                      <SelectItem value="Kinh Doanh">Kinh Doanh</SelectItem>
                      <SelectItem value="Hỗ Trợ Kỹ Thuật">Hỗ Trợ Kỹ Thuật</SelectItem>
                      <SelectItem value="Marketing">Marketing</SelectItem>
                      <SelectItem value="Nhân Sự">Nhân Sự</SelectItem>
                      <SelectItem value="Kỹ Thuật">Kỹ Thuật</SelectItem>
                      <SelectItem value="Tài Chính">Tài Chính</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-position">Chức Vụ</Label>
                  <Input
                      id="edit-position"
                      value={editedEmployee.position}
                      onChange={(e) => setEditedEmployee({ ...editedEmployee, position: e.target.value })}
                      required
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="edit-joinDate">Ngày Vào Làm</Label>
                <Input
                    id="edit-joinDate"
                    type="date"
                    value={editedEmployee.joinDate}
                    onChange={(e) => setEditedEmployee({ ...editedEmployee, joinDate: e.target.value })}
                    required
                />
              </div>

              <div className="grid gap-2">
                <Label>Quyền Hạn</Label>
                <div className="grid grid-cols-2 gap-2 border rounded-md p-3 max-h-[200px] overflow-y-auto">
                  {permissions.map((permission) => (
                      <div key={permission.id} className="flex items-start space-x-2">
                        <input
                            type="checkbox"
                            id={`edit-perm-${permission.id}`}
                            checked={selectedPermissions.includes(permission.id)}
                            onChange={() => handlePermissionChange(permission.id)}
                            className="mt-1"
                        />
                        <div>
                          <Label htmlFor={`edit-perm-${permission.id}`} className="font-medium">
                            {permission.name}
                          </Label>
                          <p className="text-xs text-muted-foreground">{permission.description}</p>
                        </div>
                      </div>
                  ))}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Cập Nhật</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
  )
}

// Thêm hàm ResetPasswordDialog để đặt lại mật khẩu
function ResetPasswordDialog({ employee, isOpen, onClose, onResetPassword }) {
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    if (isOpen) {
      setNewPassword("")
      setConfirmPassword("")
      setError("")
    }
  }, [isOpen])

  const generateRandomPassword = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*"
    let password = ""
    for (let i = 0; i < 10; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    setNewPassword(password)
    setConfirmPassword(password)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (newPassword !== confirmPassword) {
      setError("Mật khẩu xác nhận không khớp")
      return
    }

    if (newPassword.length < 6) {
      setError("Mật khẩu phải có ít nhất 6 ký tự")
      return
    }

    onResetPassword(employee.id, newPassword)
    onClose()
  }

  if (!employee) return null

  return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Đặt Lại Mật Khẩu</DialogTitle>
            <DialogDescription>
              Đặt lại mật khẩu cho nhân viên <strong>{employee.name}</strong>.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="new-password">Mật Khẩu Mới</Label>
                <div className="flex gap-2">
                  <Input
                      id="new-password"
                      type="text"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                  />
                  <Button type="button" variant="outline" onClick={generateRandomPassword}>
                    Tạo
                  </Button>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirm-password">Xác Nhận Mật Khẩu</Label>
                <Input
                    id="confirm-password"
                    type="text"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
            </div>
            <DialogFooter>
              <Button type="submit">Đặt Lại Mật Khẩu</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
  )
}

// Trong component EmployeesPage, thêm dòng hiển thị số lượng nhân viên sau DashboardHeader
export default function EmployeesPage() {
  const [employees, setEmployees] = useState([...initialEmployees])
  const [searchQuery, setSearchQuery] = useState("")
  const [editingEmployee, setEditingEmployee] = useState(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isResetPasswordDialogOpen, setIsResetPasswordDialogOpen] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState(null)

  // Các hàm xử lý khác...

  const handleEditEmployee = (employee) => {
    setEditingEmployee(employee)
    setIsEditDialogOpen(true)
  }

  const handleUpdateEmployee = (updatedEmployee) => {
    setEmployees(employees.map((emp) => (emp.id === updatedEmployee.id ? updatedEmployee : emp)))
    setIsEditDialogOpen(false)
  }

  const handleResetPassword = (employee) => {
    setSelectedEmployee(employee)
    setIsResetPasswordDialogOpen(true)
  }

  const handlePasswordReset = (employeeId, newPassword) => {
    // Trong thực tế, bạn sẽ gửi yêu cầu đặt lại mật khẩu đến API
    console.log(`Đặt lại mật khẩu cho nhân viên ID ${employeeId}: ${newPassword}`)
    // Hiển thị thông báo thành công (trong thực tế)
  }

  const filteredEmployees = employees.filter(
      (employee) =>
          employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          employee.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          employee.department.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Cập nhật hàm handleAddEmployee để kiểm tra số lượng nhân viên tối đa
  const handleAddEmployee = (newEmployee) => {
    if (employees.length >= MAX_EMPLOYEES) {
      // Trong thực tế, bạn có thể hiển thị một thông báo lỗi ở đây
      alert("Đã đạt số lượng nhân viên tối đa. Không thể thêm nhân viên mới.")
      return
    }
    setEmployees([...employees, { ...newEmployee, id: employees.length + 1 }])
  }

  const handleDeleteEmployee = (id) => {
    setEmployees(employees.filter((employee) => employee.id !== id))
  }

  // Tính tỷ lệ phần trăm số lượng nhân viên
  const employeePercentage = (employees.length / MAX_EMPLOYEES) * 100

  // Xác định màu sắc dựa trên tỷ lệ
  const getStatusColor = () => {
    if (employeePercentage < 50) {
      return {
        bg: "bg-blue-50",
        border: "border-blue-200",
        text: "text-blue-700",
        highlight: "text-blue-500",
      }
    } else if (employeePercentage < 80) {
      return {
        bg: "bg-yellow-50",
        border: "border-yellow-200",
        text: "text-yellow-700",
        highlight: "text-yellow-500",
      }
    } else {
      return {
        bg: "bg-red-50",
        border: "border-red-200",
        text: "text-red-700",
        highlight: "text-red-500",
      }
    }
  }

  const colorStyle = getStatusColor()

  return (
      <DashboardShell>
        <DashboardHeader heading="Quản Lý Nhân Viên" text="Thêm, sửa và quản lý nhân viên của bạn." />

        {/* Cập nhật dòng hiển thị số lượng nhân viên với màu sắc tương ứng */}
        <div className={`${colorStyle.bg} border ${colorStyle.border} rounded-md p-3 ${colorStyle.text} mb-4`}>
          <p className="text-sm font-medium">
            Số lượng nhân viên hiện tại: {employees.length}/{MAX_EMPLOYEES}
            <span className={`ml-1 ${colorStyle.highlight}`}>
            (Còn có thể thêm {MAX_EMPLOYEES - employees.length} nhân viên)
          </span>
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                  placeholder="Tìm kiếm nhân viên..."
                  className="h-9 w-[250px] lg:w-[300px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <AddEmployeeDialog onAddEmployee={handleAddEmployee} departments={initialDepartments} />
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nhân Viên</TableHead>
                  <TableHead>Phòng Ban</TableHead>
                  <TableHead>Trạng Thái</TableHead>
                  <TableHead>Quyền Hạn</TableHead>
                  <TableHead>Ngày Tham Gia</TableHead>
                  <TableHead className="text-right">Thao Tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEmployees.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center">
                        Không tìm thấy nhân viên nào.
                      </TableCell>
                    </TableRow>
                ) : (
                    filteredEmployees.map((employee) => (
                        <TableRow key={employee.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={employee.avatar} alt={employee.name} />
                                <AvatarFallback>{employee.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{employee.name}</p>
                                <p className="text-xs text-muted-foreground">{employee.email}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{employee.department}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                              Hoạt động
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {employee.permissions &&
                                  employee.permissions.slice(0, 2).map((permId) => {
                                    const perm = permissions.find((p) => p.id === permId)
                                    return perm ? (
                                        <Badge key={permId} variant="secondary" className="text-xs">
                                          {perm.name}
                                        </Badge>
                                    ) : null
                                  })}
                              {employee.permissions && employee.permissions.length > 2 && (
                                  <Badge variant="outline" className="text-xs">
                                    +{employee.permissions.length - 2}
                                  </Badge>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>{employee.joinDate}</TableCell>
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
                                <DropdownMenuItem onClick={() => handleEditEmployee(employee)}>
                                  <Edit className="mr-2 h-4 w-4" /> Chỉnh sửa
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleResetPassword(employee)}>
                                  <KeyRound className="mr-2 h-4 w-4" /> Đặt lại mật khẩu
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => handleDeleteEmployee(employee.id)}>
                                  <Trash2 className="mr-2 h-4 w-4" /> Xóa
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
        </div>
        <EditEmployeeDialog
            employee={editingEmployee}
            isOpen={isEditDialogOpen}
            onClose={() => setIsEditDialogOpen(false)}
            onUpdate={handleUpdateEmployee}
        />
        <ResetPasswordDialog
            employee={selectedEmployee}
            isOpen={isResetPasswordDialogOpen}
            onClose={() => setIsResetPasswordDialogOpen(false)}
            onResetPassword={handlePasswordReset}
        />
      </DashboardShell>
  )
}

