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
  summary: "An innovative and adaptable Computer Science student with strong technical and analytical skills, focused on solving real-world problems through innovative technology solutions. Passionate about AI/ML Engineering, continuous learning, and building impactful products through effective developer development.",
  experience: [
    {
      company: "Automating Logical Volume Management Across Distributed Servers in Data Centers",
      position: "Summer Internship Project / Digital Fortress by Sify Chakkavarthy",
      duration: "May 2024 - July 2024",
      description: [
        "Developed a web-based tool to manage logical volumes across distributed data centers.",
        "Automated storage workflows, improving resource utilization and system efficiency.",
        "Integrated real-time dashboards, storage alerts, and performance monitoring modules.",
        "GitHub: Project Link"
      ]
    },
    {
      company: "Automating PDF to XML Extraction Tool",
      position: "Industrial Training at GCS Information Services India Pvt. Ltd.",
      duration: "August 2025 - Present",
      description: [
        "Developed a robust PDF-to-XML extraction tool using Python 3.13 and Streamlit, capable of processing large PDF files with accurate text and table extraction.",
        "Implemented advanced parsing using pdfplumber, PyMuPDF, camelot-py, tabula-py, and integrated OCR (tesseract-py) for reliable data extraction and text normalization.",
        "Designed a scalable backend with modular architecture supporting server file paths and uploads, featuring progress tracking, session management, and advanced error handling.",
        "GitHub: Project Link"
      ]
    }
  ],
  education: [
    {
      institution: "Vellore Institute of Technology, Andhra Pradesh",
      degree: "M.Tech Integrated in Computer Science",
      field: "Computer Science",
      year: "Sept 2021 - Present",
      gpa: "CGPA: 8.40/10"
    },
    {
      institution: "Navarasam Matriculation Higher Secondary School, Erode",
      degree: "Higher Secondary (Computer Science)",
      field: "Computer Science",
      year: "2020 - 2021",
      gpa: "Percentage: 82.3%"
    },
    {
      institution: "Navarasam Matriculation Higher Secondary School, Erode",
      degree: "Secondary School (SSLC)",
      field: "SSLC",
      year: "2018 - 2019",
      gpa: "Percentage: 73%"
    }
  ],
  skills: {
    technical: [
      "Programming: Python, Java, JavaScript, TypeScript",
      "Frontend: React.js, Next.js, Svelte, Tailwind CSS, HTML",
      "Backend: Hono.js, RESTful APIs, FastAPI, LlamaIndex",
      "Databases: MySQL, PostgreSQL, MongoDB, Firebase, Redis, Neo4j",
      "Tools: GitHub, Docker, Cloudflare, Supabase, Vercel, Canva, Tableau, Power BI, QuickSight"
    ],
    languages: ["Python", "Java", "JavaScript", "TypeScript"],
    tools: [
      "GitHub", "Docker", "Cloudflare", "Supabase", "Vercel", "Canva", 
      "Tableau", "Power BI", "QuickSight"
    ],
    soft: [
      "Team Collaboration", "Creative Problem Solving", "Communication", 
      "Time Management"
    ]
  },
  projects: [
    {
      name: "Hackathon Registration & Management System (Team Project)",
      description: "Developed a complete hackathon registration platform using Hono.js and hosted on Cloudflare. Implemented backend event modules, email verification, and enabled organizers to expedite approval/rejections (July 2024 - Jul 2025)",
      technologies: ["Hono.js", "Cloudflare", "Email Verification"],
      link: "GitHub: Project Link"
    },
    {
      name: "Private LLM RAG Application",
      description: "Developed a secure, enterprise-focused, and 100% offline-capable LLM system using FastAPI and LlamaIndex. Implemented document ingestion, chunking, embeddings, and context-aware Q&A entirely without internet dependence. (Feb 2025 - Present)",
      technologies: ["FastAPI", "LlamaIndex", "RAG", "Embeddings"],
      link: "GitHub: Project Link"
    }
  ],
  certificates: [
    {
      name: "National Hackathon 2022",
      issuer: "IIEC, VIT-AP",
      date: "2022"
    },
    {
      name: "Full Stack Development - AI Integrated",
      issuer: "SkillAce (March 18, 2025)",
      date: "March 2025"
    },
    {
      name: "Bootcamp on LLM Security (2025-2026)",
      issuer: "Null Vijayawada",
      date: "2025-2026"
    },
    {
      name: "Cybersecurity: Vulnerability Assessment and Patch Management",
      issuer: "Syxsense",
      date: "2024"
    },
    {
      name: "Letter of Recommendation",
      issuer: "Web Development for Sarvekars Conference, VIT-AP (May 2023 - Dr. Subhash Muthu Prabhu)",
      date: "May 2023"
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

