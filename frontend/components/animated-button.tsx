"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { forwardRef } from "react"

const MotionButton = motion(Button)

export const AnimatedButton = forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof Button> & { animateScale?: boolean }
>(({ animateScale = true, ...props }, ref) => {
  return (
    <MotionButton
      ref={ref}
      whileHover={animateScale ? { scale: 1.05 } : undefined}
      whileTap={animateScale ? { scale: 0.95 } : undefined}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      {...props}
    />
  )
})
AnimatedButton.displayName = "AnimatedButton"
