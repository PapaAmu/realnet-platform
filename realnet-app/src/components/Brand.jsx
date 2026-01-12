"use client";

import React from "react";
import { motion } from "framer-motion";
import chaukeImg from "../assets/images/brands/chauke.jpeg";
import eaglenestImg from "../assets/images/brands/eaglenest.png";
import enkwaliImg from "../assets/images/brands/enkwali.png";
import etshadiImg from "../assets/images/brands/etshadi.png";
import hrholdingsImg from "../assets/images/brands/hrholdings.png";
import nnwImg from "../assets/images/brands/nnw.png";
import ritsImg from "../assets/images/brands/rits.webp";
import nosweleImg from "../assets/images/brands/noswele.png";
import northwestSundayImg from "../assets/images/brands/northwestsunday.png";
import inabellaImg from "../assets/images/brands/inabella.jpg";
import ukrebeImg from "../assets/images/brands/ukrebe.png";
import inawuImg from "../assets/images/brands/inawu.png";

const brands = [
  { id: 4, img: etshadiImg, alt: "Etshadi" },
  { id: 7, img: ritsImg, alt: "RITS" },
  { id: 1, img: chaukeImg, alt: "Chauke" },
  { id: 3, img: enkwaliImg, alt: "Enkwali" },
  { id: 5, img: hrholdingsImg, alt: "HR Holdings" },
  { id: 6, img: nnwImg, alt: "NNW" },
  { id: 2, img: eaglenestImg, alt: "Eagle Nest" },
  { id: 8, img: nosweleImg, alt: "Noswele" },
  { id: 9, img: northwestSundayImg, alt: "Northwest Sunday" },
  { id: 10, img: inabellaImg, alt: "Inabella" },
  { id: 11, img: ukrebeImg, alt: "Ukrebe" },
  { id: 12, img: inawuImg, alt: "Inawu" },
];

const Brand = () => {
  return (
    <div className="py-20 mb-12 bg-white">
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        {/* Title & Description */}
        <motion.div
          className="max-w-xl mx-auto text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: false }}
        >
          <h3 className="text-gray-800 text-3xl font-semibold sm:text-4xl">
            Brands work with us
          </h3>
          <p className="text-gray-600 mt-3 leading-relaxed">
            We've had the privilege of collaborating with leading brands and
            innovative businesses, delivering impactful solutions that drive
            growth, efficiency, and digital transformation.
          </p>
        </motion.div>

        {/* Brand Logos */}
        <div className="mt-12 flex justify-center">
          <ul className="inline-grid grid-cols-2 gap-x-10 gap-y-8 md:gap-x-16 md:grid-cols-3 lg:grid-cols-4">
            {brands.map((brand, index) => (
              <motion.li
                key={brand.id}
                className="flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.12,
                  ease: "easeOut",
                }}
                viewport={{ once: false }}
              >
                <img
                  src={brand.img.src}
                  alt={brand.alt}
                  className="w-28 h-16 object-contain"
                />
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Brand;