import React from 'react'
import { assets } from '@/assets/assets'
import Image from 'next/image';

const Header = () => {
  return (
   <div className='w-11/12 max-w-3xl text-center mx-auto h-screen flex flex-col items-center justify-center gap-4 pt-32'>
        <div>
            <Image src={assets.dipnaheader} alt=''  className='rounded-full w-32'/>
            

    </div >
    <h3 className='flex items-end gap-2 text-xl md:text-2xl mb-3 font-ovo'
             >Hi! I'm Dipna Wijesinghe <Image src={assets.hand_icon} alt='' className='w-6'/> </h3>
             <h1 className=' text-3xl sm:text-6xl lg:text-[66px] font-ovo'>AI/ML Enthusiast /Web Developer</h1>
             <p className='max-w-2xl mx-auto font-ovo'>
                I’m a self-driven Data Science undergraduate passionate about turning data into meaningful insights. With strong analytical skills and a problem-solving mindset, I aim to contribute to impactful, innovative projects while continuously learning and improving.
             </p>
             <div className=' flex flex-col sm:flex-row items-center gap-4 mt-4'>
                <a href='#contact' className='px-10 py-3 border border-white rounded-full bg-black text-white flex items-center gap-2 '>
                    contact me <Image src={assets.right_arrow_white} alt=''  className='w-4'/> </a>
                <a href='/sam.pdf' download className='px-10 py-3 border rounded-full border-gray-500 flex items-center gap-2'>Download
                my resume <Image src={assets.download_icon} alt=''  className='w-4'/> </a>
             </div>
        </div>
  )
}

export default Header