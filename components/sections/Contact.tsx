'use client';
import { useState } from 'react';
import { Mail, Code, CheckCheck } from 'lucide-react';

const GithubIcon = ({ size = 18, className = '' }: { size?: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const LinkedinIcon = ({ size = 18, className = '' }: { size?: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const SOCIALS = [
  {
    icon: GithubIcon,
    label: 'GitHub',
    href: 'https://github.com/kazuha2004',
    delay: '0s',
  },
  {
    icon: LinkedinIcon,
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/priyanshu-shukla',
    delay: '0.5s',
  },
  {
    icon: Mail,
    label: 'Email',
    href: 'mailto:priyanshushukla0608@gmail.com',
    delay: '1s',
  },
  {
    icon: Code,
    label: 'LeetCode',
    href: 'https://leetcode.com',
    delay: '1.5s',
  },
];

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText('priyanshushukla0608@gmail.com').then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <section id="contact" className="relative py-40 overflow-hidden">
      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 60%, rgba(124,58,237,0.07) 0%, transparent 60%)' }} />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(6,182,212,0.04) 0%, transparent 70%)' }} />

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        {/* Label */}
        <div className="flex items-center justify-center gap-3 mb-16">
          <span className="w-8 h-px bg-[#7C3AED]/60" />
          <span className="section-label">06 — Contact</span>
          <span className="w-8 h-px bg-[#7C3AED]/60" />
        </div>

        {/* Main display text */}
        <h2 className="text-display-lg font-black text-white mb-6 leading-none">
          Let&apos;s build
          <br />
          <span className="gradient-text-purple">something.</span>
          <span className="inline-block w-1.5 h-[0.85em] ml-2 align-middle rounded-sm"
            style={{ background: '#7C3AED', animation: 'blink 1s step-end infinite', verticalAlign: 'middle' }} />
        </h2>

        <p className="text-lg text-[#71717A] mb-12 max-w-md mx-auto">
          Open to full-time roles, freelance projects, and exciting collaborations. Let&apos;s talk.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-4 justify-center mb-16">
          <a
            href="mailto:priyanshushukla0608@gmail.com?subject=Hello Priyanshu!&body=Hi Priyanshu, I came across your portfolio and..."
            className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-semibold text-white overflow-hidden transition-all duration-300"
            style={{ background: 'linear-gradient(135deg, #7C3AED, #5B21B6)', boxShadow: '0 0 30px rgba(124,58,237,0.3)' }}
          >
            <span className="relative z-10 flex items-center gap-2">
              <Mail size={16} />
              Send a Message →
            </span>
            <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ background: 'linear-gradient(135deg, #9D5FF5, #7C3AED)' }} />
          </a>

          {/* Copy email */}
          <button
            onClick={copyEmail}
            className="inline-flex items-center gap-2 px-6 py-4 rounded-xl text-sm font-medium transition-all duration-300"
            style={{
              border: '1px solid rgba(255,255,255,0.08)',
              background: copied ? 'rgba(34,197,94,0.08)' : 'rgba(255,255,255,0.03)',
              borderColor: copied ? 'rgba(34,197,94,0.3)' : 'rgba(255,255,255,0.08)',
              color: copied ? '#4ADE80' : '#A1A1AA',
            }}
          >
            {copied ? (
              <>
                <CheckCheck size={16} />
                Copied!
              </>
            ) : (
              <>
                <span className="font-mono text-xs">priyanshushukla0608@gmail.com</span>
              </>
            )}
          </button>
        </div>

        {/* Social icons with float animation */}
        <div className="flex items-center justify-center gap-6">
          {SOCIALS.map((social) => {
            const Icon = social.icon;
            return (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="group flex flex-col items-center gap-2"
                style={{
                  '--float-duration': '4s',
                  '--float-delay': social.delay,
                } as React.CSSProperties}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 float-anim"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  <Icon
                    size={18}
                    className="text-[#52525B] group-hover:text-white transition-colors"
                  />
                </div>
                <span className="text-[10px] text-[#3F3F46] group-hover:text-[#71717A] transition-colors tracking-wider uppercase">
                  {social.label}
                </span>
              </a>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-24 pt-8 border-t border-white/[0.04]">
          <p className="text-xs text-[#3F3F46]">
            Built by{' '}
            <span className="text-[#52525B]">Priyanshu Shukla</span>
            {' · '}
            2025
            {' · '}
            <span className="text-[#52525B]">Next.js + Three.js</span>
          </p>
        </div>
      </div>
    </section>
  );
}
