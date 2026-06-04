import Image from 'next/image'

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
          <span
            key={i}
            className={`${f} mx-0.5 my-0.5 inline-block px-2 text-4xl font-bold uppercase leading-none sm:text-6xl`}
            style={{
              backgroundColor: c.bg,
              color: c.fg,
              transform: `rotate(${rot}deg)`,
            }}
          >
            {ch}
          </span>
        )
      })}
    </span>
  )
}

const CONTACTS = [
  { label: 'Email', value: 'devshreehjadeja@gmail.com', href: 'mailto:devshreehjadeja@gmail.com' },
  { label: 'Phone', value: '+1 934-263-1865', href: 'tel:+19342631865' },
  { label: 'Location', value: 'Stony Brook, NY', href: undefined },
]

export function ContactPage() {
  return (
    <div className="min-h-screen bg-[#1a23d6] px-5 py-16 text-white sm:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
          {/* left: bio */}
          <div className="order-2 md:order-1">
            <p className="font-serif text-lg italic leading-relaxed text-white/90 sm:text-xl">
              A data scientist who&apos;s allergic to dashboards no one reads.
              I&apos;ve been turning numbers into stories since family
              spreadsheets — from a B.Tech in CS to a Master&apos;s in Data
              Science, with detours through ISRO&apos;s satellites and fintech
              recommendation engines.
            </p>
            <p className="mt-6 text-base leading-relaxed text-white/80">
              Ready to turn your messy data into clear decisions? Whether
              it&apos;s an ML model, a research problem, or a product that needs
              real insight — let&apos;s build it, fast and accurate.
            </p>
          </div>

          {/* right: cutout photo */}
          <div className="order-1 flex justify-center md:order-2">
            <div className="relative">
              <div className="absolute inset-0 -m-2 rounded-[40%_60%_55%_45%] bg-[#ff2d8b] blur-md" />
              <Image
                src="/images/bw-portrait.png"
                alt="Black and white portrait of Devshree Jadeja"
                width={360}
                height={420}
                className="relative h-[360px] w-auto object-contain drop-shadow-2xl"
              />
            </div>
          </div>
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
          {CONTACTS.map((c) => {
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
              <a
                key={c.label}
                href={c.href}
                className="rotate-[-1deg] rounded-lg bg-white p-5 transition-transform hover:rotate-0"
              >
                {inner}
              </a>
            ) : (
              <div
                key={c.label}
                className="rotate-[1deg] rounded-lg bg-white p-5"
              >
                {inner}
              </div>
            )
          })}
        </div>

        <p className="mt-12 text-center font-mono text-[11px] uppercase tracking-[0.3em] text-white/50">
          © 2026 Devshree Jadeja · crafting data solutions for a smarter future
        </p>
      </div>
    </div>
  )
}
