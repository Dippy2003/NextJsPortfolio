import {
  ArrowUpRight,
  BrainCircuit,
  Code2,
  Database,
  PenTool,
  Smartphone,
  Workflow,
} from 'lucide-react';
import { projects } from '../data/portfolio';
import Reveal from './Reveal';
import SectionLabel from './SectionLabel';

const areas = [
  {
    icon: BrainCircuit,
    title: 'AI & machine learning',
    description: 'Explore information through models, experiments, and visual intelligence.',
    capabilities: [
      'Classification & prediction',
      'Computer vision & pose estimation',
      'Deep learning experiments',
    ],
    project: 'RepVision',
    tags: 'PYTHON · PYTORCH · OPENCV',
  },
  {
    icon: Database,
    title: 'Data engineering & BI',
    description: 'Connect the parts between raw data and an insight someone can use.',
    capabilities: [
      'ETL pipelines & data warehouses',
      'OLAP cubes & analytical models',
      'Power BI dashboards',
    ],
    project: 'Hotel Data Warehouse ETL',
    tags: 'SQL SERVER · SSAS · POWER BI',
  },
  {
    icon: Code2,
    title: 'Web development',
    description: 'Bring application ideas to life through connected frontends and backends.',
    capabilities: [
      'Responsive React interfaces',
      'Backend APIs & application logic',
      'MERN application development',
    ],
    project: 'Mern project',
    tags: 'REACT · NODE.JS · MONGODB',
  },
  {
    icon: Smartphone,
    title: 'Mobile applications',
    description: 'Build useful, focused experiences that fit naturally into a mobile interface.',
    capabilities: [
      'Android application development',
      'Kotlin-based mobile interfaces',
      'Health & everyday utility apps',
    ],
    project: 'Health tracker app',
    tags: 'KOTLIN · ANDROID',
  },
  {
    icon: PenTool,
    title: 'UI/UX & interface design',
    description: 'Work through the structure and visual language before an idea becomes code.',
    capabilities: [
      'Interface exploration & layouts',
      'Figma prototypes',
      'Web & mobile design concepts',
    ],
    project: 'Jewelry shop website',
    tags: 'FIGMA · PROTOTYPING · UI DESIGN',
  },
  {
    icon: Workflow,
    title: 'AI agents & automation',
    description: 'Connect information, language models, and tools into a useful workflow.',
    capabilities: [
      'RAG & semantic retrieval',
      'Multi-agent content workflows',
      'Automated support-ticket routing',
    ],
    project: 'Pinecone RAG Studio',
    tags: 'RAG · CREWAI · N8N',
  },
];

export default function Services() {
  return (
    <section className="services-section shell" id="services" aria-labelledby="services-title">
      <Reveal>
        <SectionLabel number="05">HOW I CAN CONTRIBUTE</SectionLabel>
        <div className="section-heading">
          <h2 id="services-title">
            More than one way
            <br />
            <span className="muted-heading">to make an impact.</span>
          </h2>
          <p>
            From a first interface to an intelligent workflow.
            <br />
            Explore the areas I work across.
          </p>
        </div>
      </Reveal>
      <div className="services-grid expanded-services">
        {areas.map(
          (
            { icon: Icon, title, description, capabilities, project: projectTitle, tags },
            index,
          ) => {
            const project = projects.find((item) => item.title === projectTitle);
            return (
              <Reveal key={title} delay={(index % 3) * 0.04} className="service-item">
                <div className="service-top">
                  <span className="service-icon">
                    <Icon size={28} strokeWidth={1.3} />
                  </span>
                  <span>0{index + 1}</span>
                </div>
                <h3>{title}</h3>
                <p>{description}</p>
                <ul>
                  {capabilities.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <span className="service-tags">{tags}</span>
                <a href={project.link} target="_blank" rel="noopener noreferrer">
                  See related work
                  <ArrowUpRight size={15} />
                </a>
              </Reveal>
            );
          },
        )}
      </div>
      <div className="services-closing">
        <p>A project, an internship, or a chance to build something useful.</p>
        <a className="text-link" href="#contact">
          Let’s start a conversation
          <ArrowUpRight size={17} />
        </a>
      </div>
    </section>
  );
}
