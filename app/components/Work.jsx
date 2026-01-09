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
        I offer a range of services including web design, mobile app development,
        UI/UX design, and creative solutions to bring your ideas to life.
      </motion.p>

      {/* GRID */}
     <motion.div
      initial={{ opacity:0}}
        whileInView={{ opacity:1}}
        transition={{duration:0.9 ,delay:0.6}}
  
     
     className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 dark:text-white">

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
            whileHover={{ scale: 1.05 }}
            transition={{duration:0.3}}
            className="aspect-square bg-no-repeat bg-cover bg-center rounded-lg relative cursor-pointer group block"
            style={{ backgroundImage: `url(${typeof project.bgImage === 'string' ? project.bgImage : (project.bgImage?.src || project.bgImage)})` }}
            {...wrapperProps}
          >
            {/* Floating white info card */}
            <div 
              className="bg-white w-10/12 rounded-md absolute bottom-5 left-1/2 -translate-x-1/2 py-3 px-5 flex items-center justify-between duration-500 group-hover:bottom-7"
            >
              {/* Text section */}
              <div className="flex-1">
                <h2 className="font-semibold">{project.title}</h2>
                <p className="text-sm text-gray-700">{project.description}</p>
                {project.technologies && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {project.technologies.map((tech, techIndex) => (
                      <span key={techIndex} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded dark:bg-darkHover dark:text-white/80">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* NEW CIRCULAR SHADOW BUTTON */}
              <div 
                className="border rounded-full border-black w-9 aspect-square flex items-center justify-center shadow-[2px_2px_0_#000] group-hover:bg-lime-300 transition pointer-events-none"
              >
                <Image 
                  src={assets.send_icon} 
                  alt="send icon" 
                  width={20} height={20}
                  className="w-5"
                />
              </div>

            </div>

          </CardWrapper>
          );
        })}

      </motion.div>
      <motion.a 

      initial={{ opacity:0}}
        whileInView={{ opacity:1}}
        transition={{duration:1.1 ,delay:0.5}}
      
      
      href="https://www.linkedin.com/in/dipna-wijesinghe-50401a396/?utm_source=share_via&utm_content=profile&utm_medium=member_ios" target="_blank" rel="noopener noreferrer" className='w-max flex items-center justify-center gap-2 text-gray-700 border-[0.5px] border-gray-700 rounded-full py-3 px-10 mx-auto my-20 hover:bg-lightHover hover:shadow-md hover:-translate-y-1 duration-500 dark:text-white dark:border-white dark:hover:bg-darkHover'>
        Show more <Image src={isDarkMode ? assets.right_arrow_bold_dark: assets.right_arrow_bold} alt="right arrow" width={16} height={16} className="w-4 inline-block ml-2"/>
      </motion.a>

    </motion.div>
  )
}

export default Work;