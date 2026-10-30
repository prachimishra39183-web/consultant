# Project memory

## Product intent & audience

- Astro-Vastu consultation platform: service packages, gemstone guidance, online astrology consultations, payment-first booking, and admin dashboard.
- Audience: prospective clients seeking Astro-Vastu / astrology consultations and gemstone guidance; site admin manages bookings, clients, payments.
- Owner will paste bespoke content (package inclusions, gemstone details, copy) later.

## Brand personality & voice

- Professional, consultancy-oriented; premium, trustworthy, understated elegance.
- Ivory theme conveys warm, refined tone.

## Visual design & UX direction

- Ivory-themed palette (warm off-white base, dark text for contrast); accent colors TBD by owner.
- Fixed top nav; current links: Approach, Seven Layers, Consultation, Enquire, Packages.
- Responsive: nav collapses to mobile menu.
- Icons via lucide-react; styling via Tailwind; JSX + React hooks; `@/` import alias (`src/`).
- Premium, production-quality presentation; not cookie-cutter.

## Decisions, constraints & rationale

- Vite + React + Tailwind template; no extra UI packages beyond template defaults.
- Section files under `src/components/sections/`; nav in `src/components/Navbar.tsx`.
- Service Packages section built and wired into page + nav. Four packages (Gold ₹2,50,000; Silver ₹1,50,000; Bronze ₹80,000; Basic ₹30,000–₹50,000) with enquiry buttons. Prices displayed; inclusions intentionally omitted pending owner input.
- Enquiry form (general + per-package) saves to database via Supabase; public insert-only access enabled on `enquiries` table.
- Build and type-check pass cleanly; visual preview not yet confirmed.

## Open questions & assumptions

- Payment provider/gateway not chosen — needed for ₹5,100 standard and ₹6,100 urgent consultation booking flow (payment-first, server-verified before slot selection).
- Admin authentication approach undefined — who can access dashboard, sign-in method.
- Package inclusions, gemstone specifics, and online astrology copy not yet provided — placeholders only; do not invent.
- Ivory palette specifics (exact hex, accents) and typography not locked.
- Calendar booking system, urgent consultation flow, admin dashboard, gemstone section, and online astrology section all still pending.
- Whether the extra hero section should remain is unconfirmed.