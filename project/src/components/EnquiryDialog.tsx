
import { useEffect } from 'react';
import { X } from 'lucide-react';
import EnquiryForm from '@/components/EnquiryForm';

type EnquiryDialogProps = {
  title: string;
  defaultInterest: string;
  onClose: () => void;
};

export default function EnquiryDialog({
  title,
  defaultInterest,
  onClose,
}: EnquiryDialogProps) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    const previousOverflow = document.body.style.overflow;

    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-5"
      role="dialog"
      aria-modal="true"
      aria-labelledby="enquiry-dialog-title"
    >
      {/* BACKDROP */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* DIALOG */}
      <div className="relative flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-[28px] border border-[#d8c18f] bg-gradient-to-br from-[#fffdf8] via-[#faf3e4] to-[#f1e2c2] text-black shadow-[0_30px_100px_rgba(0,0,0,0.3)]">

        {/* HEADER */}
        <div className="flex shrink-0 items-start justify-between gap-4 border-b border-[#d8c18f] bg-gradient-to-r from-[#f8edda] to-[#ead5a8] px-5 py-5 sm:px-8 sm:py-6">
          <div className="min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] !text-black">
              Consultation enquiry
            </p>

            <h3
              id="enquiry-dialog-title"
              className="mt-2 font-serif text-2xl font-semibold leading-tight !text-black sm:text-3xl"
            >
              {title}
            </h3>

            <p className="mt-2 text-sm leading-6 !text-black">
              Share your requirements to begin your consultation journey.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close enquiry form"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#b18b50]/50 bg-white/80 !text-black shadow-sm transition duration-200 hover:rotate-90 hover:bg-[#e8d3a8] focus:outline-none focus:ring-2 focus:ring-[#b18b50]"
          >
            <X size={20} />
          </button>
        </div>

        {/* SCROLLABLE FORM */}
        <div className="min-h-0 flex-1 overflow-y-auto p-4 text-black sm:p-7">
          <EnquiryForm defaultInterest={defaultInterest} />
        </div>

      </div>
    </div>
  );
}
