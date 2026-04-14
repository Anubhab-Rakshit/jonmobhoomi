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
    <div className="bg-[#FAF5ED] border border-border rounded-xl p-5 h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
         <h2 className="font-display font-bold text-[18px] text-text-dark">
            Activity Timeline
         </h2>
         <div className="flex gap-1.5">
            <div className="w-2 h-2 rounded-full bg-[#FEBC2E]" />
            <div className="w-2 h-2 rounded-full bg-[#52B788]" />
            <div className="w-2 h-2 rounded-full bg-[#1B3A2D]" />
         </div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar relative pr-2">
         {/* Vertical Line */}
         <div className="absolute left-[3px] top-2 bottom-5 w-[1px] bg-border" />

         <div className="flex flex-col">
            {EVENTS.map((event, i) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                className="relative pl-6 pb-6 last:pb-0"
              >
                {/* Dot */}
                <div 
                  className="absolute left-[0px] top-[6px] w-[7px] h-[7px] rounded-full z-10"
                  style={{ backgroundColor: event.color }}
                />

                <div className="flex justify-between items-center mb-0.5">
                   <span className="font-mono text-[13px] text-text-dark">
                      {event.address}
                   </span>
                   <span className="text-[12px] text-text-muted">
                      {event.time}
                   </span>
                </div>
                
                <h4 className="text-[14px] text-[#1B3A2D] font-body font-medium">
                   {event.title}
                </h4>
              </motion.div>
            ))}
         </div>
      </div>
    </div>
  )
}
