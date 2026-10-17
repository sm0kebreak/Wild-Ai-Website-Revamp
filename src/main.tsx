import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Root element not found');

const app = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

const normalize = (path: string) => (path.length > 1 && path.endsWith('/') ? path.slice(0, -1) : path || '/');
const prerendered = (window as Window & { __WILD_PATH__?: string }).__WILD_PATH__;

// Hydrate only the route this file was rendered for. Any other URL, including a
// Vercel 404.html fallback, mounts fresh so the markup cannot disagree.
if (rootElement.hasChildNodes() && prerendered && normalize(prerendered) === normalize(window.location.pathname)) {
  hydrateRoot(rootElement, app);
} else {
  createRoot(rootElement).render(app);
}
