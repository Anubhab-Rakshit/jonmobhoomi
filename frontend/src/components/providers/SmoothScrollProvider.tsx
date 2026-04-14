'use client'

import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from '@/lib/gsap'

interface SmoothScrollProviderProps {
  children: React.ReactNode
}

export default function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
      infinite: false,
    })

    lenisRef.current = lenis

    // Sync Lenis with GSAP ticker for zero-lag scroll
    function onTick(time: number) {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(onTick)
    gsap.ticker.lagSmoothing(0)

    // Keep ScrollTrigger in sync with Lenis scroll position
    lenis.on('scroll', ScrollTrigger.update)

    return () => {
      gsap.ticker.remove(onTick)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  return <>{children}</>
}
