'use client';
import { useEffect, useRef } from 'react';
import { ExternalLink, Star, Zap } from 'lucide-react';

const GithubIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const PROJECTS = [
  {
    id: 'ai-interviewer',
    num: '01',
    title: 'AI Interviewer',
    tagline: 'Real-time AI-powered technical interview simulator',
    description:
      'Conducts live technical interviews using OpenAI GPT-4. Generates adaptive questions, evaluates answers in real-time, and produces detailed feedback reports. Deployed for 100+ users.',
    tags: ['Python', 'Django', 'Next.js', 'OpenAI API', 'MongoDB'],
    tagColor: 'purple',
    accent: '#7C3AED',
    accentGlow: 'rgba(124,58,237,0.2)',
    accentBorder: 'rgba(124,58,237,0.25)',
    live: '#',
    github: 'https://github.com/kazuha2004',
    stats: [
      { label: 'Adaptive Questions', value: 'GPT-4' },
      { label: 'Real-time Eval', value: '< 1s' },
    ],
  },
  {
    id: 'taskflow',
    num: '02',
    title: 'TaskFlow Manager',
    tagline: 'Drag-and-drop Kanban for engineering teams',
    description:
      'Full-stack project management with real-time drag-and-drop Kanban boards, JWT auth, team workspaces, and deadline tracking. Improved workflow efficiency by 40%.',
    tags: ['Next.js', 'Django', 'MongoDB', 'JWT', 'Tailwind'],
    tagColor: 'cyan',
    accent: '#06B6D4',
    accentGlow: 'rgba(6,182,212,0.2)',
    accentBorder: 'rgba(6,182,212,0.25)',
    live: '#',
    github: 'https://github.com/kazuha2004',
    stats: [
      { label: 'Efficiency Boost', value: '+40%' },
      { label: 'Real-time Sync', value: 'WebSockets' },
    ],
  },
  {
    id: 'lumiface',
    num: '03',
    title: 'LUMIFACE',
    tagline: 'Patent-pending AI attendance via facial recognition',
    description:
      'Computer vision attendance system processing 500+ faces/day. LBPH + Haar Cascade pipeline achieves 75%+ accuracy. Reduced manual marking time from 15 minutes to 2 minutes.',
    tags: ['Python', 'OpenCV', 'MySQL', 'LBPH', 'Haar Cascade'],
    tagColor: 'amber',
    accent: '#F59E0B',
    accentGlow: 'rgba(245,158,11,0.2)',
    accentBorder: 'rgba(245,158,11,0.25)',
    live: '#',
    github: 'https://github.com/kazuha2004',
    patent: '📜 Patent Filed — App No: 202511051742',
    stats: [
      { label: 'Faces/Day', value: '500+' },
      { label: 'Accuracy', value: '75%+' },
      { label: 'Time Saved', value: '87%' },
    ],
  },
  {
    id: 'kazuha-closet',
    num: '04',
    title: 'Kazuha Closet',
    tagline: 'Live e-commerce platform — Founder & Full-Stack Dev',
    description:
      'End-to-end fashion e-commerce platform live in production. Built the entire stack solo — from Django REST backend to Next.js storefront. 30% engagement uplift, 40% faster API response.',
    tags: ['Next.js', 'Node.js', 'Django REST', 'MongoDB', 'Tailwind'],
    tagColor: 'coral',
    accent: '#F43F5E',
    accentGlow: 'rgba(244,63,94,0.2)',
    accentBorder: 'rgba(244,63,94,0.25)',
    live: 'https://kazuhacloset.in',
    github: 'https://github.com/kazuha2004',
    founder: true,
    stats: [
      { label: 'Engagement Uplift', value: '+30%' },
      { label: 'API Speedup', value: '+40%' },
    ],
  },
];

function DetectionBoxes() {
  return (
    <div className="relative w-full h-full bg-[#0D0D0D] rounded-xl overflow-hidden flex items-center justify-center">
      {/* Simulated face silhouette */}
      <div className="relative w-32 h-40 rounded-full border border-white/5 bg-white/2 flex items-end justify-center overflow-hidden">
        <div className="w-20 h-24 rounded-t-full bg-white/4 mb-0" />
      </div>
      {/* Scanning boxes */}
      {[
        { top: '22%', left: '28%', w: '44%', h: '55%', delay: '0s' },
        { top: '25%', left: '30%', w: '38%', h: '48%', delay: '1.2s' },
        { top: '20%', left: '27%', w: '46%', h: '58%', delay: '2.4s' },
      ].map((box, i) => (
        <div
          key={i}
          className="detection-box"
          style={{
            top: box.top, left: box.left,
            width: box.w, height: box.h,
            animationDelay: box.delay,
            animationDuration: '3s',
          }}
        />
      ))}
      {/* Scan line */}
      <div className="scan-line" style={{ animationDuration: '2s' }} />
      {/* Label */}
      <div className="absolute bottom-3 left-3 right-3">
        <div className="text-xs font-mono text-[#F59E0B] bg-black/60 px-2 py-1 rounded inline-block">
          LUMIFACE_v2 · Confidence: 94.7%
        </div>
      </div>
      {/* Corner brackets */}
      <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#F59E0B]/40 rounded-tl-sm" />
      <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#F59E0B]/40 rounded-tr-sm" />
      <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#F59E0B]/40 rounded-bl-sm" />
      <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#F59E0B]/40 rounded-br-sm" />
    </div>
  );
}

function KanbanDemo({ accent }: { accent: string }) {
  const cols = ['To Do', 'In Progress', 'Done'];
  const cards = [
    { col: 0, text: 'Design system setup' },
    { col: 0, text: 'Auth flow' },
    { col: 1, text: 'Kanban board' },
    { col: 1, text: 'API integration' },
    { col: 2, text: 'User testing' },
    { col: 2, text: 'Deploy to Vercel' },
  ];

  return (
    <div className="w-full h-full bg-[#0D0D0D] rounded-xl overflow-hidden p-4 flex gap-3">
      {cols.map((col, ci) => (
        <div key={col} className="flex-1 flex flex-col gap-2">
          <div className="text-xs font-semibold text-[#52525B] uppercase tracking-wider px-1 mb-1">{col}</div>
          {cards.filter(c => c.col === ci).map((c, i) => (
            <div
              key={i}
              className="px-3 py-2.5 rounded-lg text-xs text-[#A1A1AA] transition-transform hover:-translate-y-0.5"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: `1px solid ${ci === 1 ? accent + '33' : 'rgba(255,255,255,0.05)'}`,
              }}
            >
              {c.text}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

type Project = typeof PROJECTS[number];

function ProjectCard({ project }: { project: Project }) {
  const techPillClass = `tech-pill-${project.tagColor}`;

  return (
    <div
      className="project-panel"
      data-cursor="drag"
      style={{ background: `radial-gradient(ellipse at 40% 50%, ${project.accentGlow} 0%, transparent 60%)` }}
    >
      <div className="max-w-6xl w-full mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Left: content */}
        <div className="flex flex-col gap-6">
          {/* Badges */}
          <div className="flex flex-wrap gap-2">
            <span className="section-label">{project.num}</span>
            {project.patent && (
              <span className="px-3 py-1 text-xs rounded-full font-semibold"
                style={{ background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.3)', color: '#F59E0B' }}>
                {project.patent}
              </span>
            )}
            {project.founder && (
              <span className="px-3 py-1 text-xs rounded-full font-semibold"
                style={{ background: 'rgba(244,63,94,0.15)', border: '1px solid rgba(244,63,94,0.3)', color: '#F43F5E' }}>
                ⚡ Founder
              </span>
            )}
          </div>

          <div>
            <h2 className="text-display-md font-black text-white mb-2 leading-none"
              style={{ textShadow: `0 0 40px ${project.accentGlow}` }}>
              {project.title}
            </h2>
            <p className="text-base font-medium" style={{ color: project.accent }}>{project.tagline}</p>
          </div>

          <p className="text-sm text-[#71717A] leading-relaxed max-w-md">{project.description}</p>

          {/* Stats */}
          <div className="flex flex-wrap gap-6">
            {project.stats.map((s) => (
              <div key={s.label} className="flex flex-col">
                <span className="text-xl font-bold text-white">{s.value}</span>
                <span className="text-xs text-[#52525B] mt-0.5">{s.label}</span>
              </div>
            ))}
          </div>

          {/* Tech pills */}
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span key={tag} className={`skill-pill ${techPillClass} text-xs`}>{tag}</span>
            ))}
          </div>

          {/* Links */}
          <div className="flex gap-3 flex-wrap">
            {project.live !== '#' && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white transition-all duration-300"
                style={{
                  background: project.accent,
                  boxShadow: `0 0 20px ${project.accentGlow}`,
                }}
              >
                Live Demo <ExternalLink size={14} />
              </a>
            )}
            {project.live === '#' && (
              <span
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white/60 cursor-not-allowed"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                Private Repo
              </span>
            )}
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium text-[#A1A1AA] hover:text-white transition-colors duration-300"
              style={{ border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.03)' }}
            >
              <GithubIcon size={14} /> GitHub
            </a>
          </div>
        </div>

        {/* Right: visual */}
        <div className="relative h-[320px] lg:h-[400px] rounded-2xl overflow-hidden"
          style={{ border: `1px solid ${project.accentBorder}` }}>
          {project.id === 'lumiface' && <DetectionBoxes />}
          {project.id === 'taskflow' && <KanbanDemo accent={project.accent} />}
          {project.id === 'ai-interviewer' && (
            <div className="w-full h-full bg-[#0D0D0D] p-5 font-mono text-xs overflow-hidden">
              <div className="text-[#7C3AED] mb-2">AI Interviewer v2.1.0</div>
              {[
                { role: 'AI', text: "Walk me through how you'd design a URL shortener at scale.", delay: '0s' },
                { role: 'User', text: "I'd use a hash function with base62 encoding, store in Redis...", delay: '0.3s' },
                { role: 'AI', text: 'Good. How would you handle hash collisions?', delay: '0.6s' },
                { role: 'User', text: 'Collision chain with a counter suffix, or just rehash...', delay: '0.9s' },
                { role: 'AI', text: '✓ Score: 8.5/10 — Excellent distributed systems thinking.', delay: '1.2s' },
              ].map((line, i) => (
                <div key={i} className="mb-3 opacity-0"
                  style={{ animation: `fade-in 0.5s ease-out ${line.delay} forwards` }}>
                  <span className={line.role === 'AI' ? 'text-[#7C3AED]' : 'text-[#06B6D4]'}>
                    {line.role === 'AI' ? '🤖 AI:' : '👤 You:'}&nbsp;
                  </span>
                  <span className="text-[#A1A1AA]">{line.text}</span>
                </div>
              ))}
            </div>
          )}
          {project.id === 'kazuha-closet' && (
            <div className="w-full h-full bg-[#0D0D0D] p-5 overflow-hidden">
              <div className="text-xs text-[#F43F5E] font-semibold mb-3">kazuhacloset.in · Live</div>
              <div className="grid grid-cols-2 gap-3">
                {['Summer Drop', 'Casual Wear', 'Ethnic Fusion', 'Accessories'].map((item, i) => (
                  <div key={item} className="rounded-lg overflow-hidden aspect-[3/4] relative"
                    style={{
                      background: `hsl(${330 + i * 20}, 30%, ${12 + i * 3}%)`,
                      border: '1px solid rgba(244,63,94,0.15)',
                    }}>
                    <div className="absolute bottom-0 left-0 right-0 p-2">
                      <p className="text-[10px] font-medium text-white/80">{item}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {/* Glow overlay */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: `radial-gradient(circle at 50% 0%, ${project.accentGlow} 0%, transparent 60%)` }} />
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const trackRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let gsap: typeof import('gsap')['gsap'] | undefined;
    let ScrollTrigger: typeof import('gsap/ScrollTrigger')['ScrollTrigger'] | undefined;
    let ctx: import('gsap')['gsap']['Context'];

    const init = async () => {
      const gsapMod = await import('gsap');
      const stMod = await import('gsap/ScrollTrigger');
      gsap = gsapMod.gsap;
      ScrollTrigger = stMod.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      const track = trackRef.current;
      const section = sectionRef.current;
      if (!track || !section) return;

      // Use GSAP context for React 18 strict mode safety
      ctx = gsap.context(() => {
        gsap!.to(track, {
          xPercent: -100 * (PROJECTS.length - 1) / PROJECTS.length,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${track.scrollWidth - window.innerWidth + window.innerHeight}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
      }, section);
    };

    init();

    return () => {
      ctx?.revert();
    };
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="relative overflow-hidden">
      {/* Section label — outside pin */}
      <div className="absolute top-8 left-6 z-20 flex items-center gap-3">
        <span className="section-label">03 — Projects</span>
      </div>

      <div
        ref={trackRef}
        className="flex w-max"
        style={{ willChange: 'transform' }}
      >
        {PROJECTS.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {/* Scroll continue hint */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-40 pointer-events-none">
        <span className="text-[10px] tracking-widest uppercase text-[#52525B]">Scroll to continue ↓</span>
      </div>
    </section>
  );
}
