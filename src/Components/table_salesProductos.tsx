import React, { useEffect, useState } from 'react';
import { getAllProducts } from '../Services/product.service';

type Producto = {
  codigo: string;
  nombre: string;
  stock_actual: number;
};

export default function TableSales() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProductos() {
      try {
        const response = await getAllProducts();
        console.log('Productos recibidos:', response);
        if (Array.isArray(response)) {
          setProductos(response);
        } else if (response.data) {
          setProductos(response.data);
        } else {
          console.error('Error en respuesta:', response.error || response.errores);
          setProductos([]);
        }
      } catch (error) {
        console.error('Error al obtener productos:', error);
        setProductos([]);
      } finally {
        setLoading(false);
      }
    }
    fetchProductos();
  }, []);

  if (loading) {
    return <div className="text-center py-8">Cargando productos...</div>;
  }

  return (
    <div className="overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-black border-separate border-spacing-0">
        <thead className="text-xs uppercase bg-[#D71B07] text-white">
          <tr>
            <th className="px-6 py-3 border-b" style={{ borderColor: "#D71B07" }}>Código</th>
            <th className="px-6 py-3 border-b" style={{ borderColor: "#D71B07" }}>Producto</th>
            <th className="px-6 py-3 border-b" style={{ borderColor: "#D71B07" }}>Stock Actual</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <tr key={producto.codigo} className="bg-white border-b border-[#D71B07] hover:bg-gray-100">
              <td className="px-6 py-4 font-semibold text-black">{producto.codigo}</td>
              <td className="px-6 py-4 font-semibold text-black">{producto.nombre}</td>
              <td className="px-6 py-4 font-semibold text-black">{producto.stock_actual}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
