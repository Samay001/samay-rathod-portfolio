export const work = [
  {
    company: "EDMO",
    role: "Associate Software Engineer",
    period: "Apr 2025 – Present",
    bullets: [
      "Engineered a Nest.js call-routing middleware layer streaming Genesys AudioHook audio into VAPI voice agents, serving 3,000+ calls per day in production.",
      "Built a conversational-intelligence handoff mapping VAPI conversation variables to program-linked Genesys queue IDs so students reach the right advisor without repeating context.",
      "Launched a RAG web chatbot for NYU's Office of Global Services backed by pgvector and auto-refreshed from 300+ scraped university pages, achieving 82% accuracy in phase 1.",
      "Designed a fault-tolerant, event-driven video upload pipeline using Apache Kafka and Google Cloud Storage for asynchronous processing.",
      "Developed a Transfer Credit Evaluation system using Amazon Textract OCR and document intelligence to score transcript-to-course mappings.",
    ],
  },
  {
    company: "Sarvm.ai",
    role: "Backend Developer Intern",
    period: "Feb 2025 – Apr 2025",
    bullets: [
      "Developed a Node.js and PostgreSQL audit script validating QR scanner mappings and phone numbers across 5,000+ records, reducing invalid database entries by 25%.",
      "Created a REST API that synchronized subscription updates to Elasticsearch in real time for faster search and filtering.",
    ],
  },
] as const;

export const education = {
  school: "Chandigarh University",
  degree: "B.E., Computer Science and Engineering",
  location: "Mohali, Punjab",
  period: "2021 – 2025",
};

export const projects = [
  {
    title: "Wealth One",
    image: "/projects/wealth-one.png",
    stack: ["Java", "Spring Boot", "TypeScript", "Next.js", "Docker"],
    bullets: [
      "Aggregates CoinDCX, Upstox, and CoinGecko investment data into portfolio visualizations.",
      "Includes a Gemini 2.0 assistant for mutual-fund analysis over live market and portfolio data.",
    ],
    primary: { label: "Live", href: "https://wealth-one-nine.vercel.app/" },
    source: "https://github.com/Samay001/WealthOne",
  },
  {
    title: "AI Interviewer",
    image: "/projects/ai-interviewer.png",
    stack: ["TypeScript", "Nest.js", "MongoDB", "OpenAI"],
    bullets: [
      "Technical-screening platform with JWT auth, role-based access, AI question generation, scoring, and result emails.",
      "Resume parsing generates role-specific questions with real-time speech and chatbot endpoints.",
    ],
    primary: {
      label: "Demo",
      href: "https://www.loom.com/share/74a9882f09e04683946c4a50b1eb6e76?start_download=true",
    },
    source: "https://github.com/Samay001/ai-interviewer-backend",
  },
  {
    title: "Content Creation Automation",
    image: "/projects/content-automation.png",
    stack: ["TypeScript", "Nest.js", "Gemini", "OpenAI", "FAL AI"],
    bullets: [
      "Converts source images, generates video prompts and captions, and creates social videos.",
      "Schedules the workflow and delivers the finished content package by email.",
    ],
    primary: {
      label: "Demo",
      href: "https://drive.google.com/file/d/1Q7hurQnjEkx0-4NEnL52QbeH20VK9fKi/view?usp=sharing",
    },
    source: "https://github.com/Samay001/content-creation-automation-server",
  },
  {
    title: "JoinSparks",
    image: "/projects/joinsparks.png",
    stack: ["TypeScript", "Next.js", "Tailwind CSS"],
    bullets: [
      "Responsive campus social and discovery experience for verified university students.",
      "Highlights campus connections, hangout spots, and a focused waitlist flow.",
    ],
    primary: { label: "Live", href: "https://joinsparks.social/" },
    source: "https://github.com/Samay001/landing-page",
  },
] as const;

export const skills = [
  ["Languages & Core", ["TypeScript", "Java", "C++", "Data Structures & Algorithms", "OOP"]],
  ["Backend & Web", ["Node.js", "Nest.js", "Spring Boot", "Next.js", "REST APIs", "Apache Kafka", "Elasticsearch"]],
  ["Databases", ["PostgreSQL", "pgvector", "MongoDB", "SQL", "Prisma ORM"]],
  ["AI & Voice", ["VAPI", "Genesys AudioHook", "RAG", "OpenAI", "Gemini", "Amazon Textract"]],
  ["DevOps & Architecture", ["Microservices", "Docker", "Kubernetes", "GCP", "Git", "Linux", "Sentry"]],
] as const;

export const awards = [
  { title: "First Prize — iSchoolConnect Hackathon", detail: "AI Interviewer platform", prize: "₹50,000" },
  { title: "Runner-up — Hack Overflow 4.0", detail: "Among 80+ teams, 24-hour prototype", prize: "₹60,000" },
] as const;

export const portfolioContext = `
Samay Rathod is an Associate Software Engineer focused on backend engineering, voice AI, and applied AI.
At EDMO since April 2025, he built Nest.js call routing between Genesys AudioHook and VAPI serving 3,000+ calls daily; a contextual advisor handoff; an NYU OGS RAG chatbot using pgvector and 300+ scraped pages with 82% phase-one accuracy; a Kafka and Google Cloud Storage video pipeline; and an Amazon Textract transfer-credit evaluation system.
At Sarvm.ai from February to April 2025, he built a Node.js/PostgreSQL audit over 5,000+ records that reduced invalid entries by 25%, plus a REST API syncing subscription updates to Elasticsearch.
Projects: Wealth One, AI Interviewer, Content Creation Automation, and JoinSparks. Skills: TypeScript, Java, C++, Node.js, Nest.js, Spring Boot, Next.js, PostgreSQL, pgvector, MongoDB, Apache Kafka, Elasticsearch, VAPI, Genesys AudioHook, RAG, OpenAI, Gemini, Amazon Textract, Docker, Kubernetes, and GCP.
Education: B.E. Computer Science and Engineering, Chandigarh University, 2021–2025.
Awards: first prize at iSchoolConnect Hackathon (₹50,000) and runner-up at Hack Overflow 4.0 among 80+ teams (₹60,000).
Contact: samayrathod1@gmail.com. GitHub: https://github.com/Samay001. LinkedIn: https://linkedin.com/in/samayrathod.
`;
