import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import confetti from 'canvas-confetti';
import { Scissors, Sparkles, CheckCircle2, ArrowUpRight, RotateCcw } from 'lucide-react';
import { JOURNAL_INFO } from '../../data/journalData';

export default function Sec03RibbonCutting({ isActive, onRestart }) {
  const containerRef = useRef(null);
  const [isCut, setIsCut] = useState(false);
  const [showPortal, setShowPortal] = useState(false);

  useEffect(() => {
    if (!isActive) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        '.ribbon-tag',
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.8 },
        0.1
      )
      .fromTo(
        '.ribbon-title',
        { opacity: 0, scale: 0.94, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 1.1, ease: 'expo.out' },
        0.3
      )
      .fromTo(
        '.ribbon-ceremony-box',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1 },
        0.6
      );
    }, containerRef);

    return () => ctx.revert();
  }, [isActive]);

  const handleCutRibbon = () => {
    if (isCut) return;
    setIsCut(true);

    // 1. Cut ribbon animation: left half drops left, right half drops right
    gsap.to('.ribbon-left', {
      xPercent: -120,
      rotation: -25,
      opacity: 0.4,
      duration: 1.4,
      ease: 'power3.inOut'
    });

    gsap.to('.ribbon-right', {
      xPercent: 120,
      rotation: 25,
      opacity: 0.4,
      duration: 1.4,
      ease: 'power3.inOut'
    });

    // 2. Hide scissors button, reveal celebratory content
    gsap.to('.scissors-btn', {
      scale: 0,
      opacity: 0,
      duration: 0.5,
      ease: 'back.in(1.7)',
      onComplete: () => setShowPortal(true)
    });

    // 3. Multi-stage Celebration Confetti Explosions
    const end = Date.now() + 3.5 * 1000;
    const colors = ['#f59e0b', '#fbbf24', '#3b82f6', '#ffffff', '#e11d48'];

    (function frame() {
      confetti({
        particleCount: 7,
        angle: 60,
        spread: 75,
        origin: { x: 0, y: 0.65 },
        colors: colors
      });
      confetti({
        particleCount: 7,
        angle: 120,
        spread: 75,
        origin: { x: 1, y: 0.65 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();

    // Center burst
    confetti({
      particleCount: 120,
      spread: 100,
      origin: { y: 0.55 },
      colors: colors
    });
  };

  const handleReset = () => {
    setIsCut(false);
    setShowPortal(false);
    gsap.set(['.ribbon-left', '.ribbon-right'], { xPercent: 0, rotation: 0, opacity: 1 });
    gsap.set('.scissors-btn', { scale: 1, opacity: 1 });
    if (onRestart) onRestart();
  };

  return (
    <div 
      ref={containerRef}
      className="w-full h-full flex flex-col items-center justify-center text-center px-4 sm:px-8 max-w-5xl mx-auto relative select-none"
    >
      {/* Ambient background celebratory glow */}
      <div className="absolute w-[650px] h-[650px] bg-gradient-to-r from-amber-500/20 via-blue-600/15 to-transparent rounded-full blur-[140px] pointer-events-none" />

      <div className="ribbon-tag inline-flex items-center gap-2 px-4 py-1 rounded-full bg-amber-500/10 border border-amber-500/40 text-amber-300 text-xs sm:text-sm uppercase tracking-[0.25em] font-mono-tech mb-4 font-semibold">
        <Sparkles className="w-4 h-4 text-amber-400" />
        <span>Grand Inauguration Ceremony</span>
        <Sparkles className="w-4 h-4 text-amber-400" />
      </div>

      <h2 className="ribbon-title text-3xl sm:text-5xl md:text-6xl font-serif-academic font-medium text-slate-100 tracking-tight leading-tight mb-2">
        Official Ribbon Cutting Ceremony
      </h2>

      <p className="text-xs sm:text-sm font-mono-tech uppercase tracking-[0.2em] text-slate-400 mb-8">
        {JOURNAL_INFO.inauguration.date} • {JOURNAL_INFO.publisher}
      </p>

      {/* Main Ribbon Stage Box */}
      <div className="ribbon-ceremony-box relative w-full max-w-3xl bg-slate-950/80 border border-amber-500/30 rounded-3xl p-8 sm:p-12 shadow-2xl backdrop-blur-2xl flex flex-col items-center justify-center overflow-hidden min-h-[320px]">
        
        {/* The Golden Satin Ribbon */}
        <div className="relative w-full flex items-center justify-center py-6 mb-4">
          
          {/* Left Ribbon Half */}
          <div className="ribbon-left w-1/2 h-14 bg-gradient-to-r from-amber-600 via-amber-400 to-amber-300 border-t-2 border-b-2 border-amber-200 shadow-xl flex items-center justify-end pr-4 text-slate-950 font-bold font-serif-academic text-xs sm:text-sm tracking-widest origin-left">
            <span>OFFICIAL</span>
          </div>

          {/* Golden Center Bow & Scissors Action Button */}
          {!isCut ? (
            <button
              onClick={handleCutRibbon}
              className="scissors-btn absolute z-30 px-6 py-3.5 rounded-full bg-slate-900 border-2 border-amber-400 text-amber-300 hover:text-slate-950 hover:bg-amber-400 font-bold text-xs sm:text-sm uppercase font-mono-tech tracking-wider shadow-[0_0_35px_rgba(245,158,11,0.6)] transition-all duration-300 hover:scale-110 active:scale-95 flex items-center gap-2 cursor-pointer"
            >
              <Scissors className="w-5 h-5 text-amber-400 group-hover:text-slate-950 animate-bounce" />
              <span>Cut Ribbon to Inaugurate</span>
            </button>
          ) : (
            <div className="absolute z-30 p-3 rounded-full bg-emerald-500/20 border border-emerald-400 text-emerald-300 animate-pulse flex items-center gap-1.5 text-xs font-mono-tech uppercase tracking-wider">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>Inaugurated</span>
            </div>
          )}

          {/* Right Ribbon Half */}
          <div className="ribbon-right w-1/2 h-14 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-600 border-t-2 border-b-2 border-amber-200 shadow-xl flex items-center justify-start pl-4 text-slate-950 font-bold font-serif-academic text-xs sm:text-sm tracking-widest origin-right">
            <span>INAUGURATION</span>
          </div>
        </div>

        {/* Revealed Celebratory State */}
        {showPortal ? (
          <div className="flex flex-col items-center animate-fadeIn mt-4">
            <h3 className="text-2xl sm:text-3xl font-serif-academic font-bold text-gradient-gold mb-2">
              {JOURNAL_INFO.name} is Officially Inaugurated!
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-lg mb-6 leading-relaxed">
              {JOURNAL_INFO.fullName} is now officially open for global multidisciplinary submissions and research dissemination.
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href={JOURNAL_INFO.portalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-7 py-3 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/25 transition-all hover:scale-105 inline-flex items-center gap-2"
              >
                <span>Enter Main Journal Portal</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <button
                onClick={handleReset}
                className="px-5 py-3 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-amber-400 text-slate-300 text-xs font-mono-tech uppercase tracking-wider transition-all inline-flex items-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
                <span>Replay Ribbon Cutting</span>
              </button>
            </div>
          </div>
        ) : (
          <p className="text-xs font-mono-tech text-slate-400 tracking-wider">
            ✦ Click the scissors above to perform the ceremonial ribbon cutting ✦
          </p>
        )}

      </div>
    </div>
  );
}
