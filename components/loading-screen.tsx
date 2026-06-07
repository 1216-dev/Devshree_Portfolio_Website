'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [isDone, setIsDone] = useState(false)

  useEffect(() => {
    // Show loader for 2.2 seconds, then trigger exit transition
    const timer = setTimeout(() => {
      setIsDone(true)
      // Call parent complete callback after exit transition finishes
      setTimeout(onComplete, 600)
    }, 2200)

    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] bg-[#FAF8F5] flex flex-col items-center justify-center pointer-events-auto"
        >
          {/* Sketchy dotted background texture */}
          <div className="absolute inset-0 opacity-[0.15] bg-[radial-gradient(#000000_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

          {/* Centered Drawing Animation */}
          <div className="relative flex flex-col items-center gap-6">
            <svg
              className="w-32 h-32 text-zinc-900"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Soil mound doodle path */}
              <motion.path
                d="M15 80 C 25 74, 35 73, 50 75 C 65 77, 75 74, 85 80"
                stroke="currentColor"
                strokeWidth="3.5"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
              />

              <motion.path
                d="M25 81 C 35 77, 65 77, 75 81"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.6, delay: 0.3, ease: 'easeInOut' }}
              />

              {/* Stem path */}
              <motion.path
                d="M50 75 V 45 C 50 38, 55 33, 62 30"
                stroke="currentColor"
                strokeWidth="3.5"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.7, delay: 0.6, ease: 'easeInOut' }}
              />

              {/* Left Leaf path */}
              <motion.path
                d="M50 52 C 40 52, 35 46, 38 38 C 42 32, 50 42, 50 52 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.7, delay: 1.1, ease: 'easeInOut' }}
              />

              {/* Right Leaf path */}
              <motion.path
                d="M51 45 C 60 45, 66 39, 63 31 C 59 25, 51 35, 51 45 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.7, delay: 1.4, ease: 'easeInOut' }}
              />

              {/* Sketched loading ring dots */}
              <motion.circle
                cx="50"
                cy="50"
                r="40"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeDasharray="4 8"
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              />
            </svg>

            {/* Handwritten style text */}
            <div className="flex flex-col items-center gap-1">
              <motion.p
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="font-script text-2xl font-medium tracking-wide text-zinc-800"
              >
                unfolding the scrapbook...
              </motion.p>
              
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="font-mono text-[10px] uppercase tracking-widest text-zinc-500"
              >
                loading doodles
              </motion.span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
