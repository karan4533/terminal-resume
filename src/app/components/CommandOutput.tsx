'use client';

import { ResumeData } from "../data";

interface CommandOutputProps {
  command: string;
  output: React.ReactNode;
  timestamp: Date;
  prompt: string;
}

interface OutputContentProps {
  resumeData: ResumeData;
  command: string;
}

export const CommandOutput: React.FC<CommandOutputProps> = ({ 
  command, 
  output, 
  timestamp, 
  prompt 
}) => {
  return (
    <div className="mb-4">
      <div className="flex">
        <span className="text-green-400">{prompt}</span>
        <span className="ml-2 text-white">{command}</span>
      </div>
      <div className="mt-1 text-gray-300">
        {output}
      </div>
      <div className="text-xs text-gray-500 mt-1">
        {timestamp.toLocaleTimeString()}
      </div>
    </div>
  );
};

export const OutputContent: React.FC<OutputContentProps> = ({ resumeData, command }) => {
  switch (command.trim().toLowerCase()) {
    case 'help':
      return <HelpOutput />;
    case 'about':
      return <AboutOutput resumeData={resumeData} />;
    case 'contact':
      return <ContactOutput resumeData={resumeData} />;
    case 'summary':
      return <SummaryOutput resumeData={resumeData} />;
    case 'education':
      return <EducationOutput resumeData={resumeData} />;
    case 'skills':
      return <SkillsOutput resumeData={resumeData} />;
    case 'projects':
      return <ProjectsOutput resumeData={resumeData} />;
    case 'certificates':
      return <CertificatesOutput resumeData={resumeData} />;
    case 'all':
      return <AllOutput resumeData={resumeData} />;
    case 'clear':
      return <div></div>;
    default:
      return <CommandNotFound command={command} />;
  }
};

const HelpOutput = () => {
  return (
    <div>
      <h2 className="text-xl text-yellow-400 mb-2">Available Commands:</h2>
      <ul className="pl-4">
        <li><span className="text-green-400">help</span> - List all available commands</li>
        <li><span className="text-green-400">about</span> - Display basic information</li>
        <li><span className="text-green-400">contact</span> - Show contact information</li>
        <li><span className="text-green-400">summary</span> - Display professional summary</li>
        <li><span className="text-green-400">education</span> - Display educational background</li>
        <li><span className="text-green-400">skills</span> - List technical and soft skills</li>
        <li><span className="text-green-400">projects</span> - Show personal and professional projects</li>
        <li><span className="text-green-400">certificates</span> - Display certifications</li>
        <li><span className="text-green-400">clear</span> - Clear the terminal screen</li>
        <li><span className="text-green-400">all</span> - Display complete resume</li>
      </ul>
      <p className="mt-2 text-gray-400">Type a command and press Enter to execute it.</p>
    </div>
  );
};

const AboutOutput: React.FC<{ resumeData: ResumeData }> = ({ resumeData }) => {
  return (
    <div className="space-y-2">
      <h2 className="text-xl text-yellow-400">{resumeData.name}</h2>
      <div className="flex items-center">
        <span className="text-purple-400">Title: </span>
        <span className="ml-2">{resumeData.title}</span>
      </div>
    </div>
  );
};

const ContactOutput: React.FC<{ resumeData: ResumeData }> = ({ resumeData }) => {
  return (
    <div className="space-y-2">
      <h2 className="text-xl text-yellow-400">Contact Information</h2>
      <div className="flex items-center">
        <span className="text-purple-400">Email: </span>
        <span className="ml-2">{resumeData.contact.email}</span>
      </div>
      <div className="flex items-center">
        <span className="text-purple-400">Phone: </span>
        <span className="ml-2">{resumeData.contact.phone}</span>
      </div>
      <div className="flex items-center">
        <span className="text-purple-400">Location: </span>
        <span className="ml-2">{resumeData.contact.location}</span>
      </div>
      {resumeData.contact.linkedin && (
        <div className="flex items-center">
          <span className="text-purple-400">LinkedIn: </span>
          <span className="ml-2">{resumeData.contact.linkedin}</span>
        </div>
      )}
      {resumeData.contact.github && (
        <div className="flex items-center">
          <span className="text-purple-400">GitHub: </span>
          <span className="ml-2">{resumeData.contact.github}</span>
        </div>
      )}
      {resumeData.contact.website && (
        <div className="flex items-center">
          <span className="text-purple-400">Website: </span>
          <span className="ml-2">{resumeData.contact.website}</span>
        </div>
      )}
    </div>
  );
};

const SummaryOutput: React.FC<{ resumeData: ResumeData }> = ({ resumeData }) => {
  return (
    <div className="space-y-2">
      <h2 className="text-xl text-yellow-400">Professional Summary</h2>
      <p>{resumeData.summary}</p>
    </div>
  );
};

const ExperienceOutput: React.FC<{ resumeData: ResumeData }> = ({ resumeData }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl text-yellow-400">Work Experience</h2>
      {resumeData.experience.map((exp, index) => (
        <div key={index} className="space-y-1 pb-3 border-b border-gray-700">
          <div className="flex justify-between items-center">
            <h3 className="text-cyan-400">{exp.position}</h3>
            <span className="text-gray-400">{exp.duration}</span>
          </div>
          <div className="text-blue-300">{exp.company}</div>
          <ul className="pl-4 mt-2 space-y-1">
            {exp.description.map((desc, idx) => (
              <li key={idx} className="list-disc">
                {desc}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

const EducationOutput: React.FC<{ resumeData: ResumeData }> = ({ resumeData }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl text-yellow-400">Education</h2>
      {resumeData.education.map((edu, index) => (
        <div key={index} className="space-y-1 pb-3 border-b border-gray-700">
          <div className="flex justify-between items-center">
            <h3 className="text-cyan-400">{edu.institution}</h3>
            <span className="text-gray-400">{edu.year}</span>
          </div>
          <div className="text-blue-300">
            {edu.degree} in {edu.field}
          </div>
          {edu.gpa && <div className="text-gray-400">GPA: {edu.gpa}</div>}
        </div>
      ))}
    </div>
  );
};

const SkillsOutput: React.FC<{ resumeData: ResumeData }> = ({ resumeData }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl text-yellow-400">Skills</h2>
      <div>
        <h3 className="text-cyan-400">Technical</h3>
        <div className="flex flex-wrap gap-2 mt-1">
          {resumeData.skills.technical.map((skill, index) => (
            <span key={index} className="bg-gray-700 px-2 py-1 rounded text-sm">
              {skill}
            </span>
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-cyan-400">Programming Languages</h3>
        <div className="flex flex-wrap gap-2 mt-1">
          {resumeData.skills.languages.map((skill, index) => (
            <span key={index} className="bg-gray-700 px-2 py-1 rounded text-sm">
              {skill}
            </span>
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-cyan-400">Tools</h3>
        <div className="flex flex-wrap gap-2 mt-1">
          {resumeData.skills.tools.map((skill, index) => (
            <span key={index} className="bg-gray-700 px-2 py-1 rounded text-sm">
              {skill}
            </span>
          ))}
        </div>
      </div>
      {resumeData.skills.soft && (
        <div>
          <h3 className="text-cyan-400">Soft Skills</h3>
          <div className="flex flex-wrap gap-2 mt-1">
            {resumeData.skills.soft.map((skill, index) => (
              <span key={index} className="bg-gray-700 px-2 py-1 rounded text-sm">
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const ProjectsOutput: React.FC<{ resumeData: ResumeData }> = ({ resumeData }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl text-yellow-400">Projects</h2>
      {resumeData.projects.map((project, index) => (
        <div key={index} className="space-y-1 pb-3 border-b border-gray-700">
          <h3 className="text-cyan-400">{project.name}</h3>
          <p>{project.description}</p>
          <div className="flex flex-wrap gap-2 mt-1">
            {project.technologies.map((tech, idx) => (
              <span key={idx} className="bg-gray-700 px-2 py-1 rounded text-sm">
                {tech}
              </span>
            ))}
          </div>
          {project.link && (
            <div className="text-blue-400 mt-1">
              <a href={`https://${project.link}`} target="_blank" rel="noopener noreferrer">
                {project.link}
              </a>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

const CertificatesOutput: React.FC<{ resumeData: ResumeData }> = ({ resumeData }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl text-yellow-400">Certifications</h2>
      {resumeData.certificates.map((cert, index) => (
        <div key={index} className="space-y-1 pb-3 border-b border-gray-700">
          <div className="flex justify-between items-center">
            <h3 className="text-cyan-400">{cert.name}</h3>
            <span className="text-gray-400">{cert.date}</span>
          </div>
          <div className="text-blue-300">{cert.issuer}</div>
          {cert.link && (
            <div className="text-blue-400 mt-1">
              <a href={`https://${cert.link}`} target="_blank" rel="noopener noreferrer">
                {cert.link}
              </a>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

const AllOutput: React.FC<{ resumeData: ResumeData }> = ({ resumeData }) => {
  return (
    <div className="space-y-6">
      <AboutOutput resumeData={resumeData} />
      <ContactOutput resumeData={resumeData} />
      <SummaryOutput resumeData={resumeData} />
      <ExperienceOutput resumeData={resumeData} />
      <EducationOutput resumeData={resumeData} />
      <SkillsOutput resumeData={resumeData} />
      <ProjectsOutput resumeData={resumeData} />
      <CertificatesOutput resumeData={resumeData} />
    </div>
  );
};

const CommandNotFound: React.FC<{ command: string }> = ({ command }) => {
  return (
    <div className="text-red-400">
      Command not found: {command}. Type <span className="text-green-400">help</span> to see available commands.
    </div>
  );
};

