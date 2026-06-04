'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

interface FloatingShapeProps {
  color: string
  size: number
  top: string
  left: string
  delay: number
  shape: 'circle' | 'square' | 'triangle'
}

const shapes: FloatingShapeProps[] = [
  { color: '#d9482b', size: 40, top: '10%', left: '5%', delay: 0, shape: 'circle' },
  { color: '#2b5fd9', size: 50, top: '20%', left: '90%', delay: 0.5, shape: 'square' },
  { color: '#e8b923', size: 35, top: '40%', left: '3%', delay: 1, shape: 'triangle' },
  { color: '#3f6b2e', size: 45, top: '60%', left: '95%', delay: 1.5, shape: 'circle' },
  { color: '#e8772b', size: 55, top: '80%', left: '8%', delay: 2, shape: 'square' },
  { color: '#d9482b', size: 30, top: '15%', left: '92%', delay: 0.3, shape: 'triangle' },
  { color: '#2b5fd9', size: 38, top: '45%', left: '2%', delay: 0.8, shape: 'circle' },
  { color: '#e8b923', size: 42, top: '70%', left: '93%', delay: 1.3, shape: 'square' },
  { color: '#3f6b2e', size: 48, top: '85%', left: '6%', delay: 1.8, shape: 'triangle' },
  { color: '#e8772b', size: 36, top: '30%', left: '96%', delay: 0.6, shape: 'circle' },
]

function FloatingShape({ color, size, top, left, delay, shape }: FloatingShapeProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()
  
  const y = useTransform(scrollYProgress, [0, 1], [0, Math.random() * 500 - 250])
  const x = useTransform(scrollYProgress, [0, 1], [0, Math.random() * 200 - 100])
  const rotate = useTransform(scrollYProgress, [0, 1], [0, Math.random() * 720 - 360])

  const shapeElement = (() => {
    if (shape === 'circle') {
      return (
        <div
          className="rounded-full"
          style={{ backgroundColor: color, width: size, height: size }}
        />
      )
    }
    if (shape === 'square') {
      return (
        <div
          style={{ backgroundColor: color, width: size, height: size }}
        />
      )
    }
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
  })()

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 0.6, scale: 1 }}
      transition={{ delay, duration: 0.5 }}
      style={{
        position: 'absolute',
        top,
        left,
        y,
        x,
        rotate,
        zIndex: 1,
      }}
    >
      {shapeElement}
    </motion.div>
  )
}

export function ScrollShapes() {
  return (
    <div className="pointer-events-none fixed inset-0 z-30 overflow-hidden">
      {shapes.map((shape, i) => (
        <FloatingShape key={i} {...shape} />
      ))}
    </div>
  )
}
