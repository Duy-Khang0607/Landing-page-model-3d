import { Highlight } from './ui/Highlight';
import { SectionTitle } from './ui/SectionTitle';

const services = [
  { title: 'Target Analysis', desc: 'Target analysis is an examination of potential targets to determine military importance.' },
  { title: 'Content Optimization', desc: 'Content optimization is the process of making sure content is written in a way that it can reach.' },
  { title: 'Keyword Research', desc: 'Keyword research is the process by which you research popular search engines like Google.' },
  { title: 'Continuous Testing', desc: 'Continuous Testing is the process of executing automated tests as part of the software delivery.' },
  { title: 'E-Commerce SEO', desc: 'Ecommerce SEO is the process of making your online store more visible in the search engine.' },
  { title: 'Website Migrations', desc: 'A site migration is a term broadly used by SEO professionals to describe any event website.' },
];

export const Services = () => (
  <section className="section-py" id="services" aria-labelledby="services-title">
    <div className="container-sark">
      <header className="mx-auto mb-[clamp(2.5rem,5vw,4rem)] max-w-[550px] text-center">
        <SectionTitle id="services-title">
          Qualities &amp; customizable <Highlight variant="services">ideal SEO services</Highlight>
        </SectionTitle>
      </header>
      <div className="grid gap-0 sm:gap-px md:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => (
          <article key={s.title} className="service-card flex min-h-full flex-col items-start border-b border-border px-4 py-7 sm:px-6 sm:py-8 md:px-7">
            <h3 className="mb-3.5 font-serif text-[1.2rem] font-bold">{s.title}</h3>
            <p className="mb-6 flex-1 text-[0.92rem] leading-7 text-muted">{s.desc}</p>
            <a href="#" className="mt-auto inline-flex items-center gap-1.5 text-[0.9rem] font-bold text-heading transition-[gap] hover:gap-2.5">
              Discover More <span aria-hidden="true">→</span>
            </a>
          </article>
        ))}
      </div>
    </div>
  </section>
);
