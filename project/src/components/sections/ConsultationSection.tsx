
import { useState } from 'react';
import type { FormEvent } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Gem,
  Layers3,
  MapPin,
  ScanLine,
  ShieldCheck,
  Sparkles,
  Wallet,
  Send,
} from 'lucide-react';

const JOURNEY = [
  {
    number: '01',
    title: 'Begin with you',
    description:
      'Horoscope and Prakriti establish the personal context for the consultation.',
    icon: Sparkles,
  },
  {
    number: '02',
    title: 'Read the property',
    description:
      'Site visits and assessment consider the land, building and directional layout.',
    icon: MapPin,
  },
  {
    number: '03',
    title: 'Understand the plan',
    description:
      'Receive written findings and a personalised document outlining recommendations.',
    icon: ScanLine,
  },
  {
    number: '04',
    title: 'Work through the layers',
    description:
      'The seven layers guide the recommended corrections for your property.',
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
    question: 'How many site visits are included?',
    answer:
      'The consultation includes 7–10 site visits, according to property needs. The schedule depends on the property and the assessment.',
  },
  {
    question: 'Do I need to change my house or mobile number?',
    answer:
      'No. The described numerology approach considers colour balancing for relevant items without changing the house or mobile number itself.',
  },
  {
    question: 'Are materials included in the consultation fee?',
    answer:
      'No. The consultation fee is ₹75,000. Materials are estimated separately at ₹55,000–₹60,000, depending on the property, and must be purchased separately online from Mahavastu.',
  },
];

export default function ConsultationPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    propertyType: '',
    location: '',
    details: '',
  });
  const [formMessage, setFormMessage] = useState('');

  function updateField(
    field: keyof typeof formData,
    value: string,
  ) {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));
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
      'Consultation fee: ₹75,000',
      'Estimated materials: ₹55,000–₹60,000, charged separately.',
    ].join('\n');

    setFormMessage(message);
  }

  return (
    <>

        {/* PAGE INTRODUCTION */}
        

        {/* FOUR-STAGE JOURNEY */}
        <section className="mt-24 sm:mt-32 lg:mt-40">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#947341]">
              The consultation process
            </span>
          </div>

          <div className="consultation-journey mt-16 grid gap-9 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {JOURNEY.map((step, index) => {
              const Icon = step.icon;

              return (
                <div className="journey-step" key={step.number}>
                  <div className="journey-step-top">
                    <span className="journey-step-number">
                      {step.number}
                    </span>

                    <span className="journey-step-icon">
                      <Icon size={21} strokeWidth={1.35} />
                    </span>

                    {index !== JOURNEY.length - 1 && (
                      <span
                        className="journey-connector"
                        aria-hidden="true"
                      >
                        <ArrowRight size={17} />
                      </span>
                    )}
                  </div>

                  <h3 className="mt-6 font-serif text-2xl font-medium sm:text-3xl">
                    {step.title}
                  </h3>

                  <p className="mt-3 max-w-xs text-sm leading-7 text-[#77776c]">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* PRICING FEATURE */}
        <section
          id="consultation-fee"
          className="consultation-pricing mt-28 scroll-mt-24 sm:mt-36 lg:mt-44"
        >
          <div className="pricing-topline">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em]">
              The complete consultation
            </span>

            <span className="pricing-topline-mark">
              <Sparkles size={16} />
              Personalised assessment
            </span>
          </div>

          <div className="grid lg:grid-cols-[1.03fr_0.97fr]">
            <div className="pricing-main">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#e4c997]">
                Complete 7-layer Astro Vastu
              </p>

              <h2 className="mt-5 max-w-xl font-serif text-4xl font-medium leading-[1.05] tracking-tight text-[#fff9ed] sm:text-5xl lg:text-6xl">
                A personal plan for your property.
              </h2>

              <p className="mt-5 max-w-xl text-sm leading-7 text-white/70 sm:text-base">
                The 7-Layer Astro Vastu Balancing Process brings the
                foundation assessment, site visits and personalised
                recommendations into one consultation.
              </p>

              <div className="mt-10 flex flex-wrap items-end gap-x-4 gap-y-1">
                <span className="font-serif text-6xl tracking-tight text-[#f2d7a4] sm:text-7xl">
                  ₹75,000
                </span>

                <span className="pb-2 text-[10px] uppercase tracking-[0.18em] text-white/65">
                  Consultation fee
                </span>
              </div>

              <a href="#seven-layer-enquiry" className="pricing-cta mt-9">
                Enquire about your property
                <ArrowUpRight size={17} />
              </a>

              <div
                className="pricing-orbit pricing-orbit-one"
                aria-hidden="true"
              />
              <div
                className="pricing-orbit pricing-orbit-two"
                aria-hidden="true"
              />
            </div>

            <div className="pricing-inclusions">
              <span className="text-[10px] font-bold uppercase tracking-[0.23em] text-[#947341]">
                Personal attention. A clearly defined engagement.
              </span>

              <ul className="mt-7 space-y-5">
                {[
                  'All four foundation assessment steps',
                  'All seven balancing layers',
                  '7–10 site visits, according to property needs',
                  'Written findings and a personalised material document',
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm leading-6 text-[#55584b]"
                  >
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#e5eadf] text-[#536b4f]">
                      <Check size={12} strokeWidth={2.2} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-9 border-t border-[#d9cfbc] pt-7">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#eae1d0] text-[#8d7042]">
                    <Wallet size={19} strokeWidth={1.4} />
                  </span>

                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#947341]">
                      Estimated material cost
                    </p>

                    <p className="mt-1 font-serif text-3xl font-medium sm:text-4xl">
                      ₹55,000–₹60,000
                    </p>
                  </div>
                </div>

                <p className="mt-4 text-sm leading-7 text-[#77776c]">
                  Materials are not included in the consultation fee. The
                  estimate depends on the property. Materials must be
                  purchased separately online, strictly from Mahavastu.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* WHAT THE CLIENT RECEIVES */}
        <section className="deliverables-row mt-12 grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-center">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.23em] text-[#947341]">
              Your consultation documents
            </span>

            <h2 className="mt-4 font-serif text-3xl font-medium leading-tight sm:text-4xl">
              Clarity before you begin.
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="deliverable-item">
              <ShieldCheck size={20} strokeWidth={1.4} />

              <div>
                <h3 className="font-serif text-xl">
                  Written findings
                </h3>

                <p className="mt-2 text-sm leading-6 text-[#77776c]">
                  Your written findings explain the personal plan and the
                  reason for each recommended remedy.
                </p>
              </div>
            </div>

            <div className="deliverable-item">
              <Layers3 size={20} strokeWidth={1.4} />

              <div>
                <h3 className="font-serif text-xl">
                  Material document
                </h3>

                <p className="mt-2 text-sm leading-6 text-[#77776c]">
                  A tailored material document identifies the materials
                  and placements recommended for your property.
                </p>
              </div>
            </div>
          </div>

          <p className="text-sm leading-7 text-[#77776c] lg:col-start-2">
            Selections may include metal studs and strips, devta items,
            precious stone dust as per your astrological chart,
            flooring-specific remedies, idols and room-appropriate frames.
          </p>
        </section>

        {/* FAQ */}
        <section className="mt-28 grid gap-10 lg:mt-36 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.23em] text-[#947341]">
              Common questions
            </span>

            <h2 className="mt-5 font-serif text-4xl font-medium leading-tight tracking-tight sm:text-5xl">
              Clarity before you begin.
            </h2>

            <p className="mt-5 max-w-sm text-sm leading-7 text-[#77776c]">
              Understand the scope, visits and materials before enquiring
              about a consultation.
            </p>

            <div className="mt-7 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[#947341]">
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#b18b50]/40">
                <Gem size={16} />
              </span>
              <span>Personalised consultation</span>
            </div>
          </div>

          <div className="faq-list">
            {FAQS.map((faq, index) => {
              const isOpen = openFaq === index;

              return (
                <div
                  className={`faq-item ${isOpen ? 'faq-open' : ''}`}
                  key={faq.question}
                >
                  <button
                    type="button"
                    className="faq-question"
                    aria-expanded={isOpen}
                    onClick={() =>
                      setOpenFaq(isOpen ? null : index)
                    }
                  >
                    <span className="faq-index">
                      {String(index + 1).padStart(2, '0')}
                    </span>

                    <span className="faq-question-text">
                      {faq.question}
                    </span>

                    <span className="faq-toggle">
                      <ChevronDown size={17} />
                    </span>
                  </button>

                  <div
                    className="faq-answer-wrap"
                    aria-hidden={!isOpen}
                  >
                    <div className="faq-answer">
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

       

        {/* DISCLAIMER */}
        <footer className="mt-12 border-t border-[#ded5c5] pt-6">
          <p className="mx-auto max-w-4xl text-center text-xs leading-6 text-[#858274]">
            Astro Vastu, astrology and numerology are traditional spiritual
            practices. Recommendations are not a substitute for medical,
            financial, architectural, engineering or other professional
            advice. Outcomes are not guaranteed.
          </p>
        </footer>
      </>
  );
}
