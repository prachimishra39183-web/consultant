import type { ReactNode } from 'react';

type SectionShellProps = {
  id: string;
  eyebrow: string;
  title: string;
  children?: ReactNode;
  className?: string;
};

export default function SectionShell({ id, eyebrow, title, children, className = '' }: SectionShellProps) {
  return (
    <section id={id} className={`scroll-mt-20 px-6 py-24 lg:px-8 ${className}`}>
      <div className="mx-auto max-w-6xl">
        <header className="mb-12 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-bronze-700">{eyebrow}</p>
          <h2 className="mt-4 font-serif text-4xl leading-tight text-ink-900 md:text-5xl">{title}</h2>
        </header>
        <div id={`${id}-content`} className="min-h-[24rem]">
          {children}
        </div>
      </div>
    </section>
  );
}
