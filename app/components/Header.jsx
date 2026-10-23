import { ArrowDown, ArrowDownRight, ArrowUpRight, Download } from 'lucide-react';
import { Github, Linkedin } from './BrandIcons';
import { profile, projects } from '../data/portfolio';
import HeroStage from './HeroStage';

export default function Header() {
  return (
    <section id="home" className="hero shell">
      <div className="hero-copy">
        <div className="availability">
          <span className="status-dot" />
          Open to opportunities<span className="availability-divider">/</span>Sri Lanka
        </div>
        <p className="hero-intro">
          HEY THERE, I’M DIPNA WIJESINGHE <span className="hello-star">✳</span>
        </p>
        <h1>
          Curiosity.
          <br />
          Code.
          <br />
          <span className="accent-word">
            Possibility<span className="accent-period">.</span>
          </span>
        </h1>
        <p className="hero-description">
          I turn data into insights and ideas into experiences.
          <br className="desktop-break" /> A Data Science undergraduate exploring the intersection
          of <strong>AI, data, and thoughtful development.</strong>
        </p>
        <div className="hero-expertise">
          <span>Computer vision</span>
          <span>RAG & AI agents</span>
          <span>Data engineering</span>
        </div>
        <div className="hero-buttons">
          <a className="button button-primary" href="#work">
            Explore my work <ArrowUpRight size={18} />
          </a>
          <a
            className="button button-ghost"
            href={profile.resume}
            download="Dipna_Wijesinghe_Resume.pdf"
          >
            My résumé <Download size={16} />
          </a>
        </div>
        <div className="hero-socials">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Dipna on GitHub"
          >
            <Github size={18} />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Dipna on LinkedIn"
          >
            <Linkedin size={18} />
          </a>
          <span className="social-rule" />
          <span>ALWAYS LEARNING. ALWAYS BUILDING.</span>
        </div>
      </div>
      <HeroStage />
      <div className="hero-bottom">
        <a className="scroll-cue" href="#work">
          <span className="scroll-circle">
            <ArrowDown size={15} />
          </span>
          SCROLL TO DISCOVER
        </a>
        <span className="hero-coordinate">
          LOCAL IDEAS <span>·</span> GLOBAL POSSIBILITIES
        </span>
        <span className="hero-project-count">
          <strong>{projects.length}</strong> projects & counting <ArrowDownRight size={18} />
        </span>
      </div>
      <div className="hero-rail" aria-hidden="true">
        DATA SCIENCE <span>✳</span> INTELLIGENT SYSTEMS <span>✳</span> THOUGHTFUL INTERFACES{' '}
        <span>✳</span> NEVER STOP EXPLORING <ArrowUpRight size={18} />
      </div>
    </section>
  );
}
