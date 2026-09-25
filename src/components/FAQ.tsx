import { useState } from 'react';
import { Highlight } from './ui/Highlight';
import { SectionTitle } from './ui/SectionTitle';

const faqs = [
  {
    q: 'What is SEO and why does my business need it?',
    a: 'SEO (Search Engine Optimization) improves your website\'s visibility in search results. It helps attract organic traffic, build credibility, and generate leads without ongoing ad spend.',
  },
  {
    q: 'How long does it take to see SEO results?',
    a: 'Most businesses see noticeable improvements within 3–6 months. Competitive niches may take longer, but our data-driven approach accelerates progress with continuous optimization.',
  },
  {
    q: 'What is the difference between on-page and off-page SEO?',
    a: 'On-page SEO optimizes elements on your website (content, meta tags, structure). Off-page SEO builds authority through backlinks, social signals, and brand mentions.',
  },
  {
    q: 'Do you offer local SEO services?',
    a: 'Yes! We specialize in local SEO including Google Business Profile optimization, local citations, and geo-targeted content to help you dominate local search results.',
  },
  {
    q: 'How do you measure SEO success?',
    a: 'We track keyword rankings, organic traffic, conversion rates, and ROI. Monthly reports provide transparent insights into your campaign\'s performance and growth.',
  },
];

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="section-py" id="faq" aria-labelledby="faq-title">
      <div className="container-sark">
        <header className="mx-auto mb-[clamp(2.5rem,5vw,4rem)] max-w-[526px] text-center">
          <SectionTitle id="faq-title">
            <Highlight variant="frequently">Frequently asked</Highlight> question
          </SectionTitle>
        </header>
        <div className="mx-auto max-w-[800px]" role="list">
          {faqs.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={item.q}
                role="listitem"
                className={`faq-item border-b border-border ${isOpen ? 'is-open' : ''}`}
              >
                <button
                  type="button"
                  className="faq-item__question flex w-full items-center justify-between gap-3 py-4 text-left font-serif text-[0.95rem] font-semibold sm:gap-4 sm:py-5 sm:text-[1.05rem]"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? -1 : i)}
                >
                  {item.q}
                  <span
                    className="faq-item__icon flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border text-[1.1rem] transition"
                    aria-hidden="true"
                  >
                    +
                  </span>
                </button>
                <div className="faq-item__answer max-h-0 overflow-hidden transition-[max-height,padding] duration-400">
                  <p className="text-[0.9rem] leading-7 text-muted">{item.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
