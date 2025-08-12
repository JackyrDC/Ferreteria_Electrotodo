const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000';
const API_URL = `${API_BASE}/usuarios`;



export type Usuario = {
  username: string;
  password: string;
  rol: "admin" | "ventas" | "soporte" | "bodega";
  estado?: "Activo" | "Inactivo";
  profileImage?: string;
  persona_id: number; 
};


export async function createUsuario(data: Usuario) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Error al crear usuario');
  return response.json();
}


export async function getUsuarios() {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error('Error al obtener usuarios');
  return response.json();
}

// Actualizar usuario
export async function updateUsuario(id: number, data: Usuario) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Error al actualizar usuario');
  return response.json();
}

// Eliminar usuario
export async function deleteUsuario(id: number) {
  const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  if (!response.ok) throw new Error('Error al eliminar usuario');
  return response.json();
}
