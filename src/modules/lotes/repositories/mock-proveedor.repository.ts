import { proveedoresMock } from '../data/proveedores.mock'
import type { ProveedorModel } from '../models/proveedor.model'
import type { ProveedorRepository } from './proveedor.repository'

const MOCK_DELAY_MS = 150

function delay(milliseconds: number): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(resolve, milliseconds)
  })
}

export class MockProveedorRepository implements ProveedorRepository {
  async obtenerProveedorPorId(id: string): Promise<ProveedorModel | null> {
    await delay(MOCK_DELAY_MS)

    return proveedoresMock.find((proveedor) => proveedor.id === id) ?? null
  }
}

export const proveedorRepository: ProveedorRepository = new MockProveedorRepository()
