const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Check if wasm-pack is installed
try {
  execSync('wasm-pack --version', { stdio: 'pipe' });
  console.log('✓ wasm-pack is installed');
} catch (error) {
  console.warn('⚠ wasm-pack is not installed. Using CSS fallback instead.');
  console.log('To install wasm-pack:');
  console.log('1. Install Rust from https://rustup.rs/');
  console.log('2. Run: cargo install wasm-pack');
  console.log('Creating empty package directory for import compatibility...');
  
  // Create dummy pkg directory with minimal structure instead of exiting
  const pkgDir = path.resolve(rustProjectPath, 'pkg');
  if (!fs.existsSync(pkgDir)) {
    fs.mkdirSync(pkgDir, { recursive: true });
  }
  
  // Create a minimal JS module that can be imported without errors
  const indexJs = path.resolve(pkgDir, 'index.js');
  if (!fs.existsSync(indexJs)) {
    fs.writeFileSync(indexJs, `
      // Fallback module when wasm-pack is not installed
      export function init() {
        console.warn('WebAssembly module not available. Using CSS fallback.');
        return Promise.resolve();
      }
      
      export class TerminalRenderer {
        constructor() {
          throw new Error('WebAssembly module not available. Using CSS fallback.');
        }
      }
    `);
  }
  
  process.exit(0); // Exit successfully so build can continue with fallback
}

// Check if the rust-renderer directory exists
const rustProjectPath = path.resolve(__dirname, '../rust-renderer');
if (!fs.existsSync(rustProjectPath)) {
  console.error('✗ rust-renderer directory does not exist');
  process.exit(1);
}

// Create the output directory if it doesn't exist
const outputPath = path.resolve(rustProjectPath, 'pkg');
if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath, { recursive: true });
}

console.log('Building WebAssembly module...');

try {
  // Build the Rust WebAssembly module
  execSync('wasm-pack build --target web --out-dir pkg', {
    cwd: rustProjectPath,
    stdio: 'inherit'
  });

  console.log('✓ WebAssembly module built successfully');
  
  // Make sure the Next.js app can import the wasm module correctly
  const wasmLoaderPath = path.resolve(__dirname, '../src/app/components/wasm-loader.ts');
  
  if (fs.existsSync(wasmLoaderPath)) {
    let loaderContent = fs.readFileSync(wasmLoaderPath, 'utf8');
    
    // Verify the correct import path
    if (loaderContent.includes("await import('../../rust-renderer/pkg')")) {
      console.log('✓ Wasm loader import path looks correct');
    } else {
      console.warn('⚠ You may need to check the import path in wasm-loader.ts');
    }
  }
} catch (error) {
  console.error('✗ Error building WebAssembly module:', error);
  process.exit(1);
}

