
import { useState } from 'react';
import type { CSSProperties, FormEvent } from 'react';
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Compass,
  Gem,
  Layers3,
  MapPin,
  Orbit,
  Send,
  ShieldCheck,
  Sparkles,
  Sun,
  Wallet,
  Waves,
  X,
  CircleDot,
  ScanLine,
  Flower2,
  Hexagon,
  Circle,
} from 'lucide-react';
const LAYERS = [
  {
    number: '01',
    name: 'Basic Vastu Balancing',
    short: 'Fundamental corrections',
    description:
      'The fundamental Vastu corrections are addressed first, including entrance, toilet-area, drainage and manhole corrections.',
    detail:
      'This layer focuses on essential structural and functional Vastu corrections identified during the property assessment.',
    points: [
      'Entrance correction',
      'Toilet-area correction',
      'Drainage correction',
      'Manhole correction',
      'Other essential structural and functional Vastu corrections',
    ],
    icon: Compass,
    symbol: 'compass',
    color: '#e8dbd8',
    accent: '#526d51',
  },
  {
    number: '02',
    name: 'Whole-Space Energy Balancing',
    short: 'The complete space',
    description:
      'The entire space is assessed and balanced through the strategic placement of Mahavastu metal studs, wherever required.',
    detail:
      'Metal studs are considered for selected locations based on the assessment and requirements of the property.',
    points: [
      'Whole-space assessment',
      'Identification of relevant locations',
      'Strategic placement of Mahavastu metal studs wherever required',
    ],
    icon: CircleDot,
    symbol: 'orbit',
    color: '#dfeaf0',
    accent: '#496a7d',
  },
  {
    number: '03',
    name: 'Vastu Mandal & Devata Correction',
    short: 'Mandal & divine energies',
    description:
      'The Vastu Mandal Devtas are assessed and appropriate corrections or installations are carried out wherever required.',
    detail:
      'This layer considers the Vastu Mandal framework and the relevant Devta corrections or installations identified during assessment.',
    points: [
      'Vastu Mandal assessment',
      'Devta identification',
      'Appropriate corrections',
      'Required installations',
    ],
    icon: Flower2,
    symbol: 'mandala',
    color: '#eee3ce',
    accent: '#987440',
  },
  {
    number: '04',
    name: 'Horoscope-Based Precious Stone Dust',
    short: 'Individual planetary context',
    description:
      'Precious stone dust is installed at selected locations according to the individual’s horoscope and planetary requirements.',
    detail:
      'The selection and placement of precious stone dust are considered in relation to the individual horoscope and the planetary requirements identified during consultation.',
    points: [
      'Horoscope analysis',
      'Planetary requirements',
      'Selection of precious stone dust',
      'Installation at selected locations',
    ],
    icon: Gem,
    symbol: 'gem',
    color: '#e9def0',
    accent: '#80618e',
  },
  {
    number: '05',
    name: 'Idols & Picture Frame Placement',
    short: 'Divine forms & placement',
    description:
      'Appropriate idols, divine representations and picture frames are advised and positioned according to the requirements of the individual and the space.',
    detail:
      'Recommendations consider the individual, the property and the intended placement within the space.',
    points: [
      'Idol placement',
      'Divine representations',
      'Picture frame placement',
      'Personalised placement guidance',
    ],
    icon: Sun,
    symbol: 'sun',
    color: '#f2dfd1',
    accent: '#a06c4e',
  },
  {
    number: '06',
    name: 'Palmistry-Based Directional Correction',
    short: 'Palmistry & direction',
    description:
      'Based on palm reading, suitable products are advised for placement in specific directions to create a personalised directional balance.',
    detail:
      'Palmistry is incorporated into the consultation to guide suitable product recommendations and their directional placement.',
    points: [
      'Palm reading',
      'Personalised product recommendations',
      'Specific directional placement',
      'Individual directional balancing',
    ],
    icon: Waves,
    symbol: 'waves',
    color: '#dce9e6',
    accent: '#4e7770',
  },
  {
    number: '07',
    name: 'Advanced Planetary, Tantric & Numerological Balancing',
    short: 'Advanced personalised balancing',
    description:
      'Advanced corrections may incorporate Navadurga, the 10 Mahavidya, precious stone dust, metals, gemstones and numerology.',
    detail:
      'Where appropriate, gemstones may be recommended as rings or pendants based on the individual’s numerological requirements. House and mobile number balancing can also be approached through suitable colour combinations without necessarily changing the existing numbers.',
    points: [
      '9 Durga (Navadurga)',
      '10 Mahavidya',
      'Precious stone dust',
      'Metals and gemstones',
      'Numerological balancing',
      'Gemstones as rings or pendants, where appropriate',
      'House number colour correction',
      'Mobile number colour correction',
      'Mobile back-cover colour',
      'Mobile screen and wallpaper colour',
      'Other relevant colour applications',
    ],
    icon: Orbit,
    symbol: 'star',
    color: '#e7e1d0',
    accent: '#806020',
  },
];
const JOURNEY = [
  {
    number: '01',
    title: 'Begin with you',
    description: 'Horoscope and Prakriti establish the personal context.',
    icon: Sparkles,
  },
  {
    number: '02',
    title: 'Read the property',
    description: 'Site visits and assessment consider the land and building.',
    icon: MapPin,
  },
  {
    number: '03',
    title: 'Understand the plan',
    description: 'Receive written findings and a personalised material document.',
    icon: ScanLine,
  },
  {
    number: '04',
    title: 'Work through the layers',
    description: 'The seven layers guide the recommended corrections.',
    icon: Layers3,
  },
];

const FAQS = [
  {
    question: 'Why does the consultation begin with me?',
    answer:
      'The approach begins with your horoscope and Prakriti before considering the land and building. This establishes the personal context for the assessment and recommendations.',
  },
  {
    question: 'How many visits are included?',
    answer:
      'The consultation includes 7–10 site visits, according to property needs. The schedule is considered in relation to the property and the assessment.',
  },
  {
    question: 'Do I need to change my house or mobile number?',
    answer:
      'No. The described numerology approach uses colour balancing for house or mobile numbers, phone covers, screens and wallpapers without changing the numbers themselves.',
  },
  {
    question: 'Are materials part of the ₹75,000 fee?',
    answer:
      'No. The consultation fee is ₹75,000. Materials are estimated separately at ₹55,000–₹60,000 depending on the property, and must be purchased separately online, strictly from Mahavastu.',
  },
];

function MandalaArtwork() {
  return (
    <svg
      viewBox="0 0 500 500"
      role="img"
      className="mandala-svg h-full w-full"
      fill="none"
    >
      <defs>
        <linearGradient id="mandalaGold" x1="40" y1="20" x2="460" y2="480">
          <stop offset="0%" stopColor="#d7c195" />
          <stop offset="50%" stopColor="#a98449" />
          <stop offset="100%" stopColor="#d9c9a4" />
        </linearGradient>
      </defs>

      <g stroke="url(#mandalaGold)" strokeWidth="1.1">
        <circle cx="250" cy="250" r="224" opacity=".65" />
        <circle cx="250" cy="250" r="208" opacity=".55" />
        <circle cx="250" cy="250" r="182" opacity=".8" />
        <circle cx="250" cy="250" r="155" opacity=".65" />
        <circle cx="250" cy="250" r="112" opacity=".7" />
        <circle cx="250" cy="250" r="70" opacity=".9" />

        <rect x="68" y="68" width="364" height="364" opacity=".8" />
        <rect x="94" y="94" width="312" height="312" opacity=".8" />
        <rect x="132" y="132" width="236" height="236" opacity=".8" />
        <rect x="180" y="180" width="140" height="140" opacity=".8" />

        <path d="M250 26V474M26 250H474" />
        <path d="M91 91L409 409M409 91L91 409" opacity=".65" />
        <path d="M250 68L432 250L250 432L68 250Z" opacity=".7" />

        {Array.from({ length: 16 }, (_, index) => {
          const angle = (index * 360) / 16;
          return (
            <g key={index} transform={`rotate(${angle} 250 250)`}>
              <path d="M250 26L264 52L250 78L236 52Z" opacity=".75" />
              <circle cx="250" cy="43" r="3" fill="#b18b50" stroke="none" />
            </g>
          );
        })}
      </g>

      <circle cx="250" cy="250" r="43" fill="#f7f2e6" stroke="#b18b50" />
      <circle cx="250" cy="250" r="33" stroke="#b18b50" strokeDasharray="2 5" />
      <path
        d="M250 225L257 243L275 250L257 257L250 275L243 257L225 250L243 243Z"
        fill="#b18b50"
        opacity=".9"
      />
      <circle cx="250" cy="250" r="6" fill="#f7f2e6" />
    </svg>
  );
}

function LayerArtwork({ symbol }: { symbol: string }) {
  if (symbol === 'mandala') {
    return (
      <svg viewBox="0 0 200 200" className="layer-art-svg" fill="none">
        {Array.from({ length: 12 }, (_, i) => (
          <ellipse
            key={i}
            cx="100"
            cy="63"
            rx="19"
            ry="47"
            transform={`rotate(${i * 30} 100 100)`}
            stroke="currentColor"
            strokeWidth="1.1"
          />
        ))}
        <circle cx="100" cy="100" r="58" stroke="currentColor" />
        <circle cx="100" cy="100" r="37" stroke="currentColor" />
        <circle cx="100" cy="100" r="13" fill="currentColor" />
      </svg>
    );
  }

  if (symbol === 'gem') {
    return (
      <svg viewBox="0 0 200 200" className="layer-art-svg" fill="none">
        <path d="M100 20L157 72L126 164H74L43 72Z" stroke="currentColor" strokeWidth="1.5" />
        <path d="M43 72H157M100 20L79 72L74 164M100 20L121 72L126 164M79 72L100 164L121 72" stroke="currentColor" strokeWidth="1.2" />
        <path d="M79 72L100 20L121 72Z" fill="currentColor" opacity=".12" />
      </svg>
    );
  }

  if (symbol === 'sun' || symbol === 'star') {
    return (
      <svg viewBox="0 0 200 200" className="layer-art-svg" fill="none">
        <circle cx="100" cy="100" r="39" stroke="currentColor" />
        <circle cx="100" cy="100" r="25" stroke="currentColor" />
        {Array.from({ length: 16 }, (_, i) => (
          <path
            key={i}
            d="M100 18V44"
            stroke="currentColor"
            strokeWidth="1.5"
            transform={`rotate(${i * 22.5} 100 100)`}
          />
        ))}
        <circle cx="100" cy="100" r="8" fill="currentColor" />
      </svg>
    );
  }

  if (symbol === 'waves') {
    return (
      <svg viewBox="0 0 200 200" className="layer-art-svg" fill="none">
        {[0, 1, 2, 3, 4].map((i) => (
          <ellipse
            key={i}
            cx="100"
            cy="100"
            rx={30 + i * 15}
            ry={20 + i * 11}
            stroke="currentColor"
            strokeWidth="1.2"
            transform={`rotate(${i % 2 === 0 ? -22 : 22} 100 100)`}
          />
        ))}
        <circle cx="100" cy="100" r="5" fill="currentColor" />
      </svg>
    );
  }

  if (symbol === 'orbit') {
    return (
      <svg viewBox="0 0 200 200" className="layer-art-svg" fill="none">
        <circle cx="100" cy="100" r="13" fill="currentColor" />
        {[0, 60, 120].map((angle) => (
          <ellipse
            key={angle}
            cx="100"
            cy="100"
            rx="37"
            ry="72"
            transform={`rotate(${angle} 100 100)`}
            stroke="currentColor"
            strokeWidth="1.2"
          />
        ))}
        <circle cx="100" cy="28" r="4" fill="currentColor" />
        <circle cx="38" cy="136" r="4" fill="currentColor" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 200 200" className="layer-art-svg" fill="none">
      <circle cx="100" cy="100" r="65" stroke="currentColor" />
      <circle cx="100" cy="100" r="46" stroke="currentColor" />
      <path
        d="M100 35L116 84L165 100L116 116L100 165L84 116L35 100L84 84Z"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <circle cx="100" cy="100" r="12" fill="currentColor" />
    </svg>
  );
}

export default function SevenLayersSection() {
  const [activeLayer, setActiveLayer] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    propertyType: '',
    location: '',
    details: '',
  });
  const [formMessage, setFormMessage] = useState('');

  const active = LAYERS[activeLayer];
  const ActiveIcon = active.icon;

  function updateField(
    field: keyof typeof formData,
    value: string,
  ) {
    setFormData((current) => ({ ...current, [field]: value }));
  }

  function handleEnquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const message = [
      'CONSULTATION ENQUIRY — ACHARYA SUNIL MAHATMA',
      '',
      `Name: ${formData.name}`,
      `Phone or email: ${formData.contact}`,
      `Property type: ${formData.propertyType}`,
      `Property location: ${formData.location}`,
      `Property details: ${formData.details || 'Not provided'}`,
      '',
      'Consultation: 7-Layer Astro Vastu — ₹75,000',
      
    ].join('\n');

    setFormMessage(message);
  }

  return (
  <section
  id="seven-layers"
  className="seven-layers-section relative isolate overflow-hidden px-5 pt-8 pb-12 sm:px-8 sm:pt-12 sm:pb-16 lg:px-12 lg:pt-16 lg:pb-20"
>
   
      <div className="mx-auto max-w-7xl">
        
        {/* OPENING */}
        <div className="seven-intro grid items-center gap-12 lg:grid-cols-[1fr_0.85fr] lg:gap-20">
          <div>
            <div className="mb-6 inline-flex items-center gap-3">
              <span className="h-px w-10 bg-[#b18b50]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-red">
                The balancing framework
              </span>
            </div>
<p className="text-sm font-bold uppercase tracking-[0.20em] text-[#D4AF62] sm:text-base">
  THE 7-LAYER ASTRO VASTU BALANCING PROCESS
</p>
            <p className="mt-7 max-w-2xl text-base leading-8 text-white sm:text-lg">
              In Vastu tradition, a plot is understood through 16 directional
              zones around a centre, the Brahmasthan, and the five elements:
              earth, water, fire, air and space. The centre is traditionally
              kept open and light, and these principles are interpreted in
              relation to your actual building.
            </p>

            <p className="mt-4 max-w-2xl text-sm leading-7 font-bold text-[#D4AF62]">
              Each layer builds on the foundation assessment. The choice of
              corrections and materials is specific to the findings for your
              property.
            </p>

            <a
              href="#layer-journey"
              className="group mt-8 inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[#D4AF62]"
            >
              Explore the seven layers
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#b18b50]/50 transition group-hover:translate-y-1 group-hover:bg-[#e9dfca]">
                <ArrowDown size={15} />
              </span>
            </a>
          </div>

          {/* MANDALA ART */}
          <div className="mandala-scene relative mx-auto flex aspect-square w-full max-w-[510px] items-center justify-center">
            <div className="mandala-halo absolute inset-[7%] rounded-full border border-[#b18b50]/25" />
            <div className="mandala-halo mandala-halo-two absolute inset-[1%] rounded-full border border-dashed border-[#b18b50]/25" />
            <div className="mandala-orbit absolute inset-[-4%] rounded-full border border-[#a8bdb6]/60" />
            <div className="mandala-orbit mandala-orbit-two absolute inset-[14%] rounded-full border border-[#b18b50]/20" />

            <div className="mandala-core relative z-10 h-[88%] w-[88%] rounded-full border border-[#d6c5a0]/65 bg-[radial-gradient(circle_at_45%_35%,rgba(255,255,255,0.94),rgba(246,239,223,0.62)_55%,rgba(226,231,219,0.52))] p-4 shadow-[0_30px_90px_rgba(98,79,44,0.10)] sm:p-6">
              <MandalaArtwork />
            </div>

            <div className="mandala-label absolute left-0 top-[16%] z-20 rounded-xl border border-[#d7cbb5] bg-[#faf7ef]/90 px-4 py-3 shadow-lg backdrop-blur-md">
              <span className="block text-[8px] font-bold uppercase tracking-[0.2em] text-[#927444]">
                The centre
              </span>
              <span className="mt-1 block font-serif text-lg text-[#292d24]">
                Brahmasthan
              </span>
            </div>

            <div className="mandala-label absolute bottom-[12%] right-0 z-20 rounded-xl border border-[#d7cbb5] bg-[#faf7ef]/90 px-4 py-3 shadow-lg backdrop-blur-md">
              <span className="block text-[8px] font-bold uppercase tracking-[0.2em] text-[#927444]">
                The framework
              </span>
              <span className="mt-1 block font-serif text-lg text-[#292d24]">
                16 directions
              </span>
            </div>

            <div className="absolute right-[12%] top-[8%] h-3 w-3 rounded-full border border-[#b18b50] bg-[#f8f3e7] shadow-[0_0_20px_rgba(177,139,80,0.6)]" />
            <div className="absolute bottom-[15%] left-[11%] h-2 w-2 rounded-full bg-[#7d9b8e]" />
          </div>
        </div>

      

        {/* INTERACTIVE LAYER NAVIGATION */}
        <div id="layer-journey" className="mt-12 scroll-mt-24 sm:mt-16 lg:mt-20">
          <div className="mb-9 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#D4AF62]">
                The seven-layer journey
              </span>
              <h3 className="mt-4 font-serif text-4xl font-medium tracking-tight text-white sm:text-5xl lg:text-6xl">
                One layer at a time.
              </h3>
            </div>
            <p className="max-w-md text-sm leading-7 text-white">
              Select a layer to explore its role in the consultation. Each
              recommendation depends on the property assessment.
            </p>
          </div>

          {/* Layer selector — not a card grid */}
          <div className="layer-selector" role="tablist" aria-label="Seven balancing layers">
            {LAYERS.map((layer, index) => {
              const Icon = layer.icon;
              const isActive = activeLayer === index;

              return (
                <button
                  type="button"
                  key={layer.number}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls="active-layer-panel"
                  onClick={() => setActiveLayer(index)}
                  className={`layer-selector-item ${isActive ? 'is-active' : ''}`}
                  style={{
                    '--layer-accent': layer.accent,
                    '--layer-tint': layer.color,
                  } as CSSProperties}
                >
                  <span className="layer-selector-number">{layer.number}</span>
                  <span className="layer-selector-icon">
                    <Icon size={18} strokeWidth={1.5} />
                  </span>
                  <span className="layer-selector-title">{layer.name}</span>
                  <ArrowUpRight size={14} className="layer-selector-arrow" />
                </button>
              );
            })}
          </div>

          {/* Active layer feature */}
          <div
            id="active-layer-panel"
            role="tabpanel"
            key={active.number}
            className="active-layer-panel"
            style={{
              '--layer-accent': active.accent,
              '--layer-tint': active.color,
            } as React.CSSProperties}
          >
            <div className="active-layer-art">
              <div className="active-layer-art-ring" />
              <div className="active-layer-art-ring active-layer-art-ring-two" />
              <div className="active-layer-art-disc">
                <LayerArtwork symbol={active.symbol} />
              </div>
              <span className="active-layer-art-index">{active.number}</span>
              <span className="active-layer-art-caption">A layer of the process</span>
            </div>

            <div className="active-layer-copy">
              <div className="mb-5 flex items-center gap-3">
  <span className="h-[2px] w-9 rounded-full bg-[#B18B50]" />

  <span className="inline-flex items-center rounded-full border border-[#B18B50]/50 bg-[#F5EBD4] px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#503817] shadow-sm">
    Layer {active.number} / 07
  </span>
</div>

              <h4 className="font-serif text-4xl font-medium leading-[1.05] tracking-tight text-[#292d24] sm:text-5xl lg:text-6xl">
                {active.name}
              </h4>

              <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--layer-accent)]">
                {active.short}
              </p>

              <p className="mt-7 max-w-2xl text-base leading-8 text-[#55584b] sm:text-lg">
                {active.description}
              </p>
                    <div className="mt-6 border-l-2 border-[var(--layer-accent)]/50 pl-5">
  <p className="layer-detail-text">
    {active.detail}
  </p>
</div>

              <div className="mt-9 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() =>
                    setActiveLayer((current) => (current + 6) % 7)
                  }
                  className="layer-step-button"
                  aria-label="Previous layer"
                >
                  <ArrowRight size={16} className="rotate-180" />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setActiveLayer((current) => (current + 1) % 7)
                  }
                  className="layer-next-button"
                >
                  Next layer
                  <ArrowRight size={15} />
                </button>
              <span className="ml-2 text-[11px] font-extrabold tracking-[0.16em] text-[#3D2A12]">
  {String(activeLayer + 1).padStart(2, '0')} OF 07
</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* STRICTLY MAHAVASTU PRODUCTS */}
<div className="relative mx-auto mt-14 max-w-5xl overflow-hidden rounded-2xl border border-[#C49A4A] bg-gradient-to-br from-[#FFF3D2] via-[#E8C779] to-[#C99A45] px-6 py-8 text-center shadow-[0_15px_40px_rgba(0,0,0,0.2)] sm:px-10 sm:py-10">

  <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/30 blur-3xl" />

  <div className="relative">
    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-[#80551B] bg-gradient-to-br from-[#4A2F0B] to-[#80551B] text-[#FFE9A8] shadow-lg">
      <Gem size={23} />
    </div>

    <p className="text-[10px] font-extrabold uppercase tracking-[0.28em] text-[#765016] sm:text-xs">
      Product & Material Commitment
    </p>

    <h3 className="mt-3 font-serif text-2xl font-bold tracking-wide text-[#241505] sm:text-3xl">
      STRICTLY MAHAVASTU PRODUCTS
    </h3>

    <div className="mx-auto my-5 h-[2px] w-16 rounded-full bg-[#80551B]" />

    <p className="mx-auto max-w-2xl text-sm font-bold leading-7 text-[#38250D] sm:text-base">
      ALL PRODUCTS & CORRECTIVE MATERIALS USED IN THIS PROCESS
      ARE STRICTLY FROM MAHAVASTU.
    </p>

    <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-[#50391C]">
      The products and corrective elements are selected according to
      the specific requirements of the individual, property and consultation.
    </p>
  </div>
</div>
    </section>
  );
}
