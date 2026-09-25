import { Highlight } from './ui/Highlight';
import { SectionTitle } from './ui/SectionTitle';
import { StatCounter } from './StatCounter';

type VisibilityProps = {
  visibilityArchRef: React.RefObject<HTMLDivElement | null>;
};

export const Visibility = ({ visibilityArchRef }: VisibilityProps) => (
  <section className="section-py" id="about" aria-labelledby="visibility-title">
    <div className="container-sark grid items-center gap-10 md:grid-cols-2 md:gap-12">
      <div ref={visibilityArchRef} className="arch-frame arch-frame--left order-2 md:order-1" id="visibilityArch">
        <div className="arch-frame__inner absolute inset-0 z-[2] flex items-center justify-center transition-opacity duration-350">
          <button
            type="button"
            className="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-white shadow-[0_4px_24px_rgba(0,0,0,0.06)] transition hover:scale-105 hover:shadow-[0_8px_28px_rgba(0,0,0,0.12)]"
            id="visibilityPlay"
            aria-label="Play video demo"
          >
            <svg className="ml-1 h-6 w-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
        </div>
      </div>

      <div className="order-1 md:order-2">
        <SectionTitle id="visibility-title" className="max-w-[526px]">
          We favor increasing the <Highlight variant="visibility">visibility of the website</Highlight>
        </SectionTitle>
        <p className="text-[0.95rem] leading-7 text-muted">
          Our data-driven approach ensures your website reaches the right audience.
          We analyze search patterns, optimize content, and build authority to
          deliver measurable growth in organic traffic.
        </p>
        <div className="mt-8 grid grid-cols-2 gap-5 sm:mt-10 sm:gap-8">
          <StatCounter target={70} suffix="k+" label="SEO report analyzed" />
          <StatCounter target={156} suffix="+" label="Skilled members" />
        </div>
      </div>
    </div>
  </section>
);
