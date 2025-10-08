<template>
  <div class="product-details" v-if="product">
    <div class="product-image">
      <div class="placeholder-image">{{ product.name.charAt(0) }}</div>
    </div>
    <div class="product-info">
      <h1>{{ product.name }}</h1>
      <p class="category">{{ product.category }}</p>
      <p class="description">{{ product.description }}</p>
      <p class="price">${{ product.price.toFixed(2) }}</p>
      <div class="actions">
        <button @click="addToCart" class="add-to-cart">Add to Cart</button>
        <button @click="addToWishlist" class="add-to-wishlist">Add to Wishlist</button>
        <button @click="goBack" class="back-button">Back to Products</button>
      </div>
    </div>
  </div>
  <div v-else class="product-not-found">
    <h2>Product Not Found</h2>
    <p>The product you're looking for doesn't exist or has been removed.</p>
    <button @click="goBack" class="back-button">Back to Products</button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProductStore } from '../stores/productStore'
import type { Product } from '../stores/productStore'

const route = useRoute()
const router = useRouter()
const productStore = useProductStore()

const product = ref<Product | null>(null)

onMounted(() => {
  const productId = parseInt(route.params.id as string)
  product.value = productStore.products.find(p => p.id === productId) || null
})

function addToCart() {
  if (product.value) {
    productStore.addToCart(product.value)
  }
}

function addToWishlist() {
  if (product.value) {
    productStore.addToWishlist(product.value)
  }
}

function goBack() {
  router.go(-1)
}
</script>

<style scoped>
/* Product Details Component Styles */
.product-details {
  display: flex;
  gap: 30px;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.product-image {
  flex: 1;
  height: 400px;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.placeholder-image {
  width: 200px;
  height: 200px;
  background-color: #42b983;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 4rem;
  font-weight: bold;
}

.product-info {
  flex: 1;
}

.product-info h1 {
  margin-top: 0;
  color: #333;
}

.category {
  color: #42b983;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 1rem;
  margin: 10px 0;
}

.description {
  color: #666;
  font-size: 1.1rem;
  margin: 20px 0;
  line-height: 1.6;
}

.price {
  font-weight: bold;
  font-size: 2rem;
  color: #333;
  margin: 20px 0;
}

.actions {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 30px;
}

button {
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
}

.add-to-cart {
  background-color: #42b983;
  color: white;
}

.add-to-cart:hover {
  background-color: #359c6d;
}

.add-to-wishlist {
  background-color: #f0f0f0;
  color: #333;
}

.add-to-wishlist:hover {
  background-color: #e0e0e0;
}

.back-button {
  background-color: #6c757d;
  color: white;
}

.back-button:hover {
  background-color: #5a6268;
}

.product-not-found {
  text-align: center;
  padding: 50px 20px;
}

.product-not-found h2 {
  color: #333;
  margin-bottom: 20px;
}

@media (max-width: 768px) {
  .product-details {
    flex-direction: column;
  }
  
  .product-image {
    height: 300px;
  }
}
</style>