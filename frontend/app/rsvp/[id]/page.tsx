"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, PartyPopper } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import confetti from "canvas-confetti"

// Mock event data
const mockEvent = {
  id: "1",
  name: "Summer Party",
  date: "July 15, 2024",
  time: "6:00 PM",
  location: "Sunset Beach",
  description:
    "Join us for a fun summer party at Sunset Beach! We'll have food, drinks, music, and games. Don't forget to bring your swimsuit!",
  coverImage: "/placeholder.svg?height=300&width=800",
  host: "John Doe",
}

export default function RSVPPage({ params }: { params: { id: string } }) {
  const [event, setEvent] = useState(mockEvent)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    status: "yes",
    note: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleStatusChange = (value: string) => {
    setFormData((prev) => ({ ...prev, status: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsLoading(false)
    setIsSubmitted(true)

    if (formData.status === "yes") {
      // Trigger confetti animation
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      })
    }

    toast({
      title: "RSVP submitted!",
      description: "Your response has been recorded.",
    })
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-background to-muted/50">
      <div className="container flex flex-1 flex-col items-center justify-center py-12">
        <div className="w-full max-w-md">
          <div className="mb-8 flex items-center justify-center gap-2">
            <PartyPopper className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold">EventWorld</span>
          </div>

          {isSubmitted ? (
            <div className="rounded-lg border bg-background p-8 text-center shadow-lg">
              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 mx-auto">
                {formData.status === "yes" ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary"
                  >
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                ) : formData.status === "no" ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-destructive"
                  >
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                    <path d="m15 9-6 6" />
                    <path d="m9 9 6 6" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-amber-500"
                  >
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                    <path d="M12 16v.01" />
                    <path d="M12 8v4" />
                  </svg>
                )}
              </div>
              <h1 className="mb-2 text-2xl font-bold">Thank You!</h1>
              <p className="mb-6 text-muted-foreground">
                {formData.status === "yes"
                  ? "We're excited to see you at the event!"
                  : formData.status === "no"
                    ? "We're sorry you can't make it. Maybe next time!"
                    : "We hope you can make a decision soon!"}
              </p>
              <div className="rounded-lg border p-4 mb-6">
                <h2 className="font-semibold">{event.name}</h2>
                <div className="mt-2 flex flex-col gap-1 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4" />
                    <span>
                      {event.date} • {event.time}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="mr-2 h-4 w-4" />
                    <span>{event.location}</span>
                  </div>
                </div>
              </div>
              <Button onClick={() => setIsSubmitted(false)} variant="outline">
                Change Response
              </Button>
            </div>
          ) : (
            <div className="rounded-lg border bg-background shadow-lg">
              <div className="relative h-40 w-full overflow-hidden rounded-t-lg">
                <img
                  src={event.coverImage || "/placeholder.svg"}
                  alt={event.name}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h1 className="text-2xl font-bold text-white">{event.name}</h1>
                  <p className="text-sm text-white/80">Hosted by {event.host}</p>
                </div>
              </div>

              <div className="p-6">
                <div className="mb-6 rounded-lg border p-4">
                  <div className="flex flex-col gap-2 text-sm">
                    <div className="flex items-center">
                      <Calendar className="mr-2 h-4 w-4 text-primary" />
                      <span>
                        {event.date} • {event.time}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="mr-2 h-4 w-4 text-primary" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                  <div className="mt-4 text-sm text-muted-foreground">{event.description}</div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Your Name</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="John Doe"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="john@example.com"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Will you attend?</Label>
                      <RadioGroup value={formData.status} onValueChange={handleStatusChange} className="flex gap-4">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="yes" id="yes" />
                          <Label htmlFor="yes" className="cursor-pointer">
                            Yes
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no" id="no" />
                          <Label htmlFor="no" className="cursor-pointer">
                            No
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="maybe" id="maybe" />
                          <Label htmlFor="maybe" className="cursor-pointer">
                            Maybe
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="note">Note (Optional)</Label>
                      <Textarea
                        id="note"
                        name="note"
                        placeholder="Any dietary restrictions or other information?"
                        value={formData.note}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Submitting..." : "Submit RSVP"}
                  </Button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
