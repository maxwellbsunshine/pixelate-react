'use client'

import { usePixelScale } from '../../src/PixelScaleContext';

export default function Page() {
  const { scale, ready } = usePixelScale();

  // Wait for the first measurement so nothing renders at the wrong size.
  if (!ready) return null;

  // Convert art pixels to screen pixels.
  const px = (artPixels: number) => `${artPixels * scale}px`;

  return (
    <main
      className="
      pixelated
      flex
      items-center
      justify-center
      w-screen
      h-screen
      overflow-hidden
      "
      style={{
        backgroundColor: '#A4EAFF', // blue sky, shows through the transparent top of the image
        backgroundImage: "url('/background.png')",
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center bottom',
        backgroundSize: `${px(100)} ${px(60)}`, // background.png is 100x60 art pixels
      }}
    >
      <h1 className="pixel-font text-center"
      style={{ 
        fontSize: px(2), 
        margin: 0, 
        color: '#141a22', 
        backgroundColor: '#A4EAFF', // blue sky, shows through the transparent top of the image
        }}>
        Hello World!
      </h1>
    </main>
  );
}
