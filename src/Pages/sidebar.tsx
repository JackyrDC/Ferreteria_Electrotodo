import React from 'react';
import SidebarLayout from '../Components/sidebar';
//import TableSales from '../Components/table_salesProductos';
import FormSales from '../Components/form_sales';
//import FormPurchases from '../Components/form_purchaces';
//import FormSupplier from '../Components/form_supplier'; 
//import TableSupplier from '../Components/table_supplier';
function SidebarPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      <SidebarLayout />

      <div className="w-[80vw] ml-64 p-15 static justify-left">
        <FormSales />
      </div>
    </div>
  );
}

export default SidebarPage;