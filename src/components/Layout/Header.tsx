import { ResumeData } from "../../data/resume";

type HeaderProps = {
  data: ResumeData;
};

const Header = ({ data }: HeaderProps) => {
  const tel = data.contact.phone.replace(/[^\d+]/g, "");
  const photoUrl = `${import.meta.env.BASE_URL}assets/images/profile/profilepic_dark.png`;

  return (
    <header className="site-header">
      <div className="header-text">
        <h1 className="hero-name">{data.name}</h1>
        {data.headline && <p className="hero-headline">{data.headline}</p>}
        <p className="hero-contact">
          <a href={`tel:${tel}`}>{data.contact.phone}</a> |{" "}
          <a href={`mailto:${data.contact.email}`}>{data.contact.email}</a>
          {" | "}
          <a
            href="https://www.linkedin.com/in/garrettsoutham/"
            target="_blank"
            rel="noreferrer"
          >
            linkedin.com/in/garrettsoutham
          </a>
          {" | "}
          <a href="https://github.com/grsouth" target="_blank" rel="noreferrer">
            github.com/grsouth
          </a>
        </p>
        <div className="header-actions">
          <a
            className="ghost-button"
            href={`${import.meta.env.BASE_URL}assets/documents/GarrettSoutham_Resume.pdf`}
            download
          >
            Download a PDF of my resume
          </a>
        </div>

        <p className="summary-inline">{data.summary.short}</p>
      </div>

      <div className="header-photo" aria-hidden role="presentation">
        <img src={photoUrl} alt="" loading="lazy" />
      </div>
    </header>
  );
};

export default Header;
