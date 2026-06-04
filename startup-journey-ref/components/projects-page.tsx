import Image from 'next/image'

export function ProjectsPage() {
  return (
    <div className="bg-grid-paper relative min-h-screen overflow-hidden bg-[#e7ddca] px-5 py-16 text-[#2b2620] sm:px-10">
      <div className="mx-auto max-w-6xl">
        <p className="text-center font-mono text-xs uppercase tracking-[0.3em] text-[#9a8a66]">
          things I built & analysed
        </p>

        {/* floating mockups */}
        <div className="relative mt-12 flex flex-wrap items-start justify-center gap-6 sm:gap-10">
          {/* FinSense */}
          <figure className="w-full max-w-md rotate-[-2deg] rounded-2xl bg-white p-3 shadow-2xl sm:w-[440px]">
            <Image
              src="/images/finsense-dashboard.png"
              alt="FinSense financial recommendation dashboard"
              width={520}
              height={340}
              className="rounded-lg object-cover"
            />
            <figcaption className="px-2 py-3">
              <p className="font-serif text-xl font-bold">
                FinSense — Recommendation Engine
              </p>
              <p className="mt-1 text-sm text-neutral-600">
                Real-time AI system processing 5M+ records/sec with intelligent
                financial insights.
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5 font-mono text-[10px] uppercase tracking-wider text-[#9a8a66]">
                <span className="rounded bg-[#efe7d4] px-2 py-0.5">Python</span>
                <span className="rounded bg-[#efe7d4] px-2 py-0.5">Spark</span>
                <span className="rounded bg-[#efe7d4] px-2 py-0.5">
                  Real-time ML
                </span>
              </div>
            </figcaption>
          </figure>

          {/* AgriDetect */}
          <figure className="w-full max-w-xs rotate-[3deg] rounded-2xl bg-white p-3 shadow-2xl sm:mt-16 sm:w-[300px]">
            <Image
              src="/images/agridetect-app.png"
              alt="AgriDetect crop disease detection app"
              width={300}
              height={380}
              className="rounded-lg object-cover"
            />
            <figcaption className="px-2 py-3">
              <p className="font-serif text-xl font-bold">AgriDetect</p>
              <p className="mt-1 text-sm text-neutral-600">
                CNN-based agricultural disease detection with explainable-AI
                visualisation.
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5 font-mono text-[10px] uppercase tracking-wider text-[#9a8a66]">
                <span className="rounded bg-[#efe7d4] px-2 py-0.5">CNN</span>
                <span className="rounded bg-[#efe7d4] px-2 py-0.5">XAI</span>
              </div>
            </figcaption>
          </figure>

          {/* stat note */}
          <div className="w-full max-w-[220px] rotate-[-1deg] self-center rounded-xl bg-[#3f6b2e] p-5 text-[#eef3e8] shadow-xl sm:mt-24">
            <p className="font-serif text-4xl font-bold">92%</p>
            <p className="mt-1 text-sm leading-relaxed">
              accuracy on ISRO satellite image classification with an RNN +
              attention model.
            </p>
          </div>
        </div>

        {/* big serif title */}
        <h2 className="mt-16 text-center font-serif text-5xl font-bold tracking-tight text-[#2b2620] text-balance sm:text-7xl">
          My Project Journey
        </h2>
        <p className="mt-3 text-center font-script text-2xl text-[#9a8a66]">
          a few things I&apos;m proud of —
        </p>
      </div>
    </div>
  )
}
