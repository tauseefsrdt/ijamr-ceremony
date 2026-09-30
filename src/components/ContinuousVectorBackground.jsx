import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function ContinuousVectorBackground() {
  const bgRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Clockwise outer ring
      gsap.to('.global-orbit-ring-cw', {
        rotation: 360,
        duration: 50,
        repeat: -1,
        ease: 'none',
        transformOrigin: '50% 50%'
      });

      // 2. Counter-clockwise inner ring
      gsap.to('.global-orbit-ring-ccw', {
        rotation: -360,
        duration: 65,
        repeat: -1,
        ease: 'none',
        transformOrigin: '50% 50%'
      });

      // 3. Center warm champagne aura pulse
      gsap.to('.global-center-pulse', {
        scale: 1.15,
        opacity: 0.5,
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });

      // 4. Subtle mouse parallax shift
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
      {/* Light Academic Celebration Background Mural */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30 scale-105"
        style={{ backgroundImage: "url('/inauguration-banner.png')" }}
      />

      {/* Light Champagne & Ivory Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#fbf9f4]/85 via-[#fdfbf7]/90 to-[#f9f5ec]/95" />

      {/* Warm Golden Spotlight Glow */}
      <div className="global-center-pulse absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] bg-gradient-to-r from-amber-300/35 via-yellow-200/30 to-blue-200/20 rounded-full blur-[140px]" />

      {/* SVG Precision Orbital Rings in Royal Amber & Navy */}
      <div className="global-mouse-layer absolute inset-0 flex items-center justify-center">
        {/* Outer Orbit */}
        <svg className="global-orbit-ring-cw absolute w-[650px] h-[650px] sm:w-[850px] sm:h-[850px] text-amber-500/30" viewBox="0 0 800 800">
          <circle cx="400" cy="400" r="380" fill="none" stroke="currentColor" strokeWidth="1.2" strokeDasharray="5 8" />
          <circle cx="780" cy="400" r="5" fill="#d97706" />
          <circle cx="20" cy="400" r="4" fill="#0f3b6c" />
        </svg>

        {/* Middle Orbit */}
        <svg className="global-orbit-ring-ccw absolute w-[450px] h-[450px] sm:w-[620px] sm:h-[620px] text-blue-800/25" viewBox="0 0 600 600">
          <circle cx="300" cy="300" r="280" fill="none" stroke="currentColor" strokeWidth="1.2" />
          <circle cx="300" cy="20" r="5" fill="#f59e0b" />
          <circle cx="300" cy="580" r="4.5" fill="#0f3b6c" />
        </svg>
      </div>
    </div>
  );
}
