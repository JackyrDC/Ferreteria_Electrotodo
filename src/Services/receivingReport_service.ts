const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000';
const API_URL = `${API_BASE}/recepcion`;


export type Recepcion = {
  numero_orden: number;
  codigo_producto: string;
  cantidad_recibida: number;
  fecha_recepcion: string | Date; 
};


export async function createRecepcion(data: Recepcion) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) throw new Error('Error al crear la recepción');
  return response.json();
}


export async function getRecepciones() {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error('Error al obtener las recepciones');
  return response.json();
}


export async function update(id: string, data: Recepcion) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) throw new Error('Error al actualizar la recepción');
  return response.json();
}

export async function remove(id: string) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) throw new Error('Error al eliminar la recepción');
  return response.json();
}
