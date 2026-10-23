'use client';

import { useSyncExternalStore } from 'react';
import { Player } from '@remotion/player';

const subscribe = () => () => {};
const clientSnapshot = () => true;
const serverSnapshot = () => false;

export default function ClientRemotionPlayer({ playerRef, ...props }) {
  // Keep server HTML and the first hydration pass identical. The already-loaded
  // Player mounts immediately afterward, with no timer or extra dynamic import.
  const mounted = useSyncExternalStore(subscribe, clientSnapshot, serverSnapshot);
  return mounted ? <Player {...props} ref={playerRef} /> : null;
}
