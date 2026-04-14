'use client'

import React, { useRef, useState, useEffect } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { IconSatellite, IconCheck, IconLandPlot, IconRuler, IconStellar, IconPhone, IconTablet, IconBuilding } from '@/components/ui/Icons'

function BentoCard({ 
  children, 
  className = '', 
  span = 'col-span-4'
}: { 
  children: React.ReactNode, 
  className?: string, 
  span?: string 
}) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x)
  const mouseYSpring = useSpring(y)

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['4deg', '-4deg'])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-6deg', '6deg'])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      initial={{ opacity: 0, y: 60, scale: 0.94 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ 
        type: 'spring', 
        stiffness: 300, 
        damping: 20 
      }}
      className={`relative rounded-[20px] overflow-hidden ${span} ${className}`}
    >
      <div style={{ transform: 'translateZ(20px)' }} className="h-full w-full">
        {children}
      </div>
    </motion.div>
  )
}

export default function FeaturesBento() {
  return (
    <section id="features" className="bg-bg-page pt-[120px] pb-24 px-20">
      <div className="max-w-[1280px] mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="font-display italic text-[12px] text-green-primary uppercase tracking-[2px] mb-4"
          >
            Platform Features
          </motion.p>
          <h2 className="font-display font-bold text-[clamp(36px,4.5vw,60px)] text-text-dark leading-tight">
            Everything land ownership <span className="accent-italic italic">should</span> be.
          </h2>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-12 gap-[14px]">
          
          {/* CARD A: AI GIS */}
          <BentoCard span="col-span-7 row-span-2" className="bg-bg-dark p-9 min-h-[480px]">
            <div className="flex h-full">
              <div className="w-[55%] flex flex-col justify-center">
                <span className="text-[#74C69D] text-[11px] font-mono tracking-widest uppercase mb-4">
                  AI GIS Technology
                </span>
                <h3 className="font-display font-semibold text-[28px] text-text-on-dark leading-tight mb-4">
                  Satellite boundary detection
                </h3>
                <p className="text-text-on-dark/60 text-[14px] leading-[1.7] mb-8 pr-8">
                  Proprietary AI models analyze multi-spectral satellite imagery to detect and verify land boundaries with precision and historical consistency.
                </p>
                <div className="flex items-center gap-2 bg-green-bright/15 text-green-glow px-4 py-2 rounded-pill w-fit border border-green-bright/10 font-mono text-[11px]">
                  Sentinel-2 · 3m · 98.7% accuracy
                </div>
              </div>
              <div className="w-[45%] relative flex items-center justify-center">
                 <svg className="w-full h-full opacity-20 absolute inset-0">
                    <pattern id="grid-dark" width="20" height="20" patternUnits="userSpaceOnUse">
                       <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(240,237,230,0.1)" strokeWidth="0.5"/>
                    </pattern>
                    <rect width="100%" height="100%" fill="url(#grid-dark)" />
                 </svg>
                 <svg viewBox="0 0 200 200" className="w-[80%] h-[80%] z-10">
                  <defs>
                    <filter id="bentoGlow">
                      <feGaussianBlur stdDeviation="3" result="blur"/>
                      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
                    </filter>
                  </defs>
                  
                  <motion.path
                    d="M 40,55 L 95,35 L 148,50 L 162,95 L 145,148 L 100,162 L 52,148 L 30,98 Z"
                    fill="rgba(82,183,136,0)"
                    stroke="#52B788"
                    strokeWidth="1.5"
                    filter="url(#bentoGlow)"
                    initial={{pathLength: 0, fill: "rgba(82,183,136,0)"}}
                    whileInView={{
                      pathLength: [0, 1, 1],
                      fill: ["rgba(82,183,136,0)", "rgba(82,183,136,0)", "rgba(82,183,136,0.15)"]
                    }}
                    transition={{
                      pathLength: {duration: 1.8, ease: "easeInOut"},
                      fill: {duration: 0.4, delay: 1.8},
                      repeat: Infinity,
                      repeatDelay: 2
                    }}
                  />
                  
                  {/* Vertex dots */}
                  {[[40,55],[95,35],[148,50],[162,95],[145,148],[100,162],[52,148],[30,98]].map(([x,y],i) => (
                    <motion.circle 
                      key={i} 
                      cx={x} 
                      cy={y} 
                      r="3" 
                      fill="#74C69D"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ delay: 1.8 + (0.15 * i) }}
                    />
                  ))}
                  
                  {/* Grid lines (faint, technical feel) */}
                  {[50,100,150].map(v => (
                    <React.Fragment key={v}>
                      <line x1="0" y1={v} x2="200" y2={v} 
                            stroke="rgba(82,183,136,0.08)" strokeWidth="0.5"/>
                      <line x1={v} y1="0" x2={v} y2="200"
                            stroke="rgba(82,183,136,0.08)" strokeWidth="0.5"/>
                    </React.Fragment>
                  ))}
                 </svg>
              </div>
            </div>
          </BentoCard>

          {/* CARD B: Stellar Asset */}
          <BentoCard span="col-span-5 row-span-2" className="bg-white border border-border p-8 min-h-[480px] card-depth">
            <div className="h-full flex flex-col">
               <div className="w-full h-[140px] bg-bg-darker rounded-[12px] mb-6 relative overflow-hidden flex items-center justify-center">
                  <svg viewBox="0 0 100 100" className="w-[60%] h-[60%] parcel-glow">
                    <path d="M25 25 L75 30 L80 75 L20 70 Z" fill="rgba(82,183,136,0.15)" stroke="#52B788" strokeWidth="2" strokeDasharray="4 2" />
                  </svg>
               </div>
               <div className="flex justify-between items-start mb-1">
                  <span className="text-green-primary text-[12px] font-mono font-medium">IND-TEL-142/3</span>
                  <div className="bg-green-pale text-green-primary px-2 py-0.5 rounded-sm flex items-center gap-1.5 font-bold text-[10px]">
                    <IconCheck size={10} strokeWidth={3} />
                    VERIFIED
                  </div>
               </div>
               <h3 className="font-display font-bold text-[22px] text-text-dark mb-1">Survey No. 142/3</h3>
               <p className="text-text-muted text-[13px] mb-5">Warangal North, Telangana</p>
               
               <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border mb-6">
                  <div>
                    <p className="text-[10px] text-text-pale uppercase font-semibold">Area</p>
                    <p className="text-[14px] text-text-body font-medium">2.1 Acres</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-text-pale uppercase font-semibold">Value</p>
                    <p className="text-[14px] text-text-body font-medium">₹1.2M XLM</p>
                  </div>
               </div>

               <div className="mt-auto flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-primary flex items-center justify-center text-white text-[12px] font-bold">RK</div>
                  <div className="flex flex-col">
                     <span className="text-[13px] font-semibold text-text-dark">Rajesh Kumar</span>
                     <span className="text-[11px] font-mono text-text-muted">GB2N...9W3Z</span>
                  </div>
               </div>
            </div>
          </BentoCard>

          {/* CARD C: Kleros */}
          <BentoCard className="bg-[#FFF3E0] border border-amber-land/15 p-7 flex flex-col justify-between h-[200px]">
             <div>
                <h4 className="font-display font-semibold text-[18px] text-amber-land mb-3">Community Justice</h4>
                <div className="grid grid-cols-5 gap-2 w-fit">
                   {[...Array(15)].map((_, i) => (
                     <motion.div 
                       key={i}
                       className={`w-2.5 h-2.5 rounded-full ${i < 11 ? 'bg-amber-land' : 'bg-amber-land/10'}`}
                       initial={{ scale: 0 }}
                       whileInView={{ scale: 1 }}
                       transition={{ delay: 0.05 * i }}
                     />
                   ))}
                </div>
             </div>
             <p className="text-amber-land/70 text-[12px] font-medium leading-tight">
                11 of 15 jurors have reached consensus on survey boundary dispute #724.
             </p>
          </BentoCard>

          {/* CARD D: Offline */}
          <BentoCard className="bg-white border border-border p-7 flex flex-col justify-between h-[200px]">
             <div className="flex gap-6 justify-between items-center mb-4">
                <IconPhone size={32} className="text-text-muted opacity-40" />
                <motion.div
                  animate={{ x: [0, 40, 80, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                  className="w-1.5 h-1.5 rounded-full bg-green-primary"
                />
                <IconTablet size={32} className="text-text-muted opacity-40" />
                <IconBuilding size={32} className="text-text-muted opacity-40" />
             </div>
             <div>
                <h4 className="font-display font-semibold text-[18px] text-text-dark mb-1">Last-Mile Access</h4>
                <p className="text-text-muted text-[12px] leading-tight">
                   Seamlessly sync data via mobile app, tab, or local village kiosks.
                </p>
             </div>
          </BentoCard>

          {/* CARD E: Multi-sig */}
          <BentoCard className="bg-white border border-border p-7 flex flex-col justify-between h-[200px]">
             <div className="flex items-center gap-4 mb-4">
                <div className="flex flex-col items-center gap-1">
                   <div className="w-10 h-10 rounded-full border border-green-bright flex items-center justify-center">
                      <IconCheck size={14} className="text-green-bright" />
                   </div>
                   <span className="text-[10px] uppercase font-bold text-green-bright">Owner</span>
                </div>
                <div className="flex-1 h-[1px] bg-border relative overflow-hidden">
                   <motion.div 
                    animate={{ x: ['-100%', '300%'] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    className="w-1/4 h-full bg-green-primary/40"
                   />
                </div>
                <div className="flex flex-col items-center gap-1">
                   <div className="w-10 h-10 rounded-full border border-green-bright flex items-center justify-center">
                      <IconCheck size={14} className="text-green-bright" />
                   </div>
                   <span className="text-[10px] uppercase font-bold text-green-bright">Govt</span>
                </div>
             </div>
             <div>
                <h4 className="font-display font-semibold text-[18px] text-text-dark mb-1">Multi-sig Safety</h4>
                <p className="text-text-muted text-[12px] leading-tight">
                   Dual-approval required for all land modifications on the Stellar network.
                </p>
             </div>
          </BentoCard>

        </div>
      </div>
    </section>
  )
}
