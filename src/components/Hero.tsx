import { Highlight } from './ui/Highlight';

type HeroProps = {
  heroRef: React.RefObject<HTMLElement | null>;
  heroArchRef: React.RefObject<HTMLDivElement | null>;
  stageRef: React.RefObject<HTMLDivElement | null>;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
};

export const Hero = ({ heroRef, heroArchRef, stageRef, canvasRef }: HeroProps) => (
  <section
    ref={heroRef}
    id="hero"
    className="section-py pb-[clamp(4rem,8vw,7rem)] pt-[clamp(3rem,6vw,5rem)]"
    aria-labelledby="hero-title"
  >
    <div className="container-sark grid items-center gap-10 sm:gap-12 lg:grid-cols-2 lg:gap-16">
      <div>
        <h1
          id="hero-title"
          className="mb-6 font-serif text-[clamp(2.25rem,5vw,3.75rem)] font-bold leading-[1.15]"
        >
          The right SEO to boost <Highlight variant="hero">your rankings</Highlight>
        </h1>
        <p className="mb-8 max-w-[500px] text-base leading-7 text-muted">
          Search engine optimization is an ever-changing practice dictated by updates
          in algorithms &amp; technological innovation. Get discovered by the right SEO agency.
        </p>
        <a
          href="#contact"
          className="inline-flex w-full items-center justify-center rounded-xl bg-accent px-8 py-4 text-base font-bold text-heading transition hover:-translate-y-px hover:bg-accent-green hover:shadow-[0_4px_16px_rgba(111,232,137,0.4)] sm:w-auto"
        >
          Get Started Free
        </a>
        <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-4 sm:mt-9 sm:gap-x-5">
          <div className="relative h-10 w-14 shrink-0" aria-hidden="true">
            <span className="absolute left-0 top-0 h-10 w-10 scale-[0.88] rounded-full border-2 border-white bg-gradient-to-br from-[#c8b8a8] to-[#9a8b7a] opacity-55 shadow-[0_4px_24px_rgba(0,0,0,0.06)]" />
            <span className="absolute left-3.5 top-0 z-[1] h-10 w-10 rounded-full border-2 border-white bg-gradient-to-br from-[#c8b8a8] to-[#9a8b7a] shadow-[0_4px_24px_rgba(0,0,0,0.06)]" />
          </div>
          <div className="flex flex-col gap-0.5 text-[0.8rem] text-muted">
            <strong className="text-[1.05rem] font-bold leading-tight text-heading">38,482</strong>
            <span>Happy Customers</span>
          </div>
          <span className="h-9 w-px shrink-0 bg-border" aria-hidden="true" />
          <div className="flex flex-col gap-0.5 text-[0.8rem] text-muted">
            <strong className="text-[1.05rem] font-bold leading-tight text-heading">4.8/5</strong>
            <span className="text-[0.75rem] tracking-[2px] text-[#f5a623]" aria-label="4.8 out of 5 stars">★★★★★</span>
            <span>Rating</span>
          </div>
        </div>
      </div>

      <div ref={heroArchRef} className="arch-frame mx-auto w-full max-w-[min(460px,100%)]" id="heroArch">
        <div ref={stageRef} className="robot-stage" id="robotStage">
          <canvas ref={canvasRef} id="robotCanvas" className="arch-frame__canvas" />
          <p
            id="robotHint"
            className="pointer-events-none absolute bottom-4 left-0 right-0 z-[3] text-center text-[0.72rem] text-muted"
          >
            Kéo để xoay · Scroll để zoom
          </p>
        </div>
      </div>
    </div>
  </section>
);
