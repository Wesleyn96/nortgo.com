import React from 'react';
import { Bell, ArrowDownRight } from 'lucide-react';
import { Eyebrow, Reveal, Phone, SectionNumber } from './LandingPrimitives';

export default function LandingAgenda() {
  return <section id="agenda" className="ng-feature ng-light ng-agenda"><div className="ng-container grid md:grid-cols-2 gap-12 lg:gap-24 items-center">
    <Reveal><div className="flex justify-between items-center"><Eyebrow light>AGENDA</Eyebrow><SectionNumber>01 / 06</SectionNumber></div><h2 className="ng-heading mt-7">Cada compromisso.<br /><span className="ng-accent-text">No seu tempo.</span></h2><p className="ng-body mt-7 max-w-md">Trabalho, consulta, encontro. Enxergue seus horários e receba lembretes para o dia acontecer com mais tranquilidade.</p><div className="ng-detail-line"><Bell size={18}/><span>Horários e lembretes no mesmo lugar.</span></div><a href="#tarefas" className="ng-feature-next">E o que precisa ser feito? <ArrowDownRight size={18}/></a></Reveal>
    <Reveal className="ng-agenda-visual"><div className="ng-date-display" aria-hidden="true"><small>UM DIA DE CADA VEZ</small><span>27</span><b>DOMINGO</b></div><Phone src="/landing/img/agenda.webp" alt="Tela real da Agenda do NortGo, com compromissos, horários e calendário."/><div className="ng-agenda-label"><span>12:00</span><strong>Dentista</strong><Bell size={15}/></div></Reveal>
  </div></section>;
}
