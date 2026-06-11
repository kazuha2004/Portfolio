'use client';
import { useEffect, useRef } from 'react';

interface Props {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: Props) {
  const barRef = useRef<HTMLDivElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (screenRef.current) {
        screenRef.current.classList.add('hidden');
        onComplete();
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div ref={screenRef} id="loading-screen">
      <div className="flex flex-col items-center gap-6">
        <p className="text-xs tracking-[0.3em] uppercase text-[#52525B] font-medium">
          Priyanshu Shukla
        </p>
        <div className="loading-bar-container">
          <div ref={barRef} className="loading-bar" />
        </div>
      </div>
    </div>
  );
}
