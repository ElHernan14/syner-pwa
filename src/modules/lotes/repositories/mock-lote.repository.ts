import { lotesMock } from '../data/lotes.mock'
import type { LoteModel } from '../models/lote.model'
import type { LoteRepository } from './lote.repository'

const MOCK_DELAY_MS = 300

function delay(milliseconds: number): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(resolve, milliseconds)
  })
}

export class MockLoteRepository implements LoteRepository {
  async obtenerLotes(): Promise<LoteModel[]> {
    await delay(MOCK_DELAY_MS)

    return [...lotesMock]
  }

  async obtenerLotePorId(id: string): Promise<LoteModel | null> {
    await delay(MOCK_DELAY_MS)

    return lotesMock.find((lote) => lote.id === id) ?? null
  }
}

export const loteRepository: LoteRepository = new MockLoteRepository()
