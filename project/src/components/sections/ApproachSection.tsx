
import {
  ArrowDownRight,
  ArrowUpRight,
  Compass,
  Gem,
  Hash,
  Sparkles,
  Sun,
  UserRound,
  Waves,
  ScanLine,
  Orbit,
  Leaf,
} from 'lucide-react';

const DISCIPLINES = [
  {
    number: '01',
    title: 'Astro Vastu',
    subtitle: 'The person meets the place',
    description:
      'Directions, zones and devtas of the building are read alongside your horoscope, connecting the person with the place.',
    icon: Compass,
    accent: 'discipline-sage',
    symbol: '✳',
  },
  {
    number: '02',
    title: 'Astrology guidance',
    subtitle: 'A personal planetary reading',
    description:
      'Your planetary reading informs the advice on precious stone dust, gemstones and their placements.',
    icon: Orbit,
    accent: 'discipline-blue',
    symbol: '☼',
  },
  {
    number: '03',
    title: 'Numerology',
    subtitle: 'Meaning in the numbers',
    description:
      'House and mobile numbers are considered through colour balancing, without changing the numbers themselves.',
    icon: Hash,
    accent: 'discipline-gold',
    symbol: '◇',
  },
   {
  number: '04',
  title: 'Online consultation',
  subtitle: 'Planetary guidance, wherever you are',
  description:
    'Connect through an online consultation to discuss your birth chart, planetary influences and personalised astrological guidance from the comfort of your home.',
  icon: Orbit,
  accent: 'discipline-blue',
  symbol: '☼',
},
];

const FOUNDATION_STEPS = [
  {
    number: '01',
    title: 'Your horoscope',
    description:
      'A reading of planetary influences forms the personal starting point for the consultation.',
    icon: Sparkles,
    tag: 'PERSONAL STARTING POINT',
  },
  {
    number: '02',
    title: 'Your Prakriti',
    description:
      'Sattva (clarity and calm), Rajas (drive and restlessness) and Tamas (inertia and rest) are all present; one may lead.',
    icon: Leaf,
    tag: 'UNDERSTANDING THE PERSON',
  },
  {
    number: '03',
    title: 'The nature of the space',
    description:
      'The land and building are assessed for their own Prakriti within the traditional approach.',
    icon: Waves,
    tag: 'UNDERSTANDING THE PROPERTY',
  },
  {
    number: '04',
    title: 'Geopathic stress scanning',
    description:
      'The practice includes scanning the site, with attention to beds and work areas, for what it describes as energetic stress.',
    icon: ScanLine,
    tag: 'SITE ASSESSMENT',
  },
];

export default function ApproachSection() {
  return (
    <section
      id="approach"
      className="approach-section relative isolate overflow-hidden px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-36"
    >
      {/* Decorative atmosphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-32 -z-10 h-96 w-96 rounded-full bg-[#dce7e0]/45 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-[48%] -z-10 h-96 w-96 rounded-full bg-[#e6dfcf]/45 blur-3xl"
      />

      <div className="mx-auto max-w-7xl">
        {/* INTRODUCTION */}
        <div className="approach-intro mb-14 grid gap-8 lg:mb-20 lg:grid-cols-[1fr_0.62fr] lg:items-end">
          <div>
            <div className="mb-6 inline-flex items-center gap-3">
              <span className="h-px w-10 bg-[#b18b50]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#947341]">
                A personal approach
              </span>
            </div>

            <h2 className="max-w-3xl font-serif text-5xl font-medium leading-[0.99] tracking-[-0.045em] text-[#292d24] sm:text-6xl lg:text-7xl">
              The person and the place,
              <span className="block font-normal italic text-[#a18150]">
                read together.
              </span>
            </h2>
          </div>

          <div className="max-w-lg pb-1 lg:justify-self-end">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-[#b18b50]/35 bg-[#fcfaf5]/65 text-[#a18150]">
              <Sparkles size={20} strokeWidth={1.4} />
            </div>
            <p className="text-base leading-8 text-[#66675c] sm:text-lg">
              Rather than begin with a remedy, the consultation begins with
              understanding.  traditional disciplines inform one
              personal plan.
            </p>
          </div>
        </div>

        {/* THREE DISCIPLINES */}
        <div className="grid gap-4 md:grid-cols-4 lg:gap-4">
          {DISCIPLINES.map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.number}
                className={`discipline-card ${item.accent} group relative flex min-h-[330px] flex-col overflow-hidden rounded-[1.6rem] border p-6 transition duration-500 hover:-translate-y-1.5 sm:p-8`}
              >
                <div
                  aria-hidden="true"
                  className="discipline-watermark absolute -right-3 -top-8 select-none font-serif text-[9rem] leading-none"
                >
                  {item.symbol}
                </div>

                <div className="relative z-10 flex items-start justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-current/15 bg-white/45">
                    <Icon size={22} strokeWidth={1.35} />
                  </span>
                  <span className="font-mono text-xs tracking-widest opacity-65">
                    {item.number}
                  </span>
                </div>

                <div className="relative z-10 mt-auto pt-14">
                  <p className="mb-3 text-[9px] font-bold uppercase tracking-[0.2em] opacity-70">
                    {item.subtitle}
                  </p>
                  <h3 className="font-serif text-3xl font-medium tracking-tight sm:text-4xl">
                    {item.title}
                  </h3>
                  <p className="mt-4 max-w-sm text-sm leading-7 opacity-80">
                    {item.description}
                  </p>
                </div>

                <div className="relative z-10 mt-7 flex items-center justify-between border-t border-current/15 pt-4">
                  <span className="text-[9px] font-bold uppercase tracking-[0.2em] opacity-65">
                    Part of one personal plan
                  </span>
                  <ArrowUpRight
                    size={17}
                    className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </div>
              </article>
            );
          })}
        </div>

        {/* ACHARYA PROFILE FEATURE */}
        <div className="approach-profile relative mt-24 overflow-hidden rounded-[2rem] border border-[#d9cfbc]/80 bg-[#f8f5ed]/90 shadow-[0_28px_90px_rgba(59,53,39,0.08)] sm:mt-32 lg:mt-40">
          <div className="grid lg:grid-cols-[0.88fr_1.12fr]">
            {/* IMAGE PANEL */}
            <div className="approach-portrait relative min-h-[440px] overflow-hidden sm:min-h-[560px] lg:min-h-[690px]">
              <img
                src="/img1.jpg"
                alt="Acharya Sunil Mahatma"
                className="absolute inset-0 h-full w-full object-cover object-center"
                loading="lazy"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#182019]/85 via-[#182019]/5 to-[#182019]/10" />

              {/* Framed corner details */}
              <div
                aria-hidden="true"
                className="absolute inset-5 rounded-[1.4rem] border border-white/40 sm:inset-7"
              />
              <div className="absolute left-10 top-10 flex items-center gap-2 text-white/90 sm:left-14 sm:top-14">
                <Sun size={15} strokeWidth={1.3} />
                <span className="text-[9px] font-semibold uppercase tracking-[0.25em]">
                  Tradition · Perspective · Practice
                </span>
              </div>

              <div className="absolute bottom-9 left-9 right-9 text-white sm:bottom-12 sm:left-12 sm:right-12">
                <div className="mb-4 flex items-center gap-3">
                  <span className="h-px w-8 bg-[#e1c38e]" />
                  <span className="text-[9px] font-bold uppercase tracking-[0.24em] text-[#f0d6a6]">
                    The practitioner
                  </span>
                </div>
                <h3 className="max-w-md font-serif text-4xl leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
                  Acharya
                  <br />
                  Sunil Mahatma
                </h3>
                <p className="mt-4 max-w-sm text-sm leading-6 text-white/75">
                  Personal consultation shaped by traditional disciplines and
                  attention to the individual.
                </p>
              </div>

              {/* Gold image marker */}
              <div className="absolute bottom-8 right-8 flex h-14 w-14 items-center justify-center rounded-full border border-white/35 bg-white/10 text-[#f1d5a3] backdrop-blur-sm sm:bottom-12 sm:right-12">
                <Sparkles size={23} strokeWidth={1.2} />
              </div>
            </div>

            {/* PROFILE COPY */}
            <div className="flex flex-col justify-center px-7 py-10 sm:px-12 sm:py-14 lg:px-14 lg:py-16">
              <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-[#cbb58e]/55 bg-[#eee6d5]/55 px-4 py-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#a18150]" />
                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#80643a]">
                  Certified Acharya · MahaVastu
                </span>
              </div>

              <h2 className="font-serif text-4xl font-medium leading-[1.05] tracking-[-0.035em] text-[#292d24] sm:text-5xl lg:text-[3.5rem]">
                Rooted in tradition.
                <span className="mt-1 block font-normal italic text-[#a18150]">
                  Attentive to the individual.
                </span>
              </h2>

              <div className="my-7 h-px w-full bg-gradient-to-r from-[#b18b50]/65 via-[#d9cfbc] to-transparent" />

              <div className="space-y-5 text-sm leading-8 text-[#66675c] sm:text-base">
                <p>
                  A Mahavastu consultant and certified Acharya from Mahavastu,
                  Sunil Mahatma brings together Astro Vastu, astrology guidance
                  and numerology in his personal consultation practice.
                </p>
                <p>
                  His approach starts with your horoscope and Prakriti before
                  considering the land and building. Recommendations are then
                  tailored to the person, the property and the needs identified
                  during assessment.
                </p>
              </div>

              <blockquote className="relative my-8 border-l-2 border-[#b18b50] py-1 pl-5 sm:pl-6">
                <span
                  aria-hidden="true"
                  className="absolute -left-1 -top-5 font-serif text-4xl text-[#b18b50]/50"
                >
                  “
                </span>
                <p className="font-serif text-2xl italic leading-snug text-[#393d31] sm:text-3xl">
                  Not a standard set of remedies. A considered plan for your
                  space.
                </p>
              </blockquote>

              {/* ACHARYA MILESTONE */}
              <div className="rounded-2xl border border-[#d9cfbc] bg-white/55 p-5 sm:p-6">
                <div className="flex gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#e9dfca] text-[#947341]">
                    <Gem size={20} strokeWidth={1.35} />
                  </div>
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#947341]">
                      A milestone in the journey
                    </p>
                    <h4 className="mt-2 font-serif text-xl font-medium text-[#292d24] sm:text-2xl">
                      MahaVastu Advanced 2026
                    </h4>
                    <p className="mt-2 text-sm leading-6 text-[#66675c]">
                      Honoured with the title of Acharya at MahaVastu Advanced
                      2026 by Dr. Khushdeep Bansal.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-7 flex items-center gap-3 text-[9px] font-bold uppercase tracking-[0.19em] text-[#77776c]">
                <UserRound size={15} strokeWidth={1.4} />
                <span>A personal, assessment-led practice</span>
              </div>
            </div>
          </div>
        </div>

        {/* FOUNDATION STEPS INTRO */}
        <div className="mt-24 grid gap-7 lg:mb-14 lg:mt-36 lg:grid-cols-[0.85fr_0.65fr] lg:items-end">
          <div>
            <div className="mb-6 inline-flex items-center gap-3">
              <span className="h-px w-10 bg-[#b18b50]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#947341]">
                Before the recommendations
              </span>
            </div>

            <h2 className="max-w-2xl font-serif text-5xl font-medium leading-[1.02] tracking-[-0.04em] text-[#292d24] sm:text-6xl lg:text-7xl">
              First, understand
              <span className="block italic text-[#a18150]">
                the whole picture.
              </span>
            </h2>
          </div>

          <div className="max-w-lg lg:justify-self-end">
            <p className="text-base leading-8 text-[#66675c]">
              Four foundation steps help shape the recommendations. The seven
              layers follow this assessment, not the other way around.
            </p>
            <div className="mt-5 flex items-center gap-3 text-[9px] font-bold uppercase tracking-[0.2em] text-[#947341]">
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#b18b50]/40">
                <ArrowDownRight size={17} />
              </span>
              <span>From personal insight to site assessment</span>
            </div>
          </div>
        </div>

        {/* FOUR-STEP JOURNEY */}
        <div className="foundation-grid relative grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {FOUNDATION_STEPS.map((step, index) => {
            const Icon = step.icon;

            return (
              <article
                key={step.number}
                className="foundation-card group relative flex flex-col rounded-[1.5rem] border border-[#dcd4c5]/90 bg-[#fcfaf5]/75 p-6 transition duration-500 hover:-translate-y-1 hover:border-[#b18b50]/55 hover:bg-[#fffdf8]/95 sm:p-7"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm tracking-widest text-[#a18150]">
                    {step.number}
                  </span>
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[#d9cfbc] bg-[#f0eadf] text-[#8f7447] transition duration-500 group-hover:rotate-6 group-hover:scale-105">
                    <Icon size={19} strokeWidth={1.35} />
                  </span>
                </div>

                <div className="my-7 h-px w-full bg-gradient-to-r from-[#b18b50]/65 via-[#dcd4c5] to-transparent" />

                <p className="mb-3 text-[8px] font-bold uppercase tracking-[0.17em] text-[#9b8259]">
                  {step.tag}
                </p>

                <h3 className="font-serif text-2xl font-medium leading-tight text-[#292d24] sm:text-[1.7rem]">
                  {step.title}
                </h3>

                <p className="mt-4 flex-1 text-sm leading-7 text-[#696a60]">
                  {step.description}
                </p>

                <div className="mt-7 flex items-center justify-between border-t border-[#ded7ca] pt-4">
                  <span className="text-[9px] uppercase tracking-[0.16em] text-[#858274]">
                    Foundation step
                  </span>
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#dcd4c5] text-[#9a7b4a] transition duration-300 group-hover:border-[#b18b50] group-hover:bg-[#e9dfca]">
                    <ArrowUpRight size={15} />
                  </span>
                </div>
              </article>
            );
          })}
        </div>

        {/* CLOSING STATEMENT */}
        <div className="mt-12 flex flex-col gap-4 border-t border-[#cfc5b3]/80 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-2xl font-serif text-xl italic leading-relaxed text-[#55584b] sm:text-2xl">
            The recommendations come after the person, the property and their
            relationship have been considered.
          </p>
          <a
            href="#consultation-enquiry"
            className="group inline-flex shrink-0 items-center gap-3 self-start rounded-full border border-[#b18b50]/55 px-6 py-3.5 text-[10px] font-bold uppercase tracking-[0.15em] text-[#705832] transition hover:bg-[#292d24] hover:text-[#fffaf0] sm:self-center"
          >
            Begin a conversation
            <ArrowUpRight
              size={16}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
