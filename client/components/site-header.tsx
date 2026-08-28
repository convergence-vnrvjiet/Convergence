"use client"

import Image from "next/image"

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
    <header className="sticky top-0 z-50 border-b border-border bg-background">
      <div className="relative flex h-20 items-center justify-between px-3 sm:px-4">
        <a href="#home" className="flex items-center gap-2">
          <span className="relative h-5 w-5 shrink-0">
            <Image src="/logo-atom.png" alt="" fill className="object-contain" />
          </span>
          <span className="flex items-baseline gap-1.5 font-tagline text-base font-medium! tracking-[0.2em] text-foreground uppercase">
            Convergence
            <span className="text-xs text-primary">2K26</span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 font-tagline text-sm font-medium! tracking-[0.2em] lowercase md:flex">
          {NAV_ITEMS.map((item) => {
            const isActive = activeHref === item.href
            return (
              <a
                key={item.href}
                href={item.href}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "relative pb-1 transition-colors",
                  isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {item.label}
                <span
                  className={cn(
                    "absolute inset-x-0 -bottom-px h-px bg-primary transition-opacity",
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
