import React, { useState } from 'react';
import { ProductForm } from '../Components/ProductForm';
import { createProduct } from '../Services/product.service';

export const ProductRegister: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = async (productData: FormData) => {
    setIsLoading(true);
    setMessage(null);

    try {
      const response = await createProduct(productData);
      
      if (response.data) {
        setMessage({
          type: 'success',
          text: `Producto "${productData.get('nombre')}" creado exitosamente con código: ${productData.get('codigo')}`
        });
      } else {
        setMessage({
          type: 'error',
          text: response.mensaje || 'Error al crear el producto'
        });
      }
    } catch (error: unknown) {
      let errorMessage = 'Error de conexión al crear el producto';
      
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

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Registro de Productos
          </h1>
          <p className="text-gray-600">
            Complete el formulario para registrar un nuevo producto en el inventario
          </p>
        </div>

        {/* Message */}
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

        {/* Form */}
        <ProductForm onSubmit={handleSubmit} isLoading={isLoading} />

        {/* Instructions */}
        <div className="mt-8 bg-red-50 border border-red-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-red-900 mb-2">
            Instrucciones
          </h3>
          <ul className="text-sm text-red-800 space-y-1">
            <li>• El código debe ser único y tener entre 5-20 caracteres</li>
            <li>• El nombre debe tener entre 3-100 caracteres</li>
            <li>• Los precios deben ser mayores a 0</li>
            <li>• Seleccione una categoría válida</li>
            <li>• La imagen es opcional (máximo 5MB)</li>
            <li>• Marque "Producto activo" si desea que esté disponible inmediatamente</li>
          </ul>
        </div>
      </div>
    </div>
  );
}; 