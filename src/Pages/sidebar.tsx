import React, { useState } from 'react';
import SidebarLayout from '../Components/sidebar';

import FormSales from '../Components/form_sales';
import FormPurchases from '../Components/form_purchaces';
import FormSupplier from '../Components/form_supplier';
import TableSupplier from '../Components/table_supplier';
import FormCashRegister from '../Components/form_cashRegister';
import DataGridCashRegister from '../Components/dataGrid_cashRegister';

export type SidebarOption =
  | 'empleados'
  | 'ventas'
  | 'caja'
  | 'ordenCompra'
  | 'productos'
  | 'recepcionCompras'
  | 'categorias'
  | 'proveedores'
  | 'signOut';


export default function SidebarPage() {
  const [activeOption, setActiveOption] = useState<SidebarOption>('caja');

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <SidebarLayout activeOption={activeOption} onSelect={setActiveOption} />

      <div className="w-[80vw] ml-64 p-15 static justify-left">
        {activeOption === 'caja' && (
          <>
            <FormCashRegister />
            <DataGridCashRegister />
          </>
        )}
        {activeOption === 'ventas' && (
          <>
            <FormSales />
          </>
        )}
        {activeOption === 'proveedores' && (
          <>
            <FormSupplier />
            <TableSupplier />
          </>
        )}
        {activeOption === 'ordenCompra' && (
          <>
            <FormPurchases />
          </>
        )}
      </div>
    </div>
  );
}