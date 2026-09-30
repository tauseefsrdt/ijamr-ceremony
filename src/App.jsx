import React, { useLayoutEffect, useRef, useState, useEffect } from 'react';
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
  PartyPopper,
  Trophy,
  Flame
} from 'lucide-react';
import { JOURNAL_INFO } from './data/journalData';

// Interactive Floating Golden Star & Confetti Particles Canvas
function GoldenAtmosphereCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const particles = Array.from({ length: 30 }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 3 + 1.2,
      speedX: (Math.random() - 0.45) * 0.4,
      speedY: -(Math.random() * 0.4 + 0.15),
      opacity: Math.random() * 0.5 + 0.25,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: Math.random() * 0.02 + 0.01,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.015,
      isFoil: Math.random() > 0.6
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.rotation += p.rotationSpeed;
        p.pulse += p.pulseSpeed;
        const currentOpacity = p.opacity + Math.sin(p.pulse) * 0.2;

        if (p.y < -20) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -20) p.x = width + 10;
        if (p.x > width + 20) p.x = -10;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);

        if (p.isFoil) {
          ctx.fillStyle = `rgba(217, 119, 6, ${Math.max(0.15, Math.min(0.8, currentOpacity))})`;
          ctx.fillRect(-p.size, -p.size * 0.6, p.size * 2, p.size * 1.2);
        } else {
          const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size * 2);
          grad.addColorStop(0, `rgba(254, 240, 138, ${Math.max(0.2, currentOpacity)})`);
          grad.addColorStop(1, 'rgba(217, 119, 6, 0)');
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 1.6, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-10 w-full h-full"
    />
  );
}

export default function App() {
  const containerRef = useRef(null);
  const bgImgRef = useRef(null);
  const scissorsBtnRef = useRef(null);
  const [isCut, setIsCut] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showFlash, setShowFlash] = useState(false);
  const [showCeremonyDetails, setShowCeremonyDetails] = useState(false);
  const drumIntervalRef = useRef(null);

  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set('[data-animate]', { opacity: 1, y: 0, scale: 1 });
        return;
      }

      // Initial clean state for foreground text
      gsap.set('[data-animate]', {
        opacity: 0,
        y: 26,
        willChange: 'transform, opacity'
      });

      // 1. Fluid Silk Background Entrance & Breathing Wave Motion
      if (bgImgRef.current) {
        gsap.fromTo(bgImgRef.current,
          { scale: 1.14, opacity: 0.85 },
          { scale: 1.04, opacity: 1, duration: 2.0, ease: 'expo.out' }
        );

        // Continuous slow wave breathing
        gsap.to(bgImgRef.current, {
          scale: 1.08,
          duration: 14,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        });
      }

      // 2. Cascading Foreground Sequence
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

      // 3. Scissors Button Breathing Pulse
      if (scissorsBtnRef.current) {
        gsap.to(scissorsBtnRef.current, {
          scale: 1.04,
          boxShadow: '0 10px 30px rgba(180, 83, 9, 0.6), 0 0 15px rgba(245, 158, 11, 0.9)',
          duration: 1.3,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        });
      }

    }, containerRef);

    // 4. Interactive 3D Mouse Parallax
    const handleMouseMove = (e) => {
      if (prefersReducedMotion || !bgImgRef.current) return;
      const { innerWidth, innerHeight } = window;
      const xPercent = (e.clientX / innerWidth - 0.5) * 20;
      const yPercent = (e.clientY / innerHeight - 0.5) * 20;

      gsap.to(bgImgRef.current, {
        x: xPercent,
        y: yPercent,
        duration: 2.2,
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

  // Stop drum beat immediately
  const stopDrumLoop = () => {
    if (drumIntervalRef.current) {
      clearInterval(drumIntervalRef.current);
      drumIntervalRef.current = null;
    }
  };

  const handleCutRibbon = () => {
    if (isCut || isAnimating) return;
    setIsAnimating(true);
    stopDrumLoop(); // Stop drums immediately on click

    const tl = gsap.timeline();

    // Stage 1: Scissors grow & approach ribbon center
    tl.to('.scissors-button', {
      scale: 1.18,
      y: -6,
      boxShadow: '0 0 40px rgba(251,191,36,0.95), 0 0 80px rgba(245,158,11,0.5)',
      duration: 0.4,
      ease: 'power2.out'
    })
    // Stage 2: Scissors rotate (blades closing / snip)
    .to('.scissors-icon', {
      rotate: 30,
      scale: 1.3,
      duration: 0.18,
      ease: 'power3.in'
    })
    .to('.scissors-icon', {
      rotate: -8,
      scale: 1.0,
      duration: 0.12,
      ease: 'power4.out'
    })
    // Stage 3: Flash burst at cut point
    .call(() => {
      setShowFlash(true);
      // Play snip sound
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) {
          const actx = new AudioCtx();
          const now = actx.currentTime;
          const buf = actx.createBuffer(1, Math.floor(actx.sampleRate * 0.1), actx.sampleRate);
          const d = buf.getChannelData(0);
          for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * Math.exp(-i / (actx.sampleRate * 0.022));
          const src = actx.createBufferSource(); src.buffer = buf;
          const fil = actx.createBiquadFilter(); fil.type = 'bandpass'; fil.frequency.value = 3800; fil.Q.value = 3.5;
          const g = actx.createGain(); g.gain.setValueAtTime(0.5, now); g.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
          src.connect(fil); fil.connect(g); g.connect(actx.destination); src.start(now);
        }
      } catch (_) {}
      setTimeout(() => setShowFlash(false), 220);
    })
    // Stage 4: Ribbon halves fly apart
    .to('.ribbon-piece-left', {
      xPercent: -130,
      rotation: -22,
      y: 18,
      opacity: 0,
      duration: 0.9,
      ease: 'power4.inOut'
    }, '-=0.05')
    .to('.ribbon-piece-right', {
      xPercent: 130,
      rotation: 22,
      y: 18,
      opacity: 0,
      duration: 0.9,
      ease: 'power4.inOut'
    }, '<')
    // Stage 5: Scissors button disappears
    .to('.scissors-button', {
      scale: 0,
      opacity: 0,
      duration: 0.3,
      ease: 'back.in(2)'
    }, '<+=0.2')
    // Stage 6: Mark cut & reveal celebration
    .call(() => {
      setIsCut(true);
      setIsAnimating(false);
      setShowCeremonyDetails(true);
      gsap.fromTo('.portal-reveal-box',
        { opacity: 0, y: 20, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'back.out(1.6)' }
      );
    });

    // Play subtle high-end celebration audio chime synthesized via Web Audio API (no external file needed)
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        const actx = new AudioCtx();
        const now = actx.currentTime;
        // Chime sequence: C5, E5, G5, C6 triumphant fanfare chord
        const notes = [523.25, 659.25, 783.99, 1046.50];
        notes.forEach((freq, idx) => {
          const osc = actx.createOscillator();
          const gain = actx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now + idx * 0.12);
          gain.gain.setValueAtTime(0.001, now + idx * 0.12);
          gain.gain.exponentialRampToValueAtTime(0.3, now + idx * 0.12 + 0.05);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.12 + 2.5);
          osc.connect(gain);
          gain.connect(actx.destination);
          osc.start(now + idx * 0.12);
          osc.stop(now + idx * 0.12 + 2.6);
        });
      }
    } catch (_) {}

    // 10-Second Grand Celebration Sequence (Confetti, Fireworks & Cannons)
    const duration = 10 * 1000;
    const animationEnd = Date.now() + duration;
    const luxuryColors = ['#f59e0b', '#d97706', '#fbbf24', '#fef08a', '#0284c7', '#0369a1', '#ffffff', '#e11d48'];

    // Initial Explosive Blast
    confetti({
      particleCount: 160,
      spread: 120,
      origin: { y: 0.6 },
      colors: luxuryColors,
      startVelocity: 45,
      scalar: 1.2
    });

    // Continuous 10-second fireworks & cascading side cannons
    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 20 * (timeLeft / duration);

      // Left & Right continuous cannons
      confetti({
        particleCount: Math.max(6, Math.floor(particleCount * 0.8)),
        angle: 60,
        spread: 70,
        origin: { x: 0.05, y: 0.7 },
        colors: luxuryColors,
        ticks: 200,
        gravity: 0.9,
        scalar: 1.1
      });

      confetti({
        particleCount: Math.max(6, Math.floor(particleCount * 0.8)),
        angle: 120,
        spread: 70,
        origin: { x: 0.95, y: 0.7 },
        colors: luxuryColors,
        ticks: 200,
        gravity: 0.9,
        scalar: 1.1
      });

      // Random Firework Bursts across screen
      if (Math.random() < 0.45) {
        confetti({
          particleCount: 25,
          angle: 90,
          spread: 360,
          startVelocity: 30,
          origin: {
            x: 0.2 + Math.random() * 0.6,
            y: 0.2 + Math.random() * 0.4
          },
          colors: luxuryColors,
          shapes: ['circle', 'square'],
          scalar: 0.95
        });
      }
    }, 180);
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
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#0a1526] text-slate-900 select-none"
      style={{ minHeight: '100svh' }}
    >
      {/* 1. ULTRA-LUXURY FLUID SILK & GOLD BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
        <img
          ref={bgImgRef}
          src="/luxury-silk-bg.jpg"
          alt="Luxury Fluid Silk & Gold Inauguration Background"
          className="w-full h-full object-cover object-center transform scale-105 filter brightness-[1.02] contrast-[1.03]"
        />

        {/* Soft Radial Ambient Center Illumination */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 50% 50%, rgba(255, 255, 255, 0.90) 0%, rgba(255, 255, 255, 0.70) 45%, rgba(10, 21, 38, 0.4) 100%)'
          }}
        />
      </div>

      {/* 2. REAL-TIME FLOATING GOLD DUST PARTICLES */}
      <GoldenAtmosphereCanvas />

      {/* 3. FOREGROUND EDITORIAL CONTENT */}
      <div className="relative z-20 max-w-4xl w-full mx-auto text-center flex flex-col items-center justify-center px-4 sm:px-6 py-5">

        {/* Official University & Journal Logo */}
        <div
          data-animate="logo"
          className="mb-3 flex flex-col items-center justify-center"
        >
          <div className="px-6 py-2.5 rounded-2xl bg-[#06152d] border-2 border-amber-400 shadow-2xl shadow-slate-950/40">
            <img
              src="/logo.png"
              alt="Shri Ramswaroop Memorial University"
              className="h-12 sm:h-16 md:h-18 w-auto max-w-[85vw] sm:max-w-[450px] object-contain drop-shadow-[0_2px_10px_rgba(255,255,255,0.25)]"
            />
          </div>
        </div>

        {/* INAUGURATION CEREMONY Tag with Diamond Lines */}
        <div
          data-animate="badge"
          className="flex items-center justify-center gap-3 w-full max-w-md my-1"
        >
          <div className="h-[2px] flex-1 bg-gradient-to-r from-transparent to-amber-800" />
          <span className="text-xs sm:text-sm font-bold tracking-[0.28em] uppercase text-amber-950 font-mono-tech flex items-center gap-2 drop-shadow-sm">
            <span className="text-amber-700">◇</span>
            <span>INAUGURATION CEREMONY</span>
            <span className="text-amber-700">◇</span>
          </span>
          <div className="h-[2px] flex-1 bg-gradient-to-l from-transparent to-amber-800" />
        </div>

        {/* High-Contrast Bold Headline */}
        <div data-animate="title" className="my-1">
          <h1 className="font-serif-academic text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#071936] leading-[1.08] drop-shadow-sm">
            A New Chapter in
          </h1>
          <h2 className="font-serif-academic text-4xl sm:text-6xl md:text-7xl font-bold italic tracking-tight text-[#a16207] leading-[1.08] mt-1 drop-shadow-sm">
            Scholarly Research
          </h2>
        </div>

        {/* Centerpiece Accent Divider */}
        <div className="flex items-center justify-center gap-2 my-1 opacity-90">
          <div className="h-[2px] w-14 bg-amber-800" />
          <div className="w-2 h-2 rotate-45 border-2 border-amber-800 bg-amber-400" />
          <div className="h-[2px] w-14 bg-amber-800" />
        </div>

        {/* Description Text */}
        <p
          data-animate="subtitle"
          className="text-base sm:text-lg md:text-xl font-semibold text-slate-800 tracking-wide max-w-2xl mb-4 font-sans leading-relaxed drop-shadow-sm"
        >
          IJSPAST is set to begin its journey, creating a global platform for innovative research and meaningful academic dialogue.
        </p>

        {/* 4. Interactive Ribbon Cutting Ceremony Stage */}
        <div
          data-animate="ribbon-box"
          className="relative w-full max-w-2xl bg-gradient-to-b from-white/98 to-amber-50/90 border-2 border-amber-400/70 rounded-3xl p-5 sm:p-7 mb-4 overflow-hidden shadow-[0_8px_40px_rgba(180,83,9,0.18),0_2px_8px_rgba(0,0,0,0.08)] backdrop-blur-md"
        >
          {/* Subtle golden corner accents */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-amber-400 rounded-tl-3xl" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-amber-400 rounded-tr-3xl" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-amber-400 rounded-bl-3xl" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-amber-400 rounded-br-3xl" />

          {/* Label above ribbon */}
          <p className="text-center text-[10px] sm:text-xs font-bold tracking-[0.25em] uppercase text-amber-800/70 mb-2">✦ Official Ribbon Cutting Ceremony ✦</p>

          {/* Golden Satin Ribbon + Scissors Stage */}
          <div className="relative w-full flex items-center justify-center py-2 my-1 overflow-visible" style={{ minHeight: '80px' }}>

            {/* Left Satin Ribbon — thick luxurious gold */}
            <div className="ribbon-piece-left absolute left-0 w-[calc(50%-40px)] h-16 origin-right" style={{
              background: 'linear-gradient(180deg, #fff6c0 0%, #ffd700 12%, #c8900a 38%, #f5c518 55%, #b8860b 72%, #ffd700 88%, #c8900a 100%)',
              boxShadow: 'inset 0 3px 6px rgba(255,255,255,0.55), inset 0 -3px 6px rgba(0,0,0,0.35), 0 6px 24px rgba(160,100,0,0.28)',
              borderTop: '2px solid rgba(255,230,100,0.7)',
              borderBottom: '2px solid rgba(100,60,0,0.35)'
            }}>
              <div className="absolute inset-0 flex items-center justify-end pr-4">
                <span className="text-[10px] sm:text-xs font-black tracking-[0.22em] uppercase text-amber-950/80 drop-shadow">OFFICIAL</span>
              </div>
              {/* Silk sheen line */}
              <div className="absolute inset-y-0 left-1/3 w-[2px] bg-gradient-to-b from-transparent via-yellow-100/60 to-transparent" />
            </div>

            {/* Right Satin Ribbon — thick luxurious gold */}
            <div className="ribbon-piece-right absolute right-0 w-[calc(50%-40px)] h-16 origin-left" style={{
              background: 'linear-gradient(180deg, #fff6c0 0%, #ffd700 12%, #c8900a 38%, #f5c518 55%, #b8860b 72%, #ffd700 88%, #c8900a 100%)',
              boxShadow: 'inset 0 3px 6px rgba(255,255,255,0.55), inset 0 -3px 6px rgba(0,0,0,0.35), 0 6px 24px rgba(160,100,0,0.28)',
              borderTop: '2px solid rgba(255,230,100,0.7)',
              borderBottom: '2px solid rgba(100,60,0,0.35)'
            }}>
              <div className="absolute inset-0 flex items-center justify-start pl-4">
                <span className="text-[10px] sm:text-xs font-black tracking-[0.22em] uppercase text-amber-950/80 drop-shadow">INAUGURATION</span>
              </div>
              {/* Silk sheen line */}
              <div className="absolute inset-y-0 right-1/3 w-[2px] bg-gradient-to-b from-transparent via-yellow-100/60 to-transparent" />
            </div>

            {/* Center Bow / Knot decoration (only before cut) */}
            {!isCut && (
              <div className="absolute z-20 flex flex-col items-center justify-center" style={{ left: 'calc(50% - 36px)', width: '72px' }}>
                {/* Bow loops */}
                <div className="relative w-16 h-10 flex items-center justify-center">
                  <div className="absolute left-0 w-7 h-7 rounded-full border-4 border-amber-500" style={{ background: 'radial-gradient(circle at 30% 30%, #ffe97a, #c8900a)', boxShadow: '0 2px 8px rgba(180,100,0,0.4)' }} />
                  <div className="absolute right-0 w-7 h-7 rounded-full border-4 border-amber-500" style={{ background: 'radial-gradient(circle at 70% 30%, #ffe97a, #c8900a)', boxShadow: '0 2px 8px rgba(180,100,0,0.4)' }} />
                  <div className="absolute w-5 h-5 rounded-full z-10 border-2 border-amber-300" style={{ background: 'radial-gradient(circle at 35% 35%, #fff5a0, #b8860b)', boxShadow: '0 0 8px rgba(255,200,0,0.7)' }} />
                </div>
              </div>
            )}

            {/* Cut flash burst overlay */}
            {showFlash && (
              <div className="absolute inset-0 z-40 flex items-center justify-center pointer-events-none">
                <div className="w-24 h-24 rounded-full animate-ping" style={{ background: 'radial-gradient(circle, rgba(255,240,100,0.95) 0%, rgba(251,191,36,0.6) 50%, transparent 80%)' }} />
                <div className="absolute text-3xl animate-ping" style={{ animationDuration: '0.2s' }}>✂️</div>
              </div>
            )}

            {/* Central Scissors Trigger Button */}
            {!isCut && (
              <button
                ref={scissorsBtnRef}
                onClick={handleCutRibbon}
                disabled={isAnimating}
                className={`scissors-button absolute z-30 w-20 h-20 sm:w-24 sm:h-24 rounded-full flex flex-col items-center justify-center gap-1 select-none transition-all duration-200 ${
                  isAnimating ? 'cursor-wait' : 'cursor-pointer hover:scale-105'
                }`}
                style={{
                  background: 'linear-gradient(145deg, #1e293b, #0f172a, #1e3a5f)',
                  border: '3px solid #fbbf24',
                  boxShadow: '0 0 0 4px rgba(251,191,36,0.15), 0 0 30px rgba(251,191,36,0.4), 0 8px 32px rgba(0,0,0,0.5)'
                }}
              >
                <div className="scissors-icon flex items-center justify-center">
                  <Scissors className="w-7 h-7 sm:w-8 sm:h-8 text-amber-400" style={{ filter: 'drop-shadow(0 0 6px rgba(251,191,36,0.8))' }} />
                </div>
                <span className="text-[8px] sm:text-[9px] font-black uppercase tracking-wider text-amber-300 leading-tight text-center px-1">
                  {isAnimating ? 'Cutting...' : 'Cut to\nInaugurate'}
                </span>
              </button>
            )}

            {/* Inaugurated badge (after cut) */}
            {isCut && (
              <div className="absolute z-30 px-5 sm:px-7 py-2.5 rounded-full flex items-center gap-2.5 text-xs sm:text-sm font-black tracking-widest shadow-2xl"
                style={{ background: 'linear-gradient(135deg, #f59e0b, #fde68a, #d97706)', border: '2px solid #fef3c7', color: '#1c1400' }}>
                <PartyPopper className="w-5 h-5 animate-spin" style={{ animationDuration: '3s' }} />
                <span>OFFICIALLY INAUGURATED</span>
                <Sparkles className="w-5 h-5 animate-bounce" />
              </div>
            )}

          </div>

          {/* Action After Ribbon Cut */}
          {showCeremonyDetails ? (
            <div className="portal-reveal-box mt-3 pt-3 border-t border-slate-200 flex flex-col items-center justify-center gap-3">
              {/* Celebration Fanfare Badge with Animated Celebration Icons */}
              <div className="flex items-center gap-2.5 text-xs sm:text-sm font-extrabold text-amber-950 bg-gradient-to-r from-amber-100 via-amber-200 to-amber-100 px-5 py-2 rounded-full border border-amber-400 shadow-md animate-bounce">
                <PartyPopper className="w-4 h-4 sm:w-5 sm:h-5 text-amber-700" />
                <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600" />
                <span>Grand Inauguration Complete • Research Excellence Begins!</span>
                <Flame className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600" />
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-amber-700" />
              </div>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <a
                  href={JOURNAL_INFO.portalUrl || "https://srmu-journal.netlify.app/"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-7 py-3 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-xs sm:text-sm uppercase tracking-wider transition-all inline-flex items-center gap-2.5 shadow-xl shadow-amber-500/30 hover:scale-105"
                >
                  <PartyPopper className="w-4 h-4 sm:w-5 sm:h-5 text-slate-950" />
                  <span>Enter Journal Portal</span>
                  <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>

                <button
                  onClick={handleReset}
                  className="px-5 py-3 rounded-full bg-white hover:bg-slate-50 border-2 border-slate-300 text-slate-700 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all inline-flex items-center gap-2 cursor-pointer shadow-sm hover:border-amber-400"
                >
                  <RotateCcw className="w-4 h-4 text-amber-600" />
                  <span>Replay Ceremony</span>
                </button>
              </div>
            </div>
          ) : (
            <p className="text-xs text-slate-700 font-semibold tracking-wider mt-1.5 flex items-center justify-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Click on the scissors button to perform the official ribbon-cutting ceremony</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            </p>
          )}
        </div>

        {/* 5. Date Pill */}
        <div
          data-animate="date-pill"
          className="inline-flex items-center gap-4 px-8 py-2.5 rounded-full bg-white border-2 border-amber-500 shadow-xl mb-3.5"
        >
          <div className="p-2 rounded-lg bg-amber-500/20 text-amber-800">
            <Calendar className="w-5 h-5" />
          </div>
          <div className="text-left pr-2">
            <span className="font-serif-academic text-2xl sm:text-3xl font-bold text-[#071936] tracking-widest block">
              01 • 01 • 2026
            </span>
            <span className="text-xs font-bold text-slate-700 tracking-wide flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-700 inline" />
              <span>Time will be announced</span>
            </span>
          </div>
        </div>

        {/* Footer Academic Label */}
        <div
          data-animate="footer"
          className="text-center"
        >
          <p className="text-xs sm:text-sm text-slate-900 font-bold tracking-wider flex items-center justify-center gap-2 drop-shadow-sm bg-white/80 px-4 py-1 rounded-full border border-slate-200">
            <BookOpen className="w-4 h-4 text-amber-700 inline" />
            <span>International Journal of Scientific Progress in Applied Science and Technology (IJSPAST)</span>
          </p>
        </div>

      </div>
    </main>
  );
}
