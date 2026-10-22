import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import ProjectArt from '../components/ProjectArt';

export default function ProjectReel({ title, description, kind = 0, technologies = [] }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({ frame: frame - 8, fps, config: { damping: 20 } });
  const visual = spring({ frame: frame - 28, fps, config: { damping: 22 } });
  const accent = ['#c6d9a9', '#d7a373', '#b8b0d5'][kind];
  return (
    <AbsoluteFill
      style={{
        background: '#101410',
        color: '#e9eadf',
        padding: 60,
        fontFamily: 'sans-serif',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(ellipse at 85% 40%, ${accent}15, transparent 60%)`,
        }}
      />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          color: '#8d9586',
          fontSize: 12,
          letterSpacing: 3,
        }}
      >
        <span>DIPNA WIJESINGHE / SELECTED WORK</span>
        <span>CONCEPT VISUALIZATION</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', flex: 1, gap: 20 }}>
        <div
          style={{ width: '39%', opacity: enter, transform: `translateY(${(1 - enter) * 30}px)` }}
        >
          <div style={{ color: accent, fontSize: 13, letterSpacing: 3, marginBottom: 18 }}>
            0{kind + 1} / PROJECT EXPLORATION
          </div>
          <h1 style={{ fontSize: 53, lineHeight: 1.05, letterSpacing: -2, margin: '0 0 24px' }}>
            {title}
          </h1>
          <p style={{ color: '#a5ad9a', fontSize: 20, lineHeight: 1.6 }}>{description}</p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 24 }}>
            {technologies.map((tech, i) => (
              <span
                key={tech}
                style={{
                  color: accent,
                  border: `1px solid ${accent}35`,
                  padding: '8px 12px',
                  fontSize: 12,
                  borderRadius: 20,
                  opacity: interpolate(frame, [60 + i * 8, 78 + i * 8], [0, 1], {
                    extrapolateLeft: 'clamp',
                    extrapolateRight: 'clamp',
                  }),
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
        <div
          style={{
            width: '65%',
            opacity: visual,
            transform: `translateX(${(1 - visual) * 70}px) rotate(${(1 - visual) * 5}deg) scale(${0.97 + Math.sin(frame / 65) * 0.015})`,
          }}
        >
          <ProjectArt kind={kind} />
        </div>
      </div>
      <div style={{ height: 1, background: '#30372b', position: 'relative' }}>
        <div style={{ height: 1, background: accent, width: `${(frame / 239) * 100}%` }} />
      </div>
      <div style={{ marginTop: 18, fontSize: 11, letterSpacing: 2, color: '#8d9586' }}>
        AI · DATA · DEVELOPMENT{' '}
        <span style={{ float: 'right' }}>EXPLORE THE REPOSITORY FOR IMPLEMENTATION</span>
      </div>
    </AbsoluteFill>
  );
}
