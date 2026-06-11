'use client';
import { useEffect, useRef, useState } from 'react';
import { ExternalLink } from 'lucide-react';

const GithubIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const PROJECTS = [
  {
    id: 'lumiface',
    num: '01',
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
    github: 'https://github.com/kazuha2004/FACE_RECOGNITION_ATTENDANCE_SYSTEM',
    patent: 'Patent Filed — App No: 202511051742 A',
    stats: [
      { label: 'Faces/Day', value: '500+' },
      { label: 'Accuracy', value: '75%+' },
      { label: 'Time Saved', value: '15m → 2m' },
    ],
  },
  {
    id: 'ai-interviewer',
    num: '02',
    title: 'AI Interviewer',
    tagline: 'Real-time AI-powered technical interview simulator',
    description:
      'Conducts live technical interviews using OpenAI GPT-4. Generates adaptive questions, evaluates answers in real-time, and produces detailed feedback reports. Deployed for 100+ users.',
    tags: ['Python', 'Django', 'Next.js', 'OpenAI API', 'MongoDB'],
    tagColor: 'purple',
    accent: '#7C3AED',
    accentGlow: 'rgba(124,58,237,0.2)',
    accentBorder: 'rgba(124,58,237,0.25)',
    live: 'https://ai-interviewer-chi-henna.vercel.app/',
    github: 'https://github.com/kazuha2004',
    stats: [
      { label: 'Adaptive Questions', value: 'GPT-4' },
      { label: 'Real-time Eval', value: '< 1s' },
    ],
  },
  {
    id: 'kazuha-closet',
    num: '03',
    title: 'Kazuha Closet',
    tagline: 'Live e-commerce platform — Founder & Full-Stack Dev',
    description:
      'End-to-end fashion e-commerce platform live in production. Built the entire stack solo — from Django REST backend to Next.js storefront. 30% engagement uplift, 40% faster API response.',
    tags: ['Next.js', 'Node.js', 'Django REST', 'MongoDB', 'Tailwind'],
    tagColor: 'coral',
    accent: '#F43F5E',
    accentGlow: 'rgba(244,63,94,0.2)',
    accentBorder: 'rgba(244,63,94,0.25)',
    live: 'https://www.kazuhacloset.com',
    github: 'https://github.com/kazuha2004',
    founder: true,
    stats: [
      { label: 'Engagement Uplift', value: '+30%' },
      { label: 'API Speedup', value: '+40%' },
    ],
  },
  {
    id: 'taskflow',
    num: '04',
    title: 'TaskFlow Manager',
    tagline: 'Drag-and-drop Kanban for engineering teams',
    description:
      'Full-stack project management with real-time drag-and-drop Kanban boards, JWT auth, team workspaces, and deadline tracking. Improved workflow efficiency by 40%.',
    tags: ['Next.js', 'Django', 'MongoDB', 'JWT', 'Tailwind'],
    tagColor: 'cyan',
    accent: '#06B6D4',
    accentGlow: 'rgba(6,182,212,0.2)',
    accentBorder: 'rgba(6,182,212,0.25)',
    live: 'https://taskflow-manager-fullstack.vercel.app/login',
    github: 'https://github.com/kazuha2004',
    stats: [
      { label: 'Efficiency Boost', value: '+40%' },
      { label: 'Real-time Sync', value: 'WebSockets' },
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
          className="detection-box absolute border border-[#F59E0B]/30 bg-[#F59E0B]/5"
          style={{
            top: box.top, left: box.left,
            width: box.w, height: box.h,
            animation: `pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite ${box.delay}`,
          }}
        />
      ))}
      {/* Scan line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-[#F59E0B]/80 shadow-[0_0_15px_rgba(245,158,11,0.8)]" style={{ animation: 'scan 2.5s ease-in-out infinite alternate' }} />
      {/* Label */}
      <div className="absolute bottom-3 left-3 right-3">
        <div className="text-xs font-mono text-[#F59E0B] bg-black/60 px-2 py-1 rounded inline-block border border-[#F59E0B]/30 backdrop-blur-md">
          LUMIFACE_v2.0 · STATUS: TRACKING
        </div>
      </div>
      {/* Corner brackets */}
      <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#F59E0B]/60 rounded-tl-sm" />
      <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#F59E0B]/60 rounded-tr-sm" />
      <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#F59E0B]/60 rounded-bl-sm" />
      <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#F59E0B]/60 rounded-br-sm" />
      
      <style>{`
        @keyframes scan {
          0% { transform: translateY(0); }
          100% { transform: translateY(320px); }
        }
      `}</style>
    </div>
  );
}

function IframePreview({ url, accent }: { url: string, accent: string }) {
  const [loaded, setLoaded] = useState(false);
  
  return (
    <div className="relative w-full h-full bg-[#050505] rounded-xl overflow-hidden group">
      {/* Browser Bar */}
      <div className="absolute top-0 left-0 right-0 h-8 bg-[#111] border-b border-white/5 flex items-center px-3 gap-1.5 z-10">
        <div className="w-2.5 h-2.5 rounded-full bg-[#333]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#333]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#333]" />
        <div className="mx-auto text-[10px] font-mono text-[#555] truncate px-4 max-w-[60%]">{url.replace('https://', '')}</div>
      </div>
      
      {/* Iframe Scaled */}
      <div className="absolute top-8 left-0 right-0 bottom-0 overflow-hidden bg-[#0a0a0a]">
        {!loaded && (
          <div className="absolute inset-0 flex flex-col gap-3 items-center justify-center">
             <div className="w-6 h-6 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: accent, borderTopColor: 'transparent' }} />
             <span className="text-[10px] tracking-widest text-white/40 uppercase">Loading Live Preview</span>
          </div>
        )}
        <div className="w-[200%] h-[200%] origin-top-left scale-50 transition-transform duration-700 ease-out group-hover:scale-[0.52]">
          <iframe 
            src={url} 
            className="w-full h-full border-none pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity" 
            loading="lazy"
            onLoad={() => setLoaded(true)}
          />
        </div>
      </div>
      
      {/* Hover Overlay */}
      <a href={url} target="_blank" rel="noopener noreferrer" className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20 cursor-pointer backdrop-blur-[2px]">
        <div className="px-5 py-2.5 rounded-full bg-black/80 backdrop-blur-md text-white text-xs font-semibold flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300" style={{ border: `1px solid ${accent}`}}>
          Open Live Site <ExternalLink size={14} />
        </div>
      </a>
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
      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-center">
        {/* Left: content */}
        <div className="flex flex-col gap-6">
          {/* Badges */}
          <div className="flex flex-wrap gap-2">
            <span className="section-label">{project.num}</span>
            {project.patent && (
              <span className="px-3 py-1 text-[10px] uppercase tracking-wider rounded-full font-bold flex items-center gap-1.5"
                style={{ background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.3)', color: '#F59E0B' }}>
                <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] animate-pulse" />
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
            <h2 className="text-2xl sm:text-display-md font-black text-white mb-1 sm:mb-2 leading-none"
              style={{ textShadow: `0 0 40px ${project.accentGlow}` }}>
              {project.title}
            </h2>
            <p className="text-xs sm:text-base font-medium" style={{ color: project.accent }}>{project.tagline}</p>
          </div>

          <p className="text-xs sm:text-sm text-[#71717A] leading-relaxed max-w-md">{project.description}</p>

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
                Live Website <ExternalLink size={14} />
              </a>
            )}
            {project.live === '#' && (
              <span
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white/60 cursor-not-allowed"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                Private Deployment
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
        <div className="relative h-[200px] sm:h-[320px] lg:h-[400px] rounded-2xl overflow-hidden shadow-2xl"
          style={{ border: `1px solid ${project.accentBorder}` }}>
          
          {project.id === 'lumiface' && <DetectionBoxes />}
          
          {project.live !== '#' && (
            <IframePreview url={project.live} accent={project.accent} />
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
    let ctx: any;

    const init = async () => {
      const gsapMod = await import('gsap');
      const stMod = await import('gsap/ScrollTrigger');
      const gsap = gsapMod.gsap;
      const ScrollTrigger = stMod.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      const track = trackRef.current;
      const section = sectionRef.current;
      if (!track || !section) return;

      // Use GSAP context for React 18 strict mode safety
      ctx = gsap.context(() => {
        gsap.to(track, {
          xPercent: -100 * (PROJECTS.length - 1) / PROJECTS.length, // -75% for 4 items
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1,
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
    <>
      {/* Desktop: horizontal scroll */}
      <section id="projects" ref={sectionRef} className="relative bg-[#0A0A0A] hidden md:block" style={{ height: `${PROJECTS.length * 100}vh` }}>
        <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center">
          {/* Section label */}
          <div className="absolute top-8 left-6 z-20 flex items-center gap-3">
            <span className="section-label">03 — Projects</span>
          </div>

          <div
            ref={trackRef}
            className="flex w-max h-full will-change-transform"
          >
            {PROJECTS.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* Mobile: vertical stack */}
      <section id="projects-mobile" className="relative bg-[#0A0A0A] md:hidden py-16 px-4">
        <div className="flex items-center gap-3 mb-10">
          <span className="section-label">03 — Projects</span>
          <span className="flex-1 h-px bg-white/5" />
        </div>
        <div className="flex flex-col gap-16">
          {PROJECTS.map((project) => (
            <div key={project.id} className="w-full">
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
