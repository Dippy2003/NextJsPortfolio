'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useInView } from 'motion/react';
import { ArrowUpRight, CornerDownLeft, Keyboard, List, Sparkles } from 'lucide-react';
import { projects, skillGroups, skills } from '../data/portfolio';
import { usePreferences } from './Preferences';
import SectionLabel from './SectionLabel';
import Reveal from './Reveal';
import SceneBoundary from './SceneBoundary';

const KeyboardScene = dynamic(() => import('./KeyboardScene'), {
  ssr: false,
  loading: () => (
    <div className="scene-loading">
      <Keyboard size={44} strokeWidth={1} />
      <span>Setting up the keyboard…</span>
    </div>
  ),
});

export default function Skills() {
  const [active, setActive] = useState('python');
  const [group, setGroup] = useState('All keys');
  const [listView, setListView] = useState(false);
  const section = useRef(null);
  const near = useInView(section, { margin: '200px', once: true });
  const inView = useInView(section);
  const { motionEnabled, reduced } = usePreferences();
  const selected = skills.find((skill) => skill.id === active);

  useEffect(() => {
    const onKey = (event) => {
      const target = event.target;
      if (
        !inView ||
        event.repeat ||
        event.ctrlKey ||
        event.metaKey ||
        event.altKey ||
        target.isContentEditable ||
        /^(INPUT|TEXTAREA|SELECT|BUTTON|A)$/.test(target.tagName)
      )
        return;
      const skill = skills.find((item) => item.key === event.key.toLowerCase());
      if (skill) {
        setActive(skill.id);
        setGroup('All keys');
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [inView]);

  return (
    <section className="toolkit-section section" id="skills" ref={section}>
      <div className="shell">
        <Reveal>
          <SectionLabel number="01">THE TOOLKIT</SectionLabel>
          <div className="section-heading">
            <h2>
              {skills.length} keys.
              <br />
              <span className="muted-heading">One curious mind.</span>
            </h2>
            <p>
              From programming foundations to intelligent systems.
              <br />
              Explore the whole stack, one key at a time.
            </p>
          </div>
        </Reveal>
        <div className="toolkit-toolbar">
          <div className="filter-tabs" role="group" aria-label="Highlight skill category">
            {skillGroups.map((item) => (
              <button
                key={item}
                className={group === item ? 'active' : ''}
                aria-pressed={group === item}
                onClick={() => {
                  setGroup(item);
                  if (item !== 'All keys') setActive(skills.find((s) => s.group === item).id);
                }}
              >
                {item}
              </button>
            ))}
          </div>
          <button
            className="text-button"
            aria-pressed={listView || reduced}
            onClick={() => setListView(!listView)}
            disabled={reduced}
          >
            <List size={15} />
            {listView || reduced ? 'List view' : 'Prefer a list?'}
          </button>
        </div>
        <div className="toolkit-layout">
          <div className="keyboard-display">
            {!listView && !reduced && (
              <div className="keyboard-canvas">
                <SceneBoundary>
                  {near && (
                    <KeyboardScene
                      active={active}
                      onSelect={setActive}
                      group={group}
                      motionEnabled={motionEnabled}
                      inView={inView}
                    />
                  )}
                </SceneBoundary>
              </div>
            )}
            <div
              className={`skill-buttons ${listView || reduced ? 'expanded' : ''}`}
              role="group"
              aria-label="Explore skills"
            >
              {skills
                .filter((skill) => group === 'All keys' || skill.group === group)
                .map((skill) => (
                  <button
                    key={skill.id}
                    className={`skill-button ${active === skill.id ? 'selected' : ''} ${group !== 'All keys' && group !== skill.group ? 'dimmed' : ''}`}
                    aria-pressed={active === skill.id}
                    aria-label={
                      skill.key ? `${skill.name}, shortcut ${skill.key.toUpperCase()}` : skill.name
                    }
                    aria-keyshortcuts={skill.key}
                    onClick={() => setActive(skill.id)}
                    style={{ '--key-color': skill.color }}
                  >
                    <Image src={`/tech/${skill.id}.svg`} width={16} height={16} alt="" />
                    <span>{skill.name}</span>
                    {skill.key && <kbd>{skill.key.toUpperCase()}</kbd>}
                  </button>
                ))}
            </div>
            <p className="keyboard-hint">
              <Keyboard size={14} />
              Hover to pause. Pick a key. Choose a category to zoom in.
              <CornerDownLeft size={13} />
            </p>
          </div>
          <aside className="skill-detail" aria-live="polite" aria-atomic="true">
            <div className="skill-detail-top">
              <span className="mini-label">CURRENTLY EXPLORING</span>
              <Sparkles size={15} />
            </div>
            <div className="detail-key" style={{ '--key-color': selected.color }}>
              <Image src={`/tech/${selected.id}.svg`} width={42} height={42} alt="" />
              {selected.key && <kbd>{selected.key.toUpperCase()}</kbd>}
            </div>
            <span className="skill-category">{selected.group}</span>
            <h3>{selected.name}</h3>
            <p>{selected.description}</p>
            <div className="related-projects">
              <span className="mini-label">
                {selected.projects.length ? 'EXPLORE IT IN MY WORK' : 'PART OF MY EVERYDAY TOOLKIT'}
              </span>
              {selected.projects.map((title) => {
                const project = projects.find((p) => p.title === title);
                return (
                  project && (
                    <a key={title} href={project.link} target="_blank" rel="noopener noreferrer">
                      {title}
                      <ArrowUpRight size={15} />
                    </a>
                  )
                );
              })}
              {!selected.projects.length && (
                <a href="#work">
                  Discover my projects
                  <ArrowUpRight size={15} />
                </a>
              )}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
