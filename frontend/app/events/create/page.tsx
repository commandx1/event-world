"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon, ChevronLeft, PartyPopper, Upload } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { useToast } from "@/hooks/use-toast"
import { Switch } from "@/components/ui/switch"

export default function CreateEventPage() {
  const [formData, setFormData] = useState({
    name: "",
    date: undefined as Date | undefined,
    time: "",
    location: "",
    description: "",
    type: "",
    isPrivate: false,
    coverImage: null as File | null,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const router = useRouter()
  const { toast } = useToast()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleDateChange = (date: Date | undefined) => {
    setFormData((prev) => ({ ...prev, date }))
  }

  const handleSwitchChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, isPrivate: checked }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setFormData((prev) => ({ ...prev, coverImage: file }))

    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string)
      }
      reader.readAsDataURL(file)
    } else {
      setPreviewUrl(null)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: "Event created!",
      description: "Your event has been created successfully.",
    })

    setIsLoading(false)
    router.push("/dashboard")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <PartyPopper className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">EventWorld</span>
          </div>
        </div>
      </header>
      <main className="flex-1 bg-muted/30">
        <div className="container py-8">
          <div className="mb-8">
            <Link
              href="/dashboard"
              className="mb-4 inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              <ChevronLeft className="mr-1 h-4 w-4" />
              Back to Dashboard
            </Link>
            <h1 className="text-3xl font-bold">Create New Event</h1>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
            <div className="space-y-6 rounded-lg border bg-background p-6 shadow-sm">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Event Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Summer Party"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="date">Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !formData.date && "text-muted-foreground",
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {formData.date ? format(formData.date, "PPP") : "Select date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar mode="single" selected={formData.date} onSelect={handleDateChange} initialFocus />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="time">Time</Label>
                      <Input
                        id="time"
                        name="time"
                        type="time"
                        required
                        value={formData.time}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      name="location"
                      placeholder="Sunset Beach"
                      required
                      value={formData.location}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      placeholder="Tell your guests what to expect..."
                      rows={4}
                      value={formData.description}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="type">Event Type</Label>
                    <Select value={formData.type} onValueChange={(value) => handleSelectChange("type", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select event type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="birthday">Birthday</SelectItem>
                        <SelectItem value="wedding">Wedding</SelectItem>
                        <SelectItem value="business">Business</SelectItem>
                        <SelectItem value="social">Social Gathering</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="coverImage">Cover Image</Label>
                    <div className="flex items-center gap-4">
                      <Label
                        htmlFor="coverImage"
                        className="flex h-32 w-32 cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed bg-muted/50 hover:bg-muted"
                      >
                        {previewUrl ? (
                          <img
                            src={previewUrl || "/placeholder.svg"}
                            alt="Cover preview"
                            className="h-full w-full rounded-lg object-cover"
                          />
                        ) : (
                          <>
                            <Upload className="mb-2 h-8 w-8 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">Upload image</span>
                          </>
                        )}
                        <Input
                          id="coverImage"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageChange}
                        />
                      </Label>
                      <div className="text-sm text-muted-foreground">
                        <p>Recommended size: 1200 x 600 pixels</p>
                        <p>Max file size: 5MB</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch id="isPrivate" checked={formData.isPrivate} onCheckedChange={handleSwitchChange} />
                    <Label htmlFor="isPrivate">Make this event private</Label>
                  </div>
                </div>

                <div className="flex justify-end gap-4">
                  <Link href="/dashboard">
                    <Button variant="outline" type="button">
                      Cancel
                    </Button>
                  </Link>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Creating..." : "Create Event"}
                  </Button>
                </div>
              </form>
            </div>

            <div className="space-y-6">
              <div className="rounded-lg border bg-background p-6 shadow-sm">
                <h2 className="mb-4 text-xl font-semibold">Event Preview</h2>
                <div className="overflow-hidden rounded-lg border">
                  <div className="relative h-40 w-full overflow-hidden bg-muted">
                    {previewUrl ? (
                      <img
                        src={previewUrl || "/placeholder.svg"}
                        alt="Cover preview"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-muted">
                        <span className="text-sm text-muted-foreground">No cover image</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-xl font-bold text-white">{formData.name || "Event Name"}</h3>
                      <div className="flex items-center text-sm text-white/90">
                        <CalendarIcon className="mr-1 h-4 w-4" />
                        <span>
                          {formData.date ? format(formData.date, "PPP") : "Date"} • {formData.time || "Time"}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="mb-2 text-sm text-muted-foreground">{formData.location || "Location"}</div>
                    <p className="text-sm">{formData.description || "Event description will appear here..."}</p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border bg-background p-6 shadow-sm">
                <h2 className="mb-4 text-xl font-semibold">Tips</h2>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary">
                      1
                    </span>
                    <span>Add a descriptive name that tells guests what the event is about.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary">
                      2
                    </span>
                    <span>Include clear location details so guests know where to go.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary">
                      3
                    </span>
                    <span>Upload an eye-catching cover image to make your event stand out.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary">
                      4
                    </span>
                    <span>Provide a detailed description with any important information.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
