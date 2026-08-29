"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Crosshair, Globe } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useHeroReveal, type Rect } from "@/hooks/use-hero-reveal"

const BARCODE_BARS = [2, 1, 3, 1, 1, 2, 1, 3, 2, 1, 1, 2, 3, 1, 2]

function Frame({ boundaryRef }: { boundaryRef: React.RefObject<HTMLDivElement | null> }) {
  return (
    <>
      <div ref={boundaryRef} className="pointer-events-none absolute inset-3 border border-white/15 sm:inset-4" />
      <Crosshair className="pointer-events-none absolute top-1.5 left-1.5 h-4 w-4 text-muted-foreground/60 sm:top-2.5 sm:left-2.5" />
      <Crosshair className="pointer-events-none absolute top-1.5 right-1.5 h-4 w-4 text-muted-foreground/60 sm:top-2.5 sm:right-2.5" />
      <Crosshair className="pointer-events-none absolute bottom-1.5 left-1.5 h-4 w-4 text-muted-foreground/60 sm:bottom-2.5 sm:left-2.5" />
      <Crosshair className="pointer-events-none absolute right-1.5 bottom-1.5 h-4 w-4 text-muted-foreground/60 sm:right-2.5 sm:bottom-2.5" />
    </>
  )
}

// Border edges use translate + a single-axis scale (length only, never thickness), and
// the corner brackets/crosshair use translate only at a fixed size — so nothing here
// is ever distorted by a 2D scale, and no layout property is touched per frame.
function RevealFrame({ rect, opacity }: { rect: Rect; opacity: number }) {
  if (opacity <= 0.002) return null
  const armLen = 24
  const inset = 10
  const line = "rgba(255,255,255,0.35)"

  const edgeH = (x: number, y: number, w: number, key: string) => (
    <div
      key={key}
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: 1,
        height: 1,
        background: line,
        transformOrigin: "0 0",
        transform: `translate(${x}px, ${y}px) scale(${Math.max(w, 0.001)}, 1)`,
      }}
    />
  )
  const edgeV = (x: number, y: number, h: number, key: string) => (
    <div
      key={key}
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: 1,
        height: 1,
        background: line,
        transformOrigin: "0 0",
        transform: `translate(${x}px, ${y}px) scale(1, ${Math.max(h, 0.001)})`,
      }}
    />
  )
  const seg = (x: number, y: number, w: number, h: number, key: string) => (
    <div
      key={key}
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: w,
        height: h,
        background: line,
        transform: `translate(${x}px, ${y}px)`,
      }}
    />
  )

  const { x, y, w, h } = rect
  const cx = x + w / 2
  const cy = y + h / 2

  return (
    <div className="pointer-events-none absolute inset-0 overflow-visible" style={{ opacity }}>
      {edgeH(x, y, w, "top")}
      {edgeH(x, y + h, w, "bottom")}
      {edgeV(x, y, h, "left")}
      {edgeV(x + w, y, h, "right")}

      {seg(x + inset, y + inset, armLen, 1, "tl-h")}
      {seg(x + inset, y + inset, 1, armLen, "tl-v")}

      {seg(x + w - inset - armLen, y + inset, armLen, 1, "tr-h")}
      {seg(x + w - inset, y + inset, 1, armLen, "tr-v")}

      {seg(x + inset, y + h - inset, armLen, 1, "bl-h")}
      {seg(x + inset, y + h - inset - armLen, 1, armLen, "bl-v")}

      {seg(x + w - inset - armLen, y + h - inset, armLen, 1, "br-h")}
      {seg(x + w - inset, y + h - inset - armLen, 1, armLen, "br-v")}

      {seg(cx - 7, cy, 14, 1, "cross-h")}
      {seg(cx, cy - 7, 1, 14, "cross-v")}
    </div>
  )
}

function EyebrowBar() {
  return (
    <div className="relative flex w-full items-center justify-between px-4 text-[8px] uppercase tracking-[0.12em] text-muted-foreground sm:px-8 sm:text-[10px] sm:tracking-[0.25em] md:text-xs">
      <div className="flex items-center gap-1.5 sm:gap-2">
        <span className="h-1.5 w-1.5 shrink-0 bg-primary sm:h-2 sm:w-2" />
        <span>Tech × Creativity × Collaboration</span>
      </div>
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="hidden h-3.5 items-end gap-[1.5px] sm:flex">
          {BARCODE_BARS.map((w, i) => (
            <span key={i} className="bg-muted-foreground/60" style={{ width: 1.5, height: `${w * 4}px` }} />
          ))}
        </div>
        <span>Est. 2026</span>
        <Globe className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
      </div>
    </div>
  )
}

function YearChip({
  yearRef,
  clipPx,
}: {
  yearRef: React.RefObject<HTMLSpanElement | null>
  clipPx: number
}) {
  return (
    <div className="relative inline-flex flex-col items-center px-3 py-1.5">
      <span className="absolute top-0 left-0 h-2.5 w-2.5 border-t border-l border-muted-foreground/50" />
      <span className="absolute top-0 right-0 h-2.5 w-2.5 border-t border-r border-muted-foreground/50" />
      <span className="absolute bottom-0 left-0 h-2.5 w-2.5 border-b border-l border-muted-foreground/50" />
      <span className="absolute right-0 bottom-0 h-2.5 w-2.5 border-r border-b border-muted-foreground/50" />
      <span
        ref={yearRef}
        className="inline-block text-lg tracking-[0.2em] text-muted-foreground sm:text-2xl"
        style={{ clipPath: `inset(0 ${clipPx}px 0 0)` }}
      >
        2K26
      </span>
      <div className="mt-1 flex gap-[3px]">
        {Array.from({ length: 8 }).map((_, i) => (
          <span key={i} className="h-[3px] w-[3px] bg-muted-foreground/40" />
        ))}
      </div>
    </div>
  )
}

function LeftRail({
  railRef,
  clipPx,
}: {
  railRef: React.RefObject<HTMLDivElement | null>
  clipPx: number
}) {
  return (
    <div
      ref={railRef}
      className="pointer-events-none absolute top-1/2 left-6 hidden -translate-y-[46%] flex-col items-start gap-5 text-left xl:left-10 xl:flex"
      style={{ clipPath: `inset(0 0 0 ${clipPx}px)` }}
    >
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

function RightRail({
  railRef,
  clipPx,
}: {
  railRef: React.RefObject<HTMLDivElement | null>
  clipPx: number
}) {
  return (
    <div
      ref={railRef}
      className="pointer-events-none absolute top-32 right-6 hidden flex-col items-end gap-3 text-right sm:top-40 xl:right-10 xl:flex"
      style={{ clipPath: `inset(0 ${clipPx}px 0 0)` }}
    >
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
  const {
    sectionRef,
    cRef,
    wordmarkRef,
    yearRef,
    boundaryRef,
    eyebrowRef,
    taglineRef,
    buttonsRef,
    photoRef,
    leftRailRef,
    rightRailRef,
    frameRect,
    frameOpacity,
    wordmarkClipPx,
    yearClipPx,
    eyebrowClipPx,
    taglineClipPx,
    buttonsClipPx,
    photoClipPx,
    leftRailClipPx,
    rightRailClipPx,
  } = useHeroReveal()

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative flex h-[calc(100vh-5rem)] flex-col items-center justify-center overflow-hidden bg-background pb-2 text-center"
    >
      <Glow />
      {frameRect && <RevealFrame rect={frameRect} opacity={frameOpacity} />}
      <Frame boundaryRef={boundaryRef} />
      <LeftRail railRef={leftRailRef} clipPx={leftRailClipPx} />
      <RightRail railRef={rightRailRef} clipPx={rightRailClipPx} />

      <div
        ref={eyebrowRef}
        className="mt-6 w-full sm:mt-8"
        style={{ clipPath: `inset(${eyebrowClipPx}px 0 0 0)` }}
      >
        <EyebrowBar />
      </div>

      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="relative mt-6 flex flex-col items-center font-display leading-none uppercase text-foreground sm:mt-8"
      >
        <span
          ref={wordmarkRef}
          className="inline-flex items-center gap-1 text-[clamp(1.75rem,9vw,6rem)]"
          style={{ clipPath: `inset(0 ${wordmarkClipPx}px 0 0)` }}
        >
          <span ref={cRef} className="grain-text">
            C
          </span>
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
          <YearChip yearRef={yearRef} clipPx={yearClipPx} />
        </span>
      </motion.h1>

      <div
        ref={taglineRef}
        className="relative mt-4 flex w-full max-w-2xl items-center justify-center gap-3 px-4"
        style={{ clipPath: `inset(0 0 ${taglineClipPx}px 0)` }}
      >
        <span className="hidden h-px flex-1 bg-border sm:block" />
        <span className="hidden h-1 w-1 shrink-0 bg-muted-foreground/50 sm:inline-block" />
        <p className="font-tagline max-w-[280px] text-sm tracking-[0.06em] text-muted-foreground sm:max-w-none sm:shrink-0 sm:text-base sm:tracking-[0.08em]">
          a celebration of curiosity, ideas, and infinite possibility
        </p>
        <span className="hidden h-1 w-1 shrink-0 bg-muted-foreground/50 sm:inline-block" />
        <span className="hidden h-px flex-1 bg-border sm:block" />
      </div>

      <div
        ref={buttonsRef}
        className="relative mt-4 flex gap-4"
        style={{ clipPath: `inset(0 0 ${buttonsClipPx}px 0)` }}
      >
        <Button size="lg" className="px-6 py-3 text-sm font-bold tracking-[0.08em] uppercase">
          Register Now
        </Button>
      </div>

      <div
        ref={photoRef}
        className="relative mt-1 min-h-0 w-full max-w-xl flex-1"
        style={{ clipPath: `inset(0 0 ${photoClipPx}px 0)` }}
      >
        <Image
          src="/hacker-2.png"
          alt=""
          fill
          priority
          className="object-contain object-top opacity-90 select-none"
        />
      </div>
    </section>
  )
}
