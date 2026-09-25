# Sark SEO Landing — React + Tailwind

Phiên bản React của landing page Sark (port từ vanilla HTML/CSS/JS).

## Chạy local

```bash
cd sark-react
npm install
npm run dev
```

Mở http://localhost:5173

## Build production

```bash
npm run build
npm run preview
```

## Cấu trúc

- `src/components/` — UI sections (Header, Hero, Features, …)
- `src/lib/robot-scene.ts` — Three.js robot 3D
- `src/lib/scroll-animations.ts` — GSAP ScrollTrigger
- `src/hooks/useRobot.ts` — khởi tạo robot + scroll
- `public/assets/` — images, robot.glb
