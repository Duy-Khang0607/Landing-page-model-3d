import { Highlight } from './ui/Highlight';
import { SectionTitle } from './ui/SectionTitle';

const features = [
  {
    title: 'Initial SEO Project',
    desc: 'Comprehensive website audit and keyword research to establish a strong SEO foundation for your business.',
    icon: (
      <svg className="mx-auto mb-6 h-16 w-16 text-heading" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
        <rect x="8" y="40" width="12" height="16" rx="2" />
        <rect x="26" y="28" width="12" height="28" rx="2" />
        <rect x="44" y="16" width="12" height="40" rx="2" />
      </svg>
    ),
  },
  {
    title: 'SEO Audit & Strategy',
    desc: 'In-depth technical analysis and custom strategy development to fix issues and maximize search performance.',
    icon: (
      <svg className="mx-auto mb-6 h-16 w-16 text-heading" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
        <path d="M32 12v8M20 20l6 6M44 20l-6 6" />
        <circle cx="32" cy="32" r="12" />
        <path d="M32 44v8M20 44l6-6M44 44l-6-6" />
      </svg>
    ),
  },
  {
    title: 'Local SEO Project',
    desc: 'Target local customers with optimized Google Business profiles, local citations, and geo-targeted content.',
    icon: (
      <svg className="mx-auto mb-6 h-16 w-16 text-heading" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
        <rect x="16" y="16" width="32" height="32" rx="4" />
        <circle cx="32" cy="32" r="8" />
        <path d="M32 24v-4M32 44v-4M24 32h-4M44 32h-4" />
      </svg>
    ),
  },
];

export const Features = () => (
  <section className="section-py" id="features" aria-labelledby="features-title">
    <div className="container-sark">
      <header className="mx-auto mb-[clamp(2.5rem,5vw,4rem)] max-w-[526px] text-center">
        <SectionTitle id="features-title">
          <Highlight variant="features">Awesome features</Highlight> optimizing your website
        </SectionTitle>
      </header>
      <div className="grid gap-6 sm:gap-8 md:grid-cols-3 md:gap-10">
        {features.map((f) => (
          <article key={f.title} className="feature-card px-4 py-7 text-center sm:px-6 sm:py-8">
            {f.icon}
            <h3 className="mb-3 font-serif text-xl">{f.title}</h3>
            <p className="text-[0.9rem] leading-7 text-muted">{f.desc}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
);
