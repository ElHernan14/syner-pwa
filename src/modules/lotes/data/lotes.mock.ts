import type { LoteModel } from '../models/lote.model'

export const lotesMock: LoteModel[] = [
  {
    id: 'lote-001',
    nombre: 'Smartphone Samsung Galaxy A56',
    descripcion:
      'Smartphone Samsung Galaxy A56 5G de 256 GB, disponible mediante compra colaborativa.',
    imagen: '/mock/lotes/samsung-galaxy-a56.webp',
    categoria: 'tecnologia',

    precioMercado: 899999,
    precioCupo: 599999,
    porcentajeAhorro: 33,

    cantidadCupos: 10,
    cuposOcupados: 7,

    fechaCreacion: '2026-08-01',
    fechaInicio: '2026-08-01',
    fechaFin: '2026-09-15',

    estado: 'fondeando',

    proveedorId: 'proveedor-001',
  },

  {
    id: 'lote-002',
    nombre: 'Notebook Lenovo IdeaPad Slim 5',
    descripcion:
      'Notebook Lenovo IdeaPad Slim 5 con procesador Ryzen 7, 16 GB de RAM y 512 GB SSD.',
    imagen: '/mock/lotes/lenovo-ideapad-slim-5.webp',
    categoria: 'tecnologia',

    precioMercado: 1499999,
    precioCupo: 999999,
    porcentajeAhorro: 33,

    cantidadCupos: 12,
    cuposOcupados: 9,

    fechaCreacion: '2026-08-05',
    fechaInicio: '2026-08-05',
    fechaFin: '2026-09-20',

    estado: 'fondeando',

    proveedorId: 'proveedor-002',
  },

  {
    id: 'lote-003',
    nombre: 'Set de herramientas Bosch Professional',
    descripcion: 'Set profesional de herramientas eléctricas para uso doméstico y profesional.',
    imagen: '/mock/lotes/bosch-tools.webp',
    categoria: 'hogar',

    precioMercado: 749999,
    precioCupo: 524999,
    porcentajeAhorro: 30,

    cantidadCupos: 8,
    cuposOcupados: 4,

    fechaCreacion: '2026-08-08',
    fechaInicio: '2026-08-08',
    fechaFin: '2026-09-22',

    estado: 'fondeando',

    proveedorId: 'proveedor-003',
  },

  {
    id: 'lote-004',
    nombre: 'Zapatillas Nike Air Max',
    descripcion: 'Zapatillas Nike Air Max originales en distintos talles y colores disponibles.',
    imagen: '/mock/lotes/nike-air-max.webp',
    categoria: 'indumentaria',

    precioMercado: 599999,
    precioCupo: 359999,
    porcentajeAhorro: 40,

    cantidadCupos: 15,
    cuposOcupados: 13,

    fechaCreacion: '2026-08-10',
    fechaInicio: '2026-08-10',
    fechaFin: '2026-09-05',

    estado: 'fondeando',

    proveedorId: 'proveedor-004',
  },

  {
    id: 'lote-005',
    nombre: 'Bicicleta MTB Rodado 29',
    descripcion: 'Bicicleta de montaña rodado 29 con cuadro de aluminio y 21 velocidades.',
    imagen: '/mock/lotes/bicicleta-mtb.webp',
    categoria: 'movilidad',

    precioMercado: 679999,
    precioCupo: 475999,
    porcentajeAhorro: 30,

    cantidadCupos: 10,
    cuposOcupados: 10,

    fechaCreacion: '2026-07-15',
    fechaInicio: '2026-07-15',
    fechaFin: '2026-08-29',

    estado: 'completado',

    proveedorId: 'proveedor-005',
  },

  {
    id: 'lote-006',
    nombre: 'Aire acondicionado inverter',
    descripcion:
      'Aire acondicionado split inverter de 4500 frigorías, preparado para alta eficiencia energética.',
    imagen: '/mock/lotes/aire-acondicionado.webp',
    categoria: 'hogar',

    precioMercado: 1249999,
    precioCupo: 874999,
    porcentajeAhorro: 30,

    cantidadCupos: 10,
    cuposOcupados: 6,

    fechaCreacion: '2026-08-03',
    fechaInicio: '2026-08-03',
    fechaFin: '2026-09-17',

    estado: 'fondeando',

    proveedorId: 'proveedor-006',
  },

  {
    id: 'lote-007',
    nombre: 'Servicio de instalación de paneles solares',
    descripcion:
      'Servicio integral de instalación de sistema solar domiciliario mediante compra colaborativa.',
    imagen: '/mock/lotes/paneles-solares.webp',
    categoria: 'servicios',

    precioMercado: 3499999,
    precioCupo: 2449999,
    porcentajeAhorro: 30,

    cantidadCupos: 20,
    cuposOcupados: 11,

    fechaCreacion: '2026-08-06',
    fechaInicio: '2026-08-06',
    fechaFin: '2026-10-01',

    estado: 'fondeando',

    proveedorId: 'proveedor-007',
  },

  {
    id: 'lote-008',
    nombre: 'Smart TV Samsung 65"',
    descripcion:
      'Smart TV Samsung de 65 pulgadas con resolución 4K y plataforma Smart TV integrada.',
    imagen: '/mock/lotes/samsung-tv-65.webp',
    categoria: 'tecnologia',

    precioMercado: 1299999,
    precioCupo: 909999,
    porcentajeAhorro: 30,

    cantidadCupos: 10,
    cuposOcupados: 8,

    fechaCreacion: '2026-07-28',
    fechaInicio: '2026-07-28',
    fechaFin: '2026-09-08',

    estado: 'fondeando',

    proveedorId: 'proveedor-002',
  },
]
