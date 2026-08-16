import { ref } from 'vue'

import { loteRepository } from '../repositories/mock-lote.repository'
import type { LoteModel } from '../models/lote.model'

export interface LoteCatalogo extends LoteModel {
  cuposDisponibles: number
  porcentajeFondeo: number
  diasRestantes: number
}

export function useLotes() {
  const lotes = ref<LoteCatalogo[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const lote = ref<LoteCatalogo | null>(null)

  function calcularDiasRestantes(fechaFin: string): number {
    const hoy = new Date()
    const fin = new Date(`${fechaFin}T23:59:59`)

    const diferencia = fin.getTime() - hoy.getTime()

    if (diferencia <= 0) {
      return 0
    }

    return Math.ceil(diferencia / (1000 * 60 * 60 * 24))
  }

  function transformarLote(lote: LoteModel): LoteCatalogo {
    const cuposDisponibles = Math.max(lote.cantidadCupos - lote.cuposOcupados, 0)

    const porcentajeFondeo =
      lote.cantidadCupos > 0
        ? Math.min(Math.round((lote.cuposOcupados / lote.cantidadCupos) * 100), 100)
        : 0

    return {
      ...lote,
      cuposDisponibles,
      porcentajeFondeo,
      diasRestantes: calcularDiasRestantes(lote.fechaFin),
    }
  }

  async function obtenerLotes(): Promise<void> {
    loading.value = true
    error.value = null

    try {
      const resultado = await loteRepository.obtenerLotes()

      lotes.value = resultado.map(transformarLote)
    } catch {
      error.value = 'No pudimos cargar los lotes. Intentá nuevamente.'
      lotes.value = []
    } finally {
      loading.value = false
    }
  }

  async function obtenerLotePorId(id: string): Promise<void> {
    loading.value = true
    error.value = null
    lote.value = null

    try {
      const resultado = await loteRepository.obtenerLotePorId(id)

      if (!resultado) {
        error.value = 'No encontramos el lote solicitado.'
        return
      }

      lote.value = transformarLote(resultado)
    } catch {
      error.value = 'No pudimos cargar el lote. Intentá nuevamente.'
    } finally {
      loading.value = false
    }
  }

  return {
    lotes,
    lote,
    loading,
    error,
    obtenerLotes,
    obtenerLotePorId,
  }
}
