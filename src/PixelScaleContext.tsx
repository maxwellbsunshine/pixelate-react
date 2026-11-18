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
 *
 * Set `debug` to show the current scale and window size in the top-left corner.
 */
export function PixelScaleProvider({ baseWidth, baseHeight, debug = false, children }: {
  baseWidth: number;
  baseHeight: number;
  debug?: boolean;
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

  return (
    <PixelScaleContext.Provider value={value}>
      {debug && <ScaleDebug {...value} />}
      {children}
    </PixelScaleContext.Provider>
  );
}

/** Overlay showing the scale, window size and the art-pixel size of the window. */
function ScaleDebug({ scale, windowWidth, windowHeight }: PixelScaleValue) {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 9999,
        padding: '4px 8px',
        background: 'rgba(0, 0, 0, 0.7)',
        color: '#fff',
        font: '12px monospace',
        pointerEvents: 'none',
      }}
    >
      scale: {scale} | window: {windowWidth}×{windowHeight} | art: {Math.round(windowWidth / scale)}×{Math.round(windowHeight / scale)}
    </div>
  );
}

export function usePixelScale() {
  return useContext(PixelScaleContext);
}
