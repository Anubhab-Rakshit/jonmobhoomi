'use client'

import { useEffect, useRef, useState } from 'react'

interface CursorState {
  x: number
  y: number
  label: string   // '' | 'VIEW' | 'EXPLORE' | 'OPEN'
  isHover: boolean
  isMap: boolean
}

export default function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)
  const rafRef = useRef<number>(0)

  // Mouse target (raw)
  const mouse = useRef({ x: -100, y: -100 })
  // Ring lerped position
  const ring = useRef({ x: -100, y: -100 })

  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Only enable on pointer: fine (mouse), not touch
    if (window.matchMedia('(pointer: coarse)').matches) return

    setIsVisible(true)

    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX
      mouse.current.y = e.clientY

      // Move dot instantly
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 2.5}px, ${e.clientY - 2.5}px)`
      }

      // Detect cursor context via data-cursor attribute
      const target = e.target as HTMLElement
      const cursorEl = target.closest('[data-cursor]') as HTMLElement | null
      const isLink = target.closest('a, button, [role="button"]') !== null

      if (cursorEl && ringRef.current && labelRef.current) {
        const label = cursorEl.dataset.cursor ?? ''
        labelRef.current.textContent = label
        ringRef.current.dataset.state = label.toLowerCase()
      } else if (ringRef.current && labelRef.current) {
        labelRef.current.textContent = ''
        ringRef.current.dataset.state = isLink ? 'hover' : 'default'
      }
    }

    // Lerp loop for ring
    const lerp = (a: number, b: number, n: number) => a + (b - a) * n

    const tick = () => {
      ring.current.x = lerp(ring.current.x, mouse.current.x, 0.1)
      ring.current.y = lerp(ring.current.y, mouse.current.y, 0.1)

      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x - 17}px, ${ring.current.y - 17}px)`
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    window.addEventListener('mousemove', onMove)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  if (!isVisible) return null

  return (
    <>
      {/* Outer ring */}
      <div
        ref={ringRef}
        aria-hidden="true"
        data-state="default"
        className="cursor-ring"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 34,
          height: 34,
          borderRadius: '50%',
          border: '1.5px solid rgba(45,106,79,0.6)',
          pointerEvents: 'none',
          zIndex: 999999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'width 0.22s ease, height 0.22s ease, background 0.22s ease, border-color 0.22s ease',
        }}
      >
        <span
          ref={labelRef}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 9,
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: 'var(--green-primary)',
            userSelect: 'none',
          }}
        />
      </div>

      {/* Inner dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 5,
          height: 5,
          borderRadius: '50%',
          background: '#52B788',
          pointerEvents: 'none',
          zIndex: 999999,
        }}
      />

      {/* Dynamic ring state styles */}
      <style>{`
        .cursor-ring[data-state="hover"] {
          width: 50px !important;
          height: 50px !important;
          margin-top: -8px;
          margin-left: -8px;
          background: rgba(45,106,79,0.08);
          border-color: rgba(45,106,79,0.5);
        }
        .cursor-ring[data-state="explore"] {
          width: 70px !important;
          height: 70px !important;
          margin-top: -18px;
          margin-left: -18px;
          background: rgba(45,106,79,0.06);
          border-color: rgba(82,183,136,0.7);
        }
        .cursor-ring[data-state="view"] {
          width: 60px !important;
          height: 60px !important;
          margin-top: -13px;
          margin-left: -13px;
          background: rgba(45,106,79,0.06);
          border-color: rgba(82,183,136,0.6);
        }
        .cursor-ring[data-state="open"] {
          width: 54px !important;
          height: 54px !important;
          margin-top: -10px;
          margin-left: -10px;
          background: rgba(45,106,79,0.07);
          border-color: rgba(45,106,79,0.55);
        }
      `}</style>
    </>
  )
}
