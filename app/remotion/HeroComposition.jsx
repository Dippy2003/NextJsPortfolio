import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

import { HERO_ITEMS, HERO_INTRO_FRAMES, HERO_IDLE_START, getHeroOrbitPose } from './heroMotion';

export default function HeroComposition({ theme = 'dark' }) {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const light = theme === 'light';
  // After the opening, the Player repeats only this periodic idle range.
  const idlePhase =
    (Math.max(0, frame - HERO_IDLE_START) / (durationInFrames - HERO_IDLE_START)) * Math.PI * 2;
  const noteEntry = spring({
    frame: frame - 7,
    durationInFrames: HERO_INTRO_FRAMES,
    fps,
    config: { damping: 20, stiffness: 190, mass: 0.65 },
  });
  return (
    <AbsoluteFill style={{ overflow: 'visible', pointerEvents: 'none' }}>
      <div
        style={{
          position: 'absolute',
          inset: '8% 5% 2%',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(218,119,48,0.14), transparent 65%)',
          transform: `scale(${1 + Math.sin(idlePhase) * 0.035})`,
        }}
      />
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: 25 - i * 22,
            top: 110 + i * 8,
            width: 530 + i * 44,
            height: 420 + i * 42,
            border: `1px solid ${light ? 'rgba(101,64,29,.12)' : 'rgba(210,167,109,.09)'}`,
            borderRadius: '50%',
            transform: `rotate(${-28 + i * 16 + Math.sin(idlePhase + i) * 3}deg)`,
          }}
        />
      ))}
      {HERO_ITEMS.map((item, i) => {
        const entry = spring({
          frame: frame - item.delay,
          durationInFrames: HERO_INTRO_FRAMES,
          fps,
          config: { damping: 20, stiffness: 190, mass: 0.65 },
        });
        const remaining = 1 - entry;
        const arc = Math.sin(Math.PI * entry);
        const pose = getHeroOrbitPose(item, frame, durationInFrames);
        return (
          <div
            key={item.id}
            style={{
              position: 'absolute',
              left: pose.x,
              top: pose.y,
              width: item.size,
              height: item.size,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              background: light ? '#faf6ef' : '#1e1e1c',
              border: `1px solid ${light ? '#ded4c4' : '#39352d'}`,
              borderRadius: 17,
              boxShadow: '0 12px 30px rgba(0,0,0,.16)',
              opacity: interpolate(frame, [item.delay, item.delay + 3], [0, 1], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              }),
              willChange: 'transform',
              transform: `perspective(900px) translate3d(${remaining * item.fromX + arc * (i % 2 ? -70 : 70)}px, ${remaining * item.fromY - arc * 45}px, 0) rotateX(${remaining * 45}deg) rotateY(${remaining * (i % 2 ? -55 : 55)}deg) rotateZ(${pose.rotate + remaining * item.spin}deg) scale(${(0.36 + entry * 0.64) * pose.scale})`,
            }}
          >
            <Img
              src={staticFile(`tech/${item.id}.png`)}
              pauseWhenLoading={false}
              loading="eager"
              fetchPriority="high"
              style={{ width: '51%', height: '51%' }}
            />
          </div>
        );
      })}
      <div
        style={{
          position: 'absolute',
          left: 5,
          top: 625,
          padding: '13px 17px',
          border: `1px solid ${light ? '#d5cab6' : '#39352d'}`,
          borderRadius: 12,
          background: light ? '#faf6ef' : '#191a17',
          color: light ? '#3a362d' : '#e5e1d6',
          fontSize: 13,
          fontFamily: 'monospace',
          transform: `translate3d(${(1 - noteEntry) * -480}px, ${(1 - noteEntry) * 220 + Math.sin(idlePhase) * 5}px, 0) rotate(${(1 - noteEntry) * -20}deg)`,
          opacity: interpolate(frame, [7, 10], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
        }}
      >
        <span style={{ color: '#bc995b' }}>const</span> curiosity ={' '}
        <span style={{ color: '#a6bf9b' }}>Infinity</span>;
      </div>
    </AbsoluteFill>
  );
}
