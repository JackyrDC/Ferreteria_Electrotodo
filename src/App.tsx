import './App.css'
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import LoginPage from './Pages/Login';
import { CategoryRegister } from './Pages/CategoryRegister';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">
                Ferretería Electrotodo
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link 
                to="/" 
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                Login
              </Link>
              <Link 
                to="/categorias/registro" 
                className="bg-[#D71B07] hover:bg-[#B01505] text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Registrar Categoría
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/categorias/registro" element={<CategoryRegister />} />
      </Routes>
    </div>
  );
}

export default App
