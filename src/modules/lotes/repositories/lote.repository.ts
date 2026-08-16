import type { LoteModel } from '../models/lote.model'

export interface LoteRepository {
  obtenerLotes(): Promise<LoteModel[]>
  obtenerLotePorId(id: string): Promise<LoteModel | null>
}
