import { useEffect, useRef, useState, useCallback, RefObject } from 'react';

interface UseScrollScrubOptions {
  containerRef: RefObject<HTMLElement | null>;
  onScrub?: (progress: number) => void;
  disabled?: boolean;
}

export function useScrollScrub({
  containerRef,
  onScrub,
  disabled = false,
}: UseScrollScrubOptions) {
  const progressRef = useRef<number>(0);
  const [displayProgress, setDisplayProgress] = useState<number>(0);
  const [activePhase, setActivePhase] = useState<number>(0);
  const rafId = useRef<number | null>(null);
  const lastReportedPhase = useRef<number>(0);
  const lastStateUpdate = useRef<number>(0);

  const calculateProgress = useCallback(() => {
    if (!containerRef.current) return 0;
    const rect = containerRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const totalScrollable = rect.height - viewportHeight;

    if (totalScrollable <= 0) return 0;
    const rawProgress = -rect.top / totalScrollable;
    return Math.min(1, Math.max(0, rawProgress));
  }, [containerRef]);

  useEffect(() => {
    if (disabled) return;

    let ticking = false;

    const update = () => {
      const p = calculateProgress();
      progressRef.current = p;

      // Call imperative continuous scrub (for video currentTime, canvas, etc.)
      if (onScrub) {
        onScrub(p);
      }

      // Determine narrative phase (0: Marca, 1: Preparação, 2: Precisão, 3: Identidade)
      let phase = 0;
      if (p >= 0.28 && p < 0.58) phase = 1;
      else if (p >= 0.58 && p < 0.82) phase = 2;
      else if (p >= 0.82) phase = 3;

      // Throttle React state update to avoid re-rendering per pixel while keeping percentage display responsive
      const now = performance.now();
      if (phase !== lastReportedPhase.current || now - lastStateUpdate.current > 100) {
        lastReportedPhase.current = phase;
        lastStateUpdate.current = now;
        setDisplayProgress(p);
        setActivePhase(phase);
      }

      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        rafId.current = requestAnimationFrame(update);
      }
    };

    // Initial sync
    update();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [calculateProgress, disabled, onScrub]);

  return {
    progressRef,
    displayProgress,
    activePhase,
  };
}
