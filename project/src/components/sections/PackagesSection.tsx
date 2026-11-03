
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
      className=""
    >
      {/* PACKAGE CARDS */}
      <ul className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {servicePackages.map((pkg) => (
          <li
            key={pkg.id}
            className="
              group relative flex flex-col overflow-hidden
              rounded-2xl
              border border-[#D9B66F]/35
              bg-gradient-to-br from-[#26344F] via-[#1B263D] to-[#111827]
              p-6
              text-[#F8F1E4]
              shadow-[0_15px_40px_rgba(0,0,0,0.22)]
              transition-all duration-300
              hover:-translate-y-1
              hover:border-[#D9B66F]
              hover:shadow-[0_22px_50px_rgba(0,0,0,0.32)]
            "
          >
            {/* Subtle decorative glow */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#D9B66F]/10 blur-3xl transition group-hover:bg-[#D9B66F]/15"
            />

            <div className="relative z-10 flex flex-1 flex-col">
              <h3 className="font-serif text-2xl leading-tight text-[#F2D9A0]">
                {pkg.name}
              </h3>

              <p className="mt-4 font-serif text-3xl text-[#D9B66F]">
                {pkg.price}
              </p>

              <p className="mt-4 flex-1 leading-relaxed text-[#D8DFEA]">
                {pkg.tagline}
              </p>

              <button
                type="button"
                onClick={() => setSelected(pkg)}
                className="
                  group/button mt-7 inline-flex w-full items-center
                  justify-center gap-2 rounded-full
                  border border-[#D9B66F]/60
                  bg-[#D9B66F]/10
                  px-5 py-3
                  text-sm font-medium uppercase tracking-[0.14em]
                  text-[#F2D9A0]
                  transition-all duration-300
                  hover:border-[#F2D9A0]
                  hover:bg-[#D9B66F]
                  hover:text-[#172033]
                "
              >
                See Details
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover/button:translate-x-1"
                />
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* PACKAGE DETAILS MODAL */}
      {selected && (
        <div
          className="
            fixed inset-0 z-[100] flex items-center justify-center
            overflow-y-auto bg-[#080D18]/80 p-4 backdrop-blur-md
          "
          onClick={() => setSelected(null)}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="package-dialog-title"
            className="
              relative my-auto max-h-[90vh] w-full max-w-lg
              overflow-y-auto rounded-3xl
              border border-[#D9B66F]/40
              bg-gradient-to-br from-[#26344F] via-[#1B263D] to-[#111827]
              p-6 text-[#F8F1E4]
              shadow-[0_30px_100px_rgba(0,0,0,0.5)]
              sm:p-8
            "
            onClick={(event) => event.stopPropagation()}
          >
            {/* Close button */}
            <button
              type="button"
              aria-label="Close package details"
              onClick={() => setSelected(null)}
              className="
                absolute right-5 top-5 rounded-full
                border border-[#D9B66F]/30
                bg-[#D9B66F]/10 p-2
                text-[#F2D9A0]
                transition hover:bg-[#D9B66F] hover:text-[#172033]
              "
            >
              <X size={18} />
            </button>

            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D9B66F]">
              Premium Services
            </p>

            <h2
              id="package-dialog-title"
              className="mt-3 pr-8 font-serif text-3xl text-[#F2D9A0] sm:text-4xl"
            >
              {selected.name}
            </h2>

            <p className="mt-3 font-serif text-3xl text-[#D9B66F]">
              {selected.price}
            </p>

            <p className="mt-4 leading-relaxed text-[#D8DFEA]">
              {selected.tagline}
            </p>

            <div className="my-6 h-px bg-[#D9B66F]/25" />

            <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.14em] text-[#F2D9A0]">
              Services Included
            </h3>

            <ul className="space-y-4">
              {getServices(selected).map((service) => (
                <li
                  key={service}
                  className="flex items-start gap-3 text-sm leading-relaxed text-[#D8DFEA]"
                >
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#D9B66F]/30 bg-[#D9B66F]/10">
                    <Check size={15} className="text-[#D9B66F]" />
                  </span>

                  <span>{service}</span>
                </li>
              ))}
            </ul>

            <button
              type="button"
              onClick={() => setSelected(null)}
              className="
                mt-8 w-full rounded-full
                border border-[#D9B66F]
                bg-[#D9B66F]
                px-6 py-3.5
                text-sm font-medium uppercase tracking-[0.14em]
                text-[#172033]
                transition hover:bg-[#F2D9A0]
              "
            >
              Close Details
            </button>
          </section>
        </div>
      )}
    </SectionShell>
  );
}
