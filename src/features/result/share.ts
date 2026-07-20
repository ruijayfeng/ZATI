import type { Archetype } from '../../domain/types';
export function buildShareText(a:Archetype){return `测出来我是 ${a.code}《${a.title}》· ${a.mapping}\n${a.verse}\nZATI 是一款东方人格自我探索工具。`;}
export async function shareArchetype(a:Archetype){const text=buildShareText(a);if(navigator.share){await navigator.share({title:`${a.code}《${a.title}》`,text});return 'shared'}await navigator.clipboard.writeText(text);return 'copied'}
