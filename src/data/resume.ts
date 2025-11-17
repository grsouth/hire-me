// src/data/resume.ts

// ---- Types ----

export interface ResumeData {
  name: string;
  headline: string;
  contact: {
    phone: string;
    email: string;
  };
  links: {
    label: string;
    url: string;
  }[];
  sections: ResumeSection[];
}

export type ResumeSectionId =
  | "summary"
  | "skills"
  | "experience"
  | "education"
  | "otherExperience"
  | "funFacts";

export interface ResumeSection {
  id: ResumeSectionId;
  title: string;
  icon?: string; // emoji or icon name
  short: string; // one-liner shown on small card
  details: SectionDetailBlock[]; // expanded content
}

export type SectionDetailBlock =
  | ParagraphBlock
  | ListBlock
  | ExperienceBlock
  | EducationBlock;

export interface ParagraphBlock {
  type: "paragraph";
  text: string;
}

export interface ListBlock {
  type: "list";
  title?: string;
  items: string[];
}

export interface ExperienceBlock {
  type: "experience";
  items: ExperienceItem[];
}

export interface ExperienceItem {
  company: string;
  role: string;
  location?: string;
  start: string;
  end: string | "Present";
  bullets: string[];
}

export interface EducationBlock {
  type: "education";
  items: EducationItem[];
}

export interface EducationItem {
  school: string;
  degree: string;
  graduation: string;
  details?: string[];
}

// ---- Actual data ----

export const resumeData: ResumeData = {
  name: "Garrett Southam",
  headline: "Junior Software Engineer",
  contact: {
    phone: "(801) 372-4562",
    email: "garrettsoutham@proton.me",
  },

  links: [],

  sections: [
    // SUMMARY
    {
      id: "summary",
      title: "Summary",
      icon: "🧑‍💻",
      short:
        "Junior software engineer building automation and data tools for radar systems.",
      details: [
        {
          type: "paragraph",
          text:
            "Junior software engineer with hands-on experience building internal tools for radar sensor testing, monitoring, and data visualization.",
        },
        {
          type: "paragraph",
          text:
            "Comfortable working across hardware, firmware, and software teams to streamline workflows, improve analysis speed, and surface clear insights for stakeholders.",
        },
        {
          type: "list",
          title: "What I like working on",
          items: [
            "Automation tools that remove repetitive work for engineers and QA",
            "Dashboards and visualizations that make complex test data easy to understand",
            "Reliable internal utilities that improve system performance and debug velocity",
          ],
        },
      ],
    },

    // SKILLS
    {
      id: "skills",
      title: "Skills",
      icon: "🛠",
      short: "C#, C/C++, Java, Python, .NET, Linux, test automation.",
      details: [
        {
          type: "list",
          title: "Programming Languages",
          items: ["C#", "C", "C++", "Java", "Python"],
        },
        {
          type: "list",
          title: "Frameworks & Tools",
          items: [".NET", "Arduino", "Linux"],
        },
        {
          type: "list",
          title: "DevOps & Testing",
          items: [
            "Test-Driven Development (TDD)",
            "Automated testing",
            "CI/CD concepts",
            "Object-oriented design",
          ],
        },
        {
          type: "list",
          title: "Data & Automation",
          items: [
            "Data analysis for hardware and firmware testing",
            "Automation strategies for sensor test sites",
            "Excel-based reporting and dashboards",
            "Data visualization for technical and non-technical audiences",
          ],
        },
      ],
    },

    // EXPERIENCE
    {
      id: "experience",
      title: "Job Experience",
      icon: "💼",
      short: "Engineering Assistant building tools and maintaining radar test sites.",
      details: [
        {
          type: "experience",
          items: [
            {
              company: "Wavetronix",
              role: "Engineering Assistant",
              location: "",
              start: "Sep 2019",
              end: "Present",
              bullets: [
                "Maintain radar test sites used for product testing and firmware development, helping improve product reliability.",
                "Collaborate with software engineers, hardware engineers, and QA testers to streamline analysis workflows for test sites.",
                "Develop internal tools for device monitoring, firmware deployment, and log analysis to shorten the time from issue detection to resolution.",
                "Build dashboards and visualization tools that surface weekly and monthly test metrics to company leadership.",
              ],
            },
            {
              company: "Wavetronix",
              role: "Production Assembler",
              location: "",
              start: "Sep 2017",
              end: "Jan 2020",
              bullets: [
                "Assembled and tested radar sensors to meet manufacturing standards, routinely processing high volumes of units.",
                "Partnered with QA and hardware engineering teams to diagnose and resolve recurring hardware issues.",
              ],
            },
          ],
        },
      ],
    },

    // EDUCATION
    {
      id: "education",
      title: "Education",
      icon: "🎓",
      short: "B.S. Computer Science, Brigham Young University (Dec 2025).",
      details: [
        {
          type: "education",
          items: [
            {
              school: "Brigham Young University",
              degree: "B.S., Computer Science",
              graduation: "Dec 2025 (expected)",
              details: [
                "Coursework in C, C++, Java, Python, and data structures.",
                "Completed classes in discrete mathematics, web programming, computer systems (C/x86), and computational theory.",
                "Supporting math and science coursework including calculus and physics.",
              ],
            },
          ],
        },
      ],
    },

    // OTHER EXPERIENCE
    {
      id: "otherExperience",
      title: "Other Experience",
      icon: "🎭",
      short: "Technical Director & Theatrical Lighting Designer for student and professional shows.",
      details: [
        {
          type: "experience",
          items: [
            {
              company: "Pleasant Grove High School, Shakespeare Coeur d'Alene",
              role: "Technical Director & Theatrical Lighting Designer",
              start: "",
              end: "",
              bullets: [
                "Led technical theatre teams for both student and professional productions, coordinating lighting, sound, and stage operations.",
                "Designed and executed lighting for live performances, balancing artistic direction with practical technical constraints.",
                "Managed complex systems under time pressure to ensure smooth show execution.",
              ],
            },
          ],
        },
      ],
    },

    // FUN FACTS (placeholders for you to customize)
    {
      id: "funFacts",
      title: "Fun Facts",
      icon: "✨",
      short: "A few non-work things that still show how I think and work.",
      details: [
        {
          type: "paragraph",
          text:
            "Use this section to show a bit of personality—hobbies, side projects, or interests that still signal curiosity, discipline, or creativity.",
        },
        {
          type: "list",
          title: "Ideas you could put here",
          items: [
            "Personal tech or maker projects you’ve built for fun.",
            "Volunteer work, mentoring, or community involvement.",
            "Unusual skills or interests that make for a good conversation starter.",
          ],
        },
      ],
    },
  ],
};
