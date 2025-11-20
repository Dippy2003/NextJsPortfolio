import { assets, infoList, toolsData } from '@/assets/assets'
import React from 'react'
import Image from 'next/image';

const About = () => {
  return (
    <div id="about" className="w-full px-[12%] py-10 scroll-mt-20">

      {/* Titles */}
      <h4 className="text-center mb-2 text-lg font-ovo">Introduction</h4>
      <h2 className="text-center text-5xl font-ovo">About Me</h2>

      {/* Main Layout */}
      <div className="flex w-full flex-col lg:flex-row items-start gap-20 my-20">

        {/* LEFT SIDE — Image */}
        <div className="w-64 sm:w-80 rounded-3xl max-w-none">
          <Image
            src={assets.userdipna}
            alt="user"
            className="w-full rounded-3xl object-cover"
          />
        </div>

        {/* RIGHT SIDE — Text + Info List */}
        <div className="flex-1">
          <p className="mb-10 max-w-2xl font-ovo">
            I’m a self-driven Data Science undergraduate passionate about turning
            data into meaningful insights. With strong analytical skills and a 
            problem-solving mindset, I aim to contribute to impactful, innovative 
            projects while continuously learning and improving.
          </p>

          {/* Info List */}
         <ul className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl">

  {infoList.map(({ icon, iconDark, title, description }, index) => (
    <li
      key={index}
      className="border-[0.5px] border-gray-400 rounded-xl p-6 cursor-pointer transition hover:shadow-md hover:bg-gray-50 hover:-translate-y-1 duration-500 hover:shadow-black"
    >
      <Image
        src={icon}
        alt={title}
        className="w-7 mt-3"
      />

      <h3 className="my-4 font-semibold text-gray-700">
        {title}
      </h3>

      <p className="text-gray-600 text-sm">
        {description}
      </p>
    </li>
  ))}

</ul>
        <h4 className='my-6 text-gray-700 font-ovo'>Tools I use</h4>
        <ul className='flex items-center gap-3 sm:gap-5'>
            {toolsData.map((tool,index)=>(
                <li className='flex items-center justify-center w-12 sm:w-14 aspect-square border border-gray-400 rounded-lg cursor-pointer hover:shadow-md hover:bg-gray-50 hover:-translate-y-1 duration-500' key={index}><Image src={tool} alt='Tool'className='w-5 sm:w-7'/></li>
            ))}

        </ul>



        </div>
      </div>

    </div>
  )
}

export default About;