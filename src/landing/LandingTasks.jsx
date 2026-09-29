import React from 'react';
import { Check, ArrowDownRight } from 'lucide-react';
import { Eyebrow, Reveal, Phone, SectionNumber } from './LandingPrimitives';

export default function LandingTasks() {
  return <section id="tarefas" className="ng-feature ng-tasks"><div className="ng-container grid md:grid-cols-2 gap-12 lg:gap-24 items-center">
    <Reveal className="ng-task-visual md:order-first order-last"><Phone src="/landing/img/tarefas.webp" alt="Tela real de Tarefas do NortGo, com projetos, lista de tarefas e horários."/><div className="ng-done-tag"><span><Check size={20}/></span><div><small>UM PASSO A MENOS NA LISTA</small><strong>Enviar documento</strong></div></div></Reveal>
    <Reveal><div className="flex justify-between items-center"><Eyebrow>TAREFAS</Eyebrow><SectionNumber>02 / 06</SectionNumber></div><h2 className="ng-heading mt-7">Tire da cabeça.<br /><span className="text-landing-copper">Dê o próximo passo.</span></h2><p className="ng-body mt-7 max-w-md">Guarde o que precisa fazer, defina prazos e acompanhe o que falta. De pequenas pendências a tarefas importantes.</p><div className="ng-words-list"><span>Organizar.</span><span>Acompanhar.</span><span>Concluir.</span></div><a href="#rotinas" className="ng-feature-next">E aquilo que se repete? <ArrowDownRight size={18}/></a></Reveal>
  </div></section>;
}
