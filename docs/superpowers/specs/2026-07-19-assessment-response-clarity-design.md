# Assessment Response Clarity Design

## Goal

Make every assessment question answerable without changing the meaning of any
question, the six-point response encoding, or the resulting archetype.

## User Problem

The existing assessment surface shows a scenario, a compact line containing
both response poles, and six unexplained numeric choices. Users cannot tell
what the numbers represent, which behavior each side describes, or how to
answer when neither pole fits perfectly.

## Interaction Contract

Each question will present, in this order:

1. The scenario prompt.
2. A direct instruction: choose the response that is closer to the user's
   usual first reaction, not the response that sounds better or more correct.
3. Two visibly separate, complete response statements: left and right.
4. A six-point scale with explicit anchors:
   - 1: almost always the left response
   - 2: usually the left response
   - 3: slightly closer to the left response
   - 4: slightly closer to the right response
   - 5: usually the right response
   - 6: almost always the right response
5. A short resolution rule: if neither is exact, choose the more common first
   reaction; if both are close, choose 3 or 4.

The response statements must remain visible while the user chooses. Selected
state will repeat the chosen semantic label, not only a numeral.

## Scoring Integrity

`1` through `6` retain their current values. The existing scorer continues to
map the values to the same axis and calculate the same score, boundary state,
and four-letter archetype. No question IDs, axis assignments, reverse-scoring
rules, score thresholds, or archetype mappings change.

## Components And Data Flow

`Question` already supplies `prompt`, `left`, and `right`. `AnswerScale` will
render those values as response cards and map each existing numeric radio value
to fixed explanatory copy. `AssessmentPage` continues to receive a numeric
value and persists it unchanged. `scoreAssessment` remains untouched.

## Validation

- Component tests verify visible left/right statements, all six accessible
  labels, and semantic feedback after selection.
- Assessment tests verify the instruction and response options are visible.
- Scoring tests retain fixed answer fixtures proving the same answer vector
  yields the same scores and archetype.
- Desktop and mobile E2E runs verify no horizontal overflow and completion of
  the assessment flow.

## Scope

This change is limited to assessment response clarity. It does not introduce a
neutral option, alter assessment methodology, rewrite the question bank, or
change result presentation.
