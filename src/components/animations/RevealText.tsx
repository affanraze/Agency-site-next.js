'use client';

import { motion, useReducedMotion } from 'framer-motion';

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
  const shouldReduce = useReducedMotion();
  const words = text.split(' ');

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduce ? 0 : stagger,
        delayChildren: shouldReduce ? 0 : delay,
      },
    },
  };

  const wordVariants = {
    hidden: {
      y: shouldReduce ? 0 : '110%',
      opacity: shouldReduce ? 1 : 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: shouldReduce ? 0.01 : duration,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <Tag className={className}>
      <motion.span
        className="inline"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once, amount: 0.2 }}
      >
        {words.map((word, i) => (
          <span
            key={i}
            className="inline-block overflow-hidden"
            style={{ verticalAlign: 'bottom' }}
          >
            <motion.span
              className={`inline-block ${wordClassName ?? ''}`}
              variants={wordVariants}
            >
              {word}
            </motion.span>
            {i < words.length - 1 && (
              <span className="inline-block">&nbsp;</span>
            )}
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
