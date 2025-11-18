import { ResumeData, SectionDetailBlock } from "../../data/resume";
import { useState } from "react";

type HeaderProps = {
  data: ResumeData;
};

const Header = ({ data }: HeaderProps) => {
  const [summaryOpen, setSummaryOpen] = useState(false);
  const tel = data.contact.phone.replace(/[^\d+]/g, "");

  return (
    <header className="site-header">
      <div className="header-text">
        <h1 className="hero-name">{data.name}</h1>
        <p className="hero-headline">{data.headline}</p>
        <p className="hero-contact">
          <a href={`tel:${tel}`}>{data.contact.phone}</a> |{" "}
          <a href={`mailto:${data.contact.email}`}>{data.contact.email}</a>
        </p>
        <div className="header-actions">
          <a
            className="ghost-button"
            href={`${import.meta.env.BASE_URL}GarrettSoutham_Resume.pdf`}
            download
          >
            Download a boring PDF version of my resume
          </a>
        </div>

        <button
          className={`summary-card ${summaryOpen ? "is-open" : ""}`}
          type="button"
          onClick={() => setSummaryOpen((open) => !open)}
          aria-expanded={summaryOpen}
        >
          <div className="summary-card-head">
            <div className="summary-head-text">
              <p className="summary-short">{data.summary.short}</p>
            </div>
            <span className="chevron">{summaryOpen ? "−" : "+"}</span>
          </div>

          <div className="summary-details" aria-hidden={!summaryOpen}>
            {data.summary.details.map((block, index) => (
              <SummaryBlock block={block} key={`${block.type}-${index}`} />
            ))}
          </div>
        </button>
      </div>

      <div className="header-photo" aria-hidden />
    </header>
  );
};

const SummaryBlock = ({ block }: { block: SectionDetailBlock }) => {
  if (block.type === "paragraph") {
    return <p className="summary-paragraph">{block.text}</p>;
  }

  if (block.type === "list") {
    return (
      <div className="summary-list">
        {block.title && <p className="summary-list-title">{block.title}</p>}
        <ul>
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    );
  }

  return null;
};

export default Header;
