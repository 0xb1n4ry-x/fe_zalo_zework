"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
import { Label } from "@/components/ui/label"
import { Copy, Download, Plus, Search, Trash2, Upload } from "lucide-react"
import Image from "next/image"
type ImageType = NewImage & {
  id: number;
  size: string;
  uploaded: string;
}

// Hoặc tự định nghĩa
type NewImage = {
  name: string;
  category: string;
  tags: string[];
  url: string;
  size: string;
  uploaded: string;
}
export default function ImageLibraryPage() {
  const [images, setImages] = useState([...initialImages])
  const [searchQuery, setSearchQuery] = useState("")

  const filteredImages = images.filter(
    (image) =>
      image.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      image.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const handleAddImage = (newImage: NewImage) => {
    const fullImage: ImageType = {
      ...newImage,
      id: Date.now(), // hoặc dùng uuid
      size: "0,5 MB", // hoặc lấy từ file
      uploaded: new Date().toLocaleDateString(),
    }

    setImages((prev) => [...prev, fullImage])
  }

  const handleDeleteImage = (id: number) => {
    setImages(images.filter((image) => image.id !== id))
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Thư Viện Ảnh" text="Quản lý và tổ chức hình ảnh của bạn." />
      <Tabs defaultValue="all" className="space-y-4">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="all">Tất Cả Ảnh</TabsTrigger>
            <TabsTrigger value="products">Sản Phẩm</TabsTrigger>
            <TabsTrigger value="banners">Banner</TabsTrigger>
            <TabsTrigger value="logos">Logo</TabsTrigger>
          </TabsList>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Tìm kiếm ảnh..."
                className="h-9 w-[200px] lg:w-[250px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <AddImageDialog onAddImage={handleAddImage} />
          </div>
        </div>
        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredImages.map((image) => (
              <ImageCard key={image.id} image={image} onDelete={() => handleDeleteImage(image.id)} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="products" className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredImages
              .filter((image) => image.category === "Sản Phẩm")
              .map((image) => (
                <ImageCard key={image.id} image={image} onDelete={() => handleDeleteImage(image.id)} />
              ))}
          </div>
        </TabsContent>
        <TabsContent value="banners" className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredImages
              .filter((image) => image.category === "Banner")
              .map((image) => (
                <ImageCard key={image.id} image={image} onDelete={() => handleDeleteImage(image.id)} />
              ))}
          </div>
        </TabsContent>
        <TabsContent value="logos" className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredImages
              .filter((image) => image.category === "Logo")
              .map((image) => (
                <ImageCard key={image.id} image={image} onDelete={() => handleDeleteImage(image.id)} />
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}
// @ts-ignore
function ImageCard({ image, onDelete }) {
  const [showActions, setShowActions] = useState(false)

  return (
    <Card className="overflow-hidden">
      <div
        className="relative aspect-square cursor-pointer"
        onMouseEnter={() => setShowActions(true)}
        onMouseLeave={() => setShowActions(false)}
      >
        <Image
          src={image.url || "/placeholder.svg"}
          alt={image.name}
          fill
          className="object-cover transition-all hover:scale-105"
        />
        {showActions && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <div className="flex gap-2">
              <Button variant="secondary" size="icon">
                <Download className="h-4 w-4" />
              </Button>
              <Button variant="secondary" size="icon">
                <Copy className="h-4 w-4" />
              </Button>
              <Button variant="secondary" size="icon" onClick={onDelete}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
      <CardContent className="p-3">
        <div className="space-y-1">
          <div className="font-medium">{image.name}</div>
          <div className="text-xs text-muted-foreground">
            {image.size} • {image.uploaded}
          </div>
          <div className="flex flex-wrap gap-1 pt-1">
            {image.tags.map((tag?:string, index?: number) => (
              <div
                key={index}
                className="inline-flex items-center rounded-full bg-muted px-2 py-0.5 text-xs font-medium"
              >
                {tag}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function AddImageDialog({ onAddImage }: { onAddImage: (image: NewImage) => void }) {
  const [open, setOpen] = useState(false)
  const [newImage, setNewImage] = useState<{
    name: string
    url: string
    tags: string[]
    category : string
  }>({
    name: "",
    url: "",
    category :"",
    tags: [],
  })
  const [tagInput, setTagInput] = useState("")

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()

    const fullImage = {
      ...newImage,
      id: Date.now(),
      size: "0,5 MB",
      uploaded: new Date().toLocaleDateString(),
      category: typeof newImage.category === "string"
          ? newImage.category
          : newImage.category[0] || "Chưa phân loại", // fallback
    }

    onAddImage(fullImage)

    // Reset form
    setNewImage({
      name: "",
      category: "Sản Phẩm",
      tags: [],
      url: "/placeholder.svg?height=200&width=200",
    })
    setTagInput("")
    setOpen(false)
  }


  const handleAddTag = () => {
    const trimmed = tagInput.trim()
    if (trimmed && !newImage.tags.includes(trimmed)) {
      setNewImage({ ...newImage, tags: [...newImage.tags, trimmed] })
      setTagInput("")
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setNewImage({
      ...newImage,
      tags: newImage.tags.filter((tag) => tag !== tagToRemove),
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Thêm Ảnh
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Thêm Ảnh Mới</DialogTitle>
          <DialogDescription>Tải lên ảnh mới vào thư viện của bạn.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="image-upload">Tải Lên Ảnh</Label>
              <div className="flex h-32 items-center justify-center rounded-md border border-dashed">
                <div className="flex flex-col items-center gap-1 text-center">
                  <Upload className="h-8 w-8 text-muted-foreground" />
                  <div className="text-sm font-medium">Kéo & thả hoặc nhấp để tải lên</div>
                  <div className="text-xs text-muted-foreground">PNG, JPG hoặc GIF tối đa 5MB</div>
                </div>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="name">Tên Ảnh</Label>
              <Input
                id="name"
                value={newImage.name}
                onChange={(e) => setNewImage({ ...newImage, name: e.target.value })}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="category">Danh Mục</Label>
              <select
                id="category"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={newImage.category}
                onChange={(e) => setNewImage({ ...newImage, category: e.target.value })}
              >
                <option value="Sản Phẩm">Sản Phẩm</option>
                <option value="Banner">Banner</option>
                <option value="Logo">Logo</option>
              </select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="tags">Thẻ</Label>
              <div className="flex gap-2">
                <Input
                  id="tags"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  placeholder="Thêm thẻ"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault()
                      handleAddTag()
                    }
                  }}
                />
                <Button type="button" onClick={handleAddTag}>
                  Thêm
                </Button>
              </div>
              {newImage.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 pt-2">
                  {newImage.tags.map((tag, index) => (
                    <div
                      key={index}
                      className="inline-flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-xs font-medium"
                    >
                      {tag}
                      <button
                        type="button"
                        className="ml-1 rounded-full p-0.5 hover:bg-muted-foreground/20"
                        onClick={() => handleRemoveTag(tag)}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Thêm Ảnh</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

const initialImages = [
  {
    id: 1,
    name: "Ảnh Sản Phẩm 1",
    category: "Sản Phẩm",
    tags: ["điện tử", "nổi bật"],
    url: "/placeholder.svg?height=200&width=200",
    size: "1,2 MB",
    uploaded: "01/03/2024",
  },
  {
    id: 2,
    name: "Banner Trang Chủ",
    category: "Banner",
    tags: ["trang chủ", "khuyến mãi"],
    url: "/placeholder.svg?height=200&width=200",
    size: "2,5 MB",
    uploaded: "05/03/2024",
  },
  {
    id: 3,
    name: "Logo Công Ty",
    category: "Logo",
    tags: ["thương hiệu", "chính thức"],
    url: "/placeholder.svg?height=200&width=200",
    size: "0,8 MB",
    uploaded: "15/02/2024",
  },
  {
    id: 4,
    name: "Ảnh Sản Phẩm 2",
    category: "Sản Phẩm",
    tags: ["quần áo", "nổi bật"],
    url: "/placeholder.svg?height=200&width=200",
    size: "1,5 MB",
    uploaded: "10/03/2024",
  },
  {
    id: 5,
    name: "Banner Khuyến Mãi",
    category: "Banner",
    tags: ["giảm giá", "khuyến mãi"],
    url: "/placeholder.svg?height=200&width=200",
    size: "1,8 MB",
    uploaded: "15/03/2024",
  },
  {
    id: 6,
    name: "Ảnh Sản Phẩm 3",
    category: "Sản Phẩm",
    tags: ["phụ kiện", "mới"],
    url: "/placeholder.svg?height=200&width=200",
    size: "1,1 MB",
    uploaded: "18/03/2024",
  },
  {
    id: 7,
    name: "Logo Đối Tác",
    category: "Logo",
    tags: ["đối tác", "chính thức"],
    url: "/placeholder.svg?height=200&width=200",
    size: "0,6 MB",
    uploaded: "20/03/2024",
  },
  {
    id: 8,
    name: "Ảnh Sản Phẩm 4",
    category: "Sản Phẩm",
    tags: ["điện tử", "mới"],
    url: "/placeholder.svg?height=200&width=200",
    size: "1,3 MB",
    uploaded: "22/03/2024",
  },
]

