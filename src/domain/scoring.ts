import { getArchetype } from './archetypes';
import { getQuestions } from './questions';
import type { ArchetypeCode, AssessmentMode, AssessmentResult, AxisId } from './types';

const letters: Record<AxisId, [string, string]> = { AR:['A','R'], VS:['V','S'], LI:['L','I'], DH:['D','H'] };

export function scoreAssessment(mode: AssessmentMode, answers: Record<string, number>): AssessmentResult {
  const questions = getQuestions(mode);
  const scores = {} as Record<AxisId, number>;
  for (const axis of Object.keys(letters) as AxisId[]) {
    const relevant = questions.filter((question) => question.axis === axis);
    if (relevant.some((question) => !(question.id in answers))) throw new Error(`Missing answers for ${axis}`);
    const values = relevant.map((question) => {
      const raw = answers[question.id];
      if (!Number.isInteger(raw) || raw < 1 || raw > 6) throw new Error(`Invalid answer for ${question.id}`);
      const normalized = (raw - 1) * 20;
      return question.reverse ? 100 - normalized : normalized;
    });
    scores[axis] = Math.round(values.reduce((sum, value) => sum + value, 0) / values.length);
  }
  const code = (Object.keys(letters) as AxisId[]).map((axis) => letters[axis][scores[axis] >= 50 ? 0 : 1]).join('') as ArchetypeCode;
  getArchetype(code);
  const boundaries = Object.fromEntries((Object.keys(scores) as AxisId[]).map((axis) => [axis, scores[axis] >= 45 && scores[axis] <= 55])) as Record<AxisId, boolean>;
  return { version:1, mode, code, scores, boundaries, completedAt:new Date().toISOString() };
}
