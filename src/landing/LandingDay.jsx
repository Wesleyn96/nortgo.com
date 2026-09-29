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
