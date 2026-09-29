import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { CalendarDays, CheckCheck, Heart } from 'lucide-react';
import { Action, Reveal, Phone } from './LandingPrimitives';
import { useDesktopScene } from './motion';
export default function LandingCTA() {
  const ref=useRef(null);
  const cinematic=useDesktopScene();
  const {scrollYProgress}=useScroll({target:ref,offset:['start end','end end']});
  const y=useTransform(scrollYProgress,[0,1],[100,0]);
  const rotate=useTransform(scrollYProgress,[0,1],[12,0]);
  return <section id="comecar" ref={ref} className="ng-finale ng-light"><div className="ng-container">
    <Reveal className="ng-finale-copy"><h2>Encontre um norte.<br/><span>Viva o seu dia.</span></h2><p>Foco no que importa. Vida organizada.</p><Action>Começar agora</Action></Reveal>
    <div className="ng-finale-stage" aria-hidden="true"><div className="ng-finale-sun"/><motion.div className="ng-finale-phone" style={cinematic?{y,rotate}:{}}><Phone src="/landing/img/home.webp" alt=""/></motion.div><div className="ng-finale-token ng-finale-token-one"><CalendarDays size={28}/></div><div className="ng-finale-token ng-finale-token-two"><CheckCheck size={28}/></div><div className="ng-finale-token ng-finale-token-three"><Heart size={23}/></div><span className="ng-finale-word-one">Mais clareza.</span><span className="ng-finale-word-two">Mais vida.</span></div>
  </div></section>;
}
