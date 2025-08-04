import React, { useState } from 'react';
import { CategoryForm } from '../Components/CategoryForm';
import { createCategory } from '../Services/category.service';
import type { CategoriaProducto } from '../Types/types';

// Componente para registrar categorías
export const CategoryRegister: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Manejo del envío del formulario
  const handleSubmit = async (categoryData: Omit<CategoriaProducto, "categoria_id"> & { categoria_id: string }) => {
    setIsLoading(true);
    setMessage(null);

    try {
      const response = await createCategory(categoryData);
      
      if (response.data) {
        setMessage({
          type: 'success',
          text: `Categoría "${categoryData.nombre}" creada exitosamente con ID: ${categoryData.categoria_id}`
        });
      } else {
        setMessage({
          type: 'error',
          text: response.mensaje || 'Error al crear la categoría'
        });
      }
    } catch (error: unknown) {
      let errorMessage = 'Error de conexión al crear la categoría';
      
      // Type-safe error handling
      if (error && typeof error === 'object') {
        if ('message' in error && typeof error.message === 'string') {
          errorMessage = error.message;
        } else if ('mensaje' in error && typeof error.mensaje === 'string') {
          errorMessage = error.mensaje;
        }
      }
      
      setMessage({
        type: 'error',
        text: errorMessage
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Renderización del componente
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* Encabezado */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Registro de Categorías
          </h1>
          <p className="text-gray-600">
            Complete el formulario para registrar una nueva categoría de productos
          </p>
        </div>

        {/* Mensaje */}
        {message && (
          <div className={`mb-6 p-4 rounded-lg ${
            message.type === 'success' 
              ? 'bg-green-50 border border-green-200 text-green-800' 
              : 'bg-red-50 border border-red-200 text-red-800'
          }`}>
            <div className="flex items-center">
                           <div className={`w-5 h-5 rounded-full mr-3 ${
               message.type === 'success' ? 'bg-green-500' : 'bg-[#D71B07]'
             }`}></div>
              <span className="font-medium">{message.text}</span>
            </div>
          </div>
        )}

        {/* Formulario */}
        <CategoryForm onSubmit={handleSubmit} isLoading={isLoading} />

        {/* Instrucciones */}
                 <div className="mt-8 bg-red-50 border border-red-200 rounded-lg p-4">
           <h3 className="text-lg font-semibold text-red-900 mb-2">
             Instrucciones
           </h3>
           <ul className="text-sm text-red-800 space-y-1">
            <li>• El ID de categoría debe ser único y tener entre 5-50 caracteres</li>
            <li>• El nombre debe tener entre 3-100 caracteres</li>
            <li>• La descripción es opcional</li>
            <li>• Marque "Categoría activa" si desea que esté disponible inmediatamente</li>
          </ul>
        </div>
      </div>
    </div>
  );
}; 

export default CategoryRegister;