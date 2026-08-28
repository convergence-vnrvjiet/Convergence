"use client"

import Image from "next/image"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"

function Glow() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute top-1/2 left-1/2 h-[70vh] w-[70vh] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(249,115,22,0.45) 0%, rgba(249,115,22,0.12) 45%, transparent 70%)",
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
      className="relative flex h-[calc(100vh-4.5rem)] flex-col items-center justify-center overflow-hidden bg-background px-6 pt-10 pb-2 text-center sm:pt-14"
    >
      <Glow />

      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="relative flex flex-col items-center font-display leading-none uppercase text-foreground"
      >
        <span className="flex items-center gap-1 text-5xl sm:text-7xl md:text-8xl">
          <span>C</span>
          <span className="relative -mx-1 inline-block h-[0.85em] w-[0.85em] sm:-mx-1.5">
            <Image
              src="/logo-atom.png"
              alt=""
              fill
              priority
              className="object-contain mix-blend-screen"
            />
          </span>
          <span>NVERGENCE</span>
        </span>
        <span className="mt-1 self-end pr-1 text-lg tracking-[0.2em] text-muted-foreground sm:text-2xl sm:pr-2">
          2K26
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="font-tagline relative mt-4 max-w-xl text-sm tracking-[0.06em] text-muted-foreground sm:text-base sm:tracking-[0.08em]"
      >
        a celebration of curiosity, ideas, and infinite possibility
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="relative mt-4 flex gap-4"
      >
        <Button size="lg" className="px-6 py-3 text-sm">
          Register Now
        </Button>
        <Button size="lg" variant="outline" className="px-6 py-3 text-sm">
          Learn More
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="relative mt-1 min-h-0 w-full max-w-xl flex-1"
      >
        <Image
          src="/hacker.png"
          alt=""
          fill
          priority
          className="object-contain object-top opacity-80 select-none"
        />
      </motion.div>
    </section>
  )
}
