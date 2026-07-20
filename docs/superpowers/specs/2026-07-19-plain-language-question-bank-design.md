# Plain-Language Question Bank Design

## Goal

Rewrite all 56 assessment questions so a Chinese user can understand the
situation, compare two concrete ways of responding, and choose without
guessing what a pronoun or abstract phrase means.

## Scope And Invariants

- Rewrite only user-facing `prompt`, `left`, and `right` copy in
  `src/domain/questions.ts`.
- Preserve every question ID, axis assignment, question order, quick-test
  selection, and left/right scoring direction.
- Preserve the existing six numeric answers, reverse-scoring behavior, axis
  score thresholds, and archetype mapping.
- Do not add questions, remove questions, introduce a neutral answer, or make
  a response morally superior.

## Question Contract

Every item uses this structure:

1. **Complete situation:** starts with a concrete condition such as “当…时” or
   “遇到…时”, and names the people, action, event, or decision in question.
2. **Comparable prompt:** asks “你通常更像哪一种做法？” or an equivalent that
   refers back to the complete situation.
3. **Left action:** a complete, observable first action; it must be readable
   without the right action.
4. **Right action:** a complete, observable first action; it must be readable
   without the left action.

The UI-level instruction remains: users choose the behavior that occurs more
often in real life, not the response that appears more correct.

## Copy Rules

- No unbound pronouns such as “它”、“这个”、“那种情况” unless the immediately
  preceding phrase names the exact referent.
- Avoid abstract compressed expressions such as “读取局势”、“感知趋势”、“价值
  一致” when a plain action can say the same thing.
- Use common verbs: 看、想、问、确认、比较、尝试、保留、调整、推动、协商。
- The two actions must differ on the intended axis, not merely use different
  wording for the same behavior.
- Keep each response concise enough to scan in an answer card; target one
  sentence and no more than 34 Chinese characters when practical.
- Do not use diagnostic, predictive, fate-based, or ability-ranking language.

## Example

Before:

> 收到多数人不认同的反馈时
>
> 先检查它是否符合自己的原则 / 先判断它反映了怎样的环境变化

After:

> 当你提出的意见被大多数人反对时，你通常更像哪一种做法？
>
> 先判断：这些反对意见有没有碰到我在意的原则或底线。 /
> 先观察：大家为什么会反对，周围的情况是不是已经变了。

The first answer remains the existing left-side value and the second answer
remains the existing right-side value.

## Validation

- Content tests assert all 56 question IDs, axis counts, and quick-test
  selection remain unchanged.
- Scoring fixtures assert fixed answer vectors still produce the same axis
  scores and archetype codes.
- Assessment-page tests assert rewritten prompt and both response actions are
  visible.
- Desktop, 390px mobile, and 320px E2E flows complete without horizontal
  overflow.

## Out Of Scope

This change does not revise the personality model, rename archetypes, change
results language, or add explanatory examples to every item.
