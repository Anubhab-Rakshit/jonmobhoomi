'use client'

import { useEffect, useRef, useState } from 'react'

interface PreloaderProps {
  onComplete: () => void
}

// Simplified India outline path (SVG viewBox 0 0 400 460)
const INDIA_PATH =
  'M200 20 L230 35 L255 30 L275 50 L285 80 L300 90 L310 115 L295 130 L300 155 L315 170 L320 195 L305 215 L308 240 L295 265 L280 290 L265 310 L255 340 L240 365 L220 390 L200 410 L180 390 L160 365 L145 340 L135 310 L120 290 L105 265 L92 240 L95 215 L80 195 L85 170 L100 155 L105 130 L90 115 L100 90 L115 80 L125 50 L145 30 L170 35 Z'

const CITY_DOTS = [
  { cx: 185, cy: 90, name: 'Delhi' },
  { cx: 130, cy: 230, name: 'Mumbai' },
  { cx: 230, cy: 260, name: 'Hyderabad' },
  { cx: 195, cy: 310, name: 'Bangalore' },
  { cx: 270, cy: 175, name: 'Kolkata' },
  { cx: 210, cy: 195, name: 'Bhopal' },
  { cx: 155, cy: 165, name: 'Jaipur' },
  { cx: 240, cy: 130, name: 'Lucknow' },
]

const SKIP_KEY = 'bhumichain_v1'

export default function Preloader({ onComplete }: PreloaderProps) {
  const [count, setCount] = useState(0)
  const [show, setShow] = useState(true)
  const pathRef = useRef<SVGPathElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const dotsRef = useRef<SVGCircleElement[]>([])

  useEffect(() => {
    // Skip on return visits
    if (sessionStorage.getItem(SKIP_KEY)) {
      onComplete()
      return
    }

    // Start counter
    let current = 0
    const interval = setInterval(() => {
      current = Math.min(current + Math.floor(Math.random() * 4) + 1, 100)
      setCount(current)

      // Sync progress bar
      if (progressRef.current) {
        progressRef.current.style.width = `${current}%`
      }

      if (current >= 100) {
        clearInterval(interval)
        // Animate out
        setTimeout(() => {
          if (containerRef.current) {
            containerRef.current.style.transition = 'transform 0.65s cubic-bezier(0.76,0,0.24,1)'
            containerRef.current.style.transform = 'translateY(-100vh)'
          }
          setTimeout(() => {
            setShow(false)
            sessionStorage.setItem(SKIP_KEY, '1')
            onComplete()
          }, 680)
        }, 400)
      }
    }, 28)

    // Animate SVG path stroke
    const path = pathRef.current
    if (path) {
      const length = path.getTotalLength()
      path.style.strokeDasharray = `${length}`
      path.style.strokeDashoffset = `${length}`
      path.style.transition = 'stroke-dashoffset 1.2s cubic-bezier(0.16,1,0.3,1)'
      requestAnimationFrame(() => {
        path.style.strokeDashoffset = '0'
      })
    }

    // Stagger city dots
    dotsRef.current.forEach((dot, i) => {
      if (!dot) return
      dot.style.opacity = '0'
      dot.style.transform = 'scale(0)'
      setTimeout(() => {
        dot.style.transition = 'opacity 0.3s ease, transform 0.4s cubic-bezier(0.16,1,0.3,1)'
        dot.style.opacity = '1'
        dot.style.transform = 'scale(1)'
      }, 600 + i * 150)
    })

    return () => clearInterval(interval)
  }, [onComplete])

  if (!show) return null

  return (
    <div
      ref={containerRef}
      aria-label="Loading BhumiChain"
      role="status"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        background: '#1B3A2D',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 32,
      }}
    >
      {/* India SVG outline */}
      <svg
        viewBox="0 0 400 460"
        width={180}
        height={207}
        fill="none"
        aria-hidden="true"
      >
        {/* Topographic echo circles */}
        <ellipse cx="200" cy="215" rx="175" ry="200" stroke="rgba(82,183,136,0.05)" strokeWidth="1" />
        <ellipse cx="200" cy="215" rx="140" ry="165" stroke="rgba(82,183,136,0.05)" strokeWidth="1" />
        <ellipse cx="200" cy="215" rx="105" ry="130" stroke="rgba(82,183,136,0.04)" strokeWidth="1" />

        <path
          ref={pathRef}
          d={INDIA_PATH}
          stroke="#52B788"
          strokeWidth={1.5}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {CITY_DOTS.map((city, i) => (
          <g key={city.name}>
            {/* Glow ring */}
            <circle
              cx={city.cx}
              cy={city.cy}
              r={7}
              fill="rgba(82,183,136,0.12)"
              ref={(el) => {
                // no ref needed for glow
              }}
            />
            {/* Dot */}
            <circle
              cx={city.cx}
              cy={city.cy}
              r={3}
              fill="#52B788"
              style={{ filter: 'drop-shadow(0 0 4px rgba(82,183,136,0.8))' }}
              ref={(el) => {
                if (el) dotsRef.current[i] = el
              }}
            />
          </g>
        ))}
      </svg>

      {/* Brand name */}
      <div style={{ textAlign: 'center' }}>
        <p
          style={{
            fontFamily: 'var(--font-display)',
            fontStyle: 'italic',
            fontWeight: 600,
            fontSize: 28,
            color: '#F0EDE6',
            letterSpacing: '-0.01em',
            marginBottom: 4,
          }}
        >
          BhumiChain
        </p>
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            color: 'rgba(240,237,230,0.35)',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
          }}
        >
          India&apos;s Land Registry on Stellar
        </p>
      </div>

      {/* Progress bar + counter */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
        <div
          style={{
            width: 160,
            height: 2,
            background: 'rgba(240,237,230,0.1)',
            borderRadius: 1,
            overflow: 'hidden',
          }}
        >
          <div
            ref={progressRef}
            style={{
              height: '100%',
              width: '0%',
              background: 'linear-gradient(90deg, #2D6A4F, #52B788)',
              borderRadius: 1,
              transition: 'width 0.05s linear',
            }}
          />
        </div>

        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 12,
            color: 'rgba(240,237,230,0.4)',
            letterSpacing: '0.05em',
          }}
        >
          {count}%
        </p>
      </div>
    </div>
  )
}
