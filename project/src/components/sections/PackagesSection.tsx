import { useState } from 'react';
import { ArrowRight, Check, X } from 'lucide-react';
import SectionShell from '@/components/sections/SectionShell';
import { servicePackages } from '@/data/packages';

type PackageType = (typeof servicePackages)[number];

export default function PackagesSection() {
  const [selected, setSelected] = useState<PackageType | null>(null);

  const getServices = (pkg: PackageType) => {
    const name = pkg.name.toLowerCase();

    const commonServices = [
      'Planning according to the property size and specific issues',
      'Balancing recommendations based on individual requirements',
      'Site selection for a new home, office, or land as per horoscope',
    ];

    if (name.includes('platinum')) {
      return [
        '8-layer planning and balancing',
        '4–5 bedroom flat or bungalow',
        ...commonServices,
      ];
    }

    if (name.includes('gold')) {
      return [
        '8-layer planning and balancing',
        '3–4 bedroom home as per horoscope',
        ...commonServices,
      ];
    }

    if (name.includes('site')) {
      return [
        'New home selection as per horoscope',
        'Office location selection as per horoscope',
        'Land selection as per horoscope',
      ];
    }

    return [
      ...(pkg.inclusions ?? []),
      ...commonServices,
    ].filter((service, index, services) =>
      services.indexOf(service) === index
    );
  };

  return (
    <SectionShell
      id="packages"
      eyebrow="Premium Services"
      title="Service Packages"
      className="bg-ivory-100"
    >
      <ul className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {servicePackages.map((pkg) => (
          <li
            key={pkg.id}
            className="group flex flex-col rounded-2xl border border-ivory-300 bg-ivory-50 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-bronze-500 hover:shadow-xl"
          >
            <h3 className="font-serif text-2xl leading-tight text-ink-900">
              {pkg.name}
            </h3>

            <p className="mt-4 font-serif text-3xl text-bronze-700">
              {pkg.price}
            </p>

            <p className="mt-4 flex-1 leading-relaxed text-ink-700">
              {pkg.tagline}
            </p>

            <button
              type="button"
              onClick={() => setSelected(pkg)}
              className="group/button mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full border border-ink-900 px-5 py-3 text-sm font-medium uppercase tracking-[0.14em] text-ink-900 transition-all duration-300 hover:bg-ink-900 hover:text-ivory-50"
            >
              See Details
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover/button:translate-x-1"
              />
            </button>
          </li>
        ))}
      </ul>

      {selected && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-ink-950/70 p-4 backdrop-blur-md"
          onClick={() => setSelected(null)}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="package-dialog-title"
            className="relative my-auto max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl border border-ivory-300 bg-ivory-50 p-6 shadow-2xl sm:p-8"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Close package details"
              onClick={() => setSelected(null)}
              className="absolute right-5 top-5 rounded-full border border-ivory-300 p-2 text-ink-700 transition hover:bg-ivory-200"
            >
              <X size={18} />
            </button>

            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-bronze-700">
              Premium Services
            </p>

            <h2
              id="package-dialog-title"
              className="mt-3 pr-8 font-serif text-3xl text-ink-900 sm:text-4xl"
            >
              {selected.name}
            </h2>

            <p className="mt-3 font-serif text-3xl text-bronze-700">
              {selected.price}
            </p>

            <p className="mt-4 leading-relaxed text-ink-700">
              {selected.tagline}
            </p>

            <div className="my-6 h-px bg-ivory-300" />

            <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.14em] text-ink-900">
              Services Included
            </h3>

            <ul className="space-y-4">
              {getServices(selected).map((service) => (
                <li
                  key={service}
                  className="flex items-start gap-3 text-sm leading-relaxed text-ink-700"
                >
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-bronze-500/10">
                    <Check size={15} className="text-bronze-700" />
                  </span>
                  <span>{service}</span>
                </li>
              ))}
            </ul>

            <button
              type="button"
              onClick={() => setSelected(null)}
              className="mt-8 w-full rounded-full bg-ink-900 px-6 py-3.5 text-sm font-medium uppercase tracking-[0.14em] text-ivory-50 transition hover:bg-bronze-700"
            >
              Close Details
            </button>
          </section>
        </div>
      )}
    </SectionShell>
  );
}