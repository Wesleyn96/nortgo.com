import React, { useState } from 'react';
import { MotionConfig } from 'framer-motion';
import LandingHeader from './landing/LandingHeader';
import LandingHero from './landing/LandingHero';
import LandingFooter from './landing/LandingFooter';
import LandingOverview from './landing/LandingOverview';
import LandingCTA from './landing/LandingCTA';
import LandingNavigation from './landing/LandingNavigation';
import './landing/landing.css';
import './landing/cinematic.css';

export default function Welcome({ legalLinks = {} }) {
  const [activeModule, setActiveModule] = useState(0);
  return <MotionConfig reducedMotion="user">
    <LandingNavigation><div className="nortgo-landing font-landing bg-landing-bg text-landing-paper">
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
