import React, { useState, useEffect, useRef } from 'react';
import type { CategoriaProducto } from '../Types/types';
import { getAllCategories } from '../Services/category.service';
// interface    
interface ProductFormProps {
  onSubmit: (productData: FormData) => void;
  isLoading?: boolean;
}
// Componente para el formulario de productos
export const ProductForm: React.FC<ProductFormProps> = ({ onSubmit, isLoading = false }) => {
  const [formData, setFormData] = useState({
    codigo: "",
    nombre: "",
    descripcion: "",
    precio_venta: "",
    precio_compra: "",
    stock_minimo: "",
    stock_actual: "",
    categoria_id: "",
    activo: true,
  });
// Estado para las categorías
  const [categories, setCategories] = useState<CategoriaProducto[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [categoriesError, setCategoriesError] = useState<string | null>(null);
// Estado para los errores
  const [errors, setErrors] = useState<Record<string, string>>({});
// Estado para la imagen previa
  const [imagePreview, setImagePreview] = useState<string | null>(null);
// Referencia al input de imagen
  const fileInputRef = useRef<HTMLInputElement>(null);
// Efecto para cargar las categorías
  useEffect(() => {
    loadCategories();
  }, []);
// Función para cargar las categorías
  const loadCategories = async () => {
    try {
      setCategoriesLoading(true);
      setCategoriesError(null);
      
      
      const response = await getAllCategories();
      
      
      
      
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
            console.log(`Encontrado array en propiedad: ${key}`, (response as any)[key]);
            categoriesArray = (response as any)[key];
            break;
          }
        }
      }
      
      if (categoriesArray.length > 0) {
        const activeCategories = categoriesArray.filter((cat) => cat.activo);
        console.log('Categorías activas:', activeCategories);
        setCategories(activeCategories);
      } else {
        console.log('No se encontraron categorías en la respuesta:', response);
        setCategories([]);
        setCategoriesError('No se pudieron cargar las categorías');
      }
    } catch (error) {
      console.error('Error loading categories:', error);
      setCategories([]);
      setCategoriesError('Error al cargar las categorías');
    } finally {
      setCategoriesLoading(false);
    }
  };
// Función para validar el formulario
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.codigo.trim()) {
      newErrors.codigo = "El código es requerido";
    } else if (formData.codigo.length < 5 || formData.codigo.length > 20) {
      newErrors.codigo = "El código debe tener entre 5 y 20 caracteres";
    }

    if (!formData.nombre.trim()) {
      newErrors.nombre = "El nombre es requerido";
    } else if (formData.nombre.length < 3 || formData.nombre.length > 100) {
      newErrors.nombre = "El nombre debe tener entre 3 y 100 caracteres";
    }

    if (!formData.precio_venta || Number.parseFloat(formData.precio_venta) <= 0) {
      newErrors.precio_venta = "El precio de venta debe ser mayor a 0";
    }

    if (!formData.precio_compra || Number.parseFloat(formData.precio_compra) <= 0) {
      newErrors.precio_compra = "El precio de compra debe ser mayor a 0";
    }

    if (!formData.categoria_id) {
      newErrors.categoria_id = "Debe seleccionar una categoría";
    }

    if (formData.stock_minimo && Number.parseInt(formData.stock_minimo) < 0) {
      newErrors.stock_minimo = "El stock mínimo no puede ser negativo";
    }

    if (formData.stock_actual && Number.parseInt(formData.stock_actual) < 0) {
      newErrors.stock_actual = "El stock actual no puede ser negativo";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
// Función para manejar el envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const formDataToSend = new FormData();

      // Agregar todos los campos del formulario
      formDataToSend.append("codigo", formData.codigo);
      formDataToSend.append("nombre", formData.nombre);
      formDataToSend.append("descripcion", formData.descripcion);
      formDataToSend.append("precio_venta", formData.precio_venta);
      formDataToSend.append("precio_compra", formData.precio_compra);
      formDataToSend.append("stock_minimo", formData.stock_minimo || "0");
      formDataToSend.append("stock_actual", formData.stock_actual || "0");
      formDataToSend.append("categoria_id", formData.categoria_id);
      formDataToSend.append("activo", formData.activo.toString());

      // Agregar imagen si existe
      if (fileInputRef.current?.files?.[0]) {
        formDataToSend.append("imagen", fileInputRef.current.files[0]);
      }

      onSubmit(formDataToSend);
    }
  };
// Función para manejar los cambios en el formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };
// Función para manejar los cambios en la imagen
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validar tipo de archivo
      if (!file.type.startsWith('image/')) {
        setErrors((prev) => ({ ...prev, imagen: "Por favor seleccione un archivo de imagen válido" }));
        return;
      }

      // Validar tamaño (máximo 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({ ...prev, imagen: "La imagen no puede ser mayor a 5MB" }));
        return;
      }

      // Crear preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);

      // Clear error
      if (errors.imagen) {
        setErrors((prev) => ({ ...prev, imagen: "" }));
      }
    }
  };
// Función para reiniciar el formulario 
  const resetForm = () => {
    setFormData({
      codigo: "",
      nombre: "",
      descripcion: "",
      precio_venta: "",
      precio_compra: "",
      stock_minimo: "",
      stock_actual: "",
      categoria_id: "",
      activo: true,
    });
    setErrors({});
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
// Renderizado del formulario       
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Código del Producto */}
        <div>
          <label htmlFor="codigo" className="block mb-2 text-sm font-medium text-gray-900">
            Código del Producto *
          </label>
          <input
            type="text"
            id="codigo"
            name="codigo"
            value={formData.codigo}
            onChange={handleChange}
            className={`bg-gray-50 border ${
              errors.codigo
                ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                : "border-gray-300 focus:ring-[#D71B07] focus:border-[#D71B07]"
            } text-gray-900 text-sm rounded-lg block w-full p-2.5`}
            placeholder="Ej: PROD001"
            maxLength={20}
          />
          {errors.codigo && (
            <p className="mt-2 text-sm text-red-600">
              <span className="font-medium">Error:</span> {errors.codigo}
            </p>
          )}
          <p className="mt-1 text-xs text-gray-500">
            Código único de 5-20 caracteres para identificar el producto
          </p>
        </div>

        {/* Nombre */}
        <div>
          <label htmlFor="nombre" className="block mb-2 text-sm font-medium text-gray-900">
            Nombre del Producto *
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
            placeholder="Ej: Martillo Eléctrico"
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
            placeholder="Descripción detallada del producto..."
          />
        </div>

        {/* Precios */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="precio_venta" className="block mb-2 text-sm font-medium text-gray-900">
              Precio de Venta *
            </label>
            <input
              type="number"
              id="precio_venta"
              name="precio_venta"
              value={formData.precio_venta}
              onChange={handleChange}
              step="0.01"
              min="0"
              className={`bg-gray-50 border ${
                errors.precio_venta
                  ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                  : "border-gray-300 focus:ring-[#D71B07] focus:border-[#D71B07]"
              } text-gray-900 text-sm rounded-lg block w-full p-2.5`}
              placeholder="0.00"
            />
            {errors.precio_venta && (
              <p className="mt-2 text-sm text-red-600">
                <span className="font-medium">Error:</span> {errors.precio_venta}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="precio_compra" className="block mb-2 text-sm font-medium text-gray-900">
              Precio de Compra *
            </label>
            <input
              type="number"
              id="precio_compra"
              name="precio_compra"
              value={formData.precio_compra}
              onChange={handleChange}
              step="0.01"
              min="0"
              className={`bg-gray-50 border ${
                errors.precio_compra
                  ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                  : "border-gray-300 focus:ring-[#D71B07] focus:border-[#D71B07]"
              } text-gray-900 text-sm rounded-lg block w-full p-2.5`}
              placeholder="0.00"
            />
            {errors.precio_compra && (
              <p className="mt-2 text-sm text-red-600">
                <span className="font-medium">Error:</span> {errors.precio_compra}
              </p>
            )}
          </div>
        </div>

        {/* Stock */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="stock_minimo" className="block mb-2 text-sm font-medium text-gray-900">
              Stock Mínimo
            </label>
            <input
              type="number"
              id="stock_minimo"
              name="stock_minimo"
              value={formData.stock_minimo}
              onChange={handleChange}
              min="0"
              className={`bg-gray-50 border ${
                errors.stock_minimo
                  ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                  : "border-gray-300 focus:ring-[#D71B07] focus:border-[#D71B07]"
              } text-gray-900 text-sm rounded-lg block w-full p-2.5`}
              placeholder="0"
            />
            {errors.stock_minimo && (
              <p className="mt-2 text-sm text-red-600">
                <span className="font-medium">Error:</span> {errors.stock_minimo}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="stock_actual" className="block mb-2 text-sm font-medium text-gray-900">
              Stock Actual
            </label>
            <input
              type="number"
              id="stock_actual"
              name="stock_actual"
              value={formData.stock_actual}
              onChange={handleChange}
              min="0"
              className={`bg-gray-50 border ${
                errors.stock_actual
                  ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                  : "border-gray-300 focus:ring-[#D71B07] focus:border-[#D71B07]"
              } text-gray-900 text-sm rounded-lg block w-full p-2.5`}
              placeholder="0"
            />
            {errors.stock_actual && (
              <p className="mt-2 text-sm text-red-600">
                <span className="font-medium">Error:</span> {errors.stock_actual}
              </p>
            )}
          </div>
        </div>

        {/* Categoría */}
        <div>
          <label htmlFor="categoria_id" className="block mb-2 text-sm font-medium text-gray-900">
            Categoría *
          </label>
                     <select
             id="categoria_id"
             name="categoria_id"
             value={formData.categoria_id}
             onChange={handleChange}
             disabled={categoriesLoading}
             className={`bg-gray-50 border ${
               errors.categoria_id
                 ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                 : "border-gray-300 focus:ring-[#D71B07] focus:border-[#D71B07]"
             } text-gray-900 text-sm rounded-lg block w-full p-2.5 ${
               categoriesLoading ? 'opacity-50 cursor-not-allowed' : ''
             } focus:ring-[#D71B07] focus:border-[#D71B07]`}
           >
            <option value="">
              {categoriesLoading 
                ? 'Cargando categorías...' 
                : categoriesError 
                  ? 'Error al cargar categorías' 
                  : 'Seleccione una categoría'
              }
            </option>
            {!categoriesLoading && !categoriesError && categories.map((category) => (
              <option key={category.categoria_id} value={category.categoria_id}>
                {category.nombre}
              </option>
            ))}
          </select>
          {errors.categoria_id && (
            <p className="mt-2 text-sm text-red-600">
              <span className="font-medium">Error:</span> {errors.categoria_id}
            </p>
          )}
          {categoriesError && (
            <div className="mt-2">
              <p className="text-sm text-red-600 mb-2">
                <span className="font-medium">Error:</span> {categoriesError}
              </p>
              <button
                type="button"
                onClick={loadCategories}
                className="text-sm bg-[#D71B07] hover:bg-[#B01505] text-white px-3 py-1 rounded-md transition-colors duration-200"
              >
                Reintentar
              </button>
            </div>
          )}
          {categoriesLoading && (
            <p className="mt-2 text-sm text-blue-600">
              <span className="font-medium">Cargando categorías...</span>
            </p>
          )}
        </div>

        {/* Imagen */}
        <div>
          <label htmlFor="imagen" className="block mb-2 text-sm font-medium text-gray-900">
            Imagen del Producto
          </label>
          <input
            type="file"
            id="imagen"
            name="imagen"
            ref={fileInputRef}
            onChange={handleImageChange}
            accept="image/*"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#D71B07] focus:border-[#D71B07] block w-full p-2.5"
          />
          {errors.imagen && (
            <p className="mt-2 text-sm text-red-600">
              <span className="font-medium">Error:</span> {errors.imagen}
            </p>
          )}
          {imagePreview && (
            <div className="mt-2">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-32 h-32 object-cover rounded-lg border"
              />
            </div>
          )}
          <p className="mt-1 text-xs text-gray-500">
            Formatos: JPG, PNG, GIF. Máximo 5MB
          </p>
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
            Producto activo
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
              "Guardar Producto"
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