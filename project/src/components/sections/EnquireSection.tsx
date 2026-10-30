
import { useState, type ChangeEvent, type FormEvent } from 'react';
import {
  CheckCircle2,
  ArrowUpRight,
  Send,
  Sparkles,
  Check,
  Sun,
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
  'Tell us about your property and requirements',
  'Choose the consultation you are interested in',
  'Share your preferred contact details',
  'Receive a personalised follow-up',
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

      if (status === 'error') setStatus('idle');
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
  className="consultation-enquiry mx-auto mt-20 w-full max-w-5xl scroll-mt-24 px-4 sm:mt-24 sm:px-6 lg:mt-28"
>
      {/* TOP HEADER — SAME DESIGN */}
    

      <div className="consultation-enquiry-grid">
        {/* LEFT PANEL — SAME OLIVE DESIGN */}
        <div className="consultation-enquiry-intro">
          <div className="consultation-decoration" aria-hidden="true">
            <div>
              <div>
                <Sun size={46} strokeWidth={0.65} />
              </div>
            </div>
          </div>

          <div className="relative z-10">
            <p className="consultation-eyebrow">
              PERSONAL ATTENTION. THOUGHTFUL GUIDANCE.
            </p>

            <h2 className="consultation-display-title">
              Your space
              <br />
              has a story.
              <span className="mt-2 block italic text-[#e8cc96]">
                Let's begin yours.
              </span>
            </h2>

            <p className="consultation-intro-description">
              Every space is different. Tell us a little about your
              property and what you are looking for. Begin a conversation
              with Acharya Sunil Mahatma about your Astro Vastu requirements.
            </p>

            <a
              href="#enquiry-form"
              className="consultation-enquiry-cta"
            >
              Make an enquiry
              <ArrowUpRight size={18} />
            </a>
          </div>

          <div className="consultation-intro-footer">
            <div className="consultation-sun-icon">
              <Sun size={22} strokeWidth={1.1} />
            </div>

            <div>
              <p className="consultation-acharya-name">
                Acharya Sunil Mahatma
              </p>

              <p className="consultation-acharya-speciality">
                Astro Vastu · Astrology · Numerology
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL — ENQUIRY INFORMATION + FORM */}
        <div className="consultation-enquiry-details">
         

          {/* ACTUAL WORKING ENQUIRY FORM */}
          <div
            id="enquiry-form"
            className="consultation-form-area scroll-mt-8"
          >
            {status === 'success' ? (
              <div className="consultation-success">
                <div className="consultation-success-icon">
                  <CheckCircle2 size={34} strokeWidth={1.2} />
                </div>

                <p className="consultation-eyebrow consultation-eyebrow-light">
                  Enquiry received
                </p>

                <h3>Thank you.</h3>

                <p>
                  Your enquiry has been submitted successfully. We appreciate
                  your interest and will get back to you.
                </p>

                <button
                  type="button"
                  className="consultation-submit"
                  onClick={() => {
                    setForm(emptyForm(defaultInterest));
                    setStatus('idle');
                    setValidationError(null);
                  }}
                >
                  Send another enquiry
                  <ArrowUpRight size={17} />
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div className="consultation-form-heading">
                  <div>
                    <p className="consultation-eyebrow consultation-eyebrow-light">
                      Tell us about yourself
                    </p>

                    <h3>Your enquiry.</h3>

                    <p>
                      Fill in the details below and we will be in touch.
                    </p>
                  </div>

                  <span className="consultation-step">01</span>
                </div>

                <div className="consultation-fields-grid">
                  <label className="consultation-input-group">
                    <span>Full name *</span>
                    <input
                      type="text"
                      value={form.name}
                      onChange={updateField('name')}
                      maxLength={120}
                      autoComplete="name"
                      placeholder="Your full name"
                      required
                    />
                  </label>

                  <label className="consultation-input-group">
                    <span>Email address *</span>
                    <input
                      type="email"
                      value={form.email}
                      onChange={updateField('email')}
                      maxLength={255}
                      autoComplete="email"
                      placeholder="you@example.com"
                      required
                    />
                  </label>

                  <label className="consultation-input-group">
                    <span>Phone number</span>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={updateField('phone')}
                      maxLength={30}
                      autoComplete="tel"
                      placeholder="Your contact number"
                    />
                  </label>

                  <label className="consultation-input-group">
                    <span>Area of interest</span>
                    <select
                      value={form.interest}
                      onChange={updateField('interest')}
                    >
                      {interestOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                <label className="consultation-input-group consultation-message-field">
                  <span>Your message</span>
                  <textarea
                    rows={3}
                    value={form.message}
                    onChange={updateField('message')}
                    maxLength={2000}
                    placeholder="Tell us about your property or requirements..."
                  />
                </label>

                {(validationError || status === 'error') && (
                  <p className="consultation-form-error" role="alert">
                    {validationError ??
                      'We could not send your enquiry. Please try again.'}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="consultation-submit"
                >
                  {isSubmitting ? 'Sending your enquiry...' : 'Send enquiry'}
                  {!isSubmitting && <Send size={16} />}
                </button>

                <p className="consultation-privacy-note">
                  Your details will be used to respond to your enquiry.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
