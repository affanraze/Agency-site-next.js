'use client';

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { FadeUp } from '@/components/animations/FadeUp';
import { RevealText } from '@/components/animations/RevealText';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const featuredCases = [
  {
    id: '01',
    title: 'Aethel Luxury Goods',
    category: 'Brand Strategy & Digital Campaign',
    year: '2025',
    metric: '+184%',
    metricLabel: 'Organic Conversion',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1200',
    summary: 'Complete brand repositioning and editorial paid social strategy for a heritage leather goods brand.',
  },
  {
    id: '02',
    title: 'Verde Architecture',
    category: 'Identity & Performance Scaling',
    year: '2025',
    metric: '3.4x',
    metricLabel: 'ROAS Delivered',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200',
    summary: 'Refined B2B lead generation pipeline and digital presence for sustainable architecture leaders.',
  },
  {
    id: '03',
    title: 'NORDIC Audio Tech',
    category: 'Product Launch & Global Strategy',
    year: '2024',
    metric: '$4.2M',
    metricLabel: 'Launch Revenue',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=1200',
    summary: 'Global direct-to-consumer launch strategy for high-fidelity noise-canceling headphones.',
  },
  {
    id: '04',
    title: 'Maison Solstice',
    category: 'Content Architecture & Paid Social',
    year: '2024',
    metric: '2.1M',
    metricLabel: 'Qualified Reach',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=1200',
    summary: 'High-craft editorial video series and social media campaign driving high-ticket organic sales.',
  },
];

const servicesPreview = [
  {
    num: '01',
    title: 'Brand Positioning',
    description: 'We refine brand narratives to essential truths, creating memorable market positioning that naturally demands higher equity.',
    tags: ['Narrative', 'Identity', 'Equity'],
  },
  {
    num: '02',
    title: 'Performance Marketing',
    description: 'Data-guided multi-channel acquisition built for sustainable profitability rather than vanity spend spikes.',
    tags: ['Meta Paid', 'Google Search', 'Funnel Scaling'],
  },
  {
    num: '03',
    title: 'Content & Editorial',
    description: 'High-craft storytelling and visual assets designed to build long-term brand equity while driving active customer desire.',
    tags: ['Art Direction', 'Film', 'Copywriting'],
  },
  {
    num: '04',
    title: 'Web & Digital Experience',
    description: 'High-conversion, typography-led digital flagship websites engineered with fluid animations and responsive performance.',
    tags: ['Next.js App', 'GSAP Motion', 'E-Commerce'],
  },
];

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const horizontalSectionRef = useRef<HTMLDivElement>(null);
  const horizontalTrackRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const servicesGridRef = useRef<HTMLDivElement>(null);

  // Direct DOM refs for zero-re-render scroll progress bar updates
  const progressTextRef = useRef<HTMLSpanElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  // Hero entrance reveal
  useGSAP(() => {
    if (!heroTitleRef.current) return;
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from(heroTitleRef.current!.children, {
        y: 80,
        opacity: 0,
        duration: 1.2,
        stagger: 0.18,
        ease: 'power3.out',
        delay: 0.2,
      });

      gsap.from('.hero-sub', {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.8,
        ease: 'power2.out',
      });
    });
  }, { scope: heroRef });

  // Pinned Horizontal Scroll — desktop & mobile
  useGSAP(() => {
    if (!horizontalSectionRef.current || !horizontalTrackRef.current) return;
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const track = horizontalTrackRef.current!;
      const section = horizontalSectionRef.current!;

      // Use a function for end so it recalculates on refresh
      // (after images load, fonts render, etc.)
      const getScrollDistance = () => {
        return track.scrollWidth - window.innerWidth;
      };

      gsap.to(track, {
        x: () => -getScrollDistance(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          pin: true,
          anticipatePin: 1,
          scrub: 0.5,
          start: 'top top',
          end: () => `+=${getScrollDistance()}`,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const pct = Math.round(self.progress * 100);
            if (progressTextRef.current) {
              progressTextRef.current.textContent = `${pct}%`;
            }
            if (progressBarRef.current) {
              progressBarRef.current.style.width = `${pct}%`;
            }
          },
        },
      });
    });
  }, { scope: horizontalSectionRef });

  // Ensure ScrollTrigger recalculates after all assets are loaded
  useEffect(() => {
    const refreshST = () => {
      ScrollTrigger.refresh();
    };

    // Refresh after fonts/images finish loading
    if (document.readyState === 'complete') {
      // Already loaded, still do a delayed refresh for layout settle
      setTimeout(refreshST, 200);
    } else {
      window.addEventListener('load', refreshST);
    }

    // Also refresh after a generous delay to catch late-loading images
    const fallbackTimer = setTimeout(refreshST, 1500);

    return () => {
      window.removeEventListener('load', refreshST);
      clearTimeout(fallbackTimer);
    };
  }, []);

  // Service cards — GSAP batch reveal (replaces framer-motion)
  useGSAP(() => {
    if (!servicesGridRef.current) return;
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // Set initial state
      gsap.set('.service-card', { opacity: 0, y: 50 });

      ScrollTrigger.batch('.service-card', {
        onEnter: (elements) => {
          gsap.to(elements, {
            opacity: 1,
            y: 0,
            duration: 0.65,
            stagger: 0.12,
            ease: 'power2.out',
            overwrite: true,
          });
        },
        start: 'top 85%',
        once: true,
      });
    });
  }, { scope: servicesGridRef });

  // Stats reveal
  useGSAP(() => {
    if (!revealRef.current) return;
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from('.stat-card', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: revealRef.current,
          start: 'top 80%',
        },
      });
    });
  }, { scope: revealRef });

  return (
    <div className="overflow-x-hidden bg-ivory text-ink">
      {/* HERO SECTION */}
      <section
        ref={heroRef}
        className="relative min-h-screen bg-ink text-ivory flex flex-col justify-start overflow-hidden"
      >
        {/* Radial Gradient Ambient Accent */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[300px] sm:w-[500px] md:w-[700px] h-[300px] sm:h-[500px] md:h-[700px] bg-[radial-gradient(circle_at_center,rgba(74,106,64,0.22)_0%,transparent_70%)] pointer-events-none" />

        <div className="w-full flex-1 flex flex-col justify-center px-5 sm:px-8 md:px-12 pt-28 sm:pt-32 md:pt-36 pb-8 relative z-10">
          <h1
            ref={heroTitleRef}
            className="font-serif w-full leading-[0.85] tracking-[-0.04em]"
            style={{ fontSize: 'clamp(4.5rem, 14vw, 18rem)' }}
          >
            <span className="block font-normal">Quiet Power.</span>
            <span className="block text-primary italic font-normal mt-1 sm:mt-2">Loud Impact.</span>
          </h1>

          <div className="hero-sub mt-8 sm:mt-12 border-t border-ivory/10 pt-6 sm:pt-8 max-w-2xl">
            <p className="text-base sm:text-lg md:text-xl text-ivory/70 font-light leading-relaxed">
              Branvoy is an editorial digital agency engineered for brands that prefer measurable authority over volume. We craft restrained campaigns that convert deeply.
            </p>
            <div className="mt-6 sm:mt-8">
              <Link
                href="/work"
                className="inline-flex items-center gap-3 px-7 py-3.5 bg-primary text-ivory rounded-full text-xs font-semibold uppercase tracking-widest hover:bg-ivory hover:text-ink transition-all duration-300 shadow-xl shadow-primary/20"
              >
                <span>View Portfolio</span>
                <span className="text-base">→</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Hero Bottom Bar */}
        <div className="w-full px-5 sm:px-8 md:px-12 py-6 sm:py-8 border-t border-ivory/10 flex flex-col sm:flex-row items-start sm:items-center justify-between text-[11px] sm:text-xs text-ivory/40 gap-3 sm:gap-4 font-mono">
          <div>DUBAI, UAE</div>
          <div>EST. 2022</div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary" />
            <span>SCROLL TO EXPLORE ARCHIVE</span>
          </div>
        </div>
      </section>

      {/* EDITORIAL STATEMENT BEAT */}
      <section className="py-16 sm:py-20 md:py-24 px-5 sm:px-8 md:px-12 bg-ivory text-ink relative">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
          <div className="md:col-span-4 md:sticky md:top-28">
            <FadeUp>
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-primary font-bold">
                01 / Our Philosophy
              </span>
            </FadeUp>
            <RevealText
              text="In an oversaturated market, precision is the ultimate advantage."
              as="h2"
              className="font-serif text-2xl sm:text-3xl md:text-4xl mt-3 sm:mt-4 leading-tight"
              delay={0.1}
              stagger={0.04}
            />
          </div>

          <div className="md:col-span-8 space-y-6 sm:space-y-8 text-ink/80 text-base sm:text-lg md:text-xl leading-relaxed font-light">
            <FadeUp delay={0.2} y={30}>
              <p className="first-letter:text-4xl sm:first-letter:text-5xl first-letter:font-serif first-letter:text-primary first-letter:mr-3 first-letter:float-left first-letter:leading-none">
                Most marketing agencies scale by doing more—more ads, more noise, more budget friction. We scale by doing what actually works: relentless strategic clarity, elevated visual typography, and data-proven media buying.
              </p>
            </FadeUp>
            <FadeUp delay={0.35} y={30}>
              <p className="text-ink font-normal clear-both">
                We partner selectively with ambitious founders and established enterprises who value understated authority and enduring return on ad spend.
              </p>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* CASE STUDIES SECTION
          - Pinned horizontal scroll for both desktop and mobile */}
      <section
        ref={horizontalSectionRef}
        className="relative bg-ink text-ivory overflow-hidden"
        style={{ touchAction: 'pan-y' }}
      >
        {/* Header always visible */}
        <div className="px-5 sm:px-8 md:px-12 pt-16 sm:pt-20 md:pt-24 pb-4 sm:pb-6 z-30 flex items-center justify-between border-b border-ivory/10 w-full max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-primary font-bold">
              02 / Featured Case Studies
            </span>
            <span className="text-xs text-ivory/60 font-mono hidden sm:inline">
              [ PINNED HORIZONTAL ARCHIVE ]
            </span>
          </div>

          {/* Progress bar — visible on mobile and desktop */}
          <div className="flex items-center gap-3 sm:gap-4">
            <span ref={progressTextRef} className="text-xs font-mono text-ivory/80 font-medium">
              0%
            </span>
            <div className="w-24 sm:w-36 md:w-48 h-1.5 bg-ivory/20 rounded-full overflow-hidden">
              <div
                ref={progressBarRef}
                className="h-full bg-primary rounded-full"
                style={{ width: '0%', transition: 'none' }}
              />
            </div>
          </div>
        </div>

        {/* Outer wrapper for pinned horizontal scroll */}
        <div className="min-h-[70vh] md:min-h-screen flex flex-col justify-center py-6 md:py-0">
          <div
            ref={horizontalTrackRef}
            className="
              flex gap-5 sm:gap-6 md:gap-10
              px-5 sm:px-8 md:px-16
              items-center
              w-max
              h-[68vh] sm:h-[70vh] md:h-[72vh] min-h-[450px] md:min-h-[420px] md:max-h-[580px]
            "
          >
            {/* Introductory Card */}
            <div className="case-scroll-card w-[88vw] sm:w-[65vw] md:w-[38vw] lg:w-[32vw] flex-shrink-0 flex flex-col justify-between p-6 sm:p-8 md:p-10 border border-ivory/15 bg-ivory/5 backdrop-blur-sm md:backdrop-blur-md rounded-sm h-full min-h-[440px] md:min-h-0 relative overflow-hidden">
              <div className="absolute -right-4 -bottom-4 font-serif text-7xl md:text-8xl text-ivory/5 select-none pointer-events-none">
                00
              </div>
              <div>
                <span className="text-xs font-mono text-primary font-bold uppercase tracking-widest">
                  Selected Portfolio
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-ivory mt-4 sm:mt-6 leading-tight">
                  Case studies built on proof, not promises.
                </h3>
              </div>
              <div className="space-y-4 relative z-10">
                <p className="text-xs sm:text-sm text-ivory/70 leading-relaxed font-light">
                  Explore how our minimalist visual systems and razor-sharp digital targeting translated into verified market leadership.
                </p>
                <div className="text-[10px] sm:text-xs font-mono text-ivory/40 uppercase tracking-widest">
                  Scroll down to explore →
                </div>
              </div>
            </div>

            {/* Case Cards */}
            {featuredCases.map((item) => (
              <div
                key={item.id}
                className="case-scroll-card w-[88vw] sm:w-[70vw] md:w-[46vw] lg:w-[40vw] flex-shrink-0 h-full min-h-[440px] md:min-h-0 group relative flex flex-col justify-between p-6 sm:p-8 md:p-10 border border-ivory/15 bg-ivory/5 rounded-sm hover:border-primary/50 transition-colors duration-300 overflow-hidden shadow-2xl"
              >
                {/* Background Watermark Index */}
                <div className="absolute top-4 right-6 sm:right-8 font-serif text-5xl sm:text-6xl md:text-7xl text-ivory/10 font-bold select-none pointer-events-none group-hover:text-primary/20 transition-colors">
                  {item.id}
                </div>

                {/* Duotone Background Image Container */}
                <div className="absolute inset-0 duotone opacity-55 md:opacity-40 group-hover:opacity-75 transition-opacity duration-500 pointer-events-none">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 88vw, 42vw"
                  />
                </div>

                <div className="relative z-10 flex justify-between items-start">
                  <span className="font-mono text-xs text-primary font-bold bg-ink/80 px-3 py-1 rounded-full border border-primary/30">
                    {item.id}
                  </span>
                  <span className="text-xs uppercase tracking-wider text-ivory/80 bg-ink/80 px-3 py-1 rounded-full border border-ivory/10 font-mono">
                    {item.year}
                  </span>
                </div>

                <div className="relative z-10 my-auto py-3 sm:py-5">
                  <div className="text-[10px] sm:text-xs uppercase tracking-widest font-mono text-primary mb-1.5">
                    {item.category}
                  </div>
                  <h4 className="font-serif text-2xl sm:text-3xl md:text-4xl text-ivory group-hover:text-primary transition-colors duration-300">
                    {item.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-ivory/80 mt-2 max-w-md font-light leading-relaxed">
                    {item.summary}
                  </p>
                </div>

                <div className="relative z-10 pt-4 border-t border-ivory/20 flex items-center justify-between bg-ink/40 p-4 sm:p-5 -mx-6 sm:-mx-8 md:-mx-10 -mb-6 sm:-mb-8 md:-mb-10 rounded-b-sm">
                  <div>
                    <div className="font-serif text-2xl sm:text-3xl md:text-4xl text-ivory font-normal">
                      {item.metric}
                    </div>
                    <div className="text-[10px] font-mono text-ivory/60 uppercase tracking-wider">
                      {item.metricLabel}
                    </div>
                  </div>

                  <Link
                    href="/work"
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-ivory/30 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all duration-300"
                  >
                    <span className="text-ivory text-base sm:text-lg">→</span>
                  </Link>
                </div>
              </div>
            ))}

            {/* Outro CTA Card */}
            <div className="case-scroll-card w-[88vw] sm:w-[65vw] md:w-[36vw] lg:w-[28vw] flex-shrink-0 flex flex-col justify-center items-center text-center p-6 sm:p-8 md:p-10 border border-primary/50 bg-primary/10 rounded-sm h-full min-h-[440px] md:min-h-0">
              <span className="font-serif text-2xl sm:text-3xl md:text-4xl text-ivory mb-6 leading-tight">
                Ready for measurable market authority?
              </span>
              <Link
                href="/contact"
                className="px-6 sm:px-8 py-3.5 sm:py-4 bg-primary text-ivory rounded-full text-xs font-semibold uppercase tracking-widest hover:bg-ivory hover:text-ink transition-all duration-300"
              >
                Start Project Inquiry →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES OVERVIEW BEAT */}
      <section className="py-16 sm:py-20 md:py-24 px-5 sm:px-8 md:px-12 bg-ivory text-ink">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-14 gap-6 sm:gap-8 border-b border-ink/10 pb-6">
            <div>
              <FadeUp>
                <span className="text-xs font-mono uppercase tracking-[0.25em] text-primary font-bold">
                  03 / Capabilities
                </span>
              </FadeUp>
              <RevealText
                text="Services designed for clarity & scale."
                as="h2"
                className="font-serif text-2xl sm:text-4xl md:text-5xl mt-2 sm:mt-3"
                delay={0.1}
                stagger={0.04}
              />
            </div>
            <FadeUp delay={0.2}>
              <Link
                href="/services"
                className="text-xs uppercase font-mono tracking-widest font-semibold text-primary hover:text-ink transition-colors duration-300 flex items-center gap-2"
              >
                <span>Explore All Capabilities</span>
                <span>→</span>
              </Link>
            </FadeUp>
          </div>

          <div ref={servicesGridRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {servicesPreview.map((service) => (
              <div
                key={service.num}
                className="service-card p-6 sm:p-8 border border-ink/10 bg-white/70 hover:bg-sage-tint/60 transition-colors duration-300 rounded-sm flex flex-col justify-between group shadow-sm hover:shadow-md h-full"
              >
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 sm:mb-6">
                    <span className="font-mono text-sm text-primary font-bold">{service.num}</span>
                    <div className="flex flex-wrap gap-1.5 justify-start sm:justify-end">
                      {service.tags.map((tag) => (
                        <span key={tag} className="text-[10px] uppercase tracking-wider font-mono text-ink/50 bg-sage-tint px-2 py-0.5 rounded-sm">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl text-ink mb-2.5 sm:mb-3 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-ink/70 text-sm md:text-base leading-relaxed font-light">
                    {service.description}
                  </p>
                </div>
                <div className="mt-6 pt-5 border-t border-ink/10 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-ink/50 uppercase tracking-widest">
                    DIRECT ROI FOCUS
                  </span>
                  <Link
                    href="/services"
                    className="text-xs font-semibold uppercase tracking-wider text-primary group-hover:translate-x-1 transition-transform"
                  >
                    Explore details →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* METRICS & PROOF */}
      <section ref={revealRef} className="py-16 sm:py-20 bg-ink text-ivory px-5 sm:px-8 md:px-12 border-t border-ivory/10">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-ivory/10 border-y border-ivory/10">
            <div className="stat-card p-6 sm:p-8 flex flex-col justify-between h-full">
              <div>
                <div className="font-serif text-4xl sm:text-5xl lg:text-6xl text-primary font-normal">94%</div>
                <div className="text-xs uppercase font-mono tracking-widest text-ivory/70 mt-3 sm:mt-4">Client Retention Rate</div>
              </div>
              <p className="text-xs text-ivory/40 mt-3 font-light">Long-term partnerships built on transparent reporting.</p>
            </div>

            <div className="stat-card p-6 sm:p-8 flex flex-col justify-between h-full">
              <div>
                <div className="font-serif text-4xl sm:text-5xl lg:text-6xl text-ivory font-normal">$48M+</div>
                <div className="text-xs uppercase font-mono tracking-widest text-ivory/70 mt-3 sm:mt-4">Client Revenue Generated</div>
              </div>
              <p className="text-xs text-ivory/40 mt-3 font-light">Directly attributed performance scale.</p>
            </div>

            <div className="stat-card p-6 sm:p-8 flex flex-col justify-between h-full">
              <div>
                <div className="font-serif text-4xl sm:text-5xl lg:text-6xl text-primary font-normal">3.8x</div>
                <div className="text-xs uppercase font-mono tracking-widest text-ivory/70 mt-3 sm:mt-4">Average Blended ROAS</div>
              </div>
              <p className="text-xs text-ivory/40 mt-3 font-light">Across paid social &amp; search campaigns.</p>
            </div>

            <div className="stat-card p-6 sm:p-8 flex flex-col justify-between h-full">
              <div>
                <div className="font-serif text-4xl sm:text-5xl lg:text-6xl text-ivory font-normal">14</div>
                <div className="text-xs uppercase font-mono tracking-widest text-ivory/70 mt-3 sm:mt-4">Global Industry Awards</div>
              </div>
              <p className="text-xs text-ivory/40 mt-3 font-light">Recognized for editorial aesthetic &amp; strategy.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-16 sm:py-24 md:py-28 px-5 sm:px-8 md:px-12 bg-ivory text-ink text-center">
        <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
          <FadeUp>
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-primary font-bold">
              Let&apos;s Collaborate
            </span>
          </FadeUp>

          <RevealText
            text="Ready for quiet confidence in your growth?"
            as="h2"
            className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight"
            delay={0.1}
            stagger={0.05}
            duration={0.85}
          />

          <FadeUp delay={0.4} y={25}>
            <p className="text-ink/70 text-base sm:text-lg md:text-xl font-light max-w-2xl mx-auto">
              We take on a maximum of three new partner accounts per quarter to guarantee uncompromised focus.
            </p>
          </FadeUp>
          <FadeUp delay={0.55}>
            <div className="pt-2 sm:pt-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 sm:gap-4 px-8 sm:px-10 py-3.5 sm:py-4 bg-ink text-ivory rounded-full text-xs uppercase tracking-widest font-semibold hover:bg-primary transition-colors duration-300 shadow-2xl"
              >
                <span>Initiate A Conversation</span>
                <span>→</span>
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>
    </div>
  );
}
