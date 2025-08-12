import React, { useState, useEffect } from "react";
import { createUsuario } from "../Services/usuario.service";
import type { Usuario } from "../Services/usuario.service";
import { getPerson, type Persona } from "../Services/person.service";

type Rol = "admin" | "ventas" | "soporte" | "bodega";
type Estado = "Activo" | "Inactivo" | "Bloqueado";

interface UsuarioForm {
  username: string;
  password: string;
  rol: Rol;
  estado: Estado;
  profileImage: string;
  persona_id: string;  
}

export default function FormUsuario() {
  const [personas, setPersonas] = useState<Persona[]>([]);
  const [form, setForm] = useState<UsuarioForm>({
    username: "",
    password: "",
    rol: "admin",
    estado: "Activo",
    profileImage: "",
    persona_id: "",  // Inicializado como string vacío
  });

  useEffect(() => {
    async function fetchPersonas() {
      try {
        const data = await getPerson();
        console.log("Personas obtenidas:", data);
        setPersonas(data);
      } catch (error) {
        console.error("Error al obtener personas", error);
      }
    }
    fetchPersonas();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const usuarioData: Usuario = {
        username: form.username,
        password: form.password,
        rol: form.rol,
        estado: form.estado === "Bloqueado" ? "Inactivo" : form.estado,
        profileImage: form.profileImage || undefined,
        persona_id: Number(form.persona_id), // Convertir string a number aquí
      };

      await createUsuario(usuarioData);
      alert("Usuario guardado correctamente");
      setForm({
        username: "",
        password: "",
        rol: "admin",
        estado: "Activo",
        profileImage: "",
        persona_id: "",
      });
    } catch (err) {
      alert("Error al guardar usuario: " + err);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-6 border border-[#D71B07] rounded-lg shadow-md overflow-hidden">
      <div className="bg-[#D71B07] p-6">
        <h2 className="text-xl font-semibold text-white">Registro de Usuario</h2>
      </div>

      <form
        className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-white"
        onSubmit={handleSubmit}
      >
        {/* Username */}
        <div>
          <label htmlFor="username" className="block mb-2 text-sm font-medium text-black">Username</label>
          <input
            type="text"
            id="username"
            value={form.username}
            onChange={handleChange}
            required
            className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg block w-full p-2.5"
          />
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-black">Password</label>
          <input
            type="password"
            id="password"
            value={form.password}
            onChange={handleChange}
            required
            className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg block w-full p-2.5"
          />
        </div>

        {/* Rol */}
        <div>
          <label htmlFor="rol" className="block mb-2 text-sm font-medium text-black">Rol</label>
          <select
            id="rol"
            value={form.rol}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg block w-full p-2.5"
          >
            <option value="">Seleccione</option>
            <option value="admin">Administrador</option>
            <option value="bodega">Bodega</option>
            <option value="ventas">Ventas</option>
            <option value="soporte">Soporte</option>
          </select>
        </div>

        {/* Estado */}
        <div>
          <label htmlFor="estado" className="block mb-2 text-sm font-medium text-black">Estado</label>
          <select
            id="estado"
            value={form.estado}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg block w-full p-2.5"
          >
            <option value="Activo">Activo</option>
            <option value="Inactivo">Inactivo</option>
            <option value="Bloqueado">Bloqueado</option>
          </select>
        </div>

        {/* Profile Image */}
        <div>
          <label htmlFor="profileImage" className="block mb-2 text-sm font-medium text-black">Imagen de Perfil (URL)</label>
          <input
            type="text"
            id="profileImage"
            value={form.profileImage}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg block w-full p-2.5"
          />
        </div>

        {/* Persona */}
        <div>
          <label htmlFor="persona_id" className="block mb-2 text-sm font-medium text-black">Persona</label>
          <select
            id="persona_id"
            value={form.persona_id}
            onChange={handleChange}
            required
            className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg block w-full p-2.5"
          >
            <option value="">Seleccione una persona</option>
            {personas
            .filter(p => p.persona_id !== undefined)
            .map(p => (
              <option key={p.persona_id!} value={p.persona_id!}>
                {p.primerNombre} {p.primerApellido}
              </option>
              ))}
          </select>
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
