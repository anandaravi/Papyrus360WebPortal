'use client';
import { useEffect, useRef, useState } from 'react';

const STATS = [
  { value: '38', label: 'Paper mill clients' },
  { value: '24+', label: 'Years in operation' },
  { value: '35+', label: 'Years industry expertise' },
  { value: '7', label: 'Products' },
  { value: '14', label: 'Services' },
];

function parseValue(v: string) {
  const m = v.match(/^(\d+)(.*)$/);
  return m ? { end: parseInt(m[1], 10), suffix: m[2] } : { end: 0, suffix: v };
}

function StatCounter({ value }: { value: string }) {
  const { end, suffix } = parseValue(value);
  const [count, setCount] = useState(0);
  const [active, setActive] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCount(end);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [end]);

  useEffect(() => {
    if (!active) return;
    const duration = 1200;
    const startTime = performance.now();
    let raf: number;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * end));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, end]);

  return (
    <span
      ref={ref}
      className="text-3xl md:text-4xl font-black text-amber-400 font-mono tracking-tight tabular-nums"
    >
      {count}{suffix}
    </span>
  );
}

export function StatsBar() {
  return (
    <section className="relative border-y border-border-dim bg-background overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 via-transparent to-amber-500/5" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-y-8 gap-x-4">
          {STATS.map((s) => (
            <div key={s.label} className="flex flex-col items-center text-center gap-1">
              <StatCounter value={s.value} />
              <span className="text-xs text-text-3">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
