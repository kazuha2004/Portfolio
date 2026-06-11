'use client';
import { useState } from 'react';
import { useLenis } from '@/hooks/useLenis';
import CustomCursor from '@/components/ui/CustomCursor';
import LoadingScreen from '@/components/ui/LoadingScreen';
import Navbar from '@/components/ui/Navbar';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Projects from '@/components/sections/Projects';
import Skills from '@/components/sections/Skills';
import Achievements from '@/components/sections/Achievements';
import Contact from '@/components/sections/Contact';

export default function HomeClient() {
  const [loaded, setLoaded] = useState(false);
  useLenis();

  return (
    <>
      <LoadingScreen onComplete={() => setLoaded(true)} />
      <CustomCursor />
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
