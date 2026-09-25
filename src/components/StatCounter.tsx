import { useEffect, useRef, useState } from 'react';

type StatCounterProps = {
  target: number;
  suffix?: string;
  label: string;
};

export const StatCounter = ({ target, suffix = '', label }: StatCounterProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    let started = false;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || started) return;
      started = true;
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - start) / 2000, 1);
        const eased = 1 - (1 - p) ** 3;
        setValue(Math.round(target * eased));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      observer.disconnect();
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref}>
      <div className="mb-2 font-serif text-[clamp(2rem,4vw,2.75rem)] font-bold leading-none">
        {value}{suffix}
      </div>
      <div className="text-[0.85rem] text-muted">{label}</div>
    </div>
  );
};
