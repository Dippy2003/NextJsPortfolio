import { ArrowUpRight, BrainCircuit, Code2, GraduationCap, Workflow } from 'lucide-react';
import { profile } from '../data/portfolio';
import Reveal from './Reveal';
import SectionLabel from './SectionLabel';
import AboutStage from './AboutStage';

export default function About() {
  return (
    <section id="about" className="about-immersive section shell">
      <Reveal>
        <SectionLabel number="01">THE PERSON BEHIND THE PROJECTS</SectionLabel>
      </Reveal>
      <div className="about-immersive-layout">
        <AboutStage />
        <Reveal className="about-story">
          <span className="about-eyebrow">
            <span /> ALWAYS A WORK IN PROGRESS
          </span>
          <h2>
            Curiosity is my
            <br />
            <span>starting point.</span>
          </h2>
          <p className="about-introduction">
            Hi, I’m Dipna.
            <br />I connect the dots. Then build something with them.
          </p>
          <p>
            I’m a Data Science undergraduate at SLIIT, exploring the space between intelligent
            systems and thoughtful software.
          </p>
          <p>
            From understanding movement with computer vision to connecting information through RAG,
            I learn by experimenting—and bringing the ideas to life.
          </p>
          <div className="about-interests" aria-label="My areas of interest">
            <span>
              <BrainCircuit size={18} /> Intelligence
            </span>
            <span>
              <Workflow size={18} /> Connected data
            </span>
            <span>
              <Code2 size={18} /> Useful interfaces
            </span>
          </div>
          <div className="about-education">
            <span className="education-symbol">
              <GraduationCap size={24} strokeWidth={1.3} />
            </span>
            <div>
              <span>BSc (Hons) in Data Science</span>
              <small>SLIIT · Undergraduate</small>
            </div>
            <span className="education-index">01 / THE FOUNDATION</span>
          </div>
          <a
            className="text-link"
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            Get to know me <ArrowUpRight size={17} />
          </a>
        </Reveal>
      </div>
      <div className="about-manifesto">
        <span>A LITTLE CURIOSITY.</span>
        <span>A LOT OF POSSIBILITY.</span>
        <ArrowUpRight size={19} />
      </div>
    </section>
  );
}
