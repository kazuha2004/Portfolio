'use client';
import { useRef, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the heavy Three.js canvas — only loads when section enters viewport
const GalaxyCanvas = dynamic(() => import('./SkillsGalaxyCanvas'), { ssr: false });

export default function SkillsGalaxyScene() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMounted(true);
          observer.disconnect(); // Only need to mount once
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative w-full h-[350px] sm:h-[450px] md:h-[600px] bg-[#0A0A0A] rounded-2xl overflow-hidden border border-white/5 shadow-2xl"
    >
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle at 50% 50%, rgba(124,58,237,0.1) 0%, transparent 60%)' }} />

      {mounted ? (
        <GalaxyCanvas />
      ) : (
        // Placeholder shown before canvas is loaded
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-[#7C3AED]/40 animate-pulse" />
        </div>
      )}

      {/* Hint */}
      <div className="absolute top-4 left-4 text-[10px] uppercase tracking-widest text-[#52525B] pointer-events-none">
        Interactive 3D Galaxy · Drag to explore
      </div>
    </div>
  );
}
