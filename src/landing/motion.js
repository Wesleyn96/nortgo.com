import { useReducedMotion } from 'framer-motion';
import { useEffect, useLayoutEffect, useState } from 'react';
export const landingEase = [0.22, 1, 0.36, 1];
export const landingTransition = { duration: 0.8, ease: landingEase };
export function useLandingMotion() { return Boolean(useReducedMotion()); }
// Viewport geometry stays physical; design lengths follow the user's root font size.
export function useLandingViewport() {
  const [viewport, setViewport] = useState({ width: 1440, height: 1000, rootSize: 16 });
  useLayoutEffect(() => {
    const sync = () => {
      const next = { width: window.innerWidth, height: window.innerHeight, rootSize: parseFloat(getComputedStyle(document.documentElement).fontSize) || 16 };
      setViewport(previous => previous.width === next.width && previous.height === next.height && previous.rootSize === next.rootSize ? previous : next);
    };
    sync();
    window.addEventListener('resize', sync);
    const observer = new ResizeObserver(sync);
    observer.observe(document.documentElement);
    return () => { window.removeEventListener('resize', sync); observer.disconnect(); };
  }, []);
  return viewport;
}
export function useDesktopScene() {
  const reduced = useLandingMotion();
  const [desktop, setDesktop] = useState(() => typeof window !== 'undefined' && window.matchMedia('(min-width: 1024px) and (min-height: 700px)').matches);
  useEffect(() => {
    const query = window.matchMedia('(min-width: 1024px) and (min-height: 700px)');
    const sync = () => setDesktop(query.matches);
    sync(); query.addEventListener('change', sync);
    return () => query.removeEventListener('change', sync);
  }, []);
  return desktop && !reduced;
}
export const revealVariants = {
  hidden: { opacity: 0, y: '1.75rem' },
  visible: { opacity: 1, y: '0rem' },
};
