<script setup>
import { defineProps, defineEmits } from 'vue'

defineProps({
  product: {
    type: Object,
    required: true
  }
})

defineEmits(['add-to-cart'])
</script>

<template>
  <div class="product-card">
    <img 
      :src="product.thumbnail || 'https://via.placeholder.com/300x200?text=No+Image'" 
      :alt="product.title"
      class="product-image"
      @error="e => e.target.src = 'https://via.placeholder.com/300x200?text=No+Image'"
    >
    <div class="product-info">
      <h3>{{ product.title }}</h3>
      <p class="product-description">{{ product.description }}</p>
      <div class="product-meta">
        <span class="product-category" v-if="product.category">{{ product.category }}</span>
        <span class="product-brand" v-if="product.brand">{{ product.brand }}</span>
      </div>
      <div class="product-price">${{ product.price }}</div>
      <button 
        @click="$emit('add-to-cart', product)"
        class="add-to-cart-btn"
      >
        Add to Cart
      </button>
    </div>
  </div>
</template>

<style scoped>
.product-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: transform 0.2s;
  background: white;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.15);
}

.product-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.product-info {
  padding: 15px;
}

.product-description {
  color: #666;
  font-size: 14px;
  margin: 10px 0;
  min-height: 60px;
}

.product-meta {
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
}

.product-category, .product-brand {
  background-color: #e0e0e0;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
}

.product-price {
  font-weight: bold;
  font-size: 18px;
  color: #e91e63;
  margin: 10px 0;
}

.add-to-cart-btn {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
  font-weight: bold;
}

.add-to-cart-btn:hover {
  background-color: #45a049;
}
</style>