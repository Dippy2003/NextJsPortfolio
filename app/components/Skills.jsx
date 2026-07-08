"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { getTechIcon } from "@/assets/techIcons";

const Skills = ({ isDarkMode }) => {

  const skillsData = [
    {
      category: "Languages",
      technologies: ["JavaScript", "TypeScript", "Java", "PHP", "Kotlin", "Python", "C++", "C", "SQL", "HTML", "CSS"],
    },
    {
      category: "AI / Machine Learning",
      technologies: ["Python", "TensorFlow", "PyTorch", "Scikit-learn", "OpenCV", "Pandas", "NumPy", "Jupyter"],
    },
    {
      category: "Frontend",
      technologies: ["React", "Next.js", "HTML", "CSS", "Tailwind CSS"],
    },
    {
      category: "Backend",
      technologies: ["Node.js", "Express.js", "Django"],
    },
    {
      category: "Mobile Development",
      technologies: ["Kotlin", "Android"],
    },
    {
      category: "Database",
      technologies: ["MongoDB", "Firebase", "MySQL", "SQL Server"],
    },
    {
      category: "Data Engineering & BI",
      technologies: ["SQL Server", "SSAS", "Power BI", "ETL", "Pandas"],
    },
    {
      category: "DevOps & Tools",
      technologies: ["Git", "GitHub", "VSCode", "Figma", "AWS"],
    },
    {
      category: "AI Agents & LLM Tooling",
      technologies: ["OpenAI", "LangChain", "CrewAI", "RAG", "n8n", "Groq"],
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      id="skills"
      className="w-full px-[12%] py-20 scroll-mt-20 dark:bg-darkTheme/50"
    >
      {/* Title */}
      <motion.h2
        initial={{ y: -20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-center text-4xl md:text-5xl font-ovo mb-3 bg-linear-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent"
      >
        Skills & Technologies
      </motion.h2>
      <motion.p
        initial={{ y: -20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="text-center text-gray-600 dark:text-white/80 mb-12 font-ovo"
      >
        Technologies I work with
      </motion.p>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {skillsData.map((skill, index) => (
          <motion.div
            key={index}
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 * index }}
            whileHover={{ scale: 1.02 }}
            className="rounded-xl p-6 border border-purple-500/30 dark:border-purple-400/50 bg-white/80 dark:bg-darkHover/30 backdrop-blur-sm shadow-lg hover:shadow-purple-500/20 dark:hover:shadow-purple-400/30 transition-all duration-300"
            style={{
              boxShadow: isDarkMode
                ? "0 4px 20px rgba(139, 92, 246, 0.1), 0 0 0 1px rgba(139, 92, 246, 0.2)"
                : "0 4px 20px rgba(139, 92, 246, 0.1), 0 0 0 1px rgba(139, 92, 246, 0.1)",
            }}
          >
            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white font-ovo">
              {skill.category}
            </h3>
            <div className="flex flex-wrap gap-3">
              {skill.technologies.map((tech, techIndex) => {
                const iconUrl = getTechIcon(tech);
                return (
                  <motion.div
                    key={techIndex}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.05 * techIndex }}
                    whileHover={{ scale: 1.1 }}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-linear-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-500/20 dark:to-purple-500/20 border border-blue-500/20 dark:border-purple-400/30 text-sm font-medium text-gray-700 dark:text-white/90 hover:from-blue-500/20 hover:to-purple-500/20 dark:hover:from-blue-500/30 dark:hover:to-purple-500/30 transition-all duration-300 cursor-default"
                  >
                    {iconUrl && (
                      <Image
                        src={iconUrl}
                        alt={tech}
                        width={20}
                        height={20}
                        className="w-5 h-5"
                        unoptimized
                      />
                    )}
                    <span>{tech}</span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Skills;

