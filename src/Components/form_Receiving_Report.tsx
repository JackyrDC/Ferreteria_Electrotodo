import React, { useState } from 'react';
import { createRecepcion } from '../Services/receivingReport_service';

export default function FormReceiving_report() {
  const [form, setForm] = useState({
    numero_orden: 0,
    codigo_producto: "",
    cantidad_recibida: 0,
    fecha_recepcion: "", 
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createRecepcion(form);
      alert('Stock Actualizado');
      setForm({ numero_orden: 0, codigo_producto: '', cantidad_recibida: 0, fecha_recepcion: "" }); // Reinicia como string vacío
    } catch (err) {
      alert('Error al guardar' + err);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-6 border border-[#D71B07] rounded-lg shadow-md overflow-hidden">
      {/* Encabezado en rojo */}
      <div className="bg-[#D71B07] p-6">
        <h2 className="text-xl font-semibold text-white">Recepción de productos</h2>
      </div>

      {/* Contenido del formulario */}
      <form
        className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-white"
        onSubmit={handleSubmit}
      >
        {/*  orden */}
        <div>
          <label htmlFor="nombre" className="block mb-2 text-sm font-medium text-black">
            Numero de orden
          </label>
          <input
            type="number"
            id="numero_orden"
            value={form.numero_orden}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>

        {/* producto */}
        <div>
          <label htmlFor="telefono" className="block mb-2 text-sm font-medium text-black">
            Codigo del producto
          </label>
          <input
            type="text"
            id="codigo_producto"
            value={form.codigo_producto}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>
        {/* fecha */}
        <div>
          <label htmlFor="telefono" className="block mb-2 text-sm font-medium text-black">
            Fecha Recibido
          </label>
          <input
            type="date"
            id="fecha_recibida"
            value={form.fecha_recepcion}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>

        <div className="md:col-span-2 flex justify-end">
          <button
            type="submit"
            className="bg-[#D71B07] text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
}