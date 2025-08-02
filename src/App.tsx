import './App.css'
import React from 'react';
import LoginPage from './Pages/Login';
import SidebarPage from './Pages/sidebar';
function App() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <LoginPage />
       {/* Falta agregar logica  */}
      {/* Una vez que el usuario inicie sesión, se visualice SidebarPage */}
      <SidebarPage />
    </div>
  );
}


export default App
