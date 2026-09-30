import React, { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import ContinuousVectorBackground from './components/ContinuousVectorBackground';

// Max 3 Clean Full-Screen Sections
import Sec01LogoOpening from './components/sections/Sec01LogoOpening';
import Sec02Inauguration from './components/sections/Sec02Inauguration';
import Sec03RibbonCutting from './components/sections/Sec03RibbonCutting';

const TOTAL_SECTIONS = 3;

export default function App() {
  const [currentSection, setCurrentSection] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const sectionRefs = useRef([]);
  const containerRef = useRef(null);

  // Directional GSAP Viewport Transition
  const goToSection = useCallback((targetIndex, direction = 1) => {
    if (targetIndex < 0 || targetIndex >= TOTAL_SECTIONS || isTransitioning || targetIndex === currentSection) {
      return;
    }

    setIsTransitioning(true);

    const prevEl = sectionRefs.current[currentSection];
    const nextEl = sectionRefs.current[targetIndex];

    const tl = gsap.timeline({
      onComplete: () => {
        setCurrentSection(targetIndex);
        setIsTransitioning(false);
      }
    });

    if (prevEl && nextEl) {
      // Exit current section
      tl.to(prevEl, {
        yPercent: direction > 0 ? -35 : 35,
        opacity: 0,
        scale: 0.96,
        filter: 'blur(8px)',
        duration: 0.75,
        ease: 'power3.inOut'
      }, 0);

      // Enter target section
      tl.fromTo(nextEl, {
        yPercent: direction > 0 ? 35 : -35,
        opacity: 0,
        scale: 1.04,
        filter: 'blur(8px)'
      }, {
        yPercent: 0,
        opacity: 1,
        scale: 1,
        filter: 'blur(0px)',
        duration: 0.85,
        ease: 'power3.out'
      }, 0.1);
    } else {
      setCurrentSection(targetIndex);
      setIsTransitioning(false);
    }
  }, [currentSection, isTransitioning]);

  // Mouse Wheel Navigation
  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault();
      if (isTransitioning) return;

      if (Math.abs(e.deltaY) > 25) {
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
  }, [currentSection, isTransitioning, goToSection]);

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isTransitioning) return;

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
  }, [currentSection, isTransitioning, goToSection]);

  // Touch Swipe for Mobile
  useEffect(() => {
    let touchStartY = 0;

    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e) => {
      if (isTransitioning) return;
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
  }, [currentSection, isTransitioning, goToSection]);

  const sections = [
    { id: '01', component: <Sec01LogoOpening isActive={currentSection === 0} /> },
    { id: '02', component: <Sec02Inauguration isActive={currentSection === 1} /> },
    { id: '03', component: <Sec03RibbonCutting isActive={currentSection === 2} onRestart={() => goToSection(0, -1)} /> },
  ];

  return (
    <div 
      ref={containerRef}
      className="relative w-screen h-screen overflow-hidden bg-[#030712] text-slate-100 selection:bg-amber-500 selection:text-slate-950 font-sans"
      style={{ height: '100svh' }}
    >
      {/* 1. Continuous Background Vector Engine */}
      <ContinuousVectorBackground />

      {/* 2. Global Noise Texture */}
      <div className="fixed inset-0 pointer-events-none noise-overlay z-0" />

      {/* 3. Section Container (Exactly 1 Section per Viewport, Total 3 Sections) */}
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

      {/* 4. Side Minimal 3-Dot Navigation */}
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
                  ? 'w-3.5 h-3.5 bg-amber-400 ring-4 ring-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.9)]'
                  : 'w-2 h-2 bg-slate-700 group-hover:bg-slate-400'
              }`}
            />
          </button>
        ))}
      </div>

      {/* 5. Minimal Bottom Step Indicator (01 / 03) */}
      <div className="fixed bottom-6 right-8 z-40 hidden sm:flex items-center gap-1 text-xs font-mono-tech text-slate-500 select-none">
        <span className="text-amber-400 font-semibold">{String(currentSection + 1).padStart(2, '0')}</span>
        <span>/</span>
        <span>{String(TOTAL_SECTIONS).padStart(2, '0')}</span>
      </div>
    </div>
  );
}
