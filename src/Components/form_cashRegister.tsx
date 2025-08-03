import React, { useState } from 'react';
import { createNew } from '../Services/confCash.Service';

export default function FormCashRegister() {
  const [form, setForm] = useState({
    caja_id: 0,
    fecha: new Date().toISOString().split('T')[0], // Formato YYYY-MM-DD
    saldo_inicial: 0,
   
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createNew(form);
      alert('Configuración guardada correctamente');
      setForm({
        caja_id: 0,
        fecha: new Date().toISOString().split('T')[0],
        saldo_inicial: 0,
      });
    } catch (err) {
      alert('Error al guardar configuración: ' + err);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-6 border border-[#D71B07] rounded-lg shadow-md overflow-hidden">
      {/* Encabezado en rojo */}
      <div className="bg-[#D71B07] p-6">
        <h2 className="text-xl font-semibold text-white">Configuración de caja</h2>
      </div>

      {/* Contenido del formulario */}
      <form
        className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-white"
        onSubmit={handleSubmit}
      >
       
        {/* Fecha */}
        <div>
          <label htmlFor="fecha" className="block mb-2 text-sm font-medium text-black">
            Fecha de apertura
          </label>
          <input
            type="date"
            id="fecha"
            value={form.fecha}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg block w-full p-2.5"
            required
          />
        </div>

        {/* Saldo inicial */}
        <div>
          <label htmlFor="saldo_inicial" className="block mb-2 text-sm font-medium text-black">
            Saldo inicial
          </label>
          <input
            type="number"
            id="saldo_inicial"
            value={form.saldo_inicial}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg block w-full p-2.5"
            min={0}
            step={0.01}
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