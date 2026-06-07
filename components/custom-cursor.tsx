'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export function CustomCursor() {
  const [tip, setTip] = useState<string | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  
  // Spring motion values for ultra-smooth 60fps tracking
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  const springConfig = { damping: 25, stiffness: 250, mass: 0.5 }
  const cursorX = useSpring(mouseX, springConfig)
  const cursorY = useSpring(mouseY, springConfig)

  useEffect(() => {
    // Hide default cursor on body
    const style = document.createElement('style')
    style.innerHTML = `
      @media (min-width: 768px) {
        body, a, button, [role="button"] {
          cursor: none !important;
        }
      }
    `
    document.head.appendChild(style)

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - 10)
      mouseY.set(e.clientY - 10)
      if (!isVisible) setIsVisible(true)
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const interactiveEl = target.closest('[data-cursor-tip]')
      if (interactiveEl) {
        setTip(interactiveEl.getAttribute('data-cursor-tip'))
      } else {
        setTip(null)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseover', handleMouseOver)

    return () => {
      document.head.removeChild(style)
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseover', handleMouseOver)
    }
  }, [mouseX, mouseY, isVisible])

  if (!isVisible) return null

  return (
    <motion.div
      style={{
        position: 'fixed',
        left: cursorX,
        top: cursorY,
        translateX: 0,
        translateY: 0,
      }}
      className="pointer-events-none fixed z-[99999] hidden md:block"
    >
      {/* Sketched Cartoon Gaming Hand Pointer */}
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="filter drop-shadow-md select-none"
      >
        {/* Hand Shadow */}
        <path
          d="M10 6 L14 2 L18 6 L18 10 H22 L24 12 L24 16 L20 20 H14 L10 16 Z"
          fill="#1A1614"
          opacity="0.15"
          transform="translate(2, 2)"
        />
        {/* Glove fill */}
        <path
          d="M10 6 L14 2 L18 6 L18 10 H22 L24 12 L24 16 L20 20 H14 L10 16 Z"
          fill="#F97316"
          stroke="#1A1614"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        {/* Inner highlights */}
        <path d="M13 5 L15 3" stroke="#FFEDD5" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="16" cy="14" r="1.5" fill="#FFFFFF" />
      </svg>

      {/* Floating handwritten speech bubble */}
      <AnimatePresence>
        {tip && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 20, y: -20 }}
            animate={{ opacity: 1, scale: 1, x: 28, y: -12 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="absolute whitespace-nowrap bg-amber-50 text-amber-950 px-2.5 py-1.5 rounded-lg border-2 border-amber-950 font-mono text-[9px] font-bold shadow-lg"
          >
            {tip}
            {/* Tiny speech bubble pointer arrow */}
            <div className="absolute left-[-6px] top-4 w-2 h-2 bg-amber-50 border-l-2 border-b-2 border-amber-950 rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
