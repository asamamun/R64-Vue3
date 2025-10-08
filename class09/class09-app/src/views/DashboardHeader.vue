<template>
  <header class="header">
    <h1>{{ title }}</h1>
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/category/electronics">Electronics</router-link>
      <router-link to="/category/clothing">Clothing</router-link>
      <router-link to="/category/books">Books</router-link>
    </nav>
    <div class="cart-summary">
      <router-link to="/cart" class="cart-link">
        <span>Cart: {{ cartItemCount }} items</span>
        <span>Total: ${{ cartTotal.toFixed(2) }}</span>
      </router-link>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useProductStore } from '../stores/productStore'

// Define props
interface Props {
  title?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Product Dashboard'
})

// Use store
const productStore = useProductStore()

// Computed properties from store
const cartItemCount = computed(() => productStore.cartItemCount)
const cartTotal = computed(() => productStore.cartTotal)
</script>

<style scoped>
.header {
  background-color: #42b983;
  color: white;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.header h1 {
  margin: 0;
  font-size: 1.5rem;
}

nav a {
  color: white;
  text-decoration: none;
  margin-right: 1rem;
  padding: 0.5rem;
  border-radius: 4px;
  transition: background-color 0.3s;
}

nav a:hover {
  background-color: rgba(255,255,255,0.2);
}

.cart-summary {
  display: flex;
  flex-direction: column;
  text-align: right;
}

.cart-link {
  color: white;
  text-decoration: none;
  transition: opacity 0.3s;
}

.cart-link:hover {
  opacity: 0.8;
}

@media (max-width: 768px) {
  .header {
    flex-direction: column;
    gap: 1rem;
  }
  
  nav {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .cart-summary {
    text-align: center;
  }
}
</style>