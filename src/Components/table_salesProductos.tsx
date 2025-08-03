{/*import React, { useEffect, useState } from 'react';
import { getProductos } from '../Services/productos.services';

type Producto = {
  codigo: string;
  nombre: string;
  precio_venta: number;
  imagen?: string; // Si tienes imágenes, puedes incluir este campo
};

export default function TableSales() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProductos() {
      try {
        const data = await getProductos();
        console.log('Productos recibidos:', data);
        setProductos(data);
      } catch (error) {
        console.error('Error al obtener productos:', error);
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
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-black border-separate border-spacing-0">
        <thead className="text-xs uppercase bg-[#D71B07] text-white">
          <tr>
            <th className="px-6 py-3 border-b" style={{ borderColor: "#D71B07" }}></th>
            <th className="px-6 py-3 border-b" style={{ borderColor: "#D71B07" }}>Producto</th>
            <th className="px-6 py-3 border-b" style={{ borderColor: "#D71B07" }}>Cantidad</th>
            <th className="px-6 py-3 border-b" style={{ borderColor: "#D71B07" }}>Precio</th>
            <th className="px-6 py-3 border-b" style={{ borderColor: "#D71B07" }}>Acción</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <tr key={producto.codigo} className="bg-white border-b border-[#D71B07] hover:bg-gray-100">
              <td className="p-4">

                <img
                  src={`https://via.placeholder.com/80?text=${producto.codigo}`}
                  alt={producto.nombre}
                  className="w-16 md:w-24 max-w-full max-h-full"
                />
              </td>
              <td className="px-6 py-4 font-semibold text-black">{producto.nombre}</td>
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <button className="h-6 w-6 text-[#D71B07] border border-[#D71B07] rounded-full hover:bg-[#D71B07]/10 flex justify-center items-center">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 18 2" xmlns="http://www.w3.org/2000/svg">
                      <path stroke="currentColor" strokeWidth="2" d="M1 1h16" />
                    </svg>
                  </button>
                  <input
                    type="number"
                    className="mx-2 w-14 text-center border border-[#D71B07] rounded-lg py-1 text-sm"
                    defaultValue={1}
                    min={1}
                  />
                  <button className="h-6 w-6 text-[#D71B07] border border-[#D71B07] rounded-full hover:bg-[#D71B07]/10 flex justify-center items-center">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                      <path stroke="currentColor" strokeWidth="2" d="M9 1v16M1 9h16" />
                    </svg>
                  </button>
                </div>
              </td>
              <td className="px-6 py-4 font-semibold text-black">${producto.precio_venta}</td>
              <td className="px-6 py-4">
                <button className="text-red-600 hover:underline font-medium">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}*/}
