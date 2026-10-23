import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import HeroComposition from '../app/remotion/HeroComposition';
import {
  getHeroOrbitPose,
  HERO_DURATION,
  HERO_FPS,
  HERO_IDLE_START,
  HERO_ITEMS,
} from '../app/remotion/heroMotion';

const timeline = vi.hoisted(() => ({ frame: 0 }));
vi.mock('remotion', async (importOriginal) => {
  const real = await importOriginal();
  return {
    ...real,
    AbsoluteFill: ({ children }) => <div>{children}</div>,
    Img: ({ src }) => <span data-logo={src} />,
    staticFile: (src) => `/${src}`,
    useCurrentFrame: () => timeline.frame,
    useVideoConfig: () => ({ fps: HERO_FPS, durationInFrames: HERO_DURATION }),
  };
});

describe('hero entrance timing and orbit', () => {
  it('settles every icon within 1.2 seconds and uses PNG images', () => {
    timeline.frame = Math.floor(1.2 * HERO_FPS);
    const { container } = render(<HeroComposition />);
    const logos = [...container.querySelectorAll('[data-logo]')];
    expect(logos).toHaveLength(9);
    for (const logo of logos) {
      expect(logo.dataset.logo).toMatch(/^\/tech\/.*\.png$/);
      expect(logo.parentElement.style.opacity).toBe('1');
      const translation = logo.parentElement.style.transform.match(
        /translate3d\(([^p]+)px, ([^p]+)px/,
      );
      expect(Math.abs(Number(translation[1]))).toBeLessThan(0.001);
      expect(Math.abs(Number(translation[2]))).toBeLessThan(0.001);
    }
  });

  it('moves around the portrait and joins the orbit loop without a position jump', () => {
    for (const item of HERO_ITEMS) {
      const start = getHeroOrbitPose(item, HERO_IDLE_START);
      const quarter = getHeroOrbitPose(item, HERO_IDLE_START + 120);
      const end = getHeroOrbitPose(item, HERO_DURATION);
      expect(Math.hypot(quarter.x - start.x, quarter.y - start.y)).toBeGreaterThan(200);
      for (const field of ['x', 'y', 'rotate', 'scale'])
        expect(end[field]).toBeCloseTo(start[field], 8);
      for (let frame = HERO_IDLE_START; frame < HERO_DURATION; frame += 20) {
        const pose = getHeroOrbitPose(item, frame);
        expect(pose.x).toBeGreaterThanOrEqual(0);
        expect(pose.x + item.size).toBeLessThanOrEqual(600);
        expect(pose.y).toBeGreaterThanOrEqual(0);
        expect(pose.y + item.size).toBeLessThanOrEqual(680);
        expect(
          Math.hypot(pose.x + item.size / 2 - 300, pose.y + item.size / 2 - 350),
        ).toBeGreaterThan(230);
      }
    }
  });
});
