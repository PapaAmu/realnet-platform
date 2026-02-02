'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  FaReact,
  FaNodeJs,
  FaDocker,
  FaHtml5,
  FaCss3Alt,
  FaWordpress,
  FaBootstrap,
  FaVuejs,
} from 'react-icons/fa';
import {
  SiTailwindcss,
  SiMysql,
  SiLaravel,
  SiMongodb,
  SiTypescript,
  SiVite,
  SiDjango,
  SiFlask,
  SiNextdotjs,
  SiPostgresql,
  SiRedis,
  SiGraphql,
} from 'react-icons/si';

const OurStack = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  const stack = {
    frontend: [
      { name: 'Next.js', icon: SiNextdotjs },
      { name: 'React', icon: FaReact },
      { name: 'TypeScript', icon: SiTypescript },
      { name: 'Tailwind', icon: SiTailwindcss },
      { name: 'Vue.js', icon: FaVuejs },
      { name: 'HTML5', icon: FaHtml5 },
    ],
    backend: [
      { name: 'Node.js', icon: FaNodeJs },
      { name: 'Laravel', icon: SiLaravel },
      { name: 'Django', icon: SiDjango },
      { name: 'GraphQL', icon: SiGraphql },
    ],
    data: [
      { name: 'PostgreSQL', icon: SiPostgresql },
      { name: 'MongoDB', icon: SiMongodb },
      { name: 'Redis', icon: SiRedis },
      { name: 'MySQL', icon: SiMysql },
    ],
    tools: [
      { name: 'Docker', icon: FaDocker },
      { name: 'Vite', icon: SiVite },
      { name: 'WordPress', icon: FaWordpress },
      { name: 'Bootstrap', icon: FaBootstrap },
    ],
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section
      ref={containerRef}
      className="relative py-24 lg:py-32 bg-white dark:bg-[#050505] transition-colors duration-300"
    >
      {/* Minimal background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-px bg-gray-200 dark:bg-white/10" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gray-200 dark:bg-white/10" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight mb-6">
            Technology Stack
          </h2>
          <p className="text-lg text-gray-600 dark:text-white/50 leading-relaxed">
            We use proven, modern technologies to build reliable, scalable solutions.
            No experimental frameworks—just tools that work.
          </p>
        </motion.div>

        {/* Stack Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8"
        >
          {Object.entries(stack).map(([category, items]) => (
            <motion.div key={category} variants={itemVariants}>
              <h3 className="text-sm font-semibold text-gray-400 dark:text-white/40 uppercase tracking-wider mb-6">
                {category}
              </h3>
              <ul className="space-y-4">
                {items.map((tech) => (
                  <li
                    key={tech.name}
                    className="group flex items-center gap-4 p-3 -mx-3 rounded-lg hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors"
                  >
                    <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <tech.icon className="w-5 h-5 text-gray-700 dark:text-white/70" />
                    </div>
                    <span className="font-medium text-gray-900 dark:text-white/80">
                      {tech.name}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-20 text-sm text-gray-400 dark:text-white/30"
        >
          And more. We choose the right tool for each project.
        </motion.p>
      </div>
    </section>
  );
};

export default OurStack;