import { describe,expect,it } from 'vitest'; import { getArchetype } from '../../domain/archetypes'; import { buildShareText } from './share';
describe('share text',()=>{it('contains identity and non-deterministic disclaimer',()=>{const text=buildShareText(getArchetype('AVLH'));expect(text).toContain('AVLH《帷幄国师》');expect(text).toContain('幕后组局人');expect(text).toContain('自我探索');});});
