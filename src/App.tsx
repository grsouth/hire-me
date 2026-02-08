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
    const canvas = document.getElementById("life-canvas") as HTMLCanvasElement | null;
    if (!canvas) return undefined;
    const ctx = canvas.getContext("2d");
    if (!ctx) return undefined;

    let resizeTimer: number | undefined;
    let rafId: number | undefined;
    let cols = 0;
    let rows = 0;
    let grid = new Uint8Array(0);
    let nextGrid = new Uint8Array(0);
    let lastStep = 0;
    let lastTransition = 0;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cellSize = 8;
    const stepInterval = 820;
    const dotRadius = 1.75;
    const fadeDuration = stepInterval;

    const index = (x: number, y: number) => y * cols + x;

    const seed = () => {
      const density = 0.32;
      for (let i = 0; i < grid.length; i += 1) {
        grid[i] = Math.random() < density ? 1 : 0;
      }
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = window.innerWidth;
      const height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      cols = Math.ceil(width / cellSize);
      rows = Math.ceil(height / cellSize);
      grid = new Uint8Array(cols * rows);
      nextGrid = new Uint8Array(cols * rows);
      seed();
    };

    const step = () => {
      for (let y = 0; y < rows; y += 1) {
        const yPrev = y === 0 ? rows - 1 : y - 1;
        const yNext = y === rows - 1 ? 0 : y + 1;
        for (let x = 0; x < cols; x += 1) {
          const xPrev = x === 0 ? cols - 1 : x - 1;
          const xNext = x === cols - 1 ? 0 : x + 1;
          const neighbors =
            grid[index(xPrev, yPrev)] +
            grid[index(x, yPrev)] +
            grid[index(xNext, yPrev)] +
            grid[index(xPrev, y)] +
            grid[index(xNext, y)] +
            grid[index(xPrev, yNext)] +
            grid[index(x, yNext)] +
            grid[index(xNext, yNext)];
          const alive = grid[index(x, y)] === 1;
          nextGrid[index(x, y)] = neighbors === 3 || (alive && neighbors === 2) ? 1 : 0;
        }
      }
      const swap = grid;
      grid = nextGrid;
      nextGrid = swap;
    };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const progress = Math.min(1, (time - lastTransition) / fadeDuration);
      const fadeIn = Math.max(0, Math.min(1, progress));
      const fadeOut = 1 - fadeIn;
      ctx.shadowColor = "rgba(148, 163, 184, 0.18)";
      ctx.shadowBlur = 6;
      for (let y = 0; y < rows; y += 1) {
        for (let x = 0; x < cols; x += 1) {
          const cx = x * cellSize + cellSize * 0.5;
          const cy = y * cellSize + cellSize * 0.5;
          const alive = grid[index(x, y)] === 1;
          const wasAlive = nextGrid[index(x, y)] === 1;
          if (alive || wasAlive) {
            const alpha = (alive ? fadeIn : 0) + (wasAlive ? fadeOut : 0);
            if (alpha <= 0) continue;
            ctx.fillStyle = `rgba(148, 163, 184, ${0.23 * alpha})`;
            ctx.beginPath();
            ctx.arc(cx, cy, dotRadius, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
      ctx.shadowBlur = 0;
    };

    const animate = (time: number) => {
      if (time - lastStep >= stepInterval) {
        lastTransition = time;
        step();
        lastStep = time;
      }
      draw(time);
      rafId = window.requestAnimationFrame(animate);
    };

    resize();
    lastTransition = performance.now();
    draw(lastTransition);

    if (!prefersReducedMotion) {
      rafId = window.requestAnimationFrame(animate);
    }

    const handleResize = () => {
      if (resizeTimer) {
        window.clearTimeout(resizeTimer);
      }
      resizeTimer = window.setTimeout(() => {
        resize();
        draw();
      }, 140);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      if (resizeTimer) {
        window.clearTimeout(resizeTimer);
      }
      if (rafId) {
        window.cancelAnimationFrame(rafId);
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
      <div className="life-bg" aria-hidden="true">
        <canvas id="life-canvas"></canvas>
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
