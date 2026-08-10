'use client';

import { useRef, type ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

interface FadeUpProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  y?: number;
  className?: string;
  once?: boolean;
  amount?: number | 'some' | 'all';
}

export function FadeUp({
  children,
  delay = 0,
  duration = 0.7,
  y = 40,
  className,
  once = true,
  amount = 0.15,
}: FadeUpProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const getStartPos = (amt: typeof amount): string => {
        if (typeof amt === 'number') {
          return `top ${Math.round((1 - amt) * 100)}%`;
        }
        if (amt === 'some') return 'top 85%';
        if (amt === 'all') return 'top 20%';
        return 'top 85%';
      };

      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from(containerRef.current, {
          y,
          opacity: 0,
          duration,
          delay,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: getStartPos(amount),
            once,
          },
        });
      });
    },
    { scope: containerRef, dependencies: [delay, duration, y, once, amount] }
  );

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
