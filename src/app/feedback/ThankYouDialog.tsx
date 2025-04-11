"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle, Star, Heart, ThumbsUp } from "lucide-react"

interface ThankYouDialogProps {
  isOpen: boolean
  onClose: () => void
}

const iconVariants = {
  hidden: { scale: 0, rotate: -180 },
  visible: {
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20,
      delay: 0.3,
    },
  },
}

const containerVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
      delayChildren: 0.3,
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
}

export default function ThankYouDialog({ isOpen, onClose }: ThankYouDialogProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={onClose}>
          <DialogContent className="sm:max-w-[800px] bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl overflow-hidden">
            <motion.div variants={containerVariants} initial="hidden" animate="visible" exit="hidden">
              <DialogHeader className="space-y-4">
                <motion.div variants={iconVariants} className="mx-auto">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-12 h-12 text-green-500" />
                  </div>
                </motion.div>
                <DialogTitle className="text-center text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  <div className="flex text-center justify-center ">
                  Lời Cảm Ơn Chân Thành Từ Zework
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                      <ThumbsUp className="w-10 h-10 text-blue-500 pl-2" fill="currentColor" />
                    </motion.div>
                </div>
                </DialogTitle>
                <DialogDescription className="text-center text-lg text-gray-600">
                  Zework đã tiếp nhận ý kiến của bạn
                </DialogDescription>
              </DialogHeader>
              <motion.div className="mt-6 space-y-4 m-5" variants={itemVariants}>
                <p className="text-left text-black-600">
                  &nbsp;&nbsp;&nbsp;&nbsp; Kính gửi Quý khách hàng,
                  <br/>
                  <br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;Zework xin gửi lời cảm ơn chân thành và sâu sắc nhất đến Quý khách vì đã tin tưởng và sử dụng dịch vụ của chúng tôi. Sự ủng hộ và đồng hành của Quý khách là động lực lớn nhất để chúng tôi không ngừng cải thiện và mang đến trải nghiệm tốt nhất.

                  Mỗi ý kiến đóng góp của Quý khách đều vô cùng quý giá và giúp chúng tôi ngày càng hoàn thiện hơn. Chúng tôi luôn sẵn sàng lắng nghe và phục vụ Quý khách với tất cả tâm huyết.

                  Một lần nữa, chúng tôi xin cảm ơn và mong được tiếp tục đồng hành cùng Quý khách trong chặng đường phía trước!
                  <br/>
                  <br/>
                  <span className="text-blod">Trân trọng</span>
                </p>
                <div className="flex justify-center space-x-6">

                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <Heart className="w-10 h-10 text-red-500" fill="currentColor" />
                  </motion.div>

                </div>
              </motion.div>
              <DialogFooter className="mt-8">
                <motion.div
                  className="w-full"
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    type="button"
                    onClick={onClose}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white transition-all duration-300 py-6 text-lg font-semibold rounded-xl"
                  >
                    Đóng
                  </Button>
                </motion.div>
              </DialogFooter>
            </motion.div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  )
}

