'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ImageReveal } from '@/components/animations/ImageReveal';
import { FadeUp } from '@/components/animations/FadeUp';
import { RevealText } from '@/components/animations/RevealText';

const categories = ['All', 'Luxury', 'E-Commerce', 'Tech', 'B2B'];

const projects = [
  {
    id: 1,
    title: 'Aethel Luxury Goods',
    category: 'Luxury',
    services: 'Brand Identity & Performance',
    year: '2025',
    metric: '+184%',
    metricLabel: 'Conversion Lift',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1200',
    summary: 'Complete brand repositioning and editorial paid social strategy for a heritage leather goods brand.',
    clientQuote: 'Branvoy transformed our acquisition from chaotic ad spend into a highly predictable profit machine.',
    results: ['184% Organic conversion lift', '3.8x ROAS across Meta paid social', '$1.4M additional net ARR'],
  },
  {
    id: 2,
    title: 'Verde Architecture',
    category: 'B2B',
    services: 'Identity & Acquisition',
    year: '2025',
    metric: '3.4x',
    metricLabel: 'Blended ROAS',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200',
    summary: 'Refined B2B lead generation pipeline and digital presence for sustainable architecture leaders.',
    clientQuote: 'Their restraint and visual identity instantly elevated our market positioning above legacy competitors.',
    results: ['3.4x ROAS on LinkedIn & Search', '142 High-intent enterprise RFPs', '45% reduction in CAC'],
  },
  {
    id: 3,
    title: 'NORDIC Audio Tech',
    category: 'Tech',
    services: 'Product Launch & Global Paid Search',
    year: '2024',
    metric: '$4.2M',
    metricLabel: 'First Quarter Revenue',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=1200',
    summary: 'Global direct-to-consumer launch strategy for high-fidelity noise-canceling headphones.',
    clientQuote: 'Global D2C launch strategy delivered $4.2M in launch revenue with zero vanity spend spikes.',
    results: ['$4.2M total launch revenue', '28k units sold globally', '4.1x Google Search ROAS'],
  },
  {
    id: 4,
    title: 'Maison Solstice',
    category: 'Luxury',
    services: 'Content & Social Architecture',
    year: '2024',
    metric: '2.1M',
    metricLabel: 'Targeted Reach',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=1200',
    summary: 'High-craft editorial video series and social media campaign driving high-ticket organic sales.',
    clientQuote: 'The editorial video content built immediate authority with our high-net-worth audience.',
    results: ['2.1M qualified organic impressions', '64% repeat customer rate', '5.2x engagement rate lift'],
  },
  {
    id: 5,
    title: 'KROMA Skincare',
    category: 'E-Commerce',
    services: 'Full Funnel Growth',
    year: '2024',
    metric: '+240%',
    metricLabel: 'YoY Revenue Scale',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=1200',
    summary: 'Scaling D2C skincare via focused Meta creative testing and automated retargeting flows.',
    clientQuote: 'Scaled our daily orders 3x while actually improving our customer acquisition cost metrics.',
    results: ['240% YoY Revenue expansion', '$850k monthly ad spend scaled', '68% retention rate at 90 days'],
  },
  {
    id: 6,
    title: 'Veloce Mobility',
    category: 'Tech',
    services: 'Web Platform & Paid Acquisition',
    year: '2023',
    metric: '58k',
    metricLabel: 'App Installs',
    image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=1200',
    summary: 'Digital launch campaign for an urban micro-mobility provider operating across Europe.',
    clientQuote: 'Branvoy engineered our pan-European app install strategy with precision performance tracking.',
    results: ['58,000 verified app installs', '€2.10 Cost per acquisition', '12 European cities launched'],
  },
  {
    id: 7,
    title: 'Lumina Fine Jewelry',
    category: 'Luxury',
    services: 'High-Ticket E-Commerce Funnel',
    year: '2023',
    metric: '4.8x',
    metricLabel: 'Blended ROAS',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=1200',
    summary: 'Omnichannel campaign driving high-ticket bespoke jewelry bookings and private consultations.',
    clientQuote: 'Our average order value grew by 85% thanks to their bespoke digital consultation funnel.',
    results: ['4.8x ROAS delivered', '$3,400 Average order value', '92% consultation booking rate'],
  },
  {
    id: 8,
    title: 'Solis Energy Systems',
    category: 'B2B',
    services: 'Commercial Solar Lead Engine',
    year: '2023',
    metric: '$8.5M',
    metricLabel: 'Pipeline Generated',
    image: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&q=80&w=1200',
    summary: 'Targeted account-based marketing and search campaign for industrial solar installations.',
    clientQuote: 'Generated the highest quality commercial lead pipeline in our company\'s 10-year history.',
    results: ['$8.5M qualified deal pipeline', '38 Commercial contracts closed', '6.2x Campaign ROI'],
  },
];

// Lightweight GPU-accelerated Focal Card Component
function ProjectCard({
  project,
  onSelect,
}: {
  project: (typeof projects)[0];
  onSelect: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0.7, scale: 0.94 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ margin: '-5% 0px -5% 0px', amount: 0.2 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      onClick={onSelect}
      className="group flex flex-col justify-between border border-ink/20 bg-white p-6 sm:p-8 rounded-sm shadow-lg hover:shadow-2xl transition-shadow duration-300 hover:border-primary cursor-pointer relative overflow-hidden will-change-transform"
    >
      <div className="flex flex-col flex-1">
        {/* Image Container with Cinematic Image Reveal */}
        <ImageReveal
          className="relative aspect-[16/10] w-full bg-gradient-to-br from-[#182617] to-[#0a1109] rounded-sm overflow-hidden mb-6 shadow-sm border border-ink/10"
          duration={0.8}
        >
          {project.image ? (
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center p-6 text-center">
              <span className="font-serif text-2xl text-ivory/40 italic">{project.title}</span>
            </div>
          )}
          <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="px-3 py-1.5 bg-ink text-ivory text-[10px] uppercase font-mono tracking-widest rounded-full border border-ivory/20 shadow-lg">
              View Case Study ↗
            </span>
          </div>
        </ImageReveal>

        <div className="flex justify-between items-center text-xs font-mono uppercase tracking-wider text-primary font-bold mb-3">
          <span className="bg-sage-tint px-2.5 py-1 rounded-sm">{project.category}</span>
          <span className="text-ink/60 font-semibold">{project.year}</span>
        </div>

        <h3 className="font-serif text-3xl sm:text-4xl text-ink group-hover:text-primary transition-colors duration-300 mb-2 font-normal leading-tight">
          {project.title}
        </h3>
        <p className="text-xs uppercase font-mono tracking-widest text-ink/70 mb-4 font-semibold">
          {project.services}
        </p>
        <p className="text-ink/85 text-sm sm:text-base leading-relaxed font-light mb-6 flex-1">
          {project.summary}
        </p>
      </div>

      <div className="mt-auto pt-5 border-t border-ink/10 flex items-center justify-between bg-sage-tint/40 p-4 -mx-6 -mb-6 sm:-mx-8 sm:-mb-8 rounded-b-sm">
        <div>
          <div className="font-serif text-3xl sm:text-4xl text-primary font-normal">
            {project.metric}
          </div>
          <div className="text-[10px] font-mono uppercase tracking-wider text-ink/80 font-semibold">
            {project.metricLabel}
          </div>
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onSelect();
          }}
          className="text-xs font-semibold uppercase tracking-wider text-ink group-hover:text-primary transition-colors duration-300 flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-ink/10 shadow-sm group-hover:border-primary"
        >
          <span>Case Details</span>
          <span className="text-sm">→</span>
        </button>
      </div>
    </motion.div>
  );
}

export default function WorkPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(null);

  const filteredProjects =
    activeCategory === 'All' ? projects : projects.filter((p) => p.category === activeCategory);

  return (
    <div className="pt-28 sm:pt-32 pb-0 bg-ivory text-ink min-h-screen relative overflow-x-hidden">
      {/* Header */}
      <section className="px-6 sm:px-8 md:px-12 max-w-7xl mx-auto mb-12 sm:mb-16">
        <FadeUp delay={0}>
          <div className="flex items-center gap-3 mb-4">
            <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-primary font-bold">
              Selected Portfolio &amp; Case Studies
            </span>
          </div>
        </FadeUp>

        <RevealText
          text="Proven outcomes by design."
          as="h1"
          className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl mt-2 leading-[1.02] sm:leading-[0.98] text-ink"
          delay={0.1}
          stagger={0.06}
          duration={0.9}
        />

        <FadeUp delay={0.3}>
          <p className="mt-4 sm:mt-6 text-ink/85 text-base sm:text-xl font-light max-w-2xl leading-relaxed">
            An editorial showcase of performance marketing campaigns and brand transformations built on clarity, restraint, and verified financial return.
          </p>
        </FadeUp>

        {/* Live Metrics Counter Bar */}
        <FadeUp delay={0.45}>
          <div className="mt-10 p-6 bg-white/90 border border-ink/10 rounded-sm grid grid-cols-2 md:grid-cols-4 gap-6 shadow-sm">
            <div>
              <div className="font-serif text-3xl sm:text-4xl text-primary font-normal">$48M+</div>
              <div className="text-[10px] uppercase font-mono tracking-wider text-ink/70 mt-1">Client Revenue Scaled</div>
            </div>
            <div>
              <div className="font-serif text-3xl sm:text-4xl text-ink font-normal">3.8x</div>
              <div className="text-[10px] uppercase font-mono tracking-wider text-ink/70 mt-1">Average Blended ROAS</div>
            </div>
            <div>
              <div className="font-serif text-3xl sm:text-4xl text-primary font-normal">94%</div>
              <div className="text-[10px] uppercase font-mono tracking-wider text-ink/70 mt-1">Client Retention Rate</div>
            </div>
            <div>
              <div className="font-serif text-3xl sm:text-4xl text-ink font-normal">100%</div>
              <div className="text-[10px] uppercase font-mono tracking-wider text-ink/70 mt-1">Verified Audit Growth</div>
            </div>
          </div>
        </FadeUp>
      </section>

      {/* Category Filters */}
      <section className="px-6 sm:px-8 md:px-12 max-w-7xl mx-auto mb-8 sm:mb-12 border-b border-ink/10 pb-6">
        <FadeUp>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {categories.map((cat) => {
                const count = cat === 'All' ? projects.length : projects.filter((p) => p.category === cat).length;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                      activeCategory === cat
                        ? 'bg-ink text-ivory shadow-lg scale-105'
                        : 'bg-sage-tint text-ink/80 hover:bg-primary hover:text-ivory'
                    }`}
                  >
                    <span>{cat}</span>
                    <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full ${
                      activeCategory === cat ? 'bg-primary text-ivory' : 'bg-ink/10 text-ink/60'
                    }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
            <div className="text-xs font-mono text-ink/50 uppercase tracking-widest hidden sm:block">
              Showing {filteredProjects.length} of {projects.length} Case Studies
            </div>
          </div>
        </FadeUp>
      </section>

      {/* Projects Focal Scroll Showcase Grid */}
      <section className="px-5 sm:px-8 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onSelect={() => setSelectedProject(project)}
            />
          ))}
        </div>
      </section>

      {/* Fully Responsive Interactive Case Study Detail Modal */}
      {selectedProject && (
        <motion.div
          className="fixed inset-0 z-50 bg-ink/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedProject(null)}
        >
          <motion.div
            className="bg-ivory border border-ink/20 max-w-2xl w-full max-h-[88vh] overflow-y-auto p-5 sm:p-8 md:p-10 rounded-sm shadow-2xl relative my-auto scrollbar-thin text-ink"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 w-9 h-9 rounded-full bg-ink/10 hover:bg-ink hover:text-ivory flex items-center justify-center text-base sm:text-lg font-bold transition-colors z-20 cursor-pointer"
            >
              ✕
            </button>

            <div className="flex items-center gap-2.5 mb-3 sm:mb-4 flex-wrap">
              <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-primary font-bold bg-sage-tint px-3 py-1 rounded-full">
                {selectedProject.category}
              </span>
              <span className="text-xs font-mono text-ink/60">{selectedProject.year} Archive</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl text-ink leading-tight mb-2 break-words">
              {selectedProject.title}
            </h2>
            <p className="text-[11px] sm:text-xs uppercase font-mono tracking-widest text-primary font-bold mb-5">
              {selectedProject.services}
            </p>

            <div className="relative aspect-[16/9] max-h-[240px] sm:max-h-[320px] w-full rounded-sm overflow-hidden mb-6 duotone">
              <Image
                src={selectedProject.image}
                alt={selectedProject.title}
                fill
                className="object-cover"
              />
            </div>

            <p className="text-ink/85 text-sm sm:text-base leading-relaxed font-light mb-6">
              {selectedProject.summary}
            </p>

            <div className="bg-sage-tint/60 border border-ink/10 p-4 sm:p-5 rounded-sm mb-6">
              <h4 className="text-[11px] sm:text-xs uppercase font-mono tracking-widest text-primary font-bold mb-3">
                Key Performance Outcomes
              </h4>
              <div className="space-y-2">
                {selectedProject.results.map((res, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm font-medium text-ink">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                    <span>{res}</span>
                  </div>
                ))}
              </div>
            </div>

            <blockquote className="border-l-2 border-primary pl-4 py-1 italic text-ink/80 text-xs sm:text-sm font-serif mb-6 sm:mb-8">
              &ldquo;{selectedProject.clientQuote}&rdquo;
            </blockquote>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full">
              <Link
                href="/contact"
                className="flex-1 text-center py-3.5 bg-primary text-ivory rounded-full text-xs uppercase font-mono font-semibold tracking-widest hover:bg-ink transition-colors"
              >
                Inquire Similar Campaign →
              </Link>
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="px-6 py-3.5 border border-ink/20 text-ink rounded-full text-xs uppercase font-mono font-semibold tracking-widest hover:bg-ink/5 cursor-pointer"
              >
                Close Preview
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* CTA */}
      <section className="mt-20 sm:mt-32 py-16 sm:py-24 bg-ink text-ivory px-6 sm:px-8 md:px-12 text-center">
        <div className="max-w-3xl mx-auto space-y-5 sm:space-y-6">
          <FadeUp>
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-primary font-bold">
              Partner With Us
            </span>
          </FadeUp>
          <RevealText
            text="Have a project in mind?"
            as="h2"
            className="font-serif text-3xl sm:text-4xl md:text-6xl text-ivory leading-tight"
            delay={0.1}
            stagger={0.07}
          />
          <FadeUp delay={0.3}>
            <p className="text-ivory/80 text-sm sm:text-base md:text-lg font-light max-w-xl mx-auto">
              We partner selectively with brands ready for quiet authority and verifiable returns.
            </p>
          </FadeUp>
          <FadeUp delay={0.4}>
            <div className="pt-3 sm:pt-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-ivory rounded-full text-xs font-semibold uppercase tracking-widest hover:bg-ivory hover:text-ink transition-colors duration-300 shadow-xl shadow-primary/20"
              >
                Start A Conversation →
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* INFINITE MARQUEE TICKER BEAT */}
      <section className="bg-[#091108] text-ivory py-6 overflow-hidden border-t border-b border-ivory/10 select-none">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-8 text-xs font-mono tracking-[0.3em] uppercase text-ivory/70 font-semibold">
          <span className="flex items-center gap-8">
            <span>QUIET POWER</span>
            <span className="text-primary">•</span>
            <span>LOUD IMPACT</span>
            <span className="text-primary">•</span>
            <span>MEASURED AUTHORITY</span>
            <span className="text-primary">•</span>
            <span>BRAND POSITIONING</span>
            <span className="text-primary">•</span>
            <span>PERFORMANCE MEDIA</span>
            <span className="text-primary">•</span>
            <span>DATA-PROVED GROWTH</span>
            <span className="text-primary">•</span>
            <span>EDITORIAL DESIGN</span>
            <span className="text-primary">•</span>
          </span>
          <span className="flex items-center gap-8">
            <span>QUIET POWER</span>
            <span className="text-primary">•</span>
            <span>LOUD IMPACT</span>
            <span className="text-primary">•</span>
            <span>MEASURED AUTHORITY</span>
            <span className="text-primary">•</span>
            <span>BRAND POSITIONING</span>
            <span className="text-primary">•</span>
            <span>PERFORMANCE MEDIA</span>
            <span className="text-primary">•</span>
            <span>DATA-PROVED GROWTH</span>
            <span className="text-primary">•</span>
            <span>EDITORIAL DESIGN</span>
            <span className="text-primary">•</span>
          </span>
        </div>
      </section>
    </div>
  );
}
