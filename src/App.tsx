import { useEffect, useMemo, useState } from "react";
import Header from "./components/Layout/Header";
import SectionGrid from "./components/Layout/SectionGrid";
import Expanded from "./components/ResumeSection/Expanded";
import DwasmModal from "./components/DwasmModal";
import { resumeData, ResumeSectionId } from "./data/resume";

function App() {
  const [activeId, setActiveId] = useState<ResumeSectionId | null>(null);
  const [showDwasm, setShowDwasm] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [faceClicks, setFaceClicks] = useState(0);

  useEffect(() => {
    const update = () => {
      if (typeof window === "undefined") return;
      const prefersFinePointer = window.matchMedia("(pointer: fine)").matches;
      const wideEnough = window.matchMedia("(min-width: 900px)").matches;
      setIsDesktop(prefersFinePointer && wideEnough);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const activeSection = useMemo(
    () => resumeData.sections.find((section) => section.id === activeId),
    [activeId]
  );

  const dwasmUnlocked = faceClicks >= 5;

  const handlePhotoEasterEgg = () => {
    setFaceClicks((prev) => Math.min(prev + 1, 5));
  };

  return (
    <div className="app-shell">
      <Header data={resumeData} onPhotoEasterEgg={handlePhotoEasterEgg} />

      <SectionGrid
        sections={resumeData.sections}
        activeId={activeId}
        onActivate={(id) => setActiveId(id)}
      />

      <Expanded section={activeSection} onClose={() => setActiveId(null)} />

      {dwasmUnlocked && (
        <div className="dwasm-launch">
          <button
            className="ghost-button ghost-button--secondary"
            type="button"
            onClick={() => isDesktop && setShowDwasm(true)}
            disabled={!isDesktop}
          >
            Launch Dwasm (play DOOM)
          </button>
        </div>
      )}

      <DwasmModal open={showDwasm} onClose={() => setShowDwasm(false)} />
    </div>
  );
}

export default App;
