import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AppProviders } from '@/providers/app.providers';
import { AppRouter } from '@/routes/router';
import '@/styles/globals.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProviders>
      <AppRouter />
    </AppProviders>
  </StrictMode>,
);
