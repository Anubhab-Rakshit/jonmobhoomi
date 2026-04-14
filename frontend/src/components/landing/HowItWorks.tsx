'use client'

import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from '@/lib/gsap'

const STEPS = [
  { id: 'register', label: 'Register' },
  { id: 'transfer', label: 'Transfer' },
  { id: 'dispute', label: 'Dispute' },
  { id: 'rights', label: 'Rights' },
]

export default function HowItWorks() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const progressLineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const track = trackRef.current
    const wrapper = wrapperRef.current
    if (!track || !wrapper) return

    const scrollWidth = track.scrollWidth
    const windowWidth = window.innerWidth

    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: () => -(scrollWidth - windowWidth),
        ease: 'none',
        scrollTrigger: {
          trigger: wrapper,
          start: 'top top',
          end: () => '+=' + (scrollWidth - windowWidth),
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (progressLineRef.current) {
              progressLineRef.current.style.transform = `scaleX(${self.progress})`
            }
          }
        }
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section ref={wrapperRef} className="how-it-works-wrapper relative bg-bg-page overflow-hidden">
      <div className="how-it-works-sticky sticky top-0 h-screen overflow-hidden">
        <div ref={trackRef} className="steps-track flex h-screen w-fit flex-nowrap">
          
          {/* PANEL 0: INTRO */}
          <div className="relative w-screen h-full flex flex-col items-center justify-center" style={{background: '#F5F0E8'}}>
            <div style={{position: 'absolute', fontFamily: 'Fraunces', fontSize: '22vw', fontWeight: 900, color: 'rgba(45,106,79,0.04)', userSelect: 'none', pointerEvents: 'none', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
              HOW
            </div>
            <div style={{fontFamily: 'Inter', fontWeight: 600, fontSize: '12px', color: '#2D6A4F', letterSpacing: '3px', marginBottom: '16px'}}>
              THE PROCESS
            </div>
            <h2 style={{fontFamily: 'Fraunces', fontWeight: 700, fontSize: 'clamp(48px,6vw,80px)', color: '#1B2F1A', textAlign: 'center', lineHeight: 1.1}}>
              From land to<br/>
              <span style={{color: '#2D6A4F', fontStyle: 'italic'}}>Stellar Asset.</span>
            </h2>
            <div style={{marginTop: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              <span style={{fontFamily: 'Inter', fontSize: '12px', color: '#7A9E87', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '8px'}}>scroll to explore</span>
              <motion.svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#52B788" strokeWidth="2"
                animate={{ x: [0, 8, 0] }} transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}>
                <polyline points="13 17 18 12 13 7" />
                <polyline points="6 17 11 12 6 7" />
              </motion.svg>
            </div>
          </div>

          {/* PANEL 1: REGISTER */}
          <div className="relative w-screen h-full grid grid-cols-[45%_55%]">
            <div style={{padding: '0 0 0 80px', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative'}}>
              <div style={{position: 'absolute', left: '40px', fontFamily: 'Fraunces', fontWeight: 900, fontSize: '200px', color: 'rgba(45,106,79,0.04)', lineHeight: 1, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none'}}>
                01
              </div>
              <svg width="52" height="52" viewBox="0 0 48 48" fill="none" stroke="#2D6A4F" strokeWidth="1.5">
                <rect x="8" y="4" width="28" height="36" rx="2" />
                <polyline points="28,4 28,16 40,16" />
                <line x1="14" y1="20" x2="30" y2="20" />
                <line x1="14" y1="25" x2="30" y2="25" />
                <line x1="14" y1="30" x2="26" y2="30" />
              </svg>
              <h3 style={{fontFamily: 'Fraunces', fontWeight: 700, fontSize: '56px', color: '#1B2F1A', marginTop: '16px'}}>Register</h3>
              <div style={{marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '14px'}}>
                {[
                  { text: 'Upload Aadhaar + land documents', icon: <rect x="2" y="4" width="20" height="16" rx="2" stroke="#2D6A4F" strokeWidth="1.5" fill="none"/> },
                  { text: 'AI scans Sentinel-2 satellite imagery', icon: <path d="M12 4 A8 8 0 0 1 20 12 M4 12 A8 8 0 0 1 12 4" stroke="#2D6A4F" strokeWidth="1.5" fill="none"/> },
                  { text: 'Govt. official multi-signs on Stellar', icon: <path d="M4 20 L20 4 M16 4 L20 4 L20 8" stroke="#2D6A4F" strokeWidth="1.5" fill="none"/> },
                  { text: 'Land asset minted to Freighter wallet', icon: <polygon points="12,2 22,7 22,17 12,22 2,17 2,7" stroke="#2D6A4F" strokeWidth="1.5" fill="none"/> },
                ].map((step, i) => (
                  <div key={i} style={{display: 'flex', gap: '12px', alignItems: 'flex-start'}}>
                    <svg width="24" height="24" viewBox="0 0 24 24" style={{flexShrink: 0}}>{step.icon}</svg>
                    <span style={{fontFamily: 'Inter', fontSize: '14px', color: '#3D5A47', lineHeight: 1.6}}>{step.text}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div style={{position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <div style={{position: 'relative', width: '500px', height: '400px'}}>
                {/* GROUND PLANE */}
                <div style={{
                  position: 'absolute', bottom: 0, width: '380px', height: '200px',
                  background: 'rgba(45,106,79,0.06)', border: '1px solid rgba(45,106,79,0.15)', borderRadius: '4px',
                  transform: 'perspective(500px) rotateX(52deg) rotateY(-8deg)',
                  backgroundImage: 'linear-gradient(rgba(45,106,79,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(45,106,79,0.12) 1px, transparent 1px)',
                  backgroundSize: '24px 24px', left: '60px'
                }}>
                  <svg style={{position: 'absolute', width: '100%', height: '100%'}}>
                    <polygon points="140,80 200,60 250,90 160,140" fill="rgba(82,183,136,0.2)" stroke="#52B788" strokeWidth="1"/>
                  </svg>
                </div>
                
                {/* TABLET */}
                <motion.div animate={{y: [0,-10,0]}} transition={{duration:4, ease:'easeInOut', repeat:Infinity}}
                  style={{
                    position: 'absolute', width: '160px', height: '220px', background: '#FFFFFF',
                    borderRadius: '12px', border: '1px solid rgba(27,47,26,0.1)', top: '30px', left: '50%', transform: 'perspective(700px) rotateY(-18deg) rotateX(8deg) translateX(-30%)',
                    boxShadow: '5px 7px 0 rgba(27,47,26,0.2), 10px 14px 0 rgba(27,47,26,0.1), 0 30px 60px rgba(27,47,26,0.15)',
                    padding: '12px'
                  }}>
                  <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '16px'}}>
                    {[1,2,3].map(i => <div key={i} style={{width: '6px', height: '6px', borderRadius: '50%', background: i<3?'#52B788':'#D8F3DC'}}/>)}
                  </div>
                  {[1,2,3].map(i => <div key={i} style={{height: '10px', borderRadius: '4px', background: 'rgba(27,47,26,0.08)', marginBottom: '8px'}}/>)}
                  <div style={{height: '20px', borderRadius: '999px', background: '#2D6A4F', marginTop: '12px'}}/>
                </motion.div>
                
                {/* SATELLITE */}
                <motion.div animate={{x: [0,70,0,-70,0], y: [-60,-20,60,-20,-60]}} transition={{duration:7, ease:'linear', repeat:Infinity}}
                  style={{position: 'absolute', zIndex: 3, top: '40px', left: '200px'}}>
                  <svg width="60" height="40" viewBox="0 0 60 40">
                    <rect x="20" y="15" width="20" height="14" rx="2" fill="#2D6A4F" stroke="#52B788" strokeWidth="1.5"/>
                    <rect x="2" y="17" width="14" height="10" rx="1" fill="none" stroke="#52B788" strokeWidth="1.5"/>
                    <rect x="44" y="17" width="14" height="10" rx="1" fill="none" stroke="#52B788" strokeWidth="1.5"/>
                    <line x1="2" y1="22" x2="16" y2="22" stroke="#52B788" strokeWidth="0.5"/>
                    <line x1="44" y1="22" x2="58" y2="22" stroke="#52B788" strokeWidth="0.5"/>
                    <line x1="9" y1="17" x2="9" y2="27" stroke="#52B788" strokeWidth="0.5"/>
                    <line x1="51" y1="17" x2="51" y2="27" stroke="#52B788" strokeWidth="0.5"/>
                    <line x1="30" y1="15" x2="30" y2="8" stroke="#52B788" strokeWidth="1.5"/>
                    <circle cx="30" cy="6" r="2" fill="#74C69D"/>
                  </svg>
                  {/* DATA BEAM */}
                  <svg style={{position: 'absolute', top: '40px', left: '20px', width:'20px', height: '120px', overflow: 'visible'}}>
                    <motion.line x1="10" y1="0" x2="-20" y2="100" stroke="#52B788" strokeWidth="1" strokeDasharray="4 3" opacity="0.35"
                      animate={{strokeDashoffset: [0, -21]}} transition={{duration: 0.5, ease: 'linear', repeat: Infinity}}/>
                  </svg>
                </motion.div>
              </div>
            </div>
          </div>

          {/* PANEL 2: TRANSFER */}
          <div className="relative w-screen h-full grid grid-cols-[45%_55%]">
            <div style={{padding: '0 0 0 80px', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative'}}>
              <div style={{position: 'absolute', left: '40px', fontFamily: 'Fraunces', fontWeight: 900, fontSize: '180px', color: 'rgba(45,106,79,0.04)', lineHeight: 1, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none'}}>
                02
              </div>
              <svg width="52" height="52" viewBox="0 0 48 48" fill="none" stroke="#40916C" strokeWidth="1.5">
                <path d="M12 24 L36 24 M16 16 L36 24 L16 32" strokeLinejoin="round"/>
              </svg>
              <h3 style={{fontFamily: 'Fraunces', fontWeight: 700, fontSize: '56px', color: '#1B2F1A', marginTop: '16px'}}>Transfer</h3>
              <p style={{fontFamily: 'Inter', fontSize: '17px', color: '#3D5A47', lineHeight: 1.6, maxWidth: '420px', marginTop: '16px'}}>
                Enable secure, atomic peer-to-peer land transfers. Payment and ownership exchange happen simultaneously on the Stellar network.
              </p>
            </div>
            
            <div style={{position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden'}}>
              <div style={{position: 'relative', width: '500px', height: '400px'}}>
                <svg style={{position: 'absolute', width: '100%', height: '100%', zIndex: 1}}>
                  <path d="M 190,200 Q 260,110 330,200" stroke="rgba(45,106,79,0.3)" strokeWidth="1.5" fill="none" strokeDasharray="5 3"/>
                </svg>
                
                {/* TOKENS */}
                <motion.svg width="20" height="20" style={{position: 'absolute', zIndex: 2, marginLeft: '-10px', marginTop: '-10px'}}
                  animate={{x: [190, 230, 260, 300, 330], y: [200, 155, 135, 155, 200]}}
                  transition={{duration: 2, ease: 'easeInOut', repeat: Infinity, repeatDelay: 0.5}}>
                  <polygon points="10,0 20,5 20,15 10,20 0,15 0,5" fill="#2D6A4F" stroke="#52B788" strokeWidth="1.5"/>
                </motion.svg>
                <motion.svg width="18" height="18" style={{position: 'absolute', zIndex: 2, marginLeft: '-9px', marginTop: '-9px'}}
                  animate={{x: [330, 290, 260, 220, 190], y: [200, 155, 135, 155, 200]}}
                  transition={{duration: 2, ease: 'easeInOut', repeat: Infinity, repeatDelay: 0.5}}>
                  <circle cx="9" cy="9" r="8" fill="#B5621E" stroke="#D4895A" strokeWidth="1.5"/>
                  <path d="M6,6 L12,12 M12,6 L6,12" stroke="#FFF3E0" strokeWidth="1.5"/>
                </motion.svg>
                
                <motion.div animate={{opacity: [0, 1, 0]}} transition={{duration: 0.5, delay: 1, repeat: Infinity, repeatDelay: 2}}
                  style={{position: 'absolute', top: '100px', left: '50%', transform: 'translateX(-50%)', fontFamily: 'Inter', fontWeight: 600, fontSize: '10px', color: '#2D6A4F', letterSpacing: '1px'}}>
                  ATOMIC SWAP
                </motion.div>

                {/* LEFT CARD */}
                <div style={{position: 'absolute', top: '115px', left: '60px', width: '130px', height: '170px', background: 'white', border: '1px solid rgba(27,47,26,0.1)', borderRadius: '14px', boxShadow: '4px 6px 0 rgba(27,47,26,0.15), 0 20px 40px rgba(27,47,26,0.1)', padding: '14px', transform: 'perspective(600px) rotateY(25deg)', zIndex: 3}}>
                  <div style={{fontFamily: 'Inter', fontWeight: 600, fontSize: '8px', color: '#7A9E87', letterSpacing: '2px'}}>FREIGHTER</div>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2D6A4F" strokeWidth="1.5" style={{margin: '12px 0'}}><circle cx="12" cy="12" r="10"/></svg>
                  <div style={{fontFamily: 'JetBrains Mono', fontSize: '8px', color: '#3D5A47'}}>GB2N...9W3Z</div>
                  <div style={{fontFamily: 'Fraunces', fontWeight: 600, fontSize: '14px', color: '#1B2F1A', marginTop: '4px'}}>12.4 XLM</div>
                </div>

                {/* RIGHT CARD */}
                <div style={{position: 'absolute', top: '115px', right: '60px', width: '130px', height: '170px', background: 'white', border: '1px solid rgba(27,47,26,0.1)', borderRadius: '14px', boxShadow: '-4px 6px 0 rgba(27,47,26,0.15), 0 20px 40px rgba(27,47,26,0.1)', padding: '14px', transform: 'perspective(600px) rotateY(-25deg)', zIndex: 3}}>
                  <div style={{fontFamily: 'Inter', fontWeight: 600, fontSize: '8px', color: '#7A9E87', letterSpacing: '2px'}}>FREIGHTER</div>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2D6A4F" strokeWidth="1.5" style={{margin: '12px 0'}}><circle cx="12" cy="12" r="10"/></svg>
                  <div style={{fontFamily: 'JetBrains Mono', fontSize: '8px', color: '#3D5A47'}}>GDF1...2L9K</div>
                  <div style={{fontFamily: 'Fraunces', fontWeight: 600, fontSize: '14px', color: '#1B2F1A', marginTop: '4px'}}>0 XLM</div>
                </div>
              </div>
            </div>
          </div>

          {/* PANEL 3: DISPUTE */}
          <div className="relative w-screen h-full grid grid-cols-[45%_55%]">
            <div style={{padding: '0 0 0 80px', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative'}}>
              <div style={{position: 'absolute', left: '40px', fontFamily: 'Fraunces', fontWeight: 900, fontSize: '180px', color: 'rgba(45,106,79,0.04)', lineHeight: 1, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none'}}>
                03
              </div>
              <svg width="52" height="52" viewBox="0 0 48 48" fill="none" stroke="#B5621E" strokeWidth="1.5">
                <path d="M24 8 L24 40 M12 16 L36 16 M12 16 L12 28 A12 12 0 0 0 36 28 L36 16" />
              </svg>
              <h3 style={{fontFamily: 'Fraunces', fontWeight: 700, fontSize: '56px', color: '#1B2F1A', marginTop: '16px'}}>Dispute</h3>
              <p style={{fontFamily: 'Inter', fontSize: '17px', color: '#3D5A47', lineHeight: 1.6, maxWidth: '420px', marginTop: '16px'}}>
                Decentralized arbitration through Kleros ensures fair judgment. Community jurors vote based on immutable evidence and satellite history.
              </p>
            </div>
            
            <div style={{position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
              <svg viewBox="0 0 300 300" width="300" height="300">
                <line x1="150" y1="60" x2="150" y2="240" stroke="#2D6A4F" strokeWidth="2"/>
                <motion.g style={{transformOrigin: '150px 90px'}} animate={{rotate: [0, -15, -15, 15, -15]}} transition={{duration: 4, times: [0, 0.3, 0.5, 0.7, 1], repeat: Infinity, ease: 'easeInOut'}}>
                  <line x1="70" y1="90" x2="230" y2="90" stroke="#2D6A4F" strokeWidth="2"/>
                  <line x1="80" y1="90" x2="80" y2="140" stroke="#52B788" strokeWidth="1.5" strokeDasharray="3 3"/>
                  <line x1="220" y1="90" x2="220" y2="140" stroke="#52B788" strokeWidth="1.5" strokeDasharray="3 3"/>
                  <ellipse cx="80" cy="148" rx="28" ry="8" fill="none" stroke="#2D6A4F" strokeWidth="1.5"/>
                  <ellipse cx="220" cy="148" rx="28" ry="8" fill="none" stroke="#2D6A4F" strokeWidth="1.5"/>
                </motion.g>
                <rect x="120" y="238" width="60" height="8" rx="2" fill="#2D6A4F"/>
                <rect x="110" y="246" width="80" height="4" rx="2" fill="#1B4332"/>
                <circle cx="150" cy="62" r="6" fill="#52B788"/>
              </svg>
              
              <div style={{display: 'grid', gridTemplateColumns: 'repeat(5, 10px)', gap: '8px', marginTop: '20px'}}>
                {Array.from({length: 15}).map((_, i) => (
                  <motion.div key={i}
                    initial={{scale: 0, backgroundColor: 'rgba(45,106,79,0.15)', borderColor: 'rgba(45,106,79,0.2)'}}
                    whileInView={{scale: 1, backgroundColor: i<11 ? '#2D6A4F' : 'rgba(45,106,79,0.15)', borderColor: i<11 ? '#52B788' : 'rgba(45,106,79,0.2)'}}
                    transition={{delay: i*0.12, type: 'spring'}}
                    style={{width: '10px', height: '10px', borderRadius: '50%', border: '1px solid'}}
                  />
                ))}
              </div>
              <div style={{fontFamily: 'Inter', fontSize: '12px', color: '#7A9E87', marginTop: '12px', textAlign: 'center'}}>
                11 of 15 jurors reached consensus
              </div>
            </div>
          </div>

          {/* PANEL 4: END CTA */}
          <div className="relative w-screen h-full flex flex-col items-center justify-center p-20" style={{background: '#1B3A2D'}}>
            <svg style={{position: 'absolute', width: '100%', height: '100%', opacity: 0.04}}>
               <path d="M0 200 Q200 180 400 220 T800 200 M0 400 Q200 380 400 420 T800 400 M0 600 Q200 580 400 610 T800 600" fill="none" stroke="#FFFFFF" strokeWidth="1"/>
            </svg>
            <h2 style={{fontFamily: 'Fraunces', fontWeight: 700, fontStyle: 'italic', fontSize: '72px', color: '#F0EDE6', textAlign: 'center'}}>Your land.</h2>
            <h3 style={{fontFamily: 'Fraunces', fontWeight: 400, fontStyle: 'italic', fontSize: '48px', color: 'rgba(240,237,230,0.4)'}}>yours forever.</h3>
            <p style={{fontFamily: 'Inter', fontSize: '18px', color: 'rgba(240,237,230,0.55)', marginTop: '20px'}}>
              Register your parcel in under 10 minutes.
            </p>
            <button style={{
              marginTop: '40px', background: '#52B788', color: '#0F2318', fontFamily: 'Inter', fontWeight: 600, fontSize: '15px',
              padding: '14px 28px', borderRadius: '999px', boxShadow: '0 5px 0 #2A7955', pointerEvents: 'auto'
            }}>
              Start Your Registry →
            </button>
          </div>

        </div>
      </div>

      {/* FIXED PROGRESS BAR AT BOTTOM */}
      <div className="absolute bottom-0 left-0 w-full h-[80px] z-[50] flex flex-col" style={{position: 'fixed'}}>
          <div className="w-full h-1 bg-border/20">
             <div 
               ref={progressLineRef}
               className="h-full w-full origin-left scale-x-0"
               style={{background: 'linear-gradient(90deg, #2D6A4F, #52B788)'}}
             />
          </div>
          <div className="flex-1 flex items-center justify-between px-20">
             <div style={{fontFamily: 'Inter', fontSize: '11px', letterSpacing: '2px', color: 'rgba(27,47,26,0.3)', textTransform: 'uppercase'}}>
               THE PROCESS
             </div>
             <div className="flex gap-12" style={{fontFamily: 'Inter', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase'}}>
                {STEPS.map((step, i) => (
                  <span key={step.id} style={{color: 'rgba(27,47,26,0.3)'}}>
                    {step.label}
                  </span>
                ))}
             </div>
             <div style={{fontFamily: 'Inter', fontSize: '11px', letterSpacing: '2px', color: 'rgba(27,47,26,0.3)', textTransform: 'uppercase'}}>
                BHUMICHAIN V1.0 / 2026
             </div>
          </div>
      </div>
    </section>
  )
}
