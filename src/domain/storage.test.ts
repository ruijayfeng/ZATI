import { beforeEach, describe, expect, it } from 'vitest';
import { clearSession, loadResult, loadSession, saveSession } from './storage';

describe('assessment persistence', () => {
  beforeEach(() => localStorage.clear());

  it('round-trips a versioned session', () => {
    const session = { version: 1 as const, mode: 'quick' as const, answers: { 'ar-1': 4 }, currentIndex: 2 };
    saveSession(session);
    expect(loadSession()).toEqual(session);
  });

  it('recovers from malformed storage', () => {
    localStorage.setItem('zati:assessment', '{broken');
    expect(loadSession()).toBeNull();
  });

  it('rejects unsupported versions and clears progress', () => {
    localStorage.setItem('zati:assessment', JSON.stringify({ version: 9 }));
    expect(loadSession()).toBeNull();
    saveSession({ version: 1, mode: 'quick', answers: {}, currentIndex: 0 });
    clearSession();
    expect(loadSession()).toBeNull();
  });

  it('rejects incomplete or invalid sessions', () => {
    localStorage.setItem('zati:assessment', JSON.stringify({ version: 1 }));
    expect(loadSession()).toBeNull();

    localStorage.setItem('zati:assessment', JSON.stringify({ version: 1, mode: 'quick', answers: { q1: 7 }, currentIndex: 0 }));
    expect(loadSession()).toBeNull();
  });

  it('rejects incomplete or invalid results', () => {
    localStorage.setItem('zati:result', JSON.stringify({ version: 1 }));
    expect(loadResult()).toBeNull();

    localStorage.setItem('zati:result', JSON.stringify({ version: 1, mode: 'quick', code: 'XXXX', scores: { AR: 50, VS: 50, LI: 50, DH: 50 }, boundaries: { AR: false, VS: false, LI: false, DH: false }, completedAt: '2026-07-19T00:00:00.000Z' }));
    expect(loadResult()).toBeNull();
  });
});
