const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000';
const API_URL = `${API_BASE}/venta`;


type DetalleVenta = {
  codigo_producto: string;
  cantidad: number;
};

export type SaleData = {
  numero_factura: string;
  usuario_id: number;
  fecha: string;
  descuento: number;
  observaciones: string;
  estado: string;
  tipo_pago: string;

  detalles: DetalleVenta[];
};


// Crear venta
export async function createSale(data: SaleData) {
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwicm9sIjoiYWRtaW4iLCJpYXQiOjE3NTQwMzc5NDYsImV4cCI6MTc1NDA2Njc0Nn0.qs8U2V3pmbgUesK7xPOjQumS-GTZQM86zJkVVGLQT_s"; // ⚠️ temporal solo para pruebas

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' ,
             'Authorization': `Bearer ${token}`,
     },
     
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Error al crear venta');
  return response.json();
}

// Obtener ventas
export async function getSales() {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error('Error al obtener ventas');
  return response.json();
}

// Actualizar venta
export async function updateSales(id: string, data: SaleData) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Error al actualizar venta');
  return response.json();
}

// Eliminar venta
export async function deleteSales(id: string) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Error al eliminar venta');
  return response.json();
}
