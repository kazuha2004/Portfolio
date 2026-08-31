'use client';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import { useLenis } from '@/hooks/useLenis';
import LoadingScreen from '@/components/ui/LoadingScreen';
import Navbar from '@/components/ui/Navbar';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Projects from '@/components/sections/Projects';
import Contact from '@/components/sections/Contact';
import CommandPalette from '@/components/ui/CommandPalette';

// Lazy-load heavy sections that contain WebGL/3D scenes
// They only get parsed + rendered when the user scrolls toward them
const Skills = dynamic(() => import('@/components/sections/Skills'), { ssr: false });
const Achievements = dynamic(() => import('@/components/sections/Achievements'), { ssr: false });

export default function HomeClient() {
  const [loaded, setLoaded] = useState(false);
  useLenis();

  return (
    <>
      <LoadingScreen onComplete={() => setLoaded(true)} />
      <CommandPalette />
      <Navbar />
      <main
        className="relative"
        style={{
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.6s ease',
        }}
      >
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Achievements />
        <Contact />
      </main>
    </>
  );
}
