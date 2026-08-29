"use client"

import { useEffect, useState } from "react"
// Adjust the import path if your apis folder is located differently relative to page.tsx
import { eventsApi } from "@/apis/events" 

import { Hero } from "@/components/hero"
import { Logos } from "@/components/logos"
import { SiteHeader } from "@/components/site-header"

interface EventData {
  eventId: string;
  name: string;
  description: string;
  category: string;
  registered: boolean;
}

const EVENT_CATEGORIES = ["Technical", "Workshops", "Gaming", "Cultural", "Sports", "Hackathon"]

const THEMES = [
  "Robotics & Automation",
  "HealthcareTech & Wellness",
  "Mobility & Logistics",
  "Green Technologies",
  "Enterprise & Fintech",
  "Design & Manufacturing",
  "Smart Living",
  "Tech for Social Good",
]

const FACULTY_COORDINATORS = [
  { name: "[Name]", role: "[Department]", phone: "[Phone number]" },
  { name: "[Name]", role: "[Department]", phone: "[Phone number]" },
  { name: "[Name]", role: "[Department]", phone: "[Phone number]" },
]

const EVENT_COORDINATORS = [
  { name: "[Name]", role: "[Event Coordinator]", phone: "[Phone number]" },
  { name: "[Name]", role: "[Event Coordinator]", phone: "[Phone number]" },
  { name: "[Name]", role: "[Event Coordinator]", phone: "[Phone number]" },
]

function ContactCard({ name, role, phone }: { name: string; role: string; phone: string }) {
  return (
    <div className="flex flex-col items-center gap-2 border border-border p-6 text-center">
      <div className="h-14 w-14 rounded-full border border-border" />
      <p className="text-sm font-medium">{name}</p>
      <p className="text-xs text-muted-foreground">{role}</p>
      <p className="text-xs text-muted-foreground">{phone}</p>
    </div>
  )
}

export default function Page() {
  const [events, setEvents] = useState<EventData[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await eventsApi.getEvents()
        setEvents(response.events || [])
      } catch (error) {
        console.error("API Error (Events):", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchEvents()
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <main>
        <Hero />

        <section id="events" className="border-b border-border">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <h2 className="mb-8 text-center text-3xl font-bold">Events</h2>
            <div className="flex flex-col border border-border md:flex-row">
              <div className="border-b border-border p-6 md:w-1/3 md:border-b-0 md:border-r">
                <p className="mb-4 text-xs uppercase tracking-widest text-muted-foreground">Categories</p>
                <ul className="space-y-3 text-sm">
                  {EVENT_CATEGORIES.map((category) => (
                    <li
                      key={category}
                      className="flex items-center justify-between border border-border px-3 py-2"
                    >
                      <span>{category}</span>
                      <span className="h-4 w-8 border border-border" />
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex-1 p-6">
                <p className="mb-4 text-xs uppercase tracking-widest text-muted-foreground">
                  Selected Category Events
                </p>
                <div className="grid gap-4 sm:grid-cols-2">
                  {isLoading ? (
                    /* Keep existing skeleton for loading state */
                    Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} className="space-y-2 border border-border p-4">
                        <div className="h-3 w-2/3 bg-muted" />
                        <div className="h-2 w-full bg-muted" />
                        <div className="h-2 w-1/2 bg-muted" />
                      </div>
                    ))
                  ) : events.length > 0 ? (
                    /* Map actual events */
                    events.map((event) => (
                      <div key={event.eventId} className="flex flex-col space-y-2 border border-border p-4">
                        <h3 className="font-bold text-lg">{event.name}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">{event.description}</p>
                        <div className="mt-auto flex items-center justify-between pt-4">
                          <span className="text-xs uppercase tracking-widest text-muted-foreground border border-border px-2 py-1">
                            {event.category}
                          </span>
                          {event.registered && (
                            <span className="text-xs font-semibold uppercase text-green-500">
                              Registered
                            </span>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground col-span-2">No events found.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="themes" className="border-b border-border">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <h2 className="mb-2 text-center text-3xl font-bold">Themes</h2>
            <p className="mb-10 text-center text-sm text-muted-foreground">
              Explore the tracks for this year&apos;s edition
            </p>
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
              {THEMES.map((theme) => (
                <div key={theme} className="border border-border">
                  <div className="flex aspect-video items-center justify-center border-b border-border text-xs text-muted-foreground">
                    Image
                  </div>
                  <div className="p-3 text-sm font-medium">{theme}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="clubs" className="border-b border-border">
          <div className="mx-auto max-w-6xl px-6 py-20 text-center">
            <h2 className="mb-2 text-3xl font-bold">Organised By</h2>
            <p className="mx-auto mb-10 max-w-xl text-sm text-muted-foreground">
              [Placeholder — brought to you by student clubs and technical societies working together.]
            </p>
            <Logos />
          </div>
        </section>

        <section id="contact" className="border-b border-border">
          <div className="mx-auto max-w-6xl space-y-16 px-6 py-20">
            <div>
              <h2 className="mb-2 text-center text-3xl font-bold">Faculty Coordinators</h2>
              <p className="mb-8 text-center text-sm text-muted-foreground">
                [Placeholder — meet our dedicated faculty coordinators.]
              </p>
              <div className="grid gap-6 sm:grid-cols-3">
                {FACULTY_COORDINATORS.map((person, i) => (
                  <ContactCard key={i} {...person} />
                ))}
              </div>
            </div>
            <div>
              <h2 className="mb-2 text-center text-3xl font-bold">Contact Us</h2>
              <p className="mb-8 text-center text-sm text-muted-foreground">
                [Placeholder — get in touch with our team for any inquiries.]
              </p>
              <div className="grid gap-6 sm:grid-cols-3">
                {EVENT_COORDINATORS.map((person, i) => (
                  <ContactCard key={i} {...person} />
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 py-10 text-sm text-muted-foreground">
          <p>Follow us on social media</p>
          <div className="flex flex-wrap justify-center gap-8">
            <span className="border border-border px-3 py-1">Instagram</span>
            <span className="border border-border px-3 py-1">LinkedIn</span>
            <span className="border border-border px-3 py-1">Linktree</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
