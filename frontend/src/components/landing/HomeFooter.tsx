'use client'

import React from 'react'
import Link from 'next/link'
import { IconGlobe, IconGithub, IconStellar } from '@/components/ui/Icons'

const FOOTER_LINKS = [
  {
    title: 'Product',
    links: ['GIS Search', 'Tokenization', 'Transfer Hub', 'Arbitration']
  },
  {
    title: 'Governments',
    links: ['State Integration', 'Record Verification', 'Audit Portal', 'Custom API']
  },
  {
    title: 'Resources',
    links: ['Whitepaper', 'Dev Docs', 'Indian Land Law', 'Case Studies']
  },
  {
    title: 'Legal',
    links: ['Privacy Policy', 'Terms of Service', 'Dispute Bylaws', 'Stellar Registry']
  }
]

export default function HomeFooter() {
  return (
    <footer className="relative bg-[#0A1A10] pt-[72px] pb-[48px] px-20 border-t border-white/5">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-[1.5fr_1fr_1fr_1fr_1fr] gap-12 mb-20">
          {/* Logo Column */}
          <div className="flex flex-col gap-6">
             <div className="flex items-center gap-2">
                <IconGlobe size={24} color="#74C69D" />
                <span className="font-display font-semibold text-[20px] text-text-on-dark lowercase tracking-tighter">
                   BhumiChain
                </span>
             </div>
             <p className="font-display italic text-[15px] text-text-on-dark/40 max-w-[200px] leading-snug">
                Land rights, immutably yours. Secured on Stellar.
             </p>
          </div>

          {/* Link Columns */}
          {FOOTER_LINKS.map((col) => (
            <div key={col.title} className="flex flex-col gap-5">
               <h4 className="text-[11px] font-mono uppercase tracking-[0.2em] text-text-on-dark/25">
                  {col.title}
               </h4>
               <div className="flex flex-col gap-3">
                  {col.links.map((link) => (
                    <Link 
                      key={link} 
                      href="#" 
                      className="text-[13px] text-text-on-dark/45 font-body hover:text-text-on-dark transition-colors"
                    >
                      {link}
                    </Link>
                  ))}
               </div>
            </div>
          ))}
        </div>

        {/* Bottom Row */}
        <div className="pt-10 border-t border-white/5 flex items-center justify-between">
           <p className="text-[12px] text-text-on-dark/25 font-body">
              Built for India&apos;s 140M farmers. © 2026 BhumiChain.
           </p>

           <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 bg-green-bright/10 border border-green-bright/20 px-3 py-1.5 rounded-pill">
                 <IconStellar size={14} color="#74C69D" />
                 <span className="text-[12px] text-green-glow font-mono uppercase font-semibold">
                    Stellar · Freighter Wallet
                 </span>
              </div>
              <Link href="https://github.com" className="text-text-on-dark/30 hover:text-text-on-dark transition-colors">
                 <IconGithub size={20} />
              </Link>
           </div>
        </div>
      </div>
    </footer>
  )
}
