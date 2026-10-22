'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { ArrowDown, ArrowUpRight, Play } from 'lucide-react';
import { Github } from './BrandIcons';
import { featuredProjects, profile, projects } from '../data/portfolio';
import SectionLabel from './SectionLabel';
import Reveal from './Reveal';
import ProjectArt from './ProjectArt';

const ProjectPreview = dynamic(() => import('./ProjectPreview'), { ssr: false });
const filters = [
  'All projects',
  'AI & Machine Learning',
  'AI Agents & RAG',
  'Data Engineering & BI',
  'Sports Analytics',
  'Software & Desktop Apps',
  'Mobile Development',
  'UI/UX & Design',
];

export default function Work() {
  const [category, setCategory] = useState('All projects');
  const [expanded, setExpanded] = useState(false);
  const [preview, setPreview] = useState(null);
  const archive = projects.filter((project) => !featuredProjects.includes(project));
  const filtered =
    category === 'All projects'
      ? archive
      : projects.filter((project) => project.category === category);
  const visible = expanded ? filtered : filtered.slice(0, 6);

  return (
    <section id="work" className="work-section section shell">
      <Reveal>
        <SectionLabel number="01">SELECTED EXPLORATIONS</SectionLabel>
        <div className="section-heading">
          <h2>
            Built with intent.
            <br />
            <span className="muted-heading">Driven by curiosity.</span>
          </h2>
          <p>
            A selection of experiments, ideas,
            <br />
            and problems I couldn’t leave alone.
          </p>
        </div>
      </Reveal>
      <div className="featured-grid">
        {featuredProjects.map((project, index) => (
          <Reveal
            key={project.title}
            delay={index * 0.08}
            className={`featured-card featured-${index}`}
          >
            <div className="project-art">
              <div className="project-art-top">
                <span>EXPLORATION 0{index + 1}</span>
                <span>↗</span>
              </div>
              <ProjectArt kind={index} />
              <button
                className="preview-button"
                onClick={() => setPreview(index)}
                aria-label={`Watch ${project.title} concept film`}
              >
                <Play size={12} fill="currentColor" />
                Play concept
              </button>
            </div>
            <div className="featured-content">
              <div className="project-category">
                <span>{project.category}</span>
                <span>0{index + 1}</span>
              </div>
              <a
                className="project-title-link"
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <h3>{project.title}</h3>
                <ArrowUpRight size={23} />
              </a>
              <p>{project.description}.</p>
              <div className="tech-tags">
                {project.technologies.map((tech) => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
      <div className="archive-heading">
        <h3>
          The exploration continues<span> / {archive.length.toString().padStart(2, '0')}</span>
        </h3>
        <a
          className="text-link"
          href={`${profile.github}?tab=repositories`}
          target="_blank"
          rel="noopener noreferrer"
        >
          All repositories <Github size={15} />
          <ArrowUpRight size={14} />
        </a>
      </div>
      <div className="filter-tabs project-filters" role="group" aria-label="Filter projects">
        {filters.map((filter) => (
          <button
            key={filter}
            aria-pressed={category === filter}
            className={category === filter ? 'active' : ''}
            onClick={() => {
              setCategory(filter);
              setExpanded(false);
            }}
          >
            {filter === 'AI & Machine Learning'
              ? 'AI & ML'
              : filter === 'Data Engineering & BI'
                ? 'Data & BI'
                : filter === 'Software & Desktop Apps'
                  ? 'Software'
                  : filter === 'Mobile Development'
                    ? 'Mobile'
                    : filter}
          </button>
        ))}
      </div>
      <div className="archive-list" aria-live="polite">
        {visible.map((project) => (
          <a
            key={project.title}
            className="archive-row"
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="archive-index">
              {(projects.indexOf(project) + 1).toString().padStart(2, '0')}
            </span>
            <div className="archive-name">
              <h4>{project.title}</h4>
              <p>{project.description}</p>
            </div>
            <span className="archive-category">{project.category}</span>
            <div className="archive-tech">
              {project.technologies.slice(0, 2).map((tech) => (
                <span key={tech}>{tech}</span>
              ))}
            </div>
            <ArrowUpRight size={19} />
          </a>
        ))}
        {!visible.length && (
          <p className="empty-projects">
            These projects are featured above. Explore their concept films or repositories.
          </p>
        )}
      </div>
      {filtered.length > 6 && (
        <button className="archive-more text-button" onClick={() => setExpanded(!expanded)}>
          {expanded ? 'Show fewer projects' : `Explore all ${filtered.length} projects`}
          <ArrowDown size={15} className={expanded ? 'rotate-up' : ''} />
        </button>
      )}
      {preview !== null && (
        <ProjectPreview
          project={featuredProjects[preview]}
          kind={preview}
          onDismiss={() => setPreview(null)}
        />
      )}
    </section>
  );
}
