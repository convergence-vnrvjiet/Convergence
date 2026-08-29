"use client"

import { MobileNav } from "@/components/mobile-nav"
import { useActiveSection } from "@/hooks/use-active-section"
import { cn } from "@/lib/utils"

const NAV_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "Events", href: "#events" },
  { label: "Themes", href: "#themes" },
  { label: "Organised By", href: "#clubs" },
  { label: "Contact", href: "#contact" },
]

export function SiteHeader() {
  const activeHref = useActiveSection(NAV_ITEMS.map((item) => item.href))

  return (
    <header className="sticky top-0 z-50 border-b border-black/20 bg-red-700">
      <div className="relative mx-auto flex h-20 w-full max-w-[1332px] items-center justify-between">
        <a href="#home" className="flex items-center">
          <span
            className="h-8 w-8 shrink-0 bg-[#ede1c5]"
            style={{
              WebkitMaskImage: "url(/logo-atom.png)",
              maskImage: "url(/logo-atom.png)",
              maskMode: "luminance",
              WebkitMaskSize: "contain",
              maskSize: "contain",
              WebkitMaskRepeat: "no-repeat",
              maskRepeat: "no-repeat",
              WebkitMaskPosition: "center",
              maskPosition: "center",
            }}
          />
        </a>

        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 font-tagline text-sm font-black! tracking-[0.2em] text-[#ede1c5] lowercase md:flex">
          {NAV_ITEMS.map((item) => {
            const isActive = activeHref === item.href
            return (
              <a
                key={item.href}
                href={item.href}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "relative pb-1 transition-opacity",
                  isActive ? "opacity-100" : "opacity-70 hover:opacity-100"
                )}
              >
                {item.label}
                <span
                  className={cn(
                    "absolute inset-x-0 -bottom-px h-px bg-[#ede1c5] transition-opacity",
                    isActive ? "opacity-100" : "opacity-0"
                  )}
                />
              </a>
            )
          })}
        </nav>

        <MobileNav items={NAV_ITEMS} activeHref={activeHref} />
      </div>
    </header>
  )
}
