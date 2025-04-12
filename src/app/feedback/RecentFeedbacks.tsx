"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { MessageSquare, User, Star, ChevronLeft, ChevronRight } from "lucide-react"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import "@/styles/carousel.css"

interface Feedback {
  id: number
  name: string
  message: string
  rating: number
  date: string
}

function SampleNextArrow(props: { onClick: any }) {
  const { onClick } = props
  return (
      <div className="custom-arrow custom-arrow-next" onClick={onClick}>
        <ChevronRight className="w-8 h-8 text-blue-500" />
      </div>
  )
}

function SamplePrevArrow(props: { onClick: any }) {
  const { onClick } = props
  return (
      <div className="custom-arrow custom-arrow-prev" onClick={onClick}>
        <ChevronLeft className="w-8 h-8 text-blue-500" />
      </div>
  )
}

export default function RecentFeedbacks() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([])
  const sliderRef = useRef<Slider>(null)

  useEffect(() => {
    // Simulating fetching data from an API
    const dummyFeedbacks: Feedback[] = [
      {
        id: 1,
        name: "John Doe",
        message: "Great service! I'm really impressed with the quality of work and attention to detail.",
        rating: 5,
        date: "2023-06-15",
      },
      {
        id: 2,
        name: "Jane Smith",
        message: "Good experience overall, but there's room for improvement in communication.",
        rating: 4,
        date: "2023-06-14",
      },
      {
        id: 3,
        name: "Mike Johnson",
        message: "Excellent support team. They resolved my issue quickly and efficiently.",
        rating: 5,
        date: "2023-06-13",
      },
      {
        id: 4,
        name: "Emily Brown",
        message: "The product exceeded my expectations. Highly recommended for anyone looking for quality!",
        rating: 5,
        date: "2023-06-12",
      },
      {
        id: 5,
        name: "David Wilson",
        message: "Good value for money. Will definitely use their services again in the future.",
        rating: 4,
        date: "2023-06-11",
      },
      {
        id: 6,
        name: "Sarah Lee",
        message: "I had a few concerns initially, but the team addressed them promptly. Great customer service!",
        rating: 4,
        date: "2023-06-10",
      },
      {
        id: 7,
        name: "Tom Harris",
        message: "Innovative solutions and cutting-edge technology. They're definitely ahead of the curve.",
        rating: 5,
        date: "2023-06-09",
      },
      {
        id: 8,
        name: "Lisa Wong",
        message: "The attention to detail is impressive. They caught things I hadn't even considered.",
        rating: 5,
        date: "2023-06-08",
      },
      {
        id: 9,
        name: "Alex Martinez",
        message: "Solid performance, but the onboarding process could be smoother. Otherwise, great job!",
        rating: 4,
        date: "2023-06-07",
      },
      {
        id: 10,
        name: "Rachel Green",
        message: "I've tried many similar services, but this one stands out. Will be a returning customer for sure.",
        rating: 5,
        date: "2023-06-06",
      },
    ]
    setFeedbacks(dummyFeedbacks)
  }, [])

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow onClick={undefined} />,
    prevArrow: <SamplePrevArrow onClick={undefined} />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  }

  return (
      <motion.div
          className="w-full bg-white rounded-2xl shadow-xl p-8 space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
          <MessageSquare className="w-8 h-8 mr-3 text-blue-500" />
          Các Feedback Gần Đây
        </h2>
        <div className="relative feedback-slider-container">
          <Slider ref={sliderRef} {...settings}>
            {feedbacks.map((feedback) => (
                <div key={feedback.id} className="px-2">
                  <motion.div
                      className="bg-gray-50 rounded-xl p-6 shadow-sm h-full"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <User className="w-6 h-6 text-gray-500 mr-2" />
                        <span className="font-semibold text-gray-700">{feedback.name}</span>
                      </div>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                className={`w-5 h-5 ${i < feedback.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                            />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600 mb-2 line-clamp-3">{feedback.message}</p>
                    <p className="text-sm text-gray-400">{feedback.date}</p>
                  </motion.div>
                </div>
            ))}
          </Slider>
        </div>
      </motion.div>
  )
}

