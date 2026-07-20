import { describe, expect, it } from 'vitest';
import { ARCHETYPES, getArchetype } from './archetypes';

describe('archetype content', () => {
  it('contains sixteen unique archetype codes', () => {
    expect(ARCHETYPES).toHaveLength(16);
    expect(new Set(ARCHETYPES.map((item) => item.code)).size).toBe(16);
  });

  it('distributes four cards to each star domain', () => {
    for (const domain of ['破局星域', '定盘星域', '造浪星域', '稳场星域']) {
      expect(ARCHETYPES.filter((item) => item.domain === domain)).toHaveLength(4);
    }
  });

  it('maps a code to its fixed card identity', () => {
    expect(getArchetype('AVLH')).toMatchObject({ title: '帷幄国师', core: '谋', mapping: '幕后组局人' });
  });
});
