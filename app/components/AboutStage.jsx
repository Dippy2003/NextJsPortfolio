'use client';

import { useEffect, useRef, useState } from 'react';
import ClientRemotionPlayer from './ClientRemotionPlayer';
import { useInView } from 'motion/react';
import AboutComposition from '../remotion/AboutComposition';
import { usePreferences } from './Preferences';

export default function AboutStage() {
  const container = useRef(null);
  const [player, setPlayer] = useState(null);
  const inView = useInView(container, { amount: 0.15 });
  const { theme, motionEnabled } = usePreferences();

  useEffect(() => {
    const instance = player;
    if (!instance) return;
    const sync = () => {
      if (motionEnabled && inView && !document.hidden) instance.play();
      else {
        instance.pause();
        if (!motionEnabled) instance.seekTo(45);
      }
    };
    sync();
    document.addEventListener('visibilitychange', sync);
    return () => document.removeEventListener('visibilitychange', sync);
  }, [player, motionEnabled, inView]);

  return (
    <div
      className="about-sculpture"
      ref={container}
      onPointerMove={(event) => {
        if (!motionEnabled || event.pointerType === 'touch') return;
        const bounds = event.currentTarget.getBoundingClientRect();
        event.currentTarget.style.setProperty(
          '--about-tilt-x',
          `${(0.5 - (event.clientY - bounds.top) / bounds.height) * 8}deg`,
        );
        event.currentTarget.style.setProperty(
          '--about-tilt-y',
          `${((event.clientX - bounds.left) / bounds.width - 0.5) * 10}deg`,
        );
      }}
      onPointerLeave={(event) => {
        event.currentTarget.style.setProperty('--about-tilt-x', '0deg');
        event.currentTarget.style.setProperty('--about-tilt-y', '0deg');
      }}
    >
      <div className="about-sculpture-topline">
        <span>01 — A DIFFERENT PERSPECTIVE</span>
        <span>↗</span>
      </div>
      <div className="about-sculpture-player" aria-hidden="true">
        <ClientRemotionPlayer
          playerRef={setPlayer}
          component={AboutComposition}
          inputProps={{ theme }}
          durationInFrames={360}
          compositionWidth={600}
          compositionHeight={640}
          fps={30}
          loop
          initiallyMuted
          controls={false}
          clickToPlay={false}
          spaceKeyToPlayOrPause={false}
          numberOfSharedAudioTags={0}
          style={{ width: '100%', height: '100%', overflow: 'visible' }}
          errorFallback={() => (
            <div className="about-stage-fallback">
              Dipna Wijesinghe
              <br />
              <span>Data Science · SLIIT · Sri Lanka</span>
            </div>
          )}
        />
      </div>
      <span className="sr-only">
        A dimensional portrait of Dipna Wijesinghe with floating technology cards, orbital rings,
        and rotating wireframe cubes.
      </span>
      <div className="about-sculpture-bottomline">
        <span>HUMAN AT THE CORE.</span>
        <span>IDEAS IN ORBIT.</span>
      </div>
    </div>
  );
}
