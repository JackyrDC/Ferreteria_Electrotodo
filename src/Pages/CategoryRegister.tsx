import React, { useState, useEffect } from 'react';
import { CategoryForm } from '../Components/CategoryForm';
import { createCategory, getAllCategories, updateCategory, deleteCategory } from '../Services/category.service';
import type { CategoriaProducto } from '../Types/types';

// Componente para listar categorías
const CategoryList: React.FC<{
  categories: CategoriaProducto[];
  loading: boolean;
  onRefresh: () => void;
}> = ({ categories, loading, onRefresh }) => {
  const [editingCategory, setEditingCategory] = useState<CategoriaProducto | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState<string | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editFormData, setEditFormData] = useState({
    nombre: '',
    descripcion: '',
    activo: true
  });
  const [editLoading, setEditLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Función para cerrar el modal de eliminación de manera robusta
  const closeDeleteModal = () => {
    setShowDeleteModal(null);
    setDeleteLoading(false);
  };





  const handleEdit = (category: CategoriaProducto) => {
    setEditingCategory(category);
    setEditFormData({
      nombre: category.nombre,
      descripcion: category.descripcion,
      activo: category.activo
    });
    setShowEditModal(true);
  };

  const handleUpdateCategory = async () => {
    if (!editingCategory) return;
    
    setEditLoading(true);
    try {
      const response = await updateCategory(editingCategory.categoria_id, editFormData);
      
      if (response.data) {
        alert(`Categoría "${editFormData.nombre}" actualizada exitosamente`);
        setShowEditModal(false);
        setEditingCategory(null);
        onRefresh();
      } else {
        alert(response.mensaje || 'Error al actualizar la categoría');
      }
    } catch (error) {
      console.error('Error actualizando categoría:', error);
      alert('Error al actualizar la categoría');
    } finally {
      setEditLoading(false);
    }
  };

  const handleDelete = async (categoriaId: string) => {
    if (deleteLoading || !showDeleteModal) return; // Evitar invocaciones múltiples
    
    if (!categoriaId || categoriaId.trim() === '') {
      alert('Error: ID de categoría no válido');
      closeDeleteModal();
      return;
    }
    
    setDeleteLoading(true);
    try {
      const response = await deleteCategory(categoriaId);
      
      if (response.data) {
        closeDeleteModal();
        onRefresh();
        alert('Categoría eliminada exitosamente');
      } else {
        alert(response.mensaje || 'Error al eliminar la categoría');
        closeDeleteModal();
      }
    } catch (error: any) {
      console.error('Error eliminando categoría:', error);
      
      if (error.error && error.error.includes('404')) {
        closeDeleteModal();
        onRefresh();
      } else {
        let errorMessage = 'Error al eliminar la categoría';
        if (error.message) errorMessage = error.message;
        if (error.error) errorMessage += ` (${error.error})`;
        alert(`Error al eliminar la categoría:\n${errorMessage}`);
        closeDeleteModal();
      }
    } finally {
      setDeleteLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#D71B07]"></div>
          <span className="ml-3 text-gray-600">Cargando categorías...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow">
      {/* Header de la tabla */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900">
            Categorías ({categories.length})
          </h3>
          <button
            onClick={onRefresh}
            className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            🔄 Actualizar
          </button>
        </div>
      </div>

      {/* Tabla de categorías */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nombre
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Descripción
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Estado
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {categories.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                  No hay categorías registradas
                </td>
              </tr>
            ) : (
              categories.map((category) => (
                <tr key={category.categoria_id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {category.categoria_id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {category.nombre}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {category.descripcion || 'Sin descripción'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      category.activo 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {category.activo ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(category)}
                        className="text-[#D71B07] hover:text-[#B91C1C] transition-colors"
                      >
                        ✏️ Editar
                      </button>
                      <button
                        onClick={() => setShowDeleteModal(category.categoria_id)}
                        className="text-red-600 hover:text-red-800 transition-colors"
                      >
                        🗑️ Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal de edición */}
      {showEditModal && editingCategory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Editar Categoría: {editingCategory.categoria_id}
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre
                </label>
                                 <input
                   type="text"
                   value={editFormData.nombre}
                   onChange={(e) => setEditFormData({...editFormData, nombre: e.target.value})}
                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#D71B07] focus:border-[#D71B07] text-gray-900 bg-white"
                   placeholder="Nombre de la categoría"
                 />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Descripción
                </label>
                                 <textarea
                   value={editFormData.descripcion}
                   onChange={(e) => setEditFormData({...editFormData, descripcion: e.target.value})}
                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#D71B07] focus:border-[#D71B07] text-gray-900 bg-white"
                   rows={3}
                   placeholder="Descripción de la categoría"
                 />
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="activo"
                  checked={editFormData.activo}
                  onChange={(e) => setEditFormData({...editFormData, activo: e.target.checked})}
                  className="h-4 w-4 text-[#D71B07] focus:ring-[#D71B07] border-gray-300 rounded"
                />
                <label htmlFor="activo" className="ml-2 block text-sm text-gray-900">
                  Categoría activa
                </label>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setEditingCategory(null);
                }}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                disabled={editLoading}
              >
                Cancelar
              </button>
              <button
                onClick={handleUpdateCategory}
                className="px-4 py-2 bg-[#D71B07] text-white rounded-lg hover:bg-[#B91C1C] transition-colors disabled:opacity-50"
                disabled={editLoading}
              >
                {editLoading ? 'Guardando...' : 'Guardar Cambios'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de confirmación de eliminación */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Confirmar eliminación
            </h3>
            <p className="text-gray-600 mb-6">
              ¿Estás seguro de que quieres eliminar esta categoría? Esta acción no se puede deshacer.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  console.log('🚫 Cancelando eliminación, cerrando modal...');
                  closeDeleteModal();
                }}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                disabled={deleteLoading}
              >
                Cancelar
              </button>
                      <button
          onClick={() => handleDelete(showDeleteModal)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                disabled={deleteLoading || !showDeleteModal}
              >
                {deleteLoading ? 'Eliminando...' : 'Eliminar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Componente principal para registrar categorías
export const CategoryRegister: React.FC = () => {
  const [view, setView] = useState<'create' | 'list'>('create');
  const [categories, setCategories] = useState<CategoriaProducto[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Cargar categorías cuando se cambie a la vista de lista
  useEffect(() => {
    if (view === 'list') {
      loadCategories();
    }
  }, [view]);

  const loadCategories = async () => {
    setLoading(true);
    try {
      console.log('🔄 Cargando categorías...');
      const response = await getAllCategories();
      console.log('📦 Respuesta completa:', response);
      
      // Verificar diferentes posibles estructuras de respuesta
      let categoriesArray: CategoriaProducto[] = [];
      
      if (response.data && Array.isArray(response.data)) {
        // Estructura esperada: { data: [...] }
        categoriesArray = response.data;
      } else if (Array.isArray(response)) {
        // Estructura directa: [...]
        categoriesArray = response;
      } else if (response && typeof response === 'object') {
        // Buscar arrays en cualquier propiedad
        for (const key in response) {
          if (Array.isArray((response as any)[key])) {
            categoriesArray = (response as any)[key];
            break;
          }
        }
      }
      
      if (categoriesArray.length > 0) {
        setCategories(categoriesArray);
      } else {
        setCategories([]);
      }
    } catch (error) {
      console.error('Error cargando categorías:', error);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  // Manejo del envío del formulario
  const handleSubmit = async (categoryData: Omit<CategoriaProducto, "categoria_id"> & { categoria_id: string }) => {
    setLoading(true);
    setMessage(null);

    try {
      const response = await createCategory(categoryData);
      
      if (response.data) {
        setMessage({
          type: 'success',
          text: `Categoría "${categoryData.nombre}" creada exitosamente con ID: ${categoryData.categoria_id}`
        });
        // Cambiar a la vista de lista después de crear
        setTimeout(() => {
          setView('list');
        }, 2000);
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
      setLoading(false);
    }
  };

  // Renderización del componente
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Encabezado */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Gestión de Categorías
          </h1>
          <p className="text-gray-600">
            {view === 'create' ? 'Crear nueva categoría' : 'Administrar categorías existentes'}
          </p>
        </div>

        {/* Botones de navegación */}
        <div className="flex gap-4 mb-6">
          <button 
            onClick={() => setView('create')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              view === 'create' 
                ? 'bg-[#D71B07] text-white' 
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            ➕ Crear Categoría
          </button>
          <button 
            onClick={() => setView('list')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              view === 'list' 
                ? 'bg-[#D71B07] text-white' 
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            📋 Listar Categorías
          </button>
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

        {/* Contenido dinámico */}
        {view === 'create' && (
          <div className="space-y-6">
            <CategoryForm onSubmit={handleSubmit} isLoading={loading} />
            
            {/* Instrucciones */}
            <div className="mt-8 bg-red-50 border border-red-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-red-900 mb-2">
                Instrucciones
              </h3>
              <ul className="text-sm text-red-800 space-y-1">
                <li>• El ID de categoría debe ser único y tener entre 5-10 caracteres</li>
                <li>• El nombre debe tener entre 3-100 caracteres</li>
                <li>• La descripción es opcional</li>
                <li>• Marque "Categoría activa" si desea que esté disponible inmediatamente</li>
              </ul>
            </div>
          </div>
        )}
        
        {view === 'list' && (
          <CategoryList 
            categories={categories} 
            loading={loading} 
            onRefresh={loadCategories} 
          />
        )}
      </div>
    </div>
  );
};

export default CategoryRegister;