'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { ArrowUpRight, Play, Search, X } from 'lucide-react';
import { Github } from './BrandIcons';
import { featuredProjects, profile, projects, skills } from '../data/portfolio';
import SectionLabel from './SectionLabel';
import Reveal from './Reveal';
import ProjectArt from './ProjectArt';
import DesignGallery from './DesignGallery';

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

const projectNotes = [
  [
    'Movement into feedback',
    'Explore exercise movement through pose estimation, repetition counting, and form feedback. The toolkit brings together Python, YOLO, OpenCV, and PyTorch.',
  ],
  [
    'Understand the workload',
    'Explore explainable football workload and fatigue-risk analytics. The project brings together Python, FastAPI, React, and TypeScript.',
  ],
  [
    'Give information context',
    'Explore semantic search over lecture notes using vector embeddings, Pinecone, and a Streamlit interface. Retrieval connects the question with relevant information.',
  ],
];

export default function Work() {
  const [category, setCategory] = useState('All projects');
  const [query, setQuery] = useState('');
  const [preview, setPreview] = useState(null);
  const archive = projects.filter((project) => !featuredProjects.includes(project));
  const pool = category === 'All projects' && !query.trim() ? archive : projects;
  const filtered = pool.filter(
    (project) =>
      (category === 'All projects' || project.category === category) &&
      `${project.title} ${project.description} ${project.category} ${project.technologies.join(' ')}`
        .toLowerCase()
        .includes(query.trim().toLowerCase()),
  );

  return (
    <section id="work" className="work-section section shell">
      <Reveal>
        <SectionLabel number="03">SELECTED EXPLORATIONS</SectionLabel>
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
              <details className="project-notes">
                <summary>
                  Inside the project <span aria-hidden="true">+</span>
                </summary>
                <h4>{projectNotes[index][0]}</h4>
                <p>{projectNotes[index][1]}</p>
                <a
                  className="text-link"
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Explore the implementation
                  <ArrowUpRight size={14} />
                </a>
              </details>
            </div>
          </Reveal>
        ))}
      </div>
      <DesignGallery />
      <div className="archive-heading">
        <h3>
          Every experiment, in one place
          <span> / {projects.length.toString().padStart(2, '0')}</span>
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
      <div className="project-search-row">
        <label className="project-search">
          <Search size={17} />
          <span className="sr-only">Search projects</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search projects, technologies, or topics…"
          />
          {query && (
            <button aria-label="Clear project search" onClick={() => setQuery('')}>
              <X size={15} />
            </button>
          )}
        </label>
        <span>
          {query || category !== 'All projects'
            ? `${filtered.length} matching projects`
            : `${featuredProjects.length} featured + ${archive.length} more explorations`}
        </span>
      </div>
      <div className="filter-tabs project-filters" role="group" aria-label="Filter projects">
        {filters.map((filter) => (
          <button
            key={filter}
            aria-pressed={category === filter}
            className={category === filter ? 'active' : ''}
            onClick={() => {
              setCategory(filter);
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
            <span className="filter-count" aria-hidden="true">
              {filter === 'All projects'
                ? projects.length
                : projects.filter((project) => project.category === filter).length}
            </span>
          </button>
        ))}
      </div>
      <div className="archive-list project-directory" aria-live="polite">
        {filtered.map((project) => (
          <a
            key={project.title}
            className="archive-row directory-card"
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
              {project.technologies.map((tech) => {
                const skill = skills.find((item) => item.name === tech);
                return (
                  <span key={tech}>
                    {skill && <Image src={`/tech/${skill.id}.svg`} width={13} height={13} alt="" />}
                    {tech}
                  </span>
                );
              })}
            </div>
            <ArrowUpRight size={19} />
          </a>
        ))}
        {!filtered.length && (
          <p className="empty-projects">
            No projects match this search. Try another technology or choose another category.
          </p>
        )}
      </div>
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
