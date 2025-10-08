<template>
  <div class="product-list">
    <h2>Products</h2>
    <div v-if="products.length === 0">No products available</div>
    <div v-else class="products-grid">
      <div 
        v-for="product in products" 
        :key="product.id"
        class="product-item"
      >
        <h3>{{ product.name }}</h3>
        <p>{{ product.description }}</p>
        <p class="price">${{ product.price }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Product {
  id: number
  name: string
  price: number
  description: string
}

const products = ref<Product[]>([
  { id: 1, name: 'Product 1', price: 29.99, description: 'This is product 1' },
  { id: 2, name: 'Product 2', price: 39.99, description: 'This is product 2' },
  { id: 3, name: 'Product 3', price: 49.99, description: 'This is product 3' }
])
</script>

<style scoped>
.product-list {
  padding: 20px;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.product-item {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.product-item h3 {
  margin-top: 0;
  color: #333;
}

.price {
  font-weight: bold;
  color: #42b983;
}
</style>