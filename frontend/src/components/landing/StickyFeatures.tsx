'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { IconGlobe, IconGrid, IconMap, IconScale, IconFileText } from '@/components/ui/Icons'

const SCREENS = [
  {
    id: 1,
    title: 'Dashboard Control',
    description: 'A birds-eye view of your entire land portfolio, including valuation metrics, verification progress, and active listings.',
    label: 'AI SATELLITE GIS',
    icon: <IconGrid size={24} />,
    color: '#2D6A4F'
  },
  {
    id: 2,
    title: 'Registration Wizard',
    description: 'Guided registration with automated OCR and satellite boundary checks. Submit to government approval in minutes, not months.',
    label: 'STELLAR BLOCKCHAIN',
    icon: <IconFileText size={24} />,
    color: '#52B788'
  },
  {
    id: 3,
    title: 'Interactive GIS Map',
    description: 'Real-time interactive maps with parcel overlays. Explore verified plots, survey numbers, and ownership history visually.',
    label: 'KLEROS ARBITRATION',
    icon: <IconMap size={24} />,
    color: '#40916C'
  },
  {
    id: 4,
    title: 'Dispute Resolution',
    description: 'Fair, decentralized arbitration for boundary or title disputes. Transparent evidence queues and community juror voting.',
    label: 'LAST-MILE ACCESS',
    icon: <IconScale size={24} />,
    color: '#B5621E'
  }
]

const DashboardScreen = () => (
  <div style={{display:'flex', height:'100%', background:'#F5F0E8'}}>
    {/* Mini sidebar */}
    <div style={{width:60, background:'#1B3A2D', padding:'12px 8px',
                 display:'flex', flexDirection:'column', gap:8}}>
      {[0,1,2,3,4].map(i => (
        <div key={i} style={{
          height: 28, borderRadius: 6,
          background: i===0 ? 'rgba(240,237,230,0.15)' : 'transparent',
          border: i===0 ? '1px solid rgba(240,237,230,0.2)' : 'none'
        }}/>
      ))}
    </div>
    {/* Main content */}
    <div style={{flex:1, padding:'10px 12px'}}>
      {/* Greeting */}
      <div style={{height:12, width:'60%', background:'rgba(27,47,26,0.12)', 
                   borderRadius:4, marginBottom:8}}/>
      {/* Command bar */}
      <div style={{height:24, background:'white', borderRadius:8, 
                   marginBottom:10, border:'1px solid rgba(27,47,26,0.08)'}}/>
      {/* 4 stat cards */}
      <div style={{display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:6, marginBottom:10}}>
        {[0,1,2,3].map(i => (
          <div key={i} style={{height:48, background:'white', borderRadius:8,
                               border:'1px solid rgba(27,47,26,0.08)', padding:'6px 8px'}}>
            <div style={{height:6, width:'70%', background:'rgba(27,47,26,0.08)', 
                         borderRadius:2, marginBottom:4}}/>
            <div style={{height:10, width:'50%', background:'rgba(27,47,26,0.15)', 
                         borderRadius:2, fontFamily:'Fraunces'}}/>
          </div>
        ))}
      </div>
      {/* 2 parcel cards with colored left strips */}
      {[
        {color:'#52B788', survey:'241/8B', location:'Bangalore North'},
        {color:'#B5621E', survey:'112/4', location:'Warangal South'}
      ].map((p,i) => (
        <div key={i} style={{display:'flex', background:'white', borderRadius:8,
                             border:'1px solid rgba(27,47,26,0.08)',
                             marginBottom:6, overflow:'hidden'}}>
          <div style={{width:4, background:p.color, flexShrink:0}}/>
          <div style={{padding:'6px 8px', flex:1}}>
            <div style={{fontSize:9, fontFamily:'Fraunces, serif', fontWeight:700, 
                         color:'#1B2F1A'}}>{p.survey}</div>
            <div style={{fontSize:8, color:'#7A9E87', marginTop:1}}>{p.location}</div>
          </div>
          {/* Mini map thumbnail */}
          <div style={{width:50, background:'#0F2318', display:'flex',
                       alignItems:'center', justifyContent:'center'}}>
            <svg width="30" height="30" viewBox="0 0 30 30">
              <polygon points="8,6 22,5 26,14 22,24 10,25 5,16"
                fill="rgba(82,183,136,0.2)" stroke={p.color} strokeWidth="1"/>
            </svg>
          </div>
        </div>
      ))}
    </div>
  </div>
)

const RegisterScreen = () => (
  <div style={{height:'100%', background:'#F5F0E8', padding:'10px 12px', overflow:'hidden'}}>
    {/* Application reference header */}
    <div style={{background:'white', borderRadius:8, padding:'8px 10px',
                 border:'1px solid rgba(27,47,26,0.08)', marginBottom:8}}>
      <div style={{height:5, width:'40%', background:'rgba(27,47,26,0.08)', 
                   borderRadius:2, marginBottom:4}}/>
      <div style={{height:10, width:'70%', background:'rgba(27,47,26,0.15)', 
                   borderRadius:2, fontFamily:'Fraunces, serif'}}/>
    </div>
    {/* Step indicator */}
    <div style={{display:'flex', alignItems:'center', gap:4, marginBottom:8}}>
      {[1,2,3,4].map((step,i) => (
        <React.Fragment key={step}>
          <div style={{
            width:20, height:20, borderRadius:'50%', display:'flex',
            alignItems:'center', justifyContent:'center', fontSize:8,
            background: i<2 ? '#2D6A4F' : 'white',
            border: i===2 ? '2px solid #2D6A4F' : i<2 ? 'none' : '1px solid rgba(27,47,26,0.15)',
            color: i<2 ? 'white' : i===2 ? '#2D6A4F' : '#7A9E87',
            fontFamily:'Fraunces, serif', fontWeight:700
          }}>{i<2 ? '✓' : step}</div>
          {i<3 && <div style={{flex:1, height:1.5, 
            background: i<2 ? '#2D6A4F' : 'rgba(27,47,26,0.1)'}}/>}
        </React.Fragment>
      ))}
    </div>
    {/* Two column form */}
    <div style={{display:'grid', gridTemplateColumns:'55% 45%', gap:8}}>
      <div style={{background:'white', borderRadius:8, padding:'8px',
                   border:'1px solid rgba(27,47,26,0.08)'}}>
        {[0,1,2].map(i => (
          <div key={i} style={{height:24, border:'1px solid rgba(27,47,26,0.12)',
                               borderRadius:6, marginBottom:6}}/>
        ))}
        <div style={{height:48, border:'2px dashed rgba(181,98,30,0.3)',
                     borderRadius:8, background:'rgba(181,98,30,0.03)'}}/>
      </div>
      <div style={{background:'white', borderRadius:8, padding:'8px',
                   border:'1px solid rgba(27,47,26,0.08)'}}>
        {/* Draft certificate */}
        <div style={{height:6, width:'80%', background:'rgba(27,47,26,0.08)',
                     borderRadius:2, margin:'0 auto 6px'}}/>
        {[0,1,2,3].map(i => (
          <div key={i} style={{height:8, borderBottom:'1px solid rgba(27,47,26,0.06)',
                               padding:'4px 0', display:'flex', gap:8}}>
            <div style={{width:'40%', height:5, background:'rgba(27,47,26,0.06)', borderRadius:2}}/>
            <div style={{width:'60%', height:5, background:'rgba(27,47,26,0.1)', borderRadius:2}}/>
          </div>
        ))}
      </div>
    </div>
  </div>
)

const MapScreen = () => (
  <div style={{height:'100%', background:'#0F2318', position:'relative', overflow:'hidden'}}>
    {/* Topographic lines */}
    <svg width="100%" height="100%" style={{position:'absolute', opacity:0.06}}>
      {[40,80,120,160,200,240].map(y => (
        <path key={y} d={`M 0,${y} Q 100,${y-20} 200,${y} Q 300,${y+20} 400,${y}`}
              stroke="#52B788" strokeWidth="0.5" fill="none"/>
      ))}
    </svg>
    {/* India mini map */}
    <svg viewBox="0 0 400 450" style={{position:'absolute', inset:0, width:'100%', height:'100%'}}>
      <path d="M 120,60 L 160,40 L 210,35 L 260,50 L 300,70 L 320,100 L 335,140 
               L 340,180 L 330,220 L 310,260 L 290,300 L 270,340 L 250,370 
               L 230,395 L 210,410 L 195,395 L 175,360 L 155,320 L 135,280 
               L 115,240 L 100,200 L 90,160 L 95,120 L 110,80 Z"
        fill="rgba(45,106,79,0.15)" stroke="rgba(82,183,136,0.3)" strokeWidth="0.8"/>
      {/* Glowing parcel polygons */}
      <polygon points="180,280 210,268 235,280 230,308 205,315 178,302"
        fill="rgba(82,183,136,0.25)" stroke="#52B788" strokeWidth="1"/>
      <polygon points="160,200 185,192 200,205 195,225 170,228 152,215"
        fill="rgba(181,98,30,0.2)" stroke="#B5621E" strokeWidth="0.8" strokeDasharray="3 2"/>
    </svg>
    {/* Floating tooltip */}
    <div style={{position:'absolute', top:'15%', right:'10%',
                 background:'rgba(15,35,24,0.85)', backdropFilter:'blur(8px)',
                 border:'1px solid rgba(240,237,230,0.1)', borderRadius:8,
                 padding:'6px 8px', fontSize:7, fontFamily:'JetBrains Mono, monospace',
                 color:'rgba(240,237,230,0.7)'}}>
      Survey 142/3<br/>
      <span style={{color:'#52B788'}}>● VERIFIED</span>
    </div>
  </div>
)

const DisputeScreen = () => (
  <div style={{height:'100%', background:'#F5F0E8', padding:'10px 12px'}}>
    {/* Amber header */}
    <div style={{background:'rgba(181,98,30,0.08)', borderBottom:'2px solid #B5621E',
                 padding:'8px 10px', marginBottom:8, borderRadius:'8px 8px 0 0'}}>
      <div style={{height:6, width:'50%', background:'rgba(181,98,30,0.2)', borderRadius:2}}/>
      <div style={{height:10, width:'80%', background:'rgba(27,47,26,0.15)', 
                   borderRadius:2, marginTop:4, fontFamily:'Fraunces, serif'}}/>
    </div>
    {/* Juror dots */}
    <div style={{display:'grid', gridTemplateColumns:'repeat(5,1fr)', gap:4, 
                 marginBottom:8, padding:'0 10px'}}>
      {Array.from({length:15}).map((_,i) => (
        <div key={i} style={{width:10, height:10, borderRadius:'50%',
          background: i<11 ? '#2D6A4F' : 'rgba(27,47,26,0.12)'}}/>
      ))}
    </div>
    {/* Vote bar */}
    <div style={{height:8, background:'rgba(27,47,26,0.08)', borderRadius:4, 
                 overflow:'hidden', marginBottom:8}}>
      <div style={{width:'73%', height:'100%', background:'#2D6A4F', borderRadius:4}}/>
    </div>
    {/* Timeline items */}
    {[0,1,2].map(i => (
      <div key={i} style={{display:'flex', gap:8, marginBottom:8, paddingLeft:8,
                           borderLeft:'1px solid rgba(27,47,26,0.1)'}}>
        <div style={{width:6, height:6, borderRadius:'50%', flexShrink:0, marginTop:2,
                     background: [''+'#52B788','#B5621E','#2D6A4F'][i]}}/>
        <div style={{height:5, flex:1, background:'rgba(27,47,26,0.08)', borderRadius:2}}/>
      </div>
    ))}
  </div>
)

function BrowserScreen({ activeScreen }: { activeScreen: number }) {
  return (
    <div className="w-full h-full bg-white relative overflow-hidden flex flex-col">
       {/* Chrome header */}
       <div className="h-[36px] bg-text-dark/5 flex items-center px-4 gap-4 border-b border-border">
          <div className="flex gap-1.5">
             <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
             <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
             <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
          </div>
          <div className="flex-1 max-w-[400px] h-5 bg-white rounded-md border border-border flex items-center px-3">
             <span className="font-mono text-[9px] text-text-muted truncate">bhumichain.app/dashboard</span>
          </div>
       </div>

       {/* Screen Content */}
       <div className="flex-1 p-6 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeScreen}
              initial={{ opacity: 0, scale: 0.97, filter: 'blur(8px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 1.05, filter: 'blur(4px)' }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="w-full h-full bg-white rounded-lg border border-border overflow-hidden"
            >
               {activeScreen === 1 && <DashboardScreen />}
               {activeScreen === 2 && <RegisterScreen />}
               {activeScreen === 3 && <MapScreen />}
               {activeScreen === 4 && <DisputeScreen />}
            </motion.div>
          </AnimatePresence>
       </div>
    </div>
  )
}

function FeatureSection({ id, screen, setActiveScreen }: { id: number, screen: typeof SCREENS[0], setActiveScreen: (id: number) => void }) {
   const ref = useRef(null)
   const isInView = useInView(ref, { margin: '-50% 0px -50% 0px' })

   useEffect(() => {
     if (isInView) {
       setActiveScreen(id)
     }
   }, [isInView, id, setActiveScreen])

   return (
     <div ref={ref} className="h-[600px] flex flex-col justify-center px-16">
        <span className="font-display italic text-[11px] text-green-primary uppercase tracking-widest mb-4">
           {screen.label}
        </span>
        <h3 className="font-display font-bold text-[44px] text-text-dark leading-tight mb-6">
           {screen.title}
        </h3>
        <p className="text-text-body text-[18px] leading-relaxed max-w-lg">
           {screen.description}
        </p>
     </div>
   )
}

export default function StickyFeatures() {
  const [activeScreen, setActiveScreen] = useState(1)

  return (
    <section className="bg-bg-page px-20 relative">
      <div className="max-w-[1400px] mx-auto flex">
        {/* Left Side: Sticky Browser */}
        <div className="w-[48%] relative">
          <div className="sticky top-[88px] h-[calc(100vh-176px)] flex items-center">
             <div className="w-full aspect-[4/3] rounded-[14px] overflow-hidden border border-border shadow-[0_1px_0_rgba(255,255,255,0.9)_inset,0_40px_100px_rgba(27,47,26,0.15)] bg-white">
                <BrowserScreen activeScreen={activeScreen} />
             </div>
          </div>
        </div>

        {/* Right Side: Scrolling Content */}
        <div className="w-[52%]">
          {SCREENS.map((screen) => (
            <FeatureSection 
              key={screen.id} 
              id={screen.id} 
              screen={screen} 
              setActiveScreen={setActiveScreen} 
            />
          ))}
        </div>
      </div>
    </section>
  )
}
