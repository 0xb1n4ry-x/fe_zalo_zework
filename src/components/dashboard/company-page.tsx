"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
    Building,
    Users,
    Phone,
    Mail,
    Globe,
    MapPin,
    Calendar,
    FileText,
    Plus,
    Pencil,
    Trash2,
    Search,
    Upload,
    Save,
    MoreHorizontal,
    UserPlus,
    Filter,
} from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

export default function CompanyPage() {
    // Thay đổi phần khai báo state để thêm trạng thái có công ty hay không
    const [hasCompany, setHasCompany] = useState(false)
    const [companyInfo, setCompanyInfo] = useState({
        name: "",
        address: "",
        phone: "",
        email: "",
        website: "",
        taxId: "",
        foundedDate: "",
        industry: "",
        description: "",
        logo: "/placeholder.svg?height=128&width=128",
    })

    const [employees, setEmployees] = useState([...initialEmployees])
    const [departments, setDepartments] = useState([...initialDepartments])
    const [searchQuery, setSearchQuery] = useState("")
    const [isEditing, setIsEditing] = useState(false)
    const [editedInfo, setEditedInfo] = useState({ ...companyInfo })
    const [selectedDepartment, setSelectedDepartment] = useState("all")

    // Thêm state để quản lý xem trước ảnh khi chỉnh sửa
    const [previewLogo, setPreviewLogo] = useState(null)

    // Lọc nhân viên theo tìm kiếm và phòng ban
    const filteredEmployees = employees.filter((employee) => {
        const matchesSearch =
            employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            employee.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
            employee.email.toLowerCase().includes(searchQuery.toLowerCase())

        const matchesDepartment = selectedDepartment === "all" || employee.department === selectedDepartment

        return matchesSearch && matchesDepartment
    })

    // Xử lý thêm nhân viên mới
    const handleAddEmployee = (newEmployee) => {
        setEmployees([...employees, { ...newEmployee, id: employees.length + 1 }])
    }

    // Xử lý xóa nhân viên
    const handleDeleteEmployee = (id) => {
        setEmployees(employees.filter((employee) => employee.id !== id))
    }

    // Thêm hàm xử lý tải lên ảnh
    const handleLogoUpload = (e) => {
        const file = e.target.files[0]
        if (file) {
            const previewUrl = URL.createObjectURL(file)
            setPreviewLogo(previewUrl)
            setEditedInfo({ ...editedInfo, logo: previewUrl })
        }
    }

    // Cập nhật hàm lưu thông tin
    const handleSaveCompanyInfo = () => {
        setCompanyInfo(editedInfo)
        setIsEditing(false)
        setPreviewLogo(null) // Reset preview sau khi lưu
    }

    // Thay đổi phần return của component CompanyPage, thêm điều kiện hiển thị
    return (
        <DashboardShell>
            <DashboardHeader heading="Thông Tin Công Ty" text="Quản lý thông tin công ty và nhân viên." />

            {!hasCompany ? (
                <Card className="mt-6">
                    <CardContent className="flex flex-col items-center justify-center py-12">
                        <Building className="h-16 w-16 text-muted-foreground mb-4" />
                        <h2 className="text-xl font-semibold mb-2">Chưa có thông tin công ty</h2>
                        <p className="text-muted-foreground text-center max-w-md mb-6">
                            Bạn chưa thêm thông tin công ty. Thêm thông tin công ty để quản lý nhân viên, phòng ban và các tài liệu
                            liên quan.
                        </p>
                        <AddCompanyDialog
                            onAddCompany={(company) => {
                                setCompanyInfo(company)
                                setHasCompany(true)
                            }}
                        />
                    </CardContent>
                </Card>
            ) : (
                <Tabs defaultValue="info" className="space-y-4">
                    <TabsList>
                        <TabsTrigger value="info">Thông Tin Công Ty</TabsTrigger>
                        <TabsTrigger value="employees">Nhân Viên</TabsTrigger>
                        <TabsTrigger value="departments">Phòng Ban</TabsTrigger>
                        <TabsTrigger value="documents">Tài Liệu</TabsTrigger>
                    </TabsList>

                    {/* Tab Thông Tin Công Ty */}
                    <TabsContent value="info" className="space-y-4">
                        <Card>
                            <CardHeader className="flex flex-row items-start justify-between">
                                <div>
                                    <CardTitle>Thông Tin Cơ Bản</CardTitle>
                                    <CardDescription>Thông tin cơ bản về công ty của bạn.</CardDescription>
                                </div>
                                {!isEditing ? (
                                    <Button variant="outline" onClick={() => setIsEditing(true)}>
                                        <Pencil className="mr-2 h-4 w-4" /> Chỉnh Sửa
                                    </Button>
                                ) : (
                                    <div className="flex gap-2">
                                        <Button variant="outline" onClick={() => setIsEditing(false)}>
                                            Hủy
                                        </Button>
                                        <Button onClick={handleSaveCompanyInfo}>
                                            <Save className="mr-2 h-4 w-4" /> Lưu
                                        </Button>
                                    </div>
                                )}
                            </CardHeader>
                            <CardContent>
                                {isEditing ? (
                                    <div className="grid gap-6">
                                        <div className="flex flex-col md:flex-row gap-6">
                                            <div className="flex-1 space-y-4">
                                                <div className="grid gap-2">
                                                    <Label htmlFor="company-name">Tên Công Ty</Label>
                                                    <Input
                                                        id="company-name"
                                                        value={editedInfo.name}
                                                        onChange={(e) => setEditedInfo({ ...editedInfo, name: e.target.value })}
                                                    />
                                                </div>

                                                <div className="grid gap-2">
                                                    <Label htmlFor="address">Địa Chỉ</Label>
                                                    <Textarea
                                                        id="address"
                                                        rows={2}
                                                        value={editedInfo.address}
                                                        onChange={(e) => setEditedInfo({ ...editedInfo, address: e.target.value })}
                                                    />
                                                </div>

                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="grid gap-2">
                                                        <Label htmlFor="phone">Số Điện Thoại</Label>
                                                        <Input
                                                            id="phone"
                                                            value={editedInfo.phone}
                                                            onChange={(e) => setEditedInfo({ ...editedInfo, phone: e.target.value })}
                                                        />
                                                    </div>
                                                    <div className="grid gap-2">
                                                        <Label htmlFor="email">Email</Label>
                                                        <Input
                                                            id="email"
                                                            type="email"
                                                            value={editedInfo.email}
                                                            onChange={(e) => setEditedInfo({ ...editedInfo, email: e.target.value })}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="grid gap-2">
                                                        <Label htmlFor="website">Website</Label>
                                                        <Input
                                                            id="website"
                                                            value={editedInfo.website}
                                                            onChange={(e) => setEditedInfo({ ...editedInfo, website: e.target.value })}
                                                        />
                                                    </div>
                                                    <div className="grid gap-2">
                                                        <Label htmlFor="tax-id">Mã Số Thuế</Label>
                                                        <Input
                                                            id="tax-id"
                                                            value={editedInfo.taxId}
                                                            onChange={(e) => setEditedInfo({ ...editedInfo, taxId: e.target.value })}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="grid gap-2">
                                                        <Label htmlFor="founded-date">Ngày Thành Lập</Label>
                                                        <Input
                                                            id="founded-date"
                                                            value={editedInfo.foundedDate}
                                                            onChange={(e) => setEditedInfo({ ...editedInfo, foundedDate: e.target.value })}
                                                        />
                                                    </div>
                                                    <div className="grid gap-2">
                                                        <Label htmlFor="industry">Ngành Nghề</Label>
                                                        <Select
                                                            value={editedInfo.industry}
                                                            onValueChange={(value) => setEditedInfo({ ...editedInfo, industry: value })}
                                                        >
                                                            <SelectTrigger id="industry">
                                                                <SelectValue placeholder="Chọn ngành nghề" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {industries.map((industry) => (
                                                                    <SelectItem key={industry} value={industry}>
                                                                        {industry}
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="md:w-1/3 flex flex-col items-center space-y-4">
                                                <div className="relative">
                                                    <Avatar className="h-32 w-32">
                                                        <AvatarImage src={previewLogo || editedInfo.logo} alt="Logo công ty" />
                                                        <AvatarFallback>{editedInfo.name ? editedInfo.name.charAt(0) : "C"}</AvatarFallback>
                                                    </Avatar>
                                                    <Button size="icon" variant="outline" className="absolute bottom-0 right-0 rounded-full">
                                                        <label htmlFor="edit-logo-upload" className="cursor-pointer">
                                                            <Upload className="h-4 w-4" />
                                                            <span className="sr-only">Tải logo lên</span>
                                                        </label>
                                                    </Button>
                                                    <Input
                                                        id="edit-logo-upload"
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={handleLogoUpload}
                                                        className="hidden"
                                                    />
                                                </div>
                                                <div className="w-full">
                                                    <Label htmlFor="edit-logo-upload-btn" className="block mb-2 text-sm font-medium">
                                                        Logo Công Ty
                                                    </Label>
                                                    <div className="flex items-center">
                                                        <Button
                                                            variant="outline"
                                                            className="w-full"
                                                            onClick={() => document.getElementById("edit-logo-upload").click()}
                                                        >
                                                            <Upload className="mr-2 h-4 w-4" />
                                                            Tải Logo Lên
                                                        </Button>
                                                    </div>
                                                    <p className="mt-1 text-xs text-muted-foreground">PNG, JPG hoặc GIF (tối đa 2MB)</p>
                                                </div>

                                                <div className="w-full mt-4">
                                                    <Label htmlFor="description">Mô Tả</Label>
                                                    <Textarea
                                                        id="description"
                                                        rows={6}
                                                        value={editedInfo.description}
                                                        onChange={(e) => setEditedInfo({ ...editedInfo, description: e.target.value })}
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex flex-col md:flex-row gap-6">
                                        <div className="flex-1 space-y-4">
                                            <div className="grid gap-4">
                                                <div className="flex items-center gap-2">
                                                    <Building className="h-5 w-5 text-muted-foreground" />
                                                    <div>
                                                        <p className="text-sm font-medium text-muted-foreground">Tên Công Ty</p>
                                                        <p className="font-medium">{companyInfo.name}</p>
                                                    </div>
                                                </div>

                                                <div className="flex items-start gap-2">
                                                    <MapPin className="h-5 w-5 text-muted-foreground" />
                                                    <div>
                                                        <p className="text-sm font-medium text-muted-foreground">Địa Chỉ</p>
                                                        <p>{companyInfo.address}</p>
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div className="flex items-center gap-2">
                                                        <Phone className="h-5 w-5 text-muted-foreground" />
                                                        <div>
                                                            <p className="text-sm font-medium text-muted-foreground">Số Điện Thoại</p>
                                                            <p>{companyInfo.phone}</p>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center gap-2">
                                                        <Mail className="h-5 w-5 text-muted-foreground" />
                                                        <div>
                                                            <p className="text-sm font-medium text-muted-foreground">Email</p>
                                                            <p>{companyInfo.email}</p>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div className="flex items-center gap-2">
                                                        <Globe className="h-5 w-5 text-muted-foreground" />
                                                        <div>
                                                            <p className="text-sm font-medium text-muted-foreground">Website</p>
                                                            <p>{companyInfo.website}</p>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center gap-2">
                                                        <FileText className="h-5 w-5 text-muted-foreground" />
                                                        <div>
                                                            <p className="text-sm font-medium text-muted-foreground">Mã Số Thuế</p>
                                                            <p>{companyInfo.taxId}</p>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div className="flex items-center gap-2">
                                                        <Calendar className="h-5 w-5 text-muted-foreground" />
                                                        <div>
                                                            <p className="text-sm font-medium text-muted-foreground">Ngày Thành Lập</p>
                                                            <p>{companyInfo.foundedDate}</p>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center gap-2">
                                                        <Building className="h-5 w-5 text-muted-foreground" />
                                                        <div>
                                                            <p className="text-sm font-medium text-muted-foreground">Ngành Nghề</p>
                                                            <p>{companyInfo.industry}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="md:w-1/3 flex flex-col items-center">
                                            <Avatar className="h-32 w-32 mb-4">
                                                <AvatarImage src={companyInfo.logo} alt="Logo công ty" />
                                                <AvatarFallback>{companyInfo.name ? companyInfo.name.charAt(0) : "C"}</AvatarFallback>
                                            </Avatar>

                                            <div className="w-full mt-4">
                                                <p className="text-sm font-medium text-muted-foreground mb-2">Mô Tả</p>
                                                <p className="text-sm">{companyInfo.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Thống Kê Nhân Sự</CardTitle>
                                <CardDescription>Tổng quan về nhân sự công ty.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                                    <div className="flex flex-col p-4 border rounded-lg">
                                        <span className="text-sm text-muted-foreground">Tổng Nhân Viên</span>
                                        <span className="text-2xl font-bold">{employees.length}</span>
                                    </div>

                                    <div className="flex flex-col p-4 border rounded-lg">
                                        <span className="text-sm text-muted-foreground">Phòng Ban</span>
                                        <span className="text-2xl font-bold">{departments.length}</span>
                                    </div>

                                    <div className="flex flex-col p-4 border rounded-lg">
                                        <span className="text-sm text-muted-foreground">Nhân Viên Mới (30 ngày)</span>
                                        <span className="text-2xl font-bold">5</span>
                                    </div>

                                    <div className="flex flex-col p-4 border rounded-lg">
                                        <span className="text-sm text-muted-foreground">Tỷ Lệ Giữ Chân</span>
                                        <span className="text-2xl font-bold">92%</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Tab Nhân Viên */}
                    <TabsContent value="employees" className="space-y-4">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div className="flex items-center gap-2">
                                <div className="relative flex-1">
                                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        placeholder="Tìm kiếm nhân viên..."
                                        className="pl-8 w-full sm:w-[300px]"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>

                                <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                                    <SelectTrigger className="w-full sm:w-[180px]">
                                        <SelectValue placeholder="Chọn phòng ban" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">Tất cả phòng ban</SelectItem>
                                        {departments.map((dept) => (
                                            <SelectItem key={dept.id} value={dept.name}>
                                                {dept.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                                <Button variant="outline" size="icon" className="flex-shrink-0">
                                    <Filter className="h-4 w-4" />
                                    <span className="sr-only">Lọc</span>
                                </Button>
                            </div>

                            <AddEmployeeDialog onAddEmployee={handleAddEmployee} departments={departments} />
                        </div>

                        <Card>
                            <CardContent className="p-0">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Nhân Viên</TableHead>
                                            <TableHead>Mã NV</TableHead>
                                            <TableHead>Phòng Ban</TableHead>
                                            <TableHead className="hidden md:table-cell">Chức Vụ</TableHead>
                                            <TableHead className="hidden md:table-cell">Ngày Vào Làm</TableHead>
                                            <TableHead className="hidden lg:table-cell">Số Điện Thoại</TableHead>
                                            <TableHead className="text-right">Thao Tác</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {filteredEmployees.length === 0 ? (
                                            <TableRow>
                                                <TableCell colSpan={7} className="h-24 text-center">
                                                    Không tìm thấy nhân viên nào.
                                                </TableCell>
                                            </TableRow>
                                        ) : (
                                            filteredEmployees.map((employee) => (
                                                <TableRow key={employee.id} className="group">
                                                    <TableCell>
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
                                                    <TableCell>{employee.employeeId}</TableCell>
                                                    <TableCell>
                                                        <Badge variant="outline">{employee.department}</Badge>
                                                    </TableCell>
                                                    <TableCell className="hidden md:table-cell">{employee.position}</TableCell>
                                                    <TableCell className="hidden md:table-cell">{employee.joinDate}</TableCell>
                                                    <TableCell className="hidden lg:table-cell">{employee.phone}</TableCell>
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
                                                                <DropdownMenuItem>
                                                                    <Pencil className="mr-2 h-4 w-4" /> Chỉnh sửa
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem>
                                                                    <Users className="mr-2 h-4 w-4" /> Chuyển phòng ban
                                                                </DropdownMenuItem>
                                                                <DropdownMenuSeparator />
                                                                <DropdownMenuItem
                                                                    onClick={() => handleDeleteEmployee(employee.id)}
                                                                    className="text-red-600 focus:text-red-600"
                                                                >
                                                                    <Trash2 className="mr-2 h-4 w-4" /> Xóa nhân viên
                                                                </DropdownMenuItem>
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        )}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Tab Phòng Ban */}
                    <TabsContent value="departments" className="space-y-4">
                        <div className="flex justify-end">
                            <Button>
                                <Plus className="mr-2 h-4 w-4" /> Thêm Phòng Ban
                            </Button>
                        </div>

                        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                            {departments.map((department) => (
                                <Card key={department.id}>
                                    <CardHeader>
                                        <div className="flex justify-between items-start">
                                            <CardTitle>{department.name}</CardTitle>
                                            <Badge variant="outline">{department.employeeCount} nhân viên</Badge>
                                        </div>
                                        <CardDescription>{department.description}</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-2">
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm text-muted-foreground">Trưởng phòng:</span>
                                                <span className="font-medium">{department.manager}</span>
                                            </div>
                                            <Separator />
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm text-muted-foreground">Ngày thành lập:</span>
                                                <span>{department.createdDate}</span>
                                            </div>
                                            <Separator />
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm text-muted-foreground">Vị trí:</span>
                                                <span>{department.location}</span>
                                            </div>
                                        </div>
                                    </CardContent>
                                    <CardFooter className="flex justify-between">
                                        <Button variant="outline" size="sm">
                                            <Pencil className="mr-2 h-4 w-4" /> Chỉnh sửa
                                        </Button>
                                        <Button variant="outline" size="sm">
                                            <Users className="mr-2 h-4 w-4" /> Xem nhân viên
                                        </Button>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>

                    {/* Tab Tài Liệu */}
                    <TabsContent value="documents" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Tài Liệu Công Ty</CardTitle>
                                <CardDescription>Quản lý tài liệu và văn bản pháp lý của công ty.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex justify-center items-center h-[300px] border-2 border-dashed rounded-md">
                                    <div className="text-center">
                                        <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
                                        <h3 className="mt-4 text-lg font-medium">Chưa có tài liệu nào</h3>
                                        <p className="mt-2 text-sm text-muted-foreground">
                                            Tải lên tài liệu công ty như giấy phép kinh doanh, quy chế, v.v.
                                        </p>
                                        <Button className="mt-4">
                                            <Upload className="mr-2 h-4 w-4" /> Tải Lên Tài Liệu
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            )}
        </DashboardShell>
    )
}

// Thêm component AddCompanyDialog
function AddCompanyDialog({ onAddCompany }) {
    const [open, setOpen] = useState(false)

    // Trong hàm AddCompanyDialog, thêm validation cho các trường nhập liệu
    // Thêm các hàm validate sau vào đầu hàm AddCompanyDialog

    const validateEmail = (email) => {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        return regex.test(email)
    }

    const validatePhone = (phone) => {
        const regex =
            /^(0|\+84)(\s|\.)?((3[2-9])|(5[689])|(7[06-9])|(8[1-689])|(9[0-46-9]))(\d)(\s|\.)?(\d{3})(\s|\.)?(\d{3})$/
        return regex.test(phone)
    }

    const validateWebsite = (website) => {
        if (!website) return true // Website là trường không bắt buộc
        const regex = /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+)(\/[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]*)?$/
        return regex.test(website)
    }

    const validateTaxId = (taxId) => {
        const regex = /^(\d{10}|\d{13})$/
        return regex.test(taxId)
    }

    // Thêm state để theo dõi lỗi
    const [errors, setErrors] = useState({
        email: "",
        phone: "",
        website: "",
        taxId: "",
    })

    const [newCompany, setNewCompany] = useState({
        name: "",
        address: "",
        phone: "",
        email: "",
        website: "",
        taxId: "",
        foundedDate: "",
        industry: "",
        description: "",
        logo: "/placeholder.svg?height=128&width=128",
    })
    const [previewLogo, setPreviewLogo] = useState(null)

    // Cập nhật hàm handleSubmit để kiểm tra validation
    const handleSubmit = (e) => {
        e.preventDefault()

        // Reset errors
        setErrors({
            email: "",
            phone: "",
            website: "",
            taxId: "",
        })

        // Validate các trường
        let isValid = true

        if (!validateEmail(newCompany.email)) {
            setErrors((prev) => ({ ...prev, email: "Email không hợp lệ" }))
            isValid = false
        }

        if (!validatePhone(newCompany.phone)) {
            setErrors((prev) => ({ ...prev, phone: "Số điện thoại không hợp lệ" }))
            isValid = false
        }

        if (!validateWebsite(newCompany.website)) {
            setErrors((prev) => ({ ...prev, website: "Website không hợp lệ" }))
            isValid = false
        }

        if (!validateTaxId(newCompany.taxId)) {
            setErrors((prev) => ({ ...prev, taxId: "Mã số thuế phải có 10 hoặc 13 chữ số" }))
            isValid = false
        }

        if (isValid) {
            onAddCompany(newCompany)
            setOpen(false)
        }
    }

    const handleLogoUpload = (e) => {
        const file = e.target.files[0]
        if (file) {
            // Tạo URL xem trước cho ảnh đã chọn
            const previewUrl = URL.createObjectURL(file)
            setPreviewLogo(previewUrl)

            // Trong thực tế, bạn sẽ tải ảnh lên server và nhận URL từ server
            // Ở đây chúng ta chỉ giả lập bằng cách sử dụng URL xem trước
            setNewCompany({ ...newCompany, logo: previewUrl })
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <Plus className="mr-2 h-4 w-4" /> Thêm Công Ty
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Thêm Thông Tin Công Ty</DialogTitle>
                    <DialogDescription>Nhập thông tin cơ bản về công ty của bạn.</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="flex flex-col md:flex-row gap-6">
                            <div className="flex-1 space-y-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="company-name">Tên Công Ty</Label>
                                    <Input
                                        id="company-name"
                                        value={newCompany.name}
                                        onChange={(e) => setNewCompany({ ...newCompany, name: e.target.value })}
                                        required
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="address">Địa Chỉ</Label>
                                    <Textarea
                                        id="address"
                                        rows={2}
                                        value={newCompany.address}
                                        onChange={(e) => setNewCompany({ ...newCompany, address: e.target.value })}
                                        required
                                    />
                                </div>

                                {/* Cập nhật các trường Input để hiển thị lỗi */}
                                {/* Ví dụ cho trường email: */}
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={newCompany.email}
                                        onChange={(e) => setNewCompany({ ...newCompany, email: e.target.value })}
                                        required
                                        className={errors.email ? "border-red-500" : ""}
                                    />
                                    {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
                                </div>

                                {/* Tương tự cho các trường khác: phone, website, taxId */}
                                <div className="grid gap-2">
                                    <Label htmlFor="phone">Số Điện Thoại</Label>
                                    <Input
                                        id="phone"
                                        value={newCompany.phone}
                                        onChange={(e) => setNewCompany({ ...newCompany, phone: e.target.value })}
                                        required
                                        className={errors.phone ? "border-red-500" : ""}
                                    />
                                    {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}
                                </div>
                            </div>

                            <div className="md:w-1/3 flex flex-col items-center space-y-4">
                                <div className="relative">
                                    <Avatar className="h-32 w-32">
                                        <AvatarImage src={previewLogo || newCompany.logo} alt="Logo công ty" />
                                        <AvatarFallback>{newCompany.name ? newCompany.name.charAt(0) : "C"}</AvatarFallback>
                                    </Avatar>
                                </div>
                                <div className="w-full">
                                    <Label htmlFor="logo-upload" className="block mb-2 text-sm font-medium">
                                        Logo Công Ty
                                    </Label>
                                    <Input
                                        id="logo-upload"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleLogoUpload}
                                        className="cursor-pointer"
                                    />
                                    <p className="mt-1 text-xs text-muted-foreground">PNG, JPG hoặc GIF (tối đa 2MB)</p>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="website">Website</Label>
                                <Input
                                    id="website"
                                    value={newCompany.website}
                                    onChange={(e) => setNewCompany({ ...newCompany, website: e.target.value })}
                                    className={errors.website ? "border-red-500" : ""}
                                />
                                {errors.website && <p className="text-xs text-red-500">{errors.website}</p>}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="tax-id">Mã Số Thuế</Label>
                                <Input
                                    id="tax-id"
                                    value={newCompany.taxId}
                                    onChange={(e) => setNewCompany({ ...newCompany, taxId: e.target.value })}
                                    required
                                    className={errors.taxId ? "border-red-500" : ""}
                                />
                                {errors.taxId && <p className="text-xs text-red-500">{errors.taxId}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="founded-date">Ngày Thành Lập</Label>
                                <Input
                                    id="founded-date"
                                    type="date"
                                    value={newCompany.foundedDate}
                                    onChange={(e) => setNewCompany({ ...newCompany, foundedDate: e.target.value })}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="industry">Ngành Nghề</Label>
                                <Select
                                    value={newCompany.industry}
                                    onValueChange={(value) => setNewCompany({ ...newCompany, industry: value })}
                                >
                                    <SelectTrigger id="industry">
                                        <SelectValue placeholder="Chọn ngành nghề" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {industries.map((industry) => (
                                            <SelectItem key={industry} value={industry}>
                                                {industry}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="description">Mô Tả</Label>
                            <Textarea
                                id="description"
                                rows={3}
                                value={newCompany.description}
                                onChange={(e) => setNewCompany({ ...newCompany, description: e.target.value })}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">Tạo Công Ty</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

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
        avatar: "/placeholder.svg?height=32&width=32",
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        onAddEmployee(newEmployee)
        setNewEmployee({
            name: "",
            email: "",
            employeeId: "",
            department: "",
            position: "",
            joinDate: "",
            phone: "",
            avatar: "/placeholder.svg?height=32&width=32",
        })
        setOpen(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <UserPlus className="mr-2 h-4 w-4" /> Thêm Nhân Viên
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px]">
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
                    </div>
                    <DialogFooter>
                        <Button type="submit">Thêm Nhân Viên</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

// Dữ liệu mẫu cho nhân viên
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
    },
]

// Dữ liệu mẫu cho phòng ban
const initialDepartments = [
    {
        id: 1,
        name: "Kỹ Thuật",
        description: "Phòng phát triển và bảo trì sản phẩm phần mềm",
        manager: "Nguyễn Văn An",
        employeeCount: 3,
        createdDate: "01/04/2015",
        location: "Tầng 3, Tòa nhà A",
    },
    {
        id: 2,
        name: "Kinh Doanh",
        description: "Phòng quản lý hoạt động bán hàng và phát triển kinh doanh",
        manager: "Trần Thị Bình",
        employeeCount: 2,
        createdDate: "01/04/2015",
        location: "Tầng 2, Tòa nhà A",
    },
    {
        id: 3,
        name: "Nhân Sự",
        description: "Phòng quản lý nhân sự và tuyển dụng",
        manager: "Phạm Thị Dung",
        employeeCount: 1,
        createdDate: "15/05/2015",
        location: "Tầng 2, Tòa nhà A",
    },
    {
        id: 4,
        name: "Tài Chính",
        description: "Phòng quản lý tài chính và kế toán",
        manager: "Hoàng Văn Em",
        employeeCount: 1,
        createdDate: "15/05/2015",
        location: "Tầng 1, Tòa nhà A",
    },
    {
        id: 5,
        name: "Marketing",
        description: "Phòng quản lý hoạt động marketing và truyền thông",
        manager: "Ngô Thị Phương",
        employeeCount: 1,
        createdDate: "10/06/2016",
        location: "Tầng 3, Tòa nhà A",
    },
]

// Thêm danh sách ngành nghề vào cuối file, trước các dữ liệu mẫu khác
const industries = [
    "Công nghệ thông tin",
    "Tài chính - Ngân hàng",
    "Bán lẻ",
    "Sản xuất",
    "Giáo dục",
    "Y tế",
    "Bất động sản",
    "Du lịch - Khách sạn",
    "Vận tải - Logistics",
    "Xây dựng",
    "Truyền thông - Marketing",
    "Thực phẩm & Đồ uống",
    "Nông nghiệp",
    "Dịch vụ tư vấn",
    "Năng lượng",
    "Viễn thông",
    "Dệt may",
    "Dược phẩm",
    "Bảo hiểm",
    "Khác",
]

