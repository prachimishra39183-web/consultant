
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

      if (status === 'error') setStatus('idle');
    };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const name = form.name.trim();
    const email = form.email.trim();

    if (!name || !EMAIL_PATTERN.test(email)) {
      setValidationError('Please enter your name and a valid email address.');
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
      className="consultation-enquiry mt-24 scroll-mt-24 sm:mt-32 lg:mt-40"
    >
      {/* Top header strip */}
      
        {/* RIGHT: Inclusions and actual enquiry form */}
        <div className="consultation-enquiry-details">
         

      <form onSubmit={handleSubmit} noValidate>
                <div className="consultation-form-heading">
                  <div>
                    <p className="consultation-eyebrow consultation-eyebrow-light">
                      Begin a conversation
                    </p>

                    <h3>Your enquiry.</h3>
                    <p>
                      Tell us a little about yourself and your requirements.
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
                    <span>Consultation interest</span>
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
                  <span>Property or requirements</span>
                  <textarea
                    rows={3}
                    value={form.message}
                    onChange={updateField('message')}
                    maxLength={2000}
                    placeholder="Share any details relevant to your enquiry..."
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
                  Your details will be used to respond to your consultation
                  enquiry.
                </p>
              </form>
           
        </div>
    
    </section>
  );
}
