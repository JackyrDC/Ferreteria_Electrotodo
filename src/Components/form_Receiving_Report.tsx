import React, { useState } from 'react';
import { createRecepcion } from '../Services/receivingReport_service';

export default function FormReceiving_report() {
  const [form, setForm] = useState({
    numero_orden: '',
    codigo_producto: '',
    cantidad_recibida: '',
    fecha_recepcion: '', 
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validar o convertir tipos aquí
    const numeroOrdenNum = Number(form.numero_orden);
    const cantidadRecibidaNum = Number(form.cantidad_recibida);

    if (isNaN(numeroOrdenNum) || isNaN(cantidadRecibidaNum)) {
      alert('Número de orden y cantidad recibida deben ser números válidos');
      return;
    }

    const recepcionPayload = {
      numero_orden: numeroOrdenNum,
      recepciones: [
        {
          codigo_producto: form.codigo_producto,
          cantidad_recibida: cantidadRecibidaNum,
          fecha_recepcion: form.fecha_recepcion, // opcional para backend
        },
      ],
    };

    try {
      await createRecepcion(recepcionPayload);
      alert('Stock Actualizado');
      setForm({ numero_orden: '', codigo_producto: '', cantidad_recibida: '', fecha_recepcion: '' });
    } catch (err) {
      alert('Error al guardar: ' + err);
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
        {/* Numero de orden */}
        <div>
          <label htmlFor="numero_orden" className="block mb-2 text-sm font-medium text-black">
            Número de orden
          </label>
          <input
            type="number"
            id="numero_orden"
            value={form.numero_orden}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="11111"
            required
          />
        </div>

        {/* Código del producto */}
        <div>
          <label htmlFor="codigo_producto" className="block mb-2 text-sm font-medium text-black">
            Código del producto
          </label>
          <input
            type="text"
            id="codigo_producto"
            value={form.codigo_producto}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
            placeholder="Ej. PRO-00-00"
          />
        </div>

        {/* Fecha de recepción */}
        <div>
          <label htmlFor="fecha_recepcion" className="block mb-2 text-sm font-medium text-black">
            Fecha de recepción
          </label>
          <input
            id="fecha_recepcion"
            type="date"
            value={form.fecha_recepcion}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
        </div>

        {/* Cantidad recibida */}
        <div>
          <label htmlFor="cantidad_recibida" className="block mb-2 text-sm font-medium text-black">
            Cantidad recibida
          </label>
          <input
            type="number"
            id="cantidad_recibida"
            value={form.cantidad_recibida}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
            min={1}
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
