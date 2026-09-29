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
