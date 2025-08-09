import React, { useState } from 'react';
import { getProductoPorCodigo } from '../Services/productos.services.ts';
import { createSale} from '../Services/purchases.services.ts';
import type { PurchaseData } from '../Services/purchases.services.ts';

// Tipos
interface Producto {
  codigo: string;
  nombre: string;
  precio_compra: number;
  imagen?: string;
}

interface DetalleCompra extends Producto {
  cantidad: number;
}

export default function FormPurchases() {
  const [codigoBuscar, setCodigoBuscar] = useState('');
  const [detalles, setDetalles] = useState<DetalleCompra[]>([]);
  const [numeroOrden, setNumeroOrden] = useState<number>(0);
  const [fechaEmision, setFechaEmision] = useState('');
  const [fechaEntrega, setFechaEntrega] = useState('');
  const [estado, setEstado] = useState('');
  const [observaciones, setObservaciones] = useState('');
  const [proveedorId, setProveedorId] = useState<number | ''>('');
  const [usuarioId, setUsuarioId] = useState<number | ''>('');

  const subtotal = detalles.reduce((acc, item) => acc + item.precio_compra * item.cantidad, 0);
  const iva = subtotal * 0.15;
  const total = subtotal + iva;

  const agregarProducto = async () => {
    if (!codigoBuscar.trim()) return;
    try {
      const producto = await getProductoPorCodigo(codigoBuscar.trim());
      const yaExiste = detalles.find((p) => p.codigo === producto.codigo);
      if (yaExiste) {
        const actualizados = detalles.map((p) =>
          p.codigo === producto.codigo ? { ...p, cantidad: p.cantidad + 1 } : p
        );
        setDetalles(actualizados);
      } else {
        setDetalles([...detalles, { ...producto, cantidad: 1 }]);
      }
      setCodigoBuscar('');
    } catch (error) {
      console.error('Producto no encontrado:', error);
      alert('Producto no encontrado');
    }
  };

  const eliminarProducto = (codigo: string) => {
    setDetalles(detalles.filter((p) => p.codigo !== codigo));
  };

  const cambiarCantidad = (codigo: string, nuevaCantidad: number) => {
    if (nuevaCantidad < 1) return;
    setDetalles(
      detalles.map((p) =>
        p.codigo === codigo ? { ...p, cantidad: nuevaCantidad } : p
      )
    );
  };

  const cambiarPrecio = (codigo: string, precio_compra: number) => {
    setDetalles(
      detalles.map((p) =>
        p.codigo === codigo ? { ...p, precio_compra: Math.max(0, Number(precio_compra)) } : p
      )
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const compra: PurchaseData = {
      numero_orden: numeroOrden,
      fecha_emision: fechaEmision,
      fecha_entrega_esperada: fechaEntrega,
      estado,
      observaciones,
      proveedor_id: Number(proveedorId),
      usuario_id: Number(usuarioId),
      detalles: detalles.map((p) => ({
        codigo_producto: p.codigo,
        cantidad: p.cantidad,
        precio_unitario: p.precio_compra,
      })),
    };

    try {
      await createSale(compra);
      alert('Compra registrada correctamente');
    } catch (error) {
      alert('Error al registrar compra');
      console.error(error);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-6 border border-[#D71B07] rounded-lg shadow-md overflow-hidden">
      <div className="bg-[#D71B07] p-6">
        <h2 className="text-xl font-semibold text-white">Nueva Factura</h2>
      </div>
      <form
  onSubmit={handleSubmit}
  className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-white"
>
  {/* Número de orden */}
  <div>
    <label htmlFor="numero_orden" className="block mb-2 text-sm font-medium text-black">Número de orden</label>
    <input
      id="numero_orden"
      type="text"
      value={numeroOrden}
      onChange={(e) => setNumeroOrden(Number(e.target.value))}
      required
      className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
    />
  </div>

  {/* Fecha de emisión */}
  <div>
    <label htmlFor="fecha_emision" className="block mb-2 text-sm font-medium text-black">Fecha de Emisión</label>
    <input
      id="fecha_emision"
      type="date"
      value={fechaEmision}
      onChange={(e) => setFechaEmision(e.target.value)}
      required
      className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
    />
  </div>

  {/* Fecha de entrega */}
  <div>
    <label htmlFor="fecha_entrega_esperada" className="block mb-2 text-sm font-medium text-black">Fecha de entrega</label>
    <input
      id="fecha_entrega_esperada"
      type="date"
      value={fechaEntrega}
      onChange={(e) => setFechaEntrega(e.target.value)}
      required
      className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
    />
  </div>

  {/* Subtotal */}
  <div>
    <label htmlFor="subtotal" className="block mb-2 text-sm font-medium text-black">Subtotal</label>
    <input
      id="subtotal"
      type="number"
      value={subtotal.toFixed(2)}
      readOnly
      className="bg-gray-100 border border-gray-300 text-black text-sm rounded-lg block w-full p-2.5"
    />
  </div>

  {/* IVA */}
  <div>
    <label htmlFor="iva" className="block mb-2 text-sm font-medium text-black">IVA (15%)</label>
    <input
      id="iva"
      type="number"
      value={iva.toFixed(2)}
      readOnly
      className="bg-gray-100 border border-gray-300 text-black text-sm rounded-lg block w-full p-2.5"
    />
  </div>

  {/* Total */}
  <div>
    <label htmlFor="total" className="block mb-2 text-sm font-medium text-black">Total</label>
    <input
      id="total"
      type="number"
      value={total.toFixed(2)}
      readOnly
      className="bg-gray-100 border border-gray-300 text-black text-sm rounded-lg block w-full p-2.5"
    />
  </div>

  {/* Proveedor */}
  <div>
    <label htmlFor="proveedor_id" className="block mb-2 text-sm font-medium text-black">Proveedor</label>
    <input
      id="proveedor_id"
      type="number"
      value={proveedorId}
      onChange={(e) => setProveedorId(Number(e.target.value))}
      required
      className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
    />
  </div>

  {/* Usuario */}
  <div>
    <label htmlFor="usuario_id" className="block mb-2 text-sm font-medium text-black">Usuario</label>
    <input
      id="usuario_id"
      type="number"
      value={usuarioId}
      onChange={(e) => setUsuarioId(Number(e.target.value))}
      required
      className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
    />
  </div>

  {/* Estado */}
  <div>
    <label htmlFor="estado" className="block mb-2 text-sm font-medium text-black">Estado</label>
    <select
      id="estado"
      value={estado}
      onChange={(e) => setEstado(e.target.value)}
      required
      className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
    >
      <option value="">Seleccione</option>
      <option value="pendiente">Pendiente</option>
      <option value="parcial">Parcial</option>
      <option value="completado">Completado</option>
      <option value="cancelada">Cancelada</option>
    </select>
  </div>

  {/* Buscador de producto */}
  <div className="md:col-span-2">
    <label htmlFor="buscador" className="block mb-2 text-sm font-medium text-black">Buscar Producto</label>
    <div className="flex">
      <input
        type="text"
        id="buscador"
        placeholder="Nombre o código"
        value={codigoBuscar}
        onChange={(e) => setCodigoBuscar(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), agregarProducto())}
        className="bg-gray-50 border border-gray-300 text-black text-sm rounded-l-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      />
      <button
        type="button"
        onClick={agregarProducto}
        className="bg-[#D71B07] text-white px-4 py-2 rounded-r-lg hover:bg-red-700"
      >
        Agregar
      </button>
    </div>
  </div>

  {/* Observaciones */}
  <div className="md:col-span-2">
    <label htmlFor="observaciones" className="block mb-2 text-sm font-medium text-black">Observaciones</label>
    <textarea
      id="observaciones"
      value={observaciones}
      onChange={(e) => setObservaciones(e.target.value)}
      className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      rows={3}
    ></textarea>
  </div>

  {/* Botón enviar */}
  <div className="md:col-span-2 flex justify-end">
    <button
      type="submit"
      className="bg-[#D71B07] text-white font-medium px-6 py-2 rounded-lg hover:bg-red-700"
    >
      Hacer Compra
    </button>
  </div>
</form>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-6">
        <table className="w-full text-sm text-left text-black border-separate border-spacing-0">
          <thead className="text-xs uppercase bg-[#D71B07] text-white">
            <tr>
              <th className="px-6 py-3 border-b"></th>
              <th className="px-6 py-3 border-b">Producto</th>
              <th className="px-6 py-3 border-b">Cantidad</th>
              <th className="px-6 py-3 border-b">Precio</th>
              <th className="px-6 py-3 border-b">Acción</th>
            </tr>
          </thead>
          <tbody>
            {detalles.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-4">No hay productos agregados</td>
              </tr>
            ) : (
              detalles.map((producto) => (
                <tr key={producto.codigo} className="bg-white border-b border-[#D71B07] hover:bg-gray-100">
                  <td className="p-4">
                    <img
                      src={producto.imagen || `https://via.placeholder.com/80?text=${producto.codigo}`}
                      alt={producto.nombre}
                      className="w-16 md:w-24 max-w-full max-h-full"
                    />
                  </td>
                  <td className="px-6 py-4 font-semibold text-black">{producto.nombre}</td>
                  <td className="px-6 py-4">
                    <input
                      type="number"
                      value={producto.cantidad}
                      onChange={(e) => cambiarCantidad(producto.codigo, Number(e.target.value))}
                      className="w-16 border border-[#D71B07] text-center rounded-md"
                      min={1}
                    />
                  </td>
                  <td className="px-6 py-4">
                    <input
                      type="number"
                      className="w-24 border border-[#D71B07] text-center rounded-md"
                      value={producto.precio_compra}
                      min={0}
                      step="0.01"
                      onChange={(e) => cambiarPrecio(producto.codigo, Number(e.target.value))}
                    />
                  </td>
                  <td className="px-6 py-4">
                    <button
                      type="button"
                      className="text-red-600 hover:underline font-medium"
                      onClick={() => eliminarProducto(producto.codigo)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
