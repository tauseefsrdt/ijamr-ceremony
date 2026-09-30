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

export default function App() {
  const compRef = useRef(null);
  const [isCut, setIsCut] = useState(false);
  const [showCeremonyDetails, setShowCeremonyDetails] = useState(false);

  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set('[data-animate]', { opacity: 1, y: 0 });
        gsap.set('.celebration-vector', { opacity: 0.7 });
        return;
      }

      // Initial clean state for main content
      gsap.set('[data-animate]', {
        opacity: 0,
        y: 20,
      });

      // 1. UNIQUE ANIMATION FOR CELEBRATION VECTOR 1: Party Popper (Burst & Swing)
      gsap.to('.vector-party-popper', {
        rotation: 20,
        y: -16,
        scale: 1.1,
        duration: 2.2,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut'
      });

      // 2. UNIQUE ANIMATION FOR CELEBRATION VECTOR 2: Golden Crown (Majestic Float & Tilt)
      gsap.to('.vector-crown', {
        y: -22,
        rotation: -12,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });

      // 3. UNIQUE ANIMATION FOR CELEBRATION VECTOR 3: Celebration Gift Box (Excited Jump & Jiggle)
      gsap.to('.vector-gift', {
        y: -14,
        scale: 1.12,
        rotation: 8,
        duration: 2.6,
        repeat: -1,
        yoyo: true,
        ease: 'elastic.out(1, 0.4)'
      });

      // 4. UNIQUE ANIMATION FOR CELEBRATION VECTOR 4: Inauguration Diya / Flame (Flicker & Glow pulse)
      gsap.to('.vector-flame', {
        scaleY: 1.25,
        scaleX: 0.92,
        opacity: 0.8,
        duration: 1.4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });

      // 5. UNIQUE ANIMATION FOR CELEBRATION VECTOR 5: Celebration Bell (Ringing Pendulum Swing)
      gsap.to('.vector-bell', {
        rotation: 25,
        transformOrigin: 'top center',
        duration: 1.6,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });

      // 6. UNIQUE ANIMATION FOR CELEBRATION VECTOR 6: Golden Award Medal (3D Flip & Float)
      gsap.to('.vector-award', {
        rotationY: 45,
        y: -18,
        duration: 4.2,
        repeat: -1,
        yoyo: true,
        ease: 'power2.inOut'
      });

      // 7. UNIQUE ANIMATION FOR CELEBRATION VECTOR 7 & 8: Twinkling Starlight & Sparkles
      gsap.to('.vector-sparkle-1', {
        scale: 1.4,
        rotation: 180,
        opacity: 0.9,
        duration: 2.8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });

      gsap.to('.vector-sparkle-2', {
        scale: 0.6,
        rotation: -180,
        opacity: 0.3,
        duration: 2.4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 0.4
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

      // Single entrance sequence
      const tl = gsap.timeline({
        defaults: {
          ease: 'power3.out',
          duration: 0.85,
        }
      });

      tl.to('[data-animate="badge"]', { opacity: 1, y: 0, delay: 0.1 })
        .to('[data-animate="logo"]', { opacity: 1, y: 0 }, '-=0.55')
        .to('[data-animate="title"]', { opacity: 1, y: 0, duration: 0.95 }, '-=0.55')
        .to('[data-animate="subtitle"]', { opacity: 1, y: 0 }, '-=0.6')
        .to('[data-animate="ribbon-box"]', { opacity: 1, y: 0, duration: 0.9 }, '-=0.5')
        .to('[data-animate="meta"]', { opacity: 1, y: 0 }, '-=0.5')
        .to('[data-animate="footer-note"]', { opacity: 1, y: 0 }, '-=0.4');

    }, compRef);

    return () => ctx.revert();
  }, []);

  const handleCutRibbon = () => {
    if (isCut) return;
    setIsCut(true);

    // Satin ribbon cut opening animation
    gsap.to('.ribbon-left', {
      xPercent: -125,
      rotation: -18,
      opacity: 0.2,
      duration: 1.2,
      ease: 'power3.inOut'
    });

    gsap.to('.ribbon-right', {
      xPercent: 125,
      rotation: 18,
      opacity: 0.2,
      duration: 1.2,
      ease: 'power3.inOut'
    });

    gsap.to('.scissors-trigger', {
      scale: 0,
      opacity: 0,
      duration: 0.4,
      ease: 'power2.in',
      onComplete: () => setShowCeremonyDetails(true)
    });

    // Celebratory confetti bursts
    const end = Date.now() + 4 * 1000;
    const colors = ['#d97706', '#f59e0b', '#0284c7', '#ec4899', '#8b5cf6', '#10b981'];

    (function frame() {
      confetti({
        particleCount: 7,
        angle: 60,
        spread: 80,
        origin: { x: 0, y: 0.65 },
        colors: colors
      });
      confetti({
        particleCount: 7,
        angle: 120,
        spread: 80,
        origin: { x: 1, y: 0.65 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();

    confetti({
      particleCount: 150,
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
      <div className="relative z-10 max-w-4xl w-full mx-auto text-center flex flex-col items-center justify-center py-6 sm:py-10">
        
        {/* Academic Celebration Badge */}
        <div 
          data-animate="badge"
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-400/50 bg-white/90 backdrop-blur-md mb-4 shadow-sm text-amber-900"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span className="text-[10px] sm:text-xs font-semibold tracking-[0.22em] uppercase font-mono-tech">
            Official Journal Inauguration
          </span>
        </div>

        {/* Existing IJSPAST Logo */}
        <div 
          data-animate="logo"
          className="mb-3 flex flex-col items-center justify-center"
        >
          <div className="p-2.5 rounded-2xl bg-white/95 border border-amber-300/60 shadow-xl shadow-amber-900/5 backdrop-blur-md">
            <img 
              src="/logo.png" 
              alt="IJSPAST Logo" 
              className="h-12 sm:h-16 md:h-18 w-auto object-contain drop-shadow"
            />
          </div>
        </div>

        {/* Inauguration Ceremony Heading */}
        <h1 
          data-animate="title"
          className="font-serif-academic text-3xl sm:text-5xl md:text-6xl font-semibold tracking-[0.04em] uppercase text-navy-gradient leading-tight mb-2"
        >
          Inauguration Ceremony
        </h1>

        {/* Subtitle */}
        <p 
          data-animate="subtitle"
          className="text-sm sm:text-lg md:text-xl font-medium text-slate-700 tracking-wide max-w-2xl mb-5 font-sans"
        >
          A New Chapter in Scholarly Research
        </p>

        {/* Ribbon Cutting (Fita Ceremony) Box in Light Theme */}
        <div 
          data-animate="ribbon-box"
          className="relative w-full max-w-2xl rounded-2xl bg-white/95 border border-amber-400/50 p-5 sm:p-7 shadow-xl shadow-amber-950/5 backdrop-blur-xl mb-6 overflow-hidden"
        >
          {/* Golden Satin Ribbon */}
          <div className="relative w-full flex items-center justify-center py-4 my-1">
            {/* Left Satin Ribbon */}
            <div className="ribbon-left w-1/2 h-12 bg-gradient-to-r from-amber-600 via-amber-400 to-amber-200 border-t border-b border-amber-100 shadow-md flex items-center justify-end pr-4 text-slate-950 font-bold font-serif-academic text-xs sm:text-sm tracking-widest origin-left">
              <span>OFFICIAL</span>
            </div>

            {/* Central Scissors Trigger Button */}
            {!isCut ? (
              <button
                onClick={handleCutRibbon}
                className="scissors-trigger absolute z-30 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-slate-900 hover:bg-amber-500 border-2 border-amber-400 text-amber-300 hover:text-slate-950 font-bold text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(217,119,6,0.35)] transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer select-none"
              >
                <Scissors className="w-4 h-4 text-amber-400 group-hover:text-slate-950" />
                <span>Cut Ribbon (फिता काटना)</span>
              </button>
            ) : (
              <div className="absolute z-30 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-500 text-emerald-800 flex items-center gap-2 text-xs font-semibold tracking-wider shadow-md">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Officially Inaugurated</span>
              </div>
            )}

            {/* Right Satin Ribbon */}
            <div className="ribbon-right w-1/2 h-12 bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600 border-t border-b border-amber-100 shadow-md flex items-center justify-start pl-4 text-slate-950 font-bold font-serif-academic text-xs sm:text-sm tracking-widest origin-right">
              <span>INAUGURATION</span>
            </div>
          </div>

          {/* Action After Ribbon Cut */}
          {showCeremonyDetails ? (
            <div className="mt-4 pt-3 border-t border-slate-200 flex flex-wrap items-center justify-center gap-3">
              <a
                href="https://srmu.ac.in"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all inline-flex items-center gap-1.5 shadow-md hover:scale-105"
              >
                <span>Enter Journal Portal</span>
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

        {/* Date Schedule Card Only (Clean Centered Display) */}
        <div 
          data-animate="meta"
          className="flex items-center justify-center mb-6"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-white/90 border border-amber-300/60 shadow-sm backdrop-blur-md">
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-700">
              <Calendar className="w-5 h-5" />
            </div>
            <div className="text-left">
              <span className="block text-[9px] tracking-wider uppercase text-slate-500 font-semibold font-mono-tech">Inauguration Date</span>
              <span className="font-serif-academic text-xl sm:text-2xl font-bold text-slate-900 tracking-wide">
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
            <span>Peer-Reviewed Open Access International Research Journal</span>
          </p>
        </div>

      </div>
    </main>
  );
}
