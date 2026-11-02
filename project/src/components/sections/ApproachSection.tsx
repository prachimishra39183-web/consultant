
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
  Hand,
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
  title: 'Palmist',
  subtitle: 'Discover the story within your hands',
  description:
    'Explore the lines, mounts and unique patterns of your palms through personalised palmistry guidance. Gain insights into your strengths, tendencies and life path with an individual consultation.',
  icon: Hand,
  accent: 'discipline-blue',
  symbol: '✋',
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
  className="relative overflow-hidden pt-16 sm:pt-20 lg:pt-24"
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

      <div className="mx-auto max-w-6xl">
        {/* INTRODUCTION */}
        <div className="approach-intro mb-10 grid gap-6 lg:mb-14 lg:grid-cols-[1fr_0.62fr] lg:items-end">
          <div>
            <div className="mb-4 inline-flex items-center gap-3">
              <span className="h-px w-10 bg-[#b18b50]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#947341]">
                A personal approach
              </span>
            </div>

            <h2 className="max-w-3xl font-serif text-4xl font-medium leading-[1.02] tracking-[-0.04em] text-[#292d24] sm:text-5xl lg:text-6xl">
              The person and the place,
              <span className="block font-normal italic text-[#a18150]">
                read together.
              </span>
            </h2>
          </div>

          <div className="max-w-lg pb-1 lg:justify-self-end">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full border border-[#b18b50]/35 bg-[#fcfaf5]/65 text-[#a18150]">
              <Sparkles size={17} strokeWidth={1.4} />
            </div>
            <p className="text-sm leading-7 text-[#66675c] sm:text-base">
              Rather than begin with a remedy, the consultation begins with
              understanding.  traditional disciplines inform one
              personal plan.
            </p>
          </div>
        </div>

        {/* THREE DISCIPLINES */}
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4 lg:gap-4">
          {DISCIPLINES.map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.number}
                className={`discipline-card ${item.accent} group relative flex min-h-[270px] flex-col overflow-hidden rounded-2xl border p-5 transition duration-300 hover:-translate-y-1 sm:p-5`}
              >
                <div
                  aria-hidden="true"
                  className="discipline-watermark absolute -right-3 -top-8 select-none font-serif text-[7rem] leading-none"
                >
                  {item.symbol}
                </div>

                <div className="relative z-10 flex items-start justify-between">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-current/15 bg-white/45">
                    <Icon size={22} strokeWidth={1.35} />
                  </span>
                  <span className="font-mono text-xs tracking-widest opacity-65">
                    {item.number}
                  </span>
                </div>

                <div className="relative z-10 mt-auto pt-8">
                  <p className="mb-2 text-[8px] font-bold uppercase tracking-[0.16em] opacity-70">
                    {item.subtitle}
                  </p>
                  <h3 className="font-serif text-2xl font-medium tracking-tight sm:text-3xl">
                    {item.title}
                  </h3>
                  <p className="mt-3 max-w-sm text-[13px] leading-6 opacity-80">
                    {item.description}
                  </p>
                </div>

                <div className="relative z-10 mt-5 flex items-center justify-between border-t border-current/15 pt-3">
                  <span className="text-[8px] font-bold uppercase tracking-[0.14em] opacity-65">
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
        
<div className="approach-profile profile-showcase relative mt-14 overflow-hidden rounded-2xl border border-[#d9cfbc]/80 bg-[#f8f5ed]/95 shadow-[0_18px_50px_rgba(59,53,39,0.09)] sm:mt-16 lg:mt-20">

          <div className="grid lg:grid-cols-[0.85fr_1.15fr]">
            {/* IMAGE PANEL */}
            <div className="approach-portrait relative min-h-[340px] overflow-hidden sm:min-h-[420px] lg:min-h-[500px]">
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
                className="absolute inset-4 rounded-xl border border-white/40 sm:inset-5"
              />
              <div className="absolute left-7 top-7 flex items-center gap-2 text-white/90 sm:left-9 sm:top-9">
                <Sun size={15} strokeWidth={1.3} />
                <span className="text-[9px] font-semibold uppercase tracking-[0.25em]">
                  Tradition · Perspective · Practice
                </span>
              </div>

              <div className="absolute bottom-7 left-7 right-7 text-white sm:bottom-9 sm:left-9 sm:right-9">
                <div className="mb-4 flex items-center gap-3">
                  <span className="h-px w-8 bg-[#e1c38e]" />
                  <span className="text-[9px] font-bold uppercase tracking-[0.24em] text-[#f0d6a6]">
                    The practitioner
                  </span>
                </div>
                <h3 className="max-w-md font-serif text-3xl leading-[1.05] tracking-tight sm:text-4xl lg:text-5xl">
                  Acharya
                  <br />
                  Sunil Mahatma
                </h3>
                <p className="mt-3 max-w-sm text-xs leading-5 text-white/75">
                  Personal consultation shaped by traditional disciplines and
                  attention to the individual.
                </p>
              </div>

              {/* Gold image marker */}
              <div className="absolute bottom-6 right-6 flex h-9 w-9 items-center justify-center rounded-full border border-white/35 bg-white/10 text-[#f1d5a3] backdrop-blur-sm sm:bottom-12 sm:right-12">
                <Sparkles size={19} strokeWidth={1.2} />
              </div>
            </div>

            {/* PROFILE COPY */}
            
<div className="flex flex-col justify-center px-5 py-7 sm:px-8 sm:py-9 lg:px-10 lg:py-10">

  {/* PROFESSIONAL INTRODUCTION */}
  <div className="mb-6">
    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#d4af37]/60 bg-gradient-to-r from-[#fff9e9] via-white to-[#f8edcf] px-4 py-2 shadow-[0_3px_14px_rgba(177,139,80,0.12)]">
      <Gem size={15} className="text-[#a87920]" />
      <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#8c682c]">
        Certified Acharya · MahaVastu
      </span>
    </div>

    <h2 className="font-serif text-3xl font-medium leading-[1.08] tracking-[-0.03em] text-[#292d24] sm:text-4xl lg:text-5xl">
      Rooted in tradition.
      <span className="mt-1 block bg-gradient-to-r from-[#a87920] via-[#d4af37] to-[#98702b] bg-clip-text font-normal italic text-transparent">
        Attentive to the individual.
      </span>
    </h2>
  </div>

  {/* EXPERTISE HIGHLIGHTS */}
  <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-3">

    <div className="group relative overflow-hidden rounded-xl border border-[#d4af37]/45 bg-gradient-to-br from-white via-[#fffdf7] to-[#f8edcf] p-4 shadow-[0_5px_20px_rgba(177,139,80,0.09)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_28px_rgba(177,139,80,0.18)]">
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full border border-[#d4af37]/40 bg-white text-[#a87920] shadow-sm">
        <Sparkles size={19} strokeWidth={1.5} />
      </div>
      <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#a87920]">
        Expertise
      </p>
      <h3 className="mt-1 font-serif text-xl font-medium text-[#292d24]">
        Palmist
      </h3>
      <p className="mt-1 text-xs leading-5 text-[#777064]">
        Personal palm-reading guidance
      </p>
      <div className="absolute right-0 top-0 h-20 w-20 rounded-full bg-[#e8d39b]/20 blur-2xl" />
    </div>

    <div className="group relative overflow-hidden rounded-xl border border-[#d4af37]/45 bg-gradient-to-br from-white via-[#fffdf7] to-[#f8edcf] p-4 shadow-[0_5px_20px_rgba(177,139,80,0.09)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_28px_rgba(177,139,80,0.18)]">
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full border border-[#d4af37]/40 bg-white text-[#a87920] shadow-sm">
        <Gem size={19} strokeWidth={1.5} />
      </div>
      <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#a87920]">
        Recognition
      </p>
      <h3 className="mt-1 font-serif text-xl font-medium text-[#292d24]">
        Certified Acharya
      </h3>
      <p className="mt-1 text-xs leading-5 text-[#777064]">
        MahaVastu professional
      </p>
      <div className="absolute right-0 top-0 h-20 w-20 rounded-full bg-[#e8d39b]/20 blur-2xl" />
    </div>

    <div className="group relative overflow-hidden rounded-xl border border-[#d4af37]/45 bg-gradient-to-br from-white via-[#fffdf7] to-[#f8edcf] p-4 shadow-[0_5px_20px_rgba(177,139,80,0.09)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_28px_rgba(177,139,80,0.18)]">
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full border border-[#d4af37]/40 bg-white text-[#a87920] shadow-sm">
        <Sparkles size={19} strokeWidth={1.5} />
      </div>
      <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#a87920]">
        Specialisation
      </p>
      <h3 className="mt-1 font-serif text-xl font-medium text-[#292d24]">
        Astro Vastu
      </h3>
      <p className="mt-1 text-xs leading-5 text-[#777064]">
        Astrology and numerology
      </p>
      <div className="absolute right-0 top-0 h-20 w-20 rounded-full bg-[#e8d39b]/20 blur-2xl" />
    </div>

  </div>

  {/* GOLD DIVIDER */}
  <div className="my-2 h-px w-full bg-gradient-to-r from-[#b18b50] via-[#ead9a7] to-transparent" />

  {/* INTRODUCTION */}
  <div className="space-y-3 text-sm leading-7 text-[#55564d]">
    <p>
      A <strong className="font-semibold text-[#98702b]">Mahavastu consultant, palmist and Certified Acharya</strong>,
      Sunil Mahatma brings together Astro Vastu, astrology guidance
      and numerology in his personal consultation practice.
    </p>

    <p>
      His approach starts with your horoscope and Prakriti before
      considering the land and building. Recommendations are tailored
      to the person, the property and the needs identified during assessment.
    </p>
  </div>

  {/* SIGNATURE QUOTE */}
  <blockquote className="relative my-5 rounded-r-xl border-l-2 border-[#c49a43] bg-gradient-to-r from-[#fff9e9] to-transparent py-3 pl-5 pr-3 sm:pl-6">
    <span
      aria-hidden="true"
      className="absolute -left-1 -top-4 font-serif text-4xl text-[#b18b50]/60"
    >
      “
    </span>
    <p className="font-serif text-xl italic leading-snug text-[#393d31] sm:text-2xl">
      Not a standard set of remedies. A considered plan for your space.
    </p>
  </blockquote>

  {/* ACHARYA MILESTONE */}
  <div className="relative overflow-hidden rounded-xl border border-[#d4af37]/50 bg-gradient-to-br from-white via-[#fffdf7] to-[#f6e8c3] p-4 shadow-[0_6px_24px_rgba(177,139,80,0.12)]">
    <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-[#e3c46d]/20 blur-2xl" />

    <div className="relative flex gap-4">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#d4af37]/40 bg-white text-[#947341] shadow-sm">
        <Gem size={20} strokeWidth={1.35} />
      </div>

      <div>
        <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#947341]">
          A milestone in the journey
        </p>
        <h4 className="mt-1.5 font-serif text-lg font-medium text-[#292d24] sm:text-xl">
          MahaVastu Advanced 2026
        </h4>
        <p className="mt-1.5 text-xs leading-5 text-[#66675c]">
          Honoured with the title of Acharya at MahaVastu Advanced
          2026 by Dr. Khushdeep Bansal.
        </p>
      </div>
    </div>
  </div>

  <div className="mt-5 flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.16em] text-[#77776c]">
    <UserRound size={15} strokeWidth={1.4} className="text-[#a87920]" />
    <span>A personal, assessment-led practice</span>
  </div>

</div>

          </div>
        </div>

        {/* FOUNDATION STEPS INTRO */}
        <div className="mt-16 grid gap-6 lg:mb-10 lg:mt-24 lg:grid-cols-[0.85fr_0.65fr] lg:items-end">
          <div>
            <div className="mb-4 inline-flex items-center gap-3">
              <span className="h-px w-10 bg-[#b18b50]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#947341]">
                Before the recommendations
              </span>
            </div>

            <h2 className="max-w-2xl font-serif text-4xl font-medium leading-[1.04] tracking-[-0.04em] text-[#292d24] sm:text-5xl lg:text-6xl">
              First, understand
              <span className="block italic text-[#a18150]">
                the whole picture.
              </span>
            </h2>
          </div>

          <div className="max-w-lg lg:justify-self-end">
            <p className="text-sm leading-7 text-[#66675c] sm:text-base">
              Four foundation steps help shape the recommendations. The seven
              layers follow this assessment, not the other way around.
            </p>
            <div className="mt-5 flex items-center gap-3 text-[8px] font-bold uppercase tracking-[0.16em] text-[#947341]">
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#b18b50]/40">
                <ArrowDownRight size={17} />
              </span>
              <span>From personal insight to site assessment</span>
            </div>
          </div>
        </div>

        {/* FOUR-STEP JOURNEY */}
        <div className="foundation-grid relative grid gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
          {FOUNDATION_STEPS.map((step, index) => {
            const Icon = step.icon;

            return (
              <article
                key={step.number}
                className="foundation-card group relative flex flex-col rounded-2xl border border-[#dcd4c5]/90 bg-[#fcfaf5]/75 p-5 transition duration-300 hover:-translate-y-1 hover:border-[#b18b50]/55 hover:bg-[#fffdf8]/95 sm:p-5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm tracking-widest text-[#a18150]">
                    {step.number}
                  </span>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#d9cfbc] bg-[#f0eadf] text-[#8f7447] transition duration-500 group-hover:rotate-6 group-hover:scale-105">
                    <Icon size={19} strokeWidth={1.35} />
                  </span>
                </div>

                <div className="my-5 h-px w-full bg-gradient-to-r from-[#b18b50]/65 via-[#dcd4c5] to-transparent" />

                <p className="mb-2 text-[8px] font-bold uppercase tracking-[0.14em] text-[#9b8259]">
                  {step.tag}
                </p>

                <h3 className="font-serif text-xl font-medium leading-tight text-[#292d24] sm:text-2xl">
                  {step.title}
                </h3>

                <p className="mt-3 flex-1 text-[13px] leading-6 text-[#696a60]">
                  {step.description}
                </p>

                <div className="mt-5 flex items-center justify-between border-t border-[#ded7ca] pt-3">
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
       
      </div>
    </section>
  );
}
