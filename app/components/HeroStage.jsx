'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { Player } from '@remotion/player';
import { useInView } from 'motion/react';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import portrait from '@/public/portrait-cutout.png';
import HeroComposition from '../remotion/HeroComposition';
import { usePreferences } from './Preferences';

export default function HeroStage() {
  const container = useRef(null);
  const player = useRef(null);
  const inView = useInView(container);
  const { motionEnabled, theme } = usePreferences();

  useEffect(() => {
    const sync = () => {
      if (!player.current) return;
      if (motionEnabled && inView && !document.hidden) player.current.play();
      else {
        player.current.pause();
        if (!motionEnabled) player.current.seekTo(90);
      }
    };
    sync();
    document.addEventListener('visibilitychange', sync);
    return () => document.removeEventListener('visibilitychange', sync);
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
          durationInFrames={600}
          compositionWidth={600}
          compositionHeight={680}
          fps={30}
          loop
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
