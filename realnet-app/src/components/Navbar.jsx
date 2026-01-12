// app/components/Navbar.jsx
'use client';

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CgMenuHotdog } from "react-icons/cg";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSolutionsDropdownOpen, setIsSolutionsDropdownOpen] = useState(false);
  const [isCompanyDropdownOpen, setIsCompanyDropdownOpen] = useState(false);
  const [mobileView, setMobileView] = useState("main");
  const [activeLink, setActiveLink] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Throttled scroll handler to prevent excessive updates
  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    
    // Only update if scroll change is significant enough to prevent jitter
    if (Math.abs(currentScrollY - lastScrollY) > 5) {
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down & past 100px - hide navbar
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up - show navbar
        setIsVisible(true);
      }
      
      setScrolled(currentScrollY > 10);
      setLastScrollY(currentScrollY);
    }
  }, [lastScrollY]);

  useEffect(() => {
    // Set active link based on current URL
    const pathname = window.location.pathname;
    if (pathname === "/") setActiveLink("home");
    else if (pathname.includes("features")) setActiveLink("solutions");
    else if (pathname.includes("contact-us")) setActiveLink("contact");
    else if (pathname.includes("about-us")) setActiveLink("about");
    else if (pathname.includes("projects")) setActiveLink("projects");
    else if (pathname.includes("popia")) setActiveLink("popia");
    else if (pathname.includes("resources") || pathname.includes("#resources")) setActiveLink("resources");

    // Add scroll event listener with passive for better performance
    window.addEventListener("scroll", handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (isOpen) setMobileView("main");
  };

  const showSolutions = () => {
    setMobileView("solutions");
  };

  const showCompany = () => {
    setMobileView("company");
  };

  const showMainMenu = () => {
    setMobileView("main");
  };

  const handleLinkClick = (link) => {
    setActiveLink(link);
    setIsOpen(false);
    setMobileView("main");
  };

  const hoverEffect = {
    scale: 1.05,
    color: "#fb923c",
    transition: { duration: 0.2, ease: "easeOut" }
  };

  const tapEffect = {
    scale: 0.95,
    transition: { duration: 0.1 }
  };

  return (
    <div>
      <motion.nav
        className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 backdrop-blur-md shadow-2xl border border-black/10 rounded-md ${scrolled ? 'bg-white' : 'bg-white'} w-[calc(100%-2rem)] md:max-w-7xl`}
        initial={{ y: -120 }}
        animate={{ 
          y: isVisible ? 0 : -120,
        }}
        transition={{ 
          duration: 0.6, 
          ease: [0.25, 0.46, 0.45, 0.94] // Custom ease for smooth motion
        }}
        style={{ opacity: 1 }}
      >
        <div className="px-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <motion.a
              href="/"
              className="flex items-center text-white font-bold text-xl flex-shrink-0"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.img
                src="/logo.png"
                className="h-12 mr-2"
                alt="Logo"
                whileHover={{ rotate: 5 }}
                transition={{ duration: 0.2 }}
              />
            </motion.a>

            {/* Desktop Menu */}
            <DesktopMenu
              activeLink={activeLink}
              isSolutionsDropdownOpen={isSolutionsDropdownOpen}
              isCompanyDropdownOpen={isCompanyDropdownOpen}
              setIsSolutionsDropdownOpen={setIsSolutionsDropdownOpen}
              setIsCompanyDropdownOpen={setIsCompanyDropdownOpen}
              setActiveLink={setActiveLink}
              hoverEffect={hoverEffect}
              tapEffect={tapEffect}
            />

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <motion.button
                onClick={toggleMenu}
                className="text-black focus:outline-none p-2"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {isOpen ? (
                  <motion.svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 180 }}
                    transition={{ duration: 0.4 }}
                  >
                    <path d="M6 18L18 6M6 6l12 12" />
                  </motion.svg>
                ) : (
                  <motion.div
                    initial={{ rotate: 0, scale: 1 }}
                    animate={{ rotate: 0, scale: 1 }}
                    whileHover={{ rotate: 90, scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <CgMenuHotdog className="h-6 w-6 text-black" />
                  </motion.div>
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isOpen}
        mobileView={mobileView}
        activeLink={activeLink}
        onClose={toggleMenu}
        onShowSolutions={showSolutions}
        onShowCompany={showCompany}
        onShowMainMenu={showMainMenu}
        onLinkClick={handleLinkClick}
      />
    </div>
  );
}

// Desktop Menu Component (Extracted for better organization)
const DesktopMenu = ({
  activeLink,
  isSolutionsDropdownOpen,
  isCompanyDropdownOpen,
  setIsSolutionsDropdownOpen,
  setIsCompanyDropdownOpen,
  setActiveLink,
  hoverEffect,
  tapEffect
}) => (
  <>
    <div className="hidden md:flex space-x-8 text-black font-medium relative">
      <motion.a
        href="/"
        className={`relative py-2 transition ${activeLink === 'home' ? 'text-orange-700' : 'hover:text-orange-700'}`}
        whileHover={hoverEffect}
        whileTap={tapEffect}
        onClick={() => setActiveLink('home')}
      >
        Home
        {activeLink === 'home' && (
          <motion.div
            className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-400"
            layoutId="activeIndicator"
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
        )}
      </motion.a>

      {/* Solutions Dropdown */}
      <motion.div
        className="relative"
        onMouseEnter={() => setIsSolutionsDropdownOpen(true)}
        onMouseLeave={() => setIsSolutionsDropdownOpen(false)}
        whileHover={{ scale: 1.05 }}
      >
        <motion.button
          className={`flex items-center gap-1 py-2 transition ${activeLink === 'solutions' || isSolutionsDropdownOpen ? 'text-orange-400' : 'hover:text-orange-400'}`}
          whileTap={tapEffect}
        >
          Solutions
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            animate={{ rotate: isSolutionsDropdownOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </motion.svg>
        </motion.button>

        <DropdownMenu
          isOpen={isSolutionsDropdownOpen}
          items={[
            { href: "/solutions/web-development", text: "Website Development", id: "solutions" },
            { href: "/solutions/mobile-app-development", text: "Mobile App Development", id: "solutions" },
            { href: "/solutions/software-development", text: "Software Development", id: "solutions" },
            { href: "/solutions/email-and-hosting", text: "Hosting & Business Email", id: "solutions" }
          ]}
          setActiveLink={setActiveLink}
        />
      </motion.div>

      {/* Company Dropdown */}
      <motion.div
        className="relative"
        onMouseEnter={() => setIsCompanyDropdownOpen(true)}
        onMouseLeave={() => setIsCompanyDropdownOpen(false)}
        whileHover={{ scale: 1.05 }}
      >
        <motion.button
          className={`flex items-center gap-1 py-2 transition ${activeLink === 'contact' || activeLink === 'about' || activeLink === 'projects' || activeLink === 'popia' || isCompanyDropdownOpen ? 'text-orange-400' : 'hover:text-orange-400'}`}
          whileTap={tapEffect}
        >
          Company
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            animate={{ rotate: isCompanyDropdownOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </motion.svg>
        </motion.button>

        <DropdownMenu
          isOpen={isCompanyDropdownOpen}
          items={[
            { href: "/contact-us", text: "Contact", id: "contact" },
            { href: "/about-us", text: "About Us", id: "about" },
            { href: "/projects", text: "Projects", id: "projects" },
            { href: "/popia-act", text: "POPIA", id: "popia" }
          ]}
          setActiveLink={setActiveLink}
          activeLink={activeLink}
        />
      </motion.div>

      <motion.a
        href="/resources"
        className={`relative py-2 transition ${activeLink === 'resources' ? 'text-orange-400' : 'hover:text-orange-400'}`}
        whileHover={hoverEffect}
        whileTap={tapEffect}
        onClick={() => setActiveLink('resources')}
      >
        Resources
        {activeLink === 'resources' && (
          <motion.div
            className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-400"
            layoutId="activeIndicator"
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
        )}
      </motion.a>
      <motion.a
        href="/updates/blogs"
        className={`relative py-2 transition ${activeLink === 'blogs' ? 'text-orange-400' : 'hover:text-orange-400'}`}
        whileHover={hoverEffect}
        whileTap={tapEffect}
        onClick={() => setActiveLink('blogs')}
      >
        Blogs
        {activeLink === 'blogs' && (
          <motion.div
            className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-400"
            layoutId="activeIndicator"
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
        )}
      </motion.a>
    </div>

    {/* Desktop Button */}
    <motion.div
      className="hidden md:block"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.a
        href="/new-project/request-quotation"
        className="px-6 py-1 bg-gradient-to-r from-orange-500 to-pink-500 rounded-md text-white font-semibold flex items-center shadow-lg"
        whileHover={{
          background: "linear-gradient(to right, #ec4899, #f97316)",
          scale: 1.05,
          transition: { duration: 0.3 }
        }}
      >
        FREE QUOTE
        <motion.span
          animate={{ x: [0, 4, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          &nbsp;→
        </motion.span>
      </motion.a>
    </motion.div>
  </>
);

// Dropdown Menu Component (Reusable)
const DropdownMenu = ({ isOpen, items, setActiveLink, activeLink }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0, y: -10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -10, scale: 0.95 }}
        transition={{ duration: 0.3 }}
        className="absolute left-0 mt-3 w-56 bg-black/95 rounded-xl shadow-2xl border border-white/10 z-50 backdrop-blur-md"
      >
        <ul className="py-2 text-sm text-gray-300">
          {items.map((item, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <a
                href={item.href}
                className={`block px-4 py-3 hover:bg-white/5 hover:text-orange-400 transition-all duration-200 border-b border-white/5 last:border-b-0 ${activeLink === item.id ? 'text-orange-400' : ''}`}
                onClick={() => setActiveLink(item.id)}
              >
                {item.text}
              </a>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    )}
  </AnimatePresence>
);