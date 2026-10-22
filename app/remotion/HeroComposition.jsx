import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

const orbitItems = [
  { id: 'python', x: 70, y: 140, size: 66, rotate: -12 },
  { id: 'react', x: 462, y: 170, size: 64, rotate: 12 },
  { id: 'pytorch', x: 30, y: 355, size: 54, rotate: -8 },
  { id: 'typescript', x: 480, y: 382, size: 48, rotate: 10 },
  { id: 'tensorflow', x: 115, y: 510, size: 48, rotate: -10 },
  { id: 'git', x: 430, y: 535, size: 48, rotate: 12 },
];

export default function HeroComposition({ theme = 'dark' }) {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const light = theme === 'light';
  const endFade = interpolate(frame, [durationInFrames - 24, durationInFrames - 1], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return (
    <AbsoluteFill style={{ overflow: 'visible', pointerEvents: 'none' }}>
      <div
        style={{
          position: 'absolute',
          inset: '8% 5% 2%',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(218,119,48,0.14), transparent 65%)',
          transform: `scale(${1 + Math.sin(frame / 60) * 0.035})`,
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
            transform: `rotate(${-28 + i * 16 + Math.sin(frame / 120) * 3}deg)`,
          }}
        />
      ))}
      {orbitItems.map((item, i) => {
        const entry = spring({
          frame: frame - 8 - i * 5,
          fps,
          config: { damping: 18, stiffness: 85 },
        });
        return (
          <div
            key={item.id}
            style={{
              position: 'absolute',
              left: item.x,
              top: item.y,
              width: item.size,
              height: item.size,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              background: light ? '#faf6ef' : '#1e1e1c',
              border: `1px solid ${light ? '#ded4c4' : '#39352d'}`,
              borderRadius: 17,
              boxShadow: '0 12px 30px rgba(0,0,0,.16)',
              opacity: entry * endFade,
              transform: `translateY(${(1 - entry) * 25 + Math.sin(frame / 35 + i) * 7}px) rotate(${item.rotate + Math.sin(frame / 50 + i) * 3}deg) scale(${0.7 + entry * 0.3})`,
            }}
          >
            <Img src={staticFile(`tech/${item.id}.svg`)} style={{ width: '51%', height: '51%' }} />
          </div>
        );
      })}
      <div
        style={{
          position: 'absolute',
          left: 5,
          top: 465,
          padding: '13px 17px',
          border: `1px solid ${light ? '#d5cab6' : '#39352d'}`,
          borderRadius: 12,
          background: light ? '#faf6ef' : '#191a17',
          color: light ? '#3a362d' : '#e5e1d6',
          fontSize: 13,
          fontFamily: 'monospace',
          transform: `translateY(${Math.sin(frame / 46) * 5}px)`,
          opacity:
            interpolate(frame, [35, 60], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }) * endFade,
        }}
      >
        <span style={{ color: '#bc995b' }}>const</span> curiosity ={' '}
        <span style={{ color: '#a6bf9b' }}>Infinity</span>;
      </div>
    </AbsoluteFill>
  );
}
