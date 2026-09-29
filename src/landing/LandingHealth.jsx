import React from 'react';
import { Heart, ArrowDownRight } from 'lucide-react';
import { Eyebrow, Reveal, Phone, SectionNumber } from './LandingPrimitives';

export default function LandingHealth() {
  return <section id="saude" className="ng-feature ng-health"><div className="ng-container grid md:grid-cols-2 gap-12 lg:gap-24 items-center">
    <Reveal className="ng-health-visual md:order-first order-last"><div className="ng-health-soft" aria-hidden="true"/><Phone src="/landing/img/saude.webp" alt="Tela real do módulo Saúde do NortGo."/><div className="ng-health-caption"><Heart size={17}/><span>Um pouco de cuidado, todos os dias.</span></div></Reveal>
    <Reveal><div className="flex justify-between items-center"><Eyebrow>SAÚDE</Eyebrow><SectionNumber>05 / 06</SectionNumber></div><h2 className="ng-heading mt-7">Na sua rotina,<br /><span className="text-landing-copper">você também<br />é prioridade.</span></h2><p className="ng-body mt-7 max-w-md">Água, sono, alimentação e atividade física. Registre seus cuidados e acompanhe seus hábitos ao longo dos dias.</p><p className="ng-health-disclaimer">Acompanhamento pessoal de hábitos.<br />Não substitui avaliação médica.</p><a href="#notas" className="ng-feature-next">Dê espaço às suas ideias <ArrowDownRight size={18}/></a></Reveal>
  </div></section>;
}
