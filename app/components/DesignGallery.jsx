import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { assets } from '@/assets/assets';
import { projects } from '../data/portfolio';
import Reveal from './Reveal';

export default function DesignGallery() {
  const designs = [
    {
      title: 'Jewelry, with a considered interface.',
      label: 'E-COMMERCE / INTERFACE DESIGN',
      image: assets.webdd,
      alt: 'Jewelry website interface design from my portfolio',
      project: 'Jewelry shop website',
    },
    {
      title: 'A connected campus experience.',
      label: 'UNIMATE / UI & UX EXPLORATION',
      image: assets.uni,
      alt: 'UniMate campus website interface design from my portfolio',
      project: 'UI/UX designing',
    },
  ];
  return (
    <div className="design-gallery">
      <div className="design-gallery-heading">
        <span className="mini-label">A DIFFERENT SIDE OF THE WORK</span>
        <h3>Interfaces with a point of view.</h3>
        <p>From data-heavy systems to the details of a first impression.</p>
      </div>
      <div className="design-gallery-grid">
        {designs.map((design, index) => {
          const project = projects.find((item) => item.title === design.project);
          return (
            <Reveal key={design.title} delay={index * 0.08}>
              <a
                className="design-gallery-card"
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="design-gallery-image">
                  <Image
                    src={design.image}
                    alt={design.alt}
                    sizes="(max-width: 600px) 90vw, 550px"
                  />
                </div>
                <div className="design-gallery-caption">
                  <div>
                    <span className="mini-label">{design.label}</span>
                    <h4>{design.title}</h4>
                  </div>
                  <ArrowUpRight size={24} />
                </div>
              </a>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
