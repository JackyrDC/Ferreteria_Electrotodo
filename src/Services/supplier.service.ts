
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000';
const API_URL = `${API_BASE}/proveedor`;



export async function createSupplier(data: {
  proveedor_id: string;
  nombre: string;
  telefono: string;
  email: string;
}) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Error al crear proveedor');
  return response.json();
}

export async function getSuppliers() {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error('Error al obtener proveedores');
  return response.json();
}

type Supplier = {
  proveedor_id: string;
  nombre: string;
  telefono: string;
  email: string;
};

export async function updateSupplier(id: string, data: Supplier) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Error al actualizar proveedor');
  return response.json();
}

export async function deleteSupplier(id: string) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Error al eliminar proveedor');
  return response.json();
}