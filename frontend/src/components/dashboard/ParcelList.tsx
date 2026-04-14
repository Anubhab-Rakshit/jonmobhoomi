'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { IconMapPin, IconRuler, IconEye, IconArrowRight } from '@/components/ui/Icons'

const PARCELS = [
  {
    id: '1',
    surveyNo: '241/8B',
    location: 'Bangalore North, Karnataka',
    area: '2.1 acres',
    status: 'Verified',
    nftId: '0x937...f1a4e',
    color: '#52B788'
  },
  {
    id: '2',
    surveyNo: '112/4',
    location: 'Warangal South, Telangana',
    area: '1.4 acres',
    status: 'Pending',
    nftId: '0x21a...c839d',
    color: '#B5621E'
  },
  {
    id: '3',
    surveyNo: '88/2C',
    location: 'Mysuru, Karnataka',
    area: '3.8 acres',
    status: 'Disputed',
    nftId: '0xfa8...021ef',
    color: '#9B2226'
  }
]

export default function ParcelList() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-end mb-2">
         <h2 className="font-display font-semibold text-[20px] text-text-dark">
            My Land Parcels
         </h2>
         <button className="text-[13px] font-bold text-green-primary hover:underline">
            Register New +
         </button>
      </div>

      <div className="flex flex-col gap-4">
        {PARCELS.map((parcel) => (
          <motion.div
            key={parcel.id}
            whileHover={{ y: -2 }}
            className="group relative bg-white border border-border rounded-xl flex shadow-sm hover:shadow-md transition-all h-[155px]"
          >
            {/* Left Status Strip */}
            <div 
              className="w-8 flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: parcel.status === 'Verified' ? '#1B824B' : parcel.status === 'Pending' ? '#D98934' : parcel.color }}
            >
              <span className="-rotate-90 text-white font-medium text-[13px] tracking-wide whitespace-nowrap">
                {parcel.status}
              </span>
            </div>

            {/* Content Area */}
            <div className="flex-1 p-5 flex flex-col justify-center">
               <p className="text-[12px] font-medium text-text-dark mb-0.5">
                  {parcel.id === '1' ? 'Fraunes Number' : 'Survey Number'}
               </p>
               <p className="font-display text-[32px] text-text-dark leading-none mb-1.5">
                  {parcel.surveyNo}
               </p>
               <p className="text-[13px] text-text-dark">{parcel.location}</p>
               <p className="text-[13px] text-text-dark mt-4">
                  NFT ID: {parcel.nftId}
               </p>
            </div>

            {/* Map Thumbnail & Buttons */}
            <div className="w-[180px] p-4 flex flex-col justify-between items-end flex-shrink-0">
               <div className="w-full h-[68px] bg-bg-darker relative flex items-center justify-center overflow-hidden rounded-lg">
                  <svg viewBox="0 0 100 80" className="w-[100%] h-[100%]" style={{ filter: `drop-shadow(0 0 6px ${parcel.color}88)` }}>
                     <rect width="100%" height="100%" fill="#0F2318"/>
                     {[20,40,60,80].map(v => (
                       <React.Fragment key={v}>
                         <line x1={v} y1="0" x2={v} y2="80" stroke="rgba(82,183,136,0.06)" strokeWidth="0.5"/>
                         <line x1="0" y1={v} x2="100" y2={v} stroke="rgba(82,183,136,0.06)" strokeWidth="0.5"/>
                       </React.Fragment>
                     ))}
                     
                     {parcel.id === '1' && (
                       <>
                         <path d="M 20,18 L 50,12 L 78,22 L 82,48 L 68,64 L 38,68 L 18,52 Z" fill="rgba(82,183,136,0.2)" stroke="#52B788" strokeWidth="1.2"/>
                         {[[20,18],[50,12],[78,22],[82,48],[68,64],[38,68],[18,52]].map(([x,y],i) => <circle key={i} cx={x} cy={y} r="1.5" fill="#74C69D"/>)}
                       </>
                     )}
                     {parcel.id === '2' && (
                       <>
                         <path d="M 15,30 L 48,14 L 80,28 L 85,55 L 55,72 L 22,65 Z" fill="rgba(181,98,30,0.2)" stroke="#B5621E" strokeWidth="1.2" strokeDasharray="4 2"/>
                         {[[15,30],[48,14],[80,28],[85,55],[55,72],[22,65]].map(([x,y],i) => <circle key={i} cx={x} cy={y} r="1.5" fill="#B5621E"/>)}
                       </>
                     )}
                     {parcel.id === '3' && (
                       <>
                         <path d="M 25,15 L 75,18 L 82,50 L 65,72 L 30,68 L 15,45 Z" fill="rgba(155,34,38,0.18)" stroke="#9B2226" strokeWidth="1.2" strokeDasharray="3 2"/>
                         {[[25,15],[75,18],[82,50],[65,72],[30,68],[15,45]].map(([x,y],i) => <circle key={i} cx={x} cy={y} r="1.5" fill="#9B2226"/>)}
                       </>
                     )}
                  </svg>
               </div>
               
               <div className="flex gap-2 w-full justify-between mt-auto">
                  <button className="flex-1 py-1 px-3 border border-border rounded-md text-[12px] text-text-dark hover:bg-zinc-50 flex items-center justify-center gap-1 transition-colors">
                     View <IconEye size={13} />
                  </button>
                  <button className="flex-1 py-1 px-3 bg-[#1B3A2D] border border-[#1B3A2D] text-white rounded-md text-[12px] flex items-center justify-center gap-1 hover:bg-[#254F3D] transition-colors">
                     Actions <IconArrowRight size={13} />
                  </button>
               </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
