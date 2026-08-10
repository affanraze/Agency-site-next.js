'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Prevent mobile browser address bar resize from breaking ScrollTrigger pins
ScrollTrigger.config({ ignoreMobileResize: true });

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Initialize Lenis ONLY for smooth mouse wheel / touchpad scrolling.
    // We intentionally DO NOT hijack touch events (syncTouch / smoothTouch are omitted/false)
    // so mobile touch devices use native hardware-accelerated scrolling.
    // Native touch scroll is 100% compatible with GSAP ScrollTrigger pin & scrub.
    const lenis = new Lenis({
      duration: 0.9,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      infinite: false,
      autoResize: true,
    });

    lenisRef.current = lenis;

    // Sync Lenis scroll position with ScrollTrigger on every scroll event
    lenis.on('scroll', ScrollTrigger.update);

    // Sync Lenis with GSAP ticker for frame-perfect desktop scroll animation
    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);

    // Keep GSAP lagSmoothing intact for fluid mobile performance
    gsap.ticker.lagSmoothing(1000, 16);

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
