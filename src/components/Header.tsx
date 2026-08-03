'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence, Variants } from 'framer-motion';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/work', label: 'Work' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

const menuVariants: Variants = {
  closed: {
    opacity: 0,
    y: -8,
    scale: 0.98,
    transition: { duration: 0.25, ease: 'easeOut' },
  },
  open: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
};

const linkVariants: Variants = {
  closed: { opacity: 0, x: -20 },
  open: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.35, delay: i * 0.06, ease: 'easeOut' },
  }),
};

export default function Header() {
  const pathname = usePathname();

  if (pathname?.startsWith('/admin')) return null;

  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

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
        <Link href="/" className="group flex items-center gap-3 flex-shrink-0 z-50">
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
              >
                {link.label}
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-primary" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Desktop Action Button */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/contact"
            className="px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-primary text-ivory border border-primary/50 hover:bg-ivory hover:text-ink transition-all duration-300 shadow-md shadow-primary/20 whitespace-nowrap"
          >
            Start a Project
          </Link>
        </div>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden relative z-50 w-10 h-10 rounded-full bg-white/10 flex flex-col items-center justify-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          aria-label={isOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
          aria-expanded={isOpen}
        >
          <span
            className={`block w-5 h-0.5 bg-ivory transition-all duration-300 origin-center ${
              isOpen ? 'rotate-45 translate-y-[7px]' : ''
            }`}
          />
          <span
            className={`block w-5 h-0.5 bg-ivory transition-all duration-300 ${
              isOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block w-5 h-0.5 bg-ivory transition-all duration-300 origin-center ${
              isOpen ? '-rotate-45 -translate-y-[7px]' : ''
            }`}
          />
        </button>
      </nav>

      {/* Mobile Fullscreen Menu Drawer — AnimatePresence for smooth mount/unmount */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-menu"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 top-0 left-0 w-screen h-[100dvh] bg-ink z-40 flex flex-col justify-between p-8 pt-28 overflow-hidden"
            aria-label="Navigation Menu"
          >
            {/* Decorative ambient glow */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[400px] h-[400px] rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle at center, rgba(74,106,64,0.18) 0%, transparent 70%)' }}
            />

            <div className="flex flex-col space-y-2 relative z-10">
              <span className="text-[10px] uppercase tracking-[0.3em] text-primary font-mono mb-4">
                Menu Navigation
              </span>
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  custom={i}
                  variants={linkVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                >
                  <Link
                    href={link.href}
                    className={`block font-serif text-4xl sm:text-5xl text-ivory hover:text-primary transition-colors py-2 border-b border-ivory/8 ${
                      pathname === link.href ? 'text-primary italic' : ''
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="pt-8 border-t border-ivory/15 space-y-4 relative z-10">
              <Link
                href="/contact"
                className="block text-center py-4 bg-primary text-ivory rounded-full text-xs uppercase tracking-widest font-semibold hover:bg-primary-light transition-colors"
              >
                Start a Project
              </Link>
              <div className="flex items-center justify-between text-[10px] uppercase tracking-widest text-ivory/40 font-mono">
                <span>DUBAI, UAE</span>
                <span>hello@branvoy.agency</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
