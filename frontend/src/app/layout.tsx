import type { Metadata } from 'next'
import './globals.css'
import ClientShell from '@/components/providers/ClientShell'

export const metadata: Metadata = {
  title: 'BhumiChain — India\'s Decentralized Land Registry',
  description:
    'BhumiChain digitizes and secures land ownership across India using the Stellar blockchain. Every parcel is a Stellar asset — transparent, immutable, and accessible.',
  keywords: ['land registry', 'blockchain', 'Stellar', 'India', 'land ownership', 'decentralized'],
  authors: [{ name: 'BhumiChain' }],
  openGraph: {
    title: 'BhumiChain — India\'s Decentralized Land Registry',
    description: 'Secure land ownership on Stellar blockchain.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <ClientShell>
          {children}
        </ClientShell>
      </body>
    </html>
  )
}
