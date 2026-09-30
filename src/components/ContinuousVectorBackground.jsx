import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function ContinuousVectorBackground() {
  const bgRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Clockwise outer ring
      gsap.to('.global-orbit-ring-cw', {
        rotation: 360,
        duration: 45,
        repeat: -1,
        ease: 'none',
        transformOrigin: '50% 50%'
      });

      // 2. Counter-clockwise inner ring
      gsap.to('.global-orbit-ring-ccw', {
        rotation: -360,
        duration: 55,
        repeat: -1,
        ease: 'none',
        transformOrigin: '50% 50%'
      });

      // 3. Medium dashed orbital ring
      gsap.to('.global-orbit-dashed', {
        rotation: 360,
        duration: 70,
        repeat: -1,
        ease: 'none',
        transformOrigin: '50% 50%'
      });

      // 4. Subtle pulse on glowing center
      gsap.to('.global-center-pulse', {
        scale: 1.15,
        opacity: 0.25,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });

      // 5. Floating Vector Elements
      const floaters = [
        { selector: '.float-el-1', y: -20, x: 10, duration: 6 },
        { selector: '.float-el-2', y: 25, x: -15, duration: 7.5 },
        { selector: '.float-el-3', y: -18, x: -12, duration: 8 },
        { selector: '.float-el-4', y: 22, x: 18, duration: 9 },
        { selector: '.float-el-5', y: -15, duration: 6.5, rot: 90 },
        { selector: '.float-el-6', y: 20, duration: 7, rot: -90 }
      ];

      floaters.forEach(item => {
        gsap.to(item.selector, {
          y: item.y,
          x: item.x || 0,
          rotation: item.rot || 0,
          duration: item.duration,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        });
      });

      // Desktop subtle mouse shift
      const handleMouseMove = (e) => {
        if (window.innerWidth < 768) return;
        const xPercent = (e.clientX / window.innerWidth - 0.5) * 2;
        const yPercent = (e.clientY / window.innerHeight - 0.5) * 2;

        gsap.to('.global-mouse-layer', {
          x: xPercent * 12,
          y: yPercent * 12,
          duration: 1.2,
          ease: 'power2.out'
        });
      };

      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }, bgRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={bgRef} className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* Soft Cinematic Radial Light */}
      <div className="global-center-pulse absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-r from-blue-900/15 via-amber-500/10 to-transparent rounded-full blur-[140px]" />

      {/* SVG Precision Orbital Systems */}
      <div className="global-mouse-layer absolute inset-0 flex items-center justify-center">
        {/* Outer Orbit */}
        <svg className="global-orbit-ring-cw absolute w-[650px] h-[650px] sm:w-[850px] sm:h-[850px] text-amber-500/15" viewBox="0 0 800 800">
          <circle cx="400" cy="400" r="380" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 8" />
          <circle cx="780" cy="400" r="4" fill="#f59e0b" opacity="0.8" />
          <circle cx="20" cy="400" r="3" fill="#3b82f6" opacity="0.6" />
        </svg>

        {/* Middle Orbit */}
        <svg className="global-orbit-ring-ccw absolute w-[450px] h-[450px] sm:w-[620px] sm:h-[620px] text-blue-400/15" viewBox="0 0 600 600">
          <circle cx="300" cy="300" r="280" fill="none" stroke="currentColor" strokeWidth="1" />
          <circle cx="300" cy="20" r="4.5" fill="#f59e0b" opacity="0.9" />
          <circle cx="300" cy="580" r="3.5" fill="#ffffff" opacity="0.5" />
          <path d="M 100 300 A 200 200 0 0 1 500 300" fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeOpacity="0.25" />
        </svg>

        {/* Inner Dashed Ring */}
        <svg className="global-orbit-dashed absolute w-[300px] h-[300px] sm:w-[420px] sm:h-[420px] text-slate-700/40" viewBox="0 0 400 400">
          <circle cx="200" cy="200" r="180" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="6 6" />
          <circle cx="380" cy="200" r="3" fill="#f59e0b" opacity="0.7" />
        </svg>
      </div>

      {/* Floating Micro-Vector Elements */}
      <div className="float-el-1 absolute top-[12%] left-[15%] text-amber-400/30 text-xs font-mono">+</div>
      <div className="float-el-2 absolute top-[20%] right-[18%] text-blue-400/30 text-sm">◇</div>
      <div className="float-el-3 absolute bottom-[18%] left-[18%] text-slate-500/30 text-xs">△</div>
      <div className="float-el-4 absolute bottom-[22%] right-[15%] text-amber-400/30 text-base">○</div>
      <div className="float-el-5 absolute top-[45%] left-[8%] w-12 h-px bg-amber-500/20" />
      <div className="float-el-6 absolute top-[55%] right-[8%] w-12 h-px bg-blue-500/20" />
    </div>
  );
}
