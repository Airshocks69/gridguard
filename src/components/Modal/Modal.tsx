/**
 * Modal Component
 * 
 * Reusable modal dialog with glassmorphism design.
 * Implements accessibility best practices.
 * 
 * @module components/Modal
 * @author GridGuard Development Team
 * @version 1.0.0
 */

import React, { useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

/**
 * Modal component with backdrop and animation
 */
export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
}) => {
  /**
   * Handle escape key press
   */
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);
  
  /**
   * Prevent body scroll when modal is open
   */
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);
  
  if (!isOpen) {
    return null;
  }
  
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center animate-fade-in"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      
      {/* Modal */}
      <div
        className="relative bg-dark-200/90 backdrop-blur-xl rounded-2xl border border-primary-500/30 shadow-2xl p-8 max-w-md w-full mx-4 animate-slide-up"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-primary-300/60 hover:text-primary-300 transition-colors text-2xl"
          aria-label="Close modal"
        >
          ×
        </button>
        
        {/* Title */}
        <h2
          id="modal-title"
          className="text-3xl font-bold mb-6 bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent"
        >
          {title}
        </h2>
        
        {/* Content */}
        <div className="text-primary-200">
          {children}
        </div>
      </div>
    </div>
  );
};
