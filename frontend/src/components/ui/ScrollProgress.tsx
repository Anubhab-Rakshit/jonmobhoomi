'use client'

import { useEffect, useRef } from 'react'

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = docHeight > 0 ? scrollTop / docHeight : 0

      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${progress})`
      }

      rafRef.current = requestAnimationFrame(update)
    }

    rafRef.current = requestAnimationFrame(update)

    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: 2,
        zIndex: 9998,
        transformOrigin: 'left',
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      <div
        ref={barRef}
        style={{
          width: '100%',
          height: '100%',
          background: 'linear-gradient(90deg, #2D6A4F, #52B788, #74C69D)',
          transformOrigin: 'left',
          transform: 'scaleX(0)',
          // No CSS transition — raw rAF update for zero lag
        }}
      />
    </div>
  )
}
