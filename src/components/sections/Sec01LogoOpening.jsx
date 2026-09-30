import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { JOURNAL_INFO } from '../../data/journalData';

export default function Sec01LogoOpening({ isActive }) {
  const containerRef = useRef(null);
  const logoRef = useRef(null);
  const ringRef = useRef(null);
  const titleRef = useRef(null);
  const subRef = useRef(null);

  useEffect(() => {
    // Local continuous slow ring rotation
    const rotateAnim = gsap.to(ringRef.current, {
      rotation: 360,
      duration: 30,
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
        logoRef.current,
        { scale: 0.8, opacity: 0, filter: 'blur(12px)' },
        { scale: 1, opacity: 1, filter: 'blur(0px)', duration: 1.4, ease: 'expo.out' },
        0.1
      )
      .fromTo(
        ringRef.current,
        { scale: 0.5, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.2 },
        0.4
      )
      .fromTo(
        titleRef.current,
        { opacity: 0, y: 30, letterSpacing: '0.25em' },
        { opacity: 1, y: 0, letterSpacing: '0.12em', duration: 1.1 },
        0.7
      )
      .fromTo(
        subRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.9 },
        1.0
      );
    }, containerRef);

    return () => ctx.revert();
  }, [isActive]);

  return (
    <div 
      ref={containerRef}
      className="w-full h-full flex flex-col items-center justify-center text-center px-4 sm:px-6 relative select-none"
    >
      {/* Center Logo with Surrounding SVG Orbit */}
      <div className="relative mb-10 flex items-center justify-center">
        
        {/* Animated Local SVG Orbit Ring */}
        <svg 
          ref={ringRef} 
          className="absolute w-52 h-52 sm:w-64 sm:h-64 pointer-events-none text-amber-500/30"
          viewBox="0 0 200 200"
        >
          <circle cx="100" cy="100" r="92" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 6" />
          <circle cx="192" cy="100" r="3" fill="#f59e0b" />
          <circle cx="8" cy="100" r="2.5" fill="#3b82f6" />
        </svg>

        {/* IJSPAST Official Logo */}
        <div 
          ref={logoRef} 
          className="relative z-10 w-28 h-28 sm:w-36 sm:h-36 p-4 rounded-full bg-slate-950/90 border border-amber-400/30 shadow-[0_0_40px_rgba(245,158,11,0.2)] flex items-center justify-center backdrop-blur-xl"
        >
          <img 
            src="/logo.png" 
            alt="IJSPAST Official Emblem" 
            className="w-full h-full object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.8)]"
          />
        </div>
      </div>

      {/* Official Journal Name */}
      <h1 
        ref={titleRef}
        className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-serif-academic font-medium text-slate-100 max-w-4xl tracking-wide leading-tight mb-4"
      >
        {JOURNAL_INFO.fullName}
      </h1>

      <div ref={subRef} className="space-y-1">
        <div className="text-3xl sm:text-5xl font-bold font-serif-academic text-gradient-gold tracking-[0.18em]">
          {JOURNAL_INFO.name}
        </div>
        <p className="text-[11px] sm:text-xs font-mono-tech uppercase tracking-[0.3em] text-slate-400">
          {JOURNAL_INFO.publisher}
        </p>
      </div>

      {/* Bottom scroll hint */}
      <div className="absolute bottom-8 flex flex-col items-center gap-1.5 opacity-60">
        <span className="text-[10px] font-mono-tech uppercase tracking-[0.25em] text-slate-400">
          Scroll to Begin
        </span>
        <div className="w-px h-6 bg-gradient-to-b from-amber-400 to-transparent" />
      </div>
    </div>
  );
}
