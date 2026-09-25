type SectionTitleProps = {
  id?: string;
  className?: string;
  children: React.ReactNode;
};

export const SectionTitle = ({ id, className = '', children }: SectionTitleProps) => (
  <h2
    id={id}
    className={`font-serif text-[clamp(1.875rem,4vw,3rem)] font-semibold leading-[1.208] text-heading lg:text-[48px] lg:leading-[58px] ${className}`}
  >
    {children}
  </h2>
);
