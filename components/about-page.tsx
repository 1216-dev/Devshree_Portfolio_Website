'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

const TODOS = [
  'Open to full-time opportunities',
  'Attending tech events in SF',
  'Ship FinSense real-time engine',
  'Prep for ML system interviews',
]

const FOLDERS = [
  'Machine\nLearning',
  'NLP &\nLLMs',
  'Computer\nVision',
  'GenAI',
  'Data Viz',
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export function AboutPage() {
  return (
    <div className="bg-dots-dark relative min-h-screen overflow-hidden bg-[#f4eee2] px-6 py-16 text-[#2b2620] sm:px-12 md:px-16">
      {/* top nav strip */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mx-auto flex max-w-7xl items-center justify-between rounded-2xl bg-white/60 px-6 py-4 shadow-sm backdrop-blur"
      >
        <span className="font-display text-3xl tracking-wide text-[#2b2620]">
          DJ
        </span>
        <div className="hidden gap-8 font-script text-2xl text-[#2b2620] sm:flex">
          <span className="cursor-pointer hover:text-[#e8772b] transition-colors" data-cursor-tip="see what I built! 💻">Work</span>
          <a href="/ML_Devshree_Resume_.pdf" target="_blank" rel="noopener noreferrer" className="cursor-pointer hover:text-[#e8772b] transition-colors" data-cursor-tip="yes click it! 📄">Resume</a>
          <span className="cursor-pointer hover:text-[#e8772b] transition-colors" data-cursor-tip="read my story! 📖">About</span>
          <span className="cursor-pointer hover:text-[#e8772b] transition-colors" data-cursor-tip="say hello! ✉️">Contact</span>
        </div>
      </motion.div>

      <div className="mx-auto mt-12 grid max-w-7xl grid-cols-1 items-start gap-10 md:grid-cols-[1.1fr_1.2fr_1.1fr] lg:gap-12">
        {/* LEFT column */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col gap-10"
        >
          {/* to do list */}
          <motion.div variants={itemVariants}>
            <p className="mb-3 font-script text-2xl text-neutral-700">My current to-do list</p>
            <motion.div
              whileHover={{ rotate: 0 }}
              className="rotate-[-1.5deg] rounded-xl border-l-8 border-[#e8772b] bg-[#fffdf7] p-5 shadow-sm"
            >
              <ul className="flex flex-col gap-3">
                {TODOS.map((t, i) => (
                  <motion.li
                    key={t}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-3 font-script text-xl leading-tight text-neutral-800"
                  >
                    <motion.span
                      whileHover={{ scale: 1.2 }}
                      className="text-[#e8772b]"
                    >
                      ☑
                    </motion.span>
                    <span>{t}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          {/* finder window */}
          <motion.div variants={itemVariants}>
            <p className="mb-3 font-script text-2xl text-neutral-700">What do I work on?</p>
            <motion.div
              whileHover={{ rotate: 0 }}
              className="rotate-[1deg] rounded-xl border border-black/10 bg-white shadow-sm overflow-hidden"
            >
              <div className="flex items-center gap-2 border-b border-black/10 px-4 py-2 bg-neutral-50/50">
                <motion.span
                  whileHover={{ scale: 1.5 }}
                  className="h-2.5 w-2.5 rounded-full bg-[#d9482b]"
                />
                <motion.span
                  whileHover={{ scale: 1.5 }}
                  className="h-2.5 w-2.5 rounded-full bg-[#e8b923]"
                />
                <motion.span
                  whileHover={{ scale: 1.5 }}
                  className="h-2.5 w-2.5 rounded-full bg-[#3f6b2e]"
                />
                <span className="ml-2 font-mono text-[10px] text-neutral-500">
                  devshree&apos;s work
                </span>
              </div>
              <div className="grid grid-cols-3 gap-4 p-5">
                {FOLDERS.map((f, i) => (
                  <motion.div
                    key={f}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ scale: 1.1, y: -5 }}
                    className="flex cursor-pointer flex-col items-center gap-1.5 text-center"
                  >
                    <svg viewBox="0 0 48 40" className="h-10 w-12" aria-hidden="true">
                      <path
                        d="M2 8a4 4 0 014-4h12l4 5h18a4 4 0 014 4v21a4 4 0 01-4 4H6a4 4 0 01-4-4V8z"
                        fill="#3b9ed9"
                      />
                    </svg>
                    <span className="whitespace-pre-line font-mono text-[10px] leading-tight text-neutral-600 font-medium">
                      {f}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* CENTER badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, type: 'spring' }}
          className="flex flex-col items-center"
        >
          <div className="h-12 w-8 rounded-t-md bg-neutral-400" />
          <motion.div
            whileHover={{ scale: 1.02, rotate: 0 }}
            className="w-full max-w-[300px] mx-auto rotate-[-1deg] rounded-[2rem] bg-[#9a948a] p-4 shadow-xl"
          >
            <div className="mx-auto mb-3 h-2 w-12 rounded-full bg-black/30" />
            <div className="overflow-hidden rounded-xl">
              <Image
                src="/images/technovisors.png"
                alt="Professional photo at Technovisors"
                width={400}
                height={500}
                className="h-72 sm:h-80 w-full object-cover"
              />
            </div>
            <div className="mt-3 rounded-xl bg-[#fffdf7] py-4 text-center shadow-inner">
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="font-script text-5xl text-[#e8772b] font-bold"
              >
                Devshree
              </motion.p>
              <p className="mt-1 font-mono text-[11px] tracking-[0.25em] text-neutral-600 font-bold">
                DATA SCIENTIST
              </p>
            </div>
          </motion.div>
          <motion.a
            href="/ML_Devshree_Resume_.pdf"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            data-cursor-tip="yes click it! 📄"
            className="mt-6 rounded-lg border-2 border-[#e8772b] px-6 py-2.5 font-mono text-xs tracking-widest text-[#e8772b] transition-colors hover:bg-[#e8772b] hover:text-white font-bold"
          >
            DOWNLOAD RESUME ↓
          </motion.a>
        </motion.div>

        {/* RIGHT column */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col gap-10"
        >
          {/* stamp */}
          <motion.div variants={itemVariants}>
            <p className="mb-3 font-script text-2xl text-neutral-700">Where am I from?</p>
            <motion.div
              whileHover={{ rotate: 0, scale: 1.02 }}
              data-cursor-tip="SF bay area! 🌉"
              className="rotate-[2deg] border-[6px] border-dashed border-[#3f6b2e] bg-[#eef3e8] p-5 shadow-sm"
            >
              <div className="flex items-center justify-between font-mono text-[10px] text-neutral-600 font-semibold mb-1">
                <span>Jun 3</span>
                <span>11:54:26</span>
              </div>
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="my-4 flex justify-center"
              >
                <svg viewBox="0 0 48 48" className="h-12 w-12" aria-hidden="true">
                  <circle
                    cx="24"
                    cy="24"
                    r="20"
                    fill="none"
                    stroke="#3f6b2e"
                    strokeWidth="2.5"
                    strokeDasharray="4 3"
                  />
                  <path
                    d="M24 10l3.5 9.5L37 21l-7 6 2 10-8-5.5L16 37l2-10-7-6 9.5-1.5z"
                    fill="#3f6b2e"
                  />
                </svg>
              </motion.div>
              <p className="font-mono text-[10px] text-neutral-500 uppercase tracking-wider">based in</p>
              <p className="font-display text-2xl tracking-wide text-[#3f6b2e] mt-1">
                SAN FRANCISCO, CA
              </p>
              <p className="mt-1 font-script text-xl text-neutral-600">
                from Gujarat, India
              </p>
            </motion.div>
          </motion.div>

          {/* since when */}
          <motion.div variants={itemVariants}>
            <p className="mb-3 font-script text-2xl text-neutral-700">Since when?</p>
            <motion.div
              whileHover={{ rotate: 0 }}
              data-cursor-tip="making data talk! 📊"
              className="relative rotate-[-1deg] rounded-xl bg-[#fffdf7] p-5 shadow-sm"
            >
              <span className="absolute -top-2 right-4 h-5 w-2.5 rounded-full border-2 border-neutral-400" />
              <motion.p
                initial={{ scale: 0.5 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                className="font-script text-4xl text-[#e8772b] font-bold"
              >
                1+ Years
              </motion.p>
              <p className="mt-2 text-sm leading-relaxed text-neutral-700">
                Hands-on ML & data science across research, fintech, and
                satellite imaging, building scalable, accurate, impactful data
                products.
              </p>
            </motion.div>
          </motion.div>

          {/* education */}
          <motion.div
            variants={itemVariants}
            whileHover={{ rotate: 0 }}
            className="rotate-[1deg] rounded-xl bg-[#fffdf7] p-7 font-mono text-xs leading-relaxed text-neutral-700 shadow-md flex flex-col gap-3"
          >
            <div>
              <p className="font-bold text-sm text-black">M.S. Computer Science (Data Science)</p>
              <p className="text-neutral-500 font-medium">Stony Brook University · GPA 4.0/4.0</p>
            </div>
            <div className="border-t border-dashed border-neutral-300" />
            <div>
              <p className="font-bold text-sm text-black">B.Tech Computer Science</p>
              <p className="text-neutral-500 font-medium">PDEU · GPA 9.91/10</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
