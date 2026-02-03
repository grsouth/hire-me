import { useEffect, useMemo, useState } from "react";
import Header from "./components/Layout/Header";
import SectionGrid from "./components/Layout/SectionGrid";
import Expanded from "./components/ResumeSection/Expanded";
import DwasmModal from "./components/DwasmModal";
import BlogFeature from "./components/BlogFeature";
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

  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    const layer = document.getElementById("tilde-layer");
    if (!layer) return undefined;

    let resizeTimer: number | undefined;
    let tildeCols = 0;
    let tildeRows = 0;

    const buildTilde = (cols: number, rows: number) => {
      const output: string[] = [];
      const chars = ["~", "~", "~", "~", "~", ".", ",", " "];
      for (let r = 0; r < rows; r += 1) {
        const wave = Math.sin((r / rows) * Math.PI * 2);
        const rowFill = 0.92 - wave * 0.05;
        let row = "";
        for (let c = 0; c < cols; c += 1) {
          row += Math.random() < rowFill
            ? chars[Math.floor(Math.random() * (chars.length - 1))]
            : " ";
        }
        output.push(row);
      }
      return output.join("\n");
    };

    const refreshTilde = () => {
      const charWidth = 9;
      const charHeight = 14;
      const cols = Math.ceil(window.innerWidth / charWidth) + 16;
      const rows = Math.ceil(window.innerHeight / charHeight) + 16;

      if (cols !== tildeCols || rows !== tildeRows) {
        tildeCols = cols;
        tildeRows = rows;
      }

      layer.textContent = buildTilde(tildeCols, tildeRows);
    };

    refreshTilde();

    const handleResize = () => {
      if (resizeTimer) {
        window.clearTimeout(resizeTimer);
      }
      resizeTimer = window.setTimeout(refreshTilde, 140);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      if (resizeTimer) {
        window.clearTimeout(resizeTimer);
      }
    };
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
    <>
      <div className="tilde-bg" aria-hidden="true">
        <pre id="tilde-layer"></pre>
      </div>
      <div className="app-shell">
      <Header data={resumeData} onPhotoEasterEgg={handlePhotoEasterEgg} />

      <SectionGrid
        sections={resumeData.sections}
        activeId={activeId}
        onActivate={(id) => setActiveId(id)}
      />

      <BlogFeature />

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
    </>
  );
}

export default App;
