const NAV_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Events", href: "#events" },
  { label: "Themes", href: "#themes" },
  { label: "Organised By", href: "#clubs" },
  { label: "Contact", href: "#contact" },
]

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
    <div className="flex flex-col items-center gap-2 border border-gray-300 p-6 text-center">
      <div className="h-14 w-14 rounded-full border border-gray-400" />
      <p className="text-sm font-medium">{name}</p>
      <p className="text-xs text-gray-500">{role}</p>
      <p className="text-xs text-gray-500">{phone}</p>
    </div>
  )
}

export default function Page() {
  return (
    <div className="min-h-screen bg-white text-black">
      <header className="sticky top-0 z-10 border-b border-gray-300 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 border border-gray-400" />
            <span className="text-sm font-semibold tracking-wide">CONVERGENCE 2K26</span>
          </div>
          <nav className="hidden gap-6 text-sm text-gray-600 md:flex">
            {NAV_ITEMS.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main>
        <section
          id="home"
          className="flex min-h-[85vh] flex-col items-center justify-center gap-6 border-b border-gray-300 px-6 text-center"
        >
          <div className="border border-gray-300 px-4 py-2 text-xs uppercase tracking-widest text-gray-500">
            Hero Video Placeholder
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">CONVERGENCE 2K26</h1>
          <p className="max-w-xl text-sm text-gray-600 sm:text-base">
            [Event tagline placeholder — the ultimate celebration of tech, creativity and collaboration.]
          </p>
          <div className="flex gap-4">
            <button className="border border-black px-6 py-3 text-sm font-medium">Register Now</button>
            <button className="border border-gray-400 px-6 py-3 text-sm font-medium">Learn More</button>
          </div>
        </section>

        <section id="about" className="border-b border-gray-300">
          <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 md:grid-cols-2 md:items-center">
            <div>
              <h2 className="mb-6 text-3xl font-bold">About</h2>
              <div className="space-y-4 text-sm leading-relaxed text-gray-600">
                <p>[Paragraph placeholder — event history and background copy goes here.]</p>
                <p>[Paragraph placeholder — describes this year&apos;s edition and format.]</p>
                <p>[Paragraph placeholder — legacy details, dates, and highlights.]</p>
              </div>
            </div>
            <div className="flex aspect-square items-center justify-center border border-gray-300 text-sm text-gray-400">
              Globe Visual Placeholder
            </div>
          </div>
        </section>

        <section id="events" className="border-b border-gray-300">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <h2 className="mb-8 text-center text-3xl font-bold">Events</h2>
            <div className="flex flex-col border border-gray-300 md:flex-row">
              <div className="border-b border-gray-300 p-6 md:w-1/3 md:border-b-0 md:border-r">
                <p className="mb-4 text-xs uppercase tracking-widest text-gray-500">Categories</p>
                <ul className="space-y-3 text-sm">
                  {EVENT_CATEGORIES.map((category) => (
                    <li
                      key={category}
                      className="flex items-center justify-between border border-gray-300 px-3 py-2"
                    >
                      <span>{category}</span>
                      <span className="h-4 w-8 border border-gray-400" />
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex-1 p-6">
                <p className="mb-4 text-xs uppercase tracking-widest text-gray-500">
                  Selected Category Events
                </p>
                <div className="grid gap-4 sm:grid-cols-2">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="space-y-2 border border-gray-300 p-4">
                      <div className="h-3 w-2/3 bg-gray-200" />
                      <div className="h-2 w-full bg-gray-100" />
                      <div className="h-2 w-1/2 bg-gray-100" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="themes" className="border-b border-gray-300">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <h2 className="mb-2 text-center text-3xl font-bold">Themes</h2>
            <p className="mb-10 text-center text-sm text-gray-500">
              Explore the tracks for this year&apos;s edition
            </p>
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
              {THEMES.map((theme) => (
                <div key={theme} className="border border-gray-300">
                  <div className="flex aspect-video items-center justify-center border-b border-gray-300 text-xs text-gray-400">
                    Image
                  </div>
                  <div className="p-3 text-sm font-medium">{theme}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="clubs" className="border-b border-gray-300">
          <div className="mx-auto max-w-6xl px-6 py-20 text-center">
            <h2 className="mb-2 text-3xl font-bold">Organised By</h2>
            <p className="mx-auto mb-10 max-w-xl text-sm text-gray-500">
              [Placeholder — brought to you by student clubs and technical societies working together.]
            </p>
            <div className="grid grid-cols-4 gap-4 sm:grid-cols-6 md:grid-cols-8">
              {Array.from({ length: 16 }).map((_, i) => (
                <div
                  key={i}
                  className="flex aspect-square items-center justify-center border border-gray-300 text-[10px] text-gray-400"
                >
                  Logo
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="border-b border-gray-300">
          <div className="mx-auto max-w-6xl space-y-16 px-6 py-20">
            <div>
              <h2 className="mb-2 text-center text-3xl font-bold">Faculty Coordinators</h2>
              <p className="mb-8 text-center text-sm text-gray-500">
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
              <p className="mb-8 text-center text-sm text-gray-500">
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
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 py-10 text-sm text-gray-600">
          <p>Follow us on social media</p>
          <div className="flex flex-wrap justify-center gap-8">
            <span className="border border-gray-300 px-3 py-1">Instagram</span>
            <span className="border border-gray-300 px-3 py-1">LinkedIn</span>
            <span className="border border-gray-300 px-3 py-1">Linktree</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
