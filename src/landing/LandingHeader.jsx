import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Brand } from './LandingPrimitives';

export default function LandingHeader() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const close = event => { if (event.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, []);
  return <header className="ng-header">
    <div className="ng-container flex items-center justify-between gap-5">
      <Brand />
      <nav className="hidden md:flex items-center gap-8 text-sm" aria-label="Navegação principal">
        <a href="#conteudo">O NortGo</a><a href="#recursos">Recursos</a>
      </nav>
      <div className="flex items-center gap-5">
        <Link to="/login" className="hidden md:inline text-sm">Entrar</Link>
        <Link to="/register" className="ng-nav-cta">Começar</Link>
        <button className="ng-menu-toggle md:hidden" onClick={() => setOpen(!open)} aria-label={open ? 'Fechar menu' : 'Abrir menu'} aria-expanded={open} aria-controls="ng-mobile-menu">{open ? <X size={22} /> : <Menu size={22} />}</button>
      </div>
    </div>
    {open && <nav id="ng-mobile-menu" className="ng-mobile-menu md:hidden" aria-label="Navegação móvel" onClick={() => setOpen(false)}>
      <a href="#conteudo">O NortGo</a><a href="#recursos">Recursos</a><Link to="/login">Entrar</Link>
    </nav>}
  </header>;
}
