"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Calendar, Mail, PartyPopper, Users } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function OnboardingPage() {
  const [step, setStep] = useState(0)
  const router = useRouter()

  const steps = [
    {
      title: "Create Events",
      description: "Design beautiful event pages with all the details your guests need to know.",
      icon: <Calendar className="h-16 w-16 text-primary" />,
    },
    {
      title: "Invite Guests",
      description: "Easily invite guests via email or shareable links with just a few clicks.",
      icon: <Users className="h-16 w-16 text-primary" />,
    },
    {
      title: "Track RSVPs",
      description: "Keep track of who's coming, who's not, and any special requests.",
      icon: <Mail className="h-16 w-16 text-primary" />,
    },
    {
      title: "You're All Set!",
      description: "You're ready to start creating amazing events with EventWorld.",
      icon: <PartyPopper className="h-16 w-16 text-primary" />,
    },
  ]

  const nextStep = () => {
    if (step < steps.length - 1) {
      setStep(step + 1)
    } else {
      router.push("/dashboard")
    }
  }

  const prevStep = () => {
    if (step > 0) {
      setStep(step - 1)
    }
  }

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  }

  const [direction, setDirection] = useState(1)

  const handleNext = () => {
    setDirection(1)
    nextStep()
  }

  const handlePrev = () => {
    setDirection(-1)
    prevStep()
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-background to-muted/50 px-4 py-12">
      <div className="mb-8 flex items-center gap-2">
        <PartyPopper className="h-8 w-8 text-primary" />
        <span className="text-2xl font-bold">EventWorld</span>
      </div>

      <div className="relative w-full max-w-md overflow-hidden rounded-lg border bg-background p-8 shadow-lg">
        <div className="mb-6 flex justify-center">
          <div className="flex gap-2">
            {steps.map((_, i) => (
              <div key={i} className={`h-2 w-8 rounded-full ${i === step ? "bg-primary" : "bg-muted"}`} />
            ))}
          </div>
        </div>

        <div className="h-[350px]">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={step}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="flex h-full flex-col items-center justify-center text-center"
            >
              <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-primary/10">
                {steps[step].icon}
              </div>
              <h2 className="mb-2 text-2xl font-bold">{steps[step].title}</h2>
              <p className="mb-8 text-muted-foreground">{steps[step].description}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={handlePrev} disabled={step === 0}>
            Back
          </Button>
          <Button onClick={handleNext}>{step === steps.length - 1 ? "Get Started" : "Next"}</Button>
        </div>
      </div>
    </div>
  )
}
