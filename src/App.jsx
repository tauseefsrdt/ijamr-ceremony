import React, { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import ContinuousVectorBackground from './components/ContinuousVectorBackground';

// Max 3 Clean Celebration Full-Screen Sections
import Sec01LogoOpening from './components/sections/Sec01LogoOpening';
import Sec02Inauguration from './components/sections/Sec02Inauguration';
import Sec03RibbonCutting from './components/sections/Sec03RibbonCutting';

const TOTAL_SECTIONS = 3;

export default function App() {
  const [currentSection, setCurrentSection] = useState(0);
  const isTransitioningRef = useRef(false);
  const sectionRefs = useRef([]);
  const containerRef = useRef(null);

  // Smooth Directional Viewport Transition without blinking
  const goToSection = useCallback((targetIndex, direction = 1) => {
    if (
      targetIndex < 0 || 
      targetIndex >= TOTAL_SECTIONS || 
      isTransitioningRef.current || 
      targetIndex === currentSection
    ) {
      return;
    }

    isTransitioningRef.current = true;

    const prevEl = sectionRefs.current[currentSection];
    const nextEl = sectionRefs.current[targetIndex];

    if (!prevEl || !nextEl) {
      setCurrentSection(targetIndex);
      isTransitioningRef.current = false;
      return;
    }

    // Set next element visible before animating to avoid any flash
    gsap.set(nextEl, {
      yPercent: direction > 0 ? 25 : -25,
      opacity: 0,
      scale: 0.98,
      zIndex: 25,
      pointerEvents: 'auto'
    });

    gsap.set(prevEl, { zIndex: 20 });

    const tl = gsap.timeline({
      onComplete: () => {
        setCurrentSection(targetIndex);
        gsap.set(prevEl, { opacity: 0, pointerEvents: 'none', zIndex: 10 });
        isTransitioningRef.current = false;
      }
    });

    // Smooth exit
    tl.to(prevEl, {
      yPercent: direction > 0 ? -25 : 25,
      opacity: 0,
      scale: 0.96,
      duration: 0.6,
      ease: 'power2.inOut'
    }, 0);

    // Smooth enter
    tl.to(nextEl, {
      yPercent: 0,
      opacity: 1,
      scale: 1,
      duration: 0.7,
      ease: 'power3.out'
    }, 0.05);

  }, [currentSection]);

  // Mouse Wheel Navigation (Debounced)
  useEffect(() => {
    let lastWheelTime = 0;

    const handleWheel = (e) => {
      e.preventDefault();
      const now = Date.now();
      if (now - lastWheelTime < 750 || isTransitioningRef.current) return;

      if (Math.abs(e.deltaY) > 20) {
        lastWheelTime = now;
        if (e.deltaY > 0) {
          goToSection(currentSection + 1, 1);
        } else {
          goToSection(currentSection - 1, -1);
        }
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel);
      }
    };
  }, [currentSection, goToSection]);

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isTransitioningRef.current) return;

      if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        goToSection(currentSection + 1, 1);
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        goToSection(currentSection - 1, -1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSection, goToSection]);

  // Touch Swipe for Mobile
  useEffect(() => {
    let touchStartY = 0;

    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e) => {
      if (isTransitioningRef.current) return;
      const touchEndY = e.changedTouches[0].clientY;
      const diffY = touchStartY - touchEndY;

      if (Math.abs(diffY) > 40) {
        if (diffY > 0) {
          goToSection(currentSection + 1, 1);
        } else {
          goToSection(currentSection - 1, -1);
        }
      }
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [currentSection, goToSection]);

  const sections = [
    { id: '01', component: <Sec01LogoOpening isActive={currentSection === 0} /> },
    { id: '02', component: <Sec02Inauguration isActive={currentSection === 1} /> },
    { id: '03', component: <Sec03RibbonCutting isActive={currentSection === 2} onRestart={() => goToSection(0, -1)} /> },
  ];

  return (
    <div 
      ref={containerRef}
      className="relative w-screen h-screen overflow-hidden bg-[#fbf9f4] text-slate-900 selection:bg-amber-400 selection:text-slate-950 font-sans"
      style={{ height: '100svh' }}
    >
      {/* 1. Continuous Background Vector Engine */}
      <ContinuousVectorBackground />

      {/* 2. Section Container */}
      <div className="relative w-full h-full z-10">
        {sections.map((sec, index) => (
          <div
            key={sec.id}
            ref={(el) => (sectionRefs.current[index] = el)}
            className={`absolute inset-0 w-full h-full ${
              currentSection === index ? 'pointer-events-auto z-20 opacity-100' : 'pointer-events-none z-10 opacity-0'
            }`}
          >
            {sec.component}
          </div>
        ))}
      </div>

      {/* 3. Side Minimal 3-Dot Indicator */}
      <div className="fixed right-6 sm:right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-4 select-none">
        {sections.map((sec, index) => (
          <button
            key={sec.id}
            onClick={() => goToSection(index, index > currentSection ? 1 : -1)}
            className="group relative flex items-center justify-center p-1 cursor-pointer focus:outline-none"
            aria-label={`Go to section ${index + 1}`}
          >
            <div
              className={`rounded-full transition-all duration-300 ${
                currentSection === index
                  ? 'w-3.5 h-3.5 bg-amber-500 ring-4 ring-amber-400/30 shadow-[0_0_15px_rgba(217,119,6,0.6)]'
                  : 'w-2 h-2 bg-slate-300 group-hover:bg-slate-500'
              }`}
            />
          </button>
        ))}
      </div>

      {/* 4. Minimal Bottom Step Indicator (01 / 03) */}
      <div className="fixed bottom-6 right-8 z-40 hidden sm:flex items-center gap-1 text-xs font-mono-tech text-slate-500 select-none">
        <span className="text-amber-700 font-bold">{String(currentSection + 1).padStart(2, '0')}</span>
        <span>/</span>
        <span>{String(TOTAL_SECTIONS).padStart(2, '0')}</span>
      </div>
    </div>
  );
}
