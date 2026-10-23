'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Player } from '@remotion/player';
import { useInView } from 'motion/react';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import portrait from '@/public/portrait-cutout.png';
import HeroComposition from '../remotion/HeroComposition';
import { HERO_DURATION, HERO_FPS, HERO_IDLE_START } from '../remotion/heroMotion';
import { usePreferences } from './Preferences';

export default function HeroStage() {
  const container = useRef(null);
  const player = useRef(null);
  // Start the above-the-fold hero immediately, before IntersectionObserver runs.
  const inView = useInView(container, { initial: true });
  const [entryComplete, setEntryComplete] = useState(false);
  const { motionEnabled, theme } = usePreferences();

  useEffect(() => {
    const instance = player.current;
    if (!instance) return;
    const sync = () => {
      if (motionEnabled && inView && !document.hidden) instance.play();
      else {
        instance.pause();
        if (!motionEnabled) instance.seekTo(HERO_IDLE_START);
      }
    };
    const finishEntry = (event) => {
      if (event.detail.frame < HERO_IDLE_START) return;
      setEntryComplete(true);
      instance.removeEventListener('frameupdate', finishEntry);
    };
    instance.addEventListener('frameupdate', finishEntry);
    sync();
    document.addEventListener('visibilitychange', sync);
    return () => {
      instance.removeEventListener('frameupdate', finishEntry);
      document.removeEventListener('visibilitychange', sync);
    };
  }, [motionEnabled, inView]);

  return (
    <div className="hero-stage" ref={container}>
      <div className="portrait-halo" />
      <div className="portrait-arch">
        <Image
          src={portrait}
          alt="Dipna Wijesinghe"
          preload
          sizes="(max-width: 600px) 72vw, (max-width: 1000px) 45vw, 420px"
          className="hero-portrait"
        />
      </div>
      <div className="hero-animation" aria-hidden="true">
        <Player
          ref={player}
          component={HeroComposition}
          inputProps={{ theme }}
          durationInFrames={HERO_DURATION}
          compositionWidth={600}
          compositionHeight={680}
          fps={HERO_FPS}
          initialFrame={0}
          autoPlay={motionEnabled}
          loop
          inFrame={entryComplete ? HERO_IDLE_START : 0}
          numberOfSharedAudioTags={0}
          muted
          controls={false}
          clickToPlay={false}
          spaceKeyToPlayOrPause={false}
          style={{ width: '100%', height: '100%', overflow: 'visible' }}
          errorFallback={() => null}
        />
      </div>
      <div className="portrait-caption">
        <span className="tiny-cross">+</span>
        <span>BUILDING WITH PURPOSE</span>
        <Sparkles size={13} />
      </div>
      <a className="portrait-note" href="#about">
        <span>
          A little curiosity.
          <br />A lot of possibility.
        </span>
        <ArrowUpRight size={20} />
      </a>
    </div>
  );
}
