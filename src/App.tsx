import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// pages
import Home from './pages/Home';
import ProductDetailPage from './pages/DetailPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail/:productId" element={<ProductDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
