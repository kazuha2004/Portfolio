'use client';
import { motion } from 'framer-motion';
import ParticleField from '@/components/ui/ParticleField';
import { useTypewriter } from '@/hooks/useTypewriter';

const FIRST_NAME = 'PRIYANSHU';
const LAST_NAME = 'SHUKLA';

export default function Hero() {
  const typed = useTypewriter(65, 35, 2000);

  const scrollToWork = () => {
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden grid-bg"
    >
      {/* Ambient glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[600px] md:h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)' }} />
      <div className="absolute bottom-1/4 left-1/4 w-[200px] h-[200px] md:w-[400px] md:h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.06) 0%, transparent 70%)' }} />

      {/* Particle canvas */}
      <ParticleField />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 sm:px-6 max-w-5xl mx-auto">

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex items-center gap-2 mb-6 md:mb-8"
        >
          <span className="w-6 md:w-8 h-px bg-[#7C3AED]/60" />
          <span className="section-label text-[10px] sm:text-xs">Full-Stack Developer &amp; AI Builder</span>
          <span className="w-6 md:w-8 h-px bg-[#7C3AED]/60" />
        </motion.div>

        {/* Name — letter by letter */}
        <h1 className="text-display-xl font-black tracking-tighter text-white mb-4 md:mb-6 leading-none flex flex-col md:flex-row items-center justify-center md:gap-4 lg:gap-8">
          <div className="flex">
            {FIRST_NAME.split('').map((char, i) => (
              <motion.span
                key={`f-${i}`}
                className="hover:-translate-y-1 hover:text-[#7C3AED] transition-all duration-200 cursor-default"
                initial={{ opacity: 0, y: 40, rotateX: -90 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ delay: 0.4 + i * 0.03, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                {char}
              </motion.span>
            ))}
          </div>
          <div className="flex">
            {LAST_NAME.split('').map((char, i) => (
              <motion.span
                key={`l-${i}`}
                className="hover:-translate-y-1 hover:text-[#7C3AED] transition-all duration-200 cursor-default"
                initial={{ opacity: 0, y: 40, rotateX: -90 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ delay: 0.4 + (FIRST_NAME.length + i) * 0.03, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                {char}
              </motion.span>
            ))}
          </div>
        </h1>

        {/* Typewriter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="h-8 sm:h-9 md:h-12 flex items-center justify-center mb-4 md:mb-6"
        >
          <span className="text-base sm:text-xl md:text-2xl font-light text-[#7C3AED]">
            {typed}
            <span className="blink-cursor-inline" style={{
              display: 'inline-block',
              width: '2px',
              height: '1.2em',
              background: '#7C3AED',
              marginLeft: '2px',
              verticalAlign: 'middle',
              animation: 'blink 1s step-end infinite',
            }} />
          </span>
        </motion.div>

        {/* One-liner */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="text-sm sm:text-base md:text-lg text-[#A1A1AA] max-w-md mb-8 md:mb-12 font-light px-4"
        >
          I build things that ship to real users.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center w-full sm:w-auto"
        >
          <button
            onClick={scrollToWork}
            className="group relative px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl text-sm font-semibold text-white overflow-hidden transition-all duration-300 hover:shadow-purple-md"
            style={{ background: 'linear-gradient(135deg, #7C3AED, #5B21B6)' }}
          >
            <span className="relative z-10">View My Work</span>
            <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: 'linear-gradient(135deg, #9D5FF5, #7C3AED)' }} />
          </button>

          <a
            href="https://drive.google.com/file/d/13X9SjsDNBsfetqCPz_FwAgXQew_9j3Be/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="group px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl text-sm font-semibold text-[#A1A1AA] border border-white/10 hover:border-[#7C3AED]/50 hover:text-white hover:bg-[#7C3AED]/8 transition-all duration-300 text-center"
          >
            View Resume
          </a>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 0.8 }}
          className="grid grid-cols-2 sm:flex sm:flex-wrap gap-6 sm:gap-8 mt-10 md:mt-16 justify-center"
        >
          {[
            { num: '450+', label: 'DSA Problems' },
            { num: '3', label: 'Live Apps' },
            { num: '1', label: 'Patent Filed' },
            { num: '300+', label: 'Students Automated' },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-xl sm:text-2xl font-bold text-white gradient-text-purple">{s.num}</div>
              <div className="text-[10px] sm:text-xs text-[#52525B] mt-1 tracking-wide">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
