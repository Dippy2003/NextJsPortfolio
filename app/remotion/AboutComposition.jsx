import { AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';

function Cube({ size, style, color }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        position: 'absolute',
        transformStyle: 'preserve-3d',
        ...style,
      }}
    >
      {[
        `translateZ(${size / 2}px)`,
        `rotateY(180deg) translateZ(${size / 2}px)`,
        `rotateY(90deg) translateZ(${size / 2}px)`,
        `rotateY(-90deg) translateZ(${size / 2}px)`,
        `rotateX(90deg) translateZ(${size / 2}px)`,
        `rotateX(-90deg) translateZ(${size / 2}px)`,
      ].map((transform, index) => (
        <div
          key={index}
          style={{
            position: 'absolute',
            inset: 0,
            border: `1px solid ${color}88`,
            background: `${color}08`,
            transform,
          }}
        />
      ))}
    </div>
  );
}

export default function AboutComposition({ theme = 'dark' }) {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const phase = (frame / durationInFrames) * Math.PI * 2;
  const light = theme === 'light';
  const ink = light ? '#343c30' : '#eeeade';
  const accent = light ? '#986b32' : '#dec087';
  const teal = light ? '#307a72' : '#7eb8a5';
  const panel = light ? '#e8e3d5' : '#20271f';
  return (
    <AbsoluteFill
      style={{ perspective: 1100, overflow: 'visible', fontFamily: 'Arial, sans-serif' }}
    >
      <div
        style={{
          position: 'absolute',
          width: 430,
          height: 430,
          left: 85,
          top: 100,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${accent}25 0%, ${teal}0b 45%, transparent 70%)`,
          filter: 'blur(25px)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 34,
          right: 34,
          top: 45,
          bottom: 45,
          backgroundImage: `radial-gradient(${accent}35 0.6px, transparent 0.6px)`,
          backgroundSize: '22px 22px',
          maskImage: 'radial-gradient(ellipse, black, transparent 70%)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          transformStyle: 'preserve-3d',
          transform: `rotateY(${Math.sin(phase) * 5}deg) rotateX(${Math.cos(phase) * 2}deg)`,
        }}
      >
        {[0, 1, 2].map((index) => (
          <div
            key={index}
            style={{
              position: 'absolute',
              width: 440 + index * 30,
              height: 440 + index * 30,
              left: 80 - index * 15,
              top: 105 - index * 15,
              borderRadius: '50%',
              border: `1px solid ${accent}${index === 0 ? '66' : '28'}`,
              borderTopColor: `${teal}99`,
              transform: `rotateX(${64 + index * 7}deg) rotateY(${index * 12 - 10}deg) rotateZ(${(frame / durationInFrames) * 360 * (index % 2 ? -1 : 1)}deg)`,
              boxShadow: index === 0 ? `0 0 24px ${accent}12` : 'none',
            }}
          />
        ))}
        <div
          style={{
            position: 'absolute',
            left: 175,
            top: 530,
            width: 280,
            height: 40,
            borderRadius: '50%',
            background: '#00000055',
            filter: 'blur(25px)',
            transform: 'rotateX(55deg)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: 158,
            top: 95,
            width: 284,
            height: 420,
            border: `1px solid ${accent}55`,
            borderRadius: 20,
            background: `linear-gradient(135deg, ${panel}, ${accent}18)`,
            transform: 'rotateY(-16deg) rotateZ(-6deg) translateZ(-35px)',
            boxShadow: '15px 30px 50px #00000028',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: 165,
            top: 88,
            width: 284,
            height: 420,
            borderRadius: 20,
            border: `1px solid ${accent}99`,
            background: `linear-gradient(145deg, ${light ? '#fbf7ec' : '#363c2e'}e8, ${panel}e8 60%)`,
            overflow: 'hidden',
            transform: `rotateY(-12deg) rotateZ(-5deg) translateY(${Math.sin(phase) * 7}px) translateZ(25px)`,
            boxShadow: `inset 0 1px 0 ${light ? '#ffffff' : '#fff4cf'}33, 0 30px 70px #00000035`,
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 24,
              left: 23,
              right: 23,
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: 9,
              letterSpacing: 2.1,
              color: accent,
            }}
          >
            <span>THE HUMAN ELEMENT</span>
            <span>DW / 01</span>
          </div>
          <div
            style={{
              position: 'absolute',
              left: 40,
              top: 70,
              width: 205,
              height: 205,
              borderRadius: '50%',
              border: `1px solid ${accent}55`,
              background: `radial-gradient(circle, ${accent}33, transparent 70%)`,
            }}
          />
          <Img
            src={staticFile('portrait-cutout.png')}
            style={{
              position: 'absolute',
              left: -10,
              bottom: 18,
              width: 305,
              height: 345,
              objectFit: 'contain',
              objectPosition: 'center bottom',
              filter: `drop-shadow(12px 12px 10px #00000035)`,
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 0,
              height: 135,
              background: `linear-gradient(transparent, ${panel}f5 65%)`,
            }}
          />
          <div style={{ position: 'absolute', left: 24, right: 24, bottom: 23, color: ink }}>
            <div style={{ fontSize: 25, letterSpacing: -1 }}>
              Dipna Wijesinghe<span style={{ color: accent }}>.</span>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: 9,
                color: accent,
                marginTop: 9,
                letterSpacing: 1.5,
              }}
            >
              <span>DATA SCIENCE STUDENT</span>
              <span>↗ LK</span>
            </div>
          </div>
        </div>
        <Cube
          size={74}
          color={teal}
          style={{
            left: 456,
            top: 137,
            transform: `rotateX(${25 + Math.sin(phase) * 20}deg) rotateY(${(frame / durationInFrames) * 360}deg) rotateZ(15deg) translateZ(55px)`,
          }}
        />
        <Cube
          size={37}
          color={accent}
          style={{
            left: 81,
            top: 425,
            transform: `rotateX(35deg) rotateY(${(-frame / durationInFrames) * 360}deg) rotateZ(25deg)`,
          }}
        />
        {[
          { id: 'python', text: 'ASK. EXPERIMENT.', x: 35, y: 183, tilt: -8 },
          { id: 'react', text: 'BUILD. REFINE.', x: 380, y: 352, tilt: 7 },
        ].map((item, index) => (
          <div
            key={item.id}
            style={{
              position: 'absolute',
              left: item.x,
              top: item.y,
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '15px 19px',
              border: `1px solid ${accent}66`,
              borderRadius: 12,
              background: light ? '#f4f0e7f2' : '#1b211bf2',
              color: ink,
              boxShadow: '0 15px 30px #00000020',
              transform: `translateZ(80px) rotateZ(${item.tilt}deg) translateY(${Math.sin(phase + index * Math.PI) * 12}px)`,
            }}
          >
            <Img src={staticFile(`tech/${item.id}.png`)} style={{ width: 28, height: 28 }} />
            <span style={{ fontSize: 9, letterSpacing: 1.2 }}>{item.text}</span>
          </div>
        ))}
        <div
          style={{
            position: 'absolute',
            left: 165,
            top: 569,
            width: 285,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 11,
            fontSize: 9,
            color: accent,
            letterSpacing: 2,
          }}
        >
          <span style={{ width: 5, height: 5, background: teal, borderRadius: '50%' }} /> BASED IN
          SRI LANKA <span style={{ color: `${accent}66` }}> / </span> THINKING BEYOND
        </div>
      </div>
    </AbsoluteFill>
  );
}
