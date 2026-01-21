import { ResumeSection } from "../../data/resume";

type CardProps = {
  section: ResumeSection;
  isActive: boolean;
  onOpen: () => void;
};

const Card = ({ section, isActive, onOpen }: CardProps) => {
  return (
    <button
      className={`resume-card ${isActive ? "is-active" : ""}`}
      onClick={onOpen}
      type="button"
      aria-expanded={isActive}
    >
      <div className="card-heading">
        {section.icon && <span className="card-icon">{section.icon}</span>}
        <span className="card-title">{section.title}</span>
      </div>
      <p className="card-short">{section.short}</p>
      <span className="card-affordance" aria-hidden="true">
        <span className="card-affordance-icon">›</span>
      </span>
    </button>
  );
};

export default Card;
