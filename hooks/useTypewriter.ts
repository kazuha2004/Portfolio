'use client';
import { useState, useEffect, useRef } from 'react';

const ROLES = [
  'Full-Stack Developer',
  'AI/ML Engineer',
  'Patent Holder',
  'Founder @ Kazuha Closet',
  'ICPC Participant',
];

export function useTypewriter(speed = 60, deleteSpeed = 30, pause = 1800) {
  const [displayed, setDisplayed] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [phase, setPhase] = useState<'typing' | 'pausing' | 'deleting'>('typing');
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const current = ROLES[roleIndex];

    if (phase === 'typing') {
      if (displayed.length < current.length) {
        timeoutRef.current = setTimeout(() => {
          setDisplayed(current.slice(0, displayed.length + 1));
        }, speed);
      } else {
        timeoutRef.current = setTimeout(() => setPhase('pausing'), pause);
      }
    } else if (phase === 'pausing') {
      timeoutRef.current = setTimeout(() => setPhase('deleting'), 300);
    } else if (phase === 'deleting') {
      if (displayed.length > 0) {
        timeoutRef.current = setTimeout(() => {
          setDisplayed(displayed.slice(0, -1));
        }, deleteSpeed);
      } else {
        setRoleIndex((i) => (i + 1) % ROLES.length);
        setPhase('typing');
      }
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [displayed, phase, roleIndex, speed, deleteSpeed, pause]);

  return displayed;
}
