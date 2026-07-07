import { getWorkData, assets } from '@/assets/assets'

const workData = getWorkData();
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
      </motion.p>

      {/* GRID */}
     <motion.div
      initial={{ opacity:0}}
        whileInView={{ opacity:1}}
        transition={{duration:0.9 ,delay:0.6}}
  
     
     className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 dark:text-white">

        {workData.map((project, index) => {
          const CardWrapper = project.link ? motion.a : motion.div;
          const wrapperProps = project.link ? {
            href: project.link,
            target: "_blank",
            rel: "noopener noreferrer"
          } : {};

          return (
          <CardWrapper
            key={index}
            whileHover={{ scale: 1.03 }}
            transition={{duration:0.3}}
            className="border-[0.5px] border-gray-400 rounded-xl p-6 cursor-pointer transition duration-500 hover:shadow-md hover:bg-gray-50 hover:-translate-y-1 hover:shadow-black dark:border-white/40 dark:hover:shadow-white dark:hover:bg-darkHover/50 flex flex-col h-full"
            {...wrapperProps}
          >
            <div className="flex-1">
              <h3 className="font-semibold text-lg text-gray-800 dark:text-white">{project.title}</h3>
              <p className="text-sm text-gray-600 dark:text-white/70 mt-1">{project.description}</p>
            </div>

            <div className="flex items-end justify-between mt-4">
              {project.technologies && (
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded dark:bg-darkHover dark:text-white/80">
                      {tech}
                    </span>
                  ))}
                </div>
              )}

              {project.link && (
                <div className="shrink-0 ml-3 border rounded-full border-black w-8 aspect-square flex items-center justify-center dark:border-white/60">
                  <Image
                    src={assets.send_icon}
                    alt="open project"
                    width={16} height={16}
                    className="w-4 dark:invert"
                  />
                </div>
              )}
            </div>

          </CardWrapper>
          );
        })}

      </motion.div>
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