import React from 'react';
import ReactDOM from 'react-dom/client';
import { ProductProvider } from './hooks/ProductContext';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './stylesheets/main.scss';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ProductProvider>
      <App />
    </ProductProvider>
  </React.StrictMode>,
);
