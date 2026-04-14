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
    <div className="mb-6">
      {/* Top Welcome Row */}
      <div className="flex justify-between items-start gap-6 mb-6">
        <h1 className="font-display font-bold text-[42px] text-text-dark leading-tight flex-1">
          Welcome Back, Eleanor!
        </h1>

        <div className="flex items-center gap-2 flex-shrink-0">
           {/* Search Bar */}
           <div className="relative group">
              <IconSearch size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-green-primary transition-colors" />
              <input 
                type="text" 
                placeholder="Search parcels, numbers, or IDs..."
                className="w-72 bg-white border border-border rounded-lg py-2 pl-9 pr-4 text-sm font-body text-text-dark placeholder:text-text-pale focus:outline-none focus:border-green-primary focus:ring-2 focus:ring-green-primary/10 transition-all"
              />
           </div>

           {/* User Avatar */}
           <div className="w-9 h-9 rounded-full border border-black/10 overflow-hidden flex-shrink-0">
              <img src="https://i.pravatar.cc/150?u=eleanor" alt="Eleanor" className="w-full h-full object-cover" />
           </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex items-center gap-1.5 flex-wrap">
         {QUICK_ACTIONS.map((action, i) => (
           <motion.button
             key={action.label}
             whileHover={{ scale: 1.02, y: -1 }}
             whileTap={{ scale: 0.98 }}
             className={`
               flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium text-xs transition-all border
               ${action.primary 
                 ? 'bg-[#1B3A2D] text-white border-[#1B3A2D] hover:bg-[#254F3D]' 
                 : 'bg-white text-text-dark border-border hover:border-text-muted hover:bg-zinc-50'}
             `}
           >
             {action.icon}
             <span>{action.label}</span>
           </motion.button>
         ))}
      </div>
    </div>
  )
}
