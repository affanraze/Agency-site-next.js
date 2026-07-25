'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

interface ImageRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  once?: boolean;
  direction?: 'up' | 'down' | 'left' | 'right';
}

const clipPathMap = {
  up: {
    hidden: 'inset(100% 0% 0% 0%)',
    visible: 'inset(0% 0% 0% 0%)',
  },
  down: {
    hidden: 'inset(0% 0% 100% 0%)',
    visible: 'inset(0% 0% 0% 0%)',
  },
  left: {
    hidden: 'inset(0% 100% 0% 0%)',
    visible: 'inset(0% 0% 0% 0%)',
  },
  right: {
    hidden: 'inset(0% 0% 0% 100%)',
    visible: 'inset(0% 0% 0% 0%)',
  },
};

export function ImageReveal({
  children,
  className,
  delay = 0,
  duration = 0.9,
  once = true,
  direction = 'up',
}: ImageRevealProps) {
  const shouldReduce = useReducedMotion();
  const { hidden, visible } = clipPathMap[direction];

  return (
    <motion.div
      className={className}
      style={{ overflow: 'hidden' }}
      initial={{ clipPath: shouldReduce ? visible : hidden }}
      whileInView={{ clipPath: visible }}
      viewport={{ once, amount: 0.1 }}
      transition={{
        duration: shouldReduce ? 0.01 : duration,
        delay: shouldReduce ? 0 : delay,
        ease: [0.76, 0, 0.24, 1] as const,
      }}
    >
      {/* Inner scale animation for Ken Burns feel */}
      <motion.div
        style={{ width: '100%', height: '100%' }}
        initial={{ scale: shouldReduce ? 1 : 1.08 }}
        whileInView={{ scale: 1 }}
        viewport={{ once, amount: 0.1 }}
        transition={{
          duration: shouldReduce ? 0.01 : duration + 0.3,
          delay: shouldReduce ? 0 : delay,
          ease: [0.16, 1, 0.3, 1] as const,
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
