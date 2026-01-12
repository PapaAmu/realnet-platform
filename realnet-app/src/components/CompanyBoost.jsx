"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const CompanyBoost = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.6 },
    }),
  };

  const featureVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div id="joinsection" className="relative">
      {/* Floating Image - aligned left on large screens, centered on mobile */}
      <div className="absolute -top-32 left-1/2 sm:left-12 md:left-16 lg:left-20 xl:left-24 -translate-x-1/2 sm:translate-x-0 w-64 sm:w-72 md:w-80 lg:w-96 xl:w-[26rem] z-20 flex justify-center sm:justify-start">
        <motion.img
          src="/desktop.webp"
          alt="Floating Display"
          className="w-full h-auto rounded-xl"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        />
      </div>

      {/* Main Section */}
      <div className="relative isolate overflow-hidden bg-gray-900 pb-8 sm:pt-4 sm:pb-20 lg:pt-20 lg:pb-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-12 gap-y-16 lg:max-w-none lg:grid-cols-2">
            {/* Text Section - Added mobile spacing */}
            <div className="max-w-xl lg:max-w-lg flex flex-col md:mt-48 justify-center pt-20 sm:pt-0">
              <motion.h2
                className="text-3xl sm:text-4xl font-semibold tracking-tight text-white text-center sm:text-left mt-8 sm:mt-0"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.3 }}
                variants={containerVariants}
                custom={0}
              >
                Empower Your <span className="text-orange-400">Business with Us</span>
              </motion.h2>

              <motion.p
                className="mt-6 text-gray-400 text-base leading-relaxed text-center sm:text-left"
                initial="hidden"
                whileInView="visible"
                variants={featureVariants}
              >
                Take your company to new heights with professional, secure, and
                scalable web solutions that drive results.
              </motion.p>

              {/* Use a motion-wrapped Next.js Link to avoid nested <a> tags */}
              <motion.div
                className="flex justify-center sm:justify-start mt-6"
                initial="hidden"
                whileInView="visible"
                variants={featureVariants}
              >
                <Link
                  href="/about-us"
                  className="inline-flex px-6 py-3 bg-gradient-to-r w-48 from-orange-500 to-pink-500 rounded-md text-white font-semibold items-center hover:from-orange-600 hover:to-pink-600 transition-all duration-300"
                >
                  <span className="flex items-center w-full justify-between">
                    <span>More About Us</span>
                    <motion.span
                      animate={{ x: [0, 4, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                      aria-hidden
                    >
                      &nbsp;→
                    </motion.span>
                  </span>
                </Link>
              </motion.div>
            </div>

            {/* Feature Blocks - Added mobile spacing */}
            <dl className="grid grid-cols-1 gap-x-8 gap-y-12 sm:gap-y-10 sm:grid-cols-2 lg:grid-cols-2 lg:pt-2 mt-12 sm:mt-0">
              {/* Professional Web Solutions */}
              <motion.div
                className="flex flex-col items-center sm:items-start text-center sm:text-left"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.3 }}
                variants={featureVariants}
              >
                <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                  </svg>
                </div>
                <dt className="mt-4 text-base font-semibold text-white">Professional Web Solutions</dt>
                <dd className="mt-2 text-base leading-7 text-gray-400">
                  Custom websites and apps tailored for your business needs, optimized for performance and growth.
                </dd>
              </motion.div>

              {/* Secure & Reliable */}
              <motion.div
                className="flex flex-col items-center sm:items-start text-center sm:text-left"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.3 }}
                variants={featureVariants}
              >
                <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <path d="M9 12l2 2 4-4" />
                  </svg>
                </div>
                <dt className="mt-4 text-base font-semibold text-white">Secure & Reliable</dt>
                <dd className="mt-2 text-base leading-7 text-gray-400">
                  Your business data is protected. We ensure security, privacy, and no spam in all communications.
                </dd>
              </motion.div>

              {/* Managed Hosting */}
              <motion.div
                className="flex flex-col items-center sm:items-start text-center sm:text-left"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.3 }}
                variants={featureVariants}
              >
                <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 15h18M3 9h18M4 21h16a1 1 0 0 0 1-1v-4H3v4a1 1 0 0 0 1 1zM4 3h16a1 1 0 0 1 1 1v4H3V4a1 1 0 0 1 1-1z" />
                  </svg>
                </div>
                <dt className="mt-4 text-base font-semibold text-white">Managed Hosting</dt>
                <dd className="mt-2 text-base leading-7 text-gray-400">
                  Focus on your business while we handle hosting, maintenance, backups, and server monitoring—your platforms, fully managed.
                </dd>
              </motion.div>

              {/* Business Emails */}
              <motion.div
                className="flex flex-col items-center sm:items-start text-center sm:text-left"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.3 }}
                variants={featureVariants}
              >
                <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 4h16v16H4z" />
                    <path d="M22 6l-10 7L2 6" />
                  </svg>
                </div>
                <dt className="mt-4 text-base font-semibold text-white">Business Emails</dt>
                <dd className="mt-2 text-base leading-7 text-gray-400">
                  Present a professional image with your own domain-based email accounts—no more generic Gmail. Boost trust and brand identity.
                </dd>
              </motion.div>
            </dl>
          </div>
        </div>

        {/* Decorative background */}
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
    </div>
  );
};

export default CompanyBoost;