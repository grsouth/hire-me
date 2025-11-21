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
  summary: SummarySection;
  sections: ResumeSection[];
}

export type ResumeSectionId = "skills" | "experience" | "education" | "otherExperience";

export interface ResumeSection {
  id: ResumeSectionId;
  title: string;
  icon?: string; // emoji or icon name
  short: string; // one-liner shown on small card
  details: SectionDetailBlock[]; // expanded content
}

export interface SummarySection {
  short: string;
  details: SectionDetailBlock[];
}

export type SectionDetailBlock =
  | ParagraphBlock
  | ListBlock
  | ExperienceBlock
  | EducationBlock
  | ParagraphWithImageBlock;

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
  logo?: string;
  details?: string[];
}

export interface ParagraphWithImageBlock {
  type: "paragraphImage";
  entries: ParagraphImageEntry[];
}

export interface ParagraphImageEntry {
  text: string;
  image: string;
  alt?: string;
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

  summary: {
    short: "I help radar teams move faster by building the small tools that make their work easier.",
    details: [
      {
        type: "paragraph",
        text:
          "I spend most of my time inside internal tooling—automating data pulls, building dashboards for the test team, or wiring up scripts that help firmware engineers understand what’s happening in the field.",
      },
      {
        type: "paragraph",
        text:
          "Because I jump between hardware, firmware, and software groups, I’ve become the person who smooths handoffs and turns ambiguous requests into something shippable.",
      },
      {
        type: "list",
        title: "Things I’m drawn to",
        items: [
          "Automation that removes repetitive work for engineers and QA",
          "Visualizations that quickly explain messy test data",
          "Little utilities that improve reliability and shorten debug time",
        ],
      },
    ],
  },

  sections: [
    // SKILLS
    {
      id: "skills",
      title: "Skills",
      icon: "🛠",
      short: "Experienced in Java, Python, and C-family languages, test automation, and Linux.",
      details: [
        {
          type: "paragraph",
          text:
            "My day-to-day stack depends on the problem—sometimes it’s C or C# for hardware-adjacent tasks, other times it’s Python scripts glued together with .NET tools and Linux utilities.",
        },
        {
          type: "list",
          title: "Languages I've worked with",
          items: ["C", "C++", "C#", "Java", "Python"],
        },
        {
          type: "list",
          title: "Frameworks & Tools",
          items: [".NET", "Arduino", "Linux", "Git", "Docker"],
        },
        {
          type: "list",
          title: "Testing & Reliability",
          items: [
            "Test-Driven Development",
            "Automated testing and CI/CD basics",
            "Object-oriented design habits",
          ],
        },
        {
          type: "list",
          title: "Data & Automation",
          items: [
            "Data analysis and reporting for hardware/firmware testing",
            "Automation strategies for radar sensor test sites",
            "Dashboards that non-engineers can understand",
          ],
        },
      ],
    },

    // EXPERIENCE
    {
      id: "experience",
      title: "Job Experience",
      icon: "💼",
      short: "Engineering Assistant who keeps radar test sites running and builds the tools everyone uses.",
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
                "As a member of Wavetronix's 'Mudcat' team, my job was part QA engineer, part field technician, and part software developer.",
                "My main responsibility was to help set up and monitor radar test sites, and analyze the performance of new hardware and firmware releases.",
                "Part of my role was building internal tools to help radar firmware engineers and QA teams move faster by automating data collection, analysis, and reporting. My work helped significantly streamline the feedback loop between new product development and real world testing",
              ],
            },
            {
              company: "Wavetronix",
              role: "Production Assembler",
              location: "",
              start: "Sep 2017",
              end: "Jan 2020",
              bullets: [
                "I helped assemble and test radar sensors and other supporting equipment.",
                "I was part of a team that held a great record for tight quality control. We put new hardware through rigorous testing, including environmental stress screening and performance verification.",
                "During my time in production, I helped implement new processes for upcoming product lines",
                "My experience with hardware assembly gave me a good foundation for understanding how the radar systems work at a low level, which has helped me immensely as I transitioned to other roles."
              ],
            },
          ],
        },
        {
          type: "paragraphImage",
          entries: [
            {
              text:
                "So much of my work revolves around the Wavetronix Wave sensor. I keep the devices healthy, build tools around their telemetry, and make sure the data they emit is actionable.",
              image: `${import.meta.env.BASE_URL}wave_sensor.jpg`,
              alt: "Wavetronix Wave sensor mounted outdoors",
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
      short: "B.S. Computer Science, Brigham Young University.",
      details: [
        {
          type: "education",
          items: [
            {
              school: "Brigham Young University",
              degree: "B.S., Computer Science",
              graduation: "Dec 2025",
              logo: `${import.meta.env.BASE_URL}byu_logo_square.png`,
              details: [
                "Pursuing my Computer Science degree gave me a lot of hands-on work in C, C++, Java, and Python. There was a strong emphasis on understanding core computer science principles, like algorithms and data structures.",
                "My main classes were a deep dive into discrete math, web programming, computer systems (C/x86), databases, and computational theory. I got a lot of experience writing object oriented code, practicing test driven development, and working on larger projects in teams.",
                "I had supporting calculus and physics coursework. Also noteworthy was some great elective experiences, including Blockchain development, computer security, mechanical engineering, and business ethics.",
              ],
            },
          ],
        },
      ],
    },

    // OTHER EXPERIENCE & FUN
    {
      id: "otherExperience",
      title: "Other Experience, Projects, and Fun Facts",
      icon: "🎭",
      short: "Technical direction, lighting design, 3D printing, and personal projects.",
      details: [
        {
          type: "paragraphImage",
          entries: [
            {
              text:
                "I also love technical theater and lighting design. \n\n I've worked as a technical director and lighting designer as a volunteer for student productions, and on a contract basis for community theaters. \n\n It's a great way to combine my technical skills with creativity, and practice working with complex systems under pressure. The show must go on!",
              image: `${import.meta.env.BASE_URL}cda_board.jpg`,
              alt: "Lighting console during a show",
            },
            {
              text:
                "When I have extra time at home, I'm probably working on some kind of maker project. \n\n I love tinkering with 3d printers. I've been surprised how many skills you can develop just by working on personal projects and learning to solve everyday problems on your own in novel ways. \n\n Whether it's designing custom parts in CAD, tuning print settings, learning to solder, or writing Arduino code, you can learn a lot just by diving in to a project and figuring it out as you go",
              image: `${import.meta.env.BASE_URL}3d_printer.jpg`,
              alt: "3D printer working on a part",
            },
            {
              text:
                "The rest of my time tends to revolve around family, including my wife, our new baby daughter, and our puppy. \n\n That isn't really relevant to my employability, but I do get to show you a picture of my dog.",
              image: `${import.meta.env.BASE_URL}fitzy.jpg`,
              alt: "My puppy",
            },
          ],
        },
      ],
    },
  ],
};
