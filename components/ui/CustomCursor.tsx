'use client';
import { useEffect } from 'react';

export default function CustomCursor() {
  useEffect(() => {
    const dot = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');
    if (!dot || !ring) return;

    let ringX = 0, ringY = 0;
    let mouseX = 0, mouseY = 0;
    let rafId: number;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = mouseX + 'px';
      dot.style.top = mouseY + 'px';
    };

    const animate = () => {
      ringX = lerp(ringX, mouseX, 0.1);
      ringY = lerp(ringY, mouseY, 0.1);
      ring.style.left = ringX + 'px';
      ring.style.top = ringY + 'px';
      rafId = requestAnimationFrame(animate);
    };

    const onEnterLink = () => ring.classList.add('hovered-link');
    const onLeaveLink = () => ring.classList.remove('hovered-link');
    const onEnterCard = () => ring.classList.add('hovered-card');
    const onLeaveCard = () => ring.classList.remove('hovered-card');

    document.addEventListener('mousemove', onMouseMove, { passive: true });
    rafId = requestAnimationFrame(animate);

    // Link hover
    const addLinkListeners = () => {
      document.querySelectorAll('a, button').forEach((el) => {
        el.addEventListener('mouseenter', onEnterLink);
        el.addEventListener('mouseleave', onLeaveLink);
      });
      document.querySelectorAll('[data-cursor="drag"]').forEach((el) => {
        el.addEventListener('mouseenter', onEnterCard);
        el.addEventListener('mouseleave', onLeaveCard);
      });
    };

    addLinkListeners();

    // Re-run when DOM changes
    const observer = new MutationObserver(addLinkListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div id="cursor-dot" />
      <div id="cursor-ring" />
    </>
  );
}
