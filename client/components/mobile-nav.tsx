"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Menu, X } from "lucide-react"

import { cn } from "@/lib/utils"

function MobileNav({
  items,
  activeHref,
}: {
  items: { label: string; href: string }[]
  activeHref: string
}) {
  const [open, setOpen] = useState(false)

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex h-8 w-8 items-center justify-center text-foreground"
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute inset-x-0 top-full flex flex-col border-b border-border bg-background font-tagline text-base font-medium! tracking-[0.2em] lowercase"
          >
            {items.map((item) => {
              const isActive = activeHref === item.href
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "flex items-center gap-3 border-b border-border px-6 py-4 last:border-b-0",
                    isActive ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  <span
                    className={cn("h-1.5 w-1.5 shrink-0", isActive ? "bg-primary" : "bg-muted-foreground/40")}
                  />
                  {item.label}
                </a>
              )
            })}
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  )
}

export { MobileNav }
