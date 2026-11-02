
import { useEffect, useState } from 'react';
import { Menu, X, ArrowUpRight, Sparkles,LockKeyhole } from 'lucide-react';

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
          ? 'border-b border-[#d9cfbc]/80 bg-[#f8f5ed]/95 shadow-[0_8px_30px_rgba(41,45,36,0.06)] backdrop-blur-xl'
          : 'bg-[#f8f5ed]/75 backdrop-blur-md'
      }`}
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
            <span className="font-serif text-lg font-medium leading-tight tracking-wide text-[#292d24] sm:text-xl">
              Acharya Sunil Mahatma
            </span>
            <span className="mt-1 text-[8px] font-semibold uppercase tracking-[0.22em] text-[#947341] sm:text-[9px]">
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
                className="group relative py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#57594e] transition-colors duration-300 hover:text-[#947341]"
              >
                {link.label}
                <span className="absolute bottom-1 left-0 h-px w-0 bg-[#b9955b] transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        {/* DESKTOP CTA */}
        <a
         href="#consultation-enquiry"
          className="group hidden items-center gap-3 rounded-full border border-[#b9955b]/60 bg-[#292d24] px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#fff9ed] transition-all duration-300 hover:border-[#292d24] hover:bg-[#947341] lg:flex"
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
          className="relative z-50 rounded-full border border-[#d9cfbc] p-3 text-[#292d24] transition-colors hover:bg-[#eee7d9] lg:hidden"
        >
          {open ? <X size={21} /> : <Menu size={21} />}
        </button>
      </nav>

      {/* MOBILE MENU */}
      <div
        className={`absolute inset-x-0 top-full overflow-hidden border-b border-[#d9cfbc] bg-[#f8f5ed] shadow-xl transition-all duration-300 lg:hidden ${
          open
            ? 'visible translate-y-0 opacity-100'
            : 'invisible -translate-y-2 opacity-0'
        }`}
      >
        <div className="px-6 pb-7 pt-3 sm:px-9">
          <p className="mb-4 text-[9px] font-semibold uppercase tracking-[0.24em] text-[#947341]">
            Explore
          </p>

          <ul className="divide-y divide-[#e4dccd]">
            {navLinks.map((link, index) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between py-4 font-serif text-2xl text-[#292d24] transition-colors hover:text-[#947341]"
                >
                  <span>{link.label}</span>
                  <span className="font-sans text-xs text-[#a18a65]">
                    0{index + 1}
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#consultation-enquiry"
            onClick={() => setOpen(false)}
            className="mt-6 flex items-center justify-between rounded-full bg-[#292d24] px-5 py-4 text-sm font-medium text-[#fff9ed] transition-colors hover:bg-[#947341]"
          >
            Begin your enquiry
            <ArrowUpRight size={18} />
          </a>
         
         <a
  href="/admin/login"
  aria-label="Admin login"
  title="Admin login"
  className="ml-3 inline-flex h-10 w-10 items-center justify-center
             rounded-full border border-[#C9B68D]
             text-[#344333] transition-all duration-300
             hover:bg-[#344333] hover:text-[#F7F3EA]"
>
  <LockKeyhole size={17} />
</a>
          <p className="mt-5 text-center text-[9px] uppercase tracking-[0.2em] text-[#858274]">
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
    <div className="expertise-marquee" aria-label="Astro Vastu, Astrology and Numerology">
      <div className="expertise-track">
        {[0, 1].map((copy) => (
          <div className="expertise-group" key={copy} aria-hidden={copy === 1}>
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
