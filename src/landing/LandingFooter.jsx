import React from 'react';
import { Link } from 'react-router-dom';
import { Brand } from './LandingPrimitives';

export default function LandingFooter({ legalLinks = {} }) {
  const legal = [['terms', 'Termos de Uso'], ['privacy', 'Privacidade'], ['cookies', 'Cookies']];
  return <footer className="ng-footer">
    <div className="ng-container">
      <div className="flex flex-col sm:flex-row gap-8 items-start sm:items-center justify-between pb-9"><div><Brand /><p className="mt-4 text-sm text-landing-muted">Foco no que importa. Vida organizada.</p></div><a href="#conteudo" className="flex items-center gap-3 text-sm">Voltar ao início</a></div>
      <div className="ng-footer-bottom"><small>© {new Date().getFullYear()} NortGo.</small><nav aria-label="Rodapé" className="flex flex-wrap gap-x-6 gap-y-3"><Link to="/login">Entrar</Link><Link to="/register">Criar conta</Link>{legal.filter(([key]) => legalLinks[key]).map(([key, label]) => <Link key={key} to={legalLinks[key]}>{label}</Link>)}</nav></div>
    </div>
  </footer>;
}
