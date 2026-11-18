'use client'

import { usePixelScale } from '../../src/PixelScaleContext';

export default function Page() {
  const { scale, ready } = usePixelScale();

  // Wait for the first measurement so nothing renders at the wrong size.
  if (!ready) return null;

  // Convert art pixels to screen pixels.
  const px = (artPixels: number) => `${artPixels * scale}px`;

  return (
    <main style={{ display: 'grid', placeItems: 'center', gap: px(8), height: '100vh' }}>
      {/* sprite.png is 8x8, so it is drawn at 8 art pixels. */}
      <img src="/sprite.png" alt="Smiley" className="pixelated" width={8 * scale} height={8 * scale} />

      <h1 className="pixel-font" style={{ fontSize: px(8), margin: 0 }}>Hello, pixels!</h1>

      <p className="mono-font" style={{ fontSize: px(5), margin: 0 }}>scale: {scale}x</p>
    </main>
  );
}
