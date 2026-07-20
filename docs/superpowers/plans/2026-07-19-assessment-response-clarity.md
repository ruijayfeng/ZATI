# Assessment Response Clarity Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the six-point assessment response choice self-explanatory without changing any stored answer, score, or archetype result.

**Architecture:** Keep `Question.left`, `Question.right`, the `AnswerScale` numeric callback, `AssessmentPage` state, and `scoreAssessment` unchanged. Enrich `AnswerScale` only: render separate response poles, semantic labels for values 1 through 6, and selected-state feedback. CSS owns the responsive presentation; tests prove accessibility and scoring invariance.

**Tech Stack:** React 19, TypeScript, Vitest, Testing Library, Playwright, CSS.

## Global Constraints

- Preserve the existing numeric mapping: values `1` through `6` must reach `onChange` unchanged.
- Do not alter question IDs, axis assignments, reverse scoring, score thresholds, or archetype mapping.
- Explain that users choose their usual first reaction, not the answer that sounds more correct.
- Keep left and right response statements visible during selection.
- Do not add a neutral seventh option; direct close calls to values `3` or `4`.
- Maintain keyboard-operable radios, visible focus, 48px minimum touch targets, desktop and mobile layouts.

---

### Task 1: Add Semantic Answer-Scale Contract

**Files:**
- Modify: `src/design-system/components/AnswerScale.tsx`
- Modify: `src/design-system/components/components.test.tsx`

**Interfaces:**
- Consumes: `left: string`, `right: string`, `value?: number`, `onChange(value: number): void`.
- Produces: six native radio controls whose submitted values remain the numbers `1` through `6`.

- [ ] **Step 1: Write the failing component tests**

```tsx
it('explains both response poles and every six-point choice', () => {
  render(<AnswerScale value={undefined} onChange={vi.fn()} left="核对原则" right="观察环境" />);
  expect(screen.getByText('请选择更接近你平时第一反应的一侧，而不是更正确的一侧。')).toBeInTheDocument();
  expect(screen.getByText('核对原则')).toBeInTheDocument();
  expect(screen.getByText('观察环境')).toBeInTheDocument();
  expect(screen.getByRole('radio', { name: '1 · 几乎总是左侧反应' })).toBeInTheDocument();
  expect(screen.getByRole('radio', { name: '6 · 几乎总是右侧反应' })).toBeInTheDocument();
});

it('keeps the numeric answer while exposing the selected meaning', async () => {
  const onChange = vi.fn();
  render(<AnswerScale value={5} onChange={onChange} left="核对原则" right="观察环境" />);
  expect(screen.getByRole('status')).toHaveTextContent('多数时候右侧反应');
  await userEvent.click(screen.getByRole('radio', { name: '4 · 略偏右侧反应' }));
  expect(onChange).toHaveBeenCalledWith(4);
});
```

- [ ] **Step 2: Run the component tests and verify they fail**

Run: `pnpm exec vitest run src/design-system/components/components.test.tsx`

Expected: FAIL because the response instruction, accessible semantic labels, and status text do not exist.

- [ ] **Step 3: Implement the minimal semantic scale**

In `AnswerScale.tsx`, define these fixed labels in numeric order:

```ts
const responseLabels = [
  '几乎总是左侧反应',
  '多数时候左侧反应',
  '略偏左侧反应',
  '略偏右侧反应',
  '多数时候右侧反应',
  '几乎总是右侧反应',
];
```

Render an instruction paragraph, separate left/right response statements, six radios named `${index + 1} · ${label}`, the close-call instruction, and a `role="status"` message when `value` is defined. Preserve `onChange(index + 1)`.

- [ ] **Step 4: Re-run the component tests**

Run: `pnpm exec vitest run src/design-system/components/components.test.tsx`

Expected: PASS with all component tests green.

### Task 2: Make Response Meaning Readable At Both Breakpoints

**Files:**
- Modify: `src/design-system/global.css`
- Modify: `src/features/assessment/AssessmentPage.css`
- Modify: `src/features/assessment/AssessmentPage.test.tsx`

**Interfaces:**
- Consumes: the semantic `AnswerScale` markup from Task 1.
- Produces: an assessment page that keeps both response poles and the selection scale visible without horizontal overflow.

- [ ] **Step 1: Write the failing page test**

```tsx
it('shows response guidance before the user answers', () => {
  view();
  expect(screen.getByText('请选择更接近你平时第一反应的一侧，而不是更正确的一侧。')).toBeInTheDocument();
  expect(screen.getByText('先检查它是否符合自己的原则')).toBeInTheDocument();
  expect(screen.getByText('先判断它反映了怎样的环境变化')).toBeInTheDocument();
});
```

- [ ] **Step 2: Run the page test and verify it fails**

Run: `pnpm exec vitest run src/features/assessment/AssessmentPage.test.tsx`

Expected: FAIL because the assessment page does not render the new response guidance.

- [ ] **Step 3: Add responsive component and page styles**

Add `AnswerScale` styles in `src/design-system/global.css` for an instruction block, a two-column response-pole grid on desktop, semantic scale labels, selected feedback, and the close-call hint. At `max-width: 600px`, stack the response poles and retain six equal-width, 48px-or-larger radio targets. Adjust `AssessmentPage.css` only if the larger component requires a stable question-stage height. Do not change header, question state, action logic, or score-related code.

- [ ] **Step 4: Re-run the page test**

Run: `pnpm exec vitest run src/features/assessment/AssessmentPage.test.tsx`

Expected: PASS with all assessment page tests green.

### Task 3: Prove Scoring And End-To-End Flow Are Unchanged

**Files:**
- Modify: `src/domain/scoring.test.ts`
- Modify: `tests/e2e/main-flow.spec.ts`

**Interfaces:**
- Consumes: the unchanged `scoreAssessment(mode, answers)` contract.
- Produces: regression evidence that a fixed answer vector produces the same code and that both viewport flows complete without overflow.

- [ ] **Step 1: Write failing scoring and E2E assertions**

Add a fixed quick-test answer vector in `scoring.test.ts` and assert its resulting four-letter code and four axis scores. Add an E2E assertion that the scale instruction is visible after loading `/test/quick` before continuing through the existing completion flow.

- [ ] **Step 2: Run the targeted tests and verify the missing UI assertion fails**

Run: `pnpm exec vitest run src/domain/scoring.test.ts && pnpm exec playwright test --grep "quick assessment reaches an identity-first result"`

Expected: the scoring fixture passes against unchanged scorer behavior; the E2E instruction assertion fails until Tasks 1 and 2 are complete.

- [ ] **Step 3: Verify the implementation against the fixed result**

Do not edit `src/domain/scoring.ts`, `src/domain/questions.ts`, `src/domain/archetypes.ts`, or any result threshold. Confirm the fixed fixture expects the result produced before the clarity change.

- [ ] **Step 4: Run full verification**

Run: `pnpm test`

Expected: all unit and component tests pass with no Playwright files collected.

Run: `pnpm build`

Expected: TypeScript build and Vite production build exit 0.

Run: `pnpm test:e2e`

Expected: desktop and mobile Playwright tests pass, including horizontal-overflow checks and quick-test completion.

## Self-Review

- Spec coverage: Tasks 1 and 2 implement all visible response guidance, semantic selection, and responsive requirements; Task 3 preserves and verifies scoring integrity.
- Placeholder scan: no deferred implementation instructions or unspecified interfaces remain.
- Type consistency: `AnswerScale` continues to emit numeric values; `AssessmentPage` and `scoreAssessment` consume the same `number` and `Record<string, number>` contracts.
