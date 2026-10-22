'use client';

import { createContext, useContext, useEffect, useState, useSyncExternalStore } from 'react';
import { MotionConfig } from 'motion/react';

const Preferences = createContext(null);
const subscribeMotion = (callback) => {
  const query = window.matchMedia('(prefers-reduced-motion: reduce)');
  query.addEventListener('change', callback);
  return () => query.removeEventListener('change', callback);
};
const getMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const getServerMotion = () => false;
let fallbackTheme = 'dark';
const subscribeTheme = (callback) => {
  window.addEventListener('storage', callback);
  window.addEventListener('portfolio-theme-change', callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener('portfolio-theme-change', callback);
  };
};
const getTheme = () => {
  try {
    const saved = localStorage.getItem('portfolio-theme');
    return saved === 'light' || saved === 'dark' ? saved : fallbackTheme;
  } catch {
    return fallbackTheme;
  }
};
const getServerTheme = () => 'dark';
const setTheme = (value) => {
  fallbackTheme = value;
  try {
    localStorage.setItem('portfolio-theme', value);
  } catch {
    /* In-memory theme still works when storage is unavailable. */
  }
  window.dispatchEvent(new Event('portfolio-theme-change'));
};

export function PreferencesProvider({ children }) {
  const reduced = useSyncExternalStore(subscribeMotion, getMotion, getServerMotion);
  const [paused, setPaused] = useState(false);
  const theme = useSyncExternalStore(subscribeTheme, getTheme, getServerTheme);
  const motionEnabled = !paused && !reduced;

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.dataset.motion = motionEnabled ? 'on' : 'off';
  }, [theme, motionEnabled]);

  return (
    <Preferences.Provider value={{ motionEnabled, paused, reduced, setPaused, theme, setTheme }}>
      <MotionConfig reducedMotion={motionEnabled ? 'never' : 'always'}>{children}</MotionConfig>
    </Preferences.Provider>
  );
}

export function usePreferences() {
  return useContext(Preferences);
}
