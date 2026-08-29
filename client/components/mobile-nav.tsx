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
        className="flex h-8 w-8 items-center justify-center text-[#ede1c5]"
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
            className="absolute inset-x-0 top-full flex flex-col border-b border-black/20 bg-red-700 font-tagline text-base font-black! tracking-[0.2em] text-[#ede1c5] lowercase"
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
                    "flex items-center gap-3 border-b border-black/20 px-6 py-4 transition-opacity last:border-b-0",
                    isActive ? "opacity-100" : "opacity-70"
                  )}
                >
                  <span
                    className={cn("h-1.5 w-1.5 shrink-0 bg-[#ede1c5]", isActive ? "opacity-100" : "opacity-40")}
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
