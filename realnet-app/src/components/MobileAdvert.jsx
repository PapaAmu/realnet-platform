"use client";

import React from "react";
import { motion } from "framer-motion";

const Advert = () => {
  return (
    <div
      id="pricing"
      className="relative bg-cover bg-center bg-no-repeat py-28 px-6 md:px-16 overflow-hidden"
      style={{
        backgroundImage: `url('/bg_image.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Subtle overlay to enhance text readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-100/20 to-pink-100/20"></div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-white-400/20 rounded-full -translate-x-1/2 -translate-y-1/2 filter blur-xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-400/20 rounded-full translate-x-1/3 translate-y-1/3 filter blur-xl"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
        {/* Left Side Text */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-gray-800 max-w-2xl bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-orange-200/50"
        >
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6 bg-gradient-to-r from-orange-400 to-pink-600 bg-clip-text text-transparent">
            Professional Apps <br /> For App Stores 🚀
          </h1>
          <p className="text-sm text-gray-700 mb-8 leading-relaxed">
            We develop high-quality mobile applications tailored for your
            business and publish them directly to app stores. From concept to
            deployment, we deliver world-class solutions that your customers can
            download and enjoy.
          </p>

          {/* App Store badges */}
          <div className="mb-8">
            <div className="bg-gradient-to-r from-orange-400 to-pink-500 text-white rounded-xl mb-4 p-4 text-center">
              <p className="font-medium">
                We ensure your app meets all store guidelines for successful
                publication
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-black text-white rounded-xl p-3 flex items-center gap-2 cursor-pointer shadow-md"
              >
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                  {/* App Store icon */}
                  <img src="/appstore.svg" alt="App Store" className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs">Download on the</div>
                  <div className="text-xl font-semibold">App Store</div>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-green-700 text-white rounded-xl p-3 flex items-center gap-2 cursor-pointer shadow-md"
              >
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                  {/* Play Store icon */}
                  <img src="/playstore.svg" alt="Google Play" className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs">GET IT ON</div>
                  <div className="text-xl font-semibold">Google Play</div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Right Side - Glassy Device Mockup */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="hidden lg:block relative"
        >
          <div className="w-80 h-96 bg-gradient-to-br from-orange-50/80 to-pink-50/80 backdrop-blur-md rounded-3xl p-6 shadow-2xl border-2 border-orange-200/50 transform rotate-3">
            {/* Screen content */}
            <div className="bg-gradient-to-br from-orange-50 to-pink-50 h-full rounded-2xl overflow-hidden border border-orange-200/50 shadow-inner">
              <div className="p-5">
                <div className="flex justify-between items-center mb-6">
                  <div className="w-16 h-4 bg-orange-300/50 rounded-full"></div>
                  <div className="w-6 h-6 bg-pink-300/50 rounded-full"></div>
                </div>

                <div className="space-y-4">
                  <div className="w-3/4 h-4 bg-orange-300/40 rounded-full"></div>
                  <div className="w-full h-4 bg-pink-300/40 rounded-full"></div>
                  <div className="w-5/6 h-4 bg-orange-300/40 rounded-full"></div>
                </div>

                <div className="mt-8 grid grid-cols-2 gap-3">
                  <div className="h-20 bg-gradient-to-br from-orange-100 to-orange-200/70 rounded-xl border border-orange-200/50"></div>
                  <div className="h-20 bg-gradient-to-br from-pink-100 to-pink-200/70 rounded-xl border border-pink-200/50"></div>
                  <div className="h-20 bg-gradient-to-br from-amber-100 to-amber-200/70 rounded-xl border border-amber-200/50"></div>
                  <div className="h-20 bg-gradient-to-br from-rose-100 to-rose-200/70 rounded-xl border border-rose-200/50"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating elements */}
          <div className="absolute -top-4 -right-4 w-16 h-16 bg-orange-400/30 rounded-xl rotate-12 border border-orange-300/50 shadow-lg"></div>
          <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-pink-400/30 rounded-full border border-pink-300/50 shadow-lg"></div>
        </motion.div>
      </div>

      {/* Bottom wave divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-full h-16"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V56.44Z"
            className="fill-white/90"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default Advert;