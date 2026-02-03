/**
 * Core Game Logic Utilities
 * 
 * Pure functions implementing the core game mechanics.
 * All functions are immutable, testable, and follow functional programming principles.
 * 
 * @module utils/gameLogic
 * @author GridGuard Development Team
 * @version 1.0.0
 */

import type { Cell, GameBoard, Position, CustomConfig } from '../types';
import { DIRECTIONS, DIFFICULTY_CONFIGS } from '../constants';
import { Difficulty } from '../types';

/**
 * Generates a unique cell ID based on position
 * 
 * @param row - Row index
 * @param col - Column index
 * @returns Unique cell identifier
 */
export const generateCellId = (row: number, col: number): string => {
  return `cell-${row}-${col}`;
};

/**
 * Creates an empty cell at the specified position
 * 
 * @param row - Row index
 * @param col - Column index
 * @returns New cell object
 */
export const createEmptyCell = (row: number, col: number): Cell => ({
  id: generateCellId(row, col),
  row,
  col,
  isMine: false,
  isRevealed: false,
  isFlagged: false,
  isQuestioned: false,
  neighborMines: 0,
});

/**
 * Initializes an empty game board
 * 
 * @param rows - Number of rows
 * @param cols - Number of columns
 * @returns Empty game board
 */
export const initializeEmptyBoard = (rows: number, cols: number): Cell[][] => {
  return Array.from({ length: rows }, (_, row) =>
    Array.from({ length: cols }, (_, col) => createEmptyCell(row, col))
  );
};

/**
 * Checks if a position is within board boundaries
 * 
 * @param row - Row index
 * @param col - Column index
 * @param rows - Total rows
 * @param cols - Total columns
 * @returns True if position is valid
 */
export const isValidPosition = (
  row: number,
  col: number,
  rows: number,
  cols: number
): boolean => {
  return row >= 0 && row < rows && col >= 0 && col < cols;
};

/**
 * Gets all valid neighbor positions for a cell
 * 
 * @param row - Cell row
 * @param col - Cell column
 * @param rows - Total rows
 * @param cols - Total columns
 * @returns Array of neighbor positions
 */
export const getNeighborPositions = (
  row: number,
  col: number,
  rows: number,
  cols: number
): Position[] => {
  return DIRECTIONS
    .map(([dr, dc]) => ({ row: row + dr, col: col + dc }))
    .filter(pos => isValidPosition(pos.row, pos.col, rows, cols));
};

/**
 * Places mines randomly on the board, avoiding the first clicked cell and its neighbors
 * 
 * @param cells - Current board state
 * @param totalMines - Number of mines to place
 * @param firstClick - First clicked cell position
 * @returns Board with mines placed
 */
export const placeMines = (
  cells: Cell[][],
  totalMines: number,
  firstClick: Position
): Cell[][] => {
  const rows = cells.length;
  const cols = cells[0].length;
  const newCells = cells.map(row => row.map(cell => ({ ...cell })));
  
  // Get positions to exclude (first click and its neighbors)
  const excludedPositions = new Set<string>();
  excludedPositions.add(generateCellId(firstClick.row, firstClick.col));
  
  getNeighborPositions(firstClick.row, firstClick.col, rows, cols).forEach(pos => {
    excludedPositions.add(generateCellId(pos.row, pos.col));
  });
  
  // Get all available positions
  const availablePositions: Position[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (!excludedPositions.has(generateCellId(r, c))) {
        availablePositions.push({ row: r, col: c });
      }
    }
  }
  
  // Randomly place mines
  const shuffled = [...availablePositions].sort(() => Math.random() - 0.5);
  const minePositions = shuffled.slice(0, Math.min(totalMines, shuffled.length));
  
  minePositions.forEach(({ row, col }) => {
    newCells[row][col].isMine = true;
  });
  
  return newCells;
};

/**
 * Calculates the number of neighboring mines for each cell
 * 
 * @param cells - Current board state
 * @returns Board with neighbor counts calculated
 */
export const calculateNeighborMines = (cells: Cell[][]): Cell[][] => {
  const rows = cells.length;
  const cols = cells[0].length;
  const newCells = cells.map(row => row.map(cell => ({ ...cell })));
  
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (!newCells[row][col].isMine) {
        const neighbors = getNeighborPositions(row, col, rows, cols);
        const mineCount = neighbors.filter(
          pos => newCells[pos.row][pos.col].isMine
        ).length;
        newCells[row][col].neighborMines = mineCount;
      }
    }
  }
  
  return newCells;
};

/**
 * Reveals a cell and recursively reveals neighbors if it has no adjacent mines
 * 
 * @param cells - Current board state
 * @param row - Cell row
 * @param col - Cell column
 * @returns Updated board state with revealed cells
 */
export const revealCell = (cells: Cell[][], row: number, col: number): Cell[][] => {
  const rows = cells.length;
  const cols = cells[0].length;
  
  if (!isValidPosition(row, col, rows, cols)) {
    return cells;
  }
  
  const cell = cells[row][col];
  
  if (cell.isRevealed || cell.isFlagged) {
    return cells;
  }
  
  const newCells = cells.map(r => r.map(c => ({ ...c })));
  newCells[row][col].isRevealed = true;
  
  // If cell has no adjacent mines, reveal neighbors recursively
  if (cell.neighborMines === 0 && !cell.isMine) {
    const neighbors = getNeighborPositions(row, col, rows, cols);
    
    neighbors.forEach(({ row: nRow, col: nCol }) => {
      if (!newCells[nRow][nCol].isRevealed && !newCells[nRow][nCol].isFlagged) {
        const revealed = revealCell(newCells, nRow, nCol);
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            newCells[r][c] = revealed[r][c];
          }
        }
      }
    });
  }
  
  return newCells;
};

/**
 * Toggles flag state on a cell
 * 
 * @param cells - Current board state
 * @param row - Cell row
 * @param col - Cell column
 * @returns Updated board state
 */
export const toggleFlag = (cells: Cell[][], row: number, col: number): Cell[][] => {
  const newCells = cells.map(r => r.map(c => ({ ...c })));
  const cell = newCells[row][col];
  
  if (!cell.isRevealed) {
    cell.isFlagged = !cell.isFlagged;
    if (cell.isFlagged) {
      cell.isQuestioned = false;
    }
  }
  
  return newCells;
};

/**
 * Toggles question mark state on a cell
 * 
 * @param cells - Current board state
 * @param row - Cell row
 * @param col - Cell column
 * @returns Updated board state
 */
export const toggleQuestion = (cells: Cell[][], row: number, col: number): Cell[][] => {
  const newCells = cells.map(r => r.map(c => ({ ...c })));
  const cell = newCells[row][col];
  
  if (!cell.isRevealed && !cell.isFlagged) {
    cell.isQuestioned = !cell.isQuestioned;
  }
  
  return newCells;
};

/**
 * Checks if the game is won (all non-mine cells revealed)
 * 
 * @param cells - Current board state
 * @param totalMines - Total number of mines
 * @returns True if game is won
 */
export const checkWinCondition = (cells: Cell[][], totalMines: number): boolean => {
  const totalCells = cells.length * cells[0].length;
  const revealedCells = cells.flat().filter(cell => cell.isRevealed).length;
  
  return revealedCells === totalCells - totalMines;
};

/**
 * Reveals all mines (called when game is lost)
 * 
 * @param cells - Current board state
 * @param explodedRow - Row of exploded mine
 * @param explodedCol - Column of exploded mine
 * @returns Updated board state
 */
export const revealAllMines = (
  cells: Cell[][],
  explodedRow: number,
  explodedCol: number
): Cell[][] => {
  return cells.map(row =>
    row.map(cell => ({
      ...cell,
      isRevealed: cell.isMine ? true : cell.isRevealed,
      isExploded: cell.isMine && cell.row === explodedRow && cell.col === explodedCol,
    }))
  );
};

/**
 * Creates a new game board with specified configuration
 * 
 * @param difficulty - Game difficulty
 * @param customConfig - Custom configuration (optional)
 * @returns New game board
 */
export const createNewBoard = (
  difficulty: Difficulty,
  customConfig?: CustomConfig
): GameBoard => {
  const config = difficulty === Difficulty.CUSTOM && customConfig
    ? customConfig
    : DIFFICULTY_CONFIGS[difficulty];
  
  const cells = initializeEmptyBoard(config.rows, config.cols);
  
  return {
    cells,
    rows: config.rows,
    cols: config.cols,
    totalMines: config.mines,
  };
};

/**
 * Gets count of flags placed on the board
 * 
 * @param cells - Current board state
 * @returns Number of flags placed
 */
export const getFlagCount = (cells: Cell[][]): number => {
  return cells.flat().filter(cell => cell.isFlagged).length;
};

/**
 * Gets count of revealed cells
 * 
 * @param cells - Current board state
 * @returns Number of revealed cells
 */
export const getRevealedCount = (cells: Cell[][]): number => {
  return cells.flat().filter(cell => cell.isRevealed).length;
};
