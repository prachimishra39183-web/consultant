
import { useState, type ChangeEvent, type FormEvent } from 'react';
import {
  CheckCircle2,
  ArrowUpRight,
  Send,
  Sparkles,
  Check,
  Wallet,
} from 'lucide-react';

import { submitEnquiry } from '@/lib/enquiries';
import { servicePackages } from '@/data/packages';

const GENERAL_ENQUIRY = 'General enquiry';

const interestOptions = [
  ...servicePackages.map((pkg) => pkg.name),
  GENERAL_ENQUIRY,
];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const inclusions = [
  'Personalised foundation assessment',
  'Complete 7-layer Astro Vastu process',
  'Property visits according to requirements',
  'Written findings and recommendations',
];

const emptyForm = (interest: string) => ({
  name: '',
  email: '',
  phone: '',
  interest,
  message: '',
});

type EnquiryFormProps = {
  defaultInterest?: string;
};

export default function EnquiryForm({
  defaultInterest = GENERAL_ENQUIRY,
}: EnquiryFormProps) {
  const [form, setForm] = useState(() => emptyForm(defaultInterest));

  const [status, setStatus] = useState<
    'idle' | 'submitting' | 'success' | 'error'
  >('idle');

  const [validationError, setValidationError] = useState<string | null>(null);

  const updateField =
    (field: keyof typeof form) =>
    (
      event: ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >,
    ) => {
      setForm((prev) => ({
        ...prev,
        [field]: event.target.value,
      }));

      setValidationError(null);

      if (status === 'error' || status === 'success') {
        setStatus('idle');
      }
    };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const name = form.name.trim();
    const email = form.email.trim();

    if (!name || !EMAIL_PATTERN.test(email)) {
      setValidationError(
        'Please enter your name and a valid email address.',
      );
      return;
    }

    setValidationError(null);
    setStatus('submitting');

    try {
      await submitEnquiry({
        name,
        email,
        phone: form.phone.trim(),
        interest: form.interest,
        message: form.message.trim(),
      });

      setForm(emptyForm(defaultInterest));
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  const isSubmitting = status === 'submitting';

  return (
    <section
      id="consultation-enquiry"
      className="consultation-enquiry mt-24 scroll-mt-24 rounded-[28px] border border-[#d8c18f] bg-gradient-to-br from-[#fffdf8] via-[#faf3e4] to-[#f1e2c2] p-5 text-black shadow-[0_24px_65px_rgba(82,60,25,0.10)] sm:mt-32 sm:p-8 lg:mt-40 lg:p-12"
    >
      {/* SECTION HEADER */}
      <div className="mb-8 flex flex-wrap items-end justify-between gap-5 border-b border-[#d8c18f] pb-6">
        <div>
          <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.23em] !text-black">
            <Sparkles size={15} />
            Personalised consultation
          </span>

          <h2 className="mt-4 font-serif text-3xl font-semibold leading-tight !text-black sm:text-4xl lg:text-5xl">
            Let’s begin a conversation.
          </h2>

          <p className="mt-4 max-w-xl text-sm leading-7 !text-black sm:text-base">
            Tell us about yourself, your property and the guidance you
            are looking for. We will use these details to respond to
            your enquiry.
          </p>
        </div>

        <div className="flex items-center gap-3 rounded-xl border border-[#d8c18f] bg-white/70 px-4 py-3">
          <Wallet size={19} className="text-black" />
          <span className="text-xs font-semibold !text-black">
            Personal attention
          </span>
        </div>
      </div>

      {/* FORM LAYOUT */}
      <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:gap-12">
        {/* LEFT: INCLUSIONS */}
        <aside className="flex flex-col justify-between rounded-2xl border border-[#d8c18f] bg-gradient-to-br from-[#f5e6c7] to-[#e9d3a4] p-6 text-black sm:p-8">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] !text-black">
              What to expect
            </span>

            <h3 className="mt-4 font-serif text-2xl font-semibold !text-black sm:text-3xl">
              A considered approach to your space.
            </h3>

            <p className="mt-4 text-sm leading-7 !text-black">
              Share your requirements to help us understand your needs
              before discussing the next steps.
            </p>

            <ul className="mt-7 space-y-4">
              {inclusions.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm leading-6 !text-black"
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[#a78342] bg-white/70 !text-black">
                    <Check size={12} strokeWidth={2.5} />
                  </span>

                  <span className="!text-black">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 border-t border-[#a78342]/40 pt-5">
            <p className="text-xs font-semibold leading-6 !text-black">
              Every enquiry is an opportunity to understand your property
              and requirements more clearly.
            </p>
          </div>
        </aside>

        {/* RIGHT: ENQUIRY FORM */}
        <div className="consultation-enquiry-details min-w-0 rounded-2xl border border-[#e3d2ae] bg-white/80 p-5 text-black sm:p-8">
          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-7 flex items-start justify-between gap-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] !text-black">
                  Begin a conversation
                </p>

                <h3 className="mt-3 font-serif text-3xl font-semibold !text-black">
                  Your enquiry.
                </h3>

                <p className="mt-3 text-sm leading-6 !text-black">
                  Tell us a little about yourself and your requirements.
                </p>
              </div>

              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#d8c18f] bg-[#f4e5c4] font-mono text-xs font-bold !text-black">
                01
              </span>
            </div>

            {/* INPUT GRID */}
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block min-w-0">
                <span className="mb-2 block text-xs font-bold !text-black">
                  Full name *
                </span>

                <input
                  type="text"
                  value={form.name}
                  onChange={updateField('name')}
                  maxLength={120}
                  autoComplete="name"
                  placeholder="Your full name"
                  required
                  className="w-full rounded-xl border border-[#d8c9ac] bg-[#fffdf8] px-4 py-3.5 text-sm !text-black outline-none transition placeholder:text-[#777064] focus:border-[#b18b50] focus:ring-2 focus:ring-[#b18b50]/20"
                />
              </label>

              <label className="block min-w-0">
                <span className="mb-2 block text-xs font-bold !text-black">
                  Email address *
                </span>

                <input
                  type="email"
                  value={form.email}
                  onChange={updateField('email')}
                  maxLength={255}
                  autoComplete="email"
                  placeholder="you@example.com"
                  required
                  className="w-full rounded-xl border border-[#d8c9ac] bg-[#fffdf8] px-4 py-3.5 text-sm !text-black outline-none transition placeholder:text-[#777064] focus:border-[#b18b50] focus:ring-2 focus:ring-[#b18b50]/20"
                />
              </label>

              <label className="block min-w-0">
                <span className="mb-2 block text-xs font-bold !text-black">
                  Phone number
                </span>

                <input
                  type="tel"
                  value={form.phone}
                  onChange={updateField('phone')}
                  maxLength={30}
                  autoComplete="tel"
                  placeholder="Your contact number"
                  className="w-full rounded-xl border border-[#d8c9ac] bg-[#fffdf8] px-4 py-3.5 text-sm !text-black outline-none transition placeholder:text-[#777064] focus:border-[#b18b50] focus:ring-2 focus:ring-[#b18b50]/20"
                />
              </label>

              <label className="block min-w-0">
                <span className="mb-2 block text-xs font-bold !text-black">
                  Consultation interest
                </span>

                <select
                  value={form.interest}
                  onChange={updateField('interest')}
                  className="w-full rounded-xl border border-[#d8c9ac] bg-[#fffdf8] px-4 py-3.5 text-sm !text-black outline-none transition focus:border-[#b18b50] focus:ring-2 focus:ring-[#b18b50]/20"
                >
                  {interestOptions.map((option) => (
                    <option key={option} value={option} className="bg-white text-black">
                      {option}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            {/* MESSAGE */}
            <label className="mt-5 block">
              <span className="mb-2 block text-xs font-bold !text-black">
                Property or requirements
              </span>

              <textarea
                rows={4}
                value={form.message}
                onChange={updateField('message')}
                maxLength={2000}
                placeholder="Share any details relevant to your enquiry..."
                className="w-full resize-y rounded-xl border border-[#d8c9ac] bg-[#fffdf8] px-4 py-3.5 text-sm leading-6 !text-black outline-none transition placeholder:text-[#777064] focus:border-[#b18b50] focus:ring-2 focus:ring-[#b18b50]/20"
              />
            </label>

            {/* VALIDATION AND STATUS */}
            {validationError && (
              <p
                className="mt-4 rounded-xl border border-red-300 bg-red-50 p-3 text-sm font-medium text-red-800"
                role="alert"
              >
                {validationError}
              </p>
            )}

            {status === 'error' && (
              <p
                className="mt-4 rounded-xl border border-red-300 bg-red-50 p-3 text-sm font-medium text-red-800"
                role="alert"
              >
                We could not send your enquiry. Please try again.
              </p>
            )}

            {status === 'success' && (
              <p
                className="mt-4 flex items-center gap-2 rounded-xl border border-emerald-300 bg-emerald-50 p-3 text-sm font-semibold text-emerald-900"
                role="status"
              >
                <CheckCircle2 size={18} />
                Your enquiry has been submitted successfully.
              </p>
            )}

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-6 inline-flex w-full items-center justify-center gap-3 rounded-xl border border-[#9c7535] bg-gradient-to-r from-[#e8cc8d] via-[#d8b56e] to-[#c69b4d] px-6 py-4 text-sm font-bold !text-black shadow-[0_5px_0_#98712f] transition duration-300 hover:-translate-y-0.5 hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:min-w-48"
            >
              {isSubmitting ? 'Sending your enquiry...' : 'Send enquiry'}

              {!isSubmitting && <Send size={16} />}
            </button>

            <p className="mt-5 text-xs leading-6 !text-black">
              Your details will be used to respond to your consultation enquiry.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
