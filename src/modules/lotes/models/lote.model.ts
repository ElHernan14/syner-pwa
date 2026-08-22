export type EstadoLote =
  | 'borrador'
  | 'fondeando'
  | 'completado'
  | 'comprado'
  | 'enviado'
  | 'entregado'
  | 'cancelado'

export type CategoriaLote =
  | 'tecnologia'
  | 'hogar'
  | 'indumentaria'
  | 'movilidad'
  | 'servicios'
  | 'otros'

export interface LoteModel {
  id: string

  nombre: string

  descripcion: string
  descripcionCorta: string
  descripcionLarga: string

  caracteristicas: string[]
  incluye: string[]
  consideraciones: string[]

  imagen: string

  categoria: CategoriaLote

  precioMercado: number
  precioCupo: number
  porcentajeAhorro: number

  cantidadCupos: number
  cuposOcupados: number

  fechaCreacion: string
  fechaInicio: string
  fechaFin: string

  estado: EstadoLote

  proveedorId: string
}
