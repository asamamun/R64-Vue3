<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container">
        <a class="navbar-brand" href="#">E-commerce App</a>
        <div class="navbar-nav">
          <router-link class="nav-link" to="/">Products</router-link>
          <router-link class="nav-link" to="/cart">Cart ({{ cart.length }})</router-link>
          <router-link class="nav-link" to="/orders">Orders</router-link>
        </div>
      </div>
    </nav>
    <hr>
    <router-view></router-view>
  </div>
</template>

<script>
import { useProductStore } from './stores/productStore'
import { storeToRefs } from 'pinia'


export default {
  name: 'App',
  setup() {
    const productStore = useProductStore()
    const { cart } = storeToRefs(productStore)
    
    return {
      cart,
      fetchProducts: productStore.fetchProducts
    }
  },
  created() {
    this.fetchProducts()
  },
  mounted() {
    
  },
}
</script>