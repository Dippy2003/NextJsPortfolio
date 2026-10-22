import { ArrowUpRight, Boxes, Code2, Layers3, Sparkles } from 'lucide-react';
import { projects, skillCategories, skills } from '../data/portfolio';
import Reveal from './Reveal';

export default function PortfolioOverview() {
  const areas = new Set(projects.map((project) => project.category)).size;
  const stats = [
    {
      value: projects.length,
      label: 'Projects & experiments',
      note: 'Ideas made tangible',
      icon: Boxes,
      href: '#work',
    },
    {
      value: skills.length,
      label: 'Technologies explored',
      note: 'A connected toolkit',
      icon: Code2,
      href: '#skills',
    },
    {
      value: skillCategories.length,
      label: 'Skill disciplines',
      note: 'Foundations to intelligence',
      icon: Layers3,
      href: '#skills',
    },
    {
      value: areas,
      label: 'Areas of project work',
      note: 'One curious approach',
      icon: Sparkles,
      href: '#lab',
    },
  ];
  return (
    <section className="portfolio-overview shell" aria-label="Portfolio at a glance">
      {stats.map(({ value, label, note, icon: Icon, href }) => (
        <Reveal key={label}>
          <a href={href}>
            <div className="overview-top">
              <Icon size={19} strokeWidth={1.4} />
              <ArrowUpRight size={14} />
            </div>
            <strong>
              {value.toString().padStart(2, '0')}
              <span>+</span>
            </strong>
            <h2>{label}</h2>
            <p>{note}</p>
          </a>
        </Reveal>
      ))}
    </section>
  );
}
