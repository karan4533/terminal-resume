'use client';

import { useState, useEffect, useCallback } from 'react';
import TerminalRenderer from './TerminalRenderer';

interface TerminalProps {
  initialContent?: string[];
  prompt?: string;
  className?: string;
  width?: number;
  height?: number;
  onCommand?: (command: string) => void;
}

export const Terminal: React.FC<TerminalProps> = ({
  initialContent = [],
  prompt = '> ',
  className = '',
  width = 800,
  height = 600,
  onCommand,
}) => {
  const [content, setContent] = useState<string[]>(initialContent);
  const [currentInput, setCurrentInput] = useState('');
  const [cursorPosition, setCursorPosition] = useState<[number, number]>([0, 0]);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  // Handle key presses
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      // Execute command
      const command = currentInput.trim();
      if (command) {
        setContent(prev => [...prev, `${prompt}${command}`]);
        onCommand?.(command);
        setHistory(prev => [command, ...prev]);
        setHistoryIndex(-1);
      } else {
        setContent(prev => [...prev, prompt]);
      }
      setCurrentInput('');
      setCursorPosition([0, 0]);
    } else if (e.key === 'Backspace') {
      // Handle backspace
      if (currentInput.length > 0) {
        setCurrentInput(prev => prev.slice(0, -1));
        setCursorPosition(([x, y]) => [Math.max(0, x - 1), y]);
      }
    } else if (e.key === 'ArrowUp') {
      // Navigate command history (up)
      if (history.length > 0 && historyIndex < history.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setCurrentInput(history[newIndex]);
        setCursorPosition([history[newIndex].length, 0]);
      }
    } else if (e.key === 'ArrowDown') {
      // Navigate command history (down)
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCurrentInput(history[newIndex]);
        setCursorPosition([history[newIndex].length, 0]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setCurrentInput('');
        setCursorPosition([0, 0]);
      }
    } else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
      // Add character to input
      setCurrentInput(prev => prev + e.key);
      setCursorPosition(([x, y]) => [x + 1, y]);
    }
  }, [currentInput, history, historyIndex, onCommand, prompt]);

  // Set up event listeners
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  // Prepare content for the renderer
  const terminalContent = [...content, `${prompt}${currentInput}`];

  return (
    <div className={className} style={{ position: 'relative' }}>
      <TerminalRenderer 
        width={width}
        height={height}
        content={terminalContent}
        prompt={prompt}
        cursorPosition={cursorPosition}
      />
    </div>
  );
};

export default Terminal;
