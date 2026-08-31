'use client';
import { useEffect, useRef } from 'react';
import { useMouseParallax } from '@/hooks/useMouseParallax';

export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useMouseParallax();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // Reduced from 800 → 350 — visually identical, much lower CPU cost
    const COUNT = 350;
    type Particle = {
      x: number; y: number; ox: number; oy: number;
      vx: number; vy: number; size: number; opacity: number; speed: number;
    };

    const particles: Particle[] = Array.from({ length: COUNT }, () => {
      const ox = Math.random() * width;
      const oy = Math.random() * height;
      return {
        x: ox, y: oy, ox, oy,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 1.5 + 0.3,
        opacity: Math.random() * 0.6 + 0.1,
        speed: Math.random() * 0.5 + 0.2,
      };
    });

    let rafId: number;
    let frame = 0;
    let paused = false;

    // Pause animation when tab is hidden to save CPU
    const onVisibilityChange = () => {
      paused = document.hidden;
      if (!paused) rafId = requestAnimationFrame(draw);
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    const draw = () => {
      if (paused) return;
      frame++;
      ctx.clearRect(0, 0, width, height);

      const mx = mouseRef.current.x * 40;
      const my = mouseRef.current.y * 40;

      for (const p of particles) {
        // Drift
        p.ox += p.vx;
        p.oy += p.vy;
        if (p.ox < 0) p.ox = width;
        if (p.ox > width) p.ox = 0;
        if (p.oy < 0) p.oy = height;
        if (p.oy > height) p.oy = 0;

        // Parallax offset
        p.x = p.ox + mx * p.speed * 0.3;
        p.y = p.oy + my * p.speed * 0.3;

        // Twinkle
        const flicker = Math.sin(frame * 0.02 + p.speed * 10) * 0.15;
        const alpha = Math.max(0, Math.min(1, p.opacity + flicker));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);

        // Occasionally cyan, mostly white
        const isCyan = p.speed > 0.65;
        ctx.fillStyle = isCyan
          ? `rgba(6, 182, 212, ${alpha})`
          : `rgba(255, 255, 255, ${alpha})`;
        ctx.fill();
      }

      // NOTE: Connection lines removed — O(n²) loop was too expensive for negligible visual gain

      rafId = requestAnimationFrame(draw);
    };

    draw();

    const onResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, [mouseRef]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
