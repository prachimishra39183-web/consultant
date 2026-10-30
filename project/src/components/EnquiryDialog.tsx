import { useEffect } from 'react';
import { X } from 'lucide-react';
import EnquiryForm from '@/components/EnquiryForm';

type EnquiryDialogProps = {
  title: string;
  defaultInterest: string;
  onClose: () => void;
};

export default function EnquiryDialog({ title, defaultInterest, onClose }: EnquiryDialogProps) {
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
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="enquiry-dialog-title">
      <div className="absolute inset-0 bg-ink-900/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-ivory-50 p-6 shadow-2xl md:p-10">
        <div className="mb-8 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-bronze-700">Enquiry</p>
            <h3 id="enquiry-dialog-title" className="mt-2 font-serif text-3xl leading-tight text-ink-900">
              {title}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close enquiry form"
            className="rounded-full p-2 text-ink-700 transition-colors hover:bg-ivory-200 hover:text-ink-900"
          >
            <X size={20} />
          </button>
        </div>
        <EnquiryForm defaultInterest={defaultInterest} />
      </div>
    </div>
  );
}
