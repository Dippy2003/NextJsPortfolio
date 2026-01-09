import React from 'react'
import Image from 'next/image'
import { assets } from '@/assets/assets'

const Footer = ({isDarkMode}) => {
  return (
    <div className="mt-0"> 
      {/* Logo + Email */}
      <div className="text-center">
        <Image 
          src={isDarkMode ? assets.witedipna:assets.dipna} 
          alt="footer-logo"
          width={144} height={48}
          className="w-36 mx-auto mb-2"
        />

       
      </div>

      {/* Bottom Section — Divider + Socials */}
      <div
        className="text-center sm:flex items-center justify-between border-t border-gray-400 mx-[10%] mt-6 py-6"
      >
        {/* Left side */}
        <p className="font-ovo mb-4 sm:mb-0">© 2025 Dipna. All rights reserved.</p>

        {/* Social links */}
        <ul className="flex items-center gap-10 justify-center font-ovo">
          <li>
            <a 
              href="https://github.com/Dippy2003" 
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              GitHub
            </a>
          </li>

          <li>
            <a 
              href="https://www.linkedin.com/in/dipna-wijesinghe-50401a396/?utm_source=share_via&utm_content=profile&utm_medium=member_ios" 
              target="_blank"
              className="hover:underline"
            >
              LinkedIn
            </a>
          </li>

          <li>
            <a 
              href="https://www.instagram.com/dippy_w/?igsh=YXg5c3F6cHpocXlr&utm_source=qr#" 
              target="_blank"
              className="hover:underline"
            >
              Instagram
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Footer