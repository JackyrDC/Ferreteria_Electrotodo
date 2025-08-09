
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000';
const API_URL = `${API_BASE}/confCaja`;


export async function createNew(data: {
  caja_id: number;
  fecha: string;
  saldo_inicial: number;
}) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Error al crear la configuración de caja');
  return response.json();
}

export async function getConfiguration() {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error('Error al obtener configuracion');
  return response.json();
}

export async function getAllCashConfigs(){
     const response = await fetch(`${API_BASE}/saldo`);
  if (!response.ok) throw new Error('Error al obtener configuracion');
  return response.json();
}

export async function deleteConfiguration(id: string) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Error al eliminar ');
  return response.json();
}