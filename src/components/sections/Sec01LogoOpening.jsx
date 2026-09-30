import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Sparkles, ArrowDown } from 'lucide-react';
import { JOURNAL_INFO } from '../../data/journalData';

export default function Sec01LogoOpening({ isActive }) {
  const containerRef = useRef(null);
  const logoBoxRef = useRef(null);
  const ringRef = useRef(null);
  const titleRef = useRef(null);
  const subRef = useRef(null);

  useEffect(() => {
    // Continuous rotating orbit ring
    const rotateAnim = gsap.to(ringRef.current, {
      rotation: 360,
      duration: 35,
      repeat: -1,
      ease: 'none',
      transformOrigin: '50% 50%'
    });

    return () => rotateAnim.kill();
  }, []);

  useEffect(() => {
    if (!isActive) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        logoBoxRef.current,
        { scale: 0.85, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.2, ease: 'expo.out' },
        0.1
      )
      .fromTo(
        ringRef.current,
        { scale: 0.6, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.1 },
        0.3
      )
      .fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.1 },
        0.5
      )
      .fromTo(
        subRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.9 },
        0.8
      );
    }, containerRef);

    return () => ctx.revert();
  }, [isActive]);

  return (
    <div 
      ref={containerRef}
      className="w-full h-full flex flex-col items-center justify-center text-center px-4 sm:px-6 relative select-none"
    >
      {/* Eyebrow Milestone Tag */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-900 text-xs uppercase tracking-[0.25em] font-mono-tech mb-6 font-bold">
        <Sparkles className="w-3.5 h-3.5 text-amber-600" />
        <span>Official Journal Launch</span>
        <Sparkles className="w-3.5 h-3.5 text-amber-600" />
      </div>

      {/* Prominent Large Logo Badge (Contrast Dark Container for White Text in Logo) */}
      <div className="relative mb-8 flex items-center justify-center">
        
        {/* Animated Golden Vector Orbit */}
        <svg 
          ref={ringRef} 
          className="absolute w-72 h-72 sm:w-96 sm:h-96 pointer-events-none text-amber-500/40"
          viewBox="0 0 300 300"
        >
          <circle cx="150" cy="150" r="140" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="5 7" />
          <circle cx="290" cy="150" r="5.5" fill="#d97706" />
          <circle cx="10" cy="150" r="4.5" fill="#0f3b6c" />
        </svg>

        {/* High-Contrast Royal Navy & Gold Badge so White Letters in Logo are 100% Crisp and Readable */}
        <div 
          ref={logoBoxRef} 
          className="relative z-10 w-64 sm:w-80 md:w-96 h-28 sm:h-36 px-6 py-3 rounded-3xl bg-gradient-to-r from-[#0c2340] via-[#0f3b6c] to-[#0c2340] border-2 border-amber-400 shadow-[0_15px_40px_rgba(217,119,6,0.3)] flex items-center justify-center"
        >
          <img 
            src="/logo.png" 
            alt="IJSPAST Official Logo" 
            className="w-full h-full object-contain filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
          />
        </div>
      </div>

      {/* Official Journal Name */}
      <h1 
        ref={titleRef}
        className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-serif-academic font-medium text-slate-900 max-w-4xl tracking-tight leading-tight mb-4"
      >
        {JOURNAL_INFO.fullName}
      </h1>

      <div ref={subRef} className="space-y-2">
        <div className="text-4xl sm:text-6xl md:text-7xl font-bold font-serif-academic text-gradient-gold tracking-[0.18em]">
          {JOURNAL_INFO.name}
        </div>
        <p className="text-xs sm:text-sm font-mono-tech uppercase tracking-[0.3em] text-slate-600 font-semibold">
          {JOURNAL_INFO.publisher}
        </p>
      </div>

      {/* Bottom scroll prompt */}
      <div className="absolute bottom-8 flex flex-col items-center gap-2 opacity-80">
        <span className="text-[10px] font-mono-tech uppercase tracking-[0.25em] text-amber-800 font-bold">
          Scroll Down to Enter Ceremony
        </span>
        <div className="p-1.5 rounded-full border border-amber-500/50 bg-white text-amber-600 shadow-md animate-bounce">
          <ArrowDown className="w-3.5 h-3.5" />
        </div>
      </div>
    </div>
  );
}
