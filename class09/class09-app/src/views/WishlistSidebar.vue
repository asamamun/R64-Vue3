<template>
  <aside class="wishlist-sidebar">
    <h2>Wishlist</h2>
    <div class="wishlist-items">
      <div 
        v-for="product in wishlistItems" 
        :key="product.id"
        class="wishlist-item"
      >
        <div class="item-info">
          <div class="item-image">{{ product.name.charAt(0) }}</div>
          <div class="item-details">
            <h4>{{ product.name }}</h4>
            <p class="price">${{ product.price.toFixed(2) }}</p>
          </div>
        </div>
        <div class="item-actions">
          <button @click="removeFromWishlist(product.id)" class="remove-btn">Remove</button>
          <button @click="addToCart(product)" class="add-to-cart-btn">Add to Cart</button>
        </div>
      </div>
      
      <div v-if="wishlistItems.length === 0" class="empty-wishlist">
        <p>Your wishlist is empty</p>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useProductStore } from '../stores/productStore'
import type { Product } from '../stores/productStore'

// Use store
const productStore = useProductStore()

// Computed properties
const wishlistItems = computed(() => productStore.wishlist)

// Methods
function removeFromWishlist(productId: number) {
  productStore.removeFromWishlist(productId)
}

function addToCart(product: Product) {
  productStore.addToCart(product)
  productStore.removeFromWishlist(product.id)
}
</script>

<style scoped>
.wishlist-sidebar {
  width: 250px;
  background-color: #fff8e1;
  padding: 20px;
  border-left: 1px solid #ddd;
  min-height: calc(100vh - 60px);
}

.wishlist-sidebar h2 {
  margin-top: 0;
  color: #333;
}

.wishlist-items {
  margin-top: 20px;
}

.wishlist-item {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 15px;
  background-color: white;
}

.item-info {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.item-image {
  width: 40px;
  height: 40px;
  background-color: #42b983;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  margin-right: 10px;
}

.item-details h4 {
  margin: 0 0 5px 0;
  font-size: 1rem;
}

.price {
  margin: 0;
  font-weight: bold;
  color: #42b983;
}

.item-actions {
  display: flex;
  gap: 5px;
}

.item-actions button {
  flex: 1;
  padding: 5px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.8rem;
}

.remove-btn {
  background-color: #ff6b6b;
  color: white;
}

.remove-btn:hover {
  background-color: #ff5252;
}

.add-to-cart-btn {
  background-color: #42b983;
  color: white;
}

.add-to-cart-btn:hover {
  background-color: #359c6d;
}

.empty-wishlist {
  text-align: center;
  padding: 20px;
  color: #666;
}

@media (max-width: 768px) {
  .wishlist-sidebar {
    width: 100%;
    border-left: none;
    border-top: 1px solid #ddd;
    min-height: auto;
  }
}
</style>