"use client"

import React from "react"

import { motion } from "framer-motion"

interface AnimatedListProps {
  children: React.ReactNode[]
  className?: string
  delay?: number
  staggerDelay?: number
}

export function AnimatedList({ children, className, delay = 0.2, staggerDelay = 0.1 }: AnimatedListProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
  }

  return (
    <motion.div variants={container} initial="hidden" animate="show" className={className}>
      {React.Children.map(children, (child, index) => (
        <motion.div key={index} variants={item}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  )
}
