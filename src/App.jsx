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
  BookOpen, 
  PartyPopper, 
  Gift, 
  Flame, 
  Crown, 
  Award, 
  Star, 
  BellRing,
  Sparkle
} from 'lucide-react';
import { JOURNAL_INFO } from './data/journalData';

export default function App() {
  const compRef = useRef(null);
  const logoRef = useRef(null);
  const titleRef = useRef(null);
  const scissorsBtnRef = useRef(null);
  const [isCut, setIsCut] = useState(false);
  const [showCeremonyDetails, setShowCeremonyDetails] = useState(false);

  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set('[data-animate]', { opacity: 1, y: 0, scale: 1 });
        gsap.set('.celebration-vector', { opacity: 0.7 });
        return;
      }

      // Initial clean state for main content
      gsap.set('[data-animate]', {
        opacity: 0,
        y: 24,
      });

      // Special initial state for Logo
      gsap.set(logoRef.current, {
        opacity: 0,
        scale: 0.82,
        y: 25,
        rotationX: 15
      });

      // --- 1. ATTRACTIVE GSAP LOGO ENTRANCE & CONTINUOUS LEVITATION ---
      gsap.to(logoRef.current, {
        opacity: 1,
        scale: 1,
        y: 0,
        rotationX: 0,
        duration: 1.3,
        ease: 'back.out(1.6)',
        delay: 0.2
      });

      // Gentle floating levitation for the logo
      gsap.to(logoRef.current, {
        y: -7,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 1.5
      });

      // Pulsing golden aura behind logo
      gsap.to('.logo-glow-effect', {
        opacity: 0.85,
        scale: 1.12,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });

      // --- 2. ATTRACTIVE CONTINUOUS VECTOR ANIMATIONS ---
      gsap.to('.vector-party-popper', {
        rotation: 22,
        y: -18,
        scale: 1.12,
        duration: 2.2,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut'
      });

      gsap.to('.vector-crown', {
        y: -22,
        rotation: -12,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });

      gsap.to('.vector-gift', {
        y: -15,
        scale: 1.15,
        rotation: 8,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: 'elastic.out(1, 0.4)'
      });

      gsap.to('.vector-flame', {
        scaleY: 1.28,
        scaleX: 0.9,
        opacity: 0.85,
        duration: 1.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });

      gsap.to('.vector-bell', {
        rotation: 28,
        transformOrigin: 'top center',
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });

      gsap.to('.vector-award', {
        rotationY: 50,
        y: -18,
        duration: 3.8,
        repeat: -1,
        yoyo: true,
        ease: 'power2.inOut'
      });

      gsap.to('.vector-sparkle-1', {
        scale: 1.5,
        rotation: 180,
        opacity: 0.95,
        duration: 2.6,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });

      gsap.to('.vector-sparkle-2', {
        scale: 0.55,
        rotation: -180,
        opacity: 0.35,
        duration: 2.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 0.3
      });

      // --- 3. ATTRACTIVE PULSING CALL-TO-ACTION FOR SCISSORS BUTTON ---
      if (scissorsBtnRef.current) {
        gsap.to(scissorsBtnRef.current, {
          boxShadow: '0 0 35px rgba(217, 119, 6, 0.6), 0 0 15px rgba(245, 158, 11, 0.8)',
          scale: 1.04,
          duration: 1.4,
          repeat: -1,
          yoyo: true,
          ease: 'power1.inOut'
        });
      }

      // Satin Ribbon Glisten Sweep
      gsap.to('.ribbon-shimmer', {
        xPercent: 250,
        duration: 3.5,
        repeat: -1,
        ease: 'power2.inOut',
        repeatDelay: 1.2
      });

      // Warm ambient pulsing backdrop
      gsap.to('.ambient-celebration-glow', {
        scale: 1.15,
        opacity: 0.45,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });

      // Main content smooth cascading entrance timeline
      const tl = gsap.timeline({
        defaults: {
          ease: 'power3.out',
          duration: 0.9,
        }
      });

      tl.to('[data-animate="badge"]', { opacity: 1, y: 0, delay: 0.1 })
        .to(titleRef.current, { opacity: 1, y: 0, duration: 1.1, ease: 'expo.out' }, '-=0.55')
        .to('[data-animate="divider"]', { opacity: 1, scaleX: 1, duration: 0.8 }, '-=0.6')
        .to('[data-animate="subtitle"]', { opacity: 1, y: 0 }, '-=0.6')
        .to('[data-animate="ribbon-box"]', { opacity: 1, y: 0, duration: 0.9 }, '-=0.5')
        .to('[data-animate="meta"]', { opacity: 1, y: 0 }, '-=0.5')
        .to('[data-animate="footer-note"]', { opacity: 1, y: 0 }, '-=0.4');

    }, compRef);

    // Interactive 3D Cursor Parallax on Light Canvas
    const handleMouseMove = (e) => {
      if (prefersReducedMotion || !compRef.current) return;
      const { innerWidth, innerHeight } = window;
      const xOffset = (e.clientX / innerWidth - 0.5) * 20;
      const yOffset = (e.clientY / innerHeight - 0.5) * 20;

      gsap.to('.vector-party-popper, .vector-crown', {
        x: xOffset * 0.8,
        y: yOffset * 0.8,
        duration: 1.5,
        ease: 'power1.out',
        overwrite: 'auto'
      });

      gsap.to('.vector-flame, .vector-bell', {
        x: -xOffset * 0.6,
        y: -yOffset * 0.6,
        duration: 1.5,
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

    // Satin ribbon cut opening animation with dramatic swing
    gsap.to('.ribbon-left', {
      xPercent: -130,
      rotation: -22,
      opacity: 0.15,
      duration: 1.3,
      ease: 'power3.inOut'
    });

    gsap.to('.ribbon-right', {
      xPercent: 130,
      rotation: 22,
      opacity: 0.15,
      duration: 1.3,
      ease: 'power3.inOut'
    });

    gsap.to('.scissors-trigger', {
      scale: 0,
      opacity: 0,
      duration: 0.4,
      ease: 'power2.in',
      onComplete: () => {
        setShowCeremonyDetails(true);
        gsap.fromTo('.inauguration-reveal-content', 
          { opacity: 0, scale: 0.9, y: 15 },
          { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: 'back.out(1.5)' }
        );
      }
    });

    // Multi-angle celebratory confetti explosions
    const end = Date.now() + 4 * 1000;
    const colors = ['#d97706', '#f59e0b', '#0284c7', '#ec4899', '#8b5cf6', '#10b981'];

    (function frame() {
      confetti({
        particleCount: 8,
        angle: 60,
        spread: 85,
        origin: { x: 0, y: 0.65 },
        colors: colors
      });
      confetti({
        particleCount: 8,
        angle: 120,
        spread: 85,
        origin: { x: 1, y: 0.65 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();

    confetti({
      particleCount: 160,
      spread: 120,
      origin: { y: 0.55 },
      colors: colors
    });
  };

  const handleReset = () => {
    setIsCut(false);
    setShowCeremonyDetails(false);
    gsap.set(['.ribbon-left', '.ribbon-right'], { xPercent: 0, rotation: 0, opacity: 1 });
    gsap.set('.scissors-trigger', { scale: 1, opacity: 1 });
  };

  return (
    <main
      ref={compRef}
      className="relative min-h-screen w-full flex flex-col justify-center items-center overflow-hidden bg-[#fcf9f2] text-slate-900 px-4 sm:px-6 lg:px-8 select-none"
      style={{ minHeight: '100svh' }}
    >
      {/* 1. DISTINCT ANIMATED CELEBRATION VECTOR ICONS */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
        
        {/* Soft Warm Ambient Glow */}
        <div 
          className="ambient-celebration-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[950px] h-[550px] sm:h-[750px] rounded-full blur-[130px] opacity-35"
          style={{
            background: 'radial-gradient(circle, rgba(251, 191, 36, 0.45) 0%, rgba(254, 215, 170, 0.5) 40%, transparent 75%)'
          }}
        />

        {/* Vector 1: Party Popper (Top Left) */}
        <div className="vector-party-popper celebration-vector absolute top-[7%] left-[6%] sm:left-[10%] text-amber-600 opacity-60">
          <PartyPopper className="w-14 sm:w-20 h-14 sm:h-20 drop-shadow-sm" />
        </div>

        {/* Vector 2: Golden Royal Crown (Top Right) */}
        <div className="vector-crown celebration-vector absolute top-[8%] right-[6%] sm:right-[11%] text-amber-500 opacity-60">
          <Crown className="w-14 sm:w-20 h-14 sm:h-20 drop-shadow-sm" />
        </div>

        {/* Vector 3: Inaugural Diya / Auspicious Flame (Bottom Left) */}
        <div className="vector-flame celebration-vector absolute bottom-[10%] left-[7%] sm:left-[12%] text-orange-500 opacity-60">
          <Flame className="w-14 sm:w-20 h-14 sm:h-20 drop-shadow-sm" />
        </div>

        {/* Vector 4: Celebration Bell (Bottom Right) */}
        <div className="vector-bell celebration-vector absolute bottom-[10%] right-[7%] sm:right-[11%] text-amber-600 opacity-60">
          <BellRing className="w-14 sm:w-20 h-14 sm:h-20 drop-shadow-sm" />
        </div>

        {/* Vector 5: Gift Box (Center Left) */}
        <div className="vector-gift celebration-vector absolute top-[44%] left-[3%] sm:left-[5%] text-rose-500 opacity-50">
          <Gift className="w-10 sm:w-14 h-10 sm:h-14 drop-shadow-sm" />
        </div>

        {/* Vector 6: Golden Award Medal (Center Right) */}
        <div className="vector-award celebration-vector absolute top-[44%] right-[3%] sm:right-[5%] text-yellow-600 opacity-55">
          <Award className="w-11 sm:w-15 h-11 sm:h-15 drop-shadow-sm" />
        </div>

        {/* Vector 7: Twinkling Celebration Sparkle Star */}
        <div className="vector-sparkle-1 celebration-vector absolute top-[24%] left-[22%] sm:left-[26%] text-amber-500 opacity-70">
          <Sparkle className="w-6 sm:w-8 h-6 sm:h-8 fill-amber-400" />
        </div>

        {/* Vector 8: Twinkling Celebration Star */}
        <div className="vector-sparkle-2 celebration-vector absolute bottom-[22%] right-[22%] sm:right-[26%] text-amber-500 opacity-60">
          <Star className="w-6 sm:w-8 h-6 sm:h-8 fill-amber-400" />
        </div>

        {/* Elegant Framing Watermark */}
        <div className="absolute inset-3 sm:inset-6 md:inset-8 border border-amber-500/20 pointer-events-none rounded-2xl" />
        <div className="absolute top-3 sm:top-6 md:top-8 left-3 sm:left-6 md:left-8 w-4 h-4 border-t-2 border-l-2 border-amber-600/50 rounded-tl pointer-events-none" />
        <div className="absolute top-3 sm:top-6 md:top-8 right-3 sm:right-6 md:right-8 w-4 h-4 border-t-2 border-r-2 border-amber-600/50 rounded-tr pointer-events-none" />
        <div className="absolute bottom-3 sm:bottom-6 md:bottom-8 left-3 sm:left-6 md:left-8 w-4 h-4 border-b-2 border-l-2 border-amber-600/50 rounded-bl pointer-events-none" />
        <div className="absolute bottom-3 sm:bottom-6 md:bottom-8 right-3 sm:right-6 md:right-8 w-4 h-4 border-b-2 border-r-2 border-amber-600/50 rounded-br pointer-events-none" />
      </div>

      {/* 2. Main Single Screen Content Container */}
      <div className="relative z-10 max-w-4xl w-full mx-auto text-center flex flex-col items-center justify-center py-6 sm:py-8">
        
        {/* Academic Celebration Badge with Shimmer Sweep */}
        <div 
          data-animate="badge"
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-400/50 bg-white/95 backdrop-blur-md mb-3 shadow-md text-amber-900 shimmer-sweep"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span className="text-[10px] sm:text-xs font-bold tracking-[0.25em] uppercase font-mono-tech">
            IJSPAST • Official Journal Inauguration
          </span>
        </div>

        {/* PROMINENT LOGO SHOWCASE WITH ATTRACTIVE GSAP ANIMATION */}
        <div 
          ref={logoRef}
          className="relative mb-3 flex flex-col items-center justify-center"
        >
          <div className="logo-glow-effect absolute -inset-2 bg-gradient-to-r from-amber-400/20 via-yellow-300/30 to-amber-500/20 rounded-2xl blur-lg pointer-events-none opacity-40" />

          <div className="relative flex items-center justify-center px-6 py-3 rounded-2xl bg-gradient-to-b from-[#091b38] to-[#050e1f] border-2 border-amber-400/60 shadow-2xl shadow-navy-950/25 transition-transform duration-300 hover:scale-[1.03]">
            <img 
              src="/logo.png" 
              alt="IJSPAST - International Journal of Scientific Progress in Applied Science and Technology" 
              className="h-14 sm:h-18 md:h-20 w-auto max-w-[85vw] sm:max-w-[480px] object-contain drop-shadow-[0_2px_10px_rgba(255,255,255,0.15)]"
            />
          </div>
        </div>

        {/* HIGHLY ATTRACTIVE INAUGURATION CEREMONY HEADLINE */}
        <div ref={titleRef} className="flex flex-col items-center mb-2">
          <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold tracking-[0.3em] uppercase text-amber-700 font-mono-tech mb-1">
            <span>✦</span>
            <span>Grand Academic Launch</span>
            <span>✦</span>
          </div>
          <h1 className="font-serif-academic text-4xl sm:text-6xl md:text-7xl font-bold tracking-[0.02em] uppercase text-navy-luxury leading-[1.08] drop-shadow-sm">
            IJSPAST <span className="text-gold-luxury italic font-normal">Inauguration</span> Ceremony
          </h1>
        </div>

        {/* Attractive Editorial Line with Central Diamond */}
        <div 
          data-animate="divider"
          className="flex items-center justify-center gap-3 w-56 sm:w-72 my-2 opacity-90"
        >
          <div className="h-[1.5px] flex-1 bg-gradient-to-r from-transparent via-amber-400 to-amber-600" />
          <div className="w-2 h-2 rotate-45 border-2 border-amber-600 bg-amber-200 shadow-sm" />
          <div className="h-[1.5px] flex-1 bg-gradient-to-l from-transparent via-amber-400 to-amber-600" />
        </div>

        {/* Subtitle with Premium Editorial Styling */}
        <p 
          data-animate="subtitle"
          className="text-base sm:text-xl md:text-2xl font-light text-slate-800 tracking-wide max-w-2xl mb-5 font-serif-academic italic"
        >
          "A New Chapter in Scholarly Research & Multidisciplinary Discovery"
        </p>

        {/* Ribbon Cutting (Fita Ceremony) Box with Shimmer Line */}
        <div 
          data-animate="ribbon-box"
          className="relative w-full max-w-2xl rounded-2xl bg-white/95 border border-amber-400/50 p-5 sm:p-7 shadow-xl shadow-amber-950/5 backdrop-blur-xl mb-5 overflow-hidden"
        >
          {/* Golden Satin Ribbon */}
          <div className="relative w-full flex items-center justify-center py-4 my-1 overflow-hidden">
            
            {/* Shimmer Light Sweeping across Ribbon */}
            <div className="ribbon-shimmer absolute -left-full top-0 w-1/3 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 z-20 pointer-events-none" />

            {/* Left Satin Ribbon */}
            <div className="ribbon-left w-1/2 h-12 bg-gradient-to-r from-amber-600 via-amber-400 to-amber-200 border-t border-b border-amber-100 shadow-md flex items-center justify-end pr-4 text-slate-950 font-bold font-serif-academic text-xs sm:text-sm tracking-widest origin-left">
              <span>OFFICIAL</span>
            </div>

            {/* Central Pulsing Scissors Trigger Button */}
            {!isCut ? (
              <button
                ref={scissorsBtnRef}
                onClick={handleCutRibbon}
                className="scissors-trigger absolute z-30 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-slate-900 hover:bg-amber-500 border-2 border-amber-400 text-amber-300 hover:text-slate-950 font-bold text-xs uppercase tracking-wider transition-all duration-300 active:scale-95 flex items-center gap-2 cursor-pointer select-none"
              >
                <Scissors className="w-4 h-4 text-amber-400 group-hover:text-slate-950 animate-bounce" />
                <span>Cut Ribbon (फिता काटना)</span>
              </button>
            ) : (
              <div className="absolute z-30 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-500 text-emerald-800 flex items-center gap-2 text-xs font-semibold tracking-wider shadow-md">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>IJSPAST Officially Inaugurated</span>
              </div>
            )}

            {/* Right Satin Ribbon */}
            <div className="ribbon-right w-1/2 h-12 bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600 border-t border-b border-amber-100 shadow-md flex items-center justify-start pl-4 text-slate-950 font-bold font-serif-academic text-xs sm:text-sm tracking-widest origin-right">
              <span>INAUGURATION</span>
            </div>
          </div>

          {/* Action After Ribbon Cut */}
          {showCeremonyDetails ? (
            <div className="inauguration-reveal-content mt-4 pt-3 border-t border-slate-200 flex flex-wrap items-center justify-center gap-3">
              <a
                href={JOURNAL_INFO.portalUrl || "https://srmu-journal.netlify.app/"}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all inline-flex items-center gap-1.5 shadow-md hover:scale-105"
              >
                <span>Enter IJSPAST Portal</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={handleReset}
                className="px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 text-xs uppercase tracking-wider transition-all inline-flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5 text-amber-600" />
                <span>Replay Ribbon Cutting</span>
              </button>
            </div>
          ) : (
            <p className="text-[11px] sm:text-xs text-slate-500 tracking-wider mt-2 font-medium">
              ✦ Click on the scissors button to perform the inaugural ribbon-cutting ceremony ✦
            </p>
          )}
        </div>

        {/* Date Schedule Card */}
        <div 
          data-animate="meta"
          className="flex items-center justify-center mb-5"
        >
          <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-xl bg-white/95 border border-amber-400/60 shadow-md backdrop-blur-md hover:border-amber-500 transition-colors">
            <div className="p-2 rounded-lg bg-gradient-to-br from-amber-500 to-amber-600 text-white shadow-sm">
              <Calendar className="w-4 h-4" />
            </div>
            <div className="text-left">
              <span className="block text-[9px] tracking-wider uppercase text-amber-800 font-bold font-mono-tech">Inauguration Date</span>
              <span className="font-serif-academic text-xl sm:text-2xl font-bold text-slate-950 tracking-wide">
                01 January 2026
              </span>
            </div>
          </div>
        </div>

        {/* Footer Academic Label */}
        <div 
          data-animate="footer-note"
          className="text-center"
        >
          <p className="text-[11px] sm:text-xs text-slate-600 tracking-wider font-medium flex items-center justify-center gap-2">
            <BookOpen className="w-3.5 h-3.5 text-amber-600 inline" />
            <span>IJSPAST • International Journal of Scientific Progress in Applied Science and Technology</span>
          </p>
        </div>

      </div>
    </main>
  );
}
