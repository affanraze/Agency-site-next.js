'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const LETTERS = ['B', 'R', 'A', 'N', 'V', 'O', 'Y'];

export default function PageLoader() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(true);

  const loaderRef = useRef<HTMLDivElement>(null);
  const topPanelRef = useRef<HTMLDivElement>(null);
  const bottomPanelRef = useRef<HTMLDivElement>(null);
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const progressNumRef = useRef<HTMLSpanElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Hide any instant overlay injected on link click or server-rendered overlay
    try {
      const pre = document.getElementById('starter-overlay');
      if (pre) pre.style.display = 'none';
    } catch (e) {}
    try {
      const init = document.getElementById('initial-loader');
      if (init) init.style.display = 'none';
    } catch (e) {}

    // Skip loader if already played in this session
    if (sessionStorage.getItem('branvoy_loaded')) {
      setVisible(false);
      return;
    }

    const loader = loaderRef.current;
    if (!loader) return;

    // Lock body scroll during load
    document.body.style.overflow = 'hidden';

    const tl = gsap.timeline({
      onComplete: () => {
        try {
          sessionStorage.setItem('branvoy_loaded', '1');
        } catch (e) {}
        try {
          const init = document.getElementById('initial-loader');
          if (init) init.style.display = 'none';
        } catch (e) {}
        document.body.style.overflow = '';
        setVisible(false);
      },
    });

    // ── Phase 1: Ambient glow pulse in
    tl.fromTo(
      glowRef.current,
      { scale: 0.4, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.2, ease: 'power2.out' }
    );

    // ── Phase 2: Letters stagger in from below
    tl.fromTo(
      letterRefs.current.filter(Boolean),
      { y: 80, opacity: 0, rotateX: -60, filter: 'blur(12px)' },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        filter: 'blur(0px)',
        stagger: 0.06,
        duration: 0.9,
        ease: 'power3.out',
      },
      '-=0.6'
    );

    // ── Phase 3: Tagline & dots fade in
    tl.fromTo(
      taglineRef.current,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
      '-=0.3'
    );

    tl.fromTo(
      dotsRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.4, ease: 'power2.out' },
      '-=0.5'
    );

    // ── Phase 4: Progress bar counts up 0→100
    const progressObj = { value: 0 };
    tl.to(
      progressObj,
      {
        value: 100,
        duration: 1.6,
        ease: 'power1.inOut',
        onUpdate() {
          const v = Math.round(progressObj.value);
          if (progressNumRef.current) progressNumRef.current.textContent = `${v}%`;
          if (progressBarRef.current) progressBarRef.current.style.width = `${v}%`;
        },
      },
      '-=0.2'
    );

    // ── Phase 5: Brief hold, then glow expands
    tl.to(glowRef.current, { scale: 1.5, opacity: 0.6, duration: 0.4, ease: 'power2.in' }, '+=0.15');

    // ── Phase 6: Letters explode outward + fade
    tl.to(
      letterRefs.current.filter(Boolean),
      {
        y: -30,
        opacity: 0,
        stagger: 0.03,
        duration: 0.5,
        ease: 'power2.in',
      },
      '-=0.25'
    );

    tl.to([taglineRef.current, dotsRef.current], { opacity: 0, duration: 0.3, ease: 'power2.in' }, '<');

    // ── Phase 7: Split-panel exit — top slides up, bottom slides down
    tl.to(
      topPanelRef.current,
      { yPercent: -100, duration: 0.75, ease: 'power4.inOut' },
      '-=0.1'
    );
    tl.to(
      bottomPanelRef.current,
      { yPercent: 100, duration: 0.75, ease: 'power4.inOut' },
      '<'
    );

    return () => {
      tl.kill();
      document.body.style.overflow = '';
      try {
        const init = document.getElementById('initial-loader');
        if (init) init.style.display = 'none';
      } catch (e) {}
    };
  }, [mounted]);

  if (!mounted || !visible) return null;

  return (
    <div
      ref={loaderRef}
      aria-hidden="true"
      style={{ fontFamily: "'Inter', sans-serif" }}
      className="fixed inset-0 z-[99999] pointer-events-none"
    >
      {/* Top half panel */}
      <div
        ref={topPanelRef}
        className="absolute inset-x-0 top-0 h-1/2 bg-[#0F190E]"
        style={{ zIndex: 2 }}
      />
      {/* Bottom half panel */}
      <div
        ref={bottomPanelRef}
        className="absolute inset-x-0 bottom-0 h-1/2 bg-[#0F190E]"
        style={{ zIndex: 2 }}
      />

      {/* Full overlay backdrop (sits between panels and content) */}
      <div className="absolute inset-0 bg-[#0F190E]" style={{ zIndex: 1 }} />

      {/* Center content — above panels */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center"
        style={{ zIndex: 3 }}
      >
        {/* Ambient radial glow */}
        <div
          ref={glowRef}
          className="absolute w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle at center, rgba(74,106,64,0.35) 0%, transparent 70%)',
            filter: 'blur(40px)',
            opacity: 0,
          }}
        />

        {/* Wordmark */}
        <div
          className="relative flex items-end gap-0 select-none"
          style={{ perspective: '600px' }}
        >
          {LETTERS.map((letter, i) => (
            <span
              key={i}
              ref={(el) => { letterRefs.current[i] = el; }}
              style={{
                fontFamily: "'Instrument Serif', Georgia, serif",
                fontSize: 'clamp(4rem, 12vw, 9rem)',
                lineHeight: 1,
                color: '#F9FAF5',
                display: 'inline-block',
                opacity: 0,
                letterSpacing: '-0.01em',
                /* Give the 'V' a green highlight for brand accent */
                ...(letter === 'V' ? { color: '#4A6A40' } : {}),
              }}
            >
              {letter}
            </span>
          ))}
        </div>

        {/* Tagline */}
        <div
          ref={taglineRef}
          style={{ opacity: 0 }}
          className="mt-4 text-[11px] uppercase tracking-[0.3em] font-mono text-[#F9FAF5]/40 font-medium"
        >
          Quiet Power. Loud Impact.
        </div>

        {/* Loading dots */}
        <div
          ref={dotsRef}
          style={{ opacity: 0 }}
          className="mt-8 flex items-center gap-1.5"
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-[#4A6A40]"
              style={{
                animation: `loaderDot 1.2s ease-in-out ${i * 0.2}s infinite`,
              }}
            />
          ))}
        </div>

        {/* Progress bar + percentage */}
        <div className="absolute bottom-10 left-0 right-0 px-8 sm:px-16">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#F9FAF5]/30">
              Loading
            </span>
            <span
              ref={progressNumRef}
              className="text-[10px] font-mono text-[#4A6A40] font-semibold"
            >
              0%
            </span>
          </div>
          <div className="w-full h-[1px] bg-[#F9FAF5]/10 rounded-full overflow-hidden">
            <div
              ref={progressBarRef}
              style={{ width: '0%', transition: 'none' }}
              className="h-full bg-[#4A6A40] rounded-full"
            />
          </div>
        </div>
      </div>

      {/* Dot pulse keyframes injected inline */}
      <style>{`
        @keyframes loaderDot {
          0%, 80%, 100% { transform: scale(1); opacity: 0.4; }
          40% { transform: scale(1.6); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
