'use client'

import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    width="14"
    height="14"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
)

const ExternalLinkIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    width="12"
    height="12"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
)

interface Project {
  no: string
  title: string
  tags: string[]
  description: string
  githubUrl: string
  cursorTip: string
  mockup: React.ReactNode
}

export function ProjectsPage() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const y1 = useTransform(scrollYProgress, [0, 1], [80, -80])
  const y2 = useTransform(scrollYProgress, [0, 1], [40, -40])
  const rotate1 = useTransform(scrollYProgress, [0, 1], [-3, 3])
  const rotate2 = useTransform(scrollYProgress, [0, 1], [3, -3])

  const projects: Project[] = [
    {
      no: 'NO. 01',
      title: 'HackRare',
      tags: ['HACKATHON', 'SHIPPED'],
      description: 'An AI-powered diagnostic helper platform built at Hack Rare to identify and analyze rare diseases from genetic variants and patient symptom profiles.',
      githubUrl: 'https://github.com/1216-dev/HackRare',
      cursorTip: 'yes click it! 🚀',
      mockup: (
        <div className="w-full h-full bg-[#1e1e24] text-neutral-200 p-4 font-mono text-[10px] flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-neutral-700 pb-2">
            <div className="flex gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500 inline-block" />
            </div>
            <span className="text-[9px] text-neutral-500">rare-disease-classifier.ai</span>
          </div>
          <div className="my-2 space-y-1.5 flex-1 flex flex-col justify-center">
            <div className="bg-neutral-800 p-2 rounded border border-neutral-700">
              <p className="text-yellow-400 font-bold">Patient ID: #4492-X</p>
              <p className="text-[8px] text-neutral-400 mt-0.5">Phenotype: Growth restriction, microcephaly</p>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-[8px]">
                <span>MOPD Type II</span>
                <span className="text-green-400 font-bold">94% Confidence</span>
              </div>
              <div className="w-full bg-neutral-800 h-1.5 rounded overflow-hidden">
                <div className="bg-green-500 h-full rounded" style={{ width: '94%' }} />
              </div>
            </div>
          </div>
          <div className="border-t border-neutral-700 pt-2 flex justify-between text-[8px] text-neutral-400">
            <span>Model: BioBERT + ClinVar</span>
            <span className="text-green-400">Analysis complete</span>
          </div>
        </div>
      )
    },
    {
      no: 'NO. 02',
      title: 'HCI AURA & VR Concert',
      tags: ['ACADEMIC', 'RESEARCH'],
      description: 'Two interactive Human-Computer Interaction (HCI) projects studying the intersection of computer vision, VR concert stages, and gesture-controlled audio-visual experiences.',
      githubUrl: 'https://github.com/1216-dev/HCI_116651954_Code',
      cursorTip: 'yes click it! 🎨',
      mockup: (
        <div className="w-full h-full bg-[#12161a] text-white p-4 flex flex-col justify-between font-mono">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-2 text-[9px] text-neutral-400">
            <span>VR_Stage_AURA.cpp</span>
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          </div>
          <div className="flex-1 flex flex-col items-center justify-center relative my-2">
            {/* Gesture visualizer simulation */}
            <div className="w-24 h-24 rounded-full border border-neutral-800 flex items-center justify-center relative">
              <div className="absolute inset-2 rounded-full border border-dashed border-blue-500/50 animate-spin" style={{ animationDuration: '8s' }} />
              <div className="absolute inset-4 rounded-full border border-blue-400 flex items-center justify-center">
                <span className="text-[8px] text-blue-300">AV Sync</span>
              </div>
            </div>
            <div className="absolute bottom-0 w-full flex gap-1 justify-center items-end h-6">
              <span className="w-1 bg-blue-500 h-4 rounded-t" />
              <span className="w-1 bg-blue-400 h-6 rounded-t" />
              <span className="w-1 bg-blue-300 h-3 rounded-t" />
              <span className="w-1 bg-blue-400 h-5 rounded-t" />
              <span className="w-1 bg-blue-500 h-2 rounded-t" />
            </div>
          </div>
          <div className="flex justify-between items-center text-[8px] text-neutral-400 border-t border-neutral-800 pt-2">
            <span>Frames: 90 FPS</span>
            <span>HCI gesture input active</span>
          </div>
        </div>
      )
    },
    {
      no: 'NO. 03',
      title: 'TraveloPedia (TravelAI)',
      tags: ['SIDE PROJECT', 'COMPLETED'],
      description: 'An intelligent itinerary planning website powered by generative AI to customize travels, generate route maps, budget costs, and recommend hidden gems.',
      githubUrl: 'http://github.com/1216-dev/TraveloPedia_AMS560',
      cursorTip: 'yes click it! ✈️',
      mockup: (
        <div className="w-full h-full bg-[#fcfbfa] text-neutral-800 p-4 flex flex-col justify-between font-sans">
          <div className="flex items-center justify-between border-b border-neutral-200 pb-2 text-[9px] text-neutral-500 font-mono">
            <span>travelopedia-planner.net</span>
            <span className="text-orange-500">Route Map</span>
          </div>
          <div className="flex-1 my-2 flex flex-col justify-center text-[9px] space-y-1.5">
            <div className="bg-orange-50/50 border border-orange-200 p-2 rounded">
              <p className="font-bold text-orange-800">Trip: SF to Yosemite</p>
              <p className="text-[8px] text-neutral-500 mt-0.5">3 Days itinerary planned with TravelAI</p>
            </div>
            {/* simple map graphics */}
            <div className="h-12 border border-neutral-100 rounded bg-neutral-50 relative overflow-hidden flex items-center justify-center">
              <svg width="100%" height="100%" className="absolute inset-0">
                <path d="M 15 25 Q 60 5 110 35 T 210 15" fill="none" stroke="#f97316" strokeWidth="2" strokeDasharray="3 3" />
                <circle cx="15" cy="25" r="3" fill="#f97316" />
                <circle cx="210" cy="15" r="3" fill="#ef4444" />
              </svg>
              <span className="absolute left-2 top-7 text-[7px] text-neutral-500 font-mono">SF</span>
              <span className="absolute right-4 top-1 text-[7px] text-neutral-500 font-mono">Yosemite</span>
            </div>
          </div>
          <div className="flex justify-between items-center text-[8px] text-neutral-500 border-t border-neutral-100 pt-2 font-mono">
            <span>Est: $650 budget</span>
            <span className="text-orange-600 font-bold">Ready</span>
          </div>
        </div>
      )
    }
  ]

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
        <p className="text-center font-mono text-xs uppercase tracking-[0.3em] text-[#9a8a66] mb-4">
          things I built & analysed
        </p>

        {/* Big title for projects section */}
        <h2 className="text-center font-serif text-5xl font-bold tracking-tight text-[#2b2620] text-balance sm:text-7xl mb-2">
          Featured Projects
        </h2>
        <p className="text-center font-script text-2xl text-[#9a8a66] mb-16">
          explore some of my source repositories
        </p>

        {/* Megan Yap style projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {projects.map((project, idx) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.6 }}
              whileHover={{ scale: 1.02, rotate: idx % 2 === 0 ? 0.5 : -0.5 }}
              className="bg-white p-5 rounded-2xl shadow-xl border border-[#d6c9b3]/40 flex flex-col justify-between relative group"
            >
              {/* Binder / ring hole detailing at top left */}
              <div className="absolute top-4 left-4 w-3.5 h-3.5 rounded-full bg-[#e7ddca] border border-black/10 shadow-inner flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-[#FAF8F5]" />
              </div>

              {/* Card Label / Project index at top right */}
              <div className="text-right text-[10px] font-mono tracking-widest text-[#9a8a66] font-bold mb-4 pr-1">
                {project.no}
              </div>

              {/* Simulated Device/Mockup screen preview */}
              <div className="aspect-[4/3] rounded-xl overflow-hidden border border-neutral-200/80 shadow-md bg-neutral-50 mb-5 relative">
                {project.mockup}
              </div>

              {/* Project title and badges */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap gap-1.5 mb-2.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded bg-[#efe7d4] text-[#7c6f55] px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider font-bold"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="font-serif text-2xl font-bold text-[#2b2620] mb-2 leading-tight">
                    {project.title}
                  </h3>

                  <p className="text-xs text-neutral-600 leading-relaxed font-sans mb-6">
                    {project.description}
                  </p>
                </div>

                {/* Github link button */}
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor-tip={project.cursorTip}
                  className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-wider text-[#e8772b] hover:text-[#c45c1a] transition-colors border-t border-dashed border-neutral-200 pt-4"
                >
                  <GithubIcon />
                  <span>VIEW REPOSITORY</span>
                  <ExternalLinkIcon className="opacity-60" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Section divider label */}
        <div className="border-t border-dashed border-[#d6c9b3]/80 pt-16 mt-16 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#9a8a66]">
            gallery & statistics
          </p>
        </div>

        {/* floating mockups (hackrare thing) */}
        <div className="relative mt-12 flex flex-wrap items-start justify-center gap-6 sm:gap-10">
          {/* Hack Rare Photo */}
          <motion.figure
            style={{ y: y1, rotate: rotate1 }}
            whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
            data-cursor-tip="hackathon build! 🚀"
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
                Hack Rare: Hackathon Project
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
          a few things I&apos;m proud of
        </motion.p>
      </motion.div>
    </div>
  )
}
