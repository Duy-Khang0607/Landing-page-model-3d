import { useState } from 'react';

export const Footer = () => {
  const [placeholder, setPlaceholder] = useState('Enter your email');

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = e.currentTarget.querySelector('input');
    if (input?.value) {
      input.value = '';
      setPlaceholder('Subscribed!');
      setTimeout(() => setPlaceholder('Enter your email'), 2000);
    }
  };

  return (
    <footer className="bg-cream py-12 pb-8 sm:py-[4.5rem] sm:pb-10">
      <div className="container-sark mx-auto max-w-[1296px]">
        <div className="mb-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-[306px_repeat(3,minmax(0,1fr))] lg:gap-[clamp(2rem,5vw,5.5rem)]">
          <div className="max-w-[306px] sm:col-span-2 lg:col-span-1">
            <a href="#" className="flex items-center gap-2 text-[1.35rem] font-bold">
              <img src="/assets/images/logo-sark.svg" alt="" className="h-8 w-8" width={32} height={32} />
              Sark
            </a>
            <p className="mt-4 mb-5 text-sm leading-7 text-muted">
              There are many variations of passages of Lorem the Ipsum available it majority.
            </p>
            <form className="footer__subscribe" aria-label="Newsletter signup" onSubmit={onSubmit}>
              <div className="flex h-[50px] w-full max-w-full items-center gap-2 rounded-[3px] bg-white p-[5px] sm:max-w-[306px]">
                <input
                  type="email"
                  placeholder={placeholder}
                  aria-label="Email address"
                  required
                  className="min-w-0 flex-1 border-none bg-transparent pl-[11px] text-sm leading-5 text-heading outline-none placeholder:text-light"
                />
                <button
                  type="submit"
                  className="h-10 shrink-0 rounded-[3px] bg-accent px-4 text-sm font-semibold text-heading hover:opacity-85"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>

          <div>
            <h4 className="mb-5 text-base font-bold text-heading">Services</h4>
            <ul className="flex max-w-[147px] flex-col gap-3.5 text-sm leading-6 text-heading/80">
              {['Incident Responder', 'Secure Managed IT', 'Check website Url', 'Locker Security'].map((l) => (
                <li key={l}><a href="#" className="hover:opacity-100">{l}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-5 text-base font-bold text-heading">About Us</h4>
            <ul className="flex max-w-[147px] flex-col gap-3.5 text-sm leading-6 text-heading/80">
              {['Payment Plans', 'Make saving More', 'Tax Calculator', 'Talk To Us'].map((l) => (
                <li key={l}><a href="#" className="hover:opacity-100">{l}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-5 text-base font-bold text-heading">Contact Info</h4>
            <ul className="flex flex-col gap-4 text-sm leading-relaxed text-heading/80">
              <li>455 West Orchard Street Kings Mountain, NC 280867</li>
              <li className="flex items-start gap-2">
                <svg className="mt-0.5 h-[18px] w-[18px] shrink-0 text-accent" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path d="M4 3h3l1.5 4-2 1.2a11 11 0 005.3 5.3L12 11.5 16 13v3a1 1 0 01-1.1 1A14 14 0 013 4.1 1 1 0 014 3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                </svg>
                <a href="tel:+0882466422710">+088 (246) 642-27-10</a>
              </li>
              <li className="flex items-start gap-2">
                <svg className="mt-0.5 h-[18px] w-[18px] shrink-0 text-accent" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <rect x="3" y="5" width="14" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M3 6.5l7 5 7-5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                </svg>
                <a href="mailto:example@gmail.com">example@gmail.com</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border pt-7 text-center text-sm leading-6 text-heading/80">
          <p>&copy; 2022 Sharko All Rights Reserved. Designed by Finestdevs</p>
        </div>
      </div>
    </footer>
  );
};
