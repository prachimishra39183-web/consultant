
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
    accent: 'discipline-gold',
    symbol: '✳',
  },
  {
    number: '02',
    title: 'Astrology guidance',
    subtitle: 'A personal planetary reading',
    description:
      'Your planetary reading informs the advice on precious stone dust, gemstones and their placements.',
    icon: Orbit,
    accent: 'discipline-gold',
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
    accent: 'discipline-gold',
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
    className="relative overflow-hidden pt-16 text-black sm:pt-20 lg:pt-24"
  >
    {/* Decorative atmosphere */}
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -right-40 top-32 -z-10 h-96 w-96 rounded-full bg-[#ead9b8]/35 blur-3xl"
    />

    <div
      aria-hidden="true"
      className="pointer-events-none absolute -left-40 top-[48%] -z-10 h-96 w-96 rounded-full bg-[#f0e5d2]/50 blur-3xl"
    />

    <div className="mx-auto max-w-6xl">
      {/* INTRODUCTION */}
      <div className="approach-intro mb-10 grid gap-6 lg:mb-14 lg:grid-cols-[1fr_0.62fr] lg:items-end">
        <div>
          <div className="mb-4 inline-flex items-center gap-3">
            <span className="h-px w-10 bg-[#b18b50]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.28em] !text-red">
              A personal approach
            </span>
          </div>

          <h2 className="max-w-3xl font-serif text-4xl font-medium leading-[1.02] tracking-[-0.04em] !text-white sm:text-5xl lg:text-6xl">
            The person and the place,
            <span className="block font-normal italic !text-white">
              read together.
            </span>
          </h2>
        </div>

        <div className="max-w-lg pb-1 lg:justify-self-end">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full border border-[#b18b50]/45 bg-[#fcfaf5]/80 !text-black">
            <Sparkles size={17} strokeWidth={1.4} />
          </div>

          <p className="text-sm leading-7 !text-white sm:text-base">
            Rather than begin with a remedy, the consultation begins with
            understanding. Traditional disciplines inform one personal plan.
          </p>
        </div>
      </div>

      {/* FOUR DISCIPLINES */}
      <div className="grid gap-3 sm:grid-cols-2 lg:gap-4 xl:grid-cols-4">
        {DISCIPLINES.map((item) => {
          const Icon = item.icon;

          return (
            <article
              key={item.number}
              className={`discipline-card ${item.accent} group relative flex min-h-[270px] flex-col overflow-hidden rounded-2xl border border-[#c6a15b]/50 bg-gradient-to-br from-[#f5e8ce] via-[#ead5ad] to-[#d9bb83] p-5 !text-black shadow-[0_10px_30px_rgba(91,61,30,0.08)] transition duration-300 hover:-translate-y-1 hover:border-[#a98249] hover:from-[#f0dfb9] hover:via-[#e4c58d] hover:to-[#cba66a] hover:shadow-[0_18px_40px_rgba(91,61,30,0.15)]`}
            >
              <div
                aria-hidden="true"
                className="discipline-watermark absolute -right-3 -top-8 select-none font-serif text-[7rem] leading-none text-[#795327]/10"
              >
                {item.symbol}
              </div>

              <div className="relative z-10 flex items-start justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#805b2e]/25 bg-white/45 !text-black">
                  <Icon size={22} strokeWidth={1.35} />
                </span>

                <span className="font-mono text-xs tracking-widest !text-black">
                  {item.number}
                </span>
              </div>

              <div className="relative z-10 mt-auto pt-8">
                <p className="mb-2 text-[8px] font-bold uppercase tracking-[0.16em] !text-black">
                  {item.subtitle}
                </p>

                <h3 className="font-serif text-2xl font-bold tracking-tight !text-black sm:text-3xl">
                  {item.title}
                </h3>

                <p className="mt-3 max-w-sm text-[13px] font-medium leading-6 !text-black">
                  {item.description}
                </p>
              </div>

              <div className="relative z-10 mt-5 flex items-center justify-between border-t border-[#805b2e]/25 pt-3">
                <span className="text-[8px] font-bold uppercase tracking-[0.14em] !text-black">
                  Part of one personal plan
                </span>

                <ArrowUpRight
                  size={17}
                  className="!text-black transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </div>
            </article>
          );
        })}
      </div>

      {/* ACHARYA PROFILE FEATURE */}
      <div className="approach-profile profile-showcase relative mt-14 overflow-hidden rounded-[28px] border border-[#b18b50]/60 bg-gradient-to-br from-[#fcf5e7] via-[#f4e4c4] to-[#e8d1a3] !text-black shadow-[0_24px_70px_rgba(91,61,30,0.18)] sm:mt-16 lg:mt-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/30 blur-3xl"
        />

        <div className="relative grid items-center gap-8 p-5 sm:p-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-10 lg:p-10">
          {/* IMAGE PANEL */}
          <div className="approach-portrait relative mx-auto w-full max-w-[440px] overflow-hidden rounded-[22px] border border-[#b18b50]/50 bg-[#30271e] shadow-[0_14px_35px_rgba(91,61,30,0.25)]">
            <div className="relative aspect-[4/5] max-h-[560px]">
              <img
                src="/img1.jpg"
                alt="Acharya Sunil Mahatma"
                className="absolute inset-0 h-full w-full object-cover object-center"
                loading="lazy"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#17140f]/90 via-transparent to-[#17140f]/20" />
              <div className="absolute inset-3 rounded-[16px] border border-white/30" />

              <div className="absolute left-5 top-5 flex items-center gap-2 text-white">
                <Sun size={15} strokeWidth={1.3} />
                <span className="text-[9px] font-semibold uppercase tracking-[0.2em]">
                  Tradition · Perspective · Practice
                </span>
              </div>

              <div className="absolute bottom-5 left-5 right-5 text-white">
                <span className="mb-3 block text-[9px] font-bold uppercase tracking-[0.22em] text-[#e2c17e]">
                  The practitioner
                </span>

                <h3 className="font-serif text-3xl leading-tight text-white sm:text-4xl">
                  Acharya
                  <br />
                  Sunil Mahatma
                </h3>

                <p className="mt-2 text-xs leading-5 text-white/90">
                  Astro Vastu · Astrology · Numerology
                </p>
              </div>

              <div className="absolute bottom-5 right-5 flex h-9 w-9 items-center justify-center rounded-full border border-white/35 bg-white/10 text-[#e2c17e] backdrop-blur-sm">
                <Sparkles size={18} strokeWidth={1.2} />
              </div>
            </div>
          </div>

          {/* PROFILE CONTENT */}
          <div className="flex min-w-0 flex-col justify-center">
            <div className="mb-6">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#8a642e]/40 bg-[#f4e2b7]/80 px-4 py-2">
                <Gem size={15} className="!text-black" />
                <span className="text-[10px] font-bold uppercase tracking-[0.17em] !text-black">
                  Certified Acharya · MahaVastu
                </span>
              </div>

              <h2 className="font-serif text-3xl font-bold leading-[1.08] tracking-[-0.03em] !text-black sm:text-4xl lg:text-5xl">
                Rooted in tradition.
                <span className="mt-1 block font-normal italic !text-black">
                  Attentive to the individual.
                </span>
              </h2>
            </div>

            {/* EXPERTISE CARDS */}
            <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {[
                {
                  label: 'Expertise',
                  title: 'Palmist',
                  description: 'Personal palm-reading guidance',
                  icon: Sparkles,
                },
                {
                  label: 'Recognition',
                  title: 'Certified Acharya',
                  description: 'MahaVastu professional',
                  icon: Gem,
                },
                {
                  label: 'Specialisation',
                  title: 'Astro Vastu',
                  description: 'Astrology and numerology',
                  icon: Sun,
                },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.label}
                    className="group rounded-xl border border-[#b18b50]/40 bg-[#fff5df] p-4 !text-black transition duration-300 hover:-translate-y-1 hover:border-[#b18b50] hover:bg-[#fff9eb] hover:shadow-lg"
                  >
                    <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full border border-[#c6a15b]/40 bg-[#f1dfb7] !text-black">
                      <Icon size={18} strokeWidth={1.5} />
                    </div>

                    <p className="text-[9px] font-bold uppercase tracking-[0.15em] !text-black">
                      {item.label}
                    </p>

                    <h3 className="mt-1 font-serif text-xl font-bold !text-black">
                      {item.title}
                    </h3>

                    <p className="mt-1 text-xs font-medium leading-5 !text-black">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="my-2 h-px w-full bg-gradient-to-r from-[#b18b50] via-[#b18b50]/40 to-transparent" />

            {/* DESCRIPTION */}
            <div className="space-y-3 text-sm font-medium leading-7 !text-black">
              <p>
                A{' '}
                <strong className="font-bold !text-black">
                  MahaVastu consultant, palmist and Certified Acharya
                </strong>
                , Sunil Mahatma brings together Astro Vastu, astrology guidance
                and numerology in his personal consultation practice.
              </p>

              <p>
                His approach starts with your horoscope and Prakriti before
                considering the land and building. Recommendations are tailored
                to the person, the property and the needs identified during
                assessment.
              </p>
            </div>

            {/* QUOTE */}
            <blockquote className="relative my-5 rounded-r-xl border-l-2 border-[#a77c37] bg-[#f3dfb2]/80 py-3 pl-5 pr-3 sm:pl-6">
              <span
                aria-hidden="true"
                className="absolute -left-1 -top-4 font-serif text-4xl text-[#a77c37]/60"
              >
                “
              </span>

              <p className="font-serif text-xl font-medium italic leading-snug !text-black sm:text-2xl">
                Not a standard set of remedies. A considered plan for your
                space.
              </p>
            </blockquote>

            {/* MILESTONE */}
            <div className="relative overflow-hidden rounded-xl border border-[#b18b50]/45 bg-gradient-to-br from-[#f8e8c5] via-[#efdbad] to-[#e4c98f] p-4 !text-black shadow-[0_6px_24px_rgba(91,61,30,0.10)]">
              <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-white/25 blur-2xl" />

              <div className="relative flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#b18b50]/40 bg-[#f1dfb7] !text-black shadow-sm">
                  <Gem size={20} strokeWidth={1.35} />
                </div>

                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.16em] !text-black">
                    A milestone in the journey
                  </p>

                  <h4 className="mt-1.5 font-serif text-lg font-bold !text-black sm:text-xl">
                    MahaVastu Advanced 2026
                  </h4>

                  <p className="mt-1.5 text-xs font-medium leading-5 !text-black">
                    Honoured with the title of Acharya at MahaVastu Advanced
                    2026 by Dr. Khushdeep Bansal.
                  </p>
                </div>
              </div>
            </div>

            {/* FOOTER */}
            <div className="mt-5 flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.16em] !text-black">
              <UserRound size={15} strokeWidth={1.4} />
            <span className="practice-tag">A personal, assessment-led practice</span>
            </div>
          </div>
        </div>
      </div>

      {/* FOUNDATION STEPS INTRO */}
      <div className="mt-16 grid gap-6 lg:mb-10 lg:mt-24 lg:grid-cols-[0.85fr_0.65fr] lg:items-end">
        <div>
          <div className="mb-4 inline-flex items-center gap-3">
            <span className="h-px w-10 bg-[#b18b50]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.28em] !text-red">
              Before the recommendations
            </span>
          </div>

          <h2 className="max-w-2xl font-serif text-4xl font-medium leading-[1.04] tracking-[-0.04em] !text-white sm:text-5xl lg:text-6xl">
            First, understand
            <span className="block italic !text-white">
              the whole picture.
            </span>
          </h2>
        </div>

        <div className="max-w-lg lg:justify-self-end">
          <p className="text-sm font-medium leading-7 !text-white sm:text-base">
            Four foundation steps help shape the recommendations. The seven
            layers follow this assessment, not the other way around.
          </p>

          <div className="mt-5 flex items-center gap-3 text-[8px] font-bold uppercase tracking-[0.16em] !text-black">
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#b18b50]/50 !text-black">
              <ArrowDownRight size={17} />
            </span>
            <span>From personal insight to site assessment</span>
          </div>
        </div>
      </div>

      {/* FOUR-STEP JOURNEY */}
      <div className="foundation-grid relative grid gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
        {FOUNDATION_STEPS.map((step) => {
          const Icon = step.icon;

          return (
            <article
              key={step.number}
              className="foundation-card group relative flex flex-col rounded-2xl border border-[#d3b783] bg-gradient-to-br from-[#fbf2df] via-[#f1e2c4] to-[#e8d3ac] p-5 !text-black shadow-[0_8px_25px_rgba(91,61,30,0.06)] transition duration-300 hover:-translate-y-1 hover:border-[#b18b50] hover:from-[#f7e8c8] hover:via-[#eddbb5] hover:to-[#dfc18b] hover:shadow-[0_15px_35px_rgba(91,61,30,0.12)] sm:p-5"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm tracking-widest !text-black">
                  {step.number}
                </span>

                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#d3b783] bg-[#ead9b8] !text-black transition duration-500 group-hover:rotate-6 group-hover:scale-105">
                  <Icon size={19} strokeWidth={1.35} />
                </span>
              </div>

              <div className="my-5 h-px w-full bg-gradient-to-r from-[#b18b50]/65 via-[#d3b783] to-transparent" />

              <p className="mb-2 text-[8px] font-bold uppercase tracking-[0.14em] !text-black">
                {step.tag}
              </p>

              <h3 className="font-serif text-xl font-bold leading-tight !text-black sm:text-2xl">
                {step.title}
              </h3>

              <p className="mt-3 flex-1 text-[13px] font-medium leading-6 !text-black">
                {step.description}
              </p>

              <div className="mt-5 flex items-center justify-between border-t border-[#d3b783] pt-3">
                <span className="text-[9px] font-bold uppercase tracking-[0.16em] !text-black">
                  Foundation step
                </span>

                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#d3b783] !text-black transition duration-300 group-hover:border-[#b18b50] group-hover:bg-[#e9dfca]">
                  <ArrowUpRight size={15} />
                </span>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  </section>
);
}
