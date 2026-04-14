'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { IconArrowRight } from '@/components/ui/Icons'

const INDIA_PATH_FLAT =
  'M200 10 L230 25 L255 20 L275 40 L285 70 L300 80 L310 105 L295 120 L300 145 L315 160 L320 185 L305 205 L308 230 L295 255 L280 280 L265 300 L255 330 L240 355 L220 380 L200 400 L180 380 L160 355 L145 330 L135 300 L120 280 L105 255 L92 230 L95 205 L80 185 L85 160 L100 145 L105 120 L90 105 L100 80 L115 70 L125 40 L145 20 L170 25 Z'

const CITIES = [
  { x: 185, y: 100, name: 'Delhi' },
  { x: 130, y: 240, name: 'Mumbai' },
  { x: 195, y: 320, name: 'Bengaluru' },
  { x: 230, y: 280, name: 'Hyderabad' },
  { x: 270, y: 185, name: 'Kolkata' },
]

export default function GeoMapPreview() {
  return (
    <div className="bg-[#101413] rounded-lg h-64 overflow-hidden relative group border-none shadow-lg">
       {/* Background Map Animation */}
       <div className="absolute inset-0 flex items-center justify-center p-3">
          <svg viewBox="0 0 400 420" className="h-full w-full" preserveAspectRatio="xMidYMid slice" opacity-50>
             <path
               d={INDIA_PATH_FLAT}
               fill="rgba(255,255,255,0.03)"
               stroke="rgba(255,255,255,0.15)"
               strokeWidth="0.8"
             />
             
             {/* City Labels */}
             {CITIES.map(city => (
               <g key={city.name}>
                  <circle cx={city.x} cy={city.y} r="1.5" fill="rgba(255,255,255,0.7)" />
                  <text 
                    x={city.x + 4} 
                    y={city.y + 2} 
                    className="font-mono text-[6px] fill-white/50 uppercase tracking-tighter"
                  >
                     {city.name}
                  </text>
               </g>
             ))}

             {/* User's Parcels (Glowing) */}
             <motion.path 
               d="M170 290 L185 305 L175 320 L160 310 Z"
               fill="rgba(82,183,136,0.5)"
               stroke="#52B788"
               strokeWidth="1.5"
               animate={{ opacity: [0.6, 1, 0.6] }}
               transition={{ duration: 3, repeat: Infinity }}
               style={{ filter: 'drop-shadow(0 0 8px rgba(82,183,136,0.6))' }}
             />
             <motion.path 
               d="M210 260 L220 270 L210 280 L200 275 Z"
               fill="rgba(254,188,46,0.5)"
               stroke="#FEBC2E"
               strokeWidth="1.5"
               animate={{ opacity: [0.6, 1, 0.6] }}
               transition={{ duration: 3, repeat: Infinity, delay: 1 }}
               style={{ filter: 'drop-shadow(0 0 8px rgba(254,188,46,0.6))' }}
             />

          </svg>
       </div>

       {/* Top Left Title */}
       <div className="absolute top-3 left-4 pointer-events-none">
          <span className="text-white font-display font-medium uppercase tracking-widest text-[10px]">
             Geoland Map
          </span>
       </div>

       {/* Bottom-left Info Overlay */}
       <div className="absolute bottom-4 left-4 flex flex-col gap-0.5 pointer-events-none">
          <h3 className="font-display font-bold uppercase tracking-widest text-sm text-white leading-none">
             Geoland Map
          </h3>
          <span className="text-[#A5B3AC] text-xs font-body">
             Verifiable NFTs in India
          </span>
       </div>
    </div>
  )
}
