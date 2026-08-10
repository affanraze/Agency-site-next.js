'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 0.9,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      // syncTouch delegates touch-scroll momentum to Lenis,
      // which properly syncs with GSAP ticker so ScrollTrigger
      // pin+scrub works correctly on mobile touch devices.
      syncTouch: true,
      syncTouchLerp: 0.075,
      smoothWheel: true,
      infinite: false,
      autoResize: true,
    });

    lenisRef.current = lenis;

    // Sync Lenis scroll position with ScrollTrigger on every scroll event
    lenis.on('scroll', ScrollTrigger.update);

    // Use gsap.ticker instead of manual requestAnimationFrame loop.
    // This ensures Lenis updates are in perfect sync with GSAP's
    // rendering pipeline — fewer frame mismatches, less overhead.
    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000); // gsap.ticker provides time in seconds, Lenis expects ms
    };
    gsap.ticker.add(tickerCallback);

    // Disable Lenis' built-in rAF since we're using gsap.ticker
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Re-sync on route change
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
    }
  }, [pathname]);

  return <>{children}</>;
}
