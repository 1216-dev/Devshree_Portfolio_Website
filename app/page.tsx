'use client'

import { useState } from 'react'
import { HeroPage } from '@/components/hero-page'
import { AboutPage } from '@/components/about-page'
import { ExperiencePage } from '@/components/experience-page'
import { ProjectsPage } from '@/components/projects-page'
import { SkillsPage } from '@/components/skills-page'
import { PhotoTimeline } from '@/components/photo-timeline'
import { ContactPage } from '@/components/contact-page'
import { ScrapbookNav } from '@/components/scrapbook-nav'
import { ScrollShapes } from '@/components/scroll-shapes'
import { SeedGarden } from '@/components/seed-garden'
import { LoadingScreen } from '@/components/loading-screen'
import { CustomCursor } from '@/components/custom-cursor'

export default function Page() {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <main className="relative">
      <CustomCursor />
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      <ScrollShapes />
      <ScrapbookNav />
      <SeedGarden />
      <section id="hero">
        <HeroPage />
      </section>
      <section id="about">
        <AboutPage />
      </section>
      <section id="experience">
        <ExperiencePage />
      </section>
      <section id="projects">
        <ProjectsPage />
      </section>
      <section id="skills">
        <SkillsPage />
      </section>
      <section id="timeline">
        <PhotoTimeline />
      </section>
      <section id="contact">
        <ContactPage />
      </section>
    </main>
  )
}
