'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  IconGlobe, 
  IconGrid, 
  IconLandPlot, 
  IconMapPin, 
  IconPlusSquare, 
  IconArrowLeftRight, 
  IconScale, 
  IconShieldCheck, 
  IconFileStack,
  IconSettings,
  IconHelpCircle
} from '@/components/ui/Icons'

const NAV_ITEMS = [
  { label: 'Dashboard', icon: <IconGrid size={18} />, href: '/dashboard' },
  { label: 'My Parcels', icon: <IconLandPlot size={18} />, href: '/dashboard/parcels', badge: '3' },
  { label: 'GIS Map', icon: <IconMapPin size={18} />, href: '/dashboard/map', badge: 'LIVE', badgeColor: 'bg-green-bright' },
  { label: 'Register Land', icon: <IconPlusSquare size={18} />, href: '/dashboard/register', hasArrow: true },
  { label: 'Transfer', icon: <IconArrowLeftRight size={18} />, href: '/dashboard/transfer' },
  { label: 'Disputes', icon: <IconScale size={18} />, href: '/dashboard/disputes', badge: '0' },
  { label: 'Verify', icon: <IconShieldCheck size={18} />, href: '/dashboard/verify' },
  { label: 'Documents', icon: <IconFileStack size={18} />, href: '/dashboard/documents' },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-[260px] h-screen flex-shrink-0 bg-bg-dark border-r border-white/10 flex flex-col z-[100]">
      {/* Top Section */}
      <div className="p-5 pb-4">
        <Link href="/" className="flex items-center gap-2 mb-6">
           <IconGlobe size={24} color="#52B788" />
           <span className="font-display font-semibold text-[18px] text-text-on-dark tracking-tighter">
              GeoLand Atlas
           </span>
        </Link>

        {/* Wallet Card */}
        <div className="bg-white/5 border border-white/10 rounded-[12px] p-4">
           <p className="text-[10px] font-mono uppercase tracking-widest text-text-on-dark-muted mb-1">
              Wallet Balance
           </p>
           <h4 className="font-display font-bold text-[20px] text-text-on-dark mb-0.5">
              $2,150.32
           </h4>
           <p className="text-[12px] font-mono text-text-on-dark/40 mb-4">
              0.785 XLM
           </p>
           <button className="w-full py-2 border border-white/20 rounded-md text-[13px] text-text-on-dark font-medium hover:bg-white/5 transition-colors">
              Connect
           </button>
        </div>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 overflow-y-auto px-3 py-2 space-y-1">
         {NAV_ITEMS.map((item) => {
           const isActive = pathname === item.href
           return (
             <Link key={item.label} href={item.href ?? '#'}>
                <motion.div
                  whileHover={{ x: 2 }}
                  className={`
                    flex items-center justify-between px-3 py-2.5 rounded-[10px] group transition-colors relative
                    ${isActive ? 'bg-white/8 text-text-on-dark' : 'text-text-on-dark-muted hover:bg-white/5 hover:text-text-on-dark'}
                  `}
                >
                   {isActive && (
                     <motion.div 
                       layoutId="active-indicator"
                       className="absolute left-0 top-2 bottom-2 w-[3px] bg-green-bright rounded-full"
                     />
                   )}
                   <div className="flex items-center gap-3">
                      <span className={isActive ? 'text-green-bright' : 'text-inherit group-hover:text-green-bright transition-colors'}>
                         {item.icon}
                      </span>
                      <span className="text-[13px] font-medium tracking-tight">{item.label}</span>
                   </div>
                   
                   {item.badge && (
                     <span className={`
                       px-2 py-0.5 rounded-pill text-[9px] font-bold font-mono
                       ${item.badgeColor || 'bg-white/10 text-text-on-dark/50'}
                       ${item.badge === 'LIVE' ? 'animate-pulse' : ''}
                     `}>
                        {item.badge}
                     </span>
                   )}
                   
                   {item.hasArrow && (
                     <span className="opacity-40 group-hover:opacity-100 transition-opacity">
                        <IconArrowLeftRight size={12} className="rotate-[-45deg]" />
                     </span>
                   )}
                </motion.div>
             </Link>
           )
         })}

         <div className="h-[1px] bg-white/5 mx-3 my-4" />
         
         <Link href="/dashboard/settings">
            <div className="flex items-center gap-3 px-3 py-2.5 text-text-on-dark-muted hover:text-text-on-dark transition-colors">
               <IconSettings size={18} />
               <span className="text-[13px] font-medium tracking-tight">Settings</span>
            </div>
         </Link>
         <Link href="/dashboard/help">
            <div className="flex items-center gap-3 px-3 py-2.5 text-text-on-dark-muted hover:text-text-on-dark transition-colors">
               <IconHelpCircle size={18} />
               <span className="text-[13px] font-medium tracking-tight">Help</span>
            </div>
         </Link>
      </nav>

      {/* Bottom Section */}
      <div className="p-5 pt-0">
         <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
               <div className="w-1.5 h-1.5 rounded-full bg-green-bright animate-pulse" />
               <span className="text-[11px] font-mono text-text-on-dark/40 uppercase tracking-widest">Stellar Testnet</span>
            </div>
            <p className="text-[11px] font-mono text-text-on-dark/20">Block #14,291,847</p>
         </div>
      </div>
    </aside>
  )
}
