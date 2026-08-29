"use client"

import { useEffect, useState } from "react"
// Adjust the import path if your apis folder is located differently relative to page.tsx
import { eventsApi } from "@/apis/events" 

import { Hero } from "@/components/hero"
import { Logos } from "@/components/logos"
import { SiteHeader } from "@/components/site-header"
import DomeGallery from "@/components/DomeGallery"

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

const CLUB_IMAGES = [
  { src: '/clubs/club-gdgc.png', alt: 'GDGC' },
  { src: '/clubs/club-01.png', alt: 'Club 1' },
  { src: '/clubs/club-02.png', alt: 'Club 2' },
  { src: '/clubs/club-03.png', alt: 'Club 3' },
  { src: '/clubs/club-04.png', alt: 'Club 4' },
  { src: '/clubs/club-05.png', alt: 'Club 5' },
  { src: '/clubs/club-06.png', alt: 'Club 6' },
  { src: '/clubs/club-07.png', alt: 'Club 7' },
  { src: '/clubs/club-09.png', alt: 'Club 9' },
  { src: '/clubs/club-10.png', alt: 'Club 10' },
  { src: '/clubs/club-11.png', alt: 'Club 11' },
  { src: '/clubs/club-12.png', alt: 'Club 12' },
  { src: '/clubs/club-13.png', alt: 'Club 13' },
  { src: '/clubs/club-14.png', alt: 'Club 14' },
  { src: '/clubs/club-15.png', alt: 'Club 15' },
  { src: '/clubs/club-16.png', alt: 'Club 16' },
  { src: '/clubs/club-17.png', alt: 'Club 17' },
  { src: '/clubs/club-18.png', alt: 'Club 18' },
  { src: '/clubs/club-19.png', alt: 'Club 19' },
  { src: '/clubs/club-20.png', alt: 'Club 20' },
  { src: '/clubs/club-21.png', alt: 'Club 21' },
  { src: '/clubs/club-22.png', alt: 'Club 22' },
  { src: '/clubs/club-23.png', alt: 'Club 23' },
  { src: '/clubs/club-24.png', alt: 'Club 24' },
  { src: '/clubs/club-25.png', alt: 'Club 25' },
  { src: '/clubs/club-26.png', alt: 'Club 26' },
  { src: '/clubs/club-27.png', alt: 'Club 27' },
  { src: '/clubs/club-28.png', alt: 'Club 28' },
  { src: '/clubs/club-29.png', alt: 'Club 29' },
  { src: '/clubs/club-30.png', alt: 'Club 30' },
  { src: '/clubs/club-31.png', alt: 'Club 31' },
  { src: '/clubs/club-32.png', alt: 'Club 32' },
  { src: '/clubs/club-33.png', alt: 'Club 33' },
  { src: '/clubs/club-34.png', alt: 'Club 34' },
  { src: '/clubs/club-35.png', alt: 'Club 35' },
  { src: '/clubs/club-36.png', alt: 'Club 36' },
  { src: '/clubs/club-37.png', alt: 'Club 37' },
  { src: '/clubs/club-38.png', alt: 'Club 38' },
  { src: '/clubs/club-39.png', alt: 'Club 39' },
  { src: '/clubs/club-40.png', alt: 'Club 40' },
  { src: '/clubs/club-41.png', alt: 'Club 41' },
  { src: '/clubs/club-42.png', alt: 'Club 42' },
  { src: '/clubs/club-43.png', alt: 'Club 43' },
  { src: '/clubs/club-44.png', alt: 'Club 44' },
  { src: '/clubs/club-45.png', alt: 'Club 45' },
  { src: '/clubs/club-46.png', alt: 'Club 46' },
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
            <Logos count={0} />
            <div className="mt-12 w-full" style={{ height: '400px' }}>
              <DomeGallery
                images={CLUB_IMAGES}
                fit={0.6}
                fitBasis="auto"
                minRadius={500}
                maxRadius={800}
                overlayBlurColor="#000000"
                imageBorderRadius="20px"
                openedImageBorderRadius="20px"
                openedImageWidth="500px"
                openedImageHeight="500px"
                grayscale={false}
                dragSensitivity={18}
                maxVerticalRotationDeg={8}
                segments={35}
                dragDampening={2}
                hideOverlays={true}
              />
            </div>
            <p className="mt-6 text-center text-sm text-muted-foreground">
              Drag to explore • Click to enlarge
            </p>
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
