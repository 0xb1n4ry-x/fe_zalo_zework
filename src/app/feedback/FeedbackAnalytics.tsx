"use client"

import { useState, useEffect } from "react"
import { motion, useAnimation } from "framer-motion"
import { Star, ThumbsUp, ThumbsDown, TrendingUp, Users, BarChart2, HeartIcon } from "lucide-react"

export default function FeedbackAnalytics({ isSubmitting }) {
  const [averageRating, setAverageRating] = useState(0)
  const [totalFeedbacks, setTotalFeedbacks] = useState(0)
  const [positivePercentage, setPositivePercentage] = useState(0)
  const [negativePercentage, setNegativePercentage] = useState(0)

  const controls = useAnimation()

  useEffect(() => {
    setAverageRating(4.2)
    setTotalFeedbacks(9999)
    setPositivePercentage(99)
    setNegativePercentage(1)
  }, [])

  useEffect(() => {
    if (isSubmitting) {
      controls.start({
        scale: [1, 1.02, 1],
        transition: { duration: 0.3 },
      })
    }
  }, [isSubmitting, controls])

  const chartVariants = {
    hidden: { scaleY: 0 },
    visible: (i) => ({
      scaleY: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  }

  const numberVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  }

  return (
    <motion.div
      className="w-full h-full bg-white rounded-2xl shadow-xl p-8 space-y-8"
      animate={controls}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
        <BarChart2 className="w-8 h-8 mr-3 text-blue-500" />
         Số Liệu Feedback của Zework
      </h2>

      <div className="grid grid-cols-2 gap-6">
        <motion.div
          className="bg-gradient-to-br from-blue-500 to-purple-500 p-6 rounded-xl text-white"
          variants={numberVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-lg font-semibold">Trung Bình Ratings</span>
            <Star className="w-6 h-6 text-yellow-300" fill="currentColor" />
          </div>
          <div className="text-4xl font-bold">{averageRating.toFixed(1)}</div>
        </motion.div>

        <motion.div
          className="bg-gradient-to-br from-blue-500 to-purple-600 p-6 rounded-xl text-white"
          variants={numberVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-lg font-semibold">Tổng Feedbacks</span>
            <Users className="w-6 h-6" />
          </div>
          <div className="text-4xl font-bold">{totalFeedbacks}</div>
        </motion.div>
      </div>

      <div className="bg-gray-50 p-6 rounded-xl">
       <div className="flex justify-between">
         <HeartIcon className="w-5 h-5 text-purple-600 mr-2"/>
         <span className="text-xl font-bold text-gray-700 mb-4">Tình cảm người dùng dành cho Zework</span>
       </div>
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center">
            <ThumbsUp className="w-5 h-5 text-blue-500 mr-2" />
            <span className="text-blue-600 font-medium text-lg">{positivePercentage}%</span>
          </div>
          <div className="flex items-center">
            <ThumbsDown className="w-5 h-5 text-red-500 mr-2" />
            <span className="text-red-600 font-medium text-lg">{negativePercentage}%</span>
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <motion.div
            className="bg-gradient-to-r from-blue-400 to-purple-500 h-3 rounded-full"
            style={{ width: `${positivePercentage}%` }}
            initial={{ width: 0 }}
            animate={{ width: `${positivePercentage}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
          <TrendingUp className="w-6 h-6 text-purple-500 mr-2" />
          Thống Kê
        </h3>
        <div className="h-48 flex items-end justify-between">
          {[30, 45, 25, 60, 75, 45, 65].map((height, index) => (
            <motion.div
              key={index}
              className="w-12 bg-gradient-to-t from-blue-500 to-purple-400 rounded-t-lg"
              style={{ height: `${height}%` }}
              variants={chartVariants}
              initial="hidden"
              animate="visible"
              custom={index}
            />
          ))}
        </div>
        <div className="flex justify-between mt-2 text-sm text-gray-500">
          <span>Mon</span>
          <span>Tue</span>
          <span>Wed</span>
          <span>Thu</span>
          <span>Fri</span>
          <span>Sat</span>
          <span>Sun</span>
        </div>
      </div>

      {isSubmitting && (
        <motion.div
          className="absolute top-4 right-4 w-3 h-3 bg-green-500 rounded-full"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [1, 0.5, 1],
          }}
          transition={{
            duration: 1,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      )}
    </motion.div>
  )
}

