const EXPERIENCES = [
  {
    org: 'ISRO',
    full: 'Indian Space Research Organisation',
    role: 'Research Intern',
    date: 'Jan 2024 — Jun 2024',
    points: [
      'Developed an RNN with attention mechanisms reaching 92% accuracy in satellite image classification.',
      'Built a GAN-based model for high-resolution satellite image synthesis.',
      'Optimized model performance with a 30% improvement in prediction speed.',
    ],
  },
  {
    org: 'Digipple Technologies',
    full: 'Digipple Technologies',
    role: 'Data Science Intern',
    date: 'Jun 2024 — Aug 2024',
    points: [
      'Improved dataset quality by 40% through automated annotation of 20,000+ research papers.',
      'Achieved 90% accuracy using SciBERT and BERT models for prediction tasks.',
      'Enhanced business insights by 30% through advanced feature extraction.',
    ],
  },
  {
    org: 'DigiWagon Technologies',
    full: 'DigiWagon Technologies',
    role: 'Data Science Intern',
    date: 'May 2023 — Aug 2023',
    points: [
      'Built a data extraction system improving retrieval efficiency by 40%.',
      'Developed a web portal optimizing data organization by 30%.',
      'Implemented async API calls boosting user engagement by 50%.',
    ],
  },
]

export function ExperiencePage() {
  return (
    <div className="min-h-screen bg-white px-5 py-16 font-mono text-[#111] sm:px-10">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-balance text-2xl font-bold tracking-tight sm:text-4xl">
          THE WORK SO FAR →
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-neutral-600">
          I&apos;ve built intelligent solutions for research institutions and
          companies — from automated research systems to complex AI models — with
          a focus on scalable, accurate, and impactful data products.
        </p>
      </div>

      {/* lead reflection, mixed sizes like a manuscript */}
      <div className="mx-auto mt-14 max-w-4xl">
        <p className="text-pretty text-xl leading-relaxed sm:text-2xl">
          At some point I realised the model is never the hard part. The hard
          part is the data — messy, missing, biased, human. Most of my work is
          the patient business of turning that noise into something a person can
          actually act on.
        </p>
      </div>

      <div className="mx-auto mt-16 max-w-4xl">
        {EXPERIENCES.map((exp, i) => (
          <article
            key={exp.org}
            className="grid grid-cols-1 gap-4 border-t border-dashed border-neutral-300 py-8 sm:grid-cols-[180px_1fr] sm:gap-10"
          >
            <div>
              <p className="text-[11px] text-neutral-500">{exp.date}</p>
              <p className="mt-1 text-lg font-bold leading-tight">{exp.org}</p>
              <p className="text-[11px] text-neutral-500">{exp.role}</p>
            </div>
            <div>
              <p className="mb-3 text-[11px] uppercase tracking-widest text-neutral-400">
                {String(i + 1).padStart(2, '0')} / {exp.full}
              </p>
              <ul className="flex flex-col gap-2.5">
                {exp.points.map((p) => (
                  <li key={p} className="flex gap-3 text-sm leading-relaxed">
                    <span className="text-neutral-400">→</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>

      <p className="mx-auto mt-10 max-w-4xl border-t border-dashed border-neutral-300 pt-6 text-center text-[11px] uppercase tracking-[0.3em] text-neutral-400">
        the previous chapters of this notebook · 2023 — 2026
      </p>
    </div>
  )
}
