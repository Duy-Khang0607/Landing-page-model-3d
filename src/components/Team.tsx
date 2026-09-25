import { Highlight } from './ui/Highlight';
import { SectionTitle } from './ui/SectionTitle';

const members = [
  { name: 'Esther Howard', role: 'Senior SEO Manager', img: '/assets/images/team-esther.jpg' },
  { name: 'Leslie Alexander', role: 'SEO Executive', placeholder: true },
  { name: 'Savannah Nguyen', role: 'Account Manager', img: '/assets/images/team-savannah.jpg' },
];

export const Team = () => (
  <section className="section-py bg-white" id="team" aria-labelledby="team-title">
    <div className="container-sark">
      <header className="mb-[clamp(2.5rem,6vw,4.5rem)] grid gap-5 text-center md:grid-cols-2 md:items-end md:gap-6 md:text-left">
        <SectionTitle id="team-title" className="max-w-[526px]">
          <Highlight variant="team">Meet our amazing SEO</Highlight> team for your business
        </SectionTitle>
        <p className="m-0 mx-auto max-w-[34rem] text-[0.95rem] leading-8 text-muted md:mx-0">
          Our SEO team will take the time to truly understand your business, your goals,
          and your mission. We recognize that your needs are unique, and that&apos;s what inspires our team.
        </p>
      </header>
      <div className="grid justify-items-center gap-10 md:grid-cols-3 md:gap-8">
        {members.map((m) => (
          <article key={m.name} className="w-full max-w-[260px] text-center">
            {m.placeholder ? (
              <div
                className="mx-auto mb-6 aspect-square w-full max-w-[220px] rounded-full border border-border bg-white"
                role="img"
                aria-label={m.name}
              />
            ) : (
              <img
                src={m.img}
                alt={m.name}
                className="mx-auto mb-6 aspect-square w-full max-w-[220px] rounded-full bg-[#d8c4a8] object-cover"
                width={220}
                height={220}
                loading="lazy"
              />
            )}
            <h3 className="mb-1 font-serif text-[1.1rem]">{m.name}</h3>
            <p className="text-[0.85rem] text-muted">{m.role}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
);
