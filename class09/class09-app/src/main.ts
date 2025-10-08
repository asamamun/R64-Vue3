import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'

import App from './App.vue'

// Create Pinia store
const pinia = createPinia()

// Create Vue app instance
const app = createApp(App)

// Use plugins
app.use(pinia)
app.use(router)

// Mount app
app.mount('#app')