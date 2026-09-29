import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import Welcome from './Welcome';
import './preview.css';

// Shell de visualização apenas. Não copiar para o roteador do aplicativo.
function DestinationPreview() {
  const { pathname } = useLocation();
  const register = pathname === '/register';
  return <main className="preview-destination">
    <img src="/landing/img/logo-nortgo.png" alt="NortGo" width="80" height="80" />
    <p>PRÉVIA DE NAVEGAÇÃO</p>
    <h1>{register ? 'Criar sua conta no NortGo.' : 'Entrar no NortGo.'}</h1>
    <p>Este botão está preparado para abrir a tela de {register ? 'cadastro' : 'login'} que já existe no aplicativo.</p>
    <Link to="/">← Voltar à apresentação</Link>
  </main>;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode><BrowserRouter><Routes>
    <Route path="/" element={<Welcome />} />
    <Route path="/bem-vindo" element={<Welcome />} />
    <Route path="/login" element={<DestinationPreview />} />
    <Route path="/register" element={<DestinationPreview />} />
  </Routes></BrowserRouter></React.StrictMode>,
);
