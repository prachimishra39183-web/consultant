
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
    'Residential Vastu — houses, flats and bungalows',
    'Factory Vastu — industrial units, production areas and machinery layout',
    'Site Selection — choosing land or property for a new project',
    'Land Energy Assessment — evaluating land and its surrounding energy',
    'Property layout and directional analysis',
    'Personalised balancing recommendations based on individual requirements',
    'Astrological guidance for property selection, where applicable',
  ];

  if (name.includes('platinum')) {
    return [
      'Comprehensive 8-layer planning and balancing',
      'Detailed assessment for large homes and bungalows',
      ...commonServices,
    ];
  }

  if (name.includes('gold')) {
    return [
      '8-layer planning and balancing',
      'Detailed assessment for 3–4 bedroom homes',
      ...commonServices,
    ];
  }

  if (name.includes('site')) {
    return [
      'Residential plot and property selection',
      'Industrial and factory site selection',
      'Land Energy Assessment before purchase',
      'Directional and surrounding-site analysis',
      'Personalised recommendations for property selection',
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
    {/* CONSULTATION & PROPERTY SELECTION */}
<div className="mb-12">
  <div className="mx-auto mb-7 max-w-2xl text-center">
    <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#a98249]">
      Personalised Guidance
    </p>
    <h3 className="mt-3 font-serif text-3xl font-bold text-[#29251e] sm:text-4xl">
      Consultation & Property Selection
    </h3>
    <p className="mt-3 text-sm leading-6 text-[#62594b] sm:text-base">
      Choose a consultation for your concerns or get personalised guidance
      before selecting your next property.
    </p>
  </div>

  <div className="mx-auto grid max-w-4xl gap-5 md:grid-cols-2">
    {/* Regular consultation */}
    <div className="relative overflow-hidden rounded-3xl border border-[#dfd2b9] bg-white p-6 shadow-[0_12px_35px_rgba(91,61,30,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(91,61,30,0.14)] sm:p-8">
      <div className="absolute right-0 top-0 h-28 w-28 rounded-bl-full bg-[#f8f1e4]" />

      <div className="relative">
        <span className="inline-flex rounded-full border border-[#dfcba5] bg-[#faf5ea] px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#8a6937]">
          Regular Visit
        </span>

        <h4 className="mt-5 font-serif text-2xl font-bold text-[#805b2e]">
          Vastu Consultation
        </h4>

        <p className="mt-2 text-sm leading-6 text-[#62594b]">
          A personal consultation to discuss your property, Vastu concerns
          and recommended next steps.
        </p>

        <p className="mt-6 text-4xl font-bold text-[#9a7339]">
          ₹5,100
        </p>

        <p className="mt-2 text-xs text-[#776d5e]">
          Standard consultation visit
        </p>
      </div>
    </div>

    {/* Horoscope-based selection */}
    <div className="relative overflow-hidden rounded-3xl border border-[#b18b50]/70 bg-gradient-to-br from-[#fffaf0] via-[#f4e5c6] to-[#e5cd9d] p-6 shadow-[0_16px_40px_rgba(91,61,30,0.13)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_rgba(91,61,30,0.19)] sm:p-8">
      <div className="absolute -right-8 -top-8 h-36 w-36 rounded-full bg-white/40 blur-2xl" />

      <div className="relative">
        <span className="inline-flex rounded-full border border-[#b18b50]/50 bg-white/60 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#805b2e]">
          Personalised Selection
        </span>

        <h4 className="mt-5 font-serif text-2xl font-bold text-[#805b2e]">
          Property Selection as per Horoscope
        </h4>

        <p className="mt-2 text-sm leading-6 text-[#514536]">
          Guidance for selecting a new home, office or land, considering
          your horoscope and the property's suitability.
        </p>

        <p className="mt-6 text-4xl font-bold text-[#805b2e]">
          ₹11,000
        </p>

        <p className="mt-2 text-xs text-[#65553f]">
          New home · Office · Land
        </p>
      </div>
    </div>
  </div>
</div>
    {/* PACKAGE CARDS */}
    <ul className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      {servicePackages.map((pkg) => (
        <li
          key={pkg.id}
          className="
            group relative flex flex-col overflow-hidden
            rounded-2xl
            border border-[#b18b50]/45
            bg-gradient-to-br from-[#f8e8c5] via-[#ead5a8] to-[#d6b779]
            p-6
            !text-black
            shadow-[0_15px_40px_rgba(91,61,30,0.12)]
            transition-all duration-300
            hover:-translate-y-1
            hover:border-[#a98249]
            hover:shadow-[0_22px_50px_rgba(91,61,30,0.20)]
          "
        >
          {/* Subtle golden glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-white/30 blur-3xl transition group-hover:bg-white/45"
          />

          <div className="relative z-10 flex flex-1 flex-col">
            <h3 className="font-serif text-2xl font-bold leading-tight !text-black">
              {pkg.name}
            </h3>

            <p className="mt-4 font-serif text-3xl font-bold !text-black">
              {pkg.price}
            </p>

            <p className="mt-4 flex-1 font-medium leading-relaxed !text-black">
              {pkg.tagline}
            </p>

            <button
              type="button"
              onClick={() => setSelected(pkg)}
              className="
                group/button mt-7 inline-flex w-full items-center
                justify-center gap-2 rounded-full
                border border-[#a98249]/70
                bg-[#a98249]/10
                px-5 py-3
                text-sm font-bold uppercase tracking-[0.14em]
                !text-black
                transition-all duration-300
                hover:border-[#805b2e]
                hover:bg-[#a98249]
                hover:!text-black
              "
            >
              See Details
              <ArrowRight
                size={16}
                className="!text-black transition-transform duration-300 group-hover/button:translate-x-1"
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
          overflow-y-auto bg-[#2a1d0e]/75 p-4 backdrop-blur-md
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
            border border-[#b18b50]/50
            bg-gradient-to-br from-[#f8e8c5] via-[#ead5a8] to-[#d6b779]
            p-6 !text-black
            shadow-[0_30px_100px_rgba(42,29,14,0.45)]
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
              border border-[#a98249]/40
              bg-[#a98249]/10 p-2
              !text-black
              transition hover:bg-[#a98249] hover:!text-black
            "
          >
            <X size={18} />
          </button>

          <p className="text-xs font-bold uppercase tracking-[0.2em] !text-black">
            Premium Services
          </p>

          <h2
            id="package-dialog-title"
            className="mt-3 pr-8 font-serif text-3xl font-bold !text-black sm:text-4xl"
          >
            {selected.name}
          </h2>

          <p className="mt-3 font-serif text-3xl font-bold !text-black">
            {selected.price}
          </p>

          <p className="mt-4 leading-relaxed !text-black">
            {selected.tagline}
          </p>

          <div className="my-6 h-px bg-[#a98249]/30" />

          <h3 className="mb-4 text-sm font-bold uppercase tracking-[0.14em] !text-black">
            Services Included
          </h3>

          <ul className="space-y-4">
            {getServices(selected).map((service) => (
              <li
                key={service}
                className="flex items-start gap-3 text-sm leading-relaxed !text-black"
              >
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#a98249]/40 bg-[#a98249]/10">
                  <Check size={15} className="!text-black" />
                </span>

                <span className="!text-black">{service}</span>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={() => setSelected(null)}
            className="
              mt-8 w-full rounded-full
              border border-[#a98249]
              bg-[#a98249]
              px-6 py-3.5
              text-sm font-bold uppercase tracking-[0.14em]
              !text-black
              transition hover:bg-[#d6b779] hover:!text-black
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
