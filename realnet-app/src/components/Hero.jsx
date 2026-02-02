'use client';

import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ReactTyped } from "react-typed";
import { 
  FaReact, 
  FaNodeJs, 
  FaAws, 
  FaGitAlt,
  FaArrowRight 
} from "react-icons/fa";
import { 
  SiNextdotjs, 
  SiTypescript, 
  SiTailwindcss, 
  SiPostgresql,
  SiDocker 
} from "react-icons/si";

const Hero = () => {
  const containerRef = useRef(null);
  const [hoveredTech, setHoveredTech] = useState(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  // Changed: Fade starts at 30% scroll, completes at 80%, stays visible longer
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.8], [1, 1, 0]);

  const techStack = [
    { name: "Next.js", icon: SiNextdotjs },
    { name: "React", icon: FaReact },
    { name: "TypeScript", icon: SiTypescript },
    { name: "Node.js", icon: FaNodeJs },
    { name: "PostgreSQL", icon: SiPostgresql },
    { name: "Docker", icon: SiDocker },
    { name: "AWS", icon: FaAws },
    { name: "Git", icon: FaGitAlt },
  ];

  const codeSnippet = `// System Architecture
const deploy = async () => {
  const config = {
    scale: "auto",
    region: "global",
    cdn: true
  };
  
  return await infrastructure
    .provision(config)
    .optimize();
};`;

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden bg-[#050505]"
    >
      {/* Geometric Background */}
      <div className="absolute inset-0">
        {/* Dark base */}
        <div className="absolute inset-0 bg-[#050505]" />
        
        {/* Diagonal split background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#050505] to-[#080810]" />
        
        {/* Accent glow */}
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[600px] opacity-30"
          style={{ y: backgroundY }}
        >
          <div className="w-full h-full bg-gradient-radial from-violet-600/20 via-transparent to-transparent rounded-full blur-3xl" />
        </motion.div>

        {/* Grid lines */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="h-full w-full" style={{
            backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '120px 100%'
          }} />
        </div>
      </div>

      {/* Main Content - Centered Layout */}
      <motion.div 
        className="relative z-10 container mx-auto px-6 min-h-screen flex flex-col justify-center py-20"
        style={{ opacity }}
      >
        {/* Top Section - Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.02] backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-sm text-white/60 tracking-wide">Available for new projects</span>
          </div>
        </motion.div>

        {/* Center Content Stack */}
        <div className="max-w-5xl mx-auto w-full">
          
          {/* Main Typography - Large & Centered */}
          <div className="text-center space-y-4 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-white tracking-tighter leading-[0.9]">
                We Build
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-[1em] flex justify-center items-center"
            >
              <ReactTyped
                strings={[
                  "Digital Products",
                  "Cloud Systems",
                  "Mobile Apps",
                  "Tech Solutions"
                ]}
                typeSpeed={60}
                backSpeed={40}
                loop
                backDelay={2000}
                showCursor={true}
                cursorChar="_"
                className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-transparent bg-clip-text bg-primary tracking-tighter leading-[0.9]"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h2 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-white/20 tracking-tighter leading-[0.9]">
                For The Future
              </h2>
            </motion.div>
          </div>

          {/* Description & CTA Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 mb-20"
          >
            <p className="text-lg md:text-xl text-white/40 max-w-md text-center md:text-left leading-relaxed">
              Architecting high-performance digital infrastructure for ambitious companies ready to scale.
            </p>
            
            <div className="flex gap-4">
              <motion.a
                href="/contact"
                className="group flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-medium hover:bg-white/90 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Start Project
                <FaArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </motion.a>
              
              <motion.a
                href="/work"
                className="flex items-center gap-3 px-8 py-4 border border-white/20 text-white rounded-full font-medium hover:bg-white/5 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                View Work
              </motion.a>
            </div>
          </motion.div>

          {/* Code Preview - Floating Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="relative max-w-3xl mx-auto"
          >
            {/* Glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-violet-500/20 to-cyan-500/20 rounded-2xl blur-xl opacity-50" />
            
            <div className="relative bg-[#0a0a0a]/90 backdrop-blur-xl rounded-2xl border border-white/[0.08] overflow-hidden">
              {/* Window Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.04] bg-white/[0.02]">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="flex items-center gap-2 text-xs text-white/30">
                  <span className="w-2 h-2 rounded-full bg-emerald-400/50 animate-pulse" />
                  Live Preview
                </div>
                <div className="w-16" />
              </div>

              {/* Code Content */}
              <div className="p-6 md:p-8 font-mono text-sm md:text-base overflow-x-auto">
                <pre className="text-white/70 leading-relaxed">
                  <code>
                    {codeSnippet.split('\n').map((line, i) => (
                      <div key={i} className="flex">
                        <span className="text-white/20 w-8 select-none shrink-0">{i + 1}</span>
                        <span 
                          className="whitespace-pre"
                          dangerouslySetInnerHTML={{
                            __html: line
                              .replace(/(\/\/.*)/, '<span class="text-white/30">$1</span>')
                              .replace(/\b(const|let|var|async|await|return|if|else)\b/g, '<span class="text-violet-400">$1</span>')
                              .replace(/\b(true|false|null|undefined)\b/g, '<span class="text-orange-400">$1</span>')
                              .replace(/(".*?"|'.*?')/g, '<span class="text-emerald-400">$1</span>')
                              .replace(/\b(\d+)\b/g, '<span class="text-cyan-400">$1</span>')
                          }}
                        />
                      </div>
                    ))}
                  </code>
                </pre>
              </div>

              {/* Status Bar */}
              <div className="px-4 py-2 border-t border-white/[0.04] bg-white/[0.02] flex items-center justify-between text-xs text-white/30">
                <div className="flex gap-4">
                  <span>TypeScript</span>
                  <span>UTF-8</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  System Operational
                </div>
              </div>
            </div>
          </motion.div>

          {/* Tech Stack - Horizontal Scroll */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-16"
          >
            <div className="text-center mb-8">
              <span className="text-xs uppercase tracking-[0.2em] text-white/30">Trusted Technologies</span>
            </div>
            
            <div className="relative">
              {/* Fade edges */}
              <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />
              
              <div className="flex justify-center gap-8 md:gap-12 overflow-x-auto pb-4 px-8 scrollbar-hide">
                {techStack.map((tech, index) => (
                  <motion.div
                    key={tech.name}
                    className="flex flex-col items-center gap-3 group cursor-pointer shrink-0"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                    onMouseEnter={() => setHoveredTech(tech.name)}
                    onMouseLeave={() => setHoveredTech(null)}
                  >
                    <div className={`w-12 h-12 rounded-xl border border-white/[0.08] bg-white/[0.03] flex items-center justify-center transition-all duration-300 ${
                      hoveredTech === tech.name ? 'border-violet-500/50 bg-violet-500/10 scale-110' : 'group-hover:border-white/20'
                    }`}>
                      <tech.icon className={`w-6 h-6 transition-colors duration-300 ${
                        hoveredTech === tech.name ? 'text-violet-400' : 'text-white/50 group-hover:text-white/80'
                      }`} />
                    </div>
                    <span className={`text-xs transition-colors duration-300 ${
                      hoveredTech === tech.name ? 'text-white' : 'text-white/40'
                    }`}>
                      {tech.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Bottom Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="mt-20 grid grid-cols-3 gap-8 max-w-2xl mx-auto"
          >
            {[
              { value: "150+", label: "Projects Delivered" },
              { value: "99.9%", label: "Uptime Guaranteed" },
              { value: "24/7", label: "Support" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-xs md:text-sm text-white/40 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none" />
    </section>
  );
};

export default Hero;