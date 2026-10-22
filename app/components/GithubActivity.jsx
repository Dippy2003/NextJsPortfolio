'use client';

import dynamic from 'next/dynamic';
import { ArrowUpRight } from 'lucide-react';
import { Github } from './BrandIcons';
import { usePreferences } from './Preferences';
import { profile } from '../data/portfolio';
import Reveal from './Reveal';

const GitHubCalendar = dynamic(
  () => import('react-github-calendar').then((mod) => mod.GitHubCalendar),
  {
    ssr: false,
    loading: () => <div className="calendar-loading">Loading contribution activity…</div>,
  },
);

export default function GithubActivity() {
  const { theme } = usePreferences();
  return (
    <section id="github-activity" className="github-section shell">
      <Reveal className="github-panel">
        <div className="github-heading">
          <div>
            <span className="mini-label">
              <span className="status-dot" />
              THE WORK BETWEEN THE HIGHLIGHTS
            </span>
            <h2>
              Small commits. <span>Steady progress.</span>
            </h2>
          </div>
          <a className="text-link" href={profile.github} target="_blank" rel="noopener noreferrer">
            <Github size={17} />
            @Dippy2003
            <ArrowUpRight size={15} />
          </a>
        </div>
        <div
          className="calendar-scroll"
          tabIndex={0}
          role="region"
          aria-label="GitHub contribution calendar, scroll horizontally for the full year"
        >
          <GitHubCalendar
            username="Dippy2003"
            colorScheme={theme}
            blockSize={11}
            blockMargin={4}
            fontSize={12}
            showWeekdayLabels
            theme={{
              dark: ['#262a22', '#4b5234', '#747947', '#a0a166', '#d6c691'],
              light: ['#e3e0d4', '#c6c4a4', '#a1a372', '#7e8551', '#555d34'],
            }}
            style={{ color: 'var(--muted)', fontFamily: 'var(--font-body), sans-serif' }}
            labels={{ totalCount: '{{count}} contributions in the last year' }}
            errorMessage="Contribution activity is temporarily unavailable. Visit my GitHub profile to see the latest work."
          />
        </div>
        <p className="calendar-note">
          A live look at my public GitHub activity.<span>One experiment at a time.</span>
        </p>
      </Reveal>
    </section>
  );
}
