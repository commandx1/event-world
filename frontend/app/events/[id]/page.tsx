"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Calendar, ChevronLeft, Copy, Edit, MapPin, PartyPopper, Share2, Users } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

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
  isPrivate: false,
  type: "social",
  guests: [
    { id: "1", name: "John Smith", email: "john@example.com", status: "confirmed", note: "I'll bring some snacks!" },
    { id: "2", name: "Sarah Johnson", email: "sarah@example.com", status: "confirmed", note: "" },
    { id: "3", name: "Michael Brown", email: "michael@example.com", status: "pending", note: "" },
    {
      id: "4",
      name: "Emily Davis",
      email: "emily@example.com",
      status: "declined",
      note: "Sorry, I have another event that day.",
    },
    { id: "5", name: "David Wilson", email: "david@example.com", status: "confirmed", note: "" },
    { id: "6", name: "Jessica Taylor", email: "jessica@example.com", status: "pending", note: "" },
    {
      id: "7",
      name: "Robert Martinez",
      email: "robert@example.com",
      status: "confirmed",
      note: "Looking forward to it!",
    },
    {
      id: "8",
      name: "Jennifer Anderson",
      email: "jennifer@example.com",
      status: "declined",
      note: "I'll be out of town.",
    },
  ],
}

export default function EventPage({ params }: { params: { id: string } }) {
  const [event, setEvent] = useState(mockEvent)
  const [inviteEmail, setInviteEmail] = useState("")
  const [filter, setFilter] = useState("all")
  const router = useRouter()
  const { toast } = useToast()

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://EventWorld.example/rsvp/${event.id}`)
    toast({
      title: "Link copied!",
      description: "The RSVP link has been copied to your clipboard.",
    })
  }

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Invitation sent!",
      description: `An invitation has been sent to ${inviteEmail}.`,
    })
    setInviteEmail("")
  }

  const filteredGuests = event.guests.filter((guest) => {
    if (filter === "all") return true
    return guest.status === filter
  })

  const stats = {
    confirmed: event.guests.filter((g) => g.status === "confirmed").length,
    pending: event.guests.filter((g) => g.status === "pending").length,
    declined: event.guests.filter((g) => g.status === "declined").length,
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
        <div className="relative h-64 w-full overflow-hidden bg-muted md:h-80">
          <img src={event.coverImage || "/placeholder.svg"} alt={event.name} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="container">
              <Link
                href="/dashboard"
                className="mb-4 inline-flex items-center text-sm font-medium text-white/80 hover:text-white"
              >
                <ChevronLeft className="mr-1 h-4 w-4" />
                Back to Dashboard
              </Link>
              <h1 className="text-3xl font-bold text-white md:text-4xl">{event.name}</h1>
              <div className="mt-2 flex flex-wrap items-center gap-4 text-white/90">
                <div className="flex items-center">
                  <Calendar className="mr-1 h-4 w-4" />
                  <span>
                    {event.date} • {event.time}
                  </span>
                </div>
                <div className="flex items-center">
                  <MapPin className="mr-1 h-4 w-4" />
                  <span>{event.location}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container py-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
            <div className="space-y-8">
              <div className="rounded-lg border bg-background p-6 shadow-sm">
                <h2 className="mb-4 text-xl font-semibold">About this event</h2>
                <p className="whitespace-pre-line text-muted-foreground">{event.description}</p>
              </div>

              <div className="rounded-lg border bg-background p-6 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Guest List</h2>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm">
                        <Users className="mr-2 h-4 w-4" /> Invite Guests
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Invite Guests</DialogTitle>
                        <DialogDescription>
                          Send an invitation email or share the event link with your guests.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <form onSubmit={handleInvite} className="flex items-end gap-2">
                          <div className="flex-1 space-y-2">
                            <Label htmlFor="email">Email address</Label>
                            <Input
                              id="email"
                              type="email"
                              placeholder="guest@example.com"
                              value={inviteEmail}
                              onChange={(e) => setInviteEmail(e.target.value)}
                              required
                            />
                          </div>
                          <Button type="submit">Invite</Button>
                        </form>
                        <div className="space-y-2">
                          <Label>Or share this link</Label>
                          <div className="flex items-center gap-2">
                            <Input readOnly value={`https://EventWorld.example/rsvp/${event.id}`} />
                            <Button variant="outline" size="icon" onClick={handleCopyLink}>
                              <Copy className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={handleCopyLink}>
                          <Copy className="mr-2 h-4 w-4" /> Copy Link
                        </Button>
                        <Button>
                          <Share2 className="mr-2 h-4 w-4" /> Share
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>

                <Tabs defaultValue="all" className="w-full">
                  <TabsList className="mb-4 grid w-full grid-cols-4">
                    <TabsTrigger value="all" onClick={() => setFilter("all")}>
                      All ({event.guests.length})
                    </TabsTrigger>
                    <TabsTrigger value="confirmed" onClick={() => setFilter("confirmed")}>
                      Confirmed ({stats.confirmed})
                    </TabsTrigger>
                    <TabsTrigger value="pending" onClick={() => setFilter("pending")}>
                      Pending ({stats.pending})
                    </TabsTrigger>
                    <TabsTrigger value="declined" onClick={() => setFilter("declined")}>
                      Declined ({stats.declined})
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="all" className="mt-0">
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Note</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredGuests.length === 0 ? (
                            <TableRow>
                              <TableCell colSpan={4} className="text-center">
                                No guests found
                              </TableCell>
                            </TableRow>
                          ) : (
                            filteredGuests.map((guest) => (
                              <TableRow key={guest.id}>
                                <TableCell>{guest.name}</TableCell>
                                <TableCell>{guest.email}</TableCell>
                                <TableCell>
                                  <Badge
                                    variant={
                                      guest.status === "confirmed"
                                        ? "default"
                                        : guest.status === "pending"
                                          ? "outline"
                                          : "destructive"
                                    }
                                  >
                                    {guest.status.charAt(0).toUpperCase() + guest.status.slice(1)}
                                  </Badge>
                                </TableCell>
                                <TableCell className="max-w-[200px] truncate">{guest.note || "-"}</TableCell>
                              </TableRow>
                            ))
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  </TabsContent>
                  <TabsContent value="confirmed" className="mt-0">
                    {/* Same table structure as above, but filtered */}
                  </TabsContent>
                  <TabsContent value="pending" className="mt-0">
                    {/* Same table structure as above, but filtered */}
                  </TabsContent>
                  <TabsContent value="declined" className="mt-0">
                    {/* Same table structure as above, but filtered */}
                  </TabsContent>
                </Tabs>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-lg border bg-background p-6 shadow-sm">
                <h2 className="mb-4 text-xl font-semibold">Event Details</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Date & Time</h3>
                    <p className="flex items-center">
                      <Calendar className="mr-2 h-4 w-4 text-primary" />
                      {event.date} • {event.time}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Location</h3>
                    <p className="flex items-center">
                      <MapPin className="mr-2 h-4 w-4 text-primary" />
                      {event.location}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Privacy</h3>
                    <p className="flex items-center">{event.isPrivate ? "Private event" : "Public event"}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Event Type</h3>
                    <p className="capitalize">{event.type}</p>
                  </div>
                </div>
                <div className="mt-6 flex flex-col gap-2">
                  <Button variant="outline" className="w-full justify-start">
                    <Edit className="mr-2 h-4 w-4" /> Edit Event
                  </Button>
                  <Button variant="outline" className="w-full justify-start" onClick={handleCopyLink}>
                    <Copy className="mr-2 h-4 w-4" /> Copy RSVP Link
                  </Button>
                </div>
              </div>

              <div className="rounded-lg border bg-background p-6 shadow-sm">
                <h2 className="mb-4 text-xl font-semibold">RSVP Summary</h2>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="rounded-lg bg-muted p-3">
                    <div className="text-2xl font-bold text-green-500">{stats.confirmed}</div>
                    <div className="text-xs text-muted-foreground">Confirmed</div>
                  </div>
                  <div className="rounded-lg bg-muted p-3">
                    <div className="text-2xl font-bold text-amber-500">{stats.pending}</div>
                    <div className="text-xs text-muted-foreground">Pending</div>
                  </div>
                  <div className="rounded-lg bg-muted p-3">
                    <div className="text-2xl font-bold text-red-500">{stats.declined}</div>
                    <div className="text-xs text-muted-foreground">Declined</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
