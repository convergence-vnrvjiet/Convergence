import Image from "next/image"
import { Crosshair } from "lucide-react"

import { Button } from "@/components/ui/button"

const PAPER = "#ede1c5"

function CornerCrosshairs() {
  return (
    <>
      <Crosshair className="pointer-events-none absolute top-1 left-1 h-4 w-4 text-black/50 sm:top-2 sm:left-2" />
      <Crosshair className="pointer-events-none absolute top-1 right-1 h-4 w-4 text-black/50 sm:top-2 sm:right-2" />
      <Crosshair className="pointer-events-none absolute bottom-1 left-1 h-4 w-4 text-black/50 sm:bottom-2 sm:left-2" />
      <Crosshair className="pointer-events-none absolute right-1 bottom-1 h-4 w-4 text-black/50 sm:right-2 sm:bottom-2" />
    </>
  )
}

function TopBar() {
  return (
    <div className="flex items-center justify-between border-b border-black/80 py-2 font-tagline text-[9px] tracking-[0.2em] text-black uppercase sm:text-[11px] sm:tracking-[0.3em]">
      <span className="flex items-center gap-2">
        <span className="h-2 w-2 shrink-0 bg-black" />
        Build <span className="text-red-700">•</span> Create <span className="text-red-700">•</span> Connect
      </span>
    </div>
  )
}

function TitleRow() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 border-b border-black/80 py-6 sm:gap-4 sm:py-10">
      <h1 className="flex items-center gap-1 font-hero-title text-[clamp(2rem,9vw,5.5rem)] leading-none tracking-tight text-black uppercase sm:gap-2">
        <span>C</span>
        <span className="relative -mx-0.5 inline-block h-[0.8em] w-[0.8em] sm:-mx-1">
          <Image
            src="/logo-atom.png"
            alt=""
            fill
            priority
            className="object-contain mix-blend-multiply invert"
          />
        </span>
        <span>NVERGENCE</span>
      </h1>
      <span className="bg-red-700 px-3 py-1.5 font-hero-title text-lg tracking-wide sm:text-2xl" style={{ color: PAPER }}>
        2K26
      </span>
    </div>
  )
}

function SubtitleTrack() {
  return (
    <span className="flex shrink-0 items-center gap-28 pr-96">
      <span className="text-red-700">VNRVJIET Hyderabad</span>
      <span className="h-1 w-1 shrink-0 bg-black/40" />
      <span>18–19 Sept 2026</span>
      <span className="h-1 w-1 shrink-0 bg-black/40" />
      <span className="flex items-center gap-2">
        The Ultimate Celebration of Innovation
        <span className="h-2 w-2 shrink-0 bg-red-700" />
      </span>
    </span>
  )
}

function SubtitleRow() {
  return (
    <div className="overflow-hidden border-b border-black/80 py-2 font-ticker text-[9px] tracking-[0.15em] text-black uppercase sm:text-xs sm:tracking-[0.25em]">
      <div className="flex w-max animate-marquee">
        <SubtitleTrack />
        <SubtitleTrack />
      </div>
    </div>
  )
}

function BottomBar() {
  return (
    <div className="flex items-center justify-center border-t border-black/80 py-3">
      <Button
        size="sm"
        className="h-auto gap-1.5 bg-red-700 px-3 py-1.5 text-[9px] font-bold tracking-[0.15em] text-white uppercase hover:bg-red-800 sm:text-[10px]"
      >
        Register Now
        <span aria-hidden>▶</span>
      </Button>
    </div>
  )
}

export function Hero() {
  return (
    <section
      id="home"
      className="relative isolate flex min-h-[calc(100vh-5rem)] items-center justify-center overflow-hidden text-black"
      style={{ backgroundColor: PAPER }}
    >
      <div
        className="relative mx-auto w-full max-w-[1332px] -translate-y-[141px] border-x border-black/70 px-4 py-4 sm:-translate-y-[157px] sm:px-8"
        style={{ backgroundColor: PAPER }}
      >
        <CornerCrosshairs />

        <TopBar />
        <TitleRow />
        <SubtitleRow />

        <BottomBar />
      </div>
    </section>
  )
}
