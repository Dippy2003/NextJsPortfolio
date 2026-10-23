export const HERO_FPS = 30;
export const HERO_INTRO_FRAMES = 24;
export const HERO_IDLE_START = 36;
export const HERO_ORBIT_FRAMES = HERO_FPS * 48;
export const HERO_DURATION = HERO_IDLE_START + HERO_ORBIT_FRAMES;

export const HERO_ITEMS = [
  {
    id: 'python',
    size: 66,
    rotate: -12,
    angle: -140,
    fromX: -560,
    fromY: -380,
    spin: -110,
    delay: 0,
  },
  {
    id: 'typescript',
    size: 48,
    rotate: 10,
    angle: 15,
    fromX: 560,
    fromY: 240,
    spin: 135,
    delay: 1,
  },
  { id: 'react', size: 64, rotate: 12, angle: -55, fromX: 530, fromY: -350, spin: 105, delay: 2 },
  {
    id: 'pytorch',
    size: 54,
    rotate: -8,
    angle: 170,
    fromX: -650,
    fromY: 150,
    spin: -150,
    delay: 3,
  },
  {
    id: 'tensorflow',
    size: 48,
    rotate: -10,
    angle: 130,
    fromX: -350,
    fromY: 520,
    spin: 95,
    delay: 4,
  },
  { id: 'git', size: 48, rotate: 12, angle: 50, fromX: 420, fromY: 530, spin: -100, delay: 5 },
  { id: 'opencv', size: 42, rotate: 8, angle: -170, fromX: -650, fromY: -120, spin: -90, delay: 6 },
  { id: 'figma', size: 42, rotate: -9, angle: -25, fromX: 520, fromY: -80, spin: 120, delay: 8 },
  { id: 'numpy', size: 38, rotate: 7, angle: 90, fromX: 120, fromY: 580, spin: -120, delay: 10 },
];

export function getHeroOrbitPose(item, frame, duration = HERO_DURATION) {
  const phase = (Math.max(0, frame - HERO_IDLE_START) / (duration - HERO_IDLE_START)) * Math.PI * 2;
  const angle = (item.angle / 180) * Math.PI + phase;
  return {
    x: 300 + Math.cos(angle) * 263 - item.size / 2,
    y: 350 + Math.sin(angle) * 248 - item.size / 2,
    rotate: item.rotate + Math.sin(angle) * 4,
    scale: 0.96 + Math.cos(angle) * 0.04,
  };
}
