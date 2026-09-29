import React from 'react';
import { Repeat2, ArrowDownRight } from 'lucide-react';
import { Eyebrow, Reveal, Phone, SectionNumber } from './LandingPrimitives';

export default function LandingRoutines() {
  return <section id="rotinas" className="ng-feature ng-routines"><div className="ng-container grid md:grid-cols-2 gap-12 lg:gap-24 items-center">
    <Reveal><div className="flex justify-between items-center"><Eyebrow>ROTINAS</Eyebrow><SectionNumber>03 / 06</SectionNumber></div><h2 className="ng-heading mt-7">O que importa<br /><span className="text-landing-copper">é o ritmo.</span></h2><p className="ng-body mt-7 max-w-md">Hábitos se constroem no dia a dia. Acompanhe sua constância, celebre os pequenos passos e retome sempre que precisar.</p><p className="ng-routine-quote">“Rotinas não vencem,<br />recomeçam.”</p><a href="#financas" className="ng-feature-next">Mais clareza também nas contas <ArrowDownRight size={18}/></a></Reveal>
    <Reveal className="ng-routine-visual"><div className="ng-rhythm" aria-hidden="true">{[22,38,29,57,47,70,60,88,76,98,84,112].map((h,i)=><i key={i} style={{height:h}}/>)}</div><Phone src="/landing/img/rotinas-original.webp" alt="Tela real de Rotinas do NortGo, com rotinas diárias, semanais e mensais e acompanhamento de conclusão."/><div className="ng-routine-note"><Repeat2 size={17}/><span>Hoje é um bom dia para continuar.</span></div></Reveal>
  </div></section>;
}
