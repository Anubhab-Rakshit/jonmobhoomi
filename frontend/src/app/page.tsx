'use client'

import React from 'react'
import Navbar from '@/components/landing/Navbar'
import Hero from '@/components/landing/Hero'
import StatsBar from '@/components/landing/StatsBar'
import HowItWorks from '@/components/landing/HowItWorks'
import FeaturesBento from '@/components/landing/FeaturesBento'
import StickyFeatures from '@/components/landing/StickyFeatures'
import TestimonialMarquee from '@/components/landing/Marquee'
import Pathways from '@/components/landing/Pathways'
import HomeFooter from '@/components/landing/HomeFooter'

export default function Home() {
  return (
    <main className="relative min-h-screen bg-bg-page overflow-hidden">
      {/* Background Topographic Decoration */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
         <svg className="w-full h-full opacity-[0.06]" viewBox="0 0 1400 3000" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 400 Q400 350 700 450 T1400 400" stroke="#1B2F1A" strokeWidth="1" />
            <path d="M0 800 Q300 700 800 900 T1400 750" stroke="#1B2F1A" strokeWidth="1" />
            <path d="M0 1200 Q500 1300 900 1100 T1400 1250" stroke="#1B2F1A" strokeWidth="1" />
            <path d="M0 1600 Q400 1500 700 1700 T1400 1650" stroke="#1B2F1A" strokeWidth="1" />
            <path d="M0 2000 Q300 2100 800 1900 T1400 2050" stroke="#1B2F1A" strokeWidth="1" />
            <path d="M0 2400 Q500 2300 900 2500 T1400 2450" stroke="#1B2F1A" strokeWidth="1" />
            <path d="M0 2800 Q400 2900 700 2700 T1400 2850" stroke="#1B2F1A" strokeWidth="1" />
         </svg>
      </div>

      <Navbar />
      
      <div className="relative z-10 w-full">
         {/* Hero is the first interaction area */}
         <Hero />
         
         <div className="relative z-20">
            <StatsBar />
            <HowItWorks />
            <FeaturesBento />
            <StickyFeatures />
            <TestimonialMarquee />
            <Pathways />
         </div>

         <HomeFooter />
      </div>

      {/* Global Noise Overlay (CSS fallback) */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.015] mix-blend-overlay z-[9999]" 
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      />
    </main>
  )
}
