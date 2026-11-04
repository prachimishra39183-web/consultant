
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
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-500 ${
        scrolled || open
          ? 'border-[#B18B50]/60 shadow-[0_8px_30px_rgba(112,78,24,0.15)]'
          : 'border-[#B18B50]/35'
      }`}
      style={{
        backgroundImage: `
          linear-gradient(
            rgba(247, 232, 195, 0.96),
            rgba(232, 211, 162, 0.96)
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
       {/* CIRCULAR LOGO */}
<a
  href="#top"
  onClick={() => setOpen(false)}
  className="group relative z-50 flex shrink-0 items-center"
  aria-label="Home"
>
  <div className="relative mx-auto w-full max-w-[170px] overflow-hidden rounded-2xl border-2 border-[#B58A30] bg-[#F8EBCB] p-1 shadow-[0_3px_12px_rgba(112,78,24,0.15)] transition-all duration-300">
    <img
      src="/logoo.png"
      alt="Acharya Sunil Mahatma Astro Vastu Expert"
      className="block h-auto w-full object-contain"
      style={{
        objectFit: "contain",
        objectPosition: "center",
      }}
    />
  </div>
</a>
        {/* DESKTOP NAVIGATION */}
        <ul className="hidden items-center gap-7 lg:flex xl:gap-9">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="group relative py-3 text-[11px] font-bold uppercase tracking-[0.16em] text-[#49351B] transition-colors duration-300 hover:text-[#91651E]"
              >
                {link.label}

                <span className="absolute bottom-1 left-0 h-[2px] w-0 rounded-full bg-[#A87920] transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        {/* DESKTOP CTA */}
        <a
  href="#consultation-enquiry"
  className="group hidden items-center gap-3 rounded-full border-2 border-[#3B2810] bg-[#F2D9A0] px-5 py-3 text-[11px] font-black uppercase tracking-[0.14em] text-[#3B2810] lg:flex"
  style={{
    color: "#3B2810",
    opacity: 1,
    visibility: "visible",
    WebkitTextFillColor: "#3B2810",
  }}
>
  <Sparkles size={14} color="#3B2810" strokeWidth={1.7} />

  <span style={{ color: "#3B2810", WebkitTextFillColor: "#3B2810" }}>
    Enquire now
  </span>

  <ArrowUpRight
    size={15}
    color="#3B2810"
    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
  />
</a>

        {/* MOBILE MENU BUTTON */}
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          className="relative z-50 rounded-full border border-[#A87920]/60 bg-[#F8EBCB] p-3 text-[#49351B] transition-colors hover:bg-[#D9B66F] lg:hidden"
        >
          {open ? <X size={21} /> : <Menu size={21} />}
        </button>
      </nav>

      {/* MOBILE MENU */}
      <div
        className={`absolute inset-x-0 top-full overflow-hidden border-b border-[#B18B50]/50 bg-gradient-to-b from-[#F7E8C3] to-[#E8D3A2] shadow-[0_15px_35px_rgba(112,78,24,0.16)] transition-all duration-300 lg:hidden ${
          open
            ? 'visible translate-y-0 opacity-100'
            : 'invisible -translate-y-2 opacity-0'
        }`}
      >
        <div className="px-6 pb-7 pt-3 sm:px-9">
          <p className="mb-4 text-[9px] font-extrabold uppercase tracking-[0.24em] text-[#805719]">
            Explore
          </p>

          <ul className="divide-y divide-[#A87920]/20">
            {navLinks.map((link, index) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between py-4 font-serif text-2xl font-semibold text-[#49351B] transition-colors hover:text-[#91651E]"
                >
                  <span>{link.label}</span>

                  <span className="font-sans text-xs font-bold text-[#91651E]">
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
            className="mt-6 flex items-center justify-between rounded-full border border-[#A87920]/70 bg-gradient-to-r from-[#B58A30] via-[#F2D9A0] to-[#D4AF62] px-5 py-4 text-sm font-extrabold text-[#3B2810] transition-all hover:shadow-[0_5px_18px_rgba(112,78,24,0.2)]"
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
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#A87920]/60 bg-[#F8EBCB] text-[#49351B] transition-all duration-300 hover:bg-[#D6B16A] hover:text-[#2B1D0B]"
            >
              <LockKeyhole size={17} />
            </a>
          </div>

          <p className="mt-5 text-center text-[9px] font-bold uppercase tracking-[0.2em] text-[#765B2E]">
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
    'Palmist',
  ];

  return (
    <div
  className="expertise-marquee mt-6"
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
