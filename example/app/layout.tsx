import '../../src/pixelate.css';
import { PixelScaleProvider } from '../../src/PixelScaleContext';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>
        {/* Your art is drawn for a 320x180 canvas. `debug` shows the scale overlay. */}
        <PixelScaleProvider baseWidth={320} baseHeight={180} debug>
          {children}
        </PixelScaleProvider>
      </body>
    </html>
  );
}
