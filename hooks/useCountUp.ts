'use client';
import { useEffect, useRef } from 'react';

export function useCountUp(target: number, duration = 2000, start = false) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!start || !ref.current) return;
    let startTime: number | null = null;
    const el = ref.current;
    const startVal = 0;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
      const current = Math.floor(eased * (target - startVal) + startVal);
      el.textContent = current.toLocaleString();
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target.toLocaleString();
    };

    requestAnimationFrame(step);
  }, [start, target, duration]);

  return ref;
}
