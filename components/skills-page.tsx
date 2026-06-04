'use client'

import { motion } from 'framer-motion'

const GROUPS = [
  {
    title: 'PROGRAMMING\n& ANALYTICS',
    items: ['Python', 'R', 'SQL', 'Java', 'Scala', 'Git', 'MATLAB', 'Julia'],
    bg: '#ece4cf',
    fg: '#1a1a1a',
    accent: '#d9482b',
  },
  {
    title: 'ML & AI',
    items: [
      'TensorFlow',
      'PyTorch',
      'Scikit-Learn',
      'Deep Learning',
      'NLP',
      'Computer Vision',
      'GenAI',
      'LLM',
    ],
    bg: '#111111',
    fg: '#ece4cf',
    accent: '#d6a64a',
  },
  {
    title: 'DATA VIZ',
    items: ['Tableau', 'Power BI', 'Matplotlib', 'Seaborn', 'D3.js', 'Plotly'],
    bg: '#d6a64a',
    fg: '#1a1a1a',
    accent: '#7b3fa0',
  },
  {
    title: 'CLOUD &\nBIG DATA',
    items: ['AWS', 'GCP', 'Azure', 'Spark', 'Hadoop', 'Docker', 'Kubernetes'],
    bg: '#7b3fa0',
    fg: '#ece4cf',
    accent: '#e8772b',
  },
]

export function SkillsPage() {
  return (
    <div className="min-h-screen bg-[#43472a] px-4 py-12 sm:px-8">
      <div className="mx-auto max-w-6xl">
        {/* poster header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-4 flex flex-col items-center justify-between gap-2 sm:flex-row"
        >
          <motion.h2
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 100 }}
            className="font-display text-6xl leading-none tracking-tight text-[#ece4cf] sm:text-8xl"
          >
            SKILLS
          </motion.h2>
          <p className="max-w-xs text-right font-mono text-xs uppercase tracking-widest text-[#ece4cf]/70">
            the toolkit I reach for when the data gets messy.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {GROUPS.map((g, groupIndex) => (
            <motion.div
              key={g.title}
              initial={{ opacity: 0, y: 50, rotate: groupIndex % 2 === 0 ? -5 : 5 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ delay: groupIndex * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.02, zIndex: 10 }}
              className="flex min-h-[260px] flex-col justify-between p-6"
              style={{ backgroundColor: g.bg, color: g.fg }}
            >
              <motion.h3
                initial={{ x: -20 }}
                whileInView={{ x: 0 }}
                viewport={{ once: true }}
                className="whitespace-pre-line font-display text-4xl leading-[0.9] tracking-tight sm:text-5xl"
                style={{ color: g.fg }}
              >
                {g.title}
              </motion.h3>
              <ul className="mt-6 flex flex-wrap gap-2">
                {g.items.map((item, i) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 + groupIndex * 0.1 }}
                    whileHover={{ 
                      scale: 1.1, 
                      backgroundColor: g.accent,
                      color: g.bg,
                    }}
                    className="border-2 px-3 py-1 font-mono text-xs font-bold uppercase tracking-wide transition-colors"
                    style={{ borderColor: g.accent, color: g.fg }}
                  >
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* footer slogan strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-3 flex flex-wrap items-center justify-center gap-4 bg-[#ece4cf] px-6 py-4 text-center"
        >
          <motion.span
            animate={{ 
              scale: [1, 1.02, 1],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="font-display text-2xl tracking-tight text-[#1a1a1a] sm:text-4xl"
          >
            DATA IN ↗ DECISIONS OUT
          </motion.span>
        </motion.div>
      </div>
    </div>
  )
}
