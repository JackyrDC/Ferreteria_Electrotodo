import React from 'react';
import { useNavigate } from 'react-router-dom'; // ← Agregar esta importación
import Nut404Animation from '../Components/404';

const NotFound: React.FC = () => {
  const navigate = useNavigate(); // ← Agregar este hook
  
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full mx-4">
        {/* Contenedor de la animación */}
        <div className="flex justify-center mb-6">
          <Nut404Animation width={200} height={150} />
        </div>
        
        {/* Contenido del error */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Página no encontrada
          </h2>
          <p className="text-gray-600 mb-6">
            Lo sentimos, la página que buscas no existe o ha sido movida.
          </p>
          
          {/* Botones de acción */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => window.history.back()}
              className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200 font-medium"
            >
              Volver atrás
            </button>
            <button
              onClick={() => navigate('/')}
              className="px-6 py-3 text-white rounded-lg hover:shadow-lg transition-all duration-200 font-medium transform hover:scale-[1.02]"
              style={{ backgroundColor: '#D71B07' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#B01505'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#D71B07'}
            >
              Ir al inicio
            </button>
          </div>
        </div>
      </div>
      
      {/* Información adicional */}
      <div className="mt-8 text-center text-gray-500 text-sm">
        <p>Si crees que esto es un error, contacta al administrador del sistema.</p>
      </div>
    </div>
  );
};

export default NotFound;