import React, { useState } from 'react';
import type { CategoriaProducto } from '../Types/types';

// Props para el formulario de categoría
interface CategoryFormProps {
  onSubmit: (category: Omit<CategoriaProducto, "categoria_id"> & { categoria_id: string }) => void;
  isLoading?: boolean;
}

// Formulario de categoría
export const CategoryForm: React.FC<CategoryFormProps> = ({ onSubmit, isLoading = false }) => {
  const [formData, setFormData] = useState({
    categoria_id: "",
    nombre: "",
    descripcion: "",
    activo: true,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Validación del formulario
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.categoria_id.trim()) {
      newErrors.categoria_id = "El ID de categoría es requerido";
    } else if (formData.categoria_id.length < 5 || formData.categoria_id.length > 10) {
      newErrors.categoria_id = "El ID debe tener entre 5 y 10 caracteres";
    }

    if (!formData.nombre.trim()) {
      newErrors.nombre = "El nombre es requerido";
    } else if (formData.nombre.length < 3 || formData.nombre.length > 100) {
      newErrors.nombre = "El nombre debe tener entre 3 y 100 caracteres";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Manejo del envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  // Manejo del cambio de los campos del formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));

    // Limpiar errores cuando el usuario comienza a escribir
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Reinicio del formulario
    const resetForm = () => {
    setFormData({
      categoria_id: "",
      nombre: "",
      descripcion: "",
      activo: true,
    });
    setErrors({});
  };
// Renderización del formulario
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* ID de Categoría */}
        <div>
          <label htmlFor="categoria_id" className="block mb-2 text-sm font-medium text-gray-900">
            ID de Categoría *
          </label>
          <input
            type="text"
            id="categoria_id"
            name="categoria_id"
            value={formData.categoria_id}
            onChange={handleChange}
                         className={`bg-gray-50 border ${
               errors.categoria_id
                 ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                 : "border-gray-300 focus:ring-[#D71B07] focus:border-[#D71B07]"
             } text-gray-900 text-sm rounded-lg block w-full p-2.5`}
            placeholder="Ej: CAT001"
            maxLength={10}
          />
          {errors.categoria_id && (
            <p className="mt-2 text-sm text-red-600">
              <span className="font-medium">Error:</span> {errors.categoria_id}
            </p>
          )}
          <p className="mt-1 text-xs text-gray-500">
            Código único de 5-10 caracteres para identificar la categoría
          </p>
        </div>

        {/* Nombre */}
        <div>
          <label htmlFor="nombre" className="block mb-2 text-sm font-medium text-gray-900">
            Nombre de la Categoría *
          </label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
                         className={`bg-gray-50 border ${
               errors.nombre
                 ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                 : "border-gray-300 focus:ring-[#D71B07] focus:border-[#D71B07]"
             } text-gray-900 text-sm rounded-lg block w-full p-2.5`}
            placeholder="Ej: Herramientas Eléctricas"
            maxLength={100}
          />
          {errors.nombre && (
            <p className="mt-2 text-sm text-red-600">
              <span className="font-medium">Error:</span> {errors.nombre}
            </p>
          )}
        </div>

        {/* Descripción */}
        <div>
          <label htmlFor="descripcion" className="block mb-2 text-sm font-medium text-gray-900">
            Descripción
          </label>
          <textarea
            id="descripcion"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            rows={3}
                         className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#D71B07] focus:border-[#D71B07] block w-full p-2.5"
            placeholder="Descripción opcional de la categoría..."
          />
        </div>

        {/* Estado Activo */}
        <div className="flex items-center">
          <input
            id="activo"
            name="activo"
            type="checkbox"
            checked={formData.activo}
            onChange={handleChange}
                         className="w-4 h-4 text-[#D71B07] bg-gray-100 border-gray-300 rounded focus:ring-[#D71B07] focus:ring-2"
          />
          <label htmlFor="activo" className="ml-2 text-sm font-medium text-gray-900">
            Categoría activa
          </label>
        </div>

        {/* Botones */}
        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={isLoading}
                         className="flex-1 bg-[#D71B07] hover:bg-[#B01505] disabled:bg-[#F5A5A0] text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Guardando...
              </div>
            ) : (
              "Guardar Categoría"
            )}
          </button>
          <button
            type="button"
            onClick={resetForm}
            className="px-6 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors duration-200"
          >
            Limpiar
          </button>
        </div>
      </form>
    </div>
  );
}; 