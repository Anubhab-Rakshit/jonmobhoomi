'use client'

import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from '@/lib/gsap'

const STATS = [
  {
    target: 47382,
    label: 'Parcels Registered',
    caption: 'and growing daily',
    prefix: '',
    suffix: ''
  },
  {
    target: 2.4,
    label: 'Land Value Secured',
    caption: 'on Stellar blockchain',
    prefix: '₹',
    suffix: 'B',
    isFloat: true
  },
  {
    target: 98.7,
    label: 'Dispute Resolution',
    caption: 'within 30 days',
    prefix: '',
    suffix: '%',
    isFloat: true
  },
  {
    target: 0,
    label: 'Fraud Incidents',
    caption: 'since launch',
    prefix: '',
    suffix: ''
  }
]

export default function StatsBar() {
  const containerRef = useRef<HTMLDivElement>(null)
  const numbersRef = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    numbersRef.current.forEach((el, i) => {
      if (!el) return
      const stat = STATS[i]
      
      gsap.fromTo(el,
        { textContent: 0 },
        {
          textContent: stat.target,
          duration: 2.5,
          ease: 'power2.out',
          snap: { textContent: stat.isFloat ? 0.1 : 1 },
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            once: true
          }
        }
      )
    })
  }, [])

  return (
    <div 
      ref={containerRef}
      className="relative w-full bg-bg-dark px-20 py-[52px] flex justify-center items-center overflow-hidden"
    >
      <div className="w-full max-w-[1400px] flex justify-between">
        {STATS.map((stat, i) => (
          <React.Fragment key={i}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex-1 text-center px-10"
            >
              <div className="flex flex-col items-center">
                <div className="flex items-baseline gap-1">
                  {stat.prefix && (
                    <span className="font-display italic text-[24px] text-green-glow opacity-60">
                      {stat.prefix}
                    </span>
                  )}
                  <span 
                    ref={el => { numbersRef.current[i] = el }}
                    className="font-display font-bold italic text-[clamp(36px,4vw,56px)] text-green-glow"
                    style={{ textShadow: '0 0 30px rgba(116,198,157,0.4)' }}
                  >
                    0
                  </span>
                  {stat.suffix && (
                    <span className="font-display italic text-[24px] text-green-glow opacity-80">
                      {stat.suffix}
                    </span>
                  )}
                </div>
                <p className="font-body text-[14px] text-text-on-dark/55 mt-1.5 uppercase tracking-wide">
                  {stat.label}
                </p>
                <p className="font-mono text-[11px] text-text-on-dark/25 mt-1 uppercase tracking-[0.1em]">
                  {stat.caption}
                </p>
              </div>
            </motion.div>
            {i < STATS.length - 1 && (
              <div className="w-[1px] h-[80px] bg-text-on-dark/10 self-center" />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}
