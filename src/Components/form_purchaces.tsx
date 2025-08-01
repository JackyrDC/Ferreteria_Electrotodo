import React from 'react';

export default function FormPurchases() {
  return (
    <div className="w-full max-w-4xl mx-auto my-6 border border-[#D71B07] rounded-lg shadow-md overflow-hidden">
      {/* Encabezado en rojo */}
      <div className="bg-[#D71B07] p-6">
        <h2 className="text-xl font-semibold text-white">Nueva Factura</h2>
      </div>

      {/* Contenido del formulario */}
      <form className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-white">
        {/* Número de Factura */}
        <div>
          <label htmlFor="numero_orden" className="block mb-2 text-sm font-medium text-black">Nùmero de orden</label>
          <input type="text" id="numero_orden" className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Ej. F001-00001234" required />
        </div>

        {/* Fecha de Emisión */}
        <div>
          <label htmlFor="fecha_emision" className="block mb-2 text-sm font-medium text-black">Fecha de Emisión</label>
          <input type="date" id="fecha_emision" className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
        </div>

        {/* Fecha de entrega */}
        <div>
          <label htmlFor="fecha_entrega_esperada" className="block mb-2 text-sm font-medium text-black">Fecha de entrega</label>
          <input type="date" id="fecha_entrega_esperada" className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
        </div>

        {/* Subtotal */}
        <div>
          <label htmlFor="subtotal" className="block mb-2 text-sm font-medium text-black">subtotal</label>
          <input type="text" id="subtotal" className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Ej. F001-00001234" required />
        </div>

        {/* IVA */}
        <div>
          <label htmlFor="iva" className="block mb-2 text-sm font-medium text-black">IVA</label>
          <input type="text" id="iva" className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Ej. F001-00001234" required />
        </div>

        {/* Total */}
        <div>
          <label htmlFor="total" className="block mb-2 text-sm font-medium text-black">Total</label>
          <input type="text" id="total" className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Ej. F001-00001234" required />
        </div>

        {/* Proveedor */}
        <div>
          <label htmlFor="proveedor_id" className="block mb-2 text-sm font-medium text-black">Proveedor</label>
          <input type="text" id="proveedor_id" className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Ej. F001-00001234" required />
        </div>

        {/* Usuario */}
        <div>
          <label htmlFor="usuario_id" className="block mb-2 text-sm font-medium text-black">Usuario</label>
          <input type="text" id="usuario_id" className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Ej. F001-00001234" required />
        </div>

        {/* Tipo de Pago */}
        <div>
          <label htmlFor="estado" className="block mb-2 text-sm font-medium text-black">Estado</label>
          <select id="estado" className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required>
            <option value="">Seleccione  </option>
            <option value="pendiente">Pendiente</option>
            <option value="parcial">Parcial</option>
            <option value="completado">Completado</option>
            <option value="cancelada">Cancelada</option>
          </select>
        </div>

        {/* Buscador y botón */}
        <div className="flex flex-col md:col-span-2">
          <label htmlFor="buscador" className="block mb-2 text-sm font-medium text-black">Buscar Producto</label>
          <div className="flex">
            <input type="text" id="buscador" className="bg-gray-50 border border-gray-300 text-black text-sm rounded-l-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Nombre o código" />
            <button type="button" className="bg-[#D71B07] text-white px-4 py-2 rounded-r-lg hover:bg-red-700 transition-colors">Agregar</button>
          </div>
        </div>
      </form>
    </div>
  );
}