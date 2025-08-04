import React from 'react';
import { useAuth } from '../hooks/useAuth';

// Importar el tipo desde la página
export type SidebarOption =
  | 'dashboard'
  | 'empleados'
  | 'ventas'
  | 'caja'
  | 'ordenCompra'
  | 'productos'
  | 'recepcionCompras'
  | 'categorias'
  | 'proveedores'
  | 'signOut';

interface SidebarLayoutProps {
  activeOption: SidebarOption;
  onSelect: (option: SidebarOption) => void;
}

const SidebarLayout: React.FC<SidebarLayoutProps> = ({ activeOption, onSelect }) => {
  const { user } = useAuth();

  const menuItems = [
    { key: 'dashboard' as SidebarOption, label: 'Dashboard', icon: '🏠' },
    { key: 'empleados' as SidebarOption, label: 'Empleados', icon: '👥' },
    { key: 'ventas' as SidebarOption, label: 'Ventas', icon: '💰' },
    { key: 'caja' as SidebarOption, label: 'Caja', icon: '💳' },
    { key: 'ordenCompra' as SidebarOption, label: 'Orden de Compra', icon: '📦' },
    { key: 'productos' as SidebarOption, label: 'Productos', icon: '📋' },
    { key: 'recepcionCompras' as SidebarOption, label: 'Recepción Compras', icon: '📥' },
    { key: 'categorias' as SidebarOption, label: 'Categorías', icon: '🏷️' },
    { key: 'proveedores' as SidebarOption, label: 'Proveedores', icon: '🏢' },
  ];

  return (
    <div className="w-64 bg-white shadow-lg h-full flex flex-col">
      {/* Header del sidebar */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold" 
               style={{ backgroundColor: '#D71B07' }}>
            {user?.username?.charAt(0).toUpperCase() || 'U'}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{user?.username || 'Usuario'}</h3>
            <p className="text-sm text-gray-500">{user?.rol || 'Sin rol'}</p>
          </div>
        </div>
      </div>

      {/* Menu items */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.key}
            onClick={() => onSelect(item.key)}
            className={`w-full flex items-center space-x-3 px-4 py-3 text-left rounded-lg transition-colors duration-200 ${
              activeOption === item.key
                ? 'text-white shadow-md'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
            style={{
              backgroundColor: activeOption === item.key ? '#D71B07' : 'transparent'
            }}
          >
            <span className="text-lg">{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Logout button */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={() => onSelect('signOut')}
          className="w-full flex items-center space-x-3 px-4 py-3 text-left rounded-lg text-red-600 hover:bg-red-50 transition-colors duration-200"
        >
          <span className="text-lg">🚪</span>
          <span className="font-medium">Cerrar Sesión</span>
        </button>
      </div>
    </div>
  );
};

export default SidebarLayout;
