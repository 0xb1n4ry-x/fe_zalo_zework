"use client"

import { useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import FeedbackForm from "./FeedbackForm"
import FeedbackAnalytics from "./FeedbackAnalytics"
import RecentFeedbacks from "./RecentFeedbacks"
import FloatingElements from "./FloatingElements"
import WaveBackground from "./WaveBackground"

export default function Home() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 300], [0, -50])

  const handleSubmit = () => {
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      // You might want to update your analytics here
    }, 3000)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-6 mt-10 md:p-12 relative overflow-hidden">
      <FloatingElements />
      <WaveBackground />
      <motion.div
        className="flex flex-col items-start justify-center gap-12 w-full max-w-7xl relative z-10"
        style={{ y }}
      >
        <div className="w-full flex flex-col lg:flex-row gap-12">
          <div className="w-full lg:w-1/2">
            <FeedbackForm onSubmit={handleSubmit} />
          </div>
          <div className="w-full lg:w-1/2">
            <FeedbackAnalytics isSubmitting={isSubmitting} />
          </div>
        </div>
        <div className="w-full">
          <RecentFeedbacks />
        </div>
      </motion.div>
    </main>
  )
}

