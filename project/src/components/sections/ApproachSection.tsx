
import {
  ArrowDown,
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
  Layers3,
} from 'lucide-react';
const DISCIPLINES = [
  {
    number: '01',
    title: 'Individual Understanding',
    subtitle: 'The starting point',
    description:
      'The consultation begins with understanding the individual through their horoscope and Prakriti, creating a personal foundation for the process.',
    icon: UserRound,
    symbol: '✳',
  },
  {
    number: '02',
    title: 'Land & Building Prakriti',
    subtitle: 'Understanding the space',
    description:
      'The Prakriti of the land and building is considered to understand the nature and character of the property.',
    icon: Compass,
    symbol: '☼',
  },
  {
    number: '03',
    title: 'Vastu & Planetary Balancing',
    subtitle: 'Deeper levels of assessment',
    description:
      'The approach progresses through Vastu principles, planetary guidance and energetic balancing, bringing together different layers of assessment.',
    icon: Orbit,
    symbol: '◇',
  },
  {
    number: '04',
    title: 'Palmistry & Numerology',
    subtitle: 'A broader perspective',
    description:
      'Palmistry and numerology add further dimensions to the consultation, contributing to a more comprehensive personal approach.',
    icon: Hand,
    symbol: '✋',
  },
];
const FOUNDATION_STEPS = [
  {
    number: '01',
    title: 'HOROSCOPE READING',
    description:
      'Understanding the individual’s planetary influences through horoscope analysis.',
    icon: Sparkles,
    tag: 'THE INDIVIDUAL',
  },
  {
    number: '02',
    title: 'PRAKRITI ANALYSIS',
    description:
      'Assessment of the client’s Sattva, Rajas and Tamas Prakriti.',
    icon: Leaf,
    tag: 'PERSONAL NATURE',
  },
  {
    number: '03',
    title: 'LAND & BUILDING PRAKRITI',
    description:
      'Understanding the energetic nature and characteristics of the land and building.',
    icon: Compass,
    tag: 'THE PROPERTY',
  },
  {
    number: '04',
    title: 'GEOPATHIC STRESS SCANNING',
    description:
      'Scanning and identification of geopathic stress lines and other relevant energetic disturbances.',
    icon: ScanLine,
    tag: 'ENERGETIC ASSESSMENT',
  },
];

export default function ApproachSection() {
  return (
    <section
      id="approach"
      className="relative isolate overflow-hidden px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28"
    >
      {/* Background atmosphere */}
      <div className="pointer-events-none absolute -right-40 top-20 -z-10 h-96 w-96 rounded-full bg-[#C99D50]/15 blur-3xl" />
      <div className="pointer-events-none absolute -left-40 top-[45%] -z-10 h-96 w-96 rounded-full bg-[#F0D9A5]/10 blur-3xl" />

      <div className="mx-auto max-w-6xl">

        {/* INTRO */}
        <div className="mb-14 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <div className="mb-5 inline-flex items-center gap-3">
              <span className="h-px w-10 bg-[#D4AF62]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#E2C47F]">
                A personal approach
              </span>
            </div>

            <h2 className="max-w-3xl font-serif text-4xl font-medium leading-[1.08] tracking-tight text-[#FFF8E9] sm:text-5xl lg:text-6xl">
              Understanding the individual,
              <span className="mt-2 block font-normal italic text-[#D9B66D]">
                balancing the space.
              </span>
            </h2>
          </div>

          <div className="relative rounded-2xl border border-[#C5A15D]/50 bg-gradient-to-br from-[#F8EBCF] via-[#F0DDB5] to-[#E2C48D] p-5 shadow-[0_15px_40px_rgba(0,0,0,0.18)] sm:p-6">
            <div className="absolute -right-3 -top-3 flex h-11 w-11 items-center justify-center rounded-full border border-[#D4AF62] bg-[#4A3820] text-[#F6DEAA] shadow-lg">
              <Sparkles size={19} />
            </div>

            <p className="pr-5 font-serif text-base font-medium leading-7 text-[#493719] sm:text-lg">
              Our approach begins with understanding the individual, followed
              by the Prakriti of the land and building, and progresses through
              increasingly deeper levels of Vastu, planetary, energetic,
              palmistry and numerological balancing.
            </p>

            <div className="mt-5 flex items-center gap-2">
              <span className="h-px w-9 bg-[#A77C37]" />
              <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#76551F]">
                One integrated approach
              </span>
            </div>
          </div>
        </div>

        {/* DISCIPLINES */}
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Gem size={17} className="text-[#D4AF62]" />
            <p className="text-[10px] font-bold uppercase tracking-[0.23em] text-[#E6CB91]">
              The disciplines
            </p>
          </div>
          <span className="text-[10px] tracking-widest text-[#E6CB91]/70">
            01 — 04
          </span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {DISCIPLINES.map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.number}
                className="group relative flex min-h-[285px] flex-col overflow-hidden rounded-[22px] border border-[#B88632] bg-gradient-to-br from-[#FFE9A8] via-[#E8BD62] to-[#B9852F] p-5 text-[#38250D] shadow-[0_12px_30px_rgba(0,0,0,0.2)] transition-all duration-500 hover:-translate-y-2 hover:border-[#FFE5A0] hover:from-[#FFF0BD] hover:via-[#F0CB72] hover:to-[#C7973D] hover:shadow-[0_22px_45px_rgba(0,0,0,0.28)] sm:p-6"
              >
                <div className="pointer-events-none absolute -right-3 -top-8 font-serif text-[105px] leading-none text-[#89652F]/10 transition-transform duration-500 group-hover:scale-110">
                  {item.symbol}
                </div>

                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#A77C37]/35 bg-[#FFF9EC]/70 text-[#79551F] shadow-sm transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110">
                    <Icon size={23} strokeWidth={1.5} />
                  </div>

                  <span className="font-mono text-xs tracking-widest text-[#84622D]">
                    {item.number}
                  </span>
                </div>

                <div className="relative z-10 mt-auto pt-9">
                  <p className="mb-2 text-[9px] font-bold uppercase tracking-[0.17em] text-[#88632C]">
                    {item.subtitle}
                  </p>

                  <h3 className="font-serif text-2xl font-semibold leading-tight text-[#382A18]">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-[13px] font-medium leading-6 text-[#57452B]">
                    {item.description}
                  </p>
                </div>

                <div className="relative z-10 mt-5 flex items-center justify-between border-t border-[#A77C37]/30 pt-4">
                  <span className="text-[8px] font-bold uppercase tracking-[0.15em] text-[#765622]">
                    Part of the approach
                  </span>
                  <ArrowUpRight
                    size={17}
                    className="text-[#79551F] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </div>
              </article>
            );
          })}
        </div>

        {/* PROCESS DIVIDER */}
        <div className="my-16 flex items-center gap-4 sm:my-20">
          <span className="h-px flex-1 bg-gradient-to-r from-transparent via-[#B18B50]/70 to-[#B18B50]" />
          <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#C5A15D]/60 bg-gradient-to-br from-[#F8EBCF] to-[#D8B675] text-[#61451D] shadow-lg">
            <Layers3 size={19} />
          </div>
          <span className="h-px flex-1 bg-gradient-to-l from-transparent via-[#B18B50]/70 to-[#B18B50]" />
        </div>

        {/* FOUNDATION INTRO */}
        <div className="mb-10 grid gap-6 lg:grid-cols-[1fr_0.7fr] lg:items-end">
          <div>
            <div className="mb-4 inline-flex items-center gap-3">
              <span className="h-px w-10 bg-[#D4AF62]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#E2C47F]">
                How the approach unfolds
              </span>
            </div>

           <h2 className="font-serif text-4xl font-medium leading-tight text-[#FFF8E9] sm:text-5xl">
  FOUNDATION
  <span className="block italic text-[#D9B66D]">
    Person & Space
  </span>
</h2>
          </div>

          <p className="max-w-lg text-sm font-medium leading-7 text-[#F5E8CC] sm:text-base lg:justify-self-end">
            Each stage builds on the understanding developed before it.
            The process moves from the individual to the property, then
            into deeper levels of assessment and balancing.
          </p>
        </div>

        {/* FOUR-STAGE JOURNEY */}
        <div className="relative grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="pointer-events-none absolute left-[12%] right-[12%] top-8 hidden h-px bg-gradient-to-r from-[#A77C37]/20 via-[#D4AF62] to-[#A77C37]/20 lg:block" />

          {FOUNDATION_STEPS.map((step, index) => {
            const Icon = step.icon;

            return (
              <article
                key={step.number}
               className="group relative flex flex-col rounded-2xl border border-[#B88632] bg-gradient-to-br from-[#FFEAB0] via-[#E9C36F] to-[#C18D39] p-5 text-[#38250D] shadow-[0_10px_28px_rgba(0,0,0,0.18)] transition-all duration-300 hover:-translate-y-1 hover:border-[#FFE5A0] hover:from-[#FFF1C8] hover:via-[#F2D080] hover:to-[#D19E45] hover:shadow-[0_18px_35px_rgba(0,0,0,0.25)] sm:p-5"
              >
                <div className="relative z-10 flex items-center justify-between">
                  <span className="font-mono text-xs tracking-widest text-[#80602B]">
                    STEP {step.number}
                  </span>

                  <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#B88632] bg-gradient-to-br from-[#4A2F0B] via-[#76501B] to-[#956A27] text-[#FFF1C8] shadow-[0_5px_14px_rgba(65,39,8,0.3)] transition-all duration-300 group-hover:rotate-6 group-hover:scale-110 group-hover:from-[#65420F] group-hover:to-[#A77C37]">
  <Icon size={21} strokeWidth={1.8} />
</div>
                </div>

                <div className="my-5 h-px bg-gradient-to-r from-[#A77C37]/70 via-[#C6A15C]/40 to-transparent" />

                <p className="mb-2 text-[9px] font-bold uppercase tracking-[0.17em] text-[#89652F]">
                  {step.tag}
                </p>

                <h3 className="font-serif text-xl font-semibold leading-snug text-[#3D2D19] sm:text-2xl">
                  {step.title}
                </h3>

                <p className="mt-3 text-[13px] leading-6 text-[#5A4930]">
                  {step.description}
                </p>

                <div className="mt-5 flex items-center justify-between border-t border-[#B18B50]/30 pt-3">
                  <span className="text-[8px] font-bold uppercase tracking-[0.14em] text-[#80602B]">
                    Stage {index + 1} of 4
                  </span>
                  <ArrowUpRight
                    size={16}
                    className="text-[#80602B] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </div>
              </article>
            );
          })}
        </div>
        {/* THE COMPLETE APPROACH */}
<div className="relative mt-20 mb-16 overflow-hidden rounded-[28px] border-2 border-[#B88632] bg-gradient-to-br from-[#FFF0C0] via-[#E8C36F] to-[#BD8735] p-6 shadow-[0_25px_60px_rgba(0,0,0,0.28)] sm:p-9 lg:p-11">

  {/* Background decoration */}
  <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#FFF9DF]/50 blur-3xl" />
  <div className="pointer-events-none absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-[#98651F]/20 blur-3xl" />

  <div className="relative">

    {/* Heading */}
    <div className="mb-9 text-center">
      <div className="mb-4 flex items-center justify-center gap-3">
        <span className="h-px w-10 bg-[#80551B]" />
        <Sparkles size={17} className="text-[#704914]" />
        <span className="h-px w-10 bg-[#80551B]" />
      </div>

      <p className="text-[10px] font-extrabold uppercase tracking-[0.3em] text-[#704914]">
        The complete approach
      </p>

      <h3 className="mt-3 font-serif text-3xl font-bold text-[#241505] sm:text-4xl lg:text-5xl">
        A journey from person to space
      </h3>

      <p className="mx-auto mt-3 max-w-xl text-sm font-medium leading-6 text-[#493216]">
        An integrated process that moves through personal understanding,
        property assessment and deeper levels of balancing.
      </p>
    </div>

    {/* PROCESS FLOW */}
    <div className="mx-auto flex max-w-3xl flex-col items-center">

      {[
        'PERSON',
        'PRAKRITI',
        'LAND',
        'BUILDING',
        'GEOPATHIC STRESS',
        'VASTU BALANCING',
        'PLANETARY & ENERGETIC CORRECTION',
        'PALMISTRY',
        'NUMEROLOGY',
      ].map((item, index, array) => (
        <div key={item} className="flex w-full flex-col items-center">

          <div className="group relative flex w-full max-w-[520px] items-center justify-center rounded-xl border border-[#94651F] bg-gradient-to-r from-[#FFF8E5] via-[#F5DEA7] to-[#E8C779] px-5 py-3.5 shadow-[0_5px_15px_rgba(75,47,10,0.15)] transition-all duration-300 hover:-translate-y-1 hover:border-[#59380C] hover:shadow-[0_10px_22px_rgba(75,47,10,0.25)] sm:py-4">

            <span className="absolute left-4 font-mono text-[10px] font-bold tracking-widest text-[#80551B]">
              {String(index + 1).padStart(2, '0')}
            </span>

            <span className="px-7 text-center text-xs font-extrabold tracking-[0.13em] text-[#241505] sm:text-sm">
              {item}
            </span>

            <span className="absolute right-4 h-2 w-2 rounded-full bg-[#94651F] shadow-[0_0_8px_rgba(148,101,31,0.5)]" />
          </div>

          {index !== array.length - 1 && (
            <div className="flex h-8 flex-col items-center justify-center">
              <span className="h-3 w-px bg-[#80551B]" />
              <ArrowDownRight
                size={16}
                className="rotate-45 text-[#704914]"
              />
            </div>
          )}

        </div>
      ))}

    </div>

    {/* Closing tagline */}
    <div className="mt-10 flex justify-center">
      <div className="inline-flex flex-wrap items-center justify-center gap-2 rounded-full border border-[#F3D78E] bg-gradient-to-r from-[#4A2F0B] via-[#76501B] to-[#4A2F0B] px-6 py-3 shadow-[0_8px_22px_rgba(55,32,5,0.3)]">
        <Sparkles size={15} className="text-[#FFE09A]" />
        <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#FFF4D6] sm:text-xs">
          PERSONALIZED
        </span>
        <span className="text-[#E8BD62]">•</span>
        <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#FFF4D6] sm:text-xs">
          SYSTEMATIC
        </span>
        <span className="text-[#E8BD62]">•</span>
        <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#FFF4D6] sm:text-xs">
          LAYERED
        </span>
      </div>
    </div>

  </div>
</div>

        {/* PRACTITIONER PROFILE */}
<div className="relative mt-16 overflow-hidden rounded-[28px] border-2 border-[#D4AF62] bg-gradient-to-br from-[#FFE9A8] via-[#E8BD62] to-[#B9852F] p-5 shadow-[0_25px_65px_rgba(0,0,0,0.3)] sm:mt-20 sm:p-8 lg:p-10">

  {/* Golden light effects */}
  <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-[#FFF8DC]/50 blur-3xl" />
  <div className="pointer-events-none absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-[#A66F20]/25 blur-3xl" />

  <div className="relative grid items-center gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-12">

    {/* PORTRAIT */}
    <div className="relative mx-auto w-full max-w-[380px] overflow-hidden rounded-[22px] border-2 border-[#F5D88F] bg-[#3B2915] p-2 shadow-[0_18px_40px_rgba(66,42,12,0.35)]">
      <div className="relative aspect-[4/5] overflow-hidden rounded-[16px]">
        <img
          src="/img1.jpg"
          alt="Acharya Sunil Mahatma"
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#171008]/95 via-transparent to-[#171008]/20" />
        <div className="absolute inset-3 rounded-[12px] border border-[#F5D88F]/60" />

        <div className="absolute left-5 top-5 flex items-center gap-2 text-[#FFF1C8]">
          <Sun size={15} />
          <span className="text-[9px] font-bold uppercase tracking-[0.18em]">
            Tradition · Perspective · Practice
          </span>
        </div>

        <div className="absolute bottom-6 left-5 right-5 text-white">
          <span className="mb-3 block text-[9px] font-bold uppercase tracking-[0.22em] text-[#F5D27D]">
            The practitioner
          </span>
          <h3 className="font-serif text-3xl leading-tight sm:text-4xl">
            Acharya
            <br />
            Sunil Mahatma
          </h3>
          <p className="mt-2 text-xs font-medium leading-5 text-[#FFF0CC]">
            Astro Vastu · Astrology · Numerology · Palmistry
          </p>
        </div>
      </div>
    </div>

    {/* PROFILE DETAILS */}
    <div className="min-w-0">

    <div className="mb-5 inline-flex items-center gap-2 rounded-full border-2 border-[#704914] bg-gradient-to-r from-[#4A2F0B] to-[#76501B] px-4 py-2.5 text-[#FFF4D6] shadow-[0_5px_15px_rgba(55,32,5,0.3)]">
  <Gem size={16} className="shrink-0 text-[#FFE09A]" />
  <span className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-[#FFF4D6]">
    Certified Acharya · MahaVastu
  </span>
</div>

  <span className="mt-1 block font-semibold italic text-[#3D2608]">
    Attentive to the individual.
  </span>


      <p className="mt-5 text-sm font-medium leading-7 text-[#49351A]">
        A MahaVastu consultant, palmist and Certified Acharya,
        Sunil Mahatma brings together Astro Vastu, astrology
        guidance, palmistry and numerology in his consultation
        practice.
      </p>

      <p className="mt-3 text-sm font-medium leading-7 text-[#49351A]">
        His approach begins with understanding the individual,
        followed by the Prakriti of the land and building.
        Recommendations are considered in relation to the
        person, the property and the needs identified during
        assessment.
      </p>

      <div className="my-6 h-px bg-gradient-to-r from-[#80551B] via-[#A77C37]/60 to-transparent" />

      {/* EXPERTISE CARDS */}
      <div className="grid gap-3 sm:grid-cols-3">
        {[
          {
            title: 'Palmistry',
            detail: 'Personal palmistry guidance',
            icon: Hand,
          },
          {
            title: 'MahaVastu',
            detail: 'Certified Acharya',
            icon: Gem,
          },
          {
            title: 'Astro Vastu',
            detail: 'Planetary and numerological guidance',
            icon: Sun,
          },
        ].map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="group rounded-xl border border-[#A8792D] bg-gradient-to-br from-[#FFF5D9] via-[#F4DEA9] to-[#E5C47B] p-4 shadow-[0_6px_18px_rgba(91,61,20,0.15)] transition-all duration-300 hover:-translate-y-1 hover:border-[#704914] hover:shadow-[0_12px_24px_rgba(91,61,20,0.25)]"
            >
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full border border-[#A8792D]/50 bg-[#E9CA83] text-[#593A12]">
                <Icon size={19} />
              </div>

              <h3 className="font-serif text-lg font-bold text-[#3C2911]">
                {item.title}
              </h3>

              <p className="mt-1 text-[11px] font-medium leading-5 text-[#62491F]">
                {item.detail}
              </p>
            </div>
          );
        })}
      </div>

      {/* QUOTE */}
      <blockquote className="mt-6 rounded-r-xl border-l-[3px] border-[#80551B] bg-gradient-to-r from-[#FFF1C9] to-[#EBD092] px-5 py-4 shadow-sm">
        <p className="font-serif text-xl font-medium italic leading-snug text-[#493216] sm:text-2xl">
          Not a standard set of remedies. A considered plan for your space.
        </p>
      </blockquote>

      <div className="mt-5 inline-flex items-center gap-3 rounded-lg border border-[#704914] bg-gradient-to-r from-[#4A2F0B] to-[#76501B] px-4 py-3 text-[#FFF4D6] shadow-md">
  <UserRound size={18} className="shrink-0 text-[#FFE09A]" />
  <span className="text-xs font-extrabold uppercase tracking-[0.12em] text-[#FFF4D6]">
    A personal, assessment-led practice
  </span>
</div>

    </div>
  </div>
</div>

        {/* CLOSING STATEMENT */}
        <div className="mt-14 text-center sm:mt-16">
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-[#B18B50]" />
            <Sparkles size={16} className="text-[#D4AF62]" />
            <span className="h-px w-10 bg-[#B18B50]" />
          </div>

          <p className="mx-auto max-w-2xl font-serif text-xl italic leading-relaxed text-[#F4E5C5] sm:text-2xl">
            A journey that begins with the individual and gradually
            brings together the person, the property and the deeper
            dimensions of traditional guidance.
          </p>
        </div>
      </div>
    </section>
  );
}
