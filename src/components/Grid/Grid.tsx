/**
 * Grid Component
 * 
 * Renders the complete game grid with all cells.
 * Implements responsive layout and performance optimizations.
 * 
 * @module components/Grid
 * @author GridGuard Development Team
 * @version 1.0.0
 */

import React from 'react';
import type { GameBoard } from '../../types';
import { Cell } from '../Cell/Cell';

interface GridProps {
  board: GameBoard;
  onRevealCell: (row: number, col: number) => void;
  onFlagCell: (row: number, col: number) => void;
  onQuestionCell: (row: number, col: number) => void;
  disabled: boolean;
}

/**
 * Grid component that renders the game board
 */
export const Grid: React.FC<GridProps> = ({
  board,
  onRevealCell,
  onFlagCell,
  onQuestionCell,
  disabled,
}) => {
  return (
    <div className="flex items-center justify-center p-4 animate-fade-in">
      <div
        className="inline-grid gap-1 p-6 rounded-2xl bg-dark-200/40 backdrop-blur-lg border border-primary-500/20 shadow-2xl"
        style={{
          gridTemplateColumns: `repeat(${board.cols}, minmax(0, 1fr))`,
        }}
      >
        {board.cells.map((row) =>
          row.map((cell) => (
            <Cell
              key={cell.id}
              cell={cell}
              onReveal={onRevealCell}
              onFlag={onFlagCell}
              onQuestion={onQuestionCell}
              disabled={disabled}
            />
          ))
        )}
      </div>
    </div>
  );
};
