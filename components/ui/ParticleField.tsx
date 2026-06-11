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

    // Particle setup
    const COUNT = 800;
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

    const draw = () => {
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

      // Draw faint connection lines for nearby particles (within 80px)
      ctx.strokeStyle = 'rgba(255,255,255,0.03)';
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i += 4) {
        for (let j = i + 1; j < particles.length; j += 4) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 80) {
            ctx.globalAlpha = (1 - dist / 80) * 0.15;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;

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
