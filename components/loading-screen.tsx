'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Defined positions of flowers and leaves forming a heart shape
// Canvas size: 240x240, Center is (120, 120)
const FLORAL_HEART_ELEMENTS = [
  // Bottom Tip
  { x: 120, y: 200, type: 'leaf', color: '#3f6b2e', delay: 0.9, size: 12, rotate: 0 },
  { x: 120, y: 180, type: 'rose', color: '#d9482b', delay: 0.8, size: 18, rotate: 15 },
  
  // Left side lower curve
  { x: 95, y: 165, type: 'daisy', color: '#e8b923', delay: 0.7, size: 15, rotate: -20 },
  { x: 70, y: 145, type: 'leaf', color: '#3f6b2e', delay: 0.6, size: 14, rotate: -45 },
  { x: 50, y: 120, type: 'marigold', color: '#e8772b', delay: 0.5, size: 17, rotate: 10 },
  
  // Right side lower curve
  { x: 145, y: 165, type: 'marigold', color: '#e8772b', delay: 0.75, size: 16, rotate: 30 },
  { x: 170, y: 145, type: 'leaf', color: '#3f6b2e', delay: 0.65, size: 13, rotate: 45 },
  { x: 190, y: 120, type: 'rose', color: '#d9482b', delay: 0.55, size: 18, rotate: -15 },

  // Left side upper arch
  { x: 45, y: 95, type: 'daisy', color: '#e8b923', delay: 0.4, size: 14, rotate: -10 },
  { x: 55, y: 70, type: 'leaf', color: '#3f6b2e', delay: 0.3, size: 16, rotate: -60 },
  { x: 75, y: 50, type: 'marigold', color: '#e8772b', delay: 0.2, size: 19, rotate: 12 },
  { x: 100, y: 55, type: 'rose', color: '#d9482b', delay: 0.1, size: 15, rotate: 40 },

  // Right side upper arch
  { x: 195, y: 95, type: 'daisy', color: '#e8b923', delay: 0.45, size: 15, rotate: 20 },
  { x: 185, y: 70, type: 'leaf', color: '#3f6b2e', delay: 0.35, size: 15, rotate: 60 },
  { x: 165, y: 50, type: 'rose', color: '#d9482b', delay: 0.25, size: 18, rotate: -25 },
  { x: 140, y: 55, type: 'marigold', color: '#e8772b', delay: 0.15, size: 16, rotate: -35 },

  // Center top dip and internal filler flowers
  { x: 120, y: 72, type: 'leaf', color: '#3f6b2e', delay: 0.2, size: 14, rotate: 180 },
  { x: 120, y: 95, type: 'daisy', color: '#e8b923', delay: 0.3, size: 20, rotate: 5 },
  { x: 92, y: 90, type: 'rose', color: '#d9482b', delay: 0.4, size: 17, rotate: -5 },
  { x: 148, y: 90, type: 'marigold', color: '#e8772b', delay: 0.4, size: 18, rotate: 15 },
  { x: 80, y: 115, type: 'leaf', color: '#3f6b2e', delay: 0.5, size: 15, rotate: -15 },
  { x: 160, y: 115, type: 'daisy', color: '#e8b923', delay: 0.5, size: 16, rotate: -40 },
  { x: 120, y: 125, type: 'rose', color: '#d9482b', delay: 0.6, size: 22, rotate: 45 },
  { x: 95, y: 140, type: 'marigold', color: '#e8772b', delay: 0.7, size: 15, rotate: -10 },
  { x: 145, y: 140, type: 'leaf', color: '#3f6b2e', delay: 0.7, size: 14, rotate: 25 },
  { x: 120, y: 155, type: 'daisy', color: '#e8b923', delay: 0.75, size: 17, rotate: -5 },
]

// Render helper for cartoon flower assets
function renderElement(type: string, color: string) {
  switch (type) {
    case 'rose':
      return (
        <g>
          {/* Outer Petals */}
          <circle cx="0" cy="0" r="8" fill={color} />
          <circle cx="-5" cy="-3" r="5" fill="#f87171" opacity="0.4" />
          <circle cx="5" cy="3" r="5" fill="#f87171" opacity="0.4" />
          {/* Inner Swirl */}
          <circle cx="0" cy="0" r="4" fill="#b91c1c" />
          <circle cx="0" cy="0" r="2" fill="#ef4444" />
        </g>
      )
    case 'daisy':
      return (
        <g>
          {/* Petals */}
          <ellipse cx="0" cy="-6" rx="3" ry="6" fill="#fef08a" />
          <ellipse cx="0" cy="6" rx="3" ry="6" fill="#fef08a" />
          <ellipse cx="-6" cy="0" rx="6" ry="3" fill="#fef08a" />
          <ellipse cx="6" cy="0" rx="6" ry="3" fill="#fef08a" />
          {/* Center */}
          <circle cx="0" cy="0" r="4.5" fill={color} />
          <circle cx="-1" cy="-1" r="1" fill="#ffffff" opacity="0.6" />
        </g>
      )
    case 'marigold':
      return (
        <g>
          {/* Fluffy layers */}
          <circle cx="0" cy="0" r="8.5" fill={color} />
          <circle cx="0" cy="0" r="6" fill="#f97316" />
          <circle cx="0" cy="0" r="3" fill="#ea580c" />
          <circle cx="-1.5" cy="-1.5" r="1" fill="#ffffff" opacity="0.5" />
        </g>
      )
    case 'leaf':
    default:
      return (
        <g>
          {/* skteched leaf */}
          <path d="M 0 0 C -6 -8, -6 -16, 0 -22 C 6 -16, 6 -8, 0 0 Z" fill={color} stroke="#1b3b14" strokeWidth="1" />
          {/* midrib */}
          <path d="M 0 0 L 0 -18" stroke="#166534" strokeWidth="1" />
        </g>
      )
  }
}

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0)
  const [isDone, setIsDone] = useState(false)

  useEffect(() => {
    // Increment progress counter from 0 to 100
    const duration = 2200 // 2.2 seconds
    const intervalTime = 25
    const step = 100 / (duration / intervalTime)

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + step
        if (next >= 100) {
          clearInterval(timer)
          // Hold at 100% briefly, then exit
          setTimeout(() => {
            setIsDone(true)
            setTimeout(onComplete, 600)
          }, 200)
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
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] bg-[#FAF8F5] flex flex-col items-center justify-between py-16 px-6 pointer-events-auto"
        >
          {/* Sketchy dotted background texture */}
          <div className="absolute inset-0 opacity-[0.12] bg-[radial-gradient(#000000_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

          {/* Top Header Label */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center"
          >
            <h1 className="font-script text-3xl font-bold tracking-widest text-orange-600">
              Devshree Jadeja
            </h1>
            <span className="font-mono text-[9px] uppercase tracking-widest text-amber-950/40 mt-1">
              Data Scientist & ML Engineer
            </span>
          </motion.div>

          {/* Centered Blooming Heart Bouquet */}
          <div className="relative w-[280px] h-[280px] flex items-center justify-center">
            <svg
              className="w-full h-full"
              viewBox="0 0 240 240"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Backing shadow path for heart shape */}
              <path
                d="M120 70 C80 20, 20 40, 20 100 C20 150, 70 180, 120 215 C170 180, 220 150, 220 100 C220 40, 160 20, 120 70 Z"
                fill="#854d0e"
                opacity="0.03"
              />

              {/* Render each floral component in the heart bouquet */}
              {FLORAL_HEART_ELEMENTS.map((el, i) => {
                // Determine if this flower should bloom based on load progress
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
                            stiffness: 140,
                            damping: 12,
                            delay: el.delay * 0.15,
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
          <div className="w-full max-w-sm flex flex-col items-center gap-6 z-10">
            <div className="flex flex-col items-center">
              <span className="font-script text-6xl font-bold tracking-tight text-orange-600 leading-none">
                {Math.round(progress)}%
              </span>
              <span className="font-mono text-[9px] uppercase tracking-widest text-amber-950/50 mt-2.5 animate-pulse">
                cultivating ideas
              </span>
            </div>

            {/* Sketched horizontal loader progress bar at the very bottom */}
            <div className="w-full h-1.5 bg-amber-950/10 rounded-full overflow-hidden border border-amber-950/5 p-0.5">
              <motion.div
                className="h-full bg-orange-600 rounded-full"
                style={{ width: `${progress}%` }}
                layoutId="progressFill"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
