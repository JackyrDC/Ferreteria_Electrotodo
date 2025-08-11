import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import SidebarLayout from '../Components/sidebar';
import { useAuth } from '../hooks/useAuth';

import FormSales from '../Components/form_sales';
import FormPurchases from '../Components/form_purchaces';
import FormSupplier from '../Components/form_supplier';
import TableSupplier from '../Components/table_supplier';
import FormCashRegister from '../Components/form_cashRegister';
import DataGridCashRegister from '../Components/dataGrid_cashRegister';
import CategoryRegister from './CategoryRegister';
import ProductRegister from './ProductRegister';

// Importar el tipo desde el componente SidebarLayout
import type { SidebarOption } from '../Components/sidebar';

export default function SidebarPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();
  
  // Determinar la opción activa basada en la URL actual
  const getActiveOptionFromPath = (pathname: string): SidebarOption => {
    if (pathname.includes('/categorias')) return 'categorias';
    if (pathname.includes('/productos')) return 'productos';
    if (pathname.includes('/ventas')) return 'ventas';
    if (pathname.includes('/proveedores')) return 'proveedores';
    if (pathname.includes('/caja')) return 'caja';
    if (pathname.includes('/orden-compra')) return 'ordenCompra';
    if (pathname.includes('/dashboard')) return 'dashboard';
    return 'dashboard';
  };

  const [activeOption, setActiveOption] = useState<SidebarOption>(
    getActiveOptionFromPath(location.pathname)
  );

  const handleOptionSelect = (option: SidebarOption) => {
    setActiveOption(option);
    
    // Manejar navegación
    switch (option) {
      case 'dashboard':
        navigate('/dashboard');
        break;
      case 'categorias':
        navigate('/categorias/registro');
        break;
      case 'productos':
        navigate('/productos/registro');
        break;
      case 'ventas':
        navigate('/ventas');
        break;
      case 'proveedores':
        navigate('/proveedores');
        break;
      case 'caja':
        navigate('/caja');
        break;
      case 'ordenCompra':
        navigate('/orden-compra');
        break;
      case 'empleados':
        navigate('/empleados');
        break;
      case 'recepcionCompras':
        navigate('/recepcion-compras');
        break;
      case 'signOut':
        logout();
        navigate('/login');
        break;
      default:
        console.log(`Opción ${option} no implementada aún`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <SidebarLayout 
        activeOption={activeOption} 
        onSelect={handleOptionSelect} 
      />

      <div className="flex-1 ml-64 p-6">
        {/* Dashboard por defecto */}
        {activeOption === 'dashboard' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-4" style={{ color: '#D71B07' }}>
              Dashboard Principal
            </h2>
            <p className="text-gray-600">Bienvenido al panel de administración</p>
          </div>
        )}

        {/* Módulo de Caja */}
        {activeOption === 'caja' && (
          <div className="space-y-6">
            <FormCashRegister />
            <DataGridCashRegister />
          </div>
        )}

        {/* Módulo de Ventas */}
        {activeOption === 'ventas' && (
          <div className="space-y-6">
            <FormSales />
          </div>
        )}

        {/* Módulo de Proveedores */}
        {activeOption === 'proveedores' && (
          <div className="space-y-6">
            <FormSupplier />
            <TableSupplier />
          </div>
        )}

        {/* Módulo de Orden de Compra */}
        {activeOption === 'ordenCompra' && (
          <div className="space-y-6">
            <FormPurchases />
          </div>
        )}

        {/* Módulo de Categorías */}
        {activeOption === 'categorias' && (
          <div className="space-y-6">
            <CategoryRegister />
          </div>
        )}

        {/* Módulo de Productos */}
        {activeOption === 'productos' && (
          <div className="space-y-6">
            <ProductRegister />
          </div>
        )}

        {/* Módulos no implementados */}
        {(activeOption === 'empleados' || 
          activeOption === 'recepcionCompras') && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-4" style={{ color: '#D71B07' }}>
              {activeOption.charAt(0).toUpperCase() + activeOption.slice(1)}
            </h2>
            <p className="text-gray-600">Este módulo está en desarrollo...</p>
          </div>
        )}
      </div>
    </div>
  );
}