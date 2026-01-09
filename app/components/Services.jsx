"use client";

import { assets, serviceData } from "@/assets/assets";
import Image from "next/image";
import { motion } from "motion/react";

const Services = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      id="services"
      className="w-full px-[12%] py-10 scroll-mt-20"
    >
      {/* HEADING */}
      <motion.h4
        initial={{ y: -20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.5 }}
        className="text-center mb-2 text-lg font-ovo"
      >
        What I Offer
      </motion.h4>

      <motion.h2
        initial={{ y: -20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="text-center text-5xl font-ovo"
      >
        My Services
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.5 }}
        className="text-center max-w-2xl mx-auto mt-5 mb-12 font-ovo"
      >
        I offer a range of services including web design, mobile app development,
        UI/UX design and graphic design to help bring your ideas to life.
      </motion.p>

      {/* GRID */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.6 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-10"
      >
        {serviceData.map(({ icon, title, description, link }, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <div
              className="border-[0.5px] border-gray-400 rounded-xl p-6 cursor-pointer transition duration-500 hover:shadow-md hover:bg-gray-50 hover:-translate-y-1 dark:hover:bg-darkHover dark:hover:shadow-white"
            >
              <Image src={icon} alt={title} width={40} height={40} className="w-10" />

              <h3 className="my-4 font-semibold text-gray-700 dark:text-white">
                {title}
              </h3>

              <p className="text-gray-600 text-sm leading-5 dark:text-white/80">
                {description}
              </p>

              <a
                href={link}
                className="flex items-center gap-2 text-sm mt-5 dark:text-white"
              >
                Learn More{" "}
                <Image src={assets.right_arrow} alt="" width={16} height={16} className="w-4" />
              </a>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Services;