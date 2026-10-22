'use client';

import { useEffect, useState } from 'react';
import { SRGBColorSpace, TextureLoader } from 'three';

// A failed logo must never reject the whole WebGL scene. Each key owns its
// texture, and failed requests can be retried when the scene is mounted again.
export default function useKeyLogoTexture(id) {
  const [loaded, setLoaded] = useState(null);

  useEffect(() => {
    let mounted = true;
    let texture;
    new TextureLoader().load(
      `/tech/${id}.png`,
      (result) => {
        if (!mounted) {
          result.dispose();
          return;
        }
        texture = result;
        texture.colorSpace = SRGBColorSpace;
        texture.needsUpdate = true;
        setLoaded({ id, texture });
      },
      undefined,
      () => {
        // Leave the physical key and the accessible skill controls available.
      },
    );
    return () => {
      mounted = false;
      texture?.dispose();
    };
  }, [id]);

  return loaded?.id === id ? loaded.texture : null;
}
