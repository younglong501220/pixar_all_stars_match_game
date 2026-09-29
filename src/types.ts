export interface CardDefinition {
  id: string;
  name: string;
  movie: string;
  color: string;
  svg: string;
}

export interface PlayingCard {
  instanceId: string;
  cardId: string;
  name: string;
  movie: string;
  color: string;
  svg: string;
  isFlipped: boolean;
  isMatched: boolean;
  isMismatching?: boolean;
}

export type DifficultyMode = 'easy' | 'classic' | 'expert';

export interface DifficultyConfig {
  id: DifficultyMode;
  name: string;
  pairs: number;
  gridCols: string;
  gridClass: string;
  description: string;
}

export interface BestRecord {
  moves: number;
  timeSeconds: number;
}
