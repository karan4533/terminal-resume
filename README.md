# Terminal Resume

An interactive terminal-style resume built with Next.js that allows users to explore your professional background using command-line interface.

## Features

- Interactive command-line interface
- View resume sections using simple commands
- Command history and tab completion
- Responsive design that works on all devices
- Customizable resume data

## Setup Instructions

1. Clone this repository
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Customizing Your Resume

Edit the data in `src/app/data.ts` to include your own information:
- Personal details
- Education
- Skills
- Projects
- Certifications

## Available Commands

- `help` - Display available commands
- `about` - Show basic information
- `contact` - Display contact information
- `summary` - Show professional summary
- `education` - Show educational background
- `skills` - List technical and soft skills
- `projects` - Show project portfolio
- `certificates` - Display certifications
- `clear` - Clear the terminal screen
- `all` - Show complete resume

## Creating the OpenGraph Image

For better social media sharing, create an OpenGraph image at `public/terminal-resume-og.png` with these specifications:

1. **Dimensions**: 1200 x 630 pixels
2. **Background**: Dark terminal-like background (#121212 or similar)
3. **Layout**:
   - Header with your name in large, bold text (#4ade80 green color)
   - Your professional title below the name
   - Terminal prompt symbol (">") 
   - Text "Interactive Terminal Resume"
   - Terminal window design elements (like the Mac-style buttons in top left)
4. **Design Elements**:
   - Terminal-style cursor
   - Command-line aesthetic
   - Monospace font for text

## Creating a Terminal-Style Favicon

Create a favicon that matches the terminal theme:

1. Create a simple terminal icon (16x16, 32x32, 48x48 sizes)
2. Use a dark background with a light terminal symbol (>_ or similar)
3. Save as `public/favicon.ico`

You can also create additional favicon sizes for different devices:
- `public/favicon-16x16.png`
- `public/favicon-32x32.png`
- `public/apple-touch-icon.png` (180x180)
- `public/android-chrome-192x192.png`
- `public/android-chrome-512x512.png`

## Technologies Used

- Next.js 15
- React
- TypeScript
- Tailwind CSS

## License

MIT

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
