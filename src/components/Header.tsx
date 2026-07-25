'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/work', label: 'Work' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen && menuRef.current) {
      gsap.fromTo(
        menuRef.current,
        { opacity: 0, scale: 0.98 },
        { opacity: 1, scale: 1, duration: 0.35, ease: 'power2.out' }
      );
    }
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Create a minimal immediate overlay on link click so the starter animation
  // (PageLoader) has something to replace while the new page hydrates.
  const showStarterOverlay = () => {
    if (typeof window === 'undefined') return;
    try {
      // Only show the instant overlay for cold visitors who haven't seen the loader
      if (sessionStorage.getItem('branvoy_loaded')) return;
      const init = document.getElementById('initial-loader');
      if (init) init.style.display = 'block';
    } catch (e) {}
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 md:px-6 pt-4 transition-all duration-300">
      <nav
        className={`max-w-7xl mx-auto px-5 md:px-6 py-3 rounded-full transition-all duration-500 flex items-center justify-between relative ${
          scrolled
            ? 'glass-dark shadow-2xl shadow-black/30 border border-white/10'
            : 'bg-[#0F190E]/90 backdrop-blur-md border border-white/10 shadow-lg'
        }`}
      >
        {/* Brand Logo */}
        <Link href="/" className="group flex items-center gap-3" onClick={showStarterOverlay}>
          <div className="relative w-9 h-9 rounded-full overflow-hidden border border-primary/40 group-hover:border-primary transition-colors duration-300">
            <Image
              src="/agency-logo-mark.png"
              alt="Branvoy Logo"
              width={36}
              height={36}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-xl tracking-tight text-ivory font-normal leading-none group-hover:text-primary transition-colors duration-300">
              Branvoy
            </span>
            <span className="text-[9px] uppercase tracking-[0.2em] text-ivory/50 font-mono mt-0.5">
              Agency
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links — absolutely centered in the navbar */}
        <div className="hidden md:flex items-center gap-7 absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-xs uppercase tracking-[0.15em] font-medium transition-all duration-300 py-1 ${
                  isActive ? 'text-primary font-semibold' : 'text-ivory/80 hover:text-ivory'
                }`}
                onClick={showStarterOverlay}
              >
                {link.label}
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-primary" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Action Button */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/contact"
            onClick={showStarterOverlay}
            className="px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-primary text-ivory border border-primary/50 hover:bg-ivory hover:text-ink transition-all duration-300 shadow-md shadow-primary/20 whitespace-nowrap"
          >
            Start a Project
          </Link>
        </div>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden relative z-50 w-10 h-10 rounded-full bg-white/10 flex flex-col items-center justify-center gap-1.5 focus:outline-none"
          aria-label="Toggle Navigation Menu"
        >
          <span
            className={`block w-5 h-0.5 bg-ivory transition-all duration-300 ${
              isOpen ? 'rotate-45 translate-y-1' : ''
            }`}
          />
          <span
            className={`block w-5 h-0.5 bg-ivory transition-all duration-300 ${
              isOpen ? '-rotate-45 -translate-y-1' : ''
            }`}
          />
        </button>

        {/* Mobile Fullscreen Menu Drawer */}
        {isOpen && (
          <div
            ref={menuRef}
            className="fixed inset-0 top-0 left-0 w-screen h-screen bg-ink z-40 flex flex-col justify-between p-8 pt-28"
          >
            <div className="flex flex-col space-y-6">
              <span className="text-[10px] uppercase tracking-[0.3em] text-primary font-mono">
                Menu Navigation
              </span>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={showStarterOverlay}
                  className={`font-serif text-4xl text-ivory hover:text-primary transition-colors ${
                    pathname === link.href ? 'text-primary italic' : ''
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="pt-8 border-t border-ivory/15 space-y-4">
              <Link
                href="/contact"
                onClick={showStarterOverlay}
                className="block text-center py-4 bg-primary text-ivory rounded-full text-xs uppercase tracking-widest font-semibold"
              >
                Start a Project
              </Link>
              <div className="text-center text-[10px] uppercase tracking-widest text-ivory/40">
                FAISALABAD, PAKISTAN
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

