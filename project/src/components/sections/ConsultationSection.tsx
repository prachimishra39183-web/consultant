
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
   Clock,
  CreditCard,
  CalendarDays,
  X,
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
  const [enquiryId, setEnquiryId] = useState<string | null>(null);
const [submitting, setSubmitting] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    propertyType: '',
    location: '',
    details: '',
  });
  const [formMessage, setFormMessage] = useState('');
  const [bookingOpen, setBookingOpen] = useState(false);
const [bookingType, setBookingType] = useState<'regular' | 'urgent'>('regular');
const [paymentVerified, setPaymentVerified] = useState(false);
const [selectedSlot, setSelectedSlot] = useState('');

  function updateField(
    field: keyof typeof formData,
    value: string,
  ) {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));
  }

  
async function handleEnquiry(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();
  setSubmitting(true);
  setFormMessage('');

  try {
    const response = await fetch('/api/consultation/enquiry', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Enquiry submission failed.');
    }

    setEnquiryId(data.enquiry.id);

    setFormMessage('Your enquiry has been submitted successfully.');

  } catch (error) {
    setFormMessage(
      error instanceof Error ? error.message : 'Something went wrong.'
    );
  } finally {
    setSubmitting(false);
  }
}


async function createConsultationBooking() {
  if (!enquiryId) {
    alert('Please submit your enquiry first.');
    return;
  }

  try {
    const response = await fetch('/api/consultation/booking', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        enquiryId,
        bookingType,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Booking creation failed.');
    }

    return data.booking;

  } catch (error) {
    alert(
      error instanceof Error ? error.message : 'Unable to create booking.'
    );
    return null;
  }
}

  return (
    <>

        {/* PAGE INTRODUCTION */}
        

        {/* FOUR-STAGE JOURNEY */}
        <section className="mt-4 sm:mt-5 lg:mt-2">
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
          id="consultation"
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

              <button
  type="button"
  onClick={() => setBookingOpen(true)}
  className="pricing-cta mt-9"
>
  Book a consultation
  <ArrowUpRight size={17} />
</button>
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
                  
                  
{bookingOpen && (
  <div
    className="fixed inset-0 z-[999] flex items-center justify-center overflow-y-auto bg-[#211b20]/70 p-4 backdrop-blur-md"
    onClick={() => setBookingOpen(false)}
  >
    <div
      className="relative my-auto w-full max-w-2xl overflow-hidden rounded-[28px] border border-[#dfc9a9] bg-[#F8F5EC] text-[#382B36] shadow-2xl"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div className="relative border-b border-[#e4d6c3] px-6 py-7 sm:px-9">
        <button
          type="button"
          onClick={() => setBookingOpen(false)}
          aria-label="Close booking form"
          className="absolute right-5 top-5 rounded-full bg-white p-2 text-[#493B30] shadow-sm transition hover:bg-[#eaded0]"
        >
          <X size={18} />
        </button>

        <span className="text-[10px] font-bold uppercase tracking-[.25em] text-[#9B704D]">
          Private consultation
        </span>

        <h2 className="mt-3 pr-8 font-serif text-3xl sm:text-4xl">
          Reserve your session.
        </h2>

        <p className="mt-3 max-w-lg text-sm leading-6 text-[#76665D]">
          Choose your preferred consultation, complete payment, and then
          select an available date and time.
        </p>

        <div className="mt-6 grid grid-cols-3 gap-2">
          {[
            { n: '01', label: 'Choose' },
            { n: '02', label: 'Payment' },
            { n: '03', label: 'Book slot' },
          ].map((step, i) => (
            <div key={step.n} className="rounded-xl bg-[#EDE2D6] p-3">
              <span className="text-[10px] font-bold text-[#9B704D]">
                {step.n}
              </span>
              <p className="mt-1 text-xs font-semibold">{step.label}</p>
              <div
                className={`mt-3 h-1 rounded-full ${
                  i === 0 || (i === 1 && paymentVerified)
                    ? 'bg-[#A77C5C]'
                    : 'bg-[#D9CABC]'
                }`}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-7 p-6 sm:p-9">
        {/* Choose consultation */}
        <div>
          <h3 className="text-sm font-bold">Choose your consultation</h3>
          <p className="mt-1 text-xs text-[#76665D]">
            Select the option that suits your schedule.
          </p>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => setBookingType('regular')}
              className={`rounded-2xl border p-5 text-left transition ${
                bookingType === 'regular'
                  ? 'border-[#A77C5C] bg-[#E8D9D2] shadow-md ring-1 ring-[#A77C5C]/20'
                  : 'border-[#E0D2C2] bg-[#FFFEFA] hover:border-[#B68B55]'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <Clock size={20} className="text-[#946746]" />
                {bookingType === 'regular' && (
                  <Check size={17} className="text-[#80583F]" />
                )}
              </div>
              <p className="mt-4 text-sm font-bold">Regular consultation</p>
              <p className="mt-2 font-serif text-3xl">₹5,100</p>
              <p className="mt-2 text-xs leading-5 text-[#76665D]">
                Standard appointment scheduling.
              </p>
            </button>

            <button
              type="button"
              onClick={() => setBookingType('urgent')}
              className={`rounded-2xl border p-5 text-left transition ${
                bookingType === 'urgent'
                  ? 'border-[#A77C5C] bg-[#E8D9D2] shadow-md ring-1 ring-[#A77C5C]/20'
                  : 'border-[#E0D2C2] bg-[#FFFEFA] hover:border-[#B68B55]'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <ShieldCheck size={20} className="text-[#946746]" />
                {bookingType === 'urgent' && (
                  <Check size={17} className="text-[#80583F]" />
                )}
              </div>
              <p className="mt-4 text-sm font-bold">Urgent consultation</p>
              <p className="mt-2 font-serif text-3xl">₹6,100</p>
              <p className="mt-2 text-xs leading-5 text-[#76665D]">
                Priority scheduling, subject to availability.
              </p>
            </button>
          </div>
        </div>

        {/* Payment */}
            
{/* PAYMENT PANEL */}
<div className="rounded-2xl border border-[#DCC9AA] bg-[#F0E5D8] p-5 sm:p-6">
  <div className="flex items-center gap-3">
    <div className="grid h-11 w-11 place-items-center rounded-xl bg-[#E0CCB3] text-[#80583F]">
      <CreditCard size={21} />
    </div>

    <div className="flex-1">
      <p className="text-sm font-bold">Scan & Pay</p>
      <p className="mt-1 text-xs text-[#76665D]">
        {bookingType === 'urgent'
          ? 'Urgent consultation'
          : 'Regular consultation'}
      </p>
    </div>

    <p className="font-serif text-2xl">
      ₹{bookingType === 'urgent' ? '6,100' : '5,100'}
    </p>
  </div>

  <div className="mt-6 rounded-2xl border border-[#E5D7C6] bg-[#FFFEFA] p-5 text-center">
    <p className="text-xs font-semibold text-[#493B30]">
      Scan this QR code using any UPI app
    </p>

    <img
      src="/qr.jpeg"
      alt="UPI payment QR code"
      className="mx-auto mt-4 h-52 w-52 rounded-xl border border-[#E5D7C6] object-contain p-2"
    />

    <p className="mt-4 font-serif text-3xl text-[#493B30]">
      ₹{bookingType === 'urgent' ? '6,100' : '5,100'}
    </p>

    <p className="mt-2 text-xs leading-5 text-[#76665D]">
      Pay the exact amount shown above. Verify the payment before booking your appointment.
    </p>
  </div>

  <button
    type="button"
    onClick={() => {
      alert(
        'Payment verification must be connected before the calendar can be unlocked.'
      );
    }}
    className="mt-5 flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-[#B68A68] to-[#946746] px-5 py-4 text-sm font-bold text-white shadow-[0_5px_0_#704D37] transition hover:brightness-105"
  >
    I have completed payment
    <ArrowUpRight size={17} />
  </button>

  <p className="mt-4 text-center text-[11px] text-[#76665D]">
    Your appointment calendar should unlock only after payment is verified.
  </p>
</div>

        {/* Calendar: locked until verified payment */}
        <div
          className={`rounded-2xl border p-5 sm:p-6 ${
            paymentVerified
              ? 'border-[#C7AE8B] bg-[#FFFEFA]'
              : 'border-dashed border-[#D4BBAE] bg-[#E8D9D2]/60'
          }`}
        >
          <div className="flex items-center gap-3">
            <CalendarDays size={23} className="text-[#946746]" />
            <div>
              <h3 className="text-sm font-bold">Choose your date and time</h3>
              <p className="mt-1 text-xs text-[#76665D]">
                {paymentVerified
                  ? 'Select an available appointment slot.'
                  : 'Available after payment verification.'}
              </p>
            </div>
          </div>

          {!paymentVerified ? (
            <div className="mt-5 rounded-xl border border-[#D4BBAE] bg-[#F8F5EC] p-5 text-center">
              <CalendarDays
                size={30}
                className="mx-auto text-[#A77C5C]"
              />
              <p className="mt-3 text-sm font-semibold">
                Calendar locked
              </p>
              <p className="mt-1 text-xs leading-5 text-[#76665D]">
                Complete payment to access available dates and times.
              </p>
            </div>
          ) : (
            <div className="mt-5">
              <label
                htmlFor="consultation-slot"
                className="mb-2 block text-xs font-semibold"
              >
                Available appointment
              </label>
              <select
                id="consultation-slot"
                value={selectedSlot}
                onChange={(e) => setSelectedSlot(e.target.value)}
                className="w-full rounded-xl border border-[#D4BBAE] bg-white p-3 text-sm outline-none focus:border-[#A77C5C]"
              >
                <option value="">Choose an available slot</option>
              </select>
              <p className="mt-2 text-xs text-[#76665D]">
                Connect your calendar service to display real available slots.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
)}

        {/* WHAT THE CLIENT RECEIVES */}
       
{/* WHAT THE CLIENT RECEIVES */}
<section className="deliverables-row mt-12 grid gap-8 rounded-[28px] border border-[#b18b50]/30 bg-[#1e1c18] p-6 shadow-[0_20px_55px_rgba(35,27,17,0.16)] sm:p-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-center lg:p-10">
  <div>
    <span className="text-[10px] font-bold uppercase tracking-[0.23em] text-[#c6a15b]">
      Your consultation documents
    </span>

    <h2 className="mt-4 font-serif text-3xl font-medium leading-tight text-[#f4ead8] sm:text-4xl">
      Clarity before you begin.
    </h2>

    <p className="mt-4 max-w-sm text-sm leading-7 text-[#c5b9a5]">
      Clear, personalised documentation to help you understand your
      consultation findings and recommendations.
    </p>
  </div>

  <div className="grid gap-4 sm:grid-cols-2">
    {/* WRITTEN FINDINGS */}
    <div className="deliverable-item group flex gap-4 rounded-2xl border border-[#b18b50]/30 bg-[#292620] p-5 transition duration-300 hover:-translate-y-1 hover:border-[#d6b16a]/60 hover:bg-[#302c24]">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#c6a15b]/40 bg-[#373126] text-[#d6b16a]">
        <ShieldCheck size={20} strokeWidth={1.4} />
      </div>

      <div>
        <h3 className="font-serif text-xl text-[#f4ead8]">
          Written findings
        </h3>

        <p className="mt-2 text-sm leading-6 text-[#c5b9a5]">
          Your written findings explain the personal plan and the
          reason for each recommended remedy.
        </p>
      </div>
    </div>

    {/* MATERIAL DOCUMENT */}
    <div className="deliverable-item group flex gap-4 rounded-2xl border border-[#b18b50]/30 bg-[#292620] p-5 transition duration-300 hover:-translate-y-1 hover:border-[#d6b16a]/60 hover:bg-[#302c24]">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#c6a15b]/40 bg-[#373126] text-[#d6b16a]">
        <Layers3 size={20} strokeWidth={1.4} />
      </div>

      <div>
        <h3 className="font-serif text-xl text-[#f4ead8]">
          Material document
        </h3>

        <p className="mt-2 text-sm leading-6 text-[#c5b9a5]">
          A tailored material document identifies the materials
          and placements recommended for your property.
        </p>
      </div>
    </div>
  </div>

  {/* MATERIAL DETAILS */}
  <div className="rounded-xl border border-[#b18b50]/20 bg-[#25231e] p-4 lg:col-start-2">
    <p className="text-sm leading-7 text-[#c5b9a5]">
      Selections may include metal studs and strips, devta items,
      precious stone dust as per your astrological chart,
      flooring-specific remedies, idols and room-appropriate frames.
    </p>
  </div>
</section>

{/* FAQ */}
<section className="mt-28 grid gap-10 lg:mt-36 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
  {/* FAQ INTRO */}
  <div>
    <span className="text-[10px] font-bold uppercase tracking-[0.23em] text-[#947341]">
      Common questions
    </span>

    <h2 className="mt-5 font-serif text-4xl font-medium leading-tight tracking-tight text-[#29241d] sm:text-5xl">
      Clarity before you begin.
    </h2>

    <p className="mt-5 max-w-sm text-sm leading-7 text-[#71685a]">
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

  {/* FAQ ACCORDION */}
  <div className="faq-list space-y-3">
    {FAQS.map((faq, index) => {
      const isOpen = openFaq === index;

      return (
        <div
          className={`faq-item overflow-hidden rounded-2xl border transition-all duration-300 ${
            isOpen
              ? 'faq-open border-[#b18b50]/60 bg-[#292620] shadow-[0_12px_30px_rgba(35,27,17,0.12)]'
              : 'border-[#b18b50]/30 bg-[#1e1c18] hover:border-[#b18b50]/55'
          }`}
          key={faq.question}
        >
          <button
            type="button"
            className="faq-question flex w-full items-center gap-4 px-5 py-5 text-left sm:px-6"
            aria-expanded={isOpen}
            onClick={() => setOpenFaq(isOpen ? null : index)}
          >
            <span
              className={`faq-index font-mono text-xs tracking-widest ${
                isOpen ? 'text-[#d6b16a]' : 'text-[#a18b65]'
              }`}
            >
              {String(index + 1).padStart(2, '0')}
            </span>

            <span
              className={`faq-question-text flex-1 font-serif text-lg sm:text-xl ${
                isOpen ? 'text-[#f4ead8]' : 'text-[#e5d8c2]'
              }`}
            >
              {faq.question}
            </span>

            <span
              className={`faq-toggle flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition duration-300 ${
                isOpen
                  ? 'rotate-180 border-[#c6a15b]/50 bg-[#373126] text-[#d6b16a]'
                  : 'border-[#b18b50]/30 bg-[#292620] text-[#b9a27a]'
              }`}
            >
              <ChevronDown size={17} />
            </span>
          </button>

          <div
            className={`faq-answer-wrap grid transition-all duration-300 ${
              isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
            }`}
            aria-hidden={!isOpen}
          >
            <div className="min-h-0 overflow-hidden">
              <div className="faq-answer border-t border-[#b18b50]/20 px-5 pb-5 pt-4 sm:px-6">
                <p className="text-sm leading-7 text-[#c5b9a5]">
                  {faq.answer}
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    })}
  </div>
</section>


       

      </>
  );
}
