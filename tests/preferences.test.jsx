import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { PreferencesProvider } from '../app/components/Preferences';
import PNavbar from '../app/components/p_navbar';

function installMediaQuery(reduce) {
  vi.stubGlobal('matchMedia', () => ({
    matches: reduce,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }));
}

afterEach(() => {
  localStorage.clear();
  vi.unstubAllGlobals();
});

describe('visitor preferences and navigation', () => {
  it('pauses motion, resumes it, and persists the selected theme', () => {
    installMediaQuery(false);
    render(
      <PreferencesProvider>
        <PNavbar />
      </PreferencesProvider>,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Pause animations' }));
    expect(document.documentElement.dataset.motion).toBe('off');
    fireEvent.click(screen.getByRole('button', { name: 'Resume animations' }));
    expect(document.documentElement.dataset.motion).toBe('on');
    fireEvent.click(screen.getByRole('button', { name: 'Switch to light theme' }));
    expect(document.documentElement.dataset.theme).toBe('light');
    expect(localStorage.getItem('portfolio-theme')).toBe('light');
  });

  it('respects a system reduced-motion preference', () => {
    installMediaQuery(true);
    render(
      <PreferencesProvider>
        <PNavbar />
      </PreferencesProvider>,
    );
    const control = screen.getByRole('button', {
      name: 'Animations follow your reduced-motion preference',
    });
    expect(control.disabled).toBe(true);
    expect(document.documentElement.dataset.motion).toBe('off');
  });

  it('opens the mobile links and closes them on Escape', () => {
    installMediaQuery(false);
    render(
      <PreferencesProvider>
        <PNavbar />
      </PreferencesProvider>,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Open navigation' }));
    expect(document.querySelector('#mobile-nav')).toBeTruthy();
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(document.querySelector('#mobile-nav')).toBeNull();
    expect(document.activeElement).toBe(screen.getByRole('button', { name: 'Open navigation' }));
  });
});
