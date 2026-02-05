// app/components/Navbar.jsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import PrimaryButton from "./ui/PrimaryButton";
import { 
  FaChevronRight, 
  FaTimes 
} from 'react-icons/fa';
import { FiArrowUpRight } from 'react-icons/fi';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [mobileSubmenu, setMobileSubmenu] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();
  const pathname = usePathname();
  const router = useRouter();
  
  // Use refs for scroll values to avoid re-renders
  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  const scrollTimeout = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          
          // Determine visibility based on scroll direction
          // Only hide if scrolling down past 100px
          if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
            setHidden(true);
          } else {
            setHidden(false);
          }
          
          // Update scrolled state for styling
          setScrolled(currentScrollY > 20);
          
          lastScrollY.current = currentScrollY;
          ticking.current = false;
        });
        
        ticking.current = true;
      }
      
      // Clear existing timeout
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
      
      // Set new timeout to ensure state settles
      scrollTimeout.current = setTimeout(() => {
        ticking.current = false;
      }, 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setMobileSubmenu(null);
    }
  }, [isOpen]);

  const isActive = (href) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href) && href !== '/';
  };

  const hasActiveChild = (children) => {
    return children?.some(child => isActive(child.href));
  };

  const navItems = [
    { name: 'Home', href: '/' },
    { 
      name: 'Solutions', 
      href: '/services',
      children: [
        { name: 'Web Development', href: '/solutions/web-development', desc: 'Custom websites & apps' },
        { name: 'Mobile Apps', href: '/solutions/mobile-app-development', desc: 'iOS & Android solutions' },
        { name: 'Software', href: '/solutions/software-development', desc: 'Enterprise systems' },
        { name: 'Hosting', href: '/solutions/email-and-hosting', desc: 'Cloud infrastructure' },
      ]
    },
    { 
      name: 'Company', 
      href: '/company',
      children: [
        { name: 'About Us', href: '/about-us', desc: 'Our story & team' },
        { name: 'Projects', href: '/projects', desc: 'Case studies' },
        { name: 'Contact', href: '/contact-us', desc: 'Get in touch' },
        { name: 'POPIA', href: '/popia-act', desc: 'Privacy policy' },
      ]
    },
    { name: 'Resources', href: '/resources' },
    { name: 'Blog', href: '/updates/blogs' },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: hidden ? -100 : 0 }}
        transition={{ 
          duration: 0.35, 
          ease: [0.25, 0.1, 0.25, 1] // Custom smooth easing
        }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-white/90 dark:bg-[#050505]/90 backdrop-blur-md shadow-sm' 
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo - Using official logo */}
            <Link href="/" className="relative z-50 flex items-center gap-0">
              <div className={`relative w-10 h-10 transition-colors ${
                isOpen ? 'bg-gray-100 dark:bg-white rounded-xl' : ''
              }`}>
                <Image
                  src="/logo.png"
                  alt="RealNet Web Solutions"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <span className={`font-semibold uppercase text-xl transition-colors ${
                isOpen ? 'text-primary' : 'text-primary-700 dark:text-white'
              }`}>RealNet Web</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => {
                const active = isActive(item.href);
                const childActive = hasActiveChild(item.children);
                
                return (
                  <div key={item.name} className="relative group">
                    <Link
                      href={item.href}
                      className={`relative px-4 py-2 text-sm font-medium transition-colors flex items-center gap-2 ${
                        active || childActive
                          ? 'text-gray-900 dark:text-white'
                          : 'text-gray-600 dark:text-white/60 hover:text-gray-900 dark:hover:text-white'
                      }`}
                    >
                      {item.name}
                      {item.children && (
                        <FaChevronRight className={`w-3 h-3 transition-transform duration-200 group-hover:rotate-90 ${
                          childActive ? 'text-primary-500' : ''
                        }`} />
                      )}
                      
                      {/* Active Dot */}
                      {(active || childActive) && (
                        <motion.span
                          layoutId="activeNav"
                          className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full ${
                            childActive ? 'bg-primary-500' : 'bg-primary-500 dark:bg-primary-400'
                          }`}
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                    </Link>

                    {/* Dropdown */}
                    {item.children && (
                      <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                        <div className="bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-white/10 rounded-xl p-2 w-64 shadow-xl">
                          {item.children.map((child) => {
                            const childIsActive = isActive(child.href);
                            return (
                              <Link
                                key={child.name}
                                href={child.href}
                                className={`flex items-center justify-between p-3 rounded-lg transition-all ${
                                  childIsActive
                                    ? 'bg-primary-50 dark:bg-primary-500/10 border-l-2 border-primary-500 dark:border-primary-400'
                                    : 'hover:bg-gray-50 dark:hover:bg-white/5'
                                }`}
                              >
                                <div>
                                  <div className={`text-sm font-medium ${
                                    childIsActive ? 'text-primary-600 dark:text-primary-400' : 'text-gray-700 dark:text-white/80'
                                  }`}>
                                    {child.name}
                                  </div>
                                  <div className="text-xs text-gray-400 dark:text-white/40 mt-0.5">
                                    {child.desc}
                                  </div>
                                </div>
                                {childIsActive && (
                                  <span className="w-2 h-2 rounded-full bg-primary-500 dark:bg-primary-400" />
                                )}
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-4">
              <button
                onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
                className="w-10 h-10 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center text-gray-600 dark:text-white/60 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
              >
                {resolvedTheme === 'dark' ? (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>

              <PrimaryButton 
                onClick={() => router.push('/new-project/request-quotation')}
                className="px-5 py-2.5 text-sm font-medium flex items-center gap-2"
              >
                Get Quote
                <FiArrowUpRight className="w-3 h-3" />
              </PrimaryButton>
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`lg:hidden relative z-50 w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                isOpen ? 'bg-white/10' : 'bg-gray-100 dark:bg-white/5'
              }`}
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FaTimes className="w-5 h-5 text-gray-900 dark:text-white" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col gap-1.5"
                  >
                    <span className={`w-5 h-0.5 rounded-full transition-colors ${
                      scrolled ? 'bg-gray-900 dark:bg-white' : 'bg-gray-900 dark:bg-white'
                    }`} />
                    <span className={`w-5 h-0.5 rounded-full transition-colors ${
                      scrolled ? 'bg-gray-900 dark:bg-white' : 'bg-gray-900 dark:bg-white'
                    }`} />
                    <span className={`w-3 h-0.5 rounded-full transition-colors ml-auto ${
                      scrolled ? 'bg-gray-900 dark:bg-white' : 'bg-gray-900 dark:bg-white'
                    }`} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu - Slide Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setIsOpen(false)}
            />

            {/* Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white dark:bg-[#050505] z-50 lg:hidden shadow-2xl"
            >
              <div className="flex flex-col h-full">
                
                {/* Header with Logo */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="relative w-8 h-8">
                      <Image
                        src="/logo.png"
                        alt="RealNet"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {mobileSubmenu ? mobileSubmenu.name : 'Menu'}
                    </span>
                  </div>
                  {mobileSubmenu ? (
                    <button
                      onClick={() => setMobileSubmenu(null)}
                      className="text-sm text-primary-600 dark:text-primary-400 font-medium"
                    >
                      Back
                    </button>
                  ) : (
                    <button
                      onClick={() => setIsOpen(false)}
                      className="w-8 h-8 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center"
                    >
                      <FaTimes className="w-4 h-4 text-gray-600 dark:text-white/60" />
                    </button>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6">
                  <AnimatePresence mode="wait">
                    {!mobileSubmenu ? (
                      <motion.div
                        key="main"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-1"
                      >
                        {navItems.map((item, index) => {
                          const active = isActive(item.href);
                          const childActive = hasActiveChild(item.children);
                          
                          return (
                            <motion.div
                              key={item.name}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.05 }}
                            >
                              {item.children ? (
                                <button
                                  onClick={() => setMobileSubmenu(item)}
                                  className={`w-full flex items-center justify-between p-4 rounded-xl transition-colors ${
                                    childActive 
                                      ? 'bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400' 
                                      : 'hover:bg-gray-100 dark:hover:bg-white/5 text-gray-900 dark:text-white'
                                  }`}
                                >
                                  <div className="flex items-center gap-3">
                                    {(active || childActive) && (
                                      <span className="w-2 h-2 rounded-full bg-primary-500 dark:bg-primary-400" />
                                    )}
                                    <span className="font-medium">{item.name}</span>
                                  </div>
                                  <FaChevronRight className="w-4 h-4 text-gray-400" />
                                </button>
                              ) : (
                                <Link
                                  href={item.href}
                                  onClick={() => setIsOpen(false)}
                                  className={`flex items-center gap-3 p-4 rounded-xl transition-colors ${
                                    active
                                      ? 'bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400'
                                      : 'hover:bg-gray-100 dark:hover:bg-white/5 text-gray-900 dark:text-white'
                                  }`}
                                >
                                  {active && <span className="w-2 h-2 rounded-full bg-primary-500 dark:bg-primary-400" />}
                                  <span className="font-medium">{item.name}</span>
                                </Link>
                              )}
                            </motion.div>
                          );
                        })}
                      </motion.div>
                    ) : (
                      <motion.div
                        key="submenu"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="space-y-2"
                      >
                        {mobileSubmenu.children.map((child, index) => {
                          const childIsActive = isActive(child.href);
                          return (
                            <motion.div
                              key={child.name}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.05 }}
                            >
                              <Link
                                href={child.href}
                                onClick={() => setIsOpen(false)}
                                className={`block p-4 rounded-xl transition-colors ${
                                  childIsActive
                                    ? 'bg-primary-50 dark:bg-primary-500/10 border-l-2 border-primary-500 dark:border-primary-400'
                                    : 'hover:bg-gray-100 dark:hover:bg-white/5'
                                }`}
                              >
                                <div className="flex items-center justify-between mb-1">
                                  <span className={`font-medium ${
                                    childIsActive ? 'text-primary-600 dark:text-primary-400' : 'text-gray-900 dark:text-white'
                                  }`}>
                                    {child.name}
                                  </span>
                                  {childIsActive && (
                                    <span className="w-2 h-2 rounded-full bg-primary-500 dark:bg-primary-400" />
                                  )}
                                </div>
                                <p className="text-sm text-gray-500 dark:text-white/40">
                                  {child.desc}
                                </p>
                              </Link>
                            </motion.div>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-gray-200 dark:border-white/10 space-y-4">
                  <Link
                    href="/new-project/request-quotation"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center gap-2 w-full py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-medium"
                  >
                    Start Your Project
                    <FiArrowUpRight className="w-4 h-4" />
                  </Link>
                  
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
                      className="flex items-center gap-2 text-sm text-gray-600 dark:text-white/60"
                    >
                      {resolvedTheme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                    </button>
                    <span className="text-sm text-gray-400 dark:text-white/30">
                      © 2024
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}