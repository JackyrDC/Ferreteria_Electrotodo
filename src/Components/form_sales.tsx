import React, { useEffect, useState } from 'react';
import { getProductoPorCodigo } from '../Services/productos.services';
import { createSale } from '../Services/sales.service';

type Producto = {
  codigo: string;
  nombre: string;
  precio_venta: number;
  imagen?: string;
};

type DetalleVenta = Producto & { cantidad: number };

export default function FormSales() {
  const [codigoBuscar, setCodigoBuscar] = useState('');
  const [detalles, setDetalles] = useState<DetalleVenta[]>([]);

  // Campos del formulario
  const [numeroFactura, setNumeroFactura] = useState('');
  const [fechaEmision, setFechaEmision] = useState('');
  const [descuento, setDescuento] = useState(0);
  const [observaciones, setObservaciones] = useState('');
  const [estado, setEstado] = useState('');
  const [tipoPago, setTipoPago] = useState('');
  const [loadingVenta, setLoadingVenta] = useState(false);

  const [subtotal, setSubtotal] = useState(0);
  const [iva, setIva] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let nuevoSubtotal = detalles.reduce((acc, item) => acc + item.precio_venta * item.cantidad, 0);
    nuevoSubtotal = nuevoSubtotal - descuento;
    if (nuevoSubtotal < 0) nuevoSubtotal = 0;
    const nuevoIVA = nuevoSubtotal * 0.15;
    const nuevoTotal = nuevoSubtotal + nuevoIVA;

    setSubtotal(nuevoSubtotal);
    setIva(nuevoIVA);
    setTotal(nuevoTotal);
  }, [detalles, descuento]);

  const agregarProducto = async () => {
    if (!codigoBuscar.trim()) return;

    try {
      const producto: Producto = await getProductoPorCodigo(codigoBuscar.trim());

      const yaExiste = detalles.find((p) => p.codigo === producto.codigo);
      if (yaExiste) {
        const actualizados = detalles.map((p) =>
          p.codigo === producto.codigo ? { ...p, cantidad: p.cantidad + 1 } : p
        );
        setDetalles(actualizados);
      } else {
        setDetalles([...detalles, { ...producto, cantidad: 1 }]);
      }
      setCodigoBuscar('');
    } catch (error) {
      console.error('Producto no encontrado:', error);
      alert('Producto no encontrado');
    }
  };

  const cambiarCantidad = (codigo: string, nuevaCantidad: number) => {
    if (nuevaCantidad < 1) return;
    const actualizados = detalles.map((p) =>
      p.codigo === codigo ? { ...p, cantidad: nuevaCantidad } : p
    );
    setDetalles(actualizados);
  };

  const eliminarProducto = (codigo: string) => {
    setDetalles(detalles.filter((p) => p.codigo !== codigo));
  };

  // Función para enviar la venta al backend
  const handleCrearVenta = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!numeroFactura || !fechaEmision || !estado || !tipoPago) {
      alert('Por favor completa todos los campos requeridos');
      return;
    }

    if (detalles.length === 0) {
      alert('Agrega al menos un producto para crear la venta');
      return;
    }

    setLoadingVenta(true);

    const detallesVenta = detalles.map(({ codigo, cantidad }) => ({
      codigo_producto: codigo,
      cantidad,
    }));

    const dataVenta = {
        numero_factura: numeroFactura,
        fecha: fechaEmision,
        descuento,
        observaciones,
        estado,
        tipo_pago: tipoPago,
        detalles: detallesVenta,
    };


    console.log('Datos de venta que se enviarán:', dataVenta);

    try {
      await createSale(dataVenta);
      alert('Venta creada exitosamente!');
      // Reset formulario
      setNumeroFactura('');
      setFechaEmision('');
      setDescuento(0);
      setObservaciones('');
      setEstado('');
      setTipoPago('');
      setDetalles([]);
    } catch (error) {
      console.error('Error al crear venta:', error);
      alert('Error al crear la venta');
    } finally {
      setLoadingVenta(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-6 border border-[#D71B07] rounded-lg shadow-md overflow-hidden">
      <div className="bg-[#D71B07] p-6">
        <h2 className="text-xl font-semibold text-white">Nueva Factura</h2>
      </div>

      <form
        className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-white"
        onSubmit={handleCrearVenta}
      >
        <div>
          <label className="block mb-2 text-sm font-medium text-black">Número de Factura</label>
          <input
            type="text"
            value={numeroFactura}
            onChange={(e) => setNumeroFactura(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg block w-full p-2.5"
            placeholder="Ej. F001-00001234"
            required
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-black">Fecha de Emisión</label>
          <input
            type="date"
            value={fechaEmision}
            onChange={(e) => setFechaEmision(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg block w-full p-2.5"
            required
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-black">Descuento</label>
          <input
            type="number"
            value={descuento}
            onChange={(e) => setDescuento(Number(e.target.value))}
            className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg block w-full p-2.5"
            min={0}
            step={0.01}
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-black">Observaciones</label>
          <input
            type="text"
            value={observaciones}
            onChange={(e) => setObservaciones(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg block w-full p-2.5"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-black">Estado</label>
          <select
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg block w-full p-2.5"
            required
          >
            <option value="">Seleccione un estado</option>
            <option value="cancelada">Cancelada</option>
            <option value="completada">Completada</option>
          </select>
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-black">Tipo de Pago</label>
          <select
            value={tipoPago}
            onChange={(e) => setTipoPago(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg block w-full p-2.5"
            required
          >
            <option value="">Seleccione un método</option>
            <option value="tarjeta">Tarjeta</option>
            <option value="efectivo">Efectivo</option>
            <option value="transferencia">Transferencia</option>
          </select>
        </div>

        {/* Buscador producto */}
        <div className="md:col-span-2">
          <label className="block mb-2 text-sm font-medium text-black">Buscar Producto (por código)</label>
          <div className="flex">
            <input
              type="text"
              value={codigoBuscar}
              onChange={(e) => setCodigoBuscar(e.target.value)}
              placeholder="Código del producto"
              className="bg-gray-50 border border-gray-300 text-black text-sm rounded-l-lg block w-full p-2.5"
            />
            <button
              type="button"
              onClick={agregarProducto}
              className="bg-[#D71B07] text-white px-4 py-2 rounded-r-lg hover:bg-red-700 transition-colors"
            >
              Agregar
            </button>
          </div>
        </div>

        {/* Subtotal, IVA, Total */}
        <div>
          <label className="block mb-2 text-sm font-medium text-black">Subtotal</label>
          <input
            type="number"
            value={subtotal.toFixed(2)}
            readOnly
            className="bg-gray-100 border border-gray-300 text-black text-sm rounded-lg block w-full p-2.5"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-black">IVA (15%)</label>
          <input
            type="number"
            value={iva.toFixed(2)}
            readOnly
            className="bg-gray-100 border border-gray-300 text-black text-sm rounded-lg block w-full p-2.5"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-black">Total</label>
          <input
            type="number"
            value={total.toFixed(2)}
            readOnly
            className="bg-gray-100 border border-gray-300 text-black text-sm rounded-lg block w-full p-2.5"
          />
        </div>

        {/* Botón crear venta */}
        <div className="md:col-span-2 flex justify-end">
          <button
            type="submit"
            disabled={loadingVenta}
            className={`bg-[#D71B07] text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50`}
          >
            {loadingVenta ? 'Creando venta...' : 'Crear Venta'}
          </button>
        </div>
      </form>

      {/* Tabla detalles */}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-6">
        <table className="w-full text-sm text-left text-black border-separate border-spacing-0">
          <thead className="text-xs uppercase bg-[#D71B07] text-white">
            <tr>
              <th className="px-6 py-3 border-b" style={{ borderColor: "#D71B07" }}></th>
              <th className="px-6 py-3 border-b">Producto</th>
              <th className="px-6 py-3 border-b">Cantidad</th>
              <th className="px-6 py-3 border-b">Precio</th>
              <th className="px-6 py-3 border-b">Acción</th>
            </tr>
          </thead>
          <tbody>
            {detalles.map((producto) => (
              <tr key={producto.codigo} className="bg-white border-b border-[#D71B07] hover:bg-gray-100">
                <td className="p-4">
                  <img
                    src={producto.imagen || `https://via.placeholder.com/80?text=${producto.codigo}`}
                    alt={producto.nombre}
                    className="w-16 md:w-24 max-w-full max-h-full"
                  />
                </td>
                <td className="px-6 py-4 font-semibold text-black">{producto.nombre}</td>
                <td className="px-6 py-4">
                  <input
                    type="number"
                    value={producto.cantidad}
                    onChange={(e) => cambiarCantidad(producto.codigo, Number(e.target.value))}
                    className="w-16 border border-[#D71B07] text-center rounded-md"
                    min={1}
                  />
                </td>
                <td className="px-6 py-4 font-semibold text-black">
                  ${(producto.precio_venta * producto.cantidad).toFixed(2)}
                </td>
                <td className="px-6 py-4">
                  <button
                    type="button"
                    onClick={() => eliminarProducto(producto.codigo)}
                    className="text-red-600 hover:underline font-medium"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}