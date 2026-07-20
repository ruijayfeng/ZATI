export type AssessmentMode = 'quick' | 'standard';
export type AxisId = 'AR' | 'VS' | 'LI' | 'DH';
export type ArchetypeCode = `${'A' | 'R'}${'V' | 'S'}${'L' | 'I'}${'D' | 'H'}`;
export type StarDomain = '破局星域' | '定盘星域' | '造浪星域' | '稳场星域';

export interface Question {
  id: string;
  axis: AxisId;
  prompt: string;
  left: string;
  right: string;
  reverse?: boolean;
}

export interface Archetype {
  code: ArchetypeCode;
  title: string;
  core: string;
  domain: StarDomain;
  mapping: string;
  verse: string;
  summary: string;
  strengths: string[];
  shadows: string[];
  work: string;
  relationship: string;
  growth: string[];
}

export interface AssessmentResult {
  version: 1;
  mode: AssessmentMode;
  code: ArchetypeCode;
  scores: Record<AxisId, number>;
  boundaries: Record<AxisId, boolean>;
  completedAt: string;
}

export interface AssessmentSession {
  version: 1;
  mode: AssessmentMode;
  answers: Record<string, number>;
  currentIndex: number;
}
