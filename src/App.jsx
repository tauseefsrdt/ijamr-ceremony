import React, { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import confetti from 'canvas-confetti';
import { 
  Scissors, 
  Sparkles, 
  CheckCircle2, 
  ArrowUpRight, 
  RotateCcw, 
  Calendar, 
  Clock, 
  BookOpen,
  Sparkle
} from 'lucide-react';
import { JOURNAL_INFO } from './data/journalData';

export default function App() {
  const containerRef = useRef(null);
  const bgImgRef = useRef(null);
  const scissorsBtnRef = useRef(null);
  const [isCut, setIsCut] = useState(false);
  const [showCeremonyDetails, setShowCeremonyDetails] = useState(false);

  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set('[data-animate]', { opacity: 1, y: 0, scale: 1 });
        return;
      }

      // Initial clean state
      gsap.set('[data-animate]', {
        opacity: 0,
        y: 28,
        willChange: 'transform, opacity'
      });

      // Background gentle zoom & breathing float
      if (bgImgRef.current) {
        gsap.fromTo(bgImgRef.current, 
          { scale: 1.08, opacity: 0.9 },
          { scale: 1.02, opacity: 1, duration: 1.8, ease: 'power2.out' }
        );

        // Continuous subtle slow ambient breathing on background
        gsap.to(bgImgRef.current, {
          scale: 1.05,
          duration: 12,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        });
      }

      // Staggered sequence for clean single entrance
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out', duration: 1.0 }
      });

      tl.to('[data-animate="logo"]', { opacity: 1, y: 0, duration: 1.2, ease: 'back.out(1.5)', delay: 0.2 })
        .to('[data-animate="badge"]', { opacity: 1, y: 0, duration: 0.9 }, '-=0.7')
        .to('[data-animate="title"]', { opacity: 1, y: 0, duration: 1.1 }, '-=0.7')
        .to('[data-animate="subtitle"]', { opacity: 1, y: 0, duration: 0.9 }, '-=0.7')
        .to('[data-animate="ribbon-box"]', { opacity: 1, y: 0, duration: 1.0 }, '-=0.6')
        .to('[data-animate="date-pill"]', { opacity: 1, y: 0, duration: 0.9 }, '-=0.6')
        .to('[data-animate="footer"]', { opacity: 1, y: 0 }, '-=0.5');

      // Continuous floating gold shimmer particles
      gsap.to('.floating-particle-1', {
        y: -30,
        x: 12,
        rotation: 180,
        opacity: 0.8,
        duration: 4.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });

      gsap.to('.floating-particle-2', {
        y: -25,
        x: -15,
        rotation: -180,
        opacity: 0.7,
        duration: 5.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 0.8
      });

      // Subtle pulse on scissors button
      if (scissorsBtnRef.current) {
        gsap.to(scissorsBtnRef.current, {
          scale: 1.04,
          boxShadow: '0 10px 30px rgba(202, 138, 4, 0.55)',
          duration: 1.4,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        });
      }

    }, containerRef);

    // Interactive subtle mouse parallax depth
    const handleMouseMove = (e) => {
      if (prefersReducedMotion || !bgImgRef.current) return;
      const { innerWidth, innerHeight } = window;
      const xPercent = (e.clientX / innerWidth - 0.5) * 18;
      const yPercent = (e.clientY / innerHeight - 0.5) * 18;

      gsap.to(bgImgRef.current, {
        x: xPercent,
        y: yPercent,
        duration: 2.0,
        ease: 'power1.out',
        overwrite: 'auto'
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      ctx.revert();
    };
  }, []);

  const handleCutRibbon = () => {
    if (isCut) return;
    setIsCut(true);

    // Smooth ribbon parting animation
    gsap.to('.ribbon-piece-left', {
      xPercent: -125,
      rotation: -18,
      opacity: 0.15,
      duration: 1.2,
      ease: 'power3.inOut'
    });

    gsap.to('.ribbon-piece-right', {
      xPercent: 125,
      rotation: 18,
      opacity: 0.15,
      duration: 1.2,
      ease: 'power3.inOut'
    });

    gsap.to('.scissors-button', {
      scale: 0,
      opacity: 0,
      duration: 0.35,
      ease: 'power2.in',
      onComplete: () => {
        setShowCeremonyDetails(true);
        gsap.fromTo('.portal-reveal-box',
          { opacity: 0, y: 15, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'back.out(1.5)' }
        );
      }
    });

    // Celebratory confetti burst
    const end = Date.now() + 3.5 * 1000;
    const colors = ['#ca8a04', '#eab308', '#0284c7', '#0f172a', '#10b981'];

    (function frame() {
      confetti({
        particleCount: 7,
        angle: 60,
        spread: 80,
        origin: { x: 0.15, y: 0.65 },
        colors: colors
      });
      confetti({
        particleCount: 7,
        angle: 120,
        spread: 80,
        origin: { x: 0.85, y: 0.65 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();

    confetti({
      particleCount: 140,
      spread: 110,
      origin: { y: 0.55 },
      colors: colors
    });
  };

  const handleReset = () => {
    setIsCut(false);
    setShowCeremonyDetails(false);
    gsap.set(['.ribbon-piece-left', '.ribbon-piece-right'], { xPercent: 0, rotation: 0, opacity: 1 });
    gsap.set('.scissors-button', { scale: 1, opacity: 1 });
  };

  return (
    <main
      ref={containerRef}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#071326] text-slate-900 select-none"
      style={{ minHeight: '100svh' }}
    >
      {/* 1. CRYSTAL CLEAR HD BACKGROUND IMAGE (No heavy blur, crisp architecture) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
        <img 
          ref={bgImgRef}
          src="/grand-library.jpg" 
          alt="Grand Academic Library Background" 
          className="w-full h-full object-cover object-center transform scale-105 filter brightness-[1.02] contrast-[1.03]"
        />
        
        {/* Soft, Light Central Illumination (Leaves the library architecture completely clear & unblurred) */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at 50% 50%, rgba(255, 255, 255, 0.82) 0%, rgba(255, 255, 255, 0.45) 45%, rgba(10, 25, 50, 0.25) 100%)'
          }}
        />

        {/* Floating Golden Confetti / Star Particles */}
        <div className="floating-particle-1 absolute top-[25%] left-[18%] text-amber-500 opacity-60">
          <Sparkle className="w-6 h-6 fill-amber-400" />
        </div>
        <div className="floating-particle-2 absolute bottom-[30%] right-[18%] text-amber-500 opacity-60">
          <Sparkles className="w-7 h-7" />
        </div>
      </div>

      {/* 2. FOREGROUND EDITORIAL CONTENT */}
      <div className="relative z-10 max-w-4xl w-full mx-auto text-center flex flex-col items-center justify-center px-4 sm:px-6 py-6">
        
        {/* Crisp Logo Container with Deep Navy Contrast */}
        <div 
          data-animate="logo"
          className="mb-3.5 flex flex-col items-center justify-center"
        >
          <div className="px-6 py-3 rounded-2xl bg-[#06152d] border-2 border-amber-400/70 shadow-2xl shadow-slate-950/30">
            <img 
              src="/logo.png" 
              alt="IJSPAST Logo" 
              className="h-12 sm:h-16 md:h-18 w-auto max-w-[85vw] sm:max-w-[450px] object-contain drop-shadow-[0_2px_8px_rgba(255,255,255,0.2)]"
            />
          </div>
        </div>

        {/* INAUGURATION CEREMONY Tag with Diamond Accent Lines */}
        <div 
          data-animate="badge"
          className="flex items-center justify-center gap-3 w-full max-w-md my-1.5"
        >
          <div className="h-[1.5px] flex-1 bg-gradient-to-r from-transparent to-amber-700" />
          <span className="text-[11px] sm:text-xs font-bold tracking-[0.28em] uppercase text-amber-950 font-mono-tech flex items-center gap-2 drop-shadow-sm">
            <span>◇</span>
            <span>INAUGURATION CEREMONY</span>
            <span>◇</span>
          </span>
          <div className="h-[1.5px] flex-1 bg-gradient-to-l from-transparent to-amber-700" />
        </div>

        {/* Headline: "A New Chapter in Scholarly Research" */}
        <div data-animate="title" className="my-1.5">
          <h1 className="font-serif-academic text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#061733] leading-[1.08] drop-shadow-sm">
            A New Chapter in
          </h1>
          <h2 className="font-serif-academic text-4xl sm:text-6xl md:text-7xl font-bold italic tracking-tight text-gold-banner leading-[1.08] mt-1 drop-shadow-sm">
            Scholarly Research
          </h2>
        </div>

        {/* Centerpiece Accent Divider */}
        <div className="flex items-center justify-center gap-2 my-1.5 opacity-90">
          <div className="h-[1.5px] w-14 bg-amber-700" />
          <div className="w-2 h-2 rotate-45 border border-amber-700 bg-amber-300" />
          <div className="h-[1.5px] w-14 bg-amber-700" />
        </div>

        {/* Description Text */}
        <p 
          data-animate="subtitle"
          className="text-sm sm:text-base md:text-lg font-medium text-slate-800 tracking-wide max-w-2xl mb-5 font-sans leading-relaxed drop-shadow-sm"
        >
          IJSPAST is set to begin its journey, creating a global platform for innovative research and meaningful academic dialogue.
        </p>

        {/* 3. Interactive Ribbon Cutting Ceremony Stage */}
        <div 
          data-animate="ribbon-box"
          className="relative w-full max-w-2xl glass-banner-card rounded-3xl p-5 sm:p-7 mb-5 overflow-hidden shadow-2xl"
        >
          {/* Golden Satin Ribbon */}
          <div className="relative w-full flex items-center justify-center py-4 my-1 overflow-hidden">
            
            {/* Left Satin Ribbon */}
            <div className="ribbon-piece-left w-1/2 h-12 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-300 border-t border-b border-amber-100 shadow-md flex items-center justify-end pr-5 text-slate-950 font-bold font-serif-academic text-xs sm:text-sm tracking-widest origin-left">
              <span>OFFICIAL</span>
            </div>

            {/* Central Scissors Trigger Button */}
            {!isCut ? (
              <button
                ref={scissorsBtnRef}
                onClick={handleCutRibbon}
                className="scissors-button absolute z-30 px-6 sm:px-7 py-2.5 sm:py-3 rounded-full bg-slate-950 hover:bg-amber-500 border-2 border-amber-400 text-amber-300 hover:text-slate-950 font-bold text-xs uppercase tracking-wider transition-all duration-300 active:scale-95 flex items-center gap-2 cursor-pointer select-none"
              >
                <Scissors className="w-4 h-4 text-amber-400 group-hover:text-slate-950 animate-bounce" />
                <span>Cut Ribbon to Inaugurate</span>
              </button>
            ) : (
              <div className="absolute z-30 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-500 text-emerald-800 flex items-center gap-2 text-xs font-semibold tracking-wider shadow-md">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Officially Inaugurated</span>
              </div>
            )}

            {/* Right Satin Ribbon */}
            <div className="ribbon-piece-right w-1/2 h-12 bg-gradient-to-r from-amber-300 via-amber-500 to-amber-600 border-t border-b border-amber-100 shadow-md flex items-center justify-start pl-5 text-slate-950 font-bold font-serif-academic text-xs sm:text-sm tracking-widest origin-right">
              <span>INAUGURATION</span>
            </div>
          </div>

          {/* Action After Ribbon Cut */}
          {showCeremonyDetails ? (
            <div className="portal-reveal-box mt-3 pt-3 border-t border-slate-200 flex flex-wrap items-center justify-center gap-3">
              <a
                href={JOURNAL_INFO.portalUrl || "https://srmu-journal.netlify.app/"}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all inline-flex items-center gap-2 shadow-lg shadow-amber-500/25 hover:scale-105"
              >
                <span>Enter Journal Portal</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <button
                onClick={handleReset}
                className="px-4 py-2.5 rounded-full bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 text-xs font-semibold uppercase tracking-wider transition-all inline-flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <RotateCcw className="w-3.5 h-3.5 text-amber-600" />
                <span>Replay</span>
              </button>
            </div>
          ) : (
            <p className="text-[11px] sm:text-xs text-slate-600 tracking-wider mt-1.5 font-medium">
              ✦ Click on the scissors button to perform the official ribbon-cutting ceremony ✦
            </p>
          )}
        </div>

        {/* 4. Elegant Date Pill */}
        <div 
          data-animate="date-pill"
          className="inline-flex items-center gap-4 px-8 py-3 rounded-full bg-white/95 border-2 border-amber-400/80 shadow-lg backdrop-blur-md mb-4"
        >
          <div className="p-2 rounded-lg bg-amber-500/15 text-amber-700">
            <Calendar className="w-5 h-5" />
          </div>
          <div className="text-left pr-2">
            <span className="font-serif-academic text-2xl sm:text-3xl font-bold text-[#061733] tracking-widest block">
              01 • 01 • 2026
            </span>
            <span className="text-[10px] sm:text-xs text-slate-600 font-semibold tracking-wide flex items-center gap-1">
              <Clock className="w-3 h-3 text-amber-600 inline" />
              <span>Time will be announced</span>
            </span>
          </div>
        </div>

        {/* Footer Academic Label */}
        <div 
          data-animate="footer"
          className="text-center"
        >
          <p className="text-xs text-slate-600 font-medium tracking-wider flex items-center justify-center gap-2">
            <BookOpen className="w-3.5 h-3.5 text-amber-600 inline" />
            <span>International Journal of Scientific Progress in Applied Science and Technology (IJSPAST)</span>
          </p>
        </div>

      </div>
    </main>
  );
}
