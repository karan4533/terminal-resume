'use client';

import React, { useState, useEffect, useRef, useCallback, KeyboardEvent } from 'react';
import { resumeData, availableCommands } from '../data';

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
        <div className="mt-2">
          <p className="font-bold">{resumeData.name}</p>
          <p>{resumeData.title}</p>
        </div>
      </div>
    );
  } else if (cmd === 'summary') {
    return (
      <div>
        <p className="text-yellow-500 font-bold">Professional Summary:</p>
        <p className="mt-1">{resumeData.summary}</p>
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
              <div className="text-gray-400">{exp.duration}</div>
              <div className="mt-1">
                {exp.description.map((desc, i) => (
                  <p key={i} className="mt-1">{desc}</p>
                ))}
              </div>
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
              <div className="font-bold">{edu.degree} in {edu.field}</div>
              <div>{edu.institution} ({edu.year})</div>
              {edu.gpa && <div>GPA: {edu.gpa}</div>}
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
              <div className="mt-1">
                <span className="text-gray-400">Technologies:</span>{' '}
                {project.technologies.join(', ')}
              </div>
              {project.link && (
                <div className="mt-1">
                  <span className="text-gray-400">Link:</span>{' '}
                  <a href={`https://${project.link}`} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                    {project.link}
                  </a>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    );
  } else if (cmd === 'certificates' || cmd === 'certifications') {
    return (
      <div>
        <p className="text-yellow-500 font-bold">Certifications:</p>
        <ul className="pl-4 mt-1 space-y-2">
          {resumeData.certificates.map((cert, index) => (
            <li key={index}>
              <div className="font-bold">{cert.name}</div>
              <div className="text-gray-400">Issued by: {cert.issuer} ({cert.date})</div>
              {cert.link && (
                <div className="mt-1">
                  <a href={cert.link} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                    View Certificate
                  </a>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    );
  } else if (cmd === 'contact') {
    return (
      <div>
        <p className="text-yellow-500 font-bold">Contact Information:</p>
        <ul className="pl-4 mt-2 space-y-1">
          <li>
            <span className="text-gray-400">Email:</span>{' '}
            <a href={`mailto:${resumeData.contact.email}`} className="text-blue-400 hover:underline">
              {resumeData.contact.email}
            </a>
          </li>
          <li>
            <span className="text-gray-400">Phone:</span>{' '}
            {resumeData.contact.phone}
          </li>
          <li>
            <span className="text-gray-400">Location:</span>{' '}
            {resumeData.contact.location}
          </li>
          {resumeData.contact.linkedin && (
            <li>
              <span className="text-gray-400">LinkedIn:</span>{' '}
              <a href={`https://${resumeData.contact.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                {resumeData.contact.linkedin}
              </a>
            </li>
          )}
          {resumeData.contact.github && (
            <li>
              <span className="text-gray-400">GitHub:</span>{' '}
              <a href={`https://${resumeData.contact.github}`} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                {resumeData.contact.github}
              </a>
            </li>
          )}
          {resumeData.contact.website && (
            <li>
              <span className="text-gray-400">Website:</span>{' '}
              <a href={`https://${resumeData.contact.website}`} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                {resumeData.contact.website}
              </a>
            </li>
          )}
        </ul>
      </div>
    );
  } else if (cmd === 'all') {
    return (
      <div className="space-y-6">
        {/* About */}
        <div>
          <p className="text-yellow-500 font-bold text-lg">About:</p>
          <div className="mt-2">
            <p className="font-bold text-xl">{resumeData.name}</p>
            <p className="text-lg">{resumeData.title}</p>
          </div>
        </div>
        
        {/* Summary */}
        <div>
          <p className="text-yellow-500 font-bold">Professional Summary:</p>
          <p className="mt-1">{resumeData.summary}</p>
        </div>
        
        {/* Contact */}
        <div>
          <p className="text-yellow-500 font-bold">Contact Information:</p>
          <ul className="pl-4 mt-2 space-y-1">
            <li>
              <span className="text-gray-400">Email:</span>{' '}
              <a href={`mailto:${resumeData.contact.email}`} className="text-blue-400 hover:underline">
                {resumeData.contact.email}
              </a>
            </li>
            <li>
              <span className="text-gray-400">Phone:</span>{' '}
              {resumeData.contact.phone}
            </li>
            <li>
              <span className="text-gray-400">Location:</span>{' '}
              {resumeData.contact.location}
            </li>
            {resumeData.contact.linkedin && (
              <li>
                <span className="text-gray-400">LinkedIn:</span>{' '}
                <a href={`https://${resumeData.contact.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                  {resumeData.contact.linkedin}
                </a>
              </li>
            )}
            {resumeData.contact.github && (
              <li>
                <span className="text-gray-400">GitHub:</span>{' '}
                <a href={`https://${resumeData.contact.github}`} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                  {resumeData.contact.github}
                </a>
              </li>
            )}
          </ul>
        </div>
        {/* Education */}
        <div>
          <p className="text-yellow-500 font-bold">Education:</p>
          <ul className="pl-4 mt-1 space-y-2">
            {resumeData.education.map((edu, index) => (
              <li key={index}>
                <div className="font-bold">{edu.degree} in {edu.field}</div>
                <div>{edu.institution} ({edu.year})</div>
                {edu.gpa && <div>GPA: {edu.gpa}</div>}
              </li>
            ))}
          </ul>
        </div>
        
        {/* Skills */}
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
        
        {/* Projects */}
        <div>
          <p className="text-yellow-500 font-bold">Projects:</p>
          <ul className="pl-4 mt-1 space-y-2">
            {resumeData.projects.map((project, index) => (
              <li key={index}>
                <div className="font-bold">{project.name}</div>
                <div className="mt-1">{project.description}</div>
                <div className="mt-1">
                  <span className="text-gray-400">Technologies:</span>{' '}
                  {project.technologies.join(', ')}
                </div>
                {project.link && (
                  <div className="mt-1">
                    <span className="text-gray-400">Link:</span>{' '}
                    <a href={`https://${project.link}`} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                      {project.link}
                    </a>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
        
        {/* Certificates */}
        <div>
          <p className="text-yellow-500 font-bold">Certifications:</p>
          <ul className="pl-4 mt-1 space-y-2">
            {resumeData.certificates.map((cert, index) => (
              <li key={index}>
                <div className="font-bold">{cert.name}</div>
                <div className="text-gray-400">Issued by: {cert.issuer} ({cert.date})</div>
                {cert.link && (
                  <div className="mt-1">
                    <a href={cert.link} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                      View Certificate
                    </a>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
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
                Welcome to {resumeData.name} Terminal Resume
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
        <div className="flex items-start relative">
          <span className="text-[var(--prompt-color)]">{prompt}</span>
          <div className="ml-2 text-[var(--command-color)] relative min-h-[1.5rem] flex-grow">
            {/* Render the input value and blinking cursor */}
            {inputValue.slice(0, cursorPosition)}
            <span className="w-2 h-5 bg-white inline-block animate-pulse absolute"></span>
            {inputValue.slice(cursorPosition)}
            {/* Overlay the real input */}
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              autoFocus
              aria-label="Terminal input"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                opacity: 0,
                color: "transparent",
                background: "transparent",
                caretColor: "white", // Show caret
                direction: "ltr",
                unicodeBidi: "plaintext",
              }}
              className="outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TerminalInterface;
