import type { AddressModel } from '../models/address.model'

const DIRECCIONES_STORAGE_KEY = 'syner-mock-direcciones'

function cargarDirecciones(): AddressModel[] {
  const almacenadas = localStorage.getItem(DIRECCIONES_STORAGE_KEY)

  if (!almacenadas) {
    return []
  }

  try {
    return JSON.parse(almacenadas) as AddressModel[]
  } catch {
    localStorage.removeItem(DIRECCIONES_STORAGE_KEY)
    return []
  }
}

export const direccionesMock: AddressModel[] = cargarDirecciones()

export function persistirDirecciones(): void {
  localStorage.setItem(DIRECCIONES_STORAGE_KEY, JSON.stringify(direccionesMock))
}
