/**
 * Cell Component
 * 
 * Represents a single cell in the game grid.
 * Implements glassmorphism design with smooth animations.
 * 
 * @module components/Cell
 * @author GridGuard Development Team
 * @version 1.0.0
 */

import React, { memo } from 'react';
import type { Cell as CellType } from '../../types';
import { MINE_COUNT_COLORS, EMOJI } from '../../constants';

interface CellProps {
  cell: CellType;
  onReveal: (row: number, col: number) => void;
  onFlag: (row: number, col: number) => void;
  onQuestion: (row: number, col: number) => void;
  disabled: boolean;
}

/**
 * Cell component with memoization for performance optimization
 */
export const Cell: React.FC<CellProps> = memo(({
  cell,
  onReveal,
  onFlag,
  onQuestion,
  disabled,
}) => {
  /**
   * Handles left click - reveals cell
   */
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!disabled && !cell.isRevealed && !cell.isFlagged) {
      onReveal(cell.row, cell.col);
    }
  };
  
  /**
   * Handles right click - toggles flag
   */
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!disabled && !cell.isRevealed) {
      onFlag(cell.row, cell.col);
    }
  };
  
  /**
   * Handles double click - toggles question mark
   */
  const handleDoubleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!disabled && !cell.isRevealed && !cell.isFlagged) {
      onQuestion(cell.row, cell.col);
    }
  };
  
  /**
   * Renders cell content based on state
   */
  const renderContent = () => {
    if (cell.isFlagged) {
      return <span className="text-2xl">{EMOJI.FLAG}</span>;
    }
    
    if (cell.isQuestioned) {
      return <span className="text-2xl opacity-60">{EMOJI.QUESTION}</span>;
    }
    
    if (!cell.isRevealed) {
      return null;
    }
    
    if (cell.isMine) {
      return (
        <span className={`text-2xl ${cell.isExploded ? 'animate-bounce-subtle' : ''}`}>
          {EMOJI.MINE}
        </span>
      );
    }
    
    if (cell.neighborMines > 0) {
      return (
        <span className={`font-bold text-lg ${MINE_COUNT_COLORS[cell.neighborMines]}`}>
          {cell.neighborMines}
        </span>
      );
    }
    
    return null;
  };
  
  /**
   * Determines cell styling based on state
   */
  const getCellClassName = () => {
    const baseClasses = [
      'w-10 h-10',
      'flex items-center justify-center',
      'rounded-lg',
      'transition-all duration-150',
      'cursor-pointer select-none',
    ];
    
    if (cell.isRevealed) {
      baseClasses.push(
        'bg-dark-100/30',
        'border border-dark-100/50',
        'shadow-inner'
      );
      
      if (cell.isExploded) {
        baseClasses.push('bg-red-500/30', 'border-red-500');
      }
    } else {
      baseClasses.push(
        'bg-primary-500/20',
        'border border-primary-400/30',
        'backdrop-blur-md',
        'shadow-lg',
        'hover:bg-primary-400/30',
        'hover:scale-105',
        'hover:shadow-xl',
        'hover:border-primary-300/50',
        'active:scale-95'
      );
      
      if (cell.isFlagged) {
        baseClasses.push('bg-yellow-500/20', 'border-yellow-400/50');
      }
      
      if (disabled) {
        baseClasses.push('opacity-50', 'cursor-not-allowed');
      }
    }
    
    return baseClasses.join(' ');
  };
  
  return (
    <div
      className={getCellClassName()}
      onClick={handleClick}
      onContextMenu={handleContextMenu}
      onDoubleClick={handleDoubleClick}
      role="button"
      tabIndex={0}
      aria-label={`Cell at row ${cell.row}, column ${cell.col}`}
      aria-pressed={cell.isRevealed}
    >
      {renderContent()}
    </div>
  );
});

Cell.displayName = 'Cell';
