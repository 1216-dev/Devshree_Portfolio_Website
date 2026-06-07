'use client'

import Image from 'next/image'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

const SHAPES = [
  'circle red',
  'square blue',
  'triangle yellow',
  'circle green',
  'square red',
  'triangle blue',
  'circle yellow',
  'square green',
  'triangle red',
  'circle blue',
  'square yellow',
  'triangle green',
  'circle red',
  'square blue',
  'triangle yellow',
  'circle green',
]

const COLORS: Record<string, string> = {
  red: '#d9482b',
  blue: '#2b5fd9',
  yellow: '#e8b923',
  green: '#3f6b2e',
}

const TITLES = [
  'Data Scientist',
  'Data Analyst',
  'Data Engineer',
  'SDE',
  'Research Engineer',
  'AI/ML Engineer',
]

function Shape({ kind, index }: { kind: string; index: number }) {
  const [type, color] = kind.split(' ')
  const c = COLORS[color]
  
  const shapeElement = (() => {
    if (type === 'circle')
      return (
        <span
          className="inline-block h-8 w-8 rounded-full sm:h-10 sm:w-10"
          style={{ backgroundColor: c }}
        />
      )
    if (type === 'square')
      return (
        <span
          className="inline-block h-8 w-8 rotate-6 sm:h-10 sm:w-10"
          style={{ backgroundColor: c }}
        />
      )
    return (
      <span
        className="inline-block h-0 w-0 sm:scale-125"
        style={{
          borderLeft: '18px solid transparent',
          borderRight: '18px solid transparent',
          borderBottom: `32px solid ${c}`,
        }}
      />
    )
  })()

  return (
    <motion.div
      drag
      dragSnapToOrigin
      whileDrag={{ scale: 1.2, zIndex: 100 }}
      initial={{ y: 50, opacity: 0, rotate: -20 }}
      whileInView={{ y: 0, opacity: 1, rotate: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.5, type: 'spring' }}
      whileHover={{ scale: 1.2, rotate: 15 }}
      className="cursor-grab active:cursor-grabbing"
    >
      {shapeElement}
    </motion.div>
  )
}

export function HeroPage() {
  const ref = useRef<HTMLDivElement>(null)
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTitleIndex((prev) => (prev + 1) % TITLES.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 150])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <div
      ref={ref}
      className="bg-dots-light relative min-h-screen overflow-hidden bg-[#0b0b0c] px-5 py-10 text-neutral-200 sm:px-10"
    >
      {/* top bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mx-auto flex max-w-6xl items-center justify-between border-b border-white/10 pb-5"
      >
        <span className="font-script text-4xl font-bold leading-none text-white">dj</span>
        <div className="hidden gap-7 font-script text-xl text-neutral-400 sm:flex">
          <motion.span whileHover={{ scale: 1.1 }} className="cursor-pointer text-white">Works</motion.span>
          <motion.span whileHover={{ scale: 1.1 }} className="cursor-pointer hover:text-white">Research</motion.span>
          <motion.a
            href="/ML_Devshree_Resume_.pdf"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            className="cursor-pointer hover:text-white"
            data-cursor-tip="yes click it! 📄"
          >
            Resume
          </motion.a>
          <motion.a
            href="https://www.linkedin.com/in/devshree-jadeja-144709210/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            className="cursor-pointer hover:text-white"
            data-cursor-tip="yes connect! 🤝"
          >
            LinkedIn
          </motion.a>
          <motion.span whileHover={{ scale: 1.1 }} className="cursor-pointer hover:text-white">Contact</motion.span>
        </div>
      </motion.div>

      {/* main statement */}
      <motion.div style={{ y, opacity }} className="mx-auto mt-14 max-w-6xl sm:mt-20">
        <div className="relative">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl text-pretty text-4xl font-medium leading-[1.2] tracking-tight text-neutral-500 sm:text-6xl"
          >
            crafting{' '}
            <span className="relative inline-block text-white font-semibold">
              data solutions
              <svg
                className="absolute -bottom-2 left-0 w-full h-3 pointer-events-none"
                viewBox="0 0 100 10"
                fill="none"
                preserveAspectRatio="none"
              >
                <motion.path
                  d="M 2 5 Q 50 8 98 4"
                  stroke="#e8772b"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 1.0, duration: 0.8, ease: 'easeOut' }}
                />
              </svg>
            </span>{' '}
            that turn messy numbers into{' '}
            <span className="text-white">decisions people trust</span>. . . .
            <span className="inline-flex gap-1 items-center align-middle ml-4">
              <svg viewBox="0 0 80 50" className="w-16 h-10">
                {/* Left Eye */}
                <ellipse cx="22" cy="25" rx="16" ry="22" fill="#e8772b" />
                <motion.ellipse
                  cx="26"
                  cy="25"
                  rx="8"
                  ry="12"
                  fill="#fffdf7"
                  animate={{ scaleY: [1, 0.1, 1] }}
                  transition={{ repeat: Infinity, duration: 4, repeatDelay: 3 }}
                />
                <motion.circle
                  cx="28"
                  cy="25"
                  r="4"
                  fill="#000"
                  animate={{ scaleY: [1, 0.1, 1] }}
                  transition={{ repeat: Infinity, duration: 4, repeatDelay: 3 }}
                />

                {/* Right Eye */}
                <ellipse cx="58" cy="25" rx="16" ry="22" fill="#e8772b" />
                <motion.ellipse
                  cx="62"
                  cy="25"
                  rx="8"
                  ry="12"
                  fill="#fffdf7"
                  animate={{ scaleY: [1, 0.1, 1] }}
                  transition={{ repeat: Infinity, duration: 4, repeatDelay: 3 }}
                />
                <motion.circle
                  cx="64"
                  cy="25"
                  r="4"
                  fill="#000"
                  animate={{ scaleY: [1, 0.1, 1] }}
                  transition={{ repeat: Infinity, duration: 4, repeatDelay: 3 }}
                />
              </svg>
            </span>
          </motion.h1>
        </div>

        <div className="mt-14 flex flex-col gap-10 sm:flex-row sm:items-end sm:justify-between">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="relative">
              {/* Swoosh above rotating role */}
              <svg
                className="absolute -top-7 left-0 w-44 h-8 text-neutral-600/80 pointer-events-none"
                viewBox="0 0 150 30"
                fill="none"
              >
                <motion.path
                  d="M 10 22 C 50 8, 100 8, 140 16"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 1.8, duration: 0.8, ease: 'easeOut' }}
                />
              </svg>
              <div className="h-12 overflow-hidden flex items-center">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={currentTitleIndex}
                    initial={{ y: 15, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -15, opacity: 0 }}
                    transition={{ duration: 0.35, ease: 'easeInOut' }}
                    className="font-script text-4xl text-white"
                  >
                    {TITLES[currentTitleIndex]}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>
            <p className="mt-5 max-w-xl font-mono text-xs leading-relaxed text-neutral-400 sm:text-sm">
              PRV. RESEARCH INTERN @{' '}
              <span className="text-[#e8b923]">ISRO</span>,{' '}
              <span className="text-[#d9482b]">DIGIPPLE TECH</span>,{' '}
              <span className="text-[#2b5fd9]">DIGIWAGON</span> · M.S. DATA
              SCIENCE @ STONY BROOK
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-6 flex flex-wrap gap-3"
            >
              <motion.span
                whileHover={{ scale: 1.05, rotate: 0 }}
                className="rotate-[-2deg] rounded-md bg-[#e8772b] px-4 py-2 text-sm font-bold uppercase text-black"
              >
                ML / AI ↗ Insights
              </motion.span>
              <motion.span
                whileHover={{ scale: 1.05, rotate: 0 }}
                className="rotate-[1deg] rounded-md bg-[#e8772b] px-4 py-2 text-sm font-bold uppercase text-black"
              >
                Deep Learning
              </motion.span>
            </motion.div>
          </motion.div>

          {/* polaroid container */}
          <div className="relative self-start sm:self-auto">
            {/* greeting above the polaroid */}
            <motion.p
              initial={{ opacity: 0, y: 10, rotate: -5 }}
              animate={{ opacity: 1, y: 0, rotate: -2 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="absolute -top-10 sm:-top-16 left-2 font-script text-2xl sm:text-3xl text-neutral-300 whitespace-nowrap"
            >
              Hi, I&apos;m{' '}
              <span className="relative inline-block px-2">
                Devshree
                <svg
                  className="absolute -left-2 -top-1 w-[calc(100%+16px)] h-[calc(100%+8px)] pointer-events-none"
                  viewBox="0 0 100 40"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <motion.path
                    d="M 5, 20 C 5, 5 95, 5 95, 20 C 95, 35 5, 35 5, 20 C 5, 12 50, 6 95, 8"
                    stroke="#e8b923"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 1.4, duration: 1.2, ease: 'easeInOut' }}
                  />
                </svg>
              </span>
            </motion.p>

            {/* Hand-drawn arrow pointing to the photo, which grows/draws itself */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: [0, 1.2, 1] }}
              transition={{ delay: 1.6, duration: 0.8, ease: 'easeOut' }}
              className="absolute -left-6 sm:-left-16 -top-6 sm:-top-12 z-20 flex flex-col items-center text-[#e8b923] drop-shadow-[0_2px_8px_rgba(232,185,35,0.4)] scale-75 sm:scale-100 origin-bottom-right"
            >
              <svg
                width="64"
                height="64"
                viewBox="0 0 64 64"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="rotate-[40deg]"
              >
                {/* Arrow body curve pointing from top-left to bottom-right */}
                <motion.path
                  d="M 15 15 C 25 18, 38 22, 50 35"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 2.2, duration: 0.8, ease: 'easeOut' }}
                />
                {/* Arrowhead pointing bottom-right */}
                <motion.path
                  d="M 38 34 L 50 35 L 47 22"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 2.8, duration: 0.4, ease: 'easeOut' }}
                />
              </svg>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 4 }}
              transition={{ duration: 0.8, delay: 0.5, type: 'spring' }}
              whileHover={{ scale: 1.05, rotate: 0 }}
            >
              {/* Washitape on top-right with jagged edges */}
              <div 
                className="absolute -right-4 -top-6 z-10 h-8 w-24 rotate-[25deg] bg-[#f0a8a8]/70 shadow-sm backdrop-blur-[1px]"
                style={{
                  clipPath: 'polygon(0% 15%, 5% 0%, 95% 4%, 100% 20%, 98% 85%, 92% 100%, 8% 96%, 0% 80%)'
                }}
              />
              <div className="bg-white p-3 pb-16 sm:pb-20 shadow-2xl">
                <Image
                  src="/images/portrait-lobby.png"
                  alt="Polaroid portrait of Devshree Jadeja"
                  width={384}
                  height={384}
                  className="h-64 w-64 object-cover sm:h-80 sm:w-80 md:h-96 md:w-96"
                />
                <p className="absolute bottom-4 left-1/2 -translate-x-1/2 font-script text-2xl sm:text-3xl text-neutral-700 whitespace-nowrap">
                  me, debugging :)
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Drag to play label and shapes */}
      <div className="relative mx-auto mt-12 max-w-6xl px-5 sm:px-10 sm:mt-16">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1.0 }}
          className="absolute right-10 top-[-2.5rem] flex items-center gap-2 font-script text-lg text-neutral-500/80 sm:right-24"
        >
          <span>Drag to play</span>
          <svg
            width="32"
            height="24"
            viewBox="0 0 32 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className="rotate-[140deg]"
          >
            {/* Curved arrow pointing towards shapes */}
            <path d="M 5 18 C 10 8, 20 8, 27 12" />
            <path d="M 5 18 L 12 14 M 5 18 L 10 23" />
          </svg>
        </motion.div>

        {/* geometric shapes band */}
        <div className="relative z-30 flex flex-wrap items-end justify-center gap-3">
          {SHAPES.map((s, i) => (
            <Shape key={i} kind={s} index={i} />
          ))}
        </div>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="mt-8 text-center font-script text-xl text-neutral-500"
      >
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="inline-block"
        >
          scroll to flip the page ↓
        </motion.span>
      </motion.p>
    </div>
  )
}
