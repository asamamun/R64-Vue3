import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

// This store is no longer used in the application
// Product and cart functionality is now handled by the product store
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})