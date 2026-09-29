import { useEffect, useRef } from 'react';
import { useLandingMotion } from './motion';

// Navegação suave limitada à landing, sem alterar estilos ou eventos globais do app.
export default function LandingNavigation({ children }) {
  const ref = useRef(null);
  const reduced = useLandingMotion();
  useEffect(() => {
    const root = ref.current;
    const handleAnchor = event => {
      const anchor = event.target.closest('a[href^="#"]');
      if (!anchor || event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const hash = anchor.getAttribute('href');
      const target = root.querySelector(hash);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: reduced ? 'instant' : 'smooth', block: 'start' });
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
      window.history.replaceState(window.history.state, '', hash);
    };
    root.addEventListener('click', handleAnchor);
    return () => root.removeEventListener('click', handleAnchor);
  }, [reduced]);
  return <div ref={ref}>{children}</div>;
}
