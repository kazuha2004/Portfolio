'use client';
import { useEffect } from 'react';

export function useLenis() {
  useEffect(() => {
    let lenis: import('lenis').default | null = null;
    let rafId: number;

    const init = async () => {
      const { default: Lenis } = await import('lenis');
      lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });

      // Sync GSAP ScrollTrigger with Lenis
      try {
        const { ScrollTrigger } = await import('gsap/ScrollTrigger');
        lenis.on('scroll', ScrollTrigger.update);
      } catch {
        // GSAP not needed here
      }

      const raf = (time: number) => {
        lenis!.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);
    };

    init();

    return () => {
      if (lenis) lenis.destroy();
      cancelAnimationFrame(rafId);
    };
  }, []);
}
