/**
 * Local Storage Utility Functions
 * 
 * Type-safe wrapper around localStorage with error handling and validation.
 * Implements the Repository pattern for data persistence.
 * 
 * @module utils/storage
 * @author GridGuard Development Team
 * @version 1.0.0
 */

import type { HighScore, UserPreferences } from '../types';
import { STORAGE_KEYS, DEFAULT_PREFERENCES } from '../constants';

/**
 * Safely gets an item from localStorage with type checking
 * 
 * @param key - Storage key
 * @returns Parsed value or null if not found/invalid
 */
const getItem = <T>(key: string): T | null => {
  try {
    const item = localStorage.getItem(key);
    if (!item) return null;
    return JSON.parse(item) as T;
  } catch (error) {
    console.error(`Error reading from localStorage (key: ${key}):`, error);
    return null;
  }
};

/**
 * Safely sets an item in localStorage
 * 
 * @param key - Storage key
 * @param value - Value to store
 * @returns True if successful
 */
const setItem = <T>(key: string, value: T): boolean => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Error writing to localStorage (key: ${key}):`, error);
    return false;
  }
};

/**
 * Removes an item from localStorage
 * 
 * @param key - Storage key
 */
const removeItem = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing from localStorage (key: ${key}):`, error);
  }
};

/**
 * Gets all high scores from storage
 * 
 * @returns Array of high scores, sorted by time (fastest first)
 */
export const getHighScores = (): HighScore[] => {
  const scores = getItem<HighScore[]>(STORAGE_KEYS.HIGH_SCORES) || [];
  return scores.sort((a, b) => a.time - b.time);
};

/**
 * Adds a new high score to storage
 * 
 * @param score - New high score to add
 * @returns Updated array of high scores
 */
export const addHighScore = (score: HighScore): HighScore[] => {
  const scores = getHighScores();
  scores.push(score);
  
  // Keep only top 10 scores per difficulty
  const topScores = scores
    .filter(s => s.difficulty === score.difficulty)
    .sort((a, b) => a.time - b.time)
    .slice(0, 10);
  
  // Combine with scores from other difficulties
  const otherScores = scores.filter(s => s.difficulty !== score.difficulty);
  const allScores = [...topScores, ...otherScores];
  
  setItem(STORAGE_KEYS.HIGH_SCORES, allScores);
  return allScores;
};

/**
 * Gets user preferences from storage
 * 
 * @returns User preferences or defaults
 */
export const getUserPreferences = (): UserPreferences => {
  const prefs = getItem<UserPreferences>(STORAGE_KEYS.USER_PREFERENCES);
  return prefs || DEFAULT_PREFERENCES;
};

/**
 * Saves user preferences to storage
 * 
 * @param preferences - User preferences to save
 * @returns True if successful
 */
export const saveUserPreferences = (preferences: UserPreferences): boolean => {
  return setItem(STORAGE_KEYS.USER_PREFERENCES, preferences);
};

/**
 * Clears all high scores from storage
 */
export const clearHighScores = (): void => {
  removeItem(STORAGE_KEYS.HIGH_SCORES);
};

/**
 * Clears all stored data
 */
export const clearAllData = (): void => {
  Object.values(STORAGE_KEYS).forEach(key => removeItem(key));
};

/**
 * Checks if localStorage is available
 * 
 * @returns True if localStorage is available
 */
export const isStorageAvailable = (): boolean => {
  try {
    const test = '__storage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch {
    return false;
  }
};
