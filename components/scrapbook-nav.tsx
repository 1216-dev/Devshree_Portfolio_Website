'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const PAGES = [
  { id: 'hero', label: 'Intro' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
]

export function ScrapbookNav() {
  const [active, setActive] = useState('hero')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-45% 0px -45% 0px' }
    )
    PAGES.forEach((p) => {
      const el = document.getElementById(p.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <motion.nav
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5, duration: 0.6 }}
      aria-label="Page navigation"
      className="fixed right-3 top-1/2 z-50 -translate-y-1/2 sm:right-5"
    >
      <ul className="flex flex-col items-end gap-2.5">
        {PAGES.map((p, i) => {
          const isActive = active === p.id
          return (
            <motion.li
              key={p.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + i * 0.1 }}
            >
              <a
                href={`#${p.id}`}
                className="group flex items-center justify-end gap-2"
              >
                <span
                  className={`rounded-full px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest backdrop-blur transition-all duration-300 ${
                    isActive
                      ? 'bg-foreground text-background opacity-100'
                      : 'bg-foreground/5 text-foreground/0 opacity-0 group-hover:text-foreground/70 group-hover:opacity-100'
                  }`}
                >
                  {String(i + 1).padStart(2, '0')} {p.label}
                </span>
                <motion.span
                  animate={{
                    scale: isActive ? 1.25 : 1,
                    backgroundColor: isActive ? 'var(--foreground)' : 'transparent',
                  }}
                  className="h-2.5 w-2.5 rounded-full border-2 border-foreground/40 mix-blend-difference transition-colors duration-300"
                />
              </a>
            </motion.li>
          )
        })}
      </ul>
    </motion.nav>
  )
}
