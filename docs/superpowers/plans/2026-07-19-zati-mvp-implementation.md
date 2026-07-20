# ZATI MVP 1.0 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a production-quality, mobile-first ZATI MVP 1.0 that implements the approved 「曜序」 design system, 24/56-question assessment, deterministic scoring, sixteen archetypes, result reveal, report, and share-card workflow.

**Architecture:** A Vite React TypeScript single-page application uses React Router for the homepage, test, reveal, result, and archetype routes. Domain data and scoring remain framework-independent under `src/domain`; visual tokens and reusable components live under `src/design-system`; feature modules own route-level state and UI. Browser persistence uses versioned `localStorage`, while tests exercise domain invariants, accessible interaction, responsive rendering, and the main user journey.

**Tech Stack:** React 19, TypeScript 5, Vite 7, React Router 7, Lucide React, Vitest, Testing Library, Playwright, CSS custom properties, native semantic HTML.

## Global Constraints

- Material 3 supplies semantic roles, state behavior, focus, responsive, motion, and accessibility contracts; no default Material visual theme is used.
- The fixed brand palette is `#0B0B10`, `#F2F0EA`, `#C5A66A`, `#58466F`, `#A94F43`, `#557D70`, `#17161C`, and `#393640`.
- `Noto Serif SC` is the display/title face, `Noto Sans SC` is the body face, and `IBM Plex Mono` is the utility face with system fallbacks.
- Base spacing is 4px; touch targets are at least 48x48px; body copy is at least 15px; body measure is at most 68ch.
- Surface radii are limited to 2px, 4px, and 8px; pills are reserved for status labels.
- Cards are reserved for personality cards, answer options, dialogs, and repeated archetype items; report sections are not nested cards.
- Only one primary gold action appears per view.
- The questionnaire alone owns the four-letter type. No birth or astrology data may modify it.
- A 45–55 score is labeled a flexible boundary while the deterministic tie-break still produces one letter.
- Normal interaction motion is 120–180ms, route motion is 220–320ms, and the reveal is 900–1400ms; reduced motion uses a 180ms crossfade.
- MVP 1.0 includes the questionnaire, sixteen fixed cards, result/report/share flow. Ziwei charting, four transformations, and life seasons are explicitly out of scope.

---

## File Map

- `package.json`, `vite.config.ts`, `tsconfig*.json`, `index.html`: build, test, and browser entry configuration.
- `AGENTS.md`: project constitution, module map, commands, and documentation protocol.
- `src/domain/types.ts`: assessment, axis, archetype, answer, and result contracts.
- `src/domain/archetypes.ts`: immutable sixteen-card content records.
- `src/domain/questions.ts`: 56 scenario questions; the first balanced subset forms the 24-question quick mode.
- `src/domain/scoring.ts`: normalization, boundary, deterministic letter, confidence, and result creation.
- `src/domain/storage.ts`: versioned progress/result persistence with malformed-data recovery.
- `src/design-system/tokens.css`, `global.css`: approved visual tokens, typography, focus, motion, responsive, and print contracts.
- `src/design-system/components/*.tsx`: accessible Button, IconButton, Progress, AnswerScale, AxisMeter, PersonaCard, and AppHeader.
- `src/features/home/HomePage.tsx`: product-first homepage and mode selection.
- `src/features/assessment/AssessmentPage.tsx`: resumable 24/56-question workflow.
- `src/features/reveal/RevealPage.tsx`: skippable/reduced-motion result ritual.
- `src/features/result/ResultPage.tsx`, `ShareCard.tsx`: identity-first report and downloadable/shareable card.
- `src/features/archetypes/ArchetypesPage.tsx`: browseable sixteen-card reference.
- `src/app/router.tsx`, `App.tsx`, `main.tsx`: routing and application composition.
- `src/**/*.test.ts(x)`: domain and component tests.
- `tests/e2e/main-flow.spec.ts`: desktop/mobile journey and accessibility-oriented interaction checks.

---

### Task 1: Bootstrap and Architecture Contract

**Files:**
- Create: `package.json`, `vite.config.ts`, `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`, `index.html`
- Create: `AGENTS.md`, `src/main.tsx`, `src/App.tsx`, `src/app/router.tsx`, `src/test/setup.ts`
- Test: `src/app/router.test.tsx`

**Interfaces:**
- Produces: `createAppRouter(): Router`, scripts `dev`, `build`, `test`, `test:e2e`, `lint`.

- [ ] Write a router smoke test that expects `/`, `/test/:mode`, `/reveal`, `/result`, and `/archetypes` to resolve without an unhandled error.
- [ ] Run `pnpm test src/app/router.test.tsx` and verify it fails before the app entry exists.
- [ ] Add the Vite/React/TypeScript configuration, semantic route shell, and test setup.
- [ ] Run `pnpm test src/app/router.test.tsx` and verify all route smoke cases pass.
- [ ] Run `pnpm build` and require exit code 0.
- [ ] Commit as `chore: bootstrap ZATI web app` when a Git repository exists; otherwise record the non-Git constraint.

### Task 2: Domain Model, Archetypes, and Scoring

**Files:**
- Create: `src/domain/types.ts`, `src/domain/archetypes.ts`, `src/domain/questions.ts`, `src/domain/scoring.ts`
- Test: `src/domain/scoring.test.ts`, `src/domain/content.test.ts`

**Interfaces:**
- Produces: `AssessmentMode`, `AxisId`, `Question`, `Archetype`, `AssessmentResult`.
- Produces: `getQuestions(mode): Question[]`, `scoreAssessment(mode, answers): AssessmentResult`, `getArchetype(code): Archetype`.

- [ ] Write failing tests proving 16 unique codes, 4/4/4/4 star-domain distribution, 24 quick questions with six per axis, 56 standard questions, scores in 0–100, boundary labeling at 45–55, deterministic 50-point tie-break, and code-to-card lookup.
- [ ] Run `pnpm test src/domain` and confirm the expected missing-module failures.
- [ ] Add explicit domain types, all sixteen approved archetype records, and 56 concrete scenario questions with axis, direction, and prompt pair.
- [ ] Implement scoring by mapping response `1..6` to `0..100`, reversing when required, averaging per axis, and choosing the positive letter at `>= 50`.
- [ ] Run `pnpm test src/domain` and require all invariants to pass.
- [ ] Commit as `feat: add assessment domain and scoring` when Git is available.

### Task 3: Persistence and Resume Safety

**Files:**
- Create: `src/domain/storage.ts`
- Test: `src/domain/storage.test.ts`

**Interfaces:**
- Produces: `loadSession(): AssessmentSession | null`, `saveSession(session): void`, `clearSession(): void`, `loadResult(): AssessmentResult | null`, `saveResult(result): void`.

- [ ] Write failing tests for round-trip persistence, schema-version rejection, malformed JSON recovery, and clearing completed progress.
- [ ] Run `pnpm test src/domain/storage.test.ts` and verify failures.
- [ ] Implement versioned, validated localStorage adapters with no thrown exception on corrupt data.
- [ ] Run the storage tests and require all cases to pass.
- [ ] Commit as `feat: persist assessment progress safely` when Git is available.

### Task 4: 曜序 Tokens and Accessible Primitives

**Files:**
- Create: `src/design-system/tokens.css`, `src/design-system/global.css`
- Create: `src/design-system/components/Button.tsx`, `IconButton.tsx`, `Progress.tsx`, `AnswerScale.tsx`, `AxisMeter.tsx`, `PersonaCard.tsx`, `AppHeader.tsx`, `index.ts`
- Test: `src/design-system/components/components.test.tsx`

**Interfaces:**
- Produces: `Button`, `IconButton`, `Progress`, `AnswerScale`, `AxisMeter`, `PersonaCard`, and `AppHeader` React components with native semantic props.

- [ ] Write failing tests for accessible button names, 48px control classes, radiogroup keyboard semantics, progress aria values, textual axis values, and persona card heading structure.
- [ ] Run `pnpm test src/design-system` and verify failures.
- [ ] Implement the approved CSS variables, dark/light-print themes, focus-visible, reduced-motion, base typography, spacing, and components.
- [ ] Run component tests and require all assertions to pass.
- [ ] Commit as `feat: implement Yaoxu design system primitives` when Git is available.

### Task 5: Homepage and Archetype Library

**Files:**
- Create: `src/features/home/HomePage.tsx`, `HomePage.css`
- Create: `src/features/archetypes/ArchetypesPage.tsx`, `ArchetypesPage.css`
- Test: `src/features/home/HomePage.test.tsx`, `src/features/archetypes/ArchetypesPage.test.tsx`

**Interfaces:**
- Consumes: `Button`, `PersonaCard`, `ARCHETYPES`.
- Produces: route components `HomePage`, `ArchetypesPage`.

- [ ] Write failing tests for one primary action, quick/standard mode choices, truthful MVP copy, sixteen browseable archetypes, and keyboard-reachable cards.
- [ ] Run the feature tests and verify failures.
- [ ] Implement the product-first homepage with star-track art, visible next section, mode chooser, and archetype index grouped by four star domains.
- [ ] Run feature tests and require all cases to pass.
- [ ] Commit as `feat: add home and archetype discovery` when Git is available.

### Task 6: Resumable Assessment Workflow

**Files:**
- Create: `src/features/assessment/AssessmentPage.tsx`, `AssessmentPage.css`, `assessment-state.ts`
- Test: `src/features/assessment/AssessmentPage.test.tsx`, `assessment-state.test.ts`

**Interfaces:**
- Consumes: `getQuestions`, `scoreAssessment`, persistence adapters, `AnswerScale`, `Progress`.
- Produces: resumable `AssessmentPage`, pure `assessmentReducer`.

- [ ] Write failing tests for first-question rendering, six-level response, next/previous, persisted resume, mode mismatch reset, progress accuracy, incomplete-submit prevention, and final result navigation.
- [ ] Run assessment tests and verify failures.
- [ ] Implement the reducer and page with one question per screen, stable layout, autosave, explicit exit, and completion scoring.
- [ ] Run assessment tests and require all cases to pass.
- [ ] Commit as `feat: implement assessment workflow` when Git is available.

### Task 7: Reveal, Result Report, and Share Card

**Files:**
- Create: `src/features/reveal/RevealPage.tsx`, `RevealPage.css`
- Create: `src/features/result/ResultPage.tsx`, `ResultPage.css`, `ShareCard.tsx`, `share.ts`
- Test: `src/features/reveal/RevealPage.test.tsx`, `src/features/result/ResultPage.test.tsx`, `share.test.ts`

**Interfaces:**
- Consumes: stored `AssessmentResult`, `Archetype`, `AxisMeter`.
- Produces: `RevealPage`, `ResultPage`, `buildShareText(result): string`, PNG/download fallback entry point.

- [ ] Write failing tests for missing-result recovery, skippable reveal, reduced-motion class, identity-first headings, four textual axis values, boundary copy, strengths/shadows/work/relationship/growth sections, disclaimer, and share-text content.
- [ ] Run result/reveal tests and verify failures.
- [ ] Implement the 1.4-second maximum reveal, accessible skip action, result report bands, Web Share API path, and downloadable DOM-rendered share card fallback.
- [ ] Run result/reveal tests and require all cases to pass.
- [ ] Commit as `feat: add result reveal and sharing` when Git is available.

### Task 8: Integration, Visual Verification, and Adversarial Review

**Files:**
- Create: `playwright.config.ts`, `tests/e2e/main-flow.spec.ts`
- Create: `docs/reviews/2026-07-19-zati-mvp-adversarial-review.md`
- Modify: files identified by review findings.

**Interfaces:**
- Consumes: complete application.
- Produces: repeatable end-to-end evidence and a requirement-by-requirement adversarial audit.

- [ ] Write Playwright tests for 390×844 and 1440×900: homepage to quick test, keyboard answer interaction, reveal skip, result identity, no horizontal overflow, no incoherent overlap, and reduced-motion behavior.
- [ ] Run `pnpm test`, `pnpm build`, and `pnpm test:e2e`; record exact pass/fail counts.
- [ ] Capture desktop/mobile screenshots and inspect them for layout, typography, asset rendering, text fit, next-section hint, and one-primary-action rule.
- [ ] Audit every approved design-system section and MVP requirement against files, tests, and screenshots; record missing, weak, or contradictory evidence in the review document.
- [ ] Fix every P0/P1/P2 finding and add regression coverage before closing it.
- [ ] Re-run `pnpm test`, `pnpm build`, and `pnpm test:e2e` from a clean process and require zero failures.
- [ ] Perform a final code-quality scan for files over 800 lines, duplicate constants, leaked Material naming, magic color values, unsafe type assertions, console errors, and accessibility violations.
- [ ] Commit as `test: verify ZATI MVP end to end` when Git is available.

## Completion Evidence

The implementation is complete only when:

- All eight tasks have concrete artifacts in the declared paths.
- Domain tests prove the 24/56-question and sixteen-archetype invariants.
- Component and route tests prove accessible behavior and failure-state handling.
- Production build exits 0.
- Desktop and mobile end-to-end flows pass.
- Screenshots demonstrate correct framing, nonblank visuals, no overlap, no horizontal overflow, and readable text.
- The adversarial review contains no unresolved P0/P1/P2 findings.
- The final documentation states the non-Git constraint if the directory remains outside a repository.

