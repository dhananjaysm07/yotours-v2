'use client';

import React from 'react';
import { motion } from 'framer-motion';

const FadeUpAnimation = ({
  children,
  delay,
}: {
  children: React.ReactNode;
  delay: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 75 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  );
};

export default FadeUpAnimation;
