import { useEffect, useMemo, useState } from "react";
import Header from "./components/Layout/Header";
import SectionGrid from "./components/Layout/SectionGrid";
import Expanded from "./components/ResumeSection/Expanded";
import BlogFeature from "./components/BlogFeature";
import { resumeData, ResumeSectionId } from "./data/resume";

function App() {
  const [activeId, setActiveId] = useState<ResumeSectionId | null>(null);

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
    let drawIndices = new Uint32Array(0);
    let drawCount = 0;
    let lastStep = 0;
    let lastFrame = 0;
    let lastTransition = 0;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hardwareThreads = navigator.hardwareConcurrency || 4;
    const memoryGb = (navigator as Navigator & { deviceMemory?: number }).deviceMemory || 4;
    const lowPowerDevice = hardwareThreads <= 4 || memoryGb <= 4;
    const cellSize = lowPowerDevice ? 11 : 9;
    const stepInterval = lowPowerDevice ? 950 : 860;
    const frameInterval = 1000 / (lowPowerDevice ? 10 : 18);
    const dotSize = lowPowerDevice ? 2.2 : 2.6;
    const fadeDuration = stepInterval;

    const index = (x: number, y: number) => y * cols + x;

    const rebuildDrawList = () => {
      if (drawIndices.length < grid.length) {
        drawIndices = new Uint32Array(grid.length);
      }
      drawCount = 0;
      for (let i = 0; i < grid.length; i += 1) {
        if (grid[i] || nextGrid[i]) {
          drawIndices[drawCount] = i;
          drawCount += 1;
        }
      }
    };

    const seed = () => {
      const density = 0.32;
      for (let i = 0; i < grid.length; i += 1) {
        grid[i] = Math.random() < density ? 1 : 0;
      }
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, lowPowerDevice ? 1 : 1.35);
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
      rebuildDrawList();
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
      rebuildDrawList();
    };

    const draw = (time: number = performance.now()) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const progress = Math.min(1, (time - lastTransition) / fadeDuration);
      const fadeIn = Math.max(0, Math.min(1, progress));
      const fadeOut = 1 - fadeIn;
      for (let i = 0; i < drawCount; i += 1) {
        const cell = drawIndices[i];
        const x = cell % cols;
        const y = Math.floor(cell / cols);
        const cx = x * cellSize + cellSize * 0.5;
        const cy = y * cellSize + cellSize * 0.5;
        const alive = grid[cell] === 1;
        const wasAlive = nextGrid[cell] === 1;
        const alpha = (alive ? fadeIn : 0) + (wasAlive ? fadeOut : 0);
        if (alpha <= 0) continue;
        ctx.fillStyle = `rgba(148, 163, 184, ${0.23 * alpha})`;
        ctx.fillRect(cx - dotSize * 0.5, cy - dotSize * 0.5, dotSize, dotSize);
      }
    };

    const animate = (time: number) => {
      if (time - lastFrame < frameInterval) {
        rafId = window.requestAnimationFrame(animate);
        return;
      }
      lastFrame = time;

      if (time - lastStep >= stepInterval) {
        lastTransition = time;
        step();
        lastStep = time;
      }
      draw(time);
      rafId = window.requestAnimationFrame(animate);
    };

    const startAnimation = () => {
      if (prefersReducedMotion || document.hidden || rafId) return;
      rafId = window.requestAnimationFrame(animate);
    };

    const stopAnimation = () => {
      if (!rafId) return;
      window.cancelAnimationFrame(rafId);
      rafId = undefined;
    };

    resize();
    lastTransition = performance.now();
    draw(lastTransition);

    startAnimation();

    const handleResize = () => {
      if (resizeTimer) {
        window.clearTimeout(resizeTimer);
      }
      resizeTimer = window.setTimeout(() => {
        resize();
        draw();
      }, 140);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopAnimation();
        return;
      }
      lastFrame = 0;
      draw();
      startAnimation();
    };

    window.addEventListener("resize", handleResize);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (resizeTimer) {
        window.clearTimeout(resizeTimer);
      }
      stopAnimation();
    };
  }, []);

  const activeSection = useMemo(
    () => resumeData.sections.find((section) => section.id === activeId),
    [activeId]
  );

  return (
    <>
      <div className="life-bg" aria-hidden="true">
        <canvas id="life-canvas"></canvas>
      </div>
      <div className="app-shell">
        <Header data={resumeData} />

        <SectionGrid
          sections={resumeData.sections}
          activeId={activeId}
          onActivate={(id) => setActiveId(id)}
        />

        <BlogFeature />

        <Expanded section={activeSection} onClose={() => setActiveId(null)} />
      </div>
    </>
  );
}

export default App;
