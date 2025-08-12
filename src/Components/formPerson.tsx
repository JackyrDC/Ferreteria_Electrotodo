import React, { useState } from 'react';
import { createPerson } from '../Services/person.service';

export default function FormPersona() {
  const [form, setForm] = useState({
    primerNombre: '',
    segundoNombre: '',
    primerApellido: '',
    segundoApellido: '',
    numeroIdentificacion: '',
    telefono: '',
    email: '',
    estadoCivil: '',
    sexo: '',
    direccion: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createPerson(form);
      alert('Persona guardada correctamente');
      setForm({
        primerNombre: '',
        segundoNombre: '',
        primerApellido: '',
        segundoApellido: '',
        numeroIdentificacion: '',
        telefono: '',
        email: '',
        estadoCivil: '',
        sexo: '',
        direccion: ''
      });
    } catch (err) {
      alert('Error al guardar persona: ' + err);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-6 border border-[#D71B07] rounded-lg shadow-md overflow-hidden">
      <div className="bg-[#D71B07] p-6">
        <h2 className="text-xl font-semibold text-white">Registro de Empleados</h2>
      </div>

      <form className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-white" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="primerNombre" className="block mb-2 text-sm font-medium text-black">Primer Nombre</label>
          <input type="text" id="primerNombre" value={form.primerNombre} onChange={handleChange} required
            className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg block w-full p-2.5" />
        </div>

        <div>
          <label htmlFor="segundoNombre" className="block mb-2 text-sm font-medium text-black">Segundo Nombre</label>
          <input type="text" id="segundoNombre" value={form.segundoNombre} onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg block w-full p-2.5" />
        </div>

        <div>
          <label htmlFor="primerApellido" className="block mb-2 text-sm font-medium text-black">Primer Apellido</label>
          <input type="text" id="primerApellido" value={form.primerApellido} onChange={handleChange} required
            className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg block w-full p-2.5" />
        </div>

        <div>
          <label htmlFor="segundoApellido" className="block mb-2 text-sm font-medium text-black">Segundo Apellido</label>
          <input type="text" id="segundoApellido" value={form.segundoApellido} onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg block w-full p-2.5" />
        </div>

        <div>
          <label htmlFor="numeroIdentificacion" className="block mb-2 text-sm font-medium text-black">Número de Identificación</label>
          <input type="text" id="numeroIdentificacion" value={form.numeroIdentificacion} onChange={handleChange} required
            className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg block w-full p-2.5" />
        </div>

        <div>
          <label htmlFor="telefono" className="block mb-2 text-sm font-medium text-black">Teléfono</label>
          <input type="text" id="telefono" value={form.telefono} onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg block w-full p-2.5" />
        </div>

        <div>
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-black">Email</label>
          <input type="email" id="email" value={form.email} onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg block w-full p-2.5" />
        </div>

       <div>
          <label htmlFor="estadoCivil" className="block mb-2 text-sm font-medium text-black">Estado Civil</label>
          <select
            id="estadoCivil"
            value={form.estadoCivil}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg block w-full p-2.5"
          >
            <option value="">Seleccione</option>
            <option value="soltero">Soltero</option>
            <option value="casado">Casado</option>
            <option value="divorciado">Divorciado</option>
            <option value="viudo">Viudo</option>
          </select>
        </div>

        <div>
          <label htmlFor="sexo" className="block mb-2 text-sm font-medium text-black">Sexo</label>
          <select id="sexo" value={form.sexo} onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg block w-full p-2.5">
            <option value="">Seleccione</option>
            <option value="masculino">Masculino</option>
            <option value="femenino">Femenino</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label htmlFor="direccion" className="block mb-2 text-sm font-medium text-black">Dirección</label>
          <textarea id="direccion" value={form.direccion} onChange={handleChange} rows={3}
            className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg block w-full p-2.5"></textarea>
        </div>

        <div className="md:col-span-2 flex justify-end">
          <button type="submit" className="bg-[#D71B07] text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors">
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
  
} 
