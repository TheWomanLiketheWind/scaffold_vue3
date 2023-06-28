import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/index'
import pinia from '@/stores/index'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const app = createApp(App)
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(router)

app.mount('#app')
