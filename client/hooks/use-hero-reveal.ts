"use client"

import { useEffect, useRef, useState } from "react"

export type Rect = { x: number; y: number; w: number; h: number }

export type HeroRevealState = {
  ready: boolean
  done: boolean
  reducedMotion: boolean
  frameRect: Rect | null
  frameOpacity: number
  wordmarkClipPx: number
  yearClipPx: number
  eyebrowClipPx: number
  taglineClipPx: number
  buttonsClipPx: number
  photoClipPx: number
  leftRailClipPx: number
  rightRailClipPx: number
}

type Measured = {
  c: Rect
  wordmark: Rect
  year: Rect
  boundary: Rect
  eyebrow: Rect
  tagline: Rect
  buttons: Rect
  photo: Rect
  leftRail: Rect
  rightRail: Rect
}

const DURATION = 5.6

const clamp01 = (v: number) => Math.min(1, Math.max(0, v))
const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v))

const easeInOutCubic = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2)
const easeInOutQuart = (x: number) => (x < 0.5 ? 8 * x * x * x * x : 1 - Math.pow(-2 * x + 2, 4) / 2)
const easeOutBack = (x: number) => {
  const c1 = 1.70158
  const c3 = c1 + 1
  return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2)
}

const lerpRect = (a: Rect, b: Rect, p: number): Rect => ({
  x: a.x + (b.x - a.x) * p,
  y: a.y + (b.y - a.y) * p,
  w: a.w + (b.w - a.w) * p,
  h: a.h + (b.h - a.h) * p,
})

// Reveal fraction (0..1) of a box as the frame's edge sweeps toward/through it, driven
// purely by the frame's current rect — same mechanism as the wordmark sweep, just
// pointed at a different edge depending on which side of the settled rect the element
// sits on. Guards zero-size boxes (elements hidden below a breakpoint measure as 0x0).
function revealFromTop(frame: Rect, box: Rect) {
  if (box.h <= 0) return 1
  return clamp01((box.y + box.h - frame.y) / box.h)
}
function revealFromBottom(frame: Rect, box: Rect) {
  if (box.h <= 0) return 1
  return clamp01((frame.y + frame.h - box.y) / box.h)
}
function revealFromRight(frame: Rect, box: Rect) {
  if (box.w <= 0) return 1
  return clamp01((box.x + box.w - frame.x) / box.w)
}
function revealFromLeft(frame: Rect, box: Rect) {
  if (box.w <= 0) return 1
  return clamp01((frame.x + frame.w - box.x) / box.w)
}

function computeState(t: number, m: Measured): Omit<HeroRevealState, "ready" | "done" | "reducedMotion"> {
  const TIGHT_PAD = 8
  const MARGIN = 32

  const cFrame: Rect = {
    x: m.c.x - TIGHT_PAD,
    y: m.c.y - TIGHT_PAD,
    w: m.c.w + TIGHT_PAD * 2,
    h: m.c.h + TIGHT_PAD * 2,
  }

  const squareSize = 20
  const squareCenter = { x: m.c.x + m.c.w / 2, y: m.c.y + m.c.h + 8 + squareSize / 2 }
  const square: Rect = {
    x: squareCenter.x - squareSize / 2,
    y: squareCenter.y - squareSize / 2,
    w: squareSize,
    h: squareSize,
  }

  const sweepEnd: Rect = {
    x: cFrame.x,
    y: cFrame.y,
    w: m.wordmark.x + m.wordmark.w + TIGHT_PAD - cFrame.x,
    h: cFrame.h,
  }

  const unionLeft = Math.min(m.wordmark.x, m.year.x)
  const unionRight = Math.max(m.wordmark.x + m.wordmark.w, m.year.x + m.year.w)
  const unionTop = m.wordmark.y
  const unionBottom = m.year.y + m.year.h
  const settled: Rect = {
    x: unionLeft - MARGIN,
    y: unionTop - MARGIN,
    w: unionRight - unionLeft + MARGIN * 2,
    h: unionBottom - unionTop + MARGIN * 2,
  }

  const boundary = m.boundary

  let frameRect: Rect
  if (t < 0.3) {
    const p = easeOutBack(clamp01(t / 0.3))
    frameRect = {
      x: squareCenter.x - (squareSize * p) / 2,
      y: squareCenter.y - (squareSize * p) / 2,
      w: squareSize * p,
      h: squareSize * p,
    }
  } else if (t < 1.5) {
    frameRect = lerpRect(square, cFrame, easeInOutCubic(clamp01((t - 0.3) / 1.2)))
  } else if (t < 2.4) {
    frameRect = lerpRect(cFrame, sweepEnd, easeInOutCubic(clamp01((t - 1.5) / 0.9)))
  } else if (t < 3.05) {
    frameRect = lerpRect(sweepEnd, settled, easeInOutQuart(clamp01((t - 2.4) / 0.65)))
  } else if (t < 3.4) {
    frameRect = settled
  } else if (t < DURATION) {
    frameRect = lerpRect(settled, boundary, easeInOutCubic(clamp01((t - 3.4) / (DURATION - 3.4))))
  } else {
    frameRect = boundary
  }

  let frameOpacity: number
  if (t < 0.3) frameOpacity = easeOutBack(clamp01(t / 0.3))
  else if (t < 4.1) frameOpacity = 1
  else if (t < DURATION) frameOpacity = 1 - clamp01((t - 4.1) / (DURATION - 4.1))
  else frameOpacity = 0

  let wordmarkClipPx: number
  if (t < 2.4) {
    const revealedRight = clamp(frameRect.x + frameRect.w - m.wordmark.x, 0, m.wordmark.w)
    wordmarkClipPx = m.wordmark.w - revealedRight
  } else {
    wordmarkClipPx = 0
  }

  let yearClipPx: number
  if (t < 2.4) yearClipPx = m.year.w
  else if (t < 3.0) yearClipPx = m.year.w * (1 - easeInOutCubic(clamp01((t - 2.4) / 0.6)))
  else yearClipPx = 0

  // Everything below rides the SAME frameRect used for the box itself — as the frame
  // expands outward toward the boundary (3.4–5.6s), each element uncovers from the edge
  // nearest the settled rect toward the edge nearest the boundary, exactly in step with
  // the box that's passing over it. Naturally 0 (fully hidden) until the expanding edge
  // actually reaches that element — no separate phase gating needed.
  const eyebrowClipPx = m.eyebrow.h * (1 - revealFromTop(frameRect, m.eyebrow))
  const taglineClipPx = m.tagline.h * (1 - revealFromBottom(frameRect, m.tagline))
  const buttonsClipPx = m.buttons.h * (1 - revealFromBottom(frameRect, m.buttons))
  const photoClipPx = m.photo.h * (1 - revealFromBottom(frameRect, m.photo))
  const leftRailClipPx = m.leftRail.w * (1 - revealFromRight(frameRect, m.leftRail))
  const rightRailClipPx = m.rightRail.w * (1 - revealFromLeft(frameRect, m.rightRail))

  return {
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
  }
}

// The universal fallback: no added elements, no clip — literally the pre-existing
// static hero. Used for SSR/first paint, no-JS, and reduced-motion.
const INERT_STATE: Omit<HeroRevealState, "ready" | "done" | "reducedMotion"> = {
  frameRect: null,
  frameOpacity: 0,
  wordmarkClipPx: 0,
  yearClipPx: 0,
  eyebrowClipPx: 0,
  taglineClipPx: 0,
  buttonsClipPx: 0,
  photoClipPx: 0,
  leftRailClipPx: 0,
  rightRailClipPx: 0,
}

export function useHeroReveal() {
  const sectionRef = useRef<HTMLElement>(null)
  const cRef = useRef<HTMLSpanElement>(null)
  const wordmarkRef = useRef<HTMLSpanElement>(null)
  const yearRef = useRef<HTMLSpanElement>(null)
  const boundaryRef = useRef<HTMLDivElement>(null)
  const eyebrowRef = useRef<HTMLDivElement>(null)
  const taglineRef = useRef<HTMLDivElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)
  const photoRef = useRef<HTMLDivElement>(null)
  const leftRailRef = useRef<HTMLDivElement>(null)
  const rightRailRef = useRef<HTMLDivElement>(null)

  const [reducedMotion, setReducedMotion] = useState(false)
  const [ready, setReady] = useState(false)
  const [done, setDone] = useState(false)
  const [state, setState] = useState(INERT_STATE)

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const apply = () => setReducedMotion(mq.matches)
    apply()
    mq.addEventListener("change", apply)
    return () => mq.removeEventListener("change", apply)
  }, [])

  useEffect(() => {
    if (reducedMotion) {
      const applyInert = () => {
        setReady(true)
        setDone(true)
        setState(INERT_STATE)
      }
      applyInert()
      return
    }

    let cancelled = false
    let raf = 0

    const measure = (): Measured | null => {
      const sec = sectionRef.current
      const c = cRef.current
      const wm = wordmarkRef.current
      const yr = yearRef.current
      const b = boundaryRef.current
      const eb = eyebrowRef.current
      const tl = taglineRef.current
      const bt = buttonsRef.current
      const ph = photoRef.current
      const lr = leftRailRef.current
      const rr = rightRailRef.current
      if (!sec || !c || !wm || !yr || !b || !eb || !tl || !bt || !ph || !lr || !rr) return null
      const secRect = sec.getBoundingClientRect()
      const toLocal = (r: DOMRect): Rect => ({
        x: r.left - secRect.left,
        y: r.top - secRect.top,
        w: r.width,
        h: r.height,
      })
      return {
        c: toLocal(c.getBoundingClientRect()),
        wordmark: toLocal(wm.getBoundingClientRect()),
        year: toLocal(yr.getBoundingClientRect()),
        boundary: toLocal(b.getBoundingClientRect()),
        eyebrow: toLocal(eb.getBoundingClientRect()),
        tagline: toLocal(tl.getBoundingClientRect()),
        buttons: toLocal(bt.getBoundingClientRect()),
        photo: toLocal(ph.getBoundingClientRect()),
        leftRail: toLocal(lr.getBoundingClientRect()),
        rightRail: toLocal(rr.getBoundingClientRect()),
      }
    }

    async function start() {
      try {
        await document.fonts.ready
      } catch {
        // ignore — proceed with best-effort measurement
      }
      if (cancelled) return

      const measuredResult = measure()
      if (!measuredResult) {
        setReady(true)
        setDone(true)
        setState(INERT_STATE)
        return
      }
      const measured: Measured = measuredResult

      setReady(true)
      const startTime = performance.now()

      const tick = () => {
        if (cancelled) return
        const t = (performance.now() - startTime) / 1000
        if (t >= DURATION) {
          setState(INERT_STATE)
          setDone(true)
          return
        }
        setState(computeState(t, measured))
        raf = requestAnimationFrame(tick)
      }

      raf = requestAnimationFrame(tick)
    }

    start()

    return () => {
      cancelled = true
      cancelAnimationFrame(raf)
    }
  }, [reducedMotion])

  return {
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
    reducedMotion,
    ready,
    done,
    ...state,
  }
}
