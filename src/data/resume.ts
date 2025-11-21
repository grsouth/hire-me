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
  | TitledParagraphBlock
  | ListBlock
  | ExperienceBlock
  | EducationBlock
  | ParagraphWithImageBlock;

export interface ParagraphBlock {
  type: "paragraph";
  text: string;
}

export interface TitledParagraphBlock {
  type: "paragraphTitled";
  title: string;
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
  headline: "Software Engineer",
  contact: {
    phone: "(801) 372-4562",
    email: "garrettsoutham@proton.me",
  },

  links: [],

  summary: {
    short: "I love using technical skills to build useful things.",
    details: [
      {
        type: "paragraph",
        text:
          "",
      },
      {
        type: "paragraph",
        text:
          "",
      },
      {
        type: "list",
        title: "",
        items: [
          "",
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
      short: "Proficient in modern object-oriented programming and software development tools, with experience in data analysis, automation, and SDET/QA.",
      details: [
        {
          type: "paragraphTitled",
          title: "Languages",
          text:
            "I have the most experience working in C, C++, C#, Java, and Python. I've also done some work in JavaScript/TypeScript, SQL, HTML/CSS, and Bash scripting. \n\n I'm excited to pick up new languages as needed, and have a solid foundation in core programming concepts.",
        },
        {
          type: "paragraphTitled",
          title: "Frameworks & Tools",
          text:
            "I have a real passion for Linux, which I use at home, for my personal projects, and whenever I can. At work though, I've gained experience working with Windows-based stacks, including .NET applications, SQL Server databases, and Azure DevOps pipelines. \n\n I'm comfortable working with Git for version control, and have worked on the basics of CI/CD. \n\n I have experience with test frameworks like JUnit, NUnit and Playwright. \n\n For data analysis and automation, I've worked with Pandas, NumPy, and Matplotlib in Python, not to mention Excel and VBA macros.",
        },
        {
          type: "paragraphTitled",
          title: "Other / Soft Skills",
          text:
            "I've worked in agile teams, learning Scrum methodologies. I've had a lot of experience communicating technical concepts to non-technical stakeholders and working across teams to solve problems. \n\n I speak Russian at a conversational level. \n\n I'm a quick learner, and I love getting involved in new challenges that let me stretch my skills and use new tools.   ",
        },
      ],
    },

    // EXPERIENCE
    {
      id: "experience",
      title: "Job Experience",
      icon: "💼",
      short: "Engineering Assistant with experience in hardware, QA, and software development.",
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
                "My main responsibility was to configure and monitor radar test sites, and analyze the performance of new hardware and firmware releases.",
                "Part of my role was building internal tools to help radar firmware engineers and QA teams move faster by automating data collection, analysis, and reporting. My work helped significantly streamline the feedback loop between new product development and real-world testing.",
              ],
            },
            {
              company: "Wavetronix",
              role: "Production Assembler",
              location: "",
              start: "Sep 2017",
              end: "Jan 2020",
              bullets: [
                "I assembled and tested radar sensors, along with other supporting equipment.",
                "I was part of a team that required tight quality control. We put new hardware through rigorous testing, including environmental stress screening and performance verification.",
                "During my time in production, I implemented new processes for upcoming product lines.",
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
                "",
              image: `${import.meta.env.BASE_URL}wave_sensor.jpg`,
              alt: "Wavetronix sensor mounted outdoors",
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
                "My main classes were a deep dive into discrete math, web programming, computer systems (C/x86), databases, and computational theory. I got a lot of experience writing object-oriented code, practicing test-driven development, and working on larger projects.",
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
      short: "Technical Theater, 3D Printing, and Personal Projects.",
      details: [
        {
          type: "paragraphImage",
          entries: [
            {
              text:
                "I also love technical theater and lighting design. \n\n I've worked as a technical director and lighting designer as a volunteer for student productions, and as an employee for community theaters. \n\n It's a great way to combine my technical skills with creativity, and practice working with complex systems under pressure. No matter what happens, the show must go on! \n\n My most recent work was as the lighting designer and board operator for Shakespeare Coeur d'Alene's production of Hamlet.",
              image: `${import.meta.env.BASE_URL}cda_board.jpg`,
              alt: "Lighting console during a show",
            },
            {
              text:
                "When I have extra time at home, I'm probably working on some kind of maker project. \n\n I love tinkering with 3D printers. I've been surprised how many skills you can develop just by working on personal projects and learning to solve everyday problems on your own in novel ways. \n\n Whether it's designing custom parts in CAD, tuning print settings, learning to solder, or writing Arduino code, you can learn a lot just by diving into a project and figuring it out as you go. \n\n Some of my recent projects have included an automatic humidity-controlled gecko misting system, custom trigger linkages for bufferless rifle receivers, and a whole variety of organization and workshop improvement projects.",
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
