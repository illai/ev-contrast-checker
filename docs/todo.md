> Work through the tasks in order; check ✓ each box when complete.

## 🗂️ 0. Project Kick-off

- [ ] **Clone / create repo** `ev-contrast-checker`
- [ ] Initialize `pnpm` workspace → `package.json`, `pnpm-workspace.yaml`
- [ ] Add MIT `LICENSE`
- [ ] Copy PRD into `/docs/EVContrastChecker_PRD.md`

---

## 🏗️ 1. Tooling & Infrastructure

- [ ] `pnpm add -D typescript tsup @types/react react react-dom`
- [ ] `pnpm add -D jest @testing-library/react @testing-library/jest-dom ts-jest`
- [ ] Configure **TypeScript** → `tsconfig.json`
- [ ] Configure **tsup** build script (`"build": "tsup src/index.ts --dts --format esm"`)
- [ ] Configure **Jest**
  - [ ] `jest.config.js`, transform via `ts-jest`
  - [ ] Set coverage threshold (algorithms 95 %, overall 80 %)
- [ ] Set up **ESLint + Prettier** (optional but recommended)
- [ ] Commit **GitHub Actions** CI workflow  
      `lint → test → build → bundlesize`

---

## 🧮 2. Core Algorithms

- [ ] Create `/src/algorithms/`
  - [ ] `wcag.ts` – contrast ratio util
  - [ ] `apca.ts` – APCA (Lc) implementation
  - [ ] `conversions.ts` – hex ↔ rgb ↔ hsl helpers
- [ ] Add unit tests replicating spec examples for both algorithms
- [ ] Maintain 100 % branch coverage on algorithm utils

---

## 🔒 3. Security Utilities

- [ ] Implement `/src/utils/sanitizeSvg.ts`
  - [ ] Strip `<script>`, `<style>`, event attrs, external refs
  - [ ] Enforce 50 kB max
- [ ] Unit-test XSS payload corpus

---

## ⚛️ 4. React Component Modules

- [ ] `/src/hooks/useContrastState.ts` (state + conversions)
- [ ] `/src/components/ColorInputs.tsx`
  - [ ] Text inputs + native `<input type="color">`
  - [ ] Format selector w/ auto-convert
  - [ ] "Swap FG/BG" button
- [ ] `/src/components/ResultBlock.tsx`
  - [ ] Pass/fail badge, ratio, ARIA live region
- [ ] `/src/components/SvgFrame.tsx`
  - [ ] Default star SVG; upload control with sanitisation
- [ ] `/src/components/ContrastChecker.tsx`
  - [ ] Assemble inputs, blocks, feature flags, styles prop
  - [ ] Auto-detect large-text thresholds
  - [ ] Emit `onChange` callback
- [ ] `/src/index.ts` – public export

---

## 🎨 5. Styling & Theming

- [ ] Define **inline style objects** (minimal)
- [ ] Expose `classNames` + `styles` prop maps
- [ ] Add `data-evcc="slot-name"` attributes for CSS hooks

---

## ♿ 6. Accessibility Pass

- [ ] Ensure all controls labelled (`<label>`, `aria-label`)
- [ ] Implement `aria-live="polite"` on verdict updates
- [ ] Validate keyboard tab order & focus rings
- [ ] Axe-core check on demo page (no violations)

---

## 🧪 7. Component Testing

- [ ] RTL tests: colour swap, font-size changes, live announcements
- [ ] Mock SVG upload & confirm sanitiser invoked
- [ ] Snapshots optional (keep tiny)

---

## 🖥️ 8. Demo App

- [ ] `/demo/App.tsx` showcasing:
  - [ ] WCAG mode, APCA mode
  - [ ] Feature-flag variants (hide SVG, etc.)
  - [ ] Custom theme via `styles` prop
- [ ] Vite dev server (`pnpm demo`)

---

## 📚 9. Documentation

- [ ] Fill out `README.md`
  - [ ] Install → Quick Start → Props table
  - [ ] "Custom Styling" & "Algorithms" sections
- [ ] Auto-generate `dist/index.d.ts` with `tsup` for type consumers

---

## 🚀 10. Release & Publish

- [ ] `pnpm build` – verify `dist/` size < 9 kB gzip
- [ ] `npm publish --access public` (version `1.0.0`)
- [ ] Create GitHub **release notes** summarising features
- [ ] Add badges: npm version, license, bundle size

---
