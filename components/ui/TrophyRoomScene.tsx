'use client';
import { useRef, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the heavy Three.js canvas — only loads when section enters viewport
const TrophyCanvas = dynamic(() => import('./TrophyRoomCanvas'), { ssr: false });

export default function TrophyRoomScene() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [activeNode, setActiveNode] = useState<{ title: string; detail: string; color: string } | null>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMounted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef} className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] bg-[#0A0A0A] rounded-2xl overflow-hidden border border-white/5 shadow-2xl group cursor-move">
      {mounted ? (
        <TrophyCanvas onNodeClick={setActiveNode} />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-[#06B6D4]/40 animate-pulse" />
        </div>
      )}

      {/* Active Node Detail Panel */}
      <div className={`absolute bottom-6 left-1/2 -translate-x-1/2 transition-all duration-300 pointer-events-none ${activeNode ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        {activeNode && (
          <div className="px-6 py-3 rounded-full bg-black/80 backdrop-blur-xl border flex items-center gap-3 shadow-[0_0_30px_rgba(0,0,0,0.5)]" style={{ borderColor: `${activeNode.color}40` }}>
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: activeNode.color }} />
            <div className="flex flex-col">
              <span className="text-sm font-bold text-white">{activeNode.title}</span>
              <span className="text-[10px] text-[#A1A1AA]">{activeNode.detail}</span>
            </div>
          </div>
        )}
      </div>

      {/* Hint */}
      <div className="absolute top-4 left-4 text-[10px] uppercase tracking-widest text-[#52525B] pointer-events-none group-hover:opacity-0 transition-opacity">
        Drag to rotate constellation
      </div>
    </div>
  );
}
