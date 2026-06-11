'use client';
import { useEffect, useRef, useState } from 'react';
import { useCountUp } from '@/hooks/useCountUp';
import Marquee from '@/components/ui/Marquee';

const STATS = [
  { value: 450, suffix: '+', label: 'DSA Problems Solved', color: 'cyan' },
  { value: 3, suffix: '', label: 'Live Production Apps', color: 'purple' },
  { value: 1, suffix: '', label: 'Patent Filed', color: 'amber' },
  { value: 300, suffix: '+', label: 'Students Automated Daily', color: 'coral' },
];

function StatCounter({ value, suffix, label, color, animate }: {
  value: number; suffix: string; label: string; color: string; animate: boolean;
}) {
  const ref = useCountUp(value, 2000, animate);
  const colorMap: Record<string, string> = {
    cyan: '#06B6D4', purple: '#7C3AED', amber: '#F59E0B', coral: '#F43F5E',
  };
  const c = colorMap[color] || '#7C3AED';

  return (
    <div className="group flex flex-col gap-2">
      <div className="stat-accent-line" style={{ background: `linear-gradient(90deg, ${c}, transparent)` }} />
      <div className="flex items-baseline gap-1">
        <span ref={ref} className="text-4xl font-black text-white tabular-nums">0</span>
        <span className="text-2xl font-bold" style={{ color: c }}>{suffix}</span>
      </div>
      <p className="text-sm text-[#52525B] max-w-[140px] leading-snug">{label}</p>
    </div>
  );
}

function TechCube() {
  const cubeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cube = cubeRef.current;
    if (!cube) return;
    let rx = 15, ry = -20;
    let rafId: number;

    const animate = () => {
      ry += 0.3;
      cube.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
      rafId = requestAnimationFrame(animate);
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = cube.parentElement!.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      rx = -((e.clientY - cy) / rect.height) * 30;
      ry = ((e.clientX - cx) / rect.width) * 30;
    };
    const onMouseLeave = () => { rx = 15; };

    rafId = requestAnimationFrame(animate);
    cube.parentElement?.addEventListener('mousemove', onMouseMove);
    cube.parentElement?.addEventListener('mouseleave', onMouseLeave);

    return () => {
      cancelAnimationFrame(rafId);
      cube.parentElement?.removeEventListener('mousemove', onMouseMove);
      cube.parentElement?.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  const faceStyle = (bg: string): React.CSSProperties => ({
    position: 'absolute',
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '13px',
    fontWeight: 700,
    letterSpacing: '0.05em',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '12px',
    background: bg,
    color: '#fff',
    backfaceVisibility: 'hidden',
  });

  const size = 160;

  return (
    <div className="w-full h-full flex items-center justify-center" style={{ perspective: '600px' }}>
      <div
        ref={cubeRef}
        style={{
          width: size,
          height: size,
          position: 'relative',
          transformStyle: 'preserve-3d',
          cursor: 'grab',
        }}
      >
        {/* Front - React */}
        <div style={{ ...faceStyle('rgba(97,218,251,0.1)'), transform: `translateZ(${size / 2}px)`, borderColor: 'rgba(97,218,251,0.2)' }}>
          <span style={{ color: '#61DAFB' }}>⚛ React</span>
        </div>
        {/* Back - Python */}
        <div style={{ ...faceStyle('rgba(55,118,171,0.1)'), transform: `rotateY(180deg) translateZ(${size / 2}px)`, borderColor: 'rgba(55,118,171,0.2)' }}>
          <span style={{ color: '#4B8BBE' }}>🐍 Python</span>
        </div>
        {/* Left - Django */}
        <div style={{ ...faceStyle('rgba(9,150,70,0.1)'), transform: `rotateY(-90deg) translateZ(${size / 2}px)`, borderColor: 'rgba(9,150,70,0.2)' }}>
          <span style={{ color: '#44B78B' }}>🎸 Django</span>
        </div>
        {/* Right - Next.js */}
        <div style={{ ...faceStyle('rgba(255,255,255,0.05)'), transform: `rotateY(90deg) translateZ(${size / 2}px)` }}>
          <span style={{ color: '#fff' }}>▲ Next.js</span>
        </div>
        {/* Top - MongoDB */}
        <div style={{ ...faceStyle('rgba(71,162,72,0.1)'), transform: `rotateX(90deg) translateZ(${size / 2}px)`, borderColor: 'rgba(71,162,72,0.2)' }}>
          <span style={{ color: '#47A248' }}>🍃 MongoDB</span>
        </div>
        {/* Bottom - OpenCV */}
        <div style={{ ...faceStyle('rgba(6,182,212,0.1)'), transform: `rotateX(-90deg) translateZ(${size / 2}px)`, borderColor: 'rgba(6,182,212,0.2)' }}>
          <span style={{ color: '#06B6D4' }}>👁 OpenCV</span>
        </div>
      </div>
    </div>
  );
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimating(true); },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="relative py-16 sm:py-24 md:py-32 overflow-hidden">
      {/* Ambient */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] md:w-[500px] md:h-[500px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.04) 0%, transparent 70%)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Label */}
        <div className="flex items-center gap-3 mb-10 sm:mb-16 md:mb-20">
          <span className="section-label">02 — About</span>
          <span className="flex-1 h-px bg-white/5" />
        </div>

        <div className="grid lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-24 min-w-0">
          {/* Left — Sticky cube */}
          <div className="relative min-w-0">
            <div className="lg:sticky lg:top-32">
              {/* 3D Cube */}
              <div className="relative rounded-2xl overflow-hidden mb-6 sm:mb-8 h-[220px] md:h-[320px]"
                style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <TechCube />
                <div className="absolute inset-0 pointer-events-none"
                  style={{ background: 'radial-gradient(circle at 50% 50%, rgba(124,58,237,0.05) 0%, transparent 70%)' }} />
              </div>

              {/* Quick bio */}
              <div className="rounded-xl p-4 sm:p-6 break-words overflow-hidden" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed">
                  B.Tech CSE @ IIMT College of Engineering (2022–26). I turn ideas into production-grade software — from AI-powered attendance systems to founder-led e-commerce platforms. I don&apos;t just code; I ship.
                </p>
              </div>

              {/* Open to work badge */}
              <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full"
                style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)' }}>
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs text-green-400 font-medium">Open to opportunities</span>
              </div>
            </div>
          </div>

          {/* Right — Stats + Marquee */}
          <div className="flex flex-col gap-10 sm:gap-16 min-w-0">
            {/* Stat counters */}
            <div className="grid grid-cols-2 gap-6 sm:gap-10">
              {STATS.map((s) => (
                <StatCounter key={s.label} {...s} animate={animating} />
              ))}
            </div>

            {/* Divider */}
            <div className="h-px bg-white/5" />

            {/* About text blocks */}
            <div className="flex flex-col gap-5 sm:gap-6">
              {[
                {
                  title: 'Builder First',
                  text: 'Every project I take on has real users. From a 500-face/day attendance system to an e-commerce platform, I prioritize shipping over perfection.',
                },
                {
                  title: 'Research & Innovation',
                  text: 'Patent holder for LUMIFACE — an AI-powered facial recognition attendance system. Filed under App No: 202511051742 A.',
                },
                {
                  title: 'Competitive Edge',
                  text: 'ICPC Asia Kanpur Regionals participant. 450+ DSA problems solved across LeetCode, GFG, and CodeChef.',
                },
                {
                  title: 'Experience: Bharat Intern',
                  text: 'Dec 2023 – Jan 2024. Built robust frontend architectures focusing on responsive web development, robust REST API integrations, and agile Git collaboration.',
                },
              ].map((block) => (
                <div key={block.title} className="flex gap-3 sm:gap-4 overflow-hidden">
                  <div className="mt-1 w-1 flex-shrink-0 rounded-full self-stretch"
                    style={{ background: 'linear-gradient(to bottom, #7C3AED, transparent)', minHeight: 20 }} />
                  <div className="flex-1 min-w-0 break-words">
                    <h3 className="text-xs sm:text-sm font-semibold text-white mb-1 truncate">{block.title}</h3>
                    <p className="text-xs sm:text-sm text-[#71717A] leading-relaxed">{block.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="h-px bg-white/5" />

            {/* Marquee */}
            <div className="min-w-0">
              <p className="section-label mb-4">Tech Stack</p>
              <Marquee />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
