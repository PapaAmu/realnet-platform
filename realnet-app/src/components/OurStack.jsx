"use client";

import React, { useMemo, useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  FaReact,
  FaNodeJs,
  FaDocker,
  FaHtml5,
  FaCss3Alt,
  FaWordpress,
  FaBootstrap,
  FaVuejs,
} from "react-icons/fa";
import {
  SiTailwindcss,
  SiMysql,
  SiLaravel,
  SiMongodb,
  SiTypescript,
  SiVite,
  SiDjango,
  SiFlask,
} from "react-icons/si";

const OurStack = () => {
  const [activeCategory, setActiveCategory] = useState("frontend");
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => {
      window.removeEventListener("resize", checkIsMobile);
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.6 },
    }),
  };

  const TiltCard = ({ children }) => {
    const ref = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rx = useSpring(useTransform(y, [-50, 50], [8, -8]), {
      stiffness: 200,
      damping: 20,
    });
    const ry = useSpring(useTransform(x, [-50, 50], [-8, 8]), {
      stiffness: 200,
      damping: 20,
    });
    const tZ = useSpring(0, { stiffness: 200, damping: 20 });

    const handleMove = (e) => {
      if (isMobile) return;

      const rect = ref.current.getBoundingClientRect();
      const px = e.clientX - (rect.left + rect.width / 2);
      const py = e.clientY - (rect.top + rect.height / 2);
      x.set((px / (rect.width / 2)) * 50);
      y.set((py / (rect.height / 2)) * 50);
      tZ.set(20);
    };
    const handleLeave = () => {
      x.set(0);
      y.set(0);
      tZ.set(0);
    };

    return (
      <motion.div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{
          transformStyle: "preserve-3d",
          perspective: 800,
          rotateX: rx,
          rotateY: ry,
        }}
        className="relative"
      >
        <motion.div style={{ transform: "translateZ(0px)" }}>
          {children}
        </motion.div>
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-2xl"
          style={{
            boxShadow: "0 0 0 0 rgba(251,146,60,0.0)",
            translateZ: tZ,
          }}
        />
      </motion.div>
    );
  };

  const Particles = ({ count = 8 }) => {
    // Use consistent seeds to avoid hydration mismatch
    const seeds = useMemo(() => {
      if (!mounted) {
        // Return empty array during SSR to avoid hydration mismatch
        return [];
      }
      
      return new Array(count).fill(0).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 6 + Math.random() * 10,
        delay: Math.random() * 1.2,
        float: 12 + Math.random() * 14,
      }));
    }, [count, mounted]);

    // Don't render particles during SSR
    if (!mounted) {
      return null;
    }

    return (
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {seeds.map((p) => (
          <motion.span
            key={p.id}
            className="absolute rounded-full blur-md bg-orange-400/20"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: p.size,
              height: p.size,
            }}
            animate={{ y: [0, -p.float, 0] }}
            transition={{
              duration: 3 + p.delay,
              repeat: Infinity,
              ease: "easeInOut",
              delay: p.delay,
            }}
          />
        ))}
      </div>
    );
  };

  const techCategories = {
    frontend: {
      name: "Frontend Technologies",
      stacks: [
        {
          name: "React.js",
          icon: <FaReact className="text-sky-400" />,
          desc: "Component-driven UIs for the web.",
          category: "frontend",
        },
        {
          name: "Tailwind CSS",
          icon: <SiTailwindcss className="text-cyan-400" />,
          desc: "Utility-first responsive styling.",
          category: "frontend",
        },
        {
          name: "TypeScript",
          icon: <SiTypescript className="text-blue-600" />,
          desc: "Safe, scalable JavaScript.",
          category: "frontend",
        },
        {
          name: "HTML5",
          icon: <FaHtml5 className="text-orange-500" />,
          desc: "Accessible, semantic foundations.",
          category: "frontend",
        },
        {
          name: "Bootstrap",
          icon: <FaBootstrap className="text-indigo-500" />,
          desc: "Rapid UI prototyping.",
          category: "frontend",
        },
        {
          name: "Vue.js",
          icon: <FaVuejs className="text-emerald-500" />,
          desc: "Progressive front-end framework.",
          category: "frontend",
        },
        {
          name: "Vite",
          icon: <SiVite className="text-purple-500" />,
          desc: "Blazing fast dev & builds.",
          category: "frontend",
        },
      ],
    },
    backend: {
      name: "Backend Technologies",
      stacks: [
        {
          name: "Node.js",
          icon: <FaNodeJs className="text-green-500" />,
          desc: "High-performance APIs & services.",
          category: "backend",
        },
        {
          name: "Express.js",
          icon: <FaNodeJs className="text-green-400" />,
          desc: "Minimal, robust backend routing.",
          category: "backend",
        },
        {
          name: "Laravel (PHP)",
          icon: <SiLaravel className="text-red-500" />,
          desc: "Elegant backends & REST APIs.",
          category: "backend",
        },
        {
          name: "Django",
          icon: <SiDjango className="text-emerald-600" />,
          desc: "Batteries-included backends.",
          category: "backend",
        },
        {
          name: "Flask",
          icon: <SiFlask className="text-gray-200" />,
          desc: "Lightweight Python services.",
          category: "backend",
        },
      ],
    },
    database: {
      name: "Database Technologies",
      stacks: [
        {
          name: "MySQL",
          icon: <SiMysql className="text-blue-500" />,
          desc: "Reliable relational database.",
          category: "database",
        },
        {
          name: "MongoDB",
          icon: <SiMongodb className="text-emerald-500" />,
          desc: "Flexible NoSQL datastore.",
          category: "database",
        },
      ],
    },
    mobile: {
      name: "Mobile Development",
      stacks: [
        {
          name: "React Native",
          icon: <FaReact className="text-cyan-300" />,
          desc: "Native mobile apps with React.",
          category: "mobile",
        },
      ],
    },
    devops: {
      name: "DevOps & Deployment",
      stacks: [
        {
          name: "Docker",
          icon: <FaDocker className="text-sky-600" />,
          desc: "Portable, scalable deployments.",
          category: "devops",
        },
      ],
    },
    tools: {
      name: "Tools & CMS",
      stacks: [
        {
          name: "WordPress",
          icon: <FaWordpress className="text-sky-500" />,
          desc: "CMS & WooCommerce sites.",
          category: "tools",
        },
      ],
    },
  };

  const categoryButtons = [
    { id: "frontend", label: "Frontend", emoji: "🎨" },
    { id: "backend", label: "Backend", emoji: "⚙️" },
    { id: "database", label: "Database", emoji: "💾" },
    { id: "mobile", label: "Mobile", emoji: "📱" },
    { id: "devops", label: "DevOps", emoji: "🔧" },
    { id: "tools", label: "Tools & CMS", emoji: "🛠️" },
  ];

  return (
    <div id="joinsection">
      <div className="relative isolate overflow-hidden bg-gray-900 py-12 md:py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <motion.h2
              className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              variants={containerVariants}
              custom={0}
            >
              Our Advanced <span className="text-orange-400">Tech Stack</span>
            </motion.h2>

            <motion.p
              className="mt-4 text-lg text-gray-300 max-w-3xl mx-auto md:text-xl"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              variants={containerVariants}
              custom={1}
            >
              RealNet Web Solutions builds modern, scalable platforms using a
              proven mix of frameworks, databases, DevOps and mobile
              technologies.
            </motion.p>
          </div>

          <motion.div
            className="flex justify-center mb-8 md:mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            variants={containerVariants}
            custom={2}
          >
            <div className="inline-flex rounded-xl bg-gray-800 p-1 shadow-lg shadow-black/5 border border-gray-700 overflow-x-auto no-scrollbar">
              {categoryButtons.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center gap-2 px-3 py-1 md:px-5 md:py-1 rounded-lg text-xs md:text-sm font-medium transition-all whitespace-nowrap ${
                    activeCategory === category.id
                      ? "bg-orange-400 text-white shadow-md shadow-orange-500/20"
                      : "text-gray-300 hover:text-white hover:bg-gray-700/50"
                  }`}
                >
                  <span className="text-base md:text-lg">{category.emoji}</span>
                  <span>{category.label}</span>
                </button>
              ))}
            </div>
          </motion.div>

          <div className="mx-auto">
            <motion.h3
              className="text-xl font-semibold text-white mb-6 text-center md:text-2xl md:mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {techCategories[activeCategory].name}
            </motion.h3>

            <motion.div
              className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6"
              key={activeCategory}
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.07 } },
              }}
            >
              {techCategories[activeCategory].stacks.map((stack, index) => (
                <motion.div
                  key={stack.name + index}
                  variants={{
                    hidden: { opacity: 0, y: 40 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.5 },
                    },
                  }}
                >
                  <TiltCard>
                    <div className="relative overflow-hidden rounded-2xl border border-gray-700 bg-gray-800/50 backdrop-blur-sm shadow-lg p-4 hover:border-orange-400 transition-all duration-300 h-full flex flex-col md:p-5">
                      <Particles count={7} />

                      <div className="flex items-center gap-x-3 relative z-10 mb-3">
                        <span className="text-2xl md:text-3xl">
                          {stack.icon}
                        </span>
                        <h3 className="text-base font-semibold text-white md:text-lg">
                          {stack.name}
                        </h3>
                      </div>

                      <p className="text-xs text-gray-400 relative z-10 mt-auto md:text-sm">
                        {stack.desc}
                      </p>
                    </div>
                  </TiltCard>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        <div
          className="absolute top-0 left-1/2 -z-10 -translate-x-1/2 blur-3xl xl:-top-6"
          aria-hidden="true"
        >
          <div
            className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          ></div>
        </div>
      </div>

      {/* Custom CSS for hiding scrollbar */}
      <style jsx>{`
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default OurStack;