import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePersistStore = defineStore(
    'counter',
    () => {
        const token = ref('')
        const count = ref(0)

        function setToken(val) {
            token.value = val
        }

        function increment() {
            count.value++
        }

        return { token, count, setToken, increment }
    },
    {
        persist: sessionStorage
    }
)
