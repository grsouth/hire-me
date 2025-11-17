import Card from "../ResumeSection/Card";
import { ResumeSection, ResumeSectionId } from "../../data/resume";

type SectionGridProps = {
  sections: ResumeSection[];
  activeId: ResumeSectionId | null;
  onActivate: (id: ResumeSectionId) => void;
};

const SectionGrid = ({ sections, activeId, onActivate }: SectionGridProps) => {
  return (
    <section className="section-grid" aria-label="Resume sections">
      {sections.map((section) => (
        <Card
          key={section.id}
          section={section}
          isActive={activeId === section.id}
          onOpen={() => onActivate(section.id)}
        />
      ))}
    </section>
  );
};

export default SectionGrid;
