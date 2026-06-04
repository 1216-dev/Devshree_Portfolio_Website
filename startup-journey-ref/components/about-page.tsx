import Image from 'next/image'

const TODOS = [
  'Ship FinSense real-time engine',
  'Submit satellite-image paper',
  'Polish portfolio case studies',
  'Prep for ML system interviews',
]

const FOLDERS = [
  'Machine\nLearning',
  'NLP &\nLLMs',
  'Computer\nVision',
  'GenAI',
  'Data Viz',
]

export function AboutPage() {
  return (
    <div className="bg-dots-dark relative min-h-screen overflow-hidden bg-[#f4eee2] px-5 py-12 text-[#2b2620] sm:px-10">
      {/* top nav strip */}
      <div className="mx-auto flex max-w-6xl items-center justify-between rounded-xl bg-white/60 px-5 py-3 shadow-sm backdrop-blur">
        <span className="font-display text-2xl tracking-wide text-[#2b2620]">
          DJ
        </span>
        <div className="hidden gap-6 font-script text-xl text-[#2b2620] sm:flex">
          <span>Work</span>
          <span>Resume</span>
          <span>About</span>
          <span>Contact</span>
        </div>
      </div>

      <div className="mx-auto mt-8 grid max-w-6xl grid-cols-1 items-start gap-8 md:grid-cols-3">
        {/* LEFT column */}
        <div className="flex flex-col gap-8">
          {/* to do list */}
          <div>
            <p className="mb-2 font-script text-2xl">My current to-do list</p>
            <div className="rotate-[-1.5deg] rounded-md border-l-8 border-[#e8772b] bg-[#fffdf7] p-5 shadow-md">
              <ul className="flex flex-col gap-3">
                {TODOS.map((t) => (
                  <li key={t} className="flex items-start gap-2 font-script text-xl leading-tight">
                    <span className="text-[#e8772b]">☑</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* finder window */}
          <div>
            <p className="mb-2 font-script text-2xl">What do I work on?</p>
            <div className="rotate-[1deg] rounded-lg border border-black/10 bg-white shadow-md">
              <div className="flex items-center gap-1.5 border-b border-black/10 px-3 py-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#d9482b]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#e8b923]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#3f6b2e]" />
                <span className="ml-2 font-mono text-[11px] text-neutral-500">
                  devshree&apos;s work
                </span>
              </div>
              <div className="grid grid-cols-3 gap-3 p-4">
                {FOLDERS.map((f) => (
                  <div key={f} className="flex flex-col items-center gap-1 text-center">
                    <svg viewBox="0 0 48 40" className="h-9 w-11" aria-hidden="true">
                      <path
                        d="M2 8a4 4 0 014-4h12l4 5h18a4 4 0 014 4v21a4 4 0 01-4 4H6a4 4 0 01-4-4V8z"
                        fill="#3b9ed9"
                      />
                    </svg>
                    <span className="whitespace-pre-line font-mono text-[10px] leading-tight text-neutral-600">
                      {f}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CENTER badge */}
        <div className="flex flex-col items-center">
          <div className="h-10 w-7 rounded-t-sm bg-neutral-400" />
          <div className="w-[260px] rotate-[-1deg] rounded-3xl bg-[#9a948a] p-3 shadow-2xl">
            <div className="mx-auto mb-3 h-2 w-12 rounded-full bg-black/30" />
            <div className="overflow-hidden rounded-2xl">
              <Image
                src="/images/avatar-3d.png"
                alt="3D stylized avatar of Devshree Jadeja"
                width={320}
                height={360}
                className="h-72 w-full object-cover"
              />
            </div>
            <div className="mt-3 rounded-2xl bg-[#fffdf7] py-5 text-center">
              <p className="font-script text-5xl text-[#e8772b]">Devshree</p>
              <p className="mt-1 font-mono text-xs tracking-[0.2em] text-neutral-600">
                DATA SCIENTIST
              </p>
            </div>
          </div>
          <a
            href="#contact"
            className="mt-6 rounded-md border-2 border-[#e8772b] px-6 py-2.5 font-mono text-xs tracking-widest text-[#e8772b] transition-colors hover:bg-[#e8772b] hover:text-white"
          >
            DOWNLOAD RESUME ↓
          </a>
        </div>

        {/* RIGHT column */}
        <div className="flex flex-col gap-8">
          {/* stamp */}
          <div>
            <p className="mb-2 font-script text-2xl">Where am I from?</p>
            <div className="rotate-[2deg] border-[6px] border-dashed border-[#3f6b2e] bg-[#eef3e8] p-5 shadow-md">
              <div className="flex items-center justify-between font-mono text-[11px] text-neutral-600">
                <span>Jun 3</span>
                <span>11:54:26</span>
              </div>
              <div className="my-4 flex justify-center">
                <svg viewBox="0 0 48 48" className="h-12 w-12" aria-hidden="true">
                  <circle
                    cx="24"
                    cy="24"
                    r="20"
                    fill="none"
                    stroke="#3f6b2e"
                    strokeWidth="2"
                    strokeDasharray="4 3"
                  />
                  <path
                    d="M24 10l3.5 9.5L37 21l-7 6 2 10-8-5.5L16 37l2-10-7-6 9.5-1.5z"
                    fill="#3f6b2e"
                  />
                </svg>
              </div>
              <p className="font-mono text-[11px] text-neutral-500">based in</p>
              <p className="font-display text-2xl tracking-wide text-[#3f6b2e]">
                STONY BROOK, NY
              </p>
              <p className="mt-1 font-script text-lg text-neutral-600">
                from Gujarat, India
              </p>
            </div>
          </div>

          {/* since when */}
          <div>
            <p className="mb-2 font-script text-2xl">Since when?</p>
            <div className="relative rotate-[-1deg] rounded-md bg-[#fffdf7] p-5 shadow-md">
              <span className="absolute -top-3 right-6 h-6 w-3 rounded-full border-2 border-neutral-400" />
              <p className="font-script text-3xl text-[#e8772b]">1+ Years</p>
              <p className="mt-2 text-sm leading-relaxed text-neutral-700">
                Hands-on ML & data science across research, fintech, and
                satellite imaging — building scalable, accurate, impactful data
                products.
              </p>
            </div>
          </div>

          {/* education */}
          <div className="rotate-[1deg] rounded-md bg-[#fffdf7] p-5 font-mono text-[11px] leading-relaxed text-neutral-700 shadow-md">
            <p className="font-bold">M.S. Computer Science (Data Science)</p>
            <p>Stony Brook University · GPA 4.0/4.0</p>
            <div className="my-2 border-t border-dashed border-neutral-300" />
            <p className="font-bold">B.Tech Computer Science</p>
            <p>PDEU · GPA 9.91/10</p>
          </div>
        </div>
      </div>
    </div>
  )
}
