import React from 'react';
import { ArrowDownLeft, ArrowUpRight, Wallet } from 'lucide-react';
import { Eyebrow, Reveal, Phone, SectionNumber } from './LandingPrimitives';

export default function LandingFinances() {
  return <section id="financas" className="ng-feature ng-light ng-finances"><div className="ng-container">
    <Reveal className="ng-finance-heading"><div><Eyebrow light>FINANÇAS</Eyebrow><h2 className="ng-heading mt-6">Seu dinheiro.<br /><span className="ng-accent-text">Sem ponto de interrogação.</span></h2></div><SectionNumber>04 / 06</SectionNumber></Reveal>
    <div className="ng-finance-composition"><Reveal className="ng-finance-side"><p className="ng-body">Saiba quanto entrou, quanto saiu e o que ainda falta pagar. Controle simples para as decisões do dia a dia.</p><div className="ng-finance-amount"><ArrowDownLeft size={19}/><span><small>A RECEBER</small><b>Projeto entregue</b><p>R$ 800,00 · amanhã</p></span></div></Reveal><Reveal className="ng-finance-phone"><Phone src="/landing/img/financas.webp" alt="Tela real de Finanças do NortGo com contas pendentes, pagas e projeção dos próximos meses."/></Reveal><Reveal className="ng-finance-side ng-finance-side-right"><div className="ng-finance-amount"><ArrowUpRight size={19}/><span><small>A PAGAR</small><b>Internet</b><p>R$ 150,00</p></span></div><div className="ng-finance-terms"><Wallet size={22}/><p>Receitas e gastos.<br />Contas e categorias.<br />Dívidas acompanhadas.</p></div></Reveal></div>
  </div></section>;
}
