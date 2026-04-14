'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { IconGlobe, IconStellar } from '@/components/ui/Icons'
import Link from 'next/link'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const NAV_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Pathways', href: '#pathways' },
  { label: 'Docs', href: '/docs' },
]

const LANGUAGES = [
  { id: 'en', label: 'EN' },
  { id: 'hi', label: 'हि' },
  { id: 'te', label: 'తె' },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeLang, setActiveLang] = useState('en')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      initial={false}
      animate={{
        backgroundColor: isScrolled ? 'rgba(245, 240, 232, 0.88)' : 'rgba(245, 240, 232, 0)',
        backdropFilter: isScrolled ? 'blur(20px) saturate(180%)' : 'blur(0px) saturate(100%)',
        borderBottomColor: isScrolled ? 'rgba(27, 47, 26, 0.08)' : 'rgba(27, 47, 26, 0)',
        boxShadow: isScrolled ? '0 2px 20px rgba(27, 47, 26, 0.06)' : '0 0 0 rgba(0, 0, 0, 0)',
      }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="fixed top-0 left-0 w-full h-[72px] z-[9997] border-b transition-colors"
    >
      <div className="max-w-[1400px] mx-auto h-full px-[48px] flex items-center justify-between">
        {/* LEFT: LOGO */}
        <Link href="/" className="flex items-center gap-2 group">
          <IconGlobe size={24} color="#2D6A4F" strokeWidth={2} />
          <span className="font-display font-semibold text-[20px] text-text-dark">
            BhumiChain
          </span>
        </Link>

        {/* CENTER: NAV LINKS */}
        <div className="hidden lg:flex items-center gap-[32px]">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="relative text-text-body text-[15px] transition-colors hover:text-green-primary group"
            >
              {link.label}
              <span className="absolute left-0 bottom-[-4px] w-full h-[1.5px] bg-green-primary origin-left scale-x-0 transition-transform duration-200 group-hover:scale-x-100" />
            </Link>
          ))}
        </div>

        {/* RIGHT: ACTIONS */}
        <div className="flex items-center gap-[24px]">
          {/* Language Toggle */}
          <div className="flex items-center">
            {LANGUAGES.map((lang, idx) => (
              <React.Fragment key={lang.id}>
                <button
                  onClick={() => setActiveLang(lang.id)}
                  className={cn(
                    "px-[10px] py-[4px] text-[13px] transition-all",
                    activeLang === lang.id ? "text-green-primary font-semibold" : "text-text-muted font-medium"
                  )}
                >
                  {lang.label}
                </button>
                {idx < LANGUAGES.length - 1 && (
                  <div className="w-[1px] h-[12px] bg-text-dark opacity-20" />
                )}
              </React.Fragment>
            ))}
          </div>

          <div className="w-[1px] h-[20px] bg-border" />

          {/* Connect Wallet Button */}
          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ y: 5 }}
            className="flex items-center gap-[10px] px-[22px] py-[10px] bg-green-primary text-[#F0EDE6] text-[14px] font-semibold rounded-pill btn-clay bg-clip-padding"
            style={{
               boxShadow: '0 5px 0 #1B4332, 0 8px 20px rgba(45, 106, 79, 0.25)'
            }}
          >
            <IconStellar size={16} />
            Connect Wallet
          </motion.button>
        </div>
      </div>
    </motion.nav>
  )
}
