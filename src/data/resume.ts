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
  link?: {
    label: string;
    url: string;
  };
}

// ---- Actual data ----

export const resumeData: ResumeData = {
  name: "Garrett Southam",
  headline: "",
  contact: {
    phone: "(801) 372-4562",
    email: "mail@garrettsoutham.com",
  },

  links: [],

  summary: {
    short: "I love using my technical skills to build and maintain useful things.",
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
      short: "Experience across programming, Linux systems, automation, testing, data analysis, troubleshooting, and hardware/software support.",
      details: [
        {
          type: "paragraphTitled",
          title: "Languages",
          text:
            "I have experience with C, C++, C#, Java, Python, SQL, Bash, JavaScript/TypeScript, and HTML/CSS. I've used programming for automation, data analysis, testing, troubleshooting, and internal tooling, and I'm comfortable learning new languages or platforms as needed.",
        },
        {
          type: "paragraphTitled",
          title: "Frameworks, Systems & Tools",
          text:
            "Professionally, I've worked with Windows-based stacks including .NET applications, SQL Server databases, Azure DevOps pipelines, automated testing, and agile development workflows. I also use Linux extensively for development and personal infrastructure, including Docker Compose, systemd services, SSH, Git, shell scripting, logs, networking, and secure remote access tools. \n\n My personal technical projects have included self-hosted network services, camera/NVR systems, MQTT-based automation, RTSP video streams, Home Assistant, and media-server tooling. These projects have given me practical experience troubleshooting networked devices, service reliability, configuration issues, logs, and hardware/software interactions. \n\n I have experience with JUnit, NUnit, Playwright, Pandas, NumPy, Matplotlib, Excel, and VBA macros.",
        },
        {
          type: "paragraphTitled",
          title: "Other Skills",
          text:
            "I've worked closely with software, QA, and hardware teams, and I'm comfortable communicating technical issues across disciplines. Much of my experience has involved investigating unclear problems, documenting findings, coordinating with others, and finding practical solutions. I'm especially interested in roles that combine systems, hardware, software, networking, and user support. \n\n I speak Russian at a conversational level.",
        },
      ],
    },

    // EXPERIENCE
    {
      id: "experience",
      title: "Experience",
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
              image: `${import.meta.env.BASE_URL}assets/images/resume/wave_sensor.jpg`,
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
              logo: `${import.meta.env.BASE_URL}assets/images/resume/byu_logo_square.png`,
              details: [
                "Relevant coursework included Linux Systems Programming, C/x86, Data Structures, Web Programming, Databases/SQL, Java, C++, Python, Computer Systems, Discrete Mathematics, and Physics.",
                "My degree gave me hands-on experience writing object-oriented code, working with larger software projects, practicing test-driven development, and building a strong foundation in core computer science principles.",
                "Additional coursework and electives included computational theory, computer security, blockchain development, mechanical engineering, calculus, and business ethics.",
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
              image: `${import.meta.env.BASE_URL}assets/images/resume/cda_board.jpg`,
              alt: "Lighting console during a show",
              link: {
                label: "View lighting design portfolio",
                url: `${import.meta.env.BASE_URL}projects/light-design/index.html`,
              },
            },
            {
              text:
                "When I have extra time at home, I'm often working on maker or homelab projects. I enjoy 3D printing because it turns small everyday problems into design, troubleshooting, and iteration exercises. \n\n I've designed custom parts in CAD, tuned print settings, repaired equipment, soldered electronics, and written small bits of Arduino code for personal projects. \n\n I also maintain a small homelab with self-hosted services, Docker Compose stacks, media-server tooling, Home Assistant experiments, camera/NVR projects, MQTT automation, and secure remote access. Those projects have given me practical experience with logs, configuration, networking, service reliability, and hardware/software troubleshooting.",
              image: `${import.meta.env.BASE_URL}assets/images/resume/3d_printer.jpg`,
              alt: "3D printer working on a part",
            },
            {
              text:
                "A lot of the work I'm proudest of has come from being patient with people while we sort through unclear technical problems together. I like translating technical details into plain language, asking careful questions, documenting what I learn, and helping teams stay calm when something is broken or ambiguous. \n\n Outside of work and projects, most of my time revolves around family, including my wife, our daughter, and our dog (pictured above)",
              image: `${import.meta.env.BASE_URL}assets/images/resume/fitzy.jpg`,
              alt: "My puppy",
            },
          ],
        },
      ],
    },
  ],
};
