'use client'

import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export function ProjectsPage() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100])
  const y2 = useTransform(scrollYProgress, [0, 1], [50, -50])
  const rotate1 = useTransform(scrollYProgress, [0, 1], [-5, 5])
  const rotate2 = useTransform(scrollYProgress, [0, 1], [5, -5])

  return (
    <div
      ref={ref}
      className="bg-grid-paper relative min-h-screen overflow-hidden bg-[#e7ddca] px-5 py-16 text-[#2b2620] sm:px-10"
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mx-auto max-w-6xl"
      >
        <p className="text-center font-mono text-xs uppercase tracking-[0.3em] text-[#9a8a66]">
          things I built & analysed
        </p>

        {/* floating mockups */}
        <div className="relative mt-12 flex flex-wrap items-start justify-center gap-6 sm:gap-10">
          {/* Hack Rare Photo */}
          <motion.figure
            style={{ y: y1, rotate: rotate1 }}
            whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
            data-cursor-tip="hackathon champion! 🏆"
            className="w-full max-w-2xl rounded-2xl bg-white p-4 shadow-2xl sm:w-[580px]"
          >
            <Image
              src="/images/hack-rare.png"
              alt="Hackathon team photo at Hack Rare"
              width={700}
              height={460}
              className="rounded-lg object-cover w-full"
            />
            <figcaption className="px-2 py-3">
              <p className="font-serif text-xl font-bold">
                Hack Rare: Hackathon Winner
              </p>
              <p className="mt-1 text-sm text-neutral-600">
                Built innovative solutions with an amazing team at a major hackathon event.
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5 font-mono text-[10px] uppercase tracking-wider text-[#9a8a66]">
                <span className="rounded bg-[#efe7d4] px-2 py-0.5">Team Lead</span>
                <span className="rounded bg-[#efe7d4] px-2 py-0.5">Innovation</span>
                <span className="rounded bg-[#efe7d4] px-2 py-0.5">ML</span>
              </div>
            </figcaption>
          </motion.figure>

          {/* Workshop Photo */}
          <motion.figure
            style={{ y: y2, rotate: rotate2 }}
            whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
            data-cursor-tip="teaching ML models! 🧠"
            className="w-full max-w-md rounded-2xl bg-white p-4 shadow-2xl sm:mt-16 sm:w-[420px]"
          >
            <Image
              src="/images/workshop.png"
              alt="Workshop session with team"
              width={500}
              height={620}
              className="rounded-lg object-cover w-full"
            />
            <figcaption className="px-2 py-3">
              <p className="font-serif text-xl font-bold">ML Workshop</p>
              <p className="mt-1 text-sm text-neutral-600">
                Leading hands-on workshops teaching machine learning and data science fundamentals.
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5 font-mono text-[10px] uppercase tracking-wider text-[#9a8a66]">
                <span className="rounded bg-[#efe7d4] px-2 py-0.5">Teaching</span>
                <span className="rounded bg-[#efe7d4] px-2 py-0.5">ML</span>
              </div>
            </figcaption>
          </motion.figure>

          {/* stat note */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="w-full max-w-[220px] rotate-[-1deg] self-center rounded-xl bg-[#3f6b2e] p-5 text-[#eef3e8] shadow-xl sm:mt-24"
          >
            <motion.p
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="font-serif text-4xl font-bold"
            >
              92%
            </motion.p>
            <p className="mt-1 text-sm leading-relaxed">
              accuracy on ISRO satellite image classification with an RNN +
              attention model.
            </p>
          </motion.div>
        </div>

        {/* big serif title */}
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-16 text-center font-serif text-5xl font-bold tracking-tight text-[#2b2620] text-balance sm:text-7xl"
        >
          My Project Journey
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-3 text-center font-script text-2xl text-[#9a8a66]"
        >
          a few things I&apos;m proud of —
        </motion.p>
      </motion.div>
    </div>
  )
}
