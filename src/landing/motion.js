import { useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';
export const landingEase = [0.22, 1, 0.36, 1];
export const landingTransition = { duration: 0.8, ease: landingEase };
export function useLandingMotion() { return Boolean(useReducedMotion()); }
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
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};
