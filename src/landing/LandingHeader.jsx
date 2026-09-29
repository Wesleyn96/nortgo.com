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
