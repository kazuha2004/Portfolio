'use client';
import { useEffect, useRef } from 'react';

const TAGS = [
  { label: 'Python', info: '3 production apps shipped' },
  { label: 'Django', info: '3 production apps shipped' },
  { label: 'Next.js', info: 'Primary frontend framework' },
  { label: 'React', info: 'Daily driver for 2+ years' },
  { label: 'Three.js', info: 'WebGL & 3D experiences' },
  { label: 'TypeScript', info: 'Strict typed codebases' },
  { label: 'OpenCV', info: 'LUMIFACE computer vision' },
  { label: 'MongoDB', info: 'NoSQL data modeling' },
  { label: 'MySQL', info: 'Relational DB design' },
  { label: 'Node.js', info: 'API & server-side logic' },
  { label: 'GSAP', info: 'High-performance animations' },
  { label: 'TensorFlow', info: 'ML model training' },
  { label: 'JWT', info: 'Auth & security patterns' },
  { label: 'REST APIs', info: 'RESTful API design' },
  { label: 'Git', info: 'Version control & CI' },
  { label: 'Tailwind', info: 'Rapid UI development' },
  { label: 'FastAPI', info: 'High-performance Python APIs' },
  { label: 'Redis', info: 'Caching & queues' },
  { label: 'Docker', info: 'Containerized deployments' },
  { label: 'Vercel', info: 'Edge deployments' },
];

export default function TagSphere() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const tags = container.querySelectorAll<HTMLElement>('.tag-sphere-item');
    const total = tags.length;
    let rotX = 0, rotY = 0;
    let targetX = 0.3, targetY = 0.5;
    const radius = Math.min(container.offsetWidth * 0.38, 220);
    let rafId: number;

    const positions: { phi: number; theta: number }[] = [];

    // Fibonacci sphere distribution
    for (let i = 0; i < total; i++) {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / total);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      positions.push({ phi, theta });
    }

    const animate = () => {
      rotX += (targetX - rotX) * 0.04;
      rotY += (targetY - rotY) * 0.04;

      tags.forEach((tag, i) => {
        const { phi, theta } = positions[i];
        const sinPhi = Math.sin(phi);
        const cosPhi = Math.cos(phi);
        const sinTheta = Math.sin(theta + rotY);
        const cosTheta = Math.cos(theta + rotY);
        const sinRotX = Math.sin(rotX);
        const cosRotX = Math.cos(rotX);

        // Rotate around Y axis then X axis
        const x = sinPhi * cosTheta;
        const y = sinPhi * sinTheta;
        const z = cosPhi;

        // Apply X rotation
        const y2 = y * cosRotX - z * sinRotX;
        const z2 = y * sinRotX + z * cosRotX;

        const scale = (z2 + 1.5) / 2.5;
        const tx = x * radius;
        const ty = y2 * radius;

        tag.style.transform = `translate(-50%, -50%) translate3d(${tx}px, ${ty}px, 0) scale(${scale})`;
        tag.style.opacity = String(Math.max(0.15, scale * 0.9));
        tag.style.zIndex = String(Math.round(scale * 10));
        tag.style.color = scale > 0.8
          ? `rgba(248, 248, 248, ${scale})`
          : `rgba(161, 161, 170, ${scale * 0.7})`;
      });

      rafId = requestAnimationFrame(animate);
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      targetY = ((e.clientX - cx) / rect.width) * 3;
      targetX = -((e.clientY - cy) / rect.height) * 1.5;
    };

    const onMouseLeave = () => { targetX = 0.3; targetY = 0.5; };

    container.addEventListener('mousemove', onMouseMove);
    container.addEventListener('mouseleave', onMouseLeave);
    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      container.removeEventListener('mousemove', onMouseMove);
      container.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative mx-auto"
      style={{ width: 500, height: 500 }}
    >
      {TAGS.map((tag) => (
        <div
          key={tag.label}
          className="tag-sphere-item group absolute top-1/2 left-1/2 cursor-default select-none"
          style={{ transition: 'opacity 0.1s' }}
          title={tag.info}
        >
          <span className="px-3 py-1.5 text-sm font-medium rounded-full border border-white/10 bg-white/5 group-hover:bg-[#7C3AED]/20 group-hover:border-[#7C3AED]/40 group-hover:text-[#C4B5FD] transition-all duration-200 whitespace-nowrap inline-block">
            {tag.label}
          </span>
          {/* Tooltip */}
          <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs bg-[#1A1A1A] border border-white/10 rounded-md text-[#A1A1AA] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
            {tag.info}
          </span>
        </div>
      ))}
    </div>
  );
}
