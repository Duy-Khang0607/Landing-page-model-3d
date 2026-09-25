export const Brands = () => (
  <section className="border-y border-border bg-white py-7 sm:py-9" id="brands" aria-label="Trusted brands">
    <div className="container-sark flex min-h-[72px] flex-col items-center justify-center gap-6 sm:flex-row sm:flex-wrap sm:gap-x-10 sm:gap-y-6 lg:gap-x-14">
      <p className="m-0 text-center text-[0.9rem] font-medium text-muted sm:text-[0.95rem]">1000+ Big brands trust us</p>
      <ul className="flex w-full flex-wrap items-center justify-center gap-x-6 gap-y-5 sm:w-auto sm:gap-x-10 sm:gap-y-6 lg:gap-x-12">
        <li className="brand-logo flex w-auto items-center gap-2 text-[1.05rem] font-semibold text-[#5f5f5f]">
          <img src="/assets/images/microsoft.png" alt="" className="h-[22px] w-[22px] object-contain" width={22} height={22} loading="lazy" />
          <span>Microsoft</span>
        </li>
        <li className="brand-logo brand-logo--wide">
          <img src="/assets/images/airbnb.png" alt="Airbnb" className="brand-logo__img" loading="lazy" />
        </li>
        <li className="brand-logo brand-logo--square">
          <img src="/assets/images/ola2.png" alt="OLA" className="brand-logo__img" loading="lazy" />
        </li>
        <li className="brand-logo brand-logo--wide">
          <img src="/assets/images/walmart2.png" alt="Walmart" className="brand-logo__img" loading="lazy" />
        </li>
        <li className="brand-logo">
          <img src="/assets/images/google.png" alt="Google" className="brand-logo__img" loading="lazy" />
        </li>
      </ul>
    </div>
  </section>
);
