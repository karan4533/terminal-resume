'use client';

let wasmModule: any = null;
let isLoading = false;
let loadError: Error | null = null;

// Function to dynamically import the Rust-generated WASM module
export async function initTerminalRenderer() {
  if (wasmModule) {
    return wasmModule;
  }
  
  if (isLoading) {
    // Wait until the module is loaded
    return new Promise((resolve, reject) => {
      const checkInterval = setInterval(() => {
        if (wasmModule) {
          clearInterval(checkInterval);
          resolve(wasmModule);
        }
        if (loadError) {
          clearInterval(checkInterval);
          reject(loadError);
        }
      }, 100);
    });
  }

  isLoading = true;
  
  try {
    // WASM module is not available, using the fallback renderer
    console.info('Using fallback Canvas-based rendering instead of WebAssembly');
    
    // Create a fallback module with the same API but using CSS/Canvas
    wasmModule = {
      TerminalRenderer: createFallbackRenderer(),
    };
    
    loadError = null;
    isLoading = false;
    return wasmModule;
  } catch (error) {
    console.error('Failed to initialize renderer:', error);
    
    // Re-create the fallback module in case there was an error
    wasmModule = {
      TerminalRenderer: createFallbackRenderer(),
    };
    
    loadError = null;
    isLoading = false;
    return wasmModule;
  }
}

// Ensure the WebAssembly module is properly destroyed when the app unmounts
export function cleanupWasmModule() {
  if (wasmModule) {
    // Clean up any resources if needed
    wasmModule = null;
    loadError = null;
  }
}

// Fallback renderer using Canvas API when WebAssembly is not available
function createFallbackRenderer() {
  return class FallbackTerminalRenderer {
    private canvas: HTMLCanvasElement | null = null;
    private ctx: CanvasRenderingContext2D | null = null;
    private width: number = 800;
    private height: number = 600;
    
    constructor(canvasId: string) {
      console.log('Using fallback Canvas-based terminal renderer');
      
      // Get the canvas element
      const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
      if (!canvas) {
        throw new Error(`Canvas element with id ${canvasId} not found`);
      }
      
      this.canvas = canvas;
      this.width = canvas.width;
      this.height = canvas.height;
      
      // Get 2D context
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        throw new Error('Could not get 2D context from canvas');
      }
      this.ctx = ctx;
      
      // Initial clear
      this.clear(0.1, 0.1, 0.1, 1.0);
    }
    
    init_shaders(): Promise<void> {
      // No shaders in fallback mode, just resolve
      return Promise.resolve();
    }
    
    resize(width: number, height: number): void {
      if (!this.canvas || !this.ctx) return;
      
      this.width = width;
      this.height = height;
      this.canvas.width = width;
      this.canvas.height = height;
      
      // Re-clear after resize
      this.clear(0.1, 0.1, 0.1, 1.0);
    }
    
    clear(r: number, g: number, b: number, a: number): void {
      if (!this.ctx) return;
      
      // Convert from 0-1 range to 0-255
      const red = Math.floor(r * 255);
      const green = Math.floor(g * 255);
      const blue = Math.floor(b * 255);
      
      this.ctx.fillStyle = `rgba(${red}, ${green}, ${blue}, ${a})`;
      this.ctx.fillRect(0, 0, this.width, this.height);
    }
    
    draw_prompt(x: number, y: number, color: string): void {
      if (!this.ctx) return;
      
      this.ctx.fillStyle = color;
      this.ctx.font = 'bold 16px monospace';
      this.ctx.fillText('>', x, y);
    }
    
    draw_text(text: string, x: number, y: number, color: string): void {
      if (!this.ctx) return;
      
      this.ctx.fillStyle = color;
      this.ctx.font = '16px monospace';
      this.ctx.fillText(text, x, y);
    }
    
    draw_cursor(x: number, y: number, width: number, height: number, color: string): void {
      if (!this.ctx) return;
      
      this.ctx.fillStyle = color;
      this.ctx.fillRect(x, y, width, height);
    }
  };
}
