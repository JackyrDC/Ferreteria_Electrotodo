import React from 'react';

export default function SidebarLayout() {
  return (
    <>
        <nav className="fixed top-0 z-50 w-full bg-white border-b" style={{ borderColor: '#7b0600ff' }}>
            <div className="px-3 py-3 lg:px-5 lg:pl-3">
                <div className="flex items-center justify-between">
                <div className="flex items-center justify-start rtl:justify-end">
                    <button type="button" className="inline-flex items-center p-2 text-sm text-[#A1A1A1] rounded-lg sm:hidden hover:bg-[#FFB86A] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#FFB86A]">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z" />
                    </svg>
                    </button>
                    <a href="#" className="flex ms-2 md:me-24">
                    <img src="https://i.pinimg.com/736x/0d/ca/53/0dca53215350af8eae0ae904018c852c.jpg" className="h-8 me-3" alt="Logo" />
                    <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap text-[#D71B07]">Ferreteria Electrotodo</span>
                    </a>
                </div>
                </div>
            </div>
            </nav>

            <aside id="logo-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r sm:translate-x-0" style={{ borderColor: '#7b0600ff' }} aria-label="Sidebar">
            <div className="h-full px-3 pb-4 overflow-y-auto">
                <ul className="space-y-2 font-medium">
                <li>
                    {/* Empleados */}
                    <a href="#" className="flex items-center p-2 text-[#A1A1A1] rounded-lg hover:bg-[#D71B07] hover:text-white group">
                        {/* User/People icon */}
                        <svg className="w-5 h-5 transition duration-75 group-hover:text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 10a4 4 0 100-8 4 4 0 000 8zm-7 8a7 7 0 1114 0H3z" />
                        </svg>
                        <span className="ms-3">Empleados</span>
                    </a>
                    </li>
                    <li>
                    {/* Ventas */}
                    <a href="#" className="flex items-center p-2 text-[#A1A1A1] rounded-lg hover:bg-[#D71B07] hover:text-white group">
                        {/* Shopping cart icon */}
                        <svg className="w-5 h-5 transition duration-75 group-hover:text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M16 11V7a4 4 0 10-8 0v4H5a1 1 0 000 2h1v5a2 2 0 002 2h4a2 2 0 002-2v-5h1a1 1 0 100-2h-1zm-6-4a2 2 0 114 0v4h-4V7zm6 11a1 1 0 11-2 0 1 1 0 012 0zm-8 0a1 1 0 11-2 0 1 1 0 012 0z" />
                        </svg>
                        <span className="ms-3">Ventas</span>
                    </a>
                    </li>
                    <li>
                    {/* Caja */}
                    <a href="#" className="flex items-center p-2 text-[#A1A1A1] rounded-lg hover:bg-[#D71B07] hover:text-white group">
                        {/* Cash register icon */}
                        <svg className="w-5 h-5 transition duration-75 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M4 7V5a2 2 0 012-2h12a2 2 0 012 2v2h1a1 1 0 011 1v11a2 2 0 01-2 2H3a2 2 0 01-2-2V8a1 1 0 011-1h1zm2-2v2h12V5H6zm14 4H4v10h16V9zm-6 2a1 1 0 100 2 1 1 0 000-2zm-4 0a1 1 0 100 2 1 1 0 000-2z" />
                        </svg>
                        <span className="ms-3">Caja</span>
                        <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full">3</span>
                    </a>
                    </li>
                    <li>
                    {/* Orden de Compra */}
                    <a href="#" className="flex items-center p-2 text-[#A1A1A1] rounded-lg hover:bg-[#D71B07] hover:text-white group">
                        {/* Clipboard list icon */}
                        <svg className="w-5 h-5 transition duration-75 group-hover:text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 2a1 1 0 00-1 1v1H5a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2h-3V3a1 1 0 00-1-1H9zm1 2V3h2v1h-2zm-3 4h8v2H7V6zm0 4h8v2H7v-2z" />
                        </svg>
                        <span className="ms-3">Orden de Compra</span>
                    </a>
                    </li>
                    <li>
                    {/* Productos */}
                    <a href="#" className="flex items-center p-2 text-[#A1A1A1] rounded-lg hover:bg-[#D71B07] hover:text-white group">
                        {/* Box/package icon */}
                        <svg className="w-5 h-5 transition duration-75 group-hover:text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.94 6.94A1.5 1.5 0 014.5 6h11a1.5 1.5 0 011.56.94l1.5 4A1.5 1.5 0 0117.5 13h-15a1.5 1.5 0 01-1.56-2.06l1.5-4zM4.5 8l-1.5 4h15l-1.5-4h-12zm2.5 6a1 1 0 112 0 1 1 0 01-2 0zm5 0a1 1 0 112 0 1 1 0 01-2 0z" />
                        </svg>
                        <span className="ms-3">Productos</span>
                    </a>
                    </li>
                    <li>
                    {/* Recepcion de Compras */}
                    <a href="#" className="flex items-center p-2 text-[#A1A1A1] rounded-lg hover:bg-[#D71B07] hover:text-white group">
                        {/* Truck icon */}
                        <svg className="w-5 h-5 transition duration-75 group-hover:text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M3 3a1 1 0 00-1 1v10a1 1 0 001 1h1a2 2 0 104 0h4a2 2 0 104 0h1a1 1 0 001-1v-4a1 1 0 00-.293-.707l-3-3A1 1 0 0015 7h-2V4a1 1 0 00-1-1H3zm12 4.414L17.586 10H15V7.414zM7 16a1 1 0 11-2 0 1 1 0 012 0zm8 0a1 1 0 11-2 0 1 1 0 012 0z" />
                        </svg>
                        <span className="ms-3">Recepcion de Compras</span>
                    </a>
                    </li>
                    <li>
                    {/* Categorias */}
                    <a href="#" className="flex items-center p-2 text-[#A1A1A1] rounded-lg hover:bg-[#D71B07] hover:text-white group">
                        {/* Tag icon */}
                        <svg className="w-5 h-5 transition duration-75 group-hover:text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M17.707 9.293l-7-7A1 1 0 009.293 2.293l-7 7A1 1 0 002 10.707l7 7a1 1 0 001.414 0l7-7a1 1 0 000-1.414zM5.5 8A1.5 1.5 0 117 9.5 1.5 1.5 0 015.5 8z" />
                        </svg>
                        <span className="ms-3">Categorias</span>
                    </a>
                    </li>
                    <li>
                    {/* Proveedores */}
                    <a href="#" className="flex items-center p-2 text-[#A1A1A1] rounded-lg hover:bg-[#D71B07] hover:text-white group">
                        {/* Building/store icon */}
                        <svg className="w-5 h-5 transition duration-75 group-hover:text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 7V5a2 2 0 012-2h12a2 2 0 012 2v2h1a1 1 0 011 1v9a2 2 0 01-2 2H2a2 2 0 01-2-2V8a1 1 0 011-1h1zm2-2v2h12V5H4zm14 4H2v8h16V9z" />
                        </svg>
                        <span className="ms-3">Proveedores</span>
                    </a>
                    </li>
                    <li>
                    {/* Sign Out */}
                    <a href="#" className="flex items-center p-2 text-[#A1A1A1] rounded-lg hover:bg-[#D71B07] hover:text-white group">
                        {/* Logout icon */}
                        <svg className="w-5 h-5 transition duration-75 group-hover:text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M3 4a1 1 0 011-1h6a1 1 0 110 2H5v10h5a1 1 0 110 2H4a1 1 0 01-1-1V4zm13.293 5.293a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L13.586 11H9a1 1 0 110-2h4.586l-1.293-1.293a1 1 0 111.414-1.414l3 3z" />
                        </svg>
                        <span className="ms-3">Sign Out</span>
                    </a>
                    </li>
                </ul>

        </div>
        </aside>

       

    </>
  );
}
