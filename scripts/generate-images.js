/**
 * Script to generate OpenGraph image and favicons for the Terminal Resume
 * 
 * This script uses Node Canvas to programmatically create:
 * 1. OpenGraph image (1200x630)
 * 2. Various favicon sizes
 * 
 * Run with: node scripts/generate-images.js
 */

const fs = require('fs');
const path = require('path');
const { createCanvas, registerFont } = require('canvas');
const toIco = require('to-ico');

// Make sure the public directory exists
const publicDir = path.join(__dirname, '..', 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Attempt to load resume data
let resumeData;
try {
  // We can't directly import ES modules in CommonJS, so we'll read the file and extract the data
  const dataFilePath = path.join(__dirname, '..', 'src', 'app', 'data.ts');
  const dataFileContent = fs.readFileSync(dataFilePath, 'utf8');
  
  // Extract name and title using regex - this is a simplistic approach
  const nameMatch = dataFileContent.match(/name: "([^"]+)"/);
  const titleMatch = dataFileContent.match(/title: "([^"]+)"/);
  
  resumeData = {
    name: nameMatch && nameMatch[1] ? nameMatch[1] : 'John Doe',
    title: titleMatch && titleMatch[1] ? titleMatch[1] : 'Frontend Developer'
  };
} catch (error) {
  console.error('Error loading resume data:', error);
  // Fallback data
  resumeData = {
    name: 'John Doe',
    title: 'Frontend Developer'
  };
}

// Try to register a monospace font if available
try {
  registerFont(path.join(__dirname, 'fonts', 'RobotoMono-Regular.ttf'), { family: 'RobotoMono' });
} catch (error) {
  console.warn('Could not register custom font. Using system default.');
}

// Colors
const colors = {
  background: '#121212',
  headerBg: '#1a1a1a',
  text: '#ffffff',
  nameText: '#4ade80', // green-400
  titleText: '#d1d5db', // gray-300
  buttonRed: '#ef4444',
  buttonYellow: '#f59e0b',
  buttonGreen: '#10b981',
  promptSymbol: '#4ade80',
  cursor: '#ffffff'
};

/**
 * Generate OpenGraph image
 */
function generateOgImage() {
  const width = 1200;
  const height = 630;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Background
  ctx.fillStyle = colors.background;
  ctx.fillRect(0, 0, width, height);

  // Terminal header
  ctx.fillStyle = colors.headerBg;
  ctx.fillRect(50, 50, width - 100, 40);

  // Terminal window buttons
  ctx.fillStyle = colors.buttonRed;
  ctx.beginPath();
  ctx.arc(80, 70, 10, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = colors.buttonYellow;
  ctx.beginPath();
  ctx.arc(110, 70, 10, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = colors.buttonGreen;
  ctx.beginPath();
  ctx.arc(140, 70, 10, 0, Math.PI * 2);
  ctx.fill();

  // Main terminal area
  ctx.fillStyle = colors.background;
  ctx.fillRect(50, 90, width - 100, height - 140);
  ctx.strokeStyle = '#333333';
  ctx.lineWidth = 2;
  ctx.strokeRect(50, 90, width - 100, height - 140);

  // Name text
  ctx.font = 'bold 60px "RobotoMono", monospace';
  ctx.fillStyle = colors.nameText;
  ctx.fillText(resumeData.name, 100, 180);

  // Title text
  ctx.font = '30px "RobotoMono", monospace';
  ctx.fillStyle = colors.titleText;
  ctx.fillText(resumeData.title, 100, 230);

  // Command prompt line
  ctx.font = '28px "RobotoMono", monospace';
  ctx.fillStyle = colors.promptSymbol;
  ctx.fillText('visitor@resume:~$ ', 100, 310);
  
  // Command text
  ctx.fillStyle = colors.text;
  ctx.fillText('view interactive terminal resume', 350, 310);

  // Blinking cursor
  ctx.fillStyle = colors.cursor;
  ctx.fillRect(800, 295, 12, 28);

  // Bottom text
  ctx.font = '24px "RobotoMono", monospace';
  ctx.fillStyle = colors.titleText;
  ctx.fillText('Type "help" to see available commands', 100, 400);

  // Footer text
  ctx.font = '20px sans-serif';
  ctx.fillStyle = '#666666';
  ctx.fillText('Interactive Terminal Resume', width - 300, height - 30);

  // Save image
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(path.join(publicDir, 'terminal-resume-og.png'), buffer);
  console.log('✅ Generated OpenGraph image');
}

/**
 * Generate Favicons of different sizes
 */
function generateFavicons() {
  const sizes = [16, 32, 48, 180, 192, 512];
  const pngBuffers = [];

  for (const size of sizes) {
    const canvas = createCanvas(size, size);
    const ctx = canvas.getContext('2d');

    // Background
    ctx.fillStyle = colors.background;
    ctx.fillRect(0, 0, size, size);

    // Terminal symbol: >_
    ctx.fillStyle = colors.promptSymbol;
    
    // Scale font size based on icon size
    const fontSize = Math.max(size / 2, 8);
    ctx.font = `bold ${fontSize}px monospace`;
    
    // Center the symbol
    const text = '>_';
    const textMetrics = ctx.measureText(text);
    const x = (size - textMetrics.width) / 2;
    const y = (size + fontSize / 2) / 2;
    
    ctx.fillText(text, x, y);

    // Add a border for larger icons
    if (size >= 48) {
      ctx.strokeStyle = '#333333';
      ctx.lineWidth = size / 24;
      ctx.strokeRect(0, 0, size, size);
    }

    const buffer = canvas.toBuffer('image/png');
    
    // Save PNG files
    if (size === 16) {
      fs.writeFileSync(path.join(publicDir, 'favicon-16x16.png'), buffer);
      pngBuffers.push(buffer);
    } else if (size === 32) {
      fs.writeFileSync(path.join(publicDir, 'favicon-32x32.png'), buffer);
      pngBuffers.push(buffer);
    } else if (size === 48) {
      pngBuffers.push(buffer);
    } else if (size === 180) {
      fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), buffer);
    } else if (size === 192) {
      fs.writeFileSync(path.join(publicDir, 'android-chrome-192x192.png'), buffer);
    } else if (size === 512) {
      fs.writeFileSync(path.join(publicDir, 'android-chrome-512x512.png'), buffer);
    }
  }

  // Create favicon.ico (contains 16x16, 32x32, 48x48)
  toIco(pngBuffers)
    .then(buf => {
      fs.writeFileSync(path.join(publicDir, 'favicon.ico'), buf);
      console.log('✅ Generated favicons');
    })
    .catch(err => {
      console.error('Error generating favicon.ico:', err);
    });
}

// Generate both image types
generateOgImage();
generateFavicons();

console.log('Image generation complete! Files saved to the public directory.');

