
import { useState, type ChangeEvent, type FormEvent } from 'react';
import {
  CheckCircle2,
  ArrowUpRight,
  Send,
  Sun,
  Sparkles,
} from 'lucide-react';

import { submitEnquiry } from '@/lib/enquiries';
import { servicePackages } from '@/data/packages';

const GENERAL_ENQUIRY = 'General enquiry';

const interestOptions = [
  ...servicePackages.map((pkg) => pkg.name),
  GENERAL_ENQUIRY,
];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

      if (status === 'error') {
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
      className="consultation-enquiry mx-auto mt-20 w-full max-w-7xl scroll-mt-24 px-4 sm:mt-24 sm:px-6 lg:mt-28"
    >
      <div className="consultation-enquiry-grid">

        {/* LEFT: GOLDEN INTRODUCTION */}
        <div className="consultation-enquiry-intro">
          <div className="consultation-gold-orb" aria-hidden="true">
            <div className="consultation-orb-ring consultation-orb-ring-one" />
            <div className="consultation-orb-ring consultation-orb-ring-two" />
            <Sun size={132} strokeWidth={0.65} />
            <Sparkles
              className="consultation-orb-sparkle"
              size={25}
              strokeWidth={1}
            />
          </div>

          <div className="consultation-intro-content">
            <p className="consultation-eyebrow">
              A MORE CONSIDERED WAY FORWARD
            </p>

            <h2 className="consultation-display-title">
              Your space.
              <br />
              Your story.
              <br />
              <span>Let it flourish.</span>
            </h2>

            <div className="consultation-gold-divider" />

            <p className="consultation-intro-description">
              Every space holds a unique story. Share your requirements
              and take the first step towards a more balanced and
              thoughtfully considered environment.
            </p>

            <p className="consultation-intro-description consultation-intro-secondary">
              Personalised Astro Vastu guidance, shaped around you,
              your property and your aspirations.
            </p>
          </div>

          <div className="consultation-intro-footer">
            <div className="consultation-sun-icon">
              <Sun size={23} strokeWidth={1.1} />
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

          <span className="consultation-panel-number" aria-hidden="true">
            01
          </span>
        </div>

        {/* RIGHT: IVORY FORM PANEL */}
        <div className="consultation-enquiry-details">
          <div
            id="enquiry-form"
            className="consultation-form-area scroll-mt-8"
          >
            {status === 'success' ? (
              <div className="consultation-success">
                <div className="consultation-success-icon">
                  <CheckCircle2 size={36} strokeWidth={1.3} />
                </div>

                <p className="consultation-eyebrow">
                  ENQUIRY RECEIVED
                </p>

                <h3>Thank you.</h3>

                <p>
                  Your enquiry has been submitted successfully.
                  We appreciate your interest and look forward
                  to connecting with you.
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
                    <p className="consultation-eyebrow">
                      LET'S START A CONVERSATION
                    </p>

                    <h3>Tell us about your vision.</h3>

                    <p>
                      A few details will help us understand your needs.
                    </p>
                  </div>

                  <span className="consultation-step">01 / 02</span>
                </div>

                <div className="consultation-fields-grid">
                  <label className="consultation-input-group">
                    <span>Full name <b>*</b></span>
                    <input
                      type="text"
                      value={form.name}
                      onChange={updateField('name')}
                      maxLength={120}
                      autoComplete="name"
                      placeholder="Enter your full name"
                      required
                    />
                  </label>

                  <label className="consultation-input-group">
                    <span>Email address <b>*</b></span>
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
                  <span>How can we help you?</span>
                  <textarea
                    rows={4}
                    value={form.message}
                    onChange={updateField('message')}
                    maxLength={2000}
                    placeholder="Tell us about your property, goals or requirements..."
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
                  {isSubmitting ? 'Sending your enquiry...' : 'Submit your enquiry'}
                  {!isSubmitting && <Send size={16} />}
                </button>

                <p className="consultation-privacy-note">
                  <CheckCircle2 size={14} />
                  Your details will only be used to respond to your enquiry.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
