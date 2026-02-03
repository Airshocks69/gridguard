/**
 * Game Logic Tests
 * 
 * Unit tests for core game logic functions.
 * 
 * @module utils/__tests__/gameLogic
 */

import { describe, it, expect } from 'vitest';
import {
  generateCellId,
  createEmptyCell,
  isValidPosition,
  getNeighborPositions,
  initializeEmptyBoard,
  getFlagCount,
  getRevealedCount,
} from '../gameLogic';

describe('gameLogic', () => {
  describe('generateCellId', () => {
    it('should generate unique cell IDs', () => {
      expect(generateCellId(0, 0)).toBe('cell-0-0');
      expect(generateCellId(5, 10)).toBe('cell-5-10');
    });
  });

  describe('createEmptyCell', () => {
    it('should create a cell with correct initial state', () => {
      const cell = createEmptyCell(2, 3);
      
      expect(cell.row).toBe(2);
      expect(cell.col).toBe(3);
      expect(cell.isMine).toBe(false);
      expect(cell.isRevealed).toBe(false);
      expect(cell.isFlagged).toBe(false);
      expect(cell.neighborMines).toBe(0);
    });
  });

  describe('isValidPosition', () => {
    it('should validate positions correctly', () => {
      expect(isValidPosition(0, 0, 5, 5)).toBe(true);
      expect(isValidPosition(4, 4, 5, 5)).toBe(true);
      expect(isValidPosition(-1, 0, 5, 5)).toBe(false);
      expect(isValidPosition(0, -1, 5, 5)).toBe(false);
      expect(isValidPosition(5, 5, 5, 5)).toBe(false);
    });
  });

  describe('getNeighborPositions', () => {
    it('should return all 8 neighbors for center cell', () => {
      const neighbors = getNeighborPositions(1, 1, 3, 3);
      expect(neighbors).toHaveLength(8);
    });

    it('should return 3 neighbors for corner cell', () => {
      const neighbors = getNeighborPositions(0, 0, 3, 3);
      expect(neighbors).toHaveLength(3);
    });

    it('should return 5 neighbors for edge cell', () => {
      const neighbors = getNeighborPositions(0, 1, 3, 3);
      expect(neighbors).toHaveLength(5);
    });
  });

  describe('initializeEmptyBoard', () => {
    it('should create board with correct dimensions', () => {
      const board = initializeEmptyBoard(3, 4);
      
      expect(board).toHaveLength(3);
      expect(board[0]).toHaveLength(4);
    });

    it('should initialize all cells as empty', () => {
      const board = initializeEmptyBoard(2, 2);
      
      board.forEach(row => {
        row.forEach(cell => {
          expect(cell.isMine).toBe(false);
          expect(cell.isRevealed).toBe(false);
        });
      });
    });
  });

  describe('getFlagCount', () => {
    it('should count flagged cells correctly', () => {
      const board = initializeEmptyBoard(3, 3);
      board[0][0].isFlagged = true;
      board[1][1].isFlagged = true;
      
      expect(getFlagCount(board)).toBe(2);
    });
  });

  describe('getRevealedCount', () => {
    it('should count revealed cells correctly', () => {
      const board = initializeEmptyBoard(3, 3);
      board[0][0].isRevealed = true;
      board[0][1].isRevealed = true;
      board[2][2].isRevealed = true;
      
      expect(getRevealedCount(board)).toBe(3);
    });
  });
});
