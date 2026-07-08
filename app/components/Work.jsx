import { getWorkData, workCategoryOrder, assets } from '@/assets/assets'
import { getTechIcon } from '@/assets/techIcons'

const workData = getWorkData();
const groupedWork = workCategoryOrder
  .map((category) => ({
    category,
    projects: workData.filter((project) => project.category === category),
  }))
  .filter((group) => group.projects.length > 0);

const GITHUB_ICON = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg';

import React from 'react'
import Image from 'next/image'
import { motion } from "motion/react"

const Work = ({isDarkMode}) => {
  return (
    <motion.div
     initial={{opacity:0}}
        whileInView={{ opacity:1}}
        transition={{duration:1}}

    className="w-full px-[12%] py-10 scroll-mt-20" id="work">

      <motion.h4  initial={{y:-20, opacity:0}}
        whileInView={{y:0, opacity:1}}
        transition={{duration:0.3 ,delay:0.5}}
        className="text-center mb-2 text-lg font-ovo">My Portfolio</motion.h4>
      <motion.h2 initial={{y:-20, opacity:0}}
        whileInView={{y:0, opacity:1}}
        transition={{duration:0.5 ,delay:0.5}}
        className="text-center text-5xl font-ovo">My Latest Work</motion.h2>

      <motion.p

       initial={{opacity:0}}
        whileInView={{ opacity:1}}
        transition={{duration:0.7,delay:0.5}}
        className="text-center max-w-2xl mx-auto mt-5 mb-12 font-ovo">
        A selection of recent work spanning AI/ML, computer vision, LLM agents &amp;
        RAG systems, data engineering &amp; BI, and full-stack/mobile development.
        Click any card to open the repository.
      </motion.p>

      {groupedWork.map((group, groupIndex) => (
        <div key={group.category} className="mb-14 last:mb-0">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-4 mb-6"
          >
            <h3 className="text-xl sm:text-2xl font-ovo font-semibold bg-linear-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent whitespace-nowrap">
              {group.category}
            </h3>
            <span className="flex-1 h-px bg-linear-to-r from-purple-500/30 to-transparent dark:from-purple-400/30" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.1 * groupIndex }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 dark:text-white"
          >

        {group.projects.map((project, index) => {
          const CardWrapper = project.link ? motion.a : motion.div;
          const wrapperProps = project.link ? {
            href: project.link,
            target: "_blank",
            rel: "noopener noreferrer"
          } : {};

          return (
          <CardWrapper
            key={index}
            whileHover={{ scale: 1.03, y: -6 }}
            transition={{duration:0.3}}
            className="relative rounded-2xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-darkHover/30 backdrop-blur-sm p-6 shadow-sm hover:shadow-xl hover:shadow-purple-500/10 dark:hover:shadow-purple-400/10 hover:border-purple-400/50 dark:hover:border-purple-400/40 transition-all duration-300 cursor-pointer group flex flex-col h-full"
            style={{
              boxShadow: isDarkMode
                ? "0 4px 20px rgba(139, 92, 246, 0.06)"
                : "0 4px 20px rgba(139, 92, 246, 0.06)",
            }}
            {...wrapperProps}
          >
            {project.isNew && (
              <span className="absolute -top-2.5 -right-2.5 bg-emerald-500 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-lg shadow-emerald-500/30">
                New
              </span>
            )}

            <div className="flex-1">
              <h3 className="font-semibold text-lg text-gray-800 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors">
                {project.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-white/70 mt-1">{project.description}</p>

              {project.technologies && (
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {project.technologies.map((tech, techIndex) => {
                    const techIcon = getTechIcon(tech);
                    return (
                      <span key={techIndex} className="inline-flex items-center gap-1.5 text-xs font-medium bg-purple-500/10 text-purple-700 dark:bg-purple-400/10 dark:text-purple-200 px-2.5 py-1 rounded-full">
                        {techIcon && (
                          <Image
                            src={techIcon}
                            alt=""
                            width={12} height={12}
                            className="w-3 h-3"
                            unoptimized
                          />
                        )}
                        {tech}
                      </span>
                    );
                  })}
                </div>
              )}
            </div>

            {project.link && (
              <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-200 dark:border-white/10 text-sm font-medium text-gray-600 dark:text-white/70 group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors">
                <span className="flex items-center gap-2">
                  <Image
                    src={GITHUB_ICON}
                    alt=""
                    width={16} height={16}
                    className="w-4 dark:invert opacity-70"
                    unoptimized
                  />
                  View Repository
                </span>
                <Image
                  src={isDarkMode ? assets.right_arrow_bold_dark : assets.right_arrow_bold}
                  alt=""
                  width={14} height={14}
                  className="w-3.5 group-hover:translate-x-1 transition-transform"
                />
              </div>
            )}

          </CardWrapper>
          );
        })}

          </motion.div>
        </div>
      ))}
      <motion.a

      initial={{ opacity:0}}
        whileInView={{ opacity:1}}
        transition={{duration:1.1 ,delay:0.5}}
      
      
      href="https://github.com/Dippy2003?tab=repositories" target="_blank" rel="noopener noreferrer" className='w-max flex items-center justify-center gap-2 text-gray-700 border-[0.5px] border-gray-700 rounded-full py-3 px-10 mx-auto my-20 hover:bg-lightHover hover:shadow-md hover:-translate-y-1 duration-500 dark:text-white dark:border-white dark:hover:bg-darkHover'>
        Show more on GitHub <Image src={isDarkMode ? assets.right_arrow_bold_dark: assets.right_arrow_bold} alt="right arrow" width={16} height={16} className="w-4 inline-block ml-2"/>
      </motion.a>

    </motion.div>
  )
}

export default Work;