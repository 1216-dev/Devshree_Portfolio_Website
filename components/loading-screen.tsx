'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Warm black and brown theme color palette
const COLORS = {
  bg: '#1A1614',         // Dark chocolate charcoal background
  textPrimary: '#E0A96D', // Warm tan/gold for main text
  textPercent: '#D97706', // Copper orange for percentage
  
  // Floral heart colors
  darkBrown: '#3D2516',  // Deep espresso brown
  midBrown: '#78350F',   // Rich soil brown
  lightBrown: '#92400E', // Tan brown
  gold: '#D97706',       // Golden amber
  copper: '#B45309',     // Copper/bronze
  charcoal: '#2D2724',   // Very dark warm grey
  green: '#4D5E44',      // Muted forest green
  stem: '#303D2A',       // Dark stem green
}

// Floral Heart elements positioned to match the density and shape
const FLORAL_HEART_ELEMENTS = [
  // Bottom Tip
  { x: 120, y: 200, type: 'leaf', color: COLORS.green, delay: 0.9, size: 12, rotate: 10 },
  { x: 120, y: 185, type: 'rose', color: COLORS.copper, delay: 0.8, size: 16, rotate: 0 },
  
  // Left side lower curve
  { x: 95, y: 170, type: 'daisy', color: COLORS.gold, delay: 0.7, size: 15, rotate: -20 },
  { x: 70, y: 150, type: 'leaf', color: COLORS.green, delay: 0.6, size: 14, rotate: -45 },
  { x: 50, y: 125, type: 'daisy', color: COLORS.lightBrown, delay: 0.5, size: 17, rotate: 10 },
  { x: 38, y: 100, type: 'rose', color: COLORS.charcoal, delay: 0.45, size: 15, rotate: -30 },
  
  // Right side lower curve
  { x: 145, y: 170, type: 'daisy', color: COLORS.midBrown, delay: 0.75, size: 16, rotate: 30 },
  { x: 170, y: 150, type: 'leaf', color: COLORS.green, delay: 0.65, size: 13, rotate: 45 },
  { x: 190, y: 125, type: 'rose', color: COLORS.gold, delay: 0.55, size: 18, rotate: -15 },
  { x: 202, y: 100, type: 'daisy', color: COLORS.copper, delay: 0.48, size: 14, rotate: 25 },

  // Left side upper arch
  { x: 45, y: 75, type: 'rose', color: COLORS.midBrown, delay: 0.4, size: 14, rotate: -10 },
  { x: 60, y: 55, type: 'leaf', color: COLORS.green, delay: 0.3, size: 16, rotate: -60 },
  { x: 82, y: 42, type: 'daisy', color: COLORS.gold, delay: 0.2, size: 19, rotate: 12 },
  { x: 105, y: 48, type: 'rose', color: COLORS.lightBrown, delay: 0.1, size: 15, rotate: 40 },

  // Right side upper arch
  { x: 195, y: 75, type: 'rose', color: COLORS.copper, delay: 0.45, size: 15, rotate: 20 },
  { x: 180, y: 55, type: 'leaf', color: COLORS.green, delay: 0.35, size: 15, rotate: 60 },
  { x: 158, y: 42, type: 'daisy', color: COLORS.midBrown, delay: 0.25, size: 18, rotate: -25 },
  { x: 135, y: 48, type: 'rose', color: COLORS.charcoal, delay: 0.15, size: 16, rotate: -35 },

  // Center top dip and internal filler flowers
  { x: 120, y: 62, type: 'leaf', color: COLORS.green, delay: 0.2, size: 14, rotate: 180 },
  { x: 120, y: 88, type: 'daisy', color: COLORS.copper, delay: 0.3, size: 20, rotate: 5 },
  { x: 92, y: 85, type: 'rose', color: COLORS.darkBrown, delay: 0.4, size: 17, rotate: -5 },
  { x: 148, y: 85, type: 'daisy', color: COLORS.gold, delay: 0.4, size: 18, rotate: 15 },
  { x: 75, y: 110, type: 'leaf', color: COLORS.green, delay: 0.5, size: 15, rotate: -15 },
  { x: 165, y: 110, type: 'rose', color: COLORS.charcoal, delay: 0.5, size: 16, rotate: -40 },
  { x: 120, y: 115, type: 'daisy', color: COLORS.darkBrown, delay: 0.6, size: 22, rotate: 45 },
  { x: 95, y: 135, type: 'rose', color: COLORS.lightBrown, delay: 0.7, size: 15, rotate: -10 },
  { x: 145, y: 135, type: 'leaf', color: COLORS.green, delay: 0.7, size: 14, rotate: 25 },
  { x: 120, y: 150, type: 'daisy', color: COLORS.gold, delay: 0.75, size: 17, rotate: -5 },
]

// Render helper for cartoon flowers matching the reference bouquet
function renderElement(type: string, color: string) {
  switch (type) {
    case 'rose':
      return (
        <g>
          {/* Layered Rose petals */}
          <circle cx="0" cy="0" r="9" fill={color} />
          <circle cx="-3" cy="-2" r="5" fill="#FFFFFF" opacity="0.12" />
          <circle cx="3" cy="2" r="5" fill="#000000" opacity="0.25" />
          {/* Core center swirl */}
          <circle cx="0" cy="0" r="4.5" fill="#000000" opacity="0.3" />
          <circle cx="0" cy="0" r="2.5" fill="#FFFFFF" opacity="0.15" />
        </g>
      )
    case 'daisy':
      return (
        <g>
          {/* 5 Petals rotation */}
          <g transform="rotate(0)"><ellipse cx="0" cy="-7" rx="3.5" ry="7" fill={color} /></g>
          <g transform="rotate(72)"><ellipse cx="0" cy="-7" rx="3.5" ry="7" fill={color} /></g>
          <g transform="rotate(144)"><ellipse cx="0" cy="-7" rx="3.5" ry="7" fill={color} /></g>
          <g transform="rotate(216)"><ellipse cx="0" cy="-7" rx="3.5" ry="7" fill={color} /></g>
          <g transform="rotate(288)"><ellipse cx="0" cy="-7" rx="3.5" ry="7" fill={color} /></g>
          {/* Center disk */}
          <circle cx="0" cy="0" r="4.5" fill="#1A1614" />
          <circle cx="0" cy="0" r="2.5" fill={COLORS.textPrimary} opacity="0.8" />
        </g>
      )
    case 'leaf':
    default:
      return (
        <g>
          <path d="M 0 0 C -5 -6, -5 -12, 0 -18 C 5 -12, 5 -6, 0 0 Z" fill={color} />
          <path d="M 0 0 L 0 -15" stroke="#1A1614" strokeWidth="0.8" opacity="0.4" />
        </g>
      )
  }
}

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0)
  const [isDone, setIsDone] = useState(false)

  useEffect(() => {
    const duration = 2200 // 2.2 seconds
    const intervalTime = 20
    const step = 100 / (duration / intervalTime)

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + step
        if (next >= 100) {
          clearInterval(timer)
          setTimeout(() => {
            setIsDone(true)
            setTimeout(onComplete, 600)
          }, 150)
          return 100
        }
        return next
      })
    }, intervalTime)

    return () => clearInterval(timer)
  }, [onComplete])

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          style={{ backgroundColor: COLORS.bg }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-between py-20 px-6 pointer-events-auto"
        >
          {/* Sketchy dotted background texture */}
          <div className="absolute inset-0 opacity-[0.05] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

          {/* Top Header Label in warm tan/gold, handwriting style */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center mt-4"
          >
            <h1 style={{ color: COLORS.textPrimary }} className="font-script text-[36px] tracking-wide">
              Devshree Jadeja
            </h1>
          </motion.div>

          {/* Centered Blooming Heart Bouquet matching the style exactly */}
          <div className="relative w-[300px] h-[300px] flex items-center justify-center -mt-8">
            <svg
              className="w-full h-full"
              viewBox="0 0 240 240"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Subtle backshadow for visual aid */}
              <path
                d="M120 62 C80 15, 15 35, 15 95 C15 145, 70 175, 120 210 C170 175, 225 145, 225 95 C225 35, 160 15, 120 62 Z"
                fill="#78350F"
                opacity="0.12"
              />

              {/* Render each floral component in the heart bouquet */}
              {FLORAL_HEART_ELEMENTS.map((el, i) => {
                const elementThreshold = (i / FLORAL_HEART_ELEMENTS.length) * 100
                const isBloomed = progress >= elementThreshold

                return (
                  <g key={i} transform={`translate(${el.x}, ${el.y}) rotate(${el.rotate})`}>
                    <AnimatePresence>
                      {isBloomed && (
                        <motion.g
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1.1, opacity: 1 }}
                          whileInView={{ scale: 1 }}
                          transition={{
                            type: 'spring',
                            stiffness: 150,
                            damping: 13,
                            delay: el.delay * 0.1,
                          }}
                        >
                          {renderElement(el.type, el.color)}
                        </motion.g>
                      )}
                    </AnimatePresence>
                  </g>
                )
              })}
            </svg>
          </div>

          {/* Progress Percent & Bottom Loading Bar */}
          <div className="w-full flex flex-col items-center gap-12 relative">
            <div className="flex flex-col items-center mb-6">
              <span style={{ color: COLORS.textPercent }} className="font-sans text-[72px] font-light tracking-tight leading-none select-none">
                {Math.round(progress)}<span className="text-[32px] ml-0.5">%</span>
              </span>
            </div>

            {/* Sketched horizontal loader progress bar at the very bottom of screen */}
            <div className="fixed bottom-0 left-0 right-0 h-1 bg-amber-950/20 overflow-hidden">
              <motion.div
                style={{ backgroundColor: COLORS.textPercent }}
                className="h-full"
                animate={{ width: `${progress}%` }}
                transition={{ ease: 'easeOut', duration: 0.1 }}
                layoutId="progressFillLineDark"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
