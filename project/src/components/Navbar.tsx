
import { useEffect, useState } from 'react';
import {
  Menu,
  X,
  ArrowUpRight,
  Sparkles,
  LockKeyhole,
} from 'lucide-react';

const navLinks = [
  { label: 'Approach', href: '#approach' },
  { label: 'Seven Layers', href: '#seven-layers' },
  { label: 'Packages', href: '#packages' },
  { label: 'Consultation', href: '#consultation' },
  { label: 'Enquire', href: '#consultation-enquiry' },
  { label: 'Admin', href: '/admin/login' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled || open
          ? 'border-b border-[#D6B16A]/50 shadow-[0_8px_30px_rgba(0,0,0,0.25)]'
          : 'border-b border-[#D6B16A]/30'
      }`}
      style={{
        backgroundImage: `
          linear-gradient(
            rgba(2, 39, 31, 0.92),
            rgba(2, 39, 31, 0.92)
          ),
          url("/hp.png")
        `,
        backgroundSize: 'cover',
        backgroundPosition: 'center 15%',
        backgroundRepeat: 'no-repeat',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
    >
      <nav className="mx-auto flex h-[76px] max-w-[1380px] items-center justify-between px-5 sm:px-8 lg:h-[86px] lg:px-12">
        {/* LOGO */}
        <a
          href="#top"
          onClick={() => setOpen(false)}
          className="group relative z-50 flex shrink-0 items-center gap-3"
          aria-label="Home"
        >
          <img
            src="/logoo.jpeg"
            alt="Acharya Sunil Mahatma logo"
            className="h-14 w-14 object-contain transition-transform duration-300 group-hover:scale-105 sm:h-[74px] sm:w-[74px]"
          />

          <span className="flex flex-col">
            <span className="font-serif text-lg font-medium leading-tight tracking-wide text-[#F8F1E4] sm:text-xl">
              Acharya Sunil Mahatma
            </span>

            <span className="mt-1 text-[8px] font-semibold uppercase tracking-[0.22em] text-[#D6B16A] sm:text-[9px]">
              Astro Vastu · Astrology
            </span>
          </span>
        </a>

        {/* DESKTOP NAVIGATION */}
        <ul className="hidden items-center gap-7 lg:flex xl:gap-9">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="group relative py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#F5EBDD] transition-colors duration-300 hover:text-[#D6B16A]"
              >
                {link.label}

                <span className="absolute bottom-1 left-0 h-px w-0 bg-[#D6B16A] transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        {/* DESKTOP CTA */}
        <a
          href="#consultation-enquiry"
          className="group hidden items-center gap-3 rounded-full border border-[#D6B16A]/60 bg-[#1C2923] px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#F8F1E4] transition-all duration-300 hover:border-[#D6B16A] hover:bg-[#947341] lg:flex"
        >
          <Sparkles size={14} strokeWidth={1.4} />

          <span>Enquire now</span>

          <ArrowUpRight
            size={15}
            className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </a>

        {/* MOBILE MENU BUTTON */}
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          className="relative z-50 rounded-full border border-[#D6B16A]/50 bg-[#1C2923]/60 p-3 text-[#F5EBDD] transition-colors hover:bg-[#D6B16A]/20 lg:hidden"
        >
          {open ? <X size={21} /> : <Menu size={21} />}
        </button>
      </nav>

      {/* MOBILE MENU */}
      <div
        className={`absolute inset-x-0 top-full overflow-hidden border-b border-[#D6B16A]/40 bg-[#171D19] shadow-xl transition-all duration-300 lg:hidden ${
          open
            ? 'visible translate-y-0 opacity-100'
            : 'invisible -translate-y-2 opacity-0'
        }`}
      >
        <div className="px-6 pb-7 pt-3 sm:px-9">
          <p className="mb-4 text-[9px] font-semibold uppercase tracking-[0.24em] text-[#D6B16A]">
            Explore
          </p>

          <ul className="divide-y divide-[#D6B16A]/15">
            {navLinks.map((link, index) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between py-4 font-serif text-2xl text-[#F5EBDD] transition-colors hover:text-[#D6B16A]"
                >
                  <span>{link.label}</span>

                  <span className="font-sans text-xs text-[#D6B16A]/70">
                    0{index + 1}
                  </span>
                </a>
              </li>
            ))}
          </ul>

          {/* MOBILE CTA */}
          <a
            href="#consultation-enquiry"
            onClick={() => setOpen(false)}
            className="mt-6 flex items-center justify-between rounded-full border border-[#D6B16A]/50 bg-[#302A20] px-5 py-4 text-sm font-medium text-[#F8F1E4] transition-colors hover:bg-[#947341]"
          >
            Begin your enquiry
            <ArrowUpRight size={18} />
          </a>

          {/* MOBILE ADMIN */}
          <div className="mt-5 flex justify-center">
            <a
              href="/admin/login"
              aria-label="Admin login"
              title="Admin login"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#D6B16A]/50 bg-[#252A23] text-[#F5EBDD] transition-all duration-300 hover:bg-[#D6B16A] hover:text-[#1C1A18]"
            >
              <LockKeyhole size={17} />
            </a>
          </div>

          <p className="mt-5 text-center text-[9px] uppercase tracking-[0.2em] text-[#B9AD99]">
            Astro Vastu · Astrology · Numerology
          </p>
        </div>
      </div>
    </header>
  );
}

export function MovingExpertiseBar() {
  const services = [
    'Astro Vastu',
    'Astrology',
    'Numerology',
    'Personal Consultation',
  ];

  return (
    <div
      className="expertise-marquee"
      aria-label="Astro Vastu, Astrology and Numerology"
    >
      <div className="expertise-track">
        {[0, 1].map((copy) => (
          <div
            className="expertise-group"
            key={copy}
            aria-hidden={copy === 1}
          >
            {services.map((service) => (
              <span className="expertise-item" key={service}>
                <span>{service}</span>
                <span className="expertise-star">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
