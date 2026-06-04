import { HeroPage } from '@/components/hero-page'
import { AboutPage } from '@/components/about-page'
import { ExperiencePage } from '@/components/experience-page'
import { ProjectsPage } from '@/components/projects-page'
import { SkillsPage } from '@/components/skills-page'
import { ContactPage } from '@/components/contact-page'
import { ScrapbookNav } from '@/components/scrapbook-nav'
import { ScrollShapes } from '@/components/scroll-shapes'

export default function Page() {
  return (
    <main className="relative">
      <ScrollShapes />
      <ScrapbookNav />
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
      <section id="contact">
        <ContactPage />
      </section>
    </main>
  )
}
