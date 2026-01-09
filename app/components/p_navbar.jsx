import { assets } from '@/assets/assets'
import Image from 'next/image'
import React, { useRef, useState, useEffect } from 'react'

const PNavbar = ({isDarkMode,setIsDarkMode}) => {
  const [isScroll, setIsScroll] = useState(false);
  const sideMenuRef = useRef();

  const openSideMenu = () => {
    sideMenuRef.current.style.transform = "translateX(0)";
  };

  const closeSideMenu = () => {
    sideMenuRef.current.style.transform = "translateX(16rem)";
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScroll(true);
      } else {
        setIsScroll(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Background Shape */}
      <div className="fixed top-0 right-0 w-11/12 -z-10 translate-y-[-80%] dark:hidden">
        <Image src={assets.header_bg_color} alt="" width={1200} height={800} className="w-full" />
      </div>

      {/* Navbar */}
      <nav
        className={`w-full h-20 fixed top-0 px-5 lg:px-8 xl:px-[8%] flex items-center justify-between z-50 transition-all duration-300 ${
          isScroll ? "bg-white/60 backdrop-blur-lg shadow-sm dark:bg-darkTheme dark:shadow-white/20" : ""
        }`}
      >
        {/* Logo */}
        <a href="#top">
          <Image
            src={isDarkMode ? assets.witedipna : assets.dipna}
            alt=""
            width={120} height={40}
            className="w-30 cursor-pointer mr-14"
          />
        </a>

        {/* Desktop Menu */}
        <ul className={`hidden md:flex items-center gap-6 lg:gap-8 rounded-full px-12 py-3 ${isScroll? "":"bg-white shadow-sm bg-opacity-60 dark:border dark:border-white/50 dark:bg-transparent"} `}>
          <li><a className="font-ovo" href="#top">Home</a></li>
          <li><a className="font-ovo" href="#about">About me</a></li>
          <li><a className="font-ovo" href="#skills">Skills</a></li>
          <li><a className="font-ovo" href="#services">Services</a></li>
          <li><a className="font-ovo" href="#work">My Work</a></li>
          <li><a className="font-ovo" href="#contact">Contact me</a></li>
        </ul>

        {/* Right Side Buttons */}
        <div className="flex items-center gap-4">
          <button onClick={()=> setIsDarkMode(prev =>!prev)}>
            <Image src={isDarkMode ?assets.sun_icon : assets.moon_icon} alt="" width={24} height={24} className="w-6" />
          </button>

          <a
            href="#contact"
            className="hidden lg:flex font-ovo items-center gap-3 px-10 py-2.5 border border-gray-500 rounded-full ml-4 dark:border-white/50"
          >
            Contact
            <Image src={isDarkMode ? assets.arrow_icon_dark : assets.arrow_icon} alt="" width={12} height={12} className="w-3" />
          </a>

          <button className="block md:hidden ml-3" onClick={openSideMenu}>
            <Image src={ isDarkMode ? assets.menu_white:assets.menu_black} alt="" width={24} height={24} className="w-6" />
          </button>
        </div>

        {/* Mobile Side Menu */}
        <ul
          ref={sideMenuRef}
          className="flex md:hidden flex-col gap-4 py-20 px-10 fixed right-0 top-0 bottom-0 w-64 h-screen z-50 bg-rose-50 transition-transform duration-500 dark:bg-darkHover dark:text-white"
          style={{ transform: "translateX(16rem)" }}
        >
          <div className="absolute right-6 top-6" onClick={closeSideMenu}>
            <Image src={ isDarkMode ? assets.close_white:assets.close_black} alt="" width={20} height={20} className="w-5 cursor-pointer" />
          </div>

          <li><a onClick={closeSideMenu} className="font-ovo" href="#top">Home</a></li>
          <li><a onClick={closeSideMenu} className="font-ovo" href="#about">About me</a></li>
          <li><a onClick={closeSideMenu} className="font-ovo" href="#skills">Skills</a></li>
          <li><a onClick={closeSideMenu} className="font-ovo" href="#services">Services</a></li>
          <li><a onClick={closeSideMenu} className="font-ovo" href="#work">My Work</a></li>
          <li><a onClick={closeSideMenu} className="font-ovo" href="#contact">Contact me</a></li>
        </ul>
      </nav>
    </>
  );
};

export default PNavbar;