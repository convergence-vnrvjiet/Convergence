import Image from "next/image"

import { Button } from "@/components/ui/button"

const PAPER = "#ede1c5"

function HeroPhoto({ src, className = "" }: { src: string; className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-md ${className}`}>
      <Image src={src} alt="" fill className="object-cover" />
    </div>
  )
}

function TitleRow() {
  return (
    <div className="flex justify-center py-6 sm:py-10">
      <div className="w-full">
        <div className="flex justify-center">
          <div className="relative flex flex-col items-center sm:block">
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

            <span
              className="mt-3 bg-red-700 px-2.5 py-1 font-hero-title text-base tracking-wide sm:absolute sm:top-full sm:right-0 sm:mt-4 sm:px-3 sm:py-1.5 sm:text-xl"
              style={{ color: PAPER }}
            >
              2K26
            </span>
          </div>
        </div>

        <div className="relative mt-3 flex justify-center sm:mt-4">
          <span className="font-ticker text-[16px] font-black tracking-[0.15em] text-black uppercase sm:text-sm sm:tracking-[0.25em]">
            The Ultimate Celebration of Innovation
          </span>
        </div>
      </div>
    </div>
  )
}

function SubtitleRow() {
  return (
    <div className="relative flex items-center justify-between py-2 font-ticker text-[9px] font-black tracking-[0.15em] text-black uppercase sm:text-xs sm:tracking-[0.25em]">
      <span className="text-red-700">VNRVJIET, Hyderabad</span>

      <span>18–19 Sept 2026</span>

      <span className="pointer-events-none absolute -right-8 -bottom-px -left-8 h-px bg-black/80" />
    </div>
  )
}

function BottomBar() {
  return (
    <div className="flex items-center justify-center pt-6 pb-3 sm:pt-8">
      <Button
        size="lg"
        className="h-auto gap-2 bg-red-700 px-6 py-3 text-xs font-bold tracking-[0.15em] uppercase hover:bg-red-800 sm:text-sm"
        style={{ color: PAPER }}
      >
        Register Now
        <span aria-hidden>▶</span>
      </Button>
    </div>
  )
}

const HERO_PHOTOS = [
  "/event-1.png",
  "/event-2.png",
  "/event-3.png",
  "/event-4.png",
]

function ImageTrack() {
  return (
    <div className="flex shrink-0 items-center gap-2 pr-2 sm:gap-3 sm:pr-3">
      {HERO_PHOTOS.map((src, i) => (
        <HeroPhoto
          key={i}
          src={src}
          className="h-28 w-[220px] sm:h-36 sm:w-[320px] lg:h-44 lg:w-[420px]"
        />
      ))}
    </div>
  )
}

function FrameLines() {
  return (
    <>
      <span className="pointer-events-none absolute top-0 -right-4 -left-4 h-px bg-black/70" />
      <span className="pointer-events-none absolute -right-4 bottom-0 -left-4 h-px bg-black/70" />
      <span className="pointer-events-none absolute -top-4 -bottom-4 left-0 w-px bg-black/70" />
      <span className="pointer-events-none absolute -top-4 -bottom-4 right-0 w-px bg-black/70" />
    </>
  )
}

function ImageRow() {
  return (
    <div className="scroll-fade-x mt-10 overflow-hidden [--scroll-fade-e:20%]! [--scroll-fade-s:20%]! sm:mt-14">
      <div className="flex w-max animate-marquee">
        <ImageTrack />
        <ImageTrack />
      </div>
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
        className="relative mx-auto w-full max-w-[1332px] px-4 pt-0 pb-4 sm:px-8"
        style={{ backgroundColor: PAPER }}
      >
        <FrameLines />

        <SubtitleRow />

        <TitleRow />

        <ImageRow />

        <BottomBar />
      </div>
    </section>
  )
}