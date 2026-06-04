import Image from 'next/image'

const SHAPES = [
  'circle red',
  'square blue',
  'triangle yellow',
  'circle green',
  'square red',
  'triangle blue',
  'circle yellow',
  'square green',
  'triangle red',
  'circle blue',
  'square yellow',
  'triangle green',
  'circle red',
  'square blue',
  'triangle yellow',
  'circle green',
]

const COLORS: Record<string, string> = {
  red: '#d9482b',
  blue: '#2b5fd9',
  yellow: '#e8b923',
  green: '#3f6b2e',
}

function Shape({ kind }: { kind: string }) {
  const [type, color] = kind.split(' ')
  const c = COLORS[color]
  if (type === 'circle')
    return (
      <span
        className="inline-block h-8 w-8 rounded-full sm:h-10 sm:w-10"
        style={{ backgroundColor: c }}
      />
    )
  if (type === 'square')
    return (
      <span
        className="inline-block h-8 w-8 rotate-6 sm:h-10 sm:w-10"
        style={{ backgroundColor: c }}
      />
    )
  return (
    <span
      className="inline-block h-0 w-0 sm:scale-125"
      style={{
        borderLeft: '18px solid transparent',
        borderRight: '18px solid transparent',
        borderBottom: `32px solid ${c}`,
      }}
    />
  )
}

export function HeroPage() {
  return (
    <div className="bg-dots-light relative min-h-screen overflow-hidden bg-[#0b0b0c] px-5 py-10 text-neutral-200 sm:px-10">
      {/* top bar */}
      <div className="mx-auto flex max-w-6xl items-center justify-between border-b border-white/10 pb-5">
        <span className="font-script text-3xl leading-none text-white">dj</span>
        <div className="hidden gap-7 font-script text-xl text-neutral-400 sm:flex">
          <span className="text-white">Works</span>
          <span>Research</span>
          <span>Resume</span>
          <span>Contact</span>
        </div>
      </div>

      {/* main statement */}
      <div className="mx-auto mt-14 max-w-6xl sm:mt-20">
        <div className="relative">
          <h1 className="max-w-4xl text-pretty text-4xl font-medium leading-[1.15] tracking-tight text-neutral-500 sm:text-6xl">
            crafting <span className="text-white">data solutions</span> that turn
            messy numbers into{' '}
            <span className="text-white">decisions people trust</span>
            <span className="ml-2 inline-block align-middle text-[#e8b923]">
              ◕‿◕
            </span>
          </h1>

          {/* handwritten greeting */}
          <p className="absolute right-2 top-[-3rem] hidden font-script text-3xl text-neutral-300 sm:block">
            Hi, I&apos;m Devshree
          </p>
        </div>

        <div className="mt-14 flex flex-col gap-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-script text-4xl text-white">Data Scientist</p>
            <p className="mt-5 max-w-xl font-mono text-xs leading-relaxed text-neutral-400 sm:text-sm">
              PRV. RESEARCH INTERN @{' '}
              <span className="text-[#e8b923]">ISRO</span>,{' '}
              <span className="text-[#d9482b]">DIGIPPLE TECH</span>,{' '}
              <span className="text-[#2b5fd9]">DIGIWAGON</span> · M.S. DATA
              SCIENCE @ STONY BROOK
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <span className="rotate-[-2deg] rounded-md bg-[#e8772b] px-4 py-2 text-sm font-bold uppercase text-black">
                ML / AI ↗ Insights
              </span>
              <span className="rotate-[1deg] rounded-md bg-[#e8772b] px-4 py-2 text-sm font-bold uppercase text-black">
                Deep Learning
              </span>
            </div>
          </div>

          {/* polaroid */}
          <div className="relative self-start sm:self-auto">
            <div className="absolute -left-3 -top-4 z-10 h-8 w-24 rotate-[-8deg] rounded-sm bg-[#f0a8a8]/80 shadow-sm" />
            <div className="rotate-[4deg] bg-white p-3 pb-12 shadow-2xl">
              <Image
                src="/images/polaroid-portrait.png"
                alt="Polaroid portrait of Devshree Jadeja"
                width={240}
                height={240}
                className="h-52 w-52 object-cover sm:h-60 sm:w-60"
              />
              <p className="absolute bottom-3 left-1/2 -translate-x-1/2 font-script text-2xl text-neutral-700">
                me, debugging :)
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* geometric shapes band */}
      <div className="pointer-events-none mt-12 flex flex-wrap items-end justify-center gap-3 sm:mt-16">
        {SHAPES.map((s, i) => (
          <Shape key={i} kind={s} />
        ))}
      </div>

      <p className="mt-8 text-center font-script text-xl text-neutral-500">
        scroll to flip the page ↓
      </p>
    </div>
  )
}
