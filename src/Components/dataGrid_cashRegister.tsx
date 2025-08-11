import React, { useEffect, useState } from 'react';
import { getAllCashConfigs } from '../Services/confCash.Service';

type SaldoCaja = {
  fecha: string;
  saldo_inicial: number;
  total_ingresos: number;
  total_egresos: number;
  saldo_actual: number;
};


export default function DataGridCashRegister() {
  const [saldo, setSaldo] = useState<SaldoCaja | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function fetchSaldo() {
      try {
        const data = await getAllCashConfigs();
        setSaldo(data);
        console.log(data);
        
      } catch (error) {
        console.error('Error al obtener saldo de caja:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchSaldo();
  }, []);

  if (loading) {
    return <div className="text-center py-8">Cargando saldo de caja...</div>;
  }

  if (!saldo) {
    return <div className="text-center py-8 text-red-600">No se pudo cargar el saldo de caja.</div>;
  }

  return (
    <div className="w-full max-w-2xl mx-auto my-6 border border-[#D71B07] rounded-lg shadow-md overflow-hidden">
      <div className="bg-[#D71B07] p-4">
        <h2 className="text-lg font-semibold text-white">Saldo de Caja</h2>
      </div>
      <table className="w-full text-sm text-left text-black border-separate border-spacing-0">
        <thead className="text-xs uppercase bg-[#D71B07] text-white">
          <tr>
            <th className="px-6 py-3 border-b" style={{ borderColor: "#D71B07" }}>Fecha Configuración</th>
            <th className="px-6 py-3 border-b" style={{ borderColor: "#D71B07" }}>Saldo Inicial</th>
            <th className="px-6 py-3 border-b" style={{ borderColor: "#D71B07" }}>Total Ingresos</th>
            <th className="px-6 py-3 border-b" style={{ borderColor: "#D71B07" }}>Total Egresos</th>
            <th className="px-6 py-3 border-b" style={{ borderColor: "#D71B07" }}>Saldo Actual</th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white border-b border-[#D71B07] hover:bg-gray-100">
            <td className="px-6 py-4 border-b border-[#D71B07]">
              {(saldo.fecha)}
            </td>
            <td className="px-6 py-4 border-b border-[#D71B07]">
              ${saldo.saldo_inicial.toFixed(2)}
            </td>
            <td className="px-6 py-4 border-b border-[#D71B07]">
              ${saldo.total_ingresos.toFixed(2)}
            </td>
            <td className="px-6 py-4 border-b border-[#D71B07]">
              ${saldo.total_egresos.toFixed(2)}
            </td>
            <td className="px-6 py-4 border-b border-[#D71B07] font-bold">
              ${saldo.saldo_actual.toFixed(2)}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
