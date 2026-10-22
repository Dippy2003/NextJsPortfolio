'use client';

import { useEffect, useRef } from 'react';
import { Player } from '@remotion/player';
import { ArrowUpRight, X } from 'lucide-react';
import ProjectReel from '../remotion/ProjectReel';
import { usePreferences } from './Preferences';

export default function ProjectPreview({ project, kind, onDismiss }) {
  const dialog = useRef(null);
  const player = useRef(null);
  const { motionEnabled } = usePreferences();
  useEffect(() => {
    const element = dialog.current;
    element.showModal();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = overflow;
    };
  }, []);
  useEffect(() => {
    if (!motionEnabled) {
      player.current?.pause();
      player.current?.seekTo(110);
    }
  }, [motionEnabled]);
  return (
    <dialog
      ref={dialog}
      className="project-dialog"
      aria-labelledby="preview-title"
      onClose={onDismiss}
      onClick={(event) => {
        if (event.target === dialog.current) dialog.current.close();
      }}
    >
      <div className="dialog-heading">
        <div>
          <span className="mini-label">PROJECT CONCEPT FILM</span>
          <h2 id="preview-title">{project.title}</h2>
        </div>
        <button
          className="icon-button"
          aria-label="Close project preview"
          onClick={() => dialog.current.close()}
          autoFocus
        >
          <X size={20} />
        </button>
      </div>
      <Player
        ref={player}
        component={ProjectReel}
        inputProps={{
          title: project.title,
          description: project.description,
          technologies: project.technologies,
          kind,
        }}
        compositionWidth={1280}
        compositionHeight={720}
        fps={30}
        durationInFrames={240}
        controls
        autoPlay={motionEnabled}
        muted
        style={{ width: '100%', aspectRatio: '16 / 9', borderRadius: 8 }}
        errorFallback={() => (
          <div className="scene-fallback">
            This preview could not load. Explore the repository below.
          </div>
        )}
      />
      <div className="dialog-footer">
        <p>An animated illustration of the project concept.</p>
        <a className="text-link" href={project.link} target="_blank" rel="noopener noreferrer">
          Explore repository <ArrowUpRight size={16} />
        </a>
      </div>
    </dialog>
  );
}
