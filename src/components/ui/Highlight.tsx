type HighlightVariant = 'hero' | 'features' | 'visibility' | 'services' | 'team' | 'frequently';

const skewMap: Record<HighlightVariant, string> = {
  hero: 'hl-hero',
  features: 'hl-skew hl-skew--features',
  visibility: 'hl-skew hl-skew--visibility',
  services: 'hl-skew hl-skew--services',
  team: 'hl-skew hl-skew--team',
  frequently: 'hl-skew hl-skew--frequently',
};

type HighlightProps = {
  variant: HighlightVariant;
  children: React.ReactNode;
};

export const Highlight = ({ variant, children }: HighlightProps) => (
  <span className={skewMap[variant]}>{children}</span>
);
