import './App.css'
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import LoginPage from './Pages/Login';
import { CategoryRegister } from './Pages/CategoryRegister';
import { ProductRegister } from './Pages/ProductRegister';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/categorias/registro" element={<CategoryRegister />} />
        <Route path="/productos/registro" element={<ProductRegister />} />
      </Routes>
    </div>
  );
}

export default App
