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
export function Phone({ src, alt, children, className = '', priority = false }) {
  return <div className={`ng-phone ${className}`}>
    <div className="ng-phone-screen">
      {src ? <picture><source srcSet={src} type="image/webp" /><img src={src.replace('.webp', '.jpg')} alt={alt} width="379" height="752" loading={priority ? 'eager' : 'lazy'} decoding="async" /></picture> : children}
    </div>
    <span className="ng-phone-speaker" aria-hidden="true" />
  </div>;
}
export function SectionNumber({ children }) { return <span className="ng-section-number" aria-hidden="true">{children}</span>; }
