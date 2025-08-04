import './App.css'
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './Pages/Login';
import SidebarPage from './Pages/sidebar';
import NotFound from './Pages/NotFound'; // ← Importar el nuevo componente
import { useAuth } from './hooks/useAuth';

// Componente para rutas protegidas
const ProtectedRoute = ({ children, requiredRole }: { children: React.ReactNode, requiredRole?: string }) => {
  const { user, token, isInitialized } = useAuth();
  
  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto mb-2"></div>
          <p className="text-gray-600">Verificando permisos...</p>
        </div>
      </div>
    );
  }
  
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }
  
  if (requiredRole && user.rol !== requiredRole && user.rol !== 'admin' && user.rol !== 'administrador') {
    return <Navigate to="/unauthorized" replace />;
  }
  
  return <>{children}</>;
};

// Componente para cuando el usuario no está autorizado
const UnauthorizedPage = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg text-center">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Acceso Denegado</h1>
      <p className="text-gray-600 mb-6">No tienes permisos para acceder a esta página.</p>
      <button 
        onClick={() => window.location.href = '/login'}
        className="w-full text-white font-medium rounded-lg text-sm px-5 py-3 text-center transition-all duration-200"
        style={{ backgroundColor: '#D71B07' }}
      >
        Volver al Login
      </button>
    </div>
  </div>
);

function App() {
  const { user, token, isInitialized } = useAuth();
  
  console.log('🏠 App - Initialized:', isInitialized, 'Token:', !!token, 'User:', user?.rol);

  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Iniciando aplicación...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Routes>
        {/* Ruta de login - sin sidebar */}
        <Route path="/login" element={<LoginPage />} />
        
        {/* Todas las rutas protegidas usan SidebarPage como layout */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <SidebarPage />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/categorias/registro" 
          element={
            <ProtectedRoute requiredRole="admin">
              <SidebarPage />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/productos/registro" 
          element={
            <ProtectedRoute requiredRole="admin">
              <SidebarPage />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/ventas" 
          element={
            <ProtectedRoute>
              <SidebarPage />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/proveedores" 
          element={
            <ProtectedRoute>
              <SidebarPage />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/caja" 
          element={
            <ProtectedRoute>
              <SidebarPage />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/orden-compra" 
          element={
            <ProtectedRoute>
              <SidebarPage />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/empleados" 
          element={
            <ProtectedRoute>
              <SidebarPage />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/recepcion-compras" 
          element={
            <ProtectedRoute>
              <SidebarPage />
            </ProtectedRoute>
          } 
        />
        
        {/* Página de acceso denegado */}
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        
        {/* Ruta raíz - redirige según autenticación */}
        <Route 
          path="/" 
          element={
            token && user ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          } 
        />
        
        {/* Página 404 - DEBE estar al final */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
