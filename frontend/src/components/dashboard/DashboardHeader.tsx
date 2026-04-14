'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { IconSearch, IconPlus, IconMap, IconFileText, IconBarChart, IconTag } from '@/components/ui/Icons'

const QUICK_ACTIONS = [
  { label: 'Register New Parcel', icon: <IconPlus size={14} />, primary: true },
  { label: 'View Map', icon: <IconMap size={14} /> },
  { label: 'Generate Report', icon: <IconFileText size={14} /> },
  { label: 'Analyze Value', icon: <IconBarChart size={14} /> },
  { label: 'List for Sale', icon: <IconTag size={14} /> },
]

export default function DashboardHeader() {
  return (
    <div className="mb-8">
      {/* Top Welcome Row */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-display font-bold text-[40px] text-text-dark leading-tight">
          Welcome Back, Eleanor!
        </h1>

        <div className="flex items-center gap-3">
           {/* Search Bar */}
           <div className="relative group">
              <IconSearch size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-green-primary transition-colors" />
              <input 
                type="text" 
                placeholder="Search parcels, numbers, or IDs..."
                className="w-[360px] bg-white border border-border rounded-xl py-2.5 pl-10 pr-4 text-[14px] font-body text-text-dark placeholder:text-text-pale focus:outline-none focus:border-green-primary focus:ring-2 focus:ring-green-primary/10 transition-all shadow-sm"
              />
           </div>

           {/* User Avatar */}
           <div className="w-10 h-10 rounded-full border border-black/10 overflow-hidden shadow-sm flex-shrink-0">
              <img src="https://i.pravatar.cc/150?u=eleanor" alt="Eleanor" className="w-full h-full object-cover" />
           </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex items-center gap-2 flex-wrap">
         {QUICK_ACTIONS.map((action, i) => (
           <motion.button
             key={action.label}
             whileHover={{ scale: 1.02, y: -1 }}
             whileTap={{ scale: 0.98 }}
             className={`
               flex items-center gap-2 px-3.5 py-2 rounded-xl font-medium text-[13px] transition-all border shadow-sm
               ${action.primary 
                 ? 'bg-[#1B3A2D] text-white border-[#1B3A2D] hover:bg-[#254F3D]' 
                 : 'bg-white text-text-dark border-border hover:border-text-muted hover:bg-zinc-50'}
             `}
           >
             {action.icon}
             {action.label}
           </motion.button>
         ))}
      </div>
    </div>
  )
}
