import React from 'react'
import { assets } from '@/assets/assets'
import Image from 'next/image';
import { motion } from "motion/react"

const Header = ({isDarkMode}) => {
  return (
   <div className='w-11/12 max-w-3xl text-center mx-auto h-screen flex flex-col items-center justify-center gap-4 pt-32'>
        <motion.div 
        initial={{scale:0}}
        whileInView={{scale:1}}
        transition={{duration:0.8 ,type: 'spring',stiffness:100}}
        >
            <Image src={assets.dipnaheader} alt='' width={128} height={128} className='rounded-full w-32'/>
            
    </motion.div>
    <motion.h3 
    initial={{y:-20, opacity:0}}
        whileInView={{y:0, opacity:1}}
        transition={{duration:0.6 ,delay:0.3}}
    
    className='flex items-end gap-2 text-xl md:text-2xl mb-3 font-ovo'
             >Hi! I'm Dipna Wijesinghe <Image src={assets.hand_icon} alt='' width={24} height={24} className='w-6'/> </motion.h3>
             <motion.h1 
             initial={{y:-30, opacity:0}}
        whileInView={{y:0, opacity:1}}
        transition={{duration:0.8 ,delay:0.5}}
             
             
             className=' text-3xl sm:text-6xl lg:text-[66px] font-ovo'>AI/ML Enthusiast /Web Developer</motion.h1>
             <motion.p 

             initial={{opacity:0}}
        whileInView={{opacity:1}}
        transition={{duration:0.6 ,delay:0.7}}
             
             
             className='max-w-2xl mx-auto font-ovo'>
                I’m a self-driven Data Science undergraduate passionate about turning data into meaningful insights. With strong analytical skills and a problem-solving mindset, I aim to contribute to impactful, innovative projects while continuously learning and improving.
             </motion.p>
             <div className=' flex flex-col sm:flex-row items-center gap-4 mt-4' >
                <motion.a
                initial={{y:30, opacity:0}}
        whileInView={{y:0, opacity:1}}
        transition={{duration:0.6 ,delay:1}}
                
                href='#contact' className='px-10 py-3 border border-white rounded-full bg-black text-white flex items-center gap-2 dark:bg-transparent '>
                    contact me <Image src={assets.right_arrow_white} alt='' width={16} height={16} className='w-4'/> </motion.a>
                <motion.a 
                 initial={{y:30, opacity:0}}
        whileInView={{y:0, opacity:1}}
        transition={{duration:0.6 ,delay:1.2}}
                
                href="/DIPNA_WIJESINGHE.pdf" download="DIPNA_WIJESINGHE.pdf" className='px-10 py-3 border rounded-full border-gray-500 flex items-center gap-2 bg-white dark:text-black'>Download
                my resume <Image src={assets.download_icon} alt='' width={16} height={16} className='w-4'/> </motion.a>
             </div>
        </div>
  )
}

export default Header