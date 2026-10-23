import { act, fireEvent, render } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import AboutStage from '../app/components/AboutStage';
import ScrollEnergy from '../app/components/ScrollEnergy';

const state = vi.hoisted(() => ({
  motionEnabled: true,
  theme: 'dark',
  inView: true,
  play: vi.fn(),
  pause: vi.fn(),
  seekTo: vi.fn(),
  disconnect: vi.fn(),
}));
vi.mock('../app/components/Preferences', () => ({ usePreferences: () => state }));
vi.mock('motion/react', () => ({ useInView: () => state.inView }));
vi.mock('@remotion/player', async () => {
  const { forwardRef, useImperativeHandle } = await import('react');
  return {
    Player: forwardRef(function Player(props, ref) {
      useImperativeHandle(ref, () => ({
        play: state.play,
        pause: state.pause,
        seekTo: state.seekTo,
      }));
      return <div data-testid="portrait-player" />;
    }),
  };
});

beforeEach(() => {
  state.motionEnabled = true;
  state.theme = 'dark';
  state.inView = true;
  vi.clearAllMocks();
  vi.spyOn(document, 'hidden', 'get').mockReturnValue(false);
});
afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe('portrait motion', () => {
  it('pauses offscreen and in hidden tabs, and uses a still frame when motion is disabled', () => {
    const { rerender, container } = render(<AboutStage />);
    expect(state.play).toHaveBeenCalledOnce();
    state.inView = false;
    rerender(<AboutStage />);
    expect(state.pause).toHaveBeenCalled();
    state.inView = true;
    rerender(<AboutStage />);
    vi.spyOn(document, 'hidden', 'get').mockReturnValue(true);
    fireEvent(document, new Event('visibilitychange'));
    expect(state.pause).toHaveBeenCalledTimes(2);
    state.motionEnabled = false;
    rerender(<AboutStage />);
    expect(state.seekTo).toHaveBeenLastCalledWith(45);
    fireEvent.pointerMove(container.querySelector('.about-sculpture'), {
      clientX: 200,
      clientY: 200,
    });
    expect(
      container.querySelector('.about-sculpture').style.getPropertyValue('--about-tilt-x'),
    ).toBe('');
  });
});

describe('scroll energy lifecycle', () => {
  let frames;
  let request;
  let context;
  beforeEach(() => {
    frames = new Map();
    let id = 0;
    request = vi.fn((callback) => {
      frames.set(++id, callback);
      return id;
    });
    vi.stubGlobal('requestAnimationFrame', request);
    vi.stubGlobal(
      'cancelAnimationFrame',
      vi.fn((key) => frames.delete(key)),
    );
    vi.stubGlobal('scrollY', 0);
    vi.stubGlobal(
      'ResizeObserver',
      class {
        observe() {}
        disconnect() {
          state.disconnect();
        }
      },
    );
    const gradient = () => ({ addColorStop: vi.fn() });
    context = Object.fromEntries(
      [
        'setTransform',
        'clearRect',
        'beginPath',
        'lineTo',
        'moveTo',
        'stroke',
        'fillRect',
        'arc',
        'fill',
      ].map((key) => [key, vi.fn()]),
    );
    context.createLinearGradient = gradient;
    context.createRadialGradient = gradient;
    vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(context);
  });

  it('starts on scrolling, settles to rest, and stops scheduling frames', () => {
    render(<ScrollEnergy />);
    expect(request).not.toHaveBeenCalled();
    window.scrollY = 400;
    fireEvent.scroll(window);
    expect(frames.size).toBe(1);
    let ticks = 0;
    act(() => {
      while (frames.size && ticks < 240) {
        const [key, callback] = frames.entries().next().value;
        frames.delete(key);
        callback(++ticks * 16.67);
      }
    });
    expect(context.stroke).toHaveBeenCalled();
    expect(ticks).toBeLessThan(240);
    expect(frames.size).toBe(0);
  });

  it('does not animate while motion is disabled and cancels active work when paused', () => {
    state.motionEnabled = false;
    const { rerender } = render(<ScrollEnergy />);
    window.scrollY = 400;
    fireEvent.scroll(window);
    expect(request).not.toHaveBeenCalled();
    state.motionEnabled = true;
    rerender(<ScrollEnergy />);
    window.scrollY = 600;
    fireEvent.scroll(window);
    expect(frames.size).toBe(1);
    state.motionEnabled = false;
    rerender(<ScrollEnergy />);
    expect(frames.size).toBe(0);
    expect(state.disconnect).toHaveBeenCalledOnce();
    fireEvent.scroll(window);
    expect(request).toHaveBeenCalledOnce();
  });
});
