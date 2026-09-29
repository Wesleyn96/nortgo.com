import React from 'react';
import { ArrowRight, StickyNote, CheckCheck } from 'lucide-react';
import { Eyebrow, Reveal, Phone, SectionNumber } from './LandingPrimitives';

export default function LandingNotes() {
  return <section id="notas" className="ng-feature ng-notes"><div className="ng-container grid md:grid-cols-2 gap-12 lg:gap-24 items-center">
    <Reveal><div className="flex justify-between items-center"><Eyebrow>NOTAS</Eyebrow><SectionNumber>06 / 06</SectionNumber></div><h2 className="ng-heading mt-7">Uma ideia agora.<br /><span className="text-landing-copper">Um próximo<br />passo depois.</span></h2><p className="ng-body mt-7 max-w-md">Guarde informações importantes e encontre suas anotações no mesmo lugar. Quando fizer sentido, transforme uma nota em tarefa ou compromisso.</p><div className="ng-note-flow"><span><StickyNote size={18}/> Anotar</span><ArrowRight size={20}/><span><CheckCheck size={18}/> Fazer acontecer</span></div></Reveal>
    <Reveal className="ng-notes-visual"><Phone src="/landing/img/notas-original.webp" alt="Tela real de Notas do NortGo, com busca, lista de anotações e opção de criar nova nota."/><div className="ng-idea-slip"><small>PARA NÃO ESQUECER</small><p>Menos coisas na cabeça.<br />Mais espaço para viver.</p></div></Reveal>
  </div></section>;
}
