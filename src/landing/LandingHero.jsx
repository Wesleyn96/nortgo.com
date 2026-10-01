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
