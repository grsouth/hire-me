import { useEffect, useRef, useState } from "react";

type DwasmModalProps = {
  open: boolean;
  onClose: () => void;
};

const DwasmModal = ({ open, onClose }: DwasmModalProps) => {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [canvasEl, setCanvasEl] = useState<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const iframeSrc = `${import.meta.env.BASE_URL}dwasm/index.html?autostart=1&localiwad=doom.wad&localpwad=resume.wad&-warp&1`;

  const tryPointerLock = () => {
    if (canvasEl && document.pointerLockElement !== canvasEl) {
      canvasEl.requestPointerLock?.();
    }
  };

  const handleIframeLoad = () => {
    const doc = iframeRef.current?.contentDocument;
    const canvas = doc?.getElementById("canvas") as HTMLCanvasElement | null;
    setCanvasEl(canvas ?? null);
  };

  return (
    <div className="dwasm-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <article
        className="dwasm-card"
        onClick={(event) => event.stopPropagation()}
        onMouseDown={tryPointerLock}
      >
        <div className="dwasm-header">
          <button className="close-button" onClick={onClose} type="button" aria-label="Close">
            ×
          </button>
        </div>

        <div className="dwasm-body">
          <iframe
            title="Dwasm (DOOM in the browser)"
            src={iframeSrc}
            className="dwasm-frame"
            allow="fullscreen; gamepad; pointer-lock; xr-spatial-tracking; autoplay"
            ref={iframeRef}
            onLoad={handleIframeLoad}
          />
        </div>
      </article>
    </div>
  );
};

export default DwasmModal;
