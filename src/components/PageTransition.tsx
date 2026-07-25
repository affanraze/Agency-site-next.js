'use client';

import { useRef } from 'react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isFirstRender = useRef(true);

  useGSAP(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const overlay = overlayRef.current;
    if (!overlay) return;

    // Wipe in then out
    const tl = gsap.timeline();
    tl.set(overlay, { transformOrigin: 'bottom', scaleY: 0 })
      .to(overlay, {
        scaleY: 1,
        duration: 0.5,
        ease: 'power3.inOut',
      })
      .set(overlay, { transformOrigin: 'top' })
      .to(overlay, {
        scaleY: 0,
        duration: 0.5,
        ease: 'power3.inOut',
        delay: 0.1,
      });
  }, { dependencies: [pathname] });

  return (
    <>
      <div ref={overlayRef} className="page-transition-overlay" />
      {children}
    </>
  );
}
