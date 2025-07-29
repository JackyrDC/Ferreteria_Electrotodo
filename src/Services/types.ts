type EstadoCivil = "soltero" | "casado" | "divorciado" | "viudo";
type Estado = "activo" | "inactivo";
type EstadoVenta = "pendiente" | "completada" | "cancelada";
interface Persona{
    persona_id: number;
    primerNombre: string;
    segundoNombre: string;
    primerApellido: string;
    segundoApellido: string;
    numeroIdentificacion: string;
    telefono: string;
    email: string;
    estadoCivil: EstadoCivil;
    sexo: string;
    direccion: string;
}


interface Users{
    user_id: number;
    username: string;
    password: string;
    rol: string;
    estado: Estado;
    profileImage: string;
    persona: Persona;
}

interface CreateUsers{
    user_id: number;
    username: string;
    password: string;
    rol: string;
    estado: Estado;
    profileImage: string;
    persona_id: number;
}

interface Cliente{
    id: string;
    nombre: string;
    email: string;
    telefono: string;
    direccion: string;
}

interface Proveedor{
    proveedor_id: string;
    nombre: string;
    telefono: string;
    email: string;
}

interface CategoriaProducto{
    categoria_id: string;
    nombre: string;
    descripcion: string;
    activo: boolean;
}

interface Producto{
    codigo: string;
    nombre: string;
    descripcion: string;
    precio_venta: number;
    precio_compra: number;
    stock_minimo: number;
    stock_actual: number;
    activo: boolean;
    categoria: CategoriaProducto;
}

interface AgregarProducto{
    codigo: string;
    nombre: string;
    descripcion: string;
    precio_venta: number;
    precio_compra: number;
    stock_minimo: number;
    stock_actual: number;
    activo: boolean;
    categoria_id: string;
}

interface Venta{
    numero_factura: string;
    fecha: Date;
    subtotal: number;
    iva: number;
    descuento: number;
    total: number;
    estado: EstadoVenta;
    tipo_pago: string;
    observaciones?: string;
    usuario: Users;
}

interface CreateVenta{
       numero_factura: string;
    fecha: Date;
    subtotal: number;
    iva: number;
    descuento: number;
    total: number;
    estado: EstadoVenta;
    tipo_pago: string;
    observaciones?: string;
    usuario_id: number;
}

interface CrearDetalleVenta{
    id: number;
    numero_factura: string;
    codigo_producto: string;
    cantidad: number;
    precio_unitario: number;
}

interface DetalleVenta{
    id: number;
    numero_factura: string;
    producto: Producto;
    cantidad: number;
    precio_unitario: number;
}

interface OrdenCompra{
    numero_orden: number;
    fecha_emision: Date;
    fecha_entrega_esperada: Date;
    iva: number;
    total: number;
    estado: EstadoVenta;
    proveedor: Proveedor;
}

interface nuevaOrdenCompra{
    numero_orden: number;
    fecha_emision: Date;
    fecha_entrega_esperada: Date;
    iva: number;
    total: number;
    estado: EstadoVenta;
    proveedor_id: string;
}

interface ordenCompraDetalle{
    id: number;
    ordenCompra: OrdenCompra;
    producto: Producto;
    cantidad: number;
    precio_unitario: number;
}

interface CrearOrdenCompraDetalle{
    id: number;
    numero_orden: number;
    codigo_producto: string;
    cantidad: number;
    precio_unitario: number;
}

interface ConfiguracionCaja{
    caja_id: number;
    fecha: Date;
    saldo_inicial: number;
}

interface MovimientoCaja{
    tipo: "ingreso" | "egreso";
    descripcion: string;
    monto: number;
    numero_factura?: string;
    numero_orden?: number;
    fecha: Date;
}

export type{
   EstadoCivil,
    Estado,
    EstadoVenta,
    Persona,
    Users,
    CreateUsers,
    Producto,
    AgregarProducto,
    Venta,
    CreateVenta,
    CrearDetalleVenta,
    DetalleVenta,
    Cliente,
    nuevaOrdenCompra,
    ordenCompraDetalle,
    CrearOrdenCompraDetalle,
    ConfiguracionCaja,
    MovimientoCaja
}
