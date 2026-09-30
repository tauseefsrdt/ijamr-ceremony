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
  const [curtainOpen, setCurtainOpen] = useState(false);
  const curtainLeftRef = useRef(null);
  const curtainRightRef = useRef(null);
  const drumIntervalRef = useRef(null);

  // Animated BG element refs
  const orb1Ref = useRef(null);
  const orb2Ref = useRef(null);
  const orb3Ref = useRef(null);
  const rayRef = useRef(null);
  const haloRef = useRef(null);
  const shimmerRef = useRef(null);
  const vectorArcRef = useRef(null);
  const vectorSparkRef = useRef(null);
  const confettiBurstRef = useRef(null);
  const festiveLightsRef = useRef(null);

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

      // 4. ── BG GSAP ANIMATIONS ──

      // Orb 1: large golden drift — top-left → bottom-right
      if (orb1Ref.current) {
        gsap.fromTo(orb1Ref.current,
          { x: -60, y: -40, opacity: 0, scale: 0.7 },
          { x: 0, y: 0, opacity: 1, scale: 1, duration: 2.2, ease: 'power2.out' }
        );
        gsap.to(orb1Ref.current, {
          x: 80, y: 60, scale: 1.18,
          duration: 18,
          repeat: -1, yoyo: true, ease: 'sine.inOut'
        });
      }

      // Orb 2: rose/coral accent — top-right drift
      if (orb2Ref.current) {
        gsap.fromTo(orb2Ref.current,
          { x: 50, y: -30, opacity: 0 },
          { x: 0, y: 0, opacity: 1, duration: 2.6, ease: 'power2.out', delay: 0.4 }
        );
        gsap.to(orb2Ref.current, {
          x: -70, y: 80, scale: 1.22,
          duration: 22,
          repeat: -1, yoyo: true, ease: 'sine.inOut',
          delay: 2
        });
      }

      // Orb 3: blue/purple deep accent — bottom drift
      if (orb3Ref.current) {
        gsap.fromTo(orb3Ref.current,
          { x: 0, y: 60, opacity: 0 },
          { x: 0, y: 0, opacity: 1, duration: 3.0, ease: 'power2.out', delay: 0.8 }
        );
        gsap.to(orb3Ref.current, {
          x: 55, y: -50, scale: 1.15,
          duration: 26,
          repeat: -1, yoyo: true, ease: 'sine.inOut',
          delay: 4
        });
      }

      // Rotating light ray — slow clockwise spin
      if (rayRef.current) {
        gsap.fromTo(rayRef.current,
          { rotation: -20, opacity: 0 },
          { rotation: 0, opacity: 1, duration: 2.5, ease: 'power2.out' }
        );
        gsap.to(rayRef.current, {
          rotation: 360,
          duration: 60,
          repeat: -1,
          ease: 'none',
          transformOrigin: '50% 50%'
        });
      }

      // Radial halo pulse
      if (haloRef.current) {
        gsap.fromTo(haloRef.current,
          { scale: 0.85, opacity: 0 },
          { scale: 1, opacity: 1, duration: 2.0, ease: 'power2.out', delay: 0.6 }
        );
        gsap.to(haloRef.current, {
          scale: 1.12,
          opacity: 0.55,
          duration: 8,
          repeat: -1, yoyo: true, ease: 'sine.inOut'
        });
      }

      // Shimmer horizontal sweep
      if (shimmerRef.current) {
        gsap.fromTo(shimmerRef.current,
          { xPercent: -120, opacity: 0 },
          { xPercent: -120, opacity: 1, duration: 0.5, delay: 1.0 }
        );
        gsap.to(shimmerRef.current, {
          xPercent: 120,
          duration: 5,
          repeat: -1,
          ease: 'power1.inOut',
          delay: 1.5,
          repeatDelay: 6
        });
      }

      // Premium vector art motion
      if (vectorArcRef.current) {
        gsap.fromTo(vectorArcRef.current,
          { opacity: 0.28, scale: 0.96 },
          { opacity: 1, scale: 1, duration: 2.2, ease: 'power2.out' }
        );
        gsap.to(vectorArcRef.current, {
          rotation: 6,
          y: -10,
          duration: 12,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        });
      }

      if (vectorSparkRef.current) {
        gsap.to(vectorSparkRef.current, {
          opacity: 0.9,
          scale: 1.08,
          duration: 2.8,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        });
      }

      // More festive background motion
      if (confettiBurstRef.current) {
        gsap.fromTo(confettiBurstRef.current,
          { opacity: 0.12, scale: 0.88 },
          { opacity: 1, scale: 1.1, duration: 2.4, ease: 'power2.out' }
        );
        gsap.to(confettiBurstRef.current, {
          rotation: 10,
          y: -12,
          duration: 9,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        });
      }

      if (festiveLightsRef.current) {
        gsap.fromTo(festiveLightsRef.current,
          { opacity: 0.4 },
          { opacity: 1, duration: 2.2, ease: 'power2.out' }
        );
        gsap.to(festiveLightsRef.current, {
          scale: 1.18,
          opacity: 0.8,
          duration: 7,
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

      // Parallax depth layers — orbs move at different speeds
      if (orb1Ref.current) gsap.to(orb1Ref.current, { x: xPercent * 1.8, y: yPercent * 1.8, duration: 3.0, ease: 'power1.out', overwrite: 'auto' });
      if (orb2Ref.current) gsap.to(orb2Ref.current, { x: xPercent * -1.4, y: yPercent * -1.4, duration: 3.5, ease: 'power1.out', overwrite: 'auto' });
      if (orb3Ref.current) gsap.to(orb3Ref.current, { x: xPercent * 0.9, y: yPercent * -0.9, duration: 4.0, ease: 'power1.out', overwrite: 'auto' });
      if (rayRef.current) gsap.to(rayRef.current, { x: xPercent * 0.4, y: yPercent * 0.4, duration: 5.0, ease: 'power1.out', overwrite: 'auto' });
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

    // ══ STAGE 0: Open Red Velvet Curtain first ══
    const curtainTl = gsap.timeline({
      onComplete: () => startRibbonCut()
    });

    // Immediately part apart dramatically
    curtainTl
      .to(curtainLeftRef.current, {
        xPercent: -100,
        duration: 1.4,
        ease: 'power3.inOut'
      }, '+=0.05')
      .to(curtainRightRef.current, {
        xPercent: 100,
        duration: 1.4,
        ease: 'power3.inOut'
      }, '<')
      .call(() => setCurtainOpen(true));
  };

  const startRibbonCut = () => {
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
        } catch (_) { }
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

        // 10-second Crowd Clapping / Cheering Effect
        const clapBuf = actx.createBuffer(1, Math.floor(actx.sampleRate * 10), actx.sampleRate);
        const clapData = clapBuf.getChannelData(0);
        for (let i = 0; i < clapData.length; i++) {
          clapData[i] = (Math.random() * 2 - 1); // White noise
        }
        const clapSrc = actx.createBufferSource();
        clapSrc.buffer = clapBuf;

        const clapFil = actx.createBiquadFilter();
        clapFil.type = 'bandpass';
        clapFil.frequency.value = 1200;
        clapFil.Q.value = 0.8;

        const clapGain = actx.createGain();
        clapGain.gain.setValueAtTime(0, now);

        // Base cheer volume swell
        clapGain.gain.linearRampToValueAtTime(0.1, now + 1);
        clapGain.gain.linearRampToValueAtTime(0.15, now + 2);
        clapGain.gain.linearRampToValueAtTime(0.15, now + 8);
        clapGain.gain.linearRampToValueAtTime(0.001, now + 10);

        // Add 250 random individual "claps" (bursts of noise)
        for (let j = 0; j < 250; j++) {
          const time = now + Math.random() * 9.5;
          clapGain.gain.setTargetAtTime(0.4, time, 0.005);
          clapGain.gain.setTargetAtTime(0.15, time + 0.02, 0.03);
        }

        clapSrc.connect(clapFil);
        clapFil.connect(clapGain);
        clapGain.connect(actx.destination);
        clapSrc.start(now);
        clapSrc.stop(now + 10);
      }
    } catch (_) { }

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
    setIsAnimating(false);
    setShowFlash(false);
    setShowCeremonyDetails(false);
    setCurtainOpen(false);
    // Reset curtain panels
    gsap.set(curtainLeftRef.current, { xPercent: 0, x: 0 });
    gsap.set(curtainRightRef.current, { xPercent: 0, x: 0 });
    // Reset ribbon and scissors
    gsap.set(['.ribbon-piece-left', '.ribbon-piece-right'], { xPercent: 0, rotation: 0, y: 0, opacity: 1 });
    gsap.set('.scissors-button', { scale: 1, opacity: 1, y: 0 });
    gsap.set('.scissors-icon', { rotate: 0, scale: 1 });
  };

  return (
    <main
      ref={containerRef}
      className="premium-shell relative h-screen h-[100vh] h-[100svh] w-full flex flex-col items-center justify-between overflow-hidden bg-[#070d16] text-slate-900 select-none"
      style={{ height: '100vh', maxHeight: '100vh' }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(251,191,36,0.18),_transparent_32%),radial-gradient(circle_at_bottom,_rgba(59,130,246,0.12),_transparent_38%)]" />
      {/* ══ PREMIUM RED VELVET CURTAIN (PARDA) ══ */}
      {!curtainOpen && (
        <div className="absolute inset-0 z-50 pointer-events-none" aria-hidden="true">

          {/* ── ORNATE PELMET / VALANCE BAR ── */}
          <div className="absolute top-0 left-0 right-0 z-20" style={{
            height: '72px',
            background: 'linear-gradient(180deg, #3d0008 0%, #7a000f 30%, #a0001a 65%, #c20020 100%)',
            borderBottom: '5px solid #f59e0b',
            boxShadow: '0 6px 30px rgba(0,0,0,0.7), 0 2px 0 rgba(255,220,80,0.4) inset, 0 -2px 0 rgba(0,0,0,0.5) inset'
          }}>
            {/* Pelmet inner gold band */}
            <div className="absolute bottom-5 left-0 right-0 h-[2px]" style={{ background: 'linear-gradient(90deg, transparent, rgba(251,191,36,0.6), rgba(255,240,120,0.9), rgba(251,191,36,0.6), transparent)' }} />
            {/* Hanging tassels */}
            <div className="absolute bottom-0 left-0 right-0 flex justify-around px-8 translate-y-full">
              {Array.from({ length: 14 }).map((_, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="w-[3px] bg-amber-400" style={{ height: `${20 + (i % 3) * 8}px`, opacity: 0.85 }} />
                  <div className="w-3 h-3 rounded-full" style={{
                    background: 'radial-gradient(circle at 35% 30%, #fef08a, #b45309)',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.6)'
                  }} />
                </div>
              ))}
            </div>
          </div>

          {/* ── LEFT CURTAIN PANEL ── */}
          <div
            ref={curtainLeftRef}
            className="absolute left-0 bottom-0 w-1/2"
            style={{ top: '0px' }}
          >
            {/* Main velvet fabric */}
            <div className="absolute inset-0" style={{
              background: [
                'linear-gradient(90deg,',
                '  rgba(0,0,0,0.55) 0%,',
                '  rgba(180,0,20,0.0) 6%,',
                '  rgba(255,255,255,0.07) 12%,',
                '  rgba(0,0,0,0.0) 18%,',
                '  rgba(0,0,0,0.4) 26%,',
                '  rgba(255,255,255,0.05) 34%,',
                '  rgba(0,0,0,0.0) 40%,',
                '  rgba(0,0,0,0.35) 50%,',
                '  rgba(255,255,255,0.04) 60%,',
                '  rgba(0,0,0,0.0) 68%,',
                '  rgba(0,0,0,0.3) 80%,',
                '  rgba(0,0,0,0.45) 100%',
                ')'
              ].join(''),
              backgroundColor: '#8b0016'
            }} />
            {/* Velvet sheen overlay */}
            <div className="absolute inset-0" style={{
              background: 'linear-gradient(170deg, rgba(200,0,30,0.6) 0%, rgba(100,0,15,0.8) 40%, rgba(160,0,25,0.5) 70%, rgba(80,0,12,0.9) 100%)'
            }} />
            {/* Right edge gold border + inner shadow */}
            <div className="absolute top-0 right-0 bottom-0 w-[5px]" style={{
              background: 'linear-gradient(180deg, #fef08a, #f59e0b, #d97706, #f59e0b, #fef08a)',
              boxShadow: '0 0 12px rgba(251,191,36,0.7)'
            }} />
            {/* Hanging gold fringe */}
            <div className="absolute top-[72px] right-0 bottom-0 w-4 flex flex-col" style={{ gap: 0 }}>
              {Array.from({ length: 60 }).map((_, i) => (
                <div key={i} style={{
                  height: '16px',
                  width: `${6 + Math.sin(i * 0.9) * 4}px`,
                  background: i % 2 === 0 ? '#f59e0b' : '#d97706',
                  opacity: 0.75,
                  borderRadius: '0 0 3px 3px'
                }} />
              ))}
            </div>
            {/* Deep inner shadow on right edge */}
            <div className="absolute top-0 right-0 bottom-0 w-16" style={{
              background: 'linear-gradient(90deg, transparent, rgba(0,0,0,0.5))'
            }} />
          </div>

          {/* ── RIGHT CURTAIN PANEL ── */}
          <div
            ref={curtainRightRef}
            className="absolute right-0 bottom-0 w-1/2"
            style={{ top: '0px' }}
          >
            {/* Main velvet fabric */}
            <div className="absolute inset-0" style={{
              background: [
                'linear-gradient(90deg,',
                '  rgba(0,0,0,0.45) 0%,',
                '  rgba(0,0,0,0.0) 18%,',
                '  rgba(255,255,255,0.05) 25%,',
                '  rgba(0,0,0,0.0) 33%,',
                '  rgba(0,0,0,0.35) 44%,',
                '  rgba(255,255,255,0.04) 54%,',
                '  rgba(0,0,0,0.0) 62%,',
                '  rgba(0,0,0,0.4) 75%,',
                '  rgba(255,255,255,0.06) 85%,',
                '  rgba(0,0,0,0.55) 100%',
                ')'
              ].join(''),
              backgroundColor: '#8b0016'
            }} />
            {/* Velvet sheen overlay */}
            <div className="absolute inset-0" style={{
              background: 'linear-gradient(170deg, rgba(80,0,12,0.9) 0%, rgba(160,0,25,0.5) 35%, rgba(100,0,15,0.8) 65%, rgba(200,0,30,0.55) 100%)'
            }} />
            {/* Left edge gold border */}
            <div className="absolute top-0 left-0 bottom-0 w-[5px]" style={{
              background: 'linear-gradient(180deg, #fef08a, #f59e0b, #d97706, #f59e0b, #fef08a)',
              boxShadow: '0 0 12px rgba(251,191,36,0.7)'
            }} />
            {/* Hanging gold fringe */}
            <div className="absolute top-[72px] left-0 bottom-0 w-4 flex flex-col" style={{ gap: 0 }}>
              {Array.from({ length: 60 }).map((_, i) => (
                <div key={i} style={{
                  height: '16px',
                  width: `${6 + Math.sin(i * 0.9) * 4}px`,
                  background: i % 2 === 0 ? '#f59e0b' : '#d97706',
                  opacity: 0.75,
                  borderRadius: '0 0 3px 3px'
                }} />
              ))}
            </div>
            {/* Deep inner shadow on left edge */}
            <div className="absolute top-0 left-0 bottom-0 w-16" style={{
              background: 'linear-gradient(270deg, transparent, rgba(0,0,0,0.5))'
            }} />
          </div>

          {/* ── CENTER GOLDEN SEAL / MEDALLION ── */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 flex flex-col items-center pointer-events-auto" style={{ gap: 0 }}>
            {/* Rope from pelmet */}
            <div style={{ width: '4px', height: '80px', background: 'linear-gradient(180deg, #f59e0b, #b45309)', borderRadius: '2px', opacity: 0.85 }} />
            {/* Medallion outer ring (Clickable Button) */}
            <button
              onClick={handleCutRibbon}
              className="rounded-full flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-300 focus:outline-none"
              style={{
                width: '90px', height: '90px',
                background: 'radial-gradient(circle at 35% 30%, #fef08a 0%, #f59e0b 35%, #b45309 65%, #78350f 100%)',
                border: '4px solid rgba(255,220,80,0.9)',
                boxShadow: '0 0 30px rgba(251,191,36,0.9), 0 0 60px rgba(245,158,11,0.5), inset 0 2px 4px rgba(255,255,255,0.4)'
              }}>
              {/* Inner circle */}
              <div className="rounded-full flex items-center justify-center" style={{
                width: '65px', height: '65px',
                background: 'radial-gradient(circle at 40% 35%, rgba(255,245,180,0.3), rgba(120,53,15,0.6))',
                border: '2px solid rgba(255,220,80,0.6)'
              }}>
                <span style={{ fontSize: '28px', lineHeight: 1 }}>✂️</span>
              </div>
            </button>
          </div>

        </div>
      )}

      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
        <img
          ref={bgImgRef}
          src="/luxury-silk-bg.jpg"
          alt="Luxury Fluid Silk & Gold Inauguration Background"
          className="w-full h-full object-cover object-center transform scale-105 filter brightness-[1.02] contrast-[1.03]"
        />

        <svg
          ref={vectorArcRef}
          className="vector-glow vector-float absolute inset-0 w-full h-full opacity-80"
          viewBox="0 0 1600 900"
          preserveAspectRatio="none"
        >
          <g fill="none" strokeLinecap="round">
            <path d="M-40 450 C 200 220, 440 180, 660 430 S 1110 700, 1660 420" stroke="rgba(255,255,255,0.72)" strokeWidth="5" />
            <path d="M-70 540 C 180 290, 460 260, 720 520 S 1180 770, 1665 510" stroke="rgba(251,191,36,0.42)" strokeWidth="7" />
            <path d="M-100 420 C 260 170, 440 160, 680 420 S 1090 630, 1660 390" stroke="rgba(255,255,255,0.38)" strokeWidth="2.5" strokeDasharray="10 18" />
          </g>

          <g fill="rgba(255,255,255,0.78)">
            <path d="M200 260 L220 310 L260 260 L220 210 Z" />
            <path d="M1300 270 L1325 320 L1368 270 L1325 220 Z" />
            <path d="M1000 590 L1024 638 L1070 590 L1024 544 Z" />
          </g>

          <g fill="rgba(251,191,36,0.8)">
            <circle cx="255" cy="240" r="5" />
            <circle cx="1350" cy="250" r="4.8" />
            <circle cx="1060" cy="610" r="4.4" />
          </g>
        </svg>

        <svg
          ref={vectorSparkRef}
          className="vector-glow absolute inset-0 w-full h-full opacity-70"
          viewBox="0 0 1600 900"
          preserveAspectRatio="none"
        >
          <g fill="none" stroke="rgba(255,255,255,0.75)" strokeLinecap="round" strokeWidth="2">
            <path d="M120 120 L150 180 L210 150 L150 90 Z" />
            <path d="M1470 180 L1505 240 L1560 210 L1505 150 Z" />
            <path d="M1120 760 L1156 820 L1215 790 L1156 730 Z" />
            <path d="M300 700 L332 760 L392 732 L332 672 Z" />
          </g>
          <g fill="rgba(251,191,36,0.8)">
            <circle cx="220" cy="500" r="3.3" />
            <circle cx="720" cy="330" r="2.8" />
            <circle cx="930" cy="510" r="3.6" />
            <circle cx="1280" cy="430" r="2.9" />
            <circle cx="1110" cy="700" r="3.1" />
          </g>
          <g stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" fill="none">
            <path d="M170 290 L150 330 L110 310" />
            <path d="M1400 500 L1428 518 L1449 555" />
            <path d="M760 655 L790 690 L835 670" />
          </g>
        </svg>

        <svg
          ref={confettiBurstRef}
          className="vector-glow absolute inset-0 w-full h-full opacity-70"
          viewBox="0 0 1600 900"
          preserveAspectRatio="none"
        >
          <g stroke="rgba(255,255,255,0.7)" strokeWidth="2" fill="none" strokeLinecap="round">
            <path d="M170 730 L180 760 L210 770 L180 790 L170 820 L160 790 L130 780 L160 760 Z" />
            <path d="M1280 720 L1300 755 L1340 768 L1300 782 L1280 820 L1260 782 L1220 768 L1260 755 Z" />
            <path d="M1100 250 L1115 285 L1150 300 L1115 315 L1100 350 L1085 315 L1050 300 L1085 285 Z" />
            <path d="M430 260 L450 295 L490 305 L450 320 L430 360 L410 320 L370 305 L410 295 Z" />
          </g>
          <g fill="rgba(251,191,36,0.82)">
            <circle cx="460" cy="430" r="3.5"/>
            <circle cx="1180" cy="500" r="3.8"/>
            <circle cx="910" cy="260" r="3.2"/>
            <circle cx="680" cy="710" r="3.5"/>
          </g>
        </svg>

        <div
          ref={festiveLightsRef}
          className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[42%] pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.18), transparent 54%)',
            filter: 'blur(18px)'
          }}
        />

        {/* ── ANIMATED GOLDEN ORB 1 — large warm glow, top-left ── */}
        <div ref={orb1Ref} className="absolute -top-32 -left-32 w-[520px] h-[520px] rounded-full pointer-events-none" style={{
          background: 'radial-gradient(circle at 40% 40%, rgba(251,191,36,0.38) 0%, rgba(217,119,6,0.18) 45%, transparent 70%)',
          filter: 'blur(48px)'
        }} />

        {/* ── ANIMATED ORB 2 — rose accent, top-right ── */}
        <div ref={orb2Ref} className="absolute -top-20 -right-24 w-[380px] h-[380px] rounded-full pointer-events-none" style={{
          background: 'radial-gradient(circle at 60% 35%, rgba(244,63,94,0.22) 0%, rgba(251,113,133,0.1) 50%, transparent 72%)',
          filter: 'blur(56px)'
        }} />

        {/* ── ANIMATED ORB 3 — blue/indigo deep, bottom ── */}
        <div ref={orb3Ref} className="absolute -bottom-28 left-1/4 w-[450px] h-[450px] rounded-full pointer-events-none" style={{
          background: 'radial-gradient(circle at 50% 60%, rgba(99,102,241,0.22) 0%, rgba(59,130,246,0.12) 50%, transparent 72%)',
          filter: 'blur(60px)'
        }} />

        {/* ── ROTATING LIGHT RAY ── */}
        <div ref={rayRef} className="absolute inset-0 pointer-events-none" style={{ transformOrigin: '50% 50%' }}>
          <div style={{
            position: 'absolute',
            top: '50%', left: '50%',
            width: '140%', height: '3px',
            marginLeft: '-70%', marginTop: '-1.5px',
            background: 'linear-gradient(90deg, transparent 0%, rgba(251,191,36,0.18) 35%, rgba(255,255,255,0.28) 50%, rgba(251,191,36,0.18) 65%, transparent 100%)',
            filter: 'blur(2px)',
            borderRadius: '999px'
          }} />
          <div style={{
            position: 'absolute',
            top: '50%', left: '50%',
            width: '110%', height: '2px',
            marginLeft: '-55%', marginTop: '-1px',
            transform: 'rotate(72deg)',
            transformOrigin: 'center',
            background: 'linear-gradient(90deg, transparent 0%, rgba(251,191,36,0.12) 40%, rgba(255,255,255,0.18) 50%, rgba(251,191,36,0.12) 60%, transparent 100%)',
            filter: 'blur(1.5px)',
            borderRadius: '999px'
          }} />
        </div>

        {/* ── RADIAL HALO PULSE — center illumination ── */}
        <div ref={haloRef} className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.88) 0%, rgba(255,255,255,0.68) 38%, rgba(255,220,100,0.12) 65%, rgba(10,21,38,0.35) 100%)'
        }} />

        {/* ── HORIZONTAL SHIMMER SWEEP ── */}
        <div ref={shimmerRef} className="absolute inset-0 pointer-events-none" style={{
          background: 'linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.22) 48%, rgba(251,191,36,0.12) 52%, transparent 80%)',
          width: '60%',
          left: 0
        }} />

      </div>

      {/* 2. REAL-TIME FLOATING GOLD DUST PARTICLES */}
      <GoldenAtmosphereCanvas />

      {/* 3. FOREGROUND EDITORIAL CONTENT */}
      <div className="relative z-20 max-w-5xl w-full h-full max-h-screen mx-auto text-center flex flex-col items-center justify-between px-3 sm:px-6 py-3 sm:py-5 overflow-hidden">

        {/* Official University & Journal Logo */}
        <div
          data-animate="logo"
          className="flex flex-col items-center justify-center my-0.5"
        >
          <div className="px-4 py-4 rounded-[.4rem] border border-amber-300/70 bg-[linear-gradient(135deg,#071b2d,#0d2741,#0b1c2d)] shadow-[0_18px_48px_rgba(15,23,42,0.30)] ring-1 ring-amber-200/80">
            <img
              src="/logo.png"
              alt="Shri Ramswaroop Memorial University"
              className="h-8 sm:h-10 md:h-11 w-auto max-w-[62vw] sm:max-w-[300px] object-contain drop-shadow-[0_4px_18px_rgba(251,191,36,0.35)]"
            />
          </div>
        </div>

        {/* INAUGURATION CEREMONY Tag with Diamond Lines */}
        <div
          data-animate="badge"
          className="premium-badge flex items-center justify-center gap-3 w-full max-w-md mx-auto my-0.5 rounded-full px-4 py-2"
        >
          <div className="gold-divider h-[1.5px] flex-1 rounded-full" />
          <span className="text-[10px] sm:text-xs font-black tracking-[0.28em] uppercase text-amber-950 font-mono-tech flex items-center gap-1.5 drop-shadow-sm">
            <span className="text-amber-700 animate-pulse">◇</span>
            <span>INAUGURATION CEREMONY</span>
            <span className="text-amber-700 animate-pulse">◇</span>
          </span>
          <div className="gold-divider h-[1.5px] flex-1 rounded-full" />
        </div>

        {/* High-Contrast Bold Headline & Journal Full Name */}
        <div data-animate="title" className="title-sweep-wrap my-0.5 flex flex-col items-center">
          <h1 className="title-sweep luxury-heading font-serif-academic text-[2.3rem] sm:text-4xl md:text-6xl font-bold tracking-[-0.04em] leading-[0.95] drop-shadow-sm">
            A New Chapter in <span className="italic text-amber-700 drop-shadow-[0_2px_12px_rgba(245,158,11,0.28)]">Scholarly Research</span>
          </h1>

          {/* IJSPAST Full Name Badge */}
          <div className="premium-pill mt-2 sm:mt-3 px-3.5 sm:px-5 py-1.5 rounded-full flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
            <span className="text-xs sm:text-sm md:text-base font-black tracking-widest text-amber-950 font-serif-academic drop-shadow-sm">
              IJSPAST
            </span>
            <span className="text-amber-700 font-bold hidden sm:inline">•</span>
            <span className="text-[11px] sm:text-xs md:text-sm font-bold text-amber-950 tracking-wide font-sans">
              International Journal of Scientific Progress in Applied Science &amp; Technology
            </span>
          </div>
        </div>

        {/* Description Text & Key Highlights */}
        <div data-animate="subtitle" className="my-0.5 flex flex-col items-center gap-1">
          <p className="text-xs sm:text-sm md:text-base font-medium text-slate-800 tracking-[0.02em] normal-case max-w-2xl font-sans leading-snug drop-shadow-sm luxury-subheading">
            Creating a global platform for innovative research and meaningful academic dialogue across science, engineering, and technology.
          </p>

          {/* Academic Highlight Pills */}
          {/* <div className="flex flex-wrap items-center justify-center gap-2 mt-0.5">
            <span className="premium-pill px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold text-amber-900">
              ✦ Peer-Reviewed
            </span>
            <span className="premium-pill px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold text-amber-900">
              ✦ Open Access Journal
            </span>
            <span className="premium-pill px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold text-amber-900">
              ✦ Multidisciplinary Scope
            </span>
          </div> */}
        </div>

        {/* 4. Interactive Ribbon Cutting Ceremony Stage */}
        <div
          data-animate="ribbon-box"
          className="premium-panel relative w-full max-w-2xl border border-amber-400/80 rounded-[2rem] p-3 sm:p-4 my-1 overflow-hidden shadow-[0_20px_60px_rgba(120,53,15,0.18)]"
        >
          {/* Subtle golden corner accents */}
          <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-amber-500 rounded-tl-2xl" />
          <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-amber-500 rounded-tr-2xl" />
          <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-amber-500 rounded-bl-2xl" />
          <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-amber-500 rounded-br-2xl" />

          {/* Label above ribbon */}
          <p className="text-center text-[10px] sm:text-xs font-black tracking-[0.25em] uppercase text-amber-900/80 mb-1 flex items-center justify-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-600 inline" />
            <span>Official Ribbon Cutting Ceremony</span>
            <Sparkles className="w-3 h-3 text-amber-600 inline" />
          </p>

          {/* Golden Satin Ribbon + Scissors Stage */}
          <div className="relative w-full flex items-center justify-center py-1 my-0.5 overflow-visible" style={{ minHeight: '70px' }}>

            {/* Left Satin Ribbon — thick luxurious gold */}
            <div className="ribbon-piece-left absolute left-0 w-[calc(50%-32px)] h-12 sm:h-14 origin-right" style={{
              background: 'linear-gradient(180deg, #fff6c0 0%, #ffd700 12%, #c8900a 38%, #f5c518 55%, #b8860b 72%, #ffd700 88%, #c8900a 100%)',
              boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.6), inset 0 -2px 4px rgba(0,0,0,0.35), 0 4px 18px rgba(160,100,0,0.3)',
              borderTop: '2px solid rgba(255,230,100,0.8)',
              borderBottom: '2px solid rgba(100,60,0,0.4)'
            }}>
              <div className="absolute inset-0 flex items-center justify-end pr-3">
                <span className="text-[9px] sm:text-[10px] font-black tracking-[0.22em] uppercase text-amber-950 drop-shadow">OFFICIAL</span>
              </div>
              <div className="absolute inset-y-0 left-1/3 w-[2px] bg-gradient-to-b from-transparent via-yellow-100/70 to-transparent" />
            </div>

            {/* Right Satin Ribbon — thick luxurious gold */}
            <div className="ribbon-piece-right absolute right-0 w-[calc(50%-32px)] h-12 sm:h-14 origin-left" style={{
              background: 'linear-gradient(180deg, #fff6c0 0%, #ffd700 12%, #c8900a 38%, #f5c518 55%, #b8860b 72%, #ffd700 88%, #c8900a 100%)',
              boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.6), inset 0 -2px 4px rgba(0,0,0,0.35), 0 4px 18px rgba(160,100,0,0.3)',
              borderTop: '2px solid rgba(255,230,100,0.8)',
              borderBottom: '2px solid rgba(100,60,0,0.4)'
            }}>
              <div className="absolute inset-0 flex items-center justify-start pl-3">
                <span className="text-[9px] sm:text-[10px] font-black tracking-[0.22em] uppercase text-amber-950 drop-shadow">INAUGURATION</span>
              </div>
              <div className="absolute inset-y-0 right-1/3 w-[2px] bg-gradient-to-b from-transparent via-yellow-100/70 to-transparent" />
            </div>

            {/* Center Bow / Knot decoration (only before cut) */}
            {!isCut && (
              <div className="absolute z-20 flex flex-col items-center justify-center" style={{ left: 'calc(50% - 30px)', width: '60px' }}>
                <div className="relative w-14 h-8 flex items-center justify-center">
                  <div className="absolute left-0 w-6 h-6 rounded-full border-2 border-amber-500" style={{ background: 'radial-gradient(circle at 30% 30%, #ffe97a, #c8900a)', boxShadow: '0 2px 6px rgba(180,100,0,0.4)' }} />
                  <div className="absolute right-0 w-6 h-6 rounded-full border-2 border-amber-500" style={{ background: 'radial-gradient(circle at 70% 30%, #ffe97a, #c8900a)', boxShadow: '0 2px 6px rgba(180,100,0,0.4)' }} />
                  <div className="absolute w-4 h-4 rounded-full z-10 border border-amber-300" style={{ background: 'radial-gradient(circle at 35% 35%, #fff5a0, #b8860b)', boxShadow: '0 0 6px rgba(255,200,0,0.7)' }} />
                </div>
              </div>
            )}

            {/* Cut flash burst overlay */}
            {showFlash && (
              <div className="absolute inset-0 z-40 flex items-center justify-center pointer-events-none">
                <div className="w-20 h-20 rounded-full animate-ping" style={{ background: 'radial-gradient(circle, rgba(255,240,100,0.95) 0%, rgba(251,191,36,0.6) 50%, transparent 80%)' }} />
                <div className="absolute text-2xl animate-ping" style={{ animationDuration: '0.2s' }}>✂️</div>
              </div>
            )}

            {/* Central Scissors Trigger Button */}
            {!isCut && (
              <button
                ref={scissorsBtnRef}
                onClick={handleCutRibbon}
                disabled={isAnimating}
                className={`scissors-button glow-amber-pulse absolute z-30 w-16 h-16 sm:w-20 sm:h-20 rounded-full flex flex-col items-center justify-center gap-0.5 select-none transition-all duration-300 ${isAnimating ? 'cursor-wait' : 'cursor-pointer hover:scale-110 active:scale-95'
                  }`}
                style={{
                  background: 'linear-gradient(145deg, #1e293b, #0f172a, #1e3a5f)',
                  border: '3px solid #fbbf24'
                }}
              >
                <div className="scissors-icon flex items-center justify-center">
                  <Scissors className="w-6 h-6 sm:w-7 sm:h-7 text-amber-400" style={{ filter: 'drop-shadow(0 0 8px rgba(251,191,36,0.9))' }} />
                </div>
                <span className="text-[7.5px] sm:text-[8.5px] font-black uppercase tracking-wider text-amber-300 leading-tight text-center px-1">
                  {isAnimating ? 'Cutting...' : 'Cut to\nInaugurate'}
                </span>
              </button>
            )}

            {/* Inaugurated badge (after cut) */}
            {isCut && (
              <div className="absolute z-30 px-4 sm:px-6 py-2 rounded-full flex items-center gap-2 text-xs sm:text-sm font-black tracking-widest shadow-xl animate-bounce"
                style={{ background: 'linear-gradient(135deg, #f59e0b, #fde68a, #d97706)', border: '2px solid #fef3c7', color: '#1c1400' }}>
                <PartyPopper className="w-4 h-4 animate-spin" style={{ animationDuration: '3s' }} />
                <span>OFFICIALLY INAUGURATED</span>
                <Sparkles className="w-4 h-4" />
              </div>
            )}

          </div>

          {/* Action After Ribbon Cut */}
          {showCeremonyDetails ? (
            <div className="portal-reveal-box mt-2 pt-2 border-t border-slate-200 flex flex-col items-center justify-center gap-2">
              {/* Celebration Fanfare Badge */}
              <div className="flex items-center gap-2 text-xs sm:text-sm font-extrabold text-amber-950 bg-gradient-to-r from-amber-100 via-amber-200 to-amber-100 px-4 py-1.5 rounded-full border border-amber-400 shadow-md">
                <PartyPopper className="w-4 h-4 text-amber-700" />
                <Trophy className="w-4 h-4 text-amber-600" />
                <span>Grand Inauguration Complete • Research Excellence Begins!</span>
                <Sparkles className="w-4 h-4 text-amber-700" />
              </div>
              <div className="flex flex-wrap items-center justify-center gap-2.5">
                <a
                  href={JOURNAL_INFO.portalUrl || "https://srmu-journal.netlify.app/"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="premium-button px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-xs sm:text-sm uppercase tracking-wider transition-all inline-flex items-center gap-2 shadow-lg shadow-amber-500/30 hover:scale-[1.02]"
                >
                  <PartyPopper className="w-4 h-4 text-slate-950" />
                  <span>Enter Journal Portal</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>

                <button
                  onClick={handleReset}
                  className="px-4 py-2 rounded-full bg-white hover:bg-slate-50 border-2 border-slate-300 text-slate-700 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all inline-flex items-center gap-1.5 cursor-pointer shadow-sm hover:border-amber-400"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-amber-600" />
                  <span>Replay Ceremony</span>
                </button>
              </div>
            </div>
          ) : (
            <p className="text-[11px] sm:text-xs text-slate-700 font-semibold tracking-wider mt-1 flex items-center justify-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Click on the scissors button to perform the official ribbon-cutting ceremony</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            </p>
          )}
        </div>

        {/* 5. Date Pill & Academic Footer Label */}
        <div className="flex flex-col items-center gap-1 my-0.5 pb-2">
          <div
            data-animate="date-pill"
            className="premium-pill inline-flex items-center gap-3 px-6 py-2 rounded-full border border-amber-500/60 shadow-[0_12px_26px_rgba(146,64,14,0.12)]"
          >
            <div className="p-1.5 rounded-lg bg-gradient-to-br from-amber-200 to-amber-500/20 text-amber-800 ring-1 ring-amber-300/60">
              <Calendar className="w-4 h-4" />
            </div>
            <span className="font-serif-academic text-2xl sm:text-3xl font-semibold text-[#071936] tracking-[0.12em] leading-none">
              01 • 10 • 2026
            </span>
          </div>

          <p className="text-[11px] mt-2 sm:text-xs text-slate-900 font-bold tracking-wider flex items-center justify-center gap-1.5 drop-shadow-sm bg-white/90 px-4 py-1 rounded-full border border-slate-200/80">
            <BookOpen className="w-3.5 h-3.5 text-amber-700 inline shrink-0" />
            <span>Published by SRDT</span>
          </p>
        </div>

      </div>
    </main>
  );
}
