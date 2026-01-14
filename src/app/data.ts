// Resume data structure
export interface ResumeData {
  name: string;
  title: string;
  contact: {
    email: string;
    phone: string;
    location: string;
    linkedin?: string;
    github?: string;
    website?: string;
  };
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: Skills;
  projects: Project[];
  certificates: Certificate[];
}

interface Experience {
  company: string;
  position: string;
  duration: string;
  description: string[];
}

interface Education {
  institution: string;
  degree: string;
  field: string;
  year: string;
  gpa?: string;
}

interface Skills {
  technical: string[];
  languages: string[];
  tools: string[];
  soft?: string[];
}

interface Project {
  name: string;
  description: string;
  technologies: string[];
  link?: string;
}

interface Certificate {
  name: string;
  issuer: string;
  date: string;
  link?: string;
}

// KARAN M.L's resume data
export const resumeData: ResumeData = {
  name: "KARAN M.L",
  title: "M.Tech Integrated Computer Science Student",
  contact: {
    email: "mlkaran2004@gmail.com",
    phone: "+91 7448907020",
    location: "Erode, Tamil Nadu",
    linkedin: "linkedin.com/in/karan45",
    github: "github.com/karan4533"
  },
  summary: "Enthusiastic and adaptable fresher seeking opportunities to apply and expand skills in a dynamic, team-oriented environment. Passionate about continuous learning, problem solving, and effective contribution to organizational success.",
  experience: [
    {
      company: "Summer Internship",
      position: "Intern",
      duration: "June 2024 - July 2024",
      description: [
        "Developed a web-based tool for managing logical volumes in distributed data centers",
        "Automated storage management, optimizing resource utilization and system efficiency",
        "Integrated real-time dashboards, storage alerts, and performance monitoring features"
      ]
    }
  ],
  education: [
    {
      institution: "Vellore Institute of Technology - Andhra Pradesh",
      degree: "M.Tech Integrated",
      field: "Computer Science (Collaboration with Virtusa)",
      year: "Dec 2026 (Expected)",
      gpa: "8.40/10"
    },
    {
      institution: "Navarasam Matriculation Higher Secondary School - Erode",
      degree: "Higher Secondary Education",
      field: "Computer Science",
      year: "March 2021",
      gpa: "82.3%"
    },
    {
      institution: "Navarasam Matriculation Higher Secondary School - Erode",
      degree: "Secondary School Education",
      field: "SSLC",
      year: "March 2019",
      gpa: "73%"
    }
  ],
  skills: {
    technical: [
      "HTML/CSS", 
      "JavaScript", 
      "Svelte", 
      "React.js", 
      "Hono.js", 
      "Java", 
      "API Integration",
      "Responsive Design"
    ],
    languages: ["HTML", "CSS", "JavaScript", "Java", "python"],
    tools: [
      "Git", "GitHub", "Cloudflare", "Netlify", "Vercel", "Canva",
      "Figma", "Google Docs", "PowerPoint", "MS Word", "Excel"
    ],
    soft: [
      "Communication", "Problem-Solving", "Time Management", 
      "Adaptability", "Teamwork"
    ]
  },
  projects: [
    {
      name: "Automating Logical Volume Management",
      description: "A web-based tool for managing logical volumes in distributed data centers, optimizing resource utilization with real-time dashboards and performance monitoring.",
      technologies: ["Web Development", "Storage Management", "Performance Monitoring"],
      link: "github.com/karan4533"
    },
    {
      name: "Attendance Management System",
      description: "Student Management System for enrollment, attendance, and user management with an intuitive interface for efficient data handling and reports.",
      technologies: ["Software Project Management", "Database", "User Interface Design"],
    },

  ],
  certificates: [
    {
      name: "National Hackathon 2022",
      issuer: "IIEC, VIT-AP",
      date: "2022"
    },
    {
      name: "Bootcamp on LLM Security",
      issuer: "Null Vijayawada",
      date: "2025-2026"
    },
    {
      name: "Mobile Application Development",
      issuer: "Blockchain Club",
      date: "2023"
    },
    {
      name: "MATLAB Onramp",
      issuer: "Training Course",
      date: "2023"
    },
    {
      name: "Cybersecurity: Vulnerability Assessment and Patch Management",
      issuer: "Syxsense",
      date: "2024"
    },
    {
      name: "Institute of Language Management",
      issuer: "Language Institute",
      date: "2016-2017"
    }
  ]
};

// Commands available in the terminal
export const availableCommands = [
  { command: "help", description: "List all available commands" },
  { command: "about", description: "Display basic information" },
  { command: "contact", description: "Show contact information" },
  { command: "summary", description: "Display professional summary" },
  { command: "experience", description: "Show work experience" },
  { command: "education", description: "Display educational background" },
  { command: "skills", description: "List technical and soft skills" },
  { command: "projects", description: "Show personal and professional projects" },
  { command: "certificates", description: "Display certifications" },
  { command: "clear", description: "Clear the terminal screen" },
  { command: "all", description: "Display complete resume" }
];

