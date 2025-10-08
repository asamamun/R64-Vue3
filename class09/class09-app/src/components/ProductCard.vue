<template>
  <div class="product-card">
    <div class="product-image">
      <div class="placeholder-image">{{ product.name.charAt(0) }}</div>
    </div>
    <div class="product-info">
      <h3>{{ product.name }}</h3>
      <p class="category">{{ product.category }}</p>
      <p class="description">{{ product.description }}</p>
      <div class="product-actions">
        <span class="price">${{ product.price.toFixed(2) }}</span>
        <div class="buttons">
          <button @click="addToCart" class="add-to-cart">Add to Cart</button>
          <button @click="addToWishlist" class="add-to-wishlist">Wishlist</button>
          <!-- Link to product details -->
          <button @click="viewDetails" class="view-details">View Details</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import type { Product } from '../stores/productStore'

// Define props
interface Props {
  product: Product
}

const props = defineProps<Props>()

// Define emits
const emit = defineEmits<{
  (e: 'add-to-cart', product: Product): void
  (e: 'add-to-wishlist', product: Product): void
}>()

const router = useRouter()

// Methods
function addToCart() {
  emit('add-to-cart', props.product)
}

function addToWishlist() {
  emit('add-to-wishlist', props.product)
}

// Navigate to product details page
function viewDetails() {
  router.push(`/product/${props.product.id}`)
}
</script>

<style scoped>
.product-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: transform 0.3s, box-shadow 0.3s;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.15);
}

.product-image {
  height: 150px;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.placeholder-image {
  width: 80px;
  height: 80px;
  background-color: #42b983;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 2rem;
  font-weight: bold;
}

.product-info {
  padding: 15px;
}

.product-info h3 {
  margin: 0 0 10px 0;
  color: #333;
}

.category {
  color: #42b983;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 0.8rem;
  margin: 5px 0;
}

.description {
  color: #666;
  font-size: 0.9rem;
  margin: 10px 0;
  min-height: 40px;
}

.product-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
}

.price {
  font-weight: bold;
  font-size: 1.2rem;
  color: #333;
}

.buttons {
  display: flex;
  gap: 5px;
}

button {
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.8rem;
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

.view-details {
  background-color: #007bff;
  color: white;
}

.view-details:hover {
  background-color: #0069d9;
}
</style>