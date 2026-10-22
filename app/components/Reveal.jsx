'use client';

import { motion } from 'motion/react';
import { usePreferences } from './Preferences';

export default function Reveal({ children, className = '', delay = 0 }) {
  const { motionEnabled } = usePreferences();
  return (
    <motion.div
      className={className}
      initial={false}
      whileInView={motionEnabled ? { opacity: [0.35, 1], y: [24, 0] } : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
