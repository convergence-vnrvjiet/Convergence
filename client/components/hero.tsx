"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Crosshair, Globe } from "lucide-react"

import { Button } from "@/components/ui/button"

const BARCODE_BARS = [2, 1, 3, 1, 1, 2, 1, 3, 2, 1, 1, 2, 3, 1, 2]

function Frame() {
  return (
    <>
      <div className="pointer-events-none absolute inset-3 border border-white/15 sm:inset-4" />
      <Crosshair className="pointer-events-none absolute top-1.5 left-1.5 h-4 w-4 text-muted-foreground/60 sm:top-2.5 sm:left-2.5" />
      <Crosshair className="pointer-events-none absolute top-1.5 right-1.5 h-4 w-4 text-muted-foreground/60 sm:top-2.5 sm:right-2.5" />
      <Crosshair className="pointer-events-none absolute bottom-1.5 left-1.5 h-4 w-4 text-muted-foreground/60 sm:bottom-2.5 sm:left-2.5" />
      <Crosshair className="pointer-events-none absolute right-1.5 bottom-1.5 h-4 w-4 text-muted-foreground/60 sm:right-2.5 sm:bottom-2.5" />
    </>
  )
}

function EyebrowBar() {
  return (
    <div className="relative flex w-full items-center justify-between px-6 text-[10px] uppercase tracking-[0.25em] text-muted-foreground sm:px-8 sm:text-xs">
      <div className="flex items-center gap-2">
        <span className="h-2 w-2 bg-primary" />
        <span>Tech × Creativity × Collaboration</span>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex h-3.5 items-end gap-[1.5px]">
          {BARCODE_BARS.map((w, i) => (
            <span key={i} className="bg-muted-foreground/60" style={{ width: 1.5, height: `${w * 4}px` }} />
          ))}
        </div>
        <span>Est. 2026</span>
        <Globe className="h-3.5 w-3.5" />
      </div>
    </div>
  )
}

function YearChip() {
  return (
    <div className="relative inline-flex flex-col items-center px-3 py-1.5">
      <span className="absolute top-0 left-0 h-2.5 w-2.5 border-t border-l border-muted-foreground/50" />
      <span className="absolute top-0 right-0 h-2.5 w-2.5 border-t border-r border-muted-foreground/50" />
      <span className="absolute bottom-0 left-0 h-2.5 w-2.5 border-b border-l border-muted-foreground/50" />
      <span className="absolute right-0 bottom-0 h-2.5 w-2.5 border-r border-b border-muted-foreground/50" />
      <span className="text-lg tracking-[0.2em] text-muted-foreground sm:text-2xl">2K26</span>
      <div className="mt-1 flex gap-[3px]">
        {Array.from({ length: 8 }).map((_, i) => (
          <span key={i} className="h-[3px] w-[3px] bg-muted-foreground/40" />
        ))}
      </div>
    </div>
  )
}

function LeftRail() {
  return (
    <div className="pointer-events-none absolute top-1/2 left-6 hidden -translate-y-[46%] flex-col items-start gap-5 text-left xl:left-10 xl:flex">
      <div className="-rotate-6 border border-dashed border-black/30 bg-[#ede1c5] px-4 py-2.5 shadow-lg">
        <div className="text-[11px] font-bold tracking-[0.15em] text-stone-800">IDEAS</div>
        <div className="text-[11px] font-bold tracking-[0.15em] text-stone-800">CODE</div>
        <div className="flex items-center gap-1.5 text-[11px] font-bold tracking-[0.15em] text-stone-800">
          IMPACT
          <Globe className="h-3 w-3 text-primary" />
        </div>
      </div>

      <div>
        <p className="max-w-[200px] font-display text-lg leading-tight text-[#ede1c5] uppercase">
          Where minds converge and{" "}
          <span className="text-primary">ideas emerge.</span>
        </p>
        <div className="mt-2 flex gap-1 text-xs text-primary">
          <span>▶</span>
          <span>▶</span>
          <span>▶</span>
          <span>▶</span>
        </div>
      </div>

      <div className="absolute -bottom-24 left-0 flex flex-col items-start gap-2">
        <div className="flex h-3 items-end gap-[1.5px]">
          {BARCODE_BARS.map((w, i) => (
            <span key={i} className="bg-muted-foreground/50" style={{ width: 1.5, height: `${w * 3}px` }} />
          ))}
        </div>
      </div>
    </div>
  )
}

function RightRail() {
  return (
    <div className="pointer-events-none absolute top-32 right-6 hidden flex-col items-end gap-3 text-right sm:top-40 xl:right-10 xl:flex">
      <span className="text-[10px] tracking-[0.25em] text-muted-foreground uppercase">// Tech Fest</span>

      <div className="font-display text-base leading-tight text-foreground uppercase">
        VNRVJIET
        <br />
        Hyderabad
      </div>

      <span className="h-px w-16 bg-border" />

      <span className="text-sm tracking-[0.15em] text-muted-foreground">18–19 Sept 2026</span>

      <div className="flex items-center gap-1">
        {Array.from({ length: 8 }).map((_, i) => (
          <span key={i} className="h-1 w-1 bg-muted-foreground/40" />
        ))}
        <span className="ml-1 text-muted-foreground/60">▼</span>
      </div>
    </div>
  )
}

function Glow() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute top-1/2 left-1/2 h-[70vh] w-[70vh] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.05) 45%, transparent 70%)",
        }}
        animate={{ opacity: [0.7, 1, 0.7], scale: [1, 1.08, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,transparent_0%,var(--background)_75%)]" />
    </div>
  )
}

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex h-[calc(100vh-4.5rem)] flex-col items-center justify-center overflow-hidden bg-background pb-2 text-center"
    >
      <Glow />
      <Frame />
      <LeftRail />
      <RightRail />

      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mt-6 w-full sm:mt-8"
      >
        <EyebrowBar />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="relative mt-6 flex flex-col items-center font-display leading-none uppercase text-foreground sm:mt-8"
      >
        <span className="flex items-center gap-1 text-5xl sm:text-7xl md:text-8xl">
          <span className="grain-text">C</span>
          <span className="relative -mx-1 inline-block h-[0.85em] w-[0.85em] sm:-mx-1.5">
            <Image
              src="/logo-atom.png"
              alt=""
              fill
              priority
              className="object-contain mix-blend-screen"
            />
          </span>
          <span className="grain-text">NVERGENCE</span>
        </span>
        <span className="mt-1 self-end pr-1 sm:pr-2">
          <YearChip />
        </span>
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative mt-4 flex w-full max-w-2xl items-center gap-3"
      >
        <span className="h-px flex-1 bg-border" />
        <span className="h-1 w-1 shrink-0 bg-muted-foreground/50" />
        <p className="font-tagline shrink-0 text-sm tracking-[0.06em] text-muted-foreground sm:text-base sm:tracking-[0.08em]">
          a celebration of curiosity, ideas, and infinite possibility
        </p>
        <span className="h-1 w-1 shrink-0 bg-muted-foreground/50" />
        <span className="h-px flex-1 bg-border" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="relative mt-4 flex gap-4"
      >
        <Button size="lg" className="px-6 py-3 text-sm font-bold tracking-[0.08em] uppercase">
          Register Now
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="relative mt-1 min-h-0 w-full max-w-xl flex-1"
      >
        <Image
          src="/hacker-2.png"
          alt=""
          fill
          priority
          className="object-contain object-top opacity-90 select-none"
          style={{ filter: "grayscale(0.6) contrast(1.25)" }}
        />
        <div
          className="pointer-events-none absolute inset-0 mix-blend-multiply"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(0,0,0,0.9) 45%, transparent 46%)",
            backgroundSize: "4px 4px",
          }}
        />
      </motion.div>
    </section>
  )
}
