"use client"

import { useEffect, useState } from "react"

export function useActiveSection(hrefs: string[]) {
  const [active, setActive] = useState(hrefs[0] ?? "")

  useEffect(() => {
    const elements = hrefs
      .map((href) => document.getElementById(href.replace("#", "")))
      .filter((el): el is HTMLElement => el !== null)

    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`)
        }
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [hrefs])

  return active
}
