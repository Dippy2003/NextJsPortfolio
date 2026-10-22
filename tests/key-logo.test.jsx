import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import useKeyLogoTexture from '../app/components/useKeyLogoTexture';

const requests = vi.hoisted(() => []);
vi.mock('three', () => ({
  SRGBColorSpace: 'srgb',
  TextureLoader: class {
    load(url, onLoad, progress, onError) {
      requests.push({ url, onLoad, onError });
    }
  },
}));

describe('keyboard logo loading', () => {
  beforeEach(() => {
    requests.length = 0;
  });

  it('keeps rendering when an individual logo fails, and retries on remount', () => {
    const first = renderHook(() => useKeyLogoTexture('langchain'));
    expect(requests[0].url).toBe('/tech/langchain.png');
    act(() => requests[0].onError(new Error('Image failed to decode')));
    expect(first.result.current).toBeNull();
    first.unmount();
    const next = renderHook(() => useKeyLogoTexture('langchain'));
    const texture = { dispose: vi.fn() };
    act(() => requests[1].onLoad(texture));
    expect(next.result.current).toBe(texture);
    expect(texture.colorSpace).toBe('srgb');
    next.unmount();
    expect(texture.dispose).toHaveBeenCalledOnce();
  });

  it('disposes a texture that finishes loading after the keyboard unmounts', () => {
    const { unmount } = renderHook(() => useKeyLogoTexture('python'));
    unmount();
    const texture = { dispose: vi.fn() };
    act(() => requests[0].onLoad(texture));
    expect(texture.dispose).toHaveBeenCalledOnce();
  });
});
