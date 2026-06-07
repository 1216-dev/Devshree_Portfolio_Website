'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'

export function PhotoTimeline() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Track scroll position of the timeline section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  // Bind the paper airplane's flight coordinates to the scroll progress
  // Travels from left to right (5% to 92%), dips up and down, and rotates slightly
  const planeX = useTransform(scrollYProgress, [0.15, 0.85], ['5%', '92%'])
  const planeY = useTransform(scrollYProgress, [0.15, 0.4, 0.65, 0.85], [12, -15, 20, 8])
  const planeRotate = useTransform(scrollYProgress, [0.15, 0.4, 0.65, 0.85], [5, -12, 18, 0])

  const TIMELINE_PHOTOS = [
    {
      src: '/images/hack-rare-team.png',
      alt: 'Hack Rare team',
      title: 'Hack Rare Hackathon',
      date: 'June 2024',
      rotate: -3,
      note: 'Collab and coding with an amazing team!'
    },
    {
      src: '/images/av-job.png',
      alt: 'Stony Brook Student Affairs AV Job',
      title: 'On-Campus AV Tech Lead',
      date: 'Student Affairs events',
      rotate: 2,
      note: 'Running AV for key university summits.'
    },
    {
      src: '/images/graduation.png',
      alt: 'Stony Brook Graduation Ceremony',
      title: 'My Graduation',
      date: 'Class of 2024',
      rotate: -2,
      note: 'Class of 24, throwing the cap!'
    }
  ]

  return (
    <div 
      ref={containerRef}
      className="bg-[#FAF8F5] py-20 border-t-2 border-b-2 border-dashed border-neutral-300 relative overflow-hidden"
    >
      <div className="mx-auto max-w-6xl px-6">
        
        {/* Section Title */}
        <div className="text-center mb-16">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-orange-600">
            my timeline & memories
          </p>
          <h2 className="font-serif text-4xl font-bold tracking-tight text-neutral-800 mt-2 sm:text-5xl">
            Chapters along the way
          </h2>
        </div>

        {/* Flight Track & Dotted Path Container */}
        <div className="relative w-full py-12">
          
          {/* Dotted path representing the airplane flight trail */}
          <div className="absolute top-[50%] left-[5%] right-[8%] h-0.5 border-t-2 border-dashed border-orange-600/30 z-0 pointer-events-none" />

          {/* Scrolling Flying Paper Airplane */}
          <motion.div
            style={{
              left: planeX,
              y: planeY,
              rotate: planeRotate,
            }}
            className="absolute top-[50%] z-20 pointer-events-none -translate-y-[50%] -translate-x-[50%] hidden md:block"
          >
            <svg
              width="36"
              height="36"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="filter drop-shadow-lg text-orange-600 rotate-[45deg]"
            >
              <path
                d="M2 2 L26 12 L16 16 L12 26 Z"
                fill="currentColor"
                stroke="#1A1614"
                strokeWidth="2.5"
                strokeLinejoin="round"
              />
              <path d="M2 2 L16 16" stroke="#1A1614" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <span className="absolute left-8 top-0 bg-orange-600 text-white font-mono text-[8px] uppercase tracking-wider px-1.5 py-0.5 rounded shadow">
              flying...
            </span>
          </motion.div>

          {/* Film Strip / Photos Row */}
          <div className="relative flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4 z-10">
            {TIMELINE_PHOTOS.map((photo, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                whileHover={{ scale: 1.03, rotate: 0, zIndex: 10 }}
                style={{ rotate: photo.rotate }}
                className="bg-white p-4 shadow-xl border border-neutral-200/80 rounded-sm w-full max-w-[320px] flex-shrink-0"
              >
                {/* Sketched Film strip sprockets container (looks like photo slot) */}
                <div className="flex justify-between gap-1 mb-2 bg-neutral-900 px-2 py-1.5 rounded-sm">
                  {Array.from({ length: 10 }).map((_, idx) => (
                    <div key={idx} className="w-2.5 h-2.5 bg-white rounded-xs" />
                  ))}
                </div>

                <div className="relative aspect-3/4 overflow-hidden rounded border border-neutral-100">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(max-w-xs) 100vw, 320px"
                    className="object-cover"
                  />
                </div>

                {/* Film strip bottom sprockets */}
                <div className="flex justify-between gap-1 mt-2.5 bg-neutral-900 px-2 py-1.5 rounded-sm">
                  {Array.from({ length: 10 }).map((_, idx) => (
                    <div key={idx} className="w-2.5 h-2.5 bg-white rounded-xs" />
                  ))}
                </div>

                <div className="mt-4 text-center font-mono">
                  <span className="text-[10px] font-bold text-orange-600 block mb-0.5 uppercase tracking-wider">
                    {photo.date}
                  </span>
                  <h3 className="font-serif text-base font-bold text-neutral-800 leading-tight">
                    {photo.title}
                  </h3>
                  <p className="font-script text-sm text-neutral-500 mt-1 leading-snug">
                    {photo.note}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </div>
  )
}
