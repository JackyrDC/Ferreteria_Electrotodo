const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000';
const API_URL = `${API_BASE}/ordenCompra`;


type DetalleCompra = {
  codigo_producto: string;
  cantidad: number;
  precio_unitario: number;
};


export type PurchaseData = {
  numero_orden: number;
  fecha_emision: string;
  fecha_entrega_esperada: string;
  estado: string;
  observaciones: string;
  proveedor_id: number;
  detalles: DetalleCompra[];
};


// Crear venta
export async function createSale(data: PurchaseData) {
  const token = localStorage.getItem('token');

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' ,
             'Authorization': `Bearer ${token}`,
     
            },
    body: JSON.stringify(data),
    
  });
  console.log("los datos que se envian " + JSON.stringify(data, null, 2));

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Error al crear compra: ${response.status} - ${errorBody}`);
  }
   
}

// Obtener ventas
export async function getPurchases() {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error('Error al obtener ventas');
  return response.json();
}

// Actualizar venta
export async function updatePurchases(id: string, data: PurchaseData) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Error al actualizar compra');
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
