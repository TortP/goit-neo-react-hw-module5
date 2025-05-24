import React from 'react';
import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Suspense fallback={<div>Loading...</div>}>
      <App />
    </Suspense>
  </BrowserRouter>
);
