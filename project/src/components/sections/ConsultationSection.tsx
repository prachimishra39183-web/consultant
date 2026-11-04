
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

{/* PRICING FEATURE */}
<section
  id="consultation"
  className="mt-28 scroll-mt-24 overflow-hidden rounded-[28px] border border-[#d8c18f] !bg-[#fcf8ef] shadow-[0_25px_65px_rgba(0,0,0,0.08)] sm:mt-36 lg:mt-44"
>
  {/* TOP BAR */}
  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#B88620] !bg-gradient-to-r from-[#E8C15F] via-[#F7E4A4] to-[#D4AF37] px-6 py-5 !text-[#382507] sm:px-10">
    <span className="text-[10px] font-bold uppercase tracking-[0.25em] !text-black">
      The complete consultation
    </span>

    <span className="flex items-center gap-2 text-xs font-semibold !text-black">
      <Sparkles size={16} />
      Personalised assessment
    </span>
  </div>

  <div className="grid lg:grid-cols-[1.03fr_0.97fr]">
    {/* LEFT PANEL */}
    <div className="relative isolate overflow-hidden !bg-gradient-to-br from-[#FFF0B8] via-[#E8C15F] to-[#C99722] px-6 py-10 !text-[#382507] sm:px-10 sm:py-12 lg:px-12 lg:py-14">
      <p className="text-[10px] font-bold uppercase tracking-[0.22em] !text-black">
        Complete 7-layer Astro Vastu
      </p>

      <h2 className="mt-5 max-w-xl font-serif text-4xl font-medium leading-[1.08] tracking-tight !text-black sm:text-5xl lg:text-6xl">
        A personal plan for your property.
      </h2>

      <p className="mt-5 max-w-xl text-sm leading-7 !text-black sm:text-base">
        The 7-Layer Astro Vastu Balancing Process brings the
        foundation assessment, site visits and personalised
        recommendations into one consultation.
      </p>

      {/* CONSULTATION PRICE */}
      <div className="mt-10 flex flex-wrap items-end gap-x-4 gap-y-1">
        <span className="font-serif text-5xl font-semibold tracking-tight !text-black sm:text-7xl">
          ₹75,000
        </span>

        <span className="pb-2 text-[10px] font-bold uppercase tracking-[0.18em] !text-black">
          Consultation fee
        </span>
      </div>

      <button
        type="button"
        onClick={() => setBookingOpen(true)}
        className="mt-9 inline-flex items-center justify-center gap-3 rounded-xl border border-[#98712f] !bg-[#d8b56e] px-7 py-4 text-sm font-bold !text-black shadow-[0_5px_0_#98712f] transition duration-300 hover:-translate-y-1 hover:!bg-[#c9a256]"
      >
        Book a consultation
        <ArrowUpRight size={17} />
      </button>

      {/* DECORATIVE CIRCLES */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-28 -right-20 -z-10 h-72 w-72 rounded-full border border-[#98712f]/30"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-20 -right-12 -z-10 h-56 w-56 rounded-full border border-dashed border-[#98712f]/30"
      />
    </div>

    {/* RIGHT PANEL */}
    <div className="!bg-gradient-to-br from-[#F8E8B7] via-[#EED58F] to-[#D9B65B] px-6 py-10 !text-[#382507] sm:px-10 sm:py-12 lg:px-10 lg:py-14">
      <span className="text-[10px] font-bold uppercase tracking-[0.2em] !text-black">
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
            className="flex items-start gap-3 text-sm leading-6 !text-black"
          >
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#ead8ad] !text-black">
              <Check size={12} strokeWidth={2.2} />
            </span>
            <span className="!text-black">{item}</span>
          </li>
        ))}
      </ul>

      {/* MATERIAL COST */}
      <div className="mt-9 rounded-2xl border border-[#B88620] !bg-gradient-to-br from-[#FFF1BF] via-[#EBCB70] to-[#D5A83C] p-5 sm:p-6 shadow-[0_10px_28px_rgba(101,65,8,0.12)]">
        <div className="flex items-center gap-3">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#d8c18f] bg-[#efe0bd] !text-black">
            <Wallet size={20} strokeWidth={1.5} />
          </span>

          <div className="min-w-0">
            <p className="text-[9px] font-bold uppercase tracking-[0.2em] !text-black">
              Estimated material cost
            </p>

          </div>
        </div>

        <p className="mt-4 text-sm leading-7 !text-black">
          Materials are not included in the consultation fee.
          The estimate depends on the property. Materials must be
          purchased separately online from Mahavastu.
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
  className="relative my-auto w-full max-w-2xl overflow-hidden rounded-[28px] border border-[#B88620] bg-gradient-to-br from-[#FFF4CC] via-[#EED58F] to-[#D4AF37] text-[#382507] shadow-2xl"
  onClick={(e) => e.stopPropagation()}
>
      {/* Header */}
      <div className="relative border-b border-[#B88620]/50 bg-gradient-to-r from-[#E8C15F] to-[#D4AF37] px-6 py-7 sm:px-9">
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

        <h2 className="mt-3 pr-8 font-serif text-3xl text-white sm:text-4xl">
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
          <h4 className="text-sm font-bold">Choose your consultation</h4>
          <p className="mt-1 text-xs text-black">
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
<section className="deliverables-row mt-12 grid gap-8 rounded-[28px] border border-[#B88620] bg-gradient-to-br from-[#F9E7A9] via-[#E8C15F] to-[#C99722] p-6 !text-[#382507] shadow-[0_20px_55px_rgba(120,78,12,0.25)] sm:p-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-center lg:p-10">

  {/* INTRODUCTION */}
  <div>
    <span className="text-[10px] font-bold uppercase tracking-[0.23em] !text-[#65420D]">
      Your consultation documents
    </span>

    <h2 className="mt-4 font-serif text-3xl font-semibold leading-tight !text-[#382507] sm:text-4xl">
      Clarity before you begin.
    </h2>

    <p className="mt-4 max-w-sm text-sm leading-7 !text-[#503711]">
      Receive clear, personalised documents explaining your consultation
      findings, recommended remedies and the plan for your property.
    </p>
  </div>

  {/* DOCUMENT CARDS */}
  <div className="grid gap-4 sm:grid-cols-2">

    {/* WRITTEN FINDINGS */}
    <div className="group flex gap-4 rounded-2xl border border-[#B88620]/70 bg-gradient-to-br from-[#FFF4C9] via-[#F5D984] to-[#E5BC4D] p-5 !text-[#382507] shadow-[0_10px_28px_rgba(101,65,8,0.13)] transition duration-300 hover:-translate-y-1 hover:border-[#936410] hover:shadow-[0_16px_35px_rgba(101,65,8,0.23)]">

      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#B88620]/70 bg-gradient-to-br from-[#E5BC4D] to-[#C28B19] !text-[#382507] shadow-sm">
        <ShieldCheck size={20} strokeWidth={1.6} />
      </div>

      <div>
        <h3 className="font-serif text-xl font-semibold !text-[#382507]">
          Written Findings
        </h3>

        <p className="mt-2 text-sm leading-6 !text-[#503711]">
          Understand your personalised plan, consultation findings
          and the reasoning behind each recommended remedy.
        </p>
      </div>
    </div>

    {/* MATERIAL DOCUMENT */}
    <div className="group flex gap-4 rounded-2xl border border-[#B88620]/70 bg-gradient-to-br from-[#FFF4C9] via-[#F5D984] to-[#E5BC4D] p-5 !text-[#382507] shadow-[0_10px_28px_rgba(101,65,8,0.13)] transition duration-300 hover:-translate-y-1 hover:border-[#936410] hover:shadow-[0_16px_35px_rgba(101,65,8,0.23)]">

      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#B88620]/70 bg-gradient-to-br from-[#E5BC4D] to-[#C28B19] !text-[#382507] shadow-sm">
        <Layers3 size={20} strokeWidth={1.6} />
      </div>

      <div>
        <h3 className="font-serif text-xl font-semibold !text-[#382507]">
          Material Document
        </h3>

        <p className="mt-2 text-sm leading-6 !text-[#503711]">
          A property-specific document outlining recommended materials,
          their placements and how they fit into your Vastu plan.
        </p>
      </div>
    </div>
  </div>

  {/* MATERIAL DETAILS */}
  <div className="rounded-xl border border-[#B88620]/70 bg-gradient-to-r from-[#F9E6A6] to-[#E9C45C] p-4 !text-[#382507] shadow-[0_8px_22px_rgba(101,65,8,0.10)] lg:col-start-2">
    <p className="text-sm font-medium leading-7 !text-[#503711]">
      Recommended materials may include metal studs and strips,
      devta items, precious stone dust selected according to your
      astrological chart, flooring-specific remedies, idols and
      room-appropriate frames, depending on your individual plan.
    </p>
  </div>

</section>


{/* FAQ */}
<section className="mt-28 grid gap-8 !text-[#382507] lg:mt-36 lg:grid-cols-[0.72fr_1.28fr] lg:gap-10">

  {/* GOLDEN INTRODUCTION PANEL */}
  <div className="relative flex flex-col justify-between overflow-hidden rounded-3xl border border-[#B88620] bg-gradient-to-br from-[#F9E7A9] via-[#E8C15F] to-[#C99722] p-7 !text-[#382507] shadow-[0_20px_45px_rgba(120,78,12,0.22)] sm:p-9 lg:p-10">

    <div
      aria-hidden="true"
      className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full border border-[#805719]/30"
    />

    <div
      aria-hidden="true"
      className="pointer-events-none absolute -right-6 -top-6 h-32 w-32 rounded-full border border-[#805719]/30"
    />

    <div
      aria-hidden="true"
      className="pointer-events-none absolute -bottom-16 -left-12 h-48 w-48 rounded-full bg-[#FFF4CC]/30 blur-2xl"
    />

    <div className="relative z-10">
      <div className="mb-5 flex items-center gap-3">
        <span className="h-px w-10 bg-[#65420D]" />
        <span className="text-[10px] font-extrabold uppercase tracking-[0.23em] !text-[#65420D]">
          Common questions
        </span>
      </div>

      <h2 className="max-w-md font-serif text-4xl font-bold leading-tight tracking-tight !text-[#382507] sm:text-5xl">
        Clarity before you begin.
      </h2>

      <p className="mt-6 max-w-sm text-sm font-medium leading-7 !text-[#503711] sm:text-base">
        Understand the scope, visits and materials before enquiring
        about a consultation. Get a clearer picture of the process
        before taking your next step.
      </p>

      <div className="mt-8 flex items-center gap-4 rounded-2xl border border-[#B88620]/60 bg-[#FFF2C6]/60 p-4 shadow-sm">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#B88620]/60 bg-[#F5D77F] !text-[#65420D]">
          <Gem size={21} strokeWidth={1.5} />
        </span>

        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.12em] !text-[#382507]">
            Personalised consultation
          </p>
          <p className="mt-1 text-xs font-medium leading-5 !text-[#503711]">
            Guidance tailored to your needs and space.
          </p>
        </div>
      </div>
    </div>

    <div className="relative z-10 mt-10 border-t border-[#805719]/30 pt-5">
      <div className="flex items-center justify-between gap-3">
        <span className="text-[9px] font-extrabold uppercase tracking-[0.18em] !text-[#65420D]">
          Your questions matter
        </span>

        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#B88620]/60 bg-[#FFF2C6]/60 !text-[#65420D]">
          <ArrowUpRight size={18} />
        </span>
      </div>
    </div>
  </div>

  {/* FUNCTIONAL FAQ ACCORDION */}
  <div className="faq-list space-y-3">
    {FAQS.map((faq, index) => {
      const isOpen = openFaq === index;

      return (
        <div
          key={faq.question}
          className={`faq-item overflow-hidden rounded-2xl border !text-[#382507] transition-all duration-300 ${
            isOpen
              ? 'faq-open border-[#B88620] bg-gradient-to-br from-[#F9E7A9] via-[#EED17C] to-[#DDB34B] shadow-[0_12px_30px_rgba(120,87,35,0.16)]'
              : 'border-[#C49A3A] bg-gradient-to-r from-[#F8EBC5] to-[#EED58F] hover:border-[#805719] hover:from-[#F2D77F] hover:to-[#E1BC58]'
          }`}
        >
          <button
            type="button"
            className="faq-question flex w-full items-center gap-4 px-5 py-5 text-left sm:px-6"
            aria-expanded={isOpen}
            onClick={() => setOpenFaq(isOpen ? null : index)}
          >
            <span className="faq-index font-mono text-xs tracking-widest !text-[#805719]">
              {String(index + 1).padStart(2, '0')}
            </span>

            <span className="faq-question-text flex-1 font-serif text-lg font-semibold !text-[#382507] sm:text-xl">
              {faq.question}
            </span>

            <span
              className={`faq-toggle flex h-9 w-9 shrink-0 items-center justify-center rounded-full border !text-[#65420D] transition duration-300 ${
                isOpen
                  ? 'rotate-180 border-[#805719] bg-[#D4A63B]'
                  : 'border-[#B88620] bg-[#F5D77F]'
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
              <div className="faq-answer border-t border-[#B88620]/50 px-5 pb-5 pt-4 sm:px-6">
                <p className="text-sm leading-7 !text-[#503711]">
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
