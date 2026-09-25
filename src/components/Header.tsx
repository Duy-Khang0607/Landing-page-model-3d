import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const links = [
  { href: '#hero', label: 'Demos' },
  { href: '#about', label: 'About' },
  { href: '#features', label: 'Blog' },
  { href: '#services', label: 'Pages' },
  { href: '#contact', label: 'Contact' },
];

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('menu-open', mobileOpen);
    return () => document.body.classList.remove('menu-open');
  }, [mobileOpen]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  const closeMobile = () => setMobileOpen(false);

  const mobileMenu = mobileOpen
    ? createPortal(
        <div className="mobile-menu" role="dialog" aria-modal="true" aria-label="Mobile navigation">
          <div className="mobile-menu__top">
            <a href="#" className="mobile-menu__brand" onClick={closeMobile} aria-label="Sark home">
              <img src="/assets/images/logo-sark.svg" alt="" width={32} height={32} />
              Sark
            </a>
            <button
              type="button"
              className="mobile-menu__close"
              aria-label="Close menu"
              onClick={closeMobile}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <nav id="mobile-nav" className="mobile-menu__nav" aria-label="Mobile navigation">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="mobile-menu__link" onClick={closeMobile}>
                {l.label}
              </a>
            ))}
          </nav>

          <div className="mobile-menu__actions">
            <a href="#" className="mobile-menu__login" onClick={closeMobile}>Login</a>
            <a href="#contact" className="mobile-menu__cta" onClick={closeMobile}>
              Get Started Free
            </a>
          </div>
        </div>,
        document.body,
      )
    : null;

  return (
    <header
      id="header"
      className={`sticky top-0 z-[100] h-16 border-b border-transparent bg-cream/92 backdrop-blur-md transition-shadow duration-300 sm:h-20 ${scrolled ? 'border-border shadow-[0_4px_24px_rgba(0,0,0,0.06)]' : ''}`}
    >
      <div className="container-sark flex h-full items-center justify-between gap-3 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:gap-4">
        <a href="#" className="flex min-w-0 items-center gap-2 text-lg font-bold sm:text-xl lg:justify-self-start" aria-label="Sark home">
          <img src="/assets/images/logo-sark.svg" alt="" className="h-7 w-7 shrink-0 sm:h-8 sm:w-8" width={32} height={32} />
          Sark
        </a>

        <nav className="hidden gap-9 lg:flex lg:justify-self-center" aria-label="Main navigation">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-[0.95rem] font-medium text-heading transition-colors hover:text-heading">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-3 sm:gap-4 lg:justify-self-end">
          <a href="#" className="hidden text-[0.95rem] font-medium lg:block">Login</a>
          <a
            href="#contact"
            className="hidden rounded-[10px] bg-heading px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#333] lg:inline-flex"
          >
            Get Started Free
          </a>
          <button
            type="button"
            className={`nav-toggle lg:hidden ${mobileOpen ? 'is-open' : ''}`}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            onClick={() => setMobileOpen((o) => !o)}
          >
            <span className="nav-toggle__bar" />
            <span className="nav-toggle__bar" />
            <span className="nav-toggle__bar" />
          </button>
        </div>
      </div>

      {mobileMenu}
    </header>
  );
};
