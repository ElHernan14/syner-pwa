import { ref } from 'vue'

export type SynerTheme = 'light' | 'dark'

const STORAGE_KEY = 'syner-theme'

const tema = ref<SynerTheme>('light')

let inicializado = false

function obtenerTemaGuardado(): SynerTheme | null {
  const temaGuardado = localStorage.getItem(STORAGE_KEY)

  if (temaGuardado === 'light' || temaGuardado === 'dark') {
    return temaGuardado
  }

  return null
}

function aplicarTema(nuevoTema: SynerTheme): void {
  document.documentElement.classList.toggle('dark', nuevoTema === 'dark')
  document.documentElement.style.colorScheme = nuevoTema
}

function inicializarTema(): void {
  if (inicializado) {
    return
  }

  const temaGuardado = obtenerTemaGuardado()

  tema.value = temaGuardado ?? 'light'

  aplicarTema(tema.value)

  inicializado = true
}

function cambiarTema(): void {
  tema.value = tema.value === 'light' ? 'dark' : 'light'

  aplicarTema(tema.value)

  localStorage.setItem(STORAGE_KEY, tema.value)
}

export function useTheme() {
  inicializarTema()

  return {
    tema,
    cambiarTema,
  }
}
