'use client';

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useInView, useSpring, useMotionValue } from "framer-motion";
import { useRouter } from 'next/navigation';
import { ReactTyped } from "react-typed";
import PrimaryButton from "./ui/PrimaryButton";
import SecondaryButton from "./ui/SecondaryButton";
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

const Counter = ({ value, label }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { damping: 30, stiffness: 60 });
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    const match = value.match(/^([\d.]+)(.*)$/);
    if (match) {
      const number = parseFloat(match[1]);
      const suffix = match[2];
      const decimals = (match[1].split('.')[1] || '').length;

      if (isInView) {
        motionValue.set(number);
      }

      const unsubscribe = springValue.on("change", (latest) => {
        setDisplayValue(latest.toFixed(decimals) + suffix);
      });
      
      return () => unsubscribe();
    } else {
        setDisplayValue(value);
    }
  }, [isInView, value, motionValue, springValue]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-1">{displayValue}</div>
      <div className="text-xs md:text-sm text-gray-500 dark:text-white/40 uppercase tracking-wider">{label}</div>
    </div>
  );
};

// Shorter Laravel code snippets
const LARAVEL_SNIPPETS = [
  `<?php

class ProjectController extends Controller
{
    public function deploy(Request $request)
    {
        $deployment = Deployment::create([
            'status' => 'building',
            'branch' => $request->branch
        ]);

        dispatch(new DeployJob($deployment));

        return response()->json([
            'id' => $deployment->id,
            'status' => 'queued'
        ]);
    }
}`,
  `<?php

Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index']);
    
    Route::prefix('projects')->group(function () {
        Route::get('/', [ProjectController::class, 'index']);
        Route::post('/', [ProjectController::class, 'store']);
        Route::delete('/{project}', [ProjectController::class, 'destroy']);
    });
    
    Route::get('/analytics', [AnalyticsController::class, 'show']);
});`,
  `<?php

class Client extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'email', 'company', 'status'
    ];

    protected $casts = [
        'metadata' => 'array'
    ];

    public function projects(): HasMany
    {
        return $this->hasMany(Project::class);
    }

    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }
}`
];

const CodeEditor = () => {
  const [currentSnippetIndex, setCurrentSnippetIndex] = useState(0);
  const [displayedLines, setDisplayedLines] = useState([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [cursorVisible, setCursorVisible] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  
  const currentSnippet = LARAVEL_SNIPPETS[currentSnippetIndex];
  const lines = currentSnippet.split('\n');

  // Cursor blink effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible(prev => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  // Typing effect with faster speed and infinite loop
  useEffect(() => {
    if (isPaused) return;

    const typeNextChar = () => {
      if (isDeleting) {
        if (currentCharIndex > 0) {
          setCurrentCharIndex(prev => prev - 1);
        } else if (currentLineIndex > 0) {
          setCurrentLineIndex(prev => prev - 1);
          setCurrentCharIndex(lines[currentLineIndex - 1]?.length || 0);
        } else {
          setIsDeleting(false);
          // Move to next snippet, loop back to start if at end
          setCurrentSnippetIndex((prev) => (prev + 1) % LARAVEL_SNIPPETS.length);
          setDisplayedLines([]);
          setCurrentLineIndex(0);
          setCurrentCharIndex(0);
        }
      } else {
        const currentLine = lines[currentLineIndex];
        
        if (currentCharIndex < currentLine.length) {
          setCurrentCharIndex(prev => prev + 1);
        } else {
          setDisplayedLines(prev => [...prev, currentLine]);
          setCurrentCharIndex(0);
          
          if (currentLineIndex < lines.length - 1) {
            setCurrentLineIndex(prev => prev + 1);
          } else {
            // Snippet complete, pause then start deleting
            setIsPaused(true);
            setTimeout(() => {
              setIsDeleting(true);
              setIsPaused(false);
            }, 2000);
          }
        }
      }
    };

    // Faster typing speed (10-40ms for typing, 15-25ms for deleting)
    const randomDelay = isDeleting 
      ? 10 + Math.random() * 15 
      : 15 + Math.random() * 25;

    const timeout = setTimeout(typeNextChar, randomDelay);
    return () => clearTimeout(timeout);
  }, [currentCharIndex, currentLineIndex, isDeleting, isPaused, lines, currentSnippetIndex]);

  const getCurrentTypingLine = () => {
    if (currentLineIndex >= lines.length) return null;
    const line = lines[currentLineIndex];
    return line.substring(0, currentCharIndex);
  };

  const highlightSyntax = (line) => {
    return line
      .replace(/(\/\/.*)/g, '<span class="text-gray-500">$1</span>')
      .replace(/(&lt;\?php|namespace|use|class|extends|implements|public|private|protected|function|return|if|else|foreach|as|new)/g, '<span class="text-purple-400">$1</span>')
      .replace(/(string|int|bool|array|object|void)/g, '<span class="text-cyan-400">$1</span>')
      .replace(/('.*?')/g, '<span class="text-green-400">$1</span>')
      .replace(/(\$[a-zA-Z_][a-zA-Z0-9_]*)/g, '<span class="text-orange-300">$1</span>')
      .replace(/(\[.*?\])/g, '<span class="text-yellow-300">$1</span>')
      .replace(/\b(true|false|null)\b/g, '<span class="text-pink-400">$1</span>');
  };

  return (
    <div className="p-6 md:p-8 font-mono text-sm md:text-base overflow-hidden h-[400px]">
      <pre className="text-gray-300 leading-relaxed">
        <code>
          {displayedLines.map((line, i) => (
            <div key={`line-${i}`} className="flex">
              <span className="text-gray-500 w-8 select-none shrink-0 text-right pr-4">{i + 1}</span>
              <span 
                className="whitespace-pre"
                dangerouslySetInnerHTML={{ __html: highlightSyntax(line) || '&nbsp;' }}
              />
            </div>
          ))}
          
          {currentLineIndex < lines.length && (
            <div className="flex">
              <span className="text-gray-500 w-8 select-none shrink-0 text-right pr-4">{displayedLines.length + 1}</span>
              <span className="whitespace-pre flex items-center">
                <span dangerouslySetInnerHTML={{ __html: highlightSyntax(getCurrentTypingLine()) }} />
                <motion.span 
                  className={`inline-block w-2 h-5 ml-0.5 ${cursorVisible ? 'bg-primary-400' : 'bg-transparent'}`}
                  animate={{ opacity: cursorVisible ? 1 : 0 }}
                  transition={{ duration: 0.1 }}
                />
              </span>
            </div>
          )}
        </code>
      </pre>
    </div>
  );
};

const Hero = () => {
  const containerRef = useRef(null);
  const [hoveredTech, setHoveredTech] = useState(null);
  const router = useRouter();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  // Slower fade: starts at 50% scroll, completes at 90%, stays fully visible longer
  const opacity = useTransform(scrollYProgress, [0, 0.5, 0.9], [1, 1, 0]);

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

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden bg-white dark:bg-[#050505] transition-colors duration-300"
    >
      {/* Geometric Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-white dark:bg-[#050505] transition-colors duration-300" />
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-[#0a0a0a] dark:via-[#050505] dark:to-[#080810] transition-colors duration-300" />
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[600px] opacity-30"
          style={{ y: backgroundY }}
        >
          <div className="w-full h-full bg-gradient-radial from-primary-600/20 via-transparent to-transparent rounded-full blur-3xl" />
        </motion.div>
        <div className="absolute inset-0">
          <div className="h-full w-full bg-[size:120px_100%] bg-[linear-gradient(to_right,rgba(0,0,0,0.05)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px)]" />
        </div>
      </div>

      <motion.div 
        className="relative z-10 container mx-auto px-6 min-h-screen flex flex-col justify-center py-20"
        style={{ opacity }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-white/[0.02] backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
            <span className="text-sm text-gray-600 dark:text-white/60 tracking-wide">Available for new projects</span>
          </div>
        </motion.div>

        <div className="max-w-5xl mx-auto w-full">
          <div className="text-center space-y-4 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-gray-900 dark:text-white tracking-tighter leading-[0.9]">
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
                className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-transparent bg-clip-text bg-primary-600 tracking-tighter leading-[0.9]"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h2 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-gray-300 dark:text-white/20 tracking-tighter leading-[0.9]">
                For The Future
              </h2>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 mb-20"
          >
            <p className="text-lg md:text-xl text-gray-500 dark:text-white/40 max-w-md text-center md:text-left leading-relaxed">
              Architecting high-performance digital infrastructure for ambitious companies ready to scale.
            </p>
            
            <div className="flex gap-4">
              <PrimaryButton
                onClick={() => router.push('/contact-us')}
                className="px-8 py-4 font-medium"
              >
                Start Project
                <FaArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </PrimaryButton>
              
              <SecondaryButton
                onClick={() => router.push('/work')}
                className="flex items-center gap-3 px-8 py-4 font-medium"
              >
                View Work
              </SecondaryButton>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="relative max-w-3xl mx-auto"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-primary-500/20 to-cyan-500/20 rounded-2xl blur-xl opacity-50" />
            
            <div className="relative bg-gray-900/90 dark:bg-[#0a0a0a]/90 backdrop-blur-xl rounded-2xl border border-gray-700 dark:border-white/[0.08] overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700 dark:border-white/[0.04] bg-gray-800/50 dark:bg-white/[0.02]">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-400 dark:text-white/30">
                  <span className="w-2 h-2 rounded-full bg-emerald-400/50 animate-pulse" />
                  <span>Live Coding</span>
                </div>
                <div className="w-16" />
              </div>

              <CodeEditor />

              <div className="px-4 py-2 border-t border-gray-700 dark:border-white/[0.04] bg-gray-800/50 dark:bg-white/[0.02] flex items-center justify-between text-xs text-gray-400 dark:text-white/30">
                <div className="flex gap-4">
                  <span>PHP 8.3</span>
                  <span>Laravel 11</span>
                  <span>UTF-8</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Dev Environment</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-16"
          >
            <div className="text-center mb-8">
              <span className="text-xs uppercase tracking-[0.2em] text-gray-400 dark:text-white/30">Trusted Technologies</span>
            </div>
            
            <div className="relative">
              <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white dark:from-[#050505] to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white dark:from-[#050505] to-transparent z-10 pointer-events-none" />
              
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
                    <div className={`w-12 h-12 rounded-xl border border-gray-200 dark:border-white/[0.08] bg-gray-50 dark:bg-white/[0.03] flex items-center justify-center transition-all duration-300 ${
                      hoveredTech === tech.name ? 'border-primary-500/50 bg-primary-500/10 scale-110' : 'group-hover:border-gray-300 dark:group-hover:border-white/20'
                    }`}>
                      <tech.icon className={`w-6 h-6 transition-colors duration-300 ${
                        hoveredTech === tech.name ? 'text-primary-500 dark:text-primary-400' : 'text-gray-400 dark:text-white/50 group-hover:text-gray-600 dark:group-hover:text-white/80'
                      }`} />
                    </div>
                    <span className={`text-xs transition-colors duration-300 ${
                      hoveredTech === tech.name ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-white/40'
                    }`}>
                      {tech.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

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
              <Counter key={index} value={stat.value} label={stat.label} />
            ))}
          </motion.div>
        </div>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white dark:from-[#050505] to-transparent pointer-events-none" />
    </section>
  );
};

export default Hero;