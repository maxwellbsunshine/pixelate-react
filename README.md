# pixelate-react

The tools I use to make my React and Next.js sites look pixel-perfect.

```
src/
  PixelScaleContext.tsx   # works out how big one art pixel is on screen
  pixelate.css            # .pixelated, .pixel-font and .mono-font
example/                  # a small page that uses all three
```

## Setup

Copy both files from `src/` into your project.

1. Import the CSS once, for example in `app/layout.tsx`:

   ```tsx
   import './pixelate.css';
   ```

   If you also use Tailwind, put the two font `@import url(...)` lines above `@import "tailwindcss";` in your own `globals.css`. CSS requires `@import` to come before every other rule.

2. Wrap your app in the provider and give it the size of the canvas you draw your art for:

   ```tsx
   <PixelScaleProvider baseWidth={320} baseHeight={180}>
     {children}
   </PixelScaleProvider>
   ```

## 1. Pixel scale context

`usePixelScale()` returns `{ scale, windowWidth, windowHeight, ready }`.

`scale` is always a whole number: the smallest one at which your base canvas covers the whole window. When every size is multiplied by it, each art pixel becomes an exact square of screen pixels, so nothing gets blurry or uneven.

```tsx
'use client'
const { scale, ready } = usePixelScale();
if (!ready) return null;              // scale isn't known until the first render on the client

const px = (n: number) => `${n * scale}px`;

<div style={{ width: px(87), height: px(20) }} />
```

Rule of thumb: write every size in **art pixels** and wrap it in `px()`.

## 2. The `.pixelated` class

Browsers smooth images when they scale them up, which blurs pixel art. Put `.pixelated` on any `<img>`, or on any element with a `background-image`, to keep the edges sharp:

```tsx
<img src="/sprite.png" className="pixelated" width={8 * scale} height={8 * scale} alt="" />
```

For backgrounds, scale `background-size` as well:

```tsx
<div className="pixelated" style={{
  backgroundImage: "url('/bg.png')",
  backgroundSize: `${500 * scale}px ${300 * scale}px`,
}} />
```

## 3. Pixel fonts

| Class         | Font                                                              | Use it for              |
| ------------- | ----------------------------------------------------------------- | ----------------------- |
| `.pixel-font` | [Press Start 2P](https://fonts.google.com/specimen/Press+Start+2P) | Titles, labels, buttons |
| `.mono-font`  | [Roboto Mono](https://fonts.google.com/specimen/Roboto+Mono)       | Body text, inputs       |

Press Start 2P is drawn on an 8px grid, so it looks sharpest at multiples of 8px. Scale it with `px()` like everything else:

```tsx
<h1 className="pixel-font" style={{ fontSize: px(8) }}>Hello, pixels!</h1>
```

## Example

`example/` is a Next.js App Router page that uses all three tools. To try it, copy `example/app/*` into a new Next.js app's `app/` folder and `example/public/sprite.png` into its `public/` folder, then change the import paths to point at wherever you put `src/`.
