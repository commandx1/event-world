"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import confetti from "canvas-confetti"
import { motion } from "framer-motion"

interface ConfettiButtonProps extends React.ComponentPropsWithoutRef<typeof Button> {
  confettiColors?: string[]
}

export function ConfettiButton({
  children,
  confettiColors = ["#ff0099", "#00ff99", "#9900ff", "#ff9900"],
  ...props
}: ConfettiButtonProps) {
  const [isAnimating, setIsAnimating] = useState(false)

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsAnimating(true)

    // Trigger confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: confettiColors,
    })

    // Reset animation state
    setTimeout(() => setIsAnimating(false), 300)

    // Call the original onClick handler if provided
    props.onClick?.(e)
  }

  return (
    <motion.div animate={isAnimating ? { scale: [1, 1.05, 1] } : {}} transition={{ duration: 0.3 }}>
      <Button {...props} onClick={handleClick} className={`relative overflow-hidden ${props.className || ""}`}>
        {children}
      </Button>
    </motion.div>
  )
}
