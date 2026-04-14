'use client'

import React from 'react'
import { motion } from 'framer-motion'

const EVENTS = [
  { id: 1, title: 'NFT Minted', address: '0x937...f1a4e', time: '2h ago', color: '#1B3A2D' },
  { id: 2, title: 'Status Update', address: '0x22c...a6b1c', time: '1d ago', color: '#FEBC2E' },
  { id: 3, title: 'Asset Verification', address: '0x11d...e3a0d', time: '3d ago', color: '#1B3A2D' },
  { id: 4, title: 'Portfolio Value Updated', address: '$1.4M USD', time: '4d ago', color: '#1B3A2D' },
]

export default function ActivityTimeline() {
  return (
    <div className="bg-[#FAF5ED] border border-border rounded-lg p-5 h-64 flex flex-col">
      <div className="flex justify-between items-center mb-4">
         <h2 className="font-display font-bold text-base text-text-dark">
            Activity Timeline
         </h2>
         <div className="flex gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-[#FEBC2E]" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#52B788]" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#1B3A2D]" />
         </div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar relative pr-2">
         {/* Vertical Line */}
         <div className="absolute left-[2px] top-2 bottom-4 w-px bg-border" />

         <div className="flex flex-col">
            {EVENTS.map((event, i) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -6 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                className="relative pl-5 pb-4 last:pb-0"
              >
                {/* Dot */}
                <div 
                  className="absolute left-[-4px] top-1 w-2 h-2 rounded-full z-10"
                  style={{ backgroundColor: event.color }}
                />

                <div className="flex justify-between items-center mb-0.5 gap-2">
                   <span className="font-mono text-xs text-text-dark truncate">
                      {event.address}
                   </span>
                   <span className="text-xs text-text-muted flex-shrink-0">
                      {event.time}
                   </span>
                </div>
                
                <h4 className="text-xs text-[#1B3A2D] font-medium">
                   {event.title}
                </h4>
              </motion.div>
            ))}
         </div>
      </div>
    </div>
  )
}
