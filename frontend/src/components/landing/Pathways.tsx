'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { IconPhone, IconTablet, IconBuilding, IconCheck, IconStellar } from '@/components/ui/Icons'

const PATHS = [
  {
    title: 'Individual Farmer',
    icon: <IconPhone size={24} />,
    steps: ['Connect Freighter Wallet', 'Sync Local Documents', 'Submit for District Approval']
  },
  {
    title: 'Village Agent',
    icon: <IconTablet size={24} />,
    steps: ['Biometric Verification', 'Offline Queue Submission', 'Encrypted State Sync'],
    elevated: true
  },
  {
    title: 'Bank / Official',
    icon: <IconBuilding size={24} />,
    steps: ['Enterprise API Access', 'Bulk Verification', 'On-chain Audit Logs']
  }
]

export default function Pathways() {
  return (
    <section id="pathways" className="bg-bg-page py-32 px-20">
      <div className="max-w-[1280px] mx-auto">
        <div className="text-center mb-24">
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="font-display italic text-[12px] text-green-primary uppercase tracking-[2px] mb-4"
          >
            Last-Mile Access
          </motion.p>
          <h2 className="font-display font-bold text-[52px] text-text-dark leading-tight mb-2">
            Works for every farmer.
          </h2>
          <p className="font-display italic text-[24px] text-text-muted">
            Even without a phone.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-8 items-start mb-16">
          {PATHS.map((path, i) => (
            <motion.div
              key={path.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className={`relative bg-white rounded-[20px] p-10 border shadow-[0_1px_0_rgba(255,255,255,0.9)_inset,0_-4px_0_rgba(27,47,26,0.08),0_24px_48px_rgba(27,47,26,0.08)] ${path.elevated ? 'z-10' : 'border-border'}`}
              style={path.elevated ? {
                transform: 'translateY(-24px)',
                boxShadow: '0 1px 0 rgba(255,255,255,0.9) inset, 0 -4px 0 rgba(27,47,26,0.1), 0 32px 64px rgba(27,47,26,0.12), 0 0 40px rgba(45,106,79,0.06)',
                border: '1px solid rgba(45,106,79,0.15)'
              } : {}}
            >
              {path.elevated && (
                <div style={{
                  position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)',
                  background: '#2D6A4F', color: '#F0EDE6', fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '10px',
                  letterSpacing: '2px', padding: '4px 14px', borderRadius: '999px',
                  boxShadow: '0 4px 12px rgba(45,106,79,0.3)'
                }}>
                  MOST USED
                </div>
              )}
              <div className="w-14 h-14 rounded-full bg-green-pale flex items-center justify-center text-green-primary mb-8">
                {path.icon}
              </div>
              <h3 className="font-display font-semibold text-[24px] text-text-dark mb-10">
                {path.title}
              </h3>
              
              <div className="relative pl-8 h-fit">
                 {/* Connecting Line */}
                 <motion.div 
                   initial={{ scaleY: 0 }}
                   whileInView={{ scaleY: 1 }}
                   viewport={{ once: true }}
                   transition={{ delay: 0.5, duration: 1, ease: 'easeInOut' }}
                   className="absolute left-[3.5px] top-[10px] bottom-[10px] w-[1px] bg-border origin-top"
                 />
                 
                 <div className="space-y-12">
                    {path.steps.map((step, si) => (
                      <motion.div 
                        key={step} 
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.8 + si * 0.15 }}
                        className="relative flex items-center group"
                      >
                         <div className="absolute left-[-32px] w-2 h-2 rounded-full border border-green-primary bg-white z-10" />
                         <span className="text-text-body text-[14px] font-medium transition-colors group-hover:text-green-primary">
                            {step}
                         </span>
                      </motion.div>
                    ))}
                 </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Convergence Visualization */}
        <div className="flex flex-col items-center" style={{marginTop: '60px', position: 'relative'}}>
          <svg viewBox="0 0 800 120" width="100%" height="120">
            {/* Lines converging from each card to center hexagon */}
            <motion.path
              d="M 133,0 L 400,100"
              stroke="rgba(45,106,79,0.3)" strokeWidth="1.5" fill="none"
              strokeDasharray="5 3"
              initial={{pathLength: 0}}
              whileInView={{pathLength: 1}}
              transition={{duration: 0.8, delay: 0.2}}
            />
            <motion.path
              d="M 400,0 L 400,100"
              stroke="rgba(45,106,79,0.4)" strokeWidth="1.5" fill="none"
              initial={{pathLength: 0}}
              whileInView={{pathLength: 1}}
              transition={{duration: 0.8, delay: 0.3}}
            />
            <motion.path
              d="M 667,0 L 400,100"
              stroke="rgba(45,106,79,0.3)" strokeWidth="1.5" fill="none"
              strokeDasharray="5 3"
              initial={{pathLength: 0}}
              whileInView={{pathLength: 1}}
              transition={{duration: 0.8, delay: 0.2}}
            />
            
            {/* Center hexagon */}
            <motion.polygon
              points="400,58 420,69 420,91 400,102 380,91 380,69"
              fill="rgba(45,106,79,0.12)"
              stroke="#52B788"
              strokeWidth="1.5"
              initial={{scale: 0, opacity: 0}}
              whileInView={{scale: 1, opacity: 1}}
              transition={{duration: 0.5, delay: 0.9, ease: [0.34, 1.56, 0.64, 1] as any}}
              style={{transformOrigin: '400px 80px'}}
            />
            
            {/* Pulsing ring around hexagon */}
            <motion.circle
              cx="400" cy="80" r="18"
              fill="none" stroke="rgba(82,183,136,0.3)" strokeWidth="1"
              animate={{r: [18, 28, 18], opacity: [0.3, 0, 0.3]}}
              transition={{duration: 2, repeat: Infinity, ease: 'easeInOut'}}
            />
          </svg>
          
          <div style={{marginTop: '16px', display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'Fraunces, serif', fontStyle: 'italic', fontSize: '14px', color: '#2D6A4F', letterSpacing: '0.5px'}}>
             <IconStellar size={12} />
             Stellar Blockchain · Land Asset Registered
          </div>
        </div>
      </div>
    </section>
  )
}
