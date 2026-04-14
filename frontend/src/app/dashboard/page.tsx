'use client'

import React from 'react'
import Sidebar from '@/components/dashboard/Sidebar'
import DashboardHeader from '@/components/dashboard/DashboardHeader'
import StatsGrid from '@/components/dashboard/StatsGrid'
import ParcelList from '@/components/dashboard/ParcelList'
import ActivityTimeline from '@/components/dashboard/ActivityTimeline'
import GeoMapPreview from '@/components/dashboard/GeoMapPreview'

export default function DashboardPage() {
  return (
    <main className="flex min-h-screen bg-bg-page overflow-hidden">
      <Sidebar />

      <div className="flex-1 overflow-y-auto h-screen relative no-scrollbar">
         {/* Subtle Topo deco overlay (same as landing but lower opacity) */}
         <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-[0.03]">
            <svg width="100%" height="200%" viewBox="0 0 1000 2000" fill="none" preserveAspectRatio="xMidYMid slice">
               <path d="M0 200 Q250 150 500 250 T1000 200" stroke="#1B2F1A" strokeWidth="0.5" />
               <path d="M0 600 Q300 500 700 700 T1000 650" stroke="#1B2F1A" strokeWidth="0.5" />
               <path d="M0 1000 Q400 1100 800 900 T1000 1050" stroke="#1B2F1A" strokeWidth="0.5" />
            </svg>
         </div>

         <div className="relative z-10 w-full px-8 py-8">
            <div className="max-w-[1600px] mx-auto">
               <DashboardHeader />

               <div className="flex gap-8 mt-8">
                  <div className="flex-1 flex flex-col gap-6">
                     <StatsGrid />
                     <ParcelList />
                  </div>

                  <div className="w-[380px] flex flex-col gap-6">
                     <ActivityTimeline />
                     <GeoMapPreview />
                  </div>
               </div>

               <footer className="mt-12 pt-8 border-t border-border flex justify-between items-center text-text-pale text-[12px] font-body">
                  <p>© 2026 BhumiChain Registry Platform</p>
                  <div className="flex gap-4">
                     <span>Privacy Policy</span>
                     <span>Terms of Service</span>
                     <span>Support Hub</span>
                  </div>
               </footer>
            </div>
         </div>
      </div>

      {/* Global Noise Overlay (CSS fallback) */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.015] mix-blend-overlay z-[9999]" 
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      />
    </main>
  )
}
