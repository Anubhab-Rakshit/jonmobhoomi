'use client'

import React, { useEffect, useRef } from 'react'
import { motion, useSpring, useMotionValue, useTransform, AnimatePresence, useScroll } from 'framer-motion'
import { gsap } from '@/lib/gsap'
import { IconArrowRight, IconSatellite } from '@/components/ui/Icons'

export function LiveGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pointerInteracting = useRef<number | null>(null)
  const pointerInteractionMovement = useRef(0)
  
  useEffect(() => {
    let phi = 0;
    let globeObj: any = null;

    import(/* webpackIgnore: true */ "https://esm.sh/cobe@0.6.3").then(m => {
      const createGlobe = m.default;
      if (!canvasRef.current) return;

      globeObj = createGlobe(canvasRef.current, {
        devicePixelRatio: 2,
        width: 1040,
        height: 1040,
        phi: 0,
        theta: 0.3,
        dark: 0,
        diffuse: 1.2,
        mapSamples: 16000,
        mapBrightness: 6,
        baseColor: [0.106, 0.227, 0.176], 
        markerColor: [0.941, 0.929, 0.902], 
        glowColor: [0.322, 0.717, 0.533], 
        markers: [
          { location: [20.5937, 78.9629], size: 0.08 }
        ],
        onRender: (state: Record<string, any>) => {
          if (pointerInteracting.current === null) {
            phi += 0.003;
          }
          state.phi = phi + pointerInteractionMovement.current;
        }
      });
    });

    return () => {
      if (globeObj) globeObj.destroy();
    }
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center p-20 cursor-grab active:cursor-grabbing">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.34, 1.56, 0.64, 1] as any, delay: 0.8 }}
        className="relative w-[520px] h-[520px] flex items-center justify-center rounded-full"
      >
        <canvas
          ref={canvasRef}
          style={{ width: 520, height: 520, margin: 'auto' }}
          onPointerDown={(e) => {
            pointerInteracting.current = e.clientX - pointerInteractionMovement.current;
            if(canvasRef.current) canvasRef.current.style.cursor = 'grabbing';
          }}
          onPointerUp={() => {
            pointerInteracting.current = null;
            if(canvasRef.current) canvasRef.current.style.cursor = 'grab';
          }}
          onPointerOut={() => {
            pointerInteracting.current = null;
            if(canvasRef.current) canvasRef.current.style.cursor = 'grab';
          }}
          onMouseMove={(e) => {
            if (pointerInteracting.current !== null) {
              const delta = e.clientX - pointerInteracting.current;
              pointerInteractionMovement.current = delta * 0.01;
            }
          }}
          onTouchMove={(e) => {
            if (pointerInteracting.current !== null && e.touches[0]) {
              const delta = e.touches[0].clientX - pointerInteracting.current;
              pointerInteractionMovement.current = delta * 0.01;
            }
          }}
        />
        
        {/* HUD Brackets */}
        <AnimatePresence>
          {[
            'top-4 left-4 border-t-2 border-l-2',
            'top-4 right-4 border-t-2 border-r-2',
            'bottom-4 left-4 border-b-2 border-l-2',
            'bottom-4 right-4 border-b-2 border-r-2',
          ].map((pos, i) => (
            <motion.div
              key={pos}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 2.2 + i * 0.1, duration: 0.5 }}
              className={`absolute w-8 h-8 border-[#52B788]/60 ${pos} pointer-events-none`}
            />
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

export default function Hero() {
  const hindiRef = useRef<HTMLDivElement>(null)
  const statsRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 })

    // Element 1: Overline
    tl.fromTo('.hero-overline', 
      { x: -30, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }
    )

    // Element 2: Headlines
    tl.fromTo(['.hero-hindi-line', '.hero-english-line'],
      { y: 60, opacity: 0, rotateX: -90 },
      { y: 0, opacity: 1, rotateX: 0, stagger: 0.15, duration: 0.8, ease: 'back.out(1.4)', transformPerspective: 800 },
      '-=0.2'
    )

    // Element 4-6: Sub, Body, CTAs
    tl.fromTo(['.hero-sub', '.hero-body', '.hero-ctas'],
      { y: 20, opacity: 0, filter: 'blur(4px)' },
      { y: 0, opacity: 1, filter: 'blur(0px)', stagger: 0.15, duration: 0.7, ease: 'power2.out' },
      '-=0.3'
    )

    // Element 7: Stats Count up (on mount)
    statsRefs.current.forEach((el, i) => {
      if (!el) return
      const target = parseFloat(el.dataset.val || '0')
      const isFloat = el.dataset.isfloat === 'true'
      gsap.fromTo(el,
        { textContent: 0 },
        { 
          textContent: target, 
          duration: 3, 
          ease: 'power2.out',
          snap: { textContent: isFloat ? 0.1 : 1 },
        }
      )
    })
  }, [])

  const { scrollY } = useScroll()
  const globeY = useTransform(scrollY, [0, 1000], [0, 300])

  return (
    <section className="relative w-full h-svh grid grid-cols-[52%_48%] topo-bg">
      {/* LEFT SIDE */}
      <div className="pl-[80px] pt-[72px] flex flex-col justify-center">
        {/* Overline */}
        <div className="hero-overline flex items-center gap-3 mb-5 opacity-0">
          <div className="w-10 h-[1.5px] bg-green-primary" />
          <span className="font-display italic text-[12px] text-green-primary uppercase tracking-[2px]">
            Decentralized Land Registry · India
          </span>
        </div>

        {/* Combined Headline */}
        <h1 style={{fontFamily: 'Fraunces, serif', fontWeight: 700, lineHeight: 1.0, letterSpacing: '-1px'}}>
          <div className="hero-hindi-line" style={{display: 'block', fontSize: 'clamp(36px, 5vw, 60px)', color: '#1B2F1A', marginBottom: '8px'}}>
            पारदर्शिता. ज़मीन. नवाचार.
          </div>
          <div className="hero-english-line" style={{display: 'block', fontSize: 'clamp(52px, 7.5vw, 96px)', color: '#1B2F1A'}}>
            GLOBAL LAND
          </div>
          <div className="hero-english-line" style={{display: 'block', fontSize: 'clamp(52px, 7.5vw, 96px)'}}>
            <span style={{
              background: 'linear-gradient(135deg, #2D6A4F, #52B788, #74C69D)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontStyle: 'italic',
              backgroundSize: '200% 200%',
            }}>
              INTELLIGENCE
            </span>
          </div>
        </h1>

        {/* Subheadline */}
        <div className="hero-sub mt-7 flex items-center gap-3 opacity-0">
          <div className="w-10 h-[1px] bg-green-primary opacity-50" />
          <span className="font-display italic text-[11px] text-green-primary uppercase tracking-widest">
            Transforming Land Asset Data
          </span>
        </div>

        {/* Body */}
        <p className="hero-body mt-5 max-w-[420px] text-text-body text-[17px] leading-[1.75] opacity-0">
          Leveraging AI and blockchain to build a secure, transparent, 
          and verifiable ecosystem for land records, ownership verification, 
          and market intelligence across India and beyond.
        </p>

        {/* CTAs */}
        <div className="hero-ctas mt-9 flex items-center gap-4 opacity-0 text-[15px]">
          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ y: 5 }}
            className="group flex items-center gap-3 px-7 py-3.5 bg-green-primary text-[#F0EDE6] font-semibold rounded-pill btn-clay shadow-[0_5px_0_#1B4332,0_8px_20px_rgba(45,106,79,0.25)]"
          >
            Connect Freighter Wallet
            <IconArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </motion.button>

          <button className="px-7 py-3.5 border-[1.5px] border-border-medium text-text-dark font-semibold rounded-pill hover:bg-black/5 transition-colors">
            Explore the Registry
          </button>
        </div>

        {/* Stats Pills */}
        <div className="mt-[52px] flex items-center gap-3">
          {[
            { val: 15400, unit: '+', label: 'VERIFIED PARCELS' },
            { val: 3.2, unit: 'M+', label: 'ACRES MAPPED', isFloat: true },
            { val: 98.7, unit: '%', label: 'AI CONFIDENCE', isFloat: true },
          ].map((stat, i) => (
            <div key={i} className="hero-ctas opacity-0" style={{
              background: 'rgba(255,255,255,0.7)',
              border: '1px solid rgba(27,47,26,0.1)',
              borderRadius: '999px',
              padding: '9px 22px',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 2px 12px rgba(27,47,26,0.06)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <span style={{ fontFamily: 'Fraunces, serif', fontWeight: 700, fontSize: '18px', color: '#1B2F1A' }}>
                <span ref={el => { statsRefs.current[i] = el }} data-val={stat.val} data-isfloat={stat.isFloat}>0</span>
                {stat.unit}
              </span>
              <span style={{ color: 'rgba(27,47,26,0.25)' }}>|</span>
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#7A9E87' }}>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT SIDE */}
      <motion.div style={{ y: globeY }} className="relative h-full flex items-center justify-center">
        <LiveGlobe />
      </motion.div>

      {/* Noise Overlay (CSS fallback) */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.02] mix-blend-overlay z-[9999]" 
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      />
    </section>
  )
}
