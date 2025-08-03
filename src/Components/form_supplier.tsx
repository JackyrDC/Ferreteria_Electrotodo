import React, { useState } from 'react';
import { createSupplier } from '../Services/supplier.service';

export default function FormSupplier() {
  const [form, setForm] = useState({
    proveedor_id: '',
    nombre: '',
    telefono: '',
    email: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createSupplier(form);
      alert('Proveedor guardado correctamente');
      setForm({ proveedor_id: '', nombre: '', telefono: '', email: '' });
    } catch (err) {
      alert('Error al guardar proveedor' + err);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-6 border border-[#D71B07] rounded-lg shadow-md overflow-hidden">
      {/* Encabezado en rojo */}
      <div className="bg-[#D71B07] p-6">
        <h2 className="text-xl font-semibold text-white">Proveedor</h2>
      </div>

      {/* Contenido del formulario */}
      <form
        className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-white"
        onSubmit={handleSubmit}
      >
        {/* proveedor_id 
        <div>
          <label htmlFor="proveedor_id" className="block mb-2 text-sm font-medium text-black">
            Codigo de proveedor
          </label>
          <input
            type="text"
            id="proveedor_id"
            value={form.proveedor_id}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Ej. F001-00001234"
            required
          />
        </div> */}

        {/* Nombre de proveedor */}
        <div>
          <label htmlFor="nombre" className="block mb-2 text-sm font-medium text-black">
            Nombre del proveedor
          </label>
          <input
            type="text"
            id="nombre"
            value={form.nombre}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>

        {/* telefono */}
        <div>
          <label htmlFor="telefono" className="block mb-2 text-sm font-medium text-black">
            Teléfono
          </label>
          <input
            type="text"
            id="telefono"
            value={form.telefono}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-black">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={form.email}
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