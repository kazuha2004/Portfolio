'use client';
import { useEffect, useRef } from 'react';

export function useMouseParallax() {
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      };
    };
    window.addEventListener('mousemove', handle, { passive: true });
    return () => window.removeEventListener('mousemove', handle);
  }, []);

  return mouseRef;
}
