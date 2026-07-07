"use client";

import React from "react";
import { motion } from "motion/react";
import { GitHubCalendar } from "react-github-calendar";

const GITHUB_USERNAME = "Dippy2003";

const GithubActivity = ({ isDarkMode }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      id="github-activity"
      className="w-full px-[12%] py-10 scroll-mt-20"
    >
      <motion.h4
        initial={{ y: -20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.5 }}
        className="text-center mb-2 text-lg font-ovo"
      >
        Open Source Activity
      </motion.h4>
      <motion.h2
        initial={{ y: -20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="text-center text-5xl font-ovo"
      >
        GitHub Contributions
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.5 }}
        className="text-center max-w-2xl mx-auto mt-5 mb-12 font-ovo"
      >
        Real-time contribution activity pulled live from my GitHub profile.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="max-w-4xl mx-auto rounded-2xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-darkHover/30 backdrop-blur-sm shadow-sm p-6 sm:p-8 overflow-x-auto"
      >
        <div className="min-w-[650px] flex justify-center">
          <GitHubCalendar
            username={GITHUB_USERNAME}
            colorScheme={isDarkMode ? "dark" : "light"}
            blockSize={12}
            blockMargin={4}
            fontSize={14}
            labels={{
              totalCount: "{{count}} contributions in the last year",
            }}
          />
        </div>
      </motion.div>

      <motion.a
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
        href={`https://github.com/${GITHUB_USERNAME}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-max flex items-center justify-center gap-2 text-gray-700 border-[0.5px] border-gray-700 rounded-full py-3 px-10 mx-auto mt-10 hover:bg-lightHover hover:shadow-md hover:-translate-y-1 duration-500 dark:text-white dark:border-white dark:hover:bg-darkHover"
      >
        View full GitHub profile
      </motion.a>
    </motion.div>
  );
};

export default GithubActivity;
