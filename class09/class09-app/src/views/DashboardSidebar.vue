<template>
  <aside class="sidebar">
    <h2>Categories</h2>
    <ul>
      <li 
        v-for="category in categories" 
        :key="category"
        :class="{ active: selectedCategory === category }"
        @click="selectCategory(category)"
      >
        {{ category }}
      </li>
      <li 
        :class="{ active: selectedCategory === null }"
        @click="selectCategory(null)"
      >
        All Products
      </li>
    </ul>
    
    <!-- Navigation links -->
    <div class="navigation-links">
      <router-link to="/cart" class="nav-link">
        <span>🛒 Cart ({{ cartItemCount }})</span>
      </router-link>
    </div>
    
    <div class="cart-preview" v-if="cartItemCount > 0">
      <h3>Cart Preview</h3>
      <ul>
        <li v-for="item in cartItems" :key="item.product.id">
          <span>{{ item.product.name }} ({{ item.quantity }})</span>
          <span>${{ (item.product.price * item.quantity).toFixed(2) }}</span>
        </li>
      </ul>
      <div class="cart-total">
        <strong>Total: ${{ cartTotal.toFixed(2) }}</strong>
      </div>
      <router-link to="/cart" class="view-cart-btn">View Full Cart</router-link>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useProductStore } from '../stores/productStore'
import type { CartItem } from '../stores/productStore'

// Use store
const productStore = useProductStore()

// Computed properties from store
const categories = computed(() => productStore.categories)
const selectedCategory = computed(() => productStore.selectedCategory)
const cartItemCount = computed(() => productStore.cartItemCount)
const cartTotal = computed(() => productStore.cartTotal)

// Computed property for cart items (first 3 items for preview)
const cartItems = computed(() => {
  return productStore.cart.slice(0, 3)
})

// Methods
function selectCategory(category: string | null) {
  productStore.setSelectedCategory(category)
}
</script>

<style scoped>
.sidebar {
  width: 250px;
  background-color: #f5f5f5;
  padding: 20px;
  border-right: 1px solid #ddd;
  min-height: calc(100vh - 60px);
}

.sidebar h2 {
  margin-top: 0;
  color: #333;
}

.sidebar ul {
  list-style: none;
  padding: 0;
}

.sidebar li {
  padding: 10px;
  margin-bottom: 5px;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.sidebar li:hover {
  background-color: #e0e0e0;
}

.sidebar li.active {
  background-color: #42b983;
  color: white;
}

.navigation-links {
  margin: 20px 0;
  padding-top: 20px;
  border-top: 1px solid #ddd;
}

.nav-link {
  display: block;
  padding: 10px;
  background-color: #42b983;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  text-align: center;
  transition: background-color 0.3s;
}

.nav-link:hover {
  background-color: #359c6d;
}

.cart-preview {
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #ddd;
}

.cart-preview h3 {
  margin-top: 0;
}

.cart-preview ul {
  padding: 0;
  list-style: none;
}

.cart-preview li {
  display: flex;
  justify-content: space-between;
  padding: 5px 0;
  font-size: 0.9rem;
}

.cart-total {
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid #ddd;
  text-align: right;
}

.view-cart-btn {
  display: block;
  margin-top: 15px;
  padding: 8px;
  background-color: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  text-align: center;
  transition: background-color 0.3s;
}

.view-cart-btn:hover {
  background-color: #0069d9;
}

@media (max-width: 768px) {
  .sidebar {
    width: 100%;
    min-height: auto;
    border-right: none;
    border-bottom: 1px solid #ddd;
  }
}
</style>