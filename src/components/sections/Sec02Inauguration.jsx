import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { JOURNAL_INFO } from '../../data/journalData';

export default function Sec02Inauguration({ isActive }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!isActive) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        '.sec2-eyebrow',
        { opacity: 0, y: -20, letterSpacing: '0.4em' },
        { opacity: 1, y: 0, letterSpacing: '0.25em', duration: 0.9 },
        0.1
      )
      .fromTo(
        '.sec2-main',
        { opacity: 0, scale: 0.94, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 1.1, ease: 'expo.out' },
        0.3
      )
      .fromTo(
        '.sec2-meta',
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, stagger: 0.2, duration: 0.9 },
        0.6
      );
    }, containerRef);

    return () => ctx.revert();
  }, [isActive]);

  return (
    <div 
      ref={containerRef}
      className="w-full h-full flex flex-col items-center justify-center text-center px-4 sm:px-6 relative select-none"
    >
      <div className="sec2-eyebrow text-xs sm:text-sm font-mono-tech uppercase tracking-[0.25em] text-amber-400 font-semibold mb-4">
        Official Inauguration
      </div>

      <h2 className="sec2-main text-4xl sm:text-6xl md:text-7xl font-serif-academic font-medium text-slate-100 tracking-tight leading-none mb-3">
        {JOURNAL_INFO.name}
      </h2>

      <p className="sec2-main text-xs sm:text-sm font-mono-tech uppercase tracking-[0.25em] text-slate-400 mb-12">
        {JOURNAL_INFO.fullName}
      </p>

      {/* Minimal Date & Time Block */}
      <div className="flex flex-col sm:flex-row items-center gap-8 sm:gap-14 border-t border-b border-slate-800/80 py-8 px-8 sm:px-16">
        <div className="sec2-meta flex flex-col items-center">
          <span className="text-[10px] font-mono-tech uppercase tracking-[0.25em] text-amber-400 mb-1">
            Ceremony Date
          </span>
          <span className="text-2xl sm:text-4xl font-serif-academic font-bold text-white tracking-wide">
            {JOURNAL_INFO.inauguration.date}
          </span>
        </div>

        <div className="hidden sm:block w-px h-12 bg-slate-800" />

        <div className="sec2-meta flex flex-col items-center">
          <span className="text-[10px] font-mono-tech uppercase tracking-[0.25em] text-blue-400 mb-1">
            Ceremony Timing
          </span>
          <span className="text-xl sm:text-3xl font-serif-academic font-semibold text-slate-300 tracking-wide">
            {JOURNAL_INFO.inauguration.time}
          </span>
        </div>
      </div>
    </div>
  );
}
