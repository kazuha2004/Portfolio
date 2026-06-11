'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

const NAV_LINKS = [
  { href: '#hero', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Work' },
  { href: '#skills', label: 'Skills' },
  { href: '#achievements', label: 'Achievements' },
  { href: '#contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-[9980] transition-all duration-500 ${
          scrolled ? 'glass-frosted' : ''
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => handleNavClick('#hero')}
            className="group relative flex items-center gap-1 text-sm font-bold tracking-widest uppercase"
            aria-label="Home"
          >
            <span className="relative z-10 text-white/90 group-hover:text-white transition-colors">PS</span>
            <span
              className="absolute inset-0 -m-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.3)' }}
            />
            <span className="text-[#7C3AED] text-lg leading-none">.</span>
          </button>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <button
                  onClick={() => handleNavClick(link.href)}
                  className="text-sm text-[#A1A1AA] hover:text-white transition-colors duration-200 relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#7C3AED] group-hover:w-full transition-all duration-300" />
                </button>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="/resume/Priyanshu_Resume.pdf"
              download
              className="text-sm px-4 py-2 rounded-lg border border-[#7C3AED]/40 text-[#A1A1AA] hover:text-white hover:border-[#7C3AED] hover:bg-[#7C3AED]/10 transition-all duration-300"
            >
              Resume
            </a>
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="md:hidden flex flex-col gap-1.5 p-2 group"
            aria-label="Menu"
          >
            <span className={`w-6 h-px bg-white/80 transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`w-4 h-px bg-white/80 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`w-6 h-px bg-white/80 transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div className={`nav-overlay ${menuOpen ? 'open' : ''}`}>
        <button
          onClick={() => setMenuOpen(false)}
          className="absolute top-6 right-6 text-[#52525B] hover:text-white transition-colors text-2xl"
        >
          ✕
        </button>
        {NAV_LINKS.map((link, i) => (
          <button
            key={link.href}
            onClick={() => handleNavClick(link.href)}
            className="text-4xl font-light text-[#52525B] hover:text-white transition-all duration-300 hover:translate-x-2"
            style={{ transitionDelay: `${i * 40}ms` }}
          >
            {link.label}
          </button>
        ))}
        <div className="flex gap-6 mt-8">
          <a href="https://github.com/kazuha2004" target="_blank" rel="noopener" className="text-[#52525B] hover:text-white transition-colors text-sm">GitHub</a>
          <a href="https://linkedin.com/in/priyanshu-shukla" target="_blank" rel="noopener" className="text-[#52525B] hover:text-white transition-colors text-sm">LinkedIn</a>
          <a href="mailto:priyanshushukla0608@gmail.com" className="text-[#52525B] hover:text-white transition-colors text-sm">Email</a>
        </div>
      </div>
    </>
  );
}
