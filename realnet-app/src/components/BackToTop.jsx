'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { FaArrowUp } from 'react-icons/fa';

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const buttonRef = useRef(null);
  
  // Mouse position for magnetic effect
  const mouseX = useSpring(0, { stiffness: 150, damping: 15 });
  const mouseY = useSpring(0, { stiffness: 150, damping: 15 });
  
  // Scale animation on hover
  const scale = useSpring(1, { stiffness: 400, damping: 25 });

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 400);
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const handleMouseMove = (e) => {
    if (!buttonRef.current) return;
    
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    
    // Magnetic pull strength
    mouseX.set(distanceX * 0.3);
    mouseY.set(distanceY * 0.3);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    scale.set(1);
    setIsHovering(false);
  };

  const handleMouseEnter = () => {
    scale.set(1.15);
    setIsHovering(true);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <motion.button
      ref={buttonRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: isVisible ? 1 : 0, 
        y: isVisible ? 0 : 20,
        scale: isVisible ? 1 : 0.8
      }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      onClick={scrollToTop}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        x: mouseX,
        y: mouseY,
        scale: scale,
      }}
      className="fixed bottom-8 right-8 z-50 group"
      aria-label="Back to top"
    >
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-full bg-primary-500 blur-xl"
        animate={{
          opacity: isHovering ? 0.5 : 0,
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Outer ring */}
      <motion.div
        className="absolute -inset-1.5 rounded-full border border-primary-500/30"
        animate={{
          scale: isHovering ? 1.1 : 1,
          opacity: isHovering ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Button */}
      <div className="relative w-10 h-10 rounded-full bg-gray-900 dark:bg-white text-white dark:text-black flex items-center justify-center shadow-2xl shadow-black/20 dark:shadow-white/10 overflow-hidden transition-colors duration-300">
        
        {/* Background fill on hover */}
        <motion.div
          className="absolute inset-0 bg-primary-600"
          initial={{ y: '100%' }}
          animate={{ y: isHovering ? '0%' : '100%' }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        />
        
        {/* Icon container */}
        <div className="relative z-10 overflow-hidden h-3.5">
          <motion.div
            animate={{ y: isHovering ? -14 : 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col"
          >
            <FaArrowUp className="w-3.5 h-3.5 mb-3.5" />
            <FaArrowUp className="w-3.5 h-3.5 text-white" />
          </motion.div>
        </div>
      </div>

      {/* Tooltip */}
      <motion.div
        className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-md bg-gray-900 dark:bg-white text-white dark:text-black text-[10px] font-medium whitespace-nowrap pointer-events-none"
        initial={{ opacity: 0, x: 10 }}
        animate={{ 
          opacity: isHovering ? 1 : 0, 
          x: isHovering ? 0 : 10 
        }}
        transition={{ duration: 0.2 }}
      >
        Back to top
        {/* Arrow */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 w-1 h-1 bg-gray-900 dark:bg-white rotate-45" />
      </motion.div>

      {/* Progress ring (optional visual flair) */}
      <svg
        className="absolute -inset-2 w-14 h-14 -rotate-90 pointer-events-none"
        viewBox="0 0 100 100"
      >
        <circle
          cx="50"
          cy="50"
          r="46"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-gray-200 dark:text-white/10"
        />
        <motion.circle
          cx="50"
          cy="50"
          r="46"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-primary-500"
          strokeLinecap="round"
          strokeDasharray="289"
          strokeDashoffset="289"
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </svg>
    </motion.button>
  );
};

export default BackToTop;