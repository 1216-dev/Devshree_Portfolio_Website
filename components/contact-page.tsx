'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

const RANSOM_COLORS = [
  { bg: '#f2d64b', fg: '#1a23d6' },
  { bg: '#e8772b', fg: '#ffffff' },
  { bg: '#ffffff', fg: '#d9482b' },
  { bg: '#d9482b', fg: '#ffffff' },
  { bg: '#1a1a1a', fg: '#f2d64b' },
]
const RANSOM_FONTS = ['font-display', 'font-serif', 'font-mono', 'font-sans']

function RansomWord({ word, start = 0 }: { word: string; start?: number }) {
  return (
    <span className="inline-flex flex-wrap">
      {word.split('').map((ch, i) => {
        const c = RANSOM_COLORS[(i + start) % RANSOM_COLORS.length]
        const f = RANSOM_FONTS[(i + start) % RANSOM_FONTS.length]
        const rot = ((i + start) % 5) - 2
        return (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 20, rotate: rot * 3 }}
            whileInView={{ opacity: 1, y: 0, rotate: rot }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ scale: 1.2, rotate: 0 }}
            className={`${f} mx-0.5 my-0.5 inline-block px-2 text-4xl font-bold uppercase leading-none sm:text-6xl`}
            style={{
              backgroundColor: c.bg,
              color: c.fg,
            }}
          >
            {ch}
          </motion.span>
        )
      })}
    </span>
  )
}

const CONTACTS = [
  { label: 'Email', value: 'devshreehjadeja@gmail.com', href: 'mailto:devshreehjadeja@gmail.com' },
  { label: 'Phone', value: '+1 934-221-7600', href: 'tel:+19342217600' },
  { label: 'Location', value: 'San Francisco, CA', href: undefined },
]

export function ContactPage() {
  return (
    <div className="min-h-screen bg-[#1a23d6] px-5 py-16 text-white sm:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
          {/* left: bio */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-2 md:order-1"
          >
            <p className="font-serif text-lg italic leading-relaxed text-white/90 sm:text-xl">
              A data scientist who&apos;s allergic to dashboards no one reads.
              I&apos;ve been turning numbers into stories since family
              spreadsheets — from a B.Tech in CS to a Master&apos;s in Data
              Science, with detours through ISRO&apos;s satellites and fintech
              recommendation engines.
            </p>
            <p className="mt-6 text-base leading-relaxed text-white/80">
              I am currently based in San Francisco, actively attending tech events, and open to full-time opportunities.
              Whether it&apos;s an ML model, a research problem, or a product that needs real insight — let&apos;s build it, fast and accurate.
            </p>
          </motion.div>

          {/* right: cutout photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, type: 'spring' }}
            className="order-1 flex justify-center md:order-2"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative"
            >
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute inset-0 -m-2 rounded-[40%_60%_55%_45%] bg-[#ff2d8b] blur-md"
              />
              <Image
                src="/images/portrait-lobby.png"
                alt="Portrait of Devshree Jadeja"
                width={520}
                height={600}
                className="relative h-[520px] w-auto object-contain drop-shadow-2xl"
              />
            </motion.div>
          </motion.div>
        </div>

        {/* ransom heading */}
        <div className="mt-8 flex flex-col items-center">
          <RansomWord word="LET'S" start={0} />
          <div className="mt-1">
            <RansomWord word="CONNECT" start={2} />
          </div>
        </div>

        {/* contact cards */}
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {CONTACTS.map((c, i) => {
            const inner = (
              <>
                <p className="font-mono text-[11px] uppercase tracking-widest text-[#1a23d6]/60">
                  {c.label}
                </p>
                <p className="mt-1 break-words font-bold text-[#1a23d6]">
                  {c.value}
                </p>
              </>
            )
            return c.href ? (
              <motion.a
                key={c.label}
                href={c.href}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ rotate: 0, scale: 1.05 }}
                className="rotate-[-1deg] rounded-lg bg-white p-5"
              >
                {inner}
              </motion.a>
            ) : (
              <motion.div
                key={c.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ rotate: 0, scale: 1.05 }}
                className="rotate-[1deg] rounded-lg bg-white p-5"
              >
                {inner}
              </motion.div>
            )
          })}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center font-mono text-[11px] uppercase tracking-[0.3em] text-white/50"
        >
          © 2026 Devshree Jadeja · crafting data solutions for a smarter future
        </motion.p>
      </div>
    </div>
  )
}
