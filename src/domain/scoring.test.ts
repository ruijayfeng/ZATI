import { describe, expect, it } from 'vitest';
import { getQuestions } from './questions';
import { scoreAssessment } from './scoring';

describe('assessment scoring', () => {
  it('provides a balanced 24-question quick assessment', () => {
    const questions = getQuestions('quick');
    expect(questions).toHaveLength(24);
    for (const axis of ['AR', 'VS', 'LI', 'DH']) {
      expect(questions.filter((question) => question.axis === axis)).toHaveLength(6);
    }
  });

  it('provides 56 questions for the standard assessment', () => {
    expect(getQuestions('standard')).toHaveLength(56);
  });

  it('normalizes answers and produces a deterministic code', () => {
    const questions = getQuestions('quick');
    const answers = Object.fromEntries(questions.map((question) => [question.id, 6]));
    const result = scoreAssessment('quick', answers);
    expect(result.code).toBe('AVLD');
    expect(Object.values(result.scores).every((score) => score >= 0 && score <= 100)).toBe(true);
  });

  it('keeps a fixed quick-test answer vector mapped to the same result', () => {
    const answers = Object.fromEntries(getQuestions('quick').map((question) => [question.id, 5]));
    const result = scoreAssessment('quick', answers);
    expect(result).toMatchObject({
      code: 'AVLD',
      scores: { AR: 80, VS: 80, LI: 80, DH: 80 },
      boundaries: { AR: false, VS: false, LI: false, DH: false },
    });
  });

  it('uses the positive letter at an exact 50-point tie and marks the boundary', () => {
    const questions = getQuestions('quick');
    const answers = Object.fromEntries(questions.map((question, index) => [question.id, index % 2 ? 4 : 3]));
    const result = scoreAssessment('quick', answers);
    expect(result.code).toBe('AVLD');
    expect(Object.values(result.boundaries).every(Boolean)).toBe(true);
  });
});
