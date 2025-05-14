# EVContrastChecker

**Product Requirements Document (PRD)**  
Version 1.0 • Last updated: 2025-05-14

---

## 1. Document Control

| Role               | Name / Contact | Responsibility                           |
| ------------------ | -------------- | ---------------------------------------- |
| Product Manager    | _TBD_          | Owns requirements & roadmap              |
| Tech Lead          | _TBD_          | Technical design & implementation        |
| Design Lead        | _TBD_          | Component UX & visual design             |
| Accessibility Lead | _TBD_          | WCAG / APCA compliance & audits          |
| QA Lead           | _TBD_          | Test plans, automation, release sign-off |

---

## 2. Purpose

Provide an **npm-distributable React component** that allows developers, designers, and QA engineers to **instantly verify colour‐contrast compliance** against  
_WCAG 2.x_ **or** _APCA_ standards, covering Success Criteria **1.4.3, 1.4.6, 1.4.11**.

---

## 3. Background / Problem Statement

Teams frequently need quick, reliable contrast checks inside design-systems, storybooks, and QA tools—but existing widgets:

- **Lock you into heavy UI frameworks** or opinionated themes.
- **Support only WCAG** or only APCA, not both.
- Ship with multiple megabytes of dependencies.
- Lack **non-text contrast previews** required by SC 1.4.11.

A lightweight, standalone component unlocks faster a11y feedback loops without bloat.

---

## 4. Objectives & Success Criteria

| Objective                              | KPI / Metric                                               |
| -------------------------------------- | ---------------------------------------------------------- |
| ≤ 9 kB min+gzip ESM bundle             | Bundle-size CI gate in GitHub Actions                      |
| Full WCAG / APCA parity                | Algorithm unit tests cover canonical examples (100 % pass) |
| < 1 s p95 render & calc time           | Lighthouse / React Profiler on demo page                   |
| 95 % unit & component test coverage    | Jest + RTL thresholds                                      |
| 100 % keyboard & screen-reader usable  | NVDA, VoiceOver smoke tests                                |
| Published on npm w/ zero-critical CVEs | `npm audit` CI gate                                        |

---

## 5. Scope

### 5.1 In Scope

- **React (17+) component** written in **TypeScript**.
- Algorithms: WCAG 2.x contrast-ratio **and** APCA (Lc 0.1-beta-0-4g).
- UI blocks for SC 1.4.3, 1.4.6, 1.4.11.
  - Editable text-sample (font-size picker).
  - SVG frame w/ sanitised upload (≤ 50 kB).
- Native colour pickers + Hex/RGB/HSL text inputs (auto-sync).
- **Inline CSS-in-JS** defaults, fully overrideable via `classNames` & `styles` props.
- Accessibility: ARIA live region announcing "Pass – 4.85 : 1" etc.
- Jest unit & component tests.
- Demo app under `/demo`.

### 5.2 Out of Scope (v1)

- Storybook docs site or public sandbox links.
- Visual-regression testing.
- CommonJS or UMD bundle.
- Internationalisation (English-only).
- Advanced theme tokens (light/dark) – planned for v2.

---

## 6. Personas & Use Cases

| Persona                   | Scenario / Job-to-Be-Done                                            |
| ------------------------- | -------------------------------------------------------------------- |
| **Design-system dev**     | Embed checker in Storybook to validate token palettes.               |
| **Front-end engineer**    | Drop into a form builder to verify user-selected colours at runtime. |
| **QA analyst**            | Paste client colours, upload SVG icon, assert SC 1.4.11 compliance.  |
| **Accessibility auditor** | Compare WCAG vs. APCA scores side-by-side for design sign-off.       |

---

## 7. User Stories

1. **As a designer**, I want to paste brand colours and immediately see pass/fail for WCAG AA so I can tweak hues.
2. **As a developer**, I need to toggle to APCA scoring to meet upcoming design-system requirements.
3. **As a QA tester**, I can upload an SVG icon and verify non-text contrast with the chosen background.
4. **As a product team**, we can hide advanced blocks via props when embedding the component in a marketing CMS.

---

## 8. Functional Requirements

| ID   | Requirement                                                                                     |
| ---- | ----------------------------------------------------------------------------------------------- |
| F-01 | Component **accepts `algorithm="wcag" \| "apca"` prop**; defaults to `wcag`.                    |
| F-02 | Users can input colours via **native picker or text** in Hex, RGB, HSL.                         |
| F-03 | Changing one input **auto-converts** and updates all other representations.                     |
| F-04 | **Swap button** exchanges foreground & background values.                                       |
| F-05 | Component **auto-detects large text** (≥ 24 px / 18.66 px bold) and applies correct thresholds. |
| F-06 | **Results blocks** (1.4.3, 1.4.6, 1.4.11) can be hidden individually through props.             |
| F-07 | Each result block displays **ratio/score + Pass/Fail badge**.                                   |
| F-08 | Pass/fail verdict and ratio are announced via **ARIA live region**.                             |
| F-09 | **SVG upload**: accept `.svg`, size ≤ 50 kB, sanitise, recolour `fill` & `stroke`.              |
| F-10 | All interactive controls are **keyboard-operable and focus-visible**.                           |
| F-11 | Component emits `onChange` callback with current state.                                         |

---

## 9. Non-Functional Requirements

| Category            | NFR                                                                            |
| ------------------- | ------------------------------------------------------------------------------ |
| **Performance**     | Initial render < 100 ms, p95 update < 50 ms on mid-range laptop.               |
| **Bundle size**     | ≤ 9 kB min+gzip.                                                               |
| **Security**        | Sanitise SVGs (strip scripts, styles, external refs). Validate colour strings. |
| **Accessibility**   | Conform to WCAG AA for component UI itself.                                    |
| **Browser support** | Evergreen (latest 2 versions of Chrome, Firefox, Edge, Safari).                |
| **Testing**         | ≥ 95 % coverage on algorithm utils; ≥ 80 % overall.                            |
| **CI/CD**           | GitHub Actions: lint → test → build → size-check.                              |

---

## 10. Algorithms

| Standard     | Rule                            | Pass Threshold                                                              |
| ------------ | ------------------------------- | --------------------------------------------------------------------------- |
| **WCAG 2.x** | Ratio = (L1 + 0.05)/(L2 + 0.05) | Normal text AA ≥ 4.5 : 1<br>Large text AA ≥ 3.0 : 1<br>Enhanced AAA ≥ 7 : 1 |
| **APCA**     | Lc (∆L\* contrast-polarity)     | Normal text ≥ ±60<br>Large text ≥ ±45                                       |

Implementation lives in `/src/algorithms/`.

---

## 11. Security & Privacy

- **SVG Sanitiser** strips:
  - `<script>`, `<style>` elements
  - Inline event handlers (`on*`)
  - External `href` / `xlink:href`
  - `data:` URLs
- **No PII** is stored or transmitted.
- Fuzz tests validate sanitiser against XSS payload corpus.

---

## 12. Metrics & Analytics

- NPM downloads / week.
- Bundle size CI badge (bundlesize).
- Issue open-to-close median < 5 days.
- Accessibility automated audit (axe-ci) score ≥ 100 %.

---

## 13. Timeline & Milestones

| Date (T-week) | Milestone                                |
| ------------- | ---------------------------------------- |
| T0            | Requirements sign-off (this PRD)         |
| T+1 wk        | Tech spike: algorithms, sanitiser        |
| T+3 wk        | MVP UI, swap button, ARIA live region    |
| T+4 wk        | SVG upload, feature flags, `styles` prop |
| T+5 wk        | Unit & component test suite complete     |
| T+6 wk        | Internal demo app ready                  |
| T+7 wk        | Beta release on npm (`0.9.0`)            |
| T+8 wk        | Docs & README polish, MIT license added  |
| T+9 wk        | **v1.0.0 GA**                            |

---

## 14. Risks & Mitigations

| Risk                          | Impact             | Mitigation                                               |
| ----------------------------- | ------------------ | -------------------------------------------------------- |
| APCA spec changes             | Algorithm mismatch | Wrap APCA in utility layer; version-gate constant values |
| Bundle creep                  | Perf regression    | Bundlesize CI gate, peer-dep only                        |
| SVG sanitiser false positives | Broken uploads     | Provide fallback SVG + clear error message               |

---

## 15. Open Questions

1. Should we expose an **imperative ref API** (e.g., `getContrast()`)?
2. Any need for **dark/light predefined themes** in v1?
3. How will the component handle **high-contrast forced-colour modes** (Windows HC)?

---

## 16. Approval

| Stakeholder   | Decision | Date |
| ------------- | -------- | ---- |
| Product       |          |      |
| Engineering   |          |      |
| Design        |          |      |
| Accessibility |          |      |

---

_© 2025 EVContrastChecker team – MIT licensed_
