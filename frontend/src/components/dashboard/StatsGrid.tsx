'use client'

import React from 'react'
import { IconLandPlot, IconShieldCheck, IconTrendUp, IconTag } from '@/components/ui/Icons'

const STATS_DATA = [
  {
    label: 'Total Parcels Registered',
    value: '215',
    accent: 'verified',
    color: 'text-green-primary',
  },
  {
    label: 'My Verified Parcels',
    value: '148',
    accent: 'secure',
    color: 'text-[#B5621E]',
  },
  {
    label: 'Estimated Portfolio Value',
    value: '$1.4M',
    accent: 'USD',
    color: 'text-text-dark',
  },
  {
    label: 'Active NFT Listings',
    value: '12',
    accent: 'on market',
    color: 'text-text-dark',
  }
]

export default function StatsGrid() {
  return (
    <div className="grid grid-cols-4 gap-4 mb-6">
      {STATS_DATA.map((stat) => (
        <div 
          key={stat.label} 
          className="bg-white border border-border rounded-xl p-5"
        >
          <span className="block text-[10px] font-bold text-text-dark uppercase tracking-widest mb-3">
             {stat.label}
          </span>
          <div className="flex items-baseline gap-2">
             <span className={`font-display font-bold text-[36px] leading-none ${stat.value === '148' ? 'text-[#B5621E]' : 'text-text-dark'}`}>
                {stat.value}
             </span>
             <span className={`text-[15px] font-semibold ${stat.color} tracking-tight`}>
                {stat.accent}
             </span>
          </div>
        </div>
      ))}
    </div>
  )
}
