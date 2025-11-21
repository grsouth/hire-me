import { ResumeData } from "../../data/resume";

type HeaderProps = {
  data: ResumeData;
};

const Header = ({ data }: HeaderProps) => {
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

        <p className="summary-inline">{data.summary.short}</p>
      </div>

      <div className="header-photo" aria-hidden />
    </header>
  );
};

export default Header;
