'use client';

import React, { useEffect, useRef, useState } from 'react';
import { initTerminalRenderer } from './wasm-loader';

interface TerminalRendererProps {
  width?: number;
  height?: number;
  className?: string;
  content?: string[];
  prompt?: string;
  cursorPosition?: [number, number];
}

export const TerminalRenderer: React.FC<TerminalRendererProps> = ({
  width = 800,
  height = 600,
  className = '',
  content = [],
  prompt = '> ',
  cursorPosition = [0, 0],
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<any>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize the renderer on mount
  useEffect(() => {
    const initRenderer = async () => {
      try {
        if (!canvasRef.current) return;

        // Initialize the WebAssembly module
        const { TerminalRenderer } = await initTerminalRenderer();
        
        // Create a new renderer instance
        const renderer = new TerminalRenderer("terminal-canvas");
        await renderer.init_shaders();
        
        // Store the renderer reference
        rendererRef.current = renderer;
        setIsInitialized(true);
        
        console.log('GPU-accelerated terminal renderer initialized');
      } catch (error) {
        console.error('Failed to initialize terminal renderer:', error);
        // Error is handled by wasm-loader, which provides a fallback
      }
    };

    initRenderer();

    // Cleanup on unmount
    return () => {
      if (rendererRef.current) {
        // Clean up WebGL resources if needed
        rendererRef.current = null;
      }
    };
  }, []);

  // Handle resize
  useEffect(() => {
    if (!isInitialized || !rendererRef.current) return;
    
    rendererRef.current.resize(width, height);
    renderContent();
  }, [width, height, isInitialized]);

  // Render content when it changes
  useEffect(() => {
    if (!isInitialized) return;
    renderContent();
  }, [content, prompt, cursorPosition, isInitialized]);

  // Function to render terminal content
  const renderContent = () => {
    if (!rendererRef.current) return;
    
    // Clear terminal
    rendererRef.current.clear(0.1, 0.1, 0.1, 1.0);
    
    // Render each line of content
    content.forEach((line, index) => {
      try {
        rendererRef.current.draw_text(line, 5, 20 + index * 20, '#FFFFFF');
      } catch (error) {
        console.error('Error rendering line:', error);
      }
    });
    
    // Render prompt
    const promptY = 20 + content.length * 20;
    try {
      rendererRef.current.draw_prompt(5, promptY, '#00FF00');
      rendererRef.current.draw_text(prompt, 20, promptY, '#00FF00');
    } catch (error) {
      console.error('Error rendering prompt:', error);
    }
    
    // Render cursor
    const [cursorX, cursorY] = cursorPosition;
    const cursorPixelX = 20 + prompt.length * 9 + cursorX * 9;
    const cursorPixelY = promptY + cursorY * 20;
    try {
      rendererRef.current.draw_cursor(cursorPixelX, cursorPixelY, 9, 2, '#FFFFFF');
    } catch (error) {
      console.error('Error rendering cursor:', error);
    }
  };

  return (
    <canvas
      id="terminal-canvas"
      ref={canvasRef}
      width={width}
      height={height}
      className={className}
      style={{
        display: 'block',
        width: `${width}px`,
        height: `${height}px`,
        backgroundColor: '#111', // Fallback color
      }}
    />
  );
};

export default TerminalRenderer;

