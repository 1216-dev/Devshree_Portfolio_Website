'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'

// IMAGE 1 INSPIRED STICKERS: SBU GRADUATION CARD
const PinkBinderClip = () => (
  <div className="absolute -top-7 left-1/2 -translate-x-1/2 w-14 h-12 z-30 drop-shadow-md pointer-events-none select-none">
    <svg viewBox="0 0 60 50" className="w-full h-full">
      {/* Loop wire */}
      <path
        d="M 30 5 C 22 5 22 25 24 28 L 36 28 C 38 25 38 5 30 5"
        fill="none"
        stroke="#c4c4c7"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* Clip Base */}
      <path
        d="M 12 24 L 48 24 C 50 24 52 26 51 30 L 47 44 C 46 46 44 47 42 47 L 18 47 C 16 47 14 46 13 44 L 9 30 C 8 26 10 24 12 24 Z"
        fill="#c73c7b"
      />
      {/* Polka Dots */}
      <circle cx="16" cy="30" r="1.5" fill="#fff" opacity="0.8" />
      <circle cx="23" cy="30" r="1.5" fill="#fff" opacity="0.8" />
      <circle cx="30" cy="30" r="1.5" fill="#fff" opacity="0.8" />
      <circle cx="37" cy="30" r="1.5" fill="#fff" opacity="0.8" />
      <circle cx="44" cy="30" r="1.5" fill="#fff" opacity="0.8" />
      
      <circle cx="19" cy="36" r="1.5" fill="#fff" opacity="0.8" />
      <circle cx="26" cy="36" r="1.5" fill="#fff" opacity="0.8" />
      <circle cx="33" cy="36" r="1.5" fill="#fff" opacity="0.8" />
      <circle cx="40" cy="36" r="1.5" fill="#fff" opacity="0.8" />
      
      <circle cx="16" cy="42" r="1.5" fill="#fff" opacity="0.8" />
      <circle cx="23" cy="42" r="1.5" fill="#fff" opacity="0.8" />
      <circle cx="30" cy="42" r="1.5" fill="#fff" opacity="0.8" />
      <circle cx="37" cy="42" r="1.5" fill="#fff" opacity="0.8" />
      <circle cx="44" cy="42" r="1.5" fill="#fff" opacity="0.8" />

      {/* Shading */}
      <path d="M 12 25 L 48 25" stroke="#901a50" strokeWidth="1" />
    </svg>
  </div>
)

const PinkStar = () => (
  <div className="absolute -top-3 -right-3 w-10 h-10 z-30 drop-shadow transform rotate-12 pointer-events-none select-none">
    <svg viewBox="0 0 24 24" className="w-full h-full">
      <path
        d="M12 .587l3.668 7.431 8.2 1.191-5.934 5.787 1.4 8.168L12 18.896l-7.334 3.857 1.4-8.168L.132 9.209l8.2-1.191L12 .587z"
        fill="#e65c9c"
        stroke="#9a1052"
        strokeWidth="1"
      />
      {/* Texture sketch lines */}
      <path d="M 12 5 L 12 17" stroke="#fff" strokeWidth="0.8" opacity="0.4" />
      <path d="M 5 12 L 19 12" stroke="#fff" strokeWidth="0.8" opacity="0.4" />
    </svg>
  </div>
)

const MetallicStars = () => (
  <div className="absolute -bottom-5 -left-4 flex items-end z-30 pointer-events-none select-none">
    {/* Silver Star */}
    <div className="w-8 h-8 drop-shadow transform rotate-[-15deg]">
      <svg viewBox="0 0 24 24" className="w-full h-full">
        <path
          d="M12 .587l3.668 7.431 8.2 1.191-5.934 5.787 1.4 8.168L12 18.896l-7.334 3.857 1.4-8.168L.132 9.209l8.2-1.191L12 .587z"
          fill="url(#silverGrad)"
          stroke="#999"
          strokeWidth="0.5"
        />
        <defs>
          <linearGradient id="silverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="50%" stopColor="#cfcfcf" />
            <stop offset="100%" stopColor="#9a9a9a" />
          </linearGradient>
        </defs>
      </svg>
    </div>
    {/* Purple/Pink Metallic Star */}
    <div className="w-6 h-6 drop-shadow transform translate-y-1.5 rotate-[20deg] -ml-1">
      <svg viewBox="0 0 24 24" className="w-full h-full">
        <path
          d="M12 .587l3.668 7.431 8.2 1.191-5.934 5.787 1.4 8.168L12 18.896l-7.334 3.857 1.4-8.168L.132 9.209l8.2-1.191L12 .587z"
          fill="url(#metallicPink)"
          stroke="#8b1e5b"
          strokeWidth="0.5"
        />
        <defs>
          <linearGradient id="metallicPink" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff9ebb" />
            <stop offset="60%" stopColor="#d33c82" />
            <stop offset="100%" stopColor="#801045" />
          </linearGradient>
        </defs>
      </svg>
    </div>
    {/* Dark Red Metallic Star */}
    <div className="w-7 h-7 drop-shadow transform -translate-x-1.5 translate-y-0.5 rotate-[-5deg]">
      <svg viewBox="0 0 24 24" className="w-full h-full">
        <path
          d="M12 .587l3.668 7.431 8.2 1.191-5.934 5.787 1.4 8.168L12 18.896l-7.334 3.857 1.4-8.168L.132 9.209l8.2-1.191L12 .587z"
          fill="url(#metallicRed)"
          stroke="#5a0025"
          strokeWidth="0.5"
        />
        <defs>
          <linearGradient id="metallicRed" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff4d79" />
            <stop offset="50%" stopColor="#b3003b" />
            <stop offset="100%" stopColor="#660022" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  </div>
)

// IMAGE 2 INSPIRED STICKERS: CLC AV CARD
const SketchedHeadphones = () => (
  <div className="absolute -top-5 -left-5 w-14 h-14 z-30 transform -rotate-12 pointer-events-none select-none text-neutral-800">
    <svg viewBox="0 0 50 50" className="w-full h-full">
      {/* Arch headband (drawn style) */}
      <path
        d="M 12 32 C 10 16, 40 16, 38 32"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      {/* Left Ear Cup */}
      <rect x="7" y="26" width="8" height="12" rx="4" fill="currentColor" />
      {/* Right Ear Cup */}
      <rect x="35" y="26" width="8" height="12" rx="4" fill="currentColor" />
      {/* sketchy cables */}
      <path d="M 10 38 Q 6 42 10 44" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  </div>
)

const SketchedMusicNotes = () => (
  <div className="absolute -top-4 -right-3 w-10 h-10 z-30 transform rotate-12 pointer-events-none select-none text-neutral-800">
    <svg viewBox="0 0 24 24" className="w-full h-full">
      <path
        d="M 6 18 A 2 2 0 1 1 4 16 L 4 6 L 16 3 L 16 13 A 2 2 0 1 1 14 11"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="4" cy="18" r="2.5" fill="currentColor" />
      <circle cx="14" cy="13" r="2.5" fill="currentColor" />
      <path d="M 4 6 L 16 3" stroke="currentColor" strokeWidth="2.5" />
    </svg>
  </div>
)

const SketchedStar = () => (
  <div className="absolute -bottom-3 -left-3 w-10 h-10 z-30 transform -rotate-[15deg] pointer-events-none select-none text-neutral-800">
    <svg viewBox="0 0 24 24" className="w-full h-full">
      <path
        d="M12 .587l3.668 7.431 8.2 1.191-5.934 5.787 1.4 8.168L12 18.896l-7.334 3.857 1.4-8.168L.132 9.209l8.2-1.191L12 .587z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </div>
)

// CLEAN BLUE CLIP (for Rippling card)
const BlueBinderClip = () => (
  <div className="absolute -top-7 left-1/2 -translate-x-1/2 w-14 h-12 z-30 drop-shadow-md pointer-events-none select-none">
    <svg viewBox="0 0 60 50" className="w-full h-full">
      <path
        d="M 30 5 C 22 5 22 25 24 28 L 36 28 C 38 25 38 5 30 5"
        fill="none"
        stroke="#c4c4c7"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M 12 24 L 48 24 C 50 24 52 26 51 30 L 47 44 C 46 46 44 47 42 47 L 18 47 C 16 47 14 46 13 44 L 9 30 C 8 26 10 24 12 24 Z"
        fill="#3b82f6"
      />
      <path d="M 12 25 L 48 25" stroke="#1d4ed8" strokeWidth="1" />
    </svg>
  </div>
)

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
      src: '/images/av-clc.jpg',
      alt: 'Working as AV Tech Lead with CLC',
      title: 'AV Tech Lead with CLC',
      date: '2023 - 2024',
      rotate: -3,
      note: 'Running tech & AV operations for Student Affairs CLC events!',
      sticker: '🎧'
    },
    {
      src: '/images/graduation-sbu.jpg',
      alt: 'Getting graduated from Stony Brook University',
      title: 'SBU Graduation',
      date: 'May 2024',
      rotate: 2,
      note: 'Earned my M.S. in Computer Science! Class of 24!',
      sticker: '🎓'
    },
    {
      src: '/images/rippling.png',
      alt: 'Working at Rippling',
      title: 'Software Engineer at Rippling',
      date: 'Present',
      rotate: -2,
      note: 'Building world-class workforce management products at Rippling!',
      sticker: '💻'
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
                className="bg-white p-4 shadow-xl border border-neutral-200/80 rounded-sm w-full max-w-[320px] flex-shrink-0 relative"
              >
                {/* ----------------- CUSTOM CREATIVE STICKERS ----------------- */}
                {/* CARD 1: AV CLC TECH - Headphone & Music Note Theme */}
                {i === 0 && (
                  <>
                    <SketchedHeadphones />
                    <SketchedMusicNotes />
                    <SketchedStar />
                  </>
                )}

                {/* CARD 2: SBU GRADUATION - Pink Clip & Star Sticker Theme */}
                {i === 1 && (
                  <>
                    <PinkBinderClip />
                    <PinkStar />
                    <MetallicStars />
                    {/* Floating graduation hat emoji */}
                    <div className="absolute top-[20%] -right-4 w-9 h-9 z-30 drop-shadow-md transform rotate-[-12deg] select-none text-xl flex items-center justify-center bg-amber-50 rounded-full border border-amber-950/20">
                      🎓
                    </div>
                  </>
                )}

                {/* CARD 3: RIPPLING - Clean Blue Clip Theme */}
                {i === 2 && (
                  <>
                    <BlueBinderClip />
                    {/* Laptop Sticker */}
                    <div className="absolute -top-3 -right-3 w-9 h-9 z-30 drop-shadow transform rotate-[15deg] select-none text-xl flex items-center justify-center bg-blue-50 rounded-full border border-blue-900/10">
                      💻
                    </div>
                    {/* Sketched Star */}
                    <div className="absolute -bottom-3 -left-3 w-10 h-10 z-30 transform -rotate-[15deg] pointer-events-none select-none text-blue-500">
                      <svg viewBox="0 0 24 24" className="w-full h-full">
                        <path
                          d="M12 .587l3.668 7.431 8.2 1.191-5.934 5.787 1.4 8.168L12 18.896l-7.334 3.857 1.4-8.168L.132 9.209l8.2-1.191L12 .587z"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </>
                )}
                {/* ------------------------------------------------------------ */}

                {/* Custom User Sticker Asset from Image 4 */}
                {i === 1 && (
                  <div className="absolute -bottom-3 -right-3 w-10 h-10 z-30 drop-shadow-md transform rotate-[-8deg] select-none pointer-events-none">
                    <Image 
                      src="/images/timeline-stickers.png" 
                      alt="sticker" 
                      width={40} 
                      height={40} 
                      className="object-contain"
                    />
                  </div>
                )}

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


