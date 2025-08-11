import React, { useState, useEffect } from 'react';
import { ProductForm } from '../Components/ProductForm';
import { createProduct, getAllProducts, updateProduct, deleteProduct } from '../Services/product.service';
import type { Producto } from '../Types/types';

// Componente para listar productos
const ProductList: React.FC<{
  products: Producto[];
  loading: boolean;
  onRefresh: () => void;
}> = ({ products, loading, onRefresh }) => {
  console.log('📋 ProductList renderizado con:', { products, loading });
  const [editingProduct, setEditingProduct] = useState<Producto | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState<string | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editFormData, setEditFormData] = useState({
    nombre: '',
    descripcion: '',
    precio_venta: '',
    precio_compra: '',
    stock_minimo: '',
    stock_actual: '',
    activo: true
  });
  const [editLoading, setEditLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const handleEdit = (product: Producto) => {
    setEditingProduct(product);
    setEditFormData({
      nombre: product.nombre,
      descripcion: product.descripcion,
      precio_venta: product.precio_venta.toString(),
      precio_compra: product.precio_compra.toString(),
      stock_minimo: product.stock_minimo.toString(),
      stock_actual: product.stock_actual.toString(),
      activo: product.activo
    });
    setShowEditModal(true);
  };

  const handleUpdateProduct = async () => {
    if (!editingProduct) return;
    
    setEditLoading(true);
    try {
      const formData = new FormData();
      formData.append('nombre', editFormData.nombre);
      formData.append('descripcion', editFormData.descripcion);
      formData.append('precio_venta', editFormData.precio_venta);
      formData.append('precio_compra', editFormData.precio_compra);
      formData.append('stock_minimo', editFormData.stock_minimo);
      formData.append('stock_actual', editFormData.stock_actual);
      formData.append('activo', editFormData.activo.toString());

      const response = await updateProduct(editingProduct.codigo, formData);
      
      if (response.data) {
        alert(`Producto "${editFormData.nombre}" actualizado exitosamente`);
        setShowEditModal(false);
        setEditingProduct(null);
        onRefresh();
      } else {
        alert(response.mensaje || 'Error al actualizar el producto');
      }
    } catch (error) {
      console.error('Error actualizando producto:', error);
      alert('Error al actualizar el producto');
    } finally {
      setEditLoading(false);
    }
  };

  const handleDelete = async (codigo: string) => {
    // Validar que el código esté presente
    if (!codigo || codigo.trim() === '') {
      alert('Error: Código de producto no válido');
      setShowDeleteModal(null);
      return;
    }
    
    setDeleteLoading(true);
            try {
          const response = await deleteProduct(codigo);
      
      if (response.data) {
        alert('Producto eliminado exitosamente');
        setShowDeleteModal(null);
        onRefresh();
      } else {
        alert(response.mensaje || 'Error al eliminar el producto');
        setShowDeleteModal(null);
      }
    } catch (error: any) {
      console.error('Error eliminando producto:', error);
      
      let errorMessage = 'Error al eliminar el producto';
      if (error.message) {
        errorMessage = error.message;
      }
      if (error.error) {
        errorMessage += ` (${error.error})`;
      }
      alert(`Error al eliminar el producto:\n${errorMessage}`);
      setShowDeleteModal(null);
    } finally {
      setDeleteLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#D71B07]"></div>
          <span className="ml-3 text-gray-600">Cargando productos...</span>
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
            Productos ({products.length})
          </h3>
          <button
            onClick={onRefresh}
            className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            🔄 Actualizar
          </button>
        </div>
      </div>

      {/* Tabla de productos */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Código
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nombre
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Categoría
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Precio Venta
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Stock
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
            {products.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                  No hay productos registrados
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product.codigo} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {product.codigo}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {product.nombre}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {product.categoria?.nombre || 'Sin categoría'}
                  </td>
                                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                     ${typeof product.precio_venta === 'number' ? product.precio_venta.toFixed(2) : Number(product.precio_venta || 0).toFixed(2)}
                   </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                         <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                       (Number(product.stock_actual) || 0) <= (Number(product.stock_minimo) || 0)
                         ? 'bg-red-100 text-red-800' 
                         : 'bg-green-100 text-green-800'
                     }`}>
                       {Number(product.stock_actual) || 0} / {Number(product.stock_minimo) || 0}
                     </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      product.activo 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {product.activo ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(product)}
                        className="text-[#D71B07] hover:text-[#B91C1C] transition-colors"
                      >
                        ✏️ Editar
                      </button>
                      <button
                        onClick={() => setShowDeleteModal(product.codigo)}
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
      {showEditModal && editingProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Editar Producto: {editingProduct.codigo}
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
                   placeholder="Nombre del producto"
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
                   placeholder="Descripción del producto"
                 />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Precio Venta
                  </label>
                                     <input
                     type="number"
                     step="0.01"
                     value={editFormData.precio_venta}
                     onChange={(e) => setEditFormData({...editFormData, precio_venta: e.target.value})}
                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#D71B07] focus:border-[#D71B07] text-gray-900 bg-white"
                     placeholder="0.00"
                   />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Precio Compra
                  </label>
                                     <input
                     type="number"
                     step="0.01"
                     value={editFormData.precio_compra}
                     onChange={(e) => setEditFormData({...editFormData, precio_compra: e.target.value})}
                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#D71B07] focus:border-[#D71B07] text-gray-900 bg-white"
                     placeholder="0.00"
                   />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Stock Actual
                  </label>
                                     <input
                     type="number"
                     value={editFormData.stock_actual}
                     onChange={(e) => setEditFormData({...editFormData, stock_actual: e.target.value})}
                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#D71B07] focus:border-[#D71B07] text-gray-900 bg-white"
                     placeholder="0"
                   />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Stock Mínimo
                  </label>
                                     <input
                     type="number"
                     value={editFormData.stock_minimo}
                     onChange={(e) => setEditFormData({...editFormData, stock_minimo: e.target.value})}
                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#D71B07] focus:border-[#D71B07] text-gray-900 bg-white"
                     placeholder="0"
                   />
                </div>
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
                  Producto activo
                </label>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setEditingProduct(null);
                }}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                disabled={editLoading}
              >
                Cancelar
              </button>
              <button
                onClick={handleUpdateProduct}
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
              ¿Estás seguro de que quieres eliminar este producto? Esta acción no se puede deshacer.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteModal(null)}
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

// Componente para el registro de productos
export const ProductRegister: React.FC = () => {
  const [view, setView] = useState<'create' | 'list'>('create');
  const [products, setProducts] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Cargar productos cuando se cambie a la vista de lista
  useEffect(() => {
    if (view === 'list') {
      loadProducts();
    }
  }, [view]);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const response = await getAllProducts();
      
      // Verificar diferentes posibles estructuras de respuesta
      let productsArray: Producto[] = [];
      
      if (response.data && Array.isArray(response.data)) {
        // Estructura esperada: { data: [...] }
        productsArray = response.data;
      } else if (Array.isArray(response)) {
        // Estructura directa: [...]
        productsArray = response;
      } else if (response && typeof response === 'object') {
        // Buscar arrays en cualquier propiedad
        for (const key in response) {
          if (Array.isArray((response as any)[key])) {
            productsArray = (response as any)[key];
            break;
          }
        }
      }
      
      if (productsArray.length > 0) {
        setProducts(productsArray);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error('Error cargando productos:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async (productData: FormData) => {
    setLoading(true);
    setMessage(null);

    // Intento de crear el producto
    try {
      const response = await createProduct(productData);
      
      // Si el producto se crea correctamente, se muestra un mensaje de éxito
      if (response.data) {
        setMessage({
          type: 'success',
          text: `Producto "${productData.get('nombre')}" creado exitosamente con código: ${productData.get('codigo')}`
        });
        // Cambiar a la vista de lista después de crear
        setTimeout(() => {
          setView('list');
        }, 2000);
      } else {
        // Si el producto no se crea correctamente, se muestra un mensaje de error
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
      
      // Se muestra un mensaje de error
      setMessage({
        type: 'error',
        text: errorMessage
      });
    } finally {
      // Se desactiva el estado de carga
      setLoading(false);
    }
  };

  // Renderizado del formulario
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Gestión de Productos
          </h1>
          <p className="text-gray-600">
            {view === 'create' ? 'Crear nuevo producto' : 'Administrar productos existentes'}
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
            ➕ Crear Producto
          </button>
          <button 
            onClick={() => setView('list')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              view === 'list' 
                ? 'bg-[#D71B07] text-white' 
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            📋 Listar Productos
          </button>
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

        {/* Contenido dinámico */}
        {view === 'create' && (
          <div className="space-y-6">
            <ProductForm onSubmit={handleSubmit} isLoading={loading} />

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
        )}
        
        {view === 'list' && (
          <ProductList 
            products={products} 
            loading={loading} 
            onRefresh={loadProducts} 
          />
        )}
      </div>
    </div>
  );
}; 

export default ProductRegister;