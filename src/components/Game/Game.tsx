/**
 * Game Component
 * 
 * Main game container that orchestrates all game logic and UI.
 * Implements the Container/Presentational pattern.
 * 
 * @module components/Game
 * @author GridGuard Development Team
 * @version 1.0.0
 */

import React, { useEffect, useState } from 'react';
import { useGameState } from '../../hooks/useGameState';
import { Grid } from '../Grid/Grid';
import { Controls } from '../Controls/Controls';
import { Modal } from '../Modal/Modal';
import { GameState, Difficulty } from '../../types';
import { MESSAGES } from '../../constants';

/**
 * Main Game component
 */
export const Game: React.FC = () => {
  const {
    gameState,
    difficulty,
    board,
    timeElapsed,
    movesCount,
    remainingMines,
    revealCell,
    flagCell,
    questionCell,
    newGame,
  } = useGameState(Difficulty.BEGINNER);
  
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  
  /**
   * Handle game state changes
   */
  useEffect(() => {
    if (gameState === GameState.WON) {
      setModalMessage(MESSAGES.GAME_WON);
      setShowModal(true);
    } else if (gameState === GameState.LOST) {
      setModalMessage(MESSAGES.GAME_LOST);
      setShowModal(true);
    }
  }, [gameState]);
  
  /**
   * Handle new game with difficulty change
   */
  const handleChangeDifficulty = (newDifficulty: Difficulty) => {
    if (gameState === GameState.PLAYING || gameState === GameState.PAUSED) {
      if (window.confirm(MESSAGES.CONFIRM_NEW_GAME)) {
        newGame(newDifficulty);
      }
    } else {
      newGame(newDifficulty);
    }
  };
  
  /**
   * Handle new game button click
   */
  const handleNewGame = () => {
    if (gameState === GameState.PLAYING || gameState === GameState.PAUSED) {
      if (window.confirm(MESSAGES.CONFIRM_NEW_GAME)) {
        newGame();
      }
    } else {
      newGame();
    }
  };
  
  /**
   * Handle modal close
   */
  const handleCloseModal = () => {
    setShowModal(false);
  };
  
  const isGameDisabled = gameState === GameState.WON || gameState === GameState.LOST;
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-300 via-dark-200 to-dark-100 flex flex-col items-center justify-center p-4">
      {/* Header */}
      <header className="mb-8 text-center animate-fade-in">
        <h1 className="text-6xl font-bold mb-2 bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent drop-shadow-lg">
          GridGuard
        </h1>
        <p className="text-primary-300/80 text-lg">
          Clear the grid, avoid the mines! 💎
        </p>
      </header>
      
      {/* Controls */}
      <Controls
        gameState={gameState}
        difficulty={difficulty}
        timeElapsed={timeElapsed}
        remainingMines={remainingMines}
        movesCount={movesCount}
        onNewGame={handleNewGame}
        onChangeDifficulty={handleChangeDifficulty}
      />
      
      {/* Game Grid */}
      <Grid
        board={board}
        onRevealCell={revealCell}
        onFlagCell={flagCell}
        onQuestionCell={questionCell}
        disabled={isGameDisabled}
      />
      
      {/* Instructions */}
      <footer className="mt-8 text-center text-primary-300/60 text-sm max-w-2xl animate-fade-in">
        <p className="mb-2">
          <strong>How to play:</strong> Left click to reveal • Right click to flag • Double click for question mark
        </p>
        <p>
          Clear all cells without hitting a mine to win! 🎯
        </p>
      </footer>
      
      {/* Game End Modal */}
      <Modal
        isOpen={showModal}
        onClose={handleCloseModal}
        title={gameState === GameState.WON ? 'Victory!' : 'Game Over'}
      >
        <div className="text-center">
          <p className="text-xl mb-4">{modalMessage}</p>
          <div className="flex flex-col gap-2 text-primary-300/80">
            <p>Time: {Math.floor(timeElapsed / 60)}:{(timeElapsed % 60).toString().padStart(2, '0')}</p>
            <p>Moves: {movesCount}</p>
          </div>
          <button
            onClick={() => {
              handleCloseModal();
              newGame();
            }}
            className="mt-6 px-8 py-3 bg-primary-500/80 hover:bg-primary-600/90 rounded-xl font-bold text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 active:scale-95"
          >
            Play Again
          </button>
        </div>
      </Modal>
    </div>
  );
};
