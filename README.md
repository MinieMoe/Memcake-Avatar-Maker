# Memcake

A **Splatoon-inspired avatar maker** built with React Native & Expo. 

Customize your Inkling's skin tone, hair, and expressions in a real-time 2D preview, then watch your character come to life as an extruded 3D silhouette.

All SVG presets are drawn by hand in Procreate + InkScape 👩‍🎨

> Built as a personal portfolio project to showcase cross-platform mobile development, creative rendering techniques, and clean architecture.

---

## Screenshots

> *(Coming soon — add character builder + 3D view screenshots here)*

---

## Features

### Character Builder
- **Expression picker** — Choose from multiple expressions (Mischievous, Angry) built from layered SVG assets
- **Hairstyle picker** — Switch between hairstyle presets (Default Long, Short)
- **Skin tone selector** — 5 options: Original, Warm, Tan, Dark, Fantasy
- **Hair color selector** — 8 options: Black, Brown, Blonde, Auburn, Red, Pink, Blue, White
- **Eye color selector** — 6 options: Brown, Hazel, Green, Blue, Grey, Violet
- **Live 2D preview** — Character updates in real-time as you customize, rendered on a GPU-accelerated Skia canvas

### 3D View
- **Extruded silhouette** — Character silhouette is extruded into a 3D mesh using Three.js `ExtrudeGeometry`
- **Auto-fit camera** — Mesh is automatically centered and scaled to fill the screen
- **Continuous rotation** — Smooth Y-axis spin animation rendered via a WebGL loop

---

## How It Works

SVGs serve as the single source of truth for all character art. The same asset files drive both the 2D preview and the 3D view through a clean pipeline:

```
SVG assets on disk
  → Extract path data          (regex parse d attribute)
  → Boolean union via Skia     (PathOp.Union merges body + hair into one silhouette)
  → Wrap in SVG document       (feed into Three.js SVGLoader)
  → ExtrudeGeometry            (depth: 20, renders in expo-gl WebGL context)
```

**Dynamic colorization** is handled entirely through Skia blend filters (`ColorFilter.MakeBlend(color, SrcIn)`), meaning a single grayscale SVG per element covers all color variants — no duplicated art assets needed.

**Expression layering** splits each expression into three independent SVGs — `mask`, `eyes`, and `brow_mouth` — so eye color and brow/mouth color can be controlled separately from a single preset definition.

---

## Tech Stack

| Category | Technology |
|---|---|
| Framework | [Expo](https://expo.dev/) ~54 / React Native 0.81 / React 19 |
| Language | TypeScript 5.9 |
| Routing | [expo-router](https://expo.github.io/router/) (file-based, tabs layout) |
| 2D Rendering | [@shopify/react-native-skia](https://shopify.github.io/react-native-skia/) 2.2 |
| 3D Rendering | [Three.js](https://threejs.org/) 0.183 + [expo-three](https://github.com/expo/expo-three) + expo-gl |
| Animation | [react-native-reanimated](https://docs.swmansion.com/react-native-reanimated/) ~4.1 |
| Gestures | react-native-gesture-handler |
| File I/O | expo-asset, expo-file-system |
| Icons | @expo/vector-icons, expo-symbols |
| Haptics | expo-haptics |

---

## Project Structure

```
Memcake/
├── app/
│   └── (tabs)/
│       ├── index.tsx          ← Character builder screen
│       └── 3d-view.tsx        ← 3D extruded silhouette screen
├── assets/
│   └── presets/
│       ├── body/              ← Body silhouette SVG
│       ├── hairstyle/         ← Hairstyle SVG presets
│       └── expressions/       ← Per-expression layered SVGs
├── components/
│   └── memcake/
│       ├── memcake-preview.tsx    ← Skia 2D canvas compositor
│       ├── memcake-3d-view.tsx    ← Three.js / expo-gl 3D renderer
│       ├── body-base.tsx          ← Body SVG layer + skin tone tint
│       ├── hairstyle.tsx          ← Hair SVG layer + color tint
│       └── expression.tsx         ← 3-layer expression renderer
├── constants/
│   ├── preset.ts              ← Canvas size constant
│   ├── presets.ts             ← Expression + hairstyle preset definitions
│   └── theme.ts               ← Colors + fonts
└── utils/
    ├── extract-svg-paths.ts       ← SVG path d-attribute extraction
    ├── build-silhouette-svg.ts    ← Skia boolean path union
    ├── extrude-silhoutte-svg.ts   ← Three.js extrusion
    └── svg-to-3d.tsx              ← Full SVG → 3D orchestrator
```

---

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) 18+
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- A physical device or emulator (expo-gl / Skia require native rendering)

### Install & Run

```bash
git clone https://github.com/your-username/memcake.git
cd memcake
npm install
npx expo start
```

Scan the QR code with [Expo Go](https://expo.dev/go) or run on an emulator.

---

## Roadmap

- [ ] Export character as image / share
- [ ] More hairstyle presets
- [ ] Outfit / clothing customization
- [ ] Apply 2D face as texture on the 3D mesh
- [ ] Animated expressions

---

## Author

**Min Nguyen** — [GitHub](https://github.com/MinieMoe)

---

## License

MIT
