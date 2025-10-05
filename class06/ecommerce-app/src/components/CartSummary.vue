<template>
  <div class="cart-summary">
    <h3>Cart Summary</h3>
    <p>Items in cart: {{ cart.length }}</p>
    <p>Total: ${{ cartTotal.toFixed(2) }}</p>
  </div>
</template>

<script setup>
import { useProductStore } from '../stores/productStore'
import { storeToRefs } from 'pinia'

const productStore = useProductStore()
const { cart, cartTotal } = storeToRefs(productStore)
</script>

<style scoped>
.cart-summary {
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #f9f9f9;
}
</style>