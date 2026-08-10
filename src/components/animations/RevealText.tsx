'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

interface RevealTextProps {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
  once?: boolean;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div';
}

export function RevealText({
  text,
  className,
  wordClassName,
  delay = 0,
  stagger = 0.04,
  duration = 0.75,
  once = true,
  as: Tag = 'div',
}: RevealTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const words = text.split(' ');

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('.reveal-word', {
          y: '110%',
          opacity: 0,
          duration,
          delay,
          stagger,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            once,
          },
        });
      });
    },
    { scope: containerRef, dependencies: [delay, duration, stagger, once, text] }
  );

  return (
    <Tag ref={containerRef as any} className={className}>
      <span className="inline">
        {words.map((word, i) => (
          <span
            key={i}
            className="inline-block overflow-hidden"
            style={{ verticalAlign: 'bottom' }}
          >
            <span className={`reveal-word inline-block ${wordClassName ?? ''}`}>
              {word}
            </span>
            {i < words.length - 1 && (
              <span className="inline-block">&nbsp;</span>
            )}
          </span>
        ))}
      </span>
    </Tag>
  );
}
