"use client"

import type React from "react"

import { useState } from "react"
import { Star, Upload, User, Mail, MessageSquare, FileText, Send } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { motion, useAnimation } from "framer-motion"
import ThankYouDialog from "./ThankYouDialog"

// @ts-ignore
export default function FeedbackForm({ onSubmit }) {
  const [rating, setRating] = useState(0)
  const [fileName, setFileName] = useState<string | null>(null)
  const [hoveredStar, setHoveredStar] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const controls = useAnimation()

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    setFileName(file ? file.name : null)
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setIsSubmitting(true)

    await controls.start({
      scale: [1, 0.98, 1.02, 1],
      transition: { duration: 0.4 },
    })

    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    onSubmit()
    setIsDialogOpen(true)
  }

  const closeDialog = () => {
    setIsDialogOpen(false)
  }

  const inputVariants = {
    focus: { scale: 1.02, boxShadow: "0 0 0 2px rgba(99, 102, 241, 0.2)", transition: { duration: 0.2 } },
    blur: { scale: 1, boxShadow: "none", transition: { duration: 0.2 } },
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full h-full"
    >
      <motion.div animate={controls} className="h-full">
        <Card className="w-full h-full bg-white/90 backdrop-blur-md shadow-xl rounded-2xl border-0 overflow-hidden flex flex-col">
          <CardHeader className="space-y-1 pb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <CardTitle className="text-3xl font-bold">Feedback Timeee</CardTitle>
            <CardDescription className="text-blue-100">Sự góp ý của các bạn là niềm vinh hạnh của Zework. <br/> Chúng tôi sẽ chân thành tiếp nhận nhanh chóng các góp ý của các bạn.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 pt-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div variants={inputVariants} whileFocus="focus" whileTap="focus">
                <Label htmlFor="name" className="text-sm font-medium flex items-center gap-2 text-gray-700 mb-2">
                  <User className="w-4 h-4 text-blue-500" />
                  Tên Của Bạn
                </Label>
                <Input
                  id="name"
                  placeholder=""
                  className="border-blue-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                />
              </motion.div>

              <motion.div variants={inputVariants} whileFocus="focus" whileTap="focus">
                <Label htmlFor="email" className="text-medium text-blod flex items-center gap-2 text-black-700 mb-2">
                  <Mail className="w-4 h-4 text-blue-500" />
                  Email <span className="text-gray-700"> ➛ Nếu không muốn thay đổi địa chỉ nhận email hãy bỏ qua!</span>
                </Label>
                <Input
                  type="email"
                  id="email"
                  placeholder=""
                  className="border-blue-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                />
              </motion.div>

              <motion.div variants={inputVariants} whileFocus="focus" whileTap="focus">
                <Label htmlFor="feedback" className="text-sm font-medium flex items-center gap-2 text-gray-700 mb-2">
                  <MessageSquare className="w-4 h-4 text-blue-500" />
                  Ý Kiến Của Bạn
                </Label>
                <Textarea
                  id="feedback"
                  placeholder="Chúng tôi rất hân hạnh được chờ đón các góp ý từ người dùng, mong bạn có thể mô tả chi tiết ♥"
                  className="min-h-[120px] border-blue-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                />
              </motion.div>

              <div className="space-y-2">
                <Label className="text-sm font-medium flex items-center gap-2 text-gray-700">
                  <Star className="w-4 h-4 text-blue-500" />
                  Rating
                </Label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <motion.div
                      key={star}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      className="cursor-pointer"
                    >
                      <Star
                        className={`w-8 h-8 transition-all duration-300 ${
                          star <= (hoveredStar || rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                        }`}
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoveredStar(star)}
                        onMouseLeave={() => setHoveredStar(0)}
                      />
                    </motion.div>
                  ))}
                </div>
              </div>

              <motion.div variants={inputVariants} whileFocus="focus" whileTap="focus">
                <Label htmlFor="file" className="text-sm font-medium flex items-center gap-2 text-gray-700 mb-2">
                  <FileText className="w-4 h-4 text-blue-500" />
                  Các Tệp
                </Label>
                <div className="flex items-center">
                  <Input type="file" id="file" className="hidden" onChange={handleFileChange} />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById("file")?.click()}
                    className="w-full border-blue-100 hover:bg-blue-50 transition-all duration-300"
                  >
                    <Upload className="w-4 h-4 mr-2 text-blue-500" />
                    {fileName ? fileName : "Tải Tệp"}
                  </Button>
                </div>
              </motion.div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white transition-all duration-300 transform hover:scale-105"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Đợi Một Chút Nhaaa
                  </span>
                ) : (
                  <span className="flex items-center">
                    Gửi Cho Chúng Tôi ở đâyyy
                    <Send className="ml-2 h-5 w-5" />
                  </span>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
      <ThankYouDialog isOpen={isDialogOpen} onClose={closeDialog} />
    </motion.div>
  )
}

