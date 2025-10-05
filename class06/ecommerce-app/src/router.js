import { createRouter, createWebHistory } from 'vue-router'
import ProductList from './views/ProductList.vue'
import Cart from './views/Cart.vue'
import Orders from './views/Orders.vue'

const routes = [
  { path: '/', component: ProductList },
  { path: '/cart', component: Cart },
  { path: '/orders', component: Orders }
]

const router = createRouter({
  history: createWebHistory('/vueecommerce/'),
  routes
})

export default router