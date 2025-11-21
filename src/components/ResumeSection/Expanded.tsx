import { useEffect, useMemo, useState } from "react";
import {
  EducationBlock,
  ExperienceBlock,
  ListBlock,
  ParagraphBlock,
  ParagraphWithImageBlock,
  ResumeSection,
} from "../../data/resume";

type ExpandedProps = {
  section?: ResumeSection | null;
  onClose: () => void;
};

const Expanded = ({ section, onClose }: ExpandedProps) => {
  const [renderSection, setRenderSection] = useState(section);
  const isClosing = useMemo(() => !section && !!renderSection, [section, renderSection]);

  useEffect(() => {
    if (section) {
      setRenderSection(section);
      return;
    }

    if (renderSection) {
      const timeout = setTimeout(() => setRenderSection(null), 220);
      return () => clearTimeout(timeout);
    }
  }, [section, renderSection]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!renderSection) return null;

  return (
    <div
      className={`expanded-overlay ${isClosing ? "is-exiting" : "is-entering"}`}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <article
        className={`expanded-card ${isClosing ? "is-exiting" : "is-entering"}`}
        onClick={(event) => event.stopPropagation()}
        aria-label={`${renderSection.title} details`}
      >
        <div className="expanded-header">
          <div className="expanded-title">
            {renderSection.icon && <span className="card-icon">{renderSection.icon}</span>}
            <div>
              <p className="eyebrow">Expanded view</p>
              <h2>{renderSection.title}</h2>
            </div>
          </div>
          <button className="close-button" onClick={onClose} type="button">
            Close
          </button>
        </div>

        <div className="expanded-body">
          {renderSection.details.map((block, index) => (
            <DetailBlock block={block} key={`${block.type}-${index}`} />
          ))}
        </div>
      </article>
    </div>
  );
};

type DetailBlockProps = {
  block: ResumeSection["details"][number];
};

const DetailBlock = ({ block }: DetailBlockProps) => {
  switch (block.type) {
    case "paragraph":
      return <Paragraph textBlock={block} />;
    case "list":
      return <List listBlock={block} />;
    case "experience":
      return <Experience experienceBlock={block} />;
    case "education":
      return <Education educationBlock={block} />;
    case "paragraphImage":
      return <ParagraphImage imageBlock={block} />;
    default:
      return null;
  }
};

const renderWithBreaks = (text: string) =>
  text.split("\n").map((line, index, arr) => (
    <span key={`line-${index}`}>
      {line}
      {index < arr.length - 1 && <br />}
    </span>
  ));

const Paragraph = ({ textBlock }: { textBlock: ParagraphBlock }) => (
  <p className="detail-paragraph detail-block">{renderWithBreaks(textBlock.text)}</p>
);

const List = ({ listBlock }: { listBlock: ListBlock }) => (
  <section className="detail-block">
    {listBlock.title && <h3>{listBlock.title}</h3>}
    <ul className="detail-list">
      {listBlock.items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  </section>
);

const Experience = ({ experienceBlock }: { experienceBlock: ExperienceBlock }) => (
  <section className="detail-block experience-block">
    <h3>Experience</h3>
    <div className="experience-items">
      {experienceBlock.items.map((item) => (
        <article className="experience-item" key={`${item.company}-${item.role}`}>
          <div className="experience-head">
            <div>
              <p className="eyebrow">{item.company}</p>
              <h4>{item.role}</h4>
            </div>
            <p className="experience-dates">
              {item.start} — {item.end}
            </p>
          </div>
          <div className="experience-body">
            {item.bullets.map((bullet) => (
              <p className="detail-paragraph" key={bullet}>
                {renderWithBreaks(bullet)}
              </p>
            ))}
          </div>
        </article>
      ))}
    </div>
  </section>
);

const Education = ({ educationBlock }: { educationBlock: EducationBlock }) => (
  <section className="detail-block education-block">
    <h3>Education</h3>
    <div className="education-items">
      {educationBlock.items.map((item) => (
        <article className="education-item" key={`${item.school}-${item.degree}`}>
          <div className="experience-head">
            <div>
              <p className="eyebrow">{item.school}</p>
              <h4>{item.degree}</h4>
              <p className="experience-dates">{item.graduation}</p>
            </div>
            {item.logo && (
              <div className="education-logo">
                <img src={item.logo} alt={`${item.school} logo`} loading="lazy" />
              </div>
            )}
          </div>
          <div className="education-body">
            {item.details?.map((detail) => (
              <p className="detail-paragraph" key={detail}>
                {renderWithBreaks(detail)}
              </p>
            ))}
          </div>
        </article>
      ))}
    </div>
  </section>
);

const ParagraphImage = ({ imageBlock }: { imageBlock: ParagraphWithImageBlock }) => (
  <section className="detail-block paragraph-image-grid">
    {imageBlock.entries.map((entry, index) => (
      <article className="paragraph-image-card" key={`${entry.image}-${index}`}>
        <div className="paragraph-image-media">
          <img src={entry.image} alt={entry.alt ?? entry.text} loading="lazy" />
        </div>
        {entry.text?.trim() && (
          <p className="detail-paragraph paragraph-image-text">
            {renderWithBreaks(entry.text)}
          </p>
        )}
      </article>
    ))}
  </section>
);

export default Expanded;
