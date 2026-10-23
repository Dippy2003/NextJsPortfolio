import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { act, render } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import HeroStage from '../app/components/HeroStage';

vi.mock('../app/components/Preferences', () => ({
  usePreferences: () => ({ motionEnabled: true, theme: 'dark' }),
}));
vi.mock('motion/react', () => ({ useInView: () => true }));
vi.mock('next/image', () => ({ default: () => <span aria-label="Dipna Wijesinghe" /> }));

// Model a fresh browser with no user activation: Web Audio cannot resume.
// The real Remotion Player and composition must advance without that permission.
const audioCreated = vi.fn();
const originalDecode = HTMLImageElement.prototype.decode;
class LockedAudioContext extends EventTarget {
  constructor() {
    super();
    audioCreated();
    this.state = 'suspended';
    this.currentTime = 0;
    this.destination = {};
  }
  createGain() {
    return {
      connect() {},
      gain: {
        value: 1,
        cancelScheduledValues() {},
        setValueAtTime() {},
        linearRampToValueAtTime() {},
      },
    };
  }
  getOutputTimestamp() {
    return { contextTime: 0, performanceTime: 0 };
  }
  resume() {
    return new Promise(() => {});
  }
  suspend() {
    return Promise.resolve();
  }
}

beforeEach(() => {
  vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout', 'performance'] });
  vi.stubGlobal('AudioContext', LockedAudioContext);
  vi.stubGlobal('requestAnimationFrame', (callback) =>
    setTimeout(() => callback(performance.now()), 1000 / 60),
  );
  vi.stubGlobal('cancelAnimationFrame', clearTimeout);
  vi.spyOn(document, 'hidden', 'get').mockReturnValue(false);
  vi.spyOn(document, 'visibilityState', 'get').mockReturnValue('visible');
  HTMLImageElement.prototype.decode = () => Promise.resolve();
  audioCreated.mockClear();
});

afterEach(() => {
  if (originalDecode) HTMLImageElement.prototype.decode = originalDecode;
  else delete HTMLImageElement.prototype.decode;
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

async function advance(milliseconds) {
  // Commit each browser tick so the real Player observes its new frame.
  for (let elapsed = 0; elapsed < milliseconds; elapsed += 20) {
    await act(async () => vi.advanceTimersByTimeAsync(20));
  }
}

describe('real hero playback without user activation', () => {
  it('reveals the icons and keeps orbiting on repeated fresh mounts without a click', async () => {
    for (let reload = 0; reload < 3; reload++) {
      const tree = (
        <StrictMode>
          <HeroStage />
        </StrictMode>
      );
      const container = document.createElement('div');
      container.innerHTML = renderToString(tree);
      document.body.append(container);
      const page = render(tree, { container, hydrate: true });
      await advance(1400);
      const icons = [...page.container.querySelectorAll('.hero-animation img')];
      expect(icons).toHaveLength(9);
      expect(icons.every((icon) => Number(icon.parentElement.style.opacity) === 1)).toBe(true);
      const firstPosition = icons[0].parentElement.style.left;
      await advance(1000);
      expect(icons[0].parentElement.style.left).not.toBe(firstPosition);
      expect(audioCreated).not.toHaveBeenCalled();
      page.unmount();
      container.remove();
    }
  }, 15000);
});
