/**
 * Custom Hook for Game State Management
 * 
 * Centralizes all game logic and state management.
 * Implements the Container/Presentational pattern for clean separation of concerns.
 * 
 * @module hooks/useGameState
 * @author GridGuard Development Team
 * @version 1.0.0
 */

import { useState, useCallback, useEffect, useRef } from 'react';
import type { CustomConfig } from '../types';
import { GameState, Difficulty } from '../types';
import {
  createNewBoard,
  placeMines,
  calculateNeighborMines,
  revealCell,
  toggleFlag,
  toggleQuestion,
  checkWinCondition,
  revealAllMines,
  getFlagCount,
  getRevealedCount,
} from '../utils/gameLogic';

/**
 * Hook for managing complete game state and logic
 * 
 * @param initialDifficulty - Starting difficulty level
 * @returns Game state and control functions
 */
export const useGameState = (initialDifficulty: Difficulty = Difficulty.BEGINNER) => {
  const [gameState, setGameState] = useState<GameState>(GameState.IDLE);
  const [difficulty, setDifficulty] = useState<Difficulty>(initialDifficulty);
  const [board, setBoard] = useState(() => createNewBoard(initialDifficulty));
  const [firstClick, setFirstClick] = useState(true);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [movesCount, setMovesCount] = useState(0);
  
  const timerRef = useRef<number | null>(null);
  
  /**
   * Starts the game timer
   */
  const startTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    timerRef.current = setInterval(() => {
      setTimeElapsed(prev => prev + 1);
    }, 1000);
  }, []);
  
  /**
   * Stops the game timer
   */
  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);
  
  /**
   * Handles the first click - places mines and starts game
   */
  const handleFirstClick = useCallback((row: number, col: number) => {
    const cellsWithMines = placeMines(board.cells, board.totalMines, { row, col });
    const cellsWithCounts = calculateNeighborMines(cellsWithMines);
    
    setBoard(prev => ({
      ...prev,
      cells: cellsWithCounts,
    }));
    
    setFirstClick(false);
    setGameState(GameState.PLAYING);
    startTimer();
  }, [board, startTimer]);
  
  /**
   * Handles cell reveal action
   */
  const handleRevealCell = useCallback((row: number, col: number) => {
    if (gameState === GameState.WON || gameState === GameState.LOST) {
      return;
    }
    
    const cell = board.cells[row][col];
    
    if (cell.isRevealed || cell.isFlagged) {
      return;
    }
    
    // Handle first click
    if (firstClick) {
      handleFirstClick(row, col);
      
      // After placing mines, get updated board and reveal
      setTimeout(() => {
        setBoard(prev => ({
          ...prev,
          cells: revealCell(prev.cells, row, col),
        }));
      }, 0);
      
      setMovesCount(1);
      return;
    }
    
    setMovesCount(prev => prev + 1);
    
    // Check if mine was clicked
    if (cell.isMine) {
      const cellsWithRevealedMines = revealAllMines(board.cells, row, col);
      setBoard(prev => ({
        ...prev,
        cells: cellsWithRevealedMines,
      }));
      setGameState(GameState.LOST);
      stopTimer();
      return;
    }
    
    // Reveal cell(s)
    const newCells = revealCell(board.cells, row, col);
    setBoard(prev => ({
      ...prev,
      cells: newCells,
    }));
    
    // Check win condition
    if (checkWinCondition(newCells, board.totalMines)) {
      setGameState(GameState.WON);
      stopTimer();
    }
  }, [board, gameState, firstClick, handleFirstClick, stopTimer]);
  
  /**
   * Handles cell flag toggle
   */
  const handleFlagCell = useCallback((row: number, col: number) => {
    if (gameState === GameState.WON || gameState === GameState.LOST) {
      return;
    }
    
    const newCells = toggleFlag(board.cells, row, col);
    setBoard(prev => ({
      ...prev,
      cells: newCells,
    }));
  }, [board, gameState]);
  
  /**
   * Handles cell question mark toggle
   */
  const handleQuestionCell = useCallback((row: number, col: number) => {
    if (gameState === GameState.WON || gameState === GameState.LOST) {
      return;
    }
    
    const newCells = toggleQuestion(board.cells, row, col);
    setBoard(prev => ({
      ...prev,
      cells: newCells,
    }));
  }, [board, gameState]);
  
  /**
   * Starts a new game
   */
  const newGame = useCallback((newDifficulty?: Difficulty, customConfig?: CustomConfig) => {
    const difficultyToUse = newDifficulty || difficulty;
    
    stopTimer();
    setGameState(GameState.IDLE);
    setDifficulty(difficultyToUse);
    setBoard(createNewBoard(difficultyToUse, customConfig));
    setFirstClick(true);
    setTimeElapsed(0);
    setMovesCount(0);
  }, [difficulty, stopTimer]);
  
  /**
   * Pauses the game
   */
  const pauseGame = useCallback(() => {
    if (gameState === GameState.PLAYING) {
      setGameState(GameState.PAUSED);
      stopTimer();
    }
  }, [gameState, stopTimer]);
  
  /**
   * Resumes the game
   */
  const resumeGame = useCallback(() => {
    if (gameState === GameState.PAUSED) {
      setGameState(GameState.PLAYING);
      startTimer();
    }
  }, [gameState, startTimer]);
  
  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);
  
  return {
    // State
    gameState,
    difficulty,
    board,
    timeElapsed,
    movesCount,
    flagsUsed: getFlagCount(board.cells),
    cellsRevealed: getRevealedCount(board.cells),
    remainingMines: board.totalMines - getFlagCount(board.cells),
    
    // Actions
    revealCell: handleRevealCell,
    flagCell: handleFlagCell,
    questionCell: handleQuestionCell,
    newGame,
    pauseGame,
    resumeGame,
  };
};
