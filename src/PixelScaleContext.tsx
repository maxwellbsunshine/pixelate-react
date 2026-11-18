'use client'

import { createContext, useContext, useEffect, useState } from 'react';

export type PixelScaleValue = {
  /** Whole-number multiplier: 1 art pixel = `scale` screen pixels. */
  scale: number;
  windowWidth: number;
  windowHeight: number;
  /** False until the first measurement on the client. */
  ready: boolean;
};

const initialValue: PixelScaleValue = { scale: 1, windowWidth: 0, windowHeight: 0, ready: false };

const PixelScaleContext = createContext<PixelScaleValue>(initialValue);

/**
 * Picks the smallest whole-number scale at which a `baseWidth` x `baseHeight`
 * canvas covers the whole window, so pixel art never gets fractional
 * (blurry) pixels.
 */
export function PixelScaleProvider({ baseWidth, baseHeight, children }: {
  baseWidth: number;
  baseHeight: number;
  children: React.ReactNode;
}) {
  const [value, setValue] = useState<PixelScaleValue>(initialValue);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const scale = Math.max(1, Math.ceil(Math.max(w / baseWidth, h / baseHeight)));
      setValue({ scale, windowWidth: w, windowHeight: h, ready: true });
    };
    update();
    // 'resize' alone misses some cases (window dragged to a different-DPI
    // display, devtools detach/reattach) that leave a stale scale in place.
    window.addEventListener('resize', update);
    window.addEventListener('focus', update);
    document.addEventListener('visibilitychange', update);
    return () => {
      window.removeEventListener('resize', update);
      window.removeEventListener('focus', update);
      document.removeEventListener('visibilitychange', update);
    };
  }, [baseWidth, baseHeight]);

  return <PixelScaleContext.Provider value={value}>{children}</PixelScaleContext.Provider>;
}

export function usePixelScale() {
  return useContext(PixelScaleContext);
}
