'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FadeUp } from '@/components/animations/FadeUp';
import { RevealText } from '@/components/animations/RevealText';

const services = [
  {
    id: '01',
    title: 'Brand Strategy & Positioning',
    tagline: 'Definitive clarity in crowded markets.',
    description:
      'We extract your brand core and translate it into a compelling market narrative. Our strategic frameworks eliminate ambiguity and set the foundation for long-term category equity.',
    deliverables: [
      'Brand Identity & Narrative Architecture',
      'Market & Competitor Positioning',
      'Tone of Voice & Messaging Systems',
      'Brand Visual Guidelines',
    ],
  },
  {
    id: '02',
    title: 'Performance Marketing & Paid Media',
    tagline: 'Capital allocation tuned for profitable growth.',
    description:
      'We run multi-channel paid acquisition with absolute financial discipline. No vanity metrics or bloated ad budgets—just clear CAC-to-LTV ratio scaling across Meta, Google, and emerging platforms.',
    deliverables: [
      'Paid Social (Meta, TikTok, LinkedIn)',
      'Search Engine Marketing (Google, Bing)',
      'Funnel Conversion Optimization',
      'Attribution & Custom Dashboards',
    ],
  },
  {
    id: '03',
    title: 'Content & Editorial Production',
    tagline: 'High-craft storytelling that commands attention.',
    description:
      'We produce editorial-grade video, photography, and written assets designed to elevate brand perception while driving immediate audience response.',
    deliverables: [
      'Editorial Photography & Art Direction',
      'Short-Form & Campaign Video',
      'Copywriting & Content Architecture',
      'Social Content Systems',
    ],
  },
  {
    id: '04',
    title: 'Web & Digital Product Design',
    tagline: 'Fast, quiet, elegant digital flagships.',
    description:
      'We build high-converting websites and digital experiences engineered with Next.js and GSAP micro-animations. Generous whitespace, refined typography, and sub-second load times.',
    deliverables: [
      'Next.js & React Web Applications',
      'Headless E-commerce Solutions',
      'Interactive Micro-Animations & GSAP',
      'SEO & Performance Audits',
    ],
  },
];

const processSteps = [
  {
    step: '01',
    name: 'Diagnostic & Capital Audit',
    text: 'We dissect your unit economics, ad account architecture, CAC benchmark, and attribution models to eliminate spend waste and locate maximum leverage.',
    duration: 'WEEK 1',
    focus: 'Unit Economics & CAC Audit',
    tags: ['Analytics', 'Attribution', 'CAC Benchmark'],
  },
  {
    step: '02',
    name: 'Positioning & Messaging',
    text: 'We define your brand’s unassailable market positioning and tone of voice. No fluff—just sharp narrative clarity that commands category authority.',
    duration: 'WEEK 2',
    focus: 'Category Equity & Narrative',
    tags: ['Identity', 'Messaging', 'Positioning'],
  },
  {
    step: '03',
    name: 'Creative & Art Direction',
    text: 'Our team produces high-craft video assets, editorial photography, and copywriting tailored for direct conversion and long-term brand equity.',
    duration: 'WEEKS 2–3',
    focus: 'Editorial Video & Asset Systems',
    tags: ['Film', 'Art Direction', 'Copywriting'],
  },
  {
    step: '04',
    name: 'Media Buying & Funnel Scale',
    text: 'We launch disciplined paid acquisition campaigns across Meta, Search, and high-conversion landing flagships built with sub-second Next.js speed.',
    duration: 'WEEKS 3–4',
    focus: 'Multi-Channel Acquisition',
    tags: ['Meta Paid', 'Google Search', 'Next.js Flagship'],
  },
  {
    step: '05',
    name: 'Retainer & Yield Compounding',
    text: 'Senior partner involvement on weekly reviews, continuous creative refreshes, and audience expansion for sustainable, profitable revenue compounding.',
    duration: 'ONGOING',
    focus: 'Compounding Revenue',
    tags: ['ROAS Scaling', 'Partner Review', 'Yield Optimization'],
  },
];

// Vertical Execution Ribbon Timeline component
function ExecutionTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 70%', 'end 90%'],
  });

  const ribbonScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={containerRef} className="relative max-w-5xl mx-auto pt-8 pb-12">
      {/* Background Vertical Line Track */}
      <div className="absolute top-10 bottom-10 left-4 sm:left-8 md:left-12 w-0.5 bg-ivory/15" />

      {/* Animated Glowing Ribbon Line following scroll */}
      <motion.div
        style={{ scaleY: ribbonScaleY, originY: 0 }}
        className="absolute top-10 bottom-10 left-4 sm:left-8 md:left-12 w-1 bg-gradient-to-b from-primary via-primary-light to-primary rounded-full shadow-[0_0_12px_rgba(74,106,64,0.9)] z-10"
      />

      {/* Timeline Step Items */}
      <div className="space-y-16 sm:space-y-24">
        {processSteps.map((step, i) => (
          <motion.div
            key={step.step}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative pl-12 sm:pl-20 md:pl-28 group"
          >
            {/* Glowing Node Dot on Ribbon */}
            <div className="absolute left-4 sm:left-8 md:left-12 top-2 -translate-x-1/2 z-20 flex items-center justify-center">
              <motion.div
                initial={{ scale: 0.6, opacity: 0.5 }}
                whileInView={{ scale: 1.2, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="w-4 h-4 rounded-full bg-primary border-2 border-ink shadow-[0_0_10px_rgba(74,106,64,0.8)]"
              />
            </div>

            {/* Step Content */}
            <div className="border-b border-ivory/10 pb-12">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span className="font-mono text-xs font-bold text-primary bg-primary/20 border border-primary/40 px-3 py-1 rounded-full">
                  PHASE {step.step}
                </span>
                <span className="text-[10px] font-mono text-ivory/60 uppercase tracking-widest bg-white/5 px-2.5 py-1 rounded-sm">
                  {step.duration}
                </span>
              </div>

              <h3 className="font-serif text-2xl sm:text-4xl md:text-5xl text-ivory mt-2 font-normal leading-tight">
                {step.name}
              </h3>

              <div className="text-xs font-mono text-primary uppercase tracking-wider mt-2 mb-4 font-semibold">
                {step.focus}
              </div>

              <p className="text-ivory/80 text-base sm:text-lg font-light leading-relaxed max-w-3xl mb-6">
                {step.text}
              </p>

              {/* Aesthetic Tags */}
              <div className="flex flex-wrap gap-2">
                {step.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] sm:text-xs uppercase font-mono tracking-wider text-ivory/70 bg-ivory/5 border border-ivory/10 px-3 py-1 rounded-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default function ServicesPage() {
  return (
    <div className="pt-28 sm:pt-32 pb-20 sm:pb-24 bg-ivory text-ink min-h-screen overflow-x-hidden">
      {/* Header */}
      <section className="px-6 sm:px-8 md:px-12 max-w-7xl mx-auto mb-16 sm:mb-24 md:mb-36">
        <FadeUp delay={0}>
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-primary font-bold">
            Capabilities &amp; Expertise
          </span>
        </FadeUp>

        <RevealText
          text="Capabilities engineered for lasting influence."
          as="h1"
          className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl mt-4 sm:mt-6 max-w-5xl leading-[1.02] sm:leading-[0.98]"
          delay={0.1}
          stagger={0.05}
          duration={0.9}
        />

        <FadeUp delay={0.35} y={30}>
          <p className="mt-6 sm:mt-8 text-ink/85 text-base sm:text-xl md:text-2xl font-light max-w-2xl leading-relaxed">
            We combine high-end editorial aesthetics with rigorous performance analytics to build brand equity that converts into measurable revenue.
          </p>
        </FadeUp>
      </section>

      {/* Services List with Sticky Headings */}
      <section className="px-6 sm:px-8 md:px-12 max-w-7xl mx-auto space-y-16 sm:space-y-24 md:space-y-36 mb-24 sm:mb-36">
        {services.map((s) => (
          <div
            key={s.id}
            className="service-block grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 md:gap-12 pt-8 sm:pt-12 border-t border-ink/15 items-start"
          >
            {/* Left Column Sticky Header */}
            <div className="md:col-span-4 flex flex-col justify-between md:sticky md:top-28 self-start z-10">
              <div>
                <span className="font-mono text-xs font-bold text-primary bg-sage-tint px-3 py-1 rounded-full w-fit">
                  SERVICE {s.id}
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl md:text-5xl text-ink mt-4 leading-tight">
                  {s.title}
                </h2>
              </div>
              <p className="text-base sm:text-xl font-serif italic text-primary mt-4 sm:mt-6">
                &ldquo;{s.tagline}&rdquo;
              </p>
            </div>

            {/* Right Column Content */}
            <FadeUp className="md:col-span-8" delay={0.1}>
              <div className="space-y-6 sm:space-y-8 bg-white/60 border border-ink/10 p-6 sm:p-8 md:p-12 rounded-sm shadow-sm">
                <p className="text-ink/80 text-base sm:text-lg md:text-xl leading-relaxed font-light">
                  {s.description}
                </p>

                <div>
                  <h4 className="text-xs uppercase font-mono tracking-widest font-bold text-ink/50 mb-3 sm:mb-4">
                    Core Deliverables
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    {s.deliverables.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 p-3.5 sm:p-4 bg-sage-tint/40 border border-ink/5 rounded-sm text-xs sm:text-sm text-ink font-medium"
                      >
                        <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>
        ))}
      </section>

      {/* Our Process — Vertical Scroll-Driven Ribbon Text Reveal (NO CARDS) */}
      <section className="bg-ink text-ivory py-20 sm:py-32 px-6 sm:px-8 md:px-12 border-t border-ivory/10 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6 border-b border-ivory/15 pb-8">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
                <span className="text-xs font-mono uppercase tracking-[0.25em] text-primary font-bold">
                  04 / Execution Framework
                </span>
              </div>
              <RevealText
                text="How we partner & execute."
                as="h2"
                className="font-serif text-3xl sm:text-5xl md:text-6xl text-ivory mt-2 leading-tight"
                stagger={0.04}
              />
            </div>
            <p className="text-ivory/80 text-sm md:text-base font-light max-w-md">
              A 5-phase systematic framework engineered for uncompromised brand equity and predictable financial return.
            </p>
          </div>

          {/* Vertical Ribbon Following Scroll Timeline */}
          <ExecutionTimeline />
        </div>
      </section>

      {/* CLIENT TESTIMONIALS & PERSPECTIVES BEAT */}
      <section className="py-20 sm:py-32 px-6 sm:px-8 md:px-12 bg-ivory text-ink border-t border-ink/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 border-b border-ink/10 pb-8">
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-primary font-bold">
                05 / Client Perspectives
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl mt-3 text-ink">
                What brand leaders say.
              </h2>
            </div>
            <p className="text-ink/80 text-sm md:text-base font-light max-w-md">
              Verifiable proof from founders and executives who chose restraint and performance over marketing noise.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FadeUp delay={0.1}>
              <div className="p-8 border border-ink/15 bg-white/80 rounded-sm flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group h-full">
                <span className="font-serif text-8xl text-primary/15 absolute -top-4 -right-2 select-none pointer-events-none group-hover:text-primary/25 transition-colors">
                  &ldquo;
                </span>
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-2 h-2 rounded-full bg-primary" />
                    <span className="text-[10px] uppercase font-mono tracking-widest text-primary font-bold">
                      +184% CONVERSION LIFT
                    </span>
                  </div>
                  <p className="font-serif text-xl sm:text-2xl text-ink leading-relaxed mb-6 italic">
                    &ldquo;Branvoy transformed our acquisition from chaotic ad spend into a highly predictable, editorial profit machine. They don&apos;t just run ads; they protect our equity.&rdquo;
                  </p>
                </div>
                <div className="pt-6 border-t border-ink/10 relative z-10 flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-sm text-ink">Alexander Vance</div>
                    <div className="text-xs text-ink/60 font-mono">CEO, Aethel Luxury Goods</div>
                  </div>
                  <span className="text-xs font-mono text-primary font-bold bg-sage-tint px-2.5 py-1 rounded-sm">LUXURY</span>
                </div>
              </div>
            </FadeUp>

            <FadeUp delay={0.2}>
              <div className="p-8 border border-ink/15 bg-white/80 rounded-sm flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group h-full">
                <span className="font-serif text-8xl text-primary/15 absolute -top-4 -right-2 select-none pointer-events-none group-hover:text-primary/25 transition-colors">
                  &ldquo;
                </span>
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-2 h-2 rounded-full bg-primary" />
                    <span className="text-[10px] uppercase font-mono tracking-widest text-primary font-bold">
                      3.4X BLENDED ROAS
                    </span>
                  </div>
                  <p className="font-serif text-xl sm:text-2xl text-ink leading-relaxed mb-6 italic">
                    &ldquo;The restraint and typography-driven visual identity they built for Verde instantly elevated our market positioning above legacy B2B competitors.&rdquo;
                  </p>
                </div>
                <div className="pt-6 border-t border-ink/10 relative z-10 flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-sm text-ink">Claire Hayes</div>
                    <div className="text-xs text-ink/60 font-mono">Managing Partner, Verde Architecture</div>
                  </div>
                  <span className="text-xs font-mono text-primary font-bold bg-sage-tint px-2.5 py-1 rounded-sm">B2B</span>
                </div>
              </div>
            </FadeUp>

            <FadeUp delay={0.3}>
              <div className="p-8 border border-ink/15 bg-white/80 rounded-sm flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group h-full">
                <span className="font-serif text-8xl text-primary/15 absolute -top-4 -right-2 select-none pointer-events-none group-hover:text-primary/25 transition-colors">
                  &ldquo;
                </span>
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-2 h-2 rounded-full bg-primary" />
                    <span className="text-[10px] uppercase font-mono tracking-widest text-primary font-bold">
                      $4.2M LAUNCH REVENUE
                    </span>
                  </div>
                  <p className="font-serif text-xl sm:text-2xl text-ink leading-relaxed mb-6 italic">
                    &ldquo;Their global product launch strategy delivered $4.2M in launch revenue with zero vanity spend spikes. Absolute financial and creative discipline.&rdquo;
                  </p>
                </div>
                <div className="pt-6 border-t border-ink/10 relative z-10 flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-sm text-ink">Erik Lindqvist</div>
                    <div className="text-xs text-ink/60 font-mono">VP of Growth, NORDIC Tech</div>
                  </div>
                  <span className="text-xs font-mono text-primary font-bold bg-sage-tint px-2.5 py-1 rounded-sm">TECH</span>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 sm:py-32 px-5 sm:px-8 md:px-12 max-w-[1400px] mx-auto text-center">
        <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-ink max-w-3xl mx-auto leading-tight mb-6 sm:mb-8">
          Require a tailored engagement model?
        </h2>
        <Link
          href="/contact"
          className="inline-flex items-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 bg-primary text-ivory rounded-full text-xs font-semibold uppercase tracking-widest hover:bg-ink transition-colors duration-300 shadow-xl shadow-primary/20"
        >
          Discuss Your Project Needs →
        </Link>
      </section>
    </div>
  );
}
