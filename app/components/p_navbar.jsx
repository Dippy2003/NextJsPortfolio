'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Menu, Moon, Pause, Play, Sun, X } from 'lucide-react';
import { usePreferences } from './Preferences';

const links = [
  ['Work', '#work'],
  ['My toolkit', '#skills'],
  ['The lab', '#lab'],
  ['About', '#about'],
];

export default function PNavbar() {
  const [open, setOpen] = useState(false);
  const menuButton = useRef(null);
  const { motionEnabled, reduced, setPaused, theme, setTheme } = usePreferences();

  useEffect(() => {
    if (!open) return;
    const onEscape = (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    window.addEventListener('keydown', onEscape);
    return () => window.removeEventListener('keydown', onEscape);
  }, [open]);

  return (
    <header className="site-header">
      <nav className="nav-shell shell" aria-label="Main navigation">
        <a className="wordmark" href="#home" aria-label="Dipna, home">
          dipna<span>.</span>
        </a>
        <div className="desktop-nav">
          {links.map(([label, href]) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
        </div>
        <div className="nav-actions">
          <button
            className="icon-button motion-toggle"
            onClick={() => setPaused(motionEnabled)}
            aria-label={
              reduced
                ? 'Animations follow your reduced-motion preference'
                : motionEnabled
                  ? 'Pause animations'
                  : 'Resume animations'
            }
            aria-pressed={!motionEnabled}
            disabled={reduced}
            title={motionEnabled ? 'Pause animations' : 'Animations paused'}
          >
            {motionEnabled ? <Pause size={15} /> : <Play size={15} />}
          </button>
          <button
            className="icon-button"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
          </button>
          <a className="nav-contact" href="#contact">
            Let’s talk <ArrowUpRight size={16} />
          </a>
          <button
            ref={menuButton}
            className="icon-button menu-toggle"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close navigation' : 'Open navigation'}
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>
      {open && (
        <nav className="mobile-nav" id="mobile-nav" aria-label="Mobile navigation">
          {[...links, ['Contact', '#contact']].map(([label, href]) => (
            <a key={href} href={href} onClick={() => setOpen(false)}>
              {label}
              <ArrowUpRight size={18} />
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
