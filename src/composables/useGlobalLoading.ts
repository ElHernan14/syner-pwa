import { computed, ref } from 'vue'

const operacionesPendientes = ref(0)

function iniciarLoading(): void {
  operacionesPendientes.value += 1
}

function finalizarLoading(): void {
  operacionesPendientes.value = Math.max(operacionesPendientes.value - 1, 0)
}

const cargando = computed(() => operacionesPendientes.value > 0)

export function useGlobalLoading() {
  return {
    cargando,
    iniciarLoading,
    finalizarLoading,
  }
}
