import { act } from '@testing-library/react';
import { hydrateRoot } from 'react-dom/client';
import { renderToString } from 'react-dom/server';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import HeroStage from '../app/components/HeroStage';
import AboutStage from '../app/components/AboutStage';

const player = vi.hoisted(() => ({ play: vi.fn(), duration: 516 }));
vi.mock('../app/components/Preferences', () => ({
  usePreferences: () => ({ motionEnabled: true, theme: 'dark' }),
}));
vi.mock('motion/react', () => ({ useInView: () => true }));
vi.mock('next/image', () => ({
  default: () => <span data-portrait="true">Dipna Wijesinghe</span>,
}));
vi.mock('remotion', async (importOriginal) => {
  const real = await importOriginal();
  return {
    ...real,
    AbsoluteFill: ({ children, style }) => <div style={style}>{children}</div>,
    Img: ({ src, style }) => <span data-animation-image={src} style={style} />,
    staticFile: (path) => `/${path}`,
    useCurrentFrame: () => 0,
    useVideoConfig: () => ({ fps: 30, durationInFrames: player.duration }),
  };
});
vi.mock('@remotion/player', async () => {
  const { forwardRef, useImperativeHandle } = await import('react');
  return {
    Player: forwardRef(function Player({ component: Scene, inputProps, durationInFrames }, ref) {
      player.duration = durationInFrames;
      useImperativeHandle(
        ref,
        () => ({
          play: player.play,
          pause() {},
          seekTo() {},
          addEventListener() {},
          removeEventListener() {},
        }),
        [],
      );
      return (
        <div data-player-frame="true">
          <Scene {...inputProps} />
        </div>
      );
    }),
  };
});

beforeEach(() => {
  vi.clearAllMocks();
  vi.spyOn(document, 'hidden', 'get').mockReturnValue(false);
});
afterEach(() => vi.restoreAllMocks());

describe('Remotion stage hydration', () => {
  it.each([
    ['hero', HeroStage],
    ['About', AboutStage],
  ])('hydrates %s and starts playback after its player mounts', async (name, Stage) => {
    const html = renderToString(<Stage />);
    const container = document.createElement('div');
    container.innerHTML = html;
    document.body.append(container);
    // Reproduce the fractional CSS coordinate normalization in the browser
    // reported in the hydration error (418.850602...px becomes 418.851px).
    for (const element of container.querySelectorAll('[style]')) {
      if (element.style.left.includes('.'))
        element.style.left = `${Number.parseFloat(element.style.left).toFixed(3)}px`;
      if (element.style.top.includes('.'))
        element.style.top = `${Number.parseFloat(element.style.top).toFixed(3)}px`;
    }
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
    const recoverableError = vi.fn();
    let root;
    try {
      await act(async () => {
        root = hydrateRoot(container, <Stage />, { onRecoverableError: recoverableError });
      });
      expect(consoleError).not.toHaveBeenCalled();
      expect(recoverableError).not.toHaveBeenCalled();
      expect(html).not.toContain('data-player-frame');
      expect(container.querySelector('[data-player-frame]')).toBeTruthy();
      expect(player.play).toHaveBeenCalled();
      if (name === 'hero') expect(html).toContain('data-portrait');
    } finally {
      if (root) await act(async () => root.unmount());
      container.remove();
    }
  });
});
