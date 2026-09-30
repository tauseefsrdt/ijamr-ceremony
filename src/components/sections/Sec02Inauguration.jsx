import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Calendar, Clock, Sparkles } from 'lucide-react';
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
        '.sec2-cards',
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
      <div className="sec2-eyebrow inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-900 text-xs sm:text-sm uppercase tracking-[0.25em] font-mono-tech mb-6 font-bold">
        <Sparkles className="w-3.5 h-3.5 text-amber-600" />
        <span>Inauguration Particulars</span>
      </div>

      <h2 className="sec2-main text-4xl sm:text-6xl md:text-7xl font-serif-academic font-medium text-slate-900 tracking-tight leading-none mb-3">
        {JOURNAL_INFO.name}
      </h2>

      <p className="sec2-main text-xs sm:text-sm font-mono-tech uppercase tracking-[0.25em] text-slate-600 max-w-xl mb-12 font-medium">
        {JOURNAL_INFO.fullName}
      </p>

      {/* Luxury Light Cards for Date and Time */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-2xl">
        
        {/* Date Card */}
        <div className="sec2-cards bg-white/90 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border-2 border-amber-400/50 shadow-2xl shadow-amber-500/10 text-left flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/15 border border-amber-500/40 flex items-center justify-center text-amber-600 flex-shrink-0 shadow-md shadow-amber-500/10">
            <Calendar className="w-7 h-7" />
          </div>
          <div>
            <span className="text-[10px] font-mono-tech uppercase tracking-widest text-amber-700 font-bold block mb-1">
              Ceremony Date
            </span>
            <span className="text-2xl sm:text-3xl font-serif-academic font-bold text-slate-900">
              {JOURNAL_INFO.inauguration.date}
            </span>
          </div>
        </div>

        {/* Time Card */}
        <div className="sec2-cards bg-white/90 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border-2 border-blue-400/50 shadow-2xl shadow-blue-500/10 text-left flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-blue-500/15 border border-blue-500/40 flex items-center justify-center text-blue-700 flex-shrink-0 shadow-md shadow-blue-500/10">
            <Clock className="w-7 h-7" />
          </div>
          <div>
            <span className="text-[10px] font-mono-tech uppercase tracking-widest text-blue-800 font-bold block mb-1">
              Ceremony Schedule
            </span>
            <span className="text-xl sm:text-2xl font-serif-academic font-semibold text-slate-900">
              {JOURNAL_INFO.inauguration.time}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
