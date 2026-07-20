import { ARCHETYPES } from './archetypes';
import { getQuestions } from './questions';
import type { AssessmentMode, AssessmentResult, AssessmentSession, AxisId } from './types';

const SESSION_KEY = 'zati:assessment';
const RESULT_KEY = 'zati:result';

const AXES: AxisId[] = ['AR', 'VS', 'LI', 'DH'];

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function isMode(value: unknown): value is AssessmentMode {
  return value === 'quick' || value === 'standard';
}

function isSession(value: unknown): value is AssessmentSession {
  if (!isRecord(value) || value.version !== 1 || !isMode(value.mode) || !isRecord(value.answers)) return false;
  const currentIndex = value.currentIndex;
  if (typeof currentIndex !== 'number' || !Number.isInteger(currentIndex)) return false;
  const questions = getQuestions(value.mode);
  if (currentIndex < 0 || currentIndex >= questions.length) return false;
  const ids = new Set(questions.map((question) => question.id));
  return Object.entries(value.answers).every(([id, answer]) => typeof answer === 'number' && ids.has(id) && Number.isInteger(answer) && answer >= 1 && answer <= 6);
}

function isResult(value: unknown): value is AssessmentResult {
  if (!isRecord(value) || value.version !== 1 || !isMode(value.mode) || typeof value.code !== 'string' || typeof value.completedAt !== 'string' || Number.isNaN(Date.parse(value.completedAt))) return false;
  const scores = value.scores;
  const boundaries = value.boundaries;
  if (!isRecord(scores) || !isRecord(boundaries)) return false;
  if (!ARCHETYPES.some((archetype) => archetype.code === value.code)) return false;
  return AXES.every((axis) => {
    const score = scores[axis];
    return typeof score === 'number' && Number.isInteger(score) && score >= 0 && score <= 100 && typeof boundaries[axis] === 'boolean';
  });
}

function read<T>(key: string, validate: (value: unknown) => value is T): T | null {
  try {
    const value: unknown = JSON.parse(localStorage.getItem(key) ?? 'null');
    if (validate(value)) return value;
  } catch { /* Invalid persisted JSON is treated as absent state. */ }
  localStorage.removeItem(key);
  return null;
}

export const loadSession = () => read(SESSION_KEY, isSession);
export const saveSession = (session: AssessmentSession) => localStorage.setItem(SESSION_KEY, JSON.stringify(session));
export const clearSession = () => localStorage.removeItem(SESSION_KEY);
export const loadResult = () => read(RESULT_KEY, isResult);
export const saveResult = (result: AssessmentResult) => localStorage.setItem(RESULT_KEY, JSON.stringify(result));
