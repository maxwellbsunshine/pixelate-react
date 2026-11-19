import './globals.css';
import { PixelScaleProvider } from '../../src/PixelScaleContext';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>
        {/* The art is drawn for a 450x400 canvas. `debug` shows the scale overlay. */}
        <PixelScaleProvider baseWidth={100} baseHeight={60} debug>
          {children}
        </PixelScaleProvider>
      </body>
    </html>
  );
}
