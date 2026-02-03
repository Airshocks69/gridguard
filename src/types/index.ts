/**
 * Core Type Definitions for GridGuard
 * 
 * This file contains all type definitions used throughout the application.
 * Following strict TypeScript best practices for type safety and maintainability.
 * 
 * @module types
 * @author GridGuard Development Team
 * @version 1.0.0
 */

/**
 * Difficulty levels available in the game
 */
export const Difficulty = {
  BEGINNER: 'BEGINNER',
  INTERMEDIATE: 'INTERMEDIATE',
  EXPERT: 'EXPERT',
  CUSTOM: 'CUSTOM',
} as const;

export type Difficulty = typeof Difficulty[keyof typeof Difficulty];

/**
 * Current state of the game
 */
export const GameState = {
  IDLE: 'IDLE',
  PLAYING: 'PLAYING',
  WON: 'WON',
  LOST: 'LOST',
  PAUSED: 'PAUSED',
} as const;

export type GameState = typeof GameState[keyof typeof GameState];

/**
 * State of an individual cell
 */
export const CellState = {
  HIDDEN: 'HIDDEN',
  REVEALED: 'REVEALED',
  FLAGGED: 'FLAGGED',
  QUESTIONED: 'QUESTIONED',
} as const;

export type CellState = typeof CellState[keyof typeof CellState];

/**
 * Configuration for different difficulty levels
 */
export interface DifficultyConfig {
  readonly rows: number;
  readonly cols: number;
  readonly mines: number;
  readonly name: string;
  readonly description: string;
}

/**
 * Represents a single cell in the game grid
 */
export interface Cell {
  readonly id: string;
  readonly row: number;
  readonly col: number;
  isMine: boolean;
  isRevealed: boolean;
  isFlagged: boolean;
  isQuestioned: boolean;
  neighborMines: number;
  isExploded?: boolean;
}

/**
 * Complete game board state
 */
export interface GameBoard {
  readonly cells: Cell[][];
  readonly rows: number;
  readonly cols: number;
  readonly totalMines: number;
}

/**
 * Player statistics and game metrics
 */
export interface GameStats {
  flagsUsed: number;
  cellsRevealed: number;
  timeElapsed: number;
  movesCount: number;
}

/**
 * Complete game state management
 */
export interface GameStateManager {
  board: GameBoard;
  gameState: GameState;
  difficulty: Difficulty;
  stats: GameStats;
  firstClick: boolean;
}

/**
 * User preferences and settings
 */
export interface UserPreferences {
  soundEnabled: boolean;
  animationsEnabled: boolean;
  theme: 'light' | 'dark';
  questionMarksEnabled: boolean;
}

/**
 * High score entry
 */
export interface HighScore {
  readonly id: string;
  readonly playerName: string;
  readonly difficulty: Difficulty;
  readonly time: number;
  readonly date: Date;
  readonly moves: number;
}

/**
 * Custom game configuration
 */
export interface CustomConfig {
  rows: number;
  cols: number;
  mines: number;
}

/**
 * Game action types for state management
 */
export type GameAction =
  | { type: 'REVEAL_CELL'; payload: { row: number; col: number } }
  | { type: 'FLAG_CELL'; payload: { row: number; col: number } }
  | { type: 'QUESTION_CELL'; payload: { row: number; col: number } }
  | { type: 'NEW_GAME'; payload: { difficulty: Difficulty; customConfig?: CustomConfig } }
  | { type: 'PAUSE_GAME' }
  | { type: 'RESUME_GAME' }
  | { type: 'GAME_WON' }
  | { type: 'GAME_LOST'; payload: { row: number; col: number } }
  | { type: 'UPDATE_TIME'; payload: { time: number } };

/**
 * Position coordinates on the grid
 */
export interface Position {
  readonly row: number;
  readonly col: number;
}

/**
 * Direction vectors for neighbor cell calculation
 */
export type Direction = readonly [number, number];
