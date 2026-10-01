import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { House, CalendarDays, CheckCheck, Repeat2, Wallet, Heart, StickyNote } from 'lucide-react';
import { Reveal, Phone } from './LandingPrimitives';
import { useDesktopScene, useLandingMotion, landingEase } from './motion';

export const modules = [
  { label: 'Home', id: 'home', icon: House, sideLeft: 'O que importa hoje.', textLeft: 'Veja compromissos, tarefas e contas que precisam de atenção em uma visão do seu dia.', sideRight: 'Seu dia começa aqui.', textRight: 'Encontre suas próximas ações e acesse as áreas da sua vida no mesmo lugar.', src: '/landing/img/home.webp' },
  { label: 'Agenda', id: 'agenda', icon: CalendarDays, sideLeft: 'Seu dia, à vista.', textLeft: 'Reúna consultas, encontros e compromissos em uma agenda fácil de acompanhar.', sideRight: 'Cada horário conta.', textRight: 'Veja o que vem a seguir e use lembretes para se preparar com tranquilidade.', src: '/landing/img/agenda.webp' },
  { label: 'Tarefas', id: 'tarefas', icon: CheckCheck, sideLeft: 'Dê lugar às pendências.', textLeft: 'Anote o que precisa fazer e defina prazos para cada tarefa.', sideRight: 'Um passo de cada vez.', textRight: 'Acompanhe o que falta e marque suas tarefas como concluídas ao longo do dia.', src: '/landing/img/tarefas.webp' },
  { label: 'Rotinas', id: 'rotinas', icon: Repeat2, sideLeft: 'Hábitos que cabem na vida.', textLeft: 'Organize o que se repete na sua rotina, do cuidado diário aos planos da semana.', sideRight: 'Enxergue sua constância.', textRight: 'Registre cada prática e acompanhe seu progresso. Se precisar, recomece no seu ritmo.', src: '/landing/img/rotinas-original.webp' },
  { label: 'Finanças', id: 'financas', icon: Wallet, sideLeft: 'Saiba para onde vai.', textLeft: 'Registre receitas e gastos por categoria para entender melhor seu dia a dia financeiro.', sideRight: 'Contas sob controle.', textRight: 'Acompanhe o que tem a pagar e a receber, com os vencimentos no mesmo lugar.', src: '/landing/img/financas.webp' },
  { label: 'Saúde', id: 'saude', icon: Heart, sideLeft: 'Reserve espaço para você.', textLeft: 'Registre água, sono, alimentação e atividade física junto com sua organização diária.', sideRight: 'Perceba seus hábitos.', textRight: 'Acompanhe seus registros ao longo dos dias e dê atenção aos pequenos cuidados.', src: '/landing/img/saude.webp' },
  { label: 'Notas', id: 'notas', icon: StickyNote, sideLeft: 'Uma ideia merece espaço.', textLeft: 'Guarde ideias e informações importantes para encontrar tudo quando precisar.', sideRight: 'Da anotação à ação.', textRight: 'Quando fizer sentido, transforme uma nota em tarefa ou compromisso e dê o próximo passo.', src: '/landing/img/notas-original.webp' },
];
const mobileDescriptions = {
  home: 'Veja o que precisa de atenção hoje e encontre suas próximas ações.',
  agenda: 'Reúna compromissos, horários e lembretes para acompanhar seu dia.',
  tarefas: 'Organize pendências, defina prazos e acompanhe suas tarefas até concluir.',
  rotinas: 'Registre seus hábitos e acompanhe sua constância, no seu ritmo.',
  financas: 'Acompanhe receitas, gastos e vencimentos em um só lugar.',
  saude: 'Registre água, sono, alimentação e atividade física no dia a dia.',
  notas: 'Guarde ideias e transforme uma nota em tarefa ou compromisso quando fizer sentido.',
};

export default function LandingOverview({ active, onSelect }) {
  const ref = useRef(null);
  const cinematic = useDesktopScene();
  const reduced = useLandingMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center center'] });
  const spreadLeft = useTransform(scrollYProgress, [0, 1], ['-4.0625rem', '-17.8125rem']);
  const spreadRight = useTransform(scrollYProgress, [0, 1], ['4.0625rem', '17.8125rem']);
  const turnLeft = useTransform(scrollYProgress, [0, 1], [-3, -15]);
  const turnRight = useTransform(scrollYProgress, [0, 1], [3, 15]);
  const depth = useTransform(scrollYProgress, [0, 1], [.7, 1]);
  const selected = modules[active];
  const explanationSide = active % 2 === 0 ? 'left' : 'right';
  const explanationTitle = explanationSide === 'left' ? selected.sideLeft : selected.sideRight;
  function selectByKeyboard(event, index) {
    let next;
    if (event.key === 'ArrowRight') next = (index + 1) % modules.length;
    if (event.key === 'ArrowLeft') next = (index + modules.length - 1) % modules.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = modules.length - 1;
    if (next === undefined) return;
    event.preventDefault(); onSelect(next);
    ref.current.querySelector(`#ng-tab-${modules[next].id}`).focus();
  }
  return <section id="recursos" ref={ref} className="ng-product-theater">
    <div className="ng-theater-grid" aria-hidden="true"/>
    <div className="ng-container relative">
      {cinematic
        ? <Reveal className="ng-theater-heading"><h2 className="ng-heading">A sua vida.<br/><span className="text-landing-copper">Toda aqui.</span></h2></Reveal>
        : <div className="ng-theater-heading"><h2 className="ng-heading">A sua vida.<br/><span className="text-landing-copper">Toda aqui.</span></h2></div>}
      <div className="ng-module-tabs" role="tablist" aria-label="Explore os módulos do NortGo">{modules.map(({id,label,icon:Icon},index)=><button key={id} id={`ng-tab-${id}`} role="tab" aria-selected={index===active} aria-controls="ng-module-panel" tabIndex={index===active?0:-1} onClick={()=>onSelect(index)} onKeyDown={event=>selectByKeyboard(event,index)}><Icon size="1.0625rem"/><span>{label}</span></button>)}</div>
      <div className="ng-theater-stage">
        <div className="ng-theater-floor" aria-hidden="true"/>
        <motion.div className="ng-theater-wing ng-theater-wing-left" style={cinematic?{x:spreadLeft,rotate:turnLeft}: {}} aria-hidden="true"><Phone src="/landing/img/home.webp" alt=""/></motion.div>
        <motion.div className="ng-theater-wing ng-theater-wing-right" style={cinematic?{x:spreadRight,rotate:turnRight}: {}} aria-hidden="true"><Phone src="/landing/img/financas.webp" alt=""/></motion.div>
        <motion.div className="ng-theater-main" style={cinematic?{scale:depth}:{scale:1}}><div id="ng-module-panel" role="tabpanel" aria-labelledby={`ng-tab-${selected.id}`} tabIndex={0}>
          <motion.div key={selected.id} initial={reduced?false:{opacity:0,y:'0.75rem'}} animate={{opacity:1,y:'0rem'}} transition={{duration:reduced?0:.35,ease:landingEase}}><Phone src={selected.src} alt={`Tela real de ${selected.label} do NortGo.`} /></motion.div>
        </div></motion.div>
        <div className="ng-theater-explanations" aria-live="polite" aria-atomic="true">
          <motion.div key={selected.id} initial={reduced ? false : { opacity: 0, x: explanationSide === 'left' ? '-0.75rem' : '0.75rem', filter: 'blur(0.3125rem)' }} animate={{ opacity: 1, x: '0rem', filter: 'blur(0rem)' }} transition={{ duration: reduced ? 0 : .55, ease: landingEase }} className={`ng-theater-side-note ng-theater-note-${explanationSide}`}>
            <h3>{explanationTitle}</h3><p className="ng-theater-description-full">{selected.textLeft}</p><p className="ng-theater-description-full">{selected.textRight}</p><p className="ng-theater-description-mobile">{mobileDescriptions[selected.id]}</p>
          </motion.div>
        </div>
      </div>
    </div>
  </section>;
}
