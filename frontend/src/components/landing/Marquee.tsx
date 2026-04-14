'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { IconStar } from '@/components/ui/Icons'

const TESTIMONIALS = [
  { name: 'Arjun Reddy', role: 'Farmer, Telangana', quote: 'BhumiChain is the first time I feel my land is truly safe from tampering. The registration was surprisingly simple at the local kiosk.' },
  { name: 'Dr. Kavita Iyer', role: 'Real Estate Attorney', quote: 'The transparency Stellar brings to land titles is revolutionary for Indian legal precedents. A must-have for modern land law.' },
  { name: 'Sanjay Deshmukh', role: 'Tehsildar, Maharashtra', quote: 'Automating boundary verifications with AI has reduced our workload and eliminated human error in survey records.' },
  { name: 'Meera Nair', role: 'Land Investor', quote: 'I can now verify ownership in seconds without running to government offices. This is the transparency the market needed.' },
  { name: 'Lokesh Gowda', role: 'Village Agent', quote: 'Helping farmers register their land via tablet has been a blessing. The biometric integration is rock solid.' },
  { name: 'Priyanka Sen', role: 'Urban Planner', quote: 'Accessing real-time GIS data of land parcels across districts enables us to plan infrastructure with extreme precision.' },
  { name: 'Rahul Varma', role: 'Bank Manager', quote: 'Collateral verification for farm loans is now instant. We trust the Stellar blockchain more than paper deeds.' },
  { name: 'Sunita Chauhan', role: 'NGO Worker', quote: 'Protecting the rights of small-scale farmers through immutable records is a massive step towards social justice.' },
  // Row 2 starts (additional 8)
  { name: 'Vikram Singh', role: 'District Collector', quote: 'The multi-sig approval process ensures accountability at every level of the land registration department.' },
  { name: 'Anjali Gupta', role: 'PropTech Founder', quote: 'Integrating our mortgage platform with BhumiChain APIs was seamless. Stellar assets are the future of real estate.' },
  { name: 'Karthik S.', role: 'Survey Officer', quote: 'Satellite history analysis in dispute resolution is common sense made technical. It simplifies my job immensely.' },
  { name: 'Deepa Rao', role: 'Home Buyer', quote: 'Buying a plot of land used to be terrifying. With BhumiChain, I know exactly what I am paying for.' },
  { name: 'Mohit Jaiswal', role: 'Data Scientist', quote: 'The GIS data provided by this platform is high-resolution and verifiable. A goldmine for predictive modeling.' },
  { name: 'Savitri Devi', role: 'Retired Teacher', quote: 'I am not tech-savvy, but the agent made it easy to put my ancestral land on the chain. Now I sleep peacefully.' },
  { name: 'Amitabh Mishra', role: 'Policy Advisor', quote: 'Decentralized land registries are the backbone of a digital economy. BhumiChain is leading the charge in India.' },
  { name: 'Zoya Khan', role: 'Environmentalist', quote: 'Identifying encroachments on protected forest land has become easier with these immutable GIS polygons.' },
]

function MarqueeCard({ item }: { item: typeof TESTIMONIALS[0] }) {
  return (
    <div className="w-[300px] flex-shrink-0 mx-2 glass-dark p-6 rounded-[16px] border border-white/5 relative group hover:border-green-glow/20 transition-colors">
       {/* Quote Icon */}
       <svg className="absolute top-4 left-4 w-8 h-8 opacity-[0.15] text-green-glow pointer-events-none" fill="currentColor" viewBox="0 0 32 32">
          <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14H8c0-2.2 1.8-4 4-4V8zm14 0c-3.3 0-6 2.7-6 6v10h10V14h-6c0-2.2 1.8-4 4-4V8z" />
       </svg>
       
       <div className="flex gap-0.5 mb-4">
          {[...Array(5)].map((_, i) => (
             <IconStar key={i} size={12} />
          ))}
       </div>

       <p className="text-text-on-dark/70 text-[13px] italic leading-relaxed mb-6 font-body">
          &ldquo;{item.quote}&rdquo;
       </p>

       <div className="h-[1px] w-full bg-white/10 mb-5" />

       <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-green-primary border border-green-bright/20 flex items-center justify-center text-[#F0EDE6] font-display font-bold text-[12px]">
             {item.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div className="flex flex-col">
             <span className="text-[13px] font-semibold text-text-on-dark">{item.name}</span>
             <span className="text-[11px] text-text-on-dark/40 font-body">{item.role}</span>
          </div>
       </div>
    </div>
  )
}

export default function TestimonialMarquee() {
  const row1 = TESTIMONIALS.slice(0, 8)
  const row2 = TESTIMONIALS.slice(8, 16)

  return (
    <section className="bg-bg-dark py-24 overflow-hidden relative">
      {/* Edge Fading Masks */}
      <div className="absolute inset-0 z-10 pointer-events-none" style={{
        maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)'
      }} />

      <div className="flex flex-col gap-6">
        {/* Row 1 - Scroll Left */}
        <div className="flex overflow-hidden group">
          <motion.div 
            animate={{ x: [0, -100 * row1.length] }} 
            transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
            className="flex hover:[animation-play-state:paused]"
          >
            {[...row1, ...row1].map((item, i) => (
              <MarqueeCard key={i} item={item} />
            ))}
          </motion.div>
        </div>

        {/* Row 2 - Scroll Right */}
        <div className="flex overflow-hidden group justify-end">
          <motion.div 
            animate={{ x: [-100 * row2.length, 0] }} 
            transition={{ duration: 52, repeat: Infinity, ease: 'linear' }}
            className="flex hover:[animation-play-state:paused]"
          >
            {[...row2, ...row2].map((item, i) => (
              <MarqueeCard key={i} item={item} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
