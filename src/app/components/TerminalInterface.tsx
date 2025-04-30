'use client';

import React, { useState, useEffect, useRef, useCallback, KeyboardEvent } from 'react';
// Sample resume data - you can replace this with your actual data from a file
const resumeData = {
  name: "Developer Name",
  title: "Software Engineer",
  about: "A passionate developer specializing in web technologies and GPU-accelerated interfaces.",
  experience: [
    {
      company: "Tech Solutions Inc.",
      position: "Senior Developer",
      period: "2023-Present",
      description: "Building high-performance web applications with modern technologies."
    },
    {
      company: "Creative Software",
      position: "Frontend Developer",
      period: "2020-2023",
      description: "Developed responsive web interfaces and interactive data visualizations."
    }
  ],
  education: [
    {
      institution: "University of Technology",
      degree: "MS in Computer Science",
      period: "2018-2020"
    },
    {
      institution: "College of Engineering",
      degree: "BS in Software Engineering",
      period: "2014-2018"
    }
  ],
  skills: {
    languages: ["Rust", "TypeScript", "JavaScript", "Python", "C++"],
    frontend: ["React", "WebGL", "WebGPU", "Next.js"],
    backend: ["Node.js", "Express", "GraphQL"],
    other: ["WebAssembly", "GPU Programming", "System Architecture"]
  },
  projects: [
    {
      name: "GPU-Accelerated Terminal",
      description: "A terminal UI renderer using Rust and WebGL for high-performance text rendering."
    },
    {
      name: "Data Visualization Platform",
      description: "Interactive data visualization tools using WebGL for hardware-accelerated graphics."
    }
  ],
  contact: {
    email: "developer@example.com",
    github: "github.com/developer",
    linkedin: "linkedin.com/in/developer"
  }
};

// Define available commands
const availableCommands = [
  { command: "help", description: "Show help message" },
  { command: "about", description: "About me" },
  { command: "experience", description: "View my work experience" },
  { command: "education", description: "View my education" },
  { command: "skills", description: "List my technical skills" },
  { command: "projects", description: "View my projects" },
  { command: "contact", description: "View contact information" },
  { command: "clear", description: "Clear the terminal" },
  { command: "render", description: "Information about this interface" } // Special command to display info about the renderer
];

// Command output type
interface CommandEntry {
  command: string;
  output: React.ReactNode;
  timestamp: Date;
}

// Command output component
const CommandOutput: React.FC<{
  command: string;
  output: React.ReactNode;
  timestamp: Date;
  prompt: string;
}> = ({ command, output, timestamp, prompt }) => {
  return (
    <div className="mb-2">
      <div className="flex">
        <span className="text-green-500">{prompt}</span>
        <span className="ml-2 text-white">{command}</span>
      </div>
      <div className="ml-4 mt-1">{output}</div>
    </div>
  );
};

// Output content component
const OutputContent: React.FC<{
  resumeData: typeof resumeData;
  command: string;
}> = ({ resumeData, command }) => {
  const cmd = command.toLowerCase().trim();
  
  if (cmd === 'help') {
    return (
      <div>
        <p className="text-gray-400">Available commands:</p>
        <ul className="pl-4 space-y-1">
          {availableCommands.map((cmd, index) => (
            <li key={index}>
              <span className="text-green-500">{cmd.command}</span>
              <span className="text-gray-400"> - {cmd.description}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  } else if (cmd === 'about') {
    return (
      <div>
        <p className="text-yellow-500 font-bold">About:</p>
        <p className="mt-1">{resumeData.about}</p>
      </div>
    );
  } else if (cmd === 'experience') {
    return (
      <div>
        <p className="text-yellow-500 font-bold">Work Experience:</p>
        <ul className="pl-4 mt-1 space-y-2">
          {resumeData.experience.map((exp, index) => (
            <li key={index}>
              <div className="font-bold">{exp.position} at {exp.company}</div>
              <div className="text-gray-400">{exp.period}</div>
              <div className="mt-1">{exp.description}</div>
            </li>
          ))}
        </ul>
      </div>
    );
  } else if (cmd === 'education') {
    return (
      <div>
        <p className="text-yellow-500 font-bold">Education:</p>
        <ul className="pl-4 mt-1 space-y-2">
          {resumeData.education.map((edu, index) => (
            <li key={index}>
              <div className="font-bold">{edu.degree}</div>
              <div>{edu.institution} ({edu.period})</div>
            </li>
          ))}
        </ul>
      </div>
    );
  } else if (cmd === 'skills') {
    return (
      <div>
        <p className="text-yellow-500 font-bold">Skills:</p>
        {Object.entries(resumeData.skills).map(([category, skills], index) => (
          <div key={index} className="mt-2">
            <p className="capitalize font-bold">{category}:</p>
            <div className="flex flex-wrap gap-2 mt-1">
              {Array.isArray(skills) && skills.map((skill, idx) => (
                <span key={idx} className="bg-gray-800 px-2 py-1 rounded text-blue-400">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  } else if (cmd === 'projects') {
    return (
      <div>
        <p className="text-yellow-500 font-bold">Projects:</p>
        <ul className="pl-4 mt-1 space-y-2">
          {resumeData.projects.map((project, index) => (
            <li key={index}>
              <div className="font-bold">{project.name}</div>
              <div className="mt-1">{project.description}</div>
            </li>
          ))}
        </ul>
      </div>
    );
  } else if (cmd === 'contact') {
    return (
      <div>
        <p className="text-yellow-500 font-bold">Contact Information:</p>
        <ul className="pl-4 mt-1">
          <li>Email: {resumeData.contact.email}</li>
          <li>GitHub: {resumeData.contact.github}</li>
          <li>LinkedIn: {resumeData.contact.linkedin}</li>
        </ul>
      </div>
    );
  } else if (cmd === 'render') {
    return (
      <div>
        <p className="text-yellow-500 font-bold">About This Terminal:</p>
        <p className="mt-1">
          This is a React-based terminal interface that simulates a command line experience.
          It's built with Next.js and styled with Tailwind CSS.
        </p>
      </div>
    );
  } else {
    return (
      <div className="text-red-500">
        Command not found: {command}. Type 'help' to see available commands.
      </div>
    );
  }
};

const TerminalInterface: React.FC = () => {
  // Refs
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Terminal state
  const [inputValue, setInputValue] = useState<string>('');
  const [cursorPosition, setCursorPosition] = useState<number>(0);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [commandOutputs, setCommandOutputs] = useState<CommandEntry[]>([]);
  const [showWelcome, setShowWelcome] = useState<boolean>(true);
  const [prompt, setPrompt] = useState<string>('$');
  
  // Handle window resize
  // Auto-scroll to bottom on new command output
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [commandOutputs]);

  // Initial welcome message
  useEffect(() => {
    if (showWelcome) {
      const now = new Date();
      setCommandOutputs([
        {
          command: 'welcome',
          output: (
            <div>
              <h1 className="text-2xl font-bold text-[var(--prompt-color)] mb-2">
                Welcome to {resumeData.name}'s Terminal Resume
              </h1>
              <p className="mb-4">
                Type <span className="text-[var(--prompt-color)]">help</span> to see available commands.
              </p>
              <div className="border-t border-gray-700 pt-4">
                <p className="text-gray-400">
                  Last login: {now.toLocaleString()} on terminal
                </p>
              </div>
            </div>
          ),
          timestamp: now,
        },
      ]);
      setShowWelcome(false);
    }
  }, [showWelcome]);

  // Click handler to focus input when terminal is clicked
  const handleTerminalClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Input change handler
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setCursorPosition(e.target.selectionStart || 0);
  };

  // Key down handler for special key behaviors
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    // Update cursor position
    if (inputRef.current) {
      setCursorPosition(inputRef.current.selectionStart || 0);
    }
    
    // Handle up arrow for history navigation
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInputValue(commandHistory[commandHistory.length - 1 - newIndex]);
        
        // Set cursor at the end of input on next render
        setTimeout(() => {
          if (inputRef.current) {
            const length = inputRef.current.value.length;
            inputRef.current.setSelectionRange(length, length);
            setCursorPosition(length);
          }
        }, 0);
      }
    }
    
    // Handle down arrow for history navigation
    else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInputValue(commandHistory[commandHistory.length - 1 - newIndex]);
        
        // Set cursor at the end of input on next render
        setTimeout(() => {
          if (inputRef.current) {
            const length = inputRef.current.value.length;
            inputRef.current.setSelectionRange(length, length);
            setCursorPosition(length);
          }
        }, 0);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInputValue('');
        setCursorPosition(0);
      }
    }
    
    // Handle tab completion
    else if (e.key === 'Tab') {
      e.preventDefault();
      const currentInput = inputValue.toLowerCase().trim();
      
      if (currentInput) {
        const matchingCommands = availableCommands
          .map(cmd => cmd.command)
          .filter(cmd => cmd.startsWith(currentInput));
        
        if (matchingCommands.length === 1) {
          setInputValue(matchingCommands[0]);
          setCursorPosition(matchingCommands[0].length);
          
          // Set cursor at the end of input on next render
          setTimeout(() => {
            if (inputRef.current) {
              const length = inputRef.current.value.length;
              inputRef.current.setSelectionRange(length, length);
            }
          }, 0);
        } else if (matchingCommands.length > 1) {
          // Show available command completions
          setCommandOutputs(prev => [
            ...prev,
            {
              command: currentInput,
              output: (
                <div>
                  <p className="text-gray-400">Available commands:</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {matchingCommands.map((cmd, index) => (
                      <span key={index} className="text-[var(--prompt-color)]">{cmd}</span>
                    ))}
                  </div>
                </div>
              ),
              timestamp: new Date(),
            },
          ]);
        }
      }
    }
    
    // Execute command on Enter
    else if (e.key === 'Enter') {
      executeCommand();
    }
    
    // Handle other key presses that might need special treatment
    else if (e.key === 'Home') {
      setCursorPosition(0);
    } else if (e.key === 'End') {
      setCursorPosition(inputValue.length);
    }
  };

  // Command execution function
  const executeCommand = () => {
    const command = inputValue.trim();
    
    if (command) {
      // Add to command history (avoid duplicates at the end)
      setCommandHistory(prev => {
        if (prev.length === 0 || prev[prev.length - 1] !== command) {
          return [...prev, command];
        }
        return prev;
      });
      setHistoryIndex(-1);
      
      // Process the command
      let output: React.ReactNode;
      
      if (command.toLowerCase() === 'clear') {
        setCommandOutputs([]);
        setInputValue('');
        return;
      } else {
        output = <OutputContent resumeData={resumeData} command={command} />;
      }
      
      // Add command output to the terminal
      setCommandOutputs(prev => [
        ...prev,
        {
          command,
          output,
          timestamp: new Date(),
        },
      ]);
      
      // Clear the input
      setInputValue('');
      setCursorPosition(0);
    }
  };

  return (
    <div 
      className="flex flex-col w-full h-full bg-[var(--terminal-bg)] rounded-md overflow-hidden border border-gray-700 shadow-lg"
      onClick={handleTerminalClick}
    >
      {/* Terminal header */}
      <div className="bg-gray-800 px-4 py-2 border-b border-gray-700 flex items-center">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="text-gray-400 text-sm mx-auto">
          {resumeData.name}'s Terminal
        </div>
      </div>
      
      {/* Terminal output area */}
      <div 
        ref={terminalRef} 
        className="flex-grow p-4 overflow-y-auto font-mono text-sm"
        style={{
          maxHeight: 'calc(100vh - 150px)', // Adjust for header and input
          minHeight: '300px'
        }}
      >
        {commandOutputs.map((entry, index) => (
          <CommandOutput
            key={index}
            command={entry.command}
            output={entry.output}
            timestamp={entry.timestamp}
            prompt={prompt}
          />
        ))}
        
        {/* Current input line with blinking cursor */}
        <div className="flex items-start">
          <span className="text-[var(--prompt-color)]">{prompt}</span>
          <div className="ml-2 text-[var(--command-color)] relative min-h-[1.5rem] flex-grow">
            {inputValue.slice(0, cursorPosition)}
            <span className="w-2 h-5 bg-white inline-block animate-pulse absolute"></span>
            {inputValue.slice(cursorPosition)}
          </div>
        </div>
      </div>
      
      {/* Hidden input field for keyboard interaction */}
      <input
        ref={inputRef}
        type="text"
        className="opacity-0 absolute top-0 left-0 h-0 w-0"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        autoFocus
        aria-label="Terminal input"
      />
    </div>
  );
};

export default TerminalInterface;
