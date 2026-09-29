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
