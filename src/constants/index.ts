/**
 * Application Constants and Configuration
 * 
 * Centralized configuration management following the Single Source of Truth principle.
 * All magic numbers, strings, and configuration values are defined here.
 * 
 * @module constants
 * @author GridGuard Development Team
 * @version 1.0.0
 */

import { Difficulty, type DifficultyConfig, type Direction } from '../types';

/**
 * Predefined difficulty configurations
 * Carefully balanced for optimal game experience
 */
export const DIFFICULTY_CONFIGS: Record<Difficulty, DifficultyConfig> = {
  [Difficulty.BEGINNER]: {
    rows: 9,
    cols: 9,
    mines: 10,
    name: 'Beginner',
    description: 'Perfect for learning the basics',
  },
  [Difficulty.INTERMEDIATE]: {
    rows: 16,
    cols: 16,
    mines: 40,
    name: 'Intermediate',
    description: 'A balanced challenge',
  },
  [Difficulty.EXPERT]: {
    rows: 16,
    cols: 30,
    mines: 99,
    name: 'Expert',
    description: 'For seasoned players',
  },
  [Difficulty.CUSTOM]: {
    rows: 10,
    cols: 10,
    mines: 15,
    name: 'Custom',
    description: 'Create your own challenge',
  },
} as const;

/**
 * Direction vectors for calculating neighbor cells
 * Covers all 8 adjacent positions in a grid
 */
export const DIRECTIONS: readonly Direction[] = [
  [-1, -1], [-1, 0], [-1, 1],
  [0, -1],           [0, 1],
  [1, -1],  [1, 0],  [1, 1],
] as const;

/**
 * Color mapping for mine count display
 * Following accessibility guidelines and visual hierarchy
 */
export const MINE_COUNT_COLORS: Record<number, string> = {
  1: 'text-blue-600',
  2: 'text-green-600',
  3: 'text-red-600',
  4: 'text-purple-700',
  5: 'text-orange-700',
  6: 'text-cyan-600',
  7: 'text-black',
  8: 'text-gray-700',
} as const;

/**
 * Animation duration constants (in milliseconds)
 */
export const ANIMATION_DURATION = {
  CELL_REVEAL: 150,
  CASCADE_DELAY: 30,
  WIN_CELEBRATION: 500,
  LOSE_EXPLOSION: 300,
  MODAL_FADE: 200,
} as const;

/**
 * Game timing constants
 */
export const TIMING = {
  TIMER_INTERVAL: 1000, // 1 second
  AUTO_SAVE_INTERVAL: 5000, // 5 seconds
  DEBOUNCE_DELAY: 300, // 300ms
} as const;

/**
 * Local storage keys
 */
export const STORAGE_KEYS = {
  HIGH_SCORES: 'gridguard_high_scores',
  USER_PREFERENCES: 'gridguard_preferences',
  SAVED_GAME: 'gridguard_saved_game',
} as const;

/**
 * Validation constraints
 */
export const VALIDATION = {
  MIN_ROWS: 5,
  MAX_ROWS: 30,
  MIN_COLS: 5,
  MAX_COLS: 50,
  MIN_MINES: 1,
  MAX_MINE_DENSITY: 0.5, // Maximum 50% of cells can be mines
} as const;

/**
 * UI Constants
 */
export const UI = {
  CELL_SIZE: 32, // pixels
  CELL_GAP: 2, // pixels
  MAX_GRID_WIDTH: 800, // pixels
  HEADER_HEIGHT: 80, // pixels
} as const;

/**
 * Default user preferences
 */
export const DEFAULT_PREFERENCES = {
  soundEnabled: true,
  animationsEnabled: true,
  theme: 'dark' as const,
  questionMarksEnabled: true,
} as const;

/**
 * Game messages
 */
export const MESSAGES = {
  GAME_WON: '🎉 Congratulations! You\'ve cleared all mines!',
  GAME_LOST: '💥 Game Over! You hit a mine!',
  NEW_GAME: 'Ready to start a new game?',
  CONFIRM_NEW_GAME: 'Are you sure you want to start a new game? Your current progress will be lost.',
} as const;

/**
 * Emoji constants for visual elements
 */
export const EMOJI = {
  MINE: '💣',
  FLAG: '🚩',
  QUESTION: '❓',
  WINNER: '🎉',
  LOSER: '😵',
  TIMER: '⏱️',
} as const;
