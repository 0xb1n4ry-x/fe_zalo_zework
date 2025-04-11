"use client"

import { useEffect, useRef, useState } from "react"
import { Player, Controls } from "@lottiefiles/react-lottie-player"

export default function FeedbackAnimation({ isSubmitting = false }) {
  const [animationData, setAnimationData] = useState(null)
  const playerRef = useRef<Player>(null)

  useEffect(() => {
    fetch("https://assets5.lottiefiles.com/packages/lf20_u25cckyh.json")
      .then((res) => res.json())
      .then((data) => setAnimationData(data))
  }, [])

  useEffect(() => {
    if (isSubmitting && playerRef.current) {
      playerRef.current.play()
    }
  }, [isSubmitting])

  return (
    <div className="w-full max-w-md lg:w-1/2 flex items-center justify-center">
      <Player
        ref={playerRef}
        autoplay={!isSubmitting}
        loop={!isSubmitting}
        src={animationData}
        style={{ width: "100%", height: "auto", maxWidth: "400px" }}
      >
        <Controls visible={false} buttons={["play", "repeat", "frame", "debug"]} />
      </Player>
    </div>
  )
}

