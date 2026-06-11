'use client';
import { useEffect, useRef } from 'react';

const TIMELINE = [
  {
    year: '2024',
    title: 'Core Certifications',
    description: 'Django, MongoDB, HTML/CSS — built the foundation for full-stack development.',
    accent: '#7C3AED',
  },
  {
    year: 'Sep–Nov 2024',
    title: 'LUMIFACE — Built & Patent Filed',
    description: 'Computer vision attendance system. Patent Application No: 202511051742 filed with Indian Patent Office.',
    accent: '#F59E0B',
    highlight: true,
  },
  {
    year: '2025',
    title: 'ICPC Asia Kanpur Regionals',
    description: 'Qualified and participated in the prestigious ICPC Asia Kanpur Regional contest.',
    accent: '#06B6D4',
  },
  {
    year: '2025',
    title: 'Tech Expo Winner',
    description: 'Won college-level tech expo for innovation in AI-powered systems.',
    accent: '#F43F5E',
  },
  {
    year: '2026',
    title: 'Deloitte Technology Job Simulation',
    description: "Completed Deloitte's technology consulting simulation via Forage.",
    accent: '#7C3AED',
  },
  {
    year: '2026',
    title: 'IBM SkillsBuild AI Certification',
    description: 'Advanced AI certification covering ML fundamentals, NLP, and enterprise AI deployment.',
    accent: '#06B6D4',
  },
  {
    year: '2026',
    title: 'Anthropic Claude Code in Action',
    description: 'Completed Anthropic\'s certification on building production systems with Claude AI. One of the first cohort worldwide.',
    accent: '#F59E0B',
    highlight: true,
  },
];

const CERTS = [
  { front: 'Django REST Framework', back: 'Built 3 production REST APIs with auth, pagination & filtering.', issuer: 'Udemy' },
  { front: 'MongoDB Developer', back: 'Designed schemas for 4 production apps. Aggregation pipelines pro.', issuer: 'MongoDB University' },
  { front: 'IBM AI Foundations', back: 'ML models, NLP pipelines, and enterprise AI strategy.', issuer: 'IBM SkillsBuild' },
  { front: 'Anthropic Claude', back: 'Building agentic systems and production AI workflows with Claude.', issuer: 'Anthropic' },
  { front: 'Deloitte Tech Sim', back: 'Technology consulting, data analysis, and digital transformation.', issuer: 'Forage' },
  { front: 'HTML/CSS Mastery', back: 'Advanced layouts, animations, and responsive design patterns.', issuer: 'freeCodeCamp' },
];

const DSA_PLATFORMS = [
  { name: 'LeetCode', problems: '350+', color: '#FFA116', icon: '⚡' },
  { name: 'CodeChef', rating: '3★', color: '#5B4638', icon: '⭐', badge: '#B5622B' },
  { name: 'HackerRank', problems: '5★', color: '#32C766', icon: '✦' },
  { name: 'GeeksforGeeks', problems: '100+', color: '#2F8D46', icon: '🌿' },
];

export default function Achievements() {
  const pathRef = useRef<SVGPathElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    const len = path.getTotalLength();
    path.style.strokeDasharray = String(len);
    path.style.strokeDashoffset = String(len);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          path.style.transition = 'stroke-dashoffset 2.5s cubic-bezier(0.4,0,0.2,1)';
          path.style.strokeDashoffset = '0';
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="achievements" ref={sectionRef} className="relative py-32 overflow-hidden">
      {/* Ambient */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.04) 0%, transparent 70%)' }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Label */}
        <div className="flex items-center gap-3 mb-20">
          <span className="section-label">05 — Achievements</span>
          <span className="flex-1 h-px bg-white/5" />
        </div>

        {/* Heading */}
        <div className="mb-20 max-w-2xl">
          <h2 className="text-display-lg font-black text-white leading-none mb-4">
            The{' '}
            <span className="gradient-text-cyan">Trophy Room</span>
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative mb-28">
          {/* SVG timeline line */}
          <svg
            className="absolute left-4 md:left-8 top-0 bottom-0 h-full pointer-events-none"
            width="2"
            style={{ overflow: 'visible' }}
          >
            <path
              ref={pathRef}
              d={`M1,0 L1,${TIMELINE.length * 120}`}
              stroke="rgba(124,58,237,0.4)"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
          </svg>

          {/* Timeline items */}
          <div className="flex flex-col gap-10 pl-12 md:pl-20">
            {TIMELINE.map((item, i) => (
              <div
                key={i}
                className="relative flex gap-6 group"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {/* Node dot */}
                <div
                  className="absolute -left-8 md:-left-12 top-1.5 w-3 h-3 rounded-full border-2 flex-shrink-0 transition-all duration-300 group-hover:scale-150"
                  style={{
                    background: item.accent,
                    borderColor: item.accent,
                    boxShadow: item.highlight ? `0 0 12px ${item.accent}` : 'none',
                  }}
                />

                {/* Content */}
                <div className="flex-1">
                  <span className="text-xs font-mono text-[#52525B] mb-1 block">{item.year}</span>
                  <h3 className={`font-semibold text-base mb-1 transition-colors group-hover:text-white ${item.highlight ? 'text-white' : 'text-[#D4D4D8]'}`}>
                    {item.title}
                    {item.highlight && (
                      <span className="ml-2 text-[10px] px-2 py-0.5 rounded-full font-bold"
                        style={{ background: `${item.accent}22`, color: item.accent, border: `1px solid ${item.accent}44` }}>
                        ★ HIGHLIGHT
                      </span>
                    )}
                  </h3>
                  <p className="text-sm text-[#52525B] leading-relaxed group-hover:text-[#71717A] transition-colors">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications flip cards */}
        <div className="mb-20">
          <h3 className="text-sm font-bold tracking-[0.12em] uppercase text-[#52525B] mb-8">
            Certifications — Hover to see what I learned
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {CERTS.map((cert) => (
              <div key={cert.front} className="flip-card h-32">
                <div className="flip-card-inner">
                  <div className="flip-card-front">
                    <span className="text-xs text-[#52525B] mb-2 block">{cert.issuer}</span>
                    <p className="text-sm font-semibold text-white text-center leading-snug">{cert.front}</p>
                  </div>
                  <div className="flip-card-back">
                    <p className="text-xs text-[#C4B5FD] leading-relaxed text-center">{cert.back}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* DSA Platforms */}
        <div>
          <h3 className="text-sm font-bold tracking-[0.12em] uppercase text-[#52525B] mb-8">
            Competitive Programming
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {DSA_PLATFORMS.map((p) => (
              <div
                key={p.name}
                className="group rounded-xl p-5 flex flex-col gap-3 transition-all duration-300 hover:scale-[1.02]"
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.05)',
                }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-lg">{p.icon}</span>
                  <span
                    className="text-xs font-bold px-2 py-0.5 rounded-full"
                    style={{ color: p.color, background: `${p.color}18`, border: `1px solid ${p.color}33` }}
                  >
                    {p.problems || p.rating}
                  </span>
                </div>
                <p className="text-sm font-medium text-[#A1A1AA] group-hover:text-white transition-colors">{p.name}</p>
              </div>
            ))}
          </div>

          {/* Total DSA */}
          <div className="mt-6 rounded-xl p-5 flex items-center gap-5"
            style={{ background: 'rgba(124,58,237,0.05)', border: '1px solid rgba(124,58,237,0.15)' }}>
            <span className="text-3xl font-black gradient-text-purple">450+</span>
            <div>
              <p className="text-sm font-semibold text-white">Total DSA Problems Solved</p>
              <p className="text-xs text-[#52525B]">LeetCode · CodeChef · HackerRank · GeeksforGeeks</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
