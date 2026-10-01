# NortGo — código para integração no Base44 / revisão visual 2

Leia README.md antes de aplicar. Copie cada bloco para o caminho indicado, incluindo cinematic.css. Mescle somente theme.extend na configuração existente; preserve roteamento, autenticação, metadados e estilos globais. Envie public/landing separadamente. Não inclui o roteador de demonstração.

## src/Welcome.jsx

```jsx
import React, { useState } from 'react';
import { MotionConfig } from 'framer-motion';
import LandingHeader from './landing/LandingHeader';
import LandingHero from './landing/LandingHero';
import LandingFooter from './landing/LandingFooter';
import LandingOverview from './landing/LandingOverview';
import LandingCTA from './landing/LandingCTA';
import LandingNavigation from './landing/LandingNavigation';
import { useLandingViewport } from './landing/motion';
import './landing/landing.css';
import './landing/cinematic.css';
import './landing/iphone.css';

export default function Welcome({ legalLinks = {} }) {
  const [activeModule, setActiveModule] = useState(0);
  const viewport = useLandingViewport();
  return <MotionConfig reducedMotion="user">
    <LandingNavigation><div className="nortgo-landing font-landing bg-landing-bg text-landing-paper" style={{ '--ng-vw': `${viewport.width / 1600}rem` }}>
      <a className="ng-skip" href="#conteudo">Pular para o conteúdo</a>
      <LandingHeader />
      <main id="conteudo">
        <LandingHero />
        <LandingOverview active={activeModule} onSelect={setActiveModule} />
        <LandingCTA />
      </main>
      <LandingFooter legalLinks={legalLinks} />
    </div></LandingNavigation>
  </MotionConfig>;
}
```

## src/landing/LandingAgenda.jsx

```jsx
import React from 'react';
import { Bell, ArrowDownRight } from 'lucide-react';
import { Eyebrow, Reveal, Phone, SectionNumber } from './LandingPrimitives';

export default function LandingAgenda() {
  return <section id="agenda" className="ng-feature ng-light ng-agenda"><div className="ng-container grid md:grid-cols-2 gap-12 lg:gap-24 items-center">
    <Reveal><div className="flex justify-between items-center"><Eyebrow light>AGENDA</Eyebrow><SectionNumber>01 / 06</SectionNumber></div><h2 className="ng-heading mt-7">Cada compromisso.<br /><span className="ng-accent-text">No seu tempo.</span></h2><p className="ng-body mt-7 max-w-md">Trabalho, consulta, encontro. Enxergue seus horários e receba lembretes para o dia acontecer com mais tranquilidade.</p><div className="ng-detail-line"><Bell size={18}/><span>Horários e lembretes no mesmo lugar.</span></div><a href="#tarefas" className="ng-feature-next">E o que precisa ser feito? <ArrowDownRight size={18}/></a></Reveal>
    <Reveal className="ng-agenda-visual"><div className="ng-date-display" aria-hidden="true"><small>UM DIA DE CADA VEZ</small><span>27</span><b>DOMINGO</b></div><Phone src="/landing/img/agenda.webp" alt="Tela real da Agenda do NortGo, com compromissos, horários e calendário."/><div className="ng-agenda-label"><span>12:00</span><strong>Dentista</strong><Bell size={15}/></div></Reveal>
  </div></section>;
}
```

## src/landing/LandingCTA.jsx

```jsx
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { CalendarDays, CheckCheck, Heart } from 'lucide-react';
import { Action, Reveal, Phone } from './LandingPrimitives';
import { useDesktopScene } from './motion';
export default function LandingCTA() {
  const ref=useRef(null);
  const cinematic=useDesktopScene();
  const {scrollYProgress}=useScroll({target:ref,offset:['start end','end end']});
  const y=useTransform(scrollYProgress,[0,1],['6.25rem','0rem']);
  const rotate=useTransform(scrollYProgress,[0,1],[12,0]);
  return <section id="comecar" ref={ref} className="ng-finale ng-light"><div className="ng-container">
    <Reveal className="ng-finale-copy"><h2>Encontre um norte.<br/><span>Viva o seu dia.</span></h2><p>Foco no que importa. Vida organizada.</p><Action>Começar agora</Action></Reveal>
    <div className="ng-finale-stage" aria-hidden="true"><div className="ng-finale-sun"/><motion.div className="ng-finale-phone" style={cinematic?{y,rotate}:{}}><Phone src="/landing/img/home.webp" alt=""/></motion.div><div className="ng-finale-token ng-finale-token-one"><CalendarDays size="1.75rem"/></div><div className="ng-finale-token ng-finale-token-two"><CheckCheck size="1.75rem"/></div><div className="ng-finale-token ng-finale-token-three"><Heart size="1.4375rem"/></div><span className="ng-finale-word-one">Mais clareza.</span><span className="ng-finale-word-two">Mais vida.</span></div>
  </div></section>;
}
```

## src/landing/LandingDay.jsx

```jsx
import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { CircleAlert, Wallet, CalendarDays } from 'lucide-react';
import { Eyebrow, Phone } from './LandingPrimitives';
import { DayScreen } from './ProductScreens';
import { useLandingMotion } from './motion';

const steps = [
  { title: 'O que ficou para trás.', text: 'Tarefas atrasadas aparecem para você retomar de onde parou.', icon: CircleAlert },
  { title: 'O que vence hoje.', text: 'As contas do dia ganham atenção antes de passarem despercebidas.', icon: Wallet },
  { title: 'O que vem a seguir.', text: 'Compromissos à vista. Mais tranquilidade para seguir seu dia.', icon: CalendarDays },
];
export default function LandingDay() {
  const ref = useRef(null);
  const reduced = useLandingMotion();
  const [current, setCurrent] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const rotate = useTransform(scrollYProgress, [0, .5, 1], [-4, 0, 4]);
  useMotionValueEvent(scrollYProgress, 'change', value => setCurrent(Math.min(2, Math.floor(value * 3))));
  return <section id="seu-dia" ref={ref} className={`ng-day ${reduced ? 'ng-day-static' : ''}`} aria-labelledby="day-heading">
    <div className="ng-day-sticky"><div className="ng-container grid md:grid-cols-2 items-center gap-12 md:gap-20">
      <div><Eyebrow>CENTRO DE AÇÃO</Eyebrow><h2 id="day-heading" className="ng-heading mt-6">Seu dia.<br /><span className="text-landing-copper">Na ordem<br />do que importa.</span></h2><p className="ng-body mt-6 max-w-md">Abra o NortGo e entenda o que precisa da sua atenção agora.</p><div className="ng-day-steps">{steps.map(({title,text,icon:Icon},i)=><div key={title} className={`ng-day-step ${reduced || current===i?'ng-day-step-active':''}`}><span><Icon size={18}/></span><div><h3>{title}</h3><p>{text}</p></div></div>)}</div></div>
      <div className="ng-day-visual"><div className="ng-day-glow" aria-hidden="true"/><motion.div style={reduced?{}:{rotate}}><Phone><DayScreen current={reduced ? -1 : current}/></Phone></motion.div></div>
    </div></div>
  </section>;
}
```

## src/landing/LandingFinances.jsx

```jsx
import React from 'react';
import { ArrowDownLeft, ArrowUpRight, Wallet } from 'lucide-react';
import { Eyebrow, Reveal, Phone, SectionNumber } from './LandingPrimitives';

export default function LandingFinances() {
  return <section id="financas" className="ng-feature ng-light ng-finances"><div className="ng-container">
    <Reveal className="ng-finance-heading"><div><Eyebrow light>FINANÇAS</Eyebrow><h2 className="ng-heading mt-6">Seu dinheiro.<br /><span className="ng-accent-text">Sem ponto de interrogação.</span></h2></div><SectionNumber>04 / 06</SectionNumber></Reveal>
    <div className="ng-finance-composition"><Reveal className="ng-finance-side"><p className="ng-body">Saiba quanto entrou, quanto saiu e o que ainda falta pagar. Controle simples para as decisões do dia a dia.</p><div className="ng-finance-amount"><ArrowDownLeft size={19}/><span><small>A RECEBER</small><b>Projeto entregue</b><p>R$ 800,00 · amanhã</p></span></div></Reveal><Reveal className="ng-finance-phone"><Phone src="/landing/img/financas.jpeg" alt="Tela real de Finanças do NortGo com contas pendentes, pagas e projeção dos próximos meses."/></Reveal><Reveal className="ng-finance-side ng-finance-side-right"><div className="ng-finance-amount"><ArrowUpRight size={19}/><span><small>A PAGAR</small><b>Internet</b><p>R$ 150,00</p></span></div><div className="ng-finance-terms"><Wallet size={22}/><p>Receitas e gastos.<br />Contas e categorias.<br />Dívidas acompanhadas.</p></div></Reveal></div>
  </div></section>;
}
```

## src/landing/LandingFooter.jsx

```jsx
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
```

## src/landing/LandingHeader.jsx

```jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Brand } from './LandingPrimitives';

export default function LandingHeader() {
  return <header className="ng-header">
    <div className="ng-container flex items-center justify-between gap-5">
      <Brand />
      <div className="flex items-center gap-5">
        <Link to="/login" className="text-sm">Entrar</Link>
      </div>
    </div>
  </header>;
}
```

## src/landing/LandingHealth.jsx

```jsx
import React from 'react';
import { Heart, ArrowDownRight } from 'lucide-react';
import { Eyebrow, Reveal, Phone, SectionNumber } from './LandingPrimitives';

export default function LandingHealth() {
  return <section id="saude" className="ng-feature ng-health"><div className="ng-container grid md:grid-cols-2 gap-12 lg:gap-24 items-center">
    <Reveal className="ng-health-visual md:order-first order-last"><div className="ng-health-soft" aria-hidden="true"/><Phone src="/landing/img/saude.webp" alt="Tela real do módulo Saúde do NortGo."/><div className="ng-health-caption"><Heart size={17}/><span>Um pouco de cuidado, todos os dias.</span></div></Reveal>
    <Reveal><div className="flex justify-between items-center"><Eyebrow>SAÚDE</Eyebrow><SectionNumber>05 / 06</SectionNumber></div><h2 className="ng-heading mt-7">Na sua rotina,<br /><span className="text-landing-copper">você também<br />é prioridade.</span></h2><p className="ng-body mt-7 max-w-md">Água, sono, alimentação e atividade física. Registre seus cuidados e acompanhe seus hábitos ao longo dos dias.</p><p className="ng-health-disclaimer">Acompanhamento pessoal de hábitos.<br />Não substitui avaliação médica.</p><a href="#notas" className="ng-feature-next">Dê espaço às suas ideias <ArrowDownRight size={18}/></a></Reveal>
  </div></section>;
}
```

## src/landing/LandingHero.jsx

```jsx
import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { CalendarDays, CheckCheck, Wallet, Repeat2, StickyNote, Heart } from 'lucide-react';
import { Action, Phone, PHONE_ASPECT_RATIO } from './LandingPrimitives';
import { useDesktopScene, useLandingMotion, useLandingViewport, landingEase } from './motion';

const heroModules = [
  { label: 'Rotinas', icon: Repeat2 },
  { label: 'Agenda', icon: CalendarDays },
  { label: 'Tarefas', icon: CheckCheck },
  { label: 'Notas', icon: StickyNote },
  { label: 'Finanças', icon: Wallet },
  { label: 'Saúde', icon: Heart },
];

const chapters = [
  { image: 'home', start: 0, left: 'Veja', right: 'Organize', caption: 'Siga mais leve.', alt: 'Tela real do NortGo com a visão de hoje, próximas ações e os seis módulos.' },
  { image: 'rotinas-original', start: .28, left: 'O que importa', right: 'é o ritmo', alt: 'Tela real de Rotinas do NortGo, com rotinas diárias, semanais e mensais.' },
  { image: 'agenda', start: .42, left: 'Cada compromisso', right: 'No seu tempo', alt: 'Tela real da Agenda do NortGo.' },
  { image: 'tarefas', start: .56, left: 'Tire da cabeça', right: 'Dê o próximo passo', compactRight: true, alt: 'Tela real de Tarefas do NortGo.' },
  { image: 'notas-original', start: .70, left: 'Uma ideia agora', right: 'Um próximo passo depois', alt: 'Tela real de Notas do NortGo.' },
  { image: 'financas', start: .84, left: 'Seu dinheiro', right: 'Sem ponto de interrogação', alt: 'Tela real de Finanças do NortGo.' },
];

function ChapterScreen({ chapter, progress, active }) {
  const opacity = useTransform(progress, [chapter.start, chapter.start + .04], [0, 1]);
  const isFinance = chapter.image === 'financas';
  const extension = isFinance ? 'jpeg' : 'webp';
  return <motion.div className={`ng-cinema-screen-layer ${isFinance ? 'ng-cinema-screen-finance' : ''}`} style={{ opacity: chapter.start === 0 ? 1 : opacity }} aria-hidden={!active}>
    <picture>{!isFinance && <source srcSet={`/landing/img/${chapter.image}.${extension}`} type="image/webp" />}<img src={`/landing/img/${chapter.image}.${isFinance ? extension : 'jpg'}`} alt={chapter.alt} width="379" height="752" decoding="async" /></picture>
  </motion.div>;
}

function ChapterWords({ chapter, index, progress }) {
  const enter = index === 0 ? .064 : chapter.start + .02;
  const next = chapters[index + 1]?.start;
  // Text clears before the next phrase enters; image layers crossfade underneath.
  const opacity = useTransform(progress, next ? [enter, enter + .04, next - .025, next + .015] : [enter, enter + .04], next ? [0, 1, 1, 0] : [0, 1]);
  const y = useTransform(progress, [enter, enter + .04], ['1.375rem', '0rem']);
  return <motion.div className={`ng-cinema-words ${index ? 'ng-cinema-chapter-words' : ''}`} style={{ opacity, y }} aria-hidden="true">
    <span className="ng-cinema-word-one">{chapter.image === 'agenda' ? <><span className="ng-cinema-desktop-label">Cada compromisso</span><span className="ng-cinema-mobile-label">Cada evento</span></> : chapter.left.replace(/\.+$/, '')}</span>
    <span className={`ng-cinema-word-two ${chapter.compactRight ? 'ng-cinema-word-compact' : ''}`}>{chapter.right.replace(/\.+$/, '')}{chapter.number && <small className="ng-cinema-chapter-number">{chapter.number}</small>}</span>
    {chapter.caption && <span className="ng-cinema-word-three">{chapter.caption}</span>}
  </motion.div>;
}

export default function LandingHero() {
  const ref = useRef(null);
  const reduced = useLandingMotion();
  const cinematic = useDesktopScene();
  const viewport = useLandingViewport();
  const rootScale = viewport.rootSize / 16;
  const deviceWidth = viewport.width < 768 ? 246 : 350;
  const deviceHeight = deviceWidth / PHONE_ASPECT_RATIO;
  const settledScale = Math.max(.35,Math.min(.9,1.15*(viewport.height-240)/deviceHeight));
  const startingTop = Math.max((viewport.width < 768 ? 490 : 515)*rootScale,viewport.height*.52);
  const settledY = (viewport.height-deviceHeight*rootScale*settledScale)/2-30*rootScale-startingTop;
  const [pastIntro, setPastIntro] = useState(false);
  const [activeChapter, setActiveChapter] = useState(0);
  const { scrollYProgress: progress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  // The introduction keeps its original scroll distance. One device then holds
  // all six screens; the sequence is entirely reversible with scrolling.
  const intro = useTransform(progress, [0, .2], [0, 1]);
  const phoneScale = useTransform(intro, [0, .6, 1], [1.12, settledScale, settledScale]);
  const phoneY = useTransform(intro, [0, .65, 1], [0, settledY, settledY]);
  const titleOpacity = useTransform(intro, [0, .2, .36], [1, 1, 0]);
  const titleY = useTransform(intro, [0, .4], ['0rem', '-5.3125rem']);
  const haloScale = useTransform(intro, [0, 1], [1, .65]);
  const chipOpacity = useTransform(intro, [0, .3, .55], [1, .25, 0]);
  useMotionValueEvent(progress, 'change', value => {
    setPastIntro(value > .07);
    setActiveChapter(chapters.reduce((active, chapter, index) => value >= chapter.start + .02 ? index : active, 0));
  });
  return <section ref={ref} className={`ng-cinema-hero ${cinematic ? 'ng-cinema-running' : 'ng-cinema-static'}`} aria-labelledby="hero-heading">
    <div className="ng-cinema-scene">
      <div className="ng-cinema-grid" aria-hidden="true" />
      <motion.div className="ng-cinema-halo" style={cinematic ? { scale: haloScale } : {}} aria-hidden="true" />
      <motion.div className="ng-cinema-copy" style={cinematic ? { opacity: titleOpacity, y: titleY, pointerEvents: pastIntro ? 'none' : 'auto' } : { opacity: 1, y: '0rem', pointerEvents: 'auto' }}>
        <motion.div initial={reduced ? false : {opacity:0,y:'1.125rem'}} animate={{opacity:1,y:'0rem'}} transition={{duration:reduced?0:.9,ease:landingEase}}>
          <div className="ng-mobile-hero-brand" aria-hidden="true"><img src="/landing/img/logo-nortgo.png" alt="" width="82" height="82" /><span><span className="ng-brand-nort">Nort</span><span className="ng-brand-go">Go</span></span></div>
          <h1 id="hero-heading">Foco no que importa.<br /><span>Vida organizada.</span></h1>
          <p>Agenda, tarefas, contas e hábitos.<br className="md:hidden" /> Sua vida em um só lugar.</p>
          <ul className="ng-mobile-hero-modules" aria-label="Áreas do NortGo">
            {heroModules.map(({ label, icon: Icon }) => <li key={label}>
              <span className="ng-mobile-module-icon"><Icon aria-hidden="true" strokeWidth={1.5} /></span>
              <span className="ng-mobile-module-label">{label}</span>
            </li>)}
          </ul>
          <div className="ng-cinema-actions" inert={cinematic && pastIntro ? '' : undefined} aria-hidden={cinematic && pastIntro ? true : undefined}><Action /></div>
        </motion.div>
      </motion.div>
      <div className="ng-cinema-device-position">
        <motion.div className="ng-cinema-device" style={cinematic ? {scale:phoneScale,y:phoneY} : {scale:1,y:0}}>
          {cinematic ? <Phone><div className="ng-cinema-screen-stack">
            {chapters.map((chapter, index) => <ChapterScreen key={chapter.image} chapter={chapter} progress={progress} active={activeChapter === index} />)}
          </div></Phone> : <Phone src="/landing/img/home.webp" alt="Tela real do NortGo com a visão de hoje, próximas ações e os seis módulos." priority />}
        </motion.div>
      </div>
      <motion.div className="ng-cinema-satellites" style={cinematic ? {opacity:chipOpacity} : {}} aria-hidden="true">
        <div className="ng-satellite ng-satellite-agenda"><span><CalendarDays size="1.4375rem"/></span><div><small>SEU TEMPO</small><b>Compromissos à vista.</b></div></div>
        <div className="ng-satellite ng-satellite-task"><span><CheckCheck size="1.4375rem"/></span><div><small>SEUS PRÓXIMOS PASSOS</small><b>Uma coisa de cada vez.</b></div></div>
        <div className="ng-satellite ng-satellite-wallet"><Wallet size="1.5625rem"/><small>CONTAS EM ORDEM</small></div>
      </motion.div>
      {cinematic && chapters.map((chapter, index) => <ChapterWords key={chapter.image} chapter={chapter} index={index} progress={progress} />)}
      <div className="ng-cinema-bottom"><a href="#recursos" aria-label="Continuar para conhecer o NortGo"><span>ROLE PARA DESCOBRIR</span></a></div>
    </div>
  </section>;
}
```

## src/landing/LandingIntegration.jsx

```jsx
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Reveal, Eyebrow } from './LandingPrimitives';
import { modules } from './LandingOverview';
import { useDesktopScene } from './motion';
const positions = [[18,25],[50,9],[82,25],[82,75],[50,91],[18,75]];
export default function LandingIntegration({ onSelectModule }) {
  const ref = useRef(null);
  const cinematic = useDesktopScene();
  const {scrollYProgress} = useScroll({target:ref,offset:['start end','center center']});
  const scale = useTransform(scrollYProgress,[0,1],[.76,1]);
  const rotate = useTransform(scrollYProgress,[0,1],[-8,0]);
  return <section id="integracao" ref={ref} className="ng-integration ng-integration-orbit" aria-labelledby="integration-heading"><div className="ng-container">
    <Reveal className="text-center"><div className="flex justify-center"><Eyebrow>AS PARTES DO SEU DIA. A MESMA EXPERIÊNCIA.</Eyebrow></div><h2 id="integration-heading" className="ng-heading mt-7">A vida se conecta.<br/><span className="text-landing-copper">Sua organização também.</span></h2><p className="ng-body mt-6 mx-auto max-w-lg">Sua agenda, suas contas e seus hábitos pertencem à mesma vida. Agora, também podem estar no mesmo lugar.</p></Reveal>
    <motion.div className="ng-orbit" style={cinematic?{scale,rotate}:{}}>
      <div className="ng-orbit-ring ng-orbit-ring-one" aria-hidden="true"/><div className="ng-orbit-ring ng-orbit-ring-two" aria-hidden="true"/><div className="ng-orbit-ring ng-orbit-ring-three" aria-hidden="true"/>
      <div className="ng-orbit-core"><img src="/landing/img/logo-nortgo.png" alt="Símbolo original NortGo" width="116" height="116"/><span>Seu norte.</span></div>
      {modules.map(({id,label,icon:Icon},i)=><a className="ng-orbit-module" key={id} href="#recursos" onClick={() => onSelectModule(i)} style={{'--orbit-x':`${positions[i][0]}%`,'--orbit-y':`${positions[i][1]}%`}}><span><Icon size={25} strokeWidth={1.4}/></span><b>{label}</b></a>)}
    </motion.div>
    <Reveal className="ng-orbit-statement"><span>Seis áreas da sua vida.</span><strong>Um lugar para seguir em frente.</strong></Reveal>
  </div></section>;
}
```

## src/landing/LandingNavigation.jsx

```jsx
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
```

## src/landing/LandingNotes.jsx

```jsx
import React from 'react';
import { ArrowRight, StickyNote, CheckCheck } from 'lucide-react';
import { Eyebrow, Reveal, Phone, SectionNumber } from './LandingPrimitives';

export default function LandingNotes() {
  return <section id="notas" className="ng-feature ng-notes"><div className="ng-container grid md:grid-cols-2 gap-12 lg:gap-24 items-center">
    <Reveal><div className="flex justify-between items-center"><Eyebrow>NOTAS</Eyebrow><SectionNumber>06 / 06</SectionNumber></div><h2 className="ng-heading mt-7">Uma ideia agora.<br /><span className="text-landing-copper">Um próximo<br />passo depois.</span></h2><p className="ng-body mt-7 max-w-md">Guarde informações importantes e encontre suas anotações no mesmo lugar. Quando fizer sentido, transforme uma nota em tarefa ou compromisso.</p><div className="ng-note-flow"><span><StickyNote size={18}/> Anotar</span><ArrowRight size={20}/><span><CheckCheck size={18}/> Fazer acontecer</span></div></Reveal>
    <Reveal className="ng-notes-visual"><Phone src="/landing/img/notas-original.webp" alt="Tela real de Notas do NortGo, com busca, lista de anotações e opção de criar nova nota."/><div className="ng-idea-slip"><small>PARA NÃO ESQUECER</small><p>Menos coisas na cabeça.<br />Mais espaço para viver.</p></div></Reveal>
  </div></section>;
}
```

## src/landing/LandingOverview.jsx

```jsx
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
  { label: 'Finanças', id: 'financas', icon: Wallet, sideLeft: 'Saiba para onde vai.', textLeft: 'Registre receitas e gastos por categoria para entender melhor seu dia a dia financeiro.', sideRight: 'Contas sob controle.', textRight: 'Acompanhe o que tem a pagar e a receber, com os vencimentos no mesmo lugar.', src: '/landing/img/financas.jpeg' },
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
        <motion.div className="ng-theater-wing ng-theater-wing-right" style={cinematic?{x:spreadRight,rotate:turnRight}: {}} aria-hidden="true"><Phone src="/landing/img/financas.jpeg" alt=""/></motion.div>
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
```

## src/landing/LandingPrimitives.jsx

```jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLandingMotion, revealVariants, landingEase } from './motion';

export function Brand({ large = false }) {
  return <Link to="/" className={`ng-brand ${large ? 'ng-brand-large' : ''}`} aria-label="NortGo — início">
    <img src="/landing/img/logo-nortgo.png" alt="" width="46" height="46" />
    <span><span className="ng-brand-nort">Nort</span><span className="ng-brand-go">Go</span></span>
  </Link>;
}
export function Action({ children = 'Começar agora', secondary = false, href, className = '' }) {
  const cls = `ng-button ${secondary ? 'ng-button-secondary' : 'ng-button-primary'} ${className}`;
  return href ? <a href={href} className={cls}>{children}</a>
    : <Link to="/register" className={cls}>{children}</Link>;
}
export function Reveal({ children, className = '', delay = 0, ...props }) {
  const reduced = useLandingMotion();
  return <motion.div className={className} initial={reduced ? false : 'hidden'} whileInView="visible"
    viewport={{ once: true, amount: 0.12 }} variants={revealVariants}
    transition={{ duration: reduced ? 0 : 0.8, delay: reduced ? 0 : delay, ease: landingEase }} {...props}>{children}</motion.div>;
}
export function Eyebrow({ children, light = false }) {
  return <p className={`ng-eyebrow ${light ? 'ng-eyebrow-dark' : ''}`}><span aria-hidden="true" />{children}</p>;
}
export const PHONE_ASPECT_RATIO = 78 / 163.4;

export function Phone({ src, alt, children, className = '', priority = false }) {
  const isWebp = src?.endsWith('.webp');
  return <div className={`ng-phone ng-phone-iphone ${className}`} data-device="iphone-17-pro-max">
    <div className="ng-phone-screen">
      <div className="ng-phone-content">
        {src ? <picture>{isWebp && <source srcSet={src} type="image/webp" />}<img src={isWebp ? src.replace('.webp', '.jpg') : src} alt={alt} width="379" height="752" loading={priority ? 'eager' : 'lazy'} decoding="async" /></picture> : children}
      </div>
      <span className="ng-phone-island" aria-hidden="true"><span /></span>
      <span className="ng-phone-home-indicator" aria-hidden="true" />
    </div>
    <div className="ng-phone-hardware" aria-hidden="true">
      <span className="ng-phone-action-button" />
      <span className="ng-phone-volume-up" />
      <span className="ng-phone-volume-down" />
      <span className="ng-phone-side-button" />
      <span className="ng-phone-camera-control" />
    </div>
  </div>;
}
export function SectionNumber({ children }) { return <span className="ng-section-number" aria-hidden="true">{children}</span>; }
```

## src/landing/LandingProblem.jsx

```jsx
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { CalendarDays, CheckCheck, Wallet, StickyNote, Repeat2 } from 'lucide-react';
import { Eyebrow, Reveal } from './LandingPrimitives';
import { useLandingMotion } from './motion';

const scattered = [
  { icon: CalendarDays, label: 'O compromisso de amanhã', cls: 'ng-fragment-one' },
  { icon: Wallet, label: 'A conta que vence hoje', cls: 'ng-fragment-two' },
  { icon: CheckCheck, label: 'A tarefa que ficou para depois', cls: 'ng-fragment-three' },
  { icon: StickyNote, label: 'A ideia que você ia anotar', cls: 'ng-fragment-four' },
  { icon: Repeat2, label: 'O hábito que quer retomar', cls: 'ng-fragment-five' },
];
export default function LandingProblem() {
  const ref = useRef(null);
  const reduced = useLandingMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const spread = useTransform(scrollYProgress, [0, .6, 1], [1.08, 1, .86]);
  return <section id="um-so-lugar" ref={ref} className="ng-problem">
    <div className="ng-container grid lg:grid-cols-2 items-center gap-10 lg:gap-16">
      <Reveal><Eyebrow>MENOS COISA NA CABEÇA</Eyebrow><h2 className="ng-heading mt-6">A vida já é cheia.<br /><span className="ng-dim">Sua cabeça<br />não precisa ser.</span></h2><p className="ng-body mt-7 max-w-md">Um compromisso na agenda. Uma conta na planilha. Uma ideia perdida nas mensagens. Lembrar de tudo também cansa.</p></Reveal>
      <motion.div className="ng-fragments" style={reduced ? {} : { scale: spread }} aria-label="Compromissos, contas, tarefas, ideias e hábitos espalhados">
        <div className="ng-fragments-center" aria-hidden="true"><span>Por onde<br />começar?</span></div>
        {scattered.map(({ icon: Icon, label, cls }) => <div key={label} className={`ng-fragment ${cls}`}><Icon size={19} strokeWidth={1.5} /><span>{label}</span></div>)}
      </motion.div>
    </div>
  </section>;
}
```

## src/landing/LandingRoutines.jsx

```jsx
import React from 'react';
import { Repeat2, ArrowDownRight } from 'lucide-react';
import { Eyebrow, Reveal, Phone, SectionNumber } from './LandingPrimitives';

export default function LandingRoutines() {
  return <section id="rotinas" className="ng-feature ng-routines"><div className="ng-container grid md:grid-cols-2 gap-12 lg:gap-24 items-center">
    <Reveal><div className="flex justify-between items-center"><Eyebrow>ROTINAS</Eyebrow><SectionNumber>03 / 06</SectionNumber></div><h2 className="ng-heading mt-7">O que importa<br /><span className="text-landing-copper">é o ritmo.</span></h2><p className="ng-body mt-7 max-w-md">Hábitos se constroem no dia a dia. Acompanhe sua constância, celebre os pequenos passos e retome sempre que precisar.</p><p className="ng-routine-quote">“Rotinas não vencem,<br />recomeçam.”</p><a href="#financas" className="ng-feature-next">Mais clareza também nas contas <ArrowDownRight size={18}/></a></Reveal>
    <Reveal className="ng-routine-visual"><div className="ng-rhythm" aria-hidden="true">{[22,38,29,57,47,70,60,88,76,98,84,112].map((h,i)=><i key={i} style={{height:h}}/>)}</div><Phone src="/landing/img/rotinas-original.webp" alt="Tela real de Rotinas do NortGo, com rotinas diárias, semanais e mensais e acompanhamento de conclusão."/><div className="ng-routine-note"><Repeat2 size={17}/><span>Hoje é um bom dia para continuar.</span></div></Reveal>
  </div></section>;
}
```

## src/landing/LandingTasks.jsx

```jsx
import React from 'react';
import { Check, ArrowDownRight } from 'lucide-react';
import { Eyebrow, Reveal, Phone, SectionNumber } from './LandingPrimitives';

export default function LandingTasks() {
  return <section id="tarefas" className="ng-feature ng-tasks"><div className="ng-container grid md:grid-cols-2 gap-12 lg:gap-24 items-center">
    <Reveal className="ng-task-visual md:order-first order-last"><Phone src="/landing/img/tarefas.webp" alt="Tela real de Tarefas do NortGo, com projetos, lista de tarefas e horários."/><div className="ng-done-tag"><span><Check size={20}/></span><div><small>UM PASSO A MENOS NA LISTA</small><strong>Enviar documento</strong></div></div></Reveal>
    <Reveal><div className="flex justify-between items-center"><Eyebrow>TAREFAS</Eyebrow><SectionNumber>02 / 06</SectionNumber></div><h2 className="ng-heading mt-7">Tire da cabeça.<br /><span className="text-landing-copper">Dê o próximo passo.</span></h2><p className="ng-body mt-7 max-w-md">Guarde o que precisa fazer, defina prazos e acompanhe o que falta. De pequenas pendências a tarefas importantes.</p><div className="ng-words-list"><span>Organizar.</span><span>Acompanhar.</span><span>Concluir.</span></div><a href="#rotinas" className="ng-feature-next">E aquilo que se repete? <ArrowDownRight size={18}/></a></Reveal>
  </div></section>;
}
```

## src/landing/ProductScreens.jsx

```jsx
import React from 'react';
import { CalendarDays, Check, Circle, Bell, Repeat2, StickyNote, Heart, Home, CheckCheck, Wallet, Droplet, Moon, Footprints, Utensils, ChevronRight } from 'lucide-react';

export function ScreenShell({ title, children, active }) {
  const nav = [[Home, 'Início'], [Repeat2, 'Rotinas'], [CalendarDays, 'Agenda'], [CheckCheck, 'Tarefas'], [StickyNote, 'Notas']];
  return <div className="ng-app-screen"><div className="ng-app-top"><span>9:41</span><span>● ▰</span></div><div className="ng-app-brand"><span className="ng-app-avatar">W</span><b><span>Nort</span>Go</b><Bell size={14} /></div><h3 className="ng-app-title">{title}</h3><div className="ng-app-content">{children}</div><div className="ng-app-nav">{nav.map(([Icon, label]) => <span key={label} className={active === label ? 'ng-app-active' : ''}><Icon size={17} strokeWidth={1.6} /><small>{label}</small></span>)}</div></div>;
}
export function DayScreen({ current = 0 }) {
  const rows = [{ color: 'ng-status-red', tag: 'ATRASADA', title: 'Enviar proposta', detail: 'Prazo: ontem' }, { color: 'ng-status-copper', tag: 'VENCE HOJE', title: 'Internet', detail: 'R$ 150,00' }, { color: 'ng-status-neutral', tag: 'COMPROMISSO', title: 'Dentista', detail: 'Hoje, às 14h' }];
  return <ScreenShell title="CENTRO DE AÇÃO" active="Início"><p className="ng-app-subtitle">O que precisa da sua atenção hoje.</p><div className="ng-app-summary"><span><b>3</b>prioridades</span><span><b className="ng-red">1</b>em atraso</span></div><div className="ng-day-rows">{rows.map((row, index) => <div key={row.title} className={`ng-app-row ${row.color} ${current === index ? 'ng-app-row-selected' : ''}`}><small>{row.tag}</small><strong>{row.title}</strong><p>{row.detail}</p><ChevronRight size={15} /></div>)}</div><div className="ng-app-inline"><CheckCheck size={14} /><span>Um passo de cada vez.</span></div></ScreenShell>;
}
export function TaskScreen() {
  return <ScreenShell title="TAREFAS" active="Tarefas"><div className="ng-app-tabs"><span className="ng-app-active">Hoje</span><span>Em andamento</span><span>Concluídas</span></div><div className="ng-app-card">{[{name:'Enviar documento',done:true,when:'Hoje'},{name:'Comprar ração',when:'Hoje'},{name:'Organizar a semana',when:'Amanhã'}].map(task => <div key={task.name} className={`ng-task-row ${task.done?'ng-task-done':''}`}>{task.done ? <span className="ng-check"><Check size={13} /></span> : <Circle size={20} />}<span><strong>{task.name}</strong><small>{task.when}</small></span></div>)}</div><div className="ng-app-new">+ Nova tarefa</div><p className="ng-app-subtitle">Mais espaço para o que vem depois.</p></ScreenShell>;
}
export function RoutineScreen() {
  const days = Array.from({ length: 28 }, (_, i) => i);
  const completed = new Set([0,1,2,4,5,7,8,9,10,12,13,14,15,17,18,19,20,21,22,23,24]);
  return <ScreenShell title="ROTINAS" active="Rotinas"><div className="ng-app-card"><div className="ng-app-card-heading"><b>DIÁRIAS</b><span>2 de 3</span></div>{['Beber água','Ler 15 minutos','Caminhar'].map((habit,i) => <div key={habit} className="ng-task-row">{i<2?<span className="ng-check"><Check size={13}/></span>:<Circle size={20}/>}<span><strong>{habit}</strong></span></div>)}</div><div className="ng-app-card"><div className="ng-app-card-heading"><b>SUA CONSTÂNCIA</b><span>Este mês</span></div><div className="ng-habit-days">{'STQQSSD'.split('').map((d,i)=><small key={i}>{d}</small>)}{days.map(d=><i className={completed.has(d)?'ng-habit-filled':''} key={d}/>)}</div></div><div className="ng-app-new">+ Nova rotina</div></ScreenShell>;
}
export function HealthScreen() {
  return <ScreenShell title="SAÚDE" active=""><p className="ng-app-subtitle">Pequenos cuidados. Todos os dias.</p><div className="ng-health-water"><div className="flex items-center gap-2"><Droplet size={20}/><strong>Água</strong></div><p><b>4</b> de 8 copos</p><div className="ng-water-drops">{Array.from({length:8},(_,i)=><Droplet key={i} size={15} fill={i<4?'currentColor':'none'} className={i<4?'':'ng-dim'}/>)}</div></div>{[[Moon,'Sono','7h30 registradas'],[Utensils,'Alimentação','Registro do dia'],[Footprints,'Atividade física','20 min de caminhada']].map(([Icon,label,value])=><div key={label} className="ng-health-row"><Icon size={20}/><span><strong>{label}</strong><small>{value}</small></span><ChevronRight size={13}/></div>)}<p className="ng-app-health-note"><Heart size={11}/> Acompanhamento pessoal</p></ScreenShell>;
}
export function NotesScreen() {
  return <ScreenShell title="NOTAS" active="Notas"><div className="ng-app-new">+ Nova nota</div><div className="ng-app-card">{['Ideias para a semana','Lista do mercado','Reunião do projeto'].map((note,i)=><div className="ng-notes-row" key={note}><strong>{note}</strong><small>{i===0?'Hoje':'Ontem'}</small></div>)}</div><div className="ng-app-card ng-note-open"><span className="ng-app-label">UMA IDEIA, UM PRÓXIMO PASSO</span><h4>Marcar dentista</h4><p>Ligar para a clínica e ver os horários da próxima semana.</p><div className="ng-note-convert"><CheckCheck size={12}/> Transformar em tarefa</div></div></ScreenShell>;
}
```

## src/landing/cinematic.css

```css
/* Product scenes: isolated to the NortGo landing. No global theme changes. */
.nortgo-landing { --ng-halo: #d8793e; --ng-title-size: clamp(4rem,calc(6.7 * var(--ng-vw)),6.5625rem); }
.ng-header { border: 0; padding-top: 1.625rem; }
.ng-header > .ng-container { padding: 0.75rem 1.125rem; border: 0; border-radius: 1rem; background: #10100f91; backdrop-filter: blur(1.25rem); }
.ng-header .ng-nav-cta { background: #f0d4bb; color: #3d2517; border-color: #f4dbc6; border-radius: 62.4375rem; font-weight: 600; }
.ng-button { border-radius: 62.4375rem; }
.ng-button-primary { background: linear-gradient(145deg,#c76c33,#a8491f); box-shadow: 0 0.125rem 0 #f4b08130 inset,0 0.625rem 2.1875rem #b95c2626; }
.ng-phone { border-color: #8a7b6d; background: linear-gradient(125deg,#ac9380,#332a23 15%,#080808 50%,#807365); box-shadow: 0 2.1875rem 4.375rem -1.5625rem #000b,0 0 0 0.125rem #2b251f,inset 0 0 0 0.125rem #080808; }
.ng-cinema-hero { position: relative; background: #080908; }
.ng-cinema-running { height: 700svh; }
.ng-cinema-scene { position: relative; isolation: isolate; overflow: hidden; min-height: 53.125rem; height: 100svh; }
.ng-cinema-running .ng-cinema-scene { position: sticky; top: 0; height: 100svh; min-height: 0; }
.ng-cinema-running .ng-cinema-device-position { top: max(32.1875rem,52svh); }
.ng-cinema-grid { position: absolute; inset: 0; background-image: linear-gradient(#e6b08608 0.0625rem,transparent 0.0625rem),linear-gradient(90deg,#e6b08608 0.0625rem,transparent 0.0625rem); background-size: 6.875rem 6.875rem; mask-image: radial-gradient(ellipse at 50% 65%,#0009,transparent 68%); z-index: -2; }
.ng-cinema-halo { position: absolute; width: 75rem; height: 62.5rem; left: calc(50% - 37.5rem); top: 12.5rem; background: radial-gradient(ellipse at 50% 50%,#eea56b90 0%,#c5633248 14%,#a8451c1f 32%,transparent 60%); filter: blur(1.125rem); z-index: -1; }
.ng-cinema-halo::after { content: ''; position: absolute; width: 34.375rem; height: 34.375rem; left: 20.3125rem; top: 13.125rem; border-radius: 50%; border: 0.0625rem solid #dda46d45; box-shadow: 0 0 5.625rem #e39c6630, inset 0 0 5.625rem #e39c661a; }
.ng-cinema-copy { position: absolute; top: clamp(9.0625rem,15svh,11.5625rem); left: 1.5rem; right: 1.5rem; text-align: center; z-index: 5; }
.ng-cinema-copy .ng-eyebrow { justify-content: center; font-size: 0.5625rem; letter-spacing: .22em; }
.ng-cinema-copy h1 { margin: 1.4375rem auto 0; font-size: var(--ng-title-size); line-height: .99; letter-spacing: -.065em; font-weight: 500; }
.ng-cinema-copy h1 span { color: #edb189; }
.ng-mobile-hero-brand { display: none; }
.ng-mobile-hero-modules { display: none; }
.ng-cinema-copy p { color: #b6aaa0; font-size: 0.875rem; margin-top: 1.25rem; }
.ng-cinema-actions { display: flex; flex-wrap: wrap; justify-content: center; gap: 0.75rem; margin-top: 1.5625rem; }
.ng-cinema-device-position { position: absolute; top: max(32.1875rem,52svh); left: calc(50% - 10.9375rem); width: 21.875rem; perspective: 81.25rem; z-index: 3; }
.ng-cinema-device { transform-origin: top center; }
.ng-cinema-device .ng-phone { width: 21.875rem; border-radius: 3rem; padding: 0.625rem; box-shadow: 0 0 0.25rem #fcd8b0,0 0 1.5625rem #e598585a,0 0 6.875rem #bf5e343f,0 2.5rem 5rem #000b; }
.ng-cinema-device .ng-phone-screen { border-radius: 2.375rem; }
.ng-cinema-screen-stack { position: relative; width: 100%; height: 100%; }
.ng-cinema-screen-layer { position: absolute; inset: 0; background: #000; }
.ng-cinema-screen-layer picture,.ng-cinema-screen-layer img { display: block; width: 100%; height: 100%; object-fit: cover; }
.ng-cinema-screen-finance img { object-fit: contain; }
.ng-cinema-chapter-words > span { font-size: clamp(2.75rem,calc(5.3 * var(--ng-vw)),4.75rem); width: calc(50% - 14.375rem); max-width: 23.125rem; line-height: 1.08; }
.ng-cinema-chapter-words .ng-cinema-word-one { text-align: right; }
.ng-cinema-device::after { content: ''; position: absolute; inset: -0.125rem; border-radius: 3rem; pointer-events: none; background: linear-gradient(125deg,#ffefd920,transparent 30%); }
.ng-cinema-satellites { position: absolute; inset: 0; pointer-events: none; z-index: 4; }
.ng-satellite { position: absolute; display: flex; align-items: center; gap: 0.9375rem; background: linear-gradient(140deg,#7b563945,#18130fea); border: 0.0625rem solid #ca926453; box-shadow: 0 1.5rem 4.0625rem #0007,inset 0 0.0625rem #ffe1b712; color: #edbb90; padding: 1.1875rem 1.4375rem; border-radius: 1.0625rem; backdrop-filter: blur(0.9375rem); }
.ng-satellite > span { padding: 0.625rem; border: 0.0625rem solid #bc885342; border-radius: 0.75rem; background: #c0793020; }
.ng-satellite small { display: block; font-size: 0.4375rem; letter-spacing: .15em; color: #c89b76; }
.ng-satellite b { font-size: 0.6875rem; font-weight: 400; display: block; margin-top: 0.3125rem; color: #e9d7c5; }
.ng-satellite-agenda { left: max(6%,calc(50% - 33.125rem)); top: 63%; rotate: -9deg; }
.ng-satellite-task { right: max(6%,calc(50% - 33.125rem)); top: 74%; rotate: 8deg; }
.ng-satellite-wallet { left: calc(50% + 15.625rem); top: 54%; flex-direction: column; gap: 0.9375rem; padding: 1.375rem; rotate: -12deg; }
.ng-cinema-words { position: absolute; inset: 0; pointer-events: none; z-index: 4; }
.ng-cinema-words > span { position: absolute; font-size: clamp(2.75rem,calc(5.3 * var(--ng-vw)),4.75rem); font-weight: 400; letter-spacing: -.065em; }
.ng-cinema-words > .ng-cinema-word-compact { font-size: clamp(2.9375rem,calc(5.3 * var(--ng-vw)),4.75rem); }
.ng-cinema-word-one { right: calc(50% + 14.6875rem); top: 39%; }
.ng-cinema-word-two { left: calc(50% + 13.125rem); top: 57%; color: #ebb18a; }
.ng-cinema-words .ng-cinema-word-three { bottom: 10%; left: 0; right: 0; text-align: center; font-size: 2.0625rem; color: #bfa58f; }
.ng-cinema-mobile-label { display: none; }
.ng-cinema-bottom { position: absolute; left: 3rem; right: 3rem; bottom: 1.75rem; display: flex; align-items: center; justify-content: center; z-index: 6; color: #b89d88; font-size: 0.4375rem; letter-spacing: .16em; }
.ng-cinema-bottom a { display: flex; align-items: center; gap: 0.9375rem; }
.ng-cinema-static .ng-cinema-scene { height: 78.125rem; }
.ng-cinema-static .ng-cinema-device-position { top: 32.1875rem; }
.ng-cinema-static .ng-satellite-agenda { top: 58%; }
.ng-cinema-static .ng-satellite-task { top: 71%; }
.ng-cinema-static .ng-satellite-wallet { top: 43%; }
.ng-problem { position: relative; padding-top: 9.375rem; background: radial-gradient(ellipse at 70% 10%,#7550320c,transparent 60%),#080908; }
.ng-problem::after { content: ''; position: absolute; bottom: 0; left: 15%; right: 15%; height: 0.0625rem; background: linear-gradient(90deg,transparent,#b78c5740,transparent); }
.ng-problem .ng-heading { font-size: clamp(3rem,calc(5.1 * var(--ng-vw)),4.75rem); }
.ng-fragments-center { color: #c7aa92; }
.ng-fragment { border-color: #b98b5340; background: linear-gradient(125deg,#30291f,#11110f); }

.ng-product-theater { position: relative; isolation: isolate; padding: 7.5rem 0 4.0625rem; background: #0a0b0a; overflow: hidden; }
.ng-theater-heading { text-align: center; }
.ng-theater-heading .ng-eyebrow { justify-content: center; }
.ng-theater-heading .ng-heading { font-size: var(--ng-title-size); margin-top: 1.5rem; line-height: .97; }
.ng-theater-heading .ng-body { margin-top: 1.5rem; }
.ng-theater-grid { position: absolute; inset: 32% -20% -30%; z-index: -1; background: linear-gradient(#deb1840c 0.0625rem,transparent 0.0625rem),linear-gradient(90deg,#deb1840c 0.0625rem,transparent 0.0625rem); background-size: 5.3125rem 5.3125rem; transform: perspective(40.625rem) rotateX(53deg); transform-origin: center; mask-image: radial-gradient(ellipse,#000,transparent 65%); }
.ng-module-tabs { position: relative; z-index: 8; width: fit-content; max-width: 100%; margin: 2.625rem auto 0; display: flex; gap: 0.3125rem; padding: 0.4375rem; border: 0.0625rem solid #8b684633; border-radius: 3.125rem; background: #161613; }
.ng-module-tabs button { padding: 0.8125rem 1.25rem; display: flex; align-items: center; justify-content: center; gap: 0.5625rem; font-size: 0.6875rem; color: #b5a99b; border-radius: 1.875rem; transition: color .2s,background .2s; min-height: 2.75rem; }
.ng-module-tabs button[aria-selected="true"] { background: #e6bd96; color: #392517; box-shadow: 0 0 1.25rem #bd713026; }
.ng-module-tabs button:hover { color: #f7ddc7; background: #3a2b1f; }
.ng-module-tabs button[aria-selected="true"]:hover { background: #f2cda9; color: #392517; }
.ng-theater-stage { position: relative; height: 40.625rem; max-width: 65.625rem; margin: 3.4375rem auto 0; perspective: 87.5rem; }
.ng-theater-floor { position: absolute; top: 4.375rem; left: 8%; right: 8%; height: 30rem; border-radius: 50%; background: radial-gradient(ellipse,#c2814233,transparent 65%); filter: blur(1.5625rem); }
.ng-theater-main { position: absolute; top: 0; left: calc(50% - 8.9375rem); z-index: 4; }
.ng-theater-main .ng-phone { box-shadow: 0 0 0.125rem #edbc88,0 0 2.8125rem #c57b3d25,0 2.1875rem 5rem #000d; }
.ng-theater-main [role="tabpanel"]:focus-visible { outline: 0.125rem solid #e2b182; outline-offset: 0.75rem; border-radius: 2.375rem; }
.ng-theater-wing { position: absolute; left: calc(50% - 7.8125rem); top: 4.375rem; opacity: .38; z-index: 2; filter: blur(0.0625rem) brightness(.72); }
.ng-theater-wing .ng-phone { width: 15.625rem; }
.ng-theater-wing-left { transform: translateX(-17.8125rem) rotate(-15deg); }
.ng-theater-wing-right { transform: translateX(17.8125rem) rotate(15deg); }
.ng-theater-explanations { display: contents; }
.ng-theater-description-mobile { display: none; }
.ng-theater-side-note { position: absolute; top: 50%; translate: 0 -50%; isolation: isolate; z-index: 5; width: 14.0625rem; max-width: 25%; font-weight: 400; }
.ng-theater-side-note::before { content: ''; position: absolute; inset: -2.8125rem -1.875rem; z-index: -1; pointer-events: none; background: radial-gradient(ellipse, #0b0b0df2 25%, #0b0b0db3 55%, transparent 75%); }
.ng-theater-side-note h3 { font-size: 1.5625rem; font-weight: 300; line-height: 1.18; letter-spacing: -.025em; color: #edaa7e; text-wrap: balance; }
.ng-theater-side-note p { margin-top: 0.875rem; font-size: 0.875rem; font-weight: 300; line-height: 1.65; color: #d7bca7; text-wrap: pretty; }
.ng-theater-note-left { left: 0.5625rem; text-align: right; }
.ng-theater-note-right { right: 0.5625rem; text-align: left; }
.ng-theater-caption { border-top: 0.0625rem solid #b68b5533; padding: 1.6875rem 0 0; display: flex; justify-content: space-between; gap: 1.5625rem; font-size: 0.75rem; color: #bfb2a4; }
.ng-theater-caption a { display: flex; align-items: center; gap: 0.9375rem; color: #e7b288; }

.ng-day { background: #eee9e0; color: #201e1a; }
.ng-day .ng-eyebrow { color: #8d542f; }
.ng-day .text-landing-copper { color: #a6572b; }
.ng-day .ng-body { color: #706960; }
.ng-day-step { border-color: #bba78f; opacity: .55; }
.ng-day-step p { color: #746b61; }
.ng-day-step > span { color: #a6572b; }
.ng-day-step-active { opacity: 1; border-color: #ab592c; }
.ng-day-glow { inset: -1.875rem -12%; border-radius: 50%; background: radial-gradient(ellipse,#f4c49890,transparent 67%); }
.ng-day-visual .ng-phone { box-shadow: 0 2.1875rem 4.0625rem #694c3535; }
.ng-visual-caption { color: #8c6b4e; }
.ng-agenda { background: #eee9e0; padding-top: 2.1875rem; }
.ng-agenda > .ng-container { padding: 5.3125rem 3.75rem; background: #ded4c580; border-radius: 1.875rem; border: 0.0625rem solid #cab59a60; position: relative; overflow: hidden; }
.ng-agenda .ng-heading { font-size: clamp(2.5rem,calc(4 * var(--ng-vw)),3.75rem); }
.ng-agenda-visual { isolation: isolate; }
.ng-agenda-visual::before { content: ''; position: absolute; width: 40.625rem; height: 28.125rem; z-index: -1; background: linear-gradient(150deg,transparent 40%,#fff6 40%,#fff1 75%,transparent 75%); rotate: -8deg; bottom: -2.1875rem; }
.ng-tasks { background: radial-gradient(ellipse at 25% 45%,#70431c2e,transparent 48%),#0b0c0a; }
.ng-tasks .ng-words-list { flex-direction: column; gap: 0.1875rem; font-size: 1.5625rem; font-weight: 400; letter-spacing: -.045em; margin-top: 1.625rem; }
.ng-task-visual { perspective: 81.25rem; }
.ng-task-visual .ng-phone { transform: rotateY(12deg); }
.ng-routines { background: radial-gradient(ellipse at 75% 80%,#86633525,transparent 60%),#12130f; }
.ng-rhythm { opacity: .24; gap: 0.9375rem; bottom: 4.375rem; }
.ng-rhythm i { background: linear-gradient(#d0a260,#3e3625); border: 0.0625rem solid #c7964940; border-radius: 0.9375rem; }
.ng-finances { background: #efeae1; }
.ng-finance-composition { padding: 4.0625rem 2.8125rem; background: linear-gradient(158deg,#20231e 0%,#20231e 48%,#d6c5b0 48.1%,#e9dfd2 100%); border: 0.0625rem solid #d0c1af; border-radius: 1.75rem; position: relative; overflow: hidden; }
.ng-finance-side:first-child .ng-body { color: #d9d3c8; }
.ng-finance-side:first-child .ng-finance-amount { color: #b88855; border-color: #bba78f45; }
.ng-finance-side:first-child .ng-finance-amount b { color: #d3b996; }
.ng-finance-side:first-child .ng-finance-amount p { color: #ad967b; }
.ng-health { background: radial-gradient(ellipse at 28% 65%,#57776123,transparent 55%),#101411; }
.ng-notes { background: radial-gradient(ellipse at 80% 50%,#75563528,transparent 45%),#0f100e; }

.ng-integration-orbit { background: #0a0c0a; padding: 8.4375rem 0 4.375rem; }
.ng-integration-orbit .ng-heading { font-size: clamp(2.8125rem,calc(5.5 * var(--ng-vw)),4.9375rem); }
.ng-orbit { position: relative; max-width: 62.5rem; height: 38.125rem; margin: 1.875rem auto 0; }
.ng-orbit::before { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse,#bf804d2b,transparent 63%); }
.ng-orbit-ring { position: absolute; width: 69%; height: 57%; top: 21.5%; left: 15.5%; border: 0.0625rem solid #bd976036; border-radius: 50%; }
.ng-orbit-ring-one { rotate: -28deg; }
.ng-orbit-ring-two { rotate: 28deg; }
.ng-orbit-ring-three { width: 44%; height: 78%; top: 11%; left: 28%; border-style: dashed; border-color: #bf925328; }
.ng-orbit-core { position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%); width: 10.625rem; height: 10.625rem; display: flex; flex-direction: column; align-items: center; justify-content: center; background: radial-gradient(circle at 35% 25%,#493322,#13120e 75%); border: 0.0625rem solid #ac805d6b; border-radius: 50%; box-shadow: 0 0 6.25rem #c67d3533,inset 0 0 1.875rem #bf78431f; }
.ng-orbit-core img { width: 5.3125rem; height: 5.3125rem; }
.ng-orbit-core span { font-size: 0.625rem; color: #bca18a; margin-top: 0.5625rem; }
.ng-orbit-module { position: absolute; left: var(--orbit-x); top: var(--orbit-y); transform: translate(-50%,-50%); display: flex; align-items: center; gap: 0.875rem; padding: 1rem 1.3125rem; border: 0.0625rem solid #cfa47135; border-radius: 1rem; background: linear-gradient(125deg,#30271d,#151611); box-shadow: 0 1.25rem 2.5rem #0005,inset 0 0.0625rem #e7c09112; transition: background .25s,box-shadow .25s; }
.ng-orbit-module span { display: flex; color: #c5a176; }
.ng-orbit-module b { font-size: 0.75rem; font-weight: 400; color: #dccdbb; }
.ng-orbit-module:hover { background: #3b2b1c; box-shadow: 0 0 1.5625rem #c78d3330; }
.ng-orbit-statement { display: flex; justify-content: space-between; gap: 1.5625rem; border-top: 0.0625rem solid #b68b552e; padding-top: 1.875rem; font-size: 0.75rem; color: #9a8b79; }
.ng-orbit-statement strong { color: #c5ab8e; font-weight: 400; }
.ng-finale { position: relative; padding: 7.1875rem 0 0; background: linear-gradient(#f5f0e8 0%,#f1ddc1 58%,#b7753f 100%); overflow: hidden; }
.ng-finale-copy { text-align: center; position: relative; z-index: 4; }
.ng-finale-copy .ng-eyebrow { justify-content: center; }
.ng-finale-copy h2 { margin-top: 0; font-size: var(--ng-title-size); font-weight: 500; letter-spacing: -.07em; line-height: .99; }
.ng-finale-copy h2 > span { color: #a76638; }
.ng-finale-copy > p { font-size: 0.875rem; color: #8a715b; margin-top: 1.5rem; }
.ng-finale-copy .ng-button { margin-top: 1.75rem; }
.ng-finale-stage { height: 30.625rem; max-width: 62.5rem; margin: 2.8125rem auto 0; position: relative; }
.ng-finale-phone { position: absolute; left: calc(50% - 9.5rem); top: 1.25rem; }
.ng-finale-phone .ng-phone { width: 19rem; box-shadow: 0 1.5625rem 4.0625rem #71421470; }
.ng-finale-sun { position: absolute; width: 40.625rem; height: 37.5rem; top: -0.625rem; left: calc(50% - 20.3125rem); border-radius: 50%; border: 0.0625rem solid #ffffec50; box-shadow: 0 0 0 3.4375rem #ffefd814,0 0 0 6.875rem #ffefd80d; background: radial-gradient(ellipse at 50% 25%,#fff4d570,transparent 65%); }
.ng-finale-token { position: absolute; display: grid; place-items: center; color: #744822; border: 0.0625rem solid #f3d8b5; background: linear-gradient(135deg,#f7dfbd,#b98047); box-shadow: 0 1.5625rem 2.5rem #75432133,inset 0 0.0625rem #fff5; width: 5.1875rem; height: 5.1875rem; border-radius: 1.5625rem; }
.ng-finale-token-one { left: 17%; top: 5rem; rotate: -19deg; }
.ng-finale-token-two { right: 13%; top: 13.4375rem; rotate: 16deg; }
.ng-finale-token-three { right: 23%; top: 0.9375rem; rotate: -12deg; width: 3.875rem; height: 3.875rem; border-radius: 1.25rem; }
.ng-finale-word-one,.ng-finale-word-two { position: absolute; font-size: 2.25rem; letter-spacing: -.05em; color: #6d4429; }
.ng-finale-word-one { top: 15.9375rem; left: 5%; rotate: -5deg; }
.ng-finale-word-two { top: 6.875rem; right: 2%; rotate: 5deg; }
.ng-footer { position: relative; border-radius: 1.5625rem 1.5625rem 0 0; margin-top: -1.25rem; border-top: 0.0625rem solid #6c513d; z-index: 5; }

@media (max-width: 1100px) {
  .nortgo-landing { --ng-title-size: 4.75rem; }
  .ng-cinema-copy h1 { font-size: var(--ng-title-size); } .ng-cinema-word-one { right: calc(50% + 10.625rem); } .ng-cinema-word-two { left: calc(50% + 10.625rem); }
  .ng-module-tabs button { padding: 0.75rem 0.9375rem; } .ng-theater-note-left { left: 0.75rem; } .ng-theater-note-right { right: 0.75rem; }
  .ng-agenda > .ng-container { padding: 3.4375rem 2.1875rem; } .ng-finance-composition { padding: 2.8125rem 1.875rem; gap: 1.75rem; }
}
@media (max-width: 1023px) {
  .nortgo-landing { --ng-title-size: 4.3125rem; }
  .ng-cinema-static .ng-cinema-scene { height: 75.625rem; } .ng-cinema-copy { top: 10rem; } .ng-cinema-copy h1 { font-size: var(--ng-title-size); } .ng-cinema-device-position { top: 31.875rem; }
  .ng-satellite-agenda { left: 2%; } .ng-satellite-task { right: 2%; } .ng-satellite-wallet { left: auto; right: 7%; }
  .ng-satellite { padding: 0.875rem; gap: 0.625rem; } .ng-satellite b { font-size: 0.5625rem; } .ng-satellite > span { padding: 0.5rem; }
  .ng-cinema-bottom { left: 1.75rem; right: 1.75rem; } .ng-cinema-bottom > span:last-child { display: none; }
  .ng-product-theater { padding-top: 5.625rem; } .ng-theater-wing-left { transform: translateX(-13.75rem) rotate(-15deg); } .ng-theater-wing-right { transform: translateX(13.75rem) rotate(15deg); } .ng-theater-wing { opacity: .27; } .ng-theater-side-note { max-width: 24%; } .ng-theater-side-note h3 { font-size: 1.3125rem; } .ng-theater-side-note p { font-size: 0.8125rem; }
  .ng-theater-note-left { left: 0.75rem; } .ng-theater-note-right { right: 0.75rem; }
  .ng-day .ng-day-sticky { padding-top: 5.625rem; padding-bottom: 5.625rem; } .ng-agenda { padding-top: 0; }
  .ng-finance-side-right .ng-finance-amount b,.ng-finance-side-right .ng-finance-terms p { color: #755539; }
  .ng-orbit { height: 34.375rem; } .ng-orbit-module { padding: 0.8125rem 1.0625rem; gap: 0.625rem; } .ng-orbit-core { width: 9.375rem; height: 9.375rem; }
  .ng-finale-word-one,.ng-finale-word-two { font-size: 1.625rem; } .ng-finale-token-one { left: 10%; } .ng-finale-token-two { right: 7%; } .ng-finale-token-three { right: 17%; }
}
@media (max-width: 767px) {
  .ng-cinema-desktop-label { display: none; }
  .ng-cinema-mobile-label { display: inline; }
  .nortgo-landing { --ng-title-size: clamp(2.4375rem,calc(10.3 * var(--ng-vw)),3.8125rem); }
  .ng-cinema-hero.ng-cinema-static {
    min-height: 100svh;
    background-color: #080908;
    background-image: linear-gradient(180deg, transparent 72%, #08090880 100%), url('/landing/img/amber-horizon-mobile.png');
    background-repeat: no-repeat;
    background-position: center, center top;
    /* Keep the image scale stable while browser bars change the section height. */
    background-size: cover, auto 145svh;
  }
  .ng-brand > span { display: none; }
  .ng-mobile-hero-brand { display: flex; flex-direction: column; align-items: center; gap: 0.4375rem; margin-bottom: 1.25rem; }
  .ng-mobile-hero-brand img { width: 4.375rem; height: 4.375rem; object-fit: contain; }
  .ng-mobile-hero-brand > span { font-size: 1.5625rem; line-height: 1; font-weight: 500; letter-spacing: -.05em; }
  .ng-header { padding-top: 0.875rem; } .ng-header > .ng-container { width: calc(100% - 1.5rem); padding: 0.625rem 0.75rem; border-radius: 0.8125rem; gap: 0.625rem; } .ng-header > .ng-container > div:last-child { gap: 0.8125rem; } .ng-header .ng-brand { font-size: 1.25rem; } .ng-header .ng-brand img { width: 1.8125rem; height: 1.8125rem; }
  .ng-cinema-static .ng-cinema-scene { height: auto; min-height: 38.75rem; }
  .ng-cinema-static .ng-cinema-device-position, .ng-cinema-static .ng-cinema-satellites { display: none; }
  .ng-cinema-static .ng-cinema-halo { display: none; }
  .ng-cinema-copy { top: 8.875rem; left: 1.0625rem; right: 1.0625rem; } .ng-cinema-copy h1 { font-size: var(--ng-title-size); line-height: 1.04; margin-top: 2rem; } .ng-cinema-copy .ng-eyebrow { font-size: 0.4375rem; letter-spacing: .18em; } .ng-cinema-copy p { font-size: 0.8125rem; margin-top: 2.25rem; } .ng-cinema-actions { gap: 0.5625rem; margin-top: 2.5rem; } .ng-cinema-actions .ng-button { padding: 0.8125rem 0.875rem; font-size: 0.6875rem; }
  .ng-cinema-static .ng-cinema-device-position { top: 30.625rem; left: calc(50% - 7.6875rem); width: 15.375rem; } .ng-cinema-device .ng-phone { width: 15.375rem; border-radius: 2.1875rem; padding: 0.5rem; } .ng-cinema-device .ng-phone-screen { border-radius: 1.6875rem; } .ng-cinema-device::after { border-radius: 2.1875rem; }
  .ng-cinema-halo { width: 43.75rem; height: 43.75rem; left: calc(50% - 21.875rem); top: 20.625rem; filter: blur(0.5rem); } .ng-cinema-halo::after { width: 23.125rem; height: 23.125rem; top: 6.25rem; left: 10.3125rem; }
  .ng-satellite-agenda { left: 0.5rem; top: 62% !important; rotate: -9deg; padding: 0.75rem; } .ng-satellite-task { right: 0.625rem; top: 82% !important; padding: 0.75rem; } .ng-satellite small { font-size: 0.3125rem; } .ng-satellite b { font-size: 0.5rem; } .ng-satellite > span { padding: 0.375rem; border-radius: 0.5rem; } .ng-satellite > span svg { width: 1.125rem; height: 1.125rem; } .ng-satellite-wallet { display: none; }
  .ng-cinema-bottom { left: 1.25rem; right: 1.25rem; bottom: 1.5rem; font-size: 0.375rem; } .ng-cinema-bottom a > span { display: none; }
  .ng-problem { padding-top: 5rem; } .ng-problem .ng-heading { font-size: 2.8125rem; }
  .ng-product-theater { padding: 5.3125rem 0 2.5rem; } .ng-theater-heading .ng-heading { font-size: var(--ng-title-size); } .ng-theater-heading .ng-body { font-size: 0.8125rem; }
  .ng-module-tabs { display: grid; grid-template-columns: repeat(3,1fr); gap: 0.3125rem; border-radius: 1.25rem; width: 100%; margin-top: 1.875rem; } .ng-module-tabs button { font-size: 0.625rem; padding: 0.625rem 0.4375rem; gap: 0.375rem; border-radius: 62.4375rem; }
  .ng-theater-stage { height: auto; padding-top: 36.875rem; margin-top: 2.3125rem; } .ng-theater-main { left: calc(50% - 8.9375rem); } .ng-theater-wing { top: 4.0625rem; opacity: .18; } .ng-theater-wing .ng-phone { width: 13.4375rem; } .ng-theater-wing-left { transform: translateX(-10.3125rem) rotate(-15deg); } .ng-theater-wing-right { transform: translateX(10.3125rem) rotate(15deg); }
  .ng-theater-explanations { display: flex; min-height: 16.875rem; padding: 1.25rem 0 2rem; }
  .ng-theater-side-note { position: relative; inset: auto; translate: none; width: 88%; max-width: 21.25rem; } .ng-theater-note-right { margin-left: auto; } .ng-theater-note-left { margin-right: auto; } .ng-theater-side-note::before { display: none; } .ng-theater-side-note h3 { font-size: 1.375rem; } .ng-theater-side-note p { font-size: 0.875rem; margin-top: 0.625rem; }
  .ng-theater-caption { flex-direction: column; align-items: center; gap: 0.875rem; font-size: 0.6875rem; padding-top: 1.4375rem; } .ng-theater-grid { inset: 30% -70% -10%; }
  .ng-day .ng-day-sticky { padding: 5rem 0; } .ng-day-step { opacity: 1; } .ng-day-glow { inset: 0 -12%; }
  .ng-agenda { padding-bottom: 4.0625rem; } .ng-agenda > .ng-container { padding: 2.8125rem 1.4375rem 2.5rem; border-radius: 1.4375rem; gap: 2.1875rem; } .ng-agenda .ng-heading { font-size: 2.25rem; } .ng-agenda .ng-body { font-size: 0.8125rem; } .ng-agenda .ng-detail-line { font-size: 0.625rem; } .ng-agenda .ng-phone { width: 14.9375rem; } .ng-agenda-label { min-width: 12.8125rem; padding: 1rem; } .ng-date-display { left: -0.4375rem; } .ng-date-display > span { font-size: 6.875rem; }
  .ng-tasks .ng-words-list { flex-direction: row; font-size: 1rem; gap: 0.8125rem; } .ng-tasks .ng-task-visual .ng-phone { transform: none; }
  .ng-finance-composition { padding: 1.875rem 1.4375rem; margin-top: 2.1875rem; background: linear-gradient(158deg,#20231e 0%,#20231e 47%,#d6c5b0 47.1%,#e9dfd2 100%); border-radius: 1.375rem; } .ng-finance-composition .ng-phone { width: 16.25rem; } .ng-finance-side-right { gap: 0.9375rem; } .ng-finance-terms p { font-size: 0.6875rem; } .ng-finance-amount b { font-size: 0.6875rem; } .ng-finance-side:first-child .ng-body { font-size: 0.8125rem; }
  .ng-integration-orbit { padding: 5.3125rem 0 2.8125rem; } .ng-integration-orbit .ng-heading { font-size: 2.4375rem; } .ng-integration-orbit .ng-eyebrow { font-size: 0.4375rem; } .ng-orbit { height: 30rem; margin-top: 1.875rem; margin-inline: -0.3125rem; } .ng-orbit-module { flex-direction: column; gap: 0.5rem; padding: 0.6875rem 0.8125rem; border-radius: 0.875rem; min-width: 4.8125rem; } .ng-orbit-module svg { width: 1.3125rem; height: 1.3125rem; } .ng-orbit-module b { font-size: 0.5625rem; } .ng-orbit-core { width: 7rem; height: 7rem; } .ng-orbit-core img { width: 3.75rem; height: 3.75rem; } .ng-orbit-core span { margin-top: 0.25rem; font-size: 0.5rem; } .ng-orbit-ring { width: 82%; left: 9%; } .ng-orbit-ring-three { width: 50%; left: 25%; } .ng-orbit-statement { flex-direction: column; gap: 0.625rem; text-align: center; font-size: 0.625rem; }
  .ng-finale { padding-top: 5rem; } .ng-finale-copy h2 { font-size: var(--ng-title-size); line-height: 1.02; } .ng-finale-copy .ng-eyebrow { font-size: 0.4375rem; } .ng-finale-copy > p { font-size: 0.75rem; } .ng-finale-stage { height: 24.0625rem; margin-top: 2.5rem; } .ng-finale-phone { left: calc(50% - 7.5rem); top: 1.5625rem; } .ng-finale-phone .ng-phone { width: 15rem; } .ng-finale-sun { width: 26.25rem; left: calc(50% - 13.125rem); height: 26.875rem; } .ng-finale-token { width: 3.5625rem; height: 3.5625rem; border-radius: 1.125rem; } .ng-finale-token svg { width: 1.375rem; height: 1.375rem; } .ng-finale-token-one { left: -0.375rem; top: 5.625rem; } .ng-finale-token-two { right: -0.4375rem; top: 14.6875rem; } .ng-finale-token-three { right: 5%; top: -0.9375rem; width: 3rem; height: 3rem; } .ng-finale-word-one,.ng-finale-word-two { display: none; }
}
@media (prefers-reduced-motion: reduce) { .nortgo-landing .ng-module-tabs button,.nortgo-landing .ng-orbit-module { transition: none; } }
@media (min-width: 1024px) and (max-height: 899px) { .ng-cinema-words .ng-cinema-word-three { display: none; } }
@media (min-width: 768px) and (max-width: 900px) {
  .ng-finance-side-right { padding: 1.375rem; background: #e7daca; border-radius: 0.9375rem; margin-inline: -0.625rem; }
}
@media (max-width: 1023px) {
  .ng-cinema-running .ng-cinema-words > span { font-size: clamp(1.875rem,calc(5.5 * var(--ng-vw)),3.25rem); }
  .ng-cinema-running .ng-cinema-words > .ng-cinema-word-compact { font-size: clamp(1.6875rem,calc(5 * var(--ng-vw)),2.8125rem); }
  .ng-cinema-running .ng-cinema-word-one { right: calc(50% + 9.6875rem); }
  .ng-cinema-running .ng-cinema-word-two { left: calc(50% + 9.6875rem); }
  .ng-cinema-running .ng-cinema-chapter-words > span { width: calc(50% - 11.25rem); }
  .ng-cinema-running .ng-cinema-word-three { font-size: 1.5625rem; }
}
@media (max-width: 767px) {
  .ng-cinema-running .ng-cinema-device-position { top: max(30.625rem,52svh); left: calc(50% - 7.6875rem); width: 15.375rem; }
  .ng-cinema-running .ng-cinema-word-one { right: calc(50% + 6.75rem); }
  .ng-cinema-running .ng-cinema-word-two { left: calc(50% + 6.75rem); }
  .ng-cinema-running .ng-cinema-words > span { font-size: clamp(1.0625rem,calc(4.6 * var(--ng-vw)),1.875rem); }
  .ng-cinema-running .ng-cinema-words > .ng-cinema-word-compact { font-size: clamp(1rem,calc(4 * var(--ng-vw)),1.625rem); }
  .ng-cinema-running .ng-cinema-chapter-words > span { width: calc(50% - 7.375rem); }
  .ng-cinema-running .ng-cinema-word-three { font-size: 1.4375rem; }
}
@media (max-height: 599px) { .ng-cinema-running .ng-cinema-word-three { display: none; } }

/* Longer chapter phrases share the same margins around the stationary phone. */
.ng-cinema-running .ng-cinema-chapter-words > span { font-size: clamp(1.75rem, calc(4 * var(--ng-vw)), 3.625rem); text-wrap: balance; overflow-wrap: break-word; }
.ng-cinema-chapter-number { display: block; margin-top: 1.125rem; font-size: 0.75rem; line-height: 1.4; letter-spacing: .18em; color: #bfa58f; }
@media (max-width: 1023px) {
  .ng-cinema-running .ng-cinema-chapter-words > span { font-size: clamp(1.375rem, calc(3.5 * var(--ng-vw)), 2.25rem); }
}
@media (max-width: 767px) {
  .ng-cinema-running .ng-cinema-chapter-words > span { font-size: clamp(0.75rem, calc(3.6 * var(--ng-vw)), 1.4375rem); line-height: 1.2; }
  .ng-cinema-chapter-number { font-size: 0.625rem; margin-top: 0.75rem; }
}

/* Compact mobile product explorer: explanation, device, then module controls. */
@media (max-width: 767px) {
  .ng-product-theater { padding: 1.875rem 0 1.5rem; }
  .ng-product-theater > .ng-container { display: flex; flex-direction: column; }
  .ng-theater-heading { order: 0; }
  .ng-theater-heading .ng-heading { margin-top: 0; }
  .ng-theater-stage { order: 1; display: flex; flex-direction: column; align-items: center; gap: 0.75rem; height: auto; width: 100%; padding: 0; margin-top: 1rem; perspective: none; }
  .ng-theater-explanations { order: -1; display: flex; align-items: center; justify-content: center; min-height: 4.875rem; width: 100%; padding: 0; }
  .ng-theater-side-note { position: relative; inset: auto; translate: none; width: 100%; max-width: 21.25rem; margin: 0; text-align: center; }
  .ng-theater-side-note h3 { font-size: 1.1875rem; line-height: 1.2; }
  .ng-theater-side-note p { margin-top: 0.375rem; font-size: 0.75rem; line-height: 1.45; }
  .ng-theater-description-full { display: none; }
  .ng-theater-description-mobile { display: block; }
  .ng-theater-main { position: relative; inset: auto; }
  .ng-theater-main .ng-phone { width: clamp(7.8125rem, calc((100svh - 22.1875rem) / 2), 11.875rem); padding: 0.3125rem; border-radius: 1.6875rem; }
  .ng-theater-main .ng-phone-screen { border-radius: 1.3125rem; }
  .ng-theater-main .ng-phone-speaker { top: 0.5rem; width: 1.5625rem; left: calc(50% - 0.78125rem); height: 0.125rem; }
  .ng-theater-wing { display: none; }
  .ng-theater-floor { inset: 5rem 5% 0; height: auto; }
  .ng-module-tabs { order: 2; display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); width: 100%; max-width: 22.5rem; gap: 0.1875rem; margin: 0.875rem auto 0; padding: 0.25rem; border-radius: 1.125rem; }
  .ng-module-tabs button { min-height: 2.5rem; padding: 0.375rem 0.1875rem; gap: 0.25rem; font-size: 0.625rem; }
  .ng-module-tabs button svg { width: 0.8125rem; height: 0.8125rem; flex-shrink: 0; }
}
/* Main landing sections fill at least the visible mobile viewport height. */
@media (max-width: 767px) {
  .ng-mobile-hero-modules { display: grid; grid-template-columns: repeat(6, minmax(0, 1fr)); gap: 0.625rem; width: min(100%, 24rem); margin: 1.875rem auto 0; padding: 0; list-style: none; }
  .ng-mobile-hero-modules li { display: flex; flex-direction: column; align-items: center; gap: 0.5rem; min-width: 0; }
  .ng-mobile-module-icon { display: grid; place-items: center; width: 100%; max-width: 3.25rem; aspect-ratio: 1; border-radius: 30%; border: 0.0625rem solid #ffffff24; background: radial-gradient(ellipse at 50% 55%, #fa811c26, transparent 72%), linear-gradient(145deg, #30302f, #101010 65%); box-shadow: inset 0 0.125rem 0.25rem #ffffff15, inset 0 -0.125rem 0.375rem #0008; }
  .ng-mobile-module-icon svg { width: 1.5625rem; height: 1.5625rem; color: #ff9b45; filter: drop-shadow(0 0 0.375rem #ff821d50); }
  .ng-mobile-module-label { font-size: 0.6875rem; line-height: 1.2; font-weight: 400; color: #b9ada3; }
  .ng-mobile-hero-brand { margin-bottom: 1.75rem; }
  .ng-cinema-copy h1 { margin-top: 2rem; }
  .ng-cinema-copy p { margin-top: 2.25rem; }
  .ng-mobile-hero-modules { margin-top: 2.25rem; }
  .ng-cinema-actions { margin-top: 2.5rem; }
}
@media (max-width: 767px) {
  .nortgo-landing main > section { min-height: 100svh; box-sizing: border-box; }
  .ng-cinema-hero.ng-cinema-static,
  .ng-cinema-static .ng-cinema-scene { min-height: 100svh; }
  .ng-cinema-copy p { margin-top: 2.25rem; }
  .ng-cinema-actions { margin-top: 2.5rem; }
  .ng-product-theater > .ng-container { min-height: calc(100svh - 3.375rem); justify-content: center; }
  .ng-finale { min-height: 100svh; display: flex; align-items: center; }
  .ng-finale > .ng-container { width: 100%; }
}
@media (min-width: 1024px) {
  .ng-cinema-copy h1,
  .ng-theater-heading .ng-heading,
  .ng-finale-copy h2 { font-size: clamp(3.375rem, calc(5.2 * var(--ng-vw)), 5.125rem); }
}
```

## src/landing/landing.css

```css
@font-face { font-family: 'NortGo Landing Inter'; src: url('/landing/fonts/inter-300.ttf') format('truetype'); font-weight: 300; font-display: swap; }
@font-face { font-family: 'NortGo Landing Inter'; src: url('/landing/fonts/inter-400.woff2') format('woff2'); font-weight: 400; font-display: swap; }
@font-face { font-family: 'NortGo Landing Inter'; src: url('/landing/fonts/inter-500.woff2') format('woff2'); font-weight: 500; font-display: swap; }
@font-face { font-family: 'NortGo Landing Inter'; src: url('/landing/fonts/inter-600.woff2') format('woff2'); font-weight: 600; font-display: swap; }
@font-face { font-family: 'NortGo Landing Inter'; src: url('/landing/fonts/inter-700.woff2') format('woff2'); font-weight: 700; font-display: swap; }
@font-face { font-family: 'NortGo Landing Inter'; src: url('/landing/fonts/inter-800.woff2') format('woff2'); font-weight: 800; font-display: swap; }
@font-face { font-family: 'NortGo Landing Barlow'; src: url('/landing/fonts/barlow-condensed-600.woff2') format('woff2'); font-weight: 600; font-display: swap; }
@font-face { font-family: 'NortGo Landing Barlow'; src: url('/landing/fonts/barlow-condensed-700.woff2') format('woff2'); font-weight: 700; font-display: swap; }
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Apply the compact root scale only while the public landing is mounted. */
html:has(.nortgo-landing) { font-size: 80%; }

.nortgo-landing { --ng-copper: #c6632a; --ng-soft: #edaa7e; --ng-paper: #f5f2ed; --ng-dark: #0b0b0d; font-family: 'NortGo Landing Inter', Arial, sans-serif; background: #0b0b0d; color: #f5f2ed; line-height: 1.5; font-weight: 400; overflow: clip; -webkit-font-smoothing: antialiased; color-scheme: dark; }
.nortgo-landing *, .nortgo-landing *::before, .nortgo-landing *::after { box-sizing: border-box; }
.nortgo-landing :where(h1,h2,h3,h4,p,figure) { margin: 0; }
.nortgo-landing :where(a) { color: inherit; text-decoration: none; }
.nortgo-landing :where(button) { font: inherit; cursor: pointer; color: inherit; background: transparent; border: 0; }
.nortgo-landing img { display: block; max-width: 100%; }
.nortgo-landing :where(a,button):focus-visible { outline: 0.125rem solid #edaa7e; outline-offset: 0.375rem; border-radius: 62.4375rem; }
.nortgo-landing :where(section[id]) { scroll-margin-top: 5.75rem; }
.nortgo-landing ::selection { background: #c6632a; color: white; }
.ng-container { width: min(78rem, calc(100% - 6rem)); margin-inline: auto; }
.ng-skip { position: fixed; z-index: 100; top: 0.625rem; left: 0.625rem; padding: 0.75rem 1.125rem; background: #f5f2ed; color: #111 !important; transform: translateY(-160%); }
.ng-skip:focus { transform: translateY(0); }
.ng-header { position: absolute; top: 0; left: 0; z-index: 30; width: 100%; padding: 1.4375rem 0; border-bottom: 0; }
.ng-brand { display: inline-flex; align-items: center; gap: 0.625rem; font-weight: 700; letter-spacing: -0.0625rem; font-size: 1.5rem; }
.ng-brand img { width: 2.4375rem; height: 2.4375rem; object-fit: contain; }
.ng-brand-nort { color: #ff881d; }
.ng-brand-go { color: #fff; }
.ng-header nav a, .ng-footer nav a { transition: color .2s; }
.ng-header nav a:hover, .ng-footer nav a:hover { color: #edaa7e; }
.ng-nav-cta { border: 0.0625rem solid #6b4c3a; background: #c6632a12; padding: 0.625rem 1.0625rem; border-radius: 62.4375rem; display: flex; gap: 0.9375rem; align-items: center; font-size: 0.8125rem; }
.ng-nav-cta:hover { background: #c6632a30; }
.ng-mobile-menu { position: absolute; top: 4.875rem; inset-inline: 1rem; padding: 0.9375rem 1.25rem; border: 0.0625rem solid #383431; border-radius: 0.75rem; background: #141312; box-shadow: 0 0.9375rem 3.125rem #0008; }
.ng-mobile-menu a { display: block; padding: 0.8125rem 0; }
.ng-menu-toggle { padding: 0.375rem; }
.ng-button { display: inline-flex; align-items: center; justify-content: center; gap: 1.5625rem; padding: 0.9375rem 1.4375rem; font-size: 0.875rem; font-weight: 500; border-radius: 62.4375rem; transition: background .22s, transform .22s; min-height: 3.125rem; }
.ng-button:hover { transform: translateY(-0.125rem); }
.ng-button-primary { background: #af5120; color: #fff !important; border: 0.0625rem solid #ce763f; box-shadow: 0 0.375rem 1.875rem #c6632a18; }
.ng-button-primary:hover { background: #ad5120; }
.ng-button-secondary { background: #ffffff04; border: 0.0625rem solid #ffffff20; }
.ng-button-secondary:hover { background: #ffffff0e; }
.ng-eyebrow { display: flex; align-items: center; gap: 0.625rem; color: #c6a38b; font-size: 0.625rem; font-weight: 600; letter-spacing: .18em; line-height: 1.6; text-transform: uppercase; }
.ng-eyebrow > span { width: 0.3125rem; height: 0.3125rem; border-radius: 50%; background: #dc8a53; }
.ng-eyebrow-dark { color: #8d4925; }
.ng-hero { position: relative; padding-top: 9.25rem; min-height: 67.5rem; background: #0b0b0d; }
.ng-hero-glow { position: absolute; width: 71.875rem; height: 56.25rem; top: 14.0625rem; left: 50%; transform: translateX(-50%); background: radial-gradient(ellipse, #ad522322 0%, #8b391217 33%, transparent 65%); pointer-events: none; }
.ng-hero .ng-eyebrow { justify-content: center; margin-bottom: 1.3125rem; }
.ng-hero-title { font-size: clamp(3.125rem, calc(6.7 * var(--ng-vw)), 6rem); font-weight: 500; line-height: 1.025; letter-spacing: -.065em; }
.ng-hero-title > span { color: #edaa7e; }
.ng-hero-copy { margin: 1.4375rem auto 0 !important; color: #aaa5a0; font-size: 1rem; line-height: 1.7; letter-spacing: -.015em; }
.ng-hero-stage { position: relative; height: 37.5625rem; max-width: 62.5rem; margin: 3.8125rem auto 0; perspective: 100rem; }
.ng-phone { position: relative; width: 17.875rem; border: 0.0625rem solid #6c6966; padding: 0.5rem; border-radius: 2.4375rem; background: linear-gradient(125deg,#676563,#20201f 14%,#090909 55%,#504c47); box-shadow: 0 1.875rem 3.75rem -1.25rem #000a, inset 0 0 0 0.125rem #131313; isolation: isolate; }
.ng-phone::after { content: ''; position: absolute; right: -0.1875rem; top: 7.8125rem; height: 2.8125rem; width: 0.125rem; border-radius: 0.125rem; background: #74706b; }
.ng-phone-screen { background: #000; overflow: hidden; border-radius: 1.9375rem; aspect-ratio: 379 / 752; }
.ng-phone-screen > picture,.ng-phone-screen > picture > img { display: block; width: 100%; height: 100%; object-fit: cover; }
.ng-phone-speaker { position: absolute; height: 0.1875rem; width: 2.375rem; top: 0.8125rem; left: calc(50% - 1.1875rem); border-radius: 0.5rem; background: #2b2b2b; }
.ng-hero-center { position: absolute; left: calc(50% - 8.9375rem); top: 0; z-index: 3; }
.ng-hero-side { position: absolute; top: 4.6875rem; opacity: .64; z-index: 1; }
.ng-hero-side .ng-phone { width: 15rem; border-radius: 2.0625rem; }
.ng-hero-side .ng-phone-screen { border-radius: 1.625rem; }
.ng-hero-left { left: calc(50% - 25.4375rem); }
.ng-hero-right { right: calc(50% - 25.4375rem); }
.ng-stage-line { position: absolute; top: 15.625rem; left: -12.5rem; right: -12.5rem; border-top: 0.0625rem solid #edaa7e10; }
.ng-hero-note { position: absolute; z-index: 4; display: flex; align-items: center; gap: 0.75rem; padding: 1rem 1.125rem; border-radius: 0.75rem; background: #22201ef0; border: 0.0625rem solid #605142; box-shadow: 0 1.25rem 1.875rem #0004; text-align: left; backdrop-filter: blur(1rem); }
.ng-hero-note small { display: block; font-size: 0.5rem; letter-spacing: .12em; color: #a89c91; margin-bottom: 0.25rem; }
.ng-hero-note strong { font-size: 0.6875rem; font-weight: 500; }
.ng-hero-note-left { top: 16.875rem; left: 4.375rem; }
.ng-hero-note-right { top: 25rem; right: 2.625rem; }
.ng-note-icon { display: grid; place-items: center; width: 2.1875rem; height: 2.1875rem; border-radius: 0.5625rem; background: #c6632a1a; color: #edaa7e; }
.ng-hero-bottom { display: flex; align-items: center; justify-content: space-between; padding: 0.9375rem 0 1.8125rem; border-bottom: 0.0625rem solid #ffffff14; font-size: 0.5625rem; letter-spacing: .18em; color: #8b8681; }
.ng-footer { padding: 3.4375rem 0 1.5625rem; background: #0b0b0d; }
.ng-footer-bottom { border-top: 0.0625rem solid #ffffff15; padding-top: 1.5rem; display: flex; justify-content: space-between; gap: 1.5rem; color: #98938e; font-size: 0.6875rem; }
.ng-section-number { font-family: 'NortGo Landing Barlow', sans-serif; font-size: 0.875rem; letter-spacing: .1em; color: #c6632a; }
.ng-heading { font-size: clamp(2.5rem,calc(4.4 * var(--ng-vw)),4rem); line-height: 1.06; font-weight: 500; letter-spacing: -.06em; }
.ng-body { font-size: 0.9375rem; line-height: 1.85; color: #aaa5a0; letter-spacing: -.015em; }
.ng-dim { color: #7e7974; }
.ng-light { background: #f5f2ed; color: #191817; color-scheme: light; }
.ng-light .ng-body { color: #726b64; }
.ng-accent-text { color: #a85224; }
.ng-feature { padding: 8.25rem 0; }
.ng-feature-next { display: inline-flex; align-items: center; gap: 1.25rem; font-size: 0.6875rem; color: #b3a397 !important; margin-top: 2.5rem; padding: 0.625rem 0; border-bottom: 0.0625rem solid #655346; }
.ng-light .ng-feature-next { color: #795b47 !important; border-color: #cdbbab; }
.ng-problem { padding: 8.25rem 0 9.25rem; }
.ng-fragments { position: relative; height: 28.75rem; }
.ng-fragments::before { content: ''; position: absolute; width: 21.875rem; height: 21.875rem; border: 0.0625rem solid #ffffff09; border-radius: 50%; top: 2.625rem; left: calc(50% - 10.9375rem); box-shadow: 0 0 0 3rem #ffffff02,0 0 0 6rem #ffffff01; }
.ng-fragments-center { position: absolute; top: 11.5625rem; width: 100%; text-align: center; font-size: 1.5rem; line-height: 1.2; letter-spacing: -.04em; color: #7f7770; }
.ng-fragment { position: absolute; display: flex; align-items: center; gap: 0.875rem; padding: 1.1875rem 1.375rem; background: linear-gradient(120deg,#242220,#171615); border: 0.0625rem solid #413b35; border-radius: 0.625rem; color: #c2bab2; font-size: 0.6875rem; box-shadow: 0 0.9375rem 1.875rem #0003; }
.ng-fragment svg { color: #ce895e; }
.ng-fragment-one { top: 1.875rem; left: 1.5625rem; rotate: -8deg; }
.ng-fragment-two { top: 7.125rem; right: 0; rotate: 7deg; }
.ng-fragment-three { top: 17.5rem; left: -0.625rem; rotate: -5deg; }
.ng-fragment-four { bottom: 1.25rem; right: 0; rotate: 6deg; }
.ng-fragment-five { top: 12.1875rem; left: 0; rotate: -13deg; opacity: .4; transform: translateX(-5%); }
.ng-overview { padding: 7.5rem 0 3.75rem; }
.ng-overview-heading { display: flex; justify-content: space-between; align-items: flex-end; gap: 3.125rem; margin-bottom: 4.25rem; }
.ng-module-directory { display: grid; grid-template-columns: repeat(3,1fr); border-top: 0.0625rem solid #d9d0c7; }
.ng-module-link { display: flex; gap: 1.25rem; align-items: center; min-height: 8.25rem; border-bottom: 0.0625rem solid #d9d0c7; padding: 1.625rem 1.5625rem 1.625rem 0; transition: background .25s; }
.ng-module-link:hover { background: #eadfd355; }
.ng-module-index { font-size: 0.5625rem; color: #a99a8e; }
.ng-module-link > svg { color: #a85224; flex: 0 0 auto; }
.ng-module-link strong { display: block; font-size: 1.3125rem; font-weight: 500; letter-spacing: -.04em; }
.ng-module-link small { display: block; font-size: 0.625rem; color: #807569; margin-top: 0.1875rem; }
.ng-module-link .ng-module-arrow { margin-left: auto; color: #897765; }
.ng-overview-foot { text-align: center; font-size: 0.6875rem; color: #8a7e72; padding-top: 2.8125rem; }
.ng-overview-foot strong { color: #544538; font-weight: 500; }
.ng-day { height: 185vh; min-height: 75rem; background: radial-gradient(ellipse at 80% 45%,#40231444,transparent 55%),#0b0b0d; position: relative; }
.ng-day-sticky { position: sticky; top: 0; min-height: 100vh; display: flex; align-items: center; padding: 4.375rem 0; }
.ng-day-static { height: auto; min-height: 0; }
.ng-day-static .ng-day-sticky { position: relative; min-height: 54.375rem; }
.ng-day-steps { margin-top: 2.3125rem; max-width: 24.375rem; }
.ng-day-step { display: flex; gap: 1rem; padding: 1.0625rem 0 1.0625rem 1.125rem; border-left: 0.0625rem solid #46403b; opacity: .42; transition: opacity .35s,border-color .35s; }
.ng-day-step-active { opacity: 1; border-color: #c6632a; }
.ng-day-step > span { color: #de9568; padding-top: 0.25rem; }
.ng-day-step h3 { font-size: 0.8125rem; font-weight: 500; }
.ng-day-step p { font-size: 0.6875rem; line-height: 1.7; color: #999089; margin-top: 0.25rem; }
.ng-day-visual { position: relative; display: flex; align-items: center; flex-direction: column; padding-top: 1.375rem; }
.ng-day-glow { position: absolute; inset: 0 -25%; background: radial-gradient(ellipse,#c6632a20,transparent 67%); }
.ng-visual-caption { margin-top: 2.1875rem; color: #968373; letter-spacing: .15em; font-size: 0.5rem; display: flex; align-items: center; gap: 0.5rem; }
.ng-caption-dot { width: 0.25rem; height: 0.25rem; background: #c6632a; border-radius: 50%; }
.ng-detail-line { display: flex; gap: 0.75rem; align-items: center; padding-top: 1.5625rem; font-size: 0.6875rem; color: #846247; }
.ng-agenda-visual { position: relative; display: flex; justify-content: flex-end; padding: 1.5625rem 1.875rem; }
.ng-agenda-visual .ng-phone { rotate: 5deg; }
.ng-date-display { position: absolute; top: 6.25rem; left: -0.625rem; color: #c4a789; }
.ng-date-display small { font-size: 0.4375rem; letter-spacing: .12em; }
.ng-date-display > span { display: block; font-family: 'NortGo Landing Barlow',sans-serif; font-size: 11.25rem; font-weight: 600; letter-spacing: -.07em; line-height: 1; }
.ng-date-display b { font-size: 0.6875rem; letter-spacing: .35em; font-weight: 500; }
.ng-agenda-label { position: absolute; bottom: 5.375rem; left: -1.125rem; min-width: 15.25rem; display: flex; align-items: center; gap: 1.25rem; background: #fffdf9; border: 0.0625rem solid #e2d3c3; border-radius: 0.625rem; padding: 1.375rem; box-shadow: 0 1.25rem 2.5rem #68402320; rotate: -4deg; }
.ng-agenda-label span { font-size: 0.6875rem; color: #9c7960; }
.ng-agenda-label strong { font-size: 0.8125rem; font-weight: 500; }
.ng-agenda-label svg { margin-left: auto; color: #a85224; }
.ng-task-visual,.ng-routine-visual,.ng-health-visual,.ng-notes-visual { position: relative; display: flex; justify-content: center; padding: 1.25rem 0; }
.ng-tasks { background: radial-gradient(ellipse at 23% 60%,#8b452018,transparent 40%),#0b0b0d; }
.ng-task-visual .ng-phone { rotate: -5deg; }
.ng-done-tag { position: absolute; bottom: 5.75rem; left: 3.75rem; display: flex; gap: 0.875rem; align-items: center; border: 0.0625rem solid #3b5343; border-radius: 0.625rem; background: #1d2921; padding: 1.25rem; box-shadow: 0 1.25rem 3.125rem #0008; }
.ng-done-tag > span { border-radius: 50%; width: 2rem; height: 2rem; display: grid; place-items: center; background: #365d3f; color: #a1dbaa; }
.ng-done-tag small { font-size: 0.4375rem; letter-spacing: .14em; display: block; color: #9bb29f; }
.ng-done-tag strong { font-size: 0.75rem; font-weight: 400; text-decoration: line-through; text-decoration-color: #aac0ad80; }
.ng-words-list { margin-top: 1.875rem; display: flex; flex-wrap: wrap; gap: 1.25rem; font-size: 0.75rem; color: #716a63; }
.ng-words-list span:last-child { color: #c99978; }
.ng-routines { border-top: 0.0625rem solid #ffffff12; background: #111110; }
.ng-routine-quote { margin-top: 1.875rem !important; border-left: 0.0625rem solid #765035; padding-left: 1.25rem; font-size: 1.25rem; line-height: 1.5; letter-spacing: -.04em; color: #d1bca8; }
.ng-rhythm { position: absolute; display: flex; align-items: flex-end; justify-content: center; gap: 0.8125rem; left: -1.875rem; right: -1.875rem; bottom: 3.625rem; height: 25rem; opacity: .14; }
.ng-rhythm i { width: 1.8125rem; background: #bf713d; transform: scaleY(3); transform-origin: bottom; border-radius: 0.5rem 0.5rem 0 0; }
.ng-routine-note { position: absolute; bottom: -0.875rem; display: flex; align-items: center; gap: 0.625rem; background: #302419; border: 0.0625rem solid #705033; border-radius: 1.875rem; padding: 0.8125rem 1.25rem; font-size: 0.5625rem; color: #dcb28b; white-space: nowrap; }
.ng-finance-heading { display: flex; justify-content: space-between; align-items: flex-end; }
.ng-finance-composition { display: grid; grid-template-columns: 1fr 1.15fr 1fr; gap: 3.125rem; align-items: center; margin-top: 4.375rem; }
.ng-finance-phone { display: flex; justify-content: center; }
.ng-finance-phone .ng-phone { box-shadow: 0 1.75rem 4.0625rem -1.25rem #663c2b60; }
.ng-finance-side { padding-bottom: 4.375rem; }
.ng-finance-amount { border-top: 0.0625rem solid #d5c6b6; padding-top: 1.5rem; margin-top: 3.125rem; display: flex; gap: 0.9375rem; color: #956744; }
.ng-finance-amount small { display: block; font-size: 0.5rem; letter-spacing: .15em; margin-bottom: 0.4375rem; }
.ng-finance-amount b { font-size: 0.9375rem; font-weight: 500; color: #32271f; }
.ng-finance-amount p { font-size: 0.75rem; margin-top: 0.5rem; color: #7c6d60; }
.ng-finance-side-right { align-self: end; }
.ng-finance-terms { border-top: 0.0625rem solid #d5c6b6; margin-top: 3.125rem; padding-top: 1.75rem; color: #9a663e; }
.ng-finance-terms p { margin-top: 1.0625rem; font-size: 1.125rem; line-height: 1.7; letter-spacing: -.03em; color: #867463; }
.ng-health { background: #101212; }
.ng-health-soft { position: absolute; width: 35.625rem; height: 35.625rem; border-radius: 50%; top: 0; left: calc(50% - 17.8125rem); background: radial-gradient(ellipse,#46645926,transparent 67%); }
.ng-health-visual .ng-phone { rotate: -3deg; }
.ng-health-caption { position: absolute; bottom: -0.8125rem; display: flex; align-items: center; gap: 0.625rem; color: #8fa495; font-size: 0.625rem; }
.ng-health-disclaimer { color: #757e78; margin-top: 1.75rem !important; font-size: 0.625rem; line-height: 1.7; }
.ng-notes { background: #101010; border-top: 0.0625rem solid #ffffff12; }
.ng-notes-visual .ng-phone { rotate: 4deg; }
.ng-note-flow { display: flex; gap: 0.9375rem; align-items: center; margin-top: 2.25rem; font-size: 0.625rem; color: #b79b84; }
.ng-note-flow span { display: flex; align-items: center; gap: 0.5rem; }
.ng-idea-slip { position: absolute; bottom: 2.3125rem; left: 0; background: #dcc0a1; color: #513f2c; border: 0.0625rem solid #f1d7b9; rotate: -7deg; padding: 1.6875rem 1.5rem; box-shadow: 0 1.25rem 2.5rem #0007; }
.ng-idea-slip small { font-size: 0.4375rem; letter-spacing: .15em; }
.ng-idea-slip p { font-size: 0.9375rem; letter-spacing: -.04em; line-height: 1.55; margin-top: 0.75rem; }
.ng-integration { padding: 8.125rem 0 3.375rem; }
.ng-connected-system { position: relative; max-width: 59.375rem; margin: 4.5rem auto 3.625rem; display: flex; flex-direction: column; align-items: center; }
.ng-connected-brand { display: flex; flex-direction: column; align-items: center; position: relative; padding: 1.125rem 1.5rem; background: #f5f2ed; }
.ng-connected-brand img { width: 6.25rem; height: 6.25rem; }
.ng-connected-brand span { font-size: 0.75rem; color: #937153; margin-top: 0.75rem; }
.ng-connected-line { position: absolute; left: 8.33%; right: 8.33%; height: 4.25rem; top: 9.75rem; border: 0.0625rem solid #d1b89f; border-bottom: 0; border-radius: 0.625rem 0.625rem 0 0; }
.ng-connected-line::before { content: ''; position: absolute; width: 0.0625rem; height: 4.25rem; background: #d1b89f; top: -4.25rem; left: 50%; }
.ng-connected-modules { position: relative; width: 100%; display: grid; grid-template-columns: repeat(6,1fr); gap: 1rem; margin-top: 4.0625rem; }
.ng-connected-modules a { display: flex; flex-direction: column; align-items: center; gap: 0.9375rem; color: #825b3d; font-size: 0.6875rem; transition: color .2s; }
.ng-connected-modules a:hover { color: #c6632a; }
.ng-connected-modules svg { background: #f5f2ed; outline: 1rem solid #f5f2ed; }
.ng-integration-bottom { border-top: 0.0625rem solid #d9cfc4; padding-top: 1.9375rem; display: flex; justify-content: center; gap: 3.4375rem; color: #9e8c7c; font-size: 0.625rem; }
.ng-integration-bottom strong { font-weight: 500; color: #73604f; }
.ng-cta { padding: 6.875rem 0 0; background: radial-gradient(ellipse at 70% 80%,#ab5b2226,transparent 60%),#10100f; overflow: hidden; }
.ng-cta-inner { display: grid; grid-template-columns: 1.25fr 1fr; gap: 3.4375rem; align-items: center; min-height: 33.75rem; }
.ng-cta-inner > div:first-child { padding-bottom: 4.6875rem; }
.ng-cta-device { align-self: end; margin-bottom: -7.5rem; display: flex; justify-content: center; rotate: 10deg; }
.ng-cta-device .ng-phone { width: 19.6875rem; }
.ng-hero-left .ng-phone { rotate: -9deg; }
.ng-hero-right .ng-phone { rotate: 9deg; }

/* Screens are illustrative views of documented features, with example data. */
.ng-app-screen { display: flex; flex-direction: column; height: 100%; background: #050505; color: #f5f5f5; font-family: 'NortGo Landing Inter',sans-serif; text-align: left; }
.ng-app-top { display: flex; justify-content: space-between; font-size: 0.5rem; padding: 0.625rem 1.1875rem 0.3125rem; }
.ng-app-brand { display: flex; align-items: center; justify-content: space-between; padding: 0.5rem 0.9375rem; }
.ng-app-brand b { font-family: 'NortGo Landing Barlow',sans-serif; font-size: 1.5rem; font-weight: 700; letter-spacing: -.04em; }
.ng-app-brand b > span { color: #a2a2a2; }
.ng-app-avatar { width: 1.3125rem; height: 1.3125rem; display: grid; place-items: center; background: #35251e; color: #c67a4b; border: 0.0625rem solid #5e3923; border-radius: 50%; font-size: 0.5625rem; }
.ng-app-title { font-family: 'NortGo Landing Barlow',sans-serif; font-size: 1.875rem; font-weight: 700; letter-spacing: -.02em; padding: 0.4375rem 1rem 0; }
.ng-app-content { padding: 0.4375rem 0.875rem; flex: 1; min-height: 0; }
.ng-app-subtitle { font-size: 0.5rem; color: #969696; line-height: 1.8; margin-bottom: 0.9375rem !important; }
.ng-app-summary { display: flex; background: #1b1b1b; border: 0.0625rem solid #303030; border-radius: 0.625rem; margin: 0.5625rem 0 0.75rem; padding: 0.625rem 1rem; gap: 1.9375rem; }
.ng-app-summary span { font-size: 0.4375rem; color: #b6b6b6; display: flex; flex-direction: column; }
.ng-app-summary b { font-size: 1.5rem; line-height: 1.1; color: #e9e9e9; font-weight: 600; padding-bottom: 0.25rem; }
.ng-app-summary .ng-red { color: #ee685a; }
.ng-app-row { position: relative; padding: 0.625rem 0.8125rem; border: 0.0625rem solid #333; border-radius: 0.5625rem; background: #171717; margin-bottom: 0.4375rem; transition: border-color .3s,background .3s; }
.ng-app-row small { display: block; font-size: 0.375rem; letter-spacing: .09em; color: #d69670; margin-bottom: 0.3125rem; }
.ng-app-row strong { font-size: 0.625rem; font-weight: 500; display: block; }
.ng-app-row p { font-size: 0.5rem; color: #999; margin-top: 0.25rem; }
.ng-app-row > svg { position: absolute; right: 0.75rem; top: 1.9375rem; color: #8f8f8f; }
.ng-app-row.ng-status-red small { color: #f1736b; }
.ng-app-row.ng-status-neutral small { color: #bbb; }
.ng-app-row-selected { border-color: #b77344; background: #2c2119; }
.ng-app-inline { display: flex; justify-content: center; gap: 0.375rem; color: #ad7a59; font-size: 0.4375rem; margin-top: 0.25rem; }
.ng-app-nav { display: flex; flex-shrink: 0; justify-content: space-around; background: #151515; border-top: 0.0625rem solid #333; padding: 0.5625rem 0.1875rem 0.9375rem; margin-top: auto; }
.ng-app-nav > span { color: #737373; display: flex; flex-direction: column; align-items: center; gap: 0.25rem; }
.ng-app-nav small { font-size: 0.375rem; }
.ng-app-nav .ng-app-active,.ng-app-tabs .ng-app-active { color: #d08a5e; }
.ng-app-card { border: 0.0625rem solid #303030; background: #1c1c1e; border-radius: 0.625rem; padding: 0.5625rem 0.75rem; margin-bottom: 0.625rem; }
.ng-app-card-heading { display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.25rem; }
.ng-app-card-heading b { font-family: 'NortGo Landing Barlow',sans-serif; font-weight: 600; font-size: 0.9375rem; }
.ng-app-card-heading > span { font-size: 0.4375rem; color: #a6a6a6; }
.ng-app-tabs { display: flex; gap: 1.0625rem; margin: 0.3125rem 0 1.25rem; font-size: 0.4375rem; color: #888; }
.ng-task-row { display: flex; gap: 0.6875rem; align-items: center; padding: 0.4375rem 0; border-bottom: 0.0625rem solid #333; color: #7e7e7e; }
.ng-task-row:last-child { border: 0; padding-bottom: 0.25rem; }
.ng-task-row strong { font-size: 0.625rem; display: block; color: #dcdcdc; font-weight: 400; }
.ng-task-row small { font-size: 0.4375rem; display: block; margin-top: 0.1875rem; }
.ng-check { width: 1.25rem; height: 1.25rem; border-radius: 50%; background: #325b38; color: #7cd887; display: grid; place-items: center; }
.ng-task-done strong { text-decoration: line-through; color: #858585; }
.ng-app-new { background: #9c451e; border: 0.0625rem solid #b66436; color: #f7d7c3; text-align: center; padding: 0.5625rem; font-size: 0.5625rem; border-radius: 0.4375rem; margin: 0.5rem 0; }
.ng-habit-days { display: grid; grid-template-columns: repeat(7,1fr); gap: 0.25rem; margin-top: 0.625rem; }
.ng-habit-days small { color: #939393; font-size: 0.375rem; text-align: center; }
.ng-habit-days i { height: 0.875rem; border-radius: 0.25rem; background: #303030; }
.ng-habit-days .ng-habit-filled { background: #397343; }
.ng-health-water { background: #18252b; border: 0.0625rem solid #294c5a; border-radius: 0.625rem; padding: 0.75rem; color: #89bccf; margin: 0.6875rem 0 0.75rem; }
.ng-health-water strong { font-size: 0.75rem; font-weight: 500; }
.ng-health-water p { font-size: 0.5625rem; margin-top: 0.5rem; }
.ng-health-water b { font-size: 1.75rem; font-weight: 500; color: #d8e9ef; }
.ng-water-drops { display: flex; gap: 0.4375rem; margin-top: 0.625rem; }
.ng-water-drops .ng-dim { color: #516773; }
.ng-health-row { display: flex; gap: 0.625rem; padding: 0.5rem 0.6875rem; margin-bottom: 0.5rem; border: 0.0625rem solid #333; background: #1c1c1e; border-radius: 0.5625rem; color: #b59c88; }
.ng-health-row > span { flex: 1; }
.ng-health-row strong { display: block; color: #ddd; font-size: 0.5625rem; font-weight: 500; }
.ng-health-row small { display: block; color: #999; font-size: 0.4375rem; margin-top: 0.25rem; }
.ng-app-health-note { display: flex; gap: 0.3125rem; align-items: center; justify-content: center; color: #869e8e; font-size: 0.375rem; margin-top: 0.625rem !important; }
.ng-notes-row { border-bottom: 0.0625rem solid #383838; padding: 0.375rem 0; }
.ng-notes-row:last-child { border: 0; }
.ng-notes-row strong { font-size: 0.5625rem; display: block; font-weight: 500; }
.ng-notes-row small { font-size: 0.4375rem; display: block; color: #888; margin-top: 0.25rem; }
.ng-note-open { background: #2b221b; border-color: #67462d; }
.ng-app-label { font-size: 0.3125rem; letter-spacing: .08em; color: #cd956c; }
.ng-note-open h4 { font-size: 0.75rem; font-weight: 500; margin-top: 0.5rem; }
.ng-note-open p { font-size: 0.5rem; line-height: 1.8; color: #b8a798; margin-top: 0.375rem; }
.ng-note-convert { display: flex; align-items: center; gap: 0.3125rem; border-top: 0.0625rem solid #5c422e; padding-top: 0.5rem; margin-top: 0.625rem; font-size: 0.4375rem; color: #dca574; }

@media (max-width: 1100px) {
  .ng-heading { font-size: 3rem; } .ng-feature { padding: 6.5625rem 0; } .ng-module-link { gap: 0.875rem; padding-right: 1.0625rem; } .ng-module-index { display: none; }
  .ng-agenda-visual { padding-right: 0; } .ng-date-display { left: -1.125rem; } .ng-date-display > span { font-size: 8.125rem; } .ng-agenda-label { left: -1.25rem; }
  .ng-finance-composition { gap: 1.5rem; } .ng-finance-phone .ng-phone { width: 16.125rem; } .ng-finance-terms p { font-size: 1rem; }
  .ng-done-tag { left: 0; } .ng-idea-slip { left: -1.25rem; } .ng-cta-inner { gap: 0.625rem; }
}
@media (min-width: 768px) and (max-width: 900px) {
  .ng-heading { font-size: 2.5625rem; } .ng-module-link strong { font-size: 1.1875rem; } .ng-module-link small { font-size: 0.5625rem; }
  .ng-agenda-visual .ng-phone { width: 15.5625rem; } .ng-date-display { display: none; } .ng-agenda-label { bottom: 4.375rem; left: -0.9375rem; min-width: 13.125rem; padding: 1.0625rem; }
  .ng-day-sticky > .ng-container { gap: 2.25rem; } .ng-day-visual .ng-phone { width: 17.875rem; } .ng-fragments { max-width: 32.5rem; width: 100%; margin-inline: auto; }
  .ng-finance-composition { grid-template-columns: 1fr 1fr; } .ng-finance-phone { grid-column: 2; grid-row: 1 / 3; } .ng-finance-side { padding: 0; } .ng-finance-side-right { grid-column: 1; }
  .ng-finance-amount { margin-top: 1.75rem; } .ng-finance-terms { margin-top: 1.75rem; } .ng-finance-side-right .ng-finance-amount { margin-top: 0; }
}
@media (max-width: 767px) {
  .ng-heading { font-size: 2.625rem; } .ng-body { font-size: 0.875rem; line-height: 1.8; } .ng-feature { padding: 5.3125rem 0 6.25rem; } .ng-feature-next { margin-top: 1.75rem; }
  .ng-problem { padding: 5.125rem 0 4.125rem; } .ng-fragments { height: 22.5rem; max-width: 26.25rem; margin: 0 auto; width: 100%; } .ng-fragment { padding: 0.875rem 0.9375rem; font-size: 0.5625rem; gap: 0.625rem; } .ng-fragment-one { top: 0.9375rem; left: 0.3125rem; } .ng-fragment-two { top: 5.625rem; right: 0; } .ng-fragment-three { top: 13.75rem; left: 0; } .ng-fragment-four { bottom: 0; right: 0.3125rem; } .ng-fragment-five { top: 9.25rem; left: 0; } .ng-fragments-center { top: 8.9375rem; font-size: 1.3125rem; text-align: right; padding-right: 1.875rem; } .ng-fragments::before { width: 17.5rem; height: 17.5rem; left: calc(50% - 8.75rem); top: 1.875rem; }
  .ng-overview { padding: 5.25rem 0 2.5rem; } .ng-overview-heading { display: block; margin-bottom: 2.5rem; } .ng-overview-heading > p { margin-top: 1.5625rem; } .ng-module-directory { grid-template-columns: repeat(2,1fr); column-gap: 1rem; } .ng-module-link { min-height: 6.5rem; gap: 0.75rem; padding: 1.375rem 0; } .ng-module-link > svg { width: 1.25rem; } .ng-module-link strong { font-size: 1.125rem; } .ng-module-link small { font-size: 0.5rem; } .ng-module-arrow { display: none; } .ng-overview-foot { font-size: 0.5625rem; padding-top: 1.875rem; }
  .ng-day { height: auto; min-height: 0; } .ng-day-sticky,.ng-day-static .ng-day-sticky { position: relative; min-height: 0; padding: 5.25rem 0; } .ng-day-step { opacity: 1; } .ng-day-steps { margin-top: 1.625rem; } .ng-day-step p { font-size: 0.6875rem; } .ng-day-visual { padding-top: 0.625rem; } .ng-day-visual .ng-phone { rotate: 0deg; } .ng-visual-caption { font-size: 0.4375rem; margin-top: 1.8125rem; }
  .ng-agenda-visual { max-width: 26.25rem; width: 100%; margin: 0 auto; padding: 1.25rem 0.625rem 0 0; } .ng-agenda-visual .ng-phone { width: 16.125rem; rotate: 4deg; } .ng-date-display { left: 0; top: 5.625rem; } .ng-date-display > span { font-size: 9.0625rem; } .ng-date-display small { font-size: 0.375rem; } .ng-agenda-label { bottom: 4.5625rem; left: 0; min-width: 13.625rem; padding: 1.125rem; }
  .ng-task-visual,.ng-routine-visual,.ng-health-visual,.ng-notes-visual { margin-top: 0.75rem; } .ng-done-tag { bottom: 5rem; left: 0; padding: 1.0625rem; } .ng-routine-quote { font-size: 1.1875rem; } .ng-rhythm { left: 0; right: 0; gap: 0.5rem; } .ng-routine-note { font-size: 0.5rem; padding: 0.75rem 1.0625rem; }
  .ng-finance-heading { align-items: flex-start; gap: 0.625rem; } .ng-finance-heading .ng-section-number { white-space: nowrap; padding-top: 0.1875rem; } .ng-finance-heading .ng-heading { font-size: 2.375rem; } .ng-finance-heading > div { flex: 1; } .ng-finance-composition { grid-template-columns: 1fr; margin-top: 1.75rem; gap: 2.375rem; } .ng-finance-side { padding-bottom: 0; } .ng-finance-side:first-child .ng-finance-amount { display: none; } .ng-finance-phone .ng-phone { width: 17.875rem; } .ng-finance-side-right { display: grid; grid-template-columns: 1fr 1fr; gap: 1.625rem; } .ng-finance-side-right .ng-finance-amount,.ng-finance-terms { margin-top: 0; padding-top: 1.4375rem; } .ng-finance-amount { gap: 0.5rem; } .ng-finance-amount b { font-size: 0.8125rem; } .ng-finance-terms p { font-size: 0.8125rem; margin-top: 0.75rem; } .ng-finance-amount p { font-size: 0.6875rem; }
  .ng-health-caption { font-size: 0.5625rem; } .ng-health-disclaimer { margin-top: 1.25rem !important; } .ng-note-flow { gap: 0.75rem; font-size: 0.5625rem; } .ng-idea-slip { left: 0; padding: 1.375rem 1.25rem; bottom: 1.8125rem; } .ng-idea-slip p { font-size: 0.8125rem; }
  .ng-integration { padding: 5.3125rem 0 2.5rem; } .ng-integration .ng-eyebrow { font-size: 0.4375rem; letter-spacing: .14em; } .ng-connected-system { margin: 2.625rem auto; } .ng-connected-line { display: none; } .ng-connected-modules { grid-template-columns: repeat(3,1fr); gap: 1.875rem 1rem; margin-top: 2.1875rem; } .ng-connected-modules a { padding: 1.125rem 0.5rem; border-top: 0.0625rem solid #d9c7b5; gap: 0.75rem; } .ng-connected-modules svg { outline: 0; } .ng-connected-brand img { width: 5.3125rem; height: 5.3125rem; } .ng-integration-bottom { flex-direction: column; gap: 0.625rem; align-items: center; padding-top: 1.5rem; }
  .ng-cta { padding-top: 5rem; } .ng-cta-inner { grid-template-columns: 1fr; gap: 2rem; } .ng-cta-inner > div:first-child { padding-bottom: 0; } .ng-cta-device { margin: 1rem 0 -10.9375rem; } .ng-cta-device .ng-phone { width: 15.9375rem; } .ng-cta .ng-heading { font-size: 2.625rem; }
}
@media (max-width: 1023px) { .ng-container { width: calc(100% - 3.5rem); } .ng-hero-title { font-size: 4.375rem; } .ng-hero-note-left { left: 0; } .ng-hero-note-right { right: 0; } }
@media (max-width: 767px) {
  .ng-container { width: calc(100% - 2.5rem); } .ng-header { padding: 1.125rem 0; } .ng-brand { font-size: 1.3125rem; gap: 0.4375rem; } .ng-brand img { width: 2rem; height: 2rem; } .ng-nav-cta { padding: 0.5625rem 0.8125rem; gap: 0.5rem; }
  .ng-hero { padding-top: 8.25rem; min-height: auto; } .ng-hero-title { font-size: clamp(2.5625rem, calc(10.4 * var(--ng-vw)), 4.125rem); letter-spacing: -.065em; line-height: 1.08; } .ng-hero-copy { font-size: 0.875rem; } .ng-hero .ng-eyebrow { font-size: 0.5rem; margin-bottom: 1.25rem; }
  .ng-button { padding: 0.8125rem 1.0625rem; gap: 0.75rem; font-size: 0.75rem; min-height: 2.9375rem; } .ng-hero-stage { margin-top: 3.125rem; height: 29.0625rem; } .ng-hero-center { left: calc(50% - 6.875rem); } .ng-hero-center .ng-phone { width: 13.75rem; padding: 0.375rem; border-radius: 1.875rem; } .ng-hero-center .ng-phone-screen { border-radius: 1.5rem; }
  .ng-hero-side { top: 4.0625rem; opacity: .28; } .ng-hero-side .ng-phone { width: 11rem; border-radius: 1.5625rem; padding: 0.375rem; } .ng-hero-side .ng-phone-screen { border-radius: 1.25rem; } .ng-hero-left { left: calc(50% - 16.3125rem); } .ng-hero-right { right: calc(50% - 16.3125rem); }
  .ng-hero-note { padding: 0.6875rem; gap: 0.5rem; } .ng-hero-note-left { top: 18rem; left: -0.1875rem; } .ng-hero-note-right { display: none; } .ng-hero-note strong { font-size: 0.625rem; } .ng-hero-note small { font-size: 0.375rem; } .ng-note-icon { width: 1.75rem; height: 1.75rem; }
  .ng-hero-bottom { font-size: 0.4375rem; } .ng-footer-bottom { flex-direction: column; } .nortgo-landing button, .ng-button { user-select: none; } .nortgo-landing ::-webkit-scrollbar { display: none; }
}
@media (prefers-reduced-motion: reduce) { .nortgo-landing *, .nortgo-landing *::before, .nortgo-landing *::after { animation: none !important; transition: none !important; scroll-behavior: auto !important; } }
```

## src/landing/motion.js

```js
import { useReducedMotion } from 'framer-motion';
import { useEffect, useLayoutEffect, useState } from 'react';
export const landingEase = [0.22, 1, 0.36, 1];
export const landingTransition = { duration: 0.8, ease: landingEase };
export function useLandingMotion() { return Boolean(useReducedMotion()); }
// Viewport geometry stays physical; design lengths follow the user's root font size.
export function useLandingViewport() {
  const [viewport, setViewport] = useState({ width: 1440, height: 1000, rootSize: 16 });
  useLayoutEffect(() => {
    const sync = () => {
      const next = { width: window.innerWidth, height: window.innerHeight, rootSize: parseFloat(getComputedStyle(document.documentElement).fontSize) || 16 };
      setViewport(previous => previous.width === next.width && previous.height === next.height && previous.rootSize === next.rootSize ? previous : next);
    };
    sync();
    window.addEventListener('resize', sync);
    const observer = new ResizeObserver(sync);
    observer.observe(document.documentElement);
    return () => { window.removeEventListener('resize', sync); observer.disconnect(); };
  }, []);
  return viewport;
}
export function useDesktopScene() {
  const reduced = useLandingMotion();
  const [desktop, setDesktop] = useState(() => typeof window !== 'undefined' && window.matchMedia('(min-width: 1024px) and (min-height: 700px)').matches);
  useEffect(() => {
    const query = window.matchMedia('(min-width: 1024px) and (min-height: 700px)');
    const sync = () => setDesktop(query.matches);
    sync(); query.addEventListener('change', sync);
    return () => query.removeEventListener('change', sync);
  }, []);
  return desktop && !reduced;
}
export const revealVariants = {
  hidden: { opacity: 0, y: '1.75rem' },
  visible: { opacity: 1, y: '0rem' },
};
```

## tailwind.config.js

```javascript
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  important: '.nortgo-landing',
  corePlugins: { preflight: false },
  theme: {
    extend: {
      colors: {
        'landing-bg': '#0B0B0D', 'landing-panel': '#1C1C1E',
        'landing-accent': '#C6632A', 'landing-copper': '#EDAA7E',
        'landing-paper': '#F5F2ED', 'landing-muted': '#A5A3A0',
        'landing-ink': '#20201F', 'landing-line': '#343230',
      },
      fontFamily: {
        landing: ['NortGo Landing Inter', 'Arial', 'sans-serif'],
        'landing-display': ['NortGo Landing Barlow', 'Arial Narrow', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
```

## package.json

```json
{
  "name": "nortgo-landing",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "scripts": { "dev": "vite --host 127.0.0.1", "build": "vite build", "preview": "vite preview --host 127.0.0.1" },
  "dependencies": { "react": "18.3.1", "react-dom": "18.3.1", "react-router-dom": "6.30.1", "framer-motion": "11.18.2", "lucide-react": "0.468.0" },
  "devDependencies": { "vite": "6.4.1", "@vitejs/plugin-react": "4.4.1", "tailwindcss": "3.4.17", "postcss": "8.5.3", "autoprefixer": "10.4.21" }
}
```

## src/landing/iphone.css

```css
/* Front-view illustration of iPhone 17 Pro Max in Cosmic Orange.
   Body proportions: 78 x 163.4 mm. Screen proportions: 1320 x 2868.
   Percentage geometry keeps the same hardware proportions at every rem width. */
.nortgo-landing .ng-phone.ng-phone-iphone {
  aspect-ratio: 78 / 163.4;
  padding: 0;
  border: 0;
  border-radius: 17% / 8.115%;
  background: linear-gradient(110deg, #f1bf9a 0%, #c9763d 13%, #784023 36%, #d9915d 65%, #f6c39c 85%, #a2532c 100%);
}
.ng-phone-iphone::before {
  content: '';
  position: absolute;
  inset: .35% .75%;
  border-radius: 16.5% / 7.9%;
  background: #08090b;
  box-shadow: inset 0 0 0 .0625rem #fff3;
}
.nortgo-landing .ng-phone-iphone::after { content: none; }
.ng-cinema-device:has(.ng-phone-iphone)::after { content: none; }
.nortgo-landing .ng-phone-iphone .ng-phone-screen {
  position: absolute;
  inset: 1.2% 2.95%;
  aspect-ratio: auto;
  border-radius: 15% / 6.9%;
  background: #080808;
  overflow: hidden;
}
.ng-phone-iphone .ng-phone-content {
  position: absolute;
  inset: 6.6% 0 3%;
  overflow: hidden;
}
.ng-phone-iphone .ng-phone-content picture,
.ng-phone-iphone .ng-phone-content img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.ng-phone-iphone .ng-phone-content:has(img[src$="financas.jpeg"]) { inset: 0; }
.ng-phone-island {
  position: absolute;
  z-index: 3;
  top: 1.4%;
  left: 35.5%;
  width: 29%;
  height: 3.4%;
  border-radius: 999rem;
  background: #000;
  box-shadow: 0 0 0 .0625rem #28282c;
  pointer-events: none;
}
.ng-phone-island > span {
  position: absolute;
  right: 8%;
  top: 25%;
  height: 50%;
  aspect-ratio: 1;
  border-radius: 50%;
  background: radial-gradient(circle at 38% 32%, #203644, #0c111c 40%, #020205 73%);
}
.ng-phone-home-indicator {
  position: absolute;
  bottom: 1.1%;
  left: 33%;
  width: 34%;
  height: .5%;
  border-radius: 999rem;
  background: #eeeeef;
  opacity: .75;
  pointer-events: none;
}
.ng-phone-hardware { position: absolute; inset: 0; z-index: -1; pointer-events: none; }
.ng-phone-hardware > span {
  position: absolute;
  width: 1%;
  border-radius: .1875rem;
  background: linear-gradient(90deg, #754426, #dfa575 55%, #9b572e);
}
.ng-phone-action-button { left: -.65%; top: 16%; height: 3.5%; }
.ng-phone-volume-up { left: -.65%; top: 24%; height: 6.3%; }
.ng-phone-volume-down { left: -.65%; top: 32.5%; height: 6.3%; }
.ng-phone-side-button { right: -.65%; top: 26%; height: 10%; }
.ng-phone-camera-control { right: -.65%; top: 62%; height: 7.5%; }
```
