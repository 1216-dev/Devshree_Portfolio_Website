'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

interface FlyingElement {
  color: string
  size: number
  initialX: number
  initialY: number
  shape: 'circle' | 'square' | 'triangle' | 'star'
}

const FLYING_ELEMENTS: FlyingElement[] = [
  { color: '#d9482b', size: 24, initialX: 5, initialY: 20, shape: 'circle' },
  { color: '#2b5fd9', size: 32, initialX: 95, initialY: 30, shape: 'square' },
  { color: '#e8b923', size: 28, initialX: 10, initialY: 60, shape: 'triangle' },
  { color: '#3f6b2e', size: 20, initialX: 90, initialY: 70, shape: 'star' },
  { color: '#e8772b', size: 36, initialX: 3, initialY: 85, shape: 'circle' },
  { color: '#d9482b', size: 22, initialX: 97, initialY: 15, shape: 'triangle' },
  { color: '#2b5fd9', size: 30, initialX: 8, initialY: 45, shape: 'star' },
  { color: '#e8b923', size: 26, initialX: 92, initialY: 55, shape: 'square' },
  { color: '#3f6b2e', size: 34, initialX: 15, initialY: 90, shape: 'circle' },
  { color: '#e8772b', size: 28, initialX: 85, initialY: 95, shape: 'triangle' },
]

function Shape({ type, color, size }: { type: string; color: string; size: number }) {
  if (type === 'circle') {
    return (
      <div
        className="rounded-full"
        style={{ backgroundColor: color, width: size, height: size }}
      />
    )
  }
  if (type === 'square') {
    return (
      <div
        className="rotate-12"
        style={{ backgroundColor: color, width: size, height: size }}
      />
    )
  }
  if (type === 'triangle') {
    return (
      <div
        style={{
          width: 0,
          height: 0,
          borderLeft: `${size / 2}px solid transparent`,
          borderRight: `${size / 2}px solid transparent`,
          borderBottom: `${size}px solid ${color}`,
        }}
      />
    )
  }
  // star
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  )
}

export function FlyingTransition() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  return (
    <div ref={ref} className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
      {FLYING_ELEMENTS.map((el, i) => {
        const direction = i % 2 === 0 ? 1 : -1
        const xOffset = direction * (100 + Math.random() * 200)
        const yOffset = -50 + Math.random() * 100
        const rotation = direction * (180 + Math.random() * 360)

        return (
          <FlyingShape
            key={i}
            element={el}
            scrollYProgress={scrollYProgress}
            xOffset={xOffset}
            yOffset={yOffset}
            rotation={rotation}
            index={i}
          />
        )
      })}
    </div>
  )
}

function FlyingShape({
  element,
  scrollYProgress,
  xOffset,
  yOffset,
  rotation,
  index,
}: {
  element: FlyingElement
  scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress']
  xOffset: number
  yOffset: number
  rotation: number
  index: number
}) {
  const x = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0, xOffset * 0.5, xOffset]
  )
  const y = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0, yOffset * 0.5, yOffset]
  )
  const rotate = useTransform(
    scrollYProgress,
    [0, 1],
    [0, rotation]
  )
  const scale = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0.5, 1.2, 1.2, 0.5]
  )
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.3, 1, 1, 0.3]
  )

  return (
    <motion.div
      className="absolute"
      style={{
        left: `${element.initialX}%`,
        top: `${element.initialY}%`,
        x,
        y,
        rotate,
        scale,
        opacity,
      }}
    >
      <Shape type={element.shape} color={element.color} size={element.size} />
    </motion.div>
  )
}
