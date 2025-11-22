import React, { useState } from 'react'
import Image from 'next/image'
import { assets } from '@/assets/assets'
import { motion } from "motion/react"

const Contact = () => {
  const [result, setResult] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    formData.append("access_key", "27b9bde2-2cc1-41ab-a92c-d1123430e015");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();
    setResult(data.success ? "Success!" : "Error");
  };

  return (
    <motion.div 
      id="contact"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="w-full px-[12%] py-10 scroll-mt-20 
                 bg-[url('/footer-bg-color.png')] bg-no-repeat 
                 bg-center bg-[length:90%_auto] dark:bg-none"
    >

      {/* Heading */}
      <motion.h4
        initial={{ y: -20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.4 }}
        className="text-center mb-2 text-lg font-ovo"
      >
        Contact with me
      </motion.h4>

      <motion.h2
        initial={{ y: -20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="text-center text-5xl font-ovo"
      >
        Get in touch
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.5 }}
        className="text-center max-w-2xl mx-auto mt-5 mb-12 font-ovo"
      >
        I am currently open to new opportunities and collaborations. Whether you
        have a project in mind, a question, or just want to say hello, feel free
        to reach out!
      </motion.p>

      {/* Contact Form */}
      <motion.form 
        onSubmit={onSubmit}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="max-w-2xl mx-auto"
      >

        {/* Name + Email Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10 mb-8">

          <motion.input
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.6 }}
            name="name"
            type="text"
            placeholder="Enter your name"
            required
            className="
              flex-1 p-3 outline-none border-[0.5px] border-gray-400
              rounded-md bg-white dark:bg-darkHover/30 dark:border-white/90
              shadow-[4px_4px_0_#000]
            "
          />

          <motion.input
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.7 }}
            name="email"
            type="email"
            placeholder="Enter your email"
            required
            className="
              flex-1 p-3 outline-none border-[0.5px] border-gray-400
              rounded-md bg-white dark:bg-darkHover/30 dark:border-white/90
              shadow-[4px_4px_0_#000]
            "
          />

        </div>

        {/* Message Box */}
        <motion.textarea
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.8 }}
          name="message"
          rows="6"
          placeholder="Enter your message"
          required
          className="
            w-full p-4 outline-none border-[0.5px] border-gray-400
            rounded-md bg-white mb-6 dark:bg-darkHover/30 dark:border-white/90
            shadow-[4px_4px_0_#000]
            focus:shadow-[6px_6px_0_#000] transition
          "
        ></motion.textarea>

        {/* Submit Button */}
        <motion.button
          type="submit"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.9 }}
          whileHover={{ scale: 1.05 }}
          className="
            px-10 py-3 rounded-full border border-black bg-black text-white 
            hover:bg-white hover:text-black 
            shadow-[4px_4px_0_#000] hover:shadow-[6px_6px_0_#000]
            transition font-ovo mx-auto block 
            dark:bg-transparent dark:border-white dark:text-white
            dark:hover:bg-darkHover dark:hover:text-white
          "
        >
          Submit now
        </motion.button>

        <p className="mt-4 text-center">{result}</p>

      </motion.form>
    </motion.div>
  );
};

export default Contact;