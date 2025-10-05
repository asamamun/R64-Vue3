import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js'
import SweetAlert2 from './sweetalert2';
import { useProductStore } from './stores/productStore'

// Make bootstrap available globally
window.bootstrap = bootstrap

const pinia = createPinia()
const app = createApp(App)

app.use(SweetAlert2)
app.use(pinia)
app.use(router)

// Load cart from localStorage
const productStore = useProductStore(pinia)
productStore.loadCartFromLocalStorage()

app.mount('#app')