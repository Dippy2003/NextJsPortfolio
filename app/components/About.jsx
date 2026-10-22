import Image from 'next/image';
import { ArrowUpRight, GraduationCap, MapPin } from 'lucide-react';
import portrait from '@/assets/userdipna.png';
import { profile, projects } from '../data/portfolio';
import Reveal from './Reveal';
import SectionLabel from './SectionLabel';

export default function About() {
  return (
    <section id="about" className="about-section section shell">
      <Reveal>
        <SectionLabel number="03">THE PERSON BEHIND THE PROJECTS</SectionLabel>
      </Reveal>
      <div className="about-layout">
        <Reveal className="about-photo">
          <Image
            src={portrait}
            alt="Dipna Wijesinghe, Data Science undergraduate"
            sizes="(max-width: 700px) 80vw, 360px"
          />
          <div className="photo-label">
            <MapPin size={13} />
            Sri Lanka<span>✳</span>
          </div>
          <span className="photo-corner corner-tl" />
          <span className="photo-corner corner-br" />
        </Reveal>
        <Reveal className="about-copy">
          <h2>
            A curious mind.
            <br />
            <span className="muted-heading">A builder at heart.</span>
          </h2>
          <p className="about-lead">
            Hi, I’m Dipna. I like asking questions.
            <br />
            Even more, I like building the answers.
          </p>
          <p>
            I’m a Data Science undergraduate at SLIIT, exploring how intelligent systems and
            thoughtful software can turn complex problems into useful experiences.
          </p>
          <p>
            My work takes me from computer vision and machine learning to RAG systems, data
            pipelines, and full-stack applications. I learn by experimenting, connecting ideas, and
            making things.
          </p>
          <div className="about-facts">
            <div>
              <GraduationCap size={19} />
              <span>
                BSc (Hons) in Data Science<small>SLIIT · Undergraduate</small>
              </span>
            </div>
            <div>
              <span className="fact-number">
                {projects.length}
                <span>+</span>
              </span>
              <span>
                Projects & experiments<small>Across AI, data, web & mobile</small>
              </span>
            </div>
          </div>
          <a
            className="text-link"
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            A little more about me <ArrowUpRight size={17} />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
