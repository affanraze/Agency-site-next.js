'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { FadeUp } from '@/components/animations/FadeUp';
import { RevealText } from '@/components/animations/RevealText';
import { ImageReveal } from '@/components/animations/ImageReveal';

const principles = [
  {
    number: '01',
    title: 'Restraint as Power',
    text: 'We believe volume is the default reaction of uncertainty. When your value proposition is crystal clear, quiet presentation commands far more respect than aggressive hype.',
  },
  {
    number: '02',
    title: 'Evidence Over Noise',
    text: 'Every strategic recommendation we make is anchored in verifiable channel analytics and incremental yield data. We do not gamble with client capital.',
  },
  {
    number: '03',
    title: 'Selectivity & Focus',
    text: 'We restrict our client roster to a maximum of 12 active brand partners annually. This ensures senior partner involvement on every campaign without delegation layer decay.',
  },
];

const team = [
  {
    name: 'Team Member 1',
    role: 'Founder & CEO',
    image: '/team/team-1.jpg',
  },
  {
    name: 'Team Member 2',
    role: 'Head of Strategy',
    image: '/team/team-2.jpg',
  },
  {
    name: 'Team Member 3',
    role: 'Creative Director',
    image: '/team/team-3.jpg',
  },
  {
    name: 'Team Member 4',
    role: 'Head of Performance Marketing',
    image: '/team/team-4.jpg',
  },
];

const EASE_OUT_EXPO = [0.76, 0, 0.24, 1] as const;
const EASE_OUT_SPRING = [0.16, 1, 0.3, 1] as const;

const principleVariants = {
  hidden: { opacity: 0, clipPath: 'inset(0% 0% 100% 0%)' },
  visible: (i: number) => ({
    opacity: 1,
    clipPath: 'inset(0% 0% 0% 0%)',
    transition: {
      duration: 0.75,
      delay: i * 0.15,
      ease: EASE_OUT_EXPO,
    },
  }),
};

const teamCardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: i * 0.12,
      ease: EASE_OUT_SPRING,
    },
  }),
};

function ParallaxHeroImage() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <div ref={ref} className="relative aspect-[16/9] sm:aspect-[21/9] w-full rounded-sm overflow-hidden shadow-2xl">
      <motion.div
        style={{ scale, width: '100%', height: '100%' }}
        className="absolute inset-0"
      >
        <div className="relative w-full h-full duotone">
          <Image
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1600"
            alt="Branvoy Studio Environment"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </motion.div>
    </div>
  );
}

export default function AboutPage() {
  return (
    <div className="pt-28 sm:pt-32 pb-0 bg-ivory text-ink min-h-screen overflow-x-hidden">
      {/* Header */}
      <section className="px-6 sm:px-8 md:px-12 max-w-7xl mx-auto mb-16 sm:mb-24 md:mb-32">
        <FadeUp delay={0}>
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-primary font-bold">
            About Branvoy
          </span>
        </FadeUp>

        <RevealText
          text="Built on the discipline of quiet authority."
          as="h1"
          className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl mt-4 sm:mt-6 max-w-5xl leading-[1.02] sm:leading-[0.98]"
          delay={0.1}
          stagger={0.05}
          duration={0.9}
        />

        <FadeUp delay={0.35} y={30}>
          <p className="mt-6 sm:mt-8 text-ink/85 text-base sm:text-xl md:text-2xl font-light max-w-3xl leading-relaxed">
            Branvoy is a boutique digital marketing and brand strategy agency based in Dubai. We combine restrained visual design with aggressive performance data to scale ambitious brands.
          </p>
        </FadeUp>
      </section>

      {/* Hero Image Section */}
      <section className="px-6 sm:px-8 md:px-12 max-w-7xl mx-auto mb-20 sm:mb-32">
        <ImageReveal duration={1.1}>
          <ParallaxHeroImage />
        </ImageReveal>
      </section>

      {/* Principles Section */}
      <section className="px-5 sm:px-8 md:px-12 max-w-[1400px] mx-auto mb-24 sm:mb-36">
        <div className="mb-12 sm:mb-16">
          <FadeUp>
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-primary font-bold">
              Core Beliefs
            </span>
          </FadeUp>
          <RevealText
            text="Our Operating Principles"
            as="h2"
            className="font-serif text-3xl sm:text-5xl md:text-6xl mt-3 sm:mt-4"
            delay={0.1}
            stagger={0.05}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 md:gap-12">
          {principles.map((p, i) => (
            <motion.div
              key={p.number}
              custom={i}
              variants={principleVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="p-6 sm:p-8 border border-ink/10 bg-white/70 rounded-sm flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                <span className="font-mono text-xs font-bold text-primary bg-sage-tint px-3 py-1 rounded-full w-fit">
                  PRINCIPLE {p.number}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-ink mt-5 sm:mt-6 mb-3 sm:mb-4">{p.title}</h3>
                <p className="text-ink/70 text-sm leading-relaxed font-light">{p.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Leadership Team */}
      <section className="bg-ink text-ivory py-20 sm:py-28 md:py-32 px-5 sm:px-8 md:px-12 mb-20 sm:mb-32 border-t border-ivory/10 relative overflow-hidden">
        <div className="max-w-7xl mx-auto w-full">
          <div className="mb-12 sm:mb-16 md:mb-20">
            <FadeUp>
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-primary font-bold">
                Leadership
              </span>
            </FadeUp>
            <RevealText
              text="Guided by experienced practitioners."
              as="h2"
              className="font-serif text-3xl sm:text-5xl md:text-6xl mt-3 sm:mt-4"
              delay={0.1}
              stagger={0.05}
            />
          </div>

          {/* 2-col on mobile, 4-col on lg — photos only, no bio overlap */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 md:gap-8 w-full">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                custom={i}
                variants={teamCardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                className="group flex flex-col bg-ivory/5 border border-ivory/10 rounded-sm overflow-hidden backdrop-blur-sm"
              >
                {/* Photo — fixed aspect ratio so bio never overlaps */}
                <div className="relative w-full aspect-[3/4] overflow-hidden flex-shrink-0">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                    priority={i < 2}
                  />
                  {/* Subtle gradient at bottom of photo */}
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink/80 to-transparent pointer-events-none" />
                </div>

                {/* Name & role — separate block below photo, never overlapping */}
                <div className="p-4 sm:p-5 flex-shrink-0">
                  <h3 className="font-serif text-lg sm:text-xl text-ivory leading-tight">{member.name}</h3>
                  <div className="text-[11px] text-primary font-mono uppercase tracking-wider mt-1 font-semibold">
                    {member.role}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 sm:px-8 md:px-12 max-w-7xl mx-auto text-center pb-20 sm:pb-28">
        <RevealText
          text="Interested in joining our partner roster?"
          as="h2"
          className="font-serif text-3xl sm:text-5xl md:text-6xl text-ink max-w-3xl mx-auto leading-tight mb-6 sm:mb-8"
          stagger={0.05}
        />
        <FadeUp delay={0.3}>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 bg-primary text-ivory rounded-full text-xs font-semibold uppercase tracking-widest hover:bg-ink transition-colors duration-300 shadow-xl shadow-primary/20"
          >
            Initiate Partner Inquiry →
          </Link>
        </FadeUp>
      </section>

      {/* INFINITE MARQUEE TICKER */}
      <section className="bg-[#091108] text-ivory py-6 overflow-hidden border-t border-b border-ivory/10 select-none">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-8 text-xs font-mono tracking-[0.3em] uppercase text-ivory/70 font-semibold">
          <span className="flex items-center gap-8">
            <span>DISCIPLINE</span>
            <span className="text-primary">•</span>
            <span>RESTRICTION</span>
            <span className="text-primary">•</span>
            <span>EVIDENCE OVER NOISE</span>
            <span className="text-primary">•</span>
            <span>SENIOR PARTNER FOCUS</span>
            <span className="text-primary">•</span>
            <span>DUBAI STUDIO</span>
            <span className="text-primary">•</span>
            <span>EST. 2022</span>
            <span className="text-primary">•</span>
          </span>
          <span className="flex items-center gap-8">
            <span>DISCIPLINE</span>
            <span className="text-primary">•</span>
            <span>RESTRICTION</span>
            <span className="text-primary">•</span>
            <span>EVIDENCE OVER NOISE</span>
            <span className="text-primary">•</span>
            <span>SENIOR PARTNER FOCUS</span>
            <span className="text-primary">•</span>
            <span>DUBAI STUDIO</span>
            <span className="text-primary">•</span>
            <span>EST. 2022</span>
            <span className="text-primary">•</span>
          </span>
        </div>
      </section>
    </div>
  );
}
