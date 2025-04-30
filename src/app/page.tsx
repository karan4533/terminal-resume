'use client';

import TerminalInterface from "./components/TerminalInterface";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-900">
      <div className="container max-w-6xl mx-auto">
        <div className="h-[70vh] terminal-container rounded-md overflow-hidden shadow-2xl border border-gray-700 terminal-scrollbar">
          <TerminalInterface />
        </div>
        
        <footer className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-gray-800 text-center text-gray-500 text-xs sm:text-sm">
          <p>
            © {new Date().getFullYear()} | Interactive Terminal Resume
          </p>
          <p className="mt-1">
            Built with Next.js, React, and TailwindCSS
          </p>
          <p className="mt-1">
            <a 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                alert('https://github.com/karan4533/terminal-resume');
              }}
              className="text-[var(--prompt-color)] hover:underline"
            >
              View on GitHub
            </a>
          </p>
        </footer>
      </div>
    </main>
  );
}
