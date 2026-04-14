'use client'

import { useState, useEffect } from 'react'
import Preloader from '@/components/ui/Preloader'
import CustomCursor from '@/components/ui/CustomCursor'
import ScrollProgress from '@/components/ui/ScrollProgress'
import SmoothScrollProvider from '@/components/providers/SmoothScrollProvider'

interface ClientShellProps {
  children: React.ReactNode
}

export default function ClientShell({ children }: ClientShellProps) {
  const [loaded, setLoaded] = useState(false)

  return (
    <>
      {!loaded && <Preloader onComplete={() => setLoaded(true)} />}
      <SmoothScrollProvider>
        <div
          style={{
            opacity: loaded ? 1 : 0,
            transition: 'opacity 0.5s ease',
          }}
        >
          {children}
        </div>
      </SmoothScrollProvider>
      <CustomCursor />
      <ScrollProgress />
    </>
  )
}
