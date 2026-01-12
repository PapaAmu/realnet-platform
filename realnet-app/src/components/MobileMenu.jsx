// app/components/MobileMenu.jsx
'use client';

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const MobileMenu = ({ 
  isOpen, 
  mobileView, 
  activeLink, 
  onClose, 
  onShowSolutions, 
  onShowCompany, 
  onShowMainMenu, 
  onLinkClick 
}) => {
  // Animation variants
  const menuVariants = {
    closed: {
      opacity: 0,
      x: "-100%",
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  const subMenuVariants = {
    closed: {
      opacity: 0,
      x: "100%",
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  const itemVariants = {
    closed: { opacity: 0, y: 20 },
    open: { opacity: 1, y: 0 }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-4 z-40 bg-black/50 backdrop-blur-sm flex flex-col items-center justify-center p-2 rounded-2xl"
        >
          {/* Close Button */}
          <motion.button
            onClick={onClose}
            className="absolute top-6 right-6 text-white focus:outline-none p-2 z-50"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg
              className="h-7 w-7"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          </motion.button>

          {/* Main Navigation */}
          <AnimatePresence mode="wait">
            {mobileView === "main" && (
              <MainMenu 
                variants={menuVariants}
                itemVariants={itemVariants}
                activeLink={activeLink}
                onShowSolutions={onShowSolutions}
                onShowCompany={onShowCompany}
                onLinkClick={onLinkClick}
                onClose={onClose}
              />
            )}

            {/* Solutions Submenu */}
            {mobileView === "solutions" && (
              <SolutionsMenu 
                variants={subMenuVariants}
                itemVariants={itemVariants}
                activeLink={activeLink}
                onShowMainMenu={onShowMainMenu}
                onLinkClick={onLinkClick}
              />
            )}

            {/* Company Submenu */}
            {mobileView === "company" && (
              <CompanyMenu 
                variants={subMenuVariants}
                itemVariants={itemVariants}
                activeLink={activeLink}
                onShowMainMenu={onShowMainMenu}
                onLinkClick={onLinkClick}
              />
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Main Menu Component
const MainMenu = ({ variants, itemVariants, activeLink, onShowSolutions, onShowCompany, onLinkClick, onClose }) => (
  <motion.div
    key="main-menu"
    variants={variants}
    initial="closed"
    animate="open"
    exit="closed"
    className="relative w-80 p-[2px] rounded-2xl bg-gradient-to-r from-orange-500 to-pink-500"
  >
    <div className="bg-black/95 rounded-2xl p-8 flex flex-col items-center space-y-6 backdrop-blur-md">
      <motion.h3 
        className="text-2xl font-bold mb-4 uppercase bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        MENU
      </motion.h3>
      
      {/* Nav Items */}
      {[
        { href: "/", text: "Home", id: "home" },
        { href: "#", text: "Solutions", id: "solutions", action: onShowSolutions, hasDropdown: true },
        { href: "#", text: "Company", id: "company", action: onShowCompany, hasDropdown: true },
        { href: "/resources", text: "Resources", id: "resources" }
      ].map((item, index) => (
        <motion.div
          key={index}
          className="w-full"
          variants={itemVariants}
          initial="closed"
          animate="open"
          transition={{ delay: index * 0.1 + 0.2 }}
        >
          {item.hasDropdown ? (
            <div
              onClick={item.action}
              className={`flex items-center justify-between text-xl font-medium w-full text-center py-3 rounded-lg transition-all cursor-pointer ${activeLink === item.id ? 'bg-gradient-to-r from-orange-500/20 to-pink-500/20 text-orange-400' : 'text-white hover:text-orange-400'}`}
            >
              <span className="flex-grow">{item.text}</span>
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                transition={{ duration: 0.2 }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </motion.svg>
            </div>
          ) : (
            <a
              href={item.href}
              onClick={() => onLinkClick(item.id)}
              className={`flex items-center justify-between text-xl font-medium w-full text-center py-3 rounded-lg transition-all ${activeLink === item.id ? 'bg-gradient-to-r from-orange-500/20 to-pink-500/20 text-orange-400' : 'text-white hover:text-orange-400'}`}
            >
              <span className="flex-grow">{item.text}</span>
            </a>
          )}
        </motion.div>
      ))}

      {/* CTA Button */}
      <motion.a
        href="/new-project/request-quotation"
        onClick={onClose}
        className="mt-6 px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-500 rounded-lg text-white font-semibold w-full text-center shadow-lg"
        variants={itemVariants}
        initial="closed"
        animate="open"
        transition={{ delay: 0.6 }}
        whileHover={{ 
          scale: 1.05,
          background: "linear-gradient(to right, #ec4899, #f97316)"
        }}
        whileTap={{ scale: 0.95 }}
      >
        FREE QUOTE
      </motion.a>
    </div>
  </motion.div>
);

// Solutions Menu Component
const SolutionsMenu = ({ variants, itemVariants, activeLink, onShowMainMenu, onLinkClick }) => (
  <motion.div
    key="solutions-menu"
    variants={variants}
    initial="closed"
    animate="open"
    exit="closed"
    className="relative w-80 p-[2px] rounded-2xl bg-gradient-to-r from-orange-500 to-pink-500"
  >
    <div className="bg-black/95 rounded-2xl p-8 flex flex-col items-center space-y-6 backdrop-blur-md">
      {/* Back Button */}
      <motion.button
        onClick={onShowMainMenu}
        className="self-start flex items-center text-orange-400 mb-2"
        whileHover={{ x: -5 }}
        whileTap={{ scale: 0.95 }}
      >
        <svg 
          className="w-5 h-5 mr-2" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
        Back
      </motion.button>
      
      <motion.h3 
        className="uppercase text-2xl font-bold mb-4 bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        Our services
      </motion.h3>
      
      {/* Solutions Items */}
      {[
        { href: "/solutions/web-development", text: "Website Development", id: "solutions" },
        { href: "/solutions/mobile-app-development", text: "Mobile App Development", id: "solutions" },
        { href: "/solutions/software-development", text: "Software Development", id: "solutions" },
        { href: "/solutions/email-and-hosting", text: "Hosting & Business Email", id: "solutions" }
      ].map((item, index) => (
        <motion.a
          key={index}
          href={item.href}
          onClick={() => onLinkClick(item.id)}
          className="text-xl font-medium w-full text-center py-3 rounded-lg text-white hover:bg-gradient-to-r hover:from-orange-500/20 hover:to-pink-500/20 hover:text-orange-400 transition-all"
          variants={itemVariants}
          initial="closed"
          animate="open"
          transition={{ delay: index * 0.1 + 0.2 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {item.text}
        </motion.a>
      ))}
    </div>
  </motion.div>
);

// Company Menu Component
const CompanyMenu = ({ variants, itemVariants, activeLink, onShowMainMenu, onLinkClick }) => (
  <motion.div
    key="company-menu"
    variants={variants}
    initial="closed"
    animate="open"
    exit="closed"
    className="relative w-80 p-[2px] rounded-2xl bg-gradient-to-r from-orange-500 to-pink-500"
  >
    <div className="bg-black/95 rounded-2xl p-8 flex flex-col items-center space-y-6 backdrop-blur-md">
      {/* Back Button */}
      <motion.button
        onClick={onShowMainMenu}
        className="self-start flex items-center text-orange-400 mb-2"
        whileHover={{ x: -5 }}
        whileTap={{ scale: 0.95 }}
      >
        <svg 
          className="w-5 h-5 mr-2" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
        Back
      </motion.button>
      
      <motion.h3 
        className="uppercase text-2xl font-bold mb-4 bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        Company
      </motion.h3>
      
      {/* Company Items */}
      {[
        { href: "/contact-us", text: "Contact", id: "contact" },
        { href: "/about-us", text: "About Us", id: "about" },
        { href: "/projects", text: "Projects", id: "projects" },
        { href: "/popia-act", text: "POPIA", id: "popia" }
      ].map((item, index) => (
        <motion.a
          key={index}
          href={item.href}
          onClick={() => onLinkClick(item.id)}
          className={`text-xl font-medium w-full text-center py-3 rounded-lg transition-all ${activeLink === item.id ? 'bg-gradient-to-r from-orange-500/20 to-pink-500/20 text-orange-400' : 'text-white hover:bg-gradient-to-r hover:from-orange-500/20 hover:to-pink-500/20 hover:text-orange-400'}`}
          variants={itemVariants}
          initial="closed"
          animate="open"
          transition={{ delay: index * 0.1 + 0.2 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {item.text}
        </motion.a>
      ))}
    </div>
  </motion.div>
);

export default MobileMenu;