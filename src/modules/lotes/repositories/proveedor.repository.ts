import type { ProveedorModel } from '../models/proveedor.model'

export interface ProveedorRepository {
  obtenerProveedorPorId(id: string): Promise<ProveedorModel | null>
}
