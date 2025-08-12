const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000';
const API_URL = `${API_BASE}/persona/`;

export type Persona = {
  persona_id?: number; 
  primerNombre: string;
  segundoNombre?: string;
  primerApellido: string;
  segundoApellido?: string;
  numeroIdentificacion: string;
  telefono?: string;
  email?: string;
  estadoCivil?: string;
  sexo?: string;
  direccion?: string;
};

// Crear persona
export async function createPerson(data: Persona) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Error al crear persona');
  return response.json();
}

export async function getPerson(): Promise<Persona[]> {
  const response = await fetch(API_URL, {
    cache: 'no-store', // evita cache
  });
  if (!response.ok) throw new Error('Error al obtener personas');
  const data = await response.json();
  return Array.isArray(data) ? data : [];
}


// Actualizar persona
export async function updatePerson(id: number, data: Persona) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Error al actualizar persona');
  return response.json();
}

// Eliminar persona
export async function deletePerson(id: number) {
  const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  if (!response.ok) throw new Error('Error al eliminar persona');
  return response.json();
}
