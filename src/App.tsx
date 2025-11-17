import { useMemo, useState } from "react";
import Header from "./components/Layout/Header";
import SectionGrid from "./components/Layout/SectionGrid";
import Expanded from "./components/ResumeSection/Expanded";
import { resumeData, ResumeSectionId } from "./data/resume";

function App() {
  const [activeId, setActiveId] = useState<ResumeSectionId | null>(null);

  const activeSection = useMemo(
    () => resumeData.sections.find((section) => section.id === activeId),
    [activeId]
  );

  return (
    <div className="app-shell">
      <Header data={resumeData} />

      <SectionGrid
        sections={resumeData.sections}
        activeId={activeId}
        onActivate={(id) => setActiveId(id)}
      />

      <Expanded section={activeSection} onClose={() => setActiveId(null)} />
    </div>
  );
}

export default App;
