import { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import SectionShell from '@/components/sections/SectionShell';
import EnquiryDialog from '@/components/EnquiryDialog';
import { servicePackages, type ServicePackage } from '@/data/packages';

export default function PackagesSection() {
  const [selected, setSelected] = useState<ServicePackage | null>(null);

  return (
    <SectionShell id="packages" eyebrow="Premium Services" title="Service Packages" className="bg-ivory-100">
      <ul className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {servicePackages.map((pkg) => (
          <li
            key={pkg.id}
            className="flex flex-col rounded-2xl border border-ivory-300 bg-ivory-50 p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-bronze-500 hover:shadow-xl"
          >
            <h3 className="font-serif text-2xl leading-tight text-ink-900">{pkg.name}</h3>
            <p className="mt-4 font-serif text-3xl text-bronze-700">{pkg.price}</p>
            <p className="mt-4 leading-relaxed text-ink-700">{pkg.tagline}</p>

            <div className="mt-6 flex-1">
              {pkg.inclusions.length > 0 ? (
                <ul className="space-y-3">
                  {pkg.inclusions.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-ink-700">
                      <Check size={16} className="mt-0.5 shrink-0 text-bronze-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm italic text-ink-500">Service inclusions to be announced.</p>
              )}
            </div>

            <button
              type="button"
              onClick={() => setSelected(pkg)}
              className="group mt-8 inline-flex items-center justify-center gap-2 rounded-full border border-ink-900 px-6 py-3 text-sm uppercase tracking-[0.16em] text-ink-900 transition-all duration-300 hover:bg-ink-900 hover:text-ivory-50"
            >
              Enquire
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </li>
        ))}
      </ul>

      {selected && (
        <EnquiryDialog
          title={selected.name}
          defaultInterest={selected.name}
          onClose={() => setSelected(null)}
        />
      )}
    </SectionShell>
  );
}
