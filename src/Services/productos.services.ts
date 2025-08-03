
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000';

//obtener productos para la tabla de sales que es por medio del codigo del producto
export async function getProductoPorCodigo(codigo: string) {
  const response = await fetch(`${API_BASE}/producto/${codigo}`);
  if (!response.ok) throw new Error('No se encontró el producto');
  return response.json();
}     