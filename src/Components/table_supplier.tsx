import React, { useEffect, useState } from 'react';
import {
  getSuppliers,
  updateSupplier,
  deleteSupplier
} from '../Services/supplier.service'; // Ajusta la ruta si es necesario

type Supplier = {
  proveedor_id: string;
  nombre: string;
  email: string;
  telefono: string;
};

export default function TableSupplier() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedSupplier, setEditedSupplier] = useState<Partial<Supplier>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSuppliers() {
      try {
        const data = await getSuppliers();
        setSuppliers(data);
      } catch (error) {
        console.error('Error al obtener proveedores:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchSuppliers();
  }, []);

  const handleEdit = (supplier: Supplier) => {
    setEditingId(supplier.proveedor_id);
    setEditedSupplier({ ...supplier });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedSupplier({
      ...editedSupplier,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async (id: string) => {
    try {
      await updateSupplier(id, editedSupplier as Supplier);
      const updatedList = suppliers.map((s) =>
        s.proveedor_id === id ? (editedSupplier as Supplier) : s
      );
      setSuppliers(updatedList);
      setEditingId(null);
      setEditedSupplier({});
    } catch (error) {
      console.error('Error al guardar proveedor:', error);
    }
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm('¿Estás seguro de eliminar este proveedor?');
    if (!confirmDelete) return;

    try {
      await deleteSupplier(id);
      const filtered = suppliers.filter((s) => s.proveedor_id !== id);
      setSuppliers(filtered);
    } catch (error) {
      console.error('Error al eliminar proveedor:', error);
    }
  };

  if (loading) return <p className="text-center">Cargando proveedores...</p>;

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs uppercase bg-[#D71B07] text-white">
          <tr>
            <th className="px-6 py-3">Código</th>
            <th className="px-6 py-3">Nombre</th>
            <th className="px-6 py-3">Email</th>
            <th className="px-6 py-3">Teléfono</th>
            <th className="px-6 py-3">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {suppliers.map((supplier) => (
            <tr
              key={supplier.proveedor_id}
              className="bg-white border-b border-[#D71B07] hover:bg-gray-100"
            >
              <td className="px-6 py-4 font-semibold text-black border-b border-[#D71B07]">
                {supplier.proveedor_id}
              </td>
              <td className="px-6 py-4 font-medium text-black border-b border-[#D71B07]">
                {editingId === supplier.proveedor_id ? (
                  <input
                    type="text"
                    name="nombre"
                    value={editedSupplier.nombre || ''}
                    onChange={handleChange}
                    className="border rounded px-2 py-1"
                  />
                ) : (
                  supplier.nombre
                )}
              </td>
              <td className="px-6 py-4 font-medium text-black border-b border-[#D71B07]">
                {editingId === supplier.proveedor_id ? (
                  <input
                    type="email"
                    name="email"
                    value={editedSupplier.email || ''}
                    onChange={handleChange}
                    className="border rounded px-2 py-1"
                  />
                ) : (
                  supplier.email
                )}
              </td>
              <td className="px-6 py-4 font-medium text-black border-b border-[#D71B07]">
                {editingId === supplier.proveedor_id ? (
                  <input
                    type="text"
                    name="telefono"
                    value={editedSupplier.telefono || ''}
                    onChange={handleChange}
                    className="border rounded px-2 py-1"
                  />
                ) : (
                  supplier.telefono
                )}
              </td>
              <td className="px-6 py-4 space-x-3">
                {editingId === supplier.proveedor_id ? (
                  <button
                    onClick={() => handleSave(supplier.proveedor_id)}
                    className="text-green-600 hover:underline"
                  >
                    Guardar
                  </button>
                ) : (
                  <button
                    onClick={() => handleEdit(supplier)}
                    className="text-blue-600 hover:underline"
                  >
                    Editar
                  </button>
                )}
                <button
                  onClick={() => handleDelete(supplier.proveedor_id)}
                  className="text-red-600 hover:underline"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
          {suppliers.length === 0 && (
            <tr>
              <td colSpan={5} className="text-center py-4 text-gray-500">
                No hay proveedores registrados.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
