import { ArrowUpRight, BrainCircuit, ChartNoAxesCombined, Code2, Workflow } from 'lucide-react';
import Reveal from './Reveal';

const areas = [
  {
    icon: BrainCircuit,
    title: 'Intelligent systems',
    number: '01',
    description:
      'Machine learning, computer vision, and experiments that turn data into useful predictions.',
    tags: 'AI / ML · COMPUTER VISION',
  },
  {
    icon: ChartNoAxesCombined,
    title: 'Data into direction',
    number: '02',
    description:
      'From ETL pipelines and data warehouses to dashboards that help information tell its story.',
    tags: 'DATA ENGINEERING · ANALYTICS',
  },
  {
    icon: Code2,
    title: 'Ideas into interfaces',
    number: '03',
    description:
      'Thoughtful web and mobile experiences, from the first Figma prototype to a working application.',
    tags: 'FULL STACK · MOBILE · UI/UX',
  },
  {
    icon: Workflow,
    title: 'Connected intelligence',
    number: '04',
    description:
      'Context-aware RAG systems, AI agents, and workflows that connect tools and information.',
    tags: 'LLM AGENTS · AUTOMATION',
  },
];

export default function Services() {
  return (
    <section className="services-section shell" aria-labelledby="services-title">
      <Reveal>
        <div className="services-intro">
          <h2 id="services-title">
            Where I like to <span>make an impact.</span>
          </h2>
          <a className="text-link" href="#contact">
            Have something in mind? <ArrowUpRight size={16} />
          </a>
        </div>
      </Reveal>
      <div className="services-grid">
        {areas.map(({ icon: Icon, title, number, description, tags }, index) => (
          <Reveal key={title} delay={index * 0.05} className="service-item">
            <div className="service-top">
              <Icon size={26} strokeWidth={1.3} />
              <span>{number}</span>
            </div>
            <h3>{title}</h3>
            <p>{description}</p>
            <span className="service-tags">{tags}</span>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
