/**
 * Controls Component
 * 
 * Game control panel with stats, timer, and action buttons.
 * Implements modern glassmorphism design.
 * 
 * @module components/Controls
 * @author GridGuard Development Team
 * @version 1.0.0
 */

import React from 'react';
import { GameState, Difficulty } from '../../types';
import { EMOJI, DIFFICULTY_CONFIGS } from '../../constants';

interface ControlsProps {
  gameState: GameState;
  difficulty: Difficulty;
  timeElapsed: number;
  remainingMines: number;
  movesCount: number;
  onNewGame: () => void;
  onChangeDifficulty: (difficulty: Difficulty) => void;
}

/**
 * Formats time in MM:SS format
 */
const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

/**
 * Gets emoji for current game state
 */
const getStateEmoji = (state: GameState): string => {
  switch (state) {
    case GameState.WON:
      return EMOJI.WINNER;
    case GameState.LOST:
      return EMOJI.LOSER;
    default:
      return '😊';
  }
};

/**
 * Controls component for game management
 */
export const Controls: React.FC<ControlsProps> = ({
  gameState,
  difficulty,
  timeElapsed,
  remainingMines,
  movesCount,
  onNewGame,
  onChangeDifficulty,
}) => {
  return (
    <div className="w-full max-w-4xl mx-auto p-6 animate-slide-up">
      {/* Main control panel */}
      <div className="bg-dark-200/60 backdrop-blur-xl rounded-2xl border border-primary-500/30 shadow-2xl p-6 mb-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          {/* Stats section */}
          <div className="flex gap-6">
            {/* Timer */}
            <div className="flex items-center gap-2 px-4 py-2 bg-dark-100/50 rounded-xl border border-primary-400/20">
              <span className="text-2xl">{EMOJI.TIMER}</span>
              <span className="text-xl font-mono font-bold text-primary-300">
                {formatTime(timeElapsed)}
              </span>
            </div>
            
            {/* Mines remaining */}
            <div className="flex items-center gap-2 px-4 py-2 bg-dark-100/50 rounded-xl border border-yellow-400/20">
              <span className="text-2xl">{EMOJI.MINE}</span>
              <span className="text-xl font-mono font-bold text-yellow-300">
                {remainingMines}
              </span>
            </div>
            
            {/* Moves count */}
            <div className="flex items-center gap-2 px-4 py-2 bg-dark-100/50 rounded-xl border border-green-400/20">
              <span className="text-2xl">🎯</span>
              <span className="text-xl font-mono font-bold text-green-300">
                {movesCount}
              </span>
            </div>
          </div>
          
          {/* Action buttons */}
          <div className="flex items-center gap-3">
            {/* Game state indicator */}
            <div className="text-4xl animate-bounce-subtle">
              {getStateEmoji(gameState)}
            </div>
            
            {/* New game button */}
            <button
              onClick={onNewGame}
              className="px-6 py-3 bg-primary-500/80 hover:bg-primary-600/90 rounded-xl font-bold text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 active:scale-95 backdrop-blur-sm border border-primary-400/30"
            >
              New Game
            </button>
          </div>
        </div>
      </div>
      
      {/* Difficulty selector */}
      <div className="bg-dark-200/60 backdrop-blur-xl rounded-2xl border border-primary-500/30 shadow-2xl p-6">
        <h3 className="text-lg font-bold text-primary-300 mb-4 flex items-center gap-2">
          <span>⚙️</span>
          Difficulty
        </h3>
        
        <div className="grid grid-cols-3 gap-3">
          {Object.values(Difficulty)
            .filter(d => d !== Difficulty.CUSTOM)
            .map((diff) => (
              <button
                key={diff}
                onClick={() => onChangeDifficulty(diff)}
                className={`
                  px-4 py-3 rounded-xl font-semibold transition-all duration-200
                  backdrop-blur-sm border
                  ${
                    difficulty === diff
                      ? 'bg-primary-500/80 border-primary-400/50 text-white shadow-lg scale-105'
                      : 'bg-dark-100/50 border-primary-400/20 text-primary-200 hover:bg-dark-100/70 hover:scale-102'
                  }
                `}
              >
                <div className="text-center">
                  <div className="font-bold">{DIFFICULTY_CONFIGS[diff].name}</div>
                  <div className="text-xs opacity-80 mt-1">
                    {DIFFICULTY_CONFIGS[diff].rows}×{DIFFICULTY_CONFIGS[diff].cols}
                  </div>
                </div>
              </button>
            ))}
        </div>
      </div>
    </div>
  );
};
