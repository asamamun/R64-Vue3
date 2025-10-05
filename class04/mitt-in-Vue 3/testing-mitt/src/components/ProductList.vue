<script setup>
import { defineProps, defineEmits } from 'vue'
import ProductItem from './ProductItem.vue'

defineProps({
  products: {
    type: Array,
    required: true
  }
})

defineEmits(['add-to-cart'])
</script>

<template>
  <div class="product-list">
    <div class="products-grid">
      <ProductItem
        v-for="product in products"
        :key="product.id"
        :product="product"
        @add-to-cart="$emit('add-to-cart', product)"
      />
    </div>
  </div>
</template>

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
</style>